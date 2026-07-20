import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Wind, Droplet, Leaf, Thermometer, Globe, FileText } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageStructuredData } from "@/components/PageStructuredData";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "@/lib/helmet-shim";
import { PageFAQ } from "@/components/PageFAQ";
import envHeroImg from "@/assets/seo/environment-forest-monitoring.jpg";
import envAppImg from "@/assets/seo/env-vegetation-monitoring.jpg";

const EnvironmentSystem = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Wind, title: t('softwarePage.envSystem.f1.title'), description: t('softwarePage.envSystem.f1.desc') },
    { icon: Droplet, title: t('softwarePage.envSystem.f2.title'), description: t('softwarePage.envSystem.f2.desc') },
    { icon: Leaf, title: t('softwarePage.envSystem.f3.title'), description: t('softwarePage.envSystem.f3.desc') },
    { icon: Thermometer, title: t('softwarePage.envSystem.f4.title'), description: t('softwarePage.envSystem.f4.desc') },
    { icon: Globe, title: t('softwarePage.envSystem.f5.title'), description: t('softwarePage.envSystem.f5.desc') },
    { icon: FileText, title: t('softwarePage.envSystem.f6.title'), description: t('softwarePage.envSystem.f6.desc') },
  ];

  const matrixRows = [1, 2, 3, 4].map(i => ({
    dim: t(`softwarePage.envSystem.matrix.r${i}.dim`),
    sensor: t(`softwarePage.envSystem.matrix.r${i}.sensor`),
    value: t(`softwarePage.envSystem.matrix.r${i}.value`),
  }));

  const roiStats = [1, 2, 3, 4].map(i => ({
    value: t(`softwarePage.envSystem.roi.s${i}.value`),
    label: t(`softwarePage.envSystem.roi.s${i}.label`),
    desc: t(`softwarePage.envSystem.roi.s${i}.desc`),
  }));

  const applications = [
    t('softwarePage.envSystem.a1'),
    t('softwarePage.envSystem.a2'),
    t('softwarePage.envSystem.a3'),
    t('softwarePage.envSystem.a4'),
    t('softwarePage.envSystem.a5'),
    t('softwarePage.envSystem.a6'),
  ];

  const faqItems = [1, 2, 3, 4].map(i => ({
    questionKey: `softwarePage.envSystem.faq.q${i}`,
    answerKey: `softwarePage.envSystem.faq.a${i}`,
  }));

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('softwarePage.envSystem.seo.title')}
        description={t('softwarePage.envSystem.seo.desc')}
        keywords={t('softwarePage.envSystem.seo.keywords')}
        path="/software/environment-system"
      />
      <PageStructuredData data={{ type: 'SoftwareApplication', name: 'CANI Integrated Environment Monitoring System', description: t('softwarePage.envSystem.seo.desc'), category: 'EnvironmentalSoftware' }} />

      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "CANI Integrated Environment Monitoring System",
          "url": "https://caniuav.com/software/environment-system",
          "operatingSystem": "Cloud-based, Web, iOS, Android",
          "applicationCategory": "EnvironmentalSoftware",
          "description": "Industrial/government-grade UAV environment monitoring system with multi-sensor fusion, supporting atmosphere, water, vegetation, and thermal pollution 4D monitoring with ISO 14001 and ESG audit-compliant 3D visualization reporting.",
          "featureList": "Multi-sensor fusion (PM2.5/SO₂/NOₓ/VOCs), Water quality monitoring (pH/DO/chlorophyll-a), LiDAR NDVI vegetation analysis, Infrared thermal pollution tracking, Air-ground integrated networking, ISO 14001 compliance reporting, 3D point cloud visualization, ESG audit data tracking",
          "offers": {
            "@type": "Offer",
            "description": "Custom R&D and Enterprise Demo available",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "62"
          }
        })}</script>
      </Helmet>

      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero with GEO Quick Answer */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${envHeroImg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('softwarePage.envSystem.title')}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                {t('softwarePage.envSystem.hero')}
              </p>
              <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-primary-foreground/80 mb-1">
                  {t('softwarePage.envSystem.geo.question')}
                </p>
                <p className="text-sm text-primary-foreground/70">
                  {t('softwarePage.envSystem.geo.answer')}
                </p>
              </div>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {t('softwarePage.envSystem.btn')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ROI Stats */}
        <section className="py-12 bg-card border-b border-border">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              {t('softwarePage.envSystem.roi.title')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {roiStats.map((stat, i) => (
                <div key={i} className="text-center p-6 bg-background rounded-xl shadow-card">
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-base font-semibold text-card-foreground mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('softwarePage.envSystem.features.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="p-6 bg-card rounded-xl shadow-card">
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Monitoring Capability Matrix */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              {t('softwarePage.envSystem.matrix.title')}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-card rounded-xl shadow-card overflow-hidden">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="py-4 px-6 text-left font-semibold">{t('softwarePage.envSystem.matrix.col1')}</th>
                    <th className="py-4 px-6 text-left font-semibold">{t('softwarePage.envSystem.matrix.col2')}</th>
                    <th className="py-4 px-6 text-left font-semibold">{t('softwarePage.envSystem.matrix.col3')}</th>
                  </tr>
                </thead>
                <tbody>
                  {matrixRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-muted/30'}>
                      <td className="py-4 px-6 font-medium text-card-foreground">{row.dim}</td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">{row.sensor}</td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Application Scenarios */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src={envAppImg}
                  alt="UAV environment monitoring water quality vegetation analysis"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {t('softwarePage.envSystem.applications.title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('softwarePage.envSystem.applications.desc')}
                </p>
                <ul className="space-y-3">
                  {applications.map((app, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground text-sm">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-secondary">
          <div className="container-custom max-w-4xl">
            <PageFAQ
              titleKey="softwarePage.envSystem.faq.title"
              items={faqItems}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t('softwarePage.envSystem.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('softwarePage.envSystem.cta.subtitle')}
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                {t('softwarePage.common.consult')}
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

export default EnvironmentSystem;
