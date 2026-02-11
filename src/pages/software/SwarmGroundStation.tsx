import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Users, Cpu, Network, Zap } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const SwarmGroundStation = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Users, title: t('softwarePage.swarm.f1.title'), description: t('softwarePage.swarm.f1.desc') },
    { icon: Cpu, title: t('softwarePage.swarm.f2.title'), description: t('softwarePage.swarm.f2.desc') },
    { icon: Network, title: t('softwarePage.swarm.f3.title'), description: t('softwarePage.swarm.f3.desc') },
    { icon: Zap, title: t('softwarePage.swarm.f4.title'), description: t('softwarePage.swarm.f4.desc') },
  ];

  const capabilities = [
    t('softwarePage.swarm.c1'),
    t('softwarePage.swarm.c2'),
    t('softwarePage.swarm.c3'),
    t('softwarePage.swarm.c4'),
    t('softwarePage.swarm.c5'),
    t('softwarePage.swarm.c6'),
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('softwarePage.swarm.seo.title')}
        description={t('softwarePage.swarm.seo.desc')}
        keywords={t('softwarePage.swarm.seo.keywords')}
        path="/software/swarm-ground-station"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('softwarePage.swarm.title')}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                {t('softwarePage.swarm.hero')}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {t('softwarePage.swarm.btn')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('softwarePage.swarm.features.title')}
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

        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80"
                  alt={t('softwarePage.swarm.title')}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {t('softwarePage.swarm.capabilities.title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('softwarePage.swarm.capabilities.desc')}
                </p>
                <ul className="space-y-4">
                  {capabilities.map((cap, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t('softwarePage.swarm.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('softwarePage.swarm.cta.subtitle')}
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                {t('softwarePage.common.consult')}
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

export default SwarmGroundStation;
