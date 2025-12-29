import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Eye, Radio, Shield } from "lucide-react";

const features = [
  { icon: Zap, title: "极速响应", description: "毫秒级操控响应，畅享飞行乐趣" },
  { icon: Eye, title: "第一视角", description: "沉浸式FPV飞行体验" },
  { icon: Radio, title: "低延迟", description: "高清图传，实时画面" },
  { icon: Shield, title: "坚固耐用", description: "碳纤维机架，抗摔耐撞" },
];

const products = [
  {
    name: "竞速FPV套装",
    description: "专业竞速级FPV无人机，适合赛事训练和极限飞行。",
    specs: ["最高时速: 150km/h", "电机: 2806.5 1300KV", "图传延迟: <28ms"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
  },
  {
    name: "航拍FPV套装",
    description: "稳定航拍与FPV飞行完美结合，捕捉精彩瞬间。",
    specs: ["稳定增强", "4K高清录制", "续航: 25分钟"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
  },
  {
    name: "入门FPV套装",
    description: "专为新手设计，安全易学，快速入门FPV飞行。",
    specs: ["模拟器支持", "自稳模式", "新手保护"],
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
  },
];

const accessories = [
  "高清FPV眼镜",
  "遥控器",
  "电池充电器",
  "备用桨叶",
  "工具套装",
  "收纳包",
];

const FPV = () => {
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
                FPV 穿越机
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                第一视角飞行体验，感受速度与激情的完美融合
              </p>
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                立即购买
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <feature.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">产品系列</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              从入门到专业，长凌FPV满足不同玩家需求
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

        {/* Accessories */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">配件周边</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {accessories.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-card rounded-lg shadow-sm text-center hover:shadow-card transition-shadow"
                >
                  <span className="text-sm font-medium text-card-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              开启FPV飞行之旅
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              加入长凌FPV玩家社群，交流飞行技巧，分享精彩视频
            </p>
            <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
              加入社群
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default FPV;
