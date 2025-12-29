import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, Map, Cloud, Shield, Settings, Database } from "lucide-react";
import { SEO } from "@/components/SEO";

const systems = [
  {
    icon: Monitor,
    name: "地面站控制系统",
    description: "专业的地面站软件，支持多机协同控制、航线规划、实时监控等功能。",
    features: ["多机协同控制", "三维航线规划", "实时视频传输", "飞行数据记录"],
  },
  {
    icon: Map,
    name: "航线规划系统",
    description: "智能航线规划软件，支持自动生成最优航线，提高作业效率。",
    features: ["地形感知规划", "避障路径优化", "分区作业规划", "航线导入导出"],
  },
  {
    icon: Cloud,
    name: "云平台管理系统",
    description: "基于云端的无人机管理平台，实现设备管理、任务调度、数据分析。",
    features: ["设备远程管理", "任务智能调度", "数据云端存储", "多端协同访问"],
  },
  {
    icon: Shield,
    name: "安全监控系统",
    description: "全方位安全监控系统，保障无人机作业安全，预防潜在风险。",
    features: ["电子围栏设置", "异常行为检测", "紧急制动功能", "飞行日志审计"],
  },
  {
    icon: Settings,
    name: "维护管理系统",
    description: "设备维护管理软件，实现预防性维护，延长设备使用寿命。",
    features: ["维护计划提醒", "零部件寿命管理", "故障诊断分析", "维护记录追溯"],
  },
  {
    icon: Database,
    name: "数据处理系统",
    description: "专业的数据处理软件，对采集的图像、点云等数据进行处理分析。",
    features: ["正射影像生成", "三维模型重建", "数据测量分析", "报告自动生成"],
  },
];

const Software = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="软件系统"
        description="长凌电子无人机软件系统，包括地面站控制系统、航线规划系统、云平台管理系统、数据处理系统等专业软件解决方案。"
        keywords="无人机软件,地面站系统,航线规划,云平台管理,无人机数据处理,飞控软件"
        url="/software"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[300px] md:h-[400px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                软件系统
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90">
                完整的无人机软件生态，从地面站到云平台，全方位支撑无人机作业
              </p>
            </div>
          </div>
        </section>

        {/* Systems Grid */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">软件产品</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                长凌电子自主研发的软件系统，覆盖无人机作业全流程
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {systems.map((system, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all"
                >
                  <system.icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-bold text-card-foreground mb-3">
                    {system.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {system.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {system.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    了解更多
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">系统集成</h2>
                <p className="text-muted-foreground mb-4">
                  长凌电子软件系统采用模块化设计，支持灵活组合和定制开发，可与客户现有系统无缝集成。
                </p>
                <p className="text-muted-foreground mb-6">
                  我们提供开放的API接口和SDK，方便二次开发和系统对接，满足不同客户的个性化需求。
                </p>
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground">
                  获取技术文档
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                  alt="软件系统"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Software;
