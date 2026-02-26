import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Droplets, Gauge, Leaf, Shield, Zap, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import agricultureImg from "@/assets/seo/agriculture-drone-spraying.jpg";

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
    { name: t('agriculture.p1.name'), description: t('agriculture.p1.desc'), specs: [t('agriculture.p1.spec1'), t('agriculture.p1.spec2'), t('agriculture.p1.spec3')], image: agricultureImg, link: "/products/agriculture/zb-16" },
    { name: t('agriculture.p2.name'), description: t('agriculture.p2.desc'), specs: [t('agriculture.p2.spec1'), t('agriculture.p2.spec2'), t('agriculture.p2.spec3')], image: agricultureImg, link: "/products/agriculture/zb-30" },
    { name: t('agriculture.p3.name'), description: t('agriculture.p3.desc'), specs: [t('agriculture.p3.spec1'), t('agriculture.p3.spec2'), t('agriculture.p3.spec3')], image: agricultureImg, link: "/products/agriculture/zb-50" },
  ];

  const stats = [
    { value: "50L", title: t('agriculture.stat1.title'), description: t('agriculture.stat1.desc') },
    { value: "20ha/h", title: t('agriculture.stat2.title'), description: t('agriculture.stat2.desc') },
    { value: "±5cm", title: t('agriculture.stat3.title'), description: t('agriculture.stat3.desc') },
    { value: "IP67", title: t('agriculture.stat4.title'), description: t('agriculture.stat4.desc') },
  ];

  const applications = [
    { title: t('agriculture.app1.title'), description: t('agriculture.app1.desc') },
    { title: t('agriculture.app2.title'), description: t('agriculture.app2.desc') },
    { title: t('agriculture.app3.title'), description: t('agriculture.app3.desc') },
    { title: t('agriculture.app4.title'), description: t('agriculture.app4.desc') },
    { title: t('agriculture.app5.title'), description: t('agriculture.app5.desc') },
    { title: t('agriculture.app6.title'), description: t('agriculture.app6.desc') },
  ];

  const techSpecs = [
    { label: t('agriculture.spec1.label'), value: t('agriculture.spec1.value') },
    { label: t('agriculture.spec2.label'), value: t('agriculture.spec2.value') },
    { label: t('agriculture.spec3.label'), value: t('agriculture.spec3.value') },
    { label: t('agriculture.spec4.label'), value: t('agriculture.spec4.value') },
    { label: t('agriculture.spec5.label'), value: t('agriculture.spec5.value') },
    { label: t('agriculture.spec6.label'), value: t('agriculture.spec6.value') },
  ];

  return (
    <ProductPageTemplate
      seoPath="/products/agriculture"
      heroTitle={t('agriculture.hero.title')}
      heroSubtitle={t('agriculture.hero.subtitle')}
      heroImage={agricultureImg}
      features={features}
      featuresTitle={t('agriculture.feat.title')}
      products={products}
      productsTitle={t('agriculture.products.title')}
      productsSubtitle={t('agriculture.products.subtitle')}
      stats={stats}
      applications={applications}
      applicationsTitle={t('agriculture.app.title')}
      techSpecs={techSpecs}
    />
  );
};

export default Agriculture;
