import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sun, Eye, Zap, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const features = [
  { icon: Sun, title: "热斑检测", description: "红外热成像精准识别光伏组件热斑缺陷" },
  { icon: Eye, title: "AI识别", description: "深度学习算法自动识别多种缺陷类型" },
  { icon: Zap, title: "效率分析", description: "发电效率分析与组件性能评估" },
  { icon: BarChart, title: "报告生成", description: "自动生成专业巡检报告" },
];

const defectTypes = [
  "热斑缺陷",
  "隐裂问题",
  "组件污染",
  "接线盒异常",
  "支架变形",
  "遮挡分析",
];

const PVInspection = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="光伏巡检识别系统"
        description="飞迈科技光伏巡检识别系统，采用AI技术实现光伏电站智能巡检与缺陷识别。"
        keywords="光伏巡检,热斑检测,AI识别,光伏电站巡检,无人机巡检"
        url="/software/pv-inspection"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                EFUAV光伏巡检识别系统
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                AI赋能，让光伏巡检更智能、更高效
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  申请演示
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">核心功能</h2>
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

        {/* Defect Detection */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80"
                  alt="光伏巡检"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">缺陷识别类型</h2>
                <p className="text-muted-foreground mb-6">
                  系统可自动识别多种光伏组件缺陷，识别准确率超过95%。
                </p>
                <ul className="space-y-4">
                  {defectTypes.map((defect, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{defect}</span>
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
              提升光伏电站运维效率
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              联系我们了解更多光伏巡检解决方案
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

export default PVInspection;