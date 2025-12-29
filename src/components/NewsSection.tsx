import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const news = [
  {
    title: "无人机源头厂家 - 怎么选？一篇讲透工厂直供的软文攻略",
    date: "2025-12-23",
    excerpt: "在无人机行业越来越卷的今天，很多采购商开始...",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80",
  },
  {
    title: "无人机定制|未来产业智能化升级的关键入口",
    date: "2025-12-05",
    excerpt: "在全球制造业智能化转型的浪潮中，无人机正...",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=400&q=80",
  },
  {
    title: "翼飞智能|打造全球领先的行业无人机与智能化解决方案供应商",
    date: "2025-12-03",
    excerpt: "在无人机深度融入城市管理、农业升级、电力...",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400&q=80",
  },
  {
    title: "无人机定制|从源头研发到系统交付的一站式解决方案",
    date: "2025-12-02",
    excerpt: "当下，大量行业正经历数字化转型：能源、电...",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
  },
  {
    title: "无人机定制|企业数字化转型的新引擎-翼飞智能",
    date: "2025-12-02",
    excerpt: "在无人机行业高速发展的当下，标准化产品已...",
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=400&q=80",
  },
  {
    title: "无人机源头厂家|行业首选的生产力工具",
    date: "2025-11-28",
    excerpt: "在数字化与智能化迅速发展的今天，无人机已...",
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&q=80",
  },
];

export const NewsSection = () => {
  return (
    <section id="news" className="py-16 md:py-24 bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              新闻中心
            </h2>
            <p className="text-muted-foreground">获取最前沿的无人机资讯</p>
          </div>
          <Button variant="ghost" className="text-accent hover:text-orange-light group">
            更多新闻
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <article
              key={index}
              className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Calendar className="w-4 h-4" />
                  {item.date}
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {item.excerpt}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-accent hover:text-orange-light font-medium text-sm"
                >
                  阅读更多
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
