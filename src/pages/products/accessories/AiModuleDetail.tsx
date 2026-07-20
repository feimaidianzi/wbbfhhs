import { useParams, Navigate } from "react-router-dom";
import { LangLink as Link } from "@/components/LangLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAiModuleProductById } from "@/data/aiModuleProducts";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const AiModuleDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getAiModuleProductById(productId) : null;
  const [selectedImage, setSelectedImage] = useState(0);
  const { t } = useLanguage();

  if (!product) {
    return <Navigate to="/products/accessories/ai-module" replace />;
  }

  const skuTitle = `${t(product.nameKey)} - ${t('company.name')}`;
  const skuDesc = `${t(product.nameKey)}，${product.highlightKeys.slice(0, 3).map(k => t(k)).join('，')}`;

  const productStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: t(product.nameKey),
    description: skuDesc,
    image: product.image,
    sku: product.model,
    brand: { '@type': 'Brand', name: 'CANI' },
    category: t(product.categoryKey),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: `https://caniuav.com/products/accessories/ai-module/${productId}`,
    },
  };

  const images = product.images;

  return (
    <>
      <MultiLanguageSEO
        title={skuTitle}
        description={skuDesc}
        path={`/products/accessories/ai-module/${productId}`}
        type="product"
        structuredData={[productStructuredData]}
      />
      <Header />
      <main className="min-h-screen bg-background">
        <BackButton to="/products/accessories/ai-module" />

        {/* Hero Section */}
        {product.sloganKey && (
          <section className="pt-20 pb-16 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex items-center justify-center">
                  <img loading="lazy" decoding="async" src={images[selectedImage]} alt={t(product.nameKey)} className="max-h-[400px] max-w-full object-contain drop-shadow-2xl" />
                </div>
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">{t(product.sloganKey)}</h1>
                  <p className="text-2xl text-zinc-400 mb-8">{product.subSloganKey ? t(product.subSloganKey) : ''}</p>
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
          </section>
        )}

        {/* Product Info */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-4">
                <div className="bg-card rounded-2xl p-8 border border-border aspect-square flex items-center justify-center">
                  <img loading="lazy" decoding="async" src={images[selectedImage]} alt={t(product.nameKey)} className="max-h-full max-w-full object-contain" />
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                      <button key={idx} onClick={() => setSelectedImage(idx)} className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${selectedImage === idx ? 'border-primary' : 'border-border hover:border-primary/50'}`}>
                        <img loading="lazy" decoding="async" src={img} alt={`${t(product.nameKey)} ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">{t(product.categoryKey)}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{t(product.nameKey)}</h2>
                <p className="text-xl text-muted-foreground mb-6">{product.model}</p>

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

        {/* Tabs Section */}
        <section className="py-20" id="specs">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-8">
                <TabsTrigger value="specs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">
                  {t('accessoryDetail.techSpecs')}
                </TabsTrigger>
                <TabsTrigger value="features" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">
                  {t('accessoryDetail.productFeatures')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="specs">
                <div className="space-y-6">
                  {(() => {
                    const categories = [...new Set(product.specs.map(s => s.categoryKey).filter(Boolean))];
                    return categories.map(categoryKey => {
                      const categorySpecs = product.specs.filter(s => s.categoryKey === categoryKey);
                      return (
                        <div key={categoryKey} className="bg-card rounded-xl border border-border overflow-hidden">
                          <div className="px-6 py-3 bg-muted/50 border-b border-border">
                            <h4 className="font-semibold">{t(categoryKey!)}</h4>
                          </div>
                          <table className="w-full">
                            <tbody>
                              {categorySpecs.map((spec, idx) => (
                                <tr key={idx} className="border-b border-border last:border-b-0">
                                  <td className="px-6 py-4 font-medium bg-muted/30 w-1/3">{t(spec.labelKey)}</td>
                                  <td className="px-6 py-4">{spec.value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    });
                  })()}
                </div>
              </TabsContent>

              <TabsContent value="features">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.descriptionKeys.map((descKey, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{t(descKey)}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
};

export default AiModuleDetail;
