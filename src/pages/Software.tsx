import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, Map, Cloud, Shield, Settings, Database, BookOpen, Sun } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";
import softwareHeroImg from "@/assets/seo/software-dashboard.jpg";

const Software = () => {
  const { t } = useLanguage();

  const softwareCollectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('software.page.title'),
    description: t('software.page.description'),
    url: 'https://www.caniuav.com/software',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        { '@type': 'SoftwareApplication', name: 'UAV Pilot Exam System', applicationCategory: 'EducationalApplication', operatingSystem: 'Web' },
        { '@type': 'SoftwareApplication', name: 'PV Inspection Software', applicationCategory: 'BusinessApplication', operatingSystem: 'Web, Windows' },
        { '@type': 'SoftwareApplication', name: 'Drone Fleet Management', applicationCategory: 'BusinessApplication', operatingSystem: 'Web' },
        { '@type': 'SoftwareApplication', name: 'Power Inspection System', applicationCategory: 'BusinessApplication', operatingSystem: 'Web, Windows' },
        { '@type': 'SoftwareApplication', name: 'PV System Monitoring', applicationCategory: 'BusinessApplication', operatingSystem: 'Web' },
        { '@type': 'SoftwareApplication', name: 'Environment Monitoring', applicationCategory: 'BusinessApplication', operatingSystem: 'Web' },
        { '@type': 'SoftwareApplication', name: 'Ground Control Station', applicationCategory: 'BusinessApplication', operatingSystem: 'Windows, Linux' },
        { '@type': 'SoftwareApplication', name: 'Swarm Ground Station', applicationCategory: 'BusinessApplication', operatingSystem: 'Windows' },
      ],
    },
  };

  const systems = [
    {
      icon: BookOpen,
      name: t('software.exam'),
      description: t('software.exam.desc'),
      features: [t('software.exam.feature1'), t('software.exam.feature2'), t('software.exam.feature3'), t('software.exam.feature4')],
      link: "/software/exam-system",
    },
    {
      icon: Sun,
      name: t('software.pvInspection'),
      description: t('software.pvInspection.desc'),
      features: [t('software.pv.feature1'), t('software.pv.feature2'), t('software.pv.feature3'), t('software.pv.feature4')],
      link: "/software/pv-inspection",
    },
    {
      icon: Cloud,
      name: t('software.management'),
      description: t('software.management.desc'),
      features: [t('software.management.feature1'), t('software.management.feature2'), t('software.management.feature3'), t('software.management.feature4')],
      link: "/software/drone-management",
    },
    {
      icon: Shield,
      name: t('software.powerSystem'),
      description: t('software.powerSystem.desc'),
      features: [t('software.power.feature1'), t('software.power.feature2'), t('software.power.feature3'), t('software.power.feature4')],
      link: "/software/power-inspection-system",
    },
    {
      icon: Settings,
      name: t('software.pvSystem'),
      description: t('software.pvSystem.desc'),
      features: [t('software.pvSys.feature1'), t('software.pvSys.feature2'), t('software.pvSys.feature3'), t('software.pvSys.feature4')],
      link: "/software/pv-system",
    },
    {
      icon: Database,
      name: t('software.envSystem'),
      description: t('software.envSystem.desc'),
      features: [t('software.env.feature1'), t('software.env.feature2'), t('software.env.feature3'), t('software.env.feature4')],
      link: "/software/environment-system",
    },
    {
      icon: Monitor,
      name: t('software.groundStation'),
      description: t('software.groundStation.desc'),
      features: [t('software.gs.feature1'), t('software.gs.feature2'), t('software.gs.feature3'), t('software.gs.feature4')],
      link: "/software/ground-station",
    },
    {
      icon: Map,
      name: t('software.swarmStation'),
      description: t('software.swarmStation.desc'),
      features: [t('software.swarm.feature1'), t('software.swarm.feature2'), t('software.swarm.feature3'), t('software.swarm.feature4')],
      link: "/software/swarm-ground-station",
    },
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('software.page.title')}
        description={t('software.page.description')}
        keywords={t('software.page.keywords')}
        path="/software"
        structuredData={softwareCollectionSchema}
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[300px] md:h-[400px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${softwareHeroImg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('software.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90">
                {t('software.hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Systems Grid */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {t('software.products.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('software.products.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systems.map((system, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 group"
                >
                  <system.icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-lg font-bold text-card-foreground mb-3 group-hover:text-accent transition-colors">
                    {system.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {system.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {system.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to={system.link}>
                    <Button
                      variant="outline"
                      className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    >
                      {t('common.learnMore')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {t('software.integration.title')}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t('software.integration.p1')}
                </p>
                <p className="text-muted-foreground mb-6">
                  {t('software.integration.p2')}
                </p>
                <Link to="/contact">
                  <Button className="bg-accent hover:bg-orange-light text-accent-foreground">
                    {t('software.integration.cta')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src={softwareHeroImg}
                  alt={t('software.integration.title')}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
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

export default Software;
