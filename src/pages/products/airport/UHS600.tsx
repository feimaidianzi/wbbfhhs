import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Mail, Zap, Cloud, Wifi, Settings, Shield, Box } from "lucide-react";
import { Link } from "react-router-dom";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";

const UHS600 = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const specs = [
    { label: "载机重量", labelEn: "Drone Weight", value: "≤25kg", valueEn: "≤25kg" },
    { label: "充电功率", labelEn: "Charging Power", value: "600W", valueEn: "600W" },
    { label: "充电时间", labelEn: "Charging Time", value: "<40分钟", valueEn: "<40 min" },
    { label: "占地面积", labelEn: "Footprint", value: "2m²", valueEn: "2m²" },
    { label: "部署时间", labelEn: "Deployment Time", value: "<10分钟", valueEn: "<10 min" },
    { label: "防护等级", labelEn: "Protection", value: "IP65", valueEn: "IP65" },
    { label: "工作温度", labelEn: "Operating Temp", value: "-20°C~55°C", valueEn: "-20°C~55°C" },
    { label: "通信方式", labelEn: "Communication", value: "4G/5G/专网", valueEn: "4G/5G/Private Network" },
    { label: "定位精度", labelEn: "Positioning Accuracy", value: "±5cm (RTK)", valueEn: "±5cm (RTK)" },
  ];

  const features = [
    { icon: Box, title: "紧凑设计", titleEn: "Compact Design", description: "仅2平方米占地，灵活部署", descriptionEn: "Only 2m² footprint, flexible deployment" },
    { icon: Zap, title: "高效充电", titleEn: "Efficient Charging", description: "600W充电，40分钟恢复续航", descriptionEn: "600W charging, 40-minute recharge" },
    { icon: Cloud, title: "全天候", titleEn: "All-Weather", description: "IP65防护，适应各种天气", descriptionEn: "IP65 protection, adapts to all weather" },
    { icon: Wifi, title: "远程管理", titleEn: "Remote Management", description: "云端平台，远程监控调度", descriptionEn: "Cloud platform, remote monitoring & dispatch" },
    { icon: Shield, title: "安全稳定", titleEn: "Safe & Stable", description: "多重保护，稳定可靠", descriptionEn: "Multiple protections, stable & reliable" },
    { icon: Settings, title: "快速部署", titleEn: "Quick Deployment", description: "10分钟内完成安装部署", descriptionEn: "Complete installation within 10 minutes" },
  ];

  const applications = [
    { zh: "城市级无人机巡检", en: "City-Level Drone Inspection" },
    { zh: "中型光伏电站", en: "Medium Solar Power Stations" },
    { zh: "配电线路巡检", en: "Distribution Line Inspection" },
    { zh: "城市安防监控", en: "Urban Security Monitoring" },
    { zh: "智慧园区管理", en: "Smart Park Management" },
    { zh: "水利设施巡检", en: "Water Facility Inspection" },
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
              <span className="text-foreground">{isEn ? "UHS 600 Auto Airport" : "UHS 600自动机场"}</span>
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
                  {isEn ? "UHS 600 Auto Airport" : "UHS 600自动机场"}
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {isEn 
                    ? "Compact automatic airport suitable for various scenarios with rapid deployment and efficient operation. Requiring only 2m² footprint, it's ideal for city-level inspection and medium industrial applications."
                    : "紧凑型自动机场，适用于多种场景，具备快速部署和高效运营能力。仅需2平方米占地面积，是城市级巡检和中型工业场景的理想选择。"}
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
                  src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&q=80"
                  alt={isEn ? "UHS 600 Auto Airport" : "UHS 600自动机场"}
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground px-6 py-3 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold">2m²</div>
                  <div className="text-sm">{isEn ? "Compact Footprint" : "紧凑占地"}</div>
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
              {isEn ? "Learn More About UHS 600 Solutions" : "了解更多UHS 600解决方案"}
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

export default UHS600;
