import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame, Eye, Radio, Droplets } from "lucide-react";

const features = [
  { icon: Eye, title: "热成像侦察", description: "实时探测火情，精准定位火源" },
  { icon: Droplets, title: "灭火投弹", description: "高效灭火弹投放系统" },
  { icon: Radio, title: "应急通信", description: "建立临时通信中继站" },
  { icon: Flame, title: "高温作业", description: "耐高温设计，安全可靠" },
];

const products = [
  {
    name: "XF-100消防侦察无人机",
    description: "搭载热成像和可见光双光吊舱，实时探测火情，为消防指挥提供决策依据。",
    specs: ["热成像分辨率: 640×512", "续航时间: 45分钟", "通信距离: 10km"],
    image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=600&q=80",
  },
  {
    name: "XF-200消防灭火无人机",
    description: "大载荷灭火平台，可携带多枚灭火弹，对高层建筑和危险区域进行精准灭火。",
    specs: ["载弹量: 6枚", "单弹重量: 5kg", "投放精度: <1m"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
  },
  {
    name: "XF-300消防救援无人机",
    description: "多功能救援平台，可执行物资投送、通信中继、人员搜救等多种任务。",
    specs: ["最大载重: 30kg", "航程: 50km", "抗风等级: 7级"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
  },
];

const applications = [
  "高层建筑消防",
  "森林火灾扑救",
  "化工园区安全",
  "地震救援搜索",
  "洪涝灾害救援",
  "山地救援行动",
];

const Firefighting = () => {
  return (
    <div className="min-h-screen">
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
                消防救援无人机
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                快速响应、精准定位、高效灭火，守护生命财产安全
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
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">核心能力</h2>
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
              从火情侦察到灭火救援，长凌电子提供全方位消防无人机解决方案
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
                  className="p-4 bg-card rounded-lg shadow-sm text-center"
                >
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

export default Firefighting;
