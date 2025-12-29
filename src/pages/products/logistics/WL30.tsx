import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Mail, Package, Truck, MapPin, Timer, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const WL30 = () => {
  const specs = [
    { label: "最大载重", value: "30kg" },
    { label: "航程", value: "80km" },
    { label: "巡航速度", value: "100km/h" },
    { label: "续航时间", value: "60分钟" },
    { label: "投递精度", value: "±5cm" },
    { label: "工作温度", value: "-20°C~45°C" },
    { label: "抗风等级", value: "7级" },
    { label: "货舱容积", value: "60L" },
  ];

  const features = [
    { icon: Package, title: "重型载荷", description: "30kg满足大件运输" },
    { icon: Truck, title: "远程配送", description: "80km航程突破地形限制" },
    { icon: MapPin, title: "精准定位", description: "RTK厘米级精度" },
    { icon: Timer, title: "超长续航", description: "60分钟持续飞行" },
    { icon: Shield, title: "强抗风", description: "7级风稳定飞行" },
    { icon: Zap, title: "快速响应", description: "应急物资快速投送" },
  ];

  const applications = ["偏远地区配送", "应急物资投放", "山区物资运输", "海岛配送", "灾区救援", "农产品出山"];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16 md:pt-20">
        <div className="bg-secondary py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">首页</Link>
              <span>/</span>
              <Link to="/products/logistics" className="hover:text-accent">物流无人机</Link>
              <span>/</span>
              <span className="text-foreground">WL-30物流无人机</span>
            </div>
          </div>
        </div>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Link to="/products/logistics" className="inline-flex items-center text-accent hover:underline mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回物流无人机
                </Link>
                <h1 className="text-3xl md:text-5xl font-bold mb-6">WL-30物流无人机</h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  重型物流配送平台，适用于偏远地区物资投送和应急救援，突破地形限制，让配送无处不达。
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                    获取报价 <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button className="bg-primary/10 border border-primary/30 text-foreground hover:bg-primary/20 px-8 py-6 text-lg">
                    <Phone className="w-5 h-5 mr-2" /> 电话咨询
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80" alt="WL-30物流无人机" className="rounded-2xl shadow-2xl w-full" />
                <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground px-6 py-3 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold">30kg</div>
                  <div className="text-sm">最大载重</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">核心优势</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl shadow-card">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">技术参数</h2>
            <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-card overflow-hidden">
              <table className="w-full">
                <tbody>
                  {specs.map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-secondary/30' : ''}>
                      <td className="px-6 py-4 font-medium border-b border-border/50">{spec.label}</td>
                      <td className="px-6 py-4 text-muted-foreground border-b border-border/50">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">应用场景</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {applications.map((app, index) => (
                <div key={index} className="flex items-center gap-3 bg-card p-4 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>{app}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-6">了解更多WL-30解决方案</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg">
                <Mail className="w-5 h-5 mr-2" /> 立即咨询
              </Button>
              <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-10 py-6 text-lg">
                <Phone className="w-5 h-5 mr-2" /> 400-888-8888
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default WL30;
