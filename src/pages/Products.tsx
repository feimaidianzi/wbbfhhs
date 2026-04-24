import { motion } from "@/lib/motion-shim";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { ArrowRight, ChevronDown, Box, Cpu, Camera, Radio, Joystick, Wifi, Package, Plane, Link2, Truck, Users, Gamepad2, Brain, Satellite, FileDown, ShieldCheck, Crosshair } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO, createLocalizedBreadcrumbData } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageCode } from "@/i18n/languages";
import { HeroImagePreload } from "@/components/HeroImagePreload";
import productsHeroImg from "@/assets/seo/products-hero.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Products = () => {
  const { language, t } = useLanguage();

  // SITE FOCUS: caniuav.com — Industrial UAV Flight Platforms only.
  // Component clusters (VTX/FC/Gimbal/Camera/ELRS/AI Module) are migrated to canilink.com.
  // techClusters keeps only platform-related entries.
  const techClusters = [
    {
      title: t('products.cluster.platform.title'),
      desc: t('products.cluster.platform.desc'),
      icon: Box,
      links: [
        { label: t('products.anchor.swarm'), href: "/products/swarm" },
        { label: t('products.anchor.tethered'), href: "/products/tethered" },
        { label: t('products.anchor.logistics'), href: "/products/logistics" },
        { label: t('products.anchor.multiRotor') || 'Multi-Rotor', href: "/products/multi-rotor" },
        { label: t('products.anchor.fpv') || 'FPV', href: "/fpv" },
      ],
    },
  ];

  // Accessory categories hidden — empty array preserves layout for future restoration
  const accessoryCategories: { name: string; href: string; description: string; icon: typeof Box; anchor: string }[] = [];

  // 5 vertical platform categories — caniuav.com industrial UAV focus
  const droneCategories = [
    { name: t('header.swarm'), href: "/products/swarm", description: t('header.swarm.desc'), icon: Users, anchor: t('products.anchor.swarm') },
    { name: t('header.tethered'), href: "/products/tethered", description: t('header.tethered.desc'), icon: Link2, anchor: t('products.anchor.tethered') },
    { name: t('header.logistics'), href: "/products/logistics", description: t('header.logistics.desc'), icon: Truck, anchor: t('products.anchor.logistics') },
    { name: t('header.multiRotor') || 'Multi-Rotor Platforms', href: "/products/multi-rotor", description: t('header.multiRotor.desc') || 'X650 / X850 / X1200 / X1600 industrial multi-rotor heavy-lift platforms', icon: Plane, anchor: t('products.anchor.multiRotor') || 'Multi-Rotor' },
    { name: t('header.fpvDrone'), href: "/fpv", description: t('header.fpvDrone.desc'), icon: Gamepad2, anchor: t('products.anchor.fpv') },
  ];

  const faqs = [
    { q: t('products.faq.q1'), a: t('products.faq.a1') },
    { q: t('products.faq.q2'), a: t('products.faq.a2') },
    { q: t('products.faq.q3'), a: t('products.faq.a3') },
    { q: t('products.faq.q4'), a: t('products.faq.a4') },
  ];

  const breadcrumbData = createLocalizedBreadcrumbData([
    { name: t('nav.home'), url: '/' },
    { name: t('nav.products'), url: '/products' },
  ], language as LanguageCode);

  const allCategories = [...droneCategories, ...accessoryCategories];

  const itemListData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('products.hero.title'),
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

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={t('products.page.title')}
        description={t('products.page.description')}
        keywords={t('products.page.keywords')}
        path="/products"
        structuredData={[breadcrumbData, itemListData, faqStructuredData]}
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <HeroImagePreload imageSrc={productsHeroImg} />
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${productsHeroImg})` }} />
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
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-4">
              {t('products.hero.subtitle')}
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-base text-white/60 max-w-3xl mx-auto leading-relaxed">
              {t('products.hero.overview')}
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <ChevronDown className="w-6 h-6 text-white/60 animate-bounce" />
          </motion.div>
        </section>

        {/* Technical Capability Clusters */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{t('products.h2.techCapability')}</h2>
              <div className="w-12 h-0.5 bg-accent mt-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {techClusters.map((cluster, idx) => {
                const Icon = cluster.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-6 md:p-8 bg-card rounded-2xl border border-border hover:border-accent/30 transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-accent" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{cluster.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">{cluster.desc}</p>
                    <div className="flex flex-wrap gap-3">
                      {cluster.links.map((link, li) => (
                        <Link key={li} to={link.href} className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline min-h-[44px]">
                          {link.label}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Drone Systems */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t('products.cluster.platform.title')}</h2>
              <div className="w-12 h-0.5 bg-accent mt-2" />
            </div>
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
                      <div className="flex items-center text-accent text-sm font-medium min-h-[44px]">
                        {cat.anchor}
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Accessories section hidden — components migrated to canilink.com */}
        {accessoryCategories.length > 0 && (
        <section className="py-16 bg-background">
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
                      <div className="flex items-center text-accent text-sm font-medium min-h-[44px]">
                        {cat.anchor}
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
        )}

        {/* PDF Download CTA */}
        <section className="py-12 bg-secondary">
          <div className="container-custom text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-card border border-accent/20 rounded-2xl shadow-sm">
                <FileDown className="w-6 h-6 text-accent" />
                <span className="text-foreground font-semibold">{t('products.downloadGuide')}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* AEO FAQ */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{t('products.faq.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t('products.faq.subtitle')}</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="bg-card rounded-xl border border-border px-6 shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
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
                  {t('products.cta.button')}
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
