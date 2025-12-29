import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Clock, Zap, Shield, Radio } from "lucide-react";

const features = [
  { icon: Clock, title: "24小时不间断", description: "持续供电，长时间滞空作业" },
  { icon: Zap, title: "最高300米", description: "升空高度可达300米" },
  { icon: Shield, title: "5分钟部署", description: "快速展开，即插即用" },
  { icon: Radio, title: "智能排线", description: "自动收放线，智能管理" },
];

const products = [
  {
    name: "TH-100系留无人机",
    description: "轻量化系留平台，适用于临时性监控、通信中继等应用场景。",
    specs: ["有效载荷: 5kg", "升空高度: 100m", "抗风等级: 6级"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
  },
  {
    name: "TH-200系留无人机",
    description: "中型系留平台，具备更强的载荷能力和更高的升空高度。",
    specs: ["有效载荷: 10kg", "升空高度: 200m", "抗风等级: 7级"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
  },
  {
    name: "TH-300系留无人机",
    description: "重型系留平台，适用于大型活动安保、应急通信等重要场景。",
    specs: ["有效载荷: 15kg", "升空高度: 300m", "抗风等级: 8级"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
  },
];

const applications = [
  "大型活动安保监控",
  "应急通信中继",
  "边境巡逻监视",
  "森林防火监测",
  "交通流量监控",
  "城市安防监控",
];

const Tethered = () => {
  return (
    <div className="min-h-screen">
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
                系留无人机系统
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                24小时不间断工作，最高升空高度达300米，5分钟快速部署
              </p>
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                立即咨询
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">核心优势</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-card rounded-xl shadow-card"
                >
                  <feature.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="font-bold text-lg text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">产品系列</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              多种规格系留无人机，满足不同场景的长时间滞空需求
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-2">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">{product.description}</p>
                    <div className="space-y-2 mb-4">
                      {product.specs.map((spec, i) => (
                        <div key={i} className="text-sm text-foreground/80">
                          • {spec}
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                      了解详情
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">应用场景</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {applications.map((app, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-4 bg-card rounded-lg shadow-sm"
                >
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium text-card-foreground">{app}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Tethered;
