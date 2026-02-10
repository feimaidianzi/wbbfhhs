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

// Subdomain to language mapping
const subdomainToLanguage: Record<string, LanguageCode> = {
  'www': 'zh',
  'cn': 'zh',
  'en': 'en',
  'vi': 'vi',
  'th': 'th',
  'ms': 'ms',
  'id': 'id',
  'ja': 'ja',
  'ko': 'ko',
  'fr': 'fr',
  'de': 'de',
  'es': 'es',
  'ru': 'ru',
  'ar': 'ar',
  'tr': 'tr',
};

// Detect language from subdomain
const detectLanguageFromSubdomain = (): LanguageCode | null => {
  const hostname = window.location.hostname;
  
  // Handle localhost and preview domains
  if (hostname === 'localhost' || hostname.includes('lovable.app') || hostname.includes('127.0.0.1')) {
    return null;
  }
  
  // Extract subdomain from hostname (e.g., en.cani.com -> en)
  const parts = hostname.split('.');
  if (parts.length >= 2) {
    const subdomain = parts[0].toLowerCase();
    if (subdomainToLanguage[subdomain]) {
      return subdomainToLanguage[subdomain];
    }
  }
  
  return null;
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
    // Priority 1: Subdomain detection (highest priority for multi-domain setup)
    const subdomainLang = detectLanguageFromSubdomain();
    if (subdomainLang) {
      console.log(`Language detected from subdomain: ${subdomainLang}`);
      return subdomainLang;
    }
    
    // Priority 2: Previously saved preference
    const saved = localStorage.getItem('language');
    if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
      return saved as LanguageCode;
    }
    
    // Priority 3: Default language
    return DEFAULT_LANGUAGE;
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [currentTranslations, setCurrentTranslations] = useState<Record<string, string>>(() => {
    return getTranslations(language);
  });
  const [autoDetected, setAutoDetected] = useState(false);

  const langConfig = getLanguageByCode(language);
  const isRTL = langConfig?.rtl || false;

  // Load pre-saved translations from database
  const loadSavedTranslations = useCallback(async (targetLang: LanguageCode) => {
    if (targetLang === 'zh') {
      setCurrentTranslations(zhTranslations);
      return true;
    }
    
    // For English: merge static enTranslations with DB translations (DB takes priority)
    // This ensures keys missing from en.ts but present in DB are still available
    if (targetLang === 'en') {
      // Start with static translations immediately
      setCurrentTranslations(enTranslations);
      
      // Then try to load richer translations from DB
      try {
        const cached = localStorage.getItem('translations_en');
        if (cached) {
          const parsed = JSON.parse(cached);
          setCurrentTranslations({ ...enTranslations, ...parsed });
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
      return true;
    }

    // Check memory cache first
    if (hasTranslations(targetLang)) {
      setCurrentTranslations(getTranslations(targetLang));
      return true;
    }

    // Check localStorage cache
    const cached = localStorage.getItem(`translations_${targetLang}`);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setTranslations(targetLang, parsed);
        setCurrentTranslations(parsed);
        return true;
      } catch (e) {
        console.error('Error parsing cached translations:', e);
      }
    }

    // Load from database
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
        // Cache in localStorage
        localStorage.setItem(`translations_${targetLang}`, data.value);
        return true;
      }
    } catch (error) {
      console.error('Error loading translations:', error);
    } finally {
      setIsLoading(false);
    }

    // Fallback to English if no translation found
    setCurrentTranslations(enTranslations);
    return false;
  }, []);

  // Auto-detect language based on IP
  const detectLanguageFromIP = useCallback(async () => {
    // Only auto-detect if user hasn't manually set a language
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
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    localStorage.setItem('language_manual', 'true'); // Mark as manually set
    loadSavedTranslations(lang);
  }, [loadSavedTranslations]);

  const t = useCallback((key: string): string => {
    return currentTranslations[key] || zhTranslations[key] || key;
  }, [currentTranslations]);

  // Initial load
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    // Load translations for current language
    loadSavedTranslations(language);

    // Check subdomain on mount - subdomain always takes priority
    const subdomainLang = detectLanguageFromSubdomain();
    if (subdomainLang && subdomainLang !== language) {
      console.log(`Subdomain language override: ${subdomainLang}`);
      setLanguageState(subdomainLang);
      localStorage.setItem('language', subdomainLang);
      return;
    }

    // Auto-detect language on first visit (only if no subdomain detected)
    if (!autoDetected && !subdomainLang) {
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
