import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Eye, Zap, Radio } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const features = [
  { icon: Shield, title: "治安巡逻", description: "对城市重点区域进行空中治安巡逻监控" },
  { icon: Eye, title: "活动安保", description: "大型活动期间提供空中安保和人群监控" },
  { icon: Zap, title: "案件侦查", description: "辅助案件侦查，提供空中侦察和追踪" },
  { icon: Radio, title: "应急处突", description: "突发事件快速响应，提供空中支援" },
];

const Police = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="警用应用"
        description="长凌电子警用无人机解决方案，应用于治安巡逻、大型活动安保、案件侦查等领域。"
        keywords="警用无人机,治安巡逻,活动安保,案件侦查,应急处突"
        url="/applications/police"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[350px] md:h-[450px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1920&q=80)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <p className="text-accent font-medium mb-2">行业应用</p>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">警用</h1>
              <p className="text-lg text-primary-foreground/90">
                警用无人机空中平台搭载多种传感器，用于治安巡逻、大型活动安保、案件侦查等场景
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">应用场景</h2>
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
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">获取警用解决方案</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              联系我们的专业团队，了解更多警用无人机应用详情
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                立即咨询
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

export default Police;
