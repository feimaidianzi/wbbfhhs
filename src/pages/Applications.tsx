import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const applications = [
  {
    name: "电力巡检",
    description: "无人机智能巡检技术，为电力行业提供安全高效的输电线路巡检、变电站巡检、光伏电站检测解决方案。",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
    href: "/applications/power-inspection",
  },
  {
    name: "物流应用",
    description: "无人机物流配送技术，打破传统物流边界，实现偏远地区配送、应急物资投送、城市末端配送。",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
    href: "/applications/logistics",
  },
  {
    name: "军事应用",
    description: "专业军用无人机系统，提供侦察监视、通信中继、目标定位等军事应用服务。",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80",
    href: "/applications/military",
  },
  {
    name: "环保应用",
    description: "无人机环境监测技术，守护绿水青山，提供大气监测、水环境监测、生态调查服务。",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    href: "/applications/environment",
  },
  {
    name: "消防应急",
    description: "无人机消防应急技术，为生命安全保驾护航，提供火情侦察、通信保障、灭火投弹服务。",
    image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=600&q=80",
    href: "/applications/firefighting",
  },
  {
    name: "系留应用",
    description: "系留无人机空中平台，24小时不间断持续作业，提供应急通信、安保监控、边境监视服务。",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    href: "/applications/tethered",
  },
  {
    name: "解决方案",
    description: "从需求到落地，为您提供完整的无人机行业应用解决方案，包括方案设计、设备集成、培训服务和售后支持。",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    href: "/applications/solutions",
  },
];

const Applications = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="行业应用"
        description="长凌电子无人机行业应用解决方案，覆盖电力巡检、物流配送、军事应用、环保监测、消防应急、系留应用等多个领域。"
        keywords="无人机行业应用,电力巡检,物流无人机,军事无人机,环保监测,消防应急,系留无人机"
        url="/applications"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[300px] md:h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80)" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">行业应用</h1>
              <p className="text-lg md:text-xl text-primary-foreground/90">长凌无人机广泛应用于多个行业领域，提供专业化解决方案</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {applications.map((app, index) => (
                <Link key={index} to={app.href} className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1">
                  <div className="aspect-video overflow-hidden">
                    <img src={app.image} alt={app.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-accent transition-colors">{app.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{app.description}</p>
                    <div className="flex items-center text-accent font-medium group-hover:translate-x-1 transition-transform">
                      了解详情
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">定制您的行业解决方案</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">长凌电子拥有丰富的行业经验，可根据您的具体需求提供定制化解决方案</p>
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

export default Applications;