import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Camera, Settings, Shield, Cpu, Zap, Wind } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const X650 = () => {
  const { t } = useLanguage();

  const specs = [
    { label: t('specs.wheelbase'), labelEn: "Wheelbase", value: "650mm", valueEn: "650mm" },
    { label: t('specs.maxPayload'), labelEn: "Max Payload", value: "2kg", valueEn: "2kg" },
    { label: t('specs.flightTime'), labelEn: "Flight Time", value: "35分钟", valueEn: "35 min" },
    { label: t('specs.windResistance'), labelEn: "Wind Resistance", value: "5级", valueEn: "Level 5" },
    { label: t('specs.flightSpeed'), labelEn: "Flight Speed", value: "54km/h", valueEn: "54km/h" },
    { label: t('specs.controlRange'), labelEn: "Control Range", value: "5km", valueEn: "5km" },
    { label: t('specs.operatingTemp'), labelEn: "Operating Temp", value: "-20°C~50°C", valueEn: "-20°C~50°C" },
    { label: t('specs.protection'), labelEn: "Protection", value: "IP54", valueEn: "IP54" },
  ];

  const features = [
    { icon: Camera, title: t('multiRotor.features.compactPortable'), titleEn: "Compact & Portable", description: t('multiRotor.features.compactPortableDesc'), descriptionEn: "650mm wheelbase, easy to carry and transport" },
    { icon: Settings, title: t('multiRotor.features.quickDeploy'), titleEn: "Quick Deployment", description: t('multiRotor.features.quickDeployDesc'), descriptionEn: "Ready to fly in 5 minutes, fast response" },
    { icon: Shield, title: t('multiRotor.features.stableReliable'), titleEn: "Stable & Reliable", description: t('multiRotor.features.stableReliableDesc'), descriptionEn: "Industrial-grade flight control system" },
    { icon: Cpu, title: t('multiRotor.features.smartControl'), titleEn: "Smart Control", description: t('multiRotor.features.smartControlDesc'), descriptionEn: "Autonomous obstacle avoidance navigation" },
    { icon: Zap, title: t('multiRotor.features.longEndurance'), titleEn: "Long Endurance", description: t('multiRotor.features.longEnduranceDesc'), descriptionEn: "35 minutes continuous flight" },
    { icon: Wind, title: t('multiRotor.features.windResistant'), titleEn: "Wind Resistant", description: t('multiRotor.features.windResistantDesc'), descriptionEn: "Stable operation in level 5 wind" },
  ];

  const applications = [
    { zh: t('multiRotor.applications.routineInspection'), en: "Routine Inspection" },
    { zh: t('multiRotor.applications.dataCollection'), en: "Data Collection" },
    { zh: t('multiRotor.applications.fieldSurvey'), en: "Field Survey" },
    { zh: t('multiRotor.applications.smallMapping'), en: "Small Mapping" },
    { zh: t('multiRotor.applications.securityPatrol'), en: "Security Patrol" },
    { zh: t('multiRotor.applications.training'), en: "Training & Education" },
  ];

  return (
    <ProductDetailTemplate
      seoTitle={t('multiRotor.x650.seoTitle')}
      seoTitleEn="X650 Multi-Rotor Drone - Compact Industrial UAV"
      seoDescription={t('multiRotor.x650.seoDescription')}
      seoDescriptionEn="X650 compact industrial drone with 650mm wheelbase and 2kg payload, ideal for routine inspection and data collection"
      seoKeywords={t('multiRotor.x650.seoKeywords')}
      breadcrumbs={[
        { label: t('nav.home'), labelEn: "Home", path: "/" },
        { label: t('nav.products.multiRotor'), labelEn: "Multi-Rotor Drones", path: "/products/multi-rotor" },
        { label: t('multiRotor.x650.name'), labelEn: "X650 Drone" },
      ]}
      heroTitle={t('multiRotor.x650.name')}
      heroTitleEn="X650 Multi-Rotor Drone"
      heroDescription={t('multiRotor.x650.description')}
      heroDescriptionEn="Compact industrial drone for routine inspection and data collection. Highly portable with quick deployment, ideal for entry-level industrial applications."
      heroImage="https://images.unsplash.com/photo-1506947411487-a56738267384?w=1200&q=80"
      heroHighlight={{ value: "650mm", label: t('specs.wheelbase'), labelEn: "Wheelbase" }}
      backLink={{ label: `返回${t('nav.products.multiRotor')}`, labelEn: "Back to Multi-Rotor", path: "/products/multi-rotor" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle={t('multiRotor.x650.ctaTitle')}
      ctaTitleEn="Learn More About X650 Solutions"
      ctaDescription={t('multiRotor.x650.ctaDescription')}
      ctaDescriptionEn="Contact our professional team for customized configuration and detailed quotation"
    />
  );
};

export default X650;
