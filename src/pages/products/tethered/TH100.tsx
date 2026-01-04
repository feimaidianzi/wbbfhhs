import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, LayoutGrid, Droplets, Settings, Cpu, Zap, Truck, Radar, Battery, Monitor } from "lucide-react";
import th100Hero from "@/assets/products/th-100-hero.png";
import th100GroundUnit from "@/assets/products/th-100-ground-unit.png";
import th100CleaningModes from "@/assets/products/th-100-cleaning-modes.png";
import th100Telescopic from "@/assets/products/th-100-telescopic.png";
import th100Psdk from "@/assets/products/th-100-psdk.png";
import th100Comparison from "@/assets/products/th-100-comparison.png";
import th100Radar from "@/assets/products/th-100-radar.png";
import th100Power from "@/assets/products/th-100-power.png";

const TH100 = () => {
  const highlights = [
    { icon: LayoutGrid, title: "多模式", subtitle: "高压清洁系统" },
    { icon: Droplets, title: "23 MPa", subtitle: "高压清洁动力系统" },
    { icon: Settings, title: "快装伸缩", subtitle: "式设计" },
    { icon: Cpu, title: "PSDK", subtitle: "嵌入式控制系统" },
    { icon: Zap, title: "16kW", subtitle: "系留供电模块" },
    { icon: Truck, title: "紧凑运输", subtitle: "快速部署" },
  ];

  const groundUnitSpecs = [
    { value: "220V", label: "电压" },
    { value: "3400W", label: "电源" },
    { value: "150 bar", label: "额定压力" },
    { value: "600 L/h", label: "流量" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="TH-100 无人机系留式空中清洁与供电系统"
        description="TH-100双缆系留式空中清洁系统，地面同步供电供水，高效能持续清洁作业全系统解决方案"
        keywords="系留无人机,空中清洁,TH-100,高压清洗,无人机清洁"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-5" />
        
        <div className="container mx-auto px-4 py-8">
          <Link
            to="/products/tethered"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            返回系留无人机
          </Link>
        </div>

        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
            TH-100 无人机系留式空中清洁与供电系统
          </h1>
          <div className="space-y-2 mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <p className="text-lg md:text-xl text-gray-300">
              双缆系留式空中清洁系统——地面同步供电供水
            </p>
            <p className="text-lg md:text-xl text-gray-300">
              高效能持续清洁作业全系统解决方案
            </p>
          </div>

          <div className="max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <img
              src={th100Hero}
              alt="TH-100 空中清洁系统"
              className="w-full h-auto animate-float"
            />
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {highlights.map((item, index) => (
              <div 
                key={index}
                className="group flex flex-col items-center text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
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

      {/* Ground Unit Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 animate-fade-in">
            工业级地面单元-可靠压力源
          </h2>
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto mt-12">
            {/* 标准配置 */}
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h3 className="text-xl font-semibold text-white text-center mb-4">标准配置</h3>
              <div className="grid grid-cols-2 gap-4">
                {groundUnitSpecs.map((spec, index) => (
                  <div 
                    key={index}
                    className="text-center p-4 border border-gray-700 rounded-lg hover:border-blue-500 transition-colors"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-white">{spec.value}</div>
                    <div className="text-gray-400 text-sm mt-1">{spec.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 max-w-md animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <img
                src={th100GroundUnit}
                alt="工业级地面单元"
                className="w-full h-auto hover:scale-105 transition-transform duration-500"
              />
              <p className="text-center text-amber-500 mt-4 text-lg">120米高压软管</p>
              <p className="text-center text-gray-400 text-sm mt-2">*高压水泵为选配部件</p>
            </div>
          </div>

          {/* 可选配置 */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
            <div className="animate-fade-in bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-amber-500 transition-colors" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-lg font-semibold text-amber-500 text-center mb-4">可选配置 1</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 border border-gray-600 rounded-lg">
                  <div className="text-xl font-bold text-white">200 bar</div>
                  <div className="text-gray-400 text-xs mt-1">额定压力</div>
                </div>
                <div className="text-center p-3 border border-gray-600 rounded-lg">
                  <div className="text-xl font-bold text-white">900 L/h</div>
                  <div className="text-gray-400 text-xs mt-1">流量</div>
                </div>
                <div className="text-center p-3 border border-gray-600 rounded-lg">
                  <div className="text-xl font-bold text-white">380V</div>
                  <div className="text-gray-400 text-xs mt-1">电压</div>
                </div>
                <div className="text-center p-3 border border-gray-600 rounded-lg">
                  <div className="text-xl font-bold text-white">6900W</div>
                  <div className="text-gray-400 text-xs mt-1">功率</div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-amber-500 transition-colors" style={{ animationDelay: "0.4s" }}>
              <h3 className="text-lg font-semibold text-amber-500 text-center mb-4">可选配置 2</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 border border-gray-600 rounded-lg">
                  <div className="text-xl font-bold text-white">230 bar</div>
                  <div className="text-gray-400 text-xs mt-1">额定压力</div>
                </div>
                <div className="text-center p-3 border border-gray-600 rounded-lg">
                  <div className="text-xl font-bold text-white">1000 L/h</div>
                  <div className="text-gray-400 text-xs mt-1">流量</div>
                </div>
                <div className="text-center p-3 border border-gray-600 rounded-lg">
                  <div className="text-xl font-bold text-white">380V</div>
                  <div className="text-gray-400 text-xs mt-1">电压</div>
                </div>
                <div className="text-center p-3 border border-gray-600 rounded-lg">
                  <div className="text-xl font-bold text-white">9000W</div>
                  <div className="text-gray-400 text-xs mt-1">功率</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cleaning Modes Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 animate-fade-in">
            多重清洁模式—适配各类表面
          </h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            可在直射喷射、扇形喷雾（精准/广域清洁）及专用泡沫喷嘴（深层泡沫应用）间切换。
          </p>
          
          <div className="max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <img
              src={th100CleaningModes}
              alt="多重清洁模式"
              className="w-full h-auto hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Telescopic Design Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 animate-fade-in">
            伸缩式设计—便于运输，快速部署
          </h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            三段式伸缩喷臂，快速展开，便于运输。
          </p>
          
          <div className="max-w-5xl mx-auto animate-fade-in relative" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <img
                src={th100Telescopic}
                alt="伸缩式设计"
                className="w-full h-auto"
              />
              {/* 上方大产品标注 */}
              <div className="absolute top-[15%] right-[5%] text-right">
                <p className="text-amber-500 font-semibold text-lg md:text-xl">最大伸展长度: 3.1米</p>
              </div>
              {/* 下方小产品标注 */}
              <div className="absolute bottom-[20%] right-[5%] text-right">
                <p className="text-amber-500 font-semibold text-lg md:text-xl">最小长度: 2.1米</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-8">
              <div className="text-center">
                <p className="text-gray-300">最大伸展长度：<span className="text-white font-bold">3.1米</span></p>
                <p className="text-amber-500 text-sm">*操作时需确保完全伸展</p>
              </div>
              <div className="text-center">
                <p className="text-gray-300">最小长度：<span className="text-white font-bold">2.1米</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PSDK Control Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 animate-fade-in">
            PSDK集成喷嘴摆动控制
          </h2>
          
          <div className="max-w-5xl mx-auto mt-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <img
              src={th100Psdk}
              alt="PSDK集成控制"
              className="w-full h-auto hover:scale-105 transition-transform duration-500"
            />
            <div className="flex items-center justify-center gap-2 mt-8">
              <Monitor className="w-6 h-6 text-blue-400" />
              <p className="text-xl text-white">
                第一人称视角辅助清洁作业
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cleaning Comparison Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 animate-fade-in">
            专业清洗效果
          </h2>
          
          <div className="max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <img
              src={th100Comparison}
              alt="清洗效果对比"
              className="w-full h-auto rounded-xl overflow-hidden"
            />
            <div className="grid grid-cols-3 gap-4 mt-8 text-center">
              <div className="p-4">
                <p className="text-gray-400">初次清洗</p>
                <p className="text-white font-semibold">中性洗涤剂</p>
              </div>
              <div className="p-4">
                <p className="text-gray-400">二次清洗</p>
                <p className="text-white font-semibold">玻璃镀膜剂</p>
              </div>
              <div className="p-4">
                <p className="text-gray-400">三次清洗</p>
                <p className="text-white font-semibold">清水</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Radar Safety Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 animate-fade-in">
            相控阵雷达保障飞行安全与稳定清洁
          </h2>
          <p className="text-center text-amber-500 mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            前方障碍物检测距离≥3米
          </p>
          
          <div className="max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <img
                src={th100Radar}
                alt="相控阵雷达安全系统"
                className="w-full h-auto"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 bg-blue-400/30 rounded-full animate-ping" />
                <Radar className="w-8 h-8 text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Power System Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 animate-fade-in">
            即插即用电源-兼容大疆电池插槽
          </h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            更换一块电池即可获得16千瓦系留供电—简单又安全。
          </p>
          
          <div className="max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <img
              src={th100Power}
              alt="电源系统"
              className="w-full h-auto"
            />
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="flex items-center gap-4 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <Battery className="w-8 h-8 text-blue-400" />
                <div>
                  <h4 className="text-white font-semibold">兼容大疆的系留供电模块</h4>
                  <p className="text-gray-400 text-sm">备用电池无缝接管</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <Zap className="w-8 h-8 text-amber-400" />
                <div>
                  <h4 className="text-white font-semibold">工业级地面单元</h4>
                  <p className="text-gray-400 text-sm">稳定电源供应</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in">
            了解更多TH-100解决方案
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            联系我们的专业团队，获取定制化配置方案和详细报价
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Link
              to="/contact"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              立即咨询
            </Link>
            <Link
              to="/products/tethered"
              className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              查看更多产品
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TH100;
