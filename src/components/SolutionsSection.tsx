import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const getSolutionsData = (language: 'zh' | 'en') => [
  {
    title: language === 'zh' ? "电力巡检" : "Power Inspection",
    description: language === 'zh' 
      ? "自主航线规划，AI缺陷识别，将巡检效率提升10倍，人工成本降低80%"
      : "Autonomous route planning, AI defect detection, 10x efficiency improvement, 80% cost reduction",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
    link: "/applications/power-inspection",
    stats: language === 'zh' ? "效率×10" : "10x Efficiency",
  },
  {
    title: language === 'zh' ? "物流配送" : "Logistics Delivery",
    description: language === 'zh' 
      ? "突破地形限制，山区、海岛、应急场景即时送达，末端配送革命"
      : "Breaking terrain limits, instant delivery to mountains, islands, emergency scenarios",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
    link: "/applications/logistics",
    stats: language === 'zh' ? "时效×5" : "5x Faster",
  },
  {
    title: language === 'zh' ? "消防应急" : "Firefighting & Emergency",
    description: language === 'zh' 
      ? "火情侦察、高层灭火、人员搜救，分秒必争时的空中力量"
      : "Fire reconnaissance, high-rise firefighting, search and rescue—aerial force when every second counts",
    image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=600&q=80",
    link: "/applications/firefighting",
    stats: language === 'zh' ? "响应×3" : "3x Response",
  },
  {
    title: language === 'zh' ? "环境监测" : "Environmental Monitoring",
    description: language === 'zh' 
      ? "大气、水质、生态全方位监测，为环保决策提供精准数据支撑"
      : "Comprehensive air, water, ecology monitoring—precise data support for environmental decisions",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    link: "/applications/environment",
    stats: language === 'zh' ? "覆盖95%+" : "95%+ Coverage",
  },
];

export const SolutionsSection = () => {
  const { baseLang: language } = useLanguage();
  const solutions = getSolutionsData(language);

  return (
    <section className="py-20 md:py-28 bg-secondary relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dots opacity-20" />
      
      <div className="container-custom relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-accent" />
            <span className="text-accent text-sm tracking-widest uppercase font-medium">
              {language === 'zh' ? '行业方案' : 'INDUSTRY SOLUTIONS'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gradient mb-4">
            {language === 'zh' ? '场景化解决方案' : 'Scenario-based Solutions'}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {language === 'zh' 
              ? '不只提供产品，更提供从硬件到软件、从单机到集群的完整行业方案'
              : 'Not just products, but complete industry solutions from hardware to software, from single drone to swarm'}
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((solution, index) => (
            <Link
              key={index}
              to={solution.link}
              className="group relative h-[280px] md:h-[320px] rounded-xl overflow-hidden glass-card border border-accent/10 hover:border-accent/40 transition-all duration-500"
            >
              <img
                src={solution.image}
                alt={solution.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* No full-image foggy overlay */}
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="inline-block px-3 py-1 bg-black/70 border border-white/20 text-white text-sm font-medium rounded-full mb-3">
                  {solution.stats}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 transition-colors duration-300">
                  {solution.title}
                </h3>
                <p className="text-white/70 mb-4 line-clamp-2 text-sm md:text-base">
                  {solution.description}
                </p>
                <div className="flex items-center text-white text-sm font-medium">
                  {language === 'zh' ? '了解详情' : 'Learn More'}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link
            to="/applications"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg shadow-neon hover:shadow-neon-intense transition-all duration-300 hover:scale-105 group"
          >
            {language === 'zh' ? '查看全部方案' : 'View All Solutions'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};