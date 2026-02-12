import { LangLink as Link } from "@/components/LangLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Radio, Zap, Settings, Shield, Thermometer, Cpu, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProducts49to61, getProducts61to72, frequencyTable49to61, frequencyTable61to72, VtxProduct } from "@/data/vtxProducts";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageFAQ } from "@/components/PageFAQ";


const VtxVrx = () => {
  const { t } = useLanguage();
  const products49to61 = getProducts49to61();
  const products61to72 = getProducts61to72();

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
      <div className="aspect-video bg-muted/30 p-4 flex items-center justify-center">
        <img src={product.image} alt={t(product.nameKey)} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">{product.power}</span>
          <span className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">{product.channels}CH</span>
        </div>
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

        {/* Products Section */}
        <section id="products" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">{t('vtx.products.title')}</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {t('vtx.products.desc')}
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

        {/* Usage Notes */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t('vtx.notes.title')}</h2>
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

        {/* FAQ Section */}
        <PageFAQ
          titleKey="vtx.faq.title"
          items={[
            { questionKey: 'vtx.faq.q1', answerKey: 'vtx.faq.a1' },
            { questionKey: 'vtx.faq.q2', answerKey: 'vtx.faq.a2' },
            { questionKey: 'vtx.faq.q3', answerKey: 'vtx.faq.a3' },
          ]}
        />

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
    </>
  );
};

export default VtxVrx;
