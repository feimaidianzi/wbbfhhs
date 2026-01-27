import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Sparkles, Plane, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Projects = () => {
  const { t } = useLanguage();

  const projects = [
    {
      icon: GraduationCap,
      title: t('projects.training.title'),
      description: t('projects.training.description'),
      link: "/projects/training",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
    },
    {
      icon: Sparkles,
      title: t('projects.show.title'),
      description: t('projects.show.description'),
      link: "/projects/show",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    },
    {
      icon: Plane,
      title: t('projects.flight.title'),
      description: t('projects.flight.description'),
      link: "/projects/flight-service",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    },
    {
      icon: Handshake,
      title: t('projects.cooperation.title'),
      description: t('projects.cooperation.description'),
      link: "/projects/cooperation",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    },
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('projects.seo.title')}
        description={t('projects.seo.description')}
        keywords={t('projects.seo.keywords')}
        path="/projects"
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
                {t('projects.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                {t('projects.hero.subtitle')}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {t('projects.hero.cta')}
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
                        {t('projects.learnMore')} <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
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