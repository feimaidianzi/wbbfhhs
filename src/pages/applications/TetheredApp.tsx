import ApplicationPageTemplate from "@/components/ApplicationPageTemplate";
import { Clock, Cable, Radio, Eye, Shield, Zap, Target, Wifi } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TetheredApp = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Clock, title: t('tetheredApp.feature.continuous'), description: t('tetheredApp.feature.continuous.desc') },
    { icon: Cable, title: t('tetheredApp.feature.stable'), description: t('tetheredApp.feature.stable.desc') },
    { icon: Radio, title: t('tetheredApp.feature.relay'), description: t('tetheredApp.feature.relay.desc') },
    { icon: Eye, title: t('tetheredApp.feature.wideArea'), description: t('tetheredApp.feature.wideArea.desc') },
  ];

  const advantages = [
    { icon: Clock, title: t('tetheredApp.advantage.endurance'), description: t('tetheredApp.advantage.endurance.desc'), value: "24h" },
    { icon: Target, title: t('tetheredApp.advantage.hover'), description: t('tetheredApp.advantage.hover.desc'), value: "±5cm" },
    { icon: Wifi, title: t('tetheredApp.advantage.coverage'), description: t('tetheredApp.advantage.coverage.desc'), value: "50km" },
    { icon: Shield, title: t('tetheredApp.advantage.wind'), description: t('tetheredApp.advantage.wind.desc'), value: t('tetheredApp.advantage.wind.value') },
  ];

  const scenarios = [
    {
      title: t('tetheredApp.scenario.comm.title'),
      description: t('tetheredApp.scenario.comm.desc'),
      detailDescription: t('tetheredApp.scenario.comm.detail'),
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
      icon: Radio,
      features: [t('tetheredApp.scenario.comm.f1'), t('tetheredApp.scenario.comm.f2'), t('tetheredApp.scenario.comm.f3')],
      highlights: [
        { label: t('tetheredApp.scenario.comm.h1.label'), value: t('tetheredApp.scenario.comm.h1.value') },
        { label: t('tetheredApp.scenario.comm.h2.label'), value: t('tetheredApp.scenario.comm.h2.value') },
        { label: t('tetheredApp.scenario.comm.h3.label'), value: t('tetheredApp.scenario.comm.h3.value') },
      ],
    },
    {
      title: t('tetheredApp.scenario.security.title'),
      description: t('tetheredApp.scenario.security.desc'),
      detailDescription: t('tetheredApp.scenario.security.detail'),
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
      icon: Eye,
      features: [t('tetheredApp.scenario.security.f1'), t('tetheredApp.scenario.security.f2'), t('tetheredApp.scenario.security.f3')],
      highlights: [
        { label: t('tetheredApp.scenario.security.h1.label'), value: t('tetheredApp.scenario.security.h1.value') },
        { label: t('tetheredApp.scenario.security.h2.label'), value: t('tetheredApp.scenario.security.h2.value') },
        { label: t('tetheredApp.scenario.security.h3.label'), value: "4K" },
      ],
    },
    {
      title: t('tetheredApp.scenario.border.title'),
      description: t('tetheredApp.scenario.border.desc'),
      detailDescription: t('tetheredApp.scenario.border.detail'),
      image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=800&q=80",
      icon: Shield,
      features: [t('tetheredApp.scenario.border.f1'), t('tetheredApp.scenario.border.f2'), t('tetheredApp.scenario.border.f3')],
      highlights: [
        { label: t('tetheredApp.scenario.border.h1.label'), value: t('tetheredApp.scenario.border.h1.value') },
        { label: t('tetheredApp.scenario.border.h2.label'), value: "98%" },
        { label: t('tetheredApp.scenario.border.h3.label'), value: t('tetheredApp.scenario.border.h3.value') },
      ],
    },
  ];

  const products = [
    { model: "TH-100", payload: "5kg", range: "100m", description: t('tetheredApp.product.th100.desc'), link: "/products/tethered/th-100" },
    { model: "TH-200", payload: "10kg", range: "200m", description: t('tetheredApp.product.th200.desc'), link: "/products/tethered/th-200" },
    { model: "TH-300", payload: "15kg", range: "300m", description: t('tetheredApp.product.th300.desc'), link: "/products/tethered/th-300" },
  ];

  return (
    <ApplicationPageTemplate
      seoTitle={t('tetheredApp.seo.title')}
      seoDescription={t('tetheredApp.seo.description')}
      seoKeywords={t('tetheredApp.seo.keywords')}
      heroTitle={t('tetheredApp.hero.title')}
      heroSubtitle={t('tetheredApp.hero.subtitle')}
      heroDescription={t('tetheredApp.hero.description')}
      heroImage="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80"
      heroStats={[
        { value: t('tetheredApp.hero.stat1.value'), label: t('tetheredApp.hero.stat1.label') },
        { value: "50km", label: t('tetheredApp.hero.stat2.label') },
        { value: "300m", label: t('tetheredApp.hero.stat3.label') },
      ]}
      introTitle={t('tetheredApp.intro.title')}
      introDescription={t('tetheredApp.intro.description')}
      introImage="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80"
      introPoints={[
        t('tetheredApp.intro.point1'),
        t('tetheredApp.intro.point2'),
        t('tetheredApp.intro.point3'),
        t('tetheredApp.intro.point4'),
      ]}
      advantages={advantages}
      features={features}
      scenarios={scenarios}
      products={products}
      ctaTitle={t('tetheredApp.cta.title')}
      ctaDescription={t('tetheredApp.cta.description')}
      ctaProductLink="/products/tethered"
    />
  );
};

export default TetheredApp;
