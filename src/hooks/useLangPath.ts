import { useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Hook to generate language-prefixed paths for internal navigation.
 * Chinese (zh) uses no prefix, all other languages use /{lang}/ prefix.
 */
export const useLangPath = () => {
  const { language } = useLanguage();

  const langPath = useCallback((path: string): string => {
    if (language === 'zh') return path;
    // Don't prefix admin routes
    if (path.startsWith('/admin')) return path;
    // Add language prefix
    return `/${language}${path}`;
  }, [language]);

  return langPath;
};
