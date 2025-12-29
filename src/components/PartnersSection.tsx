const partners = [
  "中船重工",
  "中国铁塔",
  "湖北省民政厅",
  "青海大学",
  "山东大学",
  "华中科技大学",
  "清华大学",
  "中国科学院地理研究所",
  "中国工程物理研究院",
  "湖北省电力公司",
  "中国运载火箭技术研究院",
  "合邦电力",
  "国家管网",
  "中国商飞",
  "航空工业光电所",
  "中国航天科工集团",
  "武汉大学",
  "国家电投",
  "中国石化",
  "中国石油",
];

export const PartnersSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            合作企业展示
          </h2>
          <p className="text-muted-foreground">
            与众多知名企业及机构建立长期合作关系
          </p>
        </div>
      </div>

      {/* Scrolling Partners */}
      <div className="relative">
        <div className="flex animate-scroll">
          {/* First set */}
          {partners.map((partner, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 mx-4 px-8 py-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-foreground font-medium whitespace-nowrap">
                {partner}
              </span>
            </div>
          ))}
          {/* Duplicate for seamless scroll */}
          {partners.map((partner, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 mx-4 px-8 py-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-foreground font-medium whitespace-nowrap">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
