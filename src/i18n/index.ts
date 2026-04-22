// English is bundled statically — it's the default and needed for instant first paint
// (eliminates a chained network request that was blocking LCP by ~2.5s).
import { enTranslations } from './en';
import { LanguageCode } from './languages';

// Cache for loaded translations
const translationCache: Record<string, Record<string, string>> = {
  en: enTranslations,
};

// Loading promises to prevent duplicate fetches
const loadingPromises: Record<string, Promise<Record<string, string>>> = {};

/**
 * Load translations for a specific language.
 * English returns synchronously (bundled). Other languages lazy-load.
 */
export const loadTranslations = async (lang: LanguageCode): Promise<Record<string, string>> => {
  if (translationCache[lang]) {
    return translationCache[lang];
  }

  if (loadingPromises[lang]) {
    return loadingPromises[lang];
  }

  const promise = (async () => {
    if (lang === 'zh') {
      const { zhTranslations } = await import('./zh');
      translationCache['zh'] = zhTranslations;
      return zhTranslations;
    }
    // For other languages, fall back to bundled English
    return enTranslations;
  })();

  loadingPromises[lang] = promise;
  const result = await promise;
  delete loadingPromises[lang];
  return result;
};

/**
 * Synchronous English translations — always available (bundled).
 */
export const getEnglishTranslations = (): Record<string, string> => enTranslations;

/**
 * Get translations synchronously (from cache only).
 */
export const getTranslations = (lang: LanguageCode): Record<string, string> => {
  return translationCache[lang] || {};
};

export const setTranslations = (lang: LanguageCode, trans: Record<string, string>) => {
  translationCache[lang] = trans;
};

export const hasTranslations = (lang: LanguageCode): boolean => {
  return !!translationCache[lang];
};

export const getTranslationKeys = async (): Promise<string[]> => {
  const zh = await loadTranslations('zh');
  return Object.keys(zh);
};

export * from './languages';
export { toBaseLanguage } from './languages';
