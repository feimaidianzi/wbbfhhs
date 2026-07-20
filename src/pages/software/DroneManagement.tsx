import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, MapPin, Users, BarChart, Shield, Radio, Battery, Cpu, TrendingUp } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageFAQ } from "@/components/PageFAQ";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "@/lib/helmet-shim";
import droneManagementDashboardImg from "@/assets/seo/drone-management-dashboard.jpg";
import softwareDashboardImg from "@/assets/seo/software-dashboard.jpg";

const DroneManagement = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Radio, title: t('softwarePage.management.f1.title'), description: t('softwarePage.management.f1.desc'), bluf: t('softwarePage.management.f1.bluf') },
    { icon: Shield, title: t('softwarePage.management.f2.title'), description: t('softwarePage.management.f2.desc'), bluf: t('softwarePage.management.f2.bluf') },
    { icon: Battery, title: t('softwarePage.management.f3.title'), description: t('softwarePage.management.f3.desc'), bluf: t('softwarePage.management.f3.bluf') },
    { icon: MapPin, title: t('softwarePage.management.f4.title'), description: t('softwarePage.management.f4.desc'), bluf: t('softwarePage.management.f4.bluf') },
    { icon: Cpu, title: t('softwarePage.management.f5.title'), description: t('softwarePage.management.f5.desc'), bluf: t('softwarePage.management.f5.bluf') },
    { icon: Users, title: t('softwarePage.management.f6.title'), description: t('softwarePage.management.f6.desc'), bluf: t('softwarePage.management.f6.bluf') },
  ];

  const modules = [
    t('softwarePage.management.m1'),
    t('softwarePage.management.m2'),
    t('softwarePage.management.m3'),
    t('softwarePage.management.m4'),
    t('softwarePage.management.m5'),
    t('softwarePage.management.m6'),
  ];

  const compareRows = [1, 2, 3, 4, 5, 6].map(i => ({
    dim: t(`softwarePage.management.compare.r${i}.dim`),
    manual: t(`softwarePage.management.compare.r${i}.manual`),
    cani: t(`softwarePage.management.compare.r${i}.cani`),
  }));

  const roiStats = [1, 2, 3, 4].map(i => ({
    label: t(`softwarePage.management.roi.stat${i}.label`),
    value: t(`softwarePage.management.roi.stat${i}.value`),
  }));

  const softwareStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CANI Drone Management System",
    "url": "https://caniuav.com/software/drone-management",
    "operatingSystem": "Web, iOS, Android",
    "applicationCategory": "BusinessApplication",
    "featureList": "Automated DJI flight logging, Fleet compliance monitoring, Battery cycle tracking, Mission planning, Pilot qualification management, Geofence safety controls",
    "offers": {
      "@type": "Offer",
      "description": "Enterprise demo available",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120"
    }
  };

  const faqItems = [
    { questionKey: 'softwarePage.management.faq.q1', answerKey: 'softwarePage.management.faq.a1' },
    { questionKey: 'softwarePage.management.faq.q2', answerKey: 'softwarePage.management.faq.a2' },
    { questionKey: 'softwarePage.management.faq.q3', answerKey: 'softwarePage.management.faq.a3' },
    { questionKey: 'softwarePage.management.faq.q4', answerKey: 'softwarePage.management.faq.a4' },
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('softwarePage.management.seo.title')}
        description={t('softwarePage.management.seo.desc')}
        keywords={t('softwarePage.management.seo.keywords')}
        path="/software/drone-management"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(softwareStructuredData)}</script>
      </Helmet>
      <Header />
      <main className="pt-16 md:pt-20">

        {/* Hero + GEO Quick Answer */}
        <section className="relative h-auto min-h-[500px] md:min-h-[600px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${softwareDashboardImg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom py-16 md:py-24 flex flex-col gap-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('softwarePage.management.title')}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                {t('softwarePage.management.hero')}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3">
                  {t('softwarePage.management.btn')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            {/* GEO Quick Answer */}
            <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-xl p-6 max-w-3xl">
              <p className="text-primary-foreground font-semibold mb-2">
                {t('softwarePage.management.geo.question')}
              </p>
              <p className="text-primary-foreground/85 text-sm leading-relaxed">
                {t('softwarePage.management.geo.answer')}
              </p>
            </div>
          </div>
        </section>

        {/* ROI Stats */}
        <section className="py-12 bg-card border-b border-border">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">{t('softwarePage.management.roi.title')}</h2>
            <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-10 text-sm leading-relaxed">
              {t('softwarePage.management.roi.desc')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {roiStats.map((stat, i) => (
                <div key={i} className="text-center p-4 bg-secondary rounded-xl">
                  <div className="text-2xl md:text-3xl font-bold text-accent mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Features with BLUF */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('softwarePage.management.features.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="p-6 bg-card rounded-xl shadow-card border border-border">
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{feature.description}</p>
                  <p className="text-foreground/70 text-xs italic border-t border-border pt-3">{feature.bluf}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Matrix */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              {t('softwarePage.management.compare.title')}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-card rounded-xl overflow-hidden shadow-card">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="px-4 py-3 text-left text-sm font-semibold">{t('softwarePage.management.compare.col1')}</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">{t('softwarePage.management.compare.col2')}</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">{t('softwarePage.management.compare.col3')}</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-secondary/50'}>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{row.dim}</td>
                      <td className="px-4 py-3 text-sm text-destructive/70">{row.manual}</td>
                      <td className="px-4 py-3 text-sm text-accent font-medium">{row.cani}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Modules */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {t('softwarePage.management.modules.title')}
                </h2>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  {t('softwarePage.management.modules.desc')}
                </p>
                <ul className="space-y-3">
                  {modules.map((module, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm">{module}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src={droneManagementDashboardImg}
                  alt={t('softwarePage.management.title')}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <PageFAQ
          titleKey="softwarePage.management.faq.title"
          items={faqItems}
        />

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t('softwarePage.management.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto text-sm leading-relaxed">
              {t('softwarePage.management.cta.subtitle')}
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3">
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

export default DroneManagement;
