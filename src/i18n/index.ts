// Two-tier translation loading:
//   • *-home.ts chunks: ~25KB raw / ~6KB gzip — only homepage keys, loaded on first paint.
//   • full en.ts / zh.ts: ~600KB raw / ~180KB gzip — loaded lazily for non-home routes
//     (admin, product detail, etc.) or on idle as a background upgrade.
//
// Components call t(key); if a key is missing in the home chunk, the full chunk
// is fetched in the background and merged in. Until then, the key string is
// shown (acceptable since it only happens for off-home keys before the upgrade
// completes — typically a few hundred ms).
import { LanguageCode } from './languages';

const translationCache: Record<string, Record<string, string>> = {};
const loadingPromises: Record<string, Promise<Record<string, string>>> = {};

// Loads the SMALL home-only chunk (used for first paint on the landing page).
export const loadHomeTranslations = async (lang: LanguageCode): Promise<Record<string, string>> => {
  const cacheKey = `${lang}-home`;
  if (translationCache[cacheKey]) return translationCache[cacheKey];
  if (loadingPromises[cacheKey]) return loadingPromises[cacheKey];

  const promise = (async () => {
    if (lang === 'zh') {
      const { zhHomeTranslations } = await import('./zh-home');
      translationCache[cacheKey] = zhHomeTranslations;
      return zhHomeTranslations;
    }
    // Default to English home chunk for en + every other language as fallback.
    const { enHomeTranslations } = await import('./en-home');
    translationCache[cacheKey] = enHomeTranslations;
    return enHomeTranslations;
  })();

  loadingPromises[cacheKey] = promise;
  const result = await promise;
  delete loadingPromises[cacheKey];
  return result;
};

// Loads the FULL translation file for a language. Used for non-home routes,
// background upgrades, and when a missing key is detected.
export const loadTranslations = async (lang: LanguageCode): Promise<Record<string, string>> => {
  if (translationCache[lang]) return translationCache[lang];
  if (loadingPromises[lang]) return loadingPromises[lang];

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
  return translationCache['en'] || translationCache['en-home'] || {};
};

export const getTranslations = (lang: LanguageCode): Record<string, string> => {
  return translationCache[lang] || translationCache[`${lang}-home`] || {};
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
