import ProductPageTemplate from "@/components/ProductPageTemplate";
import { GraduationCap, Shield, Settings, Users, Gauge, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
    { name: t('training.p1.name'), description: t('training.p1.desc'), specs: [t('training.p1.spec1'), t('training.p1.spec2'), t('training.p1.spec3')], image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80", link: "/products/training/hawk-02" },
    { name: t('training.p2.name'), description: t('training.p2.desc'), specs: [t('training.p2.spec1'), t('training.p2.spec2'), t('training.p2.spec3')], image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80", link: "/products/training/hawk-01" },
    { name: t('training.p3.name'), description: t('training.p3.desc'), specs: [t('training.p3.spec1'), t('training.p3.spec2'), t('training.p3.spec3')], image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=600&q=80", link: "/products/training/fpv-t1" },
  ];

  const stats = [
    { value: "5000+", title: t('training.stat1.title'), description: t('training.stat1.desc') },
    { value: "200+", title: t('training.stat2.title'), description: t('training.stat2.desc') },
    { value: "98%", title: t('training.stat3.title'), description: t('training.stat3.desc') },
    { value: "50+", title: t('training.stat4.title'), description: t('training.stat4.desc') },
  ];

  const applications = [
    { title: t('training.app1.title'), description: t('training.app1.desc'), image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80" },
    { title: t('training.app2.title'), description: t('training.app2.desc'), image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80" },
    { title: t('training.app3.title'), description: t('training.app3.desc'), image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80" },
    { title: t('training.app4.title'), description: t('training.app4.desc'), image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80" },
  ];

  const techSpecs = [
    { label: t('training.spec1.label'), value: t('training.spec1.value') },
    { label: t('training.spec2.label'), value: t('training.spec2.value') },
    { label: t('training.spec3.label'), value: t('training.spec3.value') },
    { label: t('training.spec4.label'), value: t('training.spec4.value') },
    { label: t('training.spec5.label'), value: t('training.spec5.value') },
    { label: t('training.spec6.label'), value: t('training.spec6.value') },
    { label: t('training.spec7.label'), value: t('training.spec7.value') },
    { label: t('training.spec8.label'), value: t('training.spec8.value') },
  ];

  const cases = [
    { title: t('training.case1.title'), description: t('training.case1.desc'), image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80" },
    { title: t('training.case2.title'), description: t('training.case2.desc'), image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80" },
    { title: t('training.case3.title'), description: t('training.case3.desc'), image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80" },
  ];

  return (
    <ProductPageTemplate
      seoPath="/products/training"
      heroTitle={t('trainingDrone.hero.title')}
      heroSubtitle={t('trainingDrone.hero.subtitle')}
      heroImage="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80"
      features={features}
      products={products}
      stats={stats}
      applications={applications}
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Training;
