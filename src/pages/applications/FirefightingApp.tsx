import ApplicationPageTemplate from "@/components/ApplicationPageTemplate";
import { Flame, Eye, Radio, Droplets, Shield, Zap, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FirefightingApp = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Eye, title: t('firefighting.feature.recon'), description: t('firefighting.feature.recon.desc') },
    { icon: Radio, title: t('firefighting.feature.comm'), description: t('firefighting.feature.comm.desc') },
    { icon: Droplets, title: t('firefighting.feature.bomb'), description: t('firefighting.feature.bomb.desc') },
    { icon: Flame, title: t('firefighting.feature.allweather'), description: t('firefighting.feature.allweather.desc') },
  ];

  const advantages = [
    { icon: Zap, title: t('firefighting.advantage.fast'), description: t('firefighting.advantage.fast.desc'), value: t('firefighting.advantage.fast.value') },
    { icon: Target, title: t('firefighting.advantage.precise'), description: t('firefighting.advantage.precise.desc'), value: t('firefighting.advantage.precise.value') },
    { icon: Shield, title: t('firefighting.advantage.safe'), description: t('firefighting.advantage.safe.desc'), value: t('firefighting.advantage.safe.value') },
    { icon: Eye, title: t('firefighting.advantage.coverage'), description: t('firefighting.advantage.coverage.desc'), value: "5km²" },
  ];

  const scenarios = [
    {
      title: t('firefighting.scenario.forest.title'),
      description: t('firefighting.scenario.forest.desc'),
      detailDescription: t('firefighting.scenario.forest.detail'),
      image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=800&q=80",
      icon: Flame,
      features: [t('firefighting.scenario.forest.f1'), t('firefighting.scenario.forest.f2'), t('firefighting.scenario.forest.f3')],
      highlights: [
        { label: t('firefighting.scenario.forest.h1.label'), value: t('firefighting.scenario.forest.h1.value') },
        { label: t('firefighting.scenario.forest.h2.label'), value: t('firefighting.scenario.forest.h2.value') },
        { label: t('firefighting.scenario.forest.h3.label'), value: t('firefighting.scenario.forest.h3.value') },
      ],
    },
    {
      title: t('firefighting.scenario.urban.title'),
      description: t('firefighting.scenario.urban.desc'),
      detailDescription: t('firefighting.scenario.urban.detail'),
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
      icon: Shield,
      features: [t('firefighting.scenario.urban.f1'), t('firefighting.scenario.urban.f2'), t('firefighting.scenario.urban.f3')],
      highlights: [
        { label: t('firefighting.scenario.urban.h1.label'), value: t('firefighting.scenario.urban.h1.value') },
        { label: t('firefighting.scenario.urban.h2.label'), value: t('firefighting.scenario.urban.h2.value') },
        { label: t('firefighting.scenario.urban.h3.label'), value: t('firefighting.scenario.urban.h3.value') },
      ],
    },
    {
      title: t('firefighting.scenario.emergency.title'),
      description: t('firefighting.scenario.emergency.desc'),
      detailDescription: t('firefighting.scenario.emergency.detail'),
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      icon: Radio,
      features: [t('firefighting.scenario.emergency.f1'), t('firefighting.scenario.emergency.f2'), t('firefighting.scenario.emergency.f3')],
      highlights: [
        { label: t('firefighting.scenario.emergency.h1.label'), value: t('firefighting.scenario.emergency.h1.value') },
        { label: t('firefighting.scenario.emergency.h2.label'), value: t('firefighting.scenario.emergency.h2.value') },
        { label: t('firefighting.scenario.emergency.h3.label'), value: t('firefighting.scenario.emergency.h3.value') },
      ],
    },
  ];

  const products = [
    { model: "X850", payload: "5kg", range: t('firefighting.product.x850.range'), description: t('firefighting.product.x850.desc'), link: "/products/multi-rotor/x850" },
    { model: "X1200", payload: "10kg", range: t('firefighting.product.x1200.range'), description: t('firefighting.product.x1200.desc'), link: "/products/multi-rotor/x1200" },
    { model: "TH-200", payload: "10kg", range: "200m", description: t('firefighting.product.th200.desc'), link: "/products/tethered/th-200" },
  ];

  return (
    <ApplicationPageTemplate
      seoTitle={t('firefighting.seo.title')}
      seoDescription={t('firefighting.seo.description')}
      seoKeywords={t('firefighting.seo.keywords')}
      heroTitle={t('firefighting.hero.title')}
      heroSubtitle={t('firefighting.hero.subtitle')}
      heroDescription={t('firefighting.hero.description')}
      heroImage="https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=1920&q=80"
      heroStats={[
        { value: t('firefighting.hero.stat1.value'), label: t('firefighting.hero.stat1.label') },
        { value: "99%", label: t('firefighting.hero.stat2.label') },
        { value: t('firefighting.hero.stat3.value'), label: t('firefighting.hero.stat3.label') },
      ]}
      introTitle={t('firefighting.intro.title')}
      introDescription={t('firefighting.intro.description')}
      introImage="https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=800&q=80"
      introPoints={[
        t('firefighting.intro.point1'),
        t('firefighting.intro.point2'),
        t('firefighting.intro.point3'),
        t('firefighting.intro.point4'),
      ]}
      advantages={advantages}
      features={features}
      scenarios={scenarios}
      products={products}
      ctaTitle={t('firefighting.cta.title')}
      ctaDescription={t('firefighting.cta.description')}
      ctaProductLink="/products/multi-rotor"
    />
  );
};

export default FirefightingApp;
