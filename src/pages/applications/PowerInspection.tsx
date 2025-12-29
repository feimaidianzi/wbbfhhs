import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Eye, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const features = [
  {
    icon: Eye,
    title: "高清巡检",
    description: "搭载高清摄像头和红外热成像设备，精准发现输电线路故障隐患"
  },
  {
    icon: Zap,
    title: "智能诊断",
    description: "AI智能识别算法，自动检测绝缘子破损、导线断股等缺陷"
  },
  {
    icon: Shield,
    title: "安全作业",
    description: "替代人工高空作业，有效降低巡检人员安全风险"
  },
  {
    icon: Clock,
    title: "高效覆盖",
    description: "单次飞行可完成数十公里线路巡检，效率提升10倍以上"
  }
];

const scenarios = [
  {
    title: "输电线路巡检",
    description: "对高压输电线路进行定期巡视检查，发现导线损伤、杆塔异常等问题",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80"
  },
  {
    title: "变电站巡检",
    description: "对变电站设备进行红外测温和可见光巡检，及时发现过热隐患",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
  },
  {
    title: "光伏电站检测",
    description: "利用红外热成像技术快速检测光伏组件热斑故障",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80"
  }
];

const PowerInspection = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="电力巡检应用"
        description="长凌电子无人机电力巡检解决方案，提供输电线路巡检、变电站巡检、光伏电站检测等专业服务。"
        keywords="电力巡检无人机,输电线路巡检,变电站巡检,光伏电站检测,红外热成像"
        url="/applications/power-inspection"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                电力巡检应用
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                无人机智能巡检技术，为电力行业提供安全高效的巡检解决方案
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  咨询方案
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              核心优势
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6 bg-card rounded-xl shadow-card">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scenarios Section */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              应用场景
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {scenarios.map((scenario, index) => (
                <div key={index} className="bg-card rounded-xl overflow-hidden shadow-card">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={scenario.image}
                      alt={scenario.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-card-foreground mb-2">{scenario.title}</h3>
                    <p className="text-muted-foreground text-sm">{scenario.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              获取电力巡检解决方案
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              长凌电子为您提供专业的电力巡检无人机解决方案，助力电网安全运行
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                立即咨询
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default PowerInspection;