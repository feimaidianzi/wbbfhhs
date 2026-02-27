import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LangLink as Link } from "@/components/LangLink";
import { BackButton } from "@/components/BackButton";
import { FloatingContact } from "@/components/FloatingContact";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageStructuredData } from "@/components/PageStructuredData";
import { useLanguage } from "@/contexts/LanguageContext";
import { Weight, Clock, Mountain, Sun, Radio, Leaf, Wifi, Shield, Zap, Settings, Gauge, Cable, Monitor, Eye, ChevronRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

import heroImg from "@/assets/products/th300-hero-mountain.png";
import payloadImg from "@/assets/products/th300-payload-30kg.png";
import lightingImg from "@/assets/products/th300-lighting.png";
import commRelayImg from "@/assets/products/th300-comm-relay.png";
import envMonitorImg from "@/assets/products/th300-env-monitor.png";
import fiberBtImg from "@/assets/products/th300-fiber-bt.png";
import flight24hImg from "@/assets/products/th300-24h-flight.png";
import altitude200mImg from "@/assets/products/th300-200m-altitude.png";
import safetyImg from "@/assets/products/th300-safety-design.png";
import voltageImg from "@/assets/products/th300-voltage-adjust.png";
import droneDisplayImg from "@/assets/products/th300-drone-display.png";

import firefightingImg from "@/assets/seo/firefighting-aerial-response.jpg";
import emergencyImg from "@/assets/seo/emergency-rescue-night.jpg";
import rescueImg from "@/assets/seo/emergency-rescue.jpg";
import powerImg from "@/assets/seo/power-transmission-inspection.jpg";

const TH300 = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  // Hero highlights
  const heroStats = [
    { value: "24h", label: isZh ? "持续滞空" : "Continuous Flight" },
    { value: "30kg", label: isZh ? "最大载重" : "Max Payload" },
    { value: "200m", label: isZh ? "飞行高度" : "Flight Altitude" },
  ];

  // Core features - from reference images
  const coreFeatures = [
    {
      icon: Weight,
      value: "30",
      unit: "kg",
      title: isZh ? "大载重" : "Heavy Payload",
      desc: isZh
        ? "无人机最大挂载30公斤，可同时挂载照明、喊话、通信中继、环境监测等设备"
        : "Max payload 30kg, supports simultaneous mounting of lighting, PA, comm relay, and environmental monitoring equipment",
      image: payloadImg,
    },
    {
      icon: Clock,
      value: "24",
      unit: "h",
      title: isZh ? "滞空时间24小时" : "24-Hour Flight Time",
      desc: isZh
        ? "无人机搭配供电基站，可实行载重30公斤，滞空24小时。6轴多旋翼无人机可滞空24小时"
        : "With power station, supports 30kg payload for 24-hour continuous flight. 6-axis multi-rotor drone with 24h endurance",
      image: flight24hImg,
    },
    {
      icon: Mountain,
      value: "200",
      unit: "m",
      title: isZh ? "200米高度" : "200m Altitude",
      desc: isZh
        ? "无人机供电基站，自动收放系统，有效飞行高度200米"
        : "Drone power station with automatic tether system, effective flight altitude up to 200 meters",
      image: altitude200mImg,
    },
  ];

  // Payload/application modules
  const payloadModules = [
    {
      icon: Sun,
      title: isZh ? "照明" : "Lighting",
      desc: isZh
        ? "无人机搭配6个高亮10000流明LED大灯，有效照明10000平方米"
        : "6 high-brightness 10,000 lumen LED lights, effective illumination area of 10,000 sqm",
      image: lightingImg,
    },
    {
      icon: Radio,
      title: isZh ? "通信中继" : "Communication Relay",
      desc: isZh
        ? "无人机可搭载通信中继系统，200米高空辐射范围5公里"
        : "Onboard comm relay system, 200m altitude with 5km coverage radius",
      image: commRelayImg,
    },
    {
      icon: Leaf,
      title: isZh ? "环境监测" : "Environmental Monitoring",
      desc: isZh
        ? "无人机可搭载环境监测系统，可24小时实时监测环境数据"
        : "Onboard environmental monitoring system for 24-hour real-time data collection",
      image: envMonitorImg,
    },
    {
      icon: Wifi,
      title: isZh ? "光纤+蓝牙" : "Fiber + Bluetooth",
      desc: isZh
        ? "可实时光纤数据传输，内置蓝牙模块，可通过手机实时操控供电基站"
        : "Real-time fiber optic data transmission with built-in Bluetooth for mobile control of power station",
      image: fiberBtImg,
    },
  ];

  // Ground station features
  const groundStationFeatures = [
    {
      icon: Shield,
      title: isZh ? "防触电安全设计" : "Electric Shock Protection",
      desc: isZh
        ? "强弱电分离，地面高压电(400-500V)有开关隔离，可使操作人员在收放线缆时免遭高压电击危险"
        : "Strong/weak current separation, ground HV (400-500V) with switch isolation for operator safety during cable handling",
      image: safetyImg,
      labels: isZh
        ? ["LED显示屏", "绞盘控制旋钮", "电缆电源按钮", "系统开关", "电缆观察窗", "电缆出线口", "报警灯", "光纤输出口"]
        : ["LED Display", "Winch Control Knob", "Cable Power Button", "System Switch", "Cable Window", "Cable Outlet", "Warning Light", "Fiber Output"],
    },
    {
      icon: Gauge,
      title: isZh ? "输出电压可调" : "Adjustable Output Voltage",
      desc: isZh
        ? "电源电压可调节400~500Vdc电压输入机载电源，电流可调节5~10A"
        : "Adjustable power voltage 400-500Vdc input to onboard power, current adjustable 5-10A",
      image: voltageImg,
    },
  ];

  // Drone specs (10kg aircraft)
  const droneSpecs = [
    { label: isZh ? "产品材质" : "Material", value: isZh ? "碳纤维+航空铝" : "Carbon Fiber + Aviation Aluminum" },
    { label: isZh ? "旋翼数量" : "Rotors", value: isZh ? "4轴4桨" : "4-axis 4-propeller" },
    { label: isZh ? "轴距" : "Wheelbase", value: "1834mm" },
    { label: isZh ? "展开尺寸" : "Unfolded Size", value: "1300×1300×540mm" },
    { label: isZh ? "折叠尺寸" : "Folded Size", value: "880×760×540mm" },
    { label: isZh ? "空机质量" : "Empty Weight", value: "9.5kg" },
    { label: isZh ? "最大载荷量" : "Max Payload", value: "10kg" },
    { label: isZh ? "最大起飞质量" : "Max Takeoff Weight", value: "25kg" },
    { label: isZh ? "定位系统" : "Positioning", value: isZh ? "RTK厘米级定位系统" : "RTK CM-level Positioning" },
    { label: isZh ? "航线偏航" : "Route Deviation", value: "±5cm" },
    { label: isZh ? "动力系统" : "Power System", value: isZh ? "FOC高效动力系统" : "FOC High-efficiency" },
    { label: isZh ? "螺旋桨" : "Propeller", value: "2388" },
    { label: isZh ? "动力电池" : "Battery", value: "6s16000mAh15c ×2" },
    { label: isZh ? "遥控器" : "Controller", value: "H16" },
    { label: isZh ? "飞行半径（手动）" : "Flight Radius (Manual)", value: "10km" },
    { label: isZh ? "空机悬停时间" : "Hover Time (Empty)", value: "30min" },
    { label: isZh ? "最大飞行速度" : "Max Speed", value: "≤10m/s" },
    { label: isZh ? "可抗风等级" : "Wind Resistance", value: isZh ? "≤5级" : "≤Level 5" },
  ];

  // Ground station specs (3.5KW)
  const stationSpecs = [
    { label: isZh ? "功率" : "Power", value: "3500W", highlight: true },
    { label: isZh ? "系统基站尺寸" : "Station Size", value: "50cm×40cm×35cm (L×W×H)" },
    { label: isZh ? "系留基站重量" : "Station Weight", value: "29±1kg" },
    { label: isZh ? "线长" : "Cable Length", value: isZh ? "100m/200m（可选）" : "100m/200m (Optional)" },
    { label: isZh ? "线缆重量" : "Cable Weight", value: "1.8kg" },
    { label: isZh ? "输出电源" : "Output Power", value: "48Vdc" },
    { label: isZh ? "输入电压" : "Input Voltage", value: "220Vac 50Hz" },
    { label: isZh ? "最大输出电流" : "Max Output Current", value: "8A" },
    { label: isZh ? "额定输出功率" : "Rated Output", value: "3.5kW", highlight: true },
    { label: isZh ? "抗拉强度" : "Tensile Strength", value: "50kg" },
    { label: isZh ? "收放系统" : "Tether System", value: isZh ? "自动" : "Automatic" },
    { label: isZh ? "是否含光纤" : "Fiber Optic", value: isZh ? "选配" : "Optional" },
  ];

  // Application scenarios
  const applications = [
    { title: isZh ? "消防" : "Firefighting", image: firefightingImg, desc: isZh ? "森林消防、城市消防" : "Forest & urban firefighting" },
    { title: isZh ? "应急" : "Emergency", image: emergencyImg, desc: isZh ? "应急照明、通信保障" : "Emergency lighting & comms" },
    { title: isZh ? "救援" : "Rescue", image: rescueImg, desc: isZh ? "搜救定位、物资投送" : "Search & rescue, supply drops" },
    { title: isZh ? "电力巡检" : "Power Inspection", image: powerImg, desc: isZh ? "输电线路巡查监控" : "Power line patrol & monitoring" },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <MultiLanguageSEO
        title={isZh ? "CANI T300 大载重系留无人机 - 24小时滞空·30公斤载重·200米高空" : "CANI T300 Heavy-Payload Tethered Drone - 24h Flight · 30kg Payload · 200m Altitude"}
        description={isZh ? "CANI T300大载重系留无人机系统，配备3.5KW供电基站，支持24小时持续飞行，30公斤最大载重，200米飞行高度。可搭载照明、通信中继、环境监测等多种任务载荷。" : "CANI T300 heavy-payload tethered drone system with 3.5KW power station, 24-hour continuous flight, 30kg payload, 200m altitude. Supports lighting, comm relay, environmental monitoring payloads."}
        keywords={isZh ? "系留无人机,大载重无人机,T300,24小时飞行,通信中继,应急照明,消防无人机" : "tethered drone, heavy payload drone, T300, 24h flight, comm relay, emergency lighting"}
        path="/products/tethered/th-300"
      />
      <PageStructuredData data={{ type: 'Product', name: 'CANI T300', description: 'Heavy-Payload Tethered Drone System', category: 'Tethered Drone', sku: 'T300' }} />
      <Header />
      <FloatingContact />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img src={heroImg} alt="CANI T300" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-950/30 to-gray-950" />
        </div>

        <BackButton to="/products/tethered" label={isZh ? "← 返回系留无人机" : "← Back to Tethered"} />

        <div className="relative z-10 container mx-auto px-4 text-center pt-20">
          <p className="text-cyan-400 font-mono tracking-[0.3em] uppercase text-sm mb-4 animate-fade-in">
            CANI T300 TETHERED SYSTEM
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 animate-fade-in tracking-tight">
            {isZh ? "大载重系留无人机" : "Heavy-Payload Tethered Drone"}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {isZh
              ? "旗舰级系留平台，24小时持续滞空，30公斤大载重，200米高空作业"
              : "Flagship tethered platform: 24h continuous flight, 30kg payload, 200m altitude"}
          </p>

          {/* Hero stats */}
          <div className="flex justify-center gap-12 md:gap-20 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {heroStats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-5xl font-black text-white">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center gap-4 mt-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/contact">
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold px-8 py-3 min-h-[44px] min-w-[44px] text-base">
                <Phone className="w-4 h-4 mr-2" />
                {isZh ? "获取报价" : "Get Quote"}
              </Button>
            </Link>
            <a href="#specs">
              <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-800 px-8 py-3 min-h-[44px] min-w-[44px] text-base">
                {isZh ? "查看参数" : "View Specs"}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ===== CORE FEATURES - 3 big cards ===== */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            {isZh ? "核心性能" : "Core Performance"}
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            {isZh ? "三大核心指标定义旗舰级系留无人机平台" : "Three core metrics define the flagship tethered drone platform"}
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {coreFeatures.map((feat, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden border border-gray-800 hover:border-cyan-500/50 transition-all duration-500">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={feat.image} alt={feat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-5xl font-black text-cyan-400">{feat.value}</span>
                    <span className="text-xl font-bold text-cyan-400/80">{feat.unit}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DRONE DISPLAY ===== */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            {isZh ? "产品展示" : "Product Display"}
          </h2>
          <p className="text-gray-400 text-center mb-12">
            {isZh ? "6轴多旋翼工业级系留无人机，折叠式碳纤维机身设计" : "6-axis multi-rotor industrial tethered drone with foldable carbon fiber body"}
          </p>
          <div className="max-w-3xl mx-auto">
            <img src={droneDisplayImg} alt="CANI T300 Drone Views" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* ===== PAYLOAD MODULES ===== */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            {isZh ? "任务载荷模块" : "Payload Modules"}
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            {isZh ? "模块化设计，可根据任务需求灵活配置多种载荷" : "Modular design for flexible payload configuration based on mission requirements"}
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {payloadModules.map((mod, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden border border-gray-800 hover:border-cyan-500/30 transition-all duration-500">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={mod.image} alt={mod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <mod.icon className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-xl font-bold text-white">{mod.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{mod.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GROUND STATION ===== */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            {isZh ? "3.5KW 供电基站" : "3.5KW Power Station"}
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            {isZh ? "工业级供电基站，自动收放线缆，强弱电分离安全设计" : "Industrial-grade power station with automatic tether management and safety isolation"}
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {groundStationFeatures.map((feat, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={feat.image} alt={feat.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <feat.icon className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">{feat.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPECIFICATIONS ===== */}
      <section id="specs" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            {isZh ? "产品参数" : "Technical Specifications"}
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Drone specs */}
            <div>
              <h3 className="text-cyan-400 font-bold text-lg mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                {isZh ? "10公斤飞机" : "10kg Aircraft"}
              </h3>
              <div className="space-y-0">
                {droneSpecs.map((spec, i) => (
                  <div key={i} className={`flex justify-between py-3 border-b border-gray-800 ${i % 2 === 0 ? 'bg-gray-800/20' : ''} px-3 rounded-sm`}>
                    <span className="text-gray-400 text-sm">{spec.label}</span>
                    <span className="text-white text-sm font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Station specs */}
            <div>
              <h3 className="text-cyan-400 font-bold text-lg mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                {isZh ? "3.5KW系留基站" : "3.5KW Tethered Station"}
              </h3>
              <div className="space-y-0">
                {stationSpecs.map((spec, i) => (
                  <div key={i} className={`flex justify-between py-3 border-b border-gray-800 ${spec.highlight ? 'bg-cyan-500/5' : i % 2 === 0 ? 'bg-gray-800/20' : ''} px-3 rounded-sm`}>
                    <span className="text-gray-400 text-sm">{spec.label}</span>
                    <span className={`text-sm font-medium ${spec.highlight ? 'text-cyan-400' : 'text-white'}`}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== APPLICATION SCENARIOS ===== */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            {isZh ? "应用场景" : "Application Scenarios"}
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            {isZh ? "广泛应用于消防、应急、救援、电力巡检等多种场景" : "Widely used in firefighting, emergency, rescue, and power inspection scenarios"}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {applications.map((app, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer">
                <img src={app.image} alt={app.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-white font-bold text-lg">{app.title}</h4>
                  <p className="text-gray-300 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{app.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {isZh ? "了解更多 CANI T300 解决方案" : "Learn More About CANI T300 Solutions"}
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            {isZh ? "联系我们的专业团队，获取定制化配置方案和详细报价" : "Contact our team for customized configuration and detailed pricing"}
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact">
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold px-8 py-3 min-h-[44px] min-w-[44px]">
                <Phone className="w-4 h-4 mr-2" />
                {isZh ? "联系我们" : "Contact Us"}
              </Button>
            </Link>
            <a href="mailto:info@caniuav.com">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 min-h-[44px] min-w-[44px]">
                <Mail className="w-4 h-4 mr-2" />
                info@caniuav.com
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TH300;
