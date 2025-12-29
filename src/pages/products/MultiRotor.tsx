import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, Settings, Shield, Cpu } from "lucide-react";

const features = [
  { icon: Camera, title: "多载荷兼容", description: "支持多种专业载荷设备" },
  { icon: Settings, title: "模块化设计", description: "快速更换，灵活配置" },
  { icon: Shield, title: "工业级可靠", description: "恶劣环境稳定作业" },
  { icon: Cpu, title: "智能飞控", description: "自主避障，智能航线" },
];

const products = [
  {
    name: "X650多旋翼无人机",
    description: "紧凑型工业无人机，适用于日常巡检和数据采集任务。",
    specs: ["轴距: 650mm", "最大载重: 2kg", "续航时间: 35分钟"],
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
  },
  {
    name: "X850多旋翼无人机",
    description: "中型工业无人机，具备更强载荷能力和更长续航时间。",
    specs: ["轴距: 850mm", "最大载重: 5kg", "续航时间: 45分钟"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
  },
  {
    name: "X1200多旋翼无人机",
    description: "大型工业无人机，适用于重型载荷和长航时任务。",
    specs: ["轴距: 1200mm", "最大载重: 10kg", "续航时间: 55分钟"],
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=600&q=80",
  },
  {
    name: "X1600多旋翼无人机",
    description: "超大型工业无人机，满足特殊行业的超重载荷需求。",
    specs: ["轴距: 1600mm", "最大载重: 20kg", "续航时间: 40分钟"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
  },
];

const payloads = [
  "可见光相机",
  "热成像相机",
  "多光谱相机",
  "激光雷达",
  "气体检测器",
  "喊话器",
  "探照灯",
  "投放器",
];

const MultiRotor = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1506947411487-a56738267384?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                多旋翼无人机平台
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                工业级多旋翼平台，模块化设计，满足多行业应用需求
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
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">平台优势</h2>
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
              从轻型到重型，长凌电子多旋翼平台覆盖全尺寸需求
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

        {/* Payloads Section */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">可选载荷</h2>
            <p className="text-muted-foreground text-center mb-12">支持多种专业载荷，灵活应对不同任务需求</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {payloads.map((payload, index) => (
                <div
                  key={index}
                  className="p-4 bg-card rounded-lg shadow-sm text-center"
                >
                  <span className="text-sm font-medium text-card-foreground">{payload}</span>
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

export default MultiRotor;
