import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const galleryImages = [
  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80",
  "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&q=80",
  "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=400&q=80",
  "https://images.unsplash.com/photo-1548613053-22087dd8edb8?w=400&q=80",
];

const scenarios = [
  {
    title: "输电线路巡检",
    description: "对高压输电线路进行定期巡视检查，AI智能识别导线损伤、杆塔异常、绝缘子破损等20+种缺陷",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
    href: "/applications/power-inspection/transmission-line"
  },
  {
    title: "变电站巡检",
    description: "对变电站设备进行红外测温和可见光巡检，精准检测设备过热隐患，单站巡检时间缩短至30分钟",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    href: "/applications/power-inspection/substation"
  },
  {
    title: "光伏电站检测",
    description: "利用红外热成像技术快速检测光伏组件热斑、隐裂、PID等故障，单日可检测5MW以上电站",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
    href: "/applications/power-inspection/solar-panel"
  }
];

const PowerInspection = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="电力巡检"
        description="长凌电子无人机电力巡检解决方案，提供输电线路巡检、变电站巡检、光伏电站检测等专业服务。"
        keywords="电力巡检无人机,输电线路巡检,变电站巡检,光伏电站检测,红外热成像"
        url="/applications/power-inspection"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[300px] md:h-[400px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                电力巡检
              </h1>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-custom">
            <article className="max-w-4xl mx-auto">
              {/* Introduction */}
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-lg text-foreground leading-relaxed mb-6">
                  电力巡检是指通过对电力设施（如变电站、电力线路、发电设备等）的定期检查与维护，确保电力系统的安全、稳定运行。随着电力设施的规模和复杂性不断增加，传统的人工巡检方式面临效率和安全性等方面的挑战，而无人机在电力巡检中的应用，尤其是电力巡线方面，已经成为一种重要的技术手段。
                </p>
                <p className="text-lg text-foreground leading-relaxed mb-6">
                  长凌电子无人机电力巡检解决方案，采用先进的多旋翼无人机平台，搭载高清可见光相机和红外热成像仪，可实现对输电线路、变电站、光伏电站等电力设施的智能化巡检。通过AI智能识别算法，可自动检测绝缘子破损、导线断股、金具锈蚀、设备过热等多种缺陷类型，大幅提升巡检效率和安全性。
                </p>
              </div>

              {/* Image Gallery */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">应用案例</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryImages.map((image, index) => (
                    <div key={index} className="aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                      <img
                        src={image}
                        alt={`电力巡检案例 ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">核心优势</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card p-6 rounded-xl shadow-card">
                    <h3 className="text-lg font-bold text-card-foreground mb-2">高效巡检</h3>
                    <p className="text-muted-foreground text-sm">
                      单次飞行可完成数十公里线路巡检，效率较人工巡检提升10倍以上，大幅降低运维成本。
                    </p>
                  </div>
                  <div className="bg-card p-6 rounded-xl shadow-card">
                    <h3 className="text-lg font-bold text-card-foreground mb-2">智能识别</h3>
                    <p className="text-muted-foreground text-sm">
                      AI深度学习算法自动识别20+种缺陷类型，缺陷识别准确率超过95%，减少人工判读工作量。
                    </p>
                  </div>
                  <div className="bg-card p-6 rounded-xl shadow-card">
                    <h3 className="text-lg font-bold text-card-foreground mb-2">安全可靠</h3>
                    <p className="text-muted-foreground text-sm">
                      替代人工高空作业，有效降低巡检人员安全风险，配备多重冗余设计确保飞行安全。
                    </p>
                  </div>
                  <div className="bg-card p-6 rounded-xl shadow-card">
                    <h3 className="text-lg font-bold text-card-foreground mb-2">数据管理</h3>
                    <p className="text-muted-foreground text-sm">
                      巡检数据自动上传云端，支持历史数据对比分析，生成专业巡检报告，实现数字化管理。
                    </p>
                  </div>
                </div>
              </div>

              {/* Application Scenarios */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">应用场景</h2>
                <p className="text-muted-foreground mb-6">点击查看详细解决方案</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {scenarios.map((scenario, index) => (
                    <Link
                      key={index}
                      to={scenario.href}
                      className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={scenario.image}
                          alt={scenario.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                          {scenario.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{scenario.description}</p>
                        <div className="flex items-center text-accent font-medium text-sm group-hover:translate-x-1 transition-transform">
                          查看详情
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-primary">
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