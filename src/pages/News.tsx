import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { SEO, createArticleStructuredData } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const News = () => {
  const { language } = useLanguage();
  
  const categories = language === 'zh' 
    ? ["全部", "公司新闻", "行业动态", "产品资讯", "技术分享"]
    : ["All", "Company News", "Industry Trends", "Product Updates", "Tech Insights"];

  const newsData = language === 'zh' ? [
    {
      title: "无人机源头厂家 - 怎么选？一篇讲透工厂直供的软文攻略",
      date: "2025-12-23",
      category: "行业动态",
      excerpt: "在无人机行业越来越卷的今天，很多采购商开始寻找源头厂家合作...",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    },
    {
      title: "无人机定制 - 未来产业智能化升级的关键入口",
      date: "2025-12-05",
      category: "行业动态",
      excerpt: "在全球制造业智能化转型的浪潮中，无人机正成为各行业升级的关键...",
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80",
    },
    {
      title: "飞迈科技 - 打造全球领先的行业无人机与智能化解决方案供应商",
      date: "2025-12-03",
      category: "公司新闻",
      excerpt: "在无人机深度融入城市管理、农业升级、电力巡检的今天...",
      image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
    },
    {
      title: "无人机定制 - 从源头研发到系统交付的一站式解决方案",
      date: "2025-12-02",
      category: "产品资讯",
      excerpt: "当下，大量行业正经历数字化转型：能源、电力、测绘...",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
    },
    {
      title: "无人机定制 - 企业数字化转型的新引擎",
      date: "2025-12-02",
      category: "行业动态",
      excerpt: "在无人机行业高速发展的当下，标准化产品已难以满足...",
      image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
    },
    {
      title: "无人机源头厂家 - 行业首选的生产力工具",
      date: "2025-11-28",
      category: "行业动态",
      excerpt: "在数字化与智能化迅速发展的今天，无人机已成为...",
      image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=600&q=80",
    },
    {
      title: "飞迈科技新品发布：X1200多旋翼无人机正式上市",
      date: "2025-11-20",
      category: "产品资讯",
      excerpt: "飞迈科技最新研发的X1200大型多旋翼无人机正式发布...",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    },
    {
      title: "飞控系统开发指南：从入门到精通",
      date: "2025-11-15",
      category: "技术分享",
      excerpt: "本文详细介绍无人机飞控系统的开发流程和关键技术...",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    },
    {
      title: "飞迈科技参加2025年深圳无人机展览会",
      date: "2025-11-10",
      category: "公司新闻",
      excerpt: "飞迈科技携全系列产品亮相2025年深圳国际无人机展...",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    },
  ] : [
    {
      title: "Drone Manufacturer Selection - A Complete Guide to Factory Direct Supply",
      date: "2025-12-23",
      category: "Industry Trends",
      excerpt: "In today's competitive drone industry, many buyers are seeking direct factory partnerships...",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    },
    {
      title: "Drone Customization - Key to Industrial Intelligent Upgrade",
      date: "2025-12-05",
      category: "Industry Trends",
      excerpt: "In the wave of global manufacturing intelligent transformation, drones are becoming key...",
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80",
    },
    {
      title: "Feimai Technology - Building World-Leading Industrial Drone Solutions",
      date: "2025-12-03",
      category: "Company News",
      excerpt: "As drones deeply integrate into urban management, agricultural upgrades, power inspection...",
      image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
    },
    {
      title: "Drone Customization - One-Stop Solution from R&D to Delivery",
      date: "2025-12-02",
      category: "Product Updates",
      excerpt: "Many industries are undergoing digital transformation: energy, power, surveying...",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
    },
    {
      title: "Drone Customization - New Engine for Enterprise Digital Transformation",
      date: "2025-12-02",
      category: "Industry Trends",
      excerpt: "In the rapid development of the drone industry, standardized products can no longer meet...",
      image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
    },
    {
      title: "Drone Factory - Industry's Preferred Productivity Tool",
      date: "2025-11-28",
      category: "Industry Trends",
      excerpt: "In the era of rapid digitalization and intelligence, drones have become...",
      image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=600&q=80",
    },
    {
      title: "Feimai Tech New Product Launch: X1200 Multi-Rotor Drone",
      date: "2025-11-20",
      category: "Product Updates",
      excerpt: "Feimai's newly developed X1200 large multi-rotor drone is officially released...",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    },
    {
      title: "Flight Control System Development Guide: From Beginner to Expert",
      date: "2025-11-15",
      category: "Tech Insights",
      excerpt: "This article details the drone flight control system development process and key technologies...",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    },
    {
      title: "Feimai Technology at 2025 Shenzhen Drone Exhibition",
      date: "2025-11-10",
      category: "Company News",
      excerpt: "Feimai Technology showcased full product lineup at 2025 Shenzhen International Drone Exhibition...",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    },
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredNews = activeCategory === categories[0]
    ? newsData 
    : newsData.filter(n => n.category === activeCategory);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const currentNews = filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={language === 'zh' ? "新闻中心" : "News Center"}
        description={language === 'zh' 
          ? "飞迈科技新闻中心，获取最新无人机行业资讯、公司新闻、产品发布和技术分享。"
          : "Feimai Technology News Center. Get the latest drone industry news, company updates, product releases and technical insights."}
        keywords={language === 'zh' 
          ? "无人机新闻,飞迈科技新闻,无人机行业资讯,无人机技术分享"
          : "drone news,Feimai technology news,drone industry updates,drone technical insights"}
        url="/news"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[250px] md:h-[300px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {language === 'zh' ? "新闻中心" : "News Center"}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90">
                {language === 'zh' ? "获取最前沿的无人机行业资讯" : "Get the Latest Drone Industry Updates"}
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 bg-secondary border-b border-border">
          <div className="container-custom">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-accent text-accent-foreground"
                      : "bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-12 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentNews.map((news, index) => (
                <article
                  key={index}
                  className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {news.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {news.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-card-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {news.excerpt}
                    </p>
                    <Button variant="ghost" className="text-accent hover:text-orange-light p-0">
                      {language === 'zh' ? "阅读更多" : "Read More"}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-card shadow-sm disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium ${
                      currentPage === i + 1
                        ? "bg-accent text-accent-foreground"
                        : "bg-card text-foreground hover:bg-accent/10"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-card shadow-sm disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default News;