import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Eye, BarChart, CloudRain } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const features = [
  {
    icon: Eye,
    title: "全域监测",
    description: "对大气、水体、土壤等环境要素进行全方位监测"
  },
  {
    icon: BarChart,
    title: "数据分析",
    description: "智能数据处理分析，生成专业环境监测报告"
  },
  {
    icon: Leaf,
    title: "生态保护",
    description: "森林草原监测、野生动物保护、生态修复评估"
  },
  {
    icon: CloudRain,
    title: "污染溯源",
    description: "快速定位污染源头，追踪污染物扩散路径"
  }
];

const scenarios = [
  {
    title: "大气环境监测",
    description: "搭载气体传感器监测PM2.5、SO2、NOx等大气污染物浓度分布",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80"
  },
  {
    title: "水环境监测",
    description: "对河流、湖泊水质进行监测，发现排污口和水体污染",
    image: "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?w=600&q=80"
  },
  {
    title: "生态环境调查",
    description: "森林资源调查、湿地监测、生物多样性评估等生态应用",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
  }
];

const EnvironmentApp = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="环保应用"
        description="长凌电子环保无人机解决方案，提供大气监测、水环境监测、生态调查等专业环保服务。"
        keywords="环保无人机,大气监测,水环境监测,生态调查,污染溯源"
        url="/applications/environment"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                环保应用
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                无人机环境监测技术，守护绿水青山，助力生态文明建设
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
              获取环保监测解决方案
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              长凌电子为您提供专业的环保无人机解决方案，助力环境保护事业
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

export default EnvironmentApp;