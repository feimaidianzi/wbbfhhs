import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  LanguageCode, 
  SUPPORTED_LANGUAGES, 
  DEFAULT_LANGUAGE,
  getLanguageByCode,
  toBaseLanguage,
} from '@/i18n/languages';
import { getTranslations, setTranslations, hasTranslations, zhTranslations, enTranslations } from '@/i18n';

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

// Valid language codes set for fast lookup
const VALID_LANG_CODES = new Set<string>(SUPPORTED_LANGUAGES.map(l => l.code));

// Detect language from URL path prefix (e.g., /zh/about -> 'zh', /ja/about -> 'ja')
const detectLanguageFromPath = (): LanguageCode | null => {
  const pathname = window.location.pathname;
  const firstSegment = pathname.split('/')[1]; // e.g., "zh" from "/zh/about"
  
  if (firstSegment && VALID_LANG_CODES.has(firstSegment) && firstSegment !== 'en') {
    return firstSegment as LanguageCode;
  }
  
  // No prefix or 'en' prefix means English (international default)
  return null;
};

// Get the current path without the language prefix
export const getPathWithoutLang = (): string => {
  const pathname = window.location.pathname;
  const firstSegment = pathname.split('/')[1];
  
  if (firstSegment && VALID_LANG_CODES.has(firstSegment) && firstSegment !== 'en') {
    // Remove the language prefix
    const rest = pathname.slice(firstSegment.length + 1); // +1 for the leading /
    return rest || '/';
  }
  
  return pathname;
};

// Country to language mapping (fallback for IP detection)
const countryToLanguage: Record<string, LanguageCode> = {
  'CN': 'zh',
  'TW': 'zh',
  'HK': 'zh',
  'MO': 'zh',
  'US': 'en',
  'GB': 'en',
  'AU': 'en',
  'CA': 'en',
  'NZ': 'en',
  'VN': 'vi',
  'TH': 'th',
  'MY': 'ms',
  'SG': 'en',
  'ID': 'id',
  'JP': 'ja',
  'KR': 'ko',
  'FR': 'fr',
  'DE': 'de',
  'AT': 'de',
  'CH': 'de',
  'ES': 'es',
  'MX': 'es',
  'AR': 'es',
  'RU': 'ru',
  'SA': 'ar',
  'AE': 'ar',
  'EG': 'ar',
  'TR': 'tr',
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    // Priority 1: URL path prefix detection (highest priority)
    const pathLang = detectLanguageFromPath();
    if (pathLang) {
      console.log(`Language detected from path: ${pathLang}`);
      return pathLang;
    }
    
    // Priority 2: Previously saved preference
    const saved = localStorage.getItem('language');
    if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
      return saved as LanguageCode;
    }
    
    // Priority 3: Default language
    return DEFAULT_LANGUAGE;
  });
  
  // Synchronously initialize translations from localStorage cache to avoid flicker
  const [currentTranslations, setCurrentTranslations] = useState<Record<string, string>>(() => {
    const lang = (() => {
      const pathLang = detectLanguageFromPath();
      if (pathLang) return pathLang;
      const saved = localStorage.getItem('language');
      if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) return saved as LanguageCode;
      return DEFAULT_LANGUAGE;
    })();

    if (lang === 'en') return enTranslations;
    if (lang === 'zh') return zhTranslations;
    // For other languages, try localStorage cache synchronously
    const cached = localStorage.getItem(`translations_${lang}`);
    if (cached) {
      try { return JSON.parse(cached); } catch (e) { /* ignore */ }
    }
    // No cache available - will need async load
    return {};
  });

  // isLoading = true when we have no translations yet (empty object means need to fetch)
  const [isLoading, setIsLoading] = useState(() => {
    const lang = (() => {
      const pathLang = detectLanguageFromPath();
      if (pathLang) return pathLang;
      const saved = localStorage.getItem('language');
      if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) return saved as LanguageCode;
      return DEFAULT_LANGUAGE;
    })();
    if (lang === 'zh' || lang === 'en') return false;
    const cached = localStorage.getItem(`translations_${lang}`);
    return !cached; // loading if no cache
  });
  const [autoDetected, setAutoDetected] = useState(false);

  const langConfig = getLanguageByCode(language);
  const isRTL = langConfig?.rtl || false;

  // Load pre-saved translations from database
  const loadSavedTranslations = useCallback(async (targetLang: LanguageCode) => {
    if (targetLang === 'zh') {
      setCurrentTranslations(zhTranslations);
      setIsLoading(false);
      return true;
    }
    
    // For English: merge static enTranslations with DB translations (DB takes priority)
    if (targetLang === 'en') {
      setCurrentTranslations(enTranslations);
      
      try {
        const cached = localStorage.getItem('translations_en');
        if (cached) {
          const parsed = JSON.parse(cached);
          setCurrentTranslations({ ...enTranslations, ...parsed });
          setIsLoading(false);
          return true;
        }
        
        const { data } = await supabase
          .from('system_settings')
          .select('value')
          .eq('key', 'translations_en')
          .maybeSingle();
        
        if (data?.value) {
          const dbTranslations = JSON.parse(data.value);
          const merged = { ...enTranslations, ...dbTranslations };
          setCurrentTranslations(merged);
          setTranslations(targetLang, merged);
          localStorage.setItem('translations_en', data.value);
        }
      } catch (e) {
        console.error('Error loading EN translations from DB:', e);
      }
      setIsLoading(false);
      return true;
    }

    // Check memory cache first
    if (hasTranslations(targetLang)) {
      setCurrentTranslations(getTranslations(targetLang));
      setIsLoading(false);
      return true;
    }

    // Check localStorage cache - use immediately but also refresh from DB
    const cached = localStorage.getItem(`translations_${targetLang}`);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setTranslations(targetLang, parsed);
        setCurrentTranslations(parsed);
        setIsLoading(false);
        
        // Background refresh from DB to catch any updates
        (async () => {
          try {
            const { data } = await supabase
              .from('system_settings')
              .select('value')
              .eq('key', `translations_${targetLang}`)
              .single();
            if (data?.value && data.value !== cached) {
              const fresh = JSON.parse(data.value);
              setTranslations(targetLang, fresh);
              setCurrentTranslations(fresh);
              localStorage.setItem(`translations_${targetLang}`, data.value);
              console.log(`Translations for ${targetLang} updated from DB`);
            }
          } catch (_) { /* silently fail */ }
        })();
        
        return true;
      } catch (e) {
        console.error('Error parsing cached translations:', e);
      }
    }

    // No cache - load from database
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', `translations_${targetLang}`)
        .single();

      if (error) throw error;

      if (data?.value) {
        const translations = JSON.parse(data.value);
        setTranslations(targetLang, translations);
        setCurrentTranslations(translations);
        localStorage.setItem(`translations_${targetLang}`, data.value);
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Error loading translations:', error);
    }
    
    setIsLoading(false);
    setCurrentTranslations(enTranslations);
    return false;
  }, []);

  // Auto-detect language based on IP
  const detectLanguageFromIP = useCallback(async () => {
    const manuallySet = localStorage.getItem('language_manual');
    if (manuallySet === 'true') {
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('get-visitor-ip');
      
      if (error) throw error;

      const country = data?.country || data?.countryCode;
      if (country && countryToLanguage[country]) {
        const detectedLang = countryToLanguage[country];
        if (detectedLang !== language) {
          console.log(`Auto-detected language: ${detectedLang} for country: ${country}`);
          // Navigate to the detected language path
          const currentPath = getPathWithoutLang();
          const prefix = detectedLang === 'en' ? '' : `/${detectedLang}`;
          const newPath = `${prefix}${currentPath === '/' ? '' : currentPath}` || '/';
          window.history.replaceState(null, '', newPath);
          setLanguageState(detectedLang);
          localStorage.setItem('language', detectedLang);
          await loadSavedTranslations(detectedLang);
        }
      }
    } catch (error) {
      console.error('Error detecting language from IP:', error);
    }
  }, [language, loadSavedTranslations]);

  const setLanguage = useCallback((lang: LanguageCode) => {
    // Build new URL with language prefix
    const currentPath = getPathWithoutLang();
    const prefix = lang === 'en' ? '' : `/${lang}`;
    const newPath = `${prefix}${currentPath === '/' ? '' : currentPath}` || '/';
    
    // Save preference
    localStorage.setItem('language', lang);
    localStorage.setItem('language_manual', 'true');
    
    // Navigate to new path
    window.location.href = `${window.location.origin}${newPath}`;
  }, []);

  const t = useCallback((key: string): string => {
    if (isLoading) return '\u00A0'; // placeholder while loading translations
    return currentTranslations[key] || enTranslations[key] || key;
  }, [currentTranslations, isLoading]);

  // Initial load
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    // Load translations for current language
    loadSavedTranslations(language);

    // Check path on mount - path prefix always takes priority
    const pathLang = detectLanguageFromPath();
    if (pathLang && pathLang !== language) {
      console.log(`Path language override: ${pathLang}`);
      setLanguageState(pathLang);
      localStorage.setItem('language', pathLang);
      return;
    }

    // Auto-detect language on first visit (only if no path lang detected)
    if (!autoDetected && !pathLang) {
      setAutoDetected(true);
      const hasManualLanguage = localStorage.getItem('language_manual') === 'true';
      if (!hasManualLanguage) {
        detectLanguageFromIP();
      }
    }
  }, [language, isRTL, loadSavedTranslations, autoDetected, detectLanguageFromIP]);

  const baseLang = toBaseLanguage(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading, isRTL, baseLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { SUPPORTED_LANGUAGES, type LanguageCode };