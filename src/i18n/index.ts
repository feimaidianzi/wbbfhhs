// Dynamic translation loading - no static imports of large translation files
import { LanguageCode } from './languages';

// Cache for loaded translations
const translationCache: Record<string, Record<string, string>> = {};

// Loading promises to prevent duplicate fetches
const loadingPromises: Record<string, Promise<Record<string, string>>> = {};

/**
 * Dynamically load translations for a specific language.
 * Uses dynamic import() so Vite code-splits zh.ts and en.ts into separate chunks.
 */
export const loadTranslations = async (lang: LanguageCode): Promise<Record<string, string>> => {
  // Return from cache if available
  if (translationCache[lang]) {
    return translationCache[lang];
  }

  // Prevent duplicate concurrent loads
  if (loadingPromises[lang]) {
    return loadingPromises[lang];
  }

  const promise = (async () => {
    if (lang === 'zh') {
      const { zhTranslations } = await import('./zh');
      translationCache['zh'] = zhTranslations;
      return zhTranslations;
    }
    if (lang === 'en') {
      const { enTranslations } = await import('./en');
      translationCache['en'] = enTranslations;
      return enTranslations;
    }
    // For other languages, fall back to English
    const { enTranslations } = await import('./en');
    translationCache['en'] = enTranslations;
    return enTranslations;
  })();

  loadingPromises[lang] = promise;
  const result = await promise;
  delete loadingPromises[lang];
  return result;
};

/**
 * Get translations synchronously (from cache only).
 * Returns empty object if not yet loaded.
 */
export const getTranslations = (lang: LanguageCode): Record<string, string> => {
  return translationCache[lang] || {};
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
  return !!translationCache[lang];
};

/**
 * Get all translation keys (loads zh synchronously for admin use)
 */
export const getTranslationKeys = async (): Promise<string[]> => {
  const zh = await loadTranslations('zh');
  return Object.keys(zh);
};

export * from './languages';
export { toBaseLanguage } from './languages';
