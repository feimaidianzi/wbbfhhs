import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Plane, Zap, Cloud, Wifi, Settings, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Airport = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Plane, title: t('airportPage.f1.title'), description: t('airportPage.f1.desc') },
    { icon: Zap, title: t('airportPage.f2.title'), description: t('airportPage.f2.desc') },
    { icon: Cloud, title: t('airportPage.f3.title'), description: t('airportPage.f3.desc') },
    { icon: Wifi, title: t('airportPage.f4.title'), description: t('airportPage.f4.desc') },
    { icon: Settings, title: t('airportPage.f5.title'), description: t('airportPage.f5.desc') },
    { icon: Shield, title: t('airportPage.f6.title'), description: t('airportPage.f6.desc') },
  ];

  const products = [
    { name: t('airportPage.p1.name'), description: t('airportPage.p1.desc'), specs: [t('airportPage.p1.spec1'), t('airportPage.p1.spec2'), t('airportPage.p1.spec3'), t('airportPage.p1.spec4')], image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80", link: "/products/airport/vehicle-mounted" },
    { name: t('airportPage.p2.name'), description: t('airportPage.p2.desc'), specs: [t('airportPage.p2.spec1'), t('airportPage.p2.spec2'), t('airportPage.p2.spec3'), t('airportPage.p2.spec4')], image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80", link: "/products/airport/uhs-1000" },
    { name: t('airportPage.p3.name'), description: t('airportPage.p3.desc'), specs: [t('airportPage.p3.spec1'), t('airportPage.p3.spec2'), t('airportPage.p3.spec3'), t('airportPage.p3.spec4')], image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80", link: "/products/airport/uhs-600" },
    { name: t('airportPage.p4.name'), description: t('airportPage.p4.desc'), specs: [t('airportPage.p4.spec1'), t('airportPage.p4.spec2'), t('airportPage.p4.spec3'), t('airportPage.p4.spec4')], image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80", link: "/products/airport/uhs-400p" },
  ];

  const stats = [
    { value: "24/7", title: t('airportPage.stat1.title'), description: t('airportPage.stat1.desc') },
    { value: "3分钟", title: t('airportPage.stat2.title'), description: t('airportPage.stat2.desc') },
    { value: "50kg", title: t('airportPage.stat3.title'), description: t('airportPage.stat3.desc') },
    { value: "IP65", title: t('airportPage.stat4.title'), description: t('airportPage.stat4.desc') },
  ];

  const applications = [
    { title: t('airportPage.app1.title'), description: t('airportPage.app1.desc') },
    { title: t('airportPage.app2.title'), description: t('airportPage.app2.desc') },
    { title: t('airportPage.app3.title'), description: t('airportPage.app3.desc') },
    { title: t('airportPage.app4.title'), description: t('airportPage.app4.desc') },
    { title: t('airportPage.app5.title'), description: t('airportPage.app5.desc') },
    { title: t('airportPage.app6.title'), description: t('airportPage.app6.desc') },
    { title: t('airportPage.app7.title'), description: t('airportPage.app7.desc') },
    { title: t('airportPage.app8.title'), description: t('airportPage.app8.desc') },
  ];

  const techSpecs = [
    { label: t('airportPage.spec1.label'), value: t('airportPage.spec1.value') },
    { label: t('airportPage.spec2.label'), value: t('airportPage.spec2.value') },
    { label: t('airportPage.spec3.label'), value: t('airportPage.spec3.value') },
    { label: t('airportPage.spec4.label'), value: t('airportPage.spec4.value') },
    { label: t('airportPage.spec5.label'), value: t('airportPage.spec5.value') },
    { label: t('airportPage.spec6.label'), value: t('airportPage.spec6.value') },
    { label: t('airportPage.spec7.label'), value: t('airportPage.spec7.value') },
    { label: t('airportPage.spec8.label'), value: t('airportPage.spec8.value') },
  ];

  const cases = [
    { title: t('airportPage.case1.title'), description: t('airportPage.case1.desc'), image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80" },
    { title: t('airportPage.case2.title'), description: t('airportPage.case2.desc'), image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80" },
    { title: t('airportPage.case3.title'), description: t('airportPage.case3.desc'), image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=600&q=80" },
  ];

  return (
    <ProductPageTemplate
      seoPath="/products/airport"
      heroTitle={t('airportPage.hero.title')}
      heroSubtitle={t('airportPage.hero.subtitle')}
      heroImage="https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1920&q=80"
      features={features}
      featuresTitle={t('airportPage.feat.title')}
      products={products}
      productsTitle={t('airportPage.products.title')}
      productsSubtitle={t('airportPage.products.subtitle')}
      stats={stats}
      applications={applications}
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Airport;
