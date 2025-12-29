import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Brain, Network, Sparkles } from "lucide-react";

const features = [
  { icon: Users, title: "大规模编队", description: "支持1000+架无人机协同" },
  { icon: Brain, title: "智能决策", description: "分布式智能协同算法" },
  { icon: Network, title: "自组网通信", description: "高可靠集群通信系统" },
  { icon: Sparkles, title: "精准定位", description: "RTK厘米级定位精度" },
];

const products = [
  {
    name: "集群表演系统",
    description: "大规模无人机灯光表演解决方案，打造震撼视觉盛宴。",
    specs: ["编队规模: 100-10000架", "定位精度: ±2cm", "同步精度: <20ms"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    name: "集群巡检系统",
    description: "多机协同巡检解决方案，大幅提升巡检效率和覆盖范围。",
    specs: ["编队规模: 5-50架", "覆盖效率: 提升10倍", "自主避障: 360°全向"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
  },
  {
    name: "集群作业系统",
    description: "多机协同作业解决方案，适用于农业植保、测绘等场景。",
    specs: ["编队规模: 3-20架", "作业效率: 提升5倍", "航线规划: 智能分配"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
  },
];

const applications = [
  { title: "灯光表演", description: "大型活动、节庆典礼的空中灯光秀" },
  { title: "协同巡检", description: "电力、石油管道等大范围巡检" },
  { title: "农业植保", description: "大面积农田的高效植保作业" },
  { title: "应急搜救", description: "大范围区域的快速搜索救援" },
];

const Swarm = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                集群无人机系统
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                智能集群控制，多机协同作业，开启无人机应用新纪元
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
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">技术优势</h2>
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
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">解决方案</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              从表演到作业，长凌电子集群系统满足多样化应用需求
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {applications.map((app, index) => (
                <div
                  key={index}
                  className="p-6 bg-card rounded-xl shadow-card text-center"
                >
                  <h3 className="font-bold text-lg text-card-foreground mb-2">{app.title}</h3>
                  <p className="text-muted-foreground text-sm">{app.description}</p>
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

export default Swarm;
