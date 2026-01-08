import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Mail, Plane, Shield, Zap, Settings, Gauge, Box, Users, Building2, Wrench, Cog, Cpu, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";

const DroneCustom = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const departments = [
    { icon: Cpu, title: isEn ? "Embedded Dept." : "嵌入式部门", description: isEn ? "Flight control & embedded systems" : "飞控与嵌入式系统开发", count: "40+" },
    { icon: Cog, title: isEn ? "Hardware Dept." : "硬件部门", description: isEn ? "Electronic systems design" : "电子系统设计", count: "35+" },
    { icon: Code, title: isEn ? "Software Dept." : "软件部门", description: isEn ? "Ground station & algorithms" : "地面站与算法开发", count: "50+" },
    { icon: Wrench, title: isEn ? "Structure Dept." : "结构部门", description: isEn ? "Airframe & mechanical design" : "机体结构设计", count: "30+" },
    { icon: Users, title: isEn ? "Tech Support" : "技术支持部门", description: isEn ? "Customer technical support" : "客户技术支持服务", count: "25+" },
    { icon: Building2, title: isEn ? "Assembly Dept." : "装配部门", description: isEn ? "Production & quality control" : "生产装配与品控", count: "20+" },
  ];

  const droneTypes = [
    { icon: Plane, title: isEn ? "Multi-Rotor" : "多旋翼无人机", items: isEn ? ["4/6/8 rotor configurations", "Industrial inspection", "Aerial photography", "Mapping & surveying"] : ["四/六/八旋翼配置", "工业巡检应用", "航拍摄影", "测绘测量"] },
    { icon: Shield, title: isEn ? "Industrial Drone" : "工业级无人机", items: isEn ? ["Heavy-lift capability", "Long endurance", "All-weather operation", "Modular payloads"] : ["大载重能力", "长续航设计", "全天候作业", "模块化载荷"] },
    { icon: Box, title: isEn ? "Logistics Drone" : "物流无人机", items: isEn ? ["Cargo delivery", "Medical supplies", "Remote area delivery", "Urban logistics"] : ["货物配送", "医疗物资", "偏远地区配送", "城市物流"] },
    { icon: Zap, title: isEn ? "Tethered Drone" : "系留无人机", items: isEn ? ["Unlimited endurance", "Emergency comms", "Security surveillance", "Event coverage"] : ["无限续航", "应急通信", "安防监控", "活动保障"] },
    { icon: Gauge, title: isEn ? "Special Purpose" : "特种无人机", items: isEn ? ["Firefighting systems", "Agricultural spraying", "Power line laying", "Environmental monitoring"] : ["消防灭火", "农业植保", "电力放线", "环境监测"] },
    { icon: Settings, title: isEn ? "Custom Platform" : "定制平台", items: isEn ? ["Complete custom design", "Payload integration", "Special requirements", "R&D cooperation"] : ["全定制设计", "载荷集成", "特殊需求", "科研合作"] },
  ];

  const process = isEn ? [
    { step: "01", title: "Requirement Analysis", description: "In-depth communication to understand application scenarios and technical requirements" },
    { step: "02", title: "Solution Design", description: "Professional team develops customized solutions and technical specifications" },
    { step: "03", title: "Prototype Development", description: "Rapid prototyping and iterative optimization based on feedback" },
    { step: "04", title: "Testing & Certification", description: "Rigorous testing and assistance with relevant certifications" },
    { step: "05", title: "Batch Production", description: "Quality-controlled mass production with delivery assurance" },
    { step: "06", title: "After-Sales Support", description: "Complete technical training and ongoing support services" },
  ] : [
    { step: "01", title: "需求分析", description: "深入沟通了解应用场景和技术需求" },
    { step: "02", title: "方案设计", description: "专业团队制定定制方案和技术规格" },
    { step: "03", title: "样机研发", description: "快速原型制作，根据反馈迭代优化" },
    { step: "04", title: "测试认证", description: "严格测试并协助完成相关认证" },
    { step: "05", title: "批量生产", description: "品质控制的规模化生产，保障交付" },
    { step: "06", title: "售后支持", description: "完整技术培训和持续支持服务" },
  ];

  const capabilities = isEn 
    ? ["Flight Control System", "Power System Design", "Airframe Structure", "Payload Integration", "Ground Station Software", "Communication System", "Autonomous Navigation", "Swarm Control"]
    : ["飞控系统开发", "动力系统设计", "机体结构设计", "载荷集成", "地面站软件", "通信系统", "自主导航算法", "集群控制"];

  const cases = isEn ? [
    {
      title: "Industrial Inspection Drone",
      client: "Power Grid Company",
      description: "Custom heavy-lift inspection drone with dual-camera gimbal, 60-minute flight time, and all-weather capability for power line inspection.",
    },
    {
      title: "Medical Logistics Drone",
      client: "Healthcare Group",
      description: "Developed medical supply delivery drone with temperature-controlled cargo bay and precise autonomous landing for hospital network.",
    },
    {
      title: "Agricultural Spraying System",
      client: "Agricultural Cooperative",
      description: "Custom 30L spraying drone with terrain-following radar and intelligent route planning for precision agriculture.",
    },
  ] : [
    {
      title: "工业巡检无人机",
      client: "电网公司",
      description: "定制大载重巡检无人机，配备双光云台，60分钟续航，全天候作业能力，用于电力线路巡检。",
    },
    {
      title: "医疗物流无人机",
      client: "医疗集团",
      description: "开发医疗物资配送无人机，配备温控货舱和精准自主降落系统，服务医院网络。",
    },
    {
      title: "农业植保系统",
      client: "农业合作社",
      description: "定制30升植保无人机，配备仿地雷达和智能航线规划，用于精准农业作业。",
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
              <span className="text-foreground">{isEn ? "Drone Custom" : "整机定制"}</span>
            </div>
          </div>
        </div>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <BackButton to="/custom-research" label={isEn ? "Back to R&D Custom" : "返回科研定制"} />
                <h1 className="text-3xl md:text-5xl font-bold mb-6">{isEn ? "Complete Drone Customization" : "无人机整机定制"}</h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {isEn 
                    ? "With 200+ R&D engineers across six specialized departments, we provide end-to-end drone platform customization from concept to mass production, meeting diverse industry application requirements."
                    : "拥有200多人的研发团队，涵盖嵌入式、硬件、软件、结构、技术支持和装配六大部门，提供从概念到量产的端到端无人机平台定制服务，满足各行业应用需求。"}
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
                <img src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80" alt={isEn ? "Drone Custom" : "整机定制"} className="rounded-2xl shadow-2xl w-full" />
                <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground px-6 py-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold">200+</div>
                  <div className="text-sm">{isEn ? "R&D Engineers" : "研发工程师"}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{isEn ? "Professional R&D Team" : "专业研发团队"}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
              {isEn ? "Six specialized departments for complete drone development capability" : "六大专业部门，具备完整无人机研发能力"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((dept, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl shadow-card hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center">
                      <dept.icon className="w-7 h-7 text-accent" />
                    </div>
                    <div className="text-2xl font-bold text-accent">{dept.count}</div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{dept.title}</h3>
                  <p className="text-muted-foreground">{dept.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{isEn ? "Drone Types" : "可定制机型"}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
              {isEn ? "Complete drone platform customization for various applications" : "覆盖各类应用场景的无人机平台定制服务"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {droneTypes.map((item, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl shadow-card">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.items.map((subItem, subIndex) => (
                      <li key={subIndex} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>{subItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{isEn ? "Customization Process" : "定制流程"}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
              {isEn ? "Professional end-to-end customization process" : "专业的端到端定制流程"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {process.map((item, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl shadow-card relative">
                  <div className="absolute top-6 right-6 text-5xl font-bold text-accent/10">{item.step}</div>
                  <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center mb-6 text-lg font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">{isEn ? "Core Capabilities" : "核心能力"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {capabilities.map((capability, index) => (
                <div key={index} className="flex items-center gap-3 bg-card p-4 rounded-xl shadow-card">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>{capability}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{isEn ? "Case Studies" : "案例展示"}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
              {isEn ? "Successfully delivered customized drone solutions for numerous clients" : "成功为众多客户提供无人机整机定制解决方案"}
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
              {isEn ? "Start Your Drone Project" : "开启无人机定制项目"}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Contact our professional team to discuss your customization requirements"
                : "联系我们的专业团队，讨论您的整机定制需求"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg">
                <Mail className="w-5 h-5 mr-2" /> {isEn ? "Contact Now" : "立即咨询"}
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

export default DroneCustom;
