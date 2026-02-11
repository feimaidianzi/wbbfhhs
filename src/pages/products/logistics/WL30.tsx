import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Package, Truck, MapPin, Timer, Shield, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WL30 = () => {
  const { t } = useLanguage();

  const specs = [
    { label: t('specs.maxPayload'), value: "30kg" },
    { label: t('logistics.specs.range'), value: "80km" },
    { label: t('logistics.specs.cruiseSpeed'), value: "100km/h" },
    { label: t('specs.flightTime'), value: t('logistics.wl30.spec.flightTime') },
    { label: t('logistics.specs.deliveryAccuracy'), value: "±5cm" },
    { label: t('specs.operatingTemp'), value: "-20°C~45°C" },
    { label: t('specs.windResistance'), value: t('logistics.wl30.spec.windResistance') },
    { label: t('logistics.specs.cargoVolume'), value: "60L" },
  ];

  const features = [
    { icon: Package, title: t('logistics.wl30.feature.heavyPayload'), description: t('logistics.wl30.feature.heavyPayload.desc') },
    { icon: Truck, title: t('logistics.wl30.feature.longRange'), description: t('logistics.wl30.feature.longRange.desc') },
    { icon: MapPin, title: t('logistics.wl30.feature.precisePosition'), description: t('logistics.wl30.feature.precisePosition.desc') },
    { icon: Timer, title: t('logistics.wl30.feature.ultraEndurance'), description: t('logistics.wl30.feature.ultraEndurance.desc') },
    { icon: Shield, title: t('logistics.wl30.feature.strongWind'), description: t('logistics.wl30.feature.strongWind.desc') },
    { icon: Zap, title: t('logistics.wl30.feature.quickResponse'), description: t('logistics.wl30.feature.quickResponse.desc') },
  ];

  const applications = [
    t('logistics.wl30.app.remoteDelivery'),
    t('logistics.wl30.app.emergencyDrop'),
    t('logistics.wl30.app.mountainTransport'),
    t('logistics.wl30.app.islandDelivery'),
    t('logistics.wl30.app.disasterRelief'),
    t('logistics.wl30.app.agriculturalExport'),
  ];

  return (
    <ProductDetailTemplate
      seoTitle={t('logistics.wl30.seoTitle')}
      seoDescription={t('logistics.wl30.seoDescription')}
      seoKeywords={t('logistics.wl30.seoKeywords')}
      breadcrumbs={[
        { label: t('nav.home'), path: "/" },
        { label: t('nav.products.logistics'), path: "/products/logistics" },
        { label: t('logistics.wl30.name') },
      ]}
      heroTitle={t('logistics.wl30.name')}
      heroDescription={t('logistics.wl30.description')}
      heroImage="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80"
      heroHighlight={{ value: "30kg", label: t('specs.maxPayload') }}
      backLink={{ label: t('common.backTo') + t('nav.products.logistics'), path: "/products/logistics" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle={t('logistics.ctaTitle').replace('{{model}}', 'WL-30')}
      ctaDescription={t('logistics.ctaDescription')}
    />
  );
};

export default WL30;
