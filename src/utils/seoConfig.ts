import { LanguageCode, SUPPORTED_LANGUAGES, getLanguageByCode } from '@/i18n/languages';

// Base domain configuration
export const BASE_DOMAIN = 'caniuav.com';

// Get language path prefix (empty for Chinese default)
export const getLangPrefix = (lang: LanguageCode): string => {
  if (lang === 'zh') return '';
  return `/${lang}`;
};

// Get full domain URL for a language (path-prefix based)
export const getDomainForLanguage = (lang: LanguageCode): string => {
  return `https://www.${BASE_DOMAIN}`;
};

// Get full URL for a language + path
export const getUrlForLanguage = (lang: LanguageCode, path: string): string => {
  const prefix = getLangPrefix(lang);
  const cleanPath = path === '/' ? '' : path;
  return `https://www.${BASE_DOMAIN}${prefix}${cleanPath}`;
};

// Get all alternate URLs for hreflang
export const getAlternateUrls = (path: string): Array<{ lang: LanguageCode; url: string }> => {
  return SUPPORTED_LANGUAGES.map(lang => ({
    lang: lang.code,
    url: getUrlForLanguage(lang.code, path),
  }));
};

// Get canonical URL for current language
export const getCanonicalUrl = (lang: LanguageCode, path: string): string => {
  return getUrlForLanguage(lang, path);
};

// Get OG locale from language code
export const getOGLocale = (lang: LanguageCode): string => {
  const localeMap: Record<LanguageCode, string> = {
    zh: 'zh_CN',
    en: 'en_US',
    vi: 'vi_VN',
    th: 'th_TH',
    ms: 'ms_MY',
    id: 'id_ID',
    ja: 'ja_JP',
    ko: 'ko_KR',
    fr: 'fr_FR',
    de: 'de_DE',
    es: 'es_ES',
    ru: 'ru_RU',
    ar: 'ar_SA',
    tr: 'tr_TR',
  };
  return localeMap[lang] || 'en_US';
};

// Get HTML lang attribute value
export const getHtmlLang = (lang: LanguageCode): string => {
  const langMap: Record<LanguageCode, string> = {
    zh: 'zh-CN',
    en: 'en',
    vi: 'vi',
    th: 'th',
    ms: 'ms',
    id: 'id',
    ja: 'ja',
    ko: 'ko',
    fr: 'fr',
    de: 'de',
    es: 'es',
    ru: 'ru',
    ar: 'ar',
    tr: 'tr',
  };
  return langMap[lang] || 'en';
};

// Get language display name for structured data
export const getLanguageDisplayName = (lang: LanguageCode): string => {
  const config = getLanguageByCode(lang);
  return config?.nameEn || 'English';
};

// Create multi-language organization structured data
export const createLocalizedOrganizationData = (lang: LanguageCode, t: (key: string) => string) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: lang === 'zh' ? '长凌科技有限公司' : 'CANI Technology Co., Ltd.',
  alternateName: 'CANI',
  url: getUrlForLanguage(lang, '/'),
  logo: `https://www.${BASE_DOMAIN}/logo.png`,
  description: t('footer.company.desc'),
  address: {
    '@type': 'PostalAddress',
    addressLocality: lang === 'zh' ? '长沙' : 'Changsha',
    addressRegion: lang === 'zh' ? '湖南' : 'Hunan',
    addressCountry: lang === 'zh' ? 'CN' : 'China',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+86-17674048404',
    contactType: 'customer service',
    availableLanguage: getLanguageDisplayName(lang),
  },
});

// Create localized breadcrumb structured data
export const createLocalizedBreadcrumb = (
  items: Array<{ name: string; url: string }>,
  lang: LanguageCode
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: getUrlForLanguage(lang, item.url),
  })),
});

// Create localized product structured data
export const createLocalizedProductData = (
  product: {
    name: string;
    description: string;
    image: string;
    category: string;
  },
  lang: LanguageCode
) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.image,
  brand: {
    '@type': 'Brand',
    name: 'CANI',
  },
  category: product.category,
  manufacturer: {
    '@type': 'Organization',
    name: lang === 'zh' ? '长凌科技有限公司' : 'CANI Technology Co., Ltd.',
  },
  inLanguage: getHtmlLang(lang),
});

// Create localized article structured data
export const createLocalizedArticleData = (
  article: {
    title: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified?: string;
  },
  lang: LanguageCode
) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  image: article.image,
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  inLanguage: getHtmlLang(lang),
  author: {
    '@type': 'Organization',
    name: 'CANI',
  },
  publisher: {
    '@type': 'Organization',
    name: lang === 'zh' ? '长凌科技有限公司' : 'CANI Technology Co., Ltd.',
    logo: {
      '@type': 'ImageObject',
      url: `https://www.${BASE_DOMAIN}/logo.png`,
    },
  },
});

// Create WebSite structured data with multi-language support
export const createWebSiteData = (lang: LanguageCode, t: (key: string) => string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: lang === 'zh' ? '长凌科技' : 'CANI Technology',
  alternateName: 'CANI',
  url: getUrlForLanguage(lang, '/'),
  inLanguage: getHtmlLang(lang),
  potentialAction: {
    '@type': 'SearchAction',
    target: `https://www.${BASE_DOMAIN}${getLangPrefix(lang)}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});