import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Mail, Cpu, Settings, Shield, Zap, Radio, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const FlightControl = () => {
  const features = [
    { icon: Cpu, title: "自研飞控", description: "完全自主知识产权飞控系统" },
    { icon: Settings, title: "深度定制", description: "支持算法级深度定制开发" },
    { icon: Shield, title: "高可靠性", description: "工业级稳定性保障" },
    { icon: Zap, title: "快速响应", description: "毫秒级控制响应速度" },
    { icon: Radio, title: "多协议", description: "支持多种通信协议" },
    { icon: Eye, title: "开放接口", description: "丰富的API开发接口" },
  ];

  const services = [
    "飞控硬件定制设计",
    "飞控软件二次开发",
    "控制算法优化",
    "传感器融合方案",
    "自主导航算法",
    "故障诊断系统",
    "数据记录分析",
    "仿真测试平台",
  ];

  const cases = [
    {
      title: "高校飞控实验平台",
      client: "某985高校",
      description: "为航空航天学院定制开发飞控实验平台，支持学生进行飞行控制算法研究和验证。",
    },
    {
      title: "特种环境飞控系统",
      client: "某研究院",
      description: "开发耐高温、耐低温特种飞控系统，满足极端环境下的飞行控制需求。",
    },
    {
      title: "集群控制飞控",
      client: "某科技公司",
      description: "定制开发支持集群协同控制的飞控系统，实现多机编队飞行。",
    },
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
              <Link to="/custom-research" className="hover:text-accent">科研定制</Link>
              <span>/</span>
              <span className="text-foreground">飞控定制</span>
            </div>
          </div>
        </div>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Link to="/custom-research" className="inline-flex items-center text-accent hover:underline mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回科研定制
                </Link>
                <h1 className="text-3xl md:text-5xl font-bold mb-6">飞控定制</h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  提供完全自主知识产权的飞控系统定制开发服务，支持从硬件设计到软件算法的全方位定制，满足科研院所和高校的特殊研究需求。
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                    咨询定制 <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button className="bg-primary/10 border border-primary/30 text-foreground hover:bg-primary/20 px-8 py-6 text-lg">
                    <Phone className="w-5 h-5 mr-2" /> 电话咨询
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80" alt="飞控定制" className="rounded-2xl shadow-2xl w-full" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">定制优势</h2>
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
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">定制服务内容</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-3 bg-card p-4 rounded-xl shadow-card">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">案例展示</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
              成功为多家高校和科研院所提供飞控定制服务
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cases.map((item, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl shadow-card">
                  <div className="text-sm text-accent font-medium mb-2">{item.client}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-6">开启飞控定制项目</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              无论是基础研究还是应用开发，长凌电子都能为您提供专业的飞控定制服务
            </p>
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

export default FlightControl;
