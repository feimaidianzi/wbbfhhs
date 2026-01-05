import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Clock, Zap, Shield, Radio, Eye, Settings, Phone, Mail, Plane, Target, Volume2, Lightbulb, Flame, Battery } from "lucide-react";

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
  // 核心亮点
  const highlights = [{
    icon: Plane,
    value: "1380mm",
    label: "对称电机轴距"
  }, {
    icon: Target,
    value: "≥20KG",
    label: "最大载重能力"
  }, {
    icon: Clock,
    value: "≥40min",
    label: "标准飞行时间"
  }, {
    icon: Shield,
    value: "7级",
    label: "最大抗风能力"
  }, {
    icon: Eye,
    value: "≥2000m",
    label: "飞行高度"
  }, {
    icon: Radio,
    value: "20KM",
    label: "最大控制距离"
  }];

  // 飞行平台参数
  const flightPlatformSpecs = [{
    label: "对称电机轴距",
    value: "1380mm"
  }, {
    label: "外形尺寸（展开）",
    value: "1480×1480×550mm"
  }, {
    label: "外形尺寸（折叠）",
    value: "500×500×550mm"
  }, {
    label: "桨叶规格",
    value: "直径×螺距: 36×7 inch"
  }, {
    label: "最大上升速度",
    value: "5 m/s"
  }, {
    label: "最大下降速度",
    value: "2 m/s"
  }, {
    label: "定位模式速度",
    value: "5 m/s"
  }, {
    label: "运动模式速度",
    value: "8 m/s"
  }, {
    label: "姿态模式速度",
    value: "20 m/s"
  }, {
    label: "最大可倾斜角度",
    value: "30°"
  }, {
    label: "最大旋转角速度",
    value: "120°/s"
  }, {
    label: "最大可承受风速",
    value: "7级"
  }, {
    label: "最大载重",
    value: "≥20KG"
  }, {
    label: "标准飞行时间",
    value: "≥40分钟（空载）"
  }, {
    label: "充电时间",
    value: "50分钟"
  }, {
    label: "工作环境温度",
    value: "-40℃至+70℃"
  }, {
    label: "飞行海拔",
    value: "≥4000米"
  }, {
    label: "飞行高度",
    value: "≥2000米"
  }, {
    label: "悬停精度",
    value: "垂直/水平: ±0.5m"
  }, {
    label: "防护等级",
    value: "IP56 防尘防水"
  }, {
    label: "机身材料",
    value: "碳纤维材料"
  }, {
    label: "卫星定位",
    value: "GPS/GLONASS/北斗三重定位"
  }, {
    label: "操控方式",
    value: "APP地面站/遥控器"
  }, {
    label: "部署时间",
    value: "≤1分钟（2人）"
  }];

  // 遥控器参数
  const controllerSpecs = [{
    label: "屏幕尺寸",
    value: "5.5英寸 高清高亮触控屏"
  }, {
    label: "分辨率",
    value: "1920×1080 1000nits"
  }, {
    label: "内存",
    value: "RAM:4G; ROM:64G"
  }, {
    label: "系统",
    value: "Android 13"
  }, {
    label: "工作频率",
    value: "2.4GHz 5.8GHz 双频"
  }, {
    label: "最大控制距离",
    value: "20KM（空旷无干扰）"
  }, {
    label: "内置电池",
    value: "7.4V 10000mAh"
  }, {
    label: "传输方式",
    value: "4G-2.4G-WIFI及有线传输"
  }, {
    label: "视频输出",
    value: "HDMI/无线RTSP视频分享"
  }];

  // 云台摄像头参数
  const cameraSpecs = [{
    label: "外形尺寸",
    value: "51×43.3×61.7mm"
  }, {
    label: "工作温度",
    value: "-10°至60°"
  }, {
    label: "稳定轴数",
    value: "3轴"
  }, {
    label: "工作电压",
    value: "7.2V~72V"
  }, {
    label: "视频输出分辨率",
    value: "1080P"
  }, {
    label: "视频录像存储分辨率",
    value: "2K"
  }, {
    label: "像素",
    value: "400万有效像素"
  }, {
    label: "控制角度（横滚）",
    value: "-45°至45°"
  }, {
    label: "控制角度（俯仰）",
    value: "-90°至10°"
  }, {
    label: "控制角度（航向）",
    value: "-90°至90°"
  }];

  // 任务载荷
  const payloads = [{
    icon: Lightbulb,
    title: "探照灯",
    image: th300PayloadSpotlight,
    specs: ["功率: 200W", "色温: 5000K-7000K", "照射距离: ≥1000米", "探照角度: ±120°", "工作模式: 常亮/爆闪"]
  }, {
    icon: Volume2,
    title: "智能喊话器",
    image: th300PayloadSpeaker,
    specs: ["功率: 200W", "声音分贝: 180", "传播距离: ≥600米", "信号接收距离: ≥3KM", "模式: 对讲机实时喊话"]
  }, {
    icon: Flame,
    title: "灭火球抛投设备",
    image: th300PayloadFireball,
    specs: ["材质: 碳纤维", "搭载数量: 4枚", "灭火弹重量: 1.3KG", "爆破方式: 遇火自爆", "投放方式: 依次投放"]
  }, {
    icon: Battery,
    title: "高压版固态电池",
    image: th300PayloadBattery,
    specs: ["类型: LiHV 14S", "电压: 61V", "容量: 31000mAh", "能量: 7140Wh", "适应海拔: ≥6000米"]
  }];

  // 应用场景
  const applications = ["巡查监控", "应急喊话", "夜间照明", "森林消防", "安防巡逻", "搜救行动"];
  return <div className="min-h-screen bg-background">
      <SEO title="D420 四旋翼无人机 - 巡查/喊话/照明/消防多功能平台" description="D420四旋翼无人机，1380mm轴距，≥20KG载重，40分钟续航，支持探照灯、喊话器、灭火球等多任务载荷" keywords="四旋翼无人机,D420,巡查无人机,喊话无人机,照明无人机,消防无人机,多功能无人机" />
      <Header />
      <FloatingContact />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-5"></div>
          
          <BackButton to="/products/tethered" label="返回系留无人机" />

          <div className="container mx-auto px-4 pt-16 md:pt-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Product Info */}
              <div className="text-center lg:text-left">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in">TH-300 系留消防无人机</h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                  巡查、喊话、照明、消防多功能平台，≥20KG大载重能力，支持多种任务载荷同时挂载，7级抗风稳定飞行，IP56防护等级适应复杂环境。
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
                    <Link to="/contact">获取报价</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <a href="#specs">查看参数</a>
                  </Button>
                </div>
              </div>

              {/* Right: Product Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-3xl"></div>
                <img src={th300Drone} alt="D420 四旋翼无人机" className="relative z-10 w-full max-w-lg mx-auto drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">核心特性</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">专业级多功能无人机平台，满足巡查、喊话、照明、消防等多场景应用需求</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <Plane className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">大载重能力</h3>
                <p className="text-gray-600">≥20KG最大载重，支持多种任务载荷同时挂载，满足复杂任务需求</p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">IP56防护</h3>
                <p className="text-gray-600">防尘防水设计，可在中雨天气下飞行，适应各种恶劣环境</p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <Radio className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">远程控制</h3>
                <p className="text-gray-600">20KM最大控制距离，GPS/GLONASS/北斗三重定位，精准可靠</p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">长续航能力</h3>
                <p className="text-gray-600">≥40分钟空载飞行时间，高能量密度电池，满足长时间任务需求</p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">快速部署</h3>
                <p className="text-gray-600">折叠设计，2人操作≤1分钟完成部署，碳纤维机身轻量高强</p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">高海拔作业</h3>
                <p className="text-gray-600">飞行海拔≥4000米，飞行高度≥2000米，适应高原环境</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Payloads Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">任务载荷</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">可提供多种接口，同时挂载多种任务载荷，满足不同场景应用需求</p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">详细技术参数</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">专业级四旋翼无人机平台完整技术规格</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Flight Platform Specs */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <img src={th300Aircraft} alt="D420飞行器" className="w-24 h-24 object-contain" />
                  <h3 className="text-xl font-bold text-orange-400">飞行器参数</h3>
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
                    <img src={th300Controller} alt="地面站遥控器" className="w-20 h-20 object-contain" />
                    <h3 className="text-xl font-bold text-orange-400">智能一体地面站遥控器</h3>
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
                    <img src={th300GimbalCamera} alt="云台摄像头" className="w-20 h-20 object-contain" />
                    <h3 className="text-xl font-bold text-orange-400">云台摄像头参数</h3>
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
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">应用场景</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">多功能无人机平台，广泛应用于各类专业场景</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {applications.map((app, index) => <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium text-slate-900">{app}</span>
                </div>)}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-orange-500 to-red-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              了解更多D420解决方案
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto text-lg">
              联系我们的专业团队，获取定制化配置方案和详细报价
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                <Link to="/contact">
                  <Phone className="w-5 h-5 mr-2" />
                  立即咨询
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <a href="mailto:contact@example.com">
                  <Mail className="w-5 h-5 mr-2" />
                  发送邮件
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default TH300;