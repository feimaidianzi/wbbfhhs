import ApplicationPageTemplate from "@/components/ApplicationPageTemplate";
import { Package, Truck, Clock, MapPin, Zap, Shield, Target, TrendingUp, Globe, Mountain, Building, Anchor } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// 导入配图
import heroLogistics from "@/assets/logistics/hero-logistics.jpg";
import droneHeavyLift from "@/assets/logistics/drone-heavy-lift.jpg";
import remoteDelivery from "@/assets/logistics/remote-delivery.jpg";
import islandDelivery from "@/assets/logistics/island-delivery.jpg";
import emergencyDelivery from "@/assets/logistics/emergency-delivery.jpg";
import urbanDelivery from "@/assets/logistics/urban-delivery.jpg";

const LogisticsApp = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Zap, title: t('logisticsApp.feature.efficient'), description: t('logisticsApp.feature.efficient.desc') },
    { icon: TrendingUp, title: t('logisticsApp.feature.costSaving'), description: t('logisticsApp.feature.costSaving.desc') },
    { icon: Target, title: t('logisticsApp.feature.ecofriendly'), description: t('logisticsApp.feature.ecofriendly.desc') },
    { icon: Shield, title: t('logisticsApp.feature.safe'), description: t('logisticsApp.feature.safe.desc') },
  ];

  const advantages = [
    { icon: Package, title: t('logisticsApp.advantage.payload'), description: t('logisticsApp.advantage.payload.desc'), value: "30KG" },
    { icon: Clock, title: t('logisticsApp.advantage.fast'), description: t('logisticsApp.advantage.fast.desc'), value: t('logisticsApp.advantage.fast.value') },
    { icon: MapPin, title: t('logisticsApp.advantage.precise'), description: t('logisticsApp.advantage.precise.desc'), value: t('logisticsApp.advantage.precise.value') },
    { icon: Globe, title: t('logisticsApp.advantage.terrain'), description: t('logisticsApp.advantage.terrain.desc'), value: t('logisticsApp.advantage.terrain.value') },
  ];

  const scenarios = [
    {
      title: t('logisticsApp.scenario.remote.title'),
      description: t('logisticsApp.scenario.remote.desc'),
      detailDescription: t('logisticsApp.scenario.remote.detail'),
      image: remoteDelivery,
      icon: Mountain,
      features: [t('logisticsApp.scenario.remote.f1'), t('logisticsApp.scenario.remote.f2'), t('logisticsApp.scenario.remote.f3')],
      highlights: [
        { label: t('logisticsApp.scenario.remote.h1.label'), value: t('logisticsApp.scenario.remote.h1.value') },
        { label: t('logisticsApp.scenario.remote.h2.label'), value: t('logisticsApp.scenario.remote.h2.value') },
        { label: t('logisticsApp.scenario.remote.h3.label'), value: t('logisticsApp.scenario.remote.h3.value') },
      ],
    },
    {
      title: t('logisticsApp.scenario.island.title'),
      description: t('logisticsApp.scenario.island.desc'),
      detailDescription: t('logisticsApp.scenario.island.detail'),
      image: islandDelivery,
      icon: Anchor,
      features: [t('logisticsApp.scenario.island.f1'), t('logisticsApp.scenario.island.f2'), t('logisticsApp.scenario.island.f3')],
      highlights: [
        { label: t('logisticsApp.scenario.island.h1.label'), value: t('logisticsApp.scenario.island.h1.value') },
        { label: t('logisticsApp.scenario.island.h2.label'), value: t('logisticsApp.scenario.island.h2.value') },
        { label: t('logisticsApp.scenario.island.h3.label'), value: t('logisticsApp.scenario.island.h3.value') },
      ],
    },
    {
      title: t('logisticsApp.scenario.emergency.title'),
      description: t('logisticsApp.scenario.emergency.desc'),
      detailDescription: t('logisticsApp.scenario.emergency.detail'),
      image: emergencyDelivery,
      icon: Shield,
      features: [t('logisticsApp.scenario.emergency.f1'), t('logisticsApp.scenario.emergency.f2'), t('logisticsApp.scenario.emergency.f3')],
      highlights: [
        { label: t('logisticsApp.scenario.emergency.h1.label'), value: t('logisticsApp.scenario.emergency.h1.value') },
        { label: t('logisticsApp.scenario.emergency.h2.label'), value: t('logisticsApp.scenario.emergency.h2.value') },
        { label: t('logisticsApp.scenario.emergency.h3.label'), value: t('logisticsApp.scenario.emergency.h3.value') },
      ],
    },
    {
      title: t('logisticsApp.scenario.urban.title'),
      description: t('logisticsApp.scenario.urban.desc'),
      detailDescription: t('logisticsApp.scenario.urban.detail'),
      image: urbanDelivery,
      icon: Building,
      features: [t('logisticsApp.scenario.urban.f1'), t('logisticsApp.scenario.urban.f2'), t('logisticsApp.scenario.urban.f3')],
      highlights: [
        { label: t('logisticsApp.scenario.urban.h1.label'), value: t('logisticsApp.scenario.urban.h1.value') },
        { label: t('logisticsApp.scenario.urban.h2.label'), value: t('logisticsApp.scenario.urban.h2.value') },
        { label: t('logisticsApp.scenario.urban.h3.label'), value: t('logisticsApp.scenario.urban.h3.value') },
      ],
    },
  ];

  const products = [
    { model: "WL-10", payload: "10KG", range: "15km", description: t('logisticsApp.product.wl10.desc'), link: "/products/logistics/wl-10" },
    { model: "WL-20", payload: "20KG", range: "25km", description: t('logisticsApp.product.wl20.desc'), link: "/products/logistics/wl-20" },
    { model: "WL-30", payload: "30KG", range: "35km", description: t('logisticsApp.product.wl30.desc'), link: "/products/logistics/wl-30" },
  ];

  return (
    <ApplicationPageTemplate
      seoTitle={t('logisticsApp.hero.title')}
      seoDescription={t('logisticsApp.hero.description')}
      seoKeywords={t('logisticsApp.seo.keywords')}
      seoPath="/applications/logistics"
      heroTitle={t('logisticsApp.hero.title')}
      heroSubtitle={t('logisticsApp.hero.subtitle')}
      heroDescription={t('logisticsApp.hero.description')}
      heroImage={heroLogistics}
      heroStats={[
        { value: "30KG", label: t('logisticsApp.hero.stat1') },
        { value: "50km", label: t('logisticsApp.hero.stat2') },
        { value: t('logisticsApp.hero.stat3.value'), label: t('logisticsApp.hero.stat3.label') },
      ]}
      introTitle={t('logisticsApp.intro.title')}
      introDescription={t('logisticsApp.intro.description')}
      introImage={droneHeavyLift}
      introPoints={[
        t('logisticsApp.intro.point1'),
        t('logisticsApp.intro.point2'),
        t('logisticsApp.intro.point3'),
        t('logisticsApp.intro.point4'),
      ]}
      advantages={advantages}
      features={features}
      scenarios={scenarios}
      products={products}
      ctaTitle={t('logisticsApp.cta.title')}
      ctaDescription={t('logisticsApp.cta.description')}
      ctaProductLink="/products/logistics"
    />
  );
};

export default LogisticsApp;
