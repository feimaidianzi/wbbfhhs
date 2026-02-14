import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { ArrowRight, ChevronDown, Box, Cpu, Camera, Radio, Joystick, Wifi, Package, Plane, Link2, Truck, Users, Gamepad2 } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO, createLocalizedBreadcrumbData } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageCode } from "@/i18n/languages";

const Products = () => {
  const { language, t } = useLanguage();

  const droneCategories = [
    { name: t('header.droneNest'), href: "/products/airport", description: t('header.droneNest.desc'), icon: Box },
    { name: t('header.tethered'), href: "/products/tethered", description: t('header.tethered.desc'), icon: Link2 },
    { name: t('header.logistics'), href: "/products/logistics", description: t('header.logistics.desc'), icon: Truck },
    { name: t('header.swarm'), href: "/products/swarm", description: t('header.swarm.desc'), icon: Users },
    { name: t('header.fpvDrone'), href: "/fpv", description: t('header.fpvDrone.desc'), icon: Gamepad2 },
  ];

  const accessoryCategories = [
    { name: t('header.vtx'), href: "/products/accessories/vtx-vrx", description: t('header.vtx.desc'), icon: Radio },
    { name: t('header.fcEsc'), href: "/products/accessories/fc-esc", description: t('header.fcEsc.desc'), icon: Cpu },
    { name: t('header.gimbal'), href: "/products/accessories/gimbal", description: t('header.gimbal.desc'), icon: Joystick },
    { name: t('header.digitalFpv'), href: "/products/accessories/digital-fpv", description: t('header.digitalFpv.desc'), icon: Wifi },
    { name: t('header.camera'), href: "/products/accessories/camera", description: t('header.camera.desc'), icon: Camera },
    { name: t('header.elrs'), href: "/products/accessories/elrs", description: t('header.elrs.desc'), icon: Plane },
    { name: t('header.others'), href: "/products/accessories/others", description: t('header.others.desc'), icon: Package },
  ];

  const breadcrumbData = createLocalizedBreadcrumbData([
    { name: t('nav.home'), url: '/' },
    { name: t('nav.products'), url: '/products' },
  ], language as LanguageCode);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const allCategories = [...droneCategories, ...accessoryCategories];

  const itemListData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('products.page.title'),
    description: t('products.page.description'),
    url: 'https://www.caniuav.com/products',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: allCategories.length,
      itemListElement: allCategories.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: { '@type': 'Product', name: c.name, description: c.description, url: `https://www.caniuav.com${c.href}`, brand: { '@type': 'Brand', name: 'CANI' } },
      })),
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={t('products.page.title')}
        description={t('products.page.description')}
        keywords={t('products.page.keywords')}
        path="/products"
        structuredData={[breadcrumbData, itemListData]}
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80)" }} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          </div>
          <div className="container-custom relative z-10 text-center py-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-block px-4 py-2 rounded-full bg-black/50 border border-white/30 text-white text-sm font-medium mb-6">
                {t('products.hero.badge')}
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              {t('products.hero.title')}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
              {t('products.hero.subtitle')}
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <ChevronDown className="w-6 h-6 text-white/60 animate-bounce" />
          </motion.div>
        </section>

        {/* Drone Systems */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t('header.multiRotor')}</h2>
              <div className="w-12 h-0.5 bg-accent mt-2" />
            </div>
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {droneCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <motion.div key={cat.href} variants={itemVariants}>
                    <Link to={cat.href} className="group block h-full p-6 bg-card rounded-2xl border border-border hover:border-accent/40 transition-all duration-300 hover:-translate-y-1">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">{cat.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{cat.description}</p>
                      <div className="flex items-center text-accent text-sm font-medium">
                        {t('common.learnMore')}
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Accessories */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t('products.category.accessories')}</h2>
              <div className="w-12 h-0.5 bg-accent mt-2" />
            </div>
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {accessoryCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <motion.div key={cat.href} variants={itemVariants}>
                    <Link to={cat.href} className="group block h-full p-6 bg-card rounded-2xl border border-border hover:border-accent/40 transition-all duration-300 hover:-translate-y-1">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">{cat.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{cat.description}</p>
                      <div className="flex items-center text-accent text-sm font-medium">
                        {t('common.learnMore')}
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-cyan-500/10 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="container-custom relative text-center">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">{t('products.cta.title')}</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{t('products.cta.subtitle')}</p>
              <Link to="/contact">
                <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold rounded-full min-h-[44px] min-w-[44px] inline-flex items-center gap-2 transition-colors">
                  {t('common.contact')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Products;
