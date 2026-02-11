import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Car, Eye, Zap, Shield } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Traffic = () => {
  const { t } = useLanguage();

  const features = [
    { 
      icon: Car, 
      title: t('traffic.flow.title'), 
      description: t('traffic.flow.desc') 
    },
    { 
      icon: Eye, 
      title: t('traffic.accident.title'), 
      description: t('traffic.accident.desc') 
    },
    { 
      icon: Zap, 
      title: t('traffic.inspection.title'), 
      description: t('traffic.inspection.desc') 
    },
    { 
      icon: Shield, 
      title: t('traffic.enforcement.title'), 
      description: t('traffic.enforcement.desc') 
    },
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('traffic.seo.title')}
        description={t('traffic.seo.desc')}
        keywords={t('traffic.seo.keywords')}
        path="/applications/traffic"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[350px] md:h-[450px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80)" }}
          >
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl rounded-3xl bg-black/70 border border-white/20 p-6 md:p-8 shadow-lg">
              <p className="text-cyan-400 font-medium mb-2">{t('traffic.badge')}</p>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {t('traffic.title')}
              </h1>
              <p className="text-lg text-white/80">
                {t('traffic.hero')}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('traffic.scenarios.title')}
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
              {t('traffic.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('traffic.cta.subtitle')}
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                {t('traffic.cta.btn')}
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

export default Traffic;
