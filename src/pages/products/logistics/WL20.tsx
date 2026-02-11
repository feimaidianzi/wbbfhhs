import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Package, Truck, MapPin, Timer, Shield, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WL20 = () => {
  const { t } = useLanguage();

  const specs = [
    { label: t('specs.maxPayload'), labelEn: "Max Payload", value: "20kg", valueEn: "20kg" },
    { label: t('logistics.specs.range'), labelEn: "Range", value: "50km", valueEn: "50km" },
    { label: t('logistics.specs.cruiseSpeed'), labelEn: "Cruise Speed", value: "80km/h", valueEn: "80km/h" },
    { label: t('specs.flightTime'), labelEn: "Flight Time", value: "50分钟", valueEn: "50 min" },
    { label: t('logistics.specs.deliveryAccuracy'), labelEn: "Delivery Accuracy", value: "±5cm", valueEn: "±5cm" },
    { label: t('specs.operatingTemp'), labelEn: "Operating Temp", value: "-20°C~45°C", valueEn: "-20°C~45°C" },
    { label: t('specs.windResistance'), labelEn: "Wind Resistance", value: "6级", valueEn: "Level 6" },
    { label: t('logistics.specs.cargoVolume'), labelEn: "Cargo Volume", value: "40L", valueEn: "40L" },
  ];

  const features = [
    { icon: Package, title: t('logistics.wl20.feature.mediumPayload'), titleEn: "Medium Payload", description: t('logistics.wl20.feature.mediumPayload.desc'), descriptionEn: "20kg payload meets various delivery needs, covering more cargo types" },
    { icon: Truck, title: t('logistics.wl20.feature.intercityDelivery'), titleEn: "Inter-city Delivery", description: t('logistics.wl20.feature.intercityDelivery.desc'), descriptionEn: "50km range covers inter-city distances, expanding delivery scope" },
    { icon: MapPin, title: t('logistics.wl20.feature.highPrecision'), titleEn: "High-Precision", description: t('logistics.wl20.feature.highPrecision.desc'), descriptionEn: "±5cm delivery accuracy ensures precise placement" },
    { icon: Timer, title: t('logistics.wl20.feature.longEndurance'), titleEn: "Long Endurance", description: t('logistics.wl20.feature.longEndurance.desc'), descriptionEn: "50-minute flight time for longer distance missions" },
    { icon: Shield, title: t('logistics.wl20.feature.allWeather'), titleEn: "All-Weather", description: t('logistics.wl20.feature.allWeather.desc'), descriptionEn: "Adapts to various weather conditions for stable delivery" },
    { icon: Zap, title: t('logistics.wl20.feature.smartNavigation'), titleEn: "Smart Navigation", description: t('logistics.wl20.feature.smartNavigation.desc'), descriptionEn: "Autonomous obstacle avoidance for safe and efficient flight" },
  ];

  const applications = [
    { zh: t('logistics.wl20.app.intercityExpress'), en: "Inter-city Express Delivery" },
    { zh: t('logistics.wl20.app.medicalTransport'), en: "Medical Supply Transport" },
    { zh: t('logistics.wl20.app.freshProduct'), en: "Fresh Product Delivery" },
    { zh: t('logistics.wl20.app.agricultural'), en: "Agricultural Product Transport" },
    { zh: t('logistics.wl20.app.industrialParts'), en: "Industrial Parts Delivery" },
    { zh: t('logistics.wl20.app.emergencySupply'), en: "Emergency Supply Drop" },
  ];

  return (
    <ProductDetailTemplate
      seoTitle={t('logistics.wl20.seoTitle')}
      seoDescription={t('logistics.wl20.seoDescription')}
      seoKeywords={t('logistics.wl20.seoKeywords')}
      breadcrumbs={[
        { label: t('nav.home'), labelEn: "Home", path: "/" },
        { label: t('nav.products.logistics'), labelEn: "Logistics Drones", path: "/products/logistics" },
        { label: t('logistics.wl20.name'), labelEn: "WL-20 Drone" },
      ]}
      heroTitle={t('logistics.wl20.name')}
      heroTitleEn="WL-20 Logistics Drone"
      heroDescription={t('logistics.wl20.description')}
      heroDescriptionEn="Medium logistics platform for inter-city express and medical transport. Powerful payload capacity and endurance make it the best choice for inter-city logistics."
      heroImage="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80"
      heroHighlight={{ value: "20kg", label: t('specs.maxPayload'), labelEn: "Max Payload" }}
      backLink={{ label: t('common.backTo') + t('nav.products.logistics'), labelEn: "Back to Logistics", path: "/products/logistics" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle={t('logistics.ctaTitle').replace('{{model}}', 'WL-20')}
      ctaTitleEn="Learn More About WL-20 Solutions"
      ctaDescription={t('logistics.ctaDescription')}
      ctaDescriptionEn="Contact our professional team for customized configuration and detailed quotation"
    />
  );
};

export default WL20;
