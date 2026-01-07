import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, BookOpen, Award, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const ExamSystem = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  const features = [
    { 
      icon: BookOpen, 
      title: isEn ? "Rich Question Bank" : "题库丰富", 
      description: isEn ? "Comprehensive question bank covering theory, regulations, and operations" : "涵盖无人机理论、法规、操作等多科目题库" 
    },
    { 
      icon: Users, 
      title: isEn ? "Multi-user Exams" : "多人同考", 
      description: isEn ? "Support simultaneous online exams with automatic grading" : "支持多人同时在线考试，自动阅卷评分" 
    },
    { 
      icon: Clock, 
      title: isEn ? "Timed Exams" : "限时考试", 
      description: isEn ? "Configurable exam duration with automatic submission" : "可设置考试时长，自动计时交卷" 
    },
    { 
      icon: Award, 
      title: isEn ? "Certificate Issuance" : "证书发放", 
      description: isEn ? "Automatic electronic certificate generation upon passing" : "考试通过后自动生成电子证书" 
    },
  ];

  const modules = isEn ? [
    "Basic drone theory exam",
    "Flight regulations and airspace management",
    "Meteorology knowledge assessment",
    "Flight operation skills evaluation",
    "Emergency handling capability test",
    "Aircraft type-specific assessment",
  ] : [
    "无人机基础理论考试",
    "飞行法规与空域管理",
    "气象知识考核",
    "飞行操作技能评估",
    "应急处置能力测试",
    "机型专项考核",
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={isEn ? "Simulation Exam System" : "模拟考试系统"}
        description={isEn 
          ? "Feimai Technology drone simulation exam system for professional theory testing, skills assessment, and certification."
          : "飞迈科技无人机模拟考试系统，提供专业的无人机理论考试、技能评估和证书发放功能。"}
        keywords={isEn 
          ? "drone exam,simulation exam system,drone training assessment,pilot exam"
          : "无人机考试,模拟考试系统,无人机培训考核,飞行员考试"}
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
                {isEn ? "Simulation Exam System" : "模拟考试系统"}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                {isEn ? "Professional drone training and assessment platform to enhance pilot skills" : "专业的无人机培训考核平台，助力飞手技能提升"}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {isEn ? "Free Trial" : "免费试用"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {isEn ? "System Features" : "系统特点"}
            </h2>
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
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {isEn ? "Exam Modules" : "考试模块"}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {isEn 
                    ? "The system covers the entire drone training and assessment process, supporting various exam types and evaluation methods."
                    : "系统涵盖无人机培训考核全流程，支持多种考试类型和评估方式。"}
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
                  alt={isEn ? "Exam System Interface" : "考试系统界面"}
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
              {isEn ? "Start Using the Simulation Exam System" : "开始使用模拟考试系统"}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Contact us for system demo and trial account"
                : "联系我们获取系统演示和试用账号"}
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                {isEn ? "Contact Us" : "联系我们"}
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
