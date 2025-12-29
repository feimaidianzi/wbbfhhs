import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const applications = [
  {
    name: "水利",
    description: "为积极践行水利改革发展总基调，应用无人机技术进行河道巡检、水库监测、防汛抗旱等工作。",
    image: "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?w=600&q=80",
    href: "/applications/water",
  },
  {
    name: "交通",
    description: "通过无人机系统提高道路交通运输行业运行监测能力，实现交通流量监控、事故快速响应。",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80",
    href: "/applications/traffic",
  },
  {
    name: "环保",
    description: "无人机遥感系统具有成本低、安全性高、机动性强的特点，广泛应用于环境监测和污染源排查。",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    href: "/applications/environment",
  },
  {
    name: "智慧城市",
    description: "数字地球和智能地球时代，无人机在城市管理、规划测绘、应急指挥等方面发挥重要作用。",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80",
    href: "/applications/smart-city",
  },
  {
    name: "应急",
    description: "在人员密集、场景复杂的安全监控领域，无人机为应急救援提供空中视角和通信中继支持。",
    image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=600&q=80",
    href: "/applications/emergency",
  },
  {
    name: "5G联网",
    description: "5G联网无人机通过5G蜂窝网络实现远程控制和数据传输，拓展无人机应用边界。",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    href: "/applications/5g",
  },
  {
    name: "警用",
    description: "警用无人机空中平台搭载多种传感器，用于治安巡逻、大型活动安保、案件侦查等场景。",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80",
    href: "/applications/police",
  },
  {
    name: "测绘",
    description: "垂直起降无人机适合高效率、高精度、大面积航测项目，广泛应用于国土测绘和工程测量。",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    href: "/applications/surveying",
  },
  {
    name: "电力",
    description: "电力工业应用无人机进行输电线路巡检、故障排查、架线作业等，大幅提升作业效率和安全性。",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
    href: "/applications/power",
  },
];

const Applications = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[300px] md:h-[400px] overflow-hidden">
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
                行业应用
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90">
                长凌无人机广泛应用于多个行业领域，提供专业化解决方案
              </p>
            </div>
          </div>
        </section>

        {/* Applications Grid */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {applications.map((app, index) => (
                <div
                  key={index}
                  className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={app.image}
                      alt={app.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-accent transition-colors">
                      {app.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {app.description}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    >
                      了解详情
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
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
              定制您的行业解决方案
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              长凌电子拥有丰富的行业经验，可根据您的具体需求提供定制化解决方案
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

export default Applications;
