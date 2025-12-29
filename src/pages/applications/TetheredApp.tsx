import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cable, Clock, Radio, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const features = [
  {
    icon: Clock,
    title: "持续滞空",
    description: "系留供电，可实现24小时不间断滞空作业"
  },
  {
    icon: Cable,
    title: "稳定可靠",
    description: "系留线缆连接，不受干扰，定点悬停稳定"
  },
  {
    icon: Radio,
    title: "通信中继",
    description: "高空平台，有效延伸通信覆盖半径达50公里"
  },
  {
    icon: Eye,
    title: "广域监控",
    description: "高空视角，覆盖范围广，监控死角少"
  }
];

const scenarios = [
  {
    title: "应急通信",
    description: "灾害现场快速建立空中通信基站，恢复通信覆盖",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80"
  },
  {
    title: "安保监控",
    description: "大型活动现场持续空中监控，全面掌握现场态势",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80"
  },
  {
    title: "边境监视",
    description: "边境线持续监视巡逻，及时发现越境行为",
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80"
  }
];

const TetheredApp = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="系留应用"
        description="长凌电子系留无人机解决方案，提供持续滞空、应急通信、安保监控等专业服务。"
        keywords="系留无人机,持续滞空,应急通信,安保监控,通信中继"
        url="/applications/tethered"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                系留应用
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                系留无人机空中平台，24小时不间断持续作业能力
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  咨询方案
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              核心优势
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

        {/* Scenarios Section */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              应用场景
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {scenarios.map((scenario, index) => (
                <div key={index} className="bg-card rounded-xl overflow-hidden shadow-card">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={scenario.image}
                      alt={scenario.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-card-foreground mb-2">{scenario.title}</h3>
                    <p className="text-muted-foreground text-sm">{scenario.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              获取系留无人机解决方案
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              长凌电子为您提供专业的系留无人机解决方案，满足持续滞空作业需求
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

export default TetheredApp;