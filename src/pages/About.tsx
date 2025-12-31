import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { Target, Users, Award, ArrowRight } from "lucide-react";
import { SEO, createBreadcrumbStructuredData } from "@/components/SEO";

const milestones = [
  { year: "2015", title: "公司成立", description: "晓鸟科技在湖南邵阳正式成立，开启无人机研发之路" },
  { year: "2017", title: "首款产品", description: "成功研发首款工业级多旋翼无人机" },
  { year: "2019", title: "技术突破", description: "系留无人机技术取得重大突破，获得多项专利" },
  { year: "2021", title: "规模扩张", description: "全国服务网络覆盖20+城市，员工超过200人" },
  { year: "2023", title: "行业领先", description: "成为国内领先的工业无人机解决方案提供商" },
  { year: "2024", title: "智能升级", description: "推出新一代智能无人机平台，引领行业发展" },
];

const values = [
  { icon: Target, title: "使命", description: "用科技创新推动无人机产业发展，为各行业提供智能化解决方案" },
  { icon: Users, title: "愿景", description: "成为全球领先的工业无人机及智能化解决方案供应商" },
  { icon: Award, title: "价值观", description: "创新、专业、诚信、共赢" },
];

const stats = [
  { value: "200+", label: "专业员工" },
  { value: "50+", label: "发明专利" },
  { value: "1000+", label: "服务客户" },
  { value: "20+", label: "覆盖城市" },
];

const About = () => {
  const breadcrumbData = createBreadcrumbStructuredData([
    { name: '首页', url: '/' },
    { name: '关于晓鸟', url: '/about' },
  ]);

  return (
    <div className="min-h-screen">
      <SEO
        title="关于晓鸟"
        description="晓鸟科技有限公司成立于2015年，是一家专注于工业无人机研发、生产和销售的高新技术企业，拥有200+专业员工、50+发明专利。"
        keywords="晓鸟科技,关于我们,无人机公司,工业无人机企业,无人机研发"
        url="/about"
        structuredData={breadcrumbData}
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                关于晓鸟科技
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                专业无人机研发制造商，致力于为各行业提供智能化空中解决方案
              </p>
            </div>
          </div>
        </section>

        {/* Company Intro */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">公司简介</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  晓鸟科技有限公司成立于2015年，是一家专注于工业无人机研发、生产和销售的高新技术企业。公司总部位于湖南邵阳，拥有完整的无人机产业链，从飞控系统、动力系统到整机制造均具备自主研发能力。
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  经过多年发展，晓鸟科技已成为国内领先的工业无人机解决方案提供商，产品广泛应用于电力巡检、消防救援、物流配送、农业植保等多个领域，服务客户超过1000家。
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  公司坚持"创新驱动、品质为本"的发展理念，持续加大研发投入，目前拥有50余项发明专利和软件著作权，是多项行业标准的参与制定单位。
                </p>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80"
                  alt="公司环境"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-primary">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-primary-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">企业文化</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((item, index) => (
                <div key={index} className="bg-card rounded-xl p-8 shadow-card text-center">
                  <item.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-card-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">发展历程</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}
                    >
                      <div className="bg-card rounded-xl p-6 shadow-card inline-block">
                        <div className="text-2xl font-bold text-accent mb-2">{milestone.year}</div>
                        <h3 className="text-lg font-semibold text-card-foreground mb-1">
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              期待与您合作
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              晓鸟科技期待为您提供专业的无人机解决方案，共同推动行业智能化发展
            </p>
            <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
              联系我们
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

export default About;