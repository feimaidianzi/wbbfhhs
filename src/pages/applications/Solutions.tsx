import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings, Users, Lightbulb, Wrench, AlertTriangle, CheckCircle } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { HeroImagePreload } from "@/components/HeroImagePreload";
import solutionsHeroImg from "@/assets/seo/solutions-hero.jpg";
import powerInspectionImg from "@/assets/seo/power-transmission-inspection.jpg";
import militaryDefenseImg from "@/assets/seo/military-defense-drone.jpg";
import envMonitoringImg from "@/assets/seo/atmospheric-monitoring.jpg";
import logisticsCargoImg from "@/assets/seo/logistics-cargo-drone.jpg";

const Solutions = () => {
  const { t } = useLanguage();

  const solutions = [
    {
      icon: Settings,
      title: t('solutions.service.complete.title'),
      description: t('solutions.service.complete.desc'),
      features: [
        t('solutions.service.complete.f1'),
        t('solutions.service.complete.f2'),
        t('solutions.service.complete.f3'),
        t('solutions.service.complete.f4'),
      ]
    },
    {
      icon: Users,
      title: t('solutions.service.training.title'),
      description: t('solutions.service.training.desc'),
      features: [
        t('solutions.service.training.f1'),
        t('solutions.service.training.f2'),
        t('solutions.service.training.f3'),
        t('solutions.service.training.f4'),
      ]
    },
    {
      icon: Wrench,
      title: t('solutions.service.afterSales.title'),
      description: t('solutions.service.afterSales.desc'),
      features: [
        t('solutions.service.afterSales.f1'),
        t('solutions.service.afterSales.f2'),
        t('solutions.service.afterSales.f3'),
        t('solutions.service.afterSales.f4'),
      ]
    },
    {
      icon: Lightbulb,
      title: t('solutions.service.custom.title'),
      description: t('solutions.service.custom.desc'),
      features: [
        t('solutions.service.custom.f1'),
        t('solutions.service.custom.f2'),
        t('solutions.service.custom.f3'),
        t('solutions.service.custom.f4'),
      ]
    }
  ];

  const industries = [
    {
      title: t('solutions.industry.power'),
      pain: t('solutions.industry.power.pain'),
      solution: t('solutions.industry.power.solution'),
      image: powerInspectionImg,
      link: '/applications/power-inspection',
    },
    {
      title: t('solutions.industry.security'),
      pain: t('solutions.industry.security.pain'),
      solution: t('solutions.industry.security.solution'),
      image: militaryDefenseImg,
      link: '/applications/military',
    },
    {
      title: t('solutions.industry.environment'),
      pain: t('solutions.industry.environment.pain'),
      solution: t('solutions.industry.environment.solution'),
      image: envMonitoringImg,
      link: '/solutions/industrial-uav-environmental-monitoring',
    },
    {
      title: t('solutions.industry.logistics'),
      pain: t('solutions.industry.logistics.pain'),
      solution: t('solutions.industry.logistics.solution'),
      image: logisticsCargoImg,
      link: '/applications/logistics',
    },
    {
      title: t('solutions.industry.transport'),
      pain: t('solutions.industry.transport.pain'),
      solution: t('solutions.industry.transport.solution'),
      image: powerInspectionImg,
      link: '/solutions/industrial-uav-transportation-monitoring',
    },
    {
      title: t('solutions.industry.emergency'),
      pain: t('solutions.industry.emergency.pain'),
      solution: t('solutions.industry.emergency.solution'),
      image: militaryDefenseImg,
      link: '/solutions/firefighting-emergency',
    },
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('solutions.seo.title')}
        description={t('solutions.seo.description')}
        keywords={t('solutions.seo.keywords')}
        path="/applications/solutions"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <HeroImagePreload imageSrc={solutionsHeroImg} />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${solutionsHeroImg})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('solutions.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                {t('solutions.hero.subtitle')}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {t('solutions.hero.cta')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-12 bg-muted/50">
          <div className="container-custom">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto text-center">
              {t('solutions.intro')}
            </p>
          </div>
        </section>

        {/* Industry Pain Points & Solutions */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              {t('solutions.industryCoverage')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((industry, index) => (
                <Link key={index} to={industry.link} className="group">
                  <div className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={industry.image}
                        alt={`CANI UAV ${industry.title} - Industrial Drone Solution`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-card-foreground mb-3">{industry.title}</h3>
                      <div className="space-y-2 flex-1">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">{industry.pain}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-foreground font-medium">{industry.solution}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
                        {t('common.viewDetails')}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Service System */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              {t('solutions.serviceSystem')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solutions.map((solution, index) => (
                <div key={index} className="bg-card rounded-xl p-8 shadow-card">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <solution.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-card-foreground mb-2">{solution.title}</h3>
                      <p className="text-muted-foreground text-sm">{solution.description}</p>
                    </div>
                  </div>
                  <ul className="grid grid-cols-2 gap-2 mt-4">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t('solutions.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('solutions.cta.subtitle')}
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                {t('solutions.cta.btn')}
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

export default Solutions;
