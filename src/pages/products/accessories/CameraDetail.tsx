import { useParams } from "react-router-dom";
import { LangLink as Link } from "@/components/LangLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { BackButton } from "@/components/BackButton";
import { cameraProducts } from "@/data/cameraProducts";
import { ArrowRight, Check, Camera, Wifi, Droplets, Monitor, Battery, Aperture } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import sj4000Lens from "@/assets/camera/sj4000-lens.png";
import sj4000Colors from "@/assets/camera/sj4000-colors.png";
import sj4000Accessories from "@/assets/camera/sj4000-accessories.png";
import sj4000HdQuality from "@/assets/camera/sj4000-hd-quality.png";
import sj4000AppShare from "@/assets/camera/sj4000-app-share.png";

const featureIcons: Record<string, React.ReactNode> = {
  "1200万像素COMS大广角成像": <Aperture className="w-8 h-8" />,
  "12MP CMOS Ultra-Wide Imaging": <Aperture className="w-8 h-8" />,
  "1080P高清画质": <Monitor className="w-8 h-8" />,
  "1080P Full HD Video": <Monitor className="w-8 h-8" />,
  "WiFi无线传输": <Wifi className="w-8 h-8" />,
  "WiFi Wireless Streaming": <Wifi className="w-8 h-8" />,
  "30米防水设计": <Droplets className="w-8 h-8" />,
  "30m Waterproof Design": <Droplets className="w-8 h-8" />,
  "多种安装配件": <Camera className="w-8 h-8" />,
  "Versatile Mounting Accessories": <Camera className="w-8 h-8" />,
  "移动侦测功能": <Battery className="w-8 h-8" />,
  "Motion Detection Recording": <Battery className="w-8 h-8" />,
};

const CameraDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = cameraProducts.find((p) => p.id === productId);
  const { t, language } = useLanguage();

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{t('accessoryDetail.productNotFound')}</h1>
            <Link to="/products/accessories/camera" className="text-primary hover:underline">
              {t('accessoryDetail.backToCamera')}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // SKU-specific TDK
  const seoTitle = t(`camera.tdk.${productId}.title`) !== `camera.tdk.${productId}.title`
    ? t(`camera.tdk.${productId}.title`)
    : t(product.nameKey);
  const seoDesc = t(`camera.tdk.${productId}.desc`) !== `camera.tdk.${productId}.desc`
    ? t(`camera.tdk.${productId}.desc`)
    : `${t(product.sloganKey)}. ${product.highlightKeys.map(k => t(k)).join(', ')}`;
  const seoKeywords = t(`camera.tdk.${productId}.keywords`) !== `camera.tdk.${productId}.keywords`
    ? t(`camera.tdk.${productId}.keywords`)
    : `${product.model},${t('accessoryDetail.cameraKeywords')}`;

  // FAQ data
  const faqItems = [
    { q: t('camera.faq.q1'), a: t('camera.faq.a1') },
    { q: t('camera.faq.q2'), a: t('camera.faq.a2') },
    { q: t('camera.faq.q3'), a: t('camera.faq.a3') },
  ];

  // JSON-LD Product structured data
  const productStructuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: language === 'zh' ? `CaniUAV ${product.model} 无人机运动相机` : `CaniUAV ${product.model} Action Camera`,
    description: seoDesc,
    brand: { '@type': 'Brand', name: 'CaniUAV' },
    sku: `CANI-${product.model.replace(/\s+/g, '-').toUpperCase()}`,
    manufacturer: {
      '@type': 'Organization',
      name: language === 'zh' ? 'CANI长凌科技' : 'CANI Technology Co., Ltd.',
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Video Resolution', value: '1080P Full HD (1920×1080) @30fps' },
      { '@type': 'PropertyValue', name: 'Sensor', value: '12MP CMOS (AR0330)' },
      { '@type': 'PropertyValue', name: 'Field of View', value: '170° Ultra-Wide Angle' },
      { '@type': 'PropertyValue', name: 'Wireless', value: 'WiFi (Android/iOS)' },
      { '@type': 'PropertyValue', name: 'Waterproof', value: '30m (IP68 Housing)' },
      { '@type': 'PropertyValue', name: 'Storage', value: 'MicroSD up to 64GB' },
      { '@type': 'PropertyValue', name: 'Weight', value: '62.5g (with battery)' },
      { '@type': 'PropertyValue', name: 'Display', value: '2.0" LCD' },
    ],
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

  const quickAnswerText = t('camera.sj4000.quickAnswer');

  return (
    <>
      <MultiLanguageSEO
        title={seoTitle}
        description={seoDesc}
        keywords={seoKeywords}
        path={`/products/accessories/camera/${productId}`}
        type="product"
        structuredData={[productStructuredData, faqStructuredData]}
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <BackButton to="/products/accessories/camera" label={t('accessoryDetail.backToCamera')} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
              <div className="order-2 lg:order-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {t(product.sloganKey)}
                </h1>
                <p className="text-xl text-white/80 mb-6">{t(product.subSloganKey)}</p>
                
                {/* Key Features */}
                <div className="grid grid-cols-5 gap-3 mb-8">
                  {product.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="text-center p-3 bg-white/10 rounded-lg border border-white/20">
                      <div className="text-lg font-bold text-white">{feature.value}</div>
                      <div className="text-xs text-white/70">{t(feature.labelKey)}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <Link
                    to="/contact"
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                  >
                    {t('accessoryDetail.inquireNow')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                    <img
                      src={product.image}
                      alt={`SJ4000-WiFi-Industrial-Drone-Camera-1080P`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GEO Quick Answer Module */}
        {quickAnswerText && quickAnswerText !== 'camera.sj4000.quickAnswer' && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <h2 className="text-xl font-bold mb-3 text-primary">
                  {language === 'zh' ? '为什么选择SJ4000 WiFi用于工业无人机？' : 'Why Choose SJ4000 WiFi for Industrial Drones?'}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{quickAnswerText}</p>
              </div>
            </div>
          </section>
        )}

        {/* Lens & Sensor Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src={sj4000Lens}
                  alt="SJ4000-WiFi-170-degree-ultra-wide-angle-lens-12MP-CMOS"
                  className="w-full max-w-lg mx-auto"
                  loading="lazy"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  {t('accessoryDetail.camera.wideAngle')}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {t('accessoryDetail.camera.wideAngleDesc')}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-card rounded-xl border border-border">
                    <Camera className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground">{t('accessoryDetail.camera.12mp')}</div>
                  </div>
                  <div className="text-center p-4 bg-card rounded-xl border border-border">
                    <Aperture className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground">{t('accessoryDetail.camera.170deg')}</div>
                  </div>
                  <div className="text-center p-4 bg-card rounded-xl border border-border">
                    <Monitor className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground">{t('accessoryDetail.camera.2inch')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HD Quality Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={sj4000HdQuality}
              alt="SJ4000-WiFi-1080P-Full-HD-video-quality-WDR"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-xl rounded-3xl bg-background/70 backdrop-blur-md border border-border p-6 md:p-8 shadow-card">
              <h2 className="text-3xl font-bold mb-4">
                {t('accessoryDetail.camera.hdQuality')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('accessoryDetail.camera.hdQualityDesc')}
              </p>
              <div className="mt-6 flex gap-4">
                <div className="px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
                  <span className="text-primary font-semibold">1080P</span>
                  <span className="text-sm text-muted-foreground ml-2">{t('accessoryDetail.camera.hdVideo')}</span>
                </div>
                <div className="px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
                  <span className="text-primary font-semibold">WDR</span>
                  <span className="text-sm text-muted-foreground ml-2">{t('accessoryDetail.camera.wideDynamic')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* APP Share Section */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  {t('accessoryDetail.camera.smartApp')}
                </h2>
                <p className="text-lg text-white/80 mb-6">
                  {t('accessoryDetail.camera.smartAppDesc')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                    <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs">f</span>
                    <span className="text-sm">Facebook</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                    <span className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-xs">t</span>
                    <span className="text-sm">Twitter</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                    <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs">W</span>
                    <span className="text-sm">WeChat</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                    <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs">W</span>
                    <span className="text-sm">Weibo</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                    <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs">Q</span>
                    <span className="text-sm">QQ</span>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src={sj4000AppShare}
                  alt="SJ4000-WiFi-mobile-app-real-time-preview-sharing"
                  className="w-full rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('accessoryDetail.productFeatures')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('accessoryDetail.camera.featuresDesc')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((feature, idx) => {
                const titleText = t(feature.titleKey);
                return (
                  <div
                    key={idx}
                    className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                      {featureIcons[titleText] || <Camera className="w-8 h-8" />}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{titleText}</h3>
                    <p className="text-muted-foreground text-sm">{t(feature.descriptionKey)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Colors Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('accessoryDetail.camera.colorful')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('accessoryDetail.camera.colorfulDesc')}
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <img
                src={sj4000Colors}
                alt="SJ4000-WiFi-action-camera-multiple-color-options"
                className="w-full rounded-xl"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Specs Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('accessoryDetail.techSpecs')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('accessoryDetail.specsOverview')}
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.specs.map((specGroup, idx) => (
                  <div key={idx} className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="px-6 py-4 bg-muted/50 border-b border-border">
                      <h3 className="font-semibold">{t(specGroup.categoryKey)}</h3>
                    </div>
                    <div className="p-6">
                      <table className="w-full">
                        <tbody>
                          {specGroup.items.map((item, itemIdx) => (
                            <tr key={itemIdx} className="border-b border-border last:border-0">
                              <td className="py-3 text-muted-foreground text-sm w-1/3">{t(item.labelKey)}</td>
                              <td className="py-3 text-sm">{item.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Package Contents Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">{t('accessoryDetail.packageContents')}</h2>
                <p className="text-muted-foreground mb-6">
                  {t('accessoryDetail.camera.accessoriesDesc')}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {product.packageContentKeys.map((itemKey, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{t(itemKey)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img
                  src={sj4000Accessories}
                  alt="SJ4000-WiFi-complete-mounting-accessories-kit"
                  className="w-full max-w-lg mx-auto rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section (GEO) */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">
              {language === 'zh' ? '常见问题' : 'Frequently Asked Questions'}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((faq, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('accessoryDetail.camera.ctaTitle')}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {t('accessoryDetail.camera.ctaDesc')}
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                to="/contact"
                className="px-8 py-3 bg-background text-foreground font-medium rounded-lg hover:bg-background/90 transition-colors"
              >
                {t('contact.title')}
              </Link>
              <Link
                to="/products/accessories/camera"
                className="px-8 py-3 border border-white/30 font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                {t('accessoryDetail.viewMoreProducts')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
};

export default CameraDetail;
