import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, Wrench, FileText, Users, CheckCircle } from "lucide-react";
import { SEO } from "@/components/SEO";

const services = [
  {
    icon: Lightbulb,
    title: "需求分析",
    description: "深入了解科研需求，提供专业技术咨询和可行性分析",
  },
  {
    icon: FileText,
    title: "方案设计",
    description: "根据科研目标，设计定制化无人机平台和载荷方案",
  },
  {
    icon: Wrench,
    title: "研发制造",
    description: "专业团队进行定制开发，严格质量控制确保产品性能",
  },
  {
    icon: Users,
    title: "技术支持",
    description: "提供全程技术支持、培训指导和售后服务保障",
  },
];

const cases = [
  {
    title: "高校科研平台定制",
    client: "某985高校航空航天学院",
    description: "为飞行控制算法研究定制开发多旋翼实验平台，支持二次开发和算法验证。",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80",
  },
  {
    title: "特种环境无人机",
    client: "某研究院极地研究所",
    description: "定制开发耐低温无人机平台，用于极地环境科考和数据采集。",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
  },
  {
    title: "集群算法验证平台",
    client: "某国防重点实验室",
    description: "开发小型无人机集群平台，用于集群智能算法研究和验证。",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
];

const capabilities = [
  "飞控系统定制开发",
  "动力系统优化设计",
  "机体结构定制",
  "载荷集成开发",
  "地面站软件定制",
  "通信系统定制",
  "自主导航算法",
  "集群控制系统",
];

const CustomResearch = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="科研定制"
        description="长凌电子科研定制服务，为高校、研究院所提供飞控系统、动力系统、机体结构、载荷集成等全方位无人机定制开发服务。"
        keywords="无人机科研定制,飞控系统定制,无人机平台开发,科研无人机,实验平台定制"
        url="/custom-research"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                科研定制
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                为高校、科研院所提供专业的无人机定制开发服务
              </p>
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                咨询定制
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">服务流程</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="text-sm text-accent font-medium mb-2">0{index + 1}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">定制能力</h2>
                <p className="text-muted-foreground mb-6">
                  长凌电子拥有完整的无人机研发团队和生产能力，可根据科研需求进行深度定制开发。
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {capabilities.map((cap, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground text-sm">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"
                  alt="研发能力"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Cases */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">案例展示</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              与多所高校和科研机构建立合作关系，成功交付多个定制项目
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cases.map((item, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-accent font-medium mb-2">{item.client}</div>
                    <h3 className="text-lg font-bold text-card-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
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
              开启您的定制项目
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              无论是基础研究还是应用开发，长凌电子都能为您提供专业的定制服务
            </p>
            <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
              立即咨询
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default CustomResearch;
