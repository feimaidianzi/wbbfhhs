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
  const { language, t } = useLanguage();
  const isEn = language === 'en';

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
        url: product.link ? `https://www.cani.com${product.link}` : undefined,
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
    url: `https://www.cani.com/products/${category.toLowerCase().replace(/\s+/g, '-')}`,
    mainEntity: itemListStructuredData,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : '首页', item: 'https://www.cani.com' },
        { '@type': 'ListItem', position: 2, name: isEn ? 'Products' : '产品', item: 'https://www.cani.com/products' },
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

      {/* 隐藏的SEO文本内容 - 对搜索引擎可见，对用户视觉隐藏 */}
      <div className="sr-only" aria-hidden="false">
        {/* 分类描述 */}
        <article>
          <h2>{isEn ? categoryEn : category}</h2>
          <p>{isEn ? categoryDescriptionEn : categoryDescription}</p>
          
          {/* 关键词密集段落 */}
          <section>
            <h3>{isEn ? 'About Our Products' : '关于我们的产品'}</h3>
            <p>
              {isEn 
                ? `CANI Technology offers a comprehensive range of ${categoryEn.toLowerCase()} designed for professional and industrial applications. Our ${categoryEn.toLowerCase()} products are engineered with cutting-edge technology to deliver superior performance, reliability, and durability. Whether you need ${keywordsEn.slice(0, 5).join(', ')}, we have the perfect solution for your requirements.`
                : `长凌科技提供全系列${category}产品，专为专业和工业应用设计。我们的${category}产品采用尖端技术打造，提供卓越的性能、可靠性和耐用性。无论您需要${keywords.slice(0, 5).join('、')}，我们都能为您提供完美的解决方案。`
              }
            </p>
          </section>

          {/* 产品列表描述 */}
          <section>
            <h3>{isEn ? 'Product Catalog' : '产品目录'}</h3>
            {products.map((product, index) => (
              <article key={index} itemScope itemType="https://schema.org/Product">
                <h4 itemProp="name">{isEn && product.nameEn ? product.nameEn : product.name}</h4>
                <p itemProp="description">{isEn && product.descriptionEn ? product.descriptionEn : product.description}</p>
                {product.specs && (
                  <ul>
                    {(isEn && product.specsEn ? product.specsEn : product.specs).map((spec, i) => (
                      <li key={i}>{spec}</li>
                    ))}
                  </ul>
                )}
                <span itemProp="brand" itemScope itemType="https://schema.org/Brand">
                  <meta itemProp="name" content="CANI" />
                </span>
              </article>
            ))}
          </section>

          {/* 购买指南 */}
          {buyingGuide && (
            <section>
              <h3>{isEn ? buyingGuide.titleEn : buyingGuide.title}</h3>
              {(isEn ? buyingGuide.contentEn : buyingGuide.content).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </section>
          )}

          {/* 技术信息 */}
          {technicalInfo && (
            <section>
              <h3>{isEn ? technicalInfo.titleEn : technicalInfo.title}</h3>
              <dl>
                {technicalInfo.items.map((item, index) => (
                  <div key={index}>
                    <dt>{isEn ? item.termEn : item.term}</dt>
                    <dd>{isEn ? item.definitionEn : item.definition}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* 关键词云 */}
          <section>
            <h3>{isEn ? 'Related Keywords' : '相关关键词'}</h3>
            <p>
              {(isEn ? keywordsEn : keywords).join(' | ')}
            </p>
          </section>

          {/* 公司信息 */}
          <section itemScope itemType="https://schema.org/Organization">
            <h3>{isEn ? 'About CANI Technology' : '关于长凌科技'}</h3>
            <p>
              {isEn 
                ? `CANI Technology Co., Ltd. is a leading manufacturer and supplier of professional drone accessories and components. With over 10 years of experience in the industry, we specialize in digital FPV systems, VTX video transmitters, flight controllers, ESCs, gimbals, and ELRS remote control systems. Our products are trusted by drone manufacturers, integrators, and professionals worldwide.`
                : `长凌科技有限公司是专业无人机配件和零部件的领先制造商和供应商。凭借十余年的行业经验，我们专注于数字图传系统、VTX视频发射器、飞控、电调、云台和ELRS遥控系统。我们的产品深受全球无人机制造商、集成商和专业用户的信赖。`
              }
            </p>
            <meta itemProp="name" content={isEn ? "CANI Technology Co., Ltd." : "长凌科技有限公司"} />
            <meta itemProp="url" content="https://www.cani.com" />
          </section>

          {/* 服务承诺 */}
          <section>
            <h3>{isEn ? 'Our Services' : '我们的服务'}</h3>
            <ul>
              <li>{isEn ? 'OEM/ODM customization services' : 'OEM/ODM定制服务'}</li>
              <li>{isEn ? 'Technical support and consultation' : '技术支持与咨询'}</li>
              <li>{isEn ? 'Bulk order discounts available' : '批量订购享受优惠'}</li>
              <li>{isEn ? 'Worldwide shipping via DHL, FedEx, UPS' : '全球配送（DHL、FedEx、UPS）'}</li>
              <li>{isEn ? '12-24 month product warranty' : '12-24个月产品保修'}</li>
              <li>{isEn ? 'Fast response within 24 hours' : '24小时内快速响应'}</li>
            </ul>
          </section>
        </article>
      </div>
    </>
  );
};

export default ProductCollectionSEO;
