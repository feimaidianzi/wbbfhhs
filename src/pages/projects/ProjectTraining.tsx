import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Award, Users, Clock, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const ProjectTraining = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const features = [
    { icon: Award, title: isEn ? "CAAC Certified" : "CAAC认证", description: isEn ? "CAAC certified training institution" : "民航局认证培训机构" },
    { icon: Users, title: isEn ? "Expert Instructors" : "专业师资", description: isEn ? "Experienced pilot instructors" : "资深飞手教练团队" },
    { icon: Clock, title: isEn ? "Flexible Schedule" : "灵活时间", description: isEn ? "Weekend/Full-time options" : "周末班/全日制可选" },
    { icon: BookOpen, title: isEn ? "Theory & Practice" : "理论实践", description: isEn ? "Complete theory + hands-on training" : "理论+实操全面培训" },
  ];

  const courses = isEn 
    ? [
        "Multi-Rotor Drone Pilot Training",
        "Fixed-Wing Drone Pilot Training",
        "VTOL Drone Training",
        "Drone Instructor Training",
        "Industry Application Training",
        "Corporate Customized Training",
      ]
    : [
        "多旋翼无人机驾驶员培训",
        "固定翼无人机驾驶员培训",
        "垂直起降无人机培训",
        "无人机教员培训",
        "行业应用专项培训",
        "企业定制化培训",
      ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO 
        title={isEn ? "Drone Training" : "无人机培训"} 
        description={isEn ? "CANI Technology provides CAAC certified drone pilot training services." : "长凌科技提供CAAC认证的无人机驾驶员培训服务。"} 
        keywords={isEn ? "drone training,CAAC certification,pilot training" : "无人机培训,CAAC认证,飞手培训"} 
        path="/projects/training" 
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&q=80)" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {isEn ? "Drone Training" : "无人机培训"}
              </h1>
              <p className="text-lg text-primary-foreground/90 mb-8">
                {isEn ? "CAAC Certified Training Institution, Professional Pilot Training Center" : "CAAC认证培训机构，专业飞手培养基地"}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {isEn ? "Enroll Now" : "报名咨询"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {features.map((f, i) => (
                <div key={i} className="text-center p-6 bg-card rounded-xl shadow-card">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <f.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm">{f.description}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-6">{isEn ? "Training Courses" : "培训课程"}</h2>
                <ul className="space-y-4">
                  {courses.map((c, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80" alt={isEn ? "Training" : "培训"} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default ProjectTraining;
