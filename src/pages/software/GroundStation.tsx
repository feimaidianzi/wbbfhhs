import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Monitor, Map, Radio, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const GroundStation = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  const features = [
    { 
      icon: Monitor, 
      title: isEn ? "Real-time Monitoring" : "实时监控", 
      description: isEn ? "Multi-drone real-time status monitoring and telemetry display" : "多机实时状态监控与遥测数据显示" 
    },
    { 
      icon: Map, 
      title: isEn ? "Route Planning" : "航线规划", 
      description: isEn ? "3D map route planning and mission editing" : "三维地图航线规划与任务编辑" 
    },
    { 
      icon: Radio, 
      title: isEn ? "Data Link" : "数据链路", 
      description: isEn ? "High-reliability data link communication management" : "高可靠数据链路通信管理" 
    },
    { 
      icon: Settings, 
      title: isEn ? "Parameter Configuration" : "参数配置", 
      description: isEn ? "Flight controller parameter configuration and firmware upgrade" : "飞控参数配置与固件升级" 
    },
  ];

  const capabilities = isEn ? [
    "Multi-drone simultaneous control",
    "3D route planning",
    "Real-time video transmission",
    "Flight data recording",
    "Emergency return control",
    "Terrain following flight",
  ] : [
    "多机同时控制",
    "三维航线规划",
    "实时视频传输",
    "飞行数据记录",
    "应急返航控制",
    "地形跟随飞行",
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={isEn ? "Drone Ground Station Software" : "无人机地面站软件"}
        description={isEn 
          ? "Feimai Technology drone ground station software for professional drone control, route planning, and data transmission."
          : "飞迈科技无人机地面站软件，提供专业的无人机控制、航线规划、数据传输功能。"}
        keywords={isEn 
          ? "ground station software,drone control,route planning,flight monitoring"
          : "地面站软件,无人机控制,航线规划,飞行监控"}
        url="/software/ground-station"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {isEn ? "Drone Ground Station Software" : "无人机地面站软件"}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                {isEn ? "Professional ground station control system for comprehensive flight management" : "专业级地面站控制系统，全方位飞行管理"}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {isEn ? "Free Download" : "免费下载"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {isEn ? "Software Features" : "软件功能"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6 bg-card rounded-xl shadow-card">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {isEn ? "Capabilities" : "功能特性"}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {isEn 
                    ? "Professional ground station control software designed for industrial drones, comprehensive and easy to operate."
                    : "专为工业级无人机设计的地面站控制软件，功能全面，操作便捷。"}
                </p>
                <ul className="space-y-4">
                  {capabilities.map((cap, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                  alt={isEn ? "Ground Station Interface" : "地面站界面"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {isEn ? "Download Professional Ground Station Software" : "下载专业地面站软件"}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Contact us to get software download link and license authorization"
                : "联系我们获取软件下载链接和使用授权"}
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                {isEn ? "Contact Us" : "联系我们"}
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

export default GroundStation;
