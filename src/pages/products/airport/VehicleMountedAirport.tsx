import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Mail, Car, Zap, Clock, Shield, Wifi, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";

const VehicleMountedAirport = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const specs = [
    { label: "载机重量", labelEn: "Drone Weight", value: "≤30kg", valueEn: "≤30kg" },
    { label: "展开时间", labelEn: "Deployment Time", value: "<3分钟", valueEn: "<3 min" },
    { label: "工作温度", labelEn: "Operating Temp", value: "-20°C~55°C", valueEn: "-20°C~55°C" },
    { label: "防护等级", labelEn: "Protection", value: "IP65", valueEn: "IP65" },
    { label: "充电功率", labelEn: "Charging Power", value: "800W", valueEn: "800W" },
    { label: "通信方式", labelEn: "Communication", value: "4G/5G/专网", valueEn: "4G/5G/Private Network" },
    { label: "供电方式", labelEn: "Power Supply", value: "车载电源/独立电源", valueEn: "Vehicle Power/Independent Power" },
    { label: "安装方式", labelEn: "Installation", value: "快速拆装设计", valueEn: "Quick-release design" },
  ];

  const features = [
    { icon: Car, title: "快速部署", titleEn: "Rapid Deployment", description: "3分钟内完成展开，适应紧急任务需求", descriptionEn: "Deploy within 3 minutes for emergency missions" },
    { icon: Zap, title: "智能充电", titleEn: "Smart Charging", description: "自动对接充电，快速恢复无人机续航", descriptionEn: "Auto docking & charging for quick drone recovery" },
    { icon: Clock, title: "全天候作业", titleEn: "All-Weather Operation", description: "-20°C~55°C环境适应，风雨无阻", descriptionEn: "-20°C to 55°C operation, rain or shine" },
    { icon: Shield, title: "高防护等级", titleEn: "High Protection", description: "IP65防护，适应各种恶劣环境", descriptionEn: "IP65 protection for harsh environments" },
    { icon: Wifi, title: "远程监控", titleEn: "Remote Monitoring", description: "4G/5G实时传输，远程操控管理", descriptionEn: "4G/5G real-time transmission & remote control" },
    { icon: Settings, title: "模块化设计", titleEn: "Modular Design", description: "易于维护，快速更换核心部件", descriptionEn: "Easy maintenance, quick core component replacement" },
  ];

  const applications = [
    { zh: "应急救援现场快速侦察", en: "Emergency Rescue Site Rapid Reconnaissance" },
    { zh: "移动式电力线路巡检", en: "Mobile Power Line Inspection" },
    { zh: "交通事故现场勘察", en: "Traffic Accident Site Investigation" },
    { zh: "大型活动安保监控", en: "Large Event Security Monitoring" },
    { zh: "森林火情移动监测", en: "Mobile Forest Fire Monitoring" },
    { zh: "边境巡逻机动部署", en: "Border Patrol Mobile Deployment" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="bg-secondary py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">{isEn ? "Home" : "首页"}</Link>
              <span>/</span>
              <Link to="/products/airport" className="hover:text-accent">{isEn ? "Airport Systems" : "机场系统"}</Link>
              <span>/</span>
              <span className="text-foreground">{isEn ? "Vehicle-Mounted Airport" : "车载自动机场"}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <BackButton to="/products/airport" label={isEn ? "Back to Airport Systems" : "返回机场系统"} />
                <h1 className="text-3xl md:text-5xl font-bold mb-6">
                  {isEn ? "Vehicle-Mounted Auto Airport" : "车载自动机场"}
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {isEn 
                    ? "Multi-dimensional cross-domain integration for air-ground collaborative, human-machine fusion intelligent solutions. Rapidly deployable on various vehicle platforms for mobile unmanned inspection. Designed for emergency response and mobile operations, fully automatic deployment within 3 minutes."
                    : "多维跨域，相得益彰。空地跨域协同、人机共融的智能化解决方案，可快速部署于各类车辆平台，实现移动式无人值守巡检。专为应急响应和移动作业场景设计，3分钟内完成全自动展开。"}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                    {isEn ? "Get Quote" : "获取报价"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button className="bg-primary/10 border border-primary/30 text-foreground hover:bg-primary/20 px-8 py-6 text-lg">
                    <Phone className="w-5 h-5 mr-2" />
                    {isEn ? "Call Us" : "电话咨询"}
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&q=80"
                  alt={isEn ? "Vehicle-Mounted Auto Airport" : "车载自动机场"}
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground px-6 py-3 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold">{isEn ? "3 min" : "3分钟"}</div>
                  <div className="text-sm">{isEn ? "Quick Deploy" : "快速展开"}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">
              {isEn ? "Core Advantages" : "核心优势"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{isEn ? feature.titleEn : feature.title}</h3>
                  <p className="text-muted-foreground">{isEn ? feature.descriptionEn : feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specs */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">
              {isEn ? "Technical Specifications" : "技术参数"}
            </h2>
            <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-card overflow-hidden">
              <table className="w-full">
                <tbody>
                  {specs.map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-secondary/30' : ''}>
                      <td className="px-6 py-4 font-medium border-b border-border/50">
                        {isEn ? spec.labelEn : spec.label}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground border-b border-border/50">
                        {isEn ? spec.valueEn : spec.value}
                      </td>
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
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">
              {isEn ? "Application Scenarios" : "应用场景"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {applications.map((app, index) => (
                <div key={index} className="flex items-center gap-3 bg-card p-4 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>{isEn ? app.en : app.zh}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-6">
              {isEn ? "Learn More About Vehicle-Mounted Airport Solutions" : "了解更多车载自动机场解决方案"}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              {isEn 
                ? "Contact our professional team for customized configuration and detailed quotation"
                : "联系我们的专业团队，获取定制化配置方案和详细报价"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg">
                <Mail className="w-5 h-5 mr-2" />
                {isEn ? "Contact Now" : "立即咨询"}
              </Button>
              <a href="tel:+8617674048404">
                <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-10 py-6 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  17674048404
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

export default VehicleMountedAirport;
