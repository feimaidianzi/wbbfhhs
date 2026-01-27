import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plane, Building, Truck, Camera, Globe, TrendingUp } from "lucide-react";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";

const sectors = [
  {
    icon: Truck,
    title: "无人机物流",
    description: "城市配送、偏远投送、医疗急救物资运输等低空物流应用场景",
  },
  {
    icon: Camera,
    title: "低空旅游",
    description: "空中观光、航拍体验、景区巡游等低空旅游新业态",
  },
  {
    icon: Building,
    title: "城市空中交通",
    description: "eVTOL载人飞行器、城市空中出行解决方案",
  },
  {
    icon: Plane,
    title: "通用航空",
    description: "农林作业、航空测绘、应急救援等通用航空服务",
  },
  {
    icon: Globe,
    title: "空域管理",
    description: "低空空域管理系统、无人机监管平台建设",
  },
  {
    icon: TrendingUp,
    title: "产业服务",
    description: "无人机培训、运营服务、数据服务等产业配套",
  },
];

const stats = [
  { value: "1.5万亿", label: "2025年市场规模预测" },
  { value: "30%", label: "年均增长率" },
  { value: "100+", label: "试点城市" },
  { value: "50+", label: "政策支持文件" },
];

const LowAltitude = () => {
  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title="低空经济"
        description="探索低空经济新机遇，飞迈科技提供无人机物流、低空旅游、城市空中交通、空域管理等解决方案。"
        keywords="低空经济,无人机物流,低空旅游,城市空中交通,空域管理,eVTOL"
        path="/low-altitude"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                低空经济
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                把握低空经济发展机遇，共创万亿蓝海市场
              </p>
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                合作咨询
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-accent">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent-foreground mb-1">{stat.value}</div>
                  <div className="text-accent-foreground/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">什么是低空经济？</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                低空经济是指以低空空域（通常指1000米以下）为依托，以各类有人驾驶和无人驾驶航空器的低空飞行活动为牵引，辐射带动相关领域融合发展的综合性经济形态。
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                作为战略性新兴产业，低空经济涵盖无人机、eVTOL、直升机等航空器研发制造，以及物流配送、城市空中交通、低空旅游、农林作业等多种应用场景。
              </p>
            </div>
          </div>
        </section>

        {/* Sectors */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">产业布局</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sectors.map((sector, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all"
                >
                  <sector.icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-bold text-card-foreground mb-3">
                    {sector.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {sector.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Role */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&q=80"
                  alt="低空经济"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">飞迈的角色</h2>
                <p className="text-muted-foreground mb-4">
                  作为工业无人机领域的领先企业，飞迈科技深度参与低空经济发展，在无人机物流、城市空中交通、低空监管等多个领域积极布局。
                </p>
                <p className="text-muted-foreground mb-4">
                  我们与政府、企业合作，参与低空经济试点项目，为低空产业发展提供技术支撑和解决方案。
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-foreground">参与多个城市低空经济试点项目</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-foreground">提供无人机物流整体解决方案</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-foreground">参与低空空域管理标准制定</span>
                  </li>
                </ul>
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground">
                  了解合作机会
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
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

export default LowAltitude;
