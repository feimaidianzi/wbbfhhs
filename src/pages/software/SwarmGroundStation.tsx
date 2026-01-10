import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Users, Cpu, Network, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const SwarmGroundStation = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const features = [
    { icon: Users, title: isEn ? "Swarm Control" : "集群控制", description: isEn ? "Support 100+ drones simultaneous formation control" : "支持100+无人机同时编队控制" },
    { icon: Cpu, title: isEn ? "Smart Coordination" : "智能协同", description: isEn ? "Auto obstacle avoidance and formation keeping" : "自动避障与队形保持算法" },
    { icon: Network, title: isEn ? "Mesh Network" : "组网通信", description: isEn ? "Self-organizing reliable communication link" : "自组网高可靠通信链路" },
    { icon: Zap, title: isEn ? "Real-time Sync" : "实时同步", description: isEn ? "Millisecond-level synchronized control" : "毫秒级同步控制指令" },
  ];

  const capabilities = isEn 
    ? [
        "Large-scale swarm control",
        "Multiple formation patterns",
        "Dynamic formation changes",
        "Coordinated lighting control",
        "Choreography animation design",
        "Mission route planning",
      ]
    : [
        "大规模集群控制",
        "多种编队队形",
        "动态队形变换",
        "灯光协同控制",
        "编舞动画设计",
        "任务航迹规划",
      ];

  return (
    <div className="min-h-screen">
      <SEO
        title={isEn ? "Swarm Drone Ground Station Software" : "集群无人机地面站软件"}
        description={isEn 
          ? "CANI swarm drone ground station software, supporting 100+ drone formation control and performances."
          : "长凌科技集群无人机地面站软件，支持百架级无人机编队控制与表演。"}
        keywords={isEn 
          ? "swarm control,drone formation,ground station software,drone show control"
          : "集群控制,无人机编队,地面站软件,无人机表演控制"}
        url="/software/swarm-ground-station"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {isEn ? "Swarm Drone Ground Station" : "集群无人机地面站软件"}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                {isEn ? "100+ drone swarm control for stunning visual performances" : "百架级无人机集群控制，打造震撼视觉盛宴"}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {isEn ? "Learn More" : "了解更多"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{isEn ? "Software Features" : "软件功能"}</h2>
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

        {/* Capabilities */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80"
                  alt={isEn ? "Swarm Control" : "集群控制"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">{isEn ? "Core Capabilities" : "核心能力"}</h2>
                <p className="text-muted-foreground mb-6">
                  {isEn 
                    ? "Designed for large-scale drone swarm formations, supporting complex choreography animations and real-time control."
                    : "专为大规模无人机集群编队设计，支持复杂编舞动画与实时控制。"}
                </p>
                <ul className="space-y-4">
                  {capabilities.map((cap, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {isEn ? "Enter the New Era of Swarm Control" : "开启集群控制新时代"}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {isEn ? "Contact us for swarm control solutions" : "联系我们了解集群控制解决方案"}
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                {isEn ? "Contact Us" : "立即咨询"}
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

export default SwarmGroundStation;
