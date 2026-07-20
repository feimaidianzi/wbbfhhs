import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Users, Cpu, Network, Zap } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageStructuredData } from "@/components/PageStructuredData";
import { PageFAQ } from "@/components/PageFAQ";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "@/lib/helmet-shim";
import swarmHeroImg from "@/assets/seo/swarm-drone-formation.jpg";
import swarmCapImg from "@/assets/seo/drone-light-show-night.jpg";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const SwarmGroundStation = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Cpu, title: t('softwarePage.swarm.f1.title'), description: t('softwarePage.swarm.f1.desc') },
    { icon: Users, title: t('softwarePage.swarm.f2.title'), description: t('softwarePage.swarm.f2.desc') },
    { icon: Network, title: t('softwarePage.swarm.f3.title'), description: t('softwarePage.swarm.f3.desc') },
    { icon: Zap, title: t('softwarePage.swarm.f4.title'), description: t('softwarePage.swarm.f4.desc') },
  ];

  const capabilities = [
    t('softwarePage.swarm.c1'),
    t('softwarePage.swarm.c2'),
    t('softwarePage.swarm.c3'),
    t('softwarePage.swarm.c4'),
    t('softwarePage.swarm.c5'),
    t('softwarePage.swarm.c6'),
  ];

  const matrixRows = [
    { dim: t('softwarePage.swarm.matrix.r1.dim'), trad: t('softwarePage.swarm.matrix.r1.trad'), cani: t('softwarePage.swarm.matrix.r1.cani') },
    { dim: t('softwarePage.swarm.matrix.r2.dim'), trad: t('softwarePage.swarm.matrix.r2.trad'), cani: t('softwarePage.swarm.matrix.r2.cani') },
    { dim: t('softwarePage.swarm.matrix.r3.dim'), trad: t('softwarePage.swarm.matrix.r3.trad'), cani: t('softwarePage.swarm.matrix.r3.cani') },
    { dim: t('softwarePage.swarm.matrix.r4.dim'), trad: t('softwarePage.swarm.matrix.r4.trad'), cani: t('softwarePage.swarm.matrix.r4.cani') },
  ];

  const stats = [
    { value: t('softwarePage.swarm.stats.s1.value'), label: t('softwarePage.swarm.stats.s1.label') },
    { value: t('softwarePage.swarm.stats.s2.value'), label: t('softwarePage.swarm.stats.s2.label') },
    { value: t('softwarePage.swarm.stats.s3.value'), label: t('softwarePage.swarm.stats.s3.label') },
    { value: t('softwarePage.swarm.stats.s4.value'), label: t('softwarePage.swarm.stats.s4.label') },
  ];

  const faqItems = [
    { questionKey: 'softwarePage.swarm.faq.q1', answerKey: 'softwarePage.swarm.faq.a1' },
    { questionKey: 'softwarePage.swarm.faq.q2', answerKey: 'softwarePage.swarm.faq.a2' },
    { questionKey: 'softwarePage.swarm.faq.q3', answerKey: 'softwarePage.swarm.faq.a3' },
    { questionKey: 'softwarePage.swarm.faq.q4', answerKey: 'softwarePage.swarm.faq.a4' },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CANI Swarm Drone Ground Station",
    "url": "https://caniuav.com/software/swarm-ground-station",
    "operatingSystem": "Linux (Ubuntu), Windows 10/11, Android",
    "applicationCategory": "SwarmControlSoftware",
    "featureList": "sMatrix edge computing, AI autonomous swarm coordination, 50+ UAV formation control, Auto-succession system, STANAG 4586 compliance, Mesh self-organizing network, GNSS-denied navigation, Dynamic mission replanning, Millisecond synchronization matrix, Choreography animation design",
    "offers": {
      "@type": "Offer",
      "description": "Custom R&D and Enterprise Swarm Solution, demo available",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "42"
    }
  };

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('softwarePage.swarm.seo.title')}
        description={t('softwarePage.swarm.seo.desc')}
        keywords={t('softwarePage.swarm.seo.keywords')}
        path="/software/swarm-ground-station"
      />
      <PageStructuredData data={{ type: 'SoftwareApplication', name: t('softwarePage.swarm.seo.title'), description: t('softwarePage.swarm.seo.desc'), category: 'SwarmControlSoftware' }} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero + BLUF */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${swarmHeroImg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('softwarePage.swarm.title')}
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/90 mb-8 leading-relaxed bg-background/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/20">
                {t('softwarePage.swarm.hero')}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3">
                  {t('softwarePage.swarm.btn')}
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
              {t('softwarePage.swarm.features.title')}
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
              {t('softwarePage.swarm.matrix.title')}
            </h2>
            <div className="max-w-4xl mx-auto bg-card rounded-xl shadow-sm border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/5">
                    <TableHead className="font-bold text-foreground">{t('softwarePage.swarm.matrix.dim')}</TableHead>
                    <TableHead className="text-muted-foreground">{t('softwarePage.swarm.matrix.traditional')}</TableHead>
                    <TableHead className="font-bold text-accent">{t('softwarePage.swarm.matrix.cani')}</TableHead>
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

        {/* Capabilities */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-video rounded-xl overflow-hidden shadow-sm border border-border">
                <img
                  src={swarmCapImg}
                  alt={t('softwarePage.swarm.title')}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {t('softwarePage.swarm.capabilities.title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('softwarePage.swarm.capabilities.desc')}
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
            </div>
          </div>
        </section>

        {/* FAQ */}
        <PageFAQ titleKey="softwarePage.swarm.faq.title" items={faqItems} />

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t('softwarePage.swarm.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('softwarePage.swarm.cta.subtitle')}
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

export default SwarmGroundStation;
