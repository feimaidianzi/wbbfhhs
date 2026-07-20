import { useParams, Navigate } from "react-router-dom";
import { LangLink as Link } from "@/components/LangLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { BackButton } from "@/components/BackButton";
import { ArrowRight, Phone, Radio, Wifi, Zap, Signal, Shield, Settings, Check, BookOpen } from "lucide-react";
import { Helmet } from "@/lib/helmet-shim";
import { elrsProducts } from "@/data/elrsProducts";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  const { t, language } = useLanguage();

  if (!product) {
    return <Navigate to="/products/accessories/elrs" replace />;
  }

  const productName = t(product.nameKey);
  const productDesc = t(product.descriptionKey);

  // FAQ data
  const faqItems = [
    { q: t('elrs.faq.q1'), a: t('elrs.faq.a1') },
    { q: t('elrs.faq.q2'), a: t('elrs.faq.a2') },
    { q: t('elrs.faq.q3'), a: t('elrs.faq.a3') },
  ];

  // JSON-LD Product structured data
  const productStructuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: `CaniUAV ${productName}`,
    description: productDesc,
    brand: { '@type': 'Brand', name: 'CaniUAV' },
    sku: `CANI-ELRS-${product.id.toUpperCase()}`,
    manufacturer: {
      '@type': 'Organization',
      name: t('acc.cameradetail.k454'),
    },
    additionalProperty: product.specs.flatMap(specGroup =>
      specGroup.items.map(item => ({
        '@type': 'PropertyValue',
        name: t(item.labelKey),
        value: item.value,
      }))
    ),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
    },
  };

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  // Enhanced JSON-LD for specific ELRS products
  const enhancedStructuredData: Record<string, object> = {
    'elrs-915-diversity': {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: 'CANI ELRS 915 Diversity Industrial Dual-Antenna Receiver',
      image: 'https://caniuav.com/images/products/elrs/elrs-915-diversity-main.jpg',
      description: t('acc.elrsdetail.k549'),
      brand: { '@type': 'Brand', name: 'CANI' },
      sku: 'CANI-ELRS-915D',
      url: 'https://caniuav.com/zh/products/accessories/elrs/elrs-915-diversity',
      offers: { '@type': 'Offer', priceCurrency: 'CNY', availability: 'https://schema.org/InStock' },
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Control Protocol', value: 'ExpressLRS (ELRS)' },
        { '@type': 'PropertyValue', name: 'Hardware Architecture', value: 'True Diversity dual independent receive circuits' },
        { '@type': 'PropertyValue', name: 'Frequency', value: '915MHz (868MHz optional)' },
      ],
    },
    'elrs-915-receiver': {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: 'CANI ELRS 915MHz Nano Standard Receiver',
      image: 'https://caniuav.com/images/products/elrs/elrs-915-receiver-main.jpg',
      description: t('acc.elrsdetail.k550'),
      brand: { '@type': 'Brand', name: 'CANI' },
      sku: 'CANI-ELRS-915N',
      url: 'https://caniuav.com/zh/products/accessories/elrs/elrs-915-receiver',
      offers: { '@type': 'Offer', priceCurrency: 'CNY', availability: 'https://schema.org/InStock' },
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Weight', value: '0.6g' },
        { '@type': 'PropertyValue', name: 'Dimensions', value: '10x10mm' },
        { '@type': 'PropertyValue', name: 'Core Features', value: 'High refresh rate / long-range control' },
      ],
    },
    'elrs-lite-2-4g': {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: 'CANI ELRS Lite 2.4G High-Refresh Receiver',
      image: 'https://caniuav.com/images/products/elrs/elrs-lite-2-4g-main.jpg',
      description: t('acc.elrsdetail.k551'),
      brand: { '@type': 'Brand', name: 'CANI' },
      sku: 'CANI-ELRS-L24G',
      url: 'https://caniuav.com/zh/products/accessories/elrs/elrs-lite-2-4g',
      offers: { '@type': 'Offer', priceCurrency: 'CNY', availability: 'https://schema.org/InStock' },
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Refresh Rate', value: '1000Hz (1kHz)' },
        { '@type': 'PropertyValue', name: 'Antenna Type', value: 'SMT ceramic / IPEX optional' },
        { '@type': 'PropertyValue', name: 'Band', value: '2.4GHz ISM' },
      ],
    },
    'elrs-2-4g-lna': {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: 'CANI ELRS 2.4G LNA Industrial High-Sensitivity Receiver',
      image: 'https://caniuav.com/images/products/elrs/elrs-2-4g-lna-main.jpg',
      description: t('acc.elrsdetail.k552'),
      brand: { '@type': 'Brand', name: 'CANI' },
      sku: 'CANI-ELRS-24GLNA',
      url: 'https://caniuav.com/zh/products/accessories/elrs/elrs-2-4g-lna',
      offers: { '@type': 'Offer', priceCurrency: 'CNY', availability: 'https://schema.org/InStock' },
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Telemetry Power', value: '100mW' },
        { '@type': 'PropertyValue', name: 'Core Technology', value: 'LNA + PA bidirectional amplification' },
        { '@type': 'PropertyValue', name: 'Max Refresh Rate', value: '1000Hz' },
      ],
    },
    'elrs-915-moxon-antenna': {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: 'CANI ELRS 915 Moxon Directional High-Gain Antenna',
      image: 'https://caniuav.com/images/products/elrs/elrs-915-moxon-main.jpg',
      description: t('acc.elrsdetail.k553'),
      brand: { '@type': 'Brand', name: 'CANI' },
      sku: 'CANI-ELRS-915-MOX',
      url: 'https://caniuav.com/zh/products/accessories/elrs/elrs-915-moxon-antenna',
      offers: { '@type': 'Offer', priceCurrency: 'CNY', availability: 'https://schema.org/InStock' },
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Gain', value: '5.5dBi' },
        { '@type': 'PropertyValue', name: 'Beam Width', value: '180° (directional)' },
        { '@type': 'PropertyValue', name: 'Interface', value: 'SMA / RP-SMA optional' },
      ],
    },
    'elrs-2-4g-antenna': {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: 'CANI ELRS 2.4G High-Gain T-Type Omnidirectional Antenna',
      image: 'https://caniuav.com/images/products/elrs/elrs-2-4g-antenna-main.jpg',
      description: t('acc.elrsdetail.k554'),
      brand: { '@type': 'Brand', name: 'CANI' },
      sku: 'CANI-ELRS-24G-T',
      url: 'https://caniuav.com/zh/products/accessories/elrs/elrs-2-4g-antenna',
      offers: { '@type': 'Offer', priceCurrency: 'CNY', availability: 'https://schema.org/InStock' },
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'VSWR', value: '< 1.5' },
        { '@type': 'PropertyValue', name: 'Polarization', value: 'Vertical polarization' },
        { '@type': 'PropertyValue', name: 'Compatibility', value: 'ELRS Lite 2.4G / LNA only' },
      ],
    },
    'elrs-915-antenna': {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: 'CANI ELRS 915MHz High-Gain T-Type Omnidirectional Antenna',
      image: 'https://caniuav.com/images/products/elrs/elrs-915-antenna-main.jpg',
      description: t('acc.elrsdetail.k555'),
      brand: { '@type': 'Brand', name: 'CANI' },
      sku: 'CANI-ELRS-915-T',
      url: 'https://caniuav.com/zh/products/accessories/elrs/elrs-915-antenna',
      offers: { '@type': 'Offer', priceCurrency: 'CNY', availability: 'https://schema.org/InStock' },
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'VSWR', value: '< 1.2' },
        { '@type': 'PropertyValue', name: 'Coverage', value: '360° omnidirectional' },
        { '@type': 'PropertyValue', name: 'Reinforced Interface', value: 'Industrial-grade molding' },
      ],
    },
  };
  const productEnhancedData = productId ? enhancedStructuredData[productId] || null : null;

  // Deep dive article mapping
  const deepDiveArticleMap: Record<string, { id: string; titleZh: string; titleEn: string; descZh: string; descEn: string }> = {
    'elrs-915-diversity': {
      id: 'tech-elrs-915-diversity-long-range-control',
      titleZh: 'CANI ELRS 915 Diversity：工业无人机超视距控制的"最后一道防线"',
      titleEn: 'CANI ELRS 915 Diversity: The Last Line of Defense for BVLOS Control',
      descZh: '深度解析ExpressLRS协议优势、双天线真多样性接收逻辑、915MHz频段物理特性及LoRa CSS调制技术。',
      descEn: 'In-depth analysis of ExpressLRS protocol advantages, true diversity reception, 915MHz band physics, and LoRa CSS modulation.',
    },
    'elrs-915-receiver': {
      id: 'tech-elrs-915-standard-nano-receiver-guide',
      titleZh: 'CANI ELRS 915 标准版：0.6g超微型Nano接收机如何实现长距离控制',
      titleEn: 'CANI ELRS 915 Standard: How a 0.6g Nano Receiver Achieves Long-Range Control',
      descZh: '深度解析Nano尺寸空间利用率、915MHz频段FSPL链路预算、低功耗管理及与SJ4000-WiFi的轻量化闭环方案。',
      descEn: 'Deep dive into Nano size efficiency, 915MHz FSPL link budget, low power management, and lightweight visual control loop with SJ4000-WiFi.',
    },
    'elrs-lite-2-4g': {
      id: 'tech-elrs-lite-2-4g-1000hz-low-latency-guide',
      titleZh: 'CANI ELRS Lite 2.4G：1000Hz刷新率如何重新定义超低延迟无人机控制链路',
      titleEn: 'CANI ELRS Lite 2.4G: How 1000Hz Refresh Rate Redefines Ultra-Low Latency UAV Control',
      descZh: '深度解析2.4GHz宽带宽物理优势、端到端延迟数学模型（T=Tsampling+Tpacket+Trf）、SMT陶瓷天线设计及2.4G与915MHz选型指南。',
      descEn: 'In-depth analysis of 2.4GHz wideband physics, end-to-end latency model, SMT ceramic antenna design, and 2.4G vs 915MHz selection guide.',
    },
    'elrs-2-4g-lna': {
      id: 'tech-elrs-2-4g-lna-long-range-sensitivity-guide',
      titleZh: 'CANI ELRS 2.4G LNA：工业级高灵敏度接收机如何突破2.4G远航距离瓶颈',
      titleEn: 'CANI ELRS 2.4G LNA: How Industrial-Grade High-Sensitivity Receiver Breaks Through 2.4G Long-Range Barriers',
      descZh: '深度解析LNA增益补偿逻辑（SNR公式）、100mW PA双向功率平衡、T型全向天线优化及Mesh-Link备份链路适配方案。',
      descEn: 'In-depth analysis of LNA gain compensation (SNR formula), 100mW PA bidirectional power balance, T-type omnidirectional antenna, and Mesh-Link backup link integration.',
    },
    'elrs-915-moxon-antenna': {
      id: 'tech-elrs-915-moxon-antenna-range-optimization-guide',
      titleZh: 'CANI ELRS 915 Moxon遥控天线：5.5dBi定向增益如何突破超视距控制距离瓶颈',
      titleEn: 'CANI ELRS 915 Moxon Antenna: How 5.5dBi Directional Gain Breaks Through BVLOS Range Barriers',
      descZh: '深度解析Moxon矩形架构波束赋形原理、距离提升公式（d=d₀·10^(Gdiff/20)）、极化匹配优化及ELRS 915远航链路构建方案。',
      descEn: 'In-depth analysis of Moxon beamforming, range enhancement formula, polarization matching optimization, and ELRS 915 long-range link ecosystem.',
    },
    'elrs-2-4g-antenna': {
      id: 'tech-elrs-2-4g-antenna-vswr-stability-guide',
      titleZh: 'CANI ELRS 2.4G遥控天线：驻波比优化如何为1000Hz高刷控制链路筑牢物理基石',
      titleEn: 'CANI ELRS 2.4G Antenna: How VSWR Optimization Builds the Physical Foundation for 1000Hz Control',
      descZh: '深度解析驻波比（VSWR < 1.5）优化逻辑、反射系数公式（Γ=(VSWR-1)/(VSWR+1)）、T型偶极子极化匹配及中心频点调校技术。',
      descEn: 'In-depth analysis of VSWR optimization, reflection coefficient formula, T-type dipole polarization matching, and center frequency calibration for 1000Hz stability.',
    },
    'elrs-915-antenna': {
      id: 'tech-elrs-915-t-antenna-omni-directional-stability-guide',
      titleZh: 'CANI ELRS 915 遥控天线（T型全向版）：VSWR < 1.2如何为远航巡检筑牢360°全向覆盖基石',
      titleEn: 'CANI ELRS 915 T-Type Antenna: How VSWR < 1.2 Builds 360° Coverage for Long-Range Inspection',
      descZh: '深度解析"面包圈"全向辐射场型、回波损耗公式（RL=-20log₁₀((VSWR-1)/(VSWR+1))）、工业级耐用性设计及与Moxon定向天线的选型差异。',
      descEn: 'In-depth analysis of toroidal radiation pattern, return loss formula, industrial-grade durability, and T-Type vs Moxon selection guide.',
    },
  };
  const deepDiveInfo = productId ? deepDiveArticleMap[productId] : undefined;

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO 
        title={`${productName} - ${t('elrsDetail.seoTitle')}`}
        description={productDesc}
        keywords={`${productName},ELRS,ExpressLRS,${product.keyFeatureKeys.map(k => t(k)).join(',')}`}
        path={`/products/accessories/elrs/${productId}`}
        type="product"
        structuredData={[productStructuredData, faqStructuredData]}
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <BackButton to="/products/accessories/elrs" />

        {/* Hero Section */}
        <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-accent/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.08),transparent_50%)]" />
          <div className="relative container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <img
                    src={product.image}
                    alt={`CANI ${t(product.nameKey)} - Industrial ELRS 2.4GHz/915MHz Remote Control Receiver Hardware`}
                    className="w-full h-auto max-h-[400px] object-contain mx-auto"
                  />
                </div>
              </div>
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
                <div className="flex flex-wrap gap-3 mb-8">
                  {product.keyFeatureKeys.map((featureKey, i) => (
                    <span key={i} className="bg-white/10 backdrop-blur text-primary-foreground px-4 py-2 rounded-full text-sm">
                      {t(featureKey)}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 mb-8">
                  <Link to="/contact">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3">
                      <Phone className="w-4 h-4 mr-2" />
                      {t('accessoryDetail.inquireNow')}
                    </Button>
                  </Link>
                  <Button className="bg-transparent border border-white/50 text-white hover:bg-white/10 px-6 py-3">
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
                  <div key={index} className="bg-card rounded-xl p-6 border border-border hover:border-accent/50 transition-colors">
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

        {/* Deep Dive Article Card */}
        {deepDiveInfo && (
          <section className="py-12 bg-background">
            <div className="container-custom max-w-4xl mx-auto">
              <Link to={`/news/${deepDiveInfo.id}`}>
                <div className="bg-card border border-accent/30 rounded-2xl p-6 md:p-8 hover:border-accent/60 hover:shadow-lg transition-all group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-accent mb-1">
                        {t('acc.cameradetail.k457')}
                      </p>
                      <h3 className="text-lg font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                        {language === 'zh' ? deepDiveInfo.titleZh : deepDiveInfo.titleEn}
                      </h3>
                      <p className="text-sm text-muted-foreground">
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

        {/* FAQ Section */}
        <section className="py-16 bg-background">
          <div className="container-custom max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              {t('acc.cameradetail.k456')}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((faq, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`}>
                  <AccordionTrigger className="text-left text-base font-medium">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Enhanced JSON-LD */}
        {productEnhancedData && (
          <Helmet>
            <script type="application/ld+json">{JSON.stringify(productEnhancedData)}</script>
          </Helmet>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">{t('accessoryDetail.needMoreInfo')}</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">{t('accessoryDetail.contactDesc')}</p>
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
