import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { Target, Users, Award, ArrowRight, Cpu, BarChart3, Globe2, ShieldCheck, Layers, Radio, Settings } from "lucide-react";
import workshopAssembly from "@/assets/seo/workshop-assembly.jpg";
import { MultiLanguageSEO, createLocalizedBreadcrumbData } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { LangLink } from "@/components/LangLink";
import { PageFAQ } from "@/components/PageFAQ";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Helmet } from "react-helmet-async";

const About = () => {
  const { t, language } = useLanguage();

  const milestones = [
    { year: "2003", title: t('about.milestone.2003.title'), description: t('about.milestone.2003.desc') },
    { year: "2010", title: t('about.milestone.2010.title'), description: t('about.milestone.2010.desc') },
    { year: "2015", title: t('about.milestone.2015.title'), description: t('about.milestone.2015.desc') },
    { year: "2019", title: t('about.milestone.2019.title'), description: t('about.milestone.2019.desc') },
    { year: "2023", title: t('about.milestone.2023.title'), description: t('about.milestone.2023.desc') },
    { year: "2025", title: t('about.milestone.2025.title'), description: t('about.milestone.2025.desc') },
  ];

  const values = [
    { icon: Target, title: t('about.value.mission'), description: t('about.value.mission.desc') },
    { icon: Users, title: t('about.value.vision'), description: t('about.value.vision.desc') },
    { icon: Award, title: t('about.value.values'), description: t('about.value.values.desc') },
  ];

  const stats = [
    { value: "200+", label: t('about.stat.professionals') },
    { value: "50+", label: t('about.stat.patents') },
    { value: "1000+", label: t('about.stat.clientsServed') },
    { value: "30+", label: t('about.stat.citiesCovered') },
  ];

  const competencyRows = [
    { dim: t('about.competencies.row1.dim'), spec: t('about.competencies.row1.spec'), value: t('about.competencies.row1.value') },
    { dim: t('about.competencies.row2.dim'), spec: t('about.competencies.row2.spec'), value: t('about.competencies.row2.value') },
    { dim: t('about.competencies.row3.dim'), spec: t('about.competencies.row3.spec'), value: t('about.competencies.row3.value') },
    { dim: t('about.competencies.row4.dim'), spec: t('about.competencies.row4.spec'), value: t('about.competencies.row4.value') },
    { dim: t('about.competencies.row5.dim'), spec: t('about.competencies.row5.spec'), value: t('about.competencies.row5.value') },
  ];

  const ecosystemItems = [
    { icon: Layers, title: t('about.ecosystem.item1.title'), desc: t('about.ecosystem.item1.desc') },
    { icon: Radio, title: t('about.ecosystem.item2.title'), desc: t('about.ecosystem.item2.desc') },
    { icon: Settings, title: t('about.ecosystem.item3.title'), desc: t('about.ecosystem.item3.desc') },
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
      "foundingDate": "2003",
      "description": "Founded in 2003, CANI Technology is a High-tech Enterprise specializing in industrial UAV payload R&D and manufacturing with 200+ technology patents and ISO 9001 certification capability. Core products include 37W high-power VTX systems (50km range), EO/IR gimbal pods, COFDM digital video links, and ELRS control systems.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "望城区月亮岛街道罐子岭澳优全球总部大楼",
        "addressLocality": "Changsha",
        "addressRegion": "Hunan",
        "postalCode": "410200",
        "addressCountry": "CN"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+86-17585423252",
          "contactType": "sales and technical support",
          "email": "market@caniuav.com",
          "availableLanguage": ["Chinese", "English"]
        },
        {
          "@type": "ContactPoint",
          "contactType": "Sales & OEM/ODM",
          "email": "sales@caniuav.com"
        },
        {
          "@type": "ContactPoint",
          "contactType": "Technical Support",
          "email": "support@caniuav.com"
        }
      ],
      "sameAs": [
        "https://linkedin.com/company/caniuav",
        "https://instagram.com/868163685410",
        "https://t.me/caniuav",
        "https://m.me/caniuav"
      ],
      "knowsAbout": [
        "Industrial UAV Payload Customization",
        "37W High-Power Video Transmission Systems",
        "EO/IR Dual-Sensor Gimbal Pods",
        "Flight Controller & ESC Systems",
        "BVLOS Operations",
        "MAVLink Protocol Integration"
      ],
      "brand": {
        "@type": "Brand",
        "name": "CANI"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Industrial UAV Payload Customization Services",
        "itemListElement": [
          {
            "@type": "Service",
            "name": "Industrial UAV Payload OEM/ODM Customization",
            "description": "Full-cycle payload customization from concept to mass production, including EO/IR gimbals, 37W VTX integration, COFDM digital links, and multi-sensor fusion systems.",
            "provider": { "@type": "Organization", "name": "CANI Technology" },
            "areaServed": "Worldwide",
            "serviceType": "OEM/ODM Manufacturing"
          },
          {
            "@type": "Service",
            "name": "Custom UAV Platform Development",
            "description": "Tethered UAV systems (30-day persistent flight), heavy-lift platforms (150kg payload), and secure communication integration with AES-256 encryption.",
            "provider": { "@type": "Organization", "name": "CANI Technology" },
            "areaServed": "Worldwide",
            "serviceType": "R&D Engineering"
          }
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
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('about.title')}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                {t('about.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* BLUF - GEO Answer Nugget */}
        <section className="py-12 bg-accent/5 border-b border-accent/10">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-foreground leading-relaxed font-medium">
                {t('about.bluf')}
              </p>
            </div>
          </div>
        </section>

        {/* Company Profile */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {t('about.profile.title')}
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">{t('about.profile.p1')}</p>
                <p className="text-muted-foreground mb-4 leading-relaxed">{t('about.profile.p2')}</p>
                <p className="text-muted-foreground leading-relaxed mb-6">{t('about.profile.p3')}</p>
                
                {/* GEO Answer Nugget - Certifications & Authority */}
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
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src={workshopAssembly}
                  alt="CANI Technology drone assembly workshop - 长凌科技无人机组装车间实拍"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-primary">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-primary-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Competencies Table */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              {t('about.competencies.title')}
            </h2>
            <div className="max-w-5xl mx-auto overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold">{t('about.competencies.col.dimension')}</TableHead>
                    <TableHead className="font-bold">{t('about.competencies.col.spec')}</TableHead>
                    <TableHead className="font-bold">{t('about.competencies.col.value')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {competencyRows.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-semibold text-accent whitespace-nowrap">{row.dim}</TableCell>
                      <TableCell>{row.spec}</TableCell>
                      <TableCell className="text-muted-foreground">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* Business Ecosystem */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              {t('about.ecosystem.title')}
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              {t('about.ecosystem.desc')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ecosystemItems.map((item, index) => (
                <div key={index} className="bg-card rounded-xl p-8 shadow-card text-center border border-border">
                  <item.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-card-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('about.culture.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((item, index) => (
                <div key={index} className="bg-card rounded-xl p-8 shadow-card text-center">
                  <item.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-card-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('about.milestones.title')}
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}
                    >
                      <div className="bg-card rounded-xl p-6 shadow-card inline-block">
                        <div className="text-2xl font-bold text-accent mb-2">{milestone.year}</div>
                        <h3 className="text-lg font-semibold text-card-foreground mb-1">
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Core Team */}
        <section className="py-16 bg-background">
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
                <div key={index} className="bg-card rounded-xl p-8 shadow-card text-center">
                  <member.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-card-foreground">{t(member.nameKey)}</h3>
                  <p className="text-accent text-sm mb-3">{t(member.roleKey)}</p>
                  <p className="text-muted-foreground text-sm">{t(member.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
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

        {/* FAQ for AI/Voice Search */}
        <PageFAQ
          titleKey="about.faq.title"
          items={faqItems}
        />

        {/* CTA */}
        <section className="py-16 bg-primary">
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
