import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { BackButton } from "@/components/BackButton";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageFAQ } from "@/components/PageFAQ";
import { Button } from "@/components/ui/button";
import { LangLink } from "@/components/LangLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, Mountain, BarChart3, Building2, Crosshair, Radio, Layers, FileDown, AlertTriangle, Target, Satellite } from "lucide-react";

const SurveyingMapping = () => {
  const { t } = useLanguage();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Professional UAV 3D Mapping & RTK Surveying',
    provider: {
      '@type': 'Organization',
      name: 'CANI Technology',
      url: 'https://www.caniuav.com',
    },
    description: t('surveyMap.seo.desc'),
    serviceType: 'Industrial UAV Surveying & Mapping Solutions',
    areaServed: 'Worldwide',
  };

  const painPoints = [
    { icon: Mountain, titleKey: 'surveyMap.pain.terrain.title', descKey: 'surveyMap.pain.terrain.desc' },
    { icon: Target, titleKey: 'surveyMap.pain.density.title', descKey: 'surveyMap.pain.density.desc' },
    { icon: Satellite, titleKey: 'surveyMap.pain.satellite.title', descKey: 'surveyMap.pain.satellite.desc' },
  ];

  const techEdge = [
    { icon: Crosshair, titleKey: 'surveyMap.tech.rtk.title', descKey: 'surveyMap.tech.rtk.desc' },
    { icon: Radio, titleKey: 'surveyMap.tech.link.title', descKey: 'surveyMap.tech.link.desc' },
    { icon: Layers, titleKey: 'surveyMap.tech.gis.title', descKey: 'surveyMap.tech.gis.desc' },
  ];

  const faqItems = [
    { questionKey: 'surveyMap.faq.q1', answerKey: 'surveyMap.faq.a1' },
    { questionKey: 'surveyMap.faq.q2', answerKey: 'surveyMap.faq.a2' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={t('surveyMap.seo.title')}
        description={t('surveyMap.seo.desc')}
        keywords={t('surveyMap.seo.keywords')}
        path="/solutions/industrial-uav-surveying-mapping"
        structuredData={structuredData}
      />
      <Header />
      <BackButton to="/applications" />

      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/15798293/pexels-photo-15798293.jpeg?w=1920&q=80"
              alt="CANI industrial UAV for 3D mapping and surveying over construction site"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>
          <div className="container-custom relative z-10 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4 border border-accent/30">
                {t('surveyMap.hero.badge')}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                {t('surveyMap.hero.h1')}
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
                {t('surveyMap.hero.desc')}
              </p>
              <div className="flex flex-wrap gap-4">
                <LangLink to="/contact">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-base font-semibold rounded-full">
                    {t('surveyMap.hero.cta')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </LangLink>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-2xl md:text-4xl font-bold text-foreground">
                {t('surveyMap.pain.title')}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {painPoints.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center mb-5">
                    <p.icon className="w-7 h-7 text-destructive" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-3">{t(p.titleKey)}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t(p.descKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Scenario 1: Topographic Mapping */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t('surveyMap.scene1.tag')}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">
                  {t('surveyMap.scene1.h3')}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {t('surveyMap.scene1.desc')}
                </p>
                <div className="bg-accent/10 rounded-xl p-4 border border-accent/20 mb-4">
                  <p className="text-sm text-foreground font-medium">{t('surveyMap.scene1.output')}</p>
                </div>
                <p className="text-sm text-accent font-medium">{t('surveyMap.scene1.precision')}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?w=1200&q=80"
                  alt="CANI UAV generated digital surface model DSM with elevation detail"
                  className="rounded-2xl shadow-lg w-full"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Scenario 2: Mine Volumetric */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1"
              >
                <img
                  src="https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&q=80"
                  alt="CANI UAV mine stockpile volumetric calculation at open-pit mining site"
                  className="rounded-2xl shadow-lg w-full"
                  loading="lazy"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-2"
              >
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t('surveyMap.scene2.tag')}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">
                  {t('surveyMap.scene2.h3')}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {t('surveyMap.scene2.desc')}
                </p>
                <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                  <p className="text-sm text-foreground font-medium">{t('surveyMap.scene2.slope')}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Scenario 3: Digital Twins */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t('surveyMap.scene3.tag')}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">
                  {t('surveyMap.scene3.h3')}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {t('surveyMap.scene3.desc')}
                </p>
                <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                  <p className="text-sm text-foreground font-medium">{t('surveyMap.scene3.bim')}</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="https://images.pexels.com/photos/3133688/pexels-photo-3133688.jpeg?w=1200&q=80"
                  alt="CANI UAV digital twin 3D mesh model for smart city urban planning"
                  className="rounded-2xl shadow-lg w-full"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Lead Magnet */}
        <section className="py-12 bg-accent/5 border-y border-accent/10">
          <div className="container-custom text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">{t('surveyMap.leadMagnet.title')}</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{t('surveyMap.leadMagnet.desc')}</p>
            <LangLink to="/contact">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-full font-semibold">
                <FileDown className="w-5 h-5 mr-2" />
                {t('surveyMap.leadMagnet.btn')}
              </Button>
            </LangLink>
          </div>
        </section>

        {/* Technical Edge */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                {t('surveyMap.tech.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('surveyMap.tech.subtitle')}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {techEdge.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card rounded-2xl p-8 border border-border shadow-sm text-center"
                >
                  <item.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-3">{t(item.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(item.descKey)}</p>
                </motion.div>
              ))}
            </div>
            {/* Internal links */}
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              <LangLink to="/products/accessories/fc-esc" className="text-accent hover:underline font-semibold inline-flex items-center gap-1">
                {t('surveyMap.link.fc')}
                <ArrowRight className="w-4 h-4" />
              </LangLink>
              <LangLink to="/products/accessories/digital-fpv" className="text-accent hover:underline font-semibold inline-flex items-center gap-1">
                {t('surveyMap.link.vtx')}
                <ArrowRight className="w-4 h-4" />
              </LangLink>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <PageFAQ
          titleKey="surveyMap.faq.title"
          items={faqItems}
        />

        {/* Bottom CTA */}
        <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          </div>
          <div className="container-custom relative text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              {t('surveyMap.cta.title')}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('surveyMap.cta.desc')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <LangLink to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-base font-semibold rounded-full">
                  {t('surveyMap.cta.contact')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </LangLink>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContact />

      {/* Floating Lead Magnet */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="fixed right-4 bottom-28 z-40"
      >
        <LangLink to="/contact">
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg rounded-full px-5 py-3 flex items-center gap-2 text-sm font-semibold">
            <FileDown className="w-4 h-4" />
            {t('surveyMap.whitepaper.btn')}
          </Button>
        </LangLink>
      </motion.div>
    </div>
  );
};

export default SurveyingMapping;
