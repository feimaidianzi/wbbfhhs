import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Package, Truck, MapPin, Timer } from "lucide-react";

const features = [
  { icon: Package, title: "大载荷能力", description: "最大载重可达30kg" },
  { icon: Truck, title: "长距离配送", description: "单次飞行距离超50km" },
  { icon: MapPin, title: "精准投递", description: "厘米级定位精度" },
  { icon: Timer, title: "快速响应", description: "30分钟内完成配送" },
];

const products = [
  {
    name: "WL-10物流无人机",
    description: "轻量级物流配送平台，适用于城市最后一公里配送场景。",
    specs: ["最大载重: 10kg", "航程: 30km", "巡航速度: 60km/h"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
  },
  {
    name: "WL-20物流无人机",
    description: "中型物流配送平台，适用于城际快递和医疗物资运输。",
    specs: ["最大载重: 20kg", "航程: 50km", "巡航速度: 80km/h"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
  },
  {
    name: "WL-30物流无人机",
    description: "重型物流配送平台，适用于偏远地区物资投送和应急救援。",
    specs: ["最大载重: 30kg", "航程: 80km", "巡航速度: 100km/h"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
  },
];

const scenarios = [
  { title: "城市配送", description: "解决最后一公里配送难题" },
  { title: "医疗物资", description: "紧急医疗物资快速运输" },
  { title: "偏远地区", description: "山区海岛物资投送" },
  { title: "应急救援", description: "灾区物资紧急投放" },
];

const Logistics = () => {
  return (
    <div className="min-h-screen">
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
                物流无人机系统
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                高效配送、智能航线、安全可靠，开启空中物流新时代
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
              从城市配送到偏远投送，长凌电子物流无人机满足全场景需求
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

        {/* Scenarios Section */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">应用场景</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {scenarios.map((scenario, index) => (
                <div
                  key={index}
                  className="p-6 bg-card rounded-xl shadow-card text-center"
                >
                  <h3 className="font-bold text-lg text-card-foreground mb-2">{scenario.title}</h3>
                  <p className="text-muted-foreground text-sm">{scenario.description}</p>
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

export default Logistics;
