import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings, Users, Lightbulb, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const solutions = [
  {
    icon: Settings,
    title: "整体解决方案",
    description: "从需求分析、方案设计、设备选型到系统集成，提供端到端的完整解决方案",
    features: ["需求调研分析", "方案规划设计", "设备选型配置", "系统集成交付"]
  },
  {
    icon: Users,
    title: "培训服务",
    description: "专业的操作培训和技术培训，确保用户能够熟练使用无人机系统",
    features: ["理论知识培训", "实操飞行训练", "维护保养培训", "应用场景实训"]
  },
  {
    icon: Wrench,
    title: "售后服务",
    description: "完善的售后服务体系，提供设备维护、技术支持和升级服务",
    features: ["7×24小时响应", "远程技术支持", "现场维护服务", "设备升级服务"]
  },
  {
    icon: Lightbulb,
    title: "定制开发",
    description: "根据客户特殊需求进行软硬件定制开发，满足个性化应用场景",
    features: ["硬件定制开发", "软件功能定制", "挂载设备定制", "系统功能扩展"]
  }
];

const industries = [
  {
    title: "电力能源",
    description: "输电线路巡检、变电站巡检、光伏电站检测等电力行业应用",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80"
  },
  {
    title: "公共安全",
    description: "警用安防、消防应急、边境巡逻等公共安全领域应用",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80"
  },
  {
    title: "环境保护",
    description: "大气监测、水环境监测、生态调查等环境保护领域应用",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80"
  },
  {
    title: "智慧物流",
    description: "偏远配送、应急投送、末端配送等物流运输领域应用",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80"
  }
];

const Solutions = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="解决方案"
        description="飞迈科技提供完整的无人机行业解决方案，包括方案设计、设备集成、培训服务和售后支持。"
        keywords="无人机解决方案,行业应用方案,定制开发,培训服务,售后支持"
        url="/applications/solutions"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                解决方案
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                从需求到落地，为您提供完整的无人机行业应用解决方案
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

        {/* Solutions Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              服务体系
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solutions.map((solution, index) => (
                <div key={index} className="bg-card rounded-xl p-8 shadow-card">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <solution.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-card-foreground mb-2">{solution.title}</h3>
                      <p className="text-muted-foreground text-sm">{solution.description}</p>
                    </div>
                  </div>
                  <ul className="grid grid-cols-2 gap-2 mt-4">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              行业覆盖
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((industry, index) => (
                <div key={index} className="bg-card rounded-xl overflow-hidden shadow-card">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={industry.image}
                      alt={industry.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-card-foreground mb-2">{industry.title}</h3>
                    <p className="text-muted-foreground text-sm">{industry.description}</p>
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
              获取专属解决方案
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              飞迈科技拥有丰富的行业经验，可根据您的具体需求提供定制化解决方案
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

export default Solutions;