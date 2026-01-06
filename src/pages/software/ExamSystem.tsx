import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, BookOpen, Award, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const features = [
  { icon: BookOpen, title: "题库丰富", description: "涵盖无人机理论、法规、操作等多科目题库" },
  { icon: Users, title: "多人同考", description: "支持多人同时在线考试，自动阅卷评分" },
  { icon: Clock, title: "限时考试", description: "可设置考试时长，自动计时交卷" },
  { icon: Award, title: "证书发放", description: "考试通过后自动生成电子证书" },
];

const modules = [
  "无人机基础理论考试",
  "飞行法规与空域管理",
  "气象知识考核",
  "飞行操作技能评估",
  "应急处置能力测试",
  "机型专项考核",
];

const ExamSystem = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="模拟考试系统"
        description="飞迈科技无人机模拟考试系统，提供专业的无人机理论考试、技能评估和证书发放功能。"
        keywords="无人机考试,模拟考试系统,无人机培训考核,飞行员考试"
        url="/software/exam-system"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                模拟考试系统
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                专业的无人机培训考核平台，助力飞手技能提升
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  免费试用
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

        {/* Modules */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">考试模块</h2>
                <p className="text-muted-foreground mb-6">
                  系统涵盖无人机培训考核全流程，支持多种考试类型和评估方式。
                </p>
                <ul className="space-y-4">
                  {modules.map((module, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{module}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
                  alt="考试系统界面"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              开始使用模拟考试系统
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              联系我们获取系统演示和试用账号
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                联系我们
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

export default ExamSystem;