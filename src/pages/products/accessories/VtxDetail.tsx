import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LangLink as Link } from "@/components/LangLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import { Check, AlertTriangle, Settings, Radio, Zap, Shield, Thermometer } from "lucide-react";
import { getProductById } from "@/data/vtxProducts";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageFAQ } from "@/components/PageFAQ";

const VtxDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getProductById(productId) : null;
  const { t } = useLanguage();
  const isPV02 = productId === "flym-pv02w500-a1";

  if (!product) {
    return <Navigate to="/products/accessories/vtx-vrx" replace />;
  }

  // PV02 专属 JSON-LD
  const pv02JsonLd = isPV02 ? {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "FLYM-PV02W500-A1 2.5W High-Power VTX",
    "description": "High-power UAV video transmitter with 2.5W (2500mW) output and 8km LOS range. Active cooling fan + CNC aluminum heatsink. Wide voltage DC 7-36V.",
    "brand": { "@type": "Brand", "name": "CANI Technology" },
    "sku": "PV02W500-A1",
    "mpn": "FLYM-PV02W500-A1",
    "image": "https://www.caniuav.com/assets/vtx/vtx-2.5w.png",
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "RF Output Power", "value": "2500mW (2.5W)" },
      { "@type": "PropertyValue", "name": "Transmission Range", "value": "8km LOS" },
      { "@type": "PropertyValue", "name": "Input Voltage", "value": "DC 7-36V (2-8S LiPo)" },
      { "@type": "PropertyValue", "name": "End-to-End Latency", "value": "≤30ms" },
      { "@type": "PropertyValue", "name": "Cooling System", "value": "Active Fan + CNC Heatsink" },
      { "@type": "PropertyValue", "name": "Frequency Band", "value": "4.9-6.1GHz" },
      { "@type": "PropertyValue", "name": "Channels", "value": "80" },
      { "@type": "PropertyValue", "name": "Weight", "value": "23g" }
    ],
    "offers": {
      "@type": "Offer",
      "url": "https://www.caniuav.com/products/accessories/vtx-vrx/flym-pv02w500-a1",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  } : null;

  const pv02FaqItems = [
    { questionKey: "vtxDetail.pv02.faq.q1", answerKey: "vtxDetail.pv02.faq.a1" },
    { questionKey: "vtxDetail.pv02.faq.q2", answerKey: "vtxDetail.pv02.faq.a2" },
    { questionKey: "vtxDetail.pv02.faq.q3", answerKey: "vtxDetail.pv02.faq.a3" },
  ];

  // SEO: PV02 使用专属 TDK，其他产品使用通用逻辑
  const seoTitle = isPV02 ? t('vtxDetail.pv02.seo.title') : `${t(product.nameKey)} ${product.model}`;
  const seoDesc = isPV02 ? t('vtxDetail.pv02.seo.desc') : `${t(product.nameKey)}，${product.frequency}${t('vtxDetail.seo.band')}，${product.channels}${t('vtxDetail.seo.channels')}，${product.power}${t('vtxDetail.seo.power')}，${t('vtxDetail.seo.vtxDesc')}`;

  return (
    <>
      <MultiLanguageSEO 
        title={seoTitle}
        description={seoDesc}
        path={`/products/accessories/vtx-vrx/${productId}`}
        type="product"
      />
      {isPV02 && pv02JsonLd && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(pv02JsonLd)}</script>
        </Helmet>
      )}
      <Header />
      <main className="min-h-screen bg-background">
        <BackButton to="/products/accessories/vtx-vrx" />

        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Product Image */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <img 
                  src={product.image} 
                  alt={isPV02 ? "FLYM-PV02W500-A1 2.5W VTX with active cooling fan, 8km range UAV video transmitter industrial grade" : t(product.nameKey)}
                  title={isPV02 ? "FLYM-PV02W500-A1 2.5W High-Power UAV VTX" : t(product.nameKey)}
                  className="w-full max-w-md mx-auto object-contain"
                  loading="lazy"
                />
              </div>

              {/* Product Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">{product.power}</span>
                  <span className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full">{product.channels}CH</span>
                  <span className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full">{product.frequency}</span>
                  {isPV02 && <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">8km LOS</span>}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {isPV02 ? t('vtxDetail.pv02.h1') : t(product.nameKey)}
                </h1>
                <p className="text-xl text-muted-foreground mb-4">{product.model}</p>
                {isPV02 && (
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed border-l-2 border-primary pl-4">
                    {t('vtxDetail.pv02.overview')}
                  </p>
                )}
                
                {/* Highlights */}
                <div className="space-y-2 mb-8">
                  {product.highlightKeys.map((highlightKey, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{t(highlightKey)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button size="lg" asChild>
                    <Link to="/contact">{t('accessoryDetail.getQuote')}</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#specs">{t('accessoryDetail.viewSpecs')}</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Features Description */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t('accessoryDetail.productFeatures')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.descriptionKeys.map((descKey, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                  <Radio className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{t(descKey)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section id="specs" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t('accessoryDetail.techSpecs')}</h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50 w-1/3">{t('accessoryDetail.model')}</td>
                    <td className="px-6 py-4">{product.model}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.inputVoltage')}</td>
                    <td className="px-6 py-4">{t(product.specs.inputVoltageKey)}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.outputVoltage')}</td>
                    <td className="px-6 py-4">{product.specs.outputVoltage}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.channels')}</td>
                    <td className="px-6 py-4">{product.channels}CH</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.powerLevels')}</td>
                    <td className="px-6 py-4">{product.specs.powerLevels}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.mountingSize')}</td>
                    <td className="px-6 py-4">{product.specs.mountingSize}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.antennaInterface')}</td>
                    <td className="px-6 py-4">{product.specs.antennaInterface}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.consumption')}</td>
                    <td className="px-6 py-4">{t(product.specs.consumptionKey)}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.additionalFeatures')}</td>
                    <td className="px-6 py-4">{t(product.specs.featuresKey)}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.microphone')}</td>
                    <td className="px-6 py-4">{t(product.specs.microphoneKey)}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.cableInterface')}</td>
                    <td className="px-6 py-4">{t(product.specs.cableInterfaceKey)}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.weight')}</td>
                    <td className="px-6 py-4">{product.specs.weight}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.size')}</td>
                    <td className="px-6 py-4">{product.specs.size}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Operation Guide */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t('accessoryDetail.operationGuide')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t('accessoryDetail.bandSelection')}</h3>
                <p className="text-sm text-muted-foreground">{t(product.operationGuide.bandSelectionKey)}</p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Radio className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t('accessoryDetail.channelSelection')}</h3>
                <p className="text-sm text-muted-foreground">{t(product.operationGuide.channelSelectionKey)}</p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t('accessoryDetail.powerSelection')}</h3>
                <p className="text-sm text-muted-foreground">{t(product.operationGuide.powerSelectionKey)}</p>
              </div>
            </div>

            {/* Power Levels Table */}
            {product.operationGuide.powerLevelsTable && (
              <div className="mt-8">
                <h3 className="font-semibold mb-4">{t('accessoryDetail.powerLevelsRef')}</h3>
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-6 py-3 text-left font-semibold">{t('vtxDetail.level')}</th>
                        {product.operationGuide.powerLevelsTable.map((item) => (
                          <th key={item.level} className="px-6 py-3 text-center font-semibold">{item.level}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-6 py-3 font-medium">{product.model}</td>
                        {product.operationGuide.powerLevelsTable.map((item) => (
                          <td key={item.level} className="px-6 py-3 text-center">{item.power}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {t('vtxDetail.ledNote')}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Frequency Table */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t('accessoryDetail.freqTable')}</h2>
            <div className="bg-card rounded-xl border border-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left font-semibold">{t('vtxDetail.band')}</th>
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
                  {product.frequencyTable.map((row, idx) => (
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
          </div>
        </section>

        {/* Notes */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t('accessoryDetail.notes')}</h2>
            <div className="space-y-4">
              {product.noteKeys.map((noteKey, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{t(noteKey)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PV02 Application Scenarios */}
        {isPV02 && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Application Scenarios</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">FPV Long-Range Flight</h3>
                  <p className="text-sm text-muted-foreground">{t('vtxDetail.pv02.application.fpv')}</p>
                </div>
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Industrial Inspection</h3>
                  <p className="text-sm text-muted-foreground">{t('vtxDetail.pv02.application.inspection')}</p>
                </div>
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Thermometer className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Search &amp; Rescue</h3>
                  <p className="text-sm text-muted-foreground">{t('vtxDetail.pv02.application.sar')}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PV02 FAQ */}
        {isPV02 && (
          <PageFAQ
            titleKey="vtxDetail.pv02.faq.title"
            items={pv02FaqItems}
            className="py-20"
          />
        )}

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t('accessoryDetail.customSolution')}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {t('accessoryDetail.customFreq')}
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">{t('contact.title')}</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 hover:bg-primary-foreground/10" asChild>
                <Link to="/products/accessories/vtx-vrx">{t('accessoryDetail.viewMoreProducts')}</Link>
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

export default VtxDetail;
