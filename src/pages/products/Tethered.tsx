import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Clock, Zap, Shield, Radio, Eye, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import tetheredDroneImg from "@/assets/seo/tethered-drone.jpg";
import th100Hero from "@/assets/products/th-100-hero.png";
import th200Hero from "@/assets/products/th-200-hero.png";
import th300Drone from "@/assets/products/th-300-drone.png";
import caseOlympicsImg from "@/assets/seo/case-olympics-security.jpg";
import caseBorderPatrolImg from "@/assets/seo/case-border-patrol.jpg";
import caseForestFireImg from "@/assets/seo/case-forest-fire.jpg";

const Tethered = () => {
  const { t, language } = useLanguage();

  const features = [
    { icon: Clock, title: t('tethered.page.f1.title'), description: t('tethered.page.f1.desc') },
    { icon: Zap, title: t('tethered.page.f2.title'), description: t('tethered.page.f2.desc') },
    { icon: Shield, title: t('tethered.page.f3.title'), description: t('tethered.page.f3.desc') },
    { icon: Radio, title: t('tethered.page.f4.title'), description: t('tethered.page.f4.desc') },
    { icon: Eye, title: t('tethered.page.f5.title'), description: t('tethered.page.f5.desc') },
    { icon: Settings, title: t('tethered.page.f6.title'), description: t('tethered.page.f6.desc') },
  ];

  const products = [
    { name: t('tethered.page.p1.name'), description: t('tethered.page.p1.desc'), specs: [t('tethered.page.p1.spec1'), t('tethered.page.p1.spec2'), t('tethered.page.p1.spec3'), t('tethered.page.p1.spec4')], image: th100Hero, link: "/products/tethered/th-100" },
    { name: t('tethered.page.p2.name'), description: t('tethered.page.p2.desc'), specs: [t('tethered.page.p2.spec1'), t('tethered.page.p2.spec2'), t('tethered.page.p2.spec3'), t('tethered.page.p2.spec4')], image: th200Hero, link: "/products/tethered/th-200" },
    { name: t('tethered.page.p3.name'), description: t('tethered.page.p3.desc'), specs: [t('tethered.page.p3.spec1'), t('tethered.page.p3.spec2'), t('tethered.page.p3.spec3'), t('tethered.page.p3.spec4')], image: th300Drone, link: "/products/tethered/th-300" },
  ];

  const stats = [
    { value: "24h", title: t('tethered.page.stat1.title'), description: t('tethered.page.stat1.desc') },
    { value: "300m", title: t('tethered.page.stat2.title'), description: t('tethered.page.stat2.desc') },
    { value: language === 'zh' ? '8级' : 'Lv.8', title: t('tethered.page.stat3.title'), description: t('tethered.page.stat3.desc') },
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
    { title: t('tethered.page.case1.title'), description: t('tethered.page.case1.desc'), image: caseOlympicsImg },
    { title: t('tethered.page.case2.title'), description: t('tethered.page.case2.desc'), image: caseBorderPatrolImg },
    { title: t('tethered.page.case3.title'), description: t('tethered.page.case3.desc'), image: caseForestFireImg },
  ];

  const seoKeywords = t('tethered.page.seo.keywords').split(',').map(k => k.trim());

  return (
    <ProductPageTemplate
      seoPath="/products/tethered"
      seoTitle={t('tethered.page.seo.title')}
      seoDescription={t('tethered.page.seo.desc')}
      seoKeywords={seoKeywords}
      heroTitle={t('tethered.page.hero.title')}
      heroSubtitle={t('tethered.page.hero.subtitle')}
      heroImage={th200Hero}
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
