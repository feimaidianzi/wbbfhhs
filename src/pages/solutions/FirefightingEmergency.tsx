import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { BackButton } from "@/components/BackButton";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageFAQ } from "@/components/PageFAQ";
import { Button } from "@/components/ui/button";
import { LangLink as Link } from "@/components/LangLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Flame, Radio, Eye, Zap, Target, Download, FileText } from "lucide-react";

const FirefightingEmergency = () => {
  const { t } = useLanguage();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'UAV Firefighting & Emergency Response',
    provider: {
      '@type': 'Organization',
      name: 'CANI Technology Co., Ltd.',
      url: 'https://www.caniuav.com',
    },
    description: t('fireEmergency.seo.desc'),
    serviceType: 'Industrial UAV Emergency Solutions',
    areaServed: 'Worldwide',
  };

  const faqItems = [
    { questionKey: 'fireEmergency.faq.q1', answerKey: 'fireEmergency.faq.a1' },
    { questionKey: 'fireEmergency.faq.q2', answerKey: 'fireEmergency.faq.a2' },
  ];

  const techAdvantages = [
    { icon: Shield, titleKey: 'fireEmergency.tech.ip55.title', descKey: 'fireEmergency.tech.ip55.desc' },
    { icon: Zap, titleKey: 'fireEmergency.tech.latency.title', descKey: 'fireEmergency.tech.latency.desc' },
    { icon: Target, titleKey: 'fireEmergency.tech.compliance.title', descKey: 'fireEmergency.tech.compliance.desc' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={t('fireEmergency.seo.title')}
        description={t('fireEmergency.seo.desc')}
        keywords={t('fireEmergency.seo.keywords')}
        path="/solutions/uav-firefighting-emergency-rescue"
        structuredData={structuredData}
      />
      <Header />
      <BackButton to="/applications" />

      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/20343603/pexels-photo-20343603.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="CANI industrial UAV for emergency rescue and firefighting operations"
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
                {t('fireEmergency.hero.badge')}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                {t('fireEmergency.hero.h1')}
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
                {t('fireEmergency.hero.desc')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-base font-semibold rounded-full">
                    {t('fireEmergency.hero.cta')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 1: Wildfire Management */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t('fireEmergency.wildfire.tag')}</span>
                <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                  {t('fireEmergency.wildfire.h2')}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t('fireEmergency.wildfire.intro')}
                </p>

                <h3 className="text-xl font-bold text-foreground mb-3">{t('fireEmergency.wildfire.thermal.h3')}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {t('fireEmergency.wildfire.thermal.desc')}
                </p>
                <p className="text-sm text-accent font-medium mb-6">
                  {t('fireEmergency.wildfire.thermal.advantage')}
                </p>

                <h3 className="text-xl font-bold text-foreground mb-3">{t('fireEmergency.wildfire.vtx.h3')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('fireEmergency.wildfire.vtx.desc')}
                  {' '}
                  <Link to="/products/accessories/vtx-vrx" className="text-accent hover:underline font-medium">
                    {t('fireEmergency.link.vtx')}
                  </Link>
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="https://images.pexels.com/photos/3382442/pexels-photo-3382442.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="CANI firefighting drone wildfire thermal detection over forest fire line"
                  className="rounded-2xl shadow-lg w-full"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Lead Magnet - Mid Page */}
        <section className="py-12 bg-accent/5 border-y border-accent/10">
          <div className="container-custom text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">{t('fireEmergency.leadMagnet.roi.title')}</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{t('fireEmergency.leadMagnet.roi.desc')}</p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-full font-semibold">
                <FileText className="w-5 h-5 mr-2" />
                {t('fireEmergency.leadMagnet.roi.btn')}
              </Button>
            </Link>
          </div>
        </section>

        {/* Section 2: Urban & Industrial Fire */}
        <section className="py-20 bg-secondary">
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
                  src="https://images.pexels.com/photos/11119566/pexels-photo-11119566.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="CANI UAV search and rescue SAR thermal imaging in urban industrial fire"
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
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t('fireEmergency.urban.tag')}</span>
                <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                  {t('fireEmergency.urban.h2')}
                </h2>

                <h3 className="text-xl font-bold text-foreground mb-3">{t('fireEmergency.urban.structure.h3')}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t('fireEmergency.urban.structure.desc')}
                </p>

                <h3 className="text-xl font-bold text-foreground mb-3">{t('fireEmergency.urban.gas.h3')}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t('fireEmergency.urban.gas.desc')}
                </p>

                <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                  <p className="text-sm text-foreground font-medium">
                    {t('fireEmergency.urban.roi')}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 3: SAR */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t('fireEmergency.sar.tag')}</span>
                <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                  {t('fireEmergency.sar.h2')}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t('fireEmergency.sar.intro')}
                </p>

                <h3 className="text-xl font-bold text-foreground mb-3">{t('fireEmergency.sar.ai.h3')}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t('fireEmergency.sar.ai.desc')}
                </p>

                <h3 className="text-xl font-bold text-foreground mb-3">{t('fireEmergency.sar.relay.h3')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('fireEmergency.sar.relay.desc')}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="https://images.pexels.com/photos/10313531/pexels-photo-10313531.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="CANI industrial UAV for emergency rescue SAR night water search"
                  className="rounded-2xl shadow-lg w-full"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 4: Why CANI */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                {t('fireEmergency.whyCani.h2')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('fireEmergency.whyCani.subtitle')}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {techAdvantages.map((item, i) => (
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
          </div>
        </section>

        {/* FAQ */}
        <PageFAQ
          titleKey="fireEmergency.faq.title"
          items={faqItems}
        />

        {/* Bottom CTA / Lead Magnet */}
        <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          </div>
          <div className="container-custom relative text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              {t('fireEmergency.cta.title')}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('fireEmergency.cta.desc')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-base font-semibold rounded-full">
                  <Download className="w-5 h-5 mr-2" />
                  {t('fireEmergency.cta.download')}
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="px-8 py-6 text-base font-semibold rounded-full border-accent text-accent hover:bg-accent/10">
                  {t('fireEmergency.cta.contact')}
                  <ArrowRight className="w-5 h-5 ml-2" />
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

export default FirefightingEmergency;
