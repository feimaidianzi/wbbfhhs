import ApplicationPageTemplate from "@/components/ApplicationPageTemplate";
import { Shield, Eye, Zap, Radio, Target, UserSearch, Siren, Camera } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Police = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Shield, title: t('police.feature.patrol.title'), description: t('police.feature.patrol.desc') },
    { icon: Eye, title: t('police.feature.event.title'), description: t('police.feature.event.desc') },
    { icon: Zap, title: t('police.feature.case.title'), description: t('police.feature.case.desc') },
    { icon: Radio, title: t('police.feature.emergency.title'), description: t('police.feature.emergency.desc') },
  ];

  const advantages = [
    { icon: Zap, title: t('police.advantage.response.title'), description: t('police.advantage.response.desc'), value: t('police.advantage.response.value') },
    { icon: Eye, title: t('police.advantage.hd.title'), description: t('police.advantage.hd.desc'), value: "4K" },
    { icon: Target, title: t('police.advantage.tracking.title'), description: t('police.advantage.tracking.desc'), value: t('police.advantage.tracking.value') },
    { icon: Radio, title: t('police.advantage.command.title'), description: t('police.advantage.command.desc'), value: "10km" },
  ];

  const scenarios = [
    {
      title: t('police.feature.patrol.title'),
      description: t('police.feature.patrol.desc'),
      detailDescription: t('police.feature.patrol.desc'),
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
      icon: Shield,
      features: [t('police.feature.patrol.title'), t('police.scenario.patrol.f2'), t('police.scenario.patrol.f3')],
      highlights: [
        { label: t('police.scenario.patrol.h1.label'), value: "20km²" },
        { label: t('police.scenario.patrol.h2.label'), value: "98%" },
        { label: t('police.scenario.patrol.h3.label'), value: "<3min" },
      ],
    },
    {
      title: t('police.feature.event.title'),
      description: t('police.feature.event.desc'),
      detailDescription: t('police.feature.event.desc'),
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      icon: Eye,
      features: [t('police.scenario.event.f1'), t('police.scenario.event.f2'), t('police.scenario.event.f3')],
      highlights: [
        { label: t('police.scenario.event.h1.label'), value: t('police.scenario.event.h1.value') },
        { label: t('police.scenario.event.h2.label'), value: t('police.scenario.event.h2.value') },
        { label: t('police.scenario.event.h3.label'), value: "99%" },
      ],
    },
    {
      title: t('police.feature.case.title'),
      description: t('police.feature.case.desc'),
      detailDescription: t('police.feature.case.desc'),
      image: "https://images.unsplash.com/photo-1453873531674-2151bcd01707?w=800&q=80",
      icon: UserSearch,
      features: [t('police.scenario.case.f1'), t('police.scenario.case.f2'), t('police.scenario.case.f3')],
      highlights: [
        { label: t('police.scenario.case.h1.label'), value: "10km" },
        { label: t('police.scenario.case.h2.label'), value: "45min" },
        { label: t('police.scenario.case.h3.label'), value: t('police.scenario.case.h3.value') },
      ],
    },
    {
      title: t('police.feature.emergency.title'),
      description: t('police.feature.emergency.desc'),
      detailDescription: t('police.feature.emergency.desc'),
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      icon: Siren,
      features: [t('police.scenario.emergency.f1'), t('police.scenario.emergency.f2'), t('police.scenario.emergency.f3')],
      highlights: [
        { label: t('police.scenario.emergency.h1.label'), value: "<5min" },
        { label: t('police.scenario.emergency.h2.label'), value: "<100ms" },
        { label: t('police.scenario.emergency.h3.label'), value: "15km" },
      ],
    },
  ];

  const products = [
    { model: "X650", payload: "2kg", range: t('police.product.x650.range'), description: t('police.product.x650.desc'), link: "/products/multi-rotor/x650" },
    { model: "X850", payload: "5kg", range: t('police.product.x850.range'), description: t('police.product.x850.desc'), link: "/products/multi-rotor/x850" },
    { model: "TH-200", payload: "10kg", range: "200m", description: t('police.product.th200.desc'), link: "/products/tethered/th-200" },
  ];

  return (
    <ApplicationPageTemplate
      seoTitle={t('police.seo.title')}
      seoDescription={t('police.seo.description')}
      seoKeywords={t('police.seo.keywords')}
      seoPath="/applications/police"
      heroTitle={t('police.hero.title')}
      heroSubtitle={t('police.hero.subtitle')}
      heroDescription={t('police.hero.desc')}
      heroImage="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1920&q=80"
      heroStats={[
        { value: t('police.advantage.response.value'), label: t('police.advantage.response.title') },
        { value: "98%", label: t('police.hero.stat2.label') },
        { value: "10km", label: t('police.hero.stat3.label') },
      ]}
      introTitle={t('police.intro.title')}
      introDescription={t('police.intro.desc')}
      introImage="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80"
      introPoints={[
        t('police.intro.point1'),
        t('police.intro.point2'),
        t('police.intro.point3'),
        t('police.intro.point4'),
      ]}
      advantages={advantages}
      features={features}
      scenarios={scenarios}
      products={products}
      ctaTitle={t('police.cta.title')}
      ctaDescription={t('police.cta.desc')}
      ctaProductLink="/products/multi-rotor"
    />
  );
};

export default Police;
