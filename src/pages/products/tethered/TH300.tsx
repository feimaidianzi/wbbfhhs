import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Clock, Zap, Shield, Radio, Eye, Settings, Plane, Volume2, Lightbulb, Flame, Battery } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import th300Drone from "@/assets/products/th-300-drone.png";

const TH300 = () => {
  const { t } = useLanguage();

  const specs = [
    { label: t('tethered.th300.spec.motorWheelbase'), labelEn: "Motor Wheelbase", value: "1380mm", valueEn: "1380mm" },
    { label: t('tethered.th200.spec.unfoldedSize'), labelEn: "Unfolded Size", value: "1480×1480×550mm", valueEn: "1480×1480×550mm" },
    { label: t('tethered.th200.spec.foldedSize'), labelEn: "Folded Size", value: "500×500×550mm", valueEn: "500×500×550mm" },
    { label: t('tethered.th300.spec.propellerSize'), labelEn: "Propeller Size", value: t('tethered.th300.spec.propellerSize.value'), valueEn: "Diameter×Pitch: 36×7 inch" },
    { label: t('specs.maxPayload'), labelEn: "Max Payload", value: "≥20KG", valueEn: "≥20KG" },
    { label: t('tethered.th300.spec.standardFlightTime'), labelEn: "Flight Time", value: t('tethered.th300.spec.standardFlightTime.value'), valueEn: "≥40min (empty)" },
    { label: t('tethered.th300.spec.chargingTime'), labelEn: "Charging Time", value: t('tethered.th300.spec.chargingTime.value'), valueEn: "50 minutes" },
    { label: t('specs.windResistance'), labelEn: "Wind Resistance", value: "7级", valueEn: "Level 7" },
    { label: t('tethered.th300.spec.flightElevation'), labelEn: "Flight Elevation", value: t('tethered.th300.spec.flightElevation.value'), valueEn: "≥4000m" },
    { label: t('tethered.th300.spec.flightAltitude'), labelEn: "Flight Altitude", value: t('tethered.th300.spec.flightAltitude.value'), valueEn: "≥2000m" },
    { label: t('specs.controlRange'), labelEn: "Control Range", value: "20KM", valueEn: "20KM" },
    { label: t('tethered.th300.spec.hoverAccuracy'), labelEn: "Hover Accuracy", value: t('tethered.th300.spec.hoverAccuracy.value'), valueEn: "Vertical/Horizontal: ±0.5m" },
    { label: t('specs.protection'), labelEn: "Protection Rating", value: t('tethered.th300.spec.protection.value'), valueEn: "IP56 Dust/Water Resistant" },
    { label: t('tethered.th300.spec.bodyMaterial'), labelEn: "Body Material", value: t('tethered.th300.spec.bodyMaterial.value'), valueEn: "Carbon Fiber" },
    { label: t('tethered.th300.spec.deployTime'), labelEn: "Deployment Time", value: t('tethered.th300.spec.deployTime.value'), valueEn: "≤1 min (2 persons)" },
    { label: t('specs.operatingTemp'), labelEn: "Operating Temp", value: "-40℃至+70℃", valueEn: "-40°C to +70°C" },
  ];

  const features = [
    { icon: Plane, title: t('tethered.th300.feature.heavyPayload'), titleEn: "Heavy Payload", description: t('tethered.th300.feature.heavyPayload.desc'), descriptionEn: "≥20KG max payload, supports multiple payloads simultaneously" },
    { icon: Shield, title: t('tethered.th300.feature.ip56'), titleEn: "IP56 Protection", description: t('tethered.th300.feature.ip56.desc'), descriptionEn: "Dust and water resistant, flies in moderate rain" },
    { icon: Radio, title: t('tethered.th300.feature.remoteControl'), titleEn: "Remote Control", description: t('tethered.th300.feature.remoteControl.desc'), descriptionEn: "20KM max range, triple satellite positioning" },
    { icon: Clock, title: t('tethered.th300.feature.longEndurance'), titleEn: "Long Endurance", description: t('tethered.th300.feature.longEndurance.desc'), descriptionEn: "≥40min empty flight time" },
    { icon: Settings, title: t('tethered.th300.feature.quickDeploy'), titleEn: "Quick Deployment", description: t('tethered.th300.feature.quickDeploy.desc'), descriptionEn: "Foldable design, deploys in ≤1 min with 2 persons" },
    { icon: Eye, title: t('tethered.th300.feature.highAltitude'), titleEn: "High Altitude", description: t('tethered.th300.feature.highAltitude.desc'), descriptionEn: "Flight elevation ≥4000m, suitable for plateau" },
    { icon: Lightbulb, title: t('tethered.th300.feature.searchlight'), titleEn: "Searchlight", description: t('tethered.th300.feature.searchlight.desc'), descriptionEn: "200W power, ≥1000m illumination range" },
    { icon: Volume2, title: t('tethered.th300.feature.speaker'), titleEn: "Smart Speaker", description: t('tethered.th300.feature.speaker.desc'), descriptionEn: "180dB, ≥600m broadcast range" },
    { icon: Flame, title: t('tethered.th300.feature.fireBall'), titleEn: "Fire Ball Launcher", description: t('tethered.th300.feature.fireBall.desc'), descriptionEn: "4 fire balls, auto-detonates on fire" },
    { icon: Battery, title: t('tethered.th300.feature.solidBattery'), titleEn: "Solid-State Battery", description: t('tethered.th300.feature.solidBattery.desc'), descriptionEn: "61V 31000mAh, suitable for ≥6000m altitude" },
  ];

  const applications = [
    { zh: t('tethered.th300.app.patrolMonitoring'), en: "Patrol Monitoring" },
    { zh: t('tethered.th300.app.emergencyAnnouncement'), en: "Emergency Announcement" },
    { zh: t('tethered.th300.app.nightLighting'), en: "Night Lighting" },
    { zh: t('tethered.th300.app.forestFirefighting'), en: "Forest Firefighting" },
    { zh: t('tethered.th300.app.securityPatrol'), en: "Security Patrol" },
    { zh: t('tethered.th300.app.searchRescue'), en: "Search & Rescue" },
  ];

  return (
    <ProductDetailTemplate
      seoTitle={t('tethered.th300.seoTitle')}
      seoDescription={t('tethered.th300.seoDescription')}
      seoKeywords={t('tethered.th300.seoKeywords')}
      breadcrumbs={[
        { label: t('nav.home'), labelEn: "Home", path: "/" },
        { label: t('nav.products.tethered'), labelEn: "Tethered Drones", path: "/products/tethered" },
        { label: t('tethered.th300.name'), labelEn: "TH-300 Drone" },
      ]}
      heroTitle={t('tethered.th300.name')}
      heroTitleEn="TH-300 Tethered Firefighting Drone"
      heroDescription={t('tethered.th300.description')}
      heroDescriptionEn="Multi-function platform for patrol, announcement, lighting, and firefighting. ≥20KG heavy payload capacity, supports multiple task payloads simultaneously, Level 7 wind resistance for stable flight, IP56 protection for complex environments."
      heroImage={th300Drone}
      heroHighlight={{ value: "20KG", label: t('specs.maxPayload'), labelEn: "Max Payload" }}
      backLink={{ label: t('common.backTo') + t('nav.products.tethered'), labelEn: "Back to Tethered", path: "/products/tethered" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle={t('tethered.ctaTitle').replace('{{model}}', 'TH-300')}
      ctaTitleEn="Learn More About TH-300 Solutions"
      ctaDescription={t('tethered.ctaDescription')}
      ctaDescriptionEn="Contact our professional team for customized configuration and detailed quotation"
    />
  );
};

export default TH300;
