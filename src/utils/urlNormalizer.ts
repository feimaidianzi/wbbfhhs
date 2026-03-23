/**
 * Global URL normalizer for CANI UAV (caniuav.com)
 * Fixes: .html suffixes, http/non-www redirects, nested lang prefixes, trailing slashes
 * Called once on app mount to ensure canonical URL format.
 */

const LANG_CODES = new Set(['en', 'zh', 'vi', 'th', 'ms', 'id', 'ja', 'ko', 'fr', 'de', 'es', 'ru', 'ar', 'tr']);
const PRODUCTION_HOST = 'www.caniuav.com';

export const normalizeSiteUrl = (): void => {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  let pathname = url.pathname;
  let shouldRedirect = false;

  // 1. Force HTTPS + www on production domain
  if (url.hostname === 'caniuav.com' || (url.hostname === PRODUCTION_HOST && url.protocol === 'http:')) {
    url.protocol = 'https:';
    url.hostname = PRODUCTION_HOST;
    shouldRedirect = true;
  }

  // 2. Strip .html suffix (e.g., /about.html → /about)
  if (pathname.endsWith('.html')) {
    pathname = pathname.replace(/\.html$/, '');
    shouldRedirect = true;
  }

  // 3. Strip /index suffix (e.g., /products/index → /products)
  if (pathname.endsWith('/index')) {
    pathname = pathname.replace(/\/index$/, '') || '/';
    shouldRedirect = true;
  }

  // 4. Lowercase the path (prevents duplicate pages from case differences)
  const lowered = pathname.toLowerCase();
  if (lowered !== pathname) {
    pathname = lowered;
    shouldRedirect = true;
  }

  // 5. Remove trailing slash (except root)
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.replace(/\/+$/, '');
    shouldRedirect = true;
  }

  // 6. Remove duplicate slashes
  const deduped = pathname.replace(/\/\/+/g, '/');
  if (deduped !== pathname) {
    pathname = deduped;
    shouldRedirect = true;
  }

  // 7. CRITICAL FIX: Clean ALL nested/repeated language prefixes
  // Handles: /vi/ar/fr/ko/en/applications/environment → /applications/environment (for en)
  //          /vi/ar/fr/ko/zh/applications/environment → /zh/applications/environment (for zh)
  const segments = pathname.split('/').filter(Boolean);
  
  // Count how many leading segments are language codes
  let langCount = 0;
  while (langCount < segments.length && LANG_CODES.has(segments[langCount])) {
    langCount++;
  }
  
  if (langCount > 0) {
    // Take the LAST language code as the intended target language
    const targetLang = segments[langCount - 1];
    const contentSegments = segments.slice(langCount);
    
    let cleanedPath: string;
    if (targetLang === 'en') {
      // English maps to root (no prefix)
      cleanedPath = contentSegments.length > 0 ? '/' + contentSegments.join('/') : '/';
    } else {
      // Other languages get single prefix
      cleanedPath = '/' + targetLang + (contentSegments.length > 0 ? '/' + contentSegments.join('/') : '');
    }
    
    if (cleanedPath !== pathname) {
      pathname = cleanedPath;
      shouldRedirect = true;
    }
  }

  // Execute redirect if needed (use 301-equivalent replace)
  if (shouldRedirect) {
    url.pathname = pathname;
    window.location.replace(url.toString());
  }
};
