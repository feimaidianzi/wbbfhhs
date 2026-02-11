import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Users, Brain, Network, Sparkles, Eye, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Swarm = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Users, title: t('swarmPage.f1.title'), description: t('swarmPage.f1.desc') },
    { icon: Brain, title: t('swarmPage.f2.title'), description: t('swarmPage.f2.desc') },
    { icon: Network, title: t('swarmPage.f3.title'), description: t('swarmPage.f3.desc') },
    { icon: Sparkles, title: t('swarmPage.f4.title'), description: t('swarmPage.f4.desc') },
    { icon: Eye, title: t('swarmPage.f5.title'), description: t('swarmPage.f5.desc') },
    { icon: Settings, title: t('swarmPage.f6.title'), description: t('swarmPage.f6.desc') },
  ];

  const products = [
    { name: t('swarmPage.p1.name'), description: t('swarmPage.p1.desc'), specs: [t('swarmPage.p1.spec1'), t('swarmPage.p1.spec2'), t('swarmPage.p1.spec3'), t('swarmPage.p1.spec4')], image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
    { name: t('swarmPage.p2.name'), description: t('swarmPage.p2.desc'), specs: [t('swarmPage.p2.spec1'), t('swarmPage.p2.spec2'), t('swarmPage.p2.spec3'), t('swarmPage.p2.spec4')], image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80" },
    { name: t('swarmPage.p3.name'), description: t('swarmPage.p3.desc'), specs: [t('swarmPage.p3.spec1'), t('swarmPage.p3.spec2'), t('swarmPage.p3.spec3'), t('swarmPage.p3.spec4')], image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80" },
  ];

  const stats = [
    { value: "10000+", title: t('swarmPage.stat1.title'), description: t('swarmPage.stat1.desc') },
    { value: "±2cm", title: t('swarmPage.stat2.title'), description: t('swarmPage.stat2.desc') },
    { value: "<20ms", title: t('swarmPage.stat3.title'), description: t('swarmPage.stat3.desc') },
    { value: "10倍", title: t('swarmPage.stat4.title'), description: t('swarmPage.stat4.desc') },
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
    { title: t('swarmPage.case1.title'), description: t('swarmPage.case1.desc'), image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
    { title: t('swarmPage.case2.title'), description: t('swarmPage.case2.desc'), image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80" },
    { title: t('swarmPage.case3.title'), description: t('swarmPage.case3.desc'), image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80" },
  ];

  return (
    <ProductPageTemplate
      seoPath="/products/swarm"
      heroTitle={t('swarmPage.hero.title')}
      heroSubtitle={t('swarmPage.hero.subtitle')}
      heroImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
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
