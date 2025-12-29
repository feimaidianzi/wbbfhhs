import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Mail, Zap, Battery, Settings, Wind, Gauge, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const PowerSystem = () => {
  const features = [
    { icon: Zap, title: "高效动力", description: "优化动力系统效率" },
    { icon: Battery, title: "长续航", description: "延长飞行时间" },
    { icon: Settings, title: "定制电调", description: "电调系统定制开发" },
    { icon: Wind, title: "螺旋桨优化", description: "专用桨叶设计" },
    { icon: Gauge, title: "动力匹配", description: "电机与载荷匹配" },
    { icon: Shield, title: "可靠性", description: "高可靠动力保障" },
  ];

  const services = [
    "电机选型与定制",
    "电调系统开发",
    "螺旋桨设计优化",
    "电池管理系统",
    "动力系统集成",
    "散热系统设计",
    "效率测试分析",
    "可靠性验证",
  ];

  const cases = [
    {
      title: "长航时动力系统",
      client: "某航空研究所",
      description: "定制开发高效动力系统，将续航时间从45分钟提升至70分钟。",
    },
    {
      title: "重载动力定制",
      client: "某物流公司",
      description: "为30kg载重需求定制大功率动力系统，满足物资运输需求。",
    },
    {
      title: "高原动力优化",
      client: "某地质勘察院",
      description: "针对高海拔作业环境优化动力系统，保障4500米海拔稳定飞行。",
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
              <span className="text-foreground">动力定制</span>
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
                <h1 className="text-3xl md:text-5xl font-bold mb-6">动力定制</h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  提供专业的无人机动力系统定制服务，从电机选型到电调开发，从螺旋桨设计到电池管理，全方位满足特殊动力需求。
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
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="动力定制" className="rounded-2xl shadow-2xl w-full" />
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
              成功为多家企业和科研机构提供动力系统定制服务
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
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-6">开启动力定制项目</h2>
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

export default PowerSystem;
