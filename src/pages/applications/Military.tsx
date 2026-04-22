import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Eye, Radio, Target, Radar, Cpu, Plane, Lock, Zap, Map } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "@/lib/helmet-shim";
import { HeroImagePreload } from "@/components/HeroImagePreload";
import militaryHeroImg from "@/assets/seo/military-defense-drone.jpg";
import maritimeImg from "@/assets/seo/maritime-drone.jpg";
import surveyingImg from "@/assets/seo/surveying-drone.jpg";
import industrialImg from "@/assets/seo/industrial-work-drone.jpg";
import firefightingImg from "@/assets/seo/firefighting-drone.jpg";
import powerImg from "@/assets/seo/power-transmission-inspection.jpg";

const Military = () => {
  const { t } = useLanguage();

  const serviceStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t('military.seo.title'),
    description: t('military.seo.description'),
    serviceType: 'Military & Defense UAV Solutions',
    provider: {
      '@type': 'Organization',
      name: 'CANI Technology',
      url: 'https://www.caniuav.com',
    },
    areaServed: 'Worldwide',
  };

  const features = [
    { icon: Eye, title: t('military.feature.recon.title'), description: t('military.feature.recon.desc') },
    { icon: Radio, title: t('military.feature.relay.title'), description: t('military.feature.relay.desc') },
    { icon: Target, title: t('military.feature.targeting.title'), description: t('military.feature.targeting.desc') },
    { icon: Shield, title: t('military.feature.stealth.title'), description: t('military.feature.stealth.desc') },
    { icon: Radar, title: t('military.feature.ew.title'), description: t('military.feature.ew.desc') },
    { icon: Cpu, title: t('military.feature.ai.title'), description: t('military.feature.ai.desc') },
  ];

  const scenarios = [
    { title: t('military.scenario.border.title'), description: t('military.scenario.border.desc'), image: militaryHeroImg, capabilities: [t('military.scenario.border.c1'), t('military.scenario.border.c2'), t('military.scenario.border.c3')] },
    { title: t('military.scenario.battlefield.title'), description: t('military.scenario.battlefield.desc'), image: surveyingImg, capabilities: [t('military.scenario.battlefield.c1'), t('military.scenario.battlefield.c2'), t('military.scenario.battlefield.c3')] },
    { title: t('military.scenario.training.title'), description: t('military.scenario.training.desc'), image: industrialImg, capabilities: [t('military.scenario.training.c1'), t('military.scenario.training.c2'), t('military.scenario.training.c3')] },
    { title: t('military.scenario.maritime.title'), description: t('military.scenario.maritime.desc'), image: maritimeImg, capabilities: [t('military.scenario.maritime.c1'), t('military.scenario.maritime.c2'), t('military.scenario.maritime.c3')] },
    { title: t('military.scenario.defense.title'), description: t('military.scenario.defense.desc'), image: powerImg, capabilities: [t('military.scenario.defense.c1'), t('military.scenario.defense.c2'), t('military.scenario.defense.c3')] },
    { title: t('military.scenario.emergency.title'), description: t('military.scenario.emergency.desc'), image: firefightingImg, capabilities: [t('military.scenario.emergency.c1'), t('military.scenario.emergency.c2'), t('military.scenario.emergency.c3')] },
  ];

  const products = [
    { name: t('military.product.recon.name'), description: t('military.product.recon.desc'), specs: [t('military.product.recon.s1'), t('military.product.recon.s2'), t('military.product.recon.s3')], image: militaryHeroImg },
    { name: t('military.product.stealth.name'), description: t('military.product.stealth.desc'), specs: [t('military.product.stealth.s1'), t('military.product.stealth.s2'), t('military.product.stealth.s3')], image: surveyingImg },
    { name: t('military.product.relay.name'), description: t('military.product.relay.desc'), specs: [t('military.product.relay.s1'), t('military.product.relay.s2'), t('military.product.relay.s3')], image: industrialImg },
    { name: t('military.product.swarm.name'), description: t('military.product.swarm.desc'), specs: [t('military.product.swarm.s1'), t('military.product.swarm.s2'), t('military.product.swarm.s3')], image: powerImg },
  ];

  const techAdvantages = [
    { icon: Lock, title: t('military.tech.security'), description: t('military.tech.security.desc') },
    { icon: Zap, title: t('military.tech.deploy'), description: t('military.tech.deploy.desc') },
    { icon: Map, title: t('military.tech.terrain'), description: t('military.tech.terrain.desc') },
    { icon: Plane, title: t('military.tech.endurance'), description: t('military.tech.endurance.desc') },
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('military.seo.title')}
        description={t('military.seo.description')}
        keywords={t('military.seo.keywords')}
        path="/applications/military"
        structuredData={serviceStructuredData}
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <HeroImagePreload imageSrc={militaryHeroImg} />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${militaryHeroImg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <div className="inline-block px-4 py-1 bg-accent/20 rounded-full text-accent text-sm font-medium mb-4">
                {t('military.hero.badge')}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('military.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                {t('military.hero.subtitle')}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {t('military.hero.cta')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t('military.features.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('military.features.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="p-6 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all">
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Advantages */}
        <section className="py-12 bg-accent">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {techAdvantages.map((adv, index) => (
                <div key={index} className="text-center">
                  <adv.icon className="w-10 h-10 text-accent-foreground mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-accent-foreground mb-1">{adv.title}</h4>
                  <p className="text-accent-foreground/80 text-sm">{adv.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scenarios Section */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t('military.scenarios.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('military.scenarios.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {scenarios.map((scenario, index) => (
                <div key={index} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={scenario.image}
                      alt={scenario.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-card-foreground mb-2">{scenario.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{scenario.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {scenario.capabilities.map((cap, i) => (
                        <span key={i} className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t('military.products.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('military.products.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div key={index} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-card-foreground mb-2">{product.name}</h3>
                    <p className="text-muted-foreground text-xs mb-3">{product.description}</p>
                    <div className="space-y-1">
                      {product.specs.map((spec, i) => (
                        <div key={i} className="text-xs text-muted-foreground">{spec}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t('military.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('military.cta.subtitle')}
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                {t('military.cta.btn')}
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

export default Military;
