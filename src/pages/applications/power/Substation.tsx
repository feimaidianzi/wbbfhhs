import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Thermometer, Eye, Shield, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const challenges = [
  "变电站设备众多，人工巡检耗时长、效率低",
  "部分设备位置较高或空间狭窄，巡检难度大",
  "人工测温易受主观因素影响，漏检率高",
  "缺乏历史数据对比，难以发现渐变性故障"
];

const solutions = [
  {
    icon: Thermometer,
    title: "红外测温",
    description: "高精度红外热成像仪，精准检测设备过热点，温度测量精度±2℃"
  },
  {
    icon: Eye,
    title: "可见光巡检",
    description: "4K高清相机，清晰拍摄设备外观，发现锈蚀、渗漏、变形等缺陷"
  },
  {
    icon: Shield,
    title: "室内外通用",
    description: "支持室内外飞行，可在变电站各区域灵活作业，覆盖无死角"
  },
  {
    icon: BarChart,
    title: "趋势分析",
    description: "历史数据自动对比，分析设备温升趋势，预警潜在故障"
  }
];

const specs = [
  { label: "热成像分辨率", value: "640×512" },
  { label: "测温精度", value: "±2℃" },
  { label: "测温范围", value: "-20~650℃" },
  { label: "可见光分辨率", value: "4K" },
  { label: "单站巡检时间", value: "30分钟" },
  { label: "数据处理时间", value: "<5分钟" }
];

const Substation = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="变电站巡检 - 电力巡检应用"
        description="长凌电子变电站无人机巡检解决方案，红外测温+可见光双光巡检，高效发现设备隐患。"
        keywords="变电站巡检,红外测温无人机,设备巡检,电力无人机"
        url="/applications/power-inspection/substation"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <div className="text-primary-foreground/70 mb-2">
                <Link to="/applications/power-inspection" className="hover:text-primary-foreground">电力巡检</Link>
                <span className="mx-2">/</span>
                <span>变电站巡检</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">变电站巡检</h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                无人机红外测温巡检，快速发现变电站设备过热隐患
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
              传统变电站巡检方式存在效率低、覆盖不全等问题
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
              长凌电子变电站无人机巡检系统，实现精准高效巡检
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
                { title: "巡检效率提升", desc: "单站巡检时间从4小时缩短至30分钟" },
                { title: "隐患发现率提高", desc: "红外+可见光双光检测，隐患发现率提升60%" },
                { title: "运维成本降低", desc: "减少人工巡检工作量，降低运维成本50%" }
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
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">获取变电站巡检方案</h2>
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

export default Substation;