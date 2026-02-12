import ApplicationPageTemplate from "@/components/ApplicationPageTemplate";
import { Leaf, Eye, BarChart, CloudRain, Droplets, Wind, Target, Thermometer } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const EnvironmentApp = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Eye, title: t('environment.feature.monitoring'), description: t('environment.feature.monitoring.desc') },
    { icon: BarChart, title: t('environment.feature.analysis'), description: t('environment.feature.analysis.desc') },
    { icon: Leaf, title: t('environment.feature.ecology'), description: t('environment.feature.ecology.desc') },
    { icon: CloudRain, title: t('environment.feature.tracing'), description: t('environment.feature.tracing.desc') },
  ];

  const advantages = [
    { icon: Target, title: t('environment.advantage.precision'), description: t('environment.advantage.precision.desc'), value: "99%" },
    { icon: Eye, title: t('environment.advantage.coverage'), description: t('environment.advantage.coverage.desc'), value: "10km²" },
    { icon: Wind, title: t('environment.advantage.sampling'), description: t('environment.advantage.sampling.desc'), value: t('environment.advantage.sampling.value') },
    { icon: Thermometer, title: t('environment.advantage.multiParam'), description: t('environment.advantage.multiParam.desc'), value: "20+" },
  ];

  const scenarios = [
    {
      title: t('environment.scenario.air.title'),
      description: t('environment.scenario.air.desc'),
      detailDescription: t('environment.scenario.air.detail'),
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      icon: Wind,
      features: [t('environment.scenario.air.f1'), t('environment.scenario.air.f2'), t('environment.scenario.air.f3')],
      highlights: [
        { label: t('environment.scenario.air.h1.label'), value: t('environment.scenario.air.h1.value') },
        { label: t('environment.scenario.air.h2.label'), value: t('environment.scenario.air.h2.value') },
        { label: t('environment.scenario.air.h3.label'), value: t('environment.scenario.air.h3.value') },
      ],
    },
    {
      title: t('environment.scenario.water.title'),
      description: t('environment.scenario.water.desc'),
      detailDescription: t('environment.scenario.water.detail'),
      image: "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?w=800&q=80",
      icon: Droplets,
      features: [t('environment.scenario.water.f1'), t('environment.scenario.water.f2'), t('environment.scenario.water.f3')],
      highlights: [
        { label: t('environment.scenario.water.h1.label'), value: t('environment.scenario.water.h1.value') },
        { label: t('environment.scenario.water.h2.label'), value: t('environment.scenario.water.h2.value') },
        { label: t('environment.scenario.water.h3.label'), value: t('environment.scenario.water.h3.value') },
      ],
    },
    {
      title: t('environment.scenario.ecology.title'),
      description: t('environment.scenario.ecology.desc'),
      detailDescription: t('environment.scenario.ecology.detail'),
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      icon: Leaf,
      features: [t('environment.scenario.ecology.f1'), t('environment.scenario.ecology.f2'), t('environment.scenario.ecology.f3')],
      highlights: [
        { label: t('environment.scenario.ecology.h1.label'), value: t('environment.scenario.ecology.h1.value') },
        { label: t('environment.scenario.ecology.h2.label'), value: t('environment.scenario.ecology.h2.value') },
        { label: t('environment.scenario.ecology.h3.label'), value: t('environment.scenario.ecology.h3.value') },
      ],
    },
  ];

  const products = [
    { model: "X850", payload: "5kg", range: t('environment.product.x850.range'), description: t('environment.product.x850.desc'), link: "/products/multi-rotor/x850" },
    { model: "X1200", payload: "10kg", range: t('environment.product.x1200.range'), description: t('environment.product.x1200.desc'), link: "/products/multi-rotor/x1200" },
  ];

  return (
    <ApplicationPageTemplate
      seoTitle={t('environment.seo.title')}
      seoDescription={t('environment.seo.description')}
      seoKeywords={t('environment.seo.keywords')}
      seoPath="/applications/environment"
      heroTitle={t('environment.hero.title')}
      heroSubtitle={t('environment.hero.subtitle')}
      heroDescription={t('environment.hero.description')}
      heroImage="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80"
      heroStats={[
        { value: "99%", label: t('environment.hero.stat1') },
        { value: "20+", label: t('environment.hero.stat2') },
        { value: "1000km²", label: t('environment.hero.stat3') },
      ]}
      introTitle={t('environment.intro.title')}
      introDescription={t('environment.intro.description')}
      introImage="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
      introPoints={[
        t('environment.intro.point1'),
        t('environment.intro.point2'),
        t('environment.intro.point3'),
        t('environment.intro.point4'),
      ]}
      advantages={advantages}
      features={features}
      scenarios={scenarios}
      products={products}
      ctaTitle={t('environment.cta.title')}
      ctaDescription={t('environment.cta.description')}
      ctaProductLink="/products/multi-rotor"
      relatedProducts={[
        { label: 'X850', path: '/products/multi-rotor/x850' },
        { label: 'X1200', path: '/products/multi-rotor/x1200' },
        { label: t('accessory.gimbal'), path: '/products/accessories/gimbal' },
      ]}
      relatedApplications={[
        { label: t('app.powerInspection'), path: '/applications/power-inspection' },
        { label: t('app.surveying'), path: '/applications/surveying' },
      ]}
    />
  );
};

export default EnvironmentApp;
