import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const NewsSection = () => {
  const { language } = useLanguage();

  const news = language === 'zh' ? [
    {
      title: "飞迈科技发布新一代系留无人机系统",
      date: "2025-12-23",
      excerpt: "新系统可实现24小时不间断作业，升空高度达350米...",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80",
    },
    {
      title: "工业无人机定制服务全面升级",
      date: "2025-12-15",
      excerpt: "飞迈科技推出全新定制服务体系，覆盖机场、集群、软件、挂载四大领域...",
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=400&q=80",
    },
    {
      title: "物流无人机助力偏远地区配送",
      date: "2025-12-08",
      excerpt: "飞迈物流无人机在山区实现常态化配送，日均配送量超300单...",
      image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400&q=80",
    },
  ] : [
    {
      title: "Feimai Technology Releases New Generation Tethered Drone System",
      date: "2025-12-23",
      excerpt: "The new system enables 24-hour uninterrupted operation with an altitude of 350 meters...",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80",
    },
    {
      title: "Industrial Drone Customization Service Fully Upgraded",
      date: "2025-12-15",
      excerpt: "Feimai Technology launches a new customization service system covering airports, swarms, software, and payloads...",
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=400&q=80",
    },
    {
      title: "Logistics Drones Enable Remote Area Delivery",
      date: "2025-12-08",
      excerpt: "Feimai logistics drones achieve routine delivery in mountainous areas, with daily delivery exceeding 300 orders...",
      image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400&q=80",
    },
  ];

  return (
    <section id="news" className="py-20 md:py-28 bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-accent text-2xl font-black">&lt;</span>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">
                {language === 'zh' ? "新闻中心" : "News Center"}
              </h2>
              <span className="text-accent text-2xl font-black">\&gt;</span>
            </div>
            <p className="text-muted-foreground text-lg">
              {language === 'zh' ? "获取最前沿的无人机行业资讯" : "Get the Latest Drone Industry Updates"}
            </p>
          </div>
          <Link 
            to="/news"
            className="inline-flex items-center gap-2 text-accent hover:text-orange-light font-semibold text-lg group"
          >
            {language === 'zh' ? "查看全部新闻" : "View All News"}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <article
              key={index}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-lg font-bold text-card-foreground mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground line-clamp-2 mb-4">
                  {item.excerpt}
                </p>
                <Link
                  to="/news"
                  className="inline-flex items-center text-accent hover:text-orange-light font-semibold group/link"
                >
                  {language === 'zh' ? "阅读更多" : "Read More"}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};