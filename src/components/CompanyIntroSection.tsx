import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Headphones, Truck, Settings, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const getAdvantagesData = (language: 'zh' | 'en') => [
  {
    icon: CheckCircle,
    title: language === 'zh' ? "强大产品组合" : "Strong Product Portfolio",
    description: language === 'zh' 
      ? "涵盖机场、系留、物流、多旋翼等全系列工业无人机产品，满足各行业需求。"
      : "Covering airport, tethered, logistics, multi-rotor and other industrial drone products for various industries.",
  },
  {
    icon: Headphones,
    title: language === 'zh' ? "专业技术支持" : "Professional Support",
    description: language === 'zh' 
      ? "资深无人机专家团队，提供选型咨询、技术培训、售后服务全方位支持。"
      : "Senior drone expert team providing consulting, training and after-sales support.",
  },
  {
    icon: Truck,
    title: language === 'zh' ? "快速交付响应" : "Fast Delivery",
    description: language === 'zh' 
      ? "完善的供应链体系，快速响应客户需求，缩短项目交付周期。"
      : "Complete supply chain system, quick response to customer needs, shortened delivery cycle.",
  },
  {
    icon: Settings,
    title: language === 'zh' ? "定制化解决方案" : "Customized Solutions",
    description: language === 'zh' 
      ? "提供机场定制、集群定制、软件定制、挂载定制等深度定制服务。"
      : "Providing airport, swarm, software, payload and other deep customization services.",
  },
];

export const CompanyIntroSection = () => {
  const { language, t } = useLanguage();
  const advantages = getAdvantagesData(language);

  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container-custom">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Image with animation */}
          <div className="relative animate-slide-in-left">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-card-hover group">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" 
                alt={language === 'zh' ? "飞迈科技无人机生产线" : "FlyMind Drone Production Line"}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            {/* Floating Stats Card with animation */}
            <div className="absolute -bottom-8 -right-8 bg-card rounded-2xl shadow-card-hover p-6 hidden md:block animate-float hover-lift hover-glow">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-accent">200+</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'zh' ? '产品型号' : 'Product Models'}
                  </div>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div className="text-center">
                  <div className="text-3xl font-black text-accent">10+</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'zh' ? '年行业经验' : 'Years Experience'}
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative circle */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-accent/30 rounded-full animate-spin-slow hidden lg:block" />
          </div>

          {/* Right - Content with animation */}
          <div className="animate-slide-in-right">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-accent text-2xl font-black animate-wave">&lt;</span>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">
                {language === 'zh' ? '为什么选择飞迈科技？' : 'Why Choose FlyMind?'}
              </h2>
              <span className="text-accent text-2xl font-black animate-wave" style={{ animationDelay: '0.5s' }}>\&gt;</span>
            </div>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 animate-blur-in" style={{ animationDelay: '0.2s' }}>
              {language === 'zh' 
                ? '飞迈科技致力于提供高品质的工业级无人机产品和解决方案。我们不仅提供标准化产品，更专注于为客户打造定制化解决方案，助力各行业数字化转型和智能化升级。'
                : 'FlyMind is committed to providing high-quality industrial drone products and solutions. We not only provide standardized products, but also focus on creating customized solutions for customers, helping industries with digital transformation and intelligent upgrading.'}
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8 animate-blur-in" style={{ animationDelay: '0.4s' }}>
              {language === 'zh' 
                ? '凭借多年的行业积累和技术沉淀，飞迈科技已成为众多企业和政府机构的首选合作伙伴。从产品选型到系统集成，从技术培训到售后服务，我们提供全生命周期的专业支持。'
                : 'With years of industry accumulation and technology precipitation, FlyMind has become the preferred partner of many enterprises and government agencies. From product selection to system integration, from technical training to after-sales service, we provide full lifecycle professional support.'}
            </p>

            <Link to="/about" className="inline-block animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-6 text-lg font-semibold shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105 group magnetic-btn">
                {language === 'zh' ? '了解更多关于我们' : 'Learn More About Us'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Advantages Grid with stagger animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, index) => (
            <div 
              key={index} 
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-3 border border-border/50 group card-tilt animate-slide-in-bottom hover-glow"
              style={{ animationDelay: `${0.8 + index * 0.15}s` }}
            >
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <item.icon className="w-7 h-7 text-accent icon-bounce" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-3 group-hover:text-accent transition-colors duration-300">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground transition-colors duration-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
