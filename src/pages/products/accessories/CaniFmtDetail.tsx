import { LangLink as Link } from "@/components/LangLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageCode } from "@/i18n/languages";
import { getDomainForLanguage, getHtmlLang } from "@/utils/seoConfig";
import {
  Cpu, Zap, Code, Layers, Navigation2, Wifi, Minimize2, Shield,
  Download, FileText, Package, Check, AlertTriangle, Settings,
  ChevronRight, Gauge, Thermometer, Cable, MonitorSmartphone,
  Usb, Network, Radio, CircuitBoard
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { getFcEscProductById } from "@/data/fcEscProducts";
import { useState } from "react";
import heroBg from "@/assets/products/cani-fc-hero-bg.webp";

// ─── Interface Pinout Diagram (CSS-based) ───
const InterfacePinoutDiagram = ({ isEn }: { isEn: boolean }) => {
  const leftInterfaces = [
    {
      name: isEn ? "USB (Type-C)" : "USB接口 (Type-C)",
      color: "from-blue-500 to-cyan-400",
      pins: ["D+", "D-", "VCC", "GND"],
    },
    {
      name: isEn ? "Debug Serial" : "调试串口",
      color: "from-emerald-500 to-green-400",
      pins: ["TX", "RX", "GND"],
    },
    {
      name: isEn ? "Data Serial (UART1-5)" : "数传串口 (UART1-5)",
      color: "from-amber-500 to-yellow-400",
      pins: ["TX", "RX", "VCC", "GND"],
    },
    {
      name: isEn ? "I2C (×3)" : "I2C接口 (×3)",
      color: "from-violet-500 to-purple-400",
      pins: ["SCL", "SDA", "VCC", "GND"],
    },
  ];

  const rightInterfaces = [
    {
      name: isEn ? "CAN Bus" : "CAN总线",
      color: "from-red-500 to-rose-400",
      pins: ["CANH", "CANL", "GND"],
    },
    {
      name: isEn ? "Ethernet" : "以太网接口",
      color: "from-teal-500 to-cyan-400",
      pins: ["TX+", "TX-", "RX+", "RX-"],
    },
    {
      name: isEn ? "PWM Output (×10)" : "PWM输出 (×10)",
      color: "from-orange-500 to-amber-400",
      pins: ["CH1-10", "GND"],
    },
    {
      name: isEn ? "SPI / PPM" : "SPI / PPM接口",
      color: "from-pink-500 to-fuchsia-400",
      pins: ["MOSI", "MISO", "SCK", "CS"],
    },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Board body */}
      <div className="relative bg-gradient-to-br from-emerald-950/80 to-emerald-900/60 rounded-2xl border-2 border-emerald-500/30 p-6 md:p-10 shadow-[0_0_60px_rgba(16,185,129,0.15)]">
        {/* PCB grid overlay */}
        <div className="absolute inset-0 opacity-10 rounded-2xl" style={{
          backgroundImage: `
            linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }} />

        {/* Center chip */}
        <div className="relative flex flex-col items-center justify-center py-8">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-emerald-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)] relative">
            <div className="absolute -top-1 left-4 right-4 flex justify-between">
              {[...Array(8)].map((_, i) => (
                <div key={`t${i}`} className="w-1.5 h-3 bg-amber-400/60 rounded-t-sm" />
              ))}
            </div>
            <div className="absolute -bottom-1 left-4 right-4 flex justify-between">
              {[...Array(8)].map((_, i) => (
                <div key={`b${i}`} className="w-1.5 h-3 bg-amber-400/60 rounded-b-sm" />
              ))}
            </div>
            <div className="absolute top-4 bottom-4 -left-1 flex flex-col justify-between">
              {[...Array(6)].map((_, i) => (
                <div key={`l${i}`} className="w-3 h-1.5 bg-amber-400/60 rounded-l-sm" />
              ))}
            </div>
            <div className="absolute top-4 bottom-4 -right-1 flex flex-col justify-between">
              {[...Array(6)].map((_, i) => (
                <div key={`r${i}`} className="w-3 h-1.5 bg-amber-400/60 rounded-r-sm" />
              ))}
            </div>
            <div className="text-center z-10">
              <p className="text-emerald-400 font-mono text-xs mb-1">GD32F470</p>
              <p className="text-emerald-300 font-mono font-bold text-sm">CANI-FC v2.0</p>
              <p className="text-emerald-500/60 font-mono text-[10px] mt-1">240MHz ARM</p>
            </div>
          </div>
          <p className="text-emerald-400/50 font-mono text-xs mt-4">70 × 36 × 18.5 mm</p>
        </div>

        {/* Interface columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-6">
          {/* Left interfaces */}
          <div className="space-y-3">
            {leftInterfaces.map((iface, idx) => (
              <div key={idx} className="group flex items-center gap-3 p-3 rounded-lg bg-black/30 border border-emerald-500/10 hover:border-emerald-400/40 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all duration-300">
                <div className={`w-1 h-full min-h-[40px] rounded-full bg-gradient-to-b ${iface.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-emerald-300 group-hover:text-emerald-200 transition-colors">{iface.name}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {iface.pins.map((pin, pidx) => (
                      <span key={pidx} className="px-1.5 py-0.5 text-[10px] font-mono bg-emerald-900/50 text-emerald-400/80 rounded border border-emerald-500/20">
                        {pin}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right interfaces */}
          <div className="space-y-3">
            {rightInterfaces.map((iface, idx) => (
              <div key={idx} className="group flex items-center gap-3 p-3 rounded-lg bg-black/30 border border-emerald-500/10 hover:border-emerald-400/40 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all duration-300">
                <div className={`w-1 h-full min-h-[40px] rounded-full bg-gradient-to-b ${iface.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-emerald-300 group-hover:text-emerald-200 transition-colors">{iface.name}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {iface.pins.map((pin, pidx) => (
                      <span key={pidx} className="px-1.5 py-0.5 text-[10px] font-mono bg-emerald-900/50 text-emerald-400/80 rounded border border-emerald-500/20">
                        {pin}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom sensors */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 pt-4 border-t border-emerald-500/10">
          {[
            { label: "BMI088", desc: isEn ? "6-Axis IMU" : "6轴IMU" },
            { label: "BMM150", desc: isEn ? "Compass" : "电子罗盘" },
            { label: "SPL06", desc: isEn ? "Barometer" : "气压计" },
            { label: "ICM-42688", desc: isEn ? "IMU (Opt.)" : "IMU (选配)" },
          ].map((sensor, idx) => (
            <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-emerald-900/30 rounded-full border border-emerald-500/15">
              <CircuitBoard className="w-3 h-3 text-emerald-400/60" />
              <span className="text-[11px] font-mono text-emerald-400">{sensor.label}</span>
              <span className="text-[10px] text-emerald-500/50">{sensor.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Main Page Component ───
const CaniFmtDetail = () => {
  const product = getFcEscProductById("cani-fmt")!;
  const [selectedImage, setSelectedImage] = useState(0);
  const { language, t } = useLanguage();
  const langCode = language as LanguageCode;
  const isEn = langCode !== 'zh';
  const domain = getDomainForLanguage(langCode);
  const images = product.images || [product.image];

  const seoTitle = isEn
    ? "CANI-FC v2.0 High-Performance Flight Controller | FMT Open-Source Autopilot"
    : "CANI-FC v2.0 高性能飞控 | FMT开源自驾仪系统";
  const seoDesc = isEn
    ? "CANI-FC v2.0 open-source flight controller with GD32F470 240MHz MCU, MATLAB/Simulink MBD, HIL/SIL/MIL simulation, Ethernet + CAN bus. Built for UAV research and industrial applications."
    : "CANI-FC v2.0开源飞控，GD32F470旗舰芯片240MHz主频，支持MATLAB/Simulink基于模型开发(MBD)，HIL/SIL/MIL仿真，以太网+CAN总线，适用于科研与工业无人机。";

  const productJsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: 'CANI-FC v2.0',
    description: seoDesc,
    image: images.map(img => img.startsWith('http') ? img : `${domain}${img}`),
    url: `${domain}/products/accessories/fc-esc/cani-fmt`,
    sku: 'CANI-FC-V2',
    mpn: 'ICF5 (IC200)',
    brand: { '@type': 'Brand', name: 'CANI Technology' },
    category: 'Flight Controller',
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'MCU', value: 'GD32F470VGT6 (240MHz)' },
      { '@type': 'PropertyValue', name: 'IMU', value: 'BMI088 / ICM-42688-P' },
      { '@type': 'PropertyValue', name: 'Firmware', value: 'FMT Open Source' },
      { '@type': 'PropertyValue', name: 'Interfaces', value: 'Ethernet, CAN, 5×UART, 3×I2C, SPI' },
      { '@type': 'PropertyValue', name: 'Size', value: '70×36×18.5mm / 39.3g' },
    ],
    manufacturer: { '@type': 'Organization', name: 'CANI Technology', url: domain },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: `${domain}/products/accessories/fc-esc/cani-fmt`,
    },
    inLanguage: getHtmlLang(langCode),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('nav.home'), item: domain },
      { '@type': 'ListItem', position: 2, name: t('nav.products'), item: `${domain}/products` },
      { '@type': 'ListItem', position: 3, name: 'FC/ESC', item: `${domain}/products/accessories/fc-esc` },
      { '@type': 'ListItem', position: 4, name: 'CANI-FC v2.0', item: `${domain}/products/accessories/fc-esc/cani-fmt` },
    ],
  };

  const faqs = [
    {
      q: isEn ? "What firmware does CANI-FC v2.0 support?" : "CANI-FC v2.0支持哪些固件？",
      a: isEn ? "CANI-FC v2.0 runs the FMT open-source autopilot firmware, supporting MATLAB/Simulink Model-Based Design (MBD) with one-click code generation and deployment." : "CANI-FC v2.0搭载FMT开源自驾仪固件，支持MATLAB/Simulink基于模型开发(MBD)，可一键代码自动生成并部署到飞控。",
    },
    {
      q: isEn ? "What simulation modes are supported?" : "支持哪些仿真方式？",
      a: isEn ? "Full simulation coverage: Model-in-the-Loop (MIL), Software-in-the-Loop (SIL), Hardware-in-the-Loop (HIL), and open-loop simulation for algorithm verification." : "支持全覆盖仿真：模型在环(MIL)、软件在环(SIL)、硬件在环(HIL)和开环仿真，用于算法验证和测试。",
    },
    {
      q: isEn ? "What vehicle types are compatible?" : "兼容哪些机型？",
      a: isEn ? "Supports multi-rotor, fixed-wing, and VTOL (upcoming). Suitable for indoor/outdoor position hold, altitude hold, stabilize flight, and waypoint missions." : "支持多旋翼、固定翼、VTOL(即将支持)。适用于室内外定点、定高、自稳飞行和航点任务模式。",
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  // Hardware features data
  const hardwareFeatures = [
    {
      icon: Cpu,
      title: isEn ? "GD32F470 High-Performance MCU" : "GD32F470 高性能处理器",
      desc: isEn ? "240MHz ARM Cortex-M4 with FPU, 512KB SRAM, 1024KB Flash. Built for real-time flight control with floating-point computation." : "240MHz ARM Cortex-M4 内核，FPU浮点运算单元，512KB SRAM，1024KB Flash，专为实时飞控计算打造。",
      accent: "text-cyan-400",
      glow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]",
    },
    {
      icon: Code,
      title: isEn ? "MATLAB/Simulink MBD" : "MATLAB/Simulink 基于模型开发",
      desc: isEn ? "Graphical programming with one-click auto code generation. Deploy algorithms directly from Simulink to the flight controller." : "图形化编程，一键代码自动生成与部署，从Simulink直接部署算法到飞控硬件。",
      accent: "text-emerald-400",
      glow: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.2)]",
    },
    {
      icon: Layers,
      title: isEn ? "Full Simulation Coverage" : "多种仿真全覆盖",
      desc: isEn ? "MIL, SIL, HIL, and open-loop simulation. Verify flight algorithms before deployment with confidence." : "模型在环(MIL)、软件在环(SIL)、硬件在环(HIL)、开环仿真，部署前充分验证飞行算法。",
      accent: "text-violet-400",
      glow: "group-hover:shadow-[0_0_30px_rgba(167,139,250,0.2)]",
    },
    {
      icon: Navigation2,
      title: isEn ? "Multi-Vehicle Support" : "多机型支持",
      desc: isEn ? "Multi-rotor, fixed-wing, VTOL (upcoming). Indoor/outdoor position hold, altitude hold, stabilize, waypoint missions." : "支持多旋翼、固定翼、VTOL(即将支持)。室内外定点/定高/自稳飞行，航点任务模式。",
      accent: "text-amber-400",
      glow: "group-hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]",
    },
    {
      icon: Network,
      title: isEn ? "Rich Connectivity" : "丰富通信接口",
      desc: isEn ? "Ethernet, CAN bus, 5×UART, 3×I2C, SPI, 10×PWM, USB Type-C. Industrial-grade data throughput." : "以太网、CAN总线、5路UART、3路I2C、SPI、10路PWM、USB Type-C，工业级数据吞吐。",
      accent: "text-blue-400",
      glow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.2)]",
    },
    {
      icon: Minimize2,
      title: isEn ? "Ultra-Compact Design" : "轻薄小巧设计",
      desc: isEn ? "Only 70×36×18.5mm, 39.3g. Exceptional size-to-performance ratio, optimized for space-constrained applications." : "仅70×36×18.5mm，39.3g。极致尺寸性能比，适用于空间受限的应用场景。",
      accent: "text-rose-400",
      glow: "group-hover:shadow-[0_0_30px_rgba(251,113,133,0.2)]",
    },
  ];

  // Technical specs table data
  const fcSpecs = [
    { label: isEn ? "Processor (MCU)" : "处理器 (MCU)", value: "GD32F470VGT6", highlight: true },
    { label: isEn ? "Clock Speed" : "主频", value: "240 MHz", highlight: true },
    { label: isEn ? "Architecture" : "内核架构", value: "ARM Cortex-M4 + FPU" },
    { label: "SRAM", value: "512 KB" },
    { label: "Flash", value: "1024 KB" },
    { label: isEn ? "Primary IMU" : "主IMU", value: "BMI088 (6-Axis)" },
    { label: isEn ? "Secondary IMU (Opt.)" : "备用IMU (选配)", value: "ICM-42688-P / ICM-20948" },
    { label: isEn ? "Compass" : "电子罗盘", value: "BMM150" },
    { label: isEn ? "Barometer" : "气压计", value: "SPL06 / MS5611 (Opt.)" },
    { label: isEn ? "Storage" : "存储", value: "W25Q16 NOR Flash (16Mbit) + TF Card" },
    { label: "UART", value: isEn ? "5× UART + 1× USB (Type-C)" : "5路UART + 1路USB (Type-C)" },
    { label: isEn ? "PWM Output" : "PWM输出", value: isEn ? "10 Channels" : "10路" },
    { label: "I2C", value: isEn ? "3× I2C" : "3路I2C" },
    { label: "SPI", value: isEn ? "1× SPI" : "1路SPI" },
    { label: isEn ? "CAN Bus" : "CAN总线", value: isEn ? "1× CAN" : "1路CAN", highlight: true },
    { label: isEn ? "Ethernet" : "以太网", value: isEn ? "1× Ethernet" : "1路以太网", highlight: true },
    { label: isEn ? "Power Input" : "供电电压", value: "4.5~5.5V (PM) / 4.75~5.25V (USB)" },
    { label: isEn ? "Dimensions" : "尺寸", value: "70 × 36 × 18.5 mm" },
    { label: isEn ? "Weight" : "重量", value: "39.3 g" },
    { label: isEn ? "Operating Temp" : "工作温度", value: "-20°C ~ +85°C" },
    { label: isEn ? "Firmware" : "固件", value: isEn ? "FMT Open-Source Autopilot" : "FMT开源自驾仪固件", highlight: true },
  ];

  const functionalSpecs = [
    { label: isEn ? "Development Method" : "开发方式", value: "MATLAB/Simulink MBD" },
    { label: isEn ? "Code Generation" : "代码生成", value: isEn ? "One-Click Auto Generation & Deployment" : "一键代码自动生成与部署" },
    { label: isEn ? "Simulation" : "仿真支持", value: "MIL / SIL / HIL / Open-Loop" },
    { label: isEn ? "Flight Modes" : "飞行模式", value: isEn ? "Position Hold / Altitude Hold / Stabilize / Mission" : "定点 / 定高 / 自稳 / 航点任务" },
    { label: isEn ? "Auto Functions" : "自动功能", value: isEn ? "One-Key Takeoff / Return / Landing" : "一键起飞 / 返航 / 降落" },
    { label: isEn ? "Vehicle Types" : "支持机型", value: isEn ? "Multi-Rotor / Fixed-Wing / VTOL (Coming)" : "多旋翼 / 固定翼 / VTOL (即将支持)" },
    { label: isEn ? "Application" : "应用领域", value: isEn ? "UAV / UGV / USV / Robotics" : "无人机 / 无人车 / 无人船 / 机器人" },
  ];

  return (
    <>
      <MultiLanguageSEO
        title={seoTitle}
        description={seoDesc}
        path="/products/accessories/fc-esc/cani-fmt"
        type="product"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <Header />
      <main className="min-h-screen bg-gray-950 text-gray-100">
        <BackButton to="/products/accessories/fc-esc" />

        {/* ═══ HERO SECTION ═══ */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950/50" />
          </div>

          <div className="container mx-auto px-4 relative z-10 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                  <Link to="/" className="hover:text-emerald-400 transition-colors">{t('nav.home')}</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link to="/products" className="hover:text-emerald-400 transition-colors">{t('nav.products')}</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link to="/products/accessories/fc-esc" className="hover:text-emerald-400 transition-colors">FC/ESC</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-emerald-400">CANI-FC v2.0</span>
                </nav>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-400 tracking-wide uppercase">
                    {isEn ? "Open-Source Autopilot" : "开源自驾仪系统"}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  <span className="text-white">CANI-FC </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">v2.0</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-2 font-light">
                  {isEn ? "High-Performance Flight Controller" : "高性能飞控系统"}
                </p>
                <p className="text-gray-400 mb-8 max-w-lg leading-relaxed">
                  {isEn
                    ? "Powered by GD32F470 240MHz MCU and FMT open-source autopilot. Full MATLAB/Simulink MBD support with HIL/SIL/MIL simulation coverage. Industrial Ethernet and CAN bus for next-gen UAV research."
                    : "搭载GD32F470旗舰处理器240MHz主频，FMT开源自驾仪系统。全面支持MATLAB/Simulink基于模型开发(MBD)，HIL/SIL/MIL仿真全覆盖。以太网+CAN总线，新一代科研级飞控。"}
                </p>

                {/* Key stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { value: "240", unit: "MHz", label: isEn ? "Clock Speed" : "主频" },
                    { value: "39.3", unit: "g", label: isEn ? "Weight" : "重量" },
                    { value: "5+", unit: "UART", label: isEn ? "Serial Ports" : "串口" },
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="text-2xl font-bold text-emerald-400">
                        {stat.value}<span className="text-sm text-emerald-500 ml-0.5">{stat.unit}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white min-h-[44px] min-w-[44px]" asChild>
                    <Link to="/contact">{isEn ? "Get Quote" : "获取报价"}</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-gray-700 text-gray-300 hover:bg-white/5 min-h-[44px] min-w-[44px]" asChild>
                    <a href="#specs">{isEn ? "View Specs" : "查看参数"}</a>
                  </Button>
                </div>
              </div>

              {/* Product images */}
              <div className="space-y-4">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 aspect-square flex items-center justify-center">
                  <img
                    src={images[selectedImage]}
                    alt="CANI-FC v2.0 high-performance flight controller"
                    title="CANI-FC v2.0 | ICF5 Open Source Flight Controller"
                    className="max-h-full max-w-full object-contain drop-shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                  />
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${selectedImage === idx ? 'border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'border-gray-800 hover:border-gray-600'}`}
                      >
                        <img src={img} alt={`CANI-FC v2.0 view ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ HARDWARE FEATURES ═══ */}
        <section className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <Cpu className="w-3 h-3 text-emerald-400" />
                <span className="text-xs font-mono text-emerald-400 uppercase">{isEn ? "Core Hardware" : "核心硬件"}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {isEn ? "Next-Gen Flight Control Architecture" : "新一代飞控架构"}
              </h2>
              <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
                {isEn
                  ? "Built on the GD32F470 high-performance MCU with FMT open-source autopilot firmware, delivering unmatched flexibility for UAV research and development."
                  : "基于GD32F470高性能处理器与FMT开源自驾仪固件，为无人机科研与开发提供无与伦比的灵活性。"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hardwareFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className={`group p-6 rounded-xl bg-gray-900/80 border border-gray-800 hover:border-emerald-500/30 transition-all duration-500 ${feat.glow}`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center mb-4 ${feat.accent} group-hover:scale-110 transition-transform duration-300`}>
                    <feat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">{feat.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ INTERFACE PINOUT DIAGRAM ═══ */}
        <section className="py-20 bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <Cable className="w-3 h-3 text-emerald-400" />
                <span className="text-xs font-mono text-emerald-400 uppercase">{isEn ? "Interface Definition" : "接口定义"}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {isEn ? "Interface Pinout Map" : "接口引脚定义"}
              </h2>
              <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
                {isEn
                  ? "Comprehensive connectivity with Ethernet, CAN bus, multi-UART, I2C, SPI, and USB Type-C interfaces."
                  : "全面的连接能力：以太网、CAN总线、多路UART、I2C、SPI和USB Type-C接口。"}
              </p>
            </div>
            <InterfacePinoutDiagram isEn={isEn} />
          </div>
        </section>

        {/* ═══ TECHNICAL SPECIFICATIONS ═══ */}
        <section id="specs" className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <Settings className="w-3 h-3 text-emerald-400" />
                <span className="text-xs font-mono text-emerald-400 uppercase">{isEn ? "Technical Specs" : "技术参数"}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {isEn ? "Performance Parameters" : "性能参数"}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Hardware Specs */}
              <div className="bg-gray-900/80 rounded-xl border border-gray-800 overflow-hidden">
                <div className="px-6 py-4 bg-emerald-500/5 border-b border-gray-800 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-white">{isEn ? "Hardware Specifications" : "硬件参数"}</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[400px]">
                    <tbody>
                      {fcSpecs.map((spec, idx) => (
                        <tr key={idx} className="border-b border-gray-800/50 hover:bg-emerald-500/5 transition-colors">
                          <td className="px-6 py-3 font-medium text-gray-400 w-2/5 text-sm">{spec.label}</td>
                          <td className={`px-6 py-3 text-sm font-mono ${spec.highlight ? 'text-emerald-400 font-semibold' : 'text-gray-300'}`}>
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Functional Specs */}
              <div className="bg-gray-900/80 rounded-xl border border-gray-800 overflow-hidden">
                <div className="px-6 py-4 bg-emerald-500/5 border-b border-gray-800 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-white">{isEn ? "Functional Specifications" : "功能描述"}</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[400px]">
                    <tbody>
                      {functionalSpecs.map((spec, idx) => (
                        <tr key={idx} className="border-b border-gray-800/50 hover:bg-emerald-500/5 transition-colors">
                          <td className="px-6 py-3 font-medium text-gray-400 w-2/5 text-sm">{spec.label}</td>
                          <td className="px-6 py-3 text-sm text-gray-300">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Product images in spec area */}
                <div className="p-6 border-t border-gray-800">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">{isEn ? "Product Views" : "产品展示"}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {images.slice(0, 4).map((img, idx) => (
                      <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-gray-800/50 border border-gray-700/50">
                        <img src={img} alt={`CANI-FC v2.0 angle ${idx + 1}`} className="w-full h-full object-contain p-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ PACKAGE & NOTES ═══ */}
        <section className="py-16 bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Package */}
              <div className="bg-gray-900/80 rounded-xl border border-gray-800 p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-400" />
                  {isEn ? "Package Contents" : "包装清单"}
                </h3>
                <ul className="space-y-2">
                  {(product.packageIncludes || []).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Notes */}
              <div className="bg-gray-900/80 rounded-xl border border-gray-800 p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  {isEn ? "Important Notes" : "注意事项"}
                </h3>
                <ul className="space-y-2">
                  {(product.notes || []).map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="text-amber-400 mt-0.5">•</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Downloads */}
              <div className="bg-gray-900/80 rounded-xl border border-gray-800 p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5 text-emerald-400" />
                  {isEn ? "Resources" : "资料下载"}
                </h3>
                <div className="space-y-2">
                  {[
                    isEn ? "Datasheet (PDF)" : "产品规格书 (PDF)",
                    isEn ? "User Manual" : "用户手册",
                    isEn ? "FMT Firmware" : "FMT固件下载",
                  ].map((label, idx) => (
                    <Link key={idx} to="/contact" className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-800/50 border border-gray-700/50 text-sm text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all group">
                      <FileText className="w-4 h-4" />
                      <span>{label}</span>
                      <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="py-16 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {isEn ? "Frequently Asked Questions" : "常见问题"}
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`faq-${idx}`}
                    className="bg-gray-900/80 rounded-xl border border-gray-800 px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold text-white hover:text-emerald-400 py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-400 pb-5 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ═══ Related Article (Deep Dive) ═══ */}
        <section className="py-12 bg-secondary border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
              <div className="text-3xl">📖</div>
              <div className="flex-1">
                <p className="text-sm text-accent font-mono mb-1">{isEn ? 'Deep Dive' : '深度解读'}</p>
                <Link to="/news/c3a1b2d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d" className="text-foreground font-semibold hover:text-accent transition-colors">
                  {isEn ? 'CANI-FC v2.0: MBD Model-Based Development Research-Grade Flight Management Hub' : 'CANI-FC v2.0：基于MBD模型化开发的科研级飞行管理中枢'}
                </Link>
                <p className="text-muted-foreground text-sm mt-1">
                  {isEn ? 'Explore 240MHz flagship hardware, MATLAB/Simulink MBD workflow, and FMT open-source ecosystem' : '了解240MHz旗舰硬件、MATLAB/Simulink MBD开发流与FMT开源生态'}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-20 bg-gradient-to-br from-emerald-900/30 to-gray-950">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {isEn ? "Ready to Integrate CANI-FC v2.0?" : "准备集成 CANI-FC v2.0？"}
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              {isEn
                ? "Contact our engineering team for technical consultation, OEM/ODM customization, and volume pricing."
                : "联系我们的工程团队，获取技术咨询、OEM/ODM定制方案和批量报价。"}
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white min-h-[44px] min-w-[44px]" asChild>
                <Link to="/contact">{isEn ? "Contact Us" : "联系我们"}</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-gray-700 text-gray-300 hover:bg-white/5 min-h-[44px] min-w-[44px]" asChild>
                <Link to="/products/accessories/fc-esc">{isEn ? "View All FC/ESC" : "查看全部飞控/电调"}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
};

export default CaniFmtDetail;
