import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Radio, Cpu, Code, Wifi, Monitor, Layers } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import swarmUwbShowcase from "@/assets/products/swarm-uwb-showcase.jpg";
import swarmUwbHardware from "@/assets/products/swarm-uwb-hardware.jpg";
import swarmMocapShowcase from "@/assets/products/swarm-mocap-showcase.png";
import swarmGpsShowcase from "@/assets/products/swarm-gps-showcase.jpg";

const Swarm = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Radio, title: t('swarmPage.f1.title'), description: t('swarmPage.f1.desc') },
    { icon: Cpu, title: t('swarmPage.f2.title'), description: t('swarmPage.f2.desc') },
    { icon: Code, title: t('swarmPage.f3.title'), description: t('swarmPage.f3.desc') },
    { icon: Wifi, title: t('swarmPage.f4.title'), description: t('swarmPage.f4.desc') },
    { icon: Monitor, title: t('swarmPage.f5.title'), description: t('swarmPage.f5.desc') },
    { icon: Layers, title: t('swarmPage.f6.title'), description: t('swarmPage.f6.desc') },
  ];

  const products = [
    { name: t('swarmPage.p1.name'), description: t('swarmPage.p1.desc'), specs: [t('swarmPage.p1.spec1'), t('swarmPage.p1.spec2'), t('swarmPage.p1.spec3'), t('swarmPage.p1.spec4')], image: swarmUwbShowcase, link: '/products/swarm/w200' },
    { name: t('swarmPage.p2.name'), description: t('swarmPage.p2.desc'), specs: [t('swarmPage.p2.spec1'), t('swarmPage.p2.spec2'), t('swarmPage.p2.spec3'), t('swarmPage.p2.spec4')], image: swarmMocapShowcase, link: '/products/swarm/w300' },
    { name: t('swarmPage.p3.name'), description: t('swarmPage.p3.desc'), specs: [t('swarmPage.p3.spec1'), t('swarmPage.p3.spec2'), t('swarmPage.p3.spec3'), t('swarmPage.p3.spec4')], image: swarmGpsShowcase, link: '/products/swarm/w400' },
  ];

  const stats = [
    { value: "±1mm", title: t('swarmPage.stat1.title'), description: t('swarmPage.stat1.desc') },
    { value: "100 TOPS", title: t('swarmPage.stat2.title'), description: t('swarmPage.stat2.desc') },
    { value: "25min", title: t('swarmPage.stat3.title'), description: t('swarmPage.stat3.desc') },
    { value: "1km", title: t('swarmPage.stat4.title'), description: t('swarmPage.stat4.desc') },
  ];

  const applications = [
    { title: t('swarmPage.app1.title'), description: t('swarmPage.app1.desc') },
    { title: t('swarmPage.app2.title'), description: t('swarmPage.app2.desc') },
    { title: t('swarmPage.app3.title'), description: t('swarmPage.app3.desc') },
    { title: t('swarmPage.app4.title'), description: t('swarmPage.app4.desc') },
    { title: t('swarmPage.app5.title'), description: t('swarmPage.app5.desc') },
    { title: t('swarmPage.app6.title'), description: t('swarmPage.app6.desc') },
  ];

  const techSpecs = [
    { label: t('swarmPage.spec1.label'), value: t('swarmPage.spec1.value') },
    { label: t('swarmPage.spec2.label'), value: t('swarmPage.spec2.value') },
    { label: t('swarmPage.spec3.label'), value: t('swarmPage.spec3.value') },
    { label: t('swarmPage.spec4.label'), value: t('swarmPage.spec4.value') },
    { label: t('swarmPage.spec5.label'), value: t('swarmPage.spec5.value') },
    { label: t('swarmPage.spec6.label'), value: t('swarmPage.spec6.value') },
    { label: t('swarmPage.spec7.label'), value: t('swarmPage.spec7.value') },
    { label: t('swarmPage.spec8.label'), value: t('swarmPage.spec8.value') },
  ];

  const cases = [
    { title: t('swarmPage.case1.title'), description: t('swarmPage.case1.desc'), image: swarmUwbHardware },
    { title: t('swarmPage.case2.title'), description: t('swarmPage.case2.desc'), image: swarmGpsShowcase },
    { title: t('swarmPage.case3.title'), description: t('swarmPage.case3.desc'), image: swarmMocapShowcase },
  ];

  return (
    <ProductPageTemplate
      seoPath="/products/swarm"
      heroTitle={t('swarmPage.hero.title')}
      heroSubtitle={t('swarmPage.hero.subtitle')}
      heroImage={swarmUwbShowcase}
      features={features}
      featuresTitle={t('swarmPage.feat.title')}
      products={products}
      productsTitle={t('swarmPage.products.title')}
      productsSubtitle={t('swarmPage.products.subtitle')}
      stats={stats}
      applications={applications}
      applicationsTitle={t('swarmPage.app.title')}
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Swarm;
