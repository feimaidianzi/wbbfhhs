import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Mail, Camera, Radio, Thermometer, Radar, Package, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Payload = () => {
  const features = [
    { icon: Camera, title: "光学载荷", description: "可见光/红外相机集成" },
    { icon: Radio, title: "通信载荷", description: "通信中继设备集成" },
    { icon: Thermometer, title: "传感器", description: "各类传感器集成" },
    { icon: Radar, title: "雷达载荷", description: "SAR/激光雷达集成" },
    { icon: Package, title: "投放载荷", description: "物资投放系统" },
    { icon: Settings, title: "定制接口", description: "标准化载荷接口" },
  ];

  const services = [
    "云台系统定制",
    "相机集成方案",
    "传感器选型集成",
    "通信设备集成",
    "载荷供电设计",
    "数据传输方案",
    "载荷控制协议",
    "减震系统设计",
  ];

  const cases = [
    {
      title: "多光谱相机集成",
      client: "某农业大学",
      description: "集成多光谱相机用于农作物长势监测和病虫害检测研究。",
    },
    {
      title: "气体检测载荷",
      client: "某环保监测站",
      description: "集成气体传感器阵列，实现大气污染物实时监测。",
    },
    {
      title: "激光雷达集成",
      client: "某测绘院",
      description: "集成激光雷达设备，用于地形测绘和三维建模。",
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
              <span className="text-foreground">载荷定制</span>
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
                <h1 className="text-3xl md:text-5xl font-bold mb-6">载荷定制</h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  提供专业的无人机载荷定制集成服务，支持各类光学、通信、传感器等载荷的选型与集成，满足不同行业应用需求。
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
                <img src="https://images.unsplash.com/photo-1506947411487-a56738267384?w=800&q=80" alt="载荷定制" className="rounded-2xl shadow-2xl w-full" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">载荷类型</h2>
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
              成功为多家企业和科研机构提供载荷定制服务
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
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-6">开启载荷定制项目</h2>
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

export default Payload;
