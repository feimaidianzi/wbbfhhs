import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Plane, Wind, Target, Settings, Navigation, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import workDroneImg from "@/assets/seo/industrial-work-drone.jpg";
import maritimeImg from "@/assets/seo/maritime-drone.jpg";

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
    { name: t('workDrone.p1.name'), description: t('workDrone.p1.desc'), specs: [t('workDrone.p1.spec1'), t('workDrone.p1.spec2'), t('workDrone.p1.spec3')], image: maritimeImg, link: "/products/work-drone/tutu-32e" },
    { name: t('workDrone.p2.name'), description: t('workDrone.p2.desc'), specs: [t('workDrone.p2.spec1'), t('workDrone.p2.spec2'), t('workDrone.p2.spec3')], image: workDroneImg, link: "/products/work-drone/yp-t5" },
    { name: t('workDrone.p3.name'), description: t('workDrone.p3.desc'), specs: [t('workDrone.p3.spec1'), t('workDrone.p3.spec2'), t('workDrone.p3.spec3')], image: workDroneImg, link: "/products/work-drone/cl-vt800" },
  ];

  const stats = [
    { value: "150kg", title: t('workDrone.stat1.title'), description: t('workDrone.stat1.desc') },
    { value: "60min", title: t('workDrone.stat2.title'), description: t('workDrone.stat2.desc') },
    { value: "IP55", title: t('workDrone.stat3.title'), description: t('workDrone.stat3.desc') },
    { value: "Level 7", title: t('workDrone.stat4.title'), description: t('workDrone.stat4.desc') },
  ];

  const applications = [
    { title: t('workDrone.app1.title'), description: t('workDrone.app1.desc') },
    { title: t('workDrone.app2.title'), description: t('workDrone.app2.desc') },
    { title: t('workDrone.app3.title'), description: t('workDrone.app3.desc') },
    { title: t('workDrone.app4.title'), description: t('workDrone.app4.desc') },
    { title: t('workDrone.app5.title'), description: t('workDrone.app5.desc') },
    { title: t('workDrone.app6.title'), description: t('workDrone.app6.desc') },
  ];

  const techSpecs = [
    { label: t('workDrone.spec1.label'), value: t('workDrone.spec1.value') },
    { label: t('workDrone.spec2.label'), value: t('workDrone.spec2.value') },
    { label: t('workDrone.spec3.label'), value: t('workDrone.spec3.value') },
    { label: t('workDrone.spec4.label'), value: t('workDrone.spec4.value') },
    { label: t('workDrone.spec5.label'), value: t('workDrone.spec5.value') },
    { label: t('workDrone.spec6.label'), value: t('workDrone.spec6.value') },
  ];

  return (
    <ProductPageTemplate
      seoPath="/products/work-drone"
      heroTitle={t('workDrone.hero.title')}
      heroSubtitle={t('workDrone.hero.subtitle')}
      heroImage={workDroneImg}
      features={features}
      featuresTitle={t('workDrone.feat.title')}
      products={products}
      productsTitle={t('workDrone.products.title')}
      productsSubtitle={t('workDrone.products.subtitle')}
      stats={stats}
      applications={applications}
      applicationsTitle={t('workDrone.app.title')}
      techSpecs={techSpecs}
    />
  );
};

export default WorkDrone;
