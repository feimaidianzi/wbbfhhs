import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame, Eye, Radio, Droplets } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const features = [
  {
    icon: Eye,
    title: "火情侦察",
    description: "红外热成像精准探测火点，快速掌握火场态势"
  },
  {
    icon: Radio,
    title: "通信保障",
    description: "空中通信中继，保障救援现场通信畅通"
  },
  {
    icon: Droplets,
    title: "灭火投弹",
    description: "携带灭火弹精准投放，抑制火势蔓延"
  },
  {
    icon: Flame,
    title: "全天候作业",
    description: "7×24小时待命，快速响应各类火灾险情"
  }
];

const scenarios = [
  {
    title: "森林防火",
    description: "森林火灾预防监测、火情早期发现、火场态势评估",
    image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=600&q=80"
  },
  {
    title: "城市消防",
    description: "高层建筑火灾侦察、人员搜救定位、应急物资投送",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80"
  },
  {
    title: "应急救援",
    description: "地震、洪涝等灾害现场侦察评估和救援协调支持",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80"
  }
];

const FirefightingApp = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="消防应急应用"
        description="长凌电子消防应急无人机解决方案，提供火情侦察、通信保障、灭火投弹等专业服务。"
        keywords="消防无人机,应急救援,火情侦察,森林防火,城市消防"
        url="/applications/firefighting"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                消防应急应用
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                无人机消防应急技术，为生命安全保驾护航
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
              获取消防应急解决方案
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              长凌电子为您提供专业的消防应急无人机解决方案，助力应急管理能力提升
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

export default FirefightingApp;