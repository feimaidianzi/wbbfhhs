import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, Eye, FileText, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const features = [
  { icon: Zap, title: "缺陷识别", description: "AI自动识别输电线路多种缺陷" },
  { icon: Eye, title: "智能巡检", description: "航线自动规划与智能飞行控制" },
  { icon: FileText, title: "报告生成", description: "自动生成标准化巡检报告" },
  { icon: AlertTriangle, title: "预警分析", description: "缺陷趋势分析与预警提醒" },
];

const defectTypes = [
  "绝缘子破损/污秽",
  "导线散股/断股",
  "金具锈蚀/变形",
  "防震锤移位/脱落",
  "鸟巢异物",
  "杆塔倾斜/基础问题",
];

const PowerInspectionSystem = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="电力巡检管理系统"
        description="长凌电子电力巡检管理系统，提供输电线路智能巡检、缺陷识别、报告生成等功能。"
        keywords="电力巡检,输电线路巡检,缺陷识别,智能巡检系统"
        url="/software/power-inspection-system"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                电力巡检管理系统
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                智能化电力巡检，保障电网安全运行
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  了解更多
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">系统特点</h2>
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

        {/* Defect Types */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&q=80"
                  alt="电力巡检"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">缺陷识别类型</h2>
                <p className="text-muted-foreground mb-6">
                  系统可识别输电线路各类缺陷，识别准确率超过92%。
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
              提升电力巡检效率
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              联系我们获取电力巡检解决方案
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

export default PowerInspectionSystem;