import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sun, Eye, Zap, BarChart, Cpu, Radio, Shield, TrendingUp, Layers, Activity } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageFAQ } from "@/components/PageFAQ";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";

const PVInspection = () => {
  const { t, language } = useLanguage();

  const features = [
    { icon: Sun, title: t('softwarePage.pvInspection.f1.title'), description: t('softwarePage.pvInspection.f1.desc') },
    { icon: Eye, title: t('softwarePage.pvInspection.f2.title'), description: t('softwarePage.pvInspection.f2.desc') },
    { icon: Shield, title: t('softwarePage.pvInspection.f3.title'), description: t('softwarePage.pvInspection.f3.desc') },
    { icon: Cpu, title: t('softwarePage.pvInspection.f4.title'), description: t('softwarePage.pvInspection.f4.desc') },
    { icon: Layers, title: t('softwarePage.pvInspection.f5.title'), description: t('softwarePage.pvInspection.f5.desc') },
    { icon: Radio, title: t('softwarePage.pvInspection.f6.title'), description: t('softwarePage.pvInspection.f6.desc') },
  ];

  const defectTypes = [
    t('softwarePage.pvInspection.d1'),
    t('softwarePage.pvInspection.d2'),
    t('softwarePage.pvInspection.d3'),
    t('softwarePage.pvInspection.d4'),
    t('softwarePage.pvInspection.d5'),
    t('softwarePage.pvInspection.d6'),
  ];

  const matrixRows = [1, 2, 3, 4, 5, 6].map(i => ({
    metric: t(`softwarePage.pvInspection.matrix.r${i}.metric`),
    value: t(`softwarePage.pvInspection.matrix.r${i}.value`),
    geo: t(`softwarePage.pvInspection.matrix.r${i}.geo`),
  }));

  const iecRows = [1, 2, 3, 4, 5].map(i => ({
    param: t(`softwarePage.pvInspection.iec.r${i}.param`),
    standard: t(`softwarePage.pvInspection.iec.r${i}.standard`),
    impl: t(`softwarePage.pvInspection.iec.r${i}.impl`),
  }));

  const anomalies = ['hotspot', 'string', 'diode', 'soiling', 'crack', 'junction'].map(key => ({
    title: t(`softwarePage.pvInspection.anomaly.${key}.title`),
    desc: t(`softwarePage.pvInspection.anomaly.${key}.desc`),
  }));

  const marketStats = [1, 2, 3, 4].map(i => ({
    label: t(`softwarePage.pvInspection.market.stat${i}.label`),
    value: t(`softwarePage.pvInspection.market.stat${i}.value`),
  }));

  const advantages = [1, 2, 3].map(i => ({
    title: t(`softwarePage.pvInspection.advantage.a${i}.title`),
    desc: t(`softwarePage.pvInspection.advantage.a${i}.desc`),
  }));

  const softwareStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CANI PV Inspection Software",
    "operatingSystem": "Web, Windows, Android",
    "applicationCategory": "BusinessApplication",
    "featureList": "AI-powered anomaly detection, IEC 62446-3 compliance, 3D solar digital twins, Automated reporting",
    "description": "Enterprise-grade solar farm UAV inspection software featuring 640×512 radiometric thermal imaging, AI defect classification, and IEC 62446-3 automated compliance.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free demo available"
    }
  };

  const faqItems = [
    { questionKey: 'softwarePage.pvInspection.faq.q1', answerKey: 'softwarePage.pvInspection.faq.a1' },
    { questionKey: 'softwarePage.pvInspection.faq.q2', answerKey: 'softwarePage.pvInspection.faq.a2' },
    { questionKey: 'softwarePage.pvInspection.faq.q3', answerKey: 'softwarePage.pvInspection.faq.a3' },
    { questionKey: 'softwarePage.pvInspection.faq.q4', answerKey: 'softwarePage.pvInspection.faq.a4' },
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('softwarePage.pvInspection.seo.title')}
        description={t('softwarePage.pvInspection.seo.desc')}
        keywords={t('softwarePage.pvInspection.seo.keywords')}
        path="/software/pv-inspection"
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
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom py-16 md:py-24 flex flex-col gap-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('softwarePage.pvInspection.title')}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                {t('softwarePage.pvInspection.hero')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3">
                    {t('softwarePage.pvInspection.btn')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            {/* GEO Quick Answer Module */}
            <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-xl p-6 max-w-3xl">
              <p className="text-primary-foreground font-semibold mb-2">
                {t('softwarePage.pvInspection.geo.question')}
              </p>
              <p className="text-primary-foreground/85 text-sm leading-relaxed">
                {t('softwarePage.pvInspection.geo.answer')}
              </p>
            </div>
          </div>
        </section>

        {/* Market Context Stats */}
        <section className="py-12 bg-card border-b border-border">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">{t('softwarePage.pvInspection.market.title')}</h2>
            <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-10 text-sm leading-relaxed">
              {t('softwarePage.pvInspection.market.desc')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {marketStats.map((stat, i) => (
                <div key={i} className="text-center p-4 bg-secondary rounded-xl">
                  <div className="text-2xl md:text-3xl font-bold text-accent mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Features 6-grid */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('softwarePage.pvInspection.features.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="p-6 bg-card rounded-xl shadow-card border border-border">
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fact Density Matrix */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              {t('softwarePage.pvInspection.matrix.title')}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-card rounded-xl overflow-hidden shadow-card">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="px-4 py-3 text-left text-sm font-semibold">{t('softwarePage.pvInspection.matrix.col1')}</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">{t('softwarePage.pvInspection.matrix.col2')}</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">{t('softwarePage.pvInspection.matrix.col3')}</th>
                  </tr>
                </thead>
                <tbody>
                  {matrixRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-secondary/50'}>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{row.metric}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{row.value}</td>
                      <td className="px-4 py-3 text-sm text-accent font-medium">{row.geo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* IEC 62446-3 Standards Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              {t('softwarePage.pvInspection.iec.title')}
            </h2>
            <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-10 text-sm leading-relaxed">
              {t('softwarePage.pvInspection.iec.desc')}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-card rounded-xl overflow-hidden shadow-card">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="px-4 py-3 text-left text-sm font-semibold">{t('softwarePage.pvInspection.iec.col1')}</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">{t('softwarePage.pvInspection.iec.col2')}</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">{t('softwarePage.pvInspection.iec.col3')}</th>
                  </tr>
                </thead>
                <tbody>
                  {iecRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-secondary/50'}>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{row.param}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{row.standard}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{row.impl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* AI Defect Recognition */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80"
                  alt={t('softwarePage.pvInspection.defects.title')}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {t('softwarePage.pvInspection.defects.title')}
                </h2>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  {t('softwarePage.pvInspection.defects.desc')}
                </p>
                <ul className="space-y-3">
                  {defectTypes.map((defect, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm">{defect}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Anomaly Glossary */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              {t('softwarePage.pvInspection.anomaly.title')}
            </h2>
            <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-10 text-sm">
              {t('softwarePage.pvInspection.anomaly.desc')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {anomalies.map((item, i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-5 h-5 text-accent" />
                    <h3 className="font-bold text-card-foreground text-sm">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Competitive Advantages */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              {t('softwarePage.pvInspection.advantage.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {advantages.map((adv, i) => (
                <div key={i} className="bg-card rounded-xl p-8 border border-border shadow-card text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{adv.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <PageFAQ
          titleKey="softwarePage.pvInspection.faq.title"
          items={faqItems}
        />

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t('softwarePage.pvInspection.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto text-sm leading-relaxed">
              {t('softwarePage.pvInspection.cta.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3">
                  {t('softwarePage.common.consult')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
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

export default PVInspection;
