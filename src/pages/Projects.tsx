import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Sparkles, Plane, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Projects = () => {
  const { language } = useLanguage();

  const projects = language === 'zh' ? [
    {
      icon: GraduationCap,
      title: "无人机培训",
      description: "提供CAAC认证的无人机驾驶员培训课程，涵盖理论学习、模拟飞行、实操训练等全流程培训服务。",
      link: "/projects/training",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
    },
    {
      icon: Sparkles,
      title: "无人机表演",
      description: "专业的无人机编队灯光表演服务，可定制各类文字、图案、3D造型，打造震撼视觉盛宴。",
      link: "/projects/show",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    },
    {
      icon: Plane,
      title: "飞行服务",
      description: "提供专业的无人机飞行作业服务，包括航拍测绘、电力巡检、农业植保等多种应用场景。",
      link: "/projects/flight-service",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    },
    {
      icon: Handshake,
      title: "项目合作",
      description: "与政府、企业开展无人机项目合作，提供定制化解决方案和长期运营服务。",
      link: "/projects/cooperation",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    },
  ] : [
    {
      icon: GraduationCap,
      title: "Drone Training",
      description: "CAAC certified drone pilot training courses, covering theoretical learning, simulation flight, practical training and full-process training services.",
      link: "/projects/training",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
    },
    {
      icon: Sparkles,
      title: "Drone Shows",
      description: "Professional drone formation light show services, customizable text, patterns, 3D shapes to create stunning visual feasts.",
      link: "/projects/show",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    },
    {
      icon: Plane,
      title: "Flight Services",
      description: "Professional drone flight operation services, including aerial photography, mapping, power inspection, agricultural protection and more.",
      link: "/projects/flight-service",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    },
    {
      icon: Handshake,
      title: "Project Cooperation",
      description: "Drone project cooperation with government and enterprises, providing customized solutions and long-term operation services.",
      link: "/projects/cooperation",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={language === 'zh' ? "项目合作" : "Project Cooperation"}
        description={language === 'zh' 
          ? "飞迈科技提供无人机培训、无人机表演、飞行服务、项目合作等多元化服务。"
          : "Feimai Technology provides diversified services including drone training, drone shows, flight services, and project cooperation."}
        keywords={language === 'zh' 
          ? "无人机培训,无人机表演,飞行服务,项目合作"
          : "drone training,drone shows,flight services,project cooperation"}
        url="/projects"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {language === 'zh' ? "项目合作" : "Project Cooperation"}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                {language === 'zh' ? "多元化无人机服务，满足您的各类需求" : "Diversified drone services to meet your various needs"}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {language === 'zh' ? "合作咨询" : "Contact Us"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Link key={index} to={project.link} className="group">
                  <div className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                          <project.icon className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-xl font-bold text-card-foreground group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <span className="text-accent font-medium flex items-center gap-2">
                        {language === 'zh' ? "了解更多" : "Learn More"} <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Projects;