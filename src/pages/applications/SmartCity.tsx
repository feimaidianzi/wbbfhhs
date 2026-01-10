import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Eye, Zap, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const SmartCity = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  const features = [
    { 
      icon: Building, 
      title: isEn ? "Urban Management" : "城市管理", 
      description: isEn ? "Inspect and monitor urban infrastructure to improve city management efficiency" : "对城市基础设施进行巡检监测，提升城市管理效率" 
    },
    { 
      icon: Map, 
      title: isEn ? "Planning & Surveying" : "规划测绘", 
      description: isEn ? "Obtain high-precision 3D urban data for urban planning support" : "获取高精度城市三维数据，为城市规划提供支持" 
    },
    { 
      icon: Zap, 
      title: isEn ? "Emergency Command" : "应急指挥", 
      description: isEn ? "Rapid response to emergencies with aerial command and communication relay" : "突发事件快速响应，提供空中指挥和通信中继" 
    },
    { 
      icon: Eye, 
      title: isEn ? "Smart Monitoring" : "智能监控", 
      description: isEn ? "Comprehensive urban security monitoring for public safety" : "全方位城市安防监控，保障城市公共安全" 
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={isEn ? "Smart City Applications" : "智慧城市应用"}
        description={isEn 
          ? "CANI Technology drone smart city solutions for urban management, planning, and emergency command."
          : "长凌科技无人机智慧城市解决方案，应用于城市管理、规划测绘、应急指挥等领域。"}
        keywords={isEn 
          ? "smart city drone,urban management,planning surveying,emergency command,city monitoring"
          : "智慧城市无人机,城市管理,规划测绘,应急指挥,城市监控"}
        url="/applications/smart-city"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[350px] md:h-[450px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&q=80)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <p className="text-accent font-medium mb-2">{isEn ? "Industry Applications" : "行业应用"}</p>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {isEn ? "Smart City" : "智慧城市"}
              </h1>
              <p className="text-lg text-primary-foreground/90">
                {isEn 
                  ? "In the era of digital and intelligent cities, drones play important roles in urban management, planning, and emergency command"
                  : "数字地球和智能地球时代，无人机在城市管理、规划测绘、应急指挥等方面发挥重要作用"}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {isEn ? "Application Scenarios" : "应用场景"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-card text-center">
                  <feature.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {isEn ? "Get Smart City Solutions" : "获取智慧城市解决方案"}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Contact our professional team to learn more about smart city drone applications"
                : "联系我们的专业团队，了解更多智慧城市无人机应用详情"}
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                {isEn ? "Contact Us" : "立即咨询"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default SmartCity;
