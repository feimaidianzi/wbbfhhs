import { Target, Award, Users, Globe, TrendingUp, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const getStatsData = (language: 'zh' | 'en') => [
  {
    value: "15+",
    label: language === 'zh' ? "年研发经验" : "Years R&D Experience",
    icon: Target
  }, {
    value: "200+",
    label: language === 'zh' ? "专利技术" : "Patents",
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
    title: language === 'zh' ? "技术领先" : "Technology Leadership",
    description: language === 'zh' 
      ? "自主研发飞控系统、智能算法，拥有完全自主知识产权"
      : "Self-developed flight control systems and intelligent algorithms with fully independent IP"
  }, {
    icon: TrendingUp,
    title: language === 'zh' ? "品质保障" : "Quality Assurance",
    description: language === 'zh' 
      ? "航空级材料工艺，严格质检流程，确保每一台无人机可靠稳定"
      : "Aviation-grade materials and strict quality control ensure every drone is reliable and stable"
  }, {
    icon: Users,
    title: language === 'zh' ? "专业服务" : "Professional Service",
    description: language === 'zh' 
      ? "7×24小时技术支持，全国服务网络，快速响应客户需求"
      : "24/7 technical support, nationwide service network, quick response to customer needs"
  }
];

export const WhyChooseUsSection = () => {
  const { language } = useLanguage();
  const stats = getStatsData(language);
  const advantages = getAdvantagesData(language);

  return (
    <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
      {/* Animated Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse" style={{ animationDelay: '1s' }} />
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-accent/40 rounded-full animate-float-particle"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative">
        {/* Section Header with animation */}
        <div className="text-center mb-16 animate-slide-in-bottom">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-accent text-2xl font-black animate-bounce-subtle">&lt;</span>
            <h2 className="text-3xl md:text-4xl font-black text-primary-foreground">
              {language === 'zh' ? "为什么选择飞迈" : "Why Choose FlyMind"}
            </h2>
            <span className="text-accent text-2xl font-black animate-bounce-subtle" style={{ animationDelay: '0.2s' }}>\&gt;</span>
          </div>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto animate-blur-in" style={{ animationDelay: '0.3s' }}>
            {language === 'zh' 
              ? "专注无人机研发制造15年，为各行业提供专业、可靠的无人机解决方案"
              : "15 years focused on drone R&D and manufacturing, providing professional and reliable drone solutions for all industries"}
          </p>
        </div>

        {/* Stats with counter animation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-6 bg-primary-foreground/10 rounded-2xl backdrop-blur-sm border border-primary-foreground/20 hover:bg-primary-foreground/15 hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg group animate-scale-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <stat.icon className="w-8 h-8 text-accent mx-auto mb-3 group-hover:scale-125 transition-transform duration-300 icon-bounce" />
              <div className="text-3xl md:text-4xl font-black text-primary-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-primary-foreground/70 text-sm group-hover:text-primary-foreground transition-colors duration-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Advantages with hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div 
              key={index} 
              className="p-8 bg-primary-foreground/5 rounded-2xl border border-primary-foreground/10 hover:border-accent/50 transition-all duration-500 group hover:-translate-y-3 hover:bg-primary-foreground/10 card-tilt animate-slide-in-bottom"
              style={{ animationDelay: `${0.5 + index * 0.2}s` }}
            >
              <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 animate-glow-pulse">
                <advantage.icon className="w-7 h-7 text-accent group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-primary-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                {advantage.title}
              </h3>
              <p className="text-primary-foreground/70 leading-relaxed group-hover:text-primary-foreground/90 transition-colors duration-300">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
