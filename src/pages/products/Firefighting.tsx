import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Eye, Droplets, Radio, Flame, Shield, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import firefightingImg from "@/assets/seo/firefighting-drone.jpg";
import powerImg from "@/assets/seo/power-transmission-inspection.jpg";

const Firefighting = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Eye, title: t('firefighting.f1.title'), description: t('firefighting.f1.desc') },
    { icon: Droplets, title: t('firefighting.f2.title'), description: t('firefighting.f2.desc') },
    { icon: Radio, title: t('firefighting.f3.title'), description: t('firefighting.f3.desc') },
    { icon: Flame, title: t('firefighting.f4.title'), description: t('firefighting.f4.desc') },
    { icon: Shield, title: t('firefighting.f5.title'), description: t('firefighting.f5.desc') },
    { icon: Target, title: t('firefighting.f6.title'), description: t('firefighting.f6.desc') },
  ];

  const products = [
    { name: t('firefighting.p1.name'), description: t('firefighting.p1.desc'), specs: [t('firefighting.p1.spec1'), t('firefighting.p1.spec2'), t('firefighting.p1.spec3'), t('firefighting.p1.spec4')], image: firefightingImg },
    { name: t('firefighting.p2.name'), description: t('firefighting.p2.desc'), specs: [t('firefighting.p2.spec1'), t('firefighting.p2.spec2'), t('firefighting.p2.spec3'), t('firefighting.p2.spec4')], image: firefightingImg },
    { name: t('firefighting.p3.name'), description: t('firefighting.p3.desc'), specs: [t('firefighting.p3.spec1'), t('firefighting.p3.spec2'), t('firefighting.p3.spec3'), t('firefighting.p3.spec4')], image: firefightingImg },
  ];

  const stats = [
    { value: "200m", title: t('firefighting.stat1.title'), description: t('firefighting.stat1.desc') },
    { value: "30kg", title: t('firefighting.stat2.title'), description: t('firefighting.stat2.desc') },
    { value: "<1m", title: t('firefighting.stat3.title'), description: t('firefighting.stat3.desc') },
    { value: "60min", title: t('firefighting.stat4.title'), description: t('firefighting.stat4.desc') },
  ];

  const applications = [
    { title: t('firefighting.app1.title'), description: t('firefighting.app1.desc') },
    { title: t('firefighting.app2.title'), description: t('firefighting.app2.desc') },
    { title: t('firefighting.app3.title'), description: t('firefighting.app3.desc') },
    { title: t('firefighting.app4.title'), description: t('firefighting.app4.desc') },
    { title: t('firefighting.app5.title'), description: t('firefighting.app5.desc') },
    { title: t('firefighting.app6.title'), description: t('firefighting.app6.desc') },
  ];

  const techSpecs = [
    { label: t('firefighting.spec1.label'), value: t('firefighting.spec1.value') },
    { label: t('firefighting.spec2.label'), value: t('firefighting.spec2.value') },
    { label: t('firefighting.spec3.label'), value: t('firefighting.spec3.value') },
    { label: t('firefighting.spec4.label'), value: t('firefighting.spec4.value') },
    { label: t('firefighting.spec5.label'), value: t('firefighting.spec5.value') },
    { label: t('firefighting.spec6.label'), value: t('firefighting.spec6.value') },
    { label: t('firefighting.spec7.label'), value: t('firefighting.spec7.value') },
    { label: t('firefighting.spec8.label'), value: t('firefighting.spec8.value') },
  ];

  const cases = [
    { title: t('firefighting.case1.title'), description: t('firefighting.case1.desc'), image: firefightingImg },
    { title: t('firefighting.case2.title'), description: t('firefighting.case2.desc'), image: powerImg },
    { title: t('firefighting.case3.title'), description: t('firefighting.case3.desc'), image: firefightingImg },
  ];

  return (
    <ProductPageTemplate
      seoPath="/products/firefighting"
      heroTitle={t('firefighting.hero.title')}
      heroSubtitle={t('firefighting.hero.subtitle')}
      heroImage={firefightingImg}
      features={features}
      featuresTitle={t('firefighting.feat.title')}
      products={products}
      productsTitle={t('firefighting.products.title')}
      productsSubtitle={t('firefighting.products.subtitle')}
      stats={stats}
      applications={applications}
      applicationsTitle={t('firefighting.app.title')}
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Firefighting;
