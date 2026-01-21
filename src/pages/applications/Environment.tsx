import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Eye, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Environment = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  const features = [
    { 
      icon: Leaf, 
      title: isEn ? "Environmental Monitoring" : "环境监测", 
      description: isEn ? "Comprehensive monitoring of air, water, and soil environments" : "对大气、水体、土壤等进行全方位环境监测" 
    },
    { 
      icon: Eye, 
      title: isEn ? "Pollution Source Detection" : "污染源排查", 
      description: isEn ? "Quickly locate pollution sources with precise data for environmental management" : "快速定位污染源，为环境治理提供精准数据" 
    },
    { 
      icon: Zap, 
      title: isEn ? "Ecological Patrol" : "生态巡护", 
      description: isEn ? "Regular ecological patrols of nature reserves, forests and grasslands" : "对自然保护区、森林草原进行定期生态巡护" 
    },
    { 
      icon: Shield, 
      title: isEn ? "Environmental Enforcement" : "环境执法", 
      description: isEn ? "Assist environmental agencies in law enforcement and evidence collection" : "辅助环保部门进行环境执法和违法取证" 
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={isEn ? "Environmental Protection Applications" : "环保行业应用"}
        description={isEn 
          ? "Feimai Technology drone environmental solutions for monitoring, pollution detection, and ecological patrol."
          : "飞迈科技无人机环保行业解决方案，应用于环境监测、污染源排查、生态巡护等领域。"}
        keywords={isEn 
          ? "environmental drone,environmental monitoring,pollution detection,ecological patrol,environmental enforcement"
          : "环保无人机,环境监测,污染源排查,生态巡护,环境执法"}
        url="/applications/environment"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[350px] md:h-[450px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-slate-900/20" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <p className="text-accent font-medium mb-2">{isEn ? "Industry Applications" : "行业应用"}</p>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {isEn ? "Environment" : "环保"}
              </h1>
              <p className="text-lg text-primary-foreground/90">
                {isEn 
                  ? "Drone remote sensing systems offer low cost, high safety, and strong mobility, widely used in environmental protection"
                  : "无人机遥感系统具有成本低、安全性高、机动性强的特点，广泛应用于环境保护领域"}
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
              {isEn ? "Get Environmental Solutions" : "获取环保行业解决方案"}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Contact our professional team to learn more about environmental drone applications"
                : "联系我们的专业团队，了解更多环保行业无人机应用详情"}
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

export default Environment;
