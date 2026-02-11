import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Eye, Radio, Shield, Package, Gauge, Flower2, Plane, Navigation } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const FPV = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Zap, title: t('fpv.features.speed.title'), description: t('fpv.features.speed.desc') },
    { icon: Eye, title: t('fpv.features.fpv.title'), description: t('fpv.features.fpv.desc') },
    { icon: Radio, title: t('fpv.features.latency.title'), description: t('fpv.features.latency.desc') },
    { icon: Shield, title: t('fpv.features.durable.title'), description: t('fpv.features.durable.desc') },
  ];

  const categories = [
    { name: t('fpv.categories.kits'), description: t('fpv.categories.kits.desc'), icon: Package, image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80", link: "/fpv/套装系列", products: 8 },
    { name: t('fpv.categories.racing'), description: t('fpv.categories.racing.desc'), icon: Gauge, image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80", link: "/fpv/竞速系列", products: 6 },
    { name: t('fpv.categories.freestyle'), description: t('fpv.categories.freestyle.desc'), icon: Flower2, image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80", link: "/fpv/花飞系列", products: 5 },
    { name: t('fpv.categories.longRange'), description: t('fpv.categories.longRange.desc'), icon: Navigation, image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80", link: "/fpv/远航系列", products: 4 },
    { name: t('fpv.categories.cinewhoop'), description: t('fpv.categories.cinewhoop.desc'), icon: Plane, image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80", link: "/fpv/航拍系列", products: 5 },
  ];

  const hotProducts = [
    { name: "CL-R5 竞速套装", category: t('fpv.categories.racing'), description: "专业竞速级FPV无人机，5寸机架，适合赛事训练和极限飞行。", specs: ["最高时速: 160km/h", "电机: 2806.5 1300KV", "图传延迟: <28ms"], image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80", price: "¥2,999" },
    { name: "CL-F3 花飞入门版", category: t('fpv.categories.freestyle'), description: "3寸花飞穿越机，室内外皆可飞行，适合新手练习特技。", specs: ["轴距: 140mm", "重量: 180g", "续航: 8分钟"], image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80", price: "¥1,299" },
    { name: "CL-LR7 远航版", category: t('fpv.categories.longRange'), description: "7寸长续航穿越机，搭载高效动力系统，探索更远距离。", specs: ["续航: 35分钟", "图传距离: 15km", "载重: 500g"], image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80", price: "¥4,599" },
  ];

  const accessories = [
    { name: "高清FPV眼镜", price: "¥1,299" },
    { name: "遥控器", price: "¥599" },
    { name: "电池充电器", price: "¥299" },
    { name: "备用桨叶套装", price: "¥49" },
    { name: "工具套装", price: "¥129" },
    { name: "收纳背包", price: "¥199" },
  ];

  const articles = [
    { title: "FPV穿越机入门全解析 | 新手如何玩转速度与激情", excerpt: "在无人机的众多类型中，FPV穿越机凭借独特的沉浸式体验和极速飞行的爽感，迅速成为无人机爱好者的新宠...", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80", date: "2025-08-15" },
    { title: "穿越机FPV | 探索极限飞行的无限可能", excerpt: "随着无人机技术的飞速发展，穿越机FPV逐渐成为飞行爱好者和极限运动者的热宠...", image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400&q=80", date: "2025-05-20" },
    { title: "穿越机 | 释放视角的边界，让飞行成为创意的新引擎", excerpt: "在视觉至上的短视频时代，一段震撼、独特的镜头，往往比千言万语更能打动人心...", image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=400&q=80", date: "2025-05-10" },
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
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80)" }}>
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