import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Eye, Zap, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const SmartCity = () => {
  const { t } = useLanguage();

  const features = [
    { 
      icon: Building, 
      title: t('smartCity.feature.management.title'), 
      description: t('smartCity.feature.management.desc')
    },
    { 
      icon: Map, 
      title: t('smartCity.feature.planning.title'), 
      description: t('smartCity.feature.planning.desc')
    },
    { 
      icon: Zap, 
      title: t('smartCity.feature.emergency.title'), 
      description: t('smartCity.feature.emergency.desc')
    },
    { 
      icon: Eye, 
      title: t('smartCity.feature.monitoring.title'), 
      description: t('smartCity.feature.monitoring.desc')
    },
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('smartCity.seo.title')}
        description={t('smartCity.seo.description')}
        keywords={t('smartCity.seo.keywords')}
        path="/applications/smart-city"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[350px] md:h-[450px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&q=80)" }}
          >
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl rounded-3xl bg-black/70 border border-white/20 p-6 md:p-8 shadow-lg">
              <p className="text-cyan-400 font-medium mb-2">{t('smartCity.hero.badge')}</p>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {t('smartCity.hero.title')}
              </h1>
              <p className="text-lg text-white/80">
                {t('smartCity.hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('smartCity.scenarios.title')}
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
              {t('smartCity.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('smartCity.cta.subtitle')}
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                {t('smartCity.cta.btn')}
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

export default SmartCity;