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
import { Helmet } from "react-helmet-async";
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
                  <img 
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
                        <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
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
                  <p className="text-sm text-accent font-mono mb-1">{language === 'zh' ? '深度解读' : 'Deep Dive'}</p>
                  <Link to="/news/d4b2c3e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {language === 'zh' ? 'CANI-Pixhawk4 工业级冗余飞控：重塑开源架构的可靠性基石' : 'CANI-Pixhawk4: Redefining Open-Source Architecture Reliability'}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {language === 'zh' ? '了解三冗余传感器架构、EMI电磁隔离技术与PX4/ArduPilot生态深度适配' : 'Explore triple-redundant sensors, EMI protection, and PX4/ArduPilot ecosystem integration'}
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
                  <p className="text-sm text-accent font-mono mb-1">{language === 'zh' ? '深度解读' : 'Deep Dive'}</p>
                  <Link to="/news/e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {language === 'zh' ? '定义紧凑型动力极限：CANI Stack-Mini F7-55A 飞速塔的技术演变与工业应用' : 'Defining Compact Power Limits: Stack-Mini F7-55A Technical Evolution & Industrial Applications'}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {language === 'zh' ? '深入了解 F745 算力跨越、双向 DShot 动态谐波过滤与 55A 四合一电调散热工程' : 'Explore F745 computational leap, bidirectional DShot dynamic notch filtering, and 55A 4-in-1 ESC thermal engineering'}
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
                  <p className="text-sm text-accent font-mono mb-1">{language === 'zh' ? '技术白皮书' : 'Tech Whitepaper'}</p>
                  <Link to="/news/eec20aad-4e36-4a25-becf-14e0a6cd3129" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {language === 'zh' ? '工业级均衡之王：深度解析 CANI Stack F405-55A 飞速塔的稳定性逻辑' : 'Industrial-Grade Balance King: Deep Dive into Stack F405-55A Stability Engineering'}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {language === 'zh' ? '了解 F405 工业级选型逻辑、55A MOSFET 热管理工程与抗干扰 PCB 布局' : 'Explore F405 industrial selection logic, 55A MOSFET thermal management, and EMI-resistant PCB layout'}
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
                  <p className="text-sm text-accent font-mono mb-1">{language === 'zh' ? '技术白皮书' : 'Tech Whitepaper'}</p>
                  <Link to="/news/b4637881-4579-4863-94af-f3719098a9a6" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {language === 'zh' ? '动力冗余与极致稳定：解构 CANI Stack F405-60A 在大载重无人机中的核心价值' : 'Power Redundancy & Ultimate Stability: Stack F405-60A Core Value in Heavy-Lift UAVs'}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {language === 'zh' ? '了解 60A 大电流热管理工程、双向 DShot RPM 滤波与 X8 大载重架构适配' : 'Explore 60A high-current thermal management, bidirectional DShot RPM filtering, and X8 heavy-lift architecture'}
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
                  <p className="text-sm text-accent font-mono mb-1">{language === 'zh' ? '技术白皮书' : 'Tech Whitepaper'}</p>
                  <Link to="/news/c7d8e9f0-1a2b-3c4d-5e6f-7a8b9c0d1e2f" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {language === 'zh' ? '小尺寸，大算力：解析 CANI Stack-Mini F7-40A 如何定义紧凑型无人机的控制极限' : 'Small Size, Big Computing Power: How Stack-Mini F7-40A Defines Control Limits of Compact UAVs'}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {language === 'zh' ? '深入了解 F722 低延迟 PID 控制、40A 高密度电流设计与双向 DShot RPM 滤波算法' : 'Explore F722 low-latency PID control, 40A high-density current design, and bidirectional DShot RPM filtering'}
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
                  <p className="text-sm text-accent font-mono mb-1">{language === 'zh' ? '技术白皮书' : 'Tech Whitepaper'}</p>
                  <Link to="/news/d8e9f0a1-2b3c-4d5e-6f7a-8b9c0d1e2f3a" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {language === 'zh' ? '动力之巅：CANI Stack-Pro F722-100A 如何解决大载重无人机的电流焦虑？' : 'Peak Power: How Stack-Pro F722-100A Solves Current Anxiety for Heavy-Lift UAVs'}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {language === 'zh' ? '深入了解百安培动力工程、8 层 PCB 散热设计与双 ICM42688 冗余陀螺仪架构' : 'Explore 100A power engineering, 8-layer PCB thermal design, and dual ICM42688 redundant gyroscope architecture'}
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
                  <p className="text-sm text-accent font-mono mb-1">{language === 'zh' ? '技术白皮书' : 'Tech Whitepaper'}</p>
                  <Link to="/news/e9f0a1b2-3c4d-5e6f-7a8b-9c0d1e2f3a4b" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {language === 'zh' ? '化繁为简的动力革命：解析 CANI-80A 六合一电调如何重塑六旋翼无人机的结构设计' : 'Simplifying Power Revolution: How CANI-80A 6-in-1 ESC Reshapes Hexacopter Structural Design'}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {language === 'zh' ? '深入了解六路集成电调的结构优势、CNC 散热工程与 MAVLink 实时遥测闭环' : 'Explore 6-channel integrated ESC structural advantages, CNC thermal engineering, and MAVLink real-time telemetry'}
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
                  <p className="text-sm text-accent font-mono mb-1">{language === 'zh' ? '技术白皮书' : 'Tech Whitepaper'}</p>
                  <Link to="/news/a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {language === 'zh' ? '稳定性的工程哲学：深度解析 CANI-FC F405 在复杂工业环境下的避障与抗扰能力' : 'Engineering Philosophy of Stability: CANI-FC F405 Anti-Interference Capability Analysis'}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {language === 'zh' ? '了解 F405 工业级抗干扰布局、MPU6000 物理级 IMU 防护与多 UART 传感器矩阵扩展' : 'Explore F405 industrial EMI-resistant layout, MPU6000 physical IMU protection, and multi-UART sensor matrix expansion'}
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
                  <p className="text-sm text-accent font-mono mb-1">{language === 'zh' ? '技术白皮书' : 'Tech Whitepaper'}</p>
                  <Link to="/news/f0a1b2c3-4d5e-6f7a-8b9c-0d1e2f3a4b5c" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {language === 'zh' ? '百安培时代的六路集成：CANI-100A 六合一电调如何突破工业无人机的功率密度极限？' : 'Six-Channel 100A Integration: How CANI-100A 6-in-1 ESC Breaks Through Power Density Limits'}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {language === 'zh' ? '深入了解百安培级功率密度、7 系航空铝 CNC 散热工程与双向 DShot 实时遥测闭环' : 'Explore 100A power density, 7-series aviation aluminum CNC thermal engineering, and bidirectional DShot real-time telemetry'}
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
                  <p className="text-sm text-accent font-mono mb-1">{language === 'zh' ? '技术白皮书' : 'Tech Whitepaper'}</p>
                  <Link to="/news/b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {language === 'zh' ? '算力重塑飞行：深度解析 CANI-FC F722 如何在毫秒间决定工业无人机的姿态稳定性' : 'Computing Power Reshapes Flight: How CANI-FC F722 Determines UAV Attitude Stability in Milliseconds'}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {language === 'zh' ? '深入了解 216MHz F7 算力优势、极速 PID 闭环与 10V 独立 BEC 数字图传适配方案' : 'Explore 216MHz F7 computing advantages, ultra-fast PID loops, and 10V independent BEC digital VTX integration'}
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
                  <p className="text-sm text-accent font-mono mb-1">{language === 'zh' ? '技术白皮书' : 'Tech Whitepaper'}</p>
                  <Link to="/news/d4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {language === 'zh' ? '重载飞行的动力基石：深度解析 CANI-ESC 60A 在高负载任务中的电气鲁棒性' : 'Foundation of Heavy-Lift Flight: Deep Analysis of CANI-ESC 60A Electrical Robustness Under High-Load Missions'}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {language === 'zh' ? '了解 CNC 航空铝散热罩、低内阻 MOSFET 技术、三防涂层与全数字化 Telemetry 遥测闭环' : 'Explore CNC aviation aluminum heat armor, low RDS(on) MOSFET technology, conformal coating, and full digital telemetry loop'}
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
                  <p className="text-sm text-accent font-mono mb-1">{language === 'zh' ? '技术白皮书' : 'Tech Whitepaper'}</p>
                  <Link to="/news/c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {language === 'zh' ? '电流管理的艺术：解析 CANI-ESC 55A 如何在极端负载下保持动力线性度' : 'The Art of Current Management: How CANI-ESC 55A Maintains Power Linearity Under Extreme Load'}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {language === 'zh' ? '深入了解 CNC 散热装甲、8 层 PCB 均温设计、TDK 电容阵列与双向 DShot 遥测闭环' : 'Explore CNC heat armor, 8-layer PCB thermal design, TDK capacitor array, and bidirectional DShot telemetry loop'}
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