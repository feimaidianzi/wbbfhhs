import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { Target, Users, Award, ArrowRight, Cpu, BarChart3, Globe2, ShieldCheck, Layers, Radio, Settings, Code, Plane, Zap, Thermometer, Factory, CheckCircle2, MapPin, Shield, Truck, Wifi, Video, Terminal } from "lucide-react";
import caniReception from "@/assets/about/cani-reception.png";
import founderImg from "@/assets/founder-alex.png";
import { MultiLanguageSEO, createLocalizedBreadcrumbData } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { LangLink } from "@/components/LangLink";
import { PageFAQ } from "@/components/PageFAQ";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Helmet } from "react-helmet-async";
import { FacilityGallery } from "@/components/FacilityGallery";
import corporateImg from "@/assets/seo/corporate-office.jpg";
import { motion } from "framer-motion";

const About = () => {
  const { t, language } = useLanguage();

  const milestones = [
    { year: "2015", title: t('about.milestone.2015.title'), description: t('about.milestone.2015.desc') },
    { year: "2017", title: t('about.milestone.2017.title'), description: t('about.milestone.2017.desc') },
    { year: "2019", title: t('about.milestone.2019.title'), description: t('about.milestone.2019.desc') },
    { year: "2023", title: t('about.milestone.2023.title'), description: t('about.milestone.2023.desc') },
    { year: "2025", title: t('about.milestone.2025.title'), description: t('about.milestone.2025.desc') },
  ];

  const stats = [
    { value: "200+", label: t('about.stat.professionals') },
    { value: "50+", label: t('about.stat.patents') },
    { value: "1000+", label: t('about.stat.clientsServed') },
    { value: "30+", label: t('about.stat.citiesCovered') },
  ];

  const competencyLayers = [
    {
      icon: Cpu,
      title: t('about.competencies.layer1.title'),
      tag: t('about.competencies.layer1.tag'),
      rows: [
        { dim: t('about.competencies.row1.dim'), spec: t('about.competencies.row1.spec'), value: t('about.competencies.row1.value') },
        { dim: t('about.competencies.row2.dim'), spec: t('about.competencies.row2.spec'), value: t('about.competencies.row2.value') },
        { dim: t('about.competencies.row3.dim'), spec: t('about.competencies.row3.spec'), value: t('about.competencies.row3.value') },
      ],
    },
    {
      icon: Code,
      title: t('about.competencies.layer2.title'),
      tag: t('about.competencies.layer2.tag'),
      rows: [
        { dim: t('about.competencies.row4.dim'), spec: t('about.competencies.row4.spec'), value: t('about.competencies.row4.value') },
        { dim: t('about.competencies.row5.dim'), spec: t('about.competencies.row5.spec'), value: t('about.competencies.row5.value') },
        { dim: t('about.competencies.row6.dim'), spec: t('about.competencies.row6.spec'), value: t('about.competencies.row6.value') },
      ],
    },
    {
      icon: Plane,
      title: t('about.competencies.layer3.title'),
      tag: t('about.competencies.layer3.tag'),
      rows: [
        { dim: t('about.competencies.row7.dim'), spec: t('about.competencies.row7.spec'), value: t('about.competencies.row7.value') },
        { dim: t('about.competencies.row8.dim'), spec: t('about.competencies.row8.spec'), value: t('about.competencies.row8.value') },
        { dim: t('about.competencies.row9.dim'), spec: t('about.competencies.row9.spec'), value: t('about.competencies.row9.value') },
      ],
    },
  ];

  const techAdvantages = [
    {
      num: t('about.techAdvantage.avs.num'),
      title: t('about.techAdvantage.avs.title'),
      tag: t('about.techAdvantage.avs.tag'),
      desc: t('about.techAdvantage.avs.desc'),
      icon: Zap,
    },
    {
      num: t('about.techAdvantage.thermal.num'),
      title: t('about.techAdvantage.thermal.title'),
      tag: t('about.techAdvantage.thermal.tag'),
      desc: t('about.techAdvantage.thermal.desc'),
      icon: Thermometer,
    },
    {
      num: t('about.techAdvantage.oem.num'),
      title: t('about.techAdvantage.oem.title'),
      tag: t('about.techAdvantage.oem.tag'),
      desc: t('about.techAdvantage.oem.desc'),
      icon: Factory,
    },
  ];

  const scenarios = [
    { label: t('about.scenarios.power'), desc: t('about.scenarios.power.desc'), icon: Zap },
    { label: t('about.scenarios.mapping'), desc: t('about.scenarios.mapping.desc'), icon: MapPin },
    { label: t('about.scenarios.agriculture'), desc: t('about.scenarios.agriculture.desc'), icon: Truck },
    { label: t('about.scenarios.border'), desc: t('about.scenarios.border.desc'), icon: Shield },
  ];

  const oemFeatures = [
    { title: t('about.oem.rf.title'), desc: t('about.oem.rf.desc') },
    { title: t('about.oem.cad.title'), desc: t('about.oem.cad.desc') },
    { title: t('about.oem.qa.title'), desc: t('about.oem.qa.desc') },
    { title: t('about.oem.logistics.title'), desc: t('about.oem.logistics.desc') },
  ];

  const faqItems = [
    { questionKey: 'about.faq.q1', answerKey: 'about.faq.a1' },
    { questionKey: 'about.faq.q2', answerKey: 'about.faq.a2' },
    { questionKey: 'about.faq.q3', answerKey: 'about.faq.a3' },
  ];

  const breadcrumbData = createLocalizedBreadcrumbData([
    { name: t('nav.home'), url: '/' },
    { name: t('about.title'), url: '/about' },
  ], language);

  const aboutPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "长凌科技 (CANI)",
      "alternateName": ["长凌", "CANI UAV", "CANI"],
      "url": "https://www.caniuav.com/",
      "logo": "https://www.caniuav.com/images/logo.png",
      "foundingDate": "2015",
      "description": "Founded in 2015, CANI Technology is a High-tech Enterprise specializing in industrial UAV payload R&D and manufacturing with 200+ technology patents and ISO 9001 certification capability. Core products include 37W high-power VTX systems (50km range), EO/IR gimbal pods, COFDM digital video links, and ELRS control systems.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "望城区月亮岛街道罐子岭澳优全球总部大楼",
        "addressLocality": "Changsha",
        "addressRegion": "Hunan",
        "postalCode": "410200",
        "addressCountry": "CN"
      },
      "contactPoint": [
        { "@type": "ContactPoint", "telephone": "+86-17585423252", "contactType": "sales and technical support", "email": "market@caniuav.com", "availableLanguage": ["Chinese", "English"] },
        { "@type": "ContactPoint", "contactType": "Sales & OEM/ODM", "email": "sales@caniuav.com" },
        { "@type": "ContactPoint", "contactType": "Technical Support", "email": "support@caniuav.com" }
      ],
      "sameAs": ["https://linkedin.com/company/caniuav", "https://instagram.com/868163685410", "https://t.me/caniuav", "https://m.me/caniuav"],
      "knowsAbout": ["Industrial UAV Payload Customization", "37W High-Power Video Transmission Systems", "EO/IR Dual-Sensor Gimbal Pods", "Flight Controller & ESC Systems", "BVLOS Operations", "MAVLink Protocol Integration"],
      "brand": { "@type": "Brand", "name": "CANI" },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Industrial UAV Payload Customization Services",
        "itemListElement": [
          { "@type": "Service", "name": "Industrial UAV Payload OEM/ODM Customization", "description": "Full-cycle payload customization from concept to mass production.", "provider": { "@type": "Organization", "name": "CANI Technology" }, "areaServed": "Worldwide", "serviceType": "OEM/ODM Manufacturing" },
          { "@type": "Service", "name": "Custom UAV Platform Development", "description": "Tethered UAV systems, heavy-lift platforms, and secure communication integration.", "provider": { "@type": "Organization", "name": "CANI Technology" }, "areaServed": "Worldwide", "serviceType": "R&D Engineering" }
        ]
      }
    }
  };

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('about.seoTitle') !== 'about.seoTitle' ? t('about.seoTitle') : t('about.title')}
        description={t('about.seoDescription')}
        keywords={t('about.seoKeywords')}
        path="/about"
        structuredData={breadcrumbData}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(aboutPageJsonLd)}</script>
      </Helmet>
      <Header />
      <main className="pt-16 md:pt-20">

        {/* ========== 1. HERO - Brand Vision ========== */}
        <section className="relative min-h-[500px] md:min-h-[600px] overflow-hidden flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${corporateImg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
          </div>
          {/* Decorative grid overlay */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="relative container-custom py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-6 backdrop-blur-sm border border-accent/30">
                {t('about.vision.badge')}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground mb-4 leading-tight">
                {t('about.vision.heroTitle.line1')}<br />
                <span className="text-accent">{t('about.vision.heroTitle.line2')}</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/85 leading-relaxed max-w-2xl">
                {t('about.vision.heroDesc')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ========== Stats Bar ========== */}
        <section className="py-12 bg-primary border-t border-accent/20">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-black text-accent mb-2">{stat.value}</div>
                  <div className="text-primary-foreground/80 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== 2. Core Tech Advantages ========== */}
        <section className="py-20 md:py-28 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="container-custom relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
                {t('about.techAdvantage.title')}
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                {t('about.techAdvantage.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {techAdvantages.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group relative p-8 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="text-accent/20 text-6xl font-black absolute top-4 right-6 group-hover:text-accent/30 transition-colors">
                    {item.num}
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                    <item.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <span className="inline-block text-xs font-mono text-accent/70 bg-accent/5 px-2 py-0.5 rounded mb-4">
                    {item.tag}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== 3. Application Scenarios ========== */}
        <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          <div className="container-custom relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                {t('about.scenarios.title')}
              </h2>
              <p className="text-primary-foreground/70 max-w-2xl mx-auto">
                {t('about.scenarios.subtitle')}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {scenarios.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-6 rounded-2xl border border-primary-foreground/10 hover:border-accent/40 bg-primary-foreground/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                >
                  <s.icon className="w-8 h-8 text-accent mb-4" />
                  <h3 className="text-lg font-bold text-primary-foreground mb-2">{s.label}</h3>
                  <p className="text-sm text-primary-foreground/60">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== THREE TECH PILLARS - RF / Video / Software ========== */}
        <section className="py-20 md:py-28 bg-[#0a0f1a] relative overflow-hidden">
          {/* PCB-style grid background */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.6) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.4) 1px, transparent 1px)', backgroundSize: '12px 12px' }} />

          <div className="container-custom relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                {t('about.pillars.title')}
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                {t('about.pillars.subtitle')}
              </p>
            </motion.div>

            <div className="space-y-16">
              {[
                {
                  icon: Wifi,
                  titleKey: 'about.pillar.rf.title',
                  subtitleKey: 'about.pillar.rf.subtitle',
                  descKey: 'about.pillar.rf.desc',
                  customTitleKey: 'about.pillar.rf.custom.title',
                  customDescKey: 'about.pillar.rf.custom.desc',
                  specs: [
                    { labelKey: 'about.pillar.rf.spec1.label', valueKey: 'about.pillar.rf.spec1.value' },
                    { labelKey: 'about.pillar.rf.spec2.label', valueKey: 'about.pillar.rf.spec2.value' },
                    { labelKey: 'about.pillar.rf.spec3.label', valueKey: 'about.pillar.rf.spec3.value' },
                    { labelKey: 'about.pillar.rf.spec4.label', valueKey: 'about.pillar.rf.spec4.value' },
                  ],
                  accent: 'cyan',
                },
                {
                  icon: Video,
                  titleKey: 'about.pillar.video.title',
                  subtitleKey: 'about.pillar.video.subtitle',
                  descKey: 'about.pillar.video.desc',
                  customTitleKey: 'about.pillar.video.custom.title',
                  customDescKey: 'about.pillar.video.custom.desc',
                  specs: [
                    { labelKey: 'about.pillar.video.spec1.label', valueKey: 'about.pillar.video.spec1.value' },
                    { labelKey: 'about.pillar.video.spec2.label', valueKey: 'about.pillar.video.spec2.value' },
                    { labelKey: 'about.pillar.video.spec3.label', valueKey: 'about.pillar.video.spec3.value' },
                    { labelKey: 'about.pillar.video.spec4.label', valueKey: 'about.pillar.video.spec4.value' },
                  ],
                  accent: 'blue',
                },
                {
                  icon: Terminal,
                  titleKey: 'about.pillar.software.title',
                  subtitleKey: 'about.pillar.software.subtitle',
                  descKey: 'about.pillar.software.desc',
                  customTitleKey: 'about.pillar.software.custom.title',
                  customDescKey: 'about.pillar.software.custom.desc',
                  specs: [
                    { labelKey: 'about.pillar.software.spec1.label', valueKey: 'about.pillar.software.spec1.value' },
                    { labelKey: 'about.pillar.software.spec2.label', valueKey: 'about.pillar.software.spec2.value' },
                    { labelKey: 'about.pillar.software.spec3.label', valueKey: 'about.pillar.software.spec3.value' },
                    { labelKey: 'about.pillar.software.spec4.label', valueKey: 'about.pillar.software.spec4.value' },
                  ],
                  accent: 'emerald',
                },
              ].map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
                >
                  {/* Main content - 2 columns */}
                  <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <pillar.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{t(pillar.titleKey)}</h3>
                        <span className="text-sm text-accent font-mono">{t(pillar.subtitleKey)}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-8">{t(pillar.descKey)}</p>

                    {/* Specs grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {pillar.specs.map((spec, si) => (
                        <div key={si} className="bg-white/[0.03] border border-white/5 rounded-lg p-4">
                          <div className="text-xs text-gray-500 font-mono uppercase mb-1">{t(spec.labelKey)}</div>
                          <div className="text-sm text-accent font-semibold">{t(spec.valueKey)}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customization sidebar - 1 column */}
                  <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-4">
                        <Settings className="w-5 h-5 text-accent" />
                        <h4 className="text-lg font-bold text-white">{t(pillar.customTitleKey)}</h4>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6">{t(pillar.customDescKey)}</p>
                      <LangLink to="/contact">
                        <Button variant="outline" className="w-full border-accent/30 text-accent hover:bg-accent/10 hover:text-accent">
                          {t('common.learnMore')}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </LangLink>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== Company Profile + Image ========== */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {t('about.profile.title')}
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">{t('about.profile.p1')}</p>
                <p className="text-muted-foreground mb-4 leading-relaxed">{t('about.profile.p2')}</p>
                <p className="text-muted-foreground leading-relaxed mb-6">{t('about.profile.p3')}</p>
                
                <div className="bg-accent/5 border border-accent/10 rounded-lg p-4 mb-6">
                  <h3 className="text-sm font-semibold text-foreground mb-2">{t('about.certifications.summary.title')}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('about.certifications.summary.content')}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <Award className="w-3.5 h-3.5" />
                    {t('footer.qualification')}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium">
                    20+ {t('hero.stat.years')}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                    ISO 9001
                  </span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="aspect-video rounded-xl overflow-hidden shadow-card"
              >
                <img
                  src={caniReception}
                  alt="CANI Technology company reception - 长凌科技公司前台"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========== Facility Gallery ========== */}
        <FacilityGallery t={t} />

        {/* ========== Core Competencies - Full-Stack Architecture ========== */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              {t('about.competencies.title')}
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              {t('about.competencies.subtitle')}
            </p>
            <div className="max-w-5xl mx-auto space-y-8">
              {competencyLayers.map((layer, layerIdx) => (
                <motion.div
                  key={layerIdx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: layerIdx * 0.1 }}
                  className="bg-card rounded-xl border border-border overflow-hidden shadow-card"
                >
                  <div className="flex items-center gap-3 px-6 py-4 bg-primary">
                    <layer.icon className="w-6 h-6 text-accent" />
                    <h3 className="text-lg font-bold text-primary-foreground">{layer.title}</h3>
                    <span className="ml-auto text-xs font-mono bg-accent/20 text-accent px-3 py-1 rounded-full">{layer.tag}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-bold w-[140px]">{t('about.competencies.col.dimension')}</TableHead>
                          <TableHead className="font-bold">{t('about.competencies.col.spec')}</TableHead>
                          <TableHead className="font-bold">{t('about.competencies.col.value')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {layer.rows.map((row, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-semibold text-accent whitespace-nowrap">{row.dim}</TableCell>
                            <TableCell>{row.spec}</TableCell>
                            <TableCell className="text-muted-foreground">{row.value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== One-Stop Ecosystem ========== */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              {t('about.ecosystem.title')}
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              {t('about.ecosystem.desc')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Cpu, title: t('about.ecosystem.item1.title'), desc: t('about.ecosystem.item1.desc') },
                { icon: Code, title: t('about.ecosystem.item2.title'), desc: t('about.ecosystem.item2.desc') },
                { icon: Plane, title: t('about.ecosystem.item3.title'), desc: t('about.ecosystem.item3.desc') },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-8 shadow-card text-center border border-border"
                >
                  <item.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-card-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== 4. Founder Message ========== */}
        <section className="py-20 md:py-28 bg-background relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <div className="container-custom relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                {t('about.founder.title')}
              </h2>
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg border-2 border-accent/20 flex-shrink-0">
                  <img
                    src={founderImg}
                    alt={`${t('about.founder.name')} - ${t('about.founder.role')}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <blockquote className="text-lg md:text-xl text-foreground/90 italic leading-relaxed mb-6 relative">
                    <span className="absolute -top-4 -left-2 text-6xl text-accent/20 font-serif">"</span>
                    <p className="pl-6">{t('about.founder.quote')}</p>
                  </blockquote>
                  <div>
                    <p className="text-lg font-bold text-foreground">— {t('about.founder.name')}</p>
                    <p className="text-sm text-accent font-medium">{t('about.founder.role')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========== OEM/ODM Partnership ========== */}
        <section className="py-20 md:py-28 bg-accent/5 relative">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {t('about.oem.title')}
              </h2>
              <p className="text-lg text-accent font-medium">{t('about.oem.subtitle')}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {oemFeatures.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-foreground mb-1">{f.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-14">
              <LangLink to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg font-semibold rounded-full">
                  {t('about.oem.cta')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </LangLink>
            </div>
          </div>
        </section>

        {/* ========== Timeline ========== */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('about.milestones.title')}
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                  >
                    <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                      <div className="bg-card rounded-xl p-6 shadow-card inline-block">
                        <div className="text-2xl font-bold text-accent mb-2">{milestone.year}</div>
                        <h3 className="text-lg font-semibold text-card-foreground mb-1">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========== Core Team ========== */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('about.coreTeam.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { nameKey: 'about.team.rd.name', roleKey: 'about.team.rd.role', descKey: 'about.team.rd.desc', icon: Cpu },
                { nameKey: 'about.team.prod.name', roleKey: 'about.team.prod.role', descKey: 'about.team.prod.desc', icon: BarChart3 },
                { nameKey: 'about.team.market.name', roleKey: 'about.team.market.role', descKey: 'about.team.market.desc', icon: Globe2 },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-8 shadow-card text-center"
                >
                  <member.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-card-foreground">{t(member.nameKey)}</h3>
                  <p className="text-accent text-sm mb-3">{t(member.roleKey)}</p>
                  <p className="text-muted-foreground text-sm">{t(member.descKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== Certifications ========== */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('about.certifications.title')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { key: 'about.cert.hightech', icon: Award },
                { key: 'about.cert.patents', icon: Cpu },
                { key: 'about.cert.iso', icon: ShieldCheck },
                { key: 'about.cert.member', icon: Users },
              ].map((cert, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-card text-center border border-border">
                  <cert.icon className="w-10 h-10 text-accent mx-auto mb-3" />
                  <p className="text-sm font-medium text-card-foreground">{t(cert.key)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== FAQ ========== */}
        <PageFAQ titleKey="about.faq.title" items={faqItems} />

        {/* ========== CTA ========== */}
        <section className="py-20 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t('about.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('about.cta.description')}
            </p>
            <LangLink to="/contact">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3">
                {t('about.cta.button')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </LangLink>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default About;
