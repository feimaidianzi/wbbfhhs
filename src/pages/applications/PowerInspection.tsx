import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, Eye, Shield, Clock, BarChart, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const galleryImages = [
  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80",
  "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&q=80",
  "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=400&q=80",
  "https://images.unsplash.com/photo-1548613053-22087dd8edb8?w=400&q=80",
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&q=80",
  "https://images.unsplash.com/photo-1413882353314-73f4f25de9f7?w=400&q=80",
];

const advantages = [
  {
    icon: Clock,
    title: "高效作业",
    description: "单次飞行可巡检数十公里线路，效率提升10倍以上"
  },
  {
    icon: Eye,
    title: "精准检测",
    description: "搭载高清相机与红外热成像，缺陷无处遁形"
  },
  {
    icon: Cpu,
    title: "智能识别",
    description: "AI算法自动识别20+种缺陷类型，准确率超95%"
  },
  {
    icon: Shield,
    title: "安全可靠",
    description: "替代人工高空作业，保障巡检人员人身安全"
  },
  {
    icon: BarChart,
    title: "数据管理",
    description: "巡检数据云端存储，支持历史对比分析"
  },
  {
    icon: Zap,
    title: "快速响应",
    description: "故障快速定位，缩短抢修时间，减少停电损失"
  }
];

const applications = [
  {
    title: "输电线路巡检",
    description: "对高压输电线路进行定期巡视，AI智能识别导线损伤、杆塔异常、绝缘子破损等缺陷",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
    href: "/applications/power-inspection/transmission-line",
    features: ["导线断股检测", "绝缘子破损识别", "杆塔倾斜监测", "通道隐患排查"]
  },
  {
    title: "变电站巡检",
    description: "对变电站设备进行红外测温和可见光巡检，及时发现设备过热隐患",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    href: "/applications/power-inspection/substation",
    features: ["红外测温检测", "设备外观检查", "渗漏油检测", "表计读数识别"]
  },
  {
    title: "光伏电站检测",
    description: "利用红外热成像快速检测光伏组件热斑、隐裂等故障",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
    href: "/applications/power-inspection/solar-panel",
    features: ["热斑故障检测", "组件隐裂排查", "积灰遮挡检测", "发电效率评估"]
  }
];

const stats = [
  { value: "10倍+", label: "效率提升" },
  { value: "95%+", label: "识别准确率" },
  { value: "50km", label: "单日巡检里程" },
  { value: "24h", label: "全天候作业" }
];

const PowerInspection = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="电力巡检"
        description="长凌电子无人机电力巡检解决方案，提供输电线路巡检、变电站巡检、光伏电站检测等专业服务，效率提升10倍以上。"
        keywords="电力巡检无人机,输电线路巡检,变电站巡检,光伏电站检测,红外热成像,AI智能识别"
        url="/applications/power-inspection"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[350px] md:h-[450px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                电力巡检
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
                无人机智能巡检技术，为电力行业提供安全、高效、精准的巡检解决方案
              </p>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-accent py-8">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">行业背景</h2>
              <div className="space-y-6 text-foreground/80 leading-relaxed">
                <p>
                  电力巡检是指通过对电力设施（如变电站、电力线路、发电设备等）的定期检查与维护，确保电力系统的安全、稳定运行。随着电力设施的规模和复杂性不断增加，传统的人工巡检方式面临效率和安全性等方面的挑战。
                </p>
                <p>
                  无人机在电力巡检中的应用，尤其是电力巡线方面，已经成为一种重要的技术手段。通过搭载高清相机、红外热成像仪等专业设备，无人机可以快速、安全地完成大范围电力设施的巡检任务，及时发现潜在故障隐患，保障电网安全稳定运行。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">应用案例展示</h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              长凌电子无人机已在全国多个省市电力公司成功应用，积累了丰富的实战经验
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div 
                  key={index} 
                  className="aspect-[4/3] rounded-xl overflow-hidden shadow-md group cursor-pointer"
                >
                  <img
                    src={image}
                    alt={`电力巡检案例 ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">核心优势</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              长凌电子无人机电力巡检解决方案，助力电力行业数字化转型升级
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advantages.map((item, index) => (
                <div key={index} className="bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-shadow">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Scenarios */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">应用场景</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              点击查看详细解决方案，了解更多技术细节和应用案例
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {applications.map((app, index) => (
                <Link
                  key={index}
                  to={app.href}
                  className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all hover:-translate-y-2"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={app.image}
                      alt={app.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-accent transition-colors">
                      {app.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{app.description}</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {app.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs text-muted-foreground">
                          <CheckCircle className="w-3 h-3 text-accent mr-1 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center text-accent font-medium group-hover:translate-x-2 transition-transform">
                      查看详情
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Link>
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
              长凌电子为您提供专业的电力巡检无人机解决方案，助力电网安全稳定运行
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-10 py-6 text-lg">
                  立即咨询
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/applications">
                <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-10 py-6 text-lg">
                  查看更多应用
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default PowerInspection;