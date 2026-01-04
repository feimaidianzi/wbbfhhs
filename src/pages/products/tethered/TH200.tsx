import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Radio, Weight, Clock, Navigation, Layers, Cpu, Thermometer, Zap, Sun, Phone } from "lucide-react";

const TH200 = () => {
  const highlights = [
    { icon: Radio, label: "通信中继", description: "200米高度5公里覆盖" },
    { icon: Weight, label: "10kg载荷", description: "支持多种专业载荷" },
    { icon: Clock, label: "24小时滞空", description: "系留模式不间断工作" },
    { icon: Navigation, label: "高精度定位", description: "RTK厘米级定位" },
    { icon: Layers, label: "挂载丰富", description: "多任务载荷适配" },
    { icon: Cpu, label: "性能稳定", description: "工业级飞控系统" },
  ];

  const flightPlatformSpecs = [
    { label: "机翼类型", value: "四旋翼" },
    { label: "机身材料", value: "碳纤维材料，重量轻，强度高，具备防腐蚀性" },
    { label: "动力系统", value: "一体化FOC动力系统" },
    { label: "轴距", value: "1200mm" },
    { label: "展开尺寸", value: "1000mm×1000mm×600mm" },
    { label: "折叠尺寸", value: "620mm×620mm×600mm" },
    { label: "桨叶规格", value: "30寸" },
    { label: "机身重量", value: "11kg（不含电池）" },
    { label: "最大载荷量", value: "10kg" },
    { label: "最大起飞重量", value: "29kg" },
    { label: "最大飞行速度", value: "上升5m/s 下降3m/s 水平飞行15m/s" },
    { label: "最大可承受风速", value: "15m/s（7级）" },
    { label: "最大续航时间", value: "60min-空载/ 20min-10kg负载/系留模式24小时" },
    { label: "最大飞行高度", value: "1000米" },
    { label: "最大飞行海拔", value: "5000米" },
    { label: "最大飞行距离", value: "15km（无干扰、无遮挡）" },
    { label: "飞行模式", value: "手动、自动、定高、定点、运动、姿态" },
    { label: "导航卫星系统", value: "GPS L1 L2 / GLONASS L1 L2 / BDS B1 B2" },
    { label: "定位精度（垂直）", value: "±2.5m (GNSS单点) ±0.8m (DGPS) ±1.5cm+1ppm (RTK)" },
    { label: "定位精度（水平）", value: "±1.5m (GNSS单点) ±0.4m (DGPS) ±1.0cm+1ppm (RTK)" },
    { label: "防水等级", value: "机身防中雨" },
    { label: "工作环境温度", value: "-20°C ~ 55°C" },
  ];

  const tetherEquipmentSpecs = [
    { category: "天空端电源模块", specs: [
      { label: "输入电压", value: "580~810Vdc宽范围输入" },
      { label: "输出电压", value: "50Vdc±1%或58Vdc±1%恒定稳压输出" },
      { label: "输出功率", value: "额定长时输出≥6000W峰值输出≥7000W" },
    ]},
    { category: "系留线缆", specs: [
      { label: "线缆材质", value: "镀银轻质耐高温航空线材，轻质耐高温护套" },
      { label: "线缆长度", value: "110m/220m两种标准配置" },
    ]},
    { category: "地面系留箱", specs: [
      { label: "输入电压", value: "190~240Vac, 单相220Vac, 频率50/60Hz" },
      { label: "输出电压", value: "600~800Vdc可调, 出厂默认800Vdc" },
      { label: "输出功率", value: "额定长时输出≥7000W, 峰值输出≥8000W" },
    ]},
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="TH-200系留照明无人机 - 专业系留平台解决方案"
        description="TH-200系留照明无人机，200米升空高度，10kg载荷，24小时不间断滞空，适用于应急照明、通信中继等场景"
        keywords="系留无人机,TH-200,应急照明,通信中继,系留平台"
      />
      <Header />
      <FloatingContact />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')] bg-cover bg-center opacity-30" />
        <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
          {/* Back Link */}
          <Link 
            to="/products/tethered" 
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回系留无人机
          </Link>

          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              系留<span className="text-yellow-500">照明</span>无人机
            </h1>
            <p className="text-4xl md:text-5xl font-bold text-foreground">TH-200</p>
          </div>

          {/* Product Image Placeholder */}
          <div className="flex justify-center mb-16">
            <div className="relative">
              <img 
                src="/src/assets/products/th-200-drone.png" 
                alt="TH-200系留无人机"
                className="w-full max-w-2xl"
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">工业品质 性能可靠</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              行业级飞控系统功能强大，双工业级硬件多冗余系统，抗磁干扰航向自动校准算法，保障飞行安全。
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
                <h2 className="text-4xl font-bold">高效冷却</h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                动力采用离心式风冷系统，内置高效散热阵列，大面积散热片配合旋翼流场，进一步提升了冷却效率，出色的散热性能为系留长时间滞空作业提供了有力的保障。
              </p>
            </div>
            <div className="flex justify-center">
              <img 
                src="/src/assets/products/th-200-cooling.png" 
                alt="离心式风冷系统"
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
                src="/src/assets/products/th-200-propeller.png" 
                alt="Ultra Carbon Pro 碳纤维桨叶"
                className="w-80 h-60 object-cover rounded-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-10 h-10 text-yellow-400" />
                <h2 className="text-4xl font-bold">强劲动力</h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                螺旋桨采用特种碳纤维复合Ultra carbon pro，在保持极度轻巧之余，仍具有出色的强度和刚度，设计的气动外形，配合协同优化的电机电磁设计，提供更高效的效率，更迅速的响应。
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
              <h2 className="text-4xl font-bold">应急照明</h2>
            </div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              无人机搭载4组亮度20000流明矩阵灯，有效照明面积约10000平方米。
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              "/src/assets/products/th-200-lighting-1.png",
              "/src/assets/products/th-200-lighting-2.png",
              "/src/assets/products/th-200-lighting-3.png",
              "/src/assets/products/th-200-lighting-4.png"
            ].map((src, index) => (
              <div key={index} className="aspect-[4/5] bg-gray-800 rounded-xl overflow-hidden">
                <img 
                  src={src}
                  alt={`应急照明场景 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
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
                <h2 className="text-4xl font-bold text-foreground">通信中继</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                无人机搭载中继模块，系留供电长时间滞空，200米高度可辐射5公里范围。适用于应急通信、大型活动、偏远地区信号覆盖等场景。
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-60 bg-sky-300/30 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Radio className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">5公里信号覆盖</p>
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
            <h2 className="text-4xl font-bold text-foreground mb-2">产品参数</h2>
            <p className="text-muted-foreground">TECHNICAL PARAMETER</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Flight Platform */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b-4 border-primary inline-block">
                飞行平台
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
                系留设备
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
            <h2 className="text-4xl font-bold text-foreground mb-2">产品展示</h2>
            <p className="text-muted-foreground">PRODUCT DISPLAY</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="aspect-square bg-white rounded-xl shadow-lg overflow-hidden flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400&q=80"
                  alt={`产品展示 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">了解更多TH-200解决方案</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            联系我们的专业团队，获取定制化配置方案和详细报价
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">
                <Phone className="w-5 h-5 mr-2" />
                联系我们
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:400-123-4567">拨打热线：400-123-4567</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TH200;
