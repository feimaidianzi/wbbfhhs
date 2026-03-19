/**
 * Utility to strip ALL language prefixes from a URL path.
 * Prevents nested language prefix bugs like /zh/fr/ko/en/applications/environment
 */

const LANG_CODES = new Set(['en', 'zh', 'vi', 'th', 'ms', 'id', 'ja', 'ko', 'fr', 'de', 'es', 'ru', 'ar', 'tr']);

/**
 * Recursively strips all language code prefixes from a path.
 * e.g., "/zh/fr/ar/ko/en/applications/environment" → "/applications/environment"
 * e.g., "/ru/products/accessories" → "/products/accessories"
 * e.g., "/products" → "/products"
 */
export const stripAllLangPrefixes = (path: string): string => {
  if (!path || path === '/') return '/';
  
  const segments = path.split('/').filter(Boolean);
  
  // Find the first segment that is NOT a language code
  let firstNonLangIndex = 0;
  while (firstNonLangIndex < segments.length && LANG_CODES.has(segments[firstNonLangIndex])) {
    firstNonLangIndex++;
  }
  
  if (firstNonLangIndex === 0) return path; // No lang prefix found
  
  const cleanSegments = segments.slice(firstNonLangIndex);
  return '/' + cleanSegments.join('/') || '/';
};
