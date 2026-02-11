import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Radio, Cpu, Camera, Gamepad2, Tv, Package } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// 导入产品图片
import vtxHighPower from "@/assets/vtx/vtx-high-power.jpg";
import k40tGimbal from "@/assets/gimbal/k40t-gimbal.png";
import wifilink2 from "@/assets/fpv/wifilink2.jpg";
import sj4000Image from "@/assets/camera/sj4000-wifi.png";

const Accessories = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Radio, title: t('accessories.f1.title'), description: t('accessories.f1.desc') },
    { icon: Cpu, title: t('accessories.f2.title'), description: t('accessories.f2.desc') },
    { icon: Camera, title: t('accessories.f3.title'), description: t('accessories.f3.desc') },
    { icon: Gamepad2, title: t('accessories.f4.title'), description: t('accessories.f4.desc') },
    { icon: Tv, title: t('accessories.f5.title'), description: t('accessories.f5.desc') },
    { icon: Package, title: t('accessories.f6.title'), description: t('accessories.f6.desc') },
  ];

  const products = [
    { name: t('accessories.p1.name'), description: t('accessories.p1.desc'), specs: [t('accessories.p1.spec1'), t('accessories.p1.spec2'), t('accessories.p1.spec3')], image: vtxHighPower, link: "/products/accessories/vtx-vrx" },
    { name: t('accessories.p2.name'), description: t('accessories.p2.desc'), specs: [t('accessories.p2.spec1'), t('accessories.p2.spec2'), t('accessories.p2.spec3')], image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/b67564581a.jpg", link: "/products/accessories/fc-esc" },
    { name: t('accessories.p3.name'), description: t('accessories.p3.desc'), specs: [t('accessories.p3.spec1'), t('accessories.p3.spec2'), t('accessories.p3.spec3')], image: k40tGimbal, link: "/products/accessories/gimbal" },
    { name: t('accessories.p4.name'), description: t('accessories.p4.desc'), specs: [t('accessories.p4.spec1'), t('accessories.p4.spec2'), t('accessories.p4.spec3')], image: "https://inew.foxeer.com//upload/s/goods/2023-12-12/11-16-45-6577d09dee618.images.400x400.jpg", link: "/products/accessories/elrs" },
    { name: t('accessories.p5.name'), description: t('accessories.p5.desc'), specs: [t('accessories.p5.spec1'), t('accessories.p5.spec2'), t('accessories.p5.spec3')], image: wifilink2, link: "/products/accessories/digital-fpv" },
    { name: t('accessories.p6.name'), description: t('accessories.p6.desc'), specs: [t('accessories.p6.spec1'), t('accessories.p6.spec2'), t('accessories.p6.spec3')], image: sj4000Image, link: "/products/accessories/camera" },
  ];

  const stats = [
    { value: t('accessories.stat1.value'), title: t('accessories.stat1.title'), description: t('accessories.stat1.desc') },
    { value: t('accessories.stat2.value'), title: t('accessories.stat2.title'), description: t('accessories.stat2.desc') },
    { value: t('accessories.stat3.value'), title: t('accessories.stat3.title'), description: t('accessories.stat3.desc') },
    { value: t('accessories.stat4.value'), title: t('accessories.stat4.title'), description: t('accessories.stat4.desc') },
  ];

  const applications = [
    { title: t('accessories.app1.title'), description: t('accessories.app1.desc'), image: vtxHighPower },
    { title: t('accessories.app2.title'), description: t('accessories.app2.desc'), image: k40tGimbal },
    { title: t('accessories.app3.title'), description: t('accessories.app3.desc'), image: wifilink2 },
    { title: t('accessories.app4.title'), description: t('accessories.app4.desc'), image: sj4000Image },
  ];

  const techSpecs = [
    { label: t('accessories.techSpec1.label'), value: t('accessories.techSpec1.value') },
    { label: t('accessories.techSpec2.label'), value: t('accessories.techSpec2.value') },
    { label: t('accessories.techSpec3.label'), value: t('accessories.techSpec3.value') },
    { label: t('accessories.techSpec4.label'), value: t('accessories.techSpec4.value') },
    { label: t('accessories.techSpec5.label'), value: t('accessories.techSpec5.value') },
    { label: t('accessories.techSpec6.label'), value: t('accessories.techSpec6.value') },
    { label: t('accessories.techSpec7.label'), value: t('accessories.techSpec7.value') },
    { label: t('accessories.techSpec8.label'), value: t('accessories.techSpec8.value') },
  ];

  const cases = [
    { title: t('accessories.case1.title'), description: t('accessories.case1.desc'), image: k40tGimbal },
    { title: t('accessories.case2.title'), description: t('accessories.case2.desc'), image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/b67564581a.jpg" },
    { title: t('accessories.case3.title'), description: t('accessories.case3.desc'), image: wifilink2 },
  ];

  return (
    <ProductPageTemplate
      seoPath="/products/accessories"
      seoTitle={t('accessories.seo.title')}
      seoDescription={t('accessories.seo.description')}
      heroTitle={t('accessories.hero.title')}
      heroSubtitle={t('accessories.hero.subtitle')}
      heroImage={vtxHighPower}
      features={features}
      featuresTitle={t('accessories.features.title')}
      products={products}
      productsTitle={t('accessories.products.title')}
      stats={stats}
      applications={applications}
      applicationsTitle={t('accessories.applications.title')}
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Accessories;
