import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Eye, Shield, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Power = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const features = [
    { icon: Eye, title: isEn ? "Transmission Line Inspection" : "输电线路巡检", description: isEn ? "Comprehensive inspection of high-voltage transmission lines" : "对高压输电线路进行全面巡视检查" },
    { icon: Shield, title: isEn ? "Fault Detection" : "故障排查", description: isEn ? "Quickly locate line faults, reduce repair time" : "快速定位线路故障点，缩短抢修时间" },
    { icon: Wrench, title: isEn ? "Wire Laying" : "架线作业", description: isEn ? "UAV-assisted wire laying, improve construction efficiency" : "无人机辅助架线，提高施工效率" },
    { icon: Zap, title: isEn ? "Thermal Detection" : "红外检测", description: isEn ? "Infrared thermal imaging to detect equipment overheating" : "红外热成像检测设备发热异常" },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={isEn ? "Power Industry Applications" : "电力行业应用"}
        description={isEn 
          ? "EFUAV power industry drone solutions for transmission line inspection, fault detection, wire laying, and more."
          : "飞迈科技无人机电力行业解决方案，应用于输电线路巡检、故障排查、架线作业等领域。"}
        keywords={isEn 
          ? "power drone,transmission line inspection,fault detection,wire laying drone,thermal detection"
          : "电力无人机,输电线路巡检,故障排查,架线无人机,红外检测"}
        url="/applications/power"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[350px] md:h-[450px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80)" }}
          >
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl rounded-3xl bg-background/70 backdrop-blur-md border border-border p-6 md:p-8 shadow-card">
              <p className="text-accent font-medium mb-2">{isEn ? "Industry Applications" : "行业应用"}</p>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{isEn ? "Power Industry" : "电力"}</h1>
              <p className="text-lg text-muted-foreground">
                {isEn 
                  ? "Power industry drones for transmission line inspection, fault detection, and wire laying operations, significantly improving efficiency and safety"
                  : "电力工业应用无人机进行输电线路巡检、故障排查、架线作业等，大幅提升作业效率和安全性"}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{isEn ? "Application Scenarios" : "应用场景"}</h2>
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
              {isEn ? "Get Power Industry Solutions" : "获取电力行业解决方案"}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Contact our professional team for more information on power industry drone applications"
                : "联系我们的专业团队，了解更多电力行业无人机应用详情"}
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

export default Power;
