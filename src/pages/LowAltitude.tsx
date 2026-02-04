import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plane, Building, Truck, Camera, Globe, TrendingUp } from "lucide-react";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const LowAltitude = () => {
  const { t } = useLanguage();

  const sectors = [
    { icon: Truck, title: t('lowAltitude.sector.logistics'), description: t('lowAltitude.sector.logistics.desc') },
    { icon: Camera, title: t('lowAltitude.sector.tourism'), description: t('lowAltitude.sector.tourism.desc') },
    { icon: Building, title: t('lowAltitude.sector.uam'), description: t('lowAltitude.sector.uam.desc') },
    { icon: Plane, title: t('lowAltitude.sector.aviation'), description: t('lowAltitude.sector.aviation.desc') },
    { icon: Globe, title: t('lowAltitude.sector.airspace'), description: t('lowAltitude.sector.airspace.desc') },
    { icon: TrendingUp, title: t('lowAltitude.sector.service'), description: t('lowAltitude.sector.service.desc') },
  ];

  const stats = [
    { value: t('lowAltitude.stat.market.value'), label: t('lowAltitude.stat.market.label') },
    { value: "30%", label: t('lowAltitude.stat.growth.label') },
    { value: "100+", label: t('lowAltitude.stat.cities.label') },
    { value: "50+", label: t('lowAltitude.stat.policies.label') },
  ];

  const roles = [
    t('lowAltitude.role.pilot'),
    t('lowAltitude.role.logistics'),
    t('lowAltitude.role.airspace'),
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('lowAltitude.seo.title')}
        description={t('lowAltitude.seo.description')}
        keywords={t('lowAltitude.seo.keywords')}
        path="/low-altitude"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('lowAltitude.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                {t('lowAltitude.hero.subtitle')}
              </p>
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                {t('lowAltitude.hero.cta')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-accent">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent-foreground mb-1">{stat.value}</div>
                  <div className="text-accent-foreground/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">{t('lowAltitude.intro.title')}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {t('lowAltitude.intro.p1')}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t('lowAltitude.intro.p2')}
              </p>
            </div>
          </div>
        </section>

        {/* Sectors */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{t('lowAltitude.sectors.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sectors.map((sector, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all"
                >
                  <sector.icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-bold text-card-foreground mb-3">
                    {sector.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {sector.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Role */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&q=80"
                  alt={t('lowAltitude.role.title')}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">{t('lowAltitude.role.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('lowAltitude.role.p1')}
                </p>
                <p className="text-muted-foreground mb-4">
                  {t('lowAltitude.role.p2')}
                </p>
                <ul className="space-y-3 mb-6">
                  {roles.map((role, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span className="text-foreground">{role}</span>
                    </li>
                  ))}
                </ul>
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground">
                  {t('lowAltitude.role.cta')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default LowAltitude;
