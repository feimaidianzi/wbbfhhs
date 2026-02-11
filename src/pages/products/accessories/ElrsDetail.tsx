import { useParams, Navigate } from "react-router-dom";
import { LangLink as Link } from "@/components/LangLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { BackButton } from "@/components/BackButton";
import { ArrowRight, Phone, Radio, Wifi, Zap, Signal, Shield, Settings, Check } from "lucide-react";
import { elrsProducts } from "@/data/elrsProducts";
import { useLanguage } from "@/contexts/LanguageContext";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "elrs.feature.dualAntenna.title": Radio,
  "elrs.feature.ultraRange.title": Signal,
  "elrs.feature.ultraLowLatency.title": Zap,
  "elrs.feature.firmwareUpgrade.title": Settings,
  "elrs.feature.lightweight.title": Shield,
  "elrs.feature.multiRate.title": Wifi,
  "elrs.feature.matureStable.title": Shield,
  "elrs.feature.compact.title": Shield,
  "elrs.feature.simple.title": Check,
  "elrs.feature.openSource.title": Settings,
  "elrs.feature.ultraLight.title": Shield,
  "elrs.feature.ceramicAntenna.title": Radio,
  "elrs.feature.highRefresh.title": Zap,
  "elrs.feature.beginner.title": Check,
  "elrs.feature.indoor.title": Shield,
  "elrs.feature.multiPower.title": Settings,
  "elrs.feature.lnaBoost.title": Signal,
  "elrs.feature.highSensitivity.title": Signal,
  "elrs.feature.antiInterference.title": Shield,
  "elrs.feature.longRange24g.title": Signal,
  "elrs.feature.stableReliable.title": Shield,
  "elrs.feature.moxonDirectional.title": Radio,
  "elrs.feature.highGain.title": Signal,
  "elrs.feature.rcDedicated.title": Radio,
  "elrs.feature.qualityCraft.title": Shield,
  "elrs.feature.plugPlay.title": Check,
  "elrs.feature.longRangeEssential.title": Signal,
  "elrs.feature.tDesign.title": Radio,
  "elrs.feature.superLight.title": Shield,
  "elrs.feature.ipexPort.title": Settings,
  "elrs.feature.stableSignal.title": Signal,
  "elrs.feature.durableDesign.title": Shield,
  "elrs.feature.costEffective.title": Check,
  "elrs.feature.longRangeOptimized.title": Signal,
  "elrs.feature.flexMaterial.title": Shield,
  "elrs.feature.easyInstall.title": Check,
  "elrs.feature.stableRx.title": Signal,
  "elrs.feature.durableReliable.title": Shield,
};

const ElrsDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = elrsProducts.find(p => p.id === productId);
  const { t } = useLanguage();

  if (!product) {
    return <Navigate to="/products/accessories/elrs" replace />;
  }

  const productName = t(product.nameKey);
  const productDesc = t(product.descriptionKey);

  return (
    <div className="min-h-screen">
      <SEO 
        title={`${productName} - ${t('elrsDetail.seoTitle')}`}
        description={productDesc}
        keywords={`${productName},ELRS,ExpressLRS,${product.keyFeatureKeys.map(k => t(k)).join(',')}`}
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <BackButton to="/products/accessories/elrs" />

        {/* Hero Section */}
        <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-accent/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.08),transparent_50%)]" />
          <div className="relative container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Product Image */}
              <div className="order-2 lg:order-1">
                <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <img
                    src={product.image}
                    alt={productName}
                    className="w-full h-auto max-h-[400px] object-contain mx-auto"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Radio className="w-4 h-4" />
                  {t(product.sloganKey)}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                  {productName}
                </h1>
                <p className="text-lg text-primary-foreground/80 mb-6">
                  {productDesc}
                </p>
                
                {/* Key Features */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {product.keyFeatureKeys.map((featureKey, i) => (
                    <span key={i} className="bg-white/10 backdrop-blur text-primary-foreground px-4 py-2 rounded-full text-sm">
                      {t(featureKey)}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-4 mb-8">
                  <Link to="/contact">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3">
                      <Phone className="w-4 h-4 mr-2" />
                      {t('accessoryDetail.inquireNow')}
                    </Button>
                  </Link>
                  <Button 
                    className="bg-transparent border border-white/50 text-white hover:bg-white/10 px-6 py-3"
                  >
                    {t('accessoryDetail.downloadManual')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{t('accessoryDetail.productFeatures')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((feature, index) => {
                const IconComponent = iconMap[feature.titleKey] || Check;
                return (
                  <div 
                    key={index}
                    className="bg-card rounded-xl p-6 border border-border hover:border-accent/50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-card-foreground mb-2">{t(feature.titleKey)}</h3>
                    <p className="text-muted-foreground text-sm">{t(feature.descriptionKey)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Specifications Section */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{t('accessoryDetail.techSpecs')}</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl overflow-hidden shadow-lg">
                {product.specs.map((specGroup, groupIndex) => (
                  <div key={groupIndex} className="border-b border-border last:border-b-0">
                    <div className="bg-primary/5 px-6 py-4">
                      <h3 className="font-bold text-foreground">{t(specGroup.categoryKey)}</h3>
                    </div>
                    <div className="divide-y divide-border">
                      {specGroup.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between px-6 py-3">
                          <span className="text-muted-foreground">{t(item.labelKey)}</span>
                          <span className="font-medium text-foreground">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t('accessoryDetail.needMoreInfo')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('accessoryDetail.contactDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                  {t('contact.title')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/products/accessories/elrs">
                <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-8 py-6 text-lg">
                  {t('accessoryDetail.viewMoreProducts')}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default ElrsDetail;
