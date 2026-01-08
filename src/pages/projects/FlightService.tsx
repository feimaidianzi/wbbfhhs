import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, Zap, Droplet, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const FlightService = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const services = [
    { icon: Camera, title: isEn ? "Aerial Mapping" : "航拍测绘", description: isEn ? "High-precision aerial & 3D modeling" : "高精度航拍与三维建模" },
    { icon: Zap, title: isEn ? "Power Inspection" : "电力巡检", description: isEn ? "Transmission line inspection" : "输电线路巡检服务" },
    { icon: Droplet, title: isEn ? "Agricultural Spraying" : "农业植保", description: isEn ? "Crop spraying services" : "农业喷洒作业服务" },
    { icon: Map, title: isEn ? "Emergency Rescue" : "应急救援", description: isEn ? "Search & rescue, cargo delivery" : "搜救与物资投送" },
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title={isEn ? "Flight Services" : "飞行服务"} 
        description={isEn ? "Feimai Technology professional drone flight operation services." : "飞迈科技专业无人机飞行作业服务。"} 
        keywords={isEn ? "drone flight service,aerial photography,power inspection,crop spraying" : "无人机飞行服务,航拍,电力巡检,植保"} 
        url="/projects/flight-service" 
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80)" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {isEn ? "Flight Services" : "飞行服务"}
              </h1>
              <p className="text-lg text-primary-foreground/90 mb-8">
                {isEn ? "Professional Flight Operations, Efficient Mission Completion" : "专业飞行作业，高效完成任务"}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {isEn ? "Book Service" : "预约服务"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((s, i) => (
                <div key={i} className="text-center p-6 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <s.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default FlightService;
