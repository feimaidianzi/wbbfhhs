import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { BackButton } from "@/components/BackButton";
import { LayoutGrid, Droplets, Settings, Cpu, Zap, Truck, Radar, Battery, Monitor } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import th100Hero from "@/assets/products/th-100-hero.png";
import th100GroundUnit from "@/assets/products/th-100-ground-unit.png";
import th100CleaningModes from "@/assets/products/th-100-cleaning-modes.png";
import th100Telescopic from "@/assets/products/th-100-telescopic.png";
import th100Psdk from "@/assets/products/th-100-psdk.png";
import th100Radar from "@/assets/products/th-100-radar.png";
import th100Drone from "@/assets/products/th-100-drone.png";
import th100Controller from "@/assets/products/th-100-controller.png";
import th100PowerUnit from "@/assets/products/th-100-power-unit.png";
import th100WashSystem from "@/assets/products/th-100-wash-system.png";
import th100CleaningSystem from "@/assets/products/th-100-cleaning-system.png";
import th100Tower from "@/assets/products/th-100-tower.jpg";
import th100Insulator from "@/assets/products/th-100-insulator.jpg";
import th100Building from "@/assets/products/th-100-building.jpg";
import th100Solar from "@/assets/products/th-100-solar.jpg";
import th100Wash1 from "@/assets/products/th-100-wash-1.png";
import th100Wash2 from "@/assets/products/th-100-wash-2.png";
import th100Wash3 from "@/assets/products/th-100-wash-3.png";
import th100Before from "@/assets/products/th-100-before.png";

const TH100 = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const highlights = [{
    icon: LayoutGrid,
    title: isEn ? "Multi-Mode" : "多模式",
    subtitle: isEn ? "High-Pressure Cleaning" : "高压清洁系统"
  }, {
    icon: Droplets,
    title: "195 Bar",
    subtitle: isEn ? "Working Pressure" : "工作压力"
  }, {
    icon: Settings,
    title: "IP55",
    subtitle: isEn ? "Protection Level" : "防护等级"
  }, {
    icon: Cpu,
    title: "PSDK",
    subtitle: isEn ? "Embedded Control" : "嵌入式控制系统"
  }, {
    icon: Zap,
    title: "4-6kW",
    subtitle: isEn ? "Max Power Supply" : "最大供电功率"
  }, {
    icon: Truck,
    title: "50-100m",
    subtitle: isEn ? "Working Height" : "作业高度"
  }];

  const leftSpecs = [{
    label: isEn ? "Weight" : "重量",
    value: "15Kg"
  }, {
    label: isEn ? "Protection Level" : "防护等级",
    value: "IP55"
  }, {
    label: isEn ? "Operating Temp" : "工作温度",
    value: "-30°C ~ 55°C"
  }, {
    label: isEn ? "Operating Humidity" : "工作湿度",
    value: "5%~95%"
  }, {
    label: isEn ? "Max Operating Altitude" : "最大工作海拔高度",
    value: isEn ? "5000 m" : "5000 米"
  }, {
    label: isEn ? "Cable Durability" : "线缆耐久寿命",
    value: isEn ? "≥3000 cycles" : "≥3000 次（收放次数）"
  }];

  const rightSpecs = [{
    label: isEn ? "Working Height" : "作业高度",
    value: isEn ? "50m / 100m" : "50米 / 100米"
  }, {
    label: isEn ? "Max Power Supply" : "最大供电功率",
    value: "4KW / 6KW"
  }, {
    label: isEn ? "Working Pressure" : "工作压力",
    value: "195 Bar"
  }, {
    label: isEn ? "Pump Waterproof" : "泵机防水",
    value: "IPX5"
  }, {
    label: isEn ? "Mobility" : "移动方式",
    value: isEn ? "Portable / Trailer / Vehicle" : "手提 / 拖行 / 车载"
  }, {
    label: isEn ? "Customization" : "定制开发",
    value: isEn ? "OEM & UI customization" : "支持OEM和系统界面定制"
  }, {
    label: isEn ? "Open System" : "系统开放",
    value: isEn ? "Third-party API access" : "开放第三方开发接口"
  }];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={isEn ? "TH-100 Tethered Drone Aerial Cleaning & Power System" : "TH-100 无人机系留式空中清洁与供电系统"} 
        description={isEn ? "TH-100 dual-cable tethered aerial cleaning system with ground power & water supply for efficient continuous cleaning operations" : "TH-100双缆系留式空中清洁系统，地面同步供电供水，高效能持续清洁作业全系统解决方案"} 
        keywords={isEn ? "tethered drone,aerial cleaning,TH-100,high pressure wash,drone cleaning" : "系留无人机,空中清洁,TH-100,高压清洗,无人机清洁"} 
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-5" />
        
        <BackButton to="/products/tethered" label={isEn ? "Back to Tethered Drones" : "返回系留无人机"} />

        <div className="container mx-auto px-4 text-center pt-16 md:pt-20">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
            {isEn ? "TH-100 Tethered Drone Aerial Cleaning & Power System" : "TH-100 无人机系留式空中清洁与供电系统"}
          </h1>
          <div className="space-y-2 mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <p className="text-lg md:text-xl text-gray-300">
              {isEn ? "Dual-Cable Tethered Aerial Cleaning System—Ground Power & Water Supply" : "双缆系留式空中清洁系统——地面同步供电供水"}
            </p>
            <p className="text-lg md:text-xl text-gray-300">
              {isEn ? "Efficient Continuous Cleaning Solution" : "高效能持续清洁作业全系统解决方案"}
            </p>
          </div>

          <div className="max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <img src={th100Hero} alt={isEn ? "TH-100 Aerial Cleaning System" : "TH-100 空中清洁系统"} className="w-full h-auto animate-float" />
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {highlights.map((item, index) => (
              <div key={index} className="group flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:from-gray-100 group-hover:to-gray-300 transition-all duration-300">
                  <item.icon className="w-10 h-10 md:w-12 md:h-12 text-gray-800" />
                </div>
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Pressure Tethered Cleaning System Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 animate-fade-in">
            {isEn ? "High-Pressure Tethered Cleaning Drone" : "高压系留方案清洗无人机"}
          </h2>
          <p className="text-center text-gray-400 max-w-4xl mx-auto mb-12 animate-fade-in leading-relaxed" style={{ animationDelay: "0.1s" }}>
            {isEn 
              ? "The high-pressure tethered cleaning drone features 'tethered power + high-pressure cleaning' as its core technology. Through dual differential precise positioning and millimeter-wave radar real-time ranging, it achieves fully automatic cleaning. Quick-release structure supports both fixed and oscillating cleaning mounts for rapid installation, with various angle nozzles to meet diverse cleaning needs including rooftops, gutters, glass curtain walls, stone facades, and solar panels."
              : "高压系留方案清洗无人机以"系留供电+高压清洗"为核心技术，通过双差分精准定位、支持毫米波雷达实时测距，实现全自动清洗功能。快拆式结构支持固定式和摆动式两种清洗挂载快速安装，配合多种角度喷嘴，满足屋面房顶、落叶水槽、玻璃幕墙、石材外墙、光伏板等多场景需求。降低用工成本的同时也大大降低了高空作业的安全风险。"}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-blue-500 transition-colors">
              <img src={th100Drone} alt={isEn ? "Drone" : "无人机"} className="w-full h-48 object-contain mb-4" />
              <h4 className="text-white font-semibold text-center">{isEn ? "Drone" : "无人机"}</h4>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-blue-500 transition-colors">
              <img src={th100Controller} alt={isEn ? "Controller" : "遥控器"} className="w-full h-48 object-contain mb-4" />
              <h4 className="text-white font-semibold text-center">{isEn ? "Controller" : "遥控器"}</h4>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-blue-500 transition-colors">
              <img src={th100PowerUnit} alt={isEn ? "Power Unit" : "电源"} className="w-full h-48 object-contain mb-4" />
              <h4 className="text-white font-semibold text-center">{isEn ? "Power Unit" : "电源"}</h4>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-blue-500 transition-colors">
              <img src={th100WashSystem} alt={isEn ? "Cleaning System" : "清洗系统"} className="w-full h-48 object-contain mb-4" />
              <h4 className="text-white font-semibold text-center">{isEn ? "Cleaning System" : "清洗系统"}</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Ground Unit Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 animate-fade-in">
            {isEn ? "TH-100 Tethered Cleaning Drone Specifications" : "TH-100系留清洗无人机参数"}
          </h2>
          
          <div className="max-w-5xl mx-auto mt-8">
            <p className="text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: "0.15s" }}>
              {isEn 
                ? "Compatible systems: 50m / 100m height options, tethered power enables 12 hours continuous aerial cleaning operation."
                : "适配系统：50米 / 100米高度可选，系留供电可实现12小时连续驻空清洗作业。"}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              {/* Left specs */}
              <div className="space-y-1">
                <div className="flex border-b border-gray-700 py-3">
                  <span className="text-gray-400 w-40">{isEn ? "Description" : "功能描述"}</span>
                  <span className="text-gray-300 flex-1">
                    {isEn 
                      ? "The system combines high-flow high-pressure pump with tethered power technology for continuous drone cleaning. Single-person visual integrated spray control, compact design for various work scenarios."
                      : "系统采用大流量高压泵体结合系留供电技术使无人机清洗可以持续作业，单人可视一体化操控喷洒，整机小巧，适合不同作业场景，安全高效完成清洗。"}
                  </span>
                </div>
                {leftSpecs.map((spec, index) => (
                  <div key={index} className="flex border-b border-gray-700 py-3">
                    <span className="text-gray-400 w-40">{spec.label}</span>
                    <span className="text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
              
              {/* Right specs */}
              <div className="space-y-1">
                {rightSpecs.map((spec, index) => (
                  <div key={index} className="flex border-b border-gray-700 py-3">
                    <span className="text-gray-400 w-32">{spec.label}</span>
                    <span className="text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cleaning Modes Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 animate-fade-in">
            {isEn ? "Multiple Cleaning Modes—Adaptable to Various Surfaces" : "多重清洁模式—适配各类表面"}
          </h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {isEn 
              ? "Switch between direct spray, fan spray (precise/wide-area cleaning), and specialized foam nozzle (deep foam application)."
              : "可在直射喷射、扇形喷雾（精准/广域清洁）及专用泡沫喷嘴（深层泡沫应用）间切换。"}
          </p>
          
          <div className="max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <img src={th100CleaningModes} alt={isEn ? "Multiple Cleaning Modes" : "多重清洁模式"} className="w-full h-auto hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </section>

      {/* Telescopic Design Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 animate-fade-in">
            {isEn ? "Telescopic Design—Easy Transport, Quick Deployment" : "伸缩式设计—便于运输，快速部署"}
          </h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {isEn ? "Three-stage telescopic spray arm for quick deployment and easy transport." : "三段式伸缩喷臂，快速展开，便于运输。"}
          </p>
          
          <div className="max-w-5xl mx-auto animate-fade-in relative" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <img src={th100Telescopic} alt={isEn ? "Telescopic Design" : "伸缩式设计"} className="w-full h-auto" />
              <div className="absolute top-[15%] right-[5%] text-right">
                <p className="text-amber-500 font-semibold text-lg md:text-xl">
                  {isEn ? "Max Length: 3.1m" : "最大伸展长度: 3.1米"}
                </p>
              </div>
              <div className="absolute bottom-[20%] right-[5%] text-right">
                <p className="text-amber-500 font-semibold text-lg md:text-xl">
                  {isEn ? "Min Length: 2.1m" : "最小长度: 2.1米"}
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-8">
              <div className="text-center">
                <p className="text-gray-300">{isEn ? "Max Extension:" : "最大伸展长度："}<span className="text-white font-bold">3.1{isEn ? "m" : "米"}</span></p>
                <p className="text-amber-500 text-sm">{isEn ? "*Ensure full extension during operation" : "*操作时需确保完全伸展"}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-300">{isEn ? "Min Length:" : "最小长度："}<span className="text-white font-bold">2.1{isEn ? "m" : "米"}</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PSDK Control Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 animate-fade-in">
            {isEn ? "PSDK Integrated Nozzle Swing Control" : "PSDK集成喷嘴摆动控制"}
          </h2>
          
          <div className="max-w-5xl mx-auto mt-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <img src={th100Psdk} alt={isEn ? "PSDK Integrated Control" : "PSDK集成控制"} className="w-full h-auto hover:scale-105 transition-transform duration-500" />
            <div className="flex items-center justify-center gap-2 mt-8">
              <Monitor className="w-6 h-6 text-blue-400" />
              <p className="text-xl text-white">
                {isEn ? "First-Person View Assisted Cleaning Operation" : "第一人称视角辅助清洁作业"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cleaning Comparison Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 animate-fade-in">
            {isEn ? "Professional Cleaning Results" : "专业清洗效果"}
          </h2>
          
          <div className="max-w-6xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <img src={th100Wash1} alt={isEn ? "First Wash" : "初次清洗"} className="w-full h-48 object-cover rounded-xl mb-4" />
                <p className="text-gray-400">{isEn ? "First Wash" : "初次清洗"}</p>
                <p className="text-white font-semibold">{isEn ? "Neutral Detergent" : "中性洗涤剂"}</p>
              </div>
              <div className="text-center">
                <img src={th100Wash2} alt={isEn ? "Second Wash" : "二次清洗"} className="w-full h-48 object-cover rounded-xl mb-4" />
                <p className="text-gray-400">{isEn ? "Second Wash" : "二次清洗"}</p>
                <p className="text-white font-semibold">{isEn ? "Glass Coating Agent" : "玻璃镀膜剂"}</p>
              </div>
              <div className="text-center">
                <img src={th100Wash3} alt={isEn ? "Third Wash" : "三次清洗"} className="w-full h-48 object-cover rounded-xl mb-4" />
                <p className="text-gray-400">{isEn ? "Third Wash" : "三次清洗"}</p>
                <p className="text-white font-semibold">{isEn ? "Clean Water" : "清水"}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <img src={th100Before} alt={isEn ? "Before Cleaning" : "清洗前效果"} className="w-full h-64 object-cover rounded-xl mb-4" />
                <p className="text-amber-500 font-semibold text-lg">{isEn ? "Before Cleaning" : "清洗前"}</p>
              </div>
              <div className="text-center">
                <img src={th100Before} alt={isEn ? "After Cleaning" : "清洗后效果"} className="w-full h-64 object-cover rounded-xl mb-4" />
                <p className="text-green-500 font-semibold text-lg">{isEn ? "After Cleaning" : "清洗后"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cleaning System Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 animate-fade-in">
            {isEn ? "Tethered Drone Cleaning System" : "无人机系留清洗系统"}
          </h2>
          <p className="text-center text-gray-300 max-w-4xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {isEn 
              ? "The cleaning pod is soft-connected to the aircraft body. Compact yet versatile, extremely safe, it can be widely used for high-rise building facades, solar panels, insulator strings, towers, and various other high-altitude cleaning scenarios."
              : "清洗吊舱与机身软连接，小巧多能、极致安全，可广泛应用于大厦外墙、光伏板绝缘子串、高塔等各类高空清洁场景，助力行业实现强效降本。"}
          </p>
          
          <div className="max-w-4xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <img src={th100CleaningSystem} alt={isEn ? "Tethered Drone Cleaning System" : "无人机系留清洗系统"} className="w-full h-auto" />
          </div>

          {/* Application Scenarios */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="group text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="overflow-hidden rounded-xl mb-4">
                <img src={th100Tower} alt={isEn ? "Tower Cleaning" : "高塔清洗"} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-white font-semibold">{isEn ? "Towers" : "高塔"}</p>
            </div>
            <div className="group text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="overflow-hidden rounded-xl mb-4">
                <img src={th100Insulator} alt={isEn ? "Insulator String Cleaning" : "绝缘子串清洗"} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-white font-semibold">{isEn ? "Insulator Strings" : "绝缘子串"}</p>
            </div>
            <div className="group text-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="overflow-hidden rounded-xl mb-4">
                <img src={th100Building} alt={isEn ? "Building Facade Cleaning" : "大厦外墙清洗"} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-white font-semibold">{isEn ? "Building Facades" : "大厦外墙"}</p>
            </div>
            <div className="group text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="overflow-hidden rounded-xl mb-4">
                <img src={th100Solar} alt={isEn ? "Solar Panel Cleaning" : "光伏板清洗"} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-white font-semibold">{isEn ? "Solar Panels" : "光伏板"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in">
            {isEn ? "Learn More About TH-100 Solutions" : "了解更多TH-100解决方案"}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {isEn 
              ? "Contact our professional team for customized configuration and detailed quotation"
              : "联系我们的专业团队，获取定制化配置方案和详细报价"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Link to="/contact" className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              {isEn ? "Contact Now" : "立即咨询"}
            </Link>
            <Link to="/products/tethered" className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              {isEn ? "View More Products" : "查看更多产品"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TH100;
