import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Mail, Cpu, Radio, Camera, Settings, Zap, Wifi, Users, Building2, Wrench, Cog } from "lucide-react";
import { Link } from "react-router-dom";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";

const AccessoriesCustom = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const departments = [
    { icon: Cpu, title: isEn ? "Embedded Dept." : "嵌入式部门", description: isEn ? "Firmware & embedded systems" : "固件开发与嵌入式系统", count: "40+" },
    { icon: Cog, title: isEn ? "Hardware Dept." : "硬件部门", description: isEn ? "Circuit & PCB design" : "电路设计与PCB开发", count: "35+" },
    { icon: Settings, title: isEn ? "Software Dept." : "软件部门", description: isEn ? "Software & algorithm development" : "软件与算法开发", count: "50+" },
    { icon: Wrench, title: isEn ? "Structure Dept." : "结构部门", description: isEn ? "Mechanical & structural design" : "机械结构设计", count: "30+" },
    { icon: Users, title: isEn ? "Tech Support" : "技术支持部门", description: isEn ? "Customer technical support" : "客户技术支持服务", count: "25+" },
    { icon: Building2, title: isEn ? "Assembly Dept." : "装配部门", description: isEn ? "Product assembly & testing" : "产品组装与测试", count: "20+" },
  ];

  const accessories = [
    { icon: Cpu, title: isEn ? "Flight Controller" : "飞控系统", items: isEn ? ["Custom firmware", "Sensor configuration", "Protocol customization", "OEM branding"] : ["定制固件", "传感器配置", "协议定制", "OEM贴牌"] },
    { icon: Zap, title: isEn ? "ESC & Power" : "电调与电源", items: isEn ? ["Power parameters", "BEC output", "Protocol support", "Heat dissipation"] : ["功率参数定制", "BEC输出定制", "协议支持", "散热设计"] },
    { icon: Radio, title: isEn ? "Video Transmitter" : "图传系统", items: isEn ? ["Frequency customization", "Power levels", "Encryption", "Interference resistance"] : ["频点定制", "功率档位", "加密方案", "抗干扰设计"] },
    { icon: Wifi, title: isEn ? "Data Link" : "数据链路", items: isEn ? ["Frequency bands", "Transmission distance", "Data protocols", "Encryption"] : ["频段定制", "传输距离", "数据协议", "加密方案"] },
    { icon: Camera, title: isEn ? "Gimbal & Camera" : "云台相机", items: isEn ? ["Camera integration", "Stabilization algorithms", "Interface protocols", "Control systems"] : ["相机集成", "稳定算法", "接口协议", "控制系统"] },
    { icon: Settings, title: isEn ? "Other Components" : "其他配件", items: isEn ? ["GPS modules", "Obstacle avoidance", "Lighting systems", "Parachute systems"] : ["GPS模块", "避障系统", "照明系统", "降落伞系统"] },
  ];

  const services = isEn 
    ? ["OEM/ODM Customization", "Firmware Development", "Hardware Modification", "Protocol Customization", "Certification Support", "Batch Production", "Quality Assurance", "Technical Training"]
    : ["OEM/ODM定制", "固件开发", "硬件改型", "协议定制", "认证支持", "批量生产", "质量保证", "技术培训"];

  const cases = isEn ? [
    {
      title: "Custom Flight Controller",
      client: "Industrial Drone Manufacturer",
      description: "Customized industrial-grade flight controller with enhanced stability algorithms and dual redundancy design.",
    },
    {
      title: "Long-Range VTX Solution",
      client: "Security Equipment Company",
      description: "Developed custom video transmission system with 50km range and AES256 encryption for security applications.",
    },
    {
      title: "Agricultural ESC System",
      client: "Agricultural Drone Brand",
      description: "Designed high-power ESC system with IP67 protection and intelligent temperature control for agricultural spraying.",
    },
  ] : [
    {
      title: "定制飞控系统",
      client: "工业无人机制造商",
      description: "定制工业级飞控系统，增强稳定性算法，采用双冗余设计，满足严苛工业环境需求。",
    },
    {
      title: "远距离图传方案",
      client: "安防设备公司",
      description: "开发定制图传系统，传输距离50公里，支持AES256加密，满足安防领域应用需求。",
    },
    {
      title: "农业电调系统",
      client: "农业无人机品牌",
      description: "设计大功率电调系统，IP67防护等级，智能温控设计，专为农业植保应用优化。",
    },
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={isEn ? "Drone Accessories Customization" : "无人机配件定制"}
        description={isEn ? "Comprehensive drone accessory customization including flight controllers, ESCs, video transmitters" : "提供飞控、电调、图传等全系列配件定制服务"}
        keywords={isEn ? "drone accessories,flight controller,ESC,video transmitter,customization" : "无人机配件,飞控,电调,图传,定制"}
        path="/custom-research/accessories"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <div className="bg-secondary py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">{isEn ? "Home" : "首页"}</Link>
              <span>/</span>
              <Link to="/custom-research" className="hover:text-accent">{isEn ? "R&D Custom" : "科研定制"}</Link>
              <span>/</span>
              <span className="text-foreground">{isEn ? "Accessories Custom" : "配件定制"}</span>
            </div>
          </div>
        </div>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <BackButton to="/custom-research" label={isEn ? "Back to R&D Custom" : "返回科研定制"} />
                <h1 className="text-3xl md:text-5xl font-bold mb-6">{isEn ? "Drone Accessories Customization" : "无人机配件定制"}</h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {isEn 
                    ? "With 200+ R&D engineers across embedded, hardware, software, structure, and technical support departments, we provide comprehensive drone accessory customization services including flight controllers, ESCs, video transmitters, and more."
                    : "拥有200多人的研发团队，涵盖嵌入式部门、硬件部门、软件部门、结构部门、技术支持部门和装配部门，提供飞控、电调、图传等全系列配件定制服务。"}
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
                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80" alt={isEn ? "Accessories Custom" : "配件定制"} className="rounded-2xl shadow-2xl w-full" />
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
              {isEn ? "Complete R&D departments covering the full product development lifecycle" : "完整的研发部门配置，覆盖产品开发全生命周期"}
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
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{isEn ? "Customizable Accessories" : "可定制配件类型"}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
              {isEn ? "Full range of drone accessories customization services" : "提供全系列无人机配件定制服务"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {accessories.map((item, index) => (
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
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">{isEn ? "Our Services" : "服务内容"}</h2>
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
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{isEn ? "Case Studies" : "案例展示"}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
              {isEn ? "Successfully delivered customized accessory solutions for numerous enterprises" : "成功为众多企业提供配件定制解决方案"}
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
              {isEn ? "Start Your Customization Project" : "开启配件定制项目"}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Contact our professional team to discuss your customization requirements"
                : "联系我们的专业团队，讨论您的定制需求"}
            </p>
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

export default AccessoriesCustom;
