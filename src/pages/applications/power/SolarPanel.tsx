import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sun, Thermometer, Cpu, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const challenges = [
  "光伏电站面积大，人工巡检周期长、效率低",
  "热斑故障隐蔽，人眼难以发现，易造成组件损坏",
  "地面视角受限，难以全面检测组件表面问题",
  "巡检数据分散，缺乏统一管理和分析平台"
];

const solutions = [
  {
    icon: Thermometer,
    title: "红外热斑检测",
    description: "高精度红外热成像，快速发现热斑、隐裂、PID等组件故障"
  },
  {
    icon: Sun,
    title: "可见光检测",
    description: "4K高清相机检测组件表面积灰、遮挡、破损等问题"
  },
  {
    icon: Cpu,
    title: "AI智能分析",
    description: "AI自动识别故障类型并定位，生成可视化缺陷分布图"
  },
  {
    icon: MapPin,
    title: "精准定位",
    description: "RTK厘米级定位，精确标注故障组件位置，便于后期运维"
  }
];

const specs = [
  { label: "单日检测面积", value: "5MW+" },
  { label: "热斑识别率", value: ">98%" },
  { label: "定位精度", value: "厘米级" },
  { label: "报告生成时间", value: "<1小时" },
  { label: "图像分辨率", value: "4K" },
  { label: "热成像分辨率", value: "640×512" }
];

const SolarPanel = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="光伏电站检测 - 电力巡检应用"
        description="飞迈科技光伏电站无人机检测解决方案，红外热斑检测，快速发现组件故障。"
        keywords="光伏电站检测,热斑检测,光伏巡检无人机,组件故障检测"
        url="/applications/power-inspection/solar-panel"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <div className="text-primary-foreground/70 mb-2">
                <Link to="/applications/power-inspection" className="hover:text-primary-foreground">电力巡检</Link>
                <span className="mx-2">/</span>
                <span>光伏电站检测</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">光伏电站检测</h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                无人机红外热成像技术，快速高效检测光伏组件热斑故障
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  咨询方案 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">行业痛点</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              光伏电站运维面临的主要挑战
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {challenges.map((challenge, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                  <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-destructive text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-foreground">{challenge}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">解决方案</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              飞迈科技光伏无人机检测系统，高效精准运维
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solutions.map((solution, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-card flex gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <solution.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-card-foreground mb-2">{solution.title}</h3>
                    <p className="text-muted-foreground text-sm">{solution.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specs Section */}
        <section className="py-16 bg-primary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground text-center mb-12">技术参数</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {specs.map((spec, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-accent mb-2">{spec.value}</div>
                  <div className="text-primary-foreground/70 text-sm">{spec.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">客户收益</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { title: "检测效率大幅提升", desc: "单日可检测5MW以上光伏电站，效率提升20倍" },
                { title: "发电量损失减少", desc: "及时发现热斑故障，减少发电量损失5-10%" },
                { title: "运维成本降低", desc: "精准定位故障组件，减少无效巡检，降低成本60%" }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-card">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">获取光伏电站检测方案</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              联系我们获取详细技术方案和报价
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  立即咨询 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/applications/power-inspection">
                <Button variant="outline" className="px-8 py-3">返回电力巡检</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default SolarPanel;