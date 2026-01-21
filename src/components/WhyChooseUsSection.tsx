import { Target, Award, Users, Globe, TrendingUp, Zap, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const getStatsData = (language: 'zh' | 'en') => [
  {
    value: "15+",
    label: language === 'zh' ? "年技术沉淀" : "Years Technology",
    icon: Target
  }, {
    value: "200+",
    label: language === 'zh' ? "核心专利" : "Core Patents",
    icon: Award
  }, {
    value: "500+",
    label: language === 'zh' ? "企业客户" : "Enterprise Clients",
    icon: Users
  }, {
    value: "30+",
    label: language === 'zh' ? "省市覆盖" : "Provinces Covered",
    icon: Globe
  }
];

const getAdvantagesData = (language: 'zh' | 'en') => [
  {
    icon: Zap,
    title: language === 'zh' ? "核心技术自主" : "Independent Core Tech",
    description: language === 'zh' 
      ? "飞控算法、图传协议、云台控制等核心技术完全自主研发，不受卡脖子"
      : "Flight control algorithms, video protocols, gimbal control—all independently developed"
  }, {
    icon: Shield,
    title: language === 'zh' ? "航空级品质" : "Aviation-grade Quality",
    description: language === 'zh' 
      ? "元器件选型严格，工艺标准对标军工，每批次全检出厂"
      : "Strict component selection, military-grade processes, 100% inspection before shipping"
  }, {
    icon: TrendingUp,
    title: language === 'zh' ? "实战经验丰富" : "Rich Practical Experience",
    description: language === 'zh' 
      ? "电力巡检、应急救援、物流配送等场景大规模验证，方案成熟可靠"
      : "Large-scale validation in power inspection, emergency rescue, logistics—mature and reliable solutions"
  }
];

export const WhyChooseUsSection = () => {
  const { language } = useLanguage();
  const stats = getStatsData(language);
  const advantages = getAdvantagesData(language);

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/40 rounded-full animate-float"
            style={{
              left: `${10 + i * 9}%`,
              top: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-accent" />
            <span className="text-accent text-sm tracking-widest uppercase font-medium">
              {language === 'zh' ? '核心优势' : 'CORE ADVANTAGES'}
            </span>
            <div className="w-8 h-px bg-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gradient mb-4">
            {language === 'zh' ? "为什么信赖长凌" : "Why Trust CANI"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {language === 'zh' 
              ? "15年专注无人机核心技术，从实验室到生产线，从研发到交付，每一步都精益求精"
              : "15 years focused on core drone technology. From lab to production line, from R&D to delivery—excellence at every step"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="glass-card text-center p-6 rounded-xl border border-accent/20 hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon group"
            >
              <stat.icon className="w-8 h-8 text-accent mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-3xl md:text-4xl font-black text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Advantages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <div 
              key={index} 
              className="bg-card/90 backdrop-blur-sm p-8 rounded-xl border border-border/50 hover:border-accent/40 transition-all duration-500 group hover:-translate-y-2 shadow-lg"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 group-hover:shadow-neon transition-all duration-300">
                <advantage.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                {advantage.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
