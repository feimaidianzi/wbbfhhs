import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Mail, Users, Cpu, Radio, Shield, Zap, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const SwarmCustom = () => {
  const features = [
    { icon: Users, title: "集群协同", description: "多机协同控制技术" },
    { icon: Cpu, title: "智能算法", description: "自研集群智能算法" },
    { icon: Radio, title: "组网通信", description: "自组网通信系统" },
    { icon: Shield, title: "高可靠", description: "冗余设计高可靠性" },
    { icon: Zap, title: "快速响应", description: "毫秒级协同响应" },
    { icon: Settings, title: "灵活配置", description: "集群规模灵活配置" },
  ];

  const services = [
    "集群控制算法开发",
    "自组网通信方案",
    "编队飞行系统",
    "任务协同规划",
    "地面站集成开发",
    "仿真测试平台",
    "表演编排系统",
    "安全冗余设计",
  ];

  const cases = [
    {
      title: "无人机灯光秀",
      client: "某文旅集团",
      description: "定制开发500架无人机集群表演系统，支持复杂图案和动态编排。",
    },
    {
      title: "农业集群作业",
      client: "某农业科技公司",
      description: "开发10架无人机协同植保作业系统，实现大面积高效作业。",
    },
    {
      title: "科研验证平台",
      client: "某高校实验室",
      description: "为集群智能研究定制小型集群验证平台，支持算法快速验证。",
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
              <span className="text-foreground">集群定制</span>
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
                <h1 className="text-3xl md:text-5xl font-bold mb-6">集群定制</h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  提供无人机集群系统的专业定制服务，从集群控制算法到自组网通信，从编队飞行到任务协同，满足表演、农业、科研等多场景需求。
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
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="集群定制" className="rounded-2xl shadow-2xl w-full" />
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
              成功为多家企业和机构提供集群定制服务
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
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-6">开启集群定制项目</h2>
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

export default SwarmCustom;
