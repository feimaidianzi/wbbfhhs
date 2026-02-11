import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Camera, Settings, Shield, Cpu, Zap, Wind } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import su17Image from "@/assets/products/cani-rt17-research-drone.jpg";

const MultiRotor = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Camera, title: t('multiRotor.feature.multiPayload'), description: t('multiRotor.feature.multiPayload.desc') },
    { icon: Settings, title: t('multiRotor.feature.modular'), description: t('multiRotor.feature.modular.desc') },
    { icon: Shield, title: t('multiRotor.feature.industrial'), description: t('multiRotor.feature.industrial.desc') },
    { icon: Cpu, title: t('multiRotor.feature.smartControl'), description: t('multiRotor.feature.smartControl.desc') },
    { icon: Zap, title: t('multiRotor.feature.longEndurance'), description: t('multiRotor.feature.longEndurance.desc') },
    { icon: Wind, title: t('multiRotor.feature.windResistant'), description: t('multiRotor.feature.windResistant.desc') },
  ];

  const products = [
    { name: t('multiRotor.rt17.name'), description: t('multiRotor.rt17.desc'), specs: [t('multiRotor.rt17.spec1'), t('multiRotor.rt17.spec2'), t('multiRotor.rt17.spec3'), t('multiRotor.rt17.spec4')], image: su17Image, link: "/products/multi-rotor/rt17", hot: true },
    { name: t('multiRotor.product.x650.name'), description: t('multiRotor.product.x650.desc'), specs: [t('multiRotor.product.x650.spec1') || "轴距: 650mm", t('multiRotor.product.x650.spec2') || "最大载重: 2kg", t('multiRotor.product.x650.spec3') || "续航时间: 35分钟", t('multiRotor.product.x650.spec4') || "抗风等级: 5级"], image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80", link: "/products/multi-rotor/x650" },
    { name: t('multiRotor.product.x850.name'), description: t('multiRotor.product.x850.desc'), specs: [t('multiRotor.product.x850.spec1') || "轴距: 850mm", t('multiRotor.product.x850.spec2') || "最大载重: 5kg", t('multiRotor.product.x850.spec3') || "续航时间: 45分钟", t('multiRotor.product.x850.spec4') || "抗风等级: 6级"], image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80", link: "/products/multi-rotor/x850" },
    { name: t('multiRotor.product.x1200.name'), description: t('multiRotor.product.x1200.desc'), specs: [t('multiRotor.product.x1200.spec1') || "轴距: 1200mm", t('multiRotor.product.x1200.spec2') || "最大载重: 10kg", t('multiRotor.product.x1200.spec3') || "续航时间: 55分钟", t('multiRotor.product.x1200.spec4') || "抗风等级: 7级"], image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=600&q=80", link: "/products/multi-rotor/x1200" },
    { name: t('multiRotor.product.x1600.name'), description: t('multiRotor.product.x1600.desc'), specs: [t('multiRotor.product.x1600.spec1') || "轴距: 1600mm", t('multiRotor.product.x1600.spec2') || "最大载重: 20kg", t('multiRotor.product.x1600.spec3') || "续航时间: 40分钟", t('multiRotor.product.x1600.spec4') || "抗风等级: 6级"], image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80", link: "/products/multi-rotor/x1600" },
  ];

  const stats = [
    { value: "20kg", title: t('multiRotor.stat.maxPayload'), description: t('multiRotor.stat.maxPayload.desc') },
    { value: "55min", title: t('multiRotor.stat.maxFlightTime'), description: t('multiRotor.stat.maxFlightTime.desc') },
    { value: "7级", title: t('multiRotor.stat.windResistance'), description: t('multiRotor.stat.windResistance.desc') },
    { value: "10km", title: t('multiRotor.stat.controlRange'), description: t('multiRotor.stat.controlRange.desc') },
  ];

  const applications = [
    { title: t('multiRotor.app.powerInspection'), description: t('multiRotor.app.powerInspection.desc') },
    { title: t('multiRotor.app.oilPipeline'), description: t('multiRotor.app.oilPipeline.desc') },
    { title: t('multiRotor.app.lawEnforcement'), description: t('multiRotor.app.lawEnforcement.desc') },
    { title: t('multiRotor.app.fireRescue'), description: t('multiRotor.app.fireRescue.desc') },
    { title: t('multiRotor.app.surveying'), description: t('multiRotor.app.surveying.desc') },
    { title: t('multiRotor.app.environmental'), description: t('multiRotor.app.environmental.desc') },
    { title: t('multiRotor.app.agriculture'), description: t('multiRotor.app.agriculture.desc') },
    { title: t('multiRotor.app.emergencyComms'), description: t('multiRotor.app.emergencyComms.desc') },
  ];

  const techSpecs = [
    { label: t('multiRotor.spec.flightControl'), value: t('multiRotor.spec.flightControl.value') },
    { label: t('multiRotor.spec.positioning'), value: t('multiRotor.spec.positioning.value') },
    { label: t('multiRotor.spec.obstacleAvoidance'), value: t('multiRotor.spec.obstacleAvoidance.value') },
    { label: t('multiRotor.spec.videoTransmission'), value: t('multiRotor.spec.videoTransmission.value') },
    { label: t('multiRotor.spec.videoRange'), value: t('multiRotor.spec.videoRange.value') },
    { label: t('multiRotor.spec.operatingTemp'), value: t('multiRotor.spec.operatingTemp.value') },
    { label: t('multiRotor.spec.protection'), value: t('multiRotor.spec.protection.value') },
    { label: t('multiRotor.spec.takeoffWeight'), value: t('multiRotor.spec.takeoffWeight.value') },
  ];

  const cases = [
    { title: t('multiRotor.case.southernPowerGrid'), description: t('multiRotor.case.southernPowerGrid.desc'), image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80" },
    { title: t('multiRotor.case.shenzhenPolice'), description: t('multiRotor.case.shenzhenPolice.desc'), image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=600&q=80" },
    { title: t('multiRotor.case.naturalResources'), description: t('multiRotor.case.naturalResources.desc'), image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
  ];

  return (
    <ProductPageTemplate
      seoPath="/products/multi-rotor"
      heroTitle={t('multiRotor.page.title')}
      heroSubtitle={t('multiRotor.page.subtitle')}
      heroImage="https://images.unsplash.com/photo-1506947411487-a56738267384?w=1920&q=80"
      features={features}
      featuresTitle={t('multiRotor.page.featuresTitle')}
      products={products}
      productsTitle={t('multiRotor.page.productsTitle')}
      productsSubtitle={t('multiRotor.page.productsSubtitle')}
      stats={stats}
      applications={applications}
      applicationsTitle={t('multiRotor.page.applicationsTitle')}
      techSpecs={techSpecs}
      cases={cases}
      seoCategory="multi-rotor"
      seoCategoryDescription={t('multiRotor.page.seoCategoryDescription')}
      seoKeywords={t('multiRotor.page.seoKeywords').split(',')}
    />
  );
};

export default MultiRotor;
