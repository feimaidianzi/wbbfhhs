import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Package, Truck, MapPin, Timer, Shield, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WL10 = () => {
  const { t } = useLanguage();

  const specs = [
    { label: t('specs.maxPayload'), labelEn: "Max Payload", value: "10kg", valueEn: "10kg" },
    { label: t('logistics.specs.range'), labelEn: "Range", value: "30km", valueEn: "30km" },
    { label: t('logistics.specs.cruiseSpeed'), labelEn: "Cruise Speed", value: "60km/h", valueEn: "60km/h" },
    { label: t('specs.flightTime'), labelEn: "Flight Time", value: "40分钟", valueEn: "40 min" },
    { label: t('logistics.specs.deliveryAccuracy'), labelEn: "Delivery Accuracy", value: "±10cm", valueEn: "±10cm" },
    { label: t('specs.operatingTemp'), labelEn: "Operating Temp", value: "-20°C~45°C", valueEn: "-20°C~45°C" },
    { label: t('specs.windResistance'), labelEn: "Wind Resistance", value: "5级", valueEn: "Level 5" },
    { label: t('logistics.specs.cargoVolume'), labelEn: "Cargo Volume", value: "20L", valueEn: "20L" },
  ];

  const features = [
    { icon: Package, title: t('logistics.wl10.feature.lightPayload'), titleEn: "Light Payload", description: t('logistics.wl10.feature.lightPayload.desc'), descriptionEn: "10kg payload meets urban delivery needs for various packages" },
    { icon: Truck, title: t('logistics.wl10.feature.fastDelivery'), titleEn: "Fast Delivery", description: t('logistics.wl10.feature.fastDelivery.desc'), descriptionEn: "Complete delivery within 30 minutes, enhancing customer satisfaction" },
    { icon: MapPin, title: t('logistics.wl10.feature.preciseDelivery'), titleEn: "Precise Delivery", description: t('logistics.wl10.feature.preciseDelivery.desc'), descriptionEn: "Centimeter-level positioning ensures accurate delivery" },
    { icon: Timer, title: t('logistics.wl10.feature.efficientOp'), titleEn: "Efficient Operation", description: t('logistics.wl10.feature.efficientOp.desc'), descriptionEn: "Smart route planning optimizes delivery efficiency" },
    { icon: Shield, title: t('logistics.wl10.feature.safeReliable'), titleEn: "Safe & Reliable", description: t('logistics.wl10.feature.safeReliable.desc'), descriptionEn: "Multiple safety protection mechanisms ensure flight safety" },
    { icon: Zap, title: t('logistics.wl10.feature.quickDeploy'), titleEn: "Quick Deployment", description: t('logistics.wl10.feature.quickDeploy.desc'), descriptionEn: "Ready to fly in 5 minutes, quick response to demands" },
  ];

  const applications = [
    { zh: t('logistics.wl10.app.lastMile'), en: "Last-Mile Urban Delivery" },
    { zh: t('logistics.wl10.app.instantDelivery'), en: "Instant Delivery Service" },
    { zh: t('logistics.wl10.app.foodDelivery'), en: "Food Delivery" },
    { zh: t('logistics.wl10.app.medicalSupply'), en: "Medical Supply Delivery" },
    { zh: t('logistics.wl10.app.ecommerce'), en: "E-commerce Logistics" },
    { zh: t('logistics.wl10.app.expressDocument'), en: "Express Document Delivery" },
  ];

  return (
    <ProductDetailTemplate
      seoTitle={t('logistics.wl10.seoTitle')}
      seoDescription={t('logistics.wl10.seoDescription')}
      seoKeywords={t('logistics.wl10.seoKeywords')}
      breadcrumbs={[
        { label: t('nav.home'), labelEn: "Home", path: "/" },
        { label: t('nav.products.logistics'), labelEn: "Logistics Drones", path: "/products/logistics" },
        { label: t('logistics.wl10.name'), labelEn: "WL-10 Drone" },
      ]}
      heroTitle={t('logistics.wl10.name')}
      heroTitleEn="WL-10 Logistics Drone"
      heroDescription={t('logistics.wl10.description')}
      heroDescriptionEn="Lightweight logistics platform for last-mile urban delivery. Quick response to instant delivery demands, ideal for urban logistics."
      heroImage="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1200&q=80"
      heroHighlight={{ value: "10kg", label: t('specs.maxPayload'), labelEn: "Max Payload" }}
      backLink={{ label: t('common.backTo') + t('nav.products.logistics'), labelEn: "Back to Logistics", path: "/products/logistics" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle={t('logistics.ctaTitle').replace('{{model}}', 'WL-10')}
      ctaTitleEn="Learn More About WL-10 Solutions"
      ctaDescription={t('logistics.ctaDescription')}
      ctaDescriptionEn="Contact our professional team for customized configuration and detailed quotation"
    />
  );
};

export default WL10;
