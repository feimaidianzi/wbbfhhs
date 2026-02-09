import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, Navigation, Tv, Satellite } from "lucide-react";
import { Link } from "react-router-dom";
import { BackButton } from "@/components/BackButton";
import { otherAccessoriesProducts, otherAccessoriesCategories } from "@/data/otherAccessoriesProducts";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  monitor: Tv,
  gps: Satellite,
};

const OtherAccessories = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('otherAccessories.seo.title')}
        description={t('otherAccessories.seo.description')}
        keywords={t('otherAccessories.seo.keywords')}
        path="/products/accessories/others"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="bg-secondary py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">{t('otherAccessories.breadcrumb.home')}</Link>
              <span>/</span>
              <Link to="/products/accessories" className="hover:text-accent">{t('otherAccessories.breadcrumb.accessories')}</Link>
              <span>/</span>
              <span className="text-foreground">{t('otherAccessories.breadcrumb.others')}</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <BackButton to="/products/accessories" label={t('otherAccessories.back')} />
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('otherAccessories.hero.title')}
              </h1>
              <p className="text-lg text-primary-foreground/90 mb-6">
                {t('otherAccessories.hero.desc')}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                  <Monitor className="w-5 h-5 text-accent" />
                  <span className="text-primary-foreground text-sm">{t('otherAccessories.feature.monitor')}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                  <Tv className="w-5 h-5 text-accent" />
                  <span className="text-primary-foreground text-sm">{t('otherAccessories.feature.goggles')}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                  <Navigation className="w-5 h-5 text-accent" />
                  <span className="text-primary-foreground text-sm">{t('otherAccessories.feature.gps')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        {otherAccessoriesCategories.map((category) => {
          const categoryProducts = otherAccessoriesProducts.filter(p => p.category === category.id);
          if (categoryProducts.length === 0) return null;
          
          const IconComponent = categoryIcons[category.id] || Monitor;
          
          return (
            <section key={category.id} className="py-16 bg-background">
              <div className="container-custom">
                <div className="flex items-center gap-4 mb-8">
                  <IconComponent className="w-8 h-8 text-accent" />
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">{t(category.nameKey)}</h2>
                    <p className="text-muted-foreground">{t(category.descriptionKey)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/products/accessories/others/${product.id}`}
                      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
                    >
                      <div className="aspect-square overflow-hidden bg-gradient-to-br from-secondary to-secondary/50 relative p-4">
                        <img
                          src={product.image}
                          alt={t(product.nameKey)}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <div className="text-accent text-sm font-medium mb-1">{t(product.sloganKey)}</div>
                        <h3 className="text-lg font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                          {t(product.nameKey)}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-1">{t(product.subSloganKey)}</p>
                        
                        {/* Key Features */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {product.keyFeatureKeys.slice(0, 3).map((featureKey, i) => (
                            <span key={i} className="text-xs bg-secondary text-foreground px-2 py-0.5 rounded">
                              {t(featureKey)}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center text-accent text-sm font-medium group-hover:gap-3 gap-1 transition-all">
                          <span>{t('otherAccessories.viewDetail')}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t('otherAccessories.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('otherAccessories.cta.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                  {t('otherAccessories.cta.btn')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/products/accessories">
                <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-8 py-6 text-lg">
                  {t('otherAccessories.cta.viewOthers')}
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

export default OtherAccessories;
