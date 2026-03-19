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

  // 7. Clean nested/repeated language prefixes (e.g., /en/en/news → /en/news, /zh/fr/ar/news → /zh/news)
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length >= 2 && LANG_CODES.has(segments[0])) {
    const lang = segments[0];
    // Find first non-lang segment
    let firstContentIdx = 1;
    while (firstContentIdx < segments.length && LANG_CODES.has(segments[firstContentIdx])) {
      firstContentIdx++;
    }
    if (firstContentIdx > 1) {
      // Had nested lang codes — keep first lang + content
      const contentSegments = segments.slice(firstContentIdx);
      pathname = lang === 'en'
        ? '/' + contentSegments.join('/') || '/'
        : '/' + lang + '/' + contentSegments.join('/');
      shouldRedirect = true;
    }
  }

  // Execute redirect if needed
  if (shouldRedirect) {
    url.pathname = pathname;
    window.location.replace(url.toString());
  }
};
