import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  LanguageCode, 
  SUPPORTED_LANGUAGES, 
  DEFAULT_LANGUAGE,
  getLanguageByCode,
  toBaseLanguage,
} from '@/i18n/languages';
import { loadTranslations, loadHomeTranslations, setTranslations, hasTranslations, getTranslations } from '@/i18n';
import { safeStorageGet, safeStorageSet } from '@/lib/utils';

// Kick off HOME translation load IMMEDIATELY at module evaluation, in parallel
// with the main bundle. The small *-home chunks (~6KB gzip vs ~180KB full)
// land well before LCP. We detect the URL language synchronously to avoid
// loading EN home for users who actually need a non-EN language.
const detectInitialLang = (): LanguageCode => {
  if (typeof window === 'undefined') return 'en';
  const seg = window.location.pathname.split('/')[1];
  if (seg === 'zh') return 'zh';
  // All other languages currently fall back to the EN home chunk + their full
  // chunk loaded on demand. EN home is universally useful as the bootstrap.
  return 'en';
};
const initialBootstrapLang = detectInitialLang();
const enHomeLoadPromise: Promise<Record<string, string>> = loadHomeTranslations(initialBootstrapLang);

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
  const saved = safeStorageGet('language');
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
        const stored = safeStorageGet(`translations_${lang}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Also merge cached en if available (en is the fallback layer, target lang wins)
          const enStored = safeStorageGet('translations_en');
        if (enStored && lang !== 'en') {
          try { return { ...JSON.parse(enStored), ...parsed }; } catch { /* ignore */ }
        }
        return parsed;
      }
      // For non-en languages without their own cache, do NOT seed with English —
      // it would lock English in and prevent the zh-home chunk (loading in
      // parallel) from ever showing through after merge. Render empty and let
      // the home chunk fill in within ~200ms.
    } catch { /* ignore */ }

    // First-ever visit: render with empty map; home chunk will populate within ~200ms
    return {};
  });

  // Never block first render — we always have English available
  const isLoading = false;
  const initDone = useRef(false);

  const langConfig = getLanguageByCode(language);
  const isRTL = langConfig?.rtl || false;

  // Two-phase load:
  //   1) await the SMALL home chunk (~6KB gzip) and paint immediately.
  //   2) in the background (idle), upgrade to the FULL chunk (~180KB gzip)
  //      so that off-home keys (admin pages, product details, etc.) resolve.
  const upgradeTranslations = useCallback(async (targetLang: LanguageCode) => {
    // Phase 1: home-only English (already in flight from module init)
    const enHomeBase = await enHomeLoadPromise;
    setTranslations('en-home' as LanguageCode, enHomeBase);

    // Apply home base immediately so the landing page renders with text
    if (targetLang === 'en') {
      setCurrentTranslations((prev) => Object.keys(prev).length === 0 ? enHomeBase : { ...enHomeBase, ...prev });
    } else {
      setCurrentTranslations((prev) => ({ ...enHomeBase, ...prev }));
    }

    // For zh, also load zh-home chunk for instant Chinese first paint
    if (targetLang === 'zh') {
      const zhHomeBase = await loadHomeTranslations('zh');
      const homeMerged = { ...enHomeBase, ...zhHomeBase };
      setCurrentTranslations((prev) => ({ ...homeMerged, ...prev }));
    }

    // Phase 2: schedule full chunk upgrade on idle (non-blocking)
    const upgradeToFull = async () => {
      const enBase = await loadTranslations('en');
      setTranslations('en', enBase);
      try {
        const enKey = 'translations_en';
        if (!safeStorageGet(enKey)) safeStorageSet(enKey, JSON.stringify(enBase));
      } catch { /* ignore */ }

      if (targetLang === 'en') {
        setCurrentTranslations((prev) => ({ ...enBase, ...prev }));
        // Idle Supabase override check
        const checkSupabase = () => {
          supabase.from('system_settings').select('value').eq('key', 'translations_en').maybeSingle()
            .then(({ data }) => {
              if (data?.value) {
                try {
                  const fresh = JSON.parse(data.value);
                  const refreshed = { ...enBase, ...fresh };
                  setTranslations('en', refreshed);
                  setCurrentTranslations(refreshed);
                  safeStorageSet('translations_en', data.value);
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

      if (targetLang === 'zh') {
        const zhBase = await loadTranslations('zh');
        const merged = { ...enBase, ...zhBase };
        setTranslations('zh', merged);
        setCurrentTranslations((prev) => ({ ...merged, ...prev }));

        const checkSupabase = () => {
          supabase.from('system_settings').select('value').eq('key', 'translations_zh').maybeSingle()
            .then(({ data }) => {
              if (data?.value) {
                try {
                  const fresh = JSON.parse(data.value);
                  const refreshed = { ...merged, ...fresh };
                  setTranslations('zh', refreshed);
                  setCurrentTranslations(refreshed);
                  safeStorageSet('translations_zh', data.value);
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

      // Other languages — fetch DB translations
      try {
        const cached = safeStorageGet(`translations_${targetLang}`);
        if (cached) {
          const { data } = await supabase.from('system_settings').select('value').eq('key', `translations_${targetLang}`).maybeSingle();
          if (data?.value && data.value !== cached) {
            const fresh = JSON.parse(data.value);
            const merged = { ...enBase, ...fresh };
            setTranslations(targetLang, merged);
            setCurrentTranslations(merged);
            safeStorageSet(`translations_${targetLang}`, data.value);
          }
          return;
        }
        const { data } = await supabase.from('system_settings').select('value').eq('key', `translations_${targetLang}`).maybeSingle();
        if (data?.value) {
          const fresh = JSON.parse(data.value);
          const merged = { ...enBase, ...fresh };
          setTranslations(targetLang, merged);
          setCurrentTranslations(merged);
          safeStorageSet(`translations_${targetLang}`, data.value);
        }
      } catch { /* ignore */ }
    };

    // Defer the heavy full chunk to idle time so it never competes with LCP
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => { upgradeToFull(); }, { timeout: 3000 });
    } else {
      setTimeout(upgradeToFull, 1200);
    }
  }, []);

  const setLanguage = useCallback((lang: LanguageCode) => {
    const currentPath = getPathWithoutLang();
    const prefix = lang === 'en' ? '' : `/${lang}`;
    const newPath = `${prefix}${currentPath === '/' ? '' : currentPath}` || '/';
    safeStorageSet('language', lang);
    safeStorageSet('language_manual', 'true');
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
      safeStorageSet('language', pathLang);
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
