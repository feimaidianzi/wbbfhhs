import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Mail, Monitor, Code, Map, Database, Cloud, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";

const SoftwareCustom = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const features = [
    { icon: Monitor, title: isEn ? "Ground Station Custom" : "地面站定制", description: isEn ? "Custom ground control station software" : "定制化地面控制站软件" },
    { icon: Code, title: isEn ? "Algorithm Development" : "算法开发", description: isEn ? "Autonomous navigation & control algorithms" : "自主导航与控制算法" },
    { icon: Map, title: isEn ? "Route Planning" : "航线规划", description: isEn ? "Intelligent route planning system" : "智能航线规划系统" },
    { icon: Database, title: isEn ? "Data Processing" : "数据处理", description: isEn ? "Collected data processing & analysis" : "采集数据处理分析" },
    { icon: Cloud, title: isEn ? "Cloud Platform" : "云平台", description: isEn ? "Cloud management & monitoring platform" : "云端管理与监控平台" },
    { icon: Cpu, title: isEn ? "AI Integration" : "AI集成", description: isEn ? "AI recognition & analysis features" : "AI识别与分析功能" },
  ];

  const services = isEn 
    ? ["Ground Station Software", "Mobile App Development", "Route Planning Algorithm", "Autonomous Avoidance Algorithm", "Target Recognition Algorithm", "Data Processing Software", "Cloud Platform Development", "API Interface Development"]
    : ["地面站软件定制", "移动端APP开发", "航线规划算法", "自主避障算法", "目标识别算法", "数据处理软件", "云平台开发", "API接口开发"];

  const cases = isEn ? [
    {
      title: "Power Inspection Software",
      client: "Power Company",
      description: "Custom power inspection ground station with integrated defect recognition AI and inspection report generation.",
    },
    {
      title: "Agricultural Management Platform",
      client: "Agricultural Tech Company",
      description: "Developed agricultural drone management cloud platform supporting multi-drone coordination and data analysis.",
    },
    {
      title: "Survey Data Processing",
      client: "Surveying Institute",
      description: "Developed aerial survey data auto-processing software for one-click generation from raw data to results.",
    },
  ] : [
    {
      title: "电力巡检软件",
      client: "某电力公司",
      description: "定制开发电力巡检地面站，集成缺陷识别AI和巡检报告生成功能。",
    },
    {
      title: "农业管理平台",
      client: "某农业科技公司",
      description: "开发农业无人机管理云平台，支持多机协同作业和数据分析。",
    },
    {
      title: "测绘数据处理",
      client: "某测绘院",
      description: "开发航测数据自动处理软件，实现从原始数据到成果的一键生成。",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16 md:pt-20">
        <div className="bg-secondary py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">{isEn ? "Home" : "首页"}</Link>
              <span>/</span>
              <Link to="/custom-research" className="hover:text-accent">{isEn ? "R&D Custom" : "科研定制"}</Link>
              <span>/</span>
              <span className="text-foreground">{isEn ? "Software Custom" : "软件定制"}</span>
            </div>
          </div>
        </div>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <BackButton to="/custom-research" label={isEn ? "Back to R&D Custom" : "返回科研定制"} />
                <h1 className="text-3xl md:text-5xl font-bold mb-6">{isEn ? "Software Customization" : "软件定制"}</h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {isEn 
                    ? "Providing professional drone software system customization development services, including ground station, mobile apps, cloud platform, data processing and complete software solutions."
                    : "提供专业的无人机软件系统定制开发服务，包括地面站、移动端、云平台、数据处理等全套软件解决方案。"}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                    {isEn ? "Request Custom" : "咨询定制"} <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button className="bg-primary/10 border border-primary/30 text-foreground hover:bg-primary/20 px-8 py-6 text-lg">
                    <Phone className="w-5 h-5 mr-2" /> {isEn ? "Call Us" : "电话咨询"}
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" alt={isEn ? "Software Custom" : "软件定制"} className="rounded-2xl shadow-2xl w-full" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">{isEn ? "Software Types" : "软件类型"}</h2>
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
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">{isEn ? "Custom Services" : "定制服务内容"}</h2>
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
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{isEn ? "Case Studies" : "案例展示"}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
              {isEn ? "Successfully provided software customization services for multiple enterprises and research institutions" : "成功为多家企业和科研机构提供软件定制服务"}
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
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-6">
              {isEn ? "Start Your Software Project" : "开启软件定制项目"}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg">
                <Mail className="w-5 h-5 mr-2" /> {isEn ? "Contact Now" : "立即咨询"}
              </Button>
              <a href="tel:+8617674048404">
                <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-10 py-6 text-lg">
                  <Phone className="w-5 h-5 mr-2" /> 17674048404
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default SoftwareCustom;
