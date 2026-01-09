import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const getSolutionsData = (language: 'zh' | 'en') => [
  {
    title: language === 'zh' ? "电力巡检" : "Power Inspection",
    description: language === 'zh' 
      ? "无人机自动巡检输电线路，AI缺陷识别，提升巡检效率10倍以上"
      : "Automatic drone inspection of transmission lines, AI defect detection, 10x efficiency improvement",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
    link: "/applications/power-inspection",
    stats: language === 'zh' ? "效率提升10倍" : "10x Efficiency",
  },
  {
    title: language === 'zh' ? "物流配送" : "Logistics Delivery",
    description: language === 'zh' 
      ? "无人机末端配送，突破地形限制，实现高效低成本物流"
      : "Drone last-mile delivery, breaking terrain limits, achieving efficient low-cost logistics",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
    link: "/applications/logistics",
    stats: language === 'zh' ? "配送时效提升5倍" : "5x Faster Delivery",
  },
  {
    title: language === 'zh' ? "消防应急" : "Firefighting & Emergency",
    description: language === 'zh' 
      ? "无人机火情侦察、高层灭火、应急救援，守护生命安全"
      : "Drone fire reconnaissance, high-rise firefighting, emergency rescue, protecting lives",
    image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=600&q=80",
    link: "/applications/firefighting",
    stats: language === 'zh' ? "响应速度提升3倍" : "3x Faster Response",
  },
  {
    title: language === 'zh' ? "环境监测" : "Environmental Monitoring",
    description: language === 'zh' 
      ? "大气、水质、生态监测，为环境保护提供数据支撑"
      : "Air, water, ecology monitoring, providing data support for environmental protection",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    link: "/applications/environment",
    stats: language === 'zh' ? "监测覆盖率95%+" : "95%+ Coverage",
  },
];

export const SolutionsSection = () => {
  const { language } = useLanguage();
  const solutions = getSolutionsData(language);

  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container-custom">
        {/* Section Header with animation */}
        <div className="text-center mb-16 animate-slide-in-bottom">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-accent text-2xl font-black animate-bounce-subtle">&lt;</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              {language === 'zh' ? '行业解决方案' : 'Industry Solutions'}
            </h2>
            <span className="text-accent text-2xl font-black animate-bounce-subtle" style={{ animationDelay: '0.2s' }}>\&gt;</span>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-blur-in" style={{ animationDelay: '0.3s' }}>
            {language === 'zh' 
              ? '深耕行业场景，提供从硬件到软件、从单机到集群的完整解决方案'
              : 'Deep in industry scenarios, providing complete solutions from hardware to software, from single drone to swarm'}
          </p>
        </div>

        {/* Solutions Grid with stagger animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <Link
              key={index}
              to={solution.link}
              className={`group relative h-[300px] rounded-2xl overflow-hidden hover-lift ${index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'}`}
              style={{ animationDelay: `${0.4 + index * 0.15}s` }}
            >
              <img
                src={solution.image}
                alt={solution.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent group-hover:from-primary/90 transition-all duration-500" />
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-block px-3 py-1 bg-accent/20 text-accent text-sm font-medium rounded-full mb-3 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 animate-glow-pulse">
                  {solution.stats}
                </div>
                <h3 className="text-2xl font-bold text-primary-foreground mb-2 group-hover:text-accent transition-colors duration-300 group-hover:translate-x-2">
                  {solution.title}
                </h3>
                <p className="text-primary-foreground/80 mb-4 line-clamp-2 group-hover:text-primary-foreground transition-colors duration-300">
                  {solution.description}
                </p>
                <div className="flex items-center text-accent text-sm font-medium">
                  {language === 'zh' ? '了解详情' : 'Learn More'}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-3 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link with animation */}
        <div className="text-center mt-12 animate-scale-in" style={{ animationDelay: '1s' }}>
          <Link
            to="/applications"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-orange-light transition-all duration-300 hover:scale-105 hover:shadow-glow group magnetic-btn"
          >
            {language === 'zh' ? '查看全部解决方案' : 'View All Solutions'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};
