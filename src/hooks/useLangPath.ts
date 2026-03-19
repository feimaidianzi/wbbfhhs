import { useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { stripAllLangPrefixes } from '@/utils/langPathUtils';

/**
 * Hook to generate language-prefixed paths for internal navigation.
 * English (en) uses no prefix (international default), all other languages use /{lang}/ prefix.
 * Always strips any existing language prefixes first to prevent nesting like /zh/fr/ko/path.
 */
export const useLangPath = () => {
  const { language } = useLanguage();

  const langPath = useCallback((path: string): string => {
    // Don't modify external URLs
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    // Don't prefix admin routes
    if (path.startsWith('/admin')) return path;
    // Strip ALL existing language prefixes to prevent nesting
    const cleanPath = stripAllLangPrefixes(path);
    if (language === 'en') return cleanPath;
    // Add language prefix
    return `/${language}${cleanPath}`;
  }, [language]);

  return langPath;
};
