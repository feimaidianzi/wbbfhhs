import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Clock, Zap, Shield, Radio, Eye, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Tethered = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Clock, title: t('tethered.page.f1.title'), description: t('tethered.page.f1.desc') },
    { icon: Zap, title: t('tethered.page.f2.title'), description: t('tethered.page.f2.desc') },
    { icon: Shield, title: t('tethered.page.f3.title'), description: t('tethered.page.f3.desc') },
    { icon: Radio, title: t('tethered.page.f4.title'), description: t('tethered.page.f4.desc') },
    { icon: Eye, title: t('tethered.page.f5.title'), description: t('tethered.page.f5.desc') },
    { icon: Settings, title: t('tethered.page.f6.title'), description: t('tethered.page.f6.desc') },
  ];

  const products = [
    { name: t('tethered.page.p1.name'), description: t('tethered.page.p1.desc'), specs: [t('tethered.page.p1.spec1'), t('tethered.page.p1.spec2'), t('tethered.page.p1.spec3'), t('tethered.page.p1.spec4')], image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80", link: "/products/tethered/th-100" },
    { name: t('tethered.page.p2.name'), description: t('tethered.page.p2.desc'), specs: [t('tethered.page.p2.spec1'), t('tethered.page.p2.spec2'), t('tethered.page.p2.spec3'), t('tethered.page.p2.spec4')], image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80", link: "/products/tethered/th-200" },
    { name: t('tethered.page.p3.name'), description: t('tethered.page.p3.desc'), specs: [t('tethered.page.p3.spec1'), t('tethered.page.p3.spec2'), t('tethered.page.p3.spec3'), t('tethered.page.p3.spec4')], image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80", link: "/products/tethered/th-300" },
  ];

  const stats = [
    { value: "24h", title: t('tethered.page.stat1.title'), description: t('tethered.page.stat1.desc') },
    { value: "300m", title: t('tethered.page.stat2.title'), description: t('tethered.page.stat2.desc') },
    { value: "8级", title: t('tethered.page.stat3.title'), description: t('tethered.page.stat3.desc') },
    { value: "5min", title: t('tethered.page.stat4.title'), description: t('tethered.page.stat4.desc') },
  ];

  const applications = [
    { title: t('tethered.page.app1.title'), description: t('tethered.page.app1.desc') },
    { title: t('tethered.page.app2.title'), description: t('tethered.page.app2.desc') },
    { title: t('tethered.page.app3.title'), description: t('tethered.page.app3.desc') },
    { title: t('tethered.page.app4.title'), description: t('tethered.page.app4.desc') },
    { title: t('tethered.page.app5.title'), description: t('tethered.page.app5.desc') },
    { title: t('tethered.page.app6.title'), description: t('tethered.page.app6.desc') },
  ];

  const techSpecs = [
    { label: t('tethered.page.spec1.label'), value: t('tethered.page.spec1.value') },
    { label: t('tethered.page.spec2.label'), value: t('tethered.page.spec2.value') },
    { label: t('tethered.page.spec3.label'), value: "≤8kg/100m" },
    { label: t('tethered.page.spec4.label'), value: t('tethered.page.spec4.value') },
    { label: t('tethered.page.spec5.label'), value: "-20°C ~ +50°C" },
    { label: t('tethered.page.spec6.label'), value: t('tethered.page.spec6.value') },
    { label: t('tethered.page.spec7.label'), value: t('tethered.page.spec7.value') },
    { label: t('tethered.page.spec8.label'), value: t('tethered.page.spec8.value') },
  ];

  const cases = [
    { title: t('tethered.page.case1.title'), description: t('tethered.page.case1.desc'), image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80" },
    { title: t('tethered.page.case2.title'), description: t('tethered.page.case2.desc'), image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
    { title: t('tethered.page.case3.title'), description: t('tethered.page.case3.desc'), image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80" },
  ];

  return (
    <ProductPageTemplate
      seoPath="/products/tethered"
      heroTitle={t('tethered.page.hero.title')}
      heroSubtitle={t('tethered.page.hero.subtitle')}
      heroImage="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80"
      features={features}
      featuresTitle={t('tethered.page.feat.title')}
      products={products}
      productsTitle={t('tethered.page.products.title')}
      productsSubtitle={t('tethered.page.products.subtitle')}
      stats={stats}
      applications={applications}
      applicationsTitle={t('tethered.page.app.title')}
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Tethered;
