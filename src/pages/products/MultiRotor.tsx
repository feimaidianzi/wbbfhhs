import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { BackButton } from "@/components/BackButton";
import { MultiLanguageSEO, createLocalizedBreadcrumbData } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageCode } from "@/i18n/languages";
import { LangLink as Link } from "@/components/LangLink";
import {
  ArrowRight, ChevronDown, Link2, Truck, Users, Gamepad2,
  Shield, Zap, Wind, Cpu, Clock, Weight, FileDown, Radar
} from "lucide-react";
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

const MultiRotor = () => {
  const { language, t } = useLanguage();

  const platforms = [
    {
      icon: Link2,
      titleKey: 'platforms.tethered.title',
      descKey: 'platforms.tethered.desc',
      detailKey: 'platforms.tethered.detail',
      href: "/products/tethered",
      anchorKey: 'platforms.tethered.anchor',
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80",
    },
    {
      icon: Truck,
      titleKey: 'platforms.logistics.title',
      descKey: 'platforms.logistics.desc',
      detailKey: 'platforms.logistics.detail',
      href: "/products/logistics",
      anchorKey: 'platforms.logistics.anchor',
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    },
    {
      icon: Users,
      titleKey: 'platforms.swarm.title',
      descKey: 'platforms.swarm.desc',
      detailKey: 'platforms.swarm.detail',
      href: "/products/swarm",
      anchorKey: 'platforms.swarm.anchor',
      image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
    },
    {
      icon: Gamepad2,
      titleKey: 'platforms.fpv.title',
      descKey: 'platforms.fpv.desc',
      detailKey: 'platforms.fpv.detail',
      href: "/fpv",
      anchorKey: 'platforms.fpv.anchor',
      image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=600&q=80",
    },
  ];

  const comparisonData = [
    {
      nameKey: 'platforms.tethered.title',
      endurance: t('platforms.compare.tethered.endurance'),
      payload: t('platforms.compare.tethered.payload'),
      range: t('platforms.compare.tethered.range'),
      linkType: t('platforms.compare.tethered.link'),
    },
    {
      nameKey: 'platforms.logistics.title',
      endurance: t('platforms.compare.logistics.endurance'),
      payload: t('platforms.compare.logistics.payload'),
      range: t('platforms.compare.logistics.range'),
      linkType: t('platforms.compare.logistics.link'),
    },
    {
      nameKey: 'platforms.swarm.title',
      endurance: t('platforms.compare.swarm.endurance'),
      payload: t('platforms.compare.swarm.payload'),
      range: t('platforms.compare.swarm.range'),
      linkType: t('platforms.compare.swarm.link'),
    },
    {
      nameKey: 'platforms.fpv.title',
      endurance: t('platforms.compare.fpv.endurance'),
      payload: t('platforms.compare.fpv.payload'),
      range: t('platforms.compare.fpv.range'),
      linkType: t('platforms.compare.fpv.link'),
    },
  ];

  const faqs = [
    { q: t('platforms.faq.q1'), a: t('platforms.faq.a1') },
    { q: t('platforms.faq.q2'), a: t('platforms.faq.a2') },
    { q: t('platforms.faq.q3'), a: t('platforms.faq.a3') },
  ];

  const breadcrumbData = createLocalizedBreadcrumbData([
    { name: t('nav.home'), url: '/' },
    { name: t('nav.products'), url: '/products' },
    { name: t('platforms.page.title'), url: '/products/multi-rotor' },
  ], language as LanguageCode);

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Industrial UAV Platform Solutions',
    provider: {
      '@type': 'Organization',
      name: language === 'zh' ? '长凌科技' : 'CANI Technology',
    },
    description: t('platforms.page.description'),
    serviceType: 'UAV Platform Systems',
  };

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={t('platforms.page.title')}
        description={t('platforms.page.description')}
        keywords={t('platforms.page.keywords')}
        path="/products/multi-rotor"
        structuredData={[breadcrumbData, faqStructuredData, serviceSchema]}
      />
      <Header />
      <BackButton to="/products" />

      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1506947411487-a56738267384?w=1920&q=80)" }} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center py-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-block px-4 py-2 rounded-full bg-black/50 border border-white/30 text-white text-sm font-medium mb-6">
                {t('platforms.hero.badge')}
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              {t('platforms.hero.title')}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-4">
              {t('platforms.hero.subtitle')}
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-base text-white/60 max-w-3xl mx-auto leading-relaxed">
              {t('platforms.hero.overview')}
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <ChevronDown className="w-6 h-6 text-white/60 animate-bounce" />
          </motion.div>
        </section>

        {/* Core Advantages */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{t('platforms.advantages.title')}</h2>
              <div className="w-12 h-0.5 bg-accent mt-2" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Shield, key: 'redundant' },
                { icon: Zap, key: 'endurance' },
                { icon: Wind, key: 'wind' },
                { icon: Cpu, key: 'encryption' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="text-center p-6 bg-card rounded-2xl border border-border"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{t(`platforms.adv.${item.key}`)}</h3>
                  <p className="text-sm text-muted-foreground">{t(`platforms.adv.${item.key}.desc`)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Categories */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{t('platforms.categories.title')}</h2>
              <p className="text-muted-foreground max-w-2xl">{t('platforms.categories.subtitle')}</p>
              <div className="w-12 h-0.5 bg-accent mt-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {platforms.map((platform, idx) => {
                const Icon = platform.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/30 transition-colors"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={platform.image}
                        alt={`CANI ${t(platform.titleKey)} Industrial UAV Platform`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{t(platform.titleKey)}</h3>
                      </div>
                      <p className="text-muted-foreground mb-3 font-medium">{t(platform.descKey)}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t(platform.detailKey)}</p>
                      <Link to={platform.href} className="inline-flex items-center gap-2 text-accent font-semibold hover:underline min-h-[44px]">
                        {t(platform.anchorKey)}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{t('platforms.compare.title')}</h2>
              <div className="w-12 h-0.5 bg-accent mt-2" />
            </div>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-accent/5">
                    <TableHead className="font-bold text-foreground">{t('platforms.compare.header.platform')}</TableHead>
                    <TableHead className="font-bold text-foreground">{t('platforms.compare.header.endurance')}</TableHead>
                    <TableHead className="font-bold text-foreground">{t('platforms.compare.header.payload')}</TableHead>
                    <TableHead className="font-bold text-foreground">{t('platforms.compare.header.range')}</TableHead>
                    <TableHead className="font-bold text-foreground">{t('platforms.compare.header.link')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonData.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-semibold text-foreground">{t(row.nameKey)}</TableCell>
                      <TableCell>{row.endurance}</TableCell>
                      <TableCell>{row.payload}</TableCell>
                      <TableCell>{row.range}</TableCell>
                      <TableCell>{row.linkType}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* Component Cross-Link */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-card border border-accent/20 rounded-2xl p-8 md:p-12">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">{t('platforms.crossLink.title')}</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">{t('platforms.crossLink.desc')}</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full font-semibold hover:bg-accent/90 transition-colors min-h-[44px]">
                  {t('platforms.crossLink.components')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/products/accessories/digital-fpv" className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent rounded-full font-semibold hover:bg-accent/10 transition-colors min-h-[44px]">
                  {t('platforms.crossLink.vtx')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/products/accessories/fc-esc" className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent rounded-full font-semibold hover:bg-accent/10 transition-colors min-h-[44px]">
                  {t('platforms.crossLink.fc')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PDF CTA */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-card border border-accent/20 rounded-2xl shadow-sm">
                <FileDown className="w-6 h-6 text-accent" />
                <span className="text-foreground font-semibold">{t('platforms.downloadGuide')}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* AEO FAQ */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{t('platforms.faq.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t('platforms.faq.subtitle')}</p>
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
        <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-primary/10 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="container mx-auto px-4 relative text-center">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">{t('platforms.cta.title')}</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{t('platforms.cta.subtitle')}</p>
              <Link to="/contact">
                <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold rounded-full min-h-[44px] min-w-[44px] inline-flex items-center gap-2 transition-colors">
                  {t('platforms.cta.button')}
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

export default MultiRotor;
