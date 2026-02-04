import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sun, Thermometer, Cpu, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const SolarPanel = () => {
  const { t } = useLanguage();

  const challenges = [
    t('power.solar.challenge1'),
    t('power.solar.challenge2'),
    t('power.solar.challenge3'),
    t('power.solar.challenge4'),
  ];

  const solutions = [
    { icon: Thermometer, titleKey: 'power.solar.solution1.title', descKey: 'power.solar.solution1.desc' },
    { icon: Sun, titleKey: 'power.solar.solution2.title', descKey: 'power.solar.solution2.desc' },
    { icon: Cpu, titleKey: 'power.solar.solution3.title', descKey: 'power.solar.solution3.desc' },
    { icon: MapPin, titleKey: 'power.solar.solution4.title', descKey: 'power.solar.solution4.desc' },
  ];

  const specs = [
    { labelKey: 'power.solar.spec1.label', valueKey: 'power.solar.spec1.value' },
    { labelKey: 'power.solar.spec2.label', valueKey: 'power.solar.spec2.value' },
    { labelKey: 'power.solar.spec3.label', valueKey: 'power.solar.spec3.value' },
    { labelKey: 'power.solar.spec4.label', valueKey: 'power.solar.spec4.value' },
    { labelKey: 'power.solar.spec5.label', valueKey: 'power.solar.spec5.value' },
    { labelKey: 'power.solar.spec6.label', valueKey: 'power.solar.spec6.value' },
  ];

  const benefits = [
    { titleKey: 'power.solar.benefit1.title', descKey: 'power.solar.benefit1.desc' },
    { titleKey: 'power.solar.benefit2.title', descKey: 'power.solar.benefit2.desc' },
    { titleKey: 'power.solar.benefit3.title', descKey: 'power.solar.benefit3.desc' },
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('power.solar.seo.title')}
        description={t('power.solar.seo.description')}
        keywords={t('power.solar.seo.keywords')}
        path="/applications/power/solar-panel"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <div className="text-primary-foreground/70 mb-2">
                <Link to="/applications/power-inspection" className="hover:text-primary-foreground">{t('power.solar.breadcrumb.power')}</Link>
                <span className="mx-2">/</span>
                <span>{t('power.solar.breadcrumb.current')}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">{t('power.solar.hero.title')}</h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                {t('power.solar.hero.desc')}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {t('power.solar.cta.consult')} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">{t('power.solar.challenges.title')}</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              {t('power.solar.challenges.desc')}
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
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">{t('power.solar.solutions.title')}</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              {t('power.solar.solutions.desc')}
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

        {/* Specs Section */}
        <section className="py-16 bg-primary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground text-center mb-12">{t('power.solar.specs.title')}</h2>
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
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">{t('power.solar.benefits.title')}</h2>
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
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{t('power.solar.cta.title')}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('power.solar.cta.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {t('power.solar.cta.consult')} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/applications/power-inspection">
                <Button variant="outline" className="px-8 py-3">{t('power.solar.cta.back')}</Button>
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

export default SolarPanel;
