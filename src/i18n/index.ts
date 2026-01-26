// Translation files
import { zhTranslations } from './zh';
import { enTranslations } from './en';
import { LanguageCode } from './languages';

// All translations registry
const translations: Record<string, Record<string, string>> = {
  zh: zhTranslations,
  en: enTranslations,
};

// Cache for dynamically loaded translations
const translationCache: Record<string, Record<string, string>> = {};

/**
 * Get translations for a specific language
 * Returns cached/loaded translations, or falls back to English/Chinese
 */
export const getTranslations = (lang: LanguageCode): Record<string, string> => {
  // Check if we have static translations
  if (translations[lang]) {
    return translations[lang];
  }
  
  // Check cache for dynamically translated content
  if (translationCache[lang]) {
    return translationCache[lang];
  }
  
  // Fallback to English
  return translations.en;
};

/**
 * Set translations for a language (used for dynamic AI translations)
 */
export const setTranslations = (lang: LanguageCode, trans: Record<string, string>) => {
  translationCache[lang] = trans;
};

/**
 * Check if translations exist for a language
 */
export const hasTranslations = (lang: LanguageCode): boolean => {
  return !!translations[lang] || !!translationCache[lang];
};

/**
 * Get all translation keys
 */
export const getTranslationKeys = (): string[] => {
  return Object.keys(zhTranslations);
};

export { zhTranslations, enTranslations };
export * from './languages';
export { toBaseLanguage } from './languages';
