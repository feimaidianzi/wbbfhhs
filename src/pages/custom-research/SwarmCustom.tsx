import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Mail, Users, Cpu, Radio, Shield, Zap, Settings } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageStructuredData } from "@/components/PageStructuredData";

const SwarmCustom = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Users, titleKey: 'customSwarm.features.coordination', descKey: 'customSwarm.features.coordination.desc' },
    { icon: Cpu, titleKey: 'customSwarm.features.algorithm', descKey: 'customSwarm.features.algorithm.desc' },
    { icon: Radio, titleKey: 'customSwarm.features.mesh', descKey: 'customSwarm.features.mesh.desc' },
    { icon: Shield, titleKey: 'customSwarm.features.reliable', descKey: 'customSwarm.features.reliable.desc' },
    { icon: Zap, titleKey: 'customSwarm.features.fast', descKey: 'customSwarm.features.fast.desc' },
    { icon: Settings, titleKey: 'customSwarm.features.flexible', descKey: 'customSwarm.features.flexible.desc' },
  ];

  const serviceKeys = [
    'customSwarm.services.algorithm',
    'customSwarm.services.mesh',
    'customSwarm.services.formation',
    'customSwarm.services.task',
    'customSwarm.services.groundStation',
    'customSwarm.services.simulation',
    'customSwarm.services.show',
    'customSwarm.services.safety',
  ];

  const caseKeys = [
    { clientKey: 'customSwarm.cases.show.client', titleKey: 'customSwarm.cases.show.title', descKey: 'customSwarm.cases.show.desc' },
    { clientKey: 'customSwarm.cases.agriculture.client', titleKey: 'customSwarm.cases.agriculture.title', descKey: 'customSwarm.cases.agriculture.desc' },
    { clientKey: 'customSwarm.cases.research.client', titleKey: 'customSwarm.cases.research.title', descKey: 'customSwarm.cases.research.desc' },
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('customSwarm.seo.title')}
        description={t('customSwarm.seo.desc')}
        keywords={t('customSwarm.seo.keywords')}
        path="/custom-research/swarm"
      />
      <PageStructuredData data={{ type: 'Service', name: t('customSwarm.seo.title'), description: t('customSwarm.seo.desc'), serviceType: 'Swarm System Custom' }} />
      <Header />
      <main className="pt-16 md:pt-20">
        <div className="bg-secondary py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">{t('nav.home')}</Link>
              <span>/</span>
              <Link to="/custom-research" className="hover:text-accent">{t('nav.custom')}</Link>
              <span>/</span>
              <span className="text-foreground">{t('customSwarm.breadcrumb.current')}</span>
            </div>
          </div>
        </div>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <BackButton to="/custom-research" label={t('customSwarm.back')} />
                <h1 className="text-3xl md:text-5xl font-bold mb-6">{t('customSwarm.title')}</h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {t('customSwarm.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                    {t('customSwarm.btn.consult')} <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button className="bg-primary/10 border border-primary/30 text-foreground hover:bg-primary/20 px-8 py-6 text-lg">
                    <Phone className="w-5 h-5 mr-2" /> {t('customSwarm.btn.call')}
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt={t('customSwarm.title')} className="rounded-2xl shadow-2xl w-full" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">{t('customSwarm.features.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl shadow-card">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{t(feature.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(feature.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">{t('customSwarm.services.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {serviceKeys.map((key, index) => (
                <div key={index} className="flex items-center gap-3 bg-card p-4 rounded-xl shadow-card">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>{t(key)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t('customSwarm.cases.title')}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
              {t('customSwarm.cases.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseKeys.map((item, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl shadow-card">
                  <div className="text-sm text-accent font-medium mb-2">{t(item.clientKey)}</div>
                  <h3 className="text-xl font-bold mb-3">{t(item.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(item.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-6">
              {t('customSwarm.cta.title')}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg">
                <Mail className="w-5 h-5 mr-2" /> {t('customSwarm.cta.consult')}
              </Button>
              <a href="tel:+8618163685410">
                <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-10 py-6 text-lg">
                  <Phone className="w-5 h-5 mr-2" /> 18163685410
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default SwarmCustom;
