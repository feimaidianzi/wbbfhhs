import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "@/lib/helmet-shim";
import { LangLink as Link } from "@/components/LangLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import { Check, Radio, Zap, Shield, Cpu, Eye, Settings, ChevronRight, Target, Antenna, Layers, AlertTriangle } from "lucide-react";
import { getVrxProductById } from "@/data/vrxProducts";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageFAQ } from "@/components/PageFAQ";
import vrxPinout from "@/assets/vrx/vrx-5849-pinout.png";

const VrxDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getVrxProductById(productId) : null;
  const { t, language } = useLanguage();
  const isZh = language === 'zh';

  if (!product) {
    return <Navigate to="/products/accessories/vtx-vrx" replace />;
  }

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": `CANI LongLink ${product.model}`,
    "description": t('acc.vrxdetail.metaDesc'),
    "brand": { "@type": "Brand", "name": "CANI UAV" },
    "manufacturer": { "@type": "Organization", "name": "CANI长凌科技", "url": "https://www.caniuav.com" },
    "sku": product.model,
    "category": "Industrial Diversity Video Receiver",
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Frequency Range", "value": product.frequency },
      { "@type": "PropertyValue", "name": "Sensitivity", "value": product.sensitivity },
      { "@type": "PropertyValue", "name": "Architecture", "value": "Dual-Chip Diversity" },
      { "@type": "PropertyValue", "name": "Channels", "value": `${product.channels}CH (6 Bands + Raceband)` },
      { "@type": "PropertyValue", "name": "Demodulation", "value": "FM/PLL Dual-Path" },
      { "@type": "PropertyValue", "name": "Diversity Mode", "value": "Best-Signal Selection Algorithm" },
      { "@type": "PropertyValue", "name": "Power Consumption", "value": "≤200mA" },
      { "@type": "PropertyValue", "name": "Compatibility", "value": "Universal - All High-Power VTX (2.5W-25W)" },
    ],
    "offers": {
      "@type": "Offer",
      "url": `https://www.caniuav.com/products/accessories/vtx-vrx/vrx/${product.id}`,
      "availability": "https://schema.org/InStock"
    }
  };

  const faqItems = [
    {
      questionKey: t('acc.vrxdetail.k594'),
      answerKey: t('acc.vrxdetail.k595'),
    },
  ];

  const highlights = isZh ? product.highlightsZh : product.highlightsEn;

  return (
    <>
      <MultiLanguageSEO
        title={t('acc.vrxdetail.k596')}
        description={t('acc.vrxdetail.metaDesc')}
        path={`/products/accessories/vtx-vrx/vrx/${product.id}`}
        type="product"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background">
        <BackButton to="/products/accessories/vtx-vrx" />

        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-accent/10 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <img
                  src={product.image}
                  alt={`CANI ${product.model} dual-chip 5.8GHz diversity analog video receiver -96dBm high sensitivity ground station component`}
                  title={`CANI ${product.model} Industrial Dual-Chip Diversity VRX Module`}
                  className="w-full max-w-md mx-auto object-contain"
                  loading="eager"
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="px-3 py-1 text-sm bg-accent/20 text-accent-foreground rounded-full font-bold">DIVERSITY VRX</span>
                  <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">{product.sensitivity}</span>
                  <span className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full">{product.channels}CH</span>
                  <span className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full">{product.frequency}</span>
                  <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">{t('acc.vrxdetail.k597')}</span>
                  <span className="px-3 py-1 text-sm bg-accent text-accent-foreground rounded-full font-medium">Dual Chip</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {t('acc.vrxdetail.k598')}
                </h1>
                <p className="text-xl text-muted-foreground mb-4">{product.model}</p>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed border-l-2 border-accent pl-4">
                  {isZh ? product.descZh : product.descEn}
                </p>

                <div className="space-y-2 mb-8">
                  {highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button size="lg" asChild>
                    <Link to="/contact">{t('acc.canifmtdetail.k525')}</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#specs">{t('acc.canifmtdetail.k526')}</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Introduction */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">{t('acc.vrxdetail.introTitle')}</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t('acc.vrxdetail.introText')}
            </p>
            {/* Antenna Setup Recommendation */}
            <div className="bg-card rounded-xl border border-accent/30 p-6">
              <div className="flex items-start gap-3">
                <Antenna className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">{t('acc.vrxdetail.antennaSetup')}</h3>
                  <p className="text-sm text-muted-foreground">{t('acc.vrxdetail.antennaSetupText')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Layers */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t('acc.vrxdetail.k599')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">{t('acc.vrxdetail.k600')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('acc.vrxdetail.k601')}
                </p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Radio className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t('acc.vrxdetail.k602')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('acc.vrxdetail.k603')}
                </p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t('acc.vrxdetail.k604')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('acc.vrxdetail.k605')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section id="specs" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t('acc.vrxdetail.k606')}</h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-6 py-3 text-left font-semibold w-1/3">{t('acc.vrxdetail.k607')}</th>
                    <th className="px-6 py-3 text-left font-semibold">{t('acc.vrxdetail.k608')}</th>
                  </tr>
                </thead>
                <tbody>
                  {product.specs.map((spec, idx) => (
                    <tr key={idx} className={`border-b border-border ${spec.highlight ? 'bg-accent/5' : idx % 2 === 0 ? 'bg-background' : ''}`}>
                      <td className={`px-6 py-4 font-medium ${spec.highlight ? 'text-accent' : ''}`}>
                        {isZh ? spec.labelZh : spec.labelEn}
                      </td>
                      <td className={`px-6 py-4 ${spec.highlight ? 'font-bold text-accent' : ''}`}>
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pin Assignment */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t('acc.vrxdetail.k609')}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4 text-lg">{t('acc.vrxdetail.k610')}</h3>
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border">
                        <th className="px-4 py-2 text-center font-semibold w-20">PIN</th>
                        <th className="px-4 py-2 text-left font-semibold">{t('acc.vrxdetail.k611')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.pinDefinitions.map((p, idx) => (
                        <tr key={idx} className={`border-b border-border/50 ${
                          p.definition === 'GND' ? '' :
                          p.definition === '5V' ? 'bg-destructive/5' :
                          p.definition === 'VIDEO' || p.definition === 'AUDIO' ? 'bg-primary/5' :
                          p.definition === 'ANT' ? 'bg-accent/5' :
                          'bg-secondary/30'
                        }`}>
                          <td className="px-4 py-2 text-center font-mono font-bold">{p.pin}</td>
                          <td className="px-4 py-2 font-medium">{p.definition}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-lg">{t('acc.vrxdetail.k612')}</h3>
                <div className="bg-card rounded-xl border border-border overflow-hidden mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border">
                        <th className="px-4 py-2 text-center font-semibold w-20">PIN</th>
                        <th className="px-4 py-2 text-left font-semibold">{t('acc.vrxdetail.k611')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.machineModulePins.map((p, idx) => (
                        <tr key={idx} className={`border-b border-border/50 ${
                          p.definition === 'GND' ? '' :
                          p.definition === '5V' ? 'bg-destructive/5' :
                          p.definition === 'VIDEO' || p.definition === 'AUDIO' ? 'bg-primary/5' :
                          ''
                        }`}>
                          <td className="px-4 py-2 text-center font-mono font-bold">{p.pin}</td>
                          <td className="px-4 py-2 font-medium">{p.definition}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Frequency Table */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t('acc.vrxdetail.k613')}</h2>
            <div className="bg-card rounded-xl border border-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left font-semibold">{t('acc.vrxdetail.k614')}</th>
                    {[1,2,3,4,5,6,7,8].map(ch => (
                      <th key={ch} className="px-4 py-3 text-center font-semibold">CH{ch}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {product.frequencyTable.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                      <td className="px-4 py-2 font-medium font-mono">Band {row.band}</td>
                      {row.frequencies.map((freq, fi) => (
                        <td key={fi} className="px-4 py-2 text-center font-mono">{freq}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{t('acc.vrxdetail.k615')}</p>
          </div>
        </section>

        {/* Application Scenarios */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t('acc.vrxdetail.k616')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">{t('acc.vrxdetail.k617')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('acc.vrxdetail.k618')}
                </p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t('acc.vrxdetail.k619')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('acc.vrxdetail.k620')}
                </p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t('acc.vrxdetail.k621')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('acc.vrxdetail.k622')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Paired With */}
        <section className="py-16 bg-accent/5 border-y border-accent/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">{t('acc.vrxdetail.bestPairedTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Link to="/products/accessories/vtx-vrx/fv10w-a1" className="block p-5 bg-card rounded-xl border border-border hover:border-accent/50 transition-colors">
                <span className="text-xs font-bold text-accent">10W / 10,000mW</span>
                <p className="text-sm text-muted-foreground mt-2">{t('acc.vrxdetail.bestPaired10w')}</p>
              </Link>
              <Link to="/products/accessories/vtx-vrx/fv16w-a1" className="block p-5 bg-card rounded-xl border border-border hover:border-accent/50 transition-colors">
                <span className="text-xs font-bold text-accent">16W / 16,000mW</span>
                <p className="text-sm text-muted-foreground mt-2">{t('acc.vrxdetail.bestPaired16w')}</p>
              </Link>
              <Link to="/products/accessories/vtx-vrx/fv25w-a1" className="block p-5 bg-card rounded-xl border border-border hover:border-accent/50 transition-colors">
                <span className="text-xs font-bold text-destructive">25W / 25,000mW</span>
                <p className="text-sm text-muted-foreground mt-2">{t('acc.vrxdetail.bestPaired25w')}</p>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground italic border-l-2 border-accent pl-4">
              {t('acc.vrxdetail.bestPairedNote')}
            </p>
          </div>
        </section>

        {/* 50km+ Solution Brief */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">{t('acc.vrxdetail.solutionTitle')}</h2>
            <p className="text-muted-foreground mb-10">{t('acc.vrxdetail.solutionIntro')}</p>

            <div className="space-y-8">
              {/* Phase 1 */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-accent/20 text-accent font-bold text-sm flex items-center justify-center">1</span>
                  <h3 className="font-bold text-lg">{t('acc.vrxdetail.phase1Title')}</h3>
                </div>
                <p className="text-sm text-muted-foreground pl-11">{t('acc.vrxdetail.phase1Text')}</p>
              </div>

              {/* Phase 2 */}
              <div className="bg-card rounded-xl border border-accent/30 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-accent/20 text-accent font-bold text-sm flex items-center justify-center">2</span>
                  <h3 className="font-bold text-lg">{t('acc.vrxdetail.phase2Title')}</h3>
                </div>
                <p className="text-sm text-muted-foreground pl-11">{t('acc.vrxdetail.phase2Text')}</p>
              </div>

              {/* Phase 3 */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-accent/20 text-accent font-bold text-sm flex items-center justify-center">3</span>
                  <h3 className="font-bold text-lg">{t('acc.vrxdetail.phase3Title')}</h3>
                </div>
                <p className="text-sm text-muted-foreground pl-11">{t('acc.vrxdetail.phase3Text')}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground italic mt-8 border-l-2 border-primary pl-4">
              {t('acc.vrxdetail.solutionNote')}
            </p>

            <div className="mt-8 text-center">
              <Button size="lg" asChild>
                <Link to="/contact">{t('acc.vrxdetail.bundleCta')}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* OEM/ODM Service */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t('acc.vrxdetail.k623')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold mb-2 text-primary">{t('acc.vrxdetail.k624')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('acc.vrxdetail.k625')}
                </p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold mb-2 text-primary">{t('acc.vrxdetail.k626')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('acc.vrxdetail.k627')}
                </p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold mb-2 text-primary">{t('acc.vrxdetail.k628')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('acc.vrxdetail.k629')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Isolation Note */}
        <section className="py-6 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="flex items-start gap-3 max-w-3xl mx-auto">
              <AlertTriangle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground italic">
                {t('acc.vrxdetail.isolationNote')}
              </p>
            </div>
          </div>
        </section>

        {/* Related Article */}
        <section className="py-12 bg-secondary border-t border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">{t('acc.cameradetail.k457')}</h2>
            <Link
              to="/news/1bb08cea-c85a-4373-8bd3-7e62accc7619"
              className="block bg-card rounded-xl border border-border hover:border-accent/50 transition-all duration-300 overflow-hidden group"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 aspect-video md:aspect-auto bg-muted/30 p-4 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={`${product.model} dual-chip diversity receiver technical deep dive`}
                    className="max-h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 md:w-2/3 flex flex-col justify-center">
                  <span className="text-xs text-accent font-medium mb-2">{t('acc.vrxdetail.k630')}</span>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">
                    {t('acc.vrxdetail.k631')}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {t('acc.vrxdetail.k632')}
                  </p>
                  <span className="text-xs text-accent mt-3 flex items-center gap-1">
                    {t('acc.vrxdetail.k633')}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <PageFAQ items={faqItems} />

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t('acc.vrxdetail.k634')}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {t('acc.vrxdetail.k635')}
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">{t('acc.canifmtdetail.k547')}</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/50 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20" asChild>
                <Link to="/products/accessories/vtx-vrx">{t('acc.vrxdetail.k636')}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
};

export default VrxDetail;
