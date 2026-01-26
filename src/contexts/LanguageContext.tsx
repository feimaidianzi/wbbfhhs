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
  /** Helper to get base language ('zh' | 'en') for legacy components */
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

// Local storage key for caching translations
const TRANSLATION_CACHE_KEY = 'cani_translations_cache';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

interface CachedTranslation {
  translations: Record<string, string>;
  timestamp: number;
}

const loadCachedTranslations = (lang: LanguageCode): Record<string, string> | null => {
  try {
    const cached = localStorage.getItem(`${TRANSLATION_CACHE_KEY}_${lang}`);
    if (cached) {
      const parsed: CachedTranslation = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_EXPIRY_MS) {
        return parsed.translations;
      }
    }
  } catch (e) {
    console.error('Error loading cached translations:', e);
  }
  return null;
};

const saveCachedTranslations = (lang: LanguageCode, translations: Record<string, string>) => {
  try {
    const cache: CachedTranslation = {
      translations,
      timestamp: Date.now(),
    };
    localStorage.setItem(`${TRANSLATION_CACHE_KEY}_${lang}`, JSON.stringify(cache));
  } catch (e) {
    console.error('Error saving cached translations:', e);
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('language');
    if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
      return saved as LanguageCode;
    }
    return DEFAULT_LANGUAGE;
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [currentTranslations, setCurrentTranslations] = useState<Record<string, string>>(() => {
    return getTranslations(language);
  });

  const langConfig = getLanguageByCode(language);
  const isRTL = langConfig?.rtl || false;

  // Function to translate content using Doubao
  const translateContent = useCallback(async (targetLang: LanguageCode) => {
    // Skip if we already have static translations
    if (targetLang === 'zh' || targetLang === 'en') {
      setCurrentTranslations(targetLang === 'zh' ? zhTranslations : enTranslations);
      return;
    }

    // Check local cache first
    const cached = loadCachedTranslations(targetLang);
    if (cached) {
      setCurrentTranslations(cached);
      setTranslations(targetLang, cached);
      return;
    }

    // Check if already loaded in memory
    if (hasTranslations(targetLang)) {
      setCurrentTranslations(getTranslations(targetLang));
      return;
    }

    setIsLoading(true);

    try {
      // Call Doubao translation API
      const { data, error } = await supabase.functions.invoke('translate-content', {
        body: {
          sourceLanguage: 'zh',
          targetLanguage: targetLang,
          content: zhTranslations,
        },
      });

      if (error) throw error;

      if (data?.translations) {
        setTranslations(targetLang, data.translations);
        setCurrentTranslations(data.translations);
        saveCachedTranslations(targetLang, data.translations);
      } else {
        throw new Error('No translations returned');
      }
    } catch (error) {
      console.error('Translation error:', error);
      toast.error('翻译加载失败，使用英文显示');
      // Fallback to English
      setCurrentTranslations(enTranslations);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    translateContent(lang);
  }, [translateContent]);

  const t = useCallback((key: string): string => {
    return currentTranslations[key] || zhTranslations[key] || key;
  }, [currentTranslations]);

  // Initial load and language change effect
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    // Load translations for initial language
    if (language !== 'zh' && language !== 'en') {
      translateContent(language);
    }
  }, [language, isRTL, translateContent]);

  const baseLang = toBaseLanguage(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading, isRTL, baseLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { SUPPORTED_LANGUAGES, type LanguageCode };
