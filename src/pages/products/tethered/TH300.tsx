import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Mail, Clock, Zap, Shield, Radio, Eye, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const TH300 = () => {
  const specs = [
    { label: "有效载荷", value: "15kg" },
    { label: "升空高度", value: "300m" },
    { label: "抗风等级", value: "8级" },
    { label: "供电功率", value: "5kW" },
    { label: "系留线缆", value: "300m" },
    { label: "工作温度", value: "-20°C~50°C" },
    { label: "部署时间", value: "<10分钟" },
    { label: "连续工作", value: "24小时" },
  ];

  const features = [
    { icon: Clock, title: "超强续航", description: "24小时全天候不间断工作" },
    { icon: Zap, title: "大功率系统", description: "5kW供电支持重型载荷" },
    { icon: Shield, title: "超强抗风", description: "8级强风稳定作业" },
    { icon: Radio, title: "多载荷挂载", description: "支持多载荷同时挂载" },
    { icon: Eye, title: "超远覆盖", description: "300米高度覆盖更广" },
    { icon: Settings, title: "全自动化", description: "智能起降、自动排线" },
  ];

  const applications = [
    "重大活动安保",
    "国境线监视",
    "海岸线巡逻",
    "森林火灾监测",
    "应急通信保障",
    "大型赛事保障",
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
              <span className="text-foreground">TH-300系留无人机</span>
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
                <h1 className="text-3xl md:text-5xl font-bold mb-6">TH-300系留无人机</h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  重型系留平台，适用于大型活动安保、应急通信等重要场景。支持多载荷同时挂载，是专业级应用的旗舰选择。
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
                  src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80"
                  alt="TH-300系留无人机"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground px-6 py-3 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold">300m</div>
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
              了解更多TH-300解决方案
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

export default TH300;
