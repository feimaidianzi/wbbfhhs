import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Truck, Clock, MapPin, Zap, Shield, Target, TrendingUp, Globe, Mountain, Building, Anchor, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

// 导入AI生成的配图
import heroLogistics from "@/assets/logistics/hero-logistics.jpg";
import droneHeavyLift from "@/assets/logistics/drone-heavy-lift.jpg";
import emergencyDelivery from "@/assets/logistics/emergency-delivery.jpg";
import remoteDelivery from "@/assets/logistics/remote-delivery.jpg";
import urbanDelivery from "@/assets/logistics/urban-delivery.jpg";
import islandDelivery from "@/assets/logistics/island-delivery.jpg";

// 核心优势
const advantages = [
  {
    icon: Package,
    title: "大载重能力",
    description: "最大载重可达30KG，满足各类物资运输需求",
    value: "30KG"
  },
  {
    icon: Clock,
    title: "快速响应",
    description: "无视地形限制，直线飞行，配送效率大幅提升",
    value: "3倍效率"
  },
  {
    icon: MapPin,
    title: "精准投放",
    description: "厘米级定位精度，实现精准定点投放",
    value: "厘米级"
  },
  {
    icon: Globe,
    title: "全地形覆盖",
    description: "跨越山川河流，到达传统物流难以企及的区域",
    value: "全地形"
  }
];

// 应用场景
const scenarios = [
  {
    title: "偏远山区配送",
    description: "为交通不便的山区、林区提供快速物资配送服务，解决最后一公里难题",
    image: remoteDelivery,
    icon: Mountain,
    features: ["山区配送", "林区物资", "农村快递"]
  },
  {
    title: "海岛物资运输",
    description: "跨越海洋为海岛居民配送生活必需品和紧急物资，突破地理限制",
    image: islandDelivery,
    icon: Anchor,
    features: ["海岛配送", "跨海运输", "渔村物资"]
  },
  {
    title: "应急物资投送",
    description: "灾害救援场景下快速投送急需物资和医疗用品，争分夺秒",
    image: emergencyDelivery,
    icon: Shield,
    features: ["医疗物资", "救灾物品", "应急响应"]
  },
  {
    title: "城市末端配送",
    description: "解决城市配送最后一公里难题，提升用户体验和配送效率",
    image: urbanDelivery,
    icon: Building,
    features: ["快递配送", "即时物流", "生鲜配送"]
  }
];

// 物流无人机特点
const droneFeatures = [
  {
    title: "高效配送",
    description: "无人机物流绕过传统地面交通，直线飞行大大缩短配送时间",
    icon: Zap
  },
  {
    title: "降低成本",
    description: "减少人工和燃油成本，特别适合偏远地区配送",
    icon: TrendingUp
  },
  {
    title: "环保低碳",
    description: "电动驱动，零排放，符合绿色物流发展趋势",
    icon: Target
  },
  {
    title: "安全可靠",
    description: "多重冗余设计，智能避障系统，确保飞行安全",
    icon: Shield
  }
];

// 产品系列
const productSeries = [
  {
    model: "WL-10",
    payload: "10KG",
    range: "15km",
    description: "轻量级物流配送无人机，适合短途快递配送",
    link: "/products/logistics/wl-10"
  },
  {
    model: "WL-20",
    payload: "20KG",
    range: "25km",
    description: "中型物流无人机，满足多场景配送需求",
    link: "/products/logistics/wl-20"
  },
  {
    model: "WL-30",
    payload: "30KG",
    range: "35km",
    description: "大载重物流无人机，适合应急物资投送",
    link: "/products/logistics/wl-30"
  }
];

const LogisticsApp = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="物流应用 - 无人机物流配送解决方案"
        description="长凌电子物流无人机解决方案，提供偏远地区配送、海岛物资运输、应急物资投送、城市末端配送等专业服务，最大载重30KG。"
        keywords="物流无人机,无人机配送,应急物资投送,末端配送,大载重无人机,海岛配送"
        url="/applications/logistics"
      />
      <Header />
      <FloatingContact />

      <main>
        {/* Hero Section */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroLogistics})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
          </div>
          <div className="container-custom relative z-10 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                物流配送解决方案
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
                物流无人机是专门用于运输和递送物品的无人机系统，通常用于在短途配送或难以到达的地区进行货物运输。
                随着技术的不断发展，物流无人机在提高配送效率、降低成本、减少人工干预等方面展现出巨大潜力。
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products/logistics">
                  <Button size="lg" variant="secondary" className="group">
                    查看产品
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                    联系我们
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                无人机物流配送概述
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                物流无人机正在改变传统物流行业，为偏远地区、应急配送等场景提供全新解决方案
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                  <img 
                    src={droneHeavyLift} 
                    alt="物流无人机" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">重新定义物流配送</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  传统物流受制于地形、交通等因素，在偏远地区和紧急情况下往往力不从心。
                  无人机物流配送技术的出现，打破了这些限制，让快速、精准的配送成为可能。
                </p>
                <div className="space-y-4">
                  {[
                    "突破地形限制，直达目的地",
                    "大幅缩短配送时间，提升效率",
                    "降低人工和运输成本",
                    "环保低碳，符合可持续发展理念"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-20 bg-muted">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                核心优势
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                无人机物流配送相比传统方式具有显著优势
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((item, index) => (
                <div key={index} className="bg-card p-8 rounded-xl shadow-card hover:shadow-card-hover transition-all group text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{item.value}</div>
                  <h3 className="text-lg font-bold text-card-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                物流无人机特点
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                先进的技术为物流行业带来革命性变革
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {droneFeatures.map((feature, index) => (
                <div key={index} className="bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all border-t-4 border-primary">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scenarios Section */}
        <section className="py-20 bg-muted">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                应用场景
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                物流无人机在多种场景下发挥重要作用，解决传统物流难以覆盖的配送需求
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {scenarios.map((scenario, index) => (
                <div key={index} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={scenario.image}
                      alt={scenario.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <scenario.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-card-foreground">{scenario.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{scenario.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {scenario.features.map((feature, i) => (
                        <span key={i} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Series Section */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                产品系列
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                根据不同配送需求，我们提供多款物流无人机产品
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {productSeries.map((product, index) => (
                <div key={index} className="bg-card rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all group">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Truck className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-card-foreground">{product.model}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-primary">{product.payload}</div>
                      <div className="text-xs text-muted-foreground">最大载重</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-primary">{product.range}</div>
                      <div className="text-xs text-muted-foreground">配送半径</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm text-center mb-6">{product.description}</p>
                  <Link to={product.link}>
                    <Button variant="outline" className="w-full group">
                      了解详情
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              开启智能物流配送
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              立即联系我们，了解如何利用无人机技术提升您的物流配送效率
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="group">
                  联系我们
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/products/logistics">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  查看产品
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LogisticsApp;
