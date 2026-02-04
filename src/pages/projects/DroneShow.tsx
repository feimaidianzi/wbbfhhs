import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sparkles, Users, Palette, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const DroneShow = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Sparkles, title: t('droneShow.feature.effects'), description: t('droneShow.feature.effects.desc') },
    { icon: Palette, title: t('droneShow.feature.design'), description: t('droneShow.feature.design.desc') },
    { icon: Users, title: t('droneShow.feature.team'), description: t('droneShow.feature.team.desc') },
    { icon: Shield, title: t('droneShow.feature.safety'), description: t('droneShow.feature.safety.desc') },
  ];

  const scenarios = [
    t('droneShow.scenario.corporate'),
    t('droneShow.scenario.festival'),
    t('droneShow.scenario.scenic'),
    t('droneShow.scenario.sports'),
    t('droneShow.scenario.culture'),
    t('droneShow.scenario.brand'),
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO 
        title={t('droneShow.seo.title')} 
        description={t('droneShow.seo.description')} 
        keywords={t('droneShow.seo.keywords')} 
        path="/projects/show" 
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80)" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('droneShow.hero.title')}
              </h1>
              <p className="text-lg text-primary-foreground/90 mb-8">
                {t('droneShow.hero.subtitle')}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {t('droneShow.hero.cta')}
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
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm">{f.description}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" alt={t('droneShow.hero.title')} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-6">{t('droneShow.scenarios.title')}</h2>
                <ul className="space-y-4">
                  {scenarios.map((s, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
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

export default DroneShow;
