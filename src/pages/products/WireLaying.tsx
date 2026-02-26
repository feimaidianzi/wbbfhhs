import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Mountain, Wind, Target, Zap, Shield, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import wireLayingDroneImg from "@/assets/seo/wire-laying-drone.jpg";
import industrialDroneFlightImg from "@/assets/seo/industrial-drone-flight.jpg";
import wireLayingMountainImg from "@/assets/seo/wire-laying-mountain.jpg";
import damMonitoringImg from "@/assets/seo/dam-monitoring.jpg";

const WireLaying = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Mountain, title: t('wireLaying.f1.title'), description: t('wireLaying.f1.desc') },
    { icon: Wind, title: t('wireLaying.f2.title'), description: t('wireLaying.f2.desc') },
    { icon: Target, title: t('wireLaying.f3.title'), description: t('wireLaying.f3.desc') },
    { icon: Zap, title: t('wireLaying.f4.title'), description: t('wireLaying.f4.desc') },
    { icon: Shield, title: t('wireLaying.f5.title'), description: t('wireLaying.f5.desc') },
    { icon: Clock, title: t('wireLaying.f6.title'), description: t('wireLaying.f6.desc') },
  ];

  const products = [
    {
      name: t('wireLaying.p1.name'),
      description: t('wireLaying.p1.desc'),
      specs: [t('wireLaying.p1.spec1'), t('wireLaying.p1.spec2'), t('wireLaying.p1.spec3'), t('wireLaying.p1.spec4')],
      image: wireLayingDroneImg,
    },
    {
      name: t('wireLaying.p2.name'),
      description: t('wireLaying.p2.desc'),
      specs: [t('wireLaying.p2.spec1'), t('wireLaying.p2.spec2'), t('wireLaying.p2.spec3'), t('wireLaying.p2.spec4')],
      image: industrialDroneFlightImg,
    },
    {
      name: t('wireLaying.p3.name'),
      description: t('wireLaying.p3.desc'),
      specs: [t('wireLaying.p3.spec1'), t('wireLaying.p3.spec2'), t('wireLaying.p3.spec3'), t('wireLaying.p3.spec4')],
      image: wireLayingMountainImg,
    },
  ];

  const stats = [
    { value: t('wireLaying.stat1.value'), title: t('wireLaying.stat1.title'), description: t('wireLaying.stat1.desc') },
    { value: "60%", title: t('wireLaying.stat2.title'), description: t('wireLaying.stat2.desc') },
    { value: "100%", title: t('wireLaying.stat3.title'), description: t('wireLaying.stat3.desc') },
    { value: "99%", title: t('wireLaying.stat4.title'), description: t('wireLaying.stat4.desc') },
  ];

  const applications = [
    { title: t('wireLaying.app1.title'), description: t('wireLaying.app1.desc') },
    { title: t('wireLaying.app2.title'), description: t('wireLaying.app2.desc') },
    { title: t('wireLaying.app3.title'), description: t('wireLaying.app3.desc') },
    { title: t('wireLaying.app4.title'), description: t('wireLaying.app4.desc') },
    { title: t('wireLaying.app5.title'), description: t('wireLaying.app5.desc') },
    { title: t('wireLaying.app6.title'), description: t('wireLaying.app6.desc') },
  ];

  const techSpecs = [
    { label: t('wireLaying.spec1.label'), value: t('wireLaying.spec1.value') },
    { label: t('wireLaying.spec2.label'), value: t('wireLaying.spec2.value') },
    { label: t('wireLaying.spec3.label'), value: t('wireLaying.spec3.value') },
    { label: t('wireLaying.spec4.label'), value: t('wireLaying.spec4.value') },
    { label: t('wireLaying.spec5.label'), value: t('wireLaying.spec5.value') },
    { label: t('wireLaying.spec6.label'), value: t('wireLaying.spec6.value') },
    { label: t('wireLaying.spec7.label'), value: t('wireLaying.spec7.value') },
    { label: t('wireLaying.spec8.label'), value: t('wireLaying.spec8.value') },
  ];

  const cases = [
    { title: t('wireLaying.case1.title'), description: t('wireLaying.case1.desc'), image: damMonitoringImg },
    { title: t('wireLaying.case2.title'), description: t('wireLaying.case2.desc'), image: wireLayingMountainImg },
    { title: t('wireLaying.case3.title'), description: t('wireLaying.case3.desc'), image: wireLayingDroneImg },
  ];

  return (
    <ProductPageTemplate
      seoPath="/products/wire-laying"
      heroTitle={t('wireLaying.hero.title')}
      heroSubtitle={t('wireLaying.hero.subtitle')}
      heroImage={wireLayingDroneImg}
      features={features}
      featuresTitle={t('wireLaying.feat.title')}
      products={products}
      productsTitle={t('wireLaying.products.title')}
      productsSubtitle={t('wireLaying.products.subtitle')}
      stats={stats}
      applications={applications}
      applicationsTitle={t('wireLaying.app1.title') ? undefined : undefined}
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default WireLaying;
