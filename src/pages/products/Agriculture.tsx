import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Droplets, Gauge, Leaf, Shield, Zap, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Agriculture = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Droplets, title: t('agriculture.f1.title'), description: t('agriculture.f1.desc') },
    { icon: Gauge, title: t('agriculture.f2.title'), description: t('agriculture.f2.desc') },
    { icon: Leaf, title: t('agriculture.f3.title'), description: t('agriculture.f3.desc') },
    { icon: Shield, title: t('agriculture.f4.title'), description: t('agriculture.f4.desc') },
    { icon: Zap, title: t('agriculture.f5.title'), description: t('agriculture.f5.desc') },
    { icon: MapPin, title: t('agriculture.f6.title'), description: t('agriculture.f6.desc') },
  ];

  const products = [
    { name: t('agriculture.p1.name'), description: t('agriculture.p1.desc'), specs: [t('agriculture.p1.spec1'), t('agriculture.p1.spec2'), t('agriculture.p1.spec3')], image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&q=80", link: "/products/agriculture/zb-16" },
    { name: t('agriculture.p2.name'), description: t('agriculture.p2.desc'), specs: [t('agriculture.p2.spec1'), t('agriculture.p2.spec2'), t('agriculture.p2.spec3')], image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80", link: "/products/agriculture/zb-30" },
    { name: t('agriculture.p3.name'), description: t('agriculture.p3.desc'), specs: [t('agriculture.p3.spec1'), t('agriculture.p3.spec2'), t('agriculture.p3.spec3')], image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80", link: "/products/agriculture/zb-50" },
  ];

  const stats = [
    { value: "50+", title: t('agriculture.stat1.title'), description: t('agriculture.stat1.desc') },
    { value: "95%", title: t('agriculture.stat2.title'), description: t('agriculture.stat2.desc') },
    { value: "1000+", title: t('agriculture.stat3.title'), description: t('agriculture.stat3.desc') },
    { value: "100万", title: t('agriculture.stat4.title'), description: t('agriculture.stat4.desc') },
  ];

  const applications = [
    { title: t('agriculture.app1.title'), description: t('agriculture.app1.desc'), image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80" },
    { title: t('agriculture.app2.title'), description: t('agriculture.app2.desc'), image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80" },
    { title: t('agriculture.app3.title'), description: t('agriculture.app3.desc'), image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=600&q=80" },
    { title: t('agriculture.app4.title'), description: t('agriculture.app4.desc'), image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80" },
  ];

  const techSpecs = [
    { label: t('agriculture.spec1.label'), value: t('agriculture.spec1.value') },
    { label: t('agriculture.spec2.label'), value: t('agriculture.spec2.value') },
    { label: t('agriculture.spec3.label'), value: t('agriculture.spec3.value') },
    { label: t('agriculture.spec4.label'), value: t('agriculture.spec4.value') },
    { label: t('agriculture.spec5.label'), value: t('agriculture.spec5.value') },
    { label: t('agriculture.spec6.label'), value: t('agriculture.spec6.value') },
    { label: t('agriculture.spec7.label'), value: t('agriculture.spec7.value') },
    { label: t('agriculture.spec8.label'), value: t('agriculture.spec8.value') },
  ];

  const cases = [
    { title: t('agriculture.case1.title'), description: t('agriculture.case1.desc'), image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=600&q=80" },
    { title: t('agriculture.case2.title'), description: t('agriculture.case2.desc'), image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80" },
    { title: t('agriculture.case3.title'), description: t('agriculture.case3.desc'), image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80" },
  ];

  return (
    <ProductPageTemplate
      seoPath="/products/agriculture"
      heroTitle={t('agriculture.hero.title')}
      heroSubtitle={t('agriculture.hero.subtitle')}
      heroImage="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=1920&q=80"
      features={features}
      featuresTitle={t('agriculture.feat.title')}
      products={products}
      productsTitle={t('agriculture.products.title')}
      stats={stats}
      applications={applications}
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Agriculture;
