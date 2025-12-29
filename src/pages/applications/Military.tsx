import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Eye, Radio, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const features = [
  {
    icon: Eye,
    title: "侦察监视",
    description: "全天候高清侦察监视，提供实时战场态势感知"
  },
  {
    icon: Radio,
    title: "通信中继",
    description: "空中通信中继平台，延伸战术通信覆盖范围"
  },
  {
    icon: Target,
    title: "目标定位",
    description: "精确目标识别与定位，支持协同作战决策"
  },
  {
    icon: Shield,
    title: "隐蔽性强",
    description: "低噪音设计，不易被发现，安全性能高"
  }
];

const scenarios = [
  {
    title: "边境巡逻",
    description: "执行边境地区日常巡逻监视任务，及时发现异常情况",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80"
  },
  {
    title: "战场侦察",
    description: "深入作战区域进行情报侦察，获取敌方部署信息",
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80"
  },
  {
    title: "训练演习",
    description: "模拟对抗训练和战术演习，提升部队实战能力",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
  }
];

const Military = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="军事应用"
        description="长凌电子军事无人机解决方案，提供侦察监视、通信中继、目标定位等专业军事应用服务。"
        keywords="军事无人机,侦察无人机,通信中继,边境巡逻,战场侦察"
        url="/applications/military"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                军事应用
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                专业军用无人机系统，为国防建设提供可靠的空中力量支撑
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
              获取军事应用解决方案
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              长凌电子为您提供专业的军事无人机解决方案，助力国防现代化建设
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

export default Military;