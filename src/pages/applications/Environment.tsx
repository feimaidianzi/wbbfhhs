import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Eye, Zap, Shield } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Environment = () => {
  const { t } = useLanguage();

  const features = [
    { 
      icon: Leaf, 
      title: t('environment.monitoring.title'), 
      description: t('environment.monitoring.desc') 
    },
    { 
      icon: Eye, 
      title: t('environment.pollution.title'), 
      description: t('environment.pollution.desc') 
    },
    { 
      icon: Zap, 
      title: t('environment.ecology.title'), 
      description: t('environment.ecology.desc') 
    },
    { 
      icon: Shield, 
      title: t('environment.enforcement.title'), 
      description: t('environment.enforcement.desc') 
    },
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('environment.seo.title')}
        description={t('environment.seo.desc')}
        keywords={t('environment.seo.keywords')}
        path="/applications/environment"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[350px] md:h-[450px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80"
            alt={t('environment.title')}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <div className="rounded-3xl bg-black/70 border border-white/20 p-6 md:p-8">
                <p className="text-cyan-400 font-medium mb-2">{t('environment.badge')}</p>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  {t('environment.title')}
                </h1>
                <p className="text-lg text-white/80">
                  {t('environment.hero')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('environment.scenarios.title')}
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
              {t('environment.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('environment.cta.subtitle')}
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                {t('environment.cta.btn')}
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

export default Environment;
