import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Headphones, Truck, Settings, ArrowRight } from "lucide-react";

const advantages = [
  {
    icon: CheckCircle,
    title: "强大产品组合",
    description: "涵盖机场、系留、物流、多旋翼等全系列工业无人机产品，满足各行业需求。",
  },
  {
    icon: Headphones,
    title: "专业技术支持",
    description: "资深无人机专家团队，提供选型咨询、技术培训、售后服务全方位支持。",
  },
  {
    icon: Truck,
    title: "快速交付响应",
    description: "完善的供应链体系，快速响应客户需求，缩短项目交付周期。",
  },
  {
    icon: Settings,
    title: "定制化解决方案",
    description: "提供机场定制、集群定制、软件定制、挂载定制等深度定制服务。",
  },
];

export const CompanyIntroSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-custom">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-card-hover">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" 
                alt="长凌电子无人机生产线" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 -right-8 bg-card rounded-2xl shadow-card-hover p-6 hidden md:block">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-accent">200+</div>
                  <div className="text-sm text-muted-foreground">产品型号</div>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div className="text-center">
                  <div className="text-3xl font-black text-accent">10+</div>
                  <div className="text-sm text-muted-foreground">年行业经验</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-accent text-2xl font-black">&lt;</span>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">
                为什么选择长凌电子？
              </h2>
              <span className="text-accent text-2xl font-black">\&gt;</span>
            </div>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              长凌电子致力于提供高品质的工业级无人机产品和解决方案。我们不仅提供标准化产品，更专注于为客户打造定制化解决方案，助力各行业数字化转型和智能化升级。
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              凭借多年的行业积累和技术沉淀，长凌电子已成为众多企业和政府机构的首选合作伙伴。从产品选型到系统集成，从技术培训到售后服务，我们提供全生命周期的专业支持。
            </p>

            <Link to="/about">
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-6 text-lg font-semibold shadow-button">
                了解更多关于我们
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, index) => (
            <div 
              key={index} 
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border/50"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-5">
                <item.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};