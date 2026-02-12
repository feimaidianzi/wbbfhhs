import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Mail, Monitor, Code, Map, Database, Cloud, Cpu } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageStructuredData } from "@/components/PageStructuredData";

const SoftwareCustom = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Monitor, titleKey: 'customSoftware.types.groundStation', descKey: 'customSoftware.types.groundStation.desc' },
    { icon: Code, titleKey: 'customSoftware.types.algorithm', descKey: 'customSoftware.types.algorithm.desc' },
    { icon: Map, titleKey: 'customSoftware.types.route', descKey: 'customSoftware.types.route.desc' },
    { icon: Database, titleKey: 'customSoftware.types.data', descKey: 'customSoftware.types.data.desc' },
    { icon: Cloud, titleKey: 'customSoftware.types.cloud', descKey: 'customSoftware.types.cloud.desc' },
    { icon: Cpu, titleKey: 'customSoftware.types.ai', descKey: 'customSoftware.types.ai.desc' },
  ];

  const serviceKeys = [
    'customSoftware.services.groundStation',
    'customSoftware.services.mobileApp',
    'customSoftware.services.routePlanning',
    'customSoftware.services.avoidance',
    'customSoftware.services.recognition',
    'customSoftware.services.dataProcessing',
    'customSoftware.services.cloudPlatform',
    'customSoftware.services.api',
  ];

  const cases = [
    {
      clientKey: 'customSoftware.cases.power.client',
      titleKey: 'customSoftware.cases.power.title',
      descKey: 'customSoftware.cases.power.desc',
    },
    {
      clientKey: 'customSoftware.cases.agriculture.client',
      titleKey: 'customSoftware.cases.agriculture.title',
      descKey: 'customSoftware.cases.agriculture.desc',
    },
    {
      clientKey: 'customSoftware.cases.survey.client',
      titleKey: 'customSoftware.cases.survey.title',
      descKey: 'customSoftware.cases.survey.desc',
    },
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('customSoftware.seo.title')}
        description={t('customSoftware.seo.desc')}
        keywords={t('customSoftware.seo.keywords')}
        path="/custom-research/software"
      />
      <PageStructuredData data={{ type: 'Service', name: t('customSoftware.seo.title'), description: t('customSoftware.seo.desc'), serviceType: 'Software Custom R&D' }} />
      <Header />
      <main className="pt-16 md:pt-20">
        <div className="bg-secondary py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">{t('customSoftware.breadcrumb.home')}</Link>
              <span>/</span>
              <Link to="/custom-research" className="hover:text-accent">{t('customSoftware.breadcrumb.custom')}</Link>
              <span>/</span>
              <span className="text-foreground">{t('customSoftware.breadcrumb.software')}</span>
            </div>
          </div>
        </div>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <BackButton to="/custom-research" label={t('customSoftware.back')} />
                <h1 className="text-3xl md:text-5xl font-bold mb-6">{t('customSoftware.title')}</h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {t('customSoftware.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                    {t('customSoftware.btn.consult')} <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button className="bg-primary/10 border border-primary/30 text-foreground hover:bg-primary/20 px-8 py-6 text-lg">
                    <Phone className="w-5 h-5 mr-2" /> {t('customSoftware.btn.call')}
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" alt={t('customSoftware.title')} className="rounded-2xl shadow-2xl w-full" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">{t('customSoftware.types.title')}</h2>
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
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">{t('customSoftware.services.title')}</h2>
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
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t('customSoftware.cases.title')}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
              {t('customSoftware.cases.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cases.map((item, index) => (
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
              {t('customSoftware.cta.title')}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg">
                <Mail className="w-5 h-5 mr-2" /> {t('customSoftware.cta.consult')}
              </Button>
              <a href="tel:+8617674048404">
                <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-10 py-6 text-lg">
                  <Phone className="w-5 h-5 mr-2" /> 17674048404
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

export default SoftwareCustom;
