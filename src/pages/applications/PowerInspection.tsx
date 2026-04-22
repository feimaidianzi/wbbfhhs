import ApplicationPageTemplate from "@/components/ApplicationPageTemplate";
import { Zap, Shield, Target, TrendingUp, AlertTriangle, Eye, Database, FileText, Map, Cpu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageFAQ } from "@/components/PageFAQ";
import { Helmet } from "@/lib/helmet-shim";

import heroPowerGrid from "@/assets/power/hero-power-grid.jpg";
import uavInspection from "@/assets/power/uav-inspection.jpg";
import caseTransmissionInspection from "@/assets/real/transmission-line-inspection-edited.jpg";
import caseSubstationInspection from "@/assets/real/substation-equipment-edited.jpg";
import caseSolarInspection from "@/assets/real/solar-panel-field-edited.jpg";
import powerInspectionScene from "@/assets/seo/power-inspection-scene.jpg";
import powerInspectionFlight from "@/assets/seo/power-inspection-flight.jpg";

const PowerInspection = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Zap, title: t('powerInspection.feature1.title'), description: t('powerInspection.feature1.desc') },
    { icon: Shield, title: t('powerInspection.feature2.title'), description: t('powerInspection.feature2.desc') },
    { icon: Target, title: t('powerInspection.feature3.title'), description: t('powerInspection.feature3.desc') },
    { icon: TrendingUp, title: t('powerInspection.feature4.title'), description: t('powerInspection.feature4.desc') },
  ];

  const advantages = [
    { icon: Zap, title: t('powerInspection.adv1.title'), description: t('powerInspection.adv1.desc'), value: t('powerInspection.adv1.value') },
    { icon: Target, title: t('powerInspection.adv2.title'), description: t('powerInspection.adv2.desc'), value: t('powerInspection.adv2.value') },
    { icon: Shield, title: t('powerInspection.adv3.title'), description: t('powerInspection.adv3.desc'), value: t('powerInspection.adv3.value') },
    { icon: TrendingUp, title: t('powerInspection.adv4.title'), description: t('powerInspection.adv4.desc'), value: t('powerInspection.adv4.value') },
  ];

  const scenarios = [
    {
      title: t('powerInspection.scenario1.title'),
      description: t('powerInspection.scenario1.desc'),
      detailDescription: t('powerInspection.scenario1.detail'),
      image: caseTransmissionInspection,
      icon: Zap,
      features: [t('powerInspection.scenario1.f1'), t('powerInspection.scenario1.f2'), t('powerInspection.scenario1.f3')],
      highlights: [
        { label: t('powerInspection.scenario1.h1.label'), value: t('powerInspection.scenario1.h1.value') },
        { label: t('powerInspection.scenario1.h2.label'), value: t('powerInspection.scenario1.h2.value') },
        { label: t('powerInspection.scenario1.h3.label'), value: t('powerInspection.scenario1.h3.value') },
      ],
    },
    {
      title: t('powerInspection.scenario2.title'),
      description: t('powerInspection.scenario2.desc'),
      detailDescription: t('powerInspection.scenario2.detail'),
      image: caseSubstationInspection,
      icon: Database,
      features: [t('powerInspection.scenario2.f1'), t('powerInspection.scenario2.f2'), t('powerInspection.scenario2.f3')],
      highlights: [
        { label: t('powerInspection.scenario2.h1.label'), value: t('powerInspection.scenario2.h1.value') },
        { label: t('powerInspection.scenario2.h2.label'), value: t('powerInspection.scenario2.h2.value') },
        { label: t('powerInspection.scenario2.h3.label'), value: t('powerInspection.scenario2.h3.value') },
      ],
    },
    {
      title: t('powerInspection.scenario3.title'),
      description: t('powerInspection.scenario3.desc'),
      detailDescription: t('powerInspection.scenario3.detail'),
      image: caseSolarInspection,
      icon: Map,
      features: [t('powerInspection.scenario3.f1'), t('powerInspection.scenario3.f2'), t('powerInspection.scenario3.f3')],
      highlights: [
        { label: t('powerInspection.scenario3.h1.label'), value: t('powerInspection.scenario3.h1.value') },
        { label: t('powerInspection.scenario3.h2.label'), value: t('powerInspection.scenario3.h2.value') },
        { label: t('powerInspection.scenario3.h3.label'), value: t('powerInspection.scenario3.h3.value') },
      ],
    },
  ];

  const products = [
    { model: "X850", payload: "5kg", range: "8km", description: t('powerInspection.product1.desc'), link: "/products/multi-rotor/x850" },
    { model: "X1200", payload: "10kg", range: "10km", description: t('powerInspection.product2.desc'), link: "/products/multi-rotor/x1200" },
    { model: "UHS-600", payload: "-", range: "-", description: t('powerInspection.product3.desc'), link: "/products" },
  ];

  const serviceJsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Service',
    name: 'UAV Powerline Inspection Solution',
    provider: { '@type': 'Organization', name: 'CaniUAV', url: 'https://www.caniuav.com' },
    description: 'Professional drone inspection solution for power grids using 640×512 radiometric thermal imaging and AI target identification to detect defects and vegetation risks.',
    areaServed: 'Global',
    serviceType: 'UAV Inspection',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Inspection Hardware',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'X850 Industrial UAV', url: 'https://www.caniuav.com/products/multi-rotor/x850' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'X1200 Industrial UAV', url: 'https://www.caniuav.com/products/multi-rotor/x1200' } },
      ],
    },
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      </Helmet>
      <ApplicationPageTemplate
        seoTitle={t('powerInspection.seo.title')}
        seoDescription={t('powerInspection.seo.description')}
        seoKeywords={t('powerInspection.seo.keywords')}
        seoPath="/applications/power-inspection"
        heroTitle={t('powerInspection.hero.title')}
        heroSubtitle={t('powerInspection.hero.subtitle')}
        heroDescription={t('powerInspection.hero.desc')}
        heroImage={heroPowerGrid}
        heroStats={[
          { value: t('powerInspection.stat.efficiency.value'), label: t('powerInspection.stat.efficiency.label') },
          { value: t('powerInspection.stat.accuracy.value'), label: t('powerInspection.stat.accuracy.label') },
          { value: t('powerInspection.stat.safety.value'), label: t('powerInspection.stat.safety.label') },
        ]}
        introTitle={t('powerInspection.intro.title')}
        introDescription={t('powerInspection.intro.desc')}
        introImage={uavInspection}
        introPoints={[
          t('powerInspection.introPoints.1'),
          t('powerInspection.introPoints.2'),
          t('powerInspection.introPoints.3'),
          t('powerInspection.introPoints.4'),
        ]}
        advantages={advantages}
        features={features}
        scenarios={scenarios}
        products={products}
        ctaTitle={t('powerInspection.cta.title')}
        ctaDescription={t('powerInspection.cta.desc')}
        ctaProductLink="/products/multi-rotor"
        caseStudy={{
          title: t('powerInspection.caseStudy.title'),
          content: t('powerInspection.caseStudy.content'),
        }}
        relatedProducts={[
          { label: t('accessory.digitalFpv'), path: '/products/accessories/digital-fpv' },
          { label: t('accessory.gimbal'), path: '/products/accessories/gimbal' },
          { label: t('accessory.fc'), path: '/products/accessories/fc-esc' },
        ]}
        relatedApplications={[
          { label: t('app.firefighting'), path: '/solutions/uav-firefighting-emergency-rescue' },
          { label: t('app.environment'), path: '/solutions/industrial-uav-environmental-monitoring' },
          { label: t('app.tethered'), path: '/products/tethered' },
        ]}
      >
        {/* GEO Anchor Text Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">{t('powerInspection.solution.title')}</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-muted-foreground leading-relaxed mb-4">{t('powerInspection.geo.anchor')}</p>
                <p className="text-muted-foreground leading-relaxed">{t('powerInspection.solution.content')}</p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-card">
                <img src={powerInspectionScene} alt="640x512-thermal-UAV-powerline-inspection-CaniUAV" className="w-full h-auto object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Case Study */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">{t('powerInspection.caseDetail.title')}</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="rounded-xl overflow-hidden shadow-card order-2 md:order-1">
                <img src={powerInspectionFlight} alt="BVLOS-UAV-power-inspection-flight-CaniUAV" className="w-full h-auto object-cover" loading="lazy" />
              </div>
              <div className="p-6 bg-card rounded-xl border border-border order-1 md:order-2">
                <p className="text-muted-foreground leading-relaxed">{t('powerInspection.caseDetail')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <PageFAQ
          titleKey="powerInspection.faq.title"
          items={[
            { questionKey: 'powerInspection.faq.q1', answerKey: 'powerInspection.faq.a1' },
            { questionKey: 'powerInspection.faq.q2', answerKey: 'powerInspection.faq.a2' },
            { questionKey: 'powerInspection.faq.q3', answerKey: 'powerInspection.faq.a3' },
          ]}
        />
      </ApplicationPageTemplate>
    </>
  );
};

export default PowerInspection;
