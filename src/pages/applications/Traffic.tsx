import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Car, Eye, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Traffic = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  const features = [
    { 
      icon: Car, 
      title: isEn ? "Traffic Flow Monitoring" : "交通流量监控", 
      description: isEn ? "Real-time road traffic monitoring with data support for traffic management" : "实时监测道路交通流量，为交通管理提供数据支持" 
    },
    { 
      icon: Eye, 
      title: isEn ? "Rapid Accident Response" : "事故快速响应", 
      description: isEn ? "First to arrive at accident scenes, providing aerial support for rescue operations" : "第一时间抵达事故现场，提供空中视角支持救援" 
    },
    { 
      icon: Zap, 
      title: isEn ? "Road Inspection" : "道路巡检", 
      description: isEn ? "Efficient road condition inspection to detect pavement damage and safety hazards" : "高效巡检道路状况，及时发现路面损坏和安全隐患" 
    },
    { 
      icon: Shield, 
      title: isEn ? "Traffic Enforcement" : "交通执法", 
      description: isEn ? "Assist traffic enforcement, monitor violations, and maintain road order" : "辅助交通执法，监控违章行为，维护道路秩序" 
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={isEn ? "Traffic Industry Applications" : "交通行业应用"}
        description={isEn 
          ? "Feimai Technology drone traffic solutions for flow monitoring, accident response, and road inspection."
          : "飞迈科技无人机交通行业解决方案，应用于交通流量监控、事故响应、道路巡检等领域。"}
        keywords={isEn 
          ? "traffic drone,traffic monitoring,road inspection,traffic enforcement,smart transportation"
          : "交通无人机,交通监控,道路巡检,交通执法,智慧交通"}
        url="/applications/traffic"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[350px] md:h-[450px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80)" }}
          >
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl rounded-3xl bg-background/70 backdrop-blur-md border border-border p-6 md:p-8 shadow-card">
              <p className="text-accent font-medium mb-2">{isEn ? "Industry Applications" : "行业应用"}</p>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                {isEn ? "Traffic" : "交通"}
              </h1>
              <p className="text-lg text-muted-foreground">
                {isEn 
                  ? "Enhance road transportation monitoring capabilities through drone systems for smart traffic management"
                  : "通过无人机系统提高道路交通运输行业运行监测能力，实现智慧交通管理"}
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
              {isEn ? "Get Traffic Solutions" : "获取交通行业解决方案"}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Contact our professional team to learn more about traffic drone applications"
                : "联系我们的专业团队，了解更多交通行业无人机应用详情"}
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

export default Traffic;
