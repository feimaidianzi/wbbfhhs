import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { BackButton } from "@/components/BackButton";
import { Link } from "react-router-dom";
import { ArrowRight, Video, Thermometer, Layers } from "lucide-react";
import { gimbalProducts, gimbalCategories } from "@/data/gimbalProducts";
import { useLanguage } from "@/contexts/LanguageContext";

const categoryIcons: Record<string, React.ReactNode> = {
  "四光云台相机": <Layers className="w-6 h-6" />,
  "双光跟踪识别云台相机": <Thermometer className="w-6 h-6" />,
  "单光追踪识别云台": <Video className="w-6 h-6" />
};

const Gimbal = () => {
  const { t, language } = useLanguage();
  const isEn = language === 'en';
  const categories = ["四光云台相机", "双光跟踪识别云台相机", "单光追踪识别云台"];

  return (
    <>
      <MultiLanguageSEO
        title={t('gimbal.seo.title')}
        description={t('gimbal.seo.description')}
        keywords={t('gimbal.seo.keywords')}
        path="/products/accessories/gimbal"
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <BackButton to="/products/accessories" label={t('gimbal.back')} />
            <div className="max-w-4xl mx-auto text-center mt-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('gimbal.hero.title')}<span className="text-primary">{t('gimbal.hero.highlight')}</span>{t('gimbal.hero.suffix')}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {t('gimbal.hero.desc')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((cat) => (
                  <a
                    key={cat}
                    href={`#${cat}`}
                    className="px-4 py-2 bg-card border border-border rounded-full hover:border-primary hover:text-primary transition-colors"
                  >
                    {cat}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products by Category */}
        {categories.map((category) => {
          const products = gimbalProducts.filter(p => p.category === category);
          if (products.length === 0) return null;
          
          return (
            <section key={category} id={category} className="py-16 odd:bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    {categoryIcons[category]}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{category}</h2>
                    <p className="text-muted-foreground">
                      {gimbalCategories.find(c => c.name === category)?.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      to={`/products/accessories/gimbal/${product.id}`}
                      className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="aspect-[4/3] bg-muted/50 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                            {product.model}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {product.price}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <ul className="space-y-1 mb-4">
                          {product.highlights.slice(0, 3).map((highlight, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                              <span className="w-1 h-1 bg-primary rounded-full flex-shrink-0"></span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                          <span>{t('gimbal.viewDetail')}</span>
                          <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('gimbal.cta.title')}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {t('gimbal.cta.desc')}
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                to="/contact"
                className="px-8 py-3 bg-background text-foreground font-medium rounded-lg hover:bg-background/90 transition-colors"
              >
                {t('gimbal.cta.btn')}
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

export default Gimbal;
