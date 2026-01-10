import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Leaf, Wind, Droplet, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const EnvironmentSystem = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const features = [
    { icon: Wind, title: isEn ? "Air Monitoring" : "大气监测", description: isEn ? "Real-time air quality monitoring and alerts" : "空气质量实时监测与预警" },
    { icon: Droplet, title: isEn ? "Water Monitoring" : "水质监测", description: isEn ? "Water pollution monitoring and source tracing" : "水体污染监测与溯源分析" },
    { icon: Leaf, title: isEn ? "Ecological Monitoring" : "生态监测", description: isEn ? "Vegetation coverage and ecological change monitoring" : "植被覆盖与生态变化监测" },
    { icon: BarChart, title: isEn ? "Data Analysis" : "数据分析", description: isEn ? "Environmental data analysis and trend prediction" : "环境数据分析与趋势预测" },
  ];

  const applications = isEn 
    ? [
        "Industrial park environmental monitoring",
        "River and lake water quality monitoring",
        "Forest and grassland ecological monitoring",
        "Urban air quality monitoring",
        "Discharge outlet inspection",
        "Nature reserve patrol",
      ]
    : [
        "工业园区环境监测",
        "河流湖泊水质监测",
        "森林草原生态监测",
        "城市空气质量监测",
        "排污口监控巡查",
        "自然保护区巡护",
      ];

  return (
    <div className="min-h-screen">
      <SEO
        title={isEn ? "Environmental Management System" : "环保管理系统"}
        description={isEn 
          ? "CANI environmental management system providing intelligent solutions for environmental monitoring and protection."
          : "长凌科技环保管理系统，为环境监测与保护提供智能化解决方案。"}
        keywords={isEn 
          ? "environmental management,environmental monitoring,air monitoring,water monitoring,ecological monitoring"
          : "环保管理,环境监测,大气监测,水质监测,生态监测"}
        url="/software/environment-system"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {isEn ? "Environmental Management System" : "环保管理系统"}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                {isEn ? "Intelligent environmental monitoring, protecting our green waters and mountains" : "智能环境监测，守护绿水青山"}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {isEn ? "Learn More" : "了解更多"}
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

        {/* Applications */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
                  alt={isEn ? "Environmental Monitoring" : "环保监测"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">{isEn ? "Application Scenarios" : "应用场景"}</h2>
                <p className="text-muted-foreground mb-6">
                  {isEn 
                    ? "The system is suitable for various environmental monitoring and protection scenarios."
                    : "系统适用于多种环境监测与保护场景。"}
                </p>
                <ul className="space-y-4">
                  {applications.map((app, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {isEn ? "Smart Environmental Protection, Green Future" : "智能环保，绿色未来"}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {isEn ? "Contact us for environmental monitoring solutions" : "联系我们了解环保监测解决方案"}
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

export default EnvironmentSystem;
