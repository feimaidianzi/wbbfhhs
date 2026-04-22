import { LangLink as Link } from "@/components/LangLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Cpu, Zap, Shield, Settings, Thermometer, Gauge, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageFAQ } from "@/components/PageFAQ";
import { Helmet } from "@/lib/helmet-shim";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  stackProducts, 
  sixInOneEscProducts, 
  researchFlightControllers,
  flightControllerProducts,
  escProducts,
  separateEscProducts
} from "@/data/fcEscProducts";

const FcEsc = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Cpu, titleKey: 'fcesc.feature.cpu', descKey: 'fcesc.feature.cpu.desc' },
    { icon: Zap, titleKey: 'fcesc.feature.current', descKey: 'fcesc.feature.current.desc' },
    { icon: Thermometer, titleKey: 'fcesc.feature.heat', descKey: 'fcesc.feature.heat.desc' },
    { icon: Shield, titleKey: 'fcesc.feature.protection', descKey: 'fcesc.feature.protection.desc' },
    { icon: Settings, titleKey: 'fcesc.feature.config', descKey: 'fcesc.feature.config.desc' },
    { icon: Gauge, titleKey: 'fcesc.feature.plug', descKey: 'fcesc.feature.plug.desc' },
  ];

  const faqs = [
    { question: t('fcesc.faq.q1'), answer: t('fcesc.faq.a1') },
    { question: t('fcesc.faq.q2'), answer: t('fcesc.faq.a2') },
    { question: t('fcesc.faq.q3'), answer: t('fcesc.faq.a3') },
    { question: t('fcesc.faq.q4'), answer: t('fcesc.faq.a4') },
    { question: t('fcesc.faq.q5'), answer: t('fcesc.faq.a5') },
  ];

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const categoryJsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    'name': 'CANI H7 Pro Industrial Flight Controller',
    'description': 'High-performance STM32H743 flight controller with triple IMU redundancy and DroneCAN support. Ideal for PX4 and ArduPilot industrial UAVs.',
    'brand': { '@type': 'Brand', 'name': 'CANI Technology' },
    'sku': 'CANI-H7-PRO-01',
    'additionalProperty': [
      { '@type': 'PropertyValue', 'name': 'MCU', 'value': 'STM32H743VIT6 (480MHz)' },
      { '@type': 'PropertyValue', 'name': 'IMU Redundancy', 'value': 'Triple (ICM-42688-P + BMI270)' },
      { '@type': 'PropertyValue', 'name': 'Firmware Support', 'value': 'PX4 v1.14+ / ArduPilot 4.5+ / Betaflight' },
      { '@type': 'PropertyValue', 'name': 'Connectivity', 'value': 'Dual DroneCAN, 8x UART, 100Mbps Ethernet' },
      { '@type': 'PropertyValue', 'name': 'Voltage Input', 'value': '3S-14S Lipo (12V-60V)' },
    ],
    'offers': {
      '@type': 'Offer',
      'availability': 'https://schema.org/InStock',
      'url': 'https://www.caniuav.com/products/accessories/fc-esc',
    },
  };

  interface ProductCardProps {
    product: {
      id: string;
      name: string;
      model: string;
      image: string;
      category: string;
      highlights: string[];
      price: string;
      hot?: boolean;
    };
  }

  const ProductCard = ({ product }: ProductCardProps) => (
    <Link to={`/products/accessories/fc-esc/${product.id}`} className="block">
      <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 group">
        <div className="aspect-square bg-muted/30 p-6 flex items-center justify-center relative">
          <img loading="lazy" decoding="async" 
            src={product.image} 
            alt={`${product.name} - CANI industrial UAV ${product.category}`}
            title={`${product.name} ${product.model}`}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          {product.hot && (
            <span className="absolute top-3 right-3 px-2 py-1 bg-destructive text-destructive-foreground text-xs rounded-full">
              HOT
            </span>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">{product.category}</span>
          </div>
          <h3 className="text-lg font-bold mb-1">{product.name}</h3>
          <p className="text-xs text-muted-foreground mb-3">{product.model}</p>
          
          <ul className="space-y-1 mb-4">
            {product.highlights.slice(0, 3).map((highlight, idx) => (
              <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <span className="text-primary mt-0.5">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end pt-3 border-t border-border">
            <span className="text-xs text-primary flex items-center">
              {t('fcesc.viewDetail')}
              <ChevronRight className="w-3 h-3 ml-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <>
      <MultiLanguageSEO
        title={t('fcesc.seo.title')}
        description={t('fcesc.seo.description')}
        path="/products/accessories/fc-esc"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(categoryJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4">
            <Link to="/products/accessories" className="inline-flex items-center gap-2 text-accent hover:underline mb-6 mt-8">
              <ArrowLeft className="w-4 h-4" />
              {t('fcesc.back')}
            </Link>
            
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t('fcesc.hero.title')}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {t('fcesc.hero.desc')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/contact">{t('fcesc.getQuote')}</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#products">{t('fcesc.viewProducts')}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Product Intro */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">{t('fcesc.seo.intro.title')}</h2>
            <p className="text-muted-foreground leading-relaxed max-w-4xl">{t('fcesc.seo.intro')}</p>
          </div>
        </section>

        {/* Features Section with Semantic H2 */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">{t('fcesc.h2.autopilots')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4 p-5 bg-card rounded-xl border border-border">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t(feature.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground">{t(feature.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="research" className="w-full">
              <TabsList className="flex flex-wrap justify-center gap-2 mb-8 h-auto">
                <TabsTrigger value="research">{t('fcesc.category.research')}</TabsTrigger>
                <TabsTrigger value="stack">{t('fcesc.category.stack')}</TabsTrigger>
                <TabsTrigger value="6in1">{t('fcesc.category.6in1')}</TabsTrigger>
                <TabsTrigger value="fc">{t('fcesc.category.fc')}</TabsTrigger>
                <TabsTrigger value="4in1">{t('fcesc.category.4in1')}</TabsTrigger>
                <TabsTrigger value="separate">{t('fcesc.category.separate')}</TabsTrigger>
              </TabsList>

              <TabsContent value="stack">
                <h2 className="text-xl font-bold mb-6">{t('fcesc.h2.stacks')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {stackProducts.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
              </TabsContent>

              <TabsContent value="6in1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sixInOneEscProducts.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
              </TabsContent>

              <TabsContent value="research">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {researchFlightControllers.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
              </TabsContent>

              <TabsContent value="fc">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {flightControllerProducts.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
              </TabsContent>

              <TabsContent value="4in1">
                <h2 className="text-xl font-bold mb-6">{t('fcesc.h2.esc')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {escProducts.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
              </TabsContent>

              <TabsContent value="separate">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {separateEscProducts.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Technical Details */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">{t('fcesc.techDetail.title')}</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-muted-foreground leading-relaxed">{t('fcesc.techDetail')}</p>
            </div>
          </div>
        </section>

        {/* Application Case Study */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">{t('fcesc.caseStudy.title')}</h2>
            <div className="max-w-3xl mx-auto">
              <div className="p-6 bg-card rounded-xl border border-border">
                <p className="text-muted-foreground leading-relaxed">{t('fcesc.caseStudy')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t('fcesc.faq.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('fcesc.faq.subtitle')}
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`fcesc-faq-${index}`}
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

export default FcEsc;