import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  LanguageCode, 
  SUPPORTED_LANGUAGES, 
  DEFAULT_LANGUAGE,
  getLanguageByCode,
  toBaseLanguage,
} from '@/i18n/languages';
import { loadTranslations, setTranslations, hasTranslations, getTranslations } from '@/i18n';

// Kick off English translation load IMMEDIATELY at module evaluation,
// in parallel with the main bundle initialization. By the time React renders,
// the chunk download is already in flight (no chained network round-trip).
const enLoadPromise: Promise<Record<string, string>> = loadTranslations('en');

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  isLoading: boolean;
  isRTL: boolean;
  baseLang: 'zh' | 'en';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

const VALID_LANG_CODES = new Set<string>(SUPPORTED_LANGUAGES.map(l => l.code));

const detectLanguageFromPath = (): LanguageCode | null => {
  const pathname = window.location.pathname;
  const firstSegment = pathname.split('/')[1];
  if (firstSegment && VALID_LANG_CODES.has(firstSegment) && firstSegment !== 'en') {
    return firstSegment as LanguageCode;
  }
  return null;
};

export const getPathWithoutLang = (): string => {
  const pathname = window.location.pathname;
  const segments = pathname.split('/').filter(Boolean);
  
  // Strip ALL leading language code segments to prevent nesting
  let firstNonLangIndex = 0;
  while (firstNonLangIndex < segments.length && VALID_LANG_CODES.has(segments[firstNonLangIndex])) {
    firstNonLangIndex++;
  }
  
  if (firstNonLangIndex === 0) return pathname;
  const cleanSegments = segments.slice(firstNonLangIndex);
  return '/' + cleanSegments.join('/') || '/';
};

const countryToLanguage: Record<string, LanguageCode> = {
  'CN': 'zh', 'TW': 'zh', 'HK': 'zh', 'MO': 'zh',
  'US': 'en', 'GB': 'en', 'AU': 'en', 'CA': 'en', 'NZ': 'en',
  'VN': 'vi', 'TH': 'th', 'MY': 'ms', 'SG': 'en', 'ID': 'id',
  'JP': 'ja', 'KR': 'ko', 'FR': 'fr', 'DE': 'de', 'AT': 'de', 'CH': 'de',
  'ES': 'es', 'MX': 'es', 'AR': 'es', 'RU': 'ru',
  'SA': 'ar', 'AE': 'ar', 'EG': 'ar', 'TR': 'tr',
};

const getInitialLanguage = (): LanguageCode => {
  const pathLang = detectLanguageFromPath();
  if (pathLang) return pathLang;
  const saved = localStorage.getItem('language');
  if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) return saved as LanguageCode;
  return DEFAULT_LANGUAGE;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage);

  // SYNCHRONOUS first paint: try localStorage, otherwise empty (keys shown briefly).
  // The bundled English chunk is in flight (kicked off at module load) and merges in ASAP.
  const [currentTranslations, setCurrentTranslations] = useState<Record<string, string>>(() => {
    const lang = getInitialLanguage();

    // Check in-memory cache first
    const inMem = getTranslations(lang);
    if (Object.keys(inMem).length > 0) return inMem;

    // Try localStorage for the active language
    try {
      const stored = localStorage.getItem(`translations_${lang}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Also merge cached en if available
        const enStored = localStorage.getItem('translations_en');
        if (enStored && lang !== 'en') {
          try { return { ...JSON.parse(enStored), ...parsed }; } catch { /* ignore */ }
        }
        return parsed;
      }
      // Even for non-en/zh, try the bundled English cache
      if (lang !== 'en') {
        const enStored = localStorage.getItem('translations_en');
        if (enStored) return JSON.parse(enStored);
      }
    } catch { /* ignore */ }

    // First-ever visit: render with empty map; English chunk will populate within ~200ms
    return {};
  });

  // Never block first render — we always have English available
  const isLoading = false;
  const initDone = useRef(false);

  const langConfig = getLanguageByCode(language);
  const isRTL = langConfig?.rtl || false;

  // Background translation upgrade — runs AFTER first paint to avoid blocking LCP
  const upgradeTranslations = useCallback(async (targetLang: LanguageCode) => {
    // Always make sure English chunk is loaded first (it's already in flight from module init)
    const enBase = await enLoadPromise;
    setTranslations('en', enBase);
    // Cache en in localStorage so next visit gets instant first paint
    try {
      const enKey = 'translations_en';
      const stored = localStorage.getItem(enKey);
      if (!stored) {
        localStorage.setItem(enKey, JSON.stringify(enBase));
      }
    } catch { /* ignore */ }

    // If we're rendering English, just merge en in case current state was empty
    if (targetLang === 'en') {
      setCurrentTranslations((prev) => Object.keys(prev).length === 0 ? enBase : { ...enBase, ...prev });
    } else {
      // For other languages, ensure English fallback is merged under existing translations
      setCurrentTranslations((prev) => ({ ...enBase, ...prev }));
    }

    // For zh, dynamically load the chunk
    if (targetLang === 'zh') {
      const zhBase = await loadTranslations('zh');
      const merged = { ...enBase, ...zhBase };
      setTranslations('zh', merged);
      setCurrentTranslations(merged);

      // After bundled translations are in, check Supabase for newer overrides (idle)
      const checkSupabase = () => {
        supabase.from('system_settings').select('value').eq('key', 'translations_zh').maybeSingle()
          .then(({ data }) => {
            if (data?.value) {
              try {
                const fresh = JSON.parse(data.value);
                const refreshed = { ...merged, ...fresh };
                setTranslations('zh', refreshed);
                setCurrentTranslations(refreshed);
                localStorage.setItem('translations_zh', data.value);
              } catch { /* ignore */ }
            }
          });
      };
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(checkSupabase, { timeout: 5000 });
      } else {
        setTimeout(checkSupabase, 2000);
      }
      return;
    }

    // For en, only check Supabase for overrides (idle, non-blocking)
    if (targetLang === 'en') {
      const checkSupabase = () => {
        supabase.from('system_settings').select('value').eq('key', 'translations_en').maybeSingle()
          .then(({ data }) => {
            if (data?.value) {
              try {
                const fresh = JSON.parse(data.value);
                const refreshed = { ...enBase, ...fresh };
                setTranslations('en', refreshed);
                setCurrentTranslations(refreshed);
                localStorage.setItem('translations_en', data.value);
              } catch { /* ignore */ }
            }
          });
      };
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(checkSupabase, { timeout: 5000 });
      } else {
        setTimeout(checkSupabase, 2000);
      }
      return;
    }

    // Other languages — fetch DB translations (idle)
    const fetchOther = async () => {
      try {
        const cached = localStorage.getItem(`translations_${targetLang}`);
        if (cached) {
          // Already shown in initial state; check DB for fresh
          const { data } = await supabase.from('system_settings').select('value').eq('key', `translations_${targetLang}`).maybeSingle();
          if (data?.value && data.value !== cached) {
            const fresh = JSON.parse(data.value);
            const merged = { ...enBase, ...fresh };
            setTranslations(targetLang, merged);
            setCurrentTranslations(merged);
            localStorage.setItem(`translations_${targetLang}`, data.value);
          }
          return;
        }
        const { data } = await supabase.from('system_settings').select('value').eq('key', `translations_${targetLang}`).maybeSingle();
        if (data?.value) {
          const fresh = JSON.parse(data.value);
          const merged = { ...enBase, ...fresh };
          setTranslations(targetLang, merged);
          setCurrentTranslations(merged);
          localStorage.setItem(`translations_${targetLang}`, data.value);
        }
      } catch { /* ignore */ }
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(fetchOther, { timeout: 5000 });
    } else {
      setTimeout(fetchOther, 1500);
    }
  }, []);

  const setLanguage = useCallback((lang: LanguageCode) => {
    const currentPath = getPathWithoutLang();
    const prefix = lang === 'en' ? '' : `/${lang}`;
    const newPath = `${prefix}${currentPath === '/' ? '' : currentPath}` || '/';
    localStorage.setItem('language', lang);
    localStorage.setItem('language_manual', 'true');
    window.location.href = `${window.location.origin}${newPath}`;
  }, []);

  const t = useCallback((key: string): string => {
    return currentTranslations[key] || key;
  }, [currentTranslations]);

  useEffect(() => {
    if (initDone.current) return;
    initDone.current = true;

    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

    // Start upgrade ASAP. The en chunk is already in flight (from module load),
    // so this resolves quickly and doesn't block LCP.
    upgradeTranslations(language);

    const pathLang = detectLanguageFromPath();
    if (pathLang && pathLang !== language) {
      setLanguageState(pathLang);
      localStorage.setItem('language', pathLang);
    }
  }, []); // Run once on mount

  // Update HTML attributes when language changes (after init)
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  const baseLang = toBaseLanguage(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading, isRTL, baseLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { SUPPORTED_LANGUAGES, type LanguageCode };
