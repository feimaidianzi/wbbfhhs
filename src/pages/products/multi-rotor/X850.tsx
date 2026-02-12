import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Camera, Settings, Shield, Cpu, Zap, Wind } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const X850 = () => {
  const { t } = useLanguage();

  const specs = [
    { label: t('specs.wheelbase'), value: "850mm" },
    { label: t('specs.maxPayload'), value: "5kg" },
    { label: t('specs.flightTime'), value: t('multiRotor.x850.spec.flightTime') },
    { label: t('specs.windResistance'), value: t('multiRotor.x850.spec.windResistance') },
    { label: t('specs.flightSpeed'), value: "72km/h" },
    { label: t('specs.controlRange'), value: "8km" },
    { label: t('specs.operatingTemp'), value: "-20°C~50°C" },
    { label: t('specs.protection'), value: "IP54" },
  ];

  const features = [
    { icon: Camera, title: t('multiRotor.x850.feature.professionalPayload'), description: t('multiRotor.x850.feature.professionalPayload.desc') },
    { icon: Settings, title: t('multiRotor.x850.feature.modularDesign'), description: t('multiRotor.x850.feature.modularDesign.desc') },
    { icon: Shield, title: t('multiRotor.x850.feature.highReliability'), description: t('multiRotor.x850.feature.highReliability.desc') },
    { icon: Cpu, title: t('multiRotor.x850.feature.smartAvoidance'), description: t('multiRotor.x850.feature.smartAvoidance.desc') },
    { icon: Zap, title: t('multiRotor.x850.feature.longEndurance'), description: t('multiRotor.x850.feature.longEndurance.desc') },
    { icon: Wind, title: t('multiRotor.x850.feature.strongWind'), description: t('multiRotor.x850.feature.strongWind.desc') },
  ];

  const applications = [
    t('multiRotor.x850.app.powerInspection'),
    t('multiRotor.x850.app.pipelineMonitoring'),
    t('multiRotor.x850.app.lawEnforcement'),
    t('multiRotor.x850.app.fireRescue'),
    t('multiRotor.x850.app.surveyMapping'),
    t('multiRotor.x850.app.environmentMonitoring'),
  ];

  return (
    <ProductDetailTemplate
      seoTitle={t('multiRotor.x850.seoTitle')}
      seoDescription={t('multiRotor.x850.seoDescription')}
      seoKeywords={t('multiRotor.x850.seoKeywords')}
      breadcrumbs={[
        { label: t('nav.home'), path: "/" },
        { label: t('nav.products.multiRotor'), path: "/products/multi-rotor" },
        { label: t('multiRotor.x850.name') },
      ]}
      heroTitle={t('multiRotor.x850.name')}
      heroDescription={t('multiRotor.x850.description')}
      heroImage="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80"
      heroHighlight={{ value: "5kg", label: t('specs.maxPayload') }}
      backLink={{ label: t('common.backTo') + t('nav.products.multiRotor'), path: "/products/multi-rotor" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle={t('multiRotor.ctaTitle').replace('{{model}}', 'X850')}
      ctaDescription={t('multiRotor.ctaDescription')}
      relatedProducts={[
        { label: 'X650', path: '/products/multi-rotor/x650' },
        { label: 'X1200', path: '/products/multi-rotor/x1200' },
        { label: t('accessory.gimbal'), path: '/products/accessories/gimbal' },
      ]}
      relatedApplications={[
        { label: t('app.powerInspection'), path: '/applications/power-inspection' },
        { label: t('app.environment'), path: '/applications/environment' },
        { label: t('app.police'), path: '/applications/police' },
      ]}
    />
  );
};

export default X850;
