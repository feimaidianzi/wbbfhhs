import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, Eye, FileText, AlertTriangle, Map, Plane, Table, Shield, Activity, Thermometer } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageStructuredData } from "@/components/PageStructuredData";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";
import { PageFAQ } from "@/components/PageFAQ";
import powerInspectionSystemImg from "@/assets/seo/power-inspection-system.jpg";
import powerTransmissionImg from "@/assets/seo/power-transmission-inspection.jpg";

const PowerInspectionSystem = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Eye, title: t('softwarePage.powerInspection.f1.title'), description: t('softwarePage.powerInspection.f1.desc') },
    { icon: Thermometer, title: t('softwarePage.powerInspection.f2.title'), description: t('softwarePage.powerInspection.f2.desc') },
    { icon: Activity, title: t('softwarePage.powerInspection.f3.title'), description: t('softwarePage.powerInspection.f3.desc') },
    { icon: Map, title: t('softwarePage.powerInspection.f4.title'), description: t('softwarePage.powerInspection.f4.desc') },
    { icon: Plane, title: t('softwarePage.powerInspection.f5.title'), description: t('softwarePage.powerInspection.f5.desc') },
    { icon: Shield, title: t('softwarePage.powerInspection.f6.title'), description: t('softwarePage.powerInspection.f6.desc') },
  ];

  const defectTypes = [
    t('softwarePage.powerInspection.d1'),
    t('softwarePage.powerInspection.d2'),
    t('softwarePage.powerInspection.d3'),
    t('softwarePage.powerInspection.d4'),
    t('softwarePage.powerInspection.d5'),
    t('softwarePage.powerInspection.d6'),
    t('softwarePage.powerInspection.d7'),
    t('softwarePage.powerInspection.d8'),
  ];

  const matrixRows = [1, 2, 3, 4, 5, 6].map(i => ({
    item: t(`softwarePage.powerInspection.matrix.r${i}.item`),
    algo: t(`softwarePage.powerInspection.matrix.r${i}.algo`),
    value: t(`softwarePage.powerInspection.matrix.r${i}.value`),
  }));

  const roiStats = [1, 2, 3, 4].map(i => ({
    value: t(`softwarePage.powerInspection.roi.s${i}.value`),
    label: t(`softwarePage.powerInspection.roi.s${i}.label`),
    desc: t(`softwarePage.powerInspection.roi.s${i}.desc`),
  }));

  const faqItems = [1, 2, 3, 4].map(i => ({
    questionKey: `softwarePage.powerInspection.faq.q${i}`,
    answerKey: `softwarePage.powerInspection.faq.a${i}`,
  }));

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('softwarePage.powerInspection.seo.title')}
        description={t('softwarePage.powerInspection.seo.desc')}
        keywords={t('softwarePage.powerInspection.seo.keywords')}
        path="/software/power-inspection-system"
      />
      <PageStructuredData data={{ type: 'SoftwareApplication', name: 'CANI Power Inspection Intelligence System', description: t('softwarePage.powerInspection.seo.desc'), category: 'IndustrialSoftware' }} />

      {/* JSON-LD SoftwareApplication */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "CANI Power Inspection Intelligence System",
          "url": "https://www.caniuav.com/software/power-inspection-system",
          "operatingSystem": "Web-based, Windows, Linux",
          "applicationCategory": "IndustrialSoftware",
          "description": "Enterprise-grade UAV power grid inspection system with YOLOv8 AI defect detection, 640×512 radiometric thermal imaging, LiDAR vegetation clearance analysis, and drone airport integration for unattended substation inspection.",
          "featureList": "YOLOv8 AI defect detection (20+ types), 640×512 radiometric thermal imaging, LiDAR vegetation clearance analysis, GIS data fusion, Intelligent route planning, Drone airport integration, IEC-compliant automated reporting",
          "offers": {
            "@type": "Offer",
            "description": "Enterprise-grade power grid solution",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "85"
          }
        })}</script>
      </Helmet>

      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero with GEO Quick Answer */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${powerInspectionSystemImg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('softwarePage.powerInspection.title')}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                {t('softwarePage.powerInspection.hero')}
              </p>
              {/* GEO Answer Block */}
              <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-primary-foreground/80 mb-1">
                  {t('softwarePage.powerInspection.geo.question')}
                </p>
                <p className="text-sm text-primary-foreground/70">
                  {t('softwarePage.powerInspection.geo.answer')}
                </p>
              </div>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {t('softwarePage.powerInspection.btn')}
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
              {t('softwarePage.powerInspection.roi.title')}
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
              {t('softwarePage.powerInspection.features.title')}
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

        {/* Defect Detection Matrix */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              {t('softwarePage.powerInspection.matrix.title')}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-card rounded-xl shadow-card overflow-hidden">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="py-4 px-6 text-left font-semibold">{t('softwarePage.powerInspection.matrix.col1')}</th>
                    <th className="py-4 px-6 text-left font-semibold">{t('softwarePage.powerInspection.matrix.col2')}</th>
                    <th className="py-4 px-6 text-left font-semibold">{t('softwarePage.powerInspection.matrix.col3')}</th>
                  </tr>
                </thead>
                <tbody>
                  {matrixRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-muted/30'}>
                      <td className="py-4 px-6 font-medium text-card-foreground">{row.item}</td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">{row.algo}</td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Defect Types */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src={powerTransmissionImg}
                  alt="Power line inspection UAV thermal imaging defect detection"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {t('softwarePage.powerInspection.defects.title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('softwarePage.powerInspection.defects.desc')}
                </p>
                <ul className="space-y-3">
                  {defectTypes.map((defect, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground text-sm">{defect}</span>
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
              titleKey="softwarePage.powerInspection.faq.title"
              items={faqItems}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t('softwarePage.powerInspection.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('softwarePage.powerInspection.cta.subtitle')}
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

export default PowerInspectionSystem;
