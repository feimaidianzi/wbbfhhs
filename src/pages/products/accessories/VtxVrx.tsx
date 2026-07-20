import { LangLink as Link } from "@/components/LangLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Radio, Zap, Settings, Shield, Thermometer, Cpu, ChevronRight, Download, ExternalLink, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProducts49to61, getProducts61to72, frequencyTable49to61, frequencyTable61to72, VtxProduct } from "@/data/vtxProducts";
import { getVrxProducts } from "@/data/vrxProducts";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageFAQ } from "@/components/PageFAQ";

const VtxVrx = () => {
  const { t, language } = useLanguage();
  const isZh = language === 'zh';
  const products49to61 = getProducts49to61();
  const products61to72 = getProducts61to72();
  const vrxProducts = getVrxProducts();

  const features = [
    { icon: Radio, titleKey: 'vtx.feature.rf', descKey: 'vtx.feature.rf.desc' },
    { icon: Zap, titleKey: 'vtx.feature.power', descKey: 'vtx.feature.power.desc' },
    { icon: Thermometer, titleKey: 'vtx.feature.heat', descKey: 'vtx.feature.heat.desc' },
    { icon: Settings, titleKey: 'vtx.feature.config', descKey: 'vtx.feature.config.desc' },
    { icon: Shield, titleKey: 'vtx.feature.safety', descKey: 'vtx.feature.safety.desc' },
    { icon: Cpu, titleKey: 'vtx.feature.smart', descKey: 'vtx.feature.smart.desc' },
  ];

  const ProductCard = ({ product }: { product: VtxProduct }) => (
    <Link 
      to={`/products/accessories/vtx-vrx/${product.id}`} 
      className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 group block"
    >
      <div className="aspect-video bg-muted/30 p-4 flex items-center justify-center relative">
        <img 
          src={product.image} 
          alt={`CANI ${product.power} ${product.frequency} industrial UAV video transmitter VTX`}
          title={`CANI ${product.model} - ${product.power} VTX ${product.frequency}`}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" 
          loading="lazy"
        />
        {/* Technical spec overlay */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className="px-2 py-0.5 text-[10px] font-bold bg-primary/90 text-primary-foreground rounded">{product.power} Max Power</span>
          <span className="px-2 py-0.5 text-[10px] font-bold bg-accent/90 text-accent-foreground rounded">{product.frequency}</span>
        </div>
        <div className="absolute bottom-2 right-2">
          <span className="px-2 py-0.5 text-[10px] font-medium bg-background/80 text-foreground rounded border border-border">{product.channels}CH</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{t(product.nameKey)}</h3>
        <p className="text-sm text-muted-foreground mb-4">{product.model}</p>
        
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-muted-foreground">{t('vtx.highlights')}</h4>
          <ul className="space-y-1">
            {product.highlightKeys.slice(0, 4).map((highlightKey, idx) => (
              <li key={idx} className="text-sm flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{t(highlightKey)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <h4 className="font-semibold text-sm text-muted-foreground mb-3">{t('vtx.specs')}</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">{t('vtx.specs.inputVoltage')}：</span>
              <span>{t(product.specs.inputVoltageKey).split('，')[0]}</span>
            </div>
            <div>
              <span className="text-muted-foreground">{t('vtx.specs.antenna')}：</span>
              <span>{product.specs.antennaInterface}</span>
            </div>
            <div>
              <span className="text-muted-foreground">{t('vtx.specs.weight')}：</span>
              <span>{product.specs.weight}</span>
            </div>
            <div>
              <span className="text-muted-foreground">{t('vtx.specs.size')}：</span>
              <span>{product.specs.size}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-primary">
          <span className="text-sm font-medium">{t('vtx.viewDetail')}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );

  const FrequencyTable = ({ data }: { data: typeof frequencyTable49to61 }) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50">
            <th className="px-4 py-3 text-left font-semibold">{t('vtx.freqTable.band')}</th>
            <th className="px-4 py-3 text-center font-semibold">CH1</th>
            <th className="px-4 py-3 text-center font-semibold">CH2</th>
            <th className="px-4 py-3 text-center font-semibold">CH3</th>
            <th className="px-4 py-3 text-center font-semibold">CH4</th>
            <th className="px-4 py-3 text-center font-semibold">CH5</th>
            <th className="px-4 py-3 text-center font-semibold">CH6</th>
            <th className="px-4 py-3 text-center font-semibold">CH7</th>
            <th className="px-4 py-3 text-center font-semibold">CH8</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? "bg-background" : "bg-muted/20"}>
              <td className="px-4 py-2 font-medium">{row.band}</td>
              <td className="px-4 py-2 text-center">{row.ch1}</td>
              <td className="px-4 py-2 text-center">{row.ch2}</td>
              <td className="px-4 py-2 text-center">{row.ch3}</td>
              <td className="px-4 py-2 text-center">{row.ch4}</td>
              <td className="px-4 py-2 text-center">{row.ch5}</td>
              <td className="px-4 py-2 text-center">{row.ch6}</td>
              <td className="px-4 py-2 text-center">{row.ch7}</td>
              <td className="px-4 py-2 text-center">{row.ch8}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // CollectionPage + Product structured data
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('vtx.seo.title'),
    description: t('vtx.seo.description'),
    url: 'https://caniuav.com/products/accessories/vtx-vrx',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [...products49to61, ...products61to72].map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: t(p.nameKey),
          brand: { '@type': 'Brand', name: 'CANI' },
          description: `${p.power} industrial UAV video transmitter, ${p.frequency}, ${p.channels} channels`,
          model: p.model,
        }
      }))
    }
  };

  return (
    <>
      <MultiLanguageSEO
        title={t('vtx.seo.title')}
        description={t('vtx.seo.description')}
        path="/products/accessories/vtx-vrx"
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4">
            <Link to="/products/accessories" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
              <ArrowLeft className="w-4 h-4" />
              {t('vtx.back')}
            </Link>
            
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('vtx.hero.title')}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {t('vtx.hero.desc')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/contact">{t('vtx.getQuote')}</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#products">{t('vtx.viewProducts')}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Overview - E-E-A-T */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-muted-foreground leading-relaxed text-base">
                {t('vtx.techOverview')}
              </p>
            </div>
          </div>
        </section>

        {/* Binary Architecture: Digital vs Analog */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">{t('vtx.archTitle')}</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">{t('vtx.archDesc')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Digital HD */}
              <div className="p-8 bg-card rounded-xl border-2 border-primary/30 relative">
                <span className="absolute -top-3 left-6 px-3 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-full">{t('vtx.arch.digitalBadge')}</span>
                <h3 className="text-xl font-bold mb-4 mt-2">{t('vtx.arch.digitalTitle')}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t('vtx.arch.digitalDesc')}</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span className="text-primary font-bold">•</span>{t('vtx.arch.digital.f1')}</li>
                  <li className="flex items-start gap-2"><span className="text-primary font-bold">•</span>{t('vtx.arch.digital.f2')}</li>
                  <li className="flex items-start gap-2"><span className="text-primary font-bold">•</span>{t('vtx.arch.digital.f3')}</li>
                </ul>
                <Button variant="outline" className="mt-6 w-full" asChild>
                  <Link to="/fpv/digital-fpv">{t('vtx.arch.digitalCta')}</Link>
                </Button>
              </div>
              {/* Analog High-Power */}
              <div className="p-8 bg-card rounded-xl border-2 border-border relative">
                <span className="absolute -top-3 left-6 px-3 py-1 text-xs font-bold bg-secondary text-secondary-foreground rounded-full">{t('vtx.arch.analogBadge')}</span>
                <h3 className="text-xl font-bold mb-4 mt-2">{t('vtx.arch.analogTitle')}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t('vtx.arch.analogDesc')}</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span className="text-primary font-bold">•</span>{t('vtx.arch.analog.f1')}</li>
                  <li className="flex items-start gap-2"><span className="text-primary font-bold">•</span>{t('vtx.arch.analog.f2')}</li>
                  <li className="flex items-start gap-2"><span className="text-primary font-bold">•</span>{t('vtx.arch.analog.f3')}</li>
                </ul>
                <Button variant="outline" className="mt-6 w-full" asChild>
                  <a href="#products">{t('vtx.arch.analogCta')}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t('vtx.features.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4 p-6 bg-card rounded-xl border border-border">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{t(feature.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground">{t(feature.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Power Tier Comparison Table */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">{t('vtx.comparison.title')}</h2>
            <p className="text-center text-muted-foreground mb-10 max-w-3xl mx-auto">{t('vtx.comparison.desc')}</p>
            <div className="overflow-x-auto max-w-5xl mx-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left font-semibold border-b border-border">{t('vtx.comparison.model')}</th>
                    <th className="px-4 py-3 text-center font-semibold border-b border-border">{t('vtx.comparison.power')}</th>
                    <th className="px-4 py-3 text-left font-semibold border-b border-border">{t('vtx.comparison.application')}</th>
                    <th className="px-4 py-3 text-center font-semibold border-b border-border">{t('vtx.comparison.penetration')}</th>
                    <th className="px-4 py-3 text-center font-semibold border-b border-border">{t('vtx.comparison.cooling')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 border-b border-border font-medium"><Link to="/products/accessories/vtx-vrx/flym-pv02w500-a1" className="text-primary hover:underline">PV02W500-A1</Link></td>
                    <td className="px-4 py-3 border-b border-border text-center">2.5W (2500mW)</td>
                    <td className="px-4 py-3 border-b border-border">{t('vtx.comparison.tier1')}</td>
                    <td className="px-4 py-3 border-b border-border text-center">★★★☆☆</td>
                    <td className="px-4 py-3 border-b border-border text-center">{t('vtx.comparison.passive')}</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors bg-muted/10">
                    <td className="px-4 py-3 border-b border-border font-medium"><Link to="/products/accessories/vtx-vrx/flym-pv03w000-a1" className="text-primary hover:underline">PV03W000-A1</Link></td>
                    <td className="px-4 py-3 border-b border-border text-center">3W (3000mW)</td>
                    <td className="px-4 py-3 border-b border-border">{t('vtx.comparison.tier2')}</td>
                    <td className="px-4 py-3 border-b border-border text-center">★★★✦☆</td>
                    <td className="px-4 py-3 border-b border-border text-center">{t('vtx.comparison.enhanced')}</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 border-b border-border font-medium"><Link to="/products/accessories/vtx-vrx/fv10w-a1" className="text-primary hover:underline">FV10W-A1</Link></td>
                    <td className="px-4 py-3 border-b border-border text-center font-semibold">10W (10,000mW)</td>
                    <td className="px-4 py-3 border-b border-border">{t('vtx.comparison.tier3')}</td>
                    <td className="px-4 py-3 border-b border-border text-center">★★★★☆</td>
                    <td className="px-4 py-3 border-b border-border text-center">{t('vtx.comparison.active')}</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors bg-muted/10">
                    <td className="px-4 py-3 border-b border-border font-medium"><Link to="/products/accessories/vtx-vrx/fv16w-a1" className="text-primary hover:underline">FV16W-A1</Link></td>
                    <td className="px-4 py-3 border-b border-border text-center font-bold text-destructive">16W (16,000mW)</td>
                    <td className="px-4 py-3 border-b border-border">{t('vtx.comparison.tier4')}</td>
                    <td className="px-4 py-3 border-b border-border text-center">★★★★✦</td>
                    <td className="px-4 py-3 border-b border-border text-center">{t('vtx.comparison.quadFan')}</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors bg-destructive/5">
                    <td className="px-4 py-3 border-b border-border font-bold"><Link to="/products/accessories/vtx-vrx/fv25w-a1" className="text-destructive hover:underline">FV25W-A1</Link></td>
                    <td className="px-4 py-3 border-b border-border text-center font-bold text-destructive">25W (25,000mW)</td>
                    <td className="px-4 py-3 border-b border-border font-semibold">{t('vtx.comparison.tier5')}</td>
                    <td className="px-4 py-3 border-b border-border text-center">★★★★★</td>
                    <td className="px-4 py-3 border-b border-border text-center">{t('vtx.comparison.industrial')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Scenario-based navigation */}
            <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/products/accessories/vtx-vrx/fv16w-a1" className="p-4 bg-card rounded-xl border border-border hover:border-destructive/50 transition-colors text-center">
                <p className="text-sm text-muted-foreground mb-1">{t('vtx.comparison.q1')}</p>
                <p className="text-sm font-semibold text-destructive">{t('vtx.comparison.q1Link')}</p>
              </Link>
              <Link to="/products/accessories/vtx-vrx/fv10w-a1" className="p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors text-center">
                <p className="text-sm text-muted-foreground mb-1">{t('vtx.comparison.q2')}</p>
                <p className="text-sm font-semibold text-primary">{t('vtx.comparison.q2Link')}</p>
              </Link>
              <Link to="/products/accessories/vtx-vrx/flym-pv02w500-a1" className="p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors text-center">
                <p className="text-sm text-muted-foreground mb-1">{t('vtx.comparison.q3')}</p>
                <p className="text-sm font-semibold text-primary">{t('vtx.comparison.q3Link')}</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Analog Products Section */}
        <section id="products" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">{t('vtx.analogProducts.title')}</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {t('vtx.analogProducts.desc')}
            </p>

            <Tabs defaultValue="49-61" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="49-61" className="text-sm">4.9GHz - 6.1GHz</TabsTrigger>
                <TabsTrigger value="61-72" className="text-sm">6.1GHz - 7.2GHz</TabsTrigger>
              </TabsList>

              <TabsContent value="49-61">
                <div className="mb-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h3 className="font-semibold text-lg mb-2">{t('vtx.band.49to61')}</h3>
                  <p className="text-sm text-muted-foreground">{t('vtx.band.49to61.desc')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products49to61.map(product => <ProductCard key={product.id} product={product} />)}
                </div>

                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">{t('vtx.freqTable')}</h3>
                  <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <FrequencyTable data={frequencyTable49to61} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="61-72">
                <div className="mb-8 p-4 bg-secondary/50 rounded-lg border border-secondary">
                  <h3 className="font-semibold text-lg mb-2">{t('vtx.band.61to72')}</h3>
                  <p className="text-sm text-muted-foreground">{t('vtx.band.61to72.desc')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products61to72.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
                
                <div className="mt-8 p-6 bg-muted/50 rounded-xl text-center">
                  <p className="text-muted-foreground">{t('vtx.moreComingSoon')}</p>
                  <Button variant="outline" className="mt-4" asChild>
                    <Link to="/contact">{t('vtx.learnMore')}</Link>
                  </Button>
                </div>

                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">{t('vtx.freqTable')}</h3>
                  <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <FrequencyTable data={frequencyTable61to72} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* VRX Receiver Products Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
              {t('acc.vtxvrx.k651')}
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {t('acc.vtxvrx.k652')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vrxProducts.map(vrx => (
                <Link
                  key={vrx.id}
                  to={`/products/accessories/vtx-vrx/vrx/${vrx.id}`}
                  className="bg-card rounded-xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 group block"
                >
                  <div className="aspect-video bg-muted/30 p-4 flex items-center justify-center relative">
                    <img
                      src={vrx.image}
                      alt={`CANI ${vrx.model} ${vrx.sensitivity} analog video receiver module VRX`}
                      title={`CANI ${vrx.model} - ${vrx.sensitivity} VRX`}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-accent/90 text-accent-foreground rounded">VRX {vrx.sensitivity}</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-primary/90 text-primary-foreground rounded">{vrx.frequency}</span>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <span className="px-2 py-0.5 text-[10px] font-medium bg-background/80 text-foreground rounded border border-border">{vrx.channels}CH</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{isZh ? vrx.nameZh : vrx.nameEn}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{vrx.model}</p>
                    <ul className="space-y-1 mb-4">
                      {(isZh ? vrx.highlightsZh : vrx.highlightsEn).slice(0, 4).map((h, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-accent">
                      <span className="text-sm font-medium">{t('acc.vtxvrx.k653')}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Usage Notes */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">{t('vtx.notes.title')}</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">{t('vtx.notes.intro')}</p>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="p-4 bg-card rounded-lg border border-border">
                <h4 className="font-semibold mb-2">{t('vtx.notes.power.title')}</h4>
                <p className="text-sm text-muted-foreground">{t('vtx.notes.power.desc')}</p>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border">
                <h4 className="font-semibold mb-2">{t('vtx.notes.antenna.title')}</h4>
                <p className="text-sm text-muted-foreground">{t('vtx.notes.antenna.desc')}</p>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border">
                <h4 className="font-semibold mb-2">{t('vtx.notes.heat.title')}</h4>
                <p className="text-sm text-muted-foreground">{t('vtx.notes.heat.desc')}</p>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border">
                <h4 className="font-semibold mb-2">{t('vtx.notes.position.title')}</h4>
                <p className="text-sm text-muted-foreground">{t('vtx.notes.position.desc')}</p>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border">
                <h4 className="font-semibold mb-2">{t('vtx.notes.pit.title')}</h4>
                <p className="text-sm text-muted-foreground">{t('vtx.notes.pit.desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Parameter Interpretation */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">{t('vtx.techDetail.title')}</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-muted-foreground leading-relaxed">{t('vtx.techDetail')}</p>
            </div>
          </div>
        </section>

        {/* Application Case Study */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">{t('vtx.caseStudy.title')}</h2>
            <div className="max-w-3xl mx-auto">
              <div className="p-6 bg-card rounded-xl border border-border">
                <p className="text-muted-foreground leading-relaxed">{t('vtx.caseStudy.content')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cross-linking: Related Accessories */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">{t('vtx.relatedTitle')}</h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">{t('vtx.relatedDesc')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link to="/products/accessories/fc-esc" className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group block text-center">
                <Cpu className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">{t('vtx.related.fc')}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t('vtx.related.fc.desc')}</p>
                <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                  {t('vtx.related.fc.cta')} <ExternalLink className="w-3 h-3" />
                </span>
              </Link>
              <Link to="/products/accessories/gimbal" className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group block text-center">
                <Radio className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">{t('vtx.related.gimbal')}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t('vtx.related.gimbal.desc')}</p>
                <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                  {t('vtx.related.gimbal.cta')} <ExternalLink className="w-3 h-3" />
                </span>
              </Link>
              <Link to="/fpv/digital-fpv" className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group block text-center">
                <Zap className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">{t('vtx.related.digital')}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t('vtx.related.digital.desc')}</p>
                <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                  {t('vtx.related.digital.cta')} <ExternalLink className="w-3 h-3" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* PDF Download Lead Magnet */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto p-8 bg-card rounded-xl border border-primary/20 text-center">
              <Download className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{t('vtx.pdfTitle')}</h3>
              <p className="text-sm text-muted-foreground mb-6">{t('vtx.pdfDesc')}</p>
              <Button size="lg" asChild>
                <Link to="/contact">{t('vtx.pdfCta')}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* AEO FAQ Section */}
        <PageFAQ
          titleKey="vtx.faq.title"
          items={[
            { questionKey: 'vtx.faq.q1', answerKey: 'vtx.faq.a1' },
            { questionKey: 'vtx.faq.q2', answerKey: 'vtx.faq.a2' },
            { questionKey: 'vtx.faq.q3', answerKey: 'vtx.faq.a3' },
            { questionKey: 'vtx.faq.q4', answerKey: 'vtx.faq.a4' },
            { questionKey: 'vtx.faq.q5', answerKey: 'vtx.faq.a5' },
          ]}
        />

        {/* Isolation Disclaimer */}
        <section className="py-6 bg-muted/20">
          <div className="container mx-auto px-4">
            <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto italic">
              {t('vtx.disclaimer')}
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{t('vtx.cta.title')}</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">{t('vtx.cta.desc')}</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">{t('vtx.cta.btn')}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
    </>
  );
};

export default VtxVrx;
