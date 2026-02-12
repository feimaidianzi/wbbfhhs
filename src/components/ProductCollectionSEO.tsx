import { useLanguage } from "@/contexts/LanguageContext";

/**
 * 产品集合SEO组件
 * 参考 va-imaging.com 的SEO技巧，为产品列表页添加丰富的隐藏文本和结构化数据
 * 提高 Text/HTML 比率，增加关键词密度
 */

interface Product {
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  specs?: string[];
  specsEn?: string[];
  price?: number;
  image?: string;
  link?: string;
}

interface ProductCollectionSEOProps {
  category: string;
  categoryEn: string;
  categoryDescription: string;
  categoryDescriptionEn: string;
  products: Product[];
  keywords: string[];
  keywordsEn: string[];
  buyingGuide?: {
    title: string;
    titleEn: string;
    content: string[];
    contentEn: string[];
  };
  technicalInfo?: {
    title: string;
    titleEn: string;
    items: { term: string; termEn: string; definition: string; definitionEn: string }[];
  };
}

export const ProductCollectionSEO = ({
  category,
  categoryEn,
  categoryDescription,
  categoryDescriptionEn,
  products,
  keywords,
  keywordsEn,
  buyingGuide,
  technicalInfo,
}: ProductCollectionSEOProps) => {
  const { baseLang, t } = useLanguage();
  const isEn = baseLang === 'en';

  // Get localized company name
  const companyName = t('template.companyName');
  const companyNameFull = t('template.companyNameFull');

  // 生成 ItemList 结构化数据
  const itemListStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isEn ? categoryEn : category,
    description: isEn ? categoryDescriptionEn : categoryDescription,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: isEn && product.nameEn ? product.nameEn : product.name,
        description: isEn && product.descriptionEn ? product.descriptionEn : product.description,
        image: product.image,
        url: product.link ? `https://www.caniuav.com${product.link}` : undefined,
        brand: {
          '@type': 'Brand',
          name: 'CANI',
        },
        manufacturer: {
          '@type': 'Organization',
          name: companyNameFull,
        },
        offers: product.price ? {
          '@type': 'Offer',
          priceCurrency: 'CNY',
          price: product.price,
          availability: 'https://schema.org/InStock',
        } : undefined,
      },
    })),
  };

  // 生成 CollectionPage 结构化数据
  const collectionPageData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: isEn ? categoryEn : category,
    description: isEn ? categoryDescriptionEn : categoryDescription,
    url: `https://www.caniuav.com/products/${category.toLowerCase().replace(/\s+/g, '-')}`,
    mainEntity: itemListStructuredData,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : '首页', item: 'https://www.caniuav.com' },
        { '@type': 'ListItem', position: 2, name: isEn ? 'Products' : '产品', item: 'https://www.caniuav.com/products' },
        { '@type': 'ListItem', position: 3, name: isEn ? categoryEn : category },
      ],
    },
  };

  return (
    <>
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageData) }}
      />

    </>
  );
};

export default ProductCollectionSEO;
