import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Clock, Zap, Shield, Radio, Eye, Settings, Phone, Mail, Plane, Target, Volume2, Lightbulb, Flame, Battery } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Import product images
import th300Drone from "@/assets/products/th-300-drone.png";
import th300Aircraft from "@/assets/products/th-300-aircraft.png";
import th300Controller from "@/assets/products/th-300-controller.png";
import th300GimbalCamera from "@/assets/products/th-300-gimbal-camera.png";
import th300PayloadSpotlight from "@/assets/products/th-300-payload-spotlight.png";
import th300PayloadSpeaker from "@/assets/products/th-300-payload-speaker.png";
import th300PayloadFireball from "@/assets/products/th-300-payload-fireball.png";
import th300PayloadBattery from "@/assets/products/th-300-payload-battery.png";

const TH300 = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  // 核心亮点
  const highlights = [{
    icon: Plane,
    value: "1380mm",
    label: isEn ? "Motor Wheelbase" : "对称电机轴距"
  }, {
    icon: Target,
    value: "≥20KG",
    label: isEn ? "Max Payload" : "最大载重能力"
  }, {
    icon: Clock,
    value: "≥40min",
    label: isEn ? "Flight Time" : "标准飞行时间"
  }, {
    icon: Shield,
    value: isEn ? "Level 7" : "7级",
    label: isEn ? "Wind Resistance" : "最大抗风能力"
  }, {
    icon: Eye,
    value: "≥2000m",
    label: isEn ? "Flight Altitude" : "飞行高度"
  }, {
    icon: Radio,
    value: "20KM",
    label: isEn ? "Control Range" : "最大控制距离"
  }];

  // 飞行平台参数
  const flightPlatformSpecs = [{
    label: isEn ? "Motor Wheelbase" : "对称电机轴距",
    value: "1380mm"
  }, {
    label: isEn ? "Unfolded Size" : "外形尺寸（展开）",
    value: "1480×1480×550mm"
  }, {
    label: isEn ? "Folded Size" : "外形尺寸（折叠）",
    value: "500×500×550mm"
  }, {
    label: isEn ? "Propeller Size" : "桨叶规格",
    value: isEn ? "Diameter×Pitch: 36×7 inch" : "直径×螺距: 36×7 inch"
  }, {
    label: isEn ? "Max Ascent Speed" : "最大上升速度",
    value: "5 m/s"
  }, {
    label: isEn ? "Max Descent Speed" : "最大下降速度",
    value: "2 m/s"
  }, {
    label: isEn ? "Position Mode Speed" : "定位模式速度",
    value: "5 m/s"
  }, {
    label: isEn ? "Sport Mode Speed" : "运动模式速度",
    value: "8 m/s"
  }, {
    label: isEn ? "Attitude Mode Speed" : "姿态模式速度",
    value: "20 m/s"
  }, {
    label: isEn ? "Max Tilt Angle" : "最大可倾斜角度",
    value: "30°"
  }, {
    label: isEn ? "Max Angular Velocity" : "最大旋转角速度",
    value: "120°/s"
  }, {
    label: isEn ? "Max Wind Resistance" : "最大可承受风速",
    value: isEn ? "Level 7" : "7级"
  }, {
    label: isEn ? "Max Payload" : "最大载重",
    value: "≥20KG"
  }, {
    label: isEn ? "Flight Time" : "标准飞行时间",
    value: isEn ? "≥40min (empty)" : "≥40分钟（空载）"
  }, {
    label: isEn ? "Charging Time" : "充电时间",
    value: isEn ? "50 minutes" : "50分钟"
  }, {
    label: isEn ? "Operating Temp" : "工作环境温度",
    value: isEn ? "-40°C to +70°C" : "-40℃至+70℃"
  }, {
    label: isEn ? "Flight Elevation" : "飞行海拔",
    value: isEn ? "≥4000m" : "≥4000米"
  }, {
    label: isEn ? "Flight Altitude" : "飞行高度",
    value: isEn ? "≥2000m" : "≥2000米"
  }, {
    label: isEn ? "Hover Accuracy" : "悬停精度",
    value: isEn ? "Vertical/Horizontal: ±0.5m" : "垂直/水平: ±0.5m"
  }, {
    label: isEn ? "Protection Rating" : "防护等级",
    value: isEn ? "IP56 Dust/Water Resistant" : "IP56 防尘防水"
  }, {
    label: isEn ? "Body Material" : "机身材料",
    value: isEn ? "Carbon Fiber" : "碳纤维材料"
  }, {
    label: isEn ? "Satellite Positioning" : "卫星定位",
    value: isEn ? "GPS/GLONASS/BeiDou Triple" : "GPS/GLONASS/北斗三重定位"
  }, {
    label: isEn ? "Control Method" : "操控方式",
    value: isEn ? "APP Ground Station/Remote Controller" : "APP地面站/遥控器"
  }, {
    label: isEn ? "Deployment Time" : "部署时间",
    value: isEn ? "≤1 min (2 persons)" : "≤1分钟（2人）"
  }];

  // 遥控器参数
  const controllerSpecs = [{
    label: isEn ? "Screen Size" : "屏幕尺寸",
    value: isEn ? "5.5 inch HD High-brightness Touch Screen" : "5.5英寸 高清高亮触控屏"
  }, {
    label: isEn ? "Resolution" : "分辨率",
    value: "1920×1080 1000nits"
  }, {
    label: isEn ? "Memory" : "内存",
    value: "RAM:4G; ROM:64G"
  }, {
    label: isEn ? "System" : "系统",
    value: "Android 13"
  }, {
    label: isEn ? "Frequency" : "工作频率",
    value: isEn ? "2.4GHz 5.8GHz Dual-band" : "2.4GHz 5.8GHz 双频"
  }, {
    label: isEn ? "Max Control Range" : "最大控制距离",
    value: isEn ? "20KM (open, no interference)" : "20KM（空旷无干扰）"
  }, {
    label: isEn ? "Built-in Battery" : "内置电池",
    value: "7.4V 10000mAh"
  }, {
    label: isEn ? "Transmission" : "传输方式",
    value: isEn ? "4G-2.4G-WIFI and Wired" : "4G-2.4G-WIFI及有线传输"
  }, {
    label: isEn ? "Video Output" : "视频输出",
    value: isEn ? "HDMI/Wireless RTSP Sharing" : "HDMI/无线RTSP视频分享"
  }];

  // 云台摄像头参数
  const cameraSpecs = [{
    label: isEn ? "Dimensions" : "外形尺寸",
    value: "51×43.3×61.7mm"
  }, {
    label: isEn ? "Operating Temp" : "工作温度",
    value: isEn ? "-10° to 60°" : "-10°至60°"
  }, {
    label: isEn ? "Stabilization Axes" : "稳定轴数",
    value: isEn ? "3-axis" : "3轴"
  }, {
    label: isEn ? "Operating Voltage" : "工作电压",
    value: "7.2V~72V"
  }, {
    label: isEn ? "Video Output Resolution" : "视频输出分辨率",
    value: "1080P"
  }, {
    label: isEn ? "Recording Resolution" : "视频录像存储分辨率",
    value: "2K"
  }, {
    label: isEn ? "Pixels" : "像素",
    value: isEn ? "4MP effective pixels" : "400万有效像素"
  }, {
    label: isEn ? "Roll Control Angle" : "控制角度（横滚）",
    value: "-45° to 45°"
  }, {
    label: isEn ? "Pitch Control Angle" : "控制角度（俯仰）",
    value: "-90° to 10°"
  }, {
    label: isEn ? "Yaw Control Angle" : "控制角度（航向）",
    value: "-90° to 90°"
  }];

  // 任务载荷
  const payloads = [{
    icon: Lightbulb,
    title: isEn ? "Searchlight" : "探照灯",
    image: th300PayloadSpotlight,
    specs: isEn 
      ? ["Power: 200W", "Color Temp: 5000K-7000K", "Range: ≥1000m", "Angle: ±120°", "Mode: Constant/Strobe"]
      : ["功率: 200W", "色温: 5000K-7000K", "照射距离: ≥1000米", "探照角度: ±120°", "工作模式: 常亮/爆闪"]
  }, {
    icon: Volume2,
    title: isEn ? "Smart Speaker" : "智能喊话器",
    image: th300PayloadSpeaker,
    specs: isEn
      ? ["Power: 200W", "Sound: 180dB", "Range: ≥600m", "Signal Range: ≥3KM", "Mode: Real-time Intercom"]
      : ["功率: 200W", "声音分贝: 180", "传播距离: ≥600米", "信号接收距离: ≥3KM", "模式: 对讲机实时喊话"]
  }, {
    icon: Flame,
    title: isEn ? "Fire Extinguishing Ball Launcher" : "灭火球抛投设备",
    image: th300PayloadFireball,
    specs: isEn
      ? ["Material: Carbon Fiber", "Capacity: 4 balls", "Ball Weight: 1.3KG", "Detonation: Auto on fire", "Release: Sequential"]
      : ["材质: 碳纤维", "搭载数量: 4枚", "灭火弹重量: 1.3KG", "爆破方式: 遇火自爆", "投放方式: 依次投放"]
  }, {
    icon: Battery,
    title: isEn ? "High Voltage Solid-State Battery" : "高压版固态电池",
    image: th300PayloadBattery,
    specs: isEn
      ? ["Type: LiHV 14S", "Voltage: 61V", "Capacity: 31000mAh", "Energy: 7140Wh", "Altitude: ≥6000m"]
      : ["类型: LiHV 14S", "电压: 61V", "容量: 31000mAh", "能量: 7140Wh", "适应海拔: ≥6000米"]
  }];

  // 应用场景
  const applications = isEn 
    ? ["Patrol Monitoring", "Emergency Announcement", "Night Lighting", "Forest Firefighting", "Security Patrol", "Search & Rescue"]
    : ["巡查监控", "应急喊话", "夜间照明", "森林消防", "安防巡逻", "搜救行动"];

  return <div className="min-h-screen bg-background">
      <SEO 
        title={isEn ? "TH-300 Tethered Firefighting Drone - Multi-function Platform" : "TH-300 系留消防无人机 - 巡查/喊话/照明/消防多功能平台"} 
        description={isEn ? "TH-300 tethered firefighting drone, 1380mm wheelbase, ≥20KG payload, 40min endurance, supports searchlight, speaker, fire extinguishing balls and more" : "TH-300系留消防无人机，1380mm轴距，≥20KG载重，40分钟续航，支持探照灯、喊话器、灭火球等多任务载荷"} 
        keywords={isEn ? "tethered firefighting drone,TH-300,patrol drone,announcement drone,lighting drone,firefighting drone" : "系留消防无人机,TH-300,巡查无人机,喊话无人机,照明无人机,消防无人机,多功能无人机"} 
      />
      <Header />
      <FloatingContact />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-16 overflow-hidden">
          
          <BackButton to="/products/tethered" label={isEn ? "Back to Tethered Drones" : "返回系留无人机"} />

          <div className="container mx-auto px-4 pt-16 md:pt-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Product Info */}
              <div className="text-center lg:text-left">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
                  {isEn ? "TH-300 Tethered Firefighting Drone" : "TH-300 系留消防无人机"}
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                  {isEn 
                    ? "Multi-function platform for patrol, announcement, lighting, and firefighting. ≥20KG heavy payload capacity, supports multiple task payloads simultaneously, Level 7 wind resistance for stable flight, IP56 protection for complex environments."
                    : "巡查、喊话、照明、消防多功能平台，≥20KG大载重能力，支持多种任务载荷同时挂载，7级抗风稳定飞行，IP56防护等级适应复杂环境。"}
                </p>
                
                {/* Highlights Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {highlights.map((item, index) => <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                      <item.icon className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                      <div className="text-xl md:text-2xl font-bold text-white">{item.value}</div>
                      <div className="text-xs text-gray-400">{item.label}</div>
                    </div>)}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Link to="/contact">{isEn ? "Get Quote" : "获取报价"}</Link>
                  </Button>
                  <Button asChild size="lg" className="bg-white/20 border-2 border-white text-white hover:bg-white/30">
                    <a href="#specs">{isEn ? "View Specs" : "查看参数"}</a>
                  </Button>
                </div>
              </div>

              {/* Right: Product Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-3xl"></div>
                <img src={th300Drone} alt={isEn ? "TH-300 Tethered Firefighting Drone" : "TH-300 系留消防无人机"} className="relative z-10 w-full max-w-lg mx-auto drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{isEn ? "Core Features" : "核心特性"}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {isEn 
                  ? "Professional multi-function drone platform meeting patrol, announcement, lighting, firefighting and other application needs"
                  : "专业级多功能无人机平台，满足巡查、喊话、照明、消防等多场景应用需求"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <Plane className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{isEn ? "Heavy Payload Capacity" : "大载重能力"}</h3>
                <p className="text-gray-600">
                  {isEn 
                    ? "≥20KG max payload, supports multiple task payloads simultaneously to meet complex mission requirements"
                    : "≥20KG最大载重，支持多种任务载荷同时挂载，满足复杂任务需求"}
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{isEn ? "IP56 Protection" : "IP56防护"}</h3>
                <p className="text-gray-600">
                  {isEn 
                    ? "Dust and water resistant design, can fly in moderate rain, adapts to various harsh environments"
                    : "防尘防水设计，可在中雨天气下飞行，适应各种恶劣环境"}
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <Radio className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{isEn ? "Remote Control" : "远程控制"}</h3>
                <p className="text-gray-600">
                  {isEn 
                    ? "20KM max control range, GPS/GLONASS/BeiDou triple positioning, accurate and reliable"
                    : "20KM最大控制距离，GPS/GLONASS/北斗三重定位，精准可靠"}
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{isEn ? "Long Endurance" : "长续航能力"}</h3>
                <p className="text-gray-600">
                  {isEn 
                    ? "≥40min empty flight time, high energy density battery meets long-duration mission needs"
                    : "≥40分钟空载飞行时间，高能量密度电池，满足长时间任务需求"}
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{isEn ? "Quick Deployment" : "快速部署"}</h3>
                <p className="text-gray-600">
                  {isEn 
                    ? "Foldable design, 2-person operation deploys in ≤1 minute, carbon fiber body is light and strong"
                    : "折叠设计，2人操作≤1分钟完成部署，碳纤维机身轻量高强"}
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{isEn ? "High Altitude Operation" : "高海拔作业"}</h3>
                <p className="text-gray-600">
                  {isEn 
                    ? "Flight elevation ≥4000m, flight altitude ≥2000m, suitable for plateau environments"
                    : "飞行海拔≥4000米，飞行高度≥2000米，适应高原环境"}
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Payloads Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{isEn ? "Mission Payloads" : "任务载荷"}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {isEn 
                  ? "Multiple interfaces available, supports simultaneous mounting of various task payloads for different application scenarios"
                  : "可提供多种接口，同时挂载多种任务载荷，满足不同场景应用需求"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {payloads.map((payload, index) => <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-2 hover:border-orange-200">
                  <div className="w-full h-32 mb-4 flex items-center justify-center bg-slate-50 rounded-xl overflow-hidden">
                    <img src={payload.image} alt={payload.title} className="max-w-full max-h-full object-contain" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{payload.title}</h3>
                  <ul className="space-y-1">
                    {payload.specs.map((spec, i) => <li key={i} className="text-sm text-gray-600 flex items-start">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        {spec}
                      </li>)}
                  </ul>
                </Card>)}
            </div>
          </div>
        </section>

        {/* Specs Section */}
        <section id="specs" className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{isEn ? "Technical Specifications" : "详细技术参数"}</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {isEn 
                  ? "Complete technical specifications for professional quadrotor drone platform"
                  : "专业级四旋翼无人机平台完整技术规格"}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Flight Platform Specs */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <img src={th300Aircraft} alt={isEn ? "TH-300 Aircraft" : "TH-300飞行器"} className="w-24 h-24 object-contain" />
                  <h3 className="text-xl font-bold text-orange-400">{isEn ? "Aircraft Specifications" : "飞行器参数"}</h3>
                </div>
                <div className="bg-white/5 rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {flightPlatformSpecs.map((spec, index) => <tr key={index} className={index % 2 === 0 ? "bg-white/5" : ""}>
                          <td className="px-4 py-3 text-gray-400 text-sm w-1/3">{spec.label}</td>
                          <td className="px-4 py-3 text-white font-medium text-sm">{spec.value}</td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Controller & Camera Specs */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <img src={th300Controller} alt={isEn ? "Ground Station Controller" : "地面站遥控器"} className="w-20 h-20 object-contain" />
                    <h3 className="text-xl font-bold text-orange-400">{isEn ? "Smart Ground Station Controller" : "智能一体地面站遥控器"}</h3>
                  </div>
                  <div className="bg-white/5 rounded-2xl overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        {controllerSpecs.map((spec, index) => <tr key={index} className={index % 2 === 0 ? "bg-white/5" : ""}>
                            <td className="px-4 py-3 text-gray-400 text-sm">{spec.label}</td>
                            <td className="px-4 py-3 text-white font-medium text-sm">{spec.value}</td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <img src={th300GimbalCamera} alt={isEn ? "Gimbal Camera" : "云台摄像头"} className="w-20 h-20 object-contain" />
                    <h3 className="text-xl font-bold text-orange-400">{isEn ? "Gimbal Camera Specs" : "云台摄像头参数"}</h3>
                  </div>
                  <div className="bg-white/5 rounded-2xl overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        {cameraSpecs.map((spec, index) => <tr key={index} className={index % 2 === 0 ? "bg-white/5" : ""}>
                            <td className="px-4 py-3 text-gray-400 text-sm">{spec.label}</td>
                            <td className="px-4 py-3 text-white font-medium text-sm">{spec.value}</td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{isEn ? "Application Scenarios" : "应用场景"}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {isEn 
                  ? "Multi-function drone platform, widely used in various professional scenarios"
                  : "多功能无人机平台，广泛应用于各类专业场景"}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {applications.map((app, index) => <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                    <span className="text-orange-600 font-bold">{index + 1}</span>
                  </div>
                  <span className="text-slate-900 font-medium">{app}</span>
                </div>)}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{isEn ? "Need a Custom Solution?" : "需要定制解决方案？"}</h2>
              <p className="text-lg text-white/90 mb-8">
                {isEn 
                  ? "Contact our professional team for tailored TH-300 configuration and quotation"
                  : "联系我们的专业团队，为您提供TH-300定制化配置方案和报价"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                  <Link to="/contact">
                    <Phone className="w-5 h-5 mr-2" />
                    {isEn ? "Contact Us" : "联系我们"}
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-white/20 border-2 border-white hover:bg-white/30">
                  <Link to="/products/tethered">
                    {isEn ? "View All Tethered Drones" : "查看全部系留无人机"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};

export default TH300;
