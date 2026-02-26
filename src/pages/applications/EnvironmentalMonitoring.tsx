import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wind, Leaf, Droplets, Radio, Zap, Globe, AlertTriangle, Clock, Search, FileDown, Shield } from "lucide-react";
import { LangLink } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import atmosphericMonitoringImg from "@/assets/seo/atmospheric-monitoring.jpg";
import forestHealthSurveyImg from "@/assets/seo/forest-health-survey.jpg";
import waterPollutionDetectionImg from "@/assets/seo/water-pollution-detection.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const EnvironmentalMonitoring = () => {
  const { t } = useLanguage();

  const painPoints = [
    { icon: AlertTriangle, titleKey: 'envmon.pain.access.title', descKey: 'envmon.pain.access.desc' },
    { icon: Clock, titleKey: 'envmon.pain.density.title', descKey: 'envmon.pain.density.desc' },
    { icon: Search, titleKey: 'envmon.pain.response.title', descKey: 'envmon.pain.response.desc' },
  ];

  const scenarios = [
    {
      titleKey: 'envmon.scene1.title',
      descKey: 'envmon.scene1.desc',
      image: atmosphericMonitoringImg,
      alt: "CANI industrial UAV atmospheric monitoring with 3D gas diffusion mapping over industrial zone",
      hasVtxLink: true,
    },
    {
      titleKey: 'envmon.scene2.title',
      descKey: 'envmon.scene2.desc',
      image: forestHealthSurveyImg,
      alt: "CANI UAV NDVI multispectral forest health survey with vegetation index analysis",
      hasGimbalLink: true,
    },
    {
      titleKey: 'envmon.scene3.title',
      descKey: 'envmon.scene3.desc',
      image: waterPollutionDetectionImg,
      alt: "CANI UAV illegal discharge detection over river with thermal imaging evidence capture",
    },
  ];

  const advantages = [
    { icon: Radio, titleKey: 'envmon.adv.latency.title', descKey: 'envmon.adv.latency.desc' },
    { icon: Shield, titleKey: 'envmon.adv.emi.title', descKey: 'envmon.adv.emi.desc' },
    { icon: Globe, titleKey: 'envmon.adv.ndaa.title', descKey: 'envmon.adv.ndaa.desc' },
  ];

  const faqs = [
    { question: t('envmon.faq.q1'), answer: t('envmon.faq.a1') },
    { question: t('envmon.faq.q2'), answer: t('envmon.faq.a2') },
  ];

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('envmon.seo.title')}
        description={t('envmon.seo.desc')}
        keywords={t('envmon.seo.keywords')}
        path="/solutions/industrial-uav-environmental-monitoring"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* === HERO === */}
        <section className="relative h-[450px] md:h-[560px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${forestHealthSurveyImg})` }}
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative container-custom h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold tracking-wider uppercase mb-4">
                {t('envmon.badge')}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-black text-white mb-6 leading-tight">
                {t('envmon.title')}
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
                {t('envmon.hero')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* === 行业痛点 === */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-2xl md:text-4xl font-bold text-foreground">
                {t('envmon.pain.title')}
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

        {/* === 应用场景 === */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-2xl md:text-4xl font-bold text-foreground">
                {t('envmon.scenarios.title')}
              </h2>
            </motion.div>
            <div className="space-y-20">
              {scenarios.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={s.image}
                        alt={s.alt}
                        className="w-full h-[280px] md:h-[360px] object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">{t(s.titleKey)}</h2>
                    <p className="text-muted-foreground leading-relaxed text-base mb-4">
                      {t(s.descKey)}
                    </p>
                    {s.hasVtxLink && (
                      <LangLink
                        to="/products/accessories/vtx-vrx"
                        className="inline-flex items-center gap-2 text-accent hover:underline font-semibold"
                      >
                        {t('envmon.vtx.link')}
                        <ArrowRight className="w-4 h-4" />
                      </LangLink>
                    )}
                    {s.hasGimbalLink && (
                      <LangLink
                        to="/products/accessories/gimbal"
                        className="inline-flex items-center gap-2 text-accent hover:underline font-semibold"
                      >
                        {t('envmon.gimbal.link')}
                        <ArrowRight className="w-4 h-4" />
                      </LangLink>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* === 核心优势 === */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-2xl md:text-4xl font-bold text-foreground">
                {t('envmon.adv.title')}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {advantages.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="bg-card rounded-2xl p-8 border border-accent/20 shadow-sm text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                    <a.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-3">{t(a.titleKey)}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t(a.descKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* === FAQ / AEO === */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {t('envmon.faq.title')}
              </h2>
            </motion.div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`envmon-faq-${index}`}
                    className="bg-card rounded-xl border border-border px-6 shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
            />
          </div>
        </section>

        {/* === CTA === */}
        <section className="py-16 md:py-20 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t('envmon.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('envmon.cta.subtitle')}
            </p>
            <LangLink to="/contact">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-base font-semibold">
                {t('envmon.cta.btn')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </LangLink>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />

      {/* === 悬浮白皮书下载按钮 === */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="fixed right-4 bottom-28 z-40"
      >
        <LangLink to="/contact">
          <Button
            className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg rounded-full px-5 py-3 flex items-center gap-2 text-sm font-semibold"
          >
            <FileDown className="w-4 h-4" />
            {t('envmon.whitepaper.btn')}
          </Button>
        </LangLink>
      </motion.div>
    </div>
  );
};

export default EnvironmentalMonitoring;
