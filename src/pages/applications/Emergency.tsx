import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Eye, Zap, Radio } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Emergency = () => {
  const { t } = useLanguage();

  const features = [
    { 
      icon: Shield, 
      title: t('emergency.rescue.title'), 
      description: t('emergency.rescue.desc') 
    },
    { 
      icon: Eye, 
      title: t('emergency.monitoring.title'), 
      description: t('emergency.monitoring.desc') 
    },
    { 
      icon: Radio, 
      title: t('emergency.relay.title'), 
      description: t('emergency.relay.desc') 
    },
    { 
      icon: Zap, 
      title: t('emergency.assessment.title'), 
      description: t('emergency.assessment.desc') 
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={t('emergency.seo.title')}
        description={t('emergency.seo.desc')}
        keywords={t('emergency.seo.keywords')}
        url="/applications/emergency"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[350px] md:h-[450px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=1920&q=80)" }}
          >
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl rounded-3xl bg-black/70 border border-white/20 p-6 md:p-8 shadow-lg">
              <p className="text-cyan-400 font-medium mb-2">{t('emergency.badge')}</p>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {t('emergency.title')}
              </h1>
              <p className="text-lg text-white/80">
                {t('emergency.hero')}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('emergency.scenarios.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-card text-center">
                  <feature.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t('emergency.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('emergency.cta.subtitle')}
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                {t('emergency.cta.btn')}
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

export default Emergency;
