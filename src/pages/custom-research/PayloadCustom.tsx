import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Mail, Camera, Radio, Thermometer, Radar, Package, Settings, Shield, Cpu, Crosshair } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageFAQ } from "@/components/PageFAQ";

const PayloadCustom = () => {
  const { t } = useLanguage();

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Service",
    "serviceType": "Industrial UAV Payload Customization",
    "provider": {
      "@type": "Organization",
      "name": "CANI Technology (长凌科技)",
      "url": "https://www.caniuav.com/custom-research/payload",
      "logo": "https://www.caniuav.com/logo.png"
    },
    "areaServed": "Global",
    "description": "专业级无人机载荷定制服务，包括37W高功率图传系统、EO/IR双光云台及工业级OEM/ODM研发方案。",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Industrial UAV Payloads",
      "itemListElement": [
        { "@type": "Offer", "name": "37W High-Power Video Transmission System", "description": "1080P/30ms, 50km max link range" },
        { "@type": "Offer", "name": "EO/IR Dual-Sensor Gimbal Pod", "description": "≤0.1mrad stabilization, 640×512 IR thermal" },
        { "@type": "Offer", "name": "PDK Payload Development Kit", "description": "CAD models, electrical interfaces, SDK libraries" }
      ]
    }
  };

  const features = [
    { icon: Camera, titleKey: 'customPayload.types.optical', descKey: 'customPayload.types.optical.desc' },
    { icon: Radio, titleKey: 'customPayload.types.communication', descKey: 'customPayload.types.communication.desc' },
    { icon: Thermometer, titleKey: 'customPayload.types.sensor', descKey: 'customPayload.types.sensor.desc' },
    { icon: Radar, titleKey: 'customPayload.types.radar', descKey: 'customPayload.types.radar.desc' },
    { icon: Package, titleKey: 'customPayload.types.drop', descKey: 'customPayload.types.drop.desc' },
    { icon: Settings, titleKey: 'customPayload.types.interface', descKey: 'customPayload.types.interface.desc' },
  ];

  const serviceKeys = [
    'customPayload.services.gimbal',
    'customPayload.services.camera',
    'customPayload.services.sensor',
    'customPayload.services.comm',
    'customPayload.services.power',
    'customPayload.services.data',
    'customPayload.services.protocol',
    'customPayload.services.damping',
  ];

  const matrixRows = [
    { component: 'customPayload.matrix.r1.component', spec: 'customPayload.matrix.r1.spec', value: 'customPayload.matrix.r1.value' },
    { component: 'customPayload.matrix.r2.component', spec: 'customPayload.matrix.r2.spec', value: 'customPayload.matrix.r2.value' },
    { component: 'customPayload.matrix.r3.component', spec: 'customPayload.matrix.r3.spec', value: 'customPayload.matrix.r3.value' },
    { component: 'customPayload.matrix.r4.component', spec: 'customPayload.matrix.r4.spec', value: 'customPayload.matrix.r4.value' },
    { component: 'customPayload.matrix.r5.component', spec: 'customPayload.matrix.r5.spec', value: 'customPayload.matrix.r5.value' },
  ];

  const customItems = [
    { icon: Settings, titleKey: 'customPayload.custom.pdk', descKey: 'customPayload.custom.pdk.desc' },
    { icon: Cpu, titleKey: 'customPayload.custom.swap', descKey: 'customPayload.custom.swap.desc' },
    { icon: Shield, titleKey: 'customPayload.custom.emi', descKey: 'customPayload.custom.emi.desc' },
  ];

  const cases = [
    { clientKey: 'customPayload.cases.agriculture.client', titleKey: 'customPayload.cases.agriculture.title', descKey: 'customPayload.cases.agriculture.desc' },
    { clientKey: 'customPayload.cases.environment.client', titleKey: 'customPayload.cases.environment.title', descKey: 'customPayload.cases.environment.desc' },
    { clientKey: 'customPayload.cases.survey.client', titleKey: 'customPayload.cases.survey.title', descKey: 'customPayload.cases.survey.desc' },
  ];

  const faqItems = [
    { questionKey: 'customPayload.faq.q1', answerKey: 'customPayload.faq.a1' },
    { questionKey: 'customPayload.faq.q2', answerKey: 'customPayload.faq.a2' },
    { questionKey: 'customPayload.faq.q3', answerKey: 'customPayload.faq.a3' },
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('customPayload.seo.title')}
        description={t('customPayload.seo.desc')}
        keywords={t('customPayload.seo.keywords')}
        path="/custom-research/payload"
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
              <Link to="/" className="hover:text-accent">{t('customPayload.breadcrumb.home')}</Link>
              <span>/</span>
              <Link to="/custom-research" className="hover:text-accent">{t('customPayload.breadcrumb.custom')}</Link>
              <span>/</span>
              <span className="text-foreground">{t('customPayload.breadcrumb.payload')}</span>
            </div>
          </div>
        </div>

        {/* Hero + BLUF */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <BackButton to="/custom-research" label={t('customPayload.back')} />
                <h1 className="text-3xl md:text-5xl font-bold mb-6">{t('customPayload.title')}</h1>
                <div className="bg-accent/5 border-l-4 border-accent p-5 rounded-r-xl mb-6">
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {t('customPayload.bluf')}
                  </p>
                </div>
                <p className="text-muted-foreground mb-8">{t('customPayload.subtitle')}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                    {t('customPayload.btn.consult')} <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <a href="tel:+8617674048404">
                    <Button className="bg-primary/10 border border-primary/30 text-foreground hover:bg-primary/20 px-8 py-6 text-lg">
                      <Phone className="w-5 h-5 mr-2" /> {t('customPayload.btn.call')}
                    </Button>
                  </a>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1506947411487-a56738267384?w=800&q=80"
                  alt="工业级无人机载荷定制研发-EO/IR红外云台与37W高功率图传系统"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specification Matrix */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">{t('customPayload.matrix.title')}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-card rounded-2xl overflow-hidden shadow-card">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="p-4 text-left font-semibold">{t('customPayload.matrix.component')}</th>
                    <th className="p-4 text-left font-semibold">{t('customPayload.matrix.spec')}</th>
                    <th className="p-4 text-left font-semibold">{t('customPayload.matrix.value')}</th>
                  </tr>
                </thead>
                <tbody>
                  {matrixRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-muted/30'}>
                      <td className="p-4 font-semibold text-foreground">{t(row.component)}</td>
                      <td className="p-4 text-muted-foreground">{t(row.spec)}</td>
                      <td className="p-4 text-muted-foreground">{t(row.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Payload Types */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">{t('customPayload.types.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl shadow-card">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{t(feature.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(feature.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deep Custom R&D (OEM/ODM) */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t('customPayload.custom.title')}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-3xl mx-auto">{t('customPayload.custom.insight')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {customItems.map((item, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl shadow-card">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{t(item.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm">{t(item.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Scope */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">{t('customPayload.services.title')}</h2>
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

        {/* Case Studies */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t('customPayload.cases.title')}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
              {t('customPayload.cases.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cases.map((item, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl shadow-card">
                  <div className="text-sm text-accent font-medium mb-2">{t(item.clientKey)}</div>
                  <h3 className="text-xl font-bold mb-3">{t(item.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(item.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <PageFAQ titleKey="customPayload.faq.title" items={faqItems} />

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t('customPayload.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">{t('customPayload.cta.desc')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg">
                <Mail className="w-5 h-5 mr-2" /> {t('customPayload.cta.consult')}
              </Button>
              <a href="tel:+8617674048404">
                <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-10 py-6 text-lg">
                  <Phone className="w-5 h-5 mr-2" /> 17674048404
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

export default PayloadCustom;
