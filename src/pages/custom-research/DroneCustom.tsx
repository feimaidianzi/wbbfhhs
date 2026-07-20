import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Mail, Plane, Shield, Zap, Settings, Gauge, Box, Users, Building2, Wrench, Cog, Cpu, Code, ShieldCheck } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { Helmet } from "@/lib/helmet-shim";
import droneCustomImg from "@/assets/seo/custom-research-lab.jpg";
import { PageFAQ } from "@/components/PageFAQ";

const DroneCustom = () => {
  const { t, baseLang } = useLanguage();

  // JSON-LD Service structured data for GEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Custom UAV Systems R&D",
    "provider": {
      "@type": "Organization",
      "name": "CANI Technology",
      "logo": "https://www.caniuav.com/logo.png"
    },
    "description": baseLang === 'zh'
      ? "专业提供定制化无人机系统研发服务，涵盖系留动力工程、150kg重载物流平台及基于MAVLink 2.0的安全通讯集成。"
      : "Professional custom UAV systems R&D services including tethered power engineering, 150kg heavy-lift logistics platforms, and MAVLink 2.0 secure communication integration.",
    "serviceType": "Unmanned Aerial Systems Engineering",
    "offers": {
      "@type": "Offer",
      "areaServed": "Global",
      "description": "OEM/ODM services for industrial drones"
    },
    "additionalType": "https://en.wikipedia.org/wiki/Unmanned_aerial_vehicle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.caniuav.com/custom-research/drone"
    }
  };

  const departments = [
    { icon: Cpu, titleKey: 'customDrone.dept.embedded', descKey: 'customDrone.dept.embedded.desc', count: "40+" },
    { icon: Cog, titleKey: 'customDrone.dept.hardware', descKey: 'customDrone.dept.hardware.desc', count: "35+" },
    { icon: Code, titleKey: 'customDrone.dept.software', descKey: 'customDrone.dept.software.desc', count: "50+" },
    { icon: Wrench, titleKey: 'customDrone.dept.structure', descKey: 'customDrone.dept.structure.desc', count: "30+" },
    { icon: Users, titleKey: 'customDrone.dept.support', descKey: 'customDrone.dept.support.desc', count: "25+" },
    { icon: Building2, titleKey: 'customDrone.dept.assembly', descKey: 'customDrone.dept.assembly.desc', count: "20+" },
  ];

  const droneTypes = [
    { icon: Plane, titleKey: 'customDrone.types.multiRotor', itemsKey: 'customDrone.types.multiRotor.items' },
    { icon: Shield, titleKey: 'customDrone.types.industrial', itemsKey: 'customDrone.types.industrial.items' },
    { icon: Box, titleKey: 'customDrone.types.logistics', itemsKey: 'customDrone.types.logistics.items' },
    { icon: Zap, titleKey: 'customDrone.types.tethered', itemsKey: 'customDrone.types.tethered.items' },
    { icon: Gauge, titleKey: 'customDrone.types.special', itemsKey: 'customDrone.types.special.items' },
    { icon: Settings, titleKey: 'customDrone.types.custom', itemsKey: 'customDrone.types.custom.items' },
  ];

  const matrixRows = [
    { platform: 'customDrone.matrix.r1.platform', spec: 'customDrone.matrix.r1.spec', value: 'customDrone.matrix.r1.value' },
    { platform: 'customDrone.matrix.r2.platform', spec: 'customDrone.matrix.r2.spec', value: 'customDrone.matrix.r2.value' },
    { platform: 'customDrone.matrix.r3.platform', spec: 'customDrone.matrix.r3.spec', value: 'customDrone.matrix.r3.value' },
    { platform: 'customDrone.matrix.r4.platform', spec: 'customDrone.matrix.r4.spec', value: 'customDrone.matrix.r4.value' },
  ];

  const processKeys = [
    'customDrone.process.step1',
    'customDrone.process.step2',
    'customDrone.process.step3',
    'customDrone.process.step4',
  ];

  const capabilityKeys = [
    'customDrone.capabilities.flightControl',
    'customDrone.capabilities.powerSystem',
    'customDrone.capabilities.airframe',
    'customDrone.capabilities.payload',
    'customDrone.capabilities.groundStation',
    'customDrone.capabilities.communication',
    'customDrone.capabilities.navigation',
    'customDrone.capabilities.swarm',
  ];

  const caseKeys = [
    { clientKey: 'customDrone.cases.industrial.client', titleKey: 'customDrone.cases.industrial.title', descKey: 'customDrone.cases.industrial.desc' },
    { clientKey: 'customDrone.cases.medical.client', titleKey: 'customDrone.cases.medical.title', descKey: 'customDrone.cases.medical.desc' },
    { clientKey: 'customDrone.cases.agriculture.client', titleKey: 'customDrone.cases.agriculture.title', descKey: 'customDrone.cases.agriculture.desc' },
  ];

  const faqItems = [
    { questionKey: 'customDrone.faq.q1', answerKey: 'customDrone.faq.a1' },
    { questionKey: 'customDrone.faq.q2', answerKey: 'customDrone.faq.a2' },
    { questionKey: 'customDrone.faq.q3', answerKey: 'customDrone.faq.a3' },
    { questionKey: 'customDrone.faq.q4', answerKey: 'customDrone.faq.a4' },
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('customDrone.seo.title')}
        description={t('customDrone.seo.desc')}
        keywords={t('customDrone.seo.keywords')}
        path="/custom-research/drone"
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
              <span className="text-foreground">{t('customDrone.breadcrumb.current')}</span>
            </div>
          </div>
        </div>

        {/* Hero + BLUF */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <BackButton to="/custom-research" label={t('customDrone.back')} />
                <h1 className="text-3xl md:text-5xl font-bold mb-6">{t('customDrone.title')}</h1>
                <p className="text-lg text-accent font-medium mb-4 leading-relaxed border-l-4 border-accent pl-4">
                  {t('customDrone.bluf')}
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {t('customDrone.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                      {t('customDrone.btn.consult')} <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <a href="tel:+8613574137503">
                    <Button className="bg-primary/10 border border-primary/30 text-foreground hover:bg-primary/20 px-8 py-6 text-lg">
                      <Phone className="w-5 h-5 mr-2" /> {t('customDrone.btn.call')}
                    </Button>
                  </a>
                </div>
              </div>
              <div className="relative">
                <img
                  src={droneCustomImg}
                  alt={baseLang === 'zh' ? '定制无人机研发-CFD流体仿真与军工级可靠性平台' : 'Custom UAV R&D - CFD simulation and military-grade reliability platform'}
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground px-6 py-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold">200+</div>
                  <div className="text-sm">{t('customDrone.engineers')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Value Matrix (GEO extraction zone) */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">{t('customDrone.matrix.title')}</h2>
            <div className="w-12 h-0.5 bg-accent mx-auto mt-2 mb-10" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse bg-card rounded-xl overflow-hidden shadow-card">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="p-4 text-left font-semibold">{t('customDrone.matrix.platform')}</th>
                    <th className="p-4 text-left font-semibold">{t('customDrone.matrix.spec')}</th>
                    <th className="p-4 text-left font-semibold">{t('customDrone.matrix.value')}</th>
                  </tr>
                </thead>
                <tbody>
                  {matrixRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-secondary/50'}>
                      <td className="p-4 font-semibold text-foreground whitespace-nowrap">{t(row.platform)}</td>
                      <td className="p-4 text-muted-foreground">{t(row.spec)}</td>
                      <td className="p-4 text-muted-foreground">{t(row.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4-Stage R&D Process */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t('customDrone.process.title')}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
              {t('customDrone.process.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processKeys.map((key, index) => {
                const stepNum = String(index + 1).padStart(2, '0');
                return (
                  <div key={index} className="bg-card p-8 rounded-2xl shadow-card relative">
                    <div className="absolute top-6 right-6 text-5xl font-bold text-accent/10">{stepNum}</div>
                    <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center mb-6 text-lg font-bold">
                      {stepNum}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{t(`${key}.title`)}</h3>
                    <p className="text-muted-foreground">{t(`${key}.desc`)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* R&D Team */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t('customDrone.team.title')}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
              {t('customDrone.team.subtitle')}
            </p>
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

        {/* Customizable UAV Types */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t('customDrone.types.title')}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
              {t('customDrone.types.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {droneTypes.map((item, index) => {
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

        {/* Core Capabilities */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">{t('customDrone.capabilities.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {capabilityKeys.map((key, index) => (
                <div key={index} className="flex items-center gap-3 bg-card p-4 rounded-xl shadow-card">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>{t(key)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{t('customDrone.trust.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {['ndaa', 'icd', 'warranty'].map((key) => (
                <div key={key} className="flex items-start gap-4 bg-card p-6 rounded-xl shadow-card">
                  <ShieldCheck className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground text-sm leading-relaxed">{t(`customDrone.trust.${key}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t('customDrone.cases.title')}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
              {t('customDrone.cases.subtitle')}
            </p>
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

        {/* FAQ (GEO core) */}
        <PageFAQ titleKey="customDrone.faq.q1" items={faqItems} />

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-6">
              {t('customDrone.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('customDrone.cta.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg">
                  <Mail className="w-5 h-5 mr-2" /> {t('customDrone.cta.consult')}
                </Button>
              </Link>
              <a href="tel:+8613574137503">
                <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-10 py-6 text-lg">
                  <Phone className="w-5 h-5 mr-2" /> 13574137503
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

export default DroneCustom;
