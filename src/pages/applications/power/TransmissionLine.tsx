import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, Eye, Shield, BarChart } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const TransmissionLine = () => {
  const { t } = useLanguage();

  const challenges = [
    t('power.transmission.challenge1'),
    t('power.transmission.challenge2'),
    t('power.transmission.challenge3'),
    t('power.transmission.challenge4'),
  ];

  const solutions = [
    { icon: Eye, titleKey: 'power.transmission.solution1.title', descKey: 'power.transmission.solution1.desc' },
    { icon: Zap, titleKey: 'power.transmission.solution2.title', descKey: 'power.transmission.solution2.desc' },
    { icon: Shield, titleKey: 'power.transmission.solution3.title', descKey: 'power.transmission.solution3.desc' },
    { icon: BarChart, titleKey: 'power.transmission.solution4.title', descKey: 'power.transmission.solution4.desc' },
  ];

  const workflow = [
    { step: "01", titleKey: 'power.transmission.workflow1.title', descKey: 'power.transmission.workflow1.desc' },
    { step: "02", titleKey: 'power.transmission.workflow2.title', descKey: 'power.transmission.workflow2.desc' },
    { step: "03", titleKey: 'power.transmission.workflow3.title', descKey: 'power.transmission.workflow3.desc' },
    { step: "04", titleKey: 'power.transmission.workflow4.title', descKey: 'power.transmission.workflow4.desc' },
  ];

  const specs = [
    { labelKey: 'power.transmission.spec1.label', valueKey: 'power.transmission.spec1.value' },
    { labelKey: 'power.transmission.spec2.label', valueKey: 'power.transmission.spec2.value' },
    { labelKey: 'power.transmission.spec3.label', valueKey: 'power.transmission.spec3.value' },
    { labelKey: 'power.transmission.spec4.label', valueKey: 'power.transmission.spec4.value' },
    { labelKey: 'power.transmission.spec5.label', valueKey: 'power.transmission.spec5.value' },
    { labelKey: 'power.transmission.spec6.label', valueKey: 'power.transmission.spec6.value' },
  ];

  const benefits = [
    { titleKey: 'power.transmission.benefit1.title', descKey: 'power.transmission.benefit1.desc' },
    { titleKey: 'power.transmission.benefit2.title', descKey: 'power.transmission.benefit2.desc' },
    { titleKey: 'power.transmission.benefit3.title', descKey: 'power.transmission.benefit3.desc' },
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('power.transmission.seo.title')}
        description={t('power.transmission.seo.description')}
        keywords={t('power.transmission.seo.keywords')}
        path="/applications/power/transmission-line"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <div className="text-primary-foreground/70 mb-2">
                <Link to="/applications/power-inspection" className="hover:text-primary-foreground">{t('power.transmission.breadcrumb.power')}</Link>
                <span className="mx-2">/</span>
                <span>{t('power.transmission.breadcrumb.current')}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">{t('power.transmission.hero.title')}</h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                {t('power.transmission.hero.desc')}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {t('power.transmission.cta.consult')} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">{t('power.transmission.challenges.title')}</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              {t('power.transmission.challenges.desc')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {challenges.map((challenge, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                  <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-destructive text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-foreground">{challenge}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">{t('power.transmission.solutions.title')}</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              {t('power.transmission.solutions.desc')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solutions.map((solution, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-card flex gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <solution.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-card-foreground mb-2">{t(solution.titleKey)}</h3>
                    <p className="text-muted-foreground text-sm">{t(solution.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">{t('power.transmission.workflow.title')}</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              {t('power.transmission.workflow.desc')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {workflow.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-foreground font-bold text-xl">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{t(item.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm">{t(item.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specs Section */}
        <section className="py-16 bg-primary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground text-center mb-12">{t('power.transmission.specs.title')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {specs.map((spec, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-accent mb-2">{t(spec.valueKey)}</div>
                  <div className="text-primary-foreground/70 text-sm">{t(spec.labelKey)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">{t('power.transmission.benefits.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{t(benefit.titleKey)}</h3>
                    <p className="text-muted-foreground text-sm">{t(benefit.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-card">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{t('power.transmission.cta.title')}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('power.transmission.cta.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {t('power.transmission.cta.consult')} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/applications/power-inspection">
                <Button variant="outline" className="px-8 py-3">{t('power.transmission.cta.back')}</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default TransmissionLine;
