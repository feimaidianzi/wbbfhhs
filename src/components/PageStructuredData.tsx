import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageCode } from '@/i18n/languages';
import { getDomainForLanguage, getHtmlLang } from '@/utils/seoConfig';

interface SoftwareAppData {
  type: 'SoftwareApplication';
  name: string;
  description: string;
  category?: string;
  os?: string;
}

interface ServiceData {
  type: 'Service';
  name: string;
  description: string;
  serviceType?: string;
}

interface ProductData {
  type: 'Product';
  name: string;
  description: string;
  image?: string;
  category?: string;
  sku?: string;
}

type StructuredDataInput = SoftwareAppData | ServiceData | ProductData;

interface PageStructuredDataProps {
  data: StructuredDataInput;
}

export const PageStructuredData = ({ data }: PageStructuredDataProps) => {
  const { language } = useLanguage();
  const langCode = language as LanguageCode;
  const domain = getDomainForLanguage(langCode);
  const companyName = langCode === 'zh' ? '长凌科技有限公司' : 'CANI Technology Co., Ltd.';

  let jsonLd: object;

  if (data.type === 'SoftwareApplication') {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: data.name,
      description: data.description,
      applicationCategory: data.category || 'BusinessApplication',
      operatingSystem: data.os || 'Windows, Linux, Web',
      inLanguage: getHtmlLang(langCode),
      provider: {
        '@type': 'Organization',
        name: companyName,
        url: domain,
      },
    };
  } else if (data.type === 'Service') {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: data.name,
      description: data.description,
      serviceType: data.serviceType || 'Professional Service',
      inLanguage: getHtmlLang(langCode),
      provider: {
        '@type': 'Organization',
        name: companyName,
        url: domain,
        logo: `${domain}/logo.png`,
      },
      areaServed: 'Worldwide',
    };
  } else {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: data.name,
      description: data.description,
      image: data.image,
      sku: data.sku,
      category: data.category,
      inLanguage: getHtmlLang(langCode),
      brand: { '@type': 'Brand', name: 'CANI' },
      manufacturer: {
        '@type': 'Organization',
        name: companyName,
        url: domain,
      },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: companyName },
      },
    };
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};
