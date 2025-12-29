import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Mail, Package, Layers, Settings, Shield, Zap, Users } from "lucide-react";
import { Link } from "react-router-dom";

const CompleteSystem = () => {
  const features = [
    { icon: Package, title: "整机方案", description: "从设计到交付一站式服务" },
    { icon: Layers, title: "系统集成", description: "飞行平台与载荷深度集成" },
    { icon: Settings, title: "全面定制", description: "按需定制所有系统组件" },
    { icon: Shield, title: "品质保证", description: "严格质量控制体系" },
    { icon: Zap, title: "快速交付", description: "高效研发缩短周期" },
    { icon: Users, title: "全程服务", description: "售后培训技术支持" },
  ];

  const services = [
    "需求分析与方案设计",
    "飞行平台定制开发",
    "载荷系统集成",
    "地面站软件配套",
    "系统联调测试",
    "飞行培训服务",
    "售后维护保障",
    "持续升级迭代",
  ];

  const process = [
    { step: "01", title: "需求沟通", description: "深入了解应用场景和技术需求" },
    { step: "02", title: "方案设计", description: "制定详细的技术方案和项目计划" },
    { step: "03", title: "研发生产", description: "专业团队进行定制开发和生产" },
    { step: "04", title: "测试验收", description: "严格测试确保满足各项指标" },
    { step: "05", title: "交付培训", description: "产品交付并提供操作培训" },
    { step: "06", title: "售后支持", description: "持续技术支持和维护服务" },
  ];

  const cases = [
    {
      title: "海洋监测无人机",
      client: "某海洋研究所",
      description: "定制开发海上作业无人机系统，集成海洋监测传感器，满足海洋科考需求。",
    },
    {
      title: "应急救援无人机",
      client: "某消防救援总队",
      description: "整机定制应急救援无人机，集成热成像、喊话、照明、投放等多功能载荷。",
    },
    {
      title: "电力巡检系统",
      client: "某省电力公司",
      description: "定制开发电力巡检专用无人机系统，包含飞行平台、巡检软件和数据处理平台。",
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
              <span className="text-foreground">整机定制</span>
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
                <h1 className="text-3xl md:text-5xl font-bold mb-6">整机定制</h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  提供从需求分析到产品交付的一站式整机定制服务，根据您的应用场景和技术需求，量身打造专属无人机系统。
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
                <img src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&q=80" alt="整机定制" className="rounded-2xl shadow-2xl w-full" />
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
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">定制流程</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {process.map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-card p-6 rounded-2xl shadow-card">
                    <div className="text-4xl font-bold text-accent/20 mb-4">{item.step}</div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">服务内容</h2>
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

        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">案例展示</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
              成功为多家企业和科研机构提供整机定制服务
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
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-6">开启整机定制项目</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              无论是科研实验还是行业应用，长凌电子都能为您提供专业的整机定制服务
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

export default CompleteSystem;
