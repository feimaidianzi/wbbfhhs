import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Mail, Clock, Zap, Shield, Radio, Eye, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const TH100 = () => {
  const specs = [
    { label: "有效载荷", value: "5kg" },
    { label: "升空高度", value: "100m" },
    { label: "抗风等级", value: "6级" },
    { label: "供电功率", value: "1.5kW" },
    { label: "系留线缆", value: "100m" },
    { label: "工作温度", value: "-20°C~50°C" },
    { label: "部署时间", value: "<5分钟" },
    { label: "连续工作", value: "24小时" },
  ];

  const features = [
    { icon: Clock, title: "24小时不间断", description: "持续供电，无限续航能力" },
    { icon: Zap, title: "快速部署", description: "单人5分钟内完成部署" },
    { icon: Shield, title: "轻量化设计", description: "整机轻便，便于携带运输" },
    { icon: Radio, title: "智能排线", description: "自动收放线，智能管理" },
    { icon: Eye, title: "高清传输", description: "1080P实时图传" },
    { icon: Settings, title: "即插即用", description: "标准接口，快速连接" },
  ];

  const applications = [
    "临时性活动安保",
    "应急通信中继",
    "交通监控",
    "临时安防部署",
    "工地监控",
    "小型活动保障",
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16 md:pt-20">
        <div className="bg-secondary py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">首页</Link>
              <span>/</span>
              <Link to="/products/tethered" className="hover:text-accent">系留无人机</Link>
              <span>/</span>
              <span className="text-foreground">TH-100系留无人机</span>
            </div>
          </div>
        </div>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Link to="/products/tethered" className="inline-flex items-center text-accent hover:underline mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回系留无人机
                </Link>
                <h1 className="text-3xl md:text-5xl font-bold mb-6">TH-100系留无人机</h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  轻量化系留平台，适用于临时性监控、通信中继等应用场景。单人即可完成部署操作，是临时任务和快速响应的理想选择。
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                    获取报价
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button className="bg-primary/10 border border-primary/30 text-foreground hover:bg-primary/20 px-8 py-6 text-lg">
                    <Phone className="w-5 h-5 mr-2" />
                    电话咨询
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80"
                  alt="TH-100系留无人机"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground px-6 py-3 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold">100m</div>
                  <div className="text-sm">升空高度</div>
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
                <div key={index} className="bg-card p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all">
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
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-6">
              了解更多TH-100解决方案
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              联系我们的专业团队，获取定制化配置方案和详细报价
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg">
                <Mail className="w-5 h-5 mr-2" />
                立即咨询
              </Button>
              <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-10 py-6 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                400-888-8888
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

export default TH100;
