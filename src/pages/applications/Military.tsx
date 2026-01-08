import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Eye, Radio, Target, Radar, Cpu, Plane, Lock, Zap, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Military = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const features = [
    {
      icon: Eye,
      title: isEn ? "Reconnaissance" : "侦察监视",
      description: isEn 
        ? "24/7 HD surveillance with electro-optical/infrared fusion, real-time battlefield awareness, multi-target tracking" 
        : "全天候高清侦察监视，光电/红外双光融合，提供实时战场态势感知，支持多目标跟踪识别"
    },
    {
      icon: Radio,
      title: isEn ? "Communication Relay" : "通信中继",
      description: isEn 
        ? "Aerial communication relay platform, extending tactical communication range, supporting multi-band forwarding" 
        : "空中通信中继平台，延伸战术通信覆盖范围，支持多频段多制式通信转发"
    },
    {
      icon: Target,
      title: isEn ? "Target Positioning" : "目标定位",
      description: isEn 
        ? "Precise target identification and positioning with millimeter accuracy, supporting coordinated combat decisions" 
        : "精确目标识别与定位，毫米级定位精度，支持协同作战决策与火力引导"
    },
    {
      icon: Shield,
      title: isEn ? "High Stealth" : "隐蔽性强",
      description: isEn 
        ? "Low noise, low detectability design with composite materials, small radar cross-section, hard to detect" 
        : "低噪音低可探测设计，复合材料机身，雷达散射截面小，不易被发现"
    },
    {
      icon: Radar,
      title: isEn ? "Electronic Warfare" : "电子对抗",
      description: isEn 
        ? "Electronic jamming and countermeasures, supporting signal detection and jamming suppression missions" 
        : "电子干扰与反制能力，支持信号侦测、干扰压制等电子战任务"
    },
    {
      icon: Cpu,
      title: isEn ? "Autonomous Decision" : "自主决策",
      description: isEn 
        ? "Edge AI computing platform supporting automatic target recognition, route planning, and threat assessment" 
        : "边缘AI计算平台，支持目标自动识别、航迹规划、威胁评估等自主决策"
    }
  ];

  const scenarios = [
    {
      title: isEn ? "Border Patrol" : "边境巡逻",
      description: isEn 
        ? "Daily patrol and surveillance missions in border areas, timely detection of anomalies. 24/7 continuous monitoring, coordinating with ground forces for rapid response." 
        : "执行边境地区日常巡逻监视任务，及时发现异常情况。全天候持续监视，配合地面部队快速响应边境事件。",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80",
      capabilities: isEn ? ["24/7 Monitoring", "Real-time Alert", "Rapid Response"] : ["全天候监视", "实时报警", "快速响应"]
    },
    {
      title: isEn ? "Battlefield Reconnaissance" : "战场侦察",
      description: isEn 
        ? "Penetrating combat zones for intelligence gathering on enemy deployments. Covert infiltration behind enemy lines, providing precise intelligence support for command." 
        : "深入作战区域进行情报侦察，获取敌方部署信息。隐蔽渗透敌后，为作战指挥提供精确情报支持。",
      image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
      capabilities: isEn ? ["Covert Recon", "Intelligence", "Situational Awareness"] : ["隐蔽侦察", "情报获取", "态势感知"]
    },
    {
      title: isEn ? "Training Exercises" : "训练演习",
      description: isEn 
        ? "Simulated combat training and tactical exercises to enhance unit combat readiness. Providing realistic adversary environment for validating tactics." 
        : "模拟对抗训练和战术演习，提升部队实战能力。提供逼真对抗环境，检验战术战法效果。",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      capabilities: isEn ? ["Simulated Combat", "Tactical Validation", "Capability Assessment"] : ["模拟对抗", "战术验证", "能力评估"]
    },
    {
      title: isEn ? "Maritime Surveillance" : "海上监视",
      description: isEn 
        ? "Maritime patrol and surveillance missions, monitoring sea target dynamics. Supporting maritime rescue, fishery enforcement, and maritime control." 
        : "执行海域巡逻监视任务，监测海上目标动态。支持海上搜救、渔政执法、海域管控等任务。",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
      capabilities: isEn ? ["Maritime Monitoring", "Target ID", "Maritime Support"] : ["海域监控", "目标识别", "海事支援"]
    },
    {
      title: isEn ? "Key Facility Protection" : "要地防护",
      description: isEn 
        ? "Airspace monitoring around critical facilities, timely detection of low-altitude threats. Working with ground air defense for integrated protection." 
        : "重要设施和要地周边空域监控，及时发现低空威胁。配合地面防空系统构建立体防护网络。",
      image: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=600&q=80",
      capabilities: isEn ? ["Airspace Control", "Threat Warning", "Coordinated Defense"] : ["空域监控", "威胁预警", "协同防御"]
    },
    {
      title: isEn ? "Emergency Support" : "应急支援",
      description: isEn 
        ? "Emergency support for incidents, rapid deployment for aerial perspective. Supporting counter-terrorism, disaster relief, and special missions." 
        : "突发事件应急支援，快速部署提供空中视角。支持反恐维稳、灾害救援等特殊任务。",
      image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=600&q=80",
      capabilities: isEn ? ["Rapid Deploy", "Scene Awareness", "Command Support"] : ["快速部署", "现场感知", "指挥支援"]
    }
  ];

  const products = [
    {
      name: isEn ? "Reconnaissance-Strike UAV" : "察打一体无人机",
      description: isEn ? "Multi-purpose UAV platform integrating reconnaissance and strike capabilities" : "集侦察、打击于一体的多用途无人机平台",
      specs: isEn ? ["Endurance: 8h", "Payload: 50kg", "Speed: 180km/h"] : ["航时: 8小时", "载荷: 50kg", "速度: 180km/h"],
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80"
    },
    {
      name: isEn ? "Stealth Reconnaissance UAV" : "隐身侦察无人机",
      description: isEn ? "Low-observable design for reconnaissance in sensitive areas" : "低可探测设计，适用于敏感区域侦察任务",
      specs: isEn ? ["RCS: <0.1m²", "Noise: <65dB", "Range: 200km"] : ["RCS: <0.1m²", "噪音: <65dB", "航程: 200km"],
      image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80"
    },
    {
      name: isEn ? "Tactical Relay Platform" : "战术通信中继机",
      description: isEn ? "Aerial communication node extending tactical network coverage" : "空中通信节点，扩展战术通信网络覆盖",
      specs: isEn ? ["Coverage: 100km", "Bands: Multi", "Capacity: High"] : ["覆盖: 100km", "频段: 多频", "容量: 大带宽"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
    },
    {
      name: isEn ? "Swarm Combat System" : "集群作战系统",
      description: isEn ? "Multi-UAV coordinated combat platform supporting swarm tactics" : "多机协同作战平台，支持蜂群战术",
      specs: isEn ? ["Scale: 100+ units", "Network: Self-org", "AI: Enabled"] : ["规模: 100+架", "协同: 自组网", "决策: AI赋能"],
      image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80"
    }
  ];

  const techAdvantages = [
    { icon: Lock, title: isEn ? "Security" : "信息安全", description: isEn ? "Domestically developed, encrypted links, data security guaranteed" : "国产自主可控，通信链路加密，数据安全有保障" },
    { icon: Zap, title: isEn ? "Rapid Deploy" : "快速部署", description: isEn ? "Modular design, deploy within 10 minutes, quick combat readiness" : "模块化设计，10分钟内完成展开，快速形成作战能力" },
    { icon: Map, title: isEn ? "All-terrain" : "复杂环境", description: isEn ? "Adaptable to plateaus, deserts, maritime environments" : "适应高原、沙漠、海洋等复杂环境，全域作战能力" },
    { icon: Plane, title: isEn ? "Long Endurance" : "长航时", description: isEn ? "Efficient propulsion, extended endurance for sustained operations" : "高效动力系统，长航时设计，持续作战能力强" }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={isEn ? "Military Applications" : "军事应用"}
        description={isEn 
          ? "EFUAV military drone solutions for reconnaissance, communication relay, target positioning, and electronic warfare." 
          : "飞迈科技军事无人机解决方案，提供侦察监视、通信中继、目标定位、电子对抗等专业军事应用服务。"}
        keywords={isEn 
          ? "military drone,reconnaissance UAV,communication relay,border patrol,battlefield reconnaissance" 
          : "军事无人机,侦察无人机,通信中继,边境巡逻,战场侦察,电子对抗"}
        url="/applications/military"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <div className="inline-block px-4 py-1 bg-accent/20 rounded-full text-accent text-sm font-medium mb-4">
                {isEn ? "Defense Technology" : "国防科技"}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {isEn ? "Military Solutions" : "军事应用解决方案"}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                {isEn 
                  ? "Professional military UAV systems providing reliable aerial power for defense, enhancing modern combat capabilities" 
                  : "专业军用无人机系统，为国防建设提供可靠的空中力量支撑，助力现代化作战能力提升"}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {isEn ? "Consult Now" : "咨询方案"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {isEn ? "Core Capabilities" : "核心能力"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isEn 
                  ? "EFUAV military drones feature multiple core combat capabilities for diverse modern warfare needs" 
                  : "飞迈科技军用无人机具备多种核心作战能力，满足现代战争多样化需求"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="p-6 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all">
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Advantages */}
        <section className="py-12 bg-accent">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {techAdvantages.map((adv, index) => (
                <div key={index} className="text-center">
                  <adv.icon className="w-10 h-10 text-accent-foreground mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-accent-foreground mb-1">{adv.title}</h4>
                  <p className="text-accent-foreground/80 text-sm">{adv.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scenarios Section */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {isEn ? "Application Scenarios" : "应用场景"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isEn 
                  ? "Suitable for various military scenarios, providing reliable support for combat missions" 
                  : "适用于多种军事应用场景，为各类作战任务提供可靠支持"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {scenarios.map((scenario, index) => (
                <div key={index} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={scenario.image}
                      alt={scenario.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-card-foreground mb-2">{scenario.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{scenario.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {scenario.capabilities.map((cap, i) => (
                        <span key={i} className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {isEn ? "Product Series" : "产品系列"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isEn 
                  ? "Complete military UAV product line for diverse combat requirements" 
                  : "完整的军用无人机产品线，满足不同作战需求"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div key={index} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-card-foreground mb-2">{product.name}</h3>
                    <p className="text-muted-foreground text-xs mb-3">{product.description}</p>
                    <div className="space-y-1">
                      {product.specs.map((spec, i) => (
                        <div key={i} className="text-xs text-muted-foreground">{spec}</div>
                      ))}
                    </div>
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
              {isEn ? "Get Military Solutions" : "获取军事应用解决方案"}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "EFUAV provides professional military UAV solutions for defense modernization" 
                : "飞迈科技为您提供专业的军事无人机解决方案，助力国防现代化建设"}
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

export default Military;
