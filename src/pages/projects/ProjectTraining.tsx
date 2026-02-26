import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Award, Users, Clock, BookOpen } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageStructuredData } from "@/components/PageStructuredData";
import { useLanguage } from "@/contexts/LanguageContext";
import trainingHeroImg from "@/assets/seo/drone-training-classroom.jpg";
import trainingContentImg from "@/assets/seo/drone-training.jpg";

const ProjectTraining = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Award, title: t('training.feature.certified'), description: t('training.feature.certified.desc') },
    { icon: Users, title: t('training.feature.instructors'), description: t('training.feature.instructors.desc') },
    { icon: Clock, title: t('training.feature.flexible'), description: t('training.feature.flexible.desc') },
    { icon: BookOpen, title: t('training.feature.comprehensive'), description: t('training.feature.comprehensive.desc') },
  ];

  const courses = [
    t('training.course.multiRotor'),
    t('training.course.fixedWing'),
    t('training.course.vtol'),
    t('training.course.instructor'),
    t('training.course.industry'),
    t('training.course.corporate'),
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO 
        title={t('training.seo.title')} 
        description={t('training.seo.description')} 
        keywords={t('training.seo.keywords')} 
        path="/projects/training" 
      />
      <PageStructuredData data={{ type: 'Service', name: t('training.seo.title'), description: t('training.seo.description'), serviceType: 'Drone Training' }} />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${trainingHeroImg})` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('training.hero.title')}
              </h1>
              <p className="text-lg text-primary-foreground/90 mb-8">
                {t('training.hero.subtitle')}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {t('training.hero.cta')}
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
                <h2 className="text-2xl font-bold mb-6">{t('training.courses.title')}</h2>
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
                <img src={trainingContentImg} alt={t('training.hero.title')} className="w-full h-full object-cover" />
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
