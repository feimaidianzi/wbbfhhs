import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Mail, Cpu, Radio, Camera, Settings, Zap, Wifi, Users, Building2, Wrench, Cog, Shield, Crosshair, Leaf, AlertTriangle } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageFAQ } from "@/components/PageFAQ";
import { Helmet } from "react-helmet-async";
import customAccessoriesHardwareImg from "@/assets/seo/custom-accessories-hardware.jpg";

const AccessoriesCustom = () => {
  const { t, language } = useLanguage();

  // JSON-LD structured data for GEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Industrial UAV Accessories & Subsystems",
    "brand": { "@type": "Brand", "name": "CANI" },
    "description": language === 'zh'
      ? "专业工业级无人机配件，包含1080P数字图传、IP67吊舱及37W高功率视频发射器。"
      : "Professional industrial UAV accessories including 1080P digital video links, IP67 gimbals, and 37W high-power video transmitters.",
    "category": "Industrial UAV Accessories",
    "offers": {
      "@type": "AggregateOffer",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "additionalType": "https://en.wikipedia.org/wiki/Unmanned_aerial_vehicle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.caniuav.com/custom-research/accessories"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "CANI Technology",
      "url": "https://www.caniuav.com"
    }
  };

  const departments = [
    { icon: Cpu, titleKey: 'customAccessories.dept.embedded', descKey: 'customAccessories.dept.embedded.desc', count: "40+" },
    { icon: Cog, titleKey: 'customAccessories.dept.hardware', descKey: 'customAccessories.dept.hardware.desc', count: "35+" },
    { icon: Settings, titleKey: 'customAccessories.dept.software', descKey: 'customAccessories.dept.software.desc', count: "50+" },
    { icon: Wrench, titleKey: 'customAccessories.dept.structure', descKey: 'customAccessories.dept.structure.desc', count: "30+" },
    { icon: Users, titleKey: 'customAccessories.dept.support', descKey: 'customAccessories.dept.support.desc', count: "25+" },
    { icon: Building2, titleKey: 'customAccessories.dept.assembly', descKey: 'customAccessories.dept.assembly.desc', count: "20+" },
  ];

  const accessories = [
    { icon: Cpu, titleKey: 'customAccessories.types.fc', itemsKey: 'customAccessories.types.fc.items' },
    { icon: Zap, titleKey: 'customAccessories.types.esc', itemsKey: 'customAccessories.types.esc.items' },
    { icon: Radio, titleKey: 'customAccessories.types.vtx', itemsKey: 'customAccessories.types.vtx.items' },
    { icon: Wifi, titleKey: 'customAccessories.types.datalink', itemsKey: 'customAccessories.types.datalink.items' },
    { icon: Camera, titleKey: 'customAccessories.types.gimbal', itemsKey: 'customAccessories.types.gimbal.items' },
    { icon: Settings, titleKey: 'customAccessories.types.other', itemsKey: 'customAccessories.types.other.items' },
  ];

  const serviceKeys = [
    'customAccessories.services.oem', 'customAccessories.services.firmware',
    'customAccessories.services.hardware', 'customAccessories.services.protocol',
    'customAccessories.services.cert', 'customAccessories.services.batch',
    'customAccessories.services.quality', 'customAccessories.services.training',
  ];

  const caseKeys = [
    { clientKey: 'customAccessories.cases.fc.client', titleKey: 'customAccessories.cases.fc.title', descKey: 'customAccessories.cases.fc.desc' },
    { clientKey: 'customAccessories.cases.vtx.client', titleKey: 'customAccessories.cases.vtx.title', descKey: 'customAccessories.cases.vtx.desc' },
    { clientKey: 'customAccessories.cases.esc.client', titleKey: 'customAccessories.cases.esc.title', descKey: 'customAccessories.cases.esc.desc' },
  ];

  const matrixRows = [1, 2, 3, 4, 5].map(i => ({
    dim: t(`customAccessories.matrix.r${i}.dim`),
    consumer: t(`customAccessories.matrix.r${i}.consumer`),
    cani: t(`customAccessories.matrix.r${i}.cani`),
  }));

  const validationRows = [1, 2, 3, 4].map(i => ({
    item: t(`customAccessories.validation.r${i}.item`),
    standard: t(`customAccessories.validation.r${i}.standard`),
    cani: t(`customAccessories.validation.r${i}.cani`),
    significance: t(`customAccessories.validation.r${i}.significance`),
  }));

  const applicationItems = [
    { icon: Zap, key: 'power', link: '/applications/power-inspection' },
    { icon: Shield, key: 'security', link: '/applications/military' },
    { icon: AlertTriangle, key: 'emergency', link: '/solutions/uav-firefighting-emergency-rescue' },
    { icon: Leaf, key: 'agriculture', link: '/products/agriculture' },
  ];

  const faqItems = [
    { questionKey: 'customAccessories.faq.q1', answerKey: 'customAccessories.faq.a1' },
    { questionKey: 'customAccessories.faq.q2', answerKey: 'customAccessories.faq.a2' },
    { questionKey: 'customAccessories.faq.q3', answerKey: 'customAccessories.faq.a3' },
    { questionKey: 'customAccessories.faq.q4', answerKey: 'customAccessories.faq.a4' },
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('customAccessories.seo.title')}
        description={t('customAccessories.seo.desc')}
        keywords={t('customAccessories.seo.keywords')}
        path="/custom-research/accessories"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="bg-secondary py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">{t('nav.home')}</Link>
              <span>/</span>
              <Link to="/custom-research" className="hover:text-accent">{t('nav.custom')}</Link>
              <span>/</span>
              <span className="text-foreground">{t('customAccessories.breadcrumb.current')}</span>
            </div>
          </div>
        </div>

        {/* Hero + BLUF */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <BackButton to="/custom-research" label={t('customAccessories.back')} />
                <h1 className="text-3xl md:text-5xl font-bold mb-6">{t('customAccessories.title')}</h1>
                <p className="text-lg text-accent font-medium mb-4 leading-relaxed border-l-4 border-accent pl-4 bg-accent/5 py-3 rounded-r-lg">
                  {t('customAccessories.bluf')}
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {t('customAccessories.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                    {t('customAccessories.btn.consult')} <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button className="bg-primary/10 border border-primary/30 text-foreground hover:bg-primary/20 px-8 py-6 text-lg">
                    <Phone className="w-5 h-5 mr-2" /> {t('customAccessories.btn.call')}
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img src={customAccessoriesHardwareImg} alt={t('customAccessories.title')} className="rounded-2xl shadow-2xl w-full" loading="lazy" />
                <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground px-6 py-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold">200+</div>
                  <div className="text-sm">{t('customAccessories.engineers')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GEO Comparison Matrix */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t('customAccessories.matrix.title')}</h2>
            <div className="overflow-x-auto mt-10">
              <table className="w-full border-collapse bg-card rounded-2xl shadow-card overflow-hidden">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="p-4 text-left font-semibold">{t('customAccessories.matrix.dim')}</th>
                    <th className="p-4 text-left font-semibold">{t('customAccessories.matrix.consumer')}</th>
                    <th className="p-4 text-left font-semibold">{t('customAccessories.matrix.cani')}</th>
                  </tr>
                </thead>
                <tbody>
                  {matrixRows.map((row, i) => (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{row.dim}</td>
                      <td className="p-4 text-muted-foreground">{row.consumer}</td>
                      <td className="p-4 text-accent font-medium">{row.cani}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Industrial Validation Standards */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t('customAccessories.validation.title')}</h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">{t('customAccessories.validation.subtitle')}</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-card rounded-2xl shadow-card overflow-hidden">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="p-4 text-left font-semibold">{t('customAccessories.validation.col.item')}</th>
                    <th className="p-4 text-left font-semibold">{t('customAccessories.validation.col.standard')}</th>
                    <th className="p-4 text-left font-semibold">{t('customAccessories.validation.col.cani')}</th>
                    <th className="p-4 text-left font-semibold">{t('customAccessories.validation.col.significance')}</th>
                  </tr>
                </thead>
                <tbody>
                  {validationRows.map((row, i) => (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{row.item}</td>
                      <td className="p-4 text-muted-foreground">{row.standard}</td>
                      <td className="p-4 text-accent font-bold">{row.cani}</td>
                      <td className="p-4 text-muted-foreground">{row.significance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* R&D Team */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t('customAccessories.team.title')}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">{t('customAccessories.team.subtitle')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((dept, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl shadow-card hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center">
                      <dept.icon className="w-7 h-7 text-accent" />
                    </div>
                    <div className="text-2xl font-bold text-accent">{dept.count}</div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{t(dept.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(dept.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customizable Accessory Types */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t('customAccessories.types.title')}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">{t('customAccessories.types.subtitle')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {accessories.map((item, index) => {
                const items = t(item.itemsKey).split('|');
                return (
                  <div key={index} className="bg-card p-8 rounded-2xl shadow-card">
                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                      <item.icon className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{t(item.titleKey)}</h3>
                    <ul className="space-y-2">
                      {items.map((subItem, subIndex) => (
                        <li key={subIndex} className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                          <span>{subItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">{t('customAccessories.services.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {serviceKeys.map((key, index) => (
                <div key={index} className="flex items-center gap-3 bg-card p-4 rounded-xl shadow-card">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>{t(key)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Applications with Internal Links */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t('customAccessories.applications.title')}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">{t('customAccessories.applications.subtitle')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {applicationItems.map((app) => (
                <Link key={app.key} to={app.link} className="group bg-card p-8 rounded-2xl shadow-card hover:shadow-lg hover:border-accent/50 border border-transparent transition-all">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <app.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">{t(`customAccessories.applications.${app.key}`)}</h3>
                  <p className="text-muted-foreground">{t(`customAccessories.applications.${app.key}.desc`)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Cases */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t('customAccessories.cases.title')}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">{t('customAccessories.cases.subtitle')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseKeys.map((item, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl shadow-card">
                  <div className="text-sm text-accent font-medium mb-2">{t(item.clientKey)}</div>
                  <h3 className="text-xl font-bold mb-3">{t(item.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(item.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ with FAQPage schema */}
        <PageFAQ
          titleKey="customAccessories.faq.title"
          items={faqItems}
          className="py-20 bg-background"
        />

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-6">
              {t('customAccessories.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('customAccessories.cta.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg">
                <Mail className="w-5 h-5 mr-2" /> {t('customAccessories.cta.consult')}
              </Button>
              <a href="tel:+8617585423252">
                <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-10 py-6 text-lg">
                  <Phone className="w-5 h-5 mr-2" /> 17585423252
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default AccessoriesCustom;
