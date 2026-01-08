import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sun, BarChart, Database, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const PVSystem = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const features = [
    { icon: Sun, title: isEn ? "Smart Inspection" : "智能巡检", description: isEn ? "Automated PV plant inspection operations" : "自动化光伏电站巡检作业" },
    { icon: BarChart, title: isEn ? "Efficiency Analysis" : "效能分析", description: isEn ? "Power generation efficiency analysis and optimization" : "发电效率分析与优化建议" },
    { icon: Database, title: isEn ? "Data Management" : "数据管理", description: isEn ? "Inspection data storage and historical comparison" : "巡检数据存储与历史对比" },
    { icon: Settings, title: isEn ? "O&M Management" : "运维管理", description: isEn ? "Equipment maintenance and fault handling workflow" : "设备维护与故障处理流程" },
  ];

  const modules = isEn 
    ? [
        "Inspection task management",
        "Defect ledger management",
        "Power generation efficiency analysis",
        "O&M work order system",
        "Equipment asset management",
        "Data report export",
      ]
    : [
        "巡检任务管理",
        "缺陷台账管理",
        "发电效率分析",
        "运维工单系统",
        "设备资产管理",
        "数据报表导出",
      ];

  return (
    <div className="min-h-screen">
      <SEO
        title={isEn ? "PV Inspection System" : "光伏巡检系统"}
        description={isEn 
          ? "EFUAV PV inspection system providing full-process inspection and O&M management for solar plants."
          : "飞迈科技光伏巡检系统，为光伏电站提供全流程巡检运维管理解决方案。"}
        keywords={isEn 
          ? "PV inspection system,solar O&M,solar plant management,PV data analysis"
          : "光伏巡检系统,光伏运维,光伏电站管理,光伏数据分析"}
        url="/software/pv-system"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {isEn ? "PV Inspection System" : "光伏巡检系统"}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                {isEn ? "Full-process PV plant inspection and O&M management platform" : "全流程光伏电站巡检运维管理平台"}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {isEn ? "Learn More" : "了解详情"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{isEn ? "System Features" : "系统功能"}</h2>
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
                <h2 className="text-2xl md:text-3xl font-bold mb-6">{isEn ? "Function Modules" : "功能模块"}</h2>
                <p className="text-muted-foreground mb-6">
                  {isEn 
                    ? "The system covers the entire PV plant inspection and O&M process, improving operational efficiency."
                    : "系统覆盖光伏电站巡检运维全流程，提升运维效率。"}
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
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"
                  alt={isEn ? "PV System" : "光伏系统"}
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
              {isEn ? "Optimize PV Plant O&M Management" : "优化光伏电站运维管理"}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {isEn ? "Contact us for customized solutions" : "联系我们获取定制化解决方案"}
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

export default PVSystem;
