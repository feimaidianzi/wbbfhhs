import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, Zap, Droplet, Map } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageStructuredData } from "@/components/PageStructuredData";
import { useLanguage } from "@/contexts/LanguageContext";
import flightServiceImg from "@/assets/seo/flight-service-operator.jpg";

const FlightService = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Camera, title: t('flightService.service.mapping'), description: t('flightService.service.mapping.desc') },
    { icon: Zap, title: t('flightService.service.power'), description: t('flightService.service.power.desc') },
    { icon: Droplet, title: t('flightService.service.agriculture'), description: t('flightService.service.agriculture.desc') },
    { icon: Map, title: t('flightService.service.emergency'), description: t('flightService.service.emergency.desc') },
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO 
        title={t('flightService.seo.title')} 
        description={t('flightService.seo.description')} 
        keywords={t('flightService.seo.keywords')} 
        path="/projects/flight-service" 
      />
      <PageStructuredData data={{ type: 'Service', name: t('flightService.seo.title'), description: t('flightService.seo.description'), serviceType: 'Drone Flight Service' }} />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${flightServiceImg})` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('flightService.hero.title')}
              </h1>
              <p className="text-lg text-primary-foreground/90 mb-8">
                {t('flightService.hero.subtitle')}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {t('flightService.hero.cta')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((s, i) => (
                <div key={i} className="text-center p-6 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <s.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm">{s.description}</p>
                </div>
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

export default FlightService;
