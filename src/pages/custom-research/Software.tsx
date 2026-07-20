import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Mail, Monitor, Code, Map, Database, Cloud, Cpu, Settings, FileText, Layers, ZoomIn, X } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { useState } from "react";
import caseCommandCenter from "@/assets/cases/software-command-center.jpg";
import caseDispatch from "@/assets/cases/software-dispatch.jpg";
import caseRoutePlanning from "@/assets/cases/software-route-planning.jpg";
import caseWaypoint from "@/assets/cases/software-waypoint.jpg";
import caseLivestream from "@/assets/cases/software-livestream.jpg";
import caseDataMgmt from "@/assets/cases/software-data-mgmt.jpg";
import caseTaskCenter from "@/assets/cases/software-task-center.jpg";
import caseAlertMgmt from "@/assets/cases/software-alert-mgmt.jpg";
import caseDeviceMgmt from "@/assets/cases/software-device-mgmt.jpg";
import caseAirportMgmt from "@/assets/cases/software-airport-mgmt.jpg";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageStructuredData } from "@/components/PageStructuredData";
import softwareCustomHeroImg from "@/assets/seo/custom-software-dev.jpg";
import { PageFAQ } from "@/components/PageFAQ";
import { Helmet } from "@/lib/helmet-shim";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const SoftwareCustom = () => {
  const { t } = useLanguage();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CANI UAV GCS",
    "operatingSystem": "Windows, Linux, Android",
    "applicationCategory": "IndustrialSoftware",
    "provider": {
      "@type": "Organization",
      "name": "CANI Technology",
      "url": "https://caniuav.com"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "description": "专业定制化 R&D 服务及软件许可"
    },
    "featureList": "任务规划, 自动化航线, MAVLink协议, 边缘AI识别, 低延迟图传控制",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "156"
    }
  };

  const matrixRows = [
    { feature: t('customSoftware.matrix.r1.feature'), desc: t('customSoftware.matrix.r1.desc'), benefit: t('customSoftware.matrix.r1.benefit') },
    { feature: t('customSoftware.matrix.r2.feature'), desc: t('customSoftware.matrix.r2.desc'), benefit: t('customSoftware.matrix.r2.benefit') },
    { feature: t('customSoftware.matrix.r3.feature'), desc: t('customSoftware.matrix.r3.desc'), benefit: t('customSoftware.matrix.r3.benefit') },
  ];

  const cases = [
    { clientKey: 'customSoftware.cases.power.client', titleKey: 'customSoftware.cases.power.title', descKey: 'customSoftware.cases.power.desc' },
    { clientKey: 'customSoftware.cases.agriculture.client', titleKey: 'customSoftware.cases.agriculture.title', descKey: 'customSoftware.cases.agriculture.desc' },
    { clientKey: 'customSoftware.cases.survey.client', titleKey: 'customSoftware.cases.survey.title', descKey: 'customSoftware.cases.survey.desc' },
  ];

  const caseScreenshots = [
    { image: caseCommandCenter, labelKey: 'customSoftware.cases.screen.commandCenter' },
    { image: caseDispatch, labelKey: 'customSoftware.cases.screen.dispatch' },
    { image: caseRoutePlanning, labelKey: 'customSoftware.cases.screen.routePlanning' },
    { image: caseWaypoint, labelKey: 'customSoftware.cases.screen.waypoint' },
    { image: caseLivestream, labelKey: 'customSoftware.cases.screen.livestream' },
    { image: caseDataMgmt, labelKey: 'customSoftware.cases.screen.dataMgmt' },
    { image: caseTaskCenter, labelKey: 'customSoftware.cases.screen.taskCenter' },
    { image: caseAlertMgmt, labelKey: 'customSoftware.cases.screen.alertMgmt' },
    { image: caseDeviceMgmt, labelKey: 'customSoftware.cases.screen.deviceMgmt' },
    { image: caseAirportMgmt, labelKey: 'customSoftware.cases.screen.airportMgmt' },
  ];

  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const faqItems = [
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('customSoftware.seo.title')}
        description={t('customSoftware.seo.desc')}
        keywords={t('customSoftware.seo.keywords')}
        path="/custom-research/software"
      />
      <PageStructuredData data={{ type: 'SoftwareApplication', name: t('customSoftware.seo.title'), description: t('customSoftware.seo.desc'), category: 'IndustrialSoftware' }} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="bg-secondary py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">{t('customSoftware.breadcrumb.home')}</Link>
              <span>/</span>
              <Link to="/custom-research" className="hover:text-accent">{t('customSoftware.breadcrumb.custom')}</Link>
              <span>/</span>
              <span className="text-foreground">{t('customSoftware.breadcrumb.software')}</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${softwareCustomHeroImg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <BackButton to="/custom-research" label={t('customSoftware.back')} />
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('customSoftware.title')}
              </h1>
              <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
                {t('customSoftware.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                    {t('customSoftware.btn.consult')} <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a href="mailto:so_0307@qq.com">
                  <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-8 py-6 text-lg">
                    <Mail className="w-5 h-5 mr-2" /> {t('template.emailConsult')}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* BLUF */}
        <section className="py-12 bg-accent/5 border-b border-accent/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-card p-8 border-l-4 border-accent">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-accent">{t('customSoftware.bluf.title')}</h2>
              <p className="text-foreground leading-relaxed text-base md:text-lg">
                {t('customSoftware.bluf.content')}
              </p>
            </div>
          </div>
        </section>

        {/* GCS Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t('customSoftware.gcs.title')}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-3xl mx-auto">{t('customSoftware.gcs.insight')}</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Hardware Config */}
              <div className="bg-card rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-accent" />
                  </div>
                  {t('customSoftware.gcs.hw.title')}
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      {t('customSoftware.gcs.hw.sensor')}
                    </h4>
                    <p className="text-muted-foreground text-sm ml-6">{t('customSoftware.gcs.hw.sensor.desc')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      {t('customSoftware.gcs.hw.payload')}
                    </h4>
                    <p className="text-muted-foreground text-sm ml-6">{t('customSoftware.gcs.hw.payload.desc')}</p>
                  </div>
                </div>
              </div>

              {/* Automation */}
              <div className="bg-card rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Map className="w-5 h-5 text-accent" />
                  </div>
                  {t('customSoftware.gcs.auto.title')}
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      {t('customSoftware.gcs.auto.route')}
                    </h4>
                    <p className="text-muted-foreground text-sm ml-6">{t('customSoftware.gcs.auto.route.desc')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      {t('customSoftware.gcs.auto.dynamic')}
                    </h4>
                    <p className="text-muted-foreground text-sm ml-6">{t('customSoftware.gcs.auto.dynamic.desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Matrix */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t('customSoftware.matrix.title')}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-3xl mx-auto">{t('customSoftware.matrix.insight')}</p>
            <div className="max-w-5xl mx-auto bg-card rounded-xl shadow-sm border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/5">
                    <TableHead className="font-bold text-foreground">{t('customSoftware.matrix.col.feature')}</TableHead>
                    <TableHead className="font-bold text-foreground">{t('customSoftware.matrix.col.desc')}</TableHead>
                    <TableHead className="font-bold text-accent">{t('customSoftware.matrix.col.benefit')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matrixRows.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-semibold text-foreground">{row.feature}</TableCell>
                      <TableCell className="text-muted-foreground">{row.desc}</TableCell>
                      <TableCell className="text-accent font-medium">{row.benefit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* Data Analytics */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">{t('customSoftware.data.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-card p-8 rounded-2xl shadow-card">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                  <FileText className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('customSoftware.data.log')}</h3>
                <p className="text-muted-foreground">{t('customSoftware.data.log.desc')}</p>
              </div>
              <div className="bg-card p-8 rounded-2xl shadow-card">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                  <Layers className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('customSoftware.data.twin')}</h3>
                <p className="text-muted-foreground">{t('customSoftware.data.twin.desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Developer & OEM/ODM */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t('customSoftware.dev.title')}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-3xl mx-auto">{t('customSoftware.dev.insight')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-card p-8 rounded-2xl shadow-card">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                  <Code className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('customSoftware.dev.sdk')}</h3>
                <p className="text-muted-foreground">{t('customSoftware.dev.sdk.desc')}</p>
              </div>
              <div className="bg-card p-8 rounded-2xl shadow-card">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                  <Monitor className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('customSoftware.dev.cross')}</h3>
                <p className="text-muted-foreground">{t('customSoftware.dev.cross.desc')}</p>
              </div>
              <div className="bg-card p-8 rounded-2xl shadow-card">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                  <Cpu className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('customSoftware.dev.ui')}</h3>
                <p className="text-muted-foreground">{t('customSoftware.dev.ui.desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cases - Screenshot Gallery */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t('customSoftware.cases.title')}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">{t('customSoftware.cases.subtitle')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {caseScreenshots.map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-card rounded-xl overflow-hidden shadow-card cursor-pointer border border-border hover:border-accent/50 transition-all duration-300"
                  onClick={() => setLightboxImg(item.image)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.image}
                      alt={t(item.labelKey)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-foreground text-center truncate">{t(item.labelKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {lightboxImg && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setLightboxImg(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-white"
              onClick={() => setLightboxImg(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={lightboxImg}
              alt="Case screenshot"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        )}

        {/* FAQ */}
        <PageFAQ titleKey="customSoftware.faq.title" items={faqItems} />

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t('customSoftware.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('customSoftware.cta.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg">
                  <Mail className="w-5 h-5 mr-2" /> {t('customSoftware.cta.consult')}
                </Button>
              </Link>
              <a href="mailto:so_0307@qq.com">
                <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-10 py-6 text-lg">
                  <Mail className="w-5 h-5 mr-2" /> so_0307@qq.com
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default SoftwareCustom;
