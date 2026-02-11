import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Package, Truck, MapPin, Timer, Shield, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WL30 = () => {
  const { t } = useLanguage();

  const specs = [
    { label: t('specs.maxPayload'), labelEn: "Max Payload", value: "30kg", valueEn: "30kg" },
    { label: t('logistics.specs.range'), labelEn: "Range", value: "80km", valueEn: "80km" },
    { label: t('logistics.specs.cruiseSpeed'), labelEn: "Cruise Speed", value: "100km/h", valueEn: "100km/h" },
    { label: t('specs.flightTime'), labelEn: "Flight Time", value: "60分钟", valueEn: "60 min" },
    { label: t('logistics.specs.deliveryAccuracy'), labelEn: "Delivery Accuracy", value: "±5cm", valueEn: "±5cm" },
    { label: t('specs.operatingTemp'), labelEn: "Operating Temp", value: "-20°C~45°C", valueEn: "-20°C~45°C" },
    { label: t('specs.windResistance'), labelEn: "Wind Resistance", value: "7级", valueEn: "Level 7" },
    { label: t('logistics.specs.cargoVolume'), labelEn: "Cargo Volume", value: "60L", valueEn: "60L" },
  ];

  const features = [
    { icon: Package, title: t('logistics.wl30.feature.heavyPayload'), titleEn: "Heavy Payload", description: t('logistics.wl30.feature.heavyPayload.desc'), descriptionEn: "30kg meets heavy transport needs, covering more cargo types" },
    { icon: Truck, title: t('logistics.wl30.feature.longRange'), titleEn: "Long-Range Delivery", description: t('logistics.wl30.feature.longRange.desc'), descriptionEn: "80km range breaks terrain limits, connecting remote areas" },
    { icon: MapPin, title: t('logistics.wl30.feature.precisePosition'), titleEn: "Precise Positioning", description: t('logistics.wl30.feature.precisePosition.desc'), descriptionEn: "RTK centimeter-level positioning ensures precise delivery" },
    { icon: Timer, title: t('logistics.wl30.feature.ultraEndurance'), titleEn: "Ultra Endurance", description: t('logistics.wl30.feature.ultraEndurance.desc'), descriptionEn: "60-minute continuous flight for complex missions" },
    { icon: Shield, title: t('logistics.wl30.feature.strongWind'), titleEn: "Strong Wind Resistance", description: t('logistics.wl30.feature.strongWind.desc'), descriptionEn: "Stable flight in level 7 wind, adapts to harsh weather" },
    { icon: Zap, title: t('logistics.wl30.feature.quickResponse'), titleEn: "Quick Response", description: t('logistics.wl30.feature.quickResponse.desc'), descriptionEn: "Rapid emergency supply delivery for timely rescue" },
  ];

  const applications = [
    { zh: t('logistics.wl30.app.remoteDelivery'), en: "Remote Area Delivery" },
    { zh: t('logistics.wl30.app.emergencyDrop'), en: "Emergency Supply Drop" },
    { zh: t('logistics.wl30.app.mountainTransport'), en: "Mountain Supply Transport" },
    { zh: t('logistics.wl30.app.islandDelivery'), en: "Island Delivery Service" },
    { zh: t('logistics.wl30.app.disasterRelief'), en: "Disaster Relief Support" },
    { zh: t('logistics.wl30.app.agriculturalExport'), en: "Agricultural Export Logistics" },
  ];

  return (
    <ProductDetailTemplate
      seoTitle={t('logistics.wl30.seoTitle')}
      seoDescription={t('logistics.wl30.seoDescription')}
      seoKeywords={t('logistics.wl30.seoKeywords')}
      breadcrumbs={[
        { label: t('nav.home'), labelEn: "Home", path: "/" },
        { label: t('nav.products.logistics'), labelEn: "Logistics Drones", path: "/products/logistics" },
        { label: t('logistics.wl30.name'), labelEn: "WL-30 Drone" },
      ]}
      heroTitle={t('logistics.wl30.name')}
      heroTitleEn="WL-30 Logistics Drone"
      heroDescription={t('logistics.wl30.description')}
      heroDescriptionEn="Heavy logistics platform for remote area supply delivery and emergency rescue. Breaks terrain limits for delivery anywhere. Powerful payload and endurance make it the top choice for extreme environment delivery."
      heroImage="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80"
      heroHighlight={{ value: "30kg", label: t('specs.maxPayload'), labelEn: "Max Payload" }}
      backLink={{ label: t('common.backTo') + t('nav.products.logistics'), labelEn: "Back to Logistics", path: "/products/logistics" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle={t('logistics.ctaTitle').replace('{{model}}', 'WL-30')}
      ctaTitleEn="Learn More About WL-30 Solutions"
      ctaDescription={t('logistics.ctaDescription')}
      ctaDescriptionEn="Contact our professional team for customized configuration and detailed quotation"
    />
  );
};

export default WL30;
