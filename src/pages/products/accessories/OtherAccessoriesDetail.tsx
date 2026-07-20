import { useParams, Navigate } from "react-router-dom";
import { LangLink as Link } from "@/components/LangLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { BackButton } from "@/components/BackButton";
import { ArrowRight, Phone, Monitor, Tv, Satellite, Navigation, Check, Shield, Zap, Settings, BookOpen } from "lucide-react";
import { otherAccessoriesProducts } from "@/data/otherAccessoriesProducts";
import { translateOtherAccKey } from "@/data/otherAccessoriesFallback";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "@/lib/helmet-shim";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "otherAcc.feature.ipsHD.title": Monitor,
  "otherAcc.feature.40chRx.title": Satellite,
  "otherAcc.feature.builtInDVR.title": Tv,
  "otherAcc.feature.builtInBattery.title": Zap,
  "otherAcc.feature.portable.title": Shield,
  "otherAcc.feature.plugAndPlay.title": Check,
  "otherAcc.feature.dualDiversity.title": Satellite,
  "otherAcc.feature.immersive.title": Tv,
  "otherAcc.feature.40chCoverage.title": Satellite,
  "otherAcc.feature.longBattery.title": Zap,
  "otherAcc.feature.comfortWear.title": Shield,
  "otherAcc.feature.entryLevel.title": Check,
  "otherAcc.feature.dvrRecord.title": Tv,
  "otherAcc.feature.sunHood.title": Shield,
  "otherAcc.feature.7inchBig.title": Monitor,
  "otherAcc.feature.highBrightness.title": Monitor,
  "otherAcc.feature.wideVoltage.title": Zap,
  "otherAcc.feature.professional.title": Shield,
  "otherAcc.feature.m10HighPerf.title": Satellite,
  "otherAcc.feature.fastLock.title": Navigation,
  "otherAcc.feature.highAccuracy.title": Navigation,
  "otherAcc.feature.120mmStandard.title": Settings,
  "otherAcc.feature.lowPower.title": Zap,
  "otherAcc.feature.180mmSpacing.title": Settings,
  "otherAcc.feature.fastPosition.title": Navigation,
  "otherAcc.feature.lightweight.title": Shield,
  "otherAcc.feature.easyInstall.title": Check,
  "otherAcc.feature.250mmSpacing.title": Settings,
  "otherAcc.feature.stableReliable.title": Shield,
  "otherAcc.feature.gpsCompass2in1.title": Satellite,
  "otherAcc.feature.5883Compass.title": Navigation,
  "otherAcc.feature.m10GpsChip.title": Satellite,
  "otherAcc.feature.integrated.title": Settings,
  "otherAcc.feature.dualInterface.title": Settings,
  "otherAcc.feature.2in1Design.title": Settings,
  "otherAcc.feature.5883ECompass.title": Navigation,
  "otherAcc.feature.m10Positioning.title": Satellite,
  "otherAcc.feature.antiInterference.title": Shield,
  "otherAcc.feature.compactDesign.title": Shield,
  "otherAcc.feature.120mmSpacing.title": Settings,
  "otherAcc.feature.highPrecision.title": Navigation,
};

const OtherAccessoriesDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = otherAccessoriesProducts.find(p => p.id === productId);
  const { t, language } = useLanguage();
  const tf = (key: string) => translateOtherAccKey(key, t);

  if (!product) {
    return <Navigate to="/products/accessories/others" replace />;
  }

  const productName = tf(product.nameKey);
  const productDesc = tf(product.descriptionKey);

  // Enhanced JSON-LD structured data
  const enhancedStructuredData: Record<string, object> = {
    'monitor-5-ips-dvr': {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: 'CANI 5-inch IPS HD Dual-Receiver DVR Monitor',
      image: 'https://caniuav.com/images/products/others/monitor-5-ips-dvr-main.jpg',
      description: t('acc.otheraccessoriesdetail.k589'),
      brand: { '@type': 'Brand', name: 'CANI' },
      sku: 'CANI-MON-5-IPS',
      url: 'https://caniuav.com/zh/products/accessories/others/monitor-5-ips-dvr',
      offers: { '@type': 'Offer', priceCurrency: 'CNY', availability: 'https://schema.org/InStock' },
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Screen Brightness', value: '600cd/m²' },
        { '@type': 'PropertyValue', name: 'Receive Mode', value: 'Dual-antenna diversity' },
        { '@type': 'PropertyValue', name: 'Recording Storage', value: 'DVR (up to 32GB TF card)' },
      ],
    },
    'fpv-goggles-40ch': {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: t('acc.otheraccessoriesdetail.k590'),
      image: 'https://caniuav.com/images/products/others/fpv-goggles-40ch-main.jpg',
      description: t('acc.otheraccessoriesdetail.k591'),
      brand: { '@type': 'Brand', name: 'CANI' },
      sku: 'CANI-FPV-GOG-40',
      url: 'https://caniuav.com/zh/products/accessories/others/fpv-goggles-40ch',
      offers: { '@type': 'Offer', priceCurrency: 'CNY', availability: 'https://schema.org/InStock' },
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Receive Sensitivity', value: '-90dBm' },
        { '@type': 'PropertyValue', name: 'Aspect Ratio', value: '16:9' },
        { '@type': 'PropertyValue', name: 'Battery Capacity', value: '2000mAh (built-in)' },
      ],
    },
    'monitor-4-3-dvr': {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: t('acc.otheraccessoriesdetail.k592'),
      image: 'https://caniuav.com/images/products/others/monitor-4-3-dvr-main.jpg',
      description: t('acc.otheraccessoriesdetail.k593'),
      brand: { '@type': 'Brand', name: 'CANI' },
      sku: 'CANI-MON-43-DVR',
      url: 'https://caniuav.com/zh/products/accessories/others/monitor-4-3-dvr',
      offers: { '@type': 'Offer', priceCurrency: 'CNY', availability: 'https://schema.org/InStock' },
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Screen Size', value: '4.3 inch' },
        { '@type': 'PropertyValue', name: 'Battery Life', value: '~3 hours' },
        { '@type': 'PropertyValue', name: 'Recording Storage', value: 'DVR (loop recording)' },
      ],
    },
  };
  const productEnhancedData = productId ? enhancedStructuredData[productId] || null : null;

  // Deep dive article mapping
  const deepDiveArticleMap: Record<string, { id: string; titleZh: string; titleEn: string; descZh: string; descEn: string }> = {
    'monitor-5-ips-dvr': {
      id: 'tech-fpv-monitor-5-ips-dvr-display-guide',
      titleZh: 'CANI 5寸 IPS DVR 监视器：双天线多样性接收与600cd/m²高亮如何构建户外巡检视觉闭环',
      titleEn: 'CANI 5-Inch IPS DVR Monitor: How Dual-Antenna Diversity and 600cd/m² Build Outdoor Inspection Visual Loop',
      descZh: '深度解析IPS全视角技术、双天线多样性接收公式（Prec=max(A,B)）、600cd/m²恒流高亮驱动及DVR黑匣子录像功能。',
      descEn: 'In-depth analysis of IPS wide-angle technology, dual-antenna diversity formula, 600cd/m² constant-current backlight, and DVR black-box recording.',
    },
    'fpv-goggles-40ch': {
      id: 'tech-fpv-goggles-40ch-immersive-flight-guide',
      titleZh: 'CANI FPV飞行眼镜（40通道版）：零光干涉光路与-90dBm高灵敏度如何重塑沉浸式飞行体验',
      titleEn: 'CANI FPV Goggles (40CH): How Zero-Light-Interference Optics and -90dBm Sensitivity Redefine Immersive Flight',
      descZh: '深度解析零光干涉密闭光路设计、-90dBm灵敏度门限、人体工学配重设计及双模视觉方案（眼镜vs监视器）选型指南。',
      descEn: 'In-depth analysis of zero-light-interference optics, -90dBm sensitivity threshold, ergonomic design, and dual-mode visual solution selection guide.',
    },
    'monitor-4-3-dvr': {
      id: 'tech-portable-monitor-4-3-dvr-field-guide',
      titleZh: 'CANI 4.3寸 DVR 监视器：NTSC/PAL自适应与功耗管理模型如何打造极致轻便的野外调机利器',
      titleEn: 'CANI 4.3-Inch DVR Monitor: How NTSC/PAL Auto-Detection and Power Management Model Create the Ultimate Portable Field Tool',
      descZh: '深度解析NTSC/PAL自适应逻辑、功耗管理公式（Twork=Cbattery/Iload）、DVR黑匣子循环录制及多层级视觉终端选型指南。',
      descEn: 'In-depth analysis of NTSC/PAL auto-detection, power management formula, DVR black-box loop recording, and multi-tier visual terminal selection guide.',
    },
  };
  const deepDiveInfo = productId ? deepDiveArticleMap[productId] : undefined;

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO 
        title={`${productName} - ${t('accessory.others')}`}
        description={productDesc}
        keywords={`${productName},${product.keyFeatureKeys.map(k => tf(k)).join(',')}`}
        path={`/products/accessories/others/${productId}`}
        type="product"
        structuredData={productEnhancedData ? [productEnhancedData] : undefined}
      />
      {productEnhancedData && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(productEnhancedData)}</script>
        </Helmet>
      )}
      <Header />
      <main className="pt-16 md:pt-20">
        <BackButton to="/products/accessories/others" />

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
                  {product.category === "monitor" ? <Tv className="w-4 h-4" /> : <Satellite className="w-4 h-4" />}
                  {tf(product.sloganKey)}
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
                      {tf(featureKey)}
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
                    variant="outline" 
                    className="border-white/50 text-white hover:bg-white/10 px-6 py-3"
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
                    <h3 className="text-lg font-bold text-card-foreground mb-2">{tf(feature.titleKey)}</h3>
                    <p className="text-muted-foreground text-sm">{tf(feature.descriptionKey)}</p>
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
                      <h3 className="font-bold text-foreground">{tf(specGroup.categoryKey)}</h3>
                    </div>
                    <div className="divide-y divide-border">
                      {specGroup.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between px-6 py-3">
                          <span className="text-muted-foreground">{tf(item.labelKey)}</span>
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

        {/* Deep Dive Article Card */}
        {deepDiveInfo && (
          <section className="py-12 bg-background">
            <div className="container-custom max-w-4xl">
              <Link to={`/news/${deepDiveInfo.id}`}>
                <div className="group bg-card rounded-2xl p-8 border border-accent/30 hover:border-accent hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <BookOpen className="w-7 h-7 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-accent mb-1">📖 {t('prod.logistics.k451')}</p>
                      <h3 className="text-lg font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                        {language === 'zh' ? deepDiveInfo.titleZh : deepDiveInfo.titleEn}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {language === 'zh' ? deepDiveInfo.descZh : deepDiveInfo.descEn}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

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
              <Link to="/products/accessories/others">
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

export default OtherAccessoriesDetail;
