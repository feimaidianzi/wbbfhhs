import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Eye, Radio, Shield, Package, Gauge, Flower2, Plane, Navigation } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import fpvHeroImg from "@/assets/seo/fpv-drone-aerial.jpg";
import fpvRacingImg from "@/assets/seo/fpv-racing-drone.jpg";
import fpvFreestyleImg from "@/assets/seo/fpv-freestyle-drone.jpg";
import fpvLongrangeImg from "@/assets/seo/fpv-longrange-drone.jpg";
import fpvCinewhoopImg from "@/assets/seo/fpv-cinewhoop-drone.jpg";

const FPV = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Zap, title: t('fpv.features.speed.title'), description: t('fpv.features.speed.desc') },
    { icon: Eye, title: t('fpv.features.fpv.title'), description: t('fpv.features.fpv.desc') },
    { icon: Radio, title: t('fpv.features.latency.title'), description: t('fpv.features.latency.desc') },
    { icon: Shield, title: t('fpv.features.durable.title'), description: t('fpv.features.durable.desc') },
  ];

  const categories = [
    { name: t('fpv.categories.kits'), description: t('fpv.categories.kits.desc'), icon: Package, image: fpvHeroImg, link: "/fpv/kit", products: 8 },
    { name: t('fpv.categories.racing'), description: t('fpv.categories.racing.desc'), icon: Gauge, image: fpvRacingImg, link: "/fpv/racing", products: 6 },
    { name: t('fpv.categories.freestyle'), description: t('fpv.categories.freestyle.desc'), icon: Flower2, image: fpvFreestyleImg, link: "/fpv/freestyle", products: 5 },
    { name: t('fpv.categories.longRange'), description: t('fpv.categories.longRange.desc'), icon: Navigation, image: fpvLongrangeImg, link: "/fpv/longrange", products: 4 },
    { name: t('fpv.categories.cinewhoop'), description: t('fpv.categories.cinewhoop.desc'), icon: Plane, image: fpvCinewhoopImg, link: "/fpv/cinematic", products: 5 },
  ];

  const hotProducts = [
    { name: t('fpv.hot.product1.name'), category: t('fpv.categories.racing'), description: t('fpv.hot.product1.desc'), specs: [t('fpv.hot.product1.spec1'), t('fpv.hot.product1.spec2'), t('fpv.hot.product1.spec3')], image: fpvHeroImg, price: t('fpv.hot.product1.price') },
    { name: t('fpv.hot.product2.name'), category: t('fpv.categories.freestyle'), description: t('fpv.hot.product2.desc'), specs: [t('fpv.hot.product2.spec1'), t('fpv.hot.product2.spec2'), t('fpv.hot.product2.spec3')], image: fpvRacingImg, price: t('fpv.hot.product2.price') },
    { name: t('fpv.hot.product3.name'), category: t('fpv.categories.longRange'), description: t('fpv.hot.product3.desc'), specs: [t('fpv.hot.product3.spec1'), t('fpv.hot.product3.spec2'), t('fpv.hot.product3.spec3')], image: fpvFreestyleImg, price: t('fpv.hot.product3.price') },
  ];

  const accessories = [
    { name: t('fpv.accessory.goggles'), price: t('fpv.accessory.goggles.price') },
    { name: t('fpv.accessory.controller'), price: t('fpv.accessory.controller.price') },
    { name: t('fpv.accessory.charger'), price: t('fpv.accessory.charger.price') },
    { name: t('fpv.accessory.props'), price: t('fpv.accessory.props.price') },
    { name: t('fpv.accessory.tools'), price: t('fpv.accessory.tools.price') },
    { name: t('fpv.accessory.bag'), price: t('fpv.accessory.bag.price') },
  ];

  const articles = [
    { title: t('fpv.article1.title'), excerpt: t('fpv.article1.excerpt'), image: fpvHeroImg, date: "2025-08-15" },
    { title: t('fpv.article2.title'), excerpt: t('fpv.article2.excerpt'), image: fpvRacingImg, date: "2025-05-20" },
    { title: t('fpv.article3.title'), excerpt: t('fpv.article3.excerpt'), image: fpvFreestyleImg, date: "2025-05-10" },
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('fpv.seo.title')}
        description={t('fpv.seo.description')}
        keywords={t('fpv.seo.keywords')}
        path="/fpv"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[450px] md:h-[550px] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fpvHeroImg})` }}>
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl animate-fade-in rounded-3xl bg-black/70 border border-white/20 p-6 md:p-8 shadow-lg">
              <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-cyan-400 text-sm font-medium mb-4">
                {t('fpv.hero.badge')}
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {t('fpv.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {t('fpv.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg shadow-lg">
                  {t('fpv.hero.browse')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" className="border-accent/30 hover:border-accent text-foreground px-8 py-6 text-lg">
                  {t('fpv.hero.guide')}
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-secondary to-transparent" />
        </section>

        {/* Features */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">{t('fpv.categories.title')}</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t('fpv.categories.subtitle')}
              </p>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full mt-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <Link key={index} to={category.link} className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <span className="text-sm text-card-foreground bg-card/80 px-2 py-1 rounded backdrop-blur-sm">
                        {category.products} {t('fpv.products')}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                    <div className="mt-4 flex items-center text-accent text-sm font-medium">
                      {t('fpv.viewAll')}
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Hot Products */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">{t('fpv.hot.title')}</h2>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {hotProducts.map((product, index) => (
                <div key={index} className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">{product.category}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-2">{product.name}</h3>
                    <p className="text-muted-foreground mb-4 text-sm">{product.description}</p>
                    <div className="space-y-2 mb-4">
                      {product.specs.map((spec, i) => (<div key={i} className="text-sm text-foreground/80">• {spec}</div>))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-accent">{product.price}</span>
                      <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                        {t('fpv.learnMore')}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Accessories */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('fpv.accessories.title')}</h2>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {accessories.map((item, index) => (
                <div key={index} className="p-4 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all text-center group cursor-pointer">
                  <span className="text-sm font-medium text-card-foreground group-hover:text-accent transition-colors block mb-1">{item.name}</span>
                  <span className="text-xs text-muted-foreground">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">{t('fpv.articles.title')}</h2>
              <p className="text-muted-foreground">{t('fpv.articles.subtitle')}</p>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full mt-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <div key={index} className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all cursor-pointer">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                    <h3 className="text-lg font-bold text-card-foreground mt-2 mb-3 group-hover:text-accent transition-colors line-clamp-2">{article.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{article.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                {t('fpv.readMore')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="container-custom text-center relative">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t('fpv.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              {t('fpv.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg shadow-lg">
                {t('fpv.cta.join')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-10 py-6 text-lg backdrop-blur-sm">
                {t('nav.contact')}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default FPV;
