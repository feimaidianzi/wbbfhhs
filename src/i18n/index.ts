// Dynamic translation loading - no static imports of large translation files.
// English chunk is preloaded via <link rel="modulepreload"> in index.html
// so it loads in parallel with the main bundle (no chained network request).
import { LanguageCode } from './languages';

const translationCache: Record<string, Record<string, string>> = {};
const loadingPromises: Record<string, Promise<Record<string, string>>> = {};

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
    if (lang === 'en') {
      const { enTranslations } = await import('./en');
      translationCache['en'] = enTranslations;
      return enTranslations;
    }
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
 * Returns English translations if loaded, else empty object.
 * Components should fall back to the key (which is human-readable enough).
 */
export const getEnglishTranslations = (): Record<string, string> => {
  return translationCache['en'] || {};
};

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
