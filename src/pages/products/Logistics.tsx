import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { 
  Wind, 
  Wifi, 
  BatteryCharging, 
  Navigation, 
  Package, 
  Camera,
  Image,
  Lightbulb,
  Mic,
  Target,
  Compass,
  MapPin,
  ChevronRight
} from "lucide-react";

// 导入图片
import heroImage from "@/assets/products/logistics-hero.jpg";
import deliveryImage from "@/assets/products/logistics-delivery.jpg";
import modelsImage from "@/assets/products/logistics-models.jpg";
import dropImage from "@/assets/products/logistics-drop.jpg";
import foldImage from "@/assets/products/logistics-fold.jpg";
import waypointImage from "@/assets/products/logistics-waypoint.jpg";
import applicationsImage from "@/assets/products/logistics-applications.jpg";
import speakerImage from "@/assets/products/logistics-speaker.jpg";
import carbonImage from "@/assets/products/logistics-carbon.jpg";
import featuresImage from "@/assets/products/logistics-features.jpg";
import sixRotorImage from "@/assets/products/logistics-six-rotor.jpg";

const Logistics = () => {
  const highlights = [
    { title: "折叠便捷", description: "机身可折叠，便于收纳携带" },
    { title: "超强运输", description: "定制运载重量可达1-100斤" },
    { title: "功能定制", description: "支持多种载荷定制配置" },
    { title: "操作便捷", description: "智能操控，简单易学" },
    { title: "坚固耐用", description: "碳纤维机身，坚固耐用" },
  ];

  const features = [
    { icon: Wind, title: "7级抗风", description: "极端环境稳定飞行" },
    { icon: Wifi, title: "数字图传", description: "5.8GHz/2.4GHz双频" },
    { icon: BatteryCharging, title: "超长续航", description: "空载续航30分钟" },
    { icon: Navigation, title: "自动起降", description: "一键起飞返航" },
    { icon: Package, title: "远程投放", description: "双路投放系统" },
    { icon: Camera, title: "俯仰自稳云台", description: "稳定拍摄画面" },
    { icon: Image, title: "实时图传", description: "2K/1080P高清传输" },
    { icon: Lightbulb, title: "夜间照明", description: "底部LED照明" },
    { icon: Mic, title: "高音喊话", description: "远距离语音传达" },
    { icon: Target, title: "指点飞行", description: "地图打点飞行" },
    { icon: Compass, title: "一键返航", description: "自动安全返航" },
    { icon: MapPin, title: "航线规划", description: "智能航点规划" },
  ];

  const specs = [
    { label: "型号", value: "SY800-2" },
    { label: "图传方式", value: "手持地面站【液晶遥控】" },
    { label: "机身材料", value: "碳纤维+尼龙纤维" },
    { label: "机型", value: "多旋翼4轴可折叠" },
    { label: "桨叶", value: "碳纤维15寸桨" },
    { label: "无刷电机型号", value: "D4114" },
    { label: "电池容量及电压", value: "6S10000毫安/22.8V-26.1V" },
    { label: "充电时间", value: "3-4小时" },
    { label: "轴距", value: "800mm" },
    { label: "机身尺寸（长宽高）", value: "1180mm*950mm*230mm" },
    { label: "折叠尺寸（长宽高）", value: "320mm*320mm*40mm" },
    { label: "最大起飞重量", value: "6KG" },
    { label: "机身重量（不含电池）", value: "2.25KG" },
    { label: "空中照明", value: "照明/爆闪可切换" },
    { label: "远程投放", value: "双路投放" },
    { label: "远程高音喊话", value: "实时喊话/循环喊话/文本喊话/MP3播放" },
    { label: "续航时间【空载】", value: "30分钟左右" },
    { label: "遥控距离", value: "10公里（无干扰、无遮挡）" },
    { label: "飞行高度", value: "500米（无干扰、无遮挡）" },
    { label: "图像回传距离", value: "5公里（无干扰、无遮挡）" },
    { label: "最大载荷重量", value: "2KG" },
  ];

  const applications = [
    { title: "应急搜救", image: applicationsImage },
    { title: "消防救援", image: applicationsImage },
    { title: "警用执法", image: applicationsImage },
    { title: "电力巡检", image: applicationsImage },
    { title: "油气巡检", image: applicationsImage },
    { title: "地理信息测绘", image: applicationsImage },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="载重无人机 SY800-2 - 世翼运载无人机 | 飞迈科技"
        description="世翼运载无人机SY800-2，新一代升级版多功能载重无人机。碳纤维机身，可折叠设计，定制运载重量可达1-100斤，续航30分钟，10公里遥控距离。"
      />
      <Header />
      <FloatingContact />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="世翼运载无人机"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl rounded-3xl bg-background/70 backdrop-blur-md border border-border p-6 md:p-8 shadow-card">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
              世翼运载无人机
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-2">
              新一代升级版多功能载重无人机
            </p>
            <p className="text-lg text-primary font-semibold mb-8">
              性能 · 从未如此稳定
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  获取报价
                </Button>
              </Link>
              <a href="#specs">
                <Button size="lg" variant="outline">
                  查看规格
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {highlights.map((item, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-4 md:p-6 border border-border rounded-xl bg-background hover:border-primary/50 transition-colors min-w-[140px]"
              >
                <span className="text-lg md:text-xl font-bold text-foreground">{item.title}</span>
                <span className="text-sm text-muted-foreground mt-1">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 专为运载而生 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                专为运载而生
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                远近到达 快速高效
              </h3>
              <p className="text-muted-foreground mb-4">
                以大载重，长航程，突破空间限制
              </p>
              <p className="text-lg font-semibold text-foreground">
                定制运载重量可达1-100斤
              </p>
            </div>
            <div className="flex justify-center">
              <img 
                src={deliveryImage} 
                alt="专为运载而生"
                className="w-full max-w-lg rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 底部双投放 */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <img 
                src={dropImage} 
                alt="底部双投放多功能抛投器"
                className="w-full max-w-lg rounded-2xl shadow-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                底部双投放
              </h2>
              <h3 className="text-2xl font-bold text-primary mb-6">
                多功能抛投器
              </h3>
              <p className="text-muted-foreground mb-4">
                多功能挂物抛投器，可以实现1-100斤负载
              </p>
              <p className="text-lg text-foreground">
                挂物远程派送、空投
              </p>
              <div className="mt-6 p-4 bg-primary/10 rounded-xl">
                <p className="font-semibold text-foreground">底部双钩设计</p>
                <p className="text-sm text-muted-foreground">独立控制，精准投放</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 机身可折叠 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              机身可折叠展开
            </h2>
            <h3 className="text-2xl font-bold text-primary mb-4">
              便于收纳携带
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              碳纤维机身运载无人机 轻松单人作业
            </p>
          </div>
          <div className="flex justify-center">
            <img 
              src={foldImage} 
              alt="可折叠设计"
              className="w-full max-w-4xl rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* 定点规划 */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                定点规划 无需操控
              </h2>
              <h3 className="text-2xl font-bold text-primary mb-6">
                尽享智能操控
              </h3>
              <p className="text-muted-foreground mb-4">
                可在APP上画出想要的飞行轨迹
              </p>
              <p className="text-lg text-foreground mb-6">
                实现自动飞行，无需遥控
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">支持地图打点、飞机打点、飞行路径转换航点、输入经纬度坐标打点</span>
                </div>
                <div className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">支持自定义航点高度、速度、悬停时间，跟随地形</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src={waypointImage} 
                alt="智能航点规划"
                className="w-full max-w-lg rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 高音量喊话器 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <img 
                src={speakerImage} 
                alt="高音量喊话器"
                className="w-full max-w-lg rounded-2xl shadow-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                高音量喊话器
              </h2>
              <h3 className="text-2xl font-bold text-primary mb-6">
                你的空中"话筒"
              </h3>
              <p className="text-muted-foreground text-lg">
                超远距离传音，声音清晰饱满
              </p>
              <ul className="mt-6 space-y-2 text-muted-foreground">
                <li>• 实时喊话</li>
                <li>• 循环喊话</li>
                <li>• 文本喊话</li>
                <li>• MP3播放</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 碳纤维机身 */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              碳纤维运载无人机
            </h2>
            <p className="text-muted-foreground">四轴 / 六轴 可选配置</p>
          </div>
          <div className="flex justify-center">
            <img 
              src={carbonImage} 
              alt="碳纤维机身"
              className="w-full max-w-4xl rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* 产品特性 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              六旋翼大载重运输无人机
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              专业级多功能载重平台，满足各种行业应用需求
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 应用领域 */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              运载无人机应用领域/场景
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {["应急搜救", "消防救援", "警用执法", "电力巡检", "油气巡检", "地理信息测绘"].map((title, index) => (
              <div 
                key={index}
                className="relative group overflow-hidden rounded-xl aspect-[4/3]"
              >
                <img 
                  src={applicationsImage} 
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 技术规格 */}
      <section id="specs" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              技术规格
            </h2>
            <p className="text-muted-foreground">SY800-2 详细参数</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-1">
              {specs.map((spec, index) => (
                <div 
                  key={index}
                  className={`grid grid-cols-2 gap-4 p-4 ${index % 2 === 0 ? 'bg-muted/30' : 'bg-background'}`}
                >
                  <span className="text-muted-foreground">{spec.label}</span>
                  <span className="text-foreground font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            了解更多SY800-2解决方案
          </h2>
          <p className="text-xl mb-8 opacity-90">
            专业团队为您提供定制化载重无人机解决方案
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" variant="secondary">
                联系我们
              </Button>
            </Link>
            <a href="tel:+8617674048404">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                电话咨询
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Logistics;
