import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Mountain, Wind, Target } from "lucide-react";

const features = [
  { icon: Mountain, title: "复杂地形", description: "跨越山川河流，无惧地形限制" },
  { icon: Wind, title: "强抗风性", description: "8级抗风，稳定作业" },
  { icon: Target, title: "精准投放", description: "厘米级精度，一次成功" },
  { icon: Zap, title: "高效作业", description: "效率提升10倍以上" },
];

const products = [
  {
    name: "JX-500架线无人机",
    description: "轻型架线平台，适用于配电线路和通信线路的引线作业。",
    specs: ["牵引力: 50N", "航程: 5km", "导线直径: ≤6mm"],
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
  },
  {
    name: "JX-1000架线无人机",
    description: "中型架线平台，适用于110kV及以下输电线路架设。",
    specs: ["牵引力: 100N", "航程: 8km", "导线直径: ≤12mm"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
  },
  {
    name: "JX-2000架线无人机",
    description: "重型架线平台，适用于500kV超高压输电线路架设。",
    specs: ["牵引力: 200N", "航程: 10km", "导线直径: ≤20mm"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
  },
];

const advantages = [
  { title: "效率提升", value: "10倍", description: "相比传统人工架线" },
  { title: "成本降低", value: "60%", description: "综合作业成本" },
  { title: "安全保障", value: "100%", description: "无需人员攀爬作业" },
  { title: "成功率", value: "99%", description: "一次架线成功率" },
];

const WireLaying = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                架线无人机系统
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                跨越山川河流，高效完成电力架线作业，安全可靠
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

        {/* Stats Section */}
        <section className="py-16 bg-primary">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {advantages.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-lg font-medium text-primary-foreground mb-1">{stat.title}</div>
                  <div className="text-sm text-primary-foreground/70">{stat.description}</div>
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
              从配电线路到超高压输电线路，长凌电子架线无人机满足全电压等级需求
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
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default WireLaying;
