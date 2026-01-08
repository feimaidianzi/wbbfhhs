import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Mail, Users, Cpu, Radio, Shield, Zap, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";

const SwarmCustom = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const features = [
    { icon: Users, title: isEn ? "Swarm Coordination" : "集群协同", description: isEn ? "Multi-drone coordination control" : "多机协同控制技术" },
    { icon: Cpu, title: isEn ? "Smart Algorithms" : "智能算法", description: isEn ? "Proprietary swarm algorithms" : "自研集群智能算法" },
    { icon: Radio, title: isEn ? "Mesh Network" : "组网通信", description: isEn ? "Self-organizing mesh network" : "自组网通信系统" },
    { icon: Shield, title: isEn ? "High Reliability" : "高可靠", description: isEn ? "Redundant design for reliability" : "冗余设计高可靠性" },
    { icon: Zap, title: isEn ? "Fast Response" : "快速响应", description: isEn ? "Millisecond coordination response" : "毫秒级协同响应" },
    { icon: Settings, title: isEn ? "Flexible Config" : "灵活配置", description: isEn ? "Flexible swarm size configuration" : "集群规模灵活配置" },
  ];

  const services = isEn 
    ? ["Swarm Control Algorithm", "Mesh Network Solution", "Formation Flight System", "Task Coordination Planning", "Ground Station Integration", "Simulation Platform", "Show Choreography System", "Safety Redundancy Design"]
    : ["集群控制算法开发", "自组网通信方案", "编队飞行系统", "任务协同规划", "地面站集成开发", "仿真测试平台", "表演编排系统", "安全冗余设计"];

  const cases = isEn ? [
    {
      title: "Drone Light Show",
      client: "Cultural Tourism Group",
      description: "Custom 500-drone swarm performance system supporting complex patterns and dynamic choreography.",
    },
    {
      title: "Agricultural Swarm Operations",
      client: "Agricultural Tech Company",
      description: "Developed 10-drone coordinated crop spraying system for efficient large-scale operations.",
    },
    {
      title: "Research Validation Platform",
      client: "University Laboratory",
      description: "Custom small-scale swarm validation platform for swarm intelligence research and rapid algorithm verification.",
    },
  ] : [
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
              <Link to="/" className="hover:text-accent">{isEn ? "Home" : "首页"}</Link>
              <span>/</span>
              <Link to="/custom-research" className="hover:text-accent">{isEn ? "R&D Custom" : "科研定制"}</Link>
              <span>/</span>
              <span className="text-foreground">{isEn ? "Swarm Custom" : "集群定制"}</span>
            </div>
          </div>
        </div>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <BackButton to="/custom-research" label={isEn ? "Back to R&D Custom" : "返回科研定制"} />
                <h1 className="text-3xl md:text-5xl font-bold mb-6">{isEn ? "Swarm Customization" : "集群定制"}</h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {isEn 
                    ? "Providing professional drone swarm system customization services, from swarm control algorithms to mesh networking, from formation flight to task coordination, meeting needs for shows, agriculture, research and more."
                    : "提供无人机集群系统的专业定制服务，从集群控制算法到自组网通信，从编队飞行到任务协同，满足表演、农业、科研等多场景需求。"}
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
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt={isEn ? "Swarm Custom" : "集群定制"} className="rounded-2xl shadow-2xl w-full" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">{isEn ? "Customization Advantages" : "定制优势"}</h2>
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
              {isEn ? "Successfully provided swarm customization services for multiple enterprises and institutions" : "成功为多家企业和机构提供集群定制服务"}
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
              {isEn ? "Start Your Swarm Project" : "开启集群定制项目"}
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

export default SwarmCustom;
