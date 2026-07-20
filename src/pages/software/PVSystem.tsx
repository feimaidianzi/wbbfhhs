import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sun, BarChart, Database, Settings, Globe, FileText, Activity } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageStructuredData } from "@/components/PageStructuredData";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "@/lib/helmet-shim";
import { PageFAQ } from "@/components/PageFAQ";
import pvSystemImg from "@/assets/seo/pv-system-monitoring.jpg";
import pvModulesImg from "@/assets/seo/solar-panel-inspection.jpg";

const PVSystem = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Activity, title: t('softwarePage.pvSystem.f1.title'), description: t('softwarePage.pvSystem.f1.desc') },
    { icon: BarChart, title: t('softwarePage.pvSystem.f2.title'), description: t('softwarePage.pvSystem.f2.desc') },
    { icon: Sun, title: t('softwarePage.pvSystem.f3.title'), description: t('softwarePage.pvSystem.f3.desc') },
    { icon: Globe, title: t('softwarePage.pvSystem.f4.title'), description: t('softwarePage.pvSystem.f4.desc') },
    { icon: Database, title: t('softwarePage.pvSystem.f5.title'), description: t('softwarePage.pvSystem.f5.desc') },
    { icon: FileText, title: t('softwarePage.pvSystem.f6.title'), description: t('softwarePage.pvSystem.f6.desc') },
  ];

  const matrixRows = [1, 2, 3, 4].map(i => ({
    func: t(`softwarePage.pvSystem.matrix.r${i}.func`),
    item: t(`softwarePage.pvSystem.matrix.r${i}.item`),
    value: t(`softwarePage.pvSystem.matrix.r${i}.value`),
  }));

  const roiStats = [1, 2, 3, 4].map(i => ({
    value: t(`softwarePage.pvSystem.roi.s${i}.value`),
    label: t(`softwarePage.pvSystem.roi.s${i}.label`),
    desc: t(`softwarePage.pvSystem.roi.s${i}.desc`),
  }));

  const modules = [
    t('softwarePage.pvSystem.m1'),
    t('softwarePage.pvSystem.m2'),
    t('softwarePage.pvSystem.m3'),
    t('softwarePage.pvSystem.m4'),
    t('softwarePage.pvSystem.m5'),
    t('softwarePage.pvSystem.m6'),
  ];

  const faqItems = [1, 2, 3, 4].map(i => ({
    questionKey: `softwarePage.pvSystem.faq.q${i}`,
    answerKey: `softwarePage.pvSystem.faq.a${i}`,
  }));

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('softwarePage.pvSystem.seo.title')}
        description={t('softwarePage.pvSystem.seo.desc')}
        keywords={t('softwarePage.pvSystem.seo.keywords')}
        path="/software/pv-system"
      />
      <PageStructuredData data={{ type: 'SoftwareApplication', name: 'CANI PV System Smart Monitoring Platform', description: t('softwarePage.pvSystem.seo.desc'), category: 'BusinessApplication' }} />

      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "CANI PV System Smart Monitoring Platform",
          "url": "https://caniuav.com/software/pv-system",
          "operatingSystem": "Cloud-based, Web, Android, iOS",
          "applicationCategory": "BusinessApplication",
          "description": "Enterprise-grade PV system monitoring platform with AI energy flow analysis, real-time Performance Ratio tracking, intelligent fault diagnosis, and IEC-compliant reporting for global multi-site solar asset management.",
          "featureList": "AI real-time energy flow analysis, Performance Ratio (PR) optimization, Inverter efficiency monitoring, String mismatch diagnosis, Digital twin modeling, IEC 61724 compliance reporting, Multi-site unified management, Weather-corrected performance assessment",
          "offers": {
            "@type": "Offer",
            "description": "Enterprise software demo available",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "96"
          }
        })}</script>
      </Helmet>

      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero with GEO Quick Answer */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${pvSystemImg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('softwarePage.pvSystem.title')}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                {t('softwarePage.pvSystem.hero')}
              </p>
              <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-primary-foreground/80 mb-1">
                  {t('softwarePage.pvSystem.geo.question')}
                </p>
                <p className="text-sm text-primary-foreground/70">
                  {t('softwarePage.pvSystem.geo.answer')}
                </p>
              </div>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {t('softwarePage.pvSystem.btn')}
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
              {t('softwarePage.pvSystem.roi.title')}
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
              {t('softwarePage.pvSystem.features.title')}
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

        {/* Asset Value Matrix */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              {t('softwarePage.pvSystem.matrix.title')}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-card rounded-xl shadow-card overflow-hidden">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="py-4 px-6 text-left font-semibold">{t('softwarePage.pvSystem.matrix.col1')}</th>
                    <th className="py-4 px-6 text-left font-semibold">{t('softwarePage.pvSystem.matrix.col2')}</th>
                    <th className="py-4 px-6 text-left font-semibold">{t('softwarePage.pvSystem.matrix.col3')}</th>
                  </tr>
                </thead>
                <tbody>
                  {matrixRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-muted/30'}>
                      <td className="py-4 px-6 font-medium text-card-foreground">{row.func}</td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">{row.item}</td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">{row.value}</td>
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
                  {t('softwarePage.pvSystem.modules.title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('softwarePage.pvSystem.modules.desc')}
                </p>
                <ul className="space-y-3">
                  {modules.map((module, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground text-sm">{module}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src={pvModulesImg}
                  alt="Solar farm PV system monitoring platform digital twin dashboard"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-secondary">
          <div className="container-custom max-w-4xl">
            <PageFAQ
              titleKey="softwarePage.pvSystem.faq.title"
              items={faqItems}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t('softwarePage.pvSystem.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('softwarePage.pvSystem.cta.subtitle')}
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                {t('softwarePage.common.contactUs')}
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

export default PVSystem;
