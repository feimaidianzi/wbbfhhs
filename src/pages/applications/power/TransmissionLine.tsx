import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, Eye, Shield, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const challenges = [
  "传统人工巡检效率低，每天仅能巡检3-5公里线路",
  "高空作业风险大，人员安全难以保障",
  "恶劣天气和复杂地形导致巡检盲区",
  "缺陷发现不及时，可能导致大面积停电事故"
];

const solutions = [
  {
    icon: Eye,
    title: "多传感器融合",
    description: "可见光+红外热成像双光融合，全方位检测线路缺陷，热斑、破损一目了然"
  },
  {
    icon: Zap,
    title: "AI智能识别",
    description: "深度学习算法自动识别绝缘子破损、导线断股、金具锈蚀等20+种缺陷类型"
  },
  {
    icon: Shield,
    title: "自主避障飞行",
    description: "配备激光雷达避障系统，可在复杂塔架环境中安全飞行，避免碰撞风险"
  },
  {
    icon: BarChart,
    title: "数据管理平台",
    description: "巡检数据自动上传云端，生成专业报告，支持历史数据对比分析"
  }
];

const workflow = [
  { step: "01", title: "航线规划", description: "根据线路走向和杆塔位置，规划最优巡检航线" },
  { step: "02", title: "自动巡检", description: "无人机按规划航线自动飞行，采集高清影像数据" },
  { step: "03", title: "AI分析", description: "后台AI系统自动分析图像，识别并标注缺陷位置" },
  { step: "04", title: "报告输出", description: "生成专业巡检报告，推送至运维人员移动端" }
];

const specs = [
  { label: "巡检效率", value: "30-50公里/天" },
  { label: "检测精度", value: "厘米级" },
  { label: "缺陷识别率", value: ">95%" },
  { label: "续航时间", value: "45-60分钟" },
  { label: "抗风等级", value: "6级" },
  { label: "工作温度", value: "-20℃~50℃" }
];

const TransmissionLine = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="输电线路巡检 - 电力巡检应用"
        description="长凌电子输电线路无人机巡检解决方案，AI智能识别线路缺陷，效率提升10倍以上。"
        keywords="输电线路巡检,电力巡检无人机,线路缺陷检测,AI智能巡检"
        url="/applications/power-inspection/transmission-line"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <div className="text-primary-foreground/70 mb-2">
                <Link to="/applications/power-inspection" className="hover:text-primary-foreground">电力巡检</Link>
                <span className="mx-2">/</span>
                <span>输电线路巡检</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">输电线路巡检</h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                无人机智能巡检技术，实现输电线路高效、安全、精准巡检
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  咨询方案 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">行业痛点</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              传统输电线路巡检面临诸多挑战，亟需智能化升级
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {challenges.map((challenge, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                  <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-destructive text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-foreground">{challenge}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">解决方案</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              长凌电子无人机巡检系统，全面解决传统巡检痛点
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solutions.map((solution, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-card flex gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <solution.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-card-foreground mb-2">{solution.title}</h3>
                    <p className="text-muted-foreground text-sm">{solution.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">作业流程</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              标准化作业流程，确保巡检质量和效率
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {workflow.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-foreground font-bold text-xl">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                  {index < workflow.length - 1 && (
                    <div className="hidden md:block absolute top-8 right-0 w-8">
                      <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specs Section */}
        <section className="py-16 bg-primary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground text-center mb-12">技术参数</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {specs.map((spec, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-accent mb-2">{spec.value}</div>
                  <div className="text-primary-foreground/70 text-sm">{spec.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">客户收益</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { title: "效率提升", desc: "巡检效率提升10倍以上，人力成本降低80%" },
                { title: "安全保障", desc: "替代人工高空作业，杜绝人身安全事故" },
                { title: "质量可控", desc: "数据标准化，巡检质量可追溯可量化" }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-card">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">获取输电线路巡检方案</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              联系我们获取详细技术方案和报价，我们的专业团队将为您提供定制化服务
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  立即咨询 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/applications/power-inspection">
                <Button variant="outline" className="px-8 py-3">返回电力巡检</Button>
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

export default TransmissionLine;