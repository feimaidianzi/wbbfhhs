import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Droplets, Shield, Zap, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Water = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  const features = [
    { 
      icon: Droplets, 
      title: isEn ? "River Inspection" : "河道巡检", 
      description: isEn ? "Rapid coverage of entire river systems, real-time water quality and levee monitoring" : "无人机快速覆盖河道全线，实时监测水质和堤坝状况" 
    },
    { 
      icon: Shield, 
      title: isEn ? "Reservoir Monitoring" : "水库监测", 
      description: isEn ? "Regular inspection of reservoir dams to detect safety hazards promptly" : "对水库大坝进行定期巡检，及时发现安全隐患" 
    },
    { 
      icon: Zap, 
      title: isEn ? "Flood Control" : "防汛抗旱", 
      description: isEn ? "Real-time water level monitoring during flood season for decision support" : "汛期实时监测水位变化，为防汛决策提供数据支持" 
    },
    { 
      icon: Eye, 
      title: isEn ? "Water Resource Survey" : "水资源调查", 
      description: isEn ? "Aerial mapping of water areas and water resource distribution surveys" : "航拍测绘水域面积，调查水资源分布情况" 
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={isEn ? "Water Conservancy Applications" : "水利行业应用"}
        description={isEn 
          ? "Feimai Technology drone water conservancy solutions for river inspection, reservoir monitoring, and flood control."
          : "飞迈科技无人机水利行业解决方案，应用于河道巡检、水库监测、防汛抗旱等领域。"}
        keywords={isEn 
          ? "water conservancy drone,river inspection,reservoir monitoring,flood control drone,water resource survey"
          : "水利无人机,河道巡检,水库监测,防汛无人机,水资源调查"}
        url="/applications/water"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero */}
        <section className="relative h-[350px] md:h-[450px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?w=1920&q=80)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <p className="text-accent font-medium mb-2">{isEn ? "Industry Applications" : "行业应用"}</p>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {isEn ? "Water Conservancy" : "水利"}
              </h1>
              <p className="text-lg text-primary-foreground/90">
                {isEn 
                  ? "Apply drone technology for river inspection, reservoir monitoring, flood control, and provide technical support for water conservancy development"
                  : "应用无人机技术进行河道巡检、水库监测、防汛抗旱等工作，为水利改革发展提供科技支撑"}
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
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

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {isEn ? "Get Water Conservancy Solutions" : "获取水利行业解决方案"}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Contact our professional team to learn more about water conservancy drone applications"
                : "联系我们的专业团队，了解更多水利行业无人机应用详情"}
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

export default Water;
