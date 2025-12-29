import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Truck, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const features = [
  {
    icon: Package,
    title: "大载重",
    description: "最大载重可达30KG，满足多种物资运输需求"
  },
  {
    icon: Clock,
    title: "快速配送",
    description: "无视地形限制，直线飞行，配送效率大幅提升"
  },
  {
    icon: MapPin,
    title: "精准投放",
    description: "厘米级定位精度，实现精准定点投放"
  },
  {
    icon: Truck,
    title: "全地形覆盖",
    description: "跨越山川河流，到达传统物流难以企及的区域"
  }
];

const scenarios = [
  {
    title: "偏远地区配送",
    description: "为山区、海岛等交通不便地区提供快速物资配送服务",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80"
  },
  {
    title: "应急物资投送",
    description: "灾害救援场景下快速投送急需物资和医疗用品",
    image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=600&q=80"
  },
  {
    title: "城市最后一公里",
    description: "解决城市配送最后一公里难题，提升用户体验",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80"
  }
];

const LogisticsApp = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="物流应用"
        description="长凌电子物流无人机解决方案，提供偏远地区配送、应急物资投送、城市末端配送等专业服务。"
        keywords="物流无人机,无人机配送,应急物资投送,末端配送,大载重无人机"
        url="/applications/logistics"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                物流应用
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                无人机物流配送技术，打破传统物流边界，实现高效精准配送
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
              获取物流配送解决方案
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              长凌电子为您提供专业的物流无人机解决方案，助力物流行业升级
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

export default LogisticsApp;