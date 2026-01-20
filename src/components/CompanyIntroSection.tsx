import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Headphones, Truck, Settings, ArrowRight, Cpu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const getAdvantagesData = (language: 'zh' | 'en') => [
  {
    icon: CheckCircle,
    title: language === 'zh' ? "产品矩阵完整" : "Complete Product Matrix",
    description: language === 'zh' 
      ? "机场、系留、物流、多旋翼全覆盖，一站式采购无人机核心配件。"
      : "Full coverage of airports, tethered, logistics, multi-rotor. One-stop procurement for drone core accessories.",
  },
  {
    icon: Headphones,
    title: language === 'zh' ? "技术响应迅速" : "Rapid Technical Response",
    description: language === 'zh' 
      ? "工程师团队7×24在线，选型、调试、故障排查一对一支持。"
      : "Engineering team online 24/7. One-on-one support for selection, debugging, and troubleshooting.",
  },
  {
    icon: Truck,
    title: language === 'zh' ? "供应链保障" : "Supply Chain Guarantee",
    description: language === 'zh' 
      ? "核心元器件自主可控，备货充足，紧急订单48小时内发货。"
      : "Core components self-controlled, fully stocked. Emergency orders shipped within 48 hours.",
  },
  {
    icon: Settings,
    title: language === 'zh' ? "深度定制能力" : "Deep Customization",
    description: language === 'zh' 
      ? "从接口协议到外观结构，从软件算法到系统集成，灵活定制。"
      : "From interface protocols to appearance, from software algorithms to system integration.",
  },
];

export const CompanyIntroSection = () => {
  const { language } = useLanguage();
  const advantages = getAdvantagesData(language);

  return (
    <section className="py-20 md:py-28 bg-secondary relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container-custom relative">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden glass-card border border-accent/20 group">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" 
                alt={language === 'zh' ? "长凌科技生产线" : "CANI Production Line"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 glass-card rounded-xl border border-accent/30 p-5 hidden md:block shadow-neon">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-black text-accent">200+</div>
                  <div className="text-xs text-muted-foreground">
                    {language === 'zh' ? '产品型号' : 'Products'}
                  </div>
                </div>
                <div className="w-px h-10 bg-accent/30" />
                <div className="text-center">
                  <div className="text-2xl font-black text-accent">10+</div>
                  <div className="text-xs text-muted-foreground">
                    {language === 'zh' ? '年经验' : 'Years'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tech decoration */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border border-accent/30 rounded-lg hidden lg:flex items-center justify-center">
              <Cpu className="w-6 h-6 text-accent/50" />
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-accent rounded-full" />
              <h2 className="text-3xl md:text-4xl font-black text-gradient">
                {language === 'zh' ? '为什么选择长凌科技？' : 'Why Choose CANI?'}
              </h2>
            </div>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {language === 'zh' 
                ? '我们不只是卖配件，而是提供整套飞行解决方案。从产品选型到系统集成，从技术培训到售后保障，全程陪伴您的无人机项目落地。'
                : 'We don\'t just sell parts—we deliver complete flight solutions. From product selection to system integration, from technical training to after-sales support, we accompany your drone project from start to finish.'}
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {language === 'zh' 
                ? '10年行业深耕，服务电力、物流、消防等500+企业客户，积累了丰富的实战经验。'
                : '10 years deep in the industry, serving 500+ enterprise clients in power, logistics, firefighting, with rich practical experience.'}
            </p>

            <Link to="/about">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-semibold shadow-neon hover:shadow-neon-intense transition-all duration-300 hover:scale-105 group">
                {language === 'zh' ? '了解更多' : 'Learn More'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, index) => (
            <div 
              key={index} 
              className="glass-card rounded-xl p-6 border border-accent/10 hover:border-accent/40 transition-all duration-500 hover:-translate-y-2 group"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:shadow-neon transition-all duration-300">
                <item.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
