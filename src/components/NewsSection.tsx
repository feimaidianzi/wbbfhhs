import { ArrowRight, Calendar, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export const NewsSection = () => {
  const { language } = useLanguage();

  const news = language === 'zh' ? [
    {
      title: "飞迈科技发布新一代系留无人机系统",
      date: "2025-12-23",
      excerpt: "新系统可实现24小时不间断作业，升空高度达350米...",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
      category: "产品发布"
    },
    {
      title: "工业无人机定制服务全面升级",
      date: "2025-12-15",
      excerpt: "飞迈科技推出全新定制服务体系，覆盖机场、集群、软件、挂载四大领域...",
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&q=80",
      category: "公司动态"
    },
    {
      title: "物流无人机助力偏远地区配送",
      date: "2025-12-08",
      excerpt: "飞迈物流无人机在山区实现常态化配送，日均配送量超300单...",
      image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&q=80",
      category: "行业应用"
    },
  ] : [
    {
      title: "Feimai Technology Releases New Generation Tethered Drone System",
      date: "2025-12-23",
      excerpt: "The new system enables 24-hour uninterrupted operation with an altitude of 350 meters...",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
      category: "Product Launch"
    },
    {
      title: "Industrial Drone Customization Service Fully Upgraded",
      date: "2025-12-15",
      excerpt: "Feimai Technology launches a new customization service system covering airports, swarms, software, and payloads...",
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&q=80",
      category: "Company News"
    },
    {
      title: "Logistics Drones Enable Remote Area Delivery",
      date: "2025-12-08",
      excerpt: "Feimai logistics drones achieve routine delivery in mountainous areas, with daily delivery exceeding 300 orders...",
      image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&q=80",
      category: "Industry Application"
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-accent font-medium mb-2">
              {language === 'zh' ? "新闻资讯" : "News & Updates"}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {language === 'zh' ? "了解最新动态" : "Stay Informed"}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link 
              to="/news"
              className="inline-flex items-center gap-2 text-foreground hover:text-accent font-medium group"
            >
              {language === 'zh' ? "查看全部" : "View All"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <Link to="/news" className="block">
                <div className="aspect-[16/10] overflow-hidden rounded-xl mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium px-2.5 py-1 bg-accent/10 text-accent rounded-full">
                      {item.category}
                    </span>
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                    {item.excerpt}
                  </p>
                  <span className="inline-flex items-center text-sm text-foreground font-medium group-hover:text-accent transition-colors">
                    {language === 'zh' ? "阅读更多" : "Read More"}
                    <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
