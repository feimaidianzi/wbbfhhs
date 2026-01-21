import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Eye, Zap, Radio } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Emergency = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  const features = [
    { 
      icon: Shield, 
      title: isEn ? "Emergency Rescue" : "应急救援", 
      description: isEn ? "Rapid response to emergencies, providing aerial search and supply delivery" : "快速响应突发事件，提供空中搜救和物资投送" 
    },
    { 
      icon: Eye, 
      title: isEn ? "Site Monitoring" : "现场监控", 
      description: isEn ? "Real-time transmission of on-site footage for command decision-making" : "实时传输现场画面，为指挥决策提供第一手资料" 
    },
    { 
      icon: Radio, 
      title: isEn ? "Communication Relay" : "通信中继", 
      description: isEn ? "Establish temporary communication networks for emergency connectivity" : "搭建临时通信网络，保障应急通信畅通" 
    },
    { 
      icon: Zap, 
      title: isEn ? "Disaster Assessment" : "灾情评估", 
      description: isEn ? "Quickly capture disaster area imagery to assess damage levels" : "快速获取灾区影像，评估灾情损失程度" 
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={isEn ? "Emergency Rescue Applications" : "应急救援应用"}
        description={isEn 
          ? "CANI Technology drone emergency rescue solutions for rescue operations, site monitoring, communication relay, and more."
          : "长凌科技无人机应急救援解决方案，应用于应急救援、现场监控、通信中继等领域。"}
        keywords={isEn 
          ? "emergency drone,rescue drone,communication relay,disaster assessment,emergency response"
          : "应急无人机,救援无人机,通信中继,灾情评估,应急响应"}
        url="/applications/emergency"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[350px] md:h-[450px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=1920&q=80)" }}
          >
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl rounded-3xl bg-black/70 border border-white/20 p-6 md:p-8 shadow-lg">
              <p className="text-cyan-400 font-medium mb-2">{isEn ? "Industry Applications" : "行业应用"}</p>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {isEn ? "Emergency" : "应急"}
              </h1>
              <p className="text-lg text-white/80">
                {isEn 
                  ? "In densely populated and complex security monitoring scenarios, drones provide aerial perspective and communication relay support for emergency rescue"
                  : "在人员密集、场景复杂的安全监控领域，无人机为应急救援提供空中视角和通信中继支持"}
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
              {isEn ? "Get Emergency Rescue Solutions" : "获取应急救援解决方案"}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Contact our professional team to learn more about emergency rescue drone applications"
                : "联系我们的专业团队，了解更多应急救援无人机应用详情"}
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

export default Emergency;
