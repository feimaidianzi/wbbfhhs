import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Radio, Weight, Clock, Navigation, Thermometer, Zap, Sun, Camera } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import th200Hero from "@/assets/products/th-200-hero.png";

const TH200 = () => {
  const { t } = useLanguage();

  const specs = [
    { label: t('specs.wheelbase'), labelEn: "Wheelbase", value: "1200mm", valueEn: "1200mm" },
    { label: t('specs.maxPayload'), labelEn: "Max Payload", value: "10kg", valueEn: "10kg" },
    { label: t('tethered.th200.spec.unfoldedSize'), labelEn: "Unfolded Size", value: "1000×1000×600mm", valueEn: "1000×1000×600mm" },
    { label: t('tethered.th200.spec.foldedSize'), labelEn: "Folded Size", value: "620×620×600mm", valueEn: "620×620×600mm" },
    { label: t('tethered.th200.spec.bodyWeight'), labelEn: "Body Weight", value: t('tethered.th200.spec.bodyWeight.value'), valueEn: "11kg (without battery)" },
    { label: t('tethered.th200.spec.maxTakeoffWeight'), labelEn: "Max Takeoff Weight", value: "29kg", valueEn: "29kg" },
    { label: t('tethered.th200.spec.maxFlightSpeed'), labelEn: "Max Flight Speed", value: t('tethered.th200.spec.maxFlightSpeed.value'), valueEn: "Ascent 5m/s, Descent 3m/s, Horizontal 15m/s" },
    { label: t('specs.windResistance'), labelEn: "Wind Resistance", value: t('tethered.th200.spec.windResistance.value'), valueEn: "15m/s (Level 7)" },
    { label: t('specs.flightTime'), labelEn: "Flight Time", value: t('tethered.th200.spec.flightTime.value'), valueEn: "60min empty / 24h tethered" },
    { label: t('tethered.th200.spec.maxFlightAltitude'), labelEn: "Max Flight Altitude", value: t('tethered.th200.spec.maxFlightAltitude.value'), valueEn: "1000m" },
    { label: t('tethered.th200.spec.maxElevation'), labelEn: "Max Elevation", value: t('tethered.th200.spec.maxElevation.value'), valueEn: "5000m" },
    { label: t('specs.controlRange'), labelEn: "Control Range", value: "15km", valueEn: "15km" },
    { label: t('tethered.th200.spec.positionAccuracy'), labelEn: "Positioning Accuracy", value: t('tethered.th200.spec.positionAccuracy.value'), valueEn: "RTK cm-level" },
    { label: t('tethered.th200.spec.waterproof'), labelEn: "Waterproof", value: t('tethered.th200.spec.waterproof.value'), valueEn: "Moderate rain resistant" },
    { label: t('specs.operatingTemp'), labelEn: "Operating Temp", value: "-20°C ~ 55°C", valueEn: "-20°C ~ 55°C" },
  ];

  const features = [
    { icon: Radio, title: t('tethered.th200.feature.commRelay'), titleEn: "Comm Relay", description: t('tethered.th200.feature.commRelay.desc'), descriptionEn: "5km coverage at 200m altitude" },
    { icon: Weight, title: t('tethered.th200.feature.payload'), titleEn: "10kg Payload", description: t('tethered.th200.feature.payload.desc'), descriptionEn: "Multiple professional payloads supported" },
    { icon: Clock, title: t('tethered.th200.feature.flight24h'), titleEn: "24h Flight", description: t('tethered.th200.feature.flight24h.desc'), descriptionEn: "Continuous tethered operation" },
    { icon: Navigation, title: t('tethered.th200.feature.highPrecision'), titleEn: "High Precision", description: t('tethered.th200.feature.highPrecision.desc'), descriptionEn: "RTK cm-level positioning" },
    { icon: Thermometer, title: t('tethered.th200.feature.cooling'), titleEn: "Efficient Cooling", description: t('tethered.th200.feature.cooling.desc'), descriptionEn: "Centrifugal air cooling system" },
    { icon: Zap, title: t('tethered.th200.feature.powerful'), titleEn: "Powerful", description: t('tethered.th200.feature.powerful.desc'), descriptionEn: "Ultra Carbon Pro propellers" },
    { icon: Sun, title: t('tethered.th200.feature.lighting'), titleEn: "Emergency Lighting", description: t('tethered.th200.feature.lighting.desc'), descriptionEn: "4 groups 20000 lumen matrix lights" },
    { icon: Camera, title: t('tethered.th200.feature.multiPayload'), titleEn: "Multi-Payload", description: t('tethered.th200.feature.multiPayload.desc'), descriptionEn: "Zoom/IR/Tracking/Speaker etc." },
  ];

  const applications = [
    { zh: t('tethered.th200.app.emergencyLighting'), en: "Emergency Lighting" },
    { zh: t('tethered.th200.app.commRelay'), en: "Communication Relay" },
    { zh: t('tethered.th200.app.securityPatrol'), en: "Security Surveillance" },
    { zh: t('tethered.th200.app.eventSecurity'), en: "Event Security" },
    { zh: t('tethered.th200.app.fireRescue'), en: "Fire & Rescue" },
    { zh: t('tethered.th200.app.remoteCoverage'), en: "Remote Area Coverage" },
  ];

  return (
    <ProductDetailTemplate
      seoTitle={t('tethered.th200.seoTitle')}
      seoDescription={t('tethered.th200.seoDescription')}
      seoKeywords={t('tethered.th200.seoKeywords')}
      breadcrumbs={[
        { label: t('nav.home'), labelEn: "Home", path: "/" },
        { label: t('nav.products.tethered'), labelEn: "Tethered Drones", path: "/products/tethered" },
        { label: t('tethered.th200.name'), labelEn: "TH-200 Drone" },
      ]}
      heroTitle={t('tethered.th200.name')}
      heroTitleEn="TH-200 Tethered Lighting Drone"
      heroDescription={t('tethered.th200.description')}
      heroDescriptionEn="Industrial-grade tethered lighting platform with 10kg payload and 24-hour continuous flight. Equipped with 4 groups of 20000 lumen matrix lights covering approximately 10000 square meters, ideal for emergency lighting and communication relay."
      heroImage={th200Hero}
      heroHighlight={{ value: "24h", label: t('tethered.th200.highlight'), labelEn: "Continuous Flight" }}
      backLink={{ label: t('common.backTo') + t('nav.products.tethered'), labelEn: "Back to Tethered", path: "/products/tethered" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle={t('tethered.ctaTitle').replace('{{model}}', 'TH-200')}
      ctaTitleEn="Learn More About TH-200 Solutions"
      ctaDescription={t('tethered.ctaDescription')}
      ctaDescriptionEn="Contact our professional team for customized configuration and detailed quotation"
    />
  );
};

export default TH200;
