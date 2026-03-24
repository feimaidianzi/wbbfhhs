import { useParams, Navigate } from "react-router-dom";
import { LangLink as Link } from "@/components/LangLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import { Check, AlertTriangle, Package, Download, Play, HelpCircle, ChevronDown, Zap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getGimbalProductById } from "@/data/gimbalProducts";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
const GimbalDetail = () => {
  const {
    productId
  } = useParams<{
    productId: string;
  }>();
  const product = productId ? getGimbalProductById(productId) : null;
  const [selectedImage, setSelectedImage] = useState(0);
  const {
    t
  } = useLanguage();
  if (!product) {
    return <Navigate to="/products/accessories/gimbal" replace />;
  }
  // SKU-specific TDK
  const skuTitle = t(`gimbal.tdk.${productId}.title`) !== `gimbal.tdk.${productId}.title` 
    ? t(`gimbal.tdk.${productId}.title`) 
    : t(product.nameKey);
  const skuDesc = t(`gimbal.tdk.${productId}.desc`) !== `gimbal.tdk.${productId}.desc`
    ? t(`gimbal.tdk.${productId}.desc`)
    : `${t(product.nameKey)}，${t(product.categoryKey)}，${product.highlightKeys.slice(0, 3).map(k => t(k)).join('，')}`;

  // Build product structured data with additionalProperty for GEO
  const productStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: t(product.nameKey),
    description: skuDesc,
    image: product.image,
    sku: product.model,
    brand: { '@type': 'Brand', name: 'CANI Technology' },
    manufacturer: { '@type': 'Organization', name: 'CANI Technology' },
    category: t(product.categoryKey),
    additionalProperty: product.specs.slice(0, 8).map(spec => ({
      '@type': 'PropertyValue',
      name: t(spec.labelKey),
      value: spec.value,
    })),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: `https://www.caniuav.com/products/accessories/gimbal/${productId}`,
    },
  };

  // Build FAQ structured data for GEO
  const faqItems = [];
  for (let i = 1; i <= 6; i++) {
    const q = t(`gimbal.faq.q${i}`);
    const a = t(`gimbal.faq.a${i}`);
    if (q !== `gimbal.faq.q${i}` && a !== `gimbal.faq.a${i}`) {
      faqItems.push({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } });
    }
  }
  const faqStructuredData = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems,
  } : null;

  const images = product.images || [product.image];

  return <>
      <MultiLanguageSEO title={skuTitle} description={skuDesc} path={`/products/accessories/gimbal/${productId}`} type="product" structuredData={[productStructuredData, ...(faqStructuredData ? [faqStructuredData] : [])]} />
      <Header />
      <main className="min-h-screen bg-background">
        <BackButton to="/products/accessories/gimbal" />

        {/* Hero Section with slogan */}
        {product.sloganKey && <section className="pt-20 pb-16 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Product Image */}
                <div className="flex items-center justify-center">
                  <img src={images[selectedImage]} alt={t(product.nameKey)} className="max-h-[400px] max-w-full object-contain drop-shadow-2xl" />
                </div>
                
                {/* Slogan & Key Features */}
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">{t(product.sloganKey)}</h1>
                  <p className="text-2xl text-zinc-400 mb-8">{product.subSloganKey ? t(product.subSloganKey) : ''}</p>
                  
                  {product.keyFeatures && <div className="grid grid-cols-2 gap-4 mb-8 bg-primary">
                      {product.keyFeatures.map((feature, idx) => <div key={idx} className="text-center p-4 rounded-lg border border-zinc-700 bg-primary-foreground">
                          <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{feature.value}</div>
                          <div className="text-sm text-zinc-400">{t(feature.labelKey)}</div>
                        </div>)}
                    </div>}
                  
                  <div className="flex justify-center lg:justify-start gap-4">
                    <Button size="lg" asChild>
                      <Link to="/contact">{t('accessoryDetail.getQuote')}</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="border-zinc-400 bg-transparent text-white hover:bg-zinc-800 hover:text-white" asChild>
                      <a href="#specs" className="text-white">{t('accessoryDetail.viewSpecs')}</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>}

        {/* Product Info Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="bg-card rounded-2xl p-8 border border-border aspect-square flex items-center justify-center">
                  <img src={images[selectedImage]} alt={t(product.nameKey)} className="max-h-full max-w-full object-contain" />
                </div>
                {images.length > 1 && <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, idx) => <button key={idx} onClick={() => setSelectedImage(idx)} className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${selectedImage === idx ? 'border-primary' : 'border-border hover:border-primary/50'}`}>
                        <img src={img} alt={`${t(product.nameKey)} ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>)}
                  </div>}
              </div>

              {/* Product Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">{t(product.categoryKey)}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{t(product.nameKey)}</h2>
                <p className="text-xl text-muted-foreground mb-6">{product.model}</p>
                
                {/* Highlights */}
                <div className="space-y-2 mb-8">
                  {product.highlightKeys.map((highlightKey, idx) => <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{t(highlightKey)}</span>
                    </div>)}
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

        {/* Tabs Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-8">
                <TabsTrigger value="specs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">
                  {t('accessoryDetail.techSpecs')}
                </TabsTrigger>
                <TabsTrigger value="features" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">
                  {t('accessoryDetail.productFeatures')}
                </TabsTrigger>
                <TabsTrigger value="applications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">
                  {t('accessoryDetail.applications')}
                </TabsTrigger>
                {product.downloads && product.downloads.length > 0 && <TabsTrigger value="downloads" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">
                    {t('accessoryDetail.downloads')}
                  </TabsTrigger>}
                <TabsTrigger value="faq" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">
                  {t('accessoryDetail.faq')}
                </TabsTrigger>
              </TabsList>

              {/* Specs Tab */}
              <TabsContent value="specs" id="specs">
                <div className="space-y-6">
                  {(() => {
                  const categories = [...new Set(product.specs.map(s => s.categoryKey).filter(Boolean))];
                  if (categories.length > 0) {
                    return categories.map(categoryKey => {
                      const categorySpecs = product.specs.filter(s => s.categoryKey === categoryKey);
                      return <div key={categoryKey} className="bg-card rounded-xl border border-border overflow-hidden">
                            <div className="px-6 py-3 bg-muted/50 border-b border-border">
                              <h4 className="font-semibold">{t(categoryKey!)}</h4>
                            </div>
                            <table className="w-full">
                              <tbody>
                                {categorySpecs.map((spec, idx) => <tr key={idx} className="border-b border-border last:border-b-0">
                                    <td className="px-6 py-4 font-medium bg-muted/30 w-1/3">{t(spec.labelKey)}</td>
                                    <td className="px-6 py-4">{spec.value}</td>
                                  </tr>)}
                              </tbody>
                            </table>
                          </div>;
                    });
                  }
                  return <div className="bg-card rounded-xl border border-border overflow-hidden">
                        <table className="w-full">
                          <tbody>
                            {product.specs.map((spec, idx) => <tr key={idx} className="border-b border-border last:border-b-0">
                                <td className="px-6 py-4 font-medium bg-muted/30 w-1/3">{t(spec.labelKey)}</td>
                                <td className="px-6 py-4">{spec.value}</td>
                              </tr>)}
                          </tbody>
                        </table>
                      </div>;
                })()}
                </div>
              </TabsContent>

              {/* Features Tab */}
              <TabsContent value="features">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">{t('accessoryDetail.productDescription')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.descriptionKeys.map((descKey, idx) => <div key={idx} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                          <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{t(descKey)}</span>
                        </div>)}
                    </div>
                  </div>

                  {product.featureKeys && product.featureKeys.length > 0 && <div>
                      <h3 className="text-xl font-bold mb-4">{t('accessoryDetail.featureHighlights')}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {product.featureKeys.map((featureKey, idx) => <div key={idx} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                            <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span>{t(featureKey)}</span>
                          </div>)}
                      </div>
                    </div>}

                  {product.packageIncludeKeys && product.packageIncludeKeys.length > 0 && <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5 text-primary" />
                        {t('accessoryDetail.packageContents')}
                      </h3>
                      <div className="bg-card rounded-xl border border-border p-6">
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {product.packageIncludeKeys.map((itemKey, idx) => <li key={idx} className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                              <span>{t(itemKey)}</span>
                            </li>)}
                        </ul>
                      </div>
                    </div>}

                  {product.noteKeys && product.noteKeys.length > 0 && <div>
                      <h3 className="text-xl font-bold mb-4">{t('accessoryDetail.notes')}</h3>
                      <div className="space-y-3">
                        {product.noteKeys.map((noteKey, idx) => <div key={idx} className="flex items-start gap-3 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{t(noteKey)}</span>
                          </div>)}
                      </div>
                    </div>}
                </div>
              </TabsContent>

              {/* Applications Tab */}
              <TabsContent value="applications">
                {product.applicationKeys && product.applicationKeys.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.applicationKeys.map((appKey, idx) => <div key={idx} className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">
                            {idx + 1}
                          </div>
                          <div>
                            <p className="text-foreground">{t(appKey)}</p>
                          </div>
                        </div>
                      </div>)}
                  </div> : <div className="text-center py-12 text-muted-foreground">
                    <p>{t('accessoryDetail.noApplications')}</p>
                  </div>}
              </TabsContent>

              {/* Downloads Tab */}
              <TabsContent value="downloads">
                {product.downloads && product.downloads.length > 0 ? <div className="space-y-6">
                    {[t('accessoryDetail.software'), t('accessoryDetail.documents'), t('accessoryDetail.drawings')].map(category => {
                  const categoryFiles = product.downloads?.filter(f => f.category === category || category === t('accessoryDetail.software') && f.category === '软件' || category === t('accessoryDetail.documents') && f.category === '文档' || category === t('accessoryDetail.drawings') && f.category === '图纸') || [];
                  if (categoryFiles.length === 0) return null;
                  return <div key={category}>
                          <h4 className="text-lg font-semibold mb-3">{category}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categoryFiles.map((file, idx) => <div key={idx} className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group cursor-pointer">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                  <Download className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium group-hover:text-primary transition-colors">{file.name}</p>
                                </div>
                              </div>)}
                          </div>
                        </div>;
                })}
                  </div> : <div className="text-center py-12 text-muted-foreground">
                    <p>{t('accessoryDetail.noDownloads')}</p>
                  </div>}
              </TabsContent>

              {/* FAQ Tab */}
              <TabsContent value="faq">
                <Accordion type="single" collapsible className="space-y-2">
                  {[1, 2, 3, 4, 5, 6].map(i => {
                    const q = t(`gimbal.faq.q${i}`);
                    const a = t(`gimbal.faq.a${i}`);
                    if (q === `gimbal.faq.q${i}`) return null;
                    return (
                      <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-6">
                        <AccordionTrigger className="text-left">{q}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Cross-Link VTX Section (K40T & K8T-V2) */}
        {(productId === 'k40t' || productId === 'k8t-v2') && (
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-8 flex flex-col md:flex-row items-start gap-6">
                <div className="p-4 bg-primary/10 rounded-xl text-primary flex-shrink-0">
                  <Zap className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{t(`gimbal.${productId === 'k8t-v2' ? 'k8tv2' : 'k40t'}.crossVtx.title`)}</h3>
                  <p className="text-muted-foreground mb-4">{t(`gimbal.${productId === 'k8t-v2' ? 'k8tv2' : 'k40t'}.crossVtx.desc`)}</p>
                  <Button variant="outline" className="group" asChild>
                    <Link to="/products/accessories/vtx-vrx">
                      {t(`gimbal.${productId === 'k8t-v2' ? 'k8tv2' : 'k40t'}.crossVtx.btn`)} →
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* K8T-V2 Platform Cross-Link */}
        {productId === 'k8t-v2' && (
          <section className="py-8 bg-muted/20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-8 flex flex-col md:flex-row items-start gap-6">
                <div className="p-4 bg-primary/10 rounded-xl text-primary flex-shrink-0">
                  <Play className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{t('gimbal.k8tv2.crossSwarm.title')}</h3>
                  <p className="text-muted-foreground mb-4">{t('gimbal.k8tv2.crossSwarm.desc')}</p>
                  <Button variant="outline" className="group" asChild>
                    <Link to="/products/swarm">
                      {t('gimbal.k8tv2.crossSwarm.btn')} →
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tech Whitepaper Link Card */}
        {(productId === 'k40t' || productId === 'k8t-v2') && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-2xl border border-primary/20 p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Play className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{t(`gimbal.${productId === 'k8t-v2' ? 'k8tv2' : 'k40t'}.whitepaper.title`)}</h3>
                    <p className="text-muted-foreground mb-4">{t(`gimbal.${productId === 'k8t-v2' ? 'k8tv2' : 'k40t'}.whitepaper.desc`)}</p>
                    <Button variant="outline" className="group" asChild>
                      <Link to={productId === 'k8t-v2' ? '/news/d0e1f2a3-4b5c-6d7e-8f9a-0b1c2d3e4f5a' : '/news/c9d0e1f2-3a4b-5c6d-7e8f-9a0b1c2d3e4f'}>
                        {t(`gimbal.${productId === 'k8t-v2' ? 'k8tv2' : 'k40t'}.whitepaper.cta`)} →
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{t('accessoryDetail.interestedTitle')}</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {t('accessoryDetail.interestedDesc')}
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">{t('accessoryDetail.contactUs')}</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white" asChild>
                <Link to="/products/accessories/gimbal" className="text-white">{t('accessoryDetail.viewMoreProducts')}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </>;
};
export default GimbalDetail;