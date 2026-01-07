import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, MapPin, Users, BarChart, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const DroneManagement = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  const features = [
    { 
      icon: MapPin, 
      title: isEn ? "Real-time Tracking" : "实时定位", 
      description: isEn ? "Multi-drone real-time location monitoring and trajectory tracking" : "多机实时位置监控与轨迹追踪" 
    },
    { 
      icon: Users, 
      title: isEn ? "Personnel Management" : "人员管理", 
      description: isEn ? "Pilot qualification management and mission assignment" : "飞手资质管理与任务分配" 
    },
    { 
      icon: BarChart, 
      title: isEn ? "Data Analytics" : "数据统计", 
      description: isEn ? "Flight data statistics and analysis reports" : "飞行数据统计与分析报表" 
    },
    { 
      icon: Shield, 
      title: isEn ? "Safety Alerts" : "安全预警", 
      description: isEn ? "Geofencing and anomaly alert functions" : "电子围栏与异常告警功能" 
    },
  ];

  const modules = isEn ? [
    "Drone equipment management",
    "Flight mission scheduling",
    "Personnel permission management",
    "Flight data storage",
    "Maintenance records",
    "Asset statistics analysis",
  ] : [
    "无人机设备管理",
    "飞行任务调度",
    "人员权限管理",
    "飞行数据存储",
    "维护保养记录",
    "资产统计分析",
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={isEn ? "Drone Management Platform" : "无人机管理平台"}
        description={isEn 
          ? "Feimai Technology drone management platform for equipment management, mission scheduling, and data analytics."
          : "飞迈科技无人机管理平台，提供无人机设备管理、任务调度、数据分析等全方位管理功能。"}
        keywords={isEn 
          ? "drone management,equipment management,mission scheduling,flight data management"
          : "无人机管理,设备管理,任务调度,飞行数据管理"}
        url="/software/drone-management"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {isEn ? "Drone Management Platform" : "无人机管理平台"}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                {isEn ? "One-stop drone asset and operation management solution" : "一站式无人机资产与作业管理解决方案"}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {isEn ? "Request Trial" : "申请试用"}
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
              {isEn ? "Platform Features" : "平台功能"}
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

        {/* Modules */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {isEn ? "Functional Modules" : "功能模块"}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {isEn 
                    ? "The platform adopts modular design, flexibly configurable according to actual needs."
                    : "平台采用模块化设计，可根据实际需求灵活配置。"}
                </p>
                <ul className="space-y-4">
                  {modules.map((module, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{module}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                  alt={isEn ? "Management Platform Interface" : "管理平台界面"}
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
              {isEn ? "Start Managing Your Drones Efficiently" : "开始高效管理您的无人机"}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Contact us for platform demo and customized solutions"
                : "联系我们获取平台演示与定制方案"}
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

export default DroneManagement;
