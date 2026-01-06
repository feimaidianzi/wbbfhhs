import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wifi, Eye, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const features = [
  { icon: Wifi, title: "5G远程控制", description: "通过5G网络实现超远距离无人机控制" },
  { icon: Eye, title: "高清实时回传", description: "5G大带宽支持4K/8K视频实时传输" },
  { icon: Globe, title: "广域覆盖", description: "利用5G蜂窝网络实现无缝广域覆盖" },
  { icon: Zap, title: "低延迟响应", description: "5G低延迟特性保障精准实时控制" },
];

const FiveG = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="5G联网应用"
        description="飞迈科技5G联网无人机解决方案，通过5G蜂窝网络实现远程控制和数据传输。"
        keywords="5G无人机,5G联网,远程控制,高清回传,低延迟"
        url="/applications/5g"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[350px] md:h-[450px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <p className="text-accent font-medium mb-2">行业应用</p>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">5G联网</h1>
              <p className="text-lg text-primary-foreground/90">
                5G联网无人机通过5G蜂窝网络实现远程控制和数据传输，拓展无人机应用边界
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">应用场景</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-card text-center">
                  <feature.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">获取5G联网解决方案</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              联系我们的专业团队，了解更多5G联网无人机应用详情
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

export default FiveG;
