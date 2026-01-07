import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, Map, Cloud, Shield, Settings, Database, BookOpen, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Software = () => {
  const { language } = useLanguage();

  const systems = language === 'zh' ? [
    {
      icon: BookOpen,
      name: "模拟考试系统",
      description: "专业的无人机培训考核平台，支持理论考试、技能评估和证书发放。",
      features: ["题库管理", "在线考试", "自动阅卷", "证书发放"],
      link: "/software/exam-system",
    },
    {
      icon: Sun,
      name: "光伏巡检识别系统",
      description: "AI驱动的光伏缺陷识别系统，自动检测热斑、隐裂等问题。",
      features: ["热斑检测", "AI识别", "效率分析", "报告生成"],
      link: "/software/pv-inspection",
    },
    {
      icon: Cloud,
      name: "无人机管理平台",
      description: "一站式无人机资产与作业管理平台，实现设备管理、任务调度、数据分析。",
      features: ["设备管理", "任务调度", "人员管理", "数据统计"],
      link: "/software/drone-management",
    },
    {
      icon: Shield,
      name: "电力巡检管理系统",
      description: "输电线路智能巡检系统，AI自动识别缺陷，生成标准化报告。",
      features: ["缺陷识别", "智能巡检", "报告生成", "预警分析"],
      link: "/software/power-inspection-system",
    },
    {
      icon: Settings,
      name: "光伏巡检系统",
      description: "光伏电站全流程巡检运维管理平台，提升运维效率。",
      features: ["任务管理", "缺陷台账", "效能分析", "工单系统"],
      link: "/software/pv-system",
    },
    {
      icon: Database,
      name: "环保管理系统",
      description: "智能环境监测管理系统，支持大气、水质、生态等多维度监测。",
      features: ["大气监测", "水质监测", "生态监测", "数据分析"],
      link: "/software/environment-system",
    },
    {
      icon: Monitor,
      name: "无人机地面站软件",
      description: "专业的地面站软件，支持多机协同控制、航线规划、实时监控等功能。",
      features: ["多机控制", "航线规划", "视频传输", "数据记录"],
      link: "/software/ground-station",
    },
    {
      icon: Map,
      name: "集群无人机地面站软件",
      description: "百架级无人机集群控制软件，支持编队表演和协同作战。",
      features: ["集群控制", "编队管理", "灯光协同", "动画设计"],
      link: "/software/swarm-ground-station",
    },
  ] : [
    {
      icon: BookOpen,
      name: "Exam Simulation System",
      description: "Professional drone training and assessment platform, supporting theory exams, skill evaluation and certificate issuance.",
      features: ["Question Bank", "Online Exam", "Auto Grading", "Certification"],
      link: "/software/exam-system",
    },
    {
      icon: Sun,
      name: "PV Inspection AI System",
      description: "AI-driven solar panel defect detection system, automatically detecting hot spots, cracks and other issues.",
      features: ["Hot Spot Detection", "AI Recognition", "Efficiency Analysis", "Report Generation"],
      link: "/software/pv-inspection",
    },
    {
      icon: Cloud,
      name: "Drone Management Platform",
      description: "One-stop drone asset and operation management platform for device management, task scheduling, data analysis.",
      features: ["Device Management", "Task Scheduling", "Personnel Management", "Data Statistics"],
      link: "/software/drone-management",
    },
    {
      icon: Shield,
      name: "Power Inspection System",
      description: "Intelligent transmission line inspection system, AI automatic defect recognition, standardized report generation.",
      features: ["Defect Recognition", "Smart Inspection", "Report Generation", "Warning Analysis"],
      link: "/software/power-inspection-system",
    },
    {
      icon: Settings,
      name: "PV Inspection System",
      description: "Solar power plant full-process inspection and O&M management platform, improving O&M efficiency.",
      features: ["Task Management", "Defect Ledger", "Efficiency Analysis", "Work Order System"],
      link: "/software/pv-system",
    },
    {
      icon: Database,
      name: "Environmental Management System",
      description: "Intelligent environmental monitoring management system, supporting atmospheric, water quality, ecological multi-dimensional monitoring.",
      features: ["Air Monitoring", "Water Monitoring", "Ecological Monitoring", "Data Analysis"],
      link: "/software/environment-system",
    },
    {
      icon: Monitor,
      name: "Ground Control Station",
      description: "Professional ground station software, supporting multi-drone control, route planning, real-time monitoring and more.",
      features: ["Multi-Drone Control", "Route Planning", "Video Transmission", "Data Recording"],
      link: "/software/ground-station",
    },
    {
      icon: Map,
      name: "Swarm Ground Station",
      description: "100+ drone swarm control software, supporting formation performances and coordinated operations.",
      features: ["Swarm Control", "Formation Management", "Light Coordination", "Animation Design"],
      link: "/software/swarm-ground-station",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={language === 'zh' ? "软件系统" : "Software Systems"}
        description={language === 'zh' 
          ? "飞迈科技无人机软件系统，包括地面站控制系统、航线规划系统、云平台管理系统、数据处理系统等专业软件解决方案。"
          : "Feimai Technology drone software systems, including ground control systems, route planning systems, cloud platform management systems, data processing systems and other professional software solutions."}
        keywords={language === 'zh' 
          ? "无人机软件,地面站系统,航线规划,云平台管理,无人机数据处理,飞控软件"
          : "drone software,ground station system,route planning,cloud platform management,drone data processing,flight control software"}
        url="/software"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[300px] md:h-[400px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {language === 'zh' ? "软件系统" : "Software Systems"}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90">
                {language === 'zh' 
                  ? "完整的无人机软件生态，从地面站到云平台，全方位支撑无人机作业"
                  : "Complete drone software ecosystem, from ground station to cloud platform, comprehensive support for drone operations"}
              </p>
            </div>
          </div>
        </section>

        {/* Systems Grid */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {language === 'zh' ? "软件产品" : "Software Products"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'zh' 
                  ? "飞迈科技自主研发的软件系统，覆盖无人机作业全流程"
                  : "Self-developed software systems by Feimai Technology, covering the entire drone operation process"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systems.map((system, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 group"
                >
                  <system.icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-lg font-bold text-card-foreground mb-3 group-hover:text-accent transition-colors">
                    {system.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {system.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {system.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to={system.link}>
                    <Button
                      variant="outline"
                      className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    >
                      {language === 'zh' ? "了解更多" : "Learn More"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {language === 'zh' ? "系统集成" : "System Integration"}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {language === 'zh' 
                    ? "飞迈科技软件系统采用模块化设计，支持灵活组合和定制开发，可与客户现有系统无缝集成。"
                    : "Feimai Technology software systems adopt modular design, supporting flexible combination and custom development, seamlessly integrating with customers' existing systems."}
                </p>
                <p className="text-muted-foreground mb-6">
                  {language === 'zh' 
                    ? "我们提供开放的API接口和SDK，方便二次开发和系统对接，满足不同客户的个性化需求。"
                    : "We provide open API interfaces and SDKs for secondary development and system integration to meet the personalized needs of different customers."}
                </p>
                <Link to="/contact">
                  <Button className="bg-accent hover:bg-orange-light text-accent-foreground">
                    {language === 'zh' ? "获取技术文档" : "Get Technical Docs"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                  alt={language === 'zh' ? "软件系统" : "Software System"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Software;