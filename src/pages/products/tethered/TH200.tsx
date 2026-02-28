import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LangLink as Link } from "@/components/LangLink";
import { BackButton } from "@/components/BackButton";
import { FloatingContact } from "@/components/FloatingContact";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageStructuredData } from "@/components/PageStructuredData";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Weight, Clock, Mountain, Sun, Radio, Wind, Shield, Zap, Settings, Gauge,
  Camera, Eye, Volume2, Thermometer, Navigation, Phone, Mail, ChevronRight,
  Cpu, Wifi, Target, Plane
} from "lucide-react";

import heroImg from "@/assets/products/th200-hero-mountain.jpg";
import emergencyLightImg from "@/assets/products/th200-emergency-lighting-clean.jpg";
import coolingImg from "@/assets/products/th200-cooling-system.jpg";
import commRelayImg from "@/assets/products/th200-comm-relay.jpg";
import tetherEquipImg from "@/assets/products/th200-tether-equipment-clean.jpg";
import droneDisplayImg from "@/assets/products/th200-product-display-clean.jpg";

import firefightingImg from "@/assets/seo/firefighting-aerial-response.jpg";
import emergencyImg from "@/assets/seo/emergency-rescue-night.jpg";
import powerImg from "@/assets/seo/power-transmission-inspection.jpg";
import maritimeImg from "@/assets/seo/maritime-drone.jpg";

const TH200 = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  // Hero highlight stats
  const heroStats = [
    { icon: Radio, value: isZh ? "通信中继" : "Comm Relay", label: isZh ? "200米高空5公里覆盖" : "200m alt, 5km coverage" },
    { icon: Weight, value: "10kg", label: isZh ? "最大载荷" : "Max Payload" },
    { icon: Clock, value: "24h", label: isZh ? "系留滞空" : "Tethered Flight" },
    { icon: Navigation, value: isZh ? "高精度定位" : "Precision", label: "RTK cm-level" },
    { icon: Settings, value: isZh ? "挂载丰富" : "Payloads", label: isZh ? "满足不同场景" : "Multi-scenario" },
    { icon: Cpu, value: isZh ? "性能稳定" : "Stable", label: isZh ? "工业级可靠性" : "Industrial-grade" },
  ];

  // Core feature sections with images
  const coreFeatures = [
    {
      title: isZh ? "应急照明" : "Emergency Lighting",
      desc: isZh
        ? "无人机搭载4组亮度20000流明矩阵灯，有效照明面积约10000平方米。适用于夜间救援、事故现场、施工照明等场景。"
        : "Equipped with 4 groups of 20,000 lumen matrix lights, providing effective illumination over 10,000 sqm. Ideal for night rescue, accident sites, and construction lighting.",
      image: emergencyLightImg,
      accent: "text-amber-400",
      stats: [
        { value: "20,000", unit: isZh ? "流明" : "Lumens", label: isZh ? "矩阵灯亮度" : "Matrix Light Brightness" },
        { value: "10,000", unit: "m²", label: isZh ? "有效照明面积" : "Effective Coverage" },
      ],
    },
    {
      title: isZh ? "通信中继" : "Communication Relay",
      desc: isZh
        ? "无人机搭载中继模块，系留供电长时间滞空，200米高度可辐射5公里范围。为灾区、偏远地区提供临时通信保障。"
        : "Onboard relay module with tethered power for extended flight. At 200m altitude, covers 5km radius. Provides temporary communications for disaster areas and remote regions.",
      image: commRelayImg,
      accent: "text-cyan-400",
      stats: [
        { value: "200", unit: "m", label: isZh ? "飞行高度" : "Flight Altitude" },
        { value: "5", unit: "km", label: isZh ? "辐射范围" : "Coverage Radius" },
      ],
    },
    {
      title: isZh ? "高效冷却" : "High-Efficiency Cooling",
      desc: isZh
        ? "动力采用离心式风冷系统，内置高效散热阵列，大面积散热片配合旋翼流场，进一步提升了冷却效率，出色的散热性能为系留长时间滞空作业提供了有力的保障。"
        : "Centrifugal air-cooling system with built-in high-efficiency heat dissipation array. Large-area heat sinks combined with rotor airflow enhance cooling efficiency, ensuring reliable long-duration tethered operations.",
      image: coolingImg,
      accent: "text-green-400",
      stats: [
        { value: isZh ? "离心式" : "Centrifugal", unit: "", label: isZh ? "风冷系统" : "Air Cooling" },
        { value: "24h", unit: "", label: isZh ? "持续散热保障" : "Continuous Cooling" },
      ],
    },
  ];

  // Payload modules grid
  const payloads = [
    { icon: Camera, name: isZh ? "30倍光学变焦模组" : "30x Optical Zoom Module" },
    { icon: Eye, name: isZh ? "可见光红外测距模组" : "Visible/IR Range Module" },
    { icon: Target, name: isZh ? "四光云台跟踪测距模组" : "4-Light Gimbal Tracking Module" },
    { icon: Volume2, name: isZh ? "喊话照明模块" : "PA & Lighting Module" },
    { icon: Sun, name: isZh ? "云台探照灯" : "Gimbal Searchlight" },
    { icon: Zap, name: isZh ? "矩阵照明灯" : "Matrix Light Array" },
  ];

  // Flight platform specs (from OCR of reference image)
  const flightSpecs = [
    { label: isZh ? "机翼类型" : "Wing Type", value: isZh ? "四旋翼" : "Quadrotor" },
    { label: isZh ? "机身材料" : "Airframe Material", value: isZh ? "碳纤维材料，重量轻，强度高，具备防腐蚀性" : "Carbon fiber, lightweight, high-strength, corrosion-resistant" },
    { label: isZh ? "动力系统" : "Power System", value: isZh ? "一体化FOC动力系统" : "Integrated FOC Power System" },
    { label: isZh ? "轴距" : "Wheelbase", value: "1200mm" },
    { label: isZh ? "展开尺寸" : "Unfolded Size", value: "1000×1000×600mm" },
    { label: isZh ? "折叠尺寸" : "Folded Size", value: "620×620×600mm" },
    { label: isZh ? "桨叶规格" : "Propeller", value: isZh ? "30寸" : '30"' },
    { label: isZh ? "机身重量" : "Airframe Weight", value: isZh ? "11kg（不含电池）" : "11kg (w/o battery)" },
    { label: isZh ? "最大载荷量" : "Max Payload", value: "10kg", highlight: true },
    { label: isZh ? "最大起飞重量" : "Max Takeoff Weight", value: "29kg" },
  ];

  const performanceSpecs = [
    { label: isZh ? "最大飞行速度" : "Max Speed", value: isZh ? "上升5m/s 下降3m/s 水平15m/s" : "Climb 5m/s, Descent 3m/s, Horizontal 15m/s" },
    { label: isZh ? "最大可承受风速" : "Max Wind", value: isZh ? "15m/s（7级）" : "15m/s (Level 7)", highlight: true },
    { label: isZh ? "最大续航时间" : "Max Endurance", value: isZh ? "60min空载 / 20min-10kg负载 / 系留模式24小时" : "60min empty / 20min-10kg load / Tethered 24h", highlight: true },
    { label: isZh ? "最大飞行高度" : "Max Flight Altitude", value: isZh ? "1000米" : "1000m" },
    { label: isZh ? "最大飞行海拔" : "Max Elevation", value: isZh ? "5000米" : "5000m" },
    { label: isZh ? "最大飞行距离" : "Max Range", value: isZh ? "15km（无干扰、无遮挡）" : "15km (clear, unobstructed)" },
    { label: isZh ? "飞行模式" : "Flight Modes", value: isZh ? "手动、自动、定高、定点、运动、姿态" : "Manual, Auto, AltHold, PosHold, Sport, Attitude" },
  ];

  const navSpecs = [
    { label: isZh ? "导航卫星系统" : "GNSS", value: "GPS L1 L2 / GLONASS L1 L2 / BDS B1 B2" },
    { label: isZh ? "定位精度(垂直)" : "Vertical Accuracy", value: "±2.5m(GNSS) / ±0.8m(DGPS) / ±1.5cm+1ppm(RTK)" },
    { label: isZh ? "定位精度(水平)" : "Horizontal Accuracy", value: "±1.5m(GNSS) / ±0.4m(DGPS) / ±1.0cm+1ppm(RTK)" },
    { label: isZh ? "防水等级" : "Waterproof", value: isZh ? "机身防中雨" : "Moderate rain resistant" },
    { label: isZh ? "工作环境温度" : "Operating Temp", value: "-20°C ~ 55°C" },
  ];

  // Tether equipment specs (from OCR)
  const tetherAirSpecs = [
    { label: isZh ? "输入电压" : "Input Voltage", value: "580~810Vdc", sub: isZh ? "宽范围输入" : "Wide range input" },
    { label: isZh ? "输出电压" : "Output Voltage", value: "50Vdc±1% / 58Vdc±1%", sub: isZh ? "恒定稳压输出" : "Constant regulated output" },
    { label: isZh ? "输出功率" : "Output Power", value: isZh ? "额定≥6000W 峰值≥7000W" : "Rated ≥6000W, Peak ≥7000W", highlight: true },
  ];

  const tetherCableSpecs = [
    { label: isZh ? "线缆材质" : "Cable Material", value: isZh ? "镀银轻质耐高温航空线材，轻质耐高温护套" : "Silver-plated lightweight high-temp aviation wire" },
    { label: isZh ? "线缆长度" : "Cable Length", value: isZh ? "110m / 220m 两种标准配置" : "110m / 220m standard configs" },
  ];

  const tetherGroundSpecs = [
    { label: isZh ? "输入电压" : "Input Voltage", value: isZh ? "190~240Vac, 单相220Vac, 频率50/60Hz" : "190-240Vac, Single-phase 220Vac, 50/60Hz" },
    { label: isZh ? "输出电压" : "Output Voltage", value: isZh ? "600~800Vdc可调，出厂默认800Vdc" : "600-800Vdc adjustable, default 800Vdc" },
    { label: isZh ? "输出功率" : "Output Power", value: isZh ? "额定≥7000W，峰值≥8000W" : "Rated ≥7000W, Peak ≥8000W", highlight: true },
  ];

  // Application scenarios
  const applications = [
    { title: isZh ? "应急照明" : "Emergency Lighting", desc: isZh ? "夜间救援·事故现场·施工照明" : "Night rescue · Accident sites · Construction", image: emergencyImg },
    { title: isZh ? "电力巡检" : "Power Inspection", desc: isZh ? "输电线路·变电站·光伏巡查" : "Transmission lines · Substations · Solar", image: powerImg },
    { title: isZh ? "消防救援" : "Firefighting", desc: isZh ? "森林消防·城市消防·火情侦查" : "Forest fire · Urban fire · Fire reconnaissance", image: firefightingImg },
    { title: isZh ? "海岛监控" : "Maritime Monitoring", desc: isZh ? "海岸巡逻·海域监控·海上搜救" : "Coast patrol · Maritime surveillance · Sea rescue", image: maritimeImg },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <MultiLanguageSEO
        title={isZh ? "CANI TH-200 系留照明无人机 - 通信中继·10kg载荷·24小时滞空" : "CANI TH-200 Tethered Lighting Drone - Comm Relay · 10kg Payload · 24h Flight"}
        description={isZh ? "CANI TH-200系留照明无人机，碳纤维四旋翼平台，1200mm轴距，10kg最大载荷，7级抗风，FOC动力系统。搭载20000流明矩阵灯，支持通信中继、应急照明等多种任务。配备7000W系留供电系统。" : "CANI TH-200 tethered lighting drone: carbon fiber quadrotor, 1200mm wheelbase, 10kg payload, Level 7 wind resistance, FOC power. 20,000 lumen matrix lights, comm relay, emergency lighting. 7000W tethered power system."}
        keywords={isZh ? "系留照明无人机,TH-200,通信中继无人机,应急照明,10kg载荷,碳纤维无人机" : "tethered lighting drone,TH-200,comm relay drone,emergency lighting,10kg payload"}
        path="/products/tethered/th-200"
      />
      <PageStructuredData data={{ type: 'Product', name: 'CANI TH-200', description: 'Tethered Lighting Drone System', category: 'Tethered Drone', sku: 'TH-200' }} />
      <Header />
      <FloatingContact />

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="CANI TH-200" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-transparent to-gray-950" />
        </div>

        <BackButton to="/products/tethered" label={isZh ? "← 返回系留无人机" : "← Back to Tethered"} />

        <div className="relative z-10 container mx-auto px-4 text-center pt-20">
          <p className="text-cyan-400 font-mono tracking-[0.3em] uppercase text-sm mb-4 animate-fade-in">
            CANI TH-200 TETHERED SYSTEM
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 animate-fade-in tracking-tight">
            {isZh ? "系留照明无人机" : "Tethered Lighting Drone"}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {isZh
              ? "工业级四旋翼平台，通信中继·10kg载荷·24小时滞空·高精度定位"
              : "Industrial quadrotor platform: Comm Relay · 10kg Payload · 24h Flight · Precision Positioning"}
          </p>

          {/* Hero stat badges */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {heroStats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1 bg-gray-950/60 backdrop-blur-sm rounded-xl p-3 border border-gray-700/50">
                <stat.icon className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-bold text-sm">{stat.value}</span>
                <span className="text-gray-400 text-[10px] leading-tight text-center">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center gap-4 mt-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/contact">
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold px-8 py-3 min-h-[44px] text-base">
                <Phone className="w-4 h-4 mr-2" />
                {isZh ? "获取报价" : "Get Quote"}
              </Button>
            </Link>
            <a href="#specs">
              <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-800 px-8 py-3 min-h-[44px] text-base">
                {isZh ? "查看参数" : "View Specs"}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ===== PRODUCT DISPLAY ===== */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gray-500 font-mono text-xs tracking-widest uppercase mb-2">Product Display</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {isZh ? "产品展示" : "Product Display"}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-4">
            <img src={droneDisplayImg} alt="CANI TH-200 Multi-angle View" className="w-full h-auto" />
          </div>
          <p className="text-gray-500 text-center text-sm mt-4">
            {isZh ? "碳纤维四旋翼工业级系留无人机，折叠式机身设计，便携快速部署" : "Carbon fiber quadrotor industrial tethered drone with foldable body for rapid deployment"}
          </p>
        </div>
      </section>

      {/* ===== CORE FEATURES (alternating layout) ===== */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isZh ? "核心能力" : "Core Capabilities"}
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              {isZh ? "模块化任务载荷，覆盖应急照明、通信中继、环境监测等多种场景" : "Modular payloads covering emergency lighting, comm relay, environmental monitoring"}
            </p>
          </div>

          <div className="space-y-24 max-w-6xl mx-auto">
            {coreFeatures.map((feat, i) => (
              <div key={i} className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'md:[direction:rtl]' : ''}`}>
                {/* Image */}
                <div className={`rounded-2xl overflow-hidden border border-gray-800 ${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                  <img src={feat.image} alt={feat.title} className="w-full h-auto aspect-[4/3] object-cover" />
                </div>

                {/* Content */}
                <div className={`space-y-6 ${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                  <h3 className={`text-2xl md:text-3xl font-bold ${feat.accent}`}>{feat.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feat.desc}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {feat.stats.map((stat, j) => (
                      <div key={j} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                        <div className="flex items-baseline gap-1">
                          <span className={`text-2xl md:text-3xl font-black ${feat.accent}`}>{stat.value}</span>
                          <span className="text-gray-400 text-sm">{stat.unit}</span>
                        </div>
                        <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PAYLOAD MODULES GRID ===== */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isZh ? "更多挂载" : "More Payloads"}
            </h2>
            <p className="text-gray-400">{isZh ? "满足不同场景使用" : "For different scenario requirements"}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {payloads.map((p, i) => (
              <div key={i} className="group bg-gray-900 border border-gray-800 rounded-xl p-6 text-center hover:border-cyan-500/30 transition-all duration-300">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gray-800 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                  <p.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <p className="text-white font-medium text-sm">{p.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TETHER EQUIPMENT ===== */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isZh ? "系留设备" : "Tether Equipment"}
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              {isZh ? "天空端电源模块 + 系留线缆 + 地面系留箱，三位一体供电系统" : "Airborne power module + tether cable + ground station: integrated power system"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden border border-gray-800">
              <img src={tetherEquipImg} alt={isZh ? "系留设备" : "Tether Equipment"} className="w-full h-auto" />
            </div>

            {/* Specs breakdown */}
            <div className="space-y-8">
              {/* Airborne module */}
              <div>
                <h4 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Plane className="w-4 h-4" />
                  {isZh ? "天空端电源模块" : "Airborne Power Module"}
                </h4>
                {tetherAirSpecs.map((s, i) => (
                  <div key={i} className="flex justify-between py-2.5 border-b border-gray-800 px-2">
                    <span className="text-gray-400 text-sm">{s.label}</span>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${s.highlight ? 'text-cyan-400' : 'text-white'}`}>{s.value}</span>
                      {s.sub && <p className="text-gray-600 text-[10px]">{s.sub}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cable */}
              <div>
                <h4 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Wifi className="w-4 h-4" />
                  {isZh ? "系留线缆" : "Tether Cable"}
                </h4>
                {tetherCableSpecs.map((s, i) => (
                  <div key={i} className="flex justify-between py-2.5 border-b border-gray-800 px-2">
                    <span className="text-gray-400 text-sm">{s.label}</span>
                    <span className="text-white text-sm font-medium text-right max-w-[60%]">{s.value}</span>
                  </div>
                ))}
              </div>

              {/* Ground station */}
              <div>
                <h4 className="text-green-400 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  {isZh ? "地面系留箱" : "Ground Station"}
                </h4>
                {tetherGroundSpecs.map((s, i) => (
                  <div key={i} className="flex justify-between py-2.5 border-b border-gray-800 px-2">
                    <span className="text-gray-400 text-sm">{s.label}</span>
                    <span className={`text-sm font-medium text-right max-w-[60%] ${s.highlight ? 'text-green-400' : 'text-white'}`}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TECHNICAL SPECIFICATIONS (Tabs) ===== */}
      <section id="specs" className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gray-500 font-mono text-xs tracking-widest uppercase mb-2">Technical Parameter</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {isZh ? "产品参数" : "Technical Specifications"}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="flight" className="w-full">
              <TabsList className="w-full grid grid-cols-3 bg-gray-900 border border-gray-800 mb-8">
                <TabsTrigger value="flight" className="data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400">
                  {isZh ? "飞行平台" : "Flight Platform"}
                </TabsTrigger>
                <TabsTrigger value="performance" className="data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400">
                  {isZh ? "飞行性能" : "Performance"}
                </TabsTrigger>
                <TabsTrigger value="navigation" className="data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400">
                  {isZh ? "导航与防护" : "Nav & Protection"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="flight">
                <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                  {flightSpecs.map((spec, i) => (
                    <div key={i} className={`flex justify-between py-3.5 px-5 border-b border-gray-800/50 ${i % 2 === 0 ? 'bg-gray-800/20' : ''}`}>
                      <span className="text-gray-400 text-sm min-w-[120px]">{spec.label}</span>
                      <span className={`text-sm font-medium text-right ${spec.highlight ? 'text-cyan-400' : 'text-white'}`}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="performance">
                <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                  {performanceSpecs.map((spec, i) => (
                    <div key={i} className={`flex justify-between py-3.5 px-5 border-b border-gray-800/50 ${i % 2 === 0 ? 'bg-gray-800/20' : ''}`}>
                      <span className="text-gray-400 text-sm min-w-[120px]">{spec.label}</span>
                      <span className={`text-sm font-medium text-right max-w-[65%] ${spec.highlight ? 'text-cyan-400' : 'text-white'}`}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="navigation">
                <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                  {navSpecs.map((spec, i) => (
                    <div key={i} className={`flex justify-between py-3.5 px-5 border-b border-gray-800/50 ${i % 2 === 0 ? 'bg-gray-800/20' : ''}`}>
                      <span className="text-gray-400 text-sm min-w-[120px]">{spec.label}</span>
                      <span className="text-white text-sm font-medium text-right max-w-[65%]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* ===== APPLICATION SCENARIOS ===== */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isZh ? "应用场景" : "Application Scenarios"}
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              {isZh ? "覆盖应急照明、电力巡检、消防救援、海岛监控等关键场景" : "Covering emergency lighting, power inspection, firefighting, maritime monitoring"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {applications.map((app, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer">
                <img src={app.image} alt={app.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-white font-bold text-lg mb-1">{app.title}</h4>
                  <p className="text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">{app.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Article */}
      <section className="py-12 bg-gray-900/50 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gray-800/60 rounded-xl p-6 flex items-center gap-4 hover:bg-gray-800/80 transition-colors">
            <div className="text-3xl">📰</div>
            <div className="flex-1">
              <p className="text-sm text-cyan-400 font-mono mb-1">{isZh ? '深度解读' : 'Deep Dive'}</p>
              <Link to="/news/8378d971-a42f-4169-a093-0d25d46f8a69" className="text-white font-semibold hover:text-cyan-300 transition-colors">
                {isZh ? '行业级性能旗舰：TH-200 系留无人机系统——软硬一体化全栈定制方案' : 'Industry-Grade Performance Flagship: TH-200 — Full-Stack Customization'}
              </Link>
              <p className="text-gray-400 text-sm mt-1">{isZh ? '深入了解 TH-200 的重载动力架构与加密链路协议' : 'Explore TH-200 heavy-lift architecture and encrypted link protocols'}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {isZh ? "了解更多 CANI TH-200 解决方案" : "Learn More About CANI TH-200"}
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            {isZh ? "联系我们的专业团队，获取定制化配置方案和详细报价" : "Contact our team for customized configuration and detailed pricing"}
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact">
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold px-8 py-3 min-h-[44px]">
                <Phone className="w-4 h-4 mr-2" />
                {isZh ? "联系我们" : "Contact Us"}
              </Button>
            </Link>
            <a href="mailto:info@caniuav.com">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 min-h-[44px]">
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

export default TH200;
