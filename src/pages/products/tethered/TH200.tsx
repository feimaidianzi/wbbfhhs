import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BackButton } from "@/components/BackButton";
import { Radio, Weight, Clock, Navigation, Layers, Cpu, Thermometer, Zap, Sun, Phone, Camera } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import payloadZoom from "@/assets/products/th-200-payload-zoom.png";
import payloadIR from "@/assets/products/th-200-payload-ir.png";
import payloadTracking from "@/assets/products/th-200-payload-tracking.png";
import payloadSpeaker from "@/assets/products/th-200-payload-speaker.png";
import payloadSpotlight from "@/assets/products/th-200-payload-spotlight.png";
import payloadMatrix from "@/assets/products/th-200-payload-matrix.png";
import th200Hero from "@/assets/products/th-200-hero.png";
import th200Display1 from "@/assets/products/th-200-display-1.png";
import th200Display2 from "@/assets/products/th-200-display-2.png";
import th200Display3 from "@/assets/products/th-200-display-3.png";
import th200Lighting1 from "@/assets/products/th-200-lighting-1.png";
import th200Lighting2 from "@/assets/products/th-200-lighting-2.png";
import th200Lighting3 from "@/assets/products/th-200-lighting-3.png";
import th200Lighting4 from "@/assets/products/th-200-lighting-4.png";
import th200Cooling from "@/assets/products/th-200-cooling.png";
import th200Propeller from "@/assets/products/th-200-propeller.png";

const TH200 = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const highlights = [
    { icon: Radio, label: isEn ? "Comm Relay" : "通信中继", description: isEn ? "5km coverage at 200m" : "200米高度5公里覆盖" },
    { icon: Weight, label: isEn ? "10kg Payload" : "10kg载荷", description: isEn ? "Multiple professional payloads" : "支持多种专业载荷" },
    { icon: Clock, label: isEn ? "24h Flight" : "24小时滞空", description: isEn ? "Continuous tethered operation" : "系留模式不间断工作" },
    { icon: Navigation, label: isEn ? "High Precision" : "高精度定位", description: isEn ? "RTK cm-level positioning" : "RTK厘米级定位" },
    { icon: Layers, label: isEn ? "Rich Payloads" : "挂载丰富", description: isEn ? "Multi-mission adaptation" : "多任务载荷适配" },
    { icon: Cpu, label: isEn ? "Stable Performance" : "性能稳定", description: isEn ? "Industrial flight control" : "工业级飞控系统" },
  ];

  const flightPlatformSpecs = [
    { label: isEn ? "Wing Type" : "机翼类型", value: isEn ? "Quadrotor" : "四旋翼" },
    { label: isEn ? "Body Material" : "机身材料", value: isEn ? "Carbon fiber, lightweight, high strength, corrosion resistant" : "碳纤维材料，重量轻，强度高，具备防腐蚀性" },
    { label: isEn ? "Power System" : "动力系统", value: isEn ? "Integrated FOC power system" : "一体化FOC动力系统" },
    { label: isEn ? "Wheelbase" : "轴距", value: "1200mm" },
    { label: isEn ? "Unfolded Size" : "展开尺寸", value: "1000mm×1000mm×600mm" },
    { label: isEn ? "Folded Size" : "折叠尺寸", value: "620mm×620mm×600mm" },
    { label: isEn ? "Propeller Size" : "桨叶规格", value: isEn ? "30 inch" : "30寸" },
    { label: isEn ? "Body Weight" : "机身重量", value: isEn ? "11kg (without battery)" : "11kg（不含电池）" },
    { label: isEn ? "Max Payload" : "最大载荷量", value: "10kg" },
    { label: isEn ? "Max Takeoff Weight" : "最大起飞重量", value: "29kg" },
    { label: isEn ? "Max Flight Speed" : "最大飞行速度", value: isEn ? "Ascent 5m/s, Descent 3m/s, Horizontal 15m/s" : "上升5m/s 下降3m/s 水平飞行15m/s" },
    { label: isEn ? "Max Wind Resistance" : "最大可承受风速", value: isEn ? "15m/s (Level 7)" : "15m/s（7级）" },
    { label: isEn ? "Max Endurance" : "最大续航时间", value: isEn ? "60min empty/20min 10kg load/24h tethered" : "60min-空载/ 20min-10kg负载/系留模式24小时" },
    { label: isEn ? "Max Flight Altitude" : "最大飞行高度", value: isEn ? "1000m" : "1000米" },
    { label: isEn ? "Max Flight Elevation" : "最大飞行海拔", value: isEn ? "5000m" : "5000米" },
    { label: isEn ? "Max Flight Range" : "最大飞行距离", value: isEn ? "15km (no interference)" : "15km（无干扰、无遮挡）" },
    { label: isEn ? "Flight Modes" : "飞行模式", value: isEn ? "Manual, Auto, Altitude Hold, Position, Sport, Attitude" : "手动、自动、定高、定点、运动、姿态" },
    { label: isEn ? "Navigation System" : "导航卫星系统", value: "GPS L1 L2 / GLONASS L1 L2 / BDS B1 B2" },
    { label: isEn ? "Vertical Accuracy" : "定位精度（垂直）", value: "±2.5m (GNSS) ±0.8m (DGPS) ±1.5cm+1ppm (RTK)" },
    { label: isEn ? "Horizontal Accuracy" : "定位精度（水平）", value: "±1.5m (GNSS) ±0.4m (DGPS) ±1.0cm+1ppm (RTK)" },
    { label: isEn ? "Waterproof Rating" : "防水等级", value: isEn ? "Moderate rain resistant" : "机身防中雨" },
    { label: isEn ? "Operating Temp" : "工作环境温度", value: "-20°C ~ 55°C" },
  ];

  const tetherEquipmentSpecs = [
    { category: isEn ? "Airborne Power Module" : "天空端电源模块", specs: [
      { label: isEn ? "Input Voltage" : "输入电压", value: isEn ? "580~810Vdc wide range" : "580~810Vdc宽范围输入" },
      { label: isEn ? "Output Voltage" : "输出电压", value: isEn ? "50Vdc±1% or 58Vdc±1% regulated" : "50Vdc±1%或58Vdc±1%恒定稳压输出" },
      { label: isEn ? "Output Power" : "输出功率", value: isEn ? "Rated ≥6000W, Peak ≥7000W" : "额定长时输出≥6000W峰值输出≥7000W" },
    ]},
    { category: isEn ? "Tether Cable" : "系留线缆", specs: [
      { label: isEn ? "Cable Material" : "线缆材质", value: isEn ? "Silver-plated lightweight high-temp aviation cable" : "镀银轻质耐高温航空线材，轻质耐高温护套" },
      { label: isEn ? "Cable Length" : "线缆长度", value: isEn ? "110m/220m standard options" : "110m/220m两种标准配置" },
    ]},
    { category: isEn ? "Ground Tether Box" : "地面系留箱", specs: [
      { label: isEn ? "Input Voltage" : "输入电压", value: isEn ? "190~240Vac, Single phase 220Vac, 50/60Hz" : "190~240Vac, 单相220Vac, 频率50/60Hz" },
      { label: isEn ? "Output Voltage" : "输出电压", value: isEn ? "600~800Vdc adjustable, default 800Vdc" : "600~800Vdc可调, 出厂默认800Vdc" },
      { label: isEn ? "Output Power" : "输出功率", value: isEn ? "Rated ≥7000W, Peak ≥8000W" : "额定长时输出≥7000W, 峰值输出≥8000W" },
    ]},
  ];

  const payloads = [
    { src: payloadZoom, name: isEn ? "30x Optical Zoom Module" : "30倍光学变焦模组" },
    { src: payloadIR, name: isEn ? "Visible/IR Range Module" : "可见光红外测距模组" },
    { src: payloadTracking, name: isEn ? "Quad-light Tracking Module" : "四光云台跟踪测距模组" },
    { src: payloadSpeaker, name: isEn ? "Speaker & Light Module" : "喊话照明模块" },
    { src: payloadSpotlight, name: isEn ? "Gimbal Searchlight" : "云台探照灯" },
    { src: payloadMatrix, name: isEn ? "Matrix Light Array" : "矩阵照明灯" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={isEn ? "TH-200 Tethered Lighting Drone - Professional Tethered Platform" : "TH-200系留照明无人机 - 专业系留平台解决方案"}
        description={isEn ? "TH-200 tethered lighting drone, 200m altitude, 10kg payload, 24-hour continuous flight for emergency lighting and communication relay" : "TH-200系留照明无人机，200米升空高度，10kg载荷，24小时不间断滞空，适用于应急照明、通信中继等场景"}
        keywords={isEn ? "tethered drone,TH-200,emergency lighting,communication relay" : "系留无人机,TH-200,应急照明,通信中继,系留平台"}
      />
      <Header />
      <FloatingContact />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')] bg-cover bg-center opacity-30" />
        <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
          <BackButton to="/products/tethered" label={isEn ? "Back to Tethered Drones" : "返回系留无人机"} />

          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              {isEn ? "Tethered " : "系留"}<span className="text-yellow-500">{isEn ? "Lighting" : "照明"}</span>{isEn ? " Drone" : "无人机"}
            </h1>
            <p className="text-4xl md:text-5xl font-bold text-foreground">TH-200</p>
          </div>

          {/* Product Image */}
          <div className="flex justify-center mb-16">
            <div className="relative animate-[float_3s_ease-in-out_infinite]">
              <img 
                src={th200Hero}
                alt={isEn ? "TH-200 Tethered Drone" : "TH-200系留无人机"}
                className="w-full max-w-3xl drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {highlights.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <span className="font-semibold text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial Quality Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,200,0,0.1)_25%,rgba(255,200,0,0.1)_50%,transparent_50%,transparent_75%,rgba(255,200,0,0.1)_75%)] bg-[length:100px_100px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{isEn ? "Industrial Quality, Reliable Performance" : "工业品质 性能可靠"}</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              {isEn 
                ? "Industrial-grade flight control system with powerful features, dual industrial hardware redundancy, anti-magnetic interference auto-calibration algorithm, ensuring flight safety."
                : "行业级飞控系统功能强大，双工业级硬件多冗余系统，抗磁干扰航向自动校准算法，保障飞行安全。"}
            </p>
          </div>
        </div>
      </section>

      {/* Cooling System Section */}
      <section className="py-20 bg-gray-950 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Thermometer className="w-10 h-10 text-green-400" />
                <h2 className="text-4xl font-bold">{isEn ? "Efficient Cooling" : "高效冷却"}</h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                {isEn
                  ? "Power system uses centrifugal air cooling with built-in high-efficiency heat sink array. Large heat dissipation fins combined with rotor airflow further enhance cooling efficiency, providing reliable support for long-duration tethered operations."
                  : "动力采用离心式风冷系统，内置高效散热阵列，大面积散热片配合旋翼流场，进一步提升了冷却效率，出色的散热性能为系留长时间滞空作业提供了有力的保障。"}
              </p>
            </div>
            <div className="flex justify-center">
              <img 
                src={th200Cooling} 
                alt={isEn ? "Centrifugal Air Cooling System" : "离心式风冷系统"}
                className="w-80 h-60 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Power System Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <img 
                src={th200Propeller} 
                alt={isEn ? "Ultra Carbon Pro Propeller" : "Ultra Carbon Pro 碳纤维桨叶"}
                className="w-80 h-60 object-cover rounded-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-10 h-10 text-yellow-400" />
                <h2 className="text-4xl font-bold">{isEn ? "Powerful Propulsion" : "强劲动力"}</h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                {isEn
                  ? "Propellers use special Ultra Carbon Pro composite material, maintaining extreme lightness while providing excellent strength and rigidity. Aerodynamic design combined with optimized motor electromagnetic design delivers higher efficiency and faster response."
                  : "螺旋桨采用特种碳纤维复合Ultra carbon pro，在保持极度轻巧之余，仍具有出色的强度和刚度，设计的气动外形，配合协同优化的电机电磁设计，提供更高效的效率，更迅速的响应。"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Lighting Section */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-blue-950 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sun className="w-10 h-10 text-yellow-400" />
              <h2 className="text-4xl font-bold">{isEn ? "Emergency Lighting" : "应急照明"}</h2>
            </div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {isEn
                ? "Drone equipped with 4 groups of 20,000 lumen matrix lights, effective lighting area approximately 10,000 square meters."
                : "无人机搭载4组亮度20000流明矩阵灯，有效照明面积约10000平方米。"}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[th200Lighting1, th200Lighting2, th200Lighting3, th200Lighting4].map((src, index) => (
              <div key={index} className="aspect-[4/5] bg-gray-800 rounded-xl overflow-hidden">
                <img 
                  src={src}
                  alt={isEn ? `Emergency Lighting Scene ${index + 1}` : `应急照明场景 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payloads Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Camera className="w-10 h-10 text-primary" />
              <h2 className="text-4xl font-bold">{isEn ? "Multiple Payloads for Different Scenarios" : "更多挂载满足不同场景使用"}</h2>
            </div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {isEn
                ? "Rich payload options to meet emergency lighting, security monitoring, firefighting rescue and other scenario requirements"
                : "丰富的挂载选配，满足应急照明、安防监控、消防救援等多种场景需求"}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {payloads.map((payload, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="aspect-square bg-gray-800 rounded-xl overflow-hidden mb-3 w-full flex items-center justify-center p-4 group-hover:bg-gray-700 transition-colors">
                  <img 
                    src={payload.src}
                    alt={payload.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-sm text-center text-gray-300 group-hover:text-white transition-colors">{payload.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communication Relay Section */}
      <section className="py-20 bg-gradient-to-b from-sky-100 to-sky-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Radio className="w-10 h-10 text-primary" />
                <h2 className="text-4xl font-bold text-foreground">{isEn ? "Communication Relay" : "通信中继"}</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {isEn
                  ? "Drone equipped with relay module, tethered power supply for long-duration hovering, 200m altitude covers 5km range. Suitable for emergency communication, large events, remote area signal coverage and other scenarios."
                  : "无人机搭载中继模块，系留供电长时间滞空，200米高度可辐射5公里范围。适用于应急通信、大型活动、偏远地区信号覆盖等场景。"}
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-60 bg-sky-300/30 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Radio className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">{isEn ? "5km Signal Coverage" : "5公里信号覆盖"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-2">{isEn ? "Specifications" : "产品参数"}</h2>
            <p className="text-muted-foreground">TECHNICAL PARAMETER</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Flight Platform */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b-4 border-primary inline-block">
                {isEn ? "Flight Platform" : "飞行平台"}
              </h3>
              <div className="space-y-3">
                {flightPlatformSpecs.map((spec, index) => (
                  <div key={index} className="flex">
                    <span className="text-muted-foreground w-32 flex-shrink-0">{spec.label}：</span>
                    <span className="text-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tether Equipment */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b-4 border-primary inline-block">
                {isEn ? "Tether Equipment" : "系留设备"}
              </h3>
              <div className="space-y-6">
                {tetherEquipmentSpecs.map((category, catIndex) => (
                  <div key={catIndex}>
                    <h4 className="font-semibold text-foreground mb-3">{category.category}</h4>
                    <div className="space-y-2 pl-4">
                      {category.specs.map((spec, specIndex) => (
                        <div key={specIndex} className="flex">
                          <span className="text-muted-foreground w-24 flex-shrink-0">{spec.label}：</span>
                          <span className="text-foreground text-sm">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Display Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-2">{isEn ? "Product Gallery" : "产品展示"}</h2>
            <p className="text-muted-foreground">PRODUCT DISPLAY</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[th200Display1, th200Display2, th200Display3].map((src, index) => (
              <div 
                key={index} 
                className="aspect-square bg-white rounded-xl shadow-lg overflow-hidden flex items-center justify-center p-4 group hover:shadow-2xl transition-all duration-300"
              >
                <img 
                  src={src}
                  alt={isEn ? `Product Display ${index + 1}` : `产品展示 ${index + 1}`}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{isEn ? "Learn More About TH-200 Solutions" : "了解更多TH-200解决方案"}</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {isEn
              ? "Contact our professional team for customized configuration plans and detailed quotations"
              : "联系我们的专业团队，获取定制化配置方案和详细报价"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">
                <Phone className="w-5 h-5 mr-2" />
                {isEn ? "Contact Us" : "联系我们"}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/products/tethered">
                {isEn ? "View All Tethered Drones" : "查看全部系留无人机"}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TH200;
