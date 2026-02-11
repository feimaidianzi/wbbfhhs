import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Camera, Settings, Shield, Cpu, Zap, Wind } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const X1600 = () => {
  const { t } = useLanguage();

  const specs = [
    { label: t('specs.wheelbase'), labelEn: "Wheelbase", value: "1600mm", valueEn: "1600mm" },
    { label: t('specs.maxPayload'), labelEn: "Max Payload", value: "20kg", valueEn: "20kg" },
    { label: t('specs.flightTime'), labelEn: "Flight Time", value: "40分钟", valueEn: "40 min" },
    { label: t('specs.windResistance'), labelEn: "Wind Resistance", value: "6级", valueEn: "Level 6" },
    { label: t('specs.flightSpeed'), labelEn: "Flight Speed", value: "54km/h", valueEn: "54km/h" },
    { label: t('specs.controlRange'), labelEn: "Control Range", value: "10km", valueEn: "10km" },
    { label: t('specs.operatingTemp'), labelEn: "Operating Temp", value: "-20°C~50°C", valueEn: "-20°C~50°C" },
    { label: t('specs.protection'), labelEn: "Protection", value: "IP54", valueEn: "IP54" },
  ];

  const features = [
    { icon: Camera, title: t('multiRotor.x1600.feature.ultraHeavy'), titleEn: "Ultra Heavy Payload", description: t('multiRotor.x1600.feature.ultraHeavy.desc'), descriptionEn: "20kg supports special mission payloads" },
    { icon: Settings, title: t('multiRotor.x1600.feature.customSolutions'), titleEn: "Custom Solutions", description: t('multiRotor.x1600.feature.customSolutions.desc'), descriptionEn: "Customizable configuration for special requirements" },
    { icon: Shield, title: t('multiRotor.x1600.feature.industrialQuality'), titleEn: "Industrial Quality", description: t('multiRotor.x1600.feature.industrialQuality.desc'), descriptionEn: "Meets harsh industrial environment requirements" },
    { icon: Cpu, title: t('multiRotor.x1600.feature.highPrecision'), titleEn: "High-Precision", description: t('multiRotor.x1600.feature.highPrecision.desc'), descriptionEn: "RTK centimeter-level positioning" },
    { icon: Zap, title: t('multiRotor.x1600.feature.highPower'), titleEn: "High Power System", description: t('multiRotor.x1600.feature.highPower.desc'), descriptionEn: "Powerful propulsion system, stable and reliable" },
    { icon: Wind, title: t('multiRotor.x1600.feature.ultraStability'), titleEn: "Ultra Stability", description: t('multiRotor.x1600.feature.ultraStability.desc'), descriptionEn: "Large size brings enhanced stability" },
  ];

  const applications = [
    { zh: t('multiRotor.x1600.app.mapping'), en: "Professional Mapping" },
    { zh: t('multiRotor.x1600.app.cargoDelivery'), en: "Cargo Delivery" },
    { zh: t('multiRotor.x1600.app.specialOps'), en: "Special Operations" },
    { zh: t('multiRotor.x1600.app.scientificResearch'), en: "Scientific Research" },
    { zh: t('multiRotor.x1600.app.heavyAerial'), en: "Heavy Aerial Photography" },
    { zh: t('multiRotor.x1600.app.industrialInspection'), en: "Industrial Inspection" },
  ];

  return (
    <ProductDetailTemplate
      seoTitle={t('multiRotor.x1600.seoTitle')}
      seoDescription={t('multiRotor.x1600.seoDescription')}
      seoKeywords={t('multiRotor.x1600.seoKeywords')}
      breadcrumbs={[
        { label: t('nav.home'), labelEn: "Home", path: "/" },
        { label: t('product.multiRotor'), labelEn: "Multi-Rotor Drones", path: "/products/multi-rotor" },
        { label: t('multiRotor.x1600.name'), labelEn: "X1600 Drone" },
      ]}
      heroTitle={t('multiRotor.x1600.name')}
      heroTitleEn="X1600 Multi-Rotor Drone"
      heroDescription={t('multiRotor.x1600.description')}
      heroDescriptionEn="Extra large industrial drone for ultra-heavy payload requirements. 20kg max payload, ideal for professional mapping and cargo transport."
      heroImage="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1200&q=80"
      heroHighlight={{ value: "20kg", label: t('specs.maxPayload'), labelEn: "Max Payload" }}
      backLink={{ label: t('common.backTo') + t('product.multiRotor'), labelEn: "Back to Multi-Rotor", path: "/products/multi-rotor" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle={t('multiRotor.ctaTitle').replace('{{model}}', 'X1600')}
      ctaTitleEn="Learn More About X1600 Solutions"
      ctaDescription={t('multiRotor.ctaDescription')}
      ctaDescriptionEn="Contact our professional team for customized configuration and detailed quotation"
    />
  );
};

export default X1600;
