import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Eye, Droplets, Radio, Flame, Shield, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
    { name: t('firefighting.p1.name'), description: t('firefighting.p1.desc'), specs: [t('firefighting.p1.spec1'), t('firefighting.p1.spec2'), t('firefighting.p1.spec3'), t('firefighting.p1.spec4')], image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=600&q=80" },
    { name: t('firefighting.p2.name'), description: t('firefighting.p2.desc'), specs: [t('firefighting.p2.spec1'), t('firefighting.p2.spec2'), t('firefighting.p2.spec3'), t('firefighting.p2.spec4')], image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80" },
    { name: t('firefighting.p3.name'), description: t('firefighting.p3.desc'), specs: [t('firefighting.p3.spec1'), t('firefighting.p3.spec2'), t('firefighting.p3.spec3'), t('firefighting.p3.spec4')], image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80" },
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
    { title: t('firefighting.case1.title'), description: t('firefighting.case1.desc'), image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=600&q=80" },
    { title: t('firefighting.case2.title'), description: t('firefighting.case2.desc'), image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80" },
    { title: t('firefighting.case3.title'), description: t('firefighting.case3.desc'), image: "https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?w=600&q=80" },
  ];

  return (
    <ProductPageTemplate
      seoPath="/products/firefighting"
      heroTitle={t('firefighting.hero.title')}
      heroSubtitle={t('firefighting.hero.subtitle')}
      heroImage="https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=1920&q=80"
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
