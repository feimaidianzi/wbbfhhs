import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Camera, Settings, Shield, Cpu, Zap, Wind } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const X1200 = () => {
  const { t } = useLanguage();

  const specs = [
    { label: t('specs.wheelbase'), labelEn: "Wheelbase", value: "1200mm", valueEn: "1200mm" },
    { label: t('specs.maxPayload'), labelEn: "Max Payload", value: "10kg", valueEn: "10kg" },
    { label: t('specs.flightTime'), labelEn: "Flight Time", value: "55分钟", valueEn: "55 min" },
    { label: t('specs.windResistance'), labelEn: "Wind Resistance", value: "7级", valueEn: "Level 7" },
    { label: t('specs.flightSpeed'), labelEn: "Flight Speed", value: "65km/h", valueEn: "65km/h" },
    { label: t('specs.controlRange'), labelEn: "Control Range", value: "10km", valueEn: "10km" },
    { label: t('specs.operatingTemp'), labelEn: "Operating Temp", value: "-20°C~50°C", valueEn: "-20°C~50°C" },
    { label: t('specs.protection'), labelEn: "Protection", value: "IP54", valueEn: "IP54" },
  ];

  const features = [
    { icon: Camera, title: t('multiRotor.x1200.feature.heavyPayload'), titleEn: "Heavy Payload", description: t('multiRotor.x1200.feature.heavyPayload.desc'), descriptionEn: "10kg supports professional-grade equipment" },
    { icon: Settings, title: t('multiRotor.x1200.feature.multiPayload'), titleEn: "Multi-Payload", description: t('multiRotor.x1200.feature.multiPayload.desc'), descriptionEn: "Supports multiple payloads simultaneously" },
    { icon: Shield, title: t('multiRotor.x1200.feature.ultraReliable'), titleEn: "Ultra Reliability", description: t('multiRotor.x1200.feature.ultraReliable.desc'), descriptionEn: "Dual redundant flight control system" },
    { icon: Cpu, title: t('multiRotor.x1200.feature.smartSystem'), titleEn: "Smart System", description: t('multiRotor.x1200.feature.smartSystem.desc'), descriptionEn: "AI recognition, automated operations" },
    { icon: Zap, title: t('multiRotor.x1200.feature.ultraEndurance'), titleEn: "Ultra Endurance", description: t('multiRotor.x1200.feature.ultraEndurance.desc'), descriptionEn: "55 minutes continuous operation" },
    { icon: Wind, title: t('multiRotor.x1200.feature.ultraWind'), titleEn: "Ultra Wind Resistance", description: t('multiRotor.x1200.feature.ultraWind.desc'), descriptionEn: "Stable in level 7 wind, all-weather operation" },
  ];

  const applications = [
    { zh: t('multiRotor.x1200.app.mapping'), en: "Professional Mapping" },
    { zh: t('multiRotor.x1200.app.heavyInspection'), en: "Heavy Inspection" },
    { zh: t('multiRotor.x1200.app.emergencyRescue'), en: "Emergency Rescue" },
    { zh: t('multiRotor.x1200.app.scientificResearch'), en: "Scientific Research" },
    { zh: t('multiRotor.x1200.app.agricultural'), en: "Agricultural Spraying" },
    { zh: t('multiRotor.x1200.app.environmental'), en: "Environmental Assessment" },
  ];

  return (
    <ProductDetailTemplate
      seoTitle={t('multiRotor.x1200.seoTitle')}
      seoTitleEn="X1200 Multi-Rotor Drone - Large Industrial UAV"
      seoDescription={t('multiRotor.x1200.seoDescription')}
      seoDescriptionEn="X1200 large industrial drone with 10kg payload and 55-minute flight time for professional mapping and emergency rescue"
      seoKeywords={t('multiRotor.x1200.seoKeywords')}
      breadcrumbs={[
        { label: t('nav.home'), labelEn: "Home", path: "/" },
        { label: t('product.multiRotor'), labelEn: "Multi-Rotor Drones", path: "/products/multi-rotor" },
        { label: t('multiRotor.x1200.name'), labelEn: "X1200 Drone" },
      ]}
      heroTitle={t('multiRotor.x1200.name')}
      heroTitleEn="X1200 Multi-Rotor Drone"
      heroDescription={t('multiRotor.x1200.description')}
      heroDescriptionEn="Large industrial drone for heavy payloads and long-duration missions. 55 minutes ultra-long endurance meets various complex mission requirements."
      heroImage="https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=1200&q=80"
      heroHighlight={{ value: "10kg", label: t('specs.maxPayload'), labelEn: "Max Payload" }}
      backLink={{ label: t('common.backTo') + t('product.multiRotor'), labelEn: "Back to Multi-Rotor", path: "/products/multi-rotor" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle={t('multiRotor.ctaTitle').replace('{{model}}', 'X1200')}
      ctaTitleEn="Learn More About X1200 Solutions"
      ctaDescription={t('multiRotor.ctaDescription')}
      ctaDescriptionEn="Contact our professional team for customized configuration and detailed quotation"
    />
  );
};

export default X1200;
