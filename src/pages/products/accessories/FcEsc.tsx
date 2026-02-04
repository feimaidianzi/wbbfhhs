import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Cpu, Zap, Shield, Settings, Thermometer, Gauge, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
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
          <img 
            src={product.image} 
            alt={product.name}
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

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-lg font-bold text-primary">{product.price}</span>
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

        {/* Features Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
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
            <Tabs defaultValue="stack" className="w-full">
              <TabsList className="flex flex-wrap justify-center gap-2 mb-8 h-auto">
                <TabsTrigger value="stack">{t('fcesc.category.stack')}</TabsTrigger>
                <TabsTrigger value="6in1">{t('fcesc.category.6in1')}</TabsTrigger>
                <TabsTrigger value="research">{t('fcesc.category.research')}</TabsTrigger>
                <TabsTrigger value="fc">{t('fcesc.category.fc')}</TabsTrigger>
                <TabsTrigger value="4in1">{t('fcesc.category.4in1')}</TabsTrigger>
                <TabsTrigger value="separate">{t('fcesc.category.separate')}</TabsTrigger>
              </TabsList>

              <TabsContent value="stack">
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
