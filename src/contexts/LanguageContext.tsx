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
  const firstSegment = pathname.split('/')[1];
  if (firstSegment && VALID_LANG_CODES.has(firstSegment) && firstSegment !== 'en') {
    const rest = pathname.slice(firstSegment.length + 1);
    return rest || '/';
  }
  return pathname;
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
  
  // Try to load from localStorage cache synchronously for initial render
  const [currentTranslations, setCurrentTranslations] = useState<Record<string, string>>(() => {
    const lang = getInitialLanguage();
    // For zh/en, check if already in i18n cache (from a previous load)
    const cached = getTranslations(lang);
    if (Object.keys(cached).length > 0) return cached;
    // Try localStorage
    const stored = localStorage.getItem(`translations_${lang}`);
    if (stored) {
      try { return JSON.parse(stored); } catch { /* ignore */ }
    }
    return {};
  });

  const [isLoading, setIsLoading] = useState(() => Object.keys(currentTranslations).length === 0);
  const [autoDetected, setAutoDetected] = useState(false);
  const initDone = useRef(false);

  const langConfig = getLanguageByCode(language);
  const isRTL = langConfig?.rtl || false;

  // Core translation loading logic
  const loadLanguageTranslations = useCallback(async (targetLang: LanguageCode) => {
    // Step 1: Load base translations (zh or en) via dynamic import
    if (targetLang === 'zh' || targetLang === 'en') {
      const base = await loadTranslations(targetLang);
      
      if (targetLang === 'en') {
        // Merge with DB translations for English
        try {
          const cached = localStorage.getItem('translations_en');
          if (cached) {
            const parsed = JSON.parse(cached);
            const merged = { ...base, ...parsed };
            setCurrentTranslations(merged);
            setIsLoading(false);
            // Background refresh
            supabase.from('system_settings').select('value').eq('key', 'translations_en').maybeSingle()
              .then(({ data }) => {
                if (data?.value && data.value !== cached) {
                  const fresh = JSON.parse(data.value);
                  const m = { ...base, ...fresh };
                  setTranslations(targetLang, m);
                  setCurrentTranslations(m);
                  localStorage.setItem('translations_en', data.value);
                }
              });
            return;
          }
          const { data } = await supabase.from('system_settings').select('value').eq('key', 'translations_en').maybeSingle();
          if (data?.value) {
            const dbT = JSON.parse(data.value);
            const merged = { ...base, ...dbT };
            setTranslations(targetLang, merged);
            setCurrentTranslations(merged);
            localStorage.setItem('translations_en', data.value);
          } else {
            setCurrentTranslations(base);
          }
        } catch {
          setCurrentTranslations(base);
        }
      } else {
        setCurrentTranslations(base);
      }
      setIsLoading(false);
      return;
    }

    // Step 2: For other languages, check memory > localStorage > DB (with English fallback merge)
    const enBase = await loadTranslations('en');

    if (hasTranslations(targetLang)) {
      const merged = { ...enBase, ...getTranslations(targetLang) };
      setCurrentTranslations(merged);
      setIsLoading(false);
      return;
    }

    const cached = localStorage.getItem(`translations_${targetLang}`);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        const merged = { ...enBase, ...parsed };
        setTranslations(targetLang, merged);
        setCurrentTranslations(merged);
        setIsLoading(false);
        // Background refresh
        supabase.from('system_settings').select('value').eq('key', `translations_${targetLang}`).single()
          .then(({ data }) => {
            if (data?.value && data.value !== cached) {
              const fresh = JSON.parse(data.value);
              const mergedFresh = { ...enBase, ...fresh };
              setTranslations(targetLang, mergedFresh);
              setCurrentTranslations(mergedFresh);
              localStorage.setItem(`translations_${targetLang}`, data.value);
            }
          });
        return;
      } catch { /* ignore */ }
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('system_settings').select('value').eq('key', `translations_${targetLang}`).single();
      if (error) throw error;
      if (data?.value) {
        const translations = JSON.parse(data.value);
        const merged = { ...enBase, ...translations };
        setTranslations(targetLang, merged);
        setCurrentTranslations(merged);
        localStorage.setItem(`translations_${targetLang}`, data.value);
        setIsLoading(false);
        return;
      }
    } catch {
      console.error('Error loading translations for', targetLang);
    }

    // Fallback to English
    setCurrentTranslations(enBase);
    setIsLoading(false);
  }, []);

  const detectLanguageFromIP = useCallback(async () => {
    if (localStorage.getItem('language_manual') === 'true') return;
    try {
      const { data, error } = await supabase.functions.invoke('get-visitor-ip');
      if (error) throw error;
      const country = data?.country || data?.countryCode;
      if (country && countryToLanguage[country]) {
        const detectedLang = countryToLanguage[country];
        if (detectedLang !== language) {
          const currentPath = getPathWithoutLang();
          const prefix = detectedLang === 'en' ? '' : `/${detectedLang}`;
          const newPath = `${prefix}${currentPath === '/' ? '' : currentPath}` || '/';
          window.history.replaceState(null, '', newPath);
          setLanguageState(detectedLang);
          localStorage.setItem('language', detectedLang);
          await loadLanguageTranslations(detectedLang);
        }
      }
    } catch (error) {
      console.error('Error detecting language from IP:', error);
    }
  }, [language, loadLanguageTranslations]);

  const setLanguage = useCallback((lang: LanguageCode) => {
    const currentPath = getPathWithoutLang();
    const prefix = lang === 'en' ? '' : `/${lang}`;
    const newPath = `${prefix}${currentPath === '/' ? '' : currentPath}` || '/';
    localStorage.setItem('language', lang);
    localStorage.setItem('language_manual', 'true');
    window.location.href = `${window.location.origin}${newPath}`;
  }, []);

  const t = useCallback((key: string): string => {
    if (isLoading) return '\u00A0';
    // Try current translations, then fall back to key
    return currentTranslations[key] || key;
  }, [currentTranslations, isLoading]);

  useEffect(() => {
    if (initDone.current) return;
    initDone.current = true;

    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    loadLanguageTranslations(language);

    const pathLang = detectLanguageFromPath();
    if (pathLang && pathLang !== language) {
      setLanguageState(pathLang);
      localStorage.setItem('language', pathLang);
      return;
    }

    if (!pathLang) {
      const hasManualLanguage = localStorage.getItem('language_manual') === 'true';
      if (!hasManualLanguage) {
        setAutoDetected(true);
        detectLanguageFromIP();
      }
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
