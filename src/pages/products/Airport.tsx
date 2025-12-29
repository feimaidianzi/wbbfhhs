import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

const features = [
  "全自动起降，无需人工干预",
  "智能充电管理系统",
  "全天候环境适应能力",
  "远程监控与控制",
  "自动数据回传与分析",
  "模块化设计，易于维护",
];

const products = [
  {
    name: "车载自动机场",
    description: "多维跨域，相得益彰。空地跨域协同、人机共融的智能化解决方案，可快速部署于各类车辆平台。",
    specs: ["载机重量: ≤30kg", "展开时间: <3分钟", "工作温度: -20°C~55°C"],
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80",
  },
  {
    name: "UHS 1000自动机场",
    description: "UHS智能停机坪，全自动起降充电，适用于大型工业无人机的自动化作业。",
    specs: ["载机重量: ≤50kg", "充电功率: 1000W", "防护等级: IP65"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
  },
  {
    name: "UHS 600自动机场",
    description: "紧凑型自动机场，适用于多种场景，具备快速部署和高效运营能力。",
    specs: ["载机重量: ≤25kg", "充电功率: 600W", "占地面积: 2m²"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
  },
  {
    name: "UHS 400P自动机场",
    description: "便携式自动机场，快速部署，适合临时性巡检和应急响应场景。",
    specs: ["载机重量: ≤15kg", "充电功率: 400W", "重量: <50kg"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
  },
];

const Airport = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                长凌机场系统
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                全自动无人机起降平台，实现无人值守、智能巡检、自动充电的一体化解决方案
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-card rounded-lg shadow-card"
                >
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                  <span className="text-card-foreground font-medium">{feature}</span>
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
              长凌电子提供多种规格的自动机场解决方案，满足不同场景的应用需求
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
                >
                  <div className="aspect-video overflow-hidden">
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
                    <p className="text-muted-foreground mb-4">{product.description}</p>
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

export default Airport;
