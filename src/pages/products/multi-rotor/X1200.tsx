import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Camera, Settings, Shield, Cpu, Zap, Wind } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import x1200Img from "@/assets/seo/multi-rotor-x1200.jpg";

const X1200 = () => {
  const { t } = useLanguage();

  const specs = [
    { label: t('specs.wheelbase'), value: "1200mm" },
    { label: t('specs.maxPayload'), value: "10kg" },
    { label: t('specs.flightTime'), value: t('multiRotor.x1200.spec.flightTime') },
    { label: t('specs.windResistance'), value: t('multiRotor.x1200.spec.windResistance') },
    { label: t('specs.flightSpeed'), value: "65km/h" },
    { label: t('specs.controlRange'), value: "10km" },
    { label: t('specs.operatingTemp'), value: "-20°C~50°C" },
    { label: t('specs.protection'), value: "IP54" },
  ];

  const features = [
    { icon: Camera, title: t('multiRotor.x1200.feature.heavyPayload'), description: t('multiRotor.x1200.feature.heavyPayload.desc') },
    { icon: Settings, title: t('multiRotor.x1200.feature.multiPayload'), description: t('multiRotor.x1200.feature.multiPayload.desc') },
    { icon: Shield, title: t('multiRotor.x1200.feature.ultraReliable'), description: t('multiRotor.x1200.feature.ultraReliable.desc') },
    { icon: Cpu, title: t('multiRotor.x1200.feature.smartSystem'), description: t('multiRotor.x1200.feature.smartSystem.desc') },
    { icon: Zap, title: t('multiRotor.x1200.feature.ultraEndurance'), description: t('multiRotor.x1200.feature.ultraEndurance.desc') },
    { icon: Wind, title: t('multiRotor.x1200.feature.ultraWind'), description: t('multiRotor.x1200.feature.ultraWind.desc') },
  ];

  const applications = [
    t('multiRotor.x1200.app.mapping'),
    t('multiRotor.x1200.app.heavyInspection'),
    t('multiRotor.x1200.app.emergencyRescue'),
    t('multiRotor.x1200.app.scientificResearch'),
    t('multiRotor.x1200.app.agricultural'),
    t('multiRotor.x1200.app.environmental'),
  ];

  return (
    <ProductDetailTemplate
      seoTitle={t('multiRotor.x1200.seoTitle')}
      seoDescription={t('multiRotor.x1200.seoDescription')}
      seoKeywords={t('multiRotor.x1200.seoKeywords')}
      breadcrumbs={[
        { label: t('nav.home'), path: "/" },
        { label: t('product.multiRotor'), path: "/products/multi-rotor" },
        { label: t('multiRotor.x1200.name') },
      ]}
      heroTitle={t('multiRotor.x1200.name')}
      heroDescription={t('multiRotor.x1200.description')}
      heroImage={x1200Img}
      heroHighlight={{ value: "10kg", label: t('specs.maxPayload') }}
      backLink={{ label: t('common.backTo') + t('product.multiRotor'), path: "/products/multi-rotor" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle={t('multiRotor.ctaTitle').replace('{{model}}', 'X1200')}
      ctaDescription={t('multiRotor.ctaDescription')}
      relatedProducts={[
        { label: 'X850', path: '/products/multi-rotor/x850' },
        { label: 'X1600', path: '/products/multi-rotor/x1600' },
        { label: t('accessory.digitalFpv'), path: '/products/accessories/digital-fpv' },
      ]}
      relatedApplications={[
        { label: t('app.powerInspection'), path: '/applications/power-inspection' },
        { label: t('app.environment'), path: '/solutions/industrial-uav-environmental-monitoring' },
        { label: t('app.firefighting'), path: '/applications/firefighting' },
      ]}
    />
  );
};

export default X1200;
