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
  keywords = '无人机配件,数字图传,VTX视频发射器,飞控电调,云台吊舱,ELRS遥控,长凌,CANI',
  image = 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80',
  url,
  type = 'website',
  structuredData,
}: SEOProps) => {
  const siteName = 'CANI 长凌';
  const fullTitle = `${title} | ${siteName}`;
  const baseUrl = 'https://www.caniuav.com';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;

  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '长凌科技有限公司',
    alternateName: 'CANI',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: '专业工业无人机研发制造商，提供系留无人机、物流无人机、无人机机场等产品及解决方案',
    address: {
      '@type': 'PostalAddress',
      addressLocality: '长沙',
      addressRegion: '湖南',
      addressCountry: 'CN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'market@caniuav.com',
      contactType: 'customer service',
      availableLanguage: 'Chinese',
    },
    sameAs: [],
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="长凌科技有限公司" />
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
    name: '长凌科技有限公司',
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
    name: '长凌科技有限公司',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.caniuav.com/logo.png',
    },
  },
});
