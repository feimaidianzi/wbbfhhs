import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Camera, Settings, Shield, Cpu, Zap, Wind } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const X850 = () => {
  const { t } = useLanguage();

  const specs = [
    { label: t('specs.wheelbase'), labelEn: "Wheelbase", value: "850mm", valueEn: "850mm" },
    { label: t('specs.maxPayload'), labelEn: "Max Payload", value: "5kg", valueEn: "5kg" },
    { label: t('specs.flightTime'), labelEn: "Flight Time", value: "45分钟", valueEn: "45 min" },
    { label: t('specs.windResistance'), labelEn: "Wind Resistance", value: "6级", valueEn: "Level 6" },
    { label: t('specs.flightSpeed'), labelEn: "Flight Speed", value: "72km/h", valueEn: "72km/h" },
    { label: t('specs.controlRange'), labelEn: "Control Range", value: "8km", valueEn: "8km" },
    { label: t('specs.operatingTemp'), labelEn: "Operating Temp", value: "-20°C~50°C", valueEn: "-20°C~50°C" },
    { label: t('specs.protection'), labelEn: "Protection", value: "IP54", valueEn: "IP54" },
  ];

  const features = [
    { icon: Camera, title: t('multiRotor.x850.feature.professionalPayload'), titleEn: "Professional Payload", description: t('multiRotor.x850.feature.professionalPayload.desc'), descriptionEn: "5kg payload supports professional equipment" },
    { icon: Settings, title: t('multiRotor.x850.feature.modularDesign'), titleEn: "Modular Design", description: t('multiRotor.x850.feature.modularDesign.desc'), descriptionEn: "Quick payload replacement, flexible configuration" },
    { icon: Shield, title: t('multiRotor.x850.feature.highReliability'), titleEn: "High Reliability", description: t('multiRotor.x850.feature.highReliability.desc'), descriptionEn: "Industrial-grade redundancy design" },
    { icon: Cpu, title: t('multiRotor.x850.feature.smartAvoidance'), titleEn: "Smart Avoidance", description: t('multiRotor.x850.feature.smartAvoidance.desc'), descriptionEn: "360° omnidirectional sensing, autonomous avoidance" },
    { icon: Zap, title: t('multiRotor.x850.feature.longEndurance'), titleEn: "Long Endurance", description: t('multiRotor.x850.feature.longEndurance.desc'), descriptionEn: "45 minutes continuous operation" },
    { icon: Wind, title: t('multiRotor.x850.feature.strongWind'), titleEn: "Strong Wind Resistance", description: t('multiRotor.x850.feature.strongWind.desc'), descriptionEn: "Stable in level 6 wind, adapts to harsh conditions" },
  ];

  const applications = [
    { zh: t('multiRotor.x850.app.powerInspection'), en: "Power Line Inspection" },
    { zh: t('multiRotor.x850.app.pipelineMonitoring'), en: "Pipeline Monitoring" },
    { zh: t('multiRotor.x850.app.lawEnforcement'), en: "Law Enforcement" },
    { zh: t('multiRotor.x850.app.fireRescue'), en: "Fire & Rescue" },
    { zh: t('multiRotor.x850.app.surveyMapping'), en: "Surveying & Mapping" },
    { zh: t('multiRotor.x850.app.environmentMonitoring'), en: "Environmental Monitoring" },
  ];

  return (
    <ProductDetailTemplate
      seoTitle={t('multiRotor.x850.seoTitle')}
      seoDescription={t('multiRotor.x850.seoDescription')}
      seoKeywords={t('multiRotor.x850.seoKeywords')}
      breadcrumbs={[
        { label: t('nav.home'), labelEn: "Home", path: "/" },
        { label: t('nav.products.multiRotor'), labelEn: "Multi-Rotor Drones", path: "/products/multi-rotor" },
        { label: t('multiRotor.x850.name'), labelEn: "X850 Drone" },
      ]}
      heroTitle={t('multiRotor.x850.name')}
      heroTitleEn="X850 Multi-Rotor Drone"
      heroDescription={t('multiRotor.x850.description')}
      heroDescriptionEn="Medium industrial drone with enhanced payload capacity and longer flight time. A reliable choice for power inspection and law enforcement."
      heroImage="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80"
      heroHighlight={{ value: "5kg", label: t('specs.maxPayload'), labelEn: "Max Payload" }}
      backLink={{ label: t('common.backTo') + t('nav.products.multiRotor'), labelEn: "Back to Multi-Rotor", path: "/products/multi-rotor" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle={t('multiRotor.ctaTitle').replace('{{model}}', 'X850')}
      ctaTitleEn="Learn More About X850 Solutions"
      ctaDescription={t('multiRotor.ctaDescription')}
      ctaDescriptionEn="Contact our professional team for customized configuration and detailed quotation"
    />
  );
};

export default X850;
