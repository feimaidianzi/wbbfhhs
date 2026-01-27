import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, Wrench, FileText, Users, CheckCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const CustomResearch = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Lightbulb, title: t('customResearch.services.analysis.title'), description: t('customResearch.services.analysis.desc') },
    { icon: FileText, title: t('customResearch.services.design.title'), description: t('customResearch.services.design.desc') },
    { icon: Wrench, title: t('customResearch.services.dev.title'), description: t('customResearch.services.dev.desc') },
    { icon: Users, title: t('customResearch.services.support.title'), description: t('customResearch.services.support.desc') },
  ];

  const cases = [
    { title: t('customResearch.case1.title'), client: t('customResearch.case1.client'), description: t('customResearch.case1.desc'), image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80" },
    { title: t('customResearch.case2.title'), client: t('customResearch.case2.client'), description: t('customResearch.case2.desc'), image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80" },
    { title: t('customResearch.case3.title'), client: t('customResearch.case3.client'), description: t('customResearch.case3.desc'), image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
  ];

  const capabilities = [
    t('customResearch.capabilities.flightControl'),
    t('customResearch.capabilities.powerSystem'),
    t('customResearch.capabilities.airframe'),
    t('customResearch.capabilities.payload'),
    t('customResearch.capabilities.groundStation'),
    t('customResearch.capabilities.communication'),
    t('customResearch.capabilities.navigation'),
    t('customResearch.capabilities.swarm'),
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={t('customResearch.seo.title')}
        description={t('customResearch.seo.description')}
        keywords={t('customResearch.seo.keywords')}
        url="/custom-research"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('customResearch.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                {t('customResearch.hero.subtitle')}
              </p>
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                {t('customResearch.hero.cta')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('customResearch.services.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="text-sm text-accent font-medium mb-2">0{index + 1}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {t('customResearch.capabilities.title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('customResearch.capabilities.desc')}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {capabilities.map((cap, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground text-sm">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"
                  alt={t('customResearch.capabilities.title')}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Cases */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              {t('customResearch.cases.title')}
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              {t('customResearch.cases.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cases.map((item, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-accent font-medium mb-2">{item.client}</div>
                    <h3 className="text-lg font-bold text-card-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
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
              {t('customResearch.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('customResearch.cta.subtitle')}
            </p>
            <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
              {t('customResearch.cta.btn')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default CustomResearch;