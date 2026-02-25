import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  structuredData?: object;
}

export const SEO = ({
  title,
  description,
  keywords = 'industrial drone components,digital video transmission,VTX transmitter,flight controller ESC,gimbal camera,ELRS receiver,CANI UAV',
  image = 'https://www.caniuav.com/og-image.png',
  url,
  type = 'website',
  structuredData,
}: SEOProps) => {
  const siteName = 'CANI Technology';
  const fullTitle = `${title} | ${siteName}`;
  const baseUrl = 'https://www.caniuav.com';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;

  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CANI Technology',
    alternateName: 'CANI',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Professional industrial UAV components manufacturer specializing in digital video transmission, flight controllers, gimbals, and ELRS systems.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Changsha',
      addressRegion: 'Hunan',
      addressCountry: 'CN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'market@caniuav.com',
      contactType: 'customer service',
      availableLanguage: ['Chinese', 'English'],
    },
    sameAs: [],
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="长凌科技" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="zh_CN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};

// Product structured data helper
export const createProductStructuredData = (product: {
  name: string;
  description: string;
  image: string;
  category: string;
}) => ({
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
    name: '长凌科技',
  },
});

// Breadcrumb structured data helper
export const createBreadcrumbStructuredData = (
  items: Array<{ name: string; url: string }>
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `https://www.caniuav.com${item.url}`,
  })),
});

// Article structured data helper
export const createArticleStructuredData = (article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  image: article.image,
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  author: {
    '@type': 'Organization',
    name: 'CANI',
  },
  publisher: {
    '@type': 'Organization',
    name: '长凌科技',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.caniuav.com/logo.png',
    },
  },
});
