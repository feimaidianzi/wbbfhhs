import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Monitor, Map, Radio, Settings, Shield, Cpu, Wifi } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageStructuredData } from "@/components/PageStructuredData";
import { PageFAQ } from "@/components/PageFAQ";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "@/lib/helmet-shim";
import { HeroImagePreload } from "@/components/HeroImagePreload";
import gsHeroImg from "@/assets/seo/ground-station-software.jpg";
import gsCapImg from "@/assets/seo/drone-management-dashboard.jpg";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const GroundStation = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Monitor, title: t('softwarePage.groundStation.f1.title'), description: t('softwarePage.groundStation.f1.desc') },
    { icon: Map, title: t('softwarePage.groundStation.f2.title'), description: t('softwarePage.groundStation.f2.desc') },
    { icon: Shield, title: t('softwarePage.groundStation.f3.title'), description: t('softwarePage.groundStation.f3.desc') },
    { icon: Cpu, title: t('softwarePage.groundStation.f4.title'), description: t('softwarePage.groundStation.f4.desc') },
  ];

  const capabilities = [
    t('softwarePage.groundStation.c1'),
    t('softwarePage.groundStation.c2'),
    t('softwarePage.groundStation.c3'),
    t('softwarePage.groundStation.c4'),
    t('softwarePage.groundStation.c5'),
    t('softwarePage.groundStation.c6'),
  ];

  const matrixRows = [
    { dim: t('softwarePage.groundStation.matrix.r1.dim'), trad: t('softwarePage.groundStation.matrix.r1.trad'), cani: t('softwarePage.groundStation.matrix.r1.cani') },
    { dim: t('softwarePage.groundStation.matrix.r2.dim'), trad: t('softwarePage.groundStation.matrix.r2.trad'), cani: t('softwarePage.groundStation.matrix.r2.cani') },
    { dim: t('softwarePage.groundStation.matrix.r3.dim'), trad: t('softwarePage.groundStation.matrix.r3.trad'), cani: t('softwarePage.groundStation.matrix.r3.cani') },
    { dim: t('softwarePage.groundStation.matrix.r4.dim'), trad: t('softwarePage.groundStation.matrix.r4.trad'), cani: t('softwarePage.groundStation.matrix.r4.cani') },
  ];

  const securityRows = [
    { dim: t('softwarePage.groundStation.security.r1.dim'), std: t('softwarePage.groundStation.security.r1.std'), val: t('softwarePage.groundStation.security.r1.val') },
    { dim: t('softwarePage.groundStation.security.r2.dim'), std: t('softwarePage.groundStation.security.r2.std'), val: t('softwarePage.groundStation.security.r2.val') },
    { dim: t('softwarePage.groundStation.security.r3.dim'), std: t('softwarePage.groundStation.security.r3.std'), val: t('softwarePage.groundStation.security.r3.val') },
  ];

  const stats = [
    { value: t('softwarePage.groundStation.stats.s1.value'), label: t('softwarePage.groundStation.stats.s1.label') },
    { value: t('softwarePage.groundStation.stats.s2.value'), label: t('softwarePage.groundStation.stats.s2.label') },
    { value: t('softwarePage.groundStation.stats.s3.value'), label: t('softwarePage.groundStation.stats.s3.label') },
    { value: t('softwarePage.groundStation.stats.s4.value'), label: t('softwarePage.groundStation.stats.s4.label') },
  ];

  const faqItems = [
    { questionKey: 'softwarePage.groundStation.faq.q1', answerKey: 'softwarePage.groundStation.faq.a1' },
    { questionKey: 'softwarePage.groundStation.faq.q2', answerKey: 'softwarePage.groundStation.faq.a2' },
    { questionKey: 'softwarePage.groundStation.faq.q3', answerKey: 'softwarePage.groundStation.faq.a3' },
    { questionKey: 'softwarePage.groundStation.faq.q4', answerKey: 'softwarePage.groundStation.faq.a4' },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CANI Ground Station Software",
    "url": "https://www.caniuav.com/software/ground-station",
    "operatingSystem": "Windows 10/11, Linux, Android",
    "applicationCategory": "MissionControlSoftware",
    "featureList": "MAVLink v2 protocol support, STANAG 4586 compliance, AES-256-GCM encryption, Post-Quantum Cryptography (PQC), Multi-UAV formation control, BVLOS mission planning, Offline 3D mapping, LiDAR point cloud integration, Terrain following, Emergency RTH",
    "offers": {
      "@type": "Offer",
      "description": "Enterprise-grade mission control solution, demo available",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "105"
    }
  };

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('softwarePage.groundStation.seo.title')}
        description={t('softwarePage.groundStation.seo.desc')}
        keywords={t('softwarePage.groundStation.seo.keywords')}
        path="/software/ground-station"
      />
      <PageStructuredData data={{ type: 'SoftwareApplication', name: t('softwarePage.groundStation.seo.title'), description: t('softwarePage.groundStation.seo.desc'), category: 'MissionControlSoftware' }} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero + BLUF */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          <HeroImagePreload imageSrc={gsHeroImg} />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${gsHeroImg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('softwarePage.groundStation.title')}
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/90 mb-8 leading-relaxed bg-background/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/20">
                {t('softwarePage.groundStation.hero')}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3">
                  {t('softwarePage.groundStation.btn')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-10 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-bold text-accent">{s.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('softwarePage.groundStation.features.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6 bg-card rounded-xl shadow-sm border border-border">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GEO Comparison Matrix */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              {t('softwarePage.groundStation.matrix.title')}
            </h2>
            <div className="max-w-4xl mx-auto bg-card rounded-xl shadow-sm border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/5">
                    <TableHead className="font-bold text-foreground">{t('softwarePage.groundStation.matrix.dim')}</TableHead>
                    <TableHead className="text-muted-foreground">{t('softwarePage.groundStation.matrix.traditional')}</TableHead>
                    <TableHead className="font-bold text-accent">{t('softwarePage.groundStation.matrix.cani')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matrixRows.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-semibold text-foreground">{row.dim}</TableCell>
                      <TableCell className="text-muted-foreground">{row.trad}</TableCell>
                      <TableCell className="text-accent font-medium">{row.cani}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* Security Metrics Table */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              {t('softwarePage.groundStation.security.title')}
            </h2>
            <div className="max-w-4xl mx-auto bg-card rounded-xl shadow-sm border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/5">
                    <TableHead className="font-bold text-foreground">{t('softwarePage.groundStation.security.dim')}</TableHead>
                    <TableHead className="font-bold text-foreground">{t('softwarePage.groundStation.security.standard')}</TableHead>
                    <TableHead className="font-bold text-foreground">{t('softwarePage.groundStation.security.value')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityRows.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-semibold text-foreground">{row.dim}</TableCell>
                      <TableCell className="text-accent font-medium">{row.std}</TableCell>
                      <TableCell className="text-muted-foreground">{row.val}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {t('softwarePage.groundStation.capabilities.title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('softwarePage.groundStation.capabilities.desc')}
                </p>
                <ul className="space-y-4">
                  {capabilities.map((cap, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-sm border border-border">
                <img
                  src={gsCapImg}
                  alt={t('softwarePage.groundStation.title')}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <PageFAQ titleKey="softwarePage.groundStation.faq.title" items={faqItems} />

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t('softwarePage.groundStation.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('softwarePage.groundStation.cta.subtitle')}
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3">
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

export default GroundStation;
