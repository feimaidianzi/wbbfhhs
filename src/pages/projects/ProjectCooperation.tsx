import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Handshake, Building, Users, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const ProjectCooperation = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const modes = [
    { icon: Handshake, title: isEn ? "Strategic Partnership" : "战略合作", description: isEn ? "Long-term strategic partnership" : "长期战略合作伙伴关系" },
    { icon: Building, title: isEn ? "Gov & Enterprise" : "政企合作", description: isEn ? "Government & enterprise projects" : "政府项目与企业合作" },
    { icon: Users, title: isEn ? "Tech Cooperation" : "技术合作", description: isEn ? "R&D and technology transfer" : "技术研发与成果转化" },
    { icon: FileText, title: isEn ? "Custom Development" : "定制开发", description: isEn ? "Customized solution development" : "定制化解决方案开发" },
  ];

  const areas = isEn 
    ? ["Smart City Development", "Power Grid Inspection", "Agricultural Modernization", "Environmental Monitoring", "Emergency Response System", "Logistics Network"]
    : ["智慧城市建设", "电网巡检项目", "农业现代化", "环境监测", "应急救援体系", "物流配送网络"];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO 
        title={isEn ? "Project Cooperation" : "项目合作"} 
        description={isEn ? "Feimai Technology offers various forms of drone project cooperation." : "飞迈科技提供多种形式的无人机项目合作。"} 
        keywords={isEn ? "drone project cooperation,government cooperation,technical partnership" : "无人机项目合作,政企合作,技术合作"} 
        path="/projects/cooperation" 
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80)" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {isEn ? "Project Cooperation" : "项目合作"}
              </h1>
              <p className="text-lg text-primary-foreground/90 mb-8">
                {isEn ? "Win-Win Partnership, Creating the Future Together" : "携手共赢，共创未来"}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {isEn ? "Cooperation Inquiry" : "合作咨询"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {modes.map((m, i) => (
                <div key={i} className="text-center p-6 bg-card rounded-xl shadow-card">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <m.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{m.title}</h3>
                  <p className="text-muted-foreground text-sm">{m.description}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-6">{isEn ? "Cooperation Areas" : "合作领域"}</h2>
                <ul className="space-y-4">
                  {areas.map((a, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80" alt={isEn ? "Cooperation" : "合作"} className="w-full h-full object-cover" />
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

export default ProjectCooperation;
