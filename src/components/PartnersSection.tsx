const partners = [
  {
    name: "中船重工",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80",
  },
  {
    name: "中国铁塔",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&q=80",
  },
  {
    name: "湖北省民政厅",
    logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&q=80",
  },
  {
    name: "青海大学",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&q=80",
  },
  {
    name: "山东大学",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&q=80",
  },
  {
    name: "华中科技大学",
    logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&q=80",
  },
  {
    name: "清华大学",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=200&q=80",
  },
  {
    name: "中国科学院",
    logo: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200&q=80",
  },
  {
    name: "中国工程物理研究院",
    logo: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&q=80",
  },
  {
    name: "湖北省电力公司",
    logo: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=200&q=80",
  },
  {
    name: "中国运载火箭技术研究院",
    logo: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=200&q=80",
  },
  {
    name: "合邦电力",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=80",
  },
  {
    name: "国家管网",
    logo: "https://images.unsplash.com/photo-1581094651181-35942459ef62?w=200&q=80",
  },
  {
    name: "中国商飞",
    logo: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=200&q=80",
  },
  {
    name: "航空工业光电所",
    logo: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=200&q=80",
  },
  {
    name: "中国航天科工集团",
    logo: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=200&q=80",
  },
  {
    name: "武汉大学",
    logo: "https://images.unsplash.com/photo-1607013407627-6ee814329547?w=200&q=80",
  },
  {
    name: "国家电投",
    logo: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=200&q=80",
  },
  {
    name: "中国石化",
    logo: "https://images.unsplash.com/photo-1545259742-b4fd8fea67e4?w=200&q=80",
  },
  {
    name: "中国石油",
    logo: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=200&q=80",
  },
];

export const PartnersSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            合作企业展示
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            与众多知名企业及机构建立长期合作关系，共同推动无人机技术发展
          </p>
        </div>

        {/* Partner Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
          {partners.slice(0, 10).map((partner, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden bg-muted">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="p-3 text-center bg-card">
                <span className="text-foreground font-medium text-sm">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
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
                {partner.name}
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
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="container-custom mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">100+</div>
            <div className="text-muted-foreground">合作企业</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">50+</div>
            <div className="text-muted-foreground">高校院所</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">30+</div>
            <div className="text-muted-foreground">政府单位</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">15年</div>
            <div className="text-muted-foreground">行业经验</div>
          </div>
        </div>
      </div>
    </section>
  );
};