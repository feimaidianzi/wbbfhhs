import { useParams, Navigate } from "react-router-dom";
import { LangLink as Link } from "@/components/LangLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import { Check, AlertTriangle, Cpu, Zap, Package, Shield, Download, FileText, Settings, Code, Layers, Navigation2, Wifi, Minimize2, ChevronRight } from "lucide-react";
import { getFcEscProductById } from "@/data/fcEscProducts";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "@/lib/helmet-shim";
import { LanguageCode } from "@/i18n/languages";
import { getDomainForLanguage, getHtmlLang } from "@/utils/seoConfig";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FcEscDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getFcEscProductById(productId) : null;
  const [selectedImage, setSelectedImage] = useState(0);
  const { language, t } = useLanguage();
  const langCode = language as LanguageCode;

  if (!product) {
    return <Navigate to="/products/accessories/fc-esc" replace />;
  }

  const images = product.images || [product.image];
  const domain = getDomainForLanguage(langCode);
  const productUrl = `${domain}/products/accessories/fc-esc/${productId}`;
  const productImage = images[0]?.startsWith('http') ? images[0] : `${domain}${images[0]}`;

  // Dynamic TDK per SKU
  const skuTitleKey = `fcEscDetail.tdk.${productId}.title`;
  const skuDescKey = `fcEscDetail.tdk.${productId}.desc`;
  const skuH1Key = `fcEscDetail.tdk.${productId}.h1`;
  const skuMatchKey = `fcEscDetail.match.${productId}`;

  const hasDynamicTdk = t(skuTitleKey) !== skuTitleKey;
  const seoTitle = hasDynamicTdk ? t(skuTitleKey) : `${product.name} ${product.model}`;
  const seoDesc = hasDynamicTdk ? t(skuDescKey) : `${product.name} - ${product.highlights.slice(0, 3).join(', ')}. ${t('fcEscDetail.seoDesc')}`;
  const h1Text = hasDynamicTdk ? t(skuH1Key) : product.name;

  // JSON-LD Product schema with additionalProperty
  const productJsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: hasDynamicTdk ? t(skuTitleKey).split(' | ')[0] : product.name,
    description: seoDesc,
    image: images.map(img => img.startsWith('http') ? img : `${domain}${img}`),
    url: productUrl,
    sku: product.id.toUpperCase().replace(/-/g, '-'),
    mpn: product.model,
    brand: { '@type': 'Brand', name: 'CANI Technology' },
    category: product.category,
    additionalProperty: [
      ...(product.fcSpecs ? [
        { '@type': 'PropertyValue', name: 'MCU', value: product.fcSpecs.mcu },
        { '@type': 'PropertyValue', name: 'Gyroscope', value: product.fcSpecs.gyro },
        { '@type': 'PropertyValue', name: 'Voltage Input', value: product.fcSpecs.voltage },
        ...(product.fcSpecs.firmware ? [{ '@type': 'PropertyValue', name: 'Firmware', value: product.fcSpecs.firmware }] : []),
        ...(product.fcSpecs.size ? [{ '@type': 'PropertyValue', name: 'Mounting Size', value: product.fcSpecs.size }] : []),
      ] : []),
      ...(product.escSpecs ? [
        { '@type': 'PropertyValue', name: 'Continuous Current', value: product.escSpecs.current },
        ...(product.escSpecs.peakCurrent ? [{ '@type': 'PropertyValue', name: 'Peak Current', value: product.escSpecs.peakCurrent }] : []),
        { '@type': 'PropertyValue', name: 'Voltage Input', value: product.escSpecs.voltage },
        { '@type': 'PropertyValue', name: 'Protocol', value: product.escSpecs.protocol },
        ...(product.escSpecs.pcbLayers ? [{ '@type': 'PropertyValue', name: 'PCB Layers', value: product.escSpecs.pcbLayers }] : []),
      ] : []),
    ],
    manufacturer: {
      '@type': 'Organization',
      name: t('company.fullName') || 'CANI Technology',
      url: domain,
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: productUrl,
      seller: { '@type': 'Organization', name: 'CANI Technology' },
    },
    inLanguage: getHtmlLang(langCode),
  };

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('nav.home'), item: domain },
      { '@type': 'ListItem', position: 2, name: t('nav.products'), item: `${domain}/products` },
      { '@type': 'ListItem', position: 3, name: 'FC/ESC', item: `${domain}/products/accessories/fc-esc` },
      { '@type': 'ListItem', position: 4, name: product.name, item: productUrl },
    ],
  };

  // Dynamic FAQ data based on product type
  const is6in1 = product.category === '六合一电调';
  const isStack = product.category === '飞塔';

  const baseFaqs = [
    { question: t('fcEscDetail.faq.q1'), answer: t('fcEscDetail.faq.a1') },
    { question: t('fcEscDetail.faq.q2'), answer: t('fcEscDetail.faq.a2') },
    { question: t('fcEscDetail.faq.q3'), answer: t('fcEscDetail.faq.a3') },
  ];

  const dynamicFaqs = is6in1 ? [
    { question: t('fcEscDetail.faq.6in1.q1'), answer: t('fcEscDetail.faq.6in1.a1') },
    { question: t('fcEscDetail.faq.6in1.q2'), answer: t('fcEscDetail.faq.6in1.a2') },
  ] : isStack ? [
    { question: t('fcEscDetail.faq.stack.q1'), answer: t('fcEscDetail.faq.stack.a1') },
    { question: t('fcEscDetail.faq.stack.q2'), answer: t('fcEscDetail.faq.stack.a2') },
  ] : [];

  const faqs = [...dynamicFaqs, ...baseFaqs];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  // Dynamic matching guide based on SKU
  const isEsc = product.category.toLowerCase().includes('esc') || product.category.includes('电调') || !!product.escSpecs;
  const isFc = product.category.toLowerCase().includes('fc') || product.category.includes('飞控') || !!product.fcSpecs;
  const hasSkuMatch = t(skuMatchKey) !== skuMatchKey;

  const matchingItems = hasSkuMatch ? [
    { component: t('fcEscDetail.matchingGuide.title'), recommendation: t(skuMatchKey) },
  ] : isEsc ? [
    { component: t('fcEscDetail.matchingGuide.motor'), recommendation: 'CANI U8 / U10 Series Motor' },
    { component: t('fcEscDetail.matchingGuide.propeller'), recommendation: '28-40 inch Carbon Fiber Propeller' },
    { component: t('fcEscDetail.matchingGuide.battery'), recommendation: '6S-14S LiPo (22.2V-51.8V)' },
    { component: t('fcEscDetail.matchingGuide.fc'), recommendation: 'CANI H7 Pro / RT17 Flight Controller' },
  ] : isFc ? [
    { component: t('fcEscDetail.matchingGuide.esc'), recommendation: 'CANI 80A-200A FOC ESC' },
    { component: t('fcEscDetail.matchingGuide.motor'), recommendation: 'CANI U8 / U10 Series Motor' },
    { component: t('fcEscDetail.matchingGuide.propeller'), recommendation: '28-40 inch Carbon Fiber Propeller' },
    { component: t('fcEscDetail.matchingGuide.battery'), recommendation: '6S-14S LiPo (22.2V-51.8V)' },
  ] : [];

  return (
    <>
      <MultiLanguageSEO 
        title={seoTitle}
        description={seoDesc}
        path={`/products/accessories/fc-esc/${productId}`}
        type="product"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background">
        <BackButton to="/products/accessories/fc-esc" />

        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="bg-card rounded-2xl p-8 border border-border aspect-square flex items-center justify-center">
                  <img loading="lazy" decoding="async" 
                    src={images[selectedImage]} 
                    alt={`${product.name} - CANI ${isStack ? 'drone-power-system-stack-fc-esc' : is6in1 ? 'industrial-hexacopter-6in1-esc' : isEsc ? 'high-voltage-drone-esc' : 'industrial-flight-controller'}`}
                    title={`${h1Text} | ${product.model}`}
                    className="max-h-full max-w-full object-contain" 
                  />
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setSelectedImage(idx)} 
                        className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${selectedImage === idx ? 'border-primary' : 'border-border hover:border-primary/50'}`}
                      >
                        <img loading="lazy" decoding="async" src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">{product.category}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{h1Text}</h1>
                <p className="text-xl text-muted-foreground mb-2">{product.model}</p>
                
                {/* Highlights */}
                <div className="space-y-2 mb-8">
                  {product.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
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

        {/* Product Description */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t('accessoryDetail.productFeatures')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.description.map((desc, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                  <Cpu className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section id="specs" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t('accessoryDetail.techSpecs')}</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* FC Specs */}
              {product.fcSpecs && (
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="px-6 py-4 bg-primary/10 border-b border-border">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-primary" />
                      {t('accessoryDetail.fcSpecs')}
                    </h3>
                  </div>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30 w-1/3">{t('accessoryDetail.processor')}</td>
                        <td className="px-6 py-3">{product.fcSpecs.mcu}</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.gyroscope')}</td>
                        <td className="px-6 py-3">{product.fcSpecs.gyro}</td>
                      </tr>
                      {product.fcSpecs.osd && (
                        <tr className="border-b border-border">
                          <td className="px-6 py-3 font-medium bg-muted/30">OSD</td>
                          <td className="px-6 py-3">{product.fcSpecs.osd}</td>
                        </tr>
                      )}
                      {product.fcSpecs.blackbox && (
                        <tr className="border-b border-border">
                          <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.blackbox')}</td>
                          <td className="px-6 py-3">{product.fcSpecs.blackbox}</td>
                        </tr>
                      )}
                      {product.fcSpecs.uart && (
                        <tr className="border-b border-border">
                          <td className="px-6 py-3 font-medium bg-muted/30">UART</td>
                          <td className="px-6 py-3">{product.fcSpecs.uart}</td>
                        </tr>
                      )}
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.inputVoltage')}</td>
                        <td className="px-6 py-3">{product.fcSpecs.voltage}</td>
                      </tr>
                      {product.fcSpecs.bec && (
                        <tr className="border-b border-border">
                          <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.becOutput')}</td>
                          <td className="px-6 py-3">{product.fcSpecs.bec}</td>
                        </tr>
                      )}
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.size')}</td>
                        <td className="px-6 py-3">{product.fcSpecs.size}</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.weight')}</td>
                        <td className="px-6 py-3">{product.fcSpecs.weight}</td>
                      </tr>
                      {product.fcSpecs.firmware && (
                        <tr>
                          <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.firmwareSupport')}</td>
                          <td className="px-6 py-3">{product.fcSpecs.firmware}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* ESC Specs */}
              {product.escSpecs && (
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="px-6 py-4 bg-primary/10 border-b border-border">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      {t('accessoryDetail.escSpecs')}
                    </h3>
                  </div>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30 w-1/3">{t('accessoryDetail.continuousCurrent')}</td>
                        <td className="px-6 py-3">{product.escSpecs.current}</td>
                      </tr>
                      {product.escSpecs.peakCurrent && (
                        <tr className="border-b border-border">
                          <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.peakCurrent')}</td>
                          <td className="px-6 py-3">{product.escSpecs.peakCurrent}</td>
                        </tr>
                      )}
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.inputVoltage')}</td>
                        <td className="px-6 py-3">{product.escSpecs.voltage}</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.protocol')}</td>
                        <td className="px-6 py-3">{product.escSpecs.protocol}</td>
                      </tr>
                      {product.escSpecs.mosfet && (
                        <tr className="border-b border-border">
                          <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.mosfet')}</td>
                          <td className="px-6 py-3">{product.escSpecs.mosfet}</td>
                        </tr>
                      )}
                      {product.escSpecs.pcbLayers && (
                        <tr className="border-b border-border">
                          <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.pcbLayers')}</td>
                          <td className="px-6 py-3">{product.escSpecs.pcbLayers}</td>
                        </tr>
                      )}
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.size')}</td>
                        <td className="px-6 py-3">{product.escSpecs.size}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.weight')}</td>
                        <td className="px-6 py-3">{product.escSpecs.weight}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Visual Features (extracted from images) */}
        {product.visualFeatures && product.visualFeatures.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">{t('accessoryDetail.featureHighlights')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.visualFeatures.map((vf, idx) => {
                  const iconMap: Record<string, React.ReactNode> = {
                    cpu: <Cpu className="w-6 h-6" />,
                    code: <Code className="w-6 h-6" />,
                    layers: <Layers className="w-6 h-6" />,
                    navigation: <Navigation2 className="w-6 h-6" />,
                    wifi: <Wifi className="w-6 h-6" />,
                    minimize: <Minimize2 className="w-6 h-6" />,
                    zap: <Zap className="w-6 h-6" />,
                  };
                  return (
                    <div key={idx} className="p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                        {iconMap[vf.icon] || <Cpu className="w-6 h-6" />}
                      </div>
                      <h3 className="font-bold text-foreground mb-2">{vf.title}</h3>
                      <p className="text-sm text-muted-foreground">{vf.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Features */}
        {product.features && product.features.length > 0 && !product.visualFeatures && (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">{t('accessoryDetail.featureHighlights')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Matching Guide */}
        {matchingItems.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-2">{t('fcEscDetail.matchingGuide.title')}</h2>
              <p className="text-muted-foreground mb-8">{t('fcEscDetail.matchingGuide.subtitle')}</p>
              <div className="max-w-2xl">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('fcEscDetail.matchingGuide.component')}</TableHead>
                      <TableHead>{t('fcEscDetail.matchingGuide.recommendation')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matchingItems.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{item.component}</TableCell>
                        <TableCell>{item.recommendation}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </section>
        )}

        {/* Compliance & Downloads */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Compliance Badges */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  {t('fcEscDetail.compliance.title')}
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium">{t('fcEscDetail.compliance.ndaa')}</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium">{t('fcEscDetail.compliance.blueuas')}</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium">{t('fcEscDetail.compliance.rohs')}</span>
                  </div>
                </div>
              </div>

              {/* Downloads */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Download className="w-6 h-6 text-primary" />
                  {t('fcEscDetail.downloads.title')}
                </h2>
                <div className="space-y-3">
                  <Link to="/contact" className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium text-primary">{t('fcEscDetail.downloads.step')}</span>
                  </Link>
                  <Link to="/contact" className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium text-primary">{t('fcEscDetail.downloads.manual')}</span>
                  </Link>
                  <Link to="/contact" className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium text-primary">{t('fcEscDetail.downloads.datasheet')}</span>
                  </Link>
                  <Link to="/contact" className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium text-primary">{t('fcEscDetail.downloads.betaflightConfig')}</span>
                  </Link>
                  <Link to="/contact" className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium text-primary">{t('fcEscDetail.downloads.cliDump')}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Package Includes */}
        {product.packageIncludes && product.packageIncludes.length > 0 && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <Package className="w-6 h-6 text-primary" />
                {t('accessoryDetail.packageContents')}
              </h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {product.packageIncludes.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Notes */}
        {product.notes && product.notes.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">{t('accessoryDetail.notes')}</h2>
              <div className="space-y-4">
                {product.notes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t('fcEscDetail.faq.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('fcEscDetail.faq.subtitle')}
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`detail-faq-${index}`}
                    className="bg-card rounded-xl border border-border px-6 shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* EEAT Quality Statement */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="p-6 bg-card rounded-xl border border-border">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  {t('fcEscDetail.eeat.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{t('fcEscDetail.eeat.statement')}</p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  {t('fcEscDetail.eeat.protocolTitle')}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{t('fcEscDetail.eeat.protocol')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Article links */}
        {productId === 'cani-pixhawk4' && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📖</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('prod.logistics.k451')}</p>
                  <Link to="/news/d4b2c3e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.fcescdetail.k556')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t('acc.fcescdetail.k557')}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}
        {productId === 'stack-mini-f7-55a' && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📖</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('prod.logistics.k451')}</p>
                  <Link to="/news/e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.fcescdetail.k558')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t('acc.fcescdetail.k559')}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}
        {productId === 'stack-f405-55a' && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📖</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('acc.fcescdetail.k560')}</p>
                  <Link to="/news/eec20aad-4e36-4a25-becf-14e0a6cd3129" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.fcescdetail.k561')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t('acc.fcescdetail.k562')}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}
        {productId === 'stack-f405-60a' && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📖</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('acc.fcescdetail.k560')}</p>
                  <Link to="/news/b4637881-4579-4863-94af-f3719098a9a6" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.fcescdetail.k563')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t('acc.fcescdetail.k564')}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}
        {productId === 'stack-mini-f7-40a' && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📖</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('acc.fcescdetail.k560')}</p>
                  <Link to="/news/c7d8e9f0-1a2b-3c4d-5e6f-7a8b9c0d1e2f" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.fcescdetail.k565')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t('acc.fcescdetail.k566')}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}
        {productId === 'stack-pro-f722-100a' && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📖</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('acc.fcescdetail.k560')}</p>
                  <Link to="/news/d8e9f0a1-2b3c-4d5e-6f7a-8b9c0d1e2f3a" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.fcescdetail.k567')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t('acc.fcescdetail.k568')}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}
        {productId === '6in1-80a' && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📖</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('acc.fcescdetail.k560')}</p>
                  <Link to="/news/e9f0a1b2-3c4d-5e6f-7a8b-9c0d1e2f3a4b" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.fcescdetail.k569')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t('acc.fcescdetail.k570')}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}
        {productId === 'fc-f405' && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📖</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('acc.fcescdetail.k560')}</p>
                  <Link to="/news/a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.fcescdetail.k571')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t('acc.fcescdetail.k572')}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}
        {productId === '6in1-100a' && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📖</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('acc.fcescdetail.k560')}</p>
                  <Link to="/news/f0a1b2c3-4d5e-6f7a-8b9c-0d1e2f3a4b5c" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.fcescdetail.k573')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t('acc.fcescdetail.k574')}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}
        {productId === 'fc-f722' && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📖</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('acc.fcescdetail.k560')}</p>
                  <Link to="/news/b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.fcescdetail.k575')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t('acc.fcescdetail.k576')}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}
        {productId === 'esc-60a' && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📖</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('acc.fcescdetail.k560')}</p>
                  <Link to="/news/d4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.fcescdetail.k577')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t('acc.fcescdetail.k578')}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}
        {productId === 'esc-80a' && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📖</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('acc.fcescdetail.k560')}</p>
                  <Link to="/news/e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f0a1b" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.fcescdetail.k579')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t('acc.fcescdetail.k580')}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}
        {productId === 'esc-55a' && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📖</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('acc.fcescdetail.k560')}</p>
                  <Link to="/news/c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.fcescdetail.k581')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t('acc.fcescdetail.k582')}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}
        {productId === 'esc-100a' && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📖</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('acc.fcescdetail.k560')}</p>
                  <Link to="/news/f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1c" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.fcescdetail.k583')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t('acc.fcescdetail.k584')}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}
        {productId === 'separate-esc-100a' && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📖</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('acc.fcescdetail.k560')}</p>
                  <Link to="/news/b8c9d0e1-2f3a-4b5c-6d7e-8f9a0b1c2d3e" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.fcescdetail.k585')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t('acc.fcescdetail.k586')}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}
        {productId === 'separate-esc-80a' && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📖</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('acc.fcescdetail.k560')}</p>
                  <Link to="/news/a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2d" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.fcescdetail.k587')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t('acc.fcescdetail.k588')}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}
        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t('accessoryDetail.customSolution')}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {t('accessoryDetail.oemOdm')}
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">{t('contact.title')}</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/products/accessories/fc-esc">{t('accessoryDetail.viewMoreProducts')}</Link>
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

export default FcEscDetail;