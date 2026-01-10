import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wifi, Eye, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const FiveG = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  const features = [
    { 
      icon: Wifi, 
      title: isEn ? "5G Remote Control" : "5G远程控制", 
      description: isEn ? "Ultra-long range drone control via 5G network" : "通过5G网络实现超远距离无人机控制" 
    },
    { 
      icon: Eye, 
      title: isEn ? "HD Real-time Streaming" : "高清实时回传", 
      description: isEn ? "5G high bandwidth supports 4K/8K video real-time transmission" : "5G大带宽支持4K/8K视频实时传输" 
    },
    { 
      icon: Globe, 
      title: isEn ? "Wide Area Coverage" : "广域覆盖", 
      description: isEn ? "Utilize 5G cellular networks for seamless wide area coverage" : "利用5G蜂窝网络实现无缝广域覆盖" 
    },
    { 
      icon: Zap, 
      title: isEn ? "Low Latency Response" : "低延迟响应", 
      description: isEn ? "5G low latency ensures precise real-time control" : "5G低延迟特性保障精准实时控制" 
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={isEn ? "5G Connected Applications" : "5G联网应用"}
        description={isEn 
          ? "CANI Technology 5G connected drone solutions for remote control and data transmission via 5G cellular networks."
          : "长凌科技5G联网无人机解决方案，通过5G蜂窝网络实现远程控制和数据传输。"}
        keywords={isEn 
          ? "5G drone,5G connected,remote control,HD streaming,low latency"
          : "5G无人机,5G联网,远程控制,高清回传,低延迟"}
        url="/applications/5g"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[350px] md:h-[450px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <p className="text-accent font-medium mb-2">{isEn ? "Industry Applications" : "行业应用"}</p>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {isEn ? "5G Connected" : "5G联网"}
              </h1>
              <p className="text-lg text-primary-foreground/90">
                {isEn 
                  ? "5G connected drones enable remote control and data transmission via 5G cellular networks, expanding drone application boundaries"
                  : "5G联网无人机通过5G蜂窝网络实现远程控制和数据传输，拓展无人机应用边界"}
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
              {isEn ? "Get 5G Connected Solutions" : "获取5G联网解决方案"}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Contact our professional team to learn more about 5G connected drone applications"
                : "联系我们的专业团队，了解更多5G联网无人机应用详情"}
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

export default FiveG;
