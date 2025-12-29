import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Mail, Zap, Cloud, Wifi, Settings, Shield, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const UHS400P = () => {
  const specs = [
    { label: "载机重量", value: "≤15kg" },
    { label: "充电功率", value: "400W" },
    { label: "充电时间", value: "<35分钟" },
    { label: "整机重量", value: "<50kg" },
    { label: "便携设计", value: "单人可搬运" },
    { label: "防护等级", value: "IP65" },
    { label: "工作温度", value: "-20°C~50°C" },
    { label: "通信方式", value: "4G/5G" },
    { label: "部署时间", value: "<5分钟" },
  ];

  const features = [
    { icon: Briefcase, title: "便携设计", description: "整机50kg以内，单人可搬运安装" },
    { icon: Zap, title: "快速充电", description: "400W充电，35分钟快速补能" },
    { icon: Cloud, title: "全天候", description: "IP65防护，适应户外环境" },
    { icon: Wifi, title: "4G/5G通信", description: "远程监控，实时数据传输" },
    { icon: Shield, title: "安全可靠", description: "自动保护，稳定运行" },
    { icon: Settings, title: "极速部署", description: "5分钟完成安装投入使用" },
  ];

  const applications = [
    "临时性巡检任务",
    "应急响应现场",
    "野外勘察作业",
    "临时安保监控",
    "建筑工地监测",
    "活动现场保障",
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="bg-secondary py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">首页</Link>
              <span>/</span>
              <Link to="/products/airport" className="hover:text-accent">机场系统</Link>
              <span>/</span>
              <span className="text-foreground">UHS 400P自动机场</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Link to="/products/airport" className="inline-flex items-center text-accent hover:underline mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回机场系统
                </Link>
                <h1 className="text-3xl md:text-5xl font-bold mb-6">UHS 400P自动机场</h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  便携式自动机场，快速部署，适合临时性巡检和应急响应场景。整机重量不足50kg，单人即可完成搬运和安装，5分钟内即可投入使用。
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
                  alt="UHS 400P自动机场"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground px-6 py-3 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold">&lt;50kg</div>
                  <div className="text-sm">便携设计</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
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

        {/* Specs */}
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

        {/* Applications */}
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

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-6">
              了解更多UHS 400P解决方案
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

export default UHS400P;
