import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Plane, Wind, Target, Settings, Navigation, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WorkDrone = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Plane, title: t('workDrone.f1.title'), description: t('workDrone.f1.desc') },
    { icon: Wind, title: t('workDrone.f2.title'), description: t('workDrone.f2.desc') },
    { icon: Target, title: t('workDrone.f3.title'), description: t('workDrone.f3.desc') },
    { icon: Settings, title: t('workDrone.f4.title'), description: t('workDrone.f4.desc') },
    { icon: Navigation, title: t('workDrone.f5.title'), description: t('workDrone.f5.desc') },
    { icon: Shield, title: t('workDrone.f6.title'), description: t('workDrone.f6.desc') },
  ];

  const products = [
    { name: t('workDrone.p1.name'), description: t('workDrone.p1.desc'), specs: [t('workDrone.p1.spec1'), t('workDrone.p1.spec2'), t('workDrone.p1.spec3')], image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80", link: "/products/work-drone/tutu-32e" },
    { name: t('workDrone.p2.name'), description: t('workDrone.p2.desc'), specs: [t('workDrone.p2.spec1'), t('workDrone.p2.spec2'), t('workDrone.p2.spec3')], image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80", link: "/products/work-drone/yp-t5" },
    { name: t('workDrone.p3.name'), description: t('workDrone.p3.desc'), specs: [t('workDrone.p3.spec1'), t('workDrone.p3.spec2'), t('workDrone.p3.spec3')], image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80", link: "/products/work-drone/cl-vt800" },
    { name: t('workDrone.p4.name'), description: t('workDrone.p4.desc'), specs: [t('workDrone.p4.spec1'), t('workDrone.p4.spec2'), t('workDrone.p4.spec3')], image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80", link: "/products/work-drone/cl-fw300" },
  ];

  const stats = [
    { value: "4h+", title: t('workDrone.stat1.title'), description: t('workDrone.stat1.desc') },
    { value: "200km", title: t('workDrone.stat2.title'), description: t('workDrone.stat2.desc') },
    { value: "10kg", title: t('workDrone.stat3.title'), description: t('workDrone.stat3.desc') },
    { value: "6级", title: t('workDrone.stat4.title'), description: t('workDrone.stat4.desc') },
  ];

  const applications = [
    { title: t('workDrone.app1.title'), description: t('workDrone.app1.desc'), image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80" },
    { title: t('workDrone.app2.title'), description: t('workDrone.app2.desc'), image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80" },
    { title: t('workDrone.app3.title'), description: t('workDrone.app3.desc'), image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=600&q=80" },
    { title: t('workDrone.app4.title'), description: t('workDrone.app4.desc'), image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80" },
  ];

  const techSpecs = [
    { label: t('workDrone.spec1.label'), value: "2.5m - 4.5m" },
    { label: t('workDrone.spec2.label'), value: t('workDrone.spec2.value') },
    { label: t('workDrone.spec3.label'), value: "80-120km/h" },
    { label: t('workDrone.spec4.label'), value: "10kg" },
    { label: t('workDrone.spec5.label'), value: t('workDrone.spec5.value') },
    { label: t('workDrone.spec6.label'), value: "RTK 2cm" },
    { label: t('workDrone.spec7.label'), value: "100km" },
    { label: t('workDrone.spec8.label'), value: "IP54" },
  ];

  const cases = [
    { title: t('workDrone.case1.title'), description: t('workDrone.case1.desc'), image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80" },
    { title: t('workDrone.case2.title'), description: t('workDrone.case2.desc'), image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80" },
    { title: t('workDrone.case3.title'), description: t('workDrone.case3.desc'), image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80" },
  ];

  return (
    <ProductPageTemplate
      seoPath="/products/work-drone"
      heroTitle={t('workDrone.hero.title')}
      heroSubtitle={t('workDrone.hero.subtitle')}
      heroImage="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80"
      features={features}
      products={products}
      stats={stats}
      applications={applications}
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default WorkDrone;
