import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { SUPPORTED_LANGUAGES, LanguageCode } from '@/i18n/languages';
import {
  getAlternateUrls,
  getCanonicalUrl,
  getOGLocale,
  getHtmlLang,
  createLocalizedOrganizationData,
} from '@/utils/seoConfig';

interface MultiLanguageSEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  path: string; // Current path without domain
  type?: 'website' | 'article' | 'product';
  structuredData?: object | object[];
  noIndex?: boolean;
}

export const MultiLanguageSEO = ({
  title,
  description,
  keywords,
  image = '/og-image.png',
  path,
  type = 'website',
  structuredData,
  noIndex = false,
}: MultiLanguageSEOProps) => {
  const { language, t } = useLanguage();
  
  const siteName = language === 'zh' ? 'CANI 长凌科技' : 'CANI Technology';
  const fullTitle = `${title} | ${siteName}`;
  const canonicalUrl = getCanonicalUrl(language, path);
  const alternateUrls = getAlternateUrls(path);
  const ogLocale = getOGLocale(language);
  const htmlLang = getHtmlLang(language);

  // Default structured data
  const defaultStructuredData = createLocalizedOrganizationData(language, t);

  // Combine all structured data
  const allStructuredData = Array.isArray(structuredData)
    ? [defaultStructuredData, ...structuredData]
    : structuredData
    ? [defaultStructuredData, structuredData]
    : [defaultStructuredData];

  return (
    <Helmet>
      {/* HTML lang attribute */}
      <html lang={htmlLang} />

      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={language === 'zh' ? '长凌科技' : 'CANI Technology'} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang tags for all supported languages */}
      {alternateUrls.map(({ lang, url }) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={getHtmlLang(lang)}
          href={url}
        />
      ))}
      {/* x-default hreflang for language negotiation */}
      <link rel="alternate" hrefLang="x-default" href={getCanonicalUrl('en', path)} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image.startsWith('http') ? image : `${canonicalUrl}${image}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={ogLocale} />
      {/* Alternate locales */}
      {SUPPORTED_LANGUAGES.filter(l => l.code !== language).map(lang => (
        <meta
          key={lang.code}
          property="og:locale:alternate"
          content={getOGLocale(lang.code)}
        />
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image.startsWith('http') ? image : `${canonicalUrl}${image}`} />

      {/* Structured Data */}
      {allStructuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

// Export helper for creating localized breadcrumbs
export const createLocalizedBreadcrumbData = (
  items: Array<{ name: string; url: string }>,
  language: LanguageCode
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: getCanonicalUrl(language, item.url),
  })),
});

// Export helper for creating localized product data
export const createLocalizedProductSchema = (
  product: {
    name: string;
    description: string;
    image: string;
    category: string;
    sku?: string;
    brand?: string;
  },
  language: LanguageCode
) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.image,
  sku: product.sku,
  brand: {
    '@type': 'Brand',
    name: product.brand || 'CANI',
  },
  category: product.category,
  manufacturer: {
    '@type': 'Organization',
    name: language === 'zh' ? '长凌科技' : 'CANI Technology',
  },
  inLanguage: getHtmlLang(language),
});

// Export helper for creating localized FAQ data
export const createLocalizedFAQData = (
  faqs: Array<{ question: string; answer: string }>,
  language: LanguageCode
) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: getHtmlLang(language),
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export default MultiLanguageSEO;
