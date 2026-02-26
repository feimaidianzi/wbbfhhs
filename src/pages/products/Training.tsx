import ProductPageTemplate from "@/components/ProductPageTemplate";
import { GraduationCap, Shield, Settings, Users, Gauge, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import trainingImg from "@/assets/seo/drone-training.jpg";
import industrialImg from "@/assets/seo/industrial-work-drone.jpg";

const Training = () => {
  const { t } = useLanguage();

  const features = [
    { icon: GraduationCap, title: t('training.f1.title'), description: t('training.f1.desc') },
    { icon: Shield, title: t('training.f2.title'), description: t('training.f2.desc') },
    { icon: Settings, title: t('training.f3.title'), description: t('training.f3.desc') },
    { icon: Users, title: t('training.f4.title'), description: t('training.f4.desc') },
    { icon: Gauge, title: t('training.f5.title'), description: t('training.f5.desc') },
    { icon: Award, title: t('training.f6.title'), description: t('training.f6.desc') },
  ];

  const products = [
    { name: t('training.p1.name'), description: t('training.p1.desc'), specs: [t('training.p1.spec1'), t('training.p1.spec2'), t('training.p1.spec3')], image: trainingImg, link: "/products/training/hawk-02" },
    { name: t('training.p2.name'), description: t('training.p2.desc'), specs: [t('training.p2.spec1'), t('training.p2.spec2'), t('training.p2.spec3')], image: industrialImg, link: "/products/training/hawk-01" },
    { name: t('training.p3.name'), description: t('training.p3.desc'), specs: [t('training.p3.spec1'), t('training.p3.spec2'), t('training.p3.spec3')], image: trainingImg, link: "/products/training/fpv-t1" },
  ];

  const stats = [
    { value: "1000+", title: t('training.stat1.title'), description: t('training.stat1.desc') },
    { value: "98%", title: t('training.stat2.title'), description: t('training.stat2.desc') },
    { value: "30+", title: t('training.stat3.title'), description: t('training.stat3.desc') },
    { value: "5+", title: t('training.stat4.title'), description: t('training.stat4.desc') },
  ];

  const applications = [
    { title: t('training.app1.title'), description: t('training.app1.desc') },
    { title: t('training.app2.title'), description: t('training.app2.desc') },
    { title: t('training.app3.title'), description: t('training.app3.desc') },
    { title: t('training.app4.title'), description: t('training.app4.desc') },
  ];

  return (
    <ProductPageTemplate
      seoPath="/products/training"
      heroTitle={t('training.hero.title')}
      heroSubtitle={t('training.hero.subtitle')}
      heroImage={trainingImg}
      features={features}
      featuresTitle={t('training.feat.title')}
      products={products}
      productsTitle={t('training.products.title')}
      productsSubtitle={t('training.products.subtitle')}
      stats={stats}
      applications={applications}
      applicationsTitle={t('training.app.title')}
    />
  );
};

export default Training;
