import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Package, Truck, MapPin, Timer, Shield, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WL10 = () => {
  const { t } = useLanguage();

  const specs = [
    { label: t('specs.maxPayload'), value: "10kg" },
    { label: t('logistics.specs.range'), value: "30km" },
    { label: t('logistics.specs.cruiseSpeed'), value: "60km/h" },
    { label: t('specs.flightTime'), value: t('logistics.wl10.spec.flightTime') },
    { label: t('logistics.specs.deliveryAccuracy'), value: "±10cm" },
    { label: t('specs.operatingTemp'), value: "-20°C~45°C" },
    { label: t('specs.windResistance'), value: t('logistics.wl10.spec.windResistance') },
    { label: t('logistics.specs.cargoVolume'), value: "20L" },
  ];

  const features = [
    { icon: Package, title: t('logistics.wl10.feature.lightPayload'), description: t('logistics.wl10.feature.lightPayload.desc') },
    { icon: Truck, title: t('logistics.wl10.feature.fastDelivery'), description: t('logistics.wl10.feature.fastDelivery.desc') },
    { icon: MapPin, title: t('logistics.wl10.feature.preciseDelivery'), description: t('logistics.wl10.feature.preciseDelivery.desc') },
    { icon: Timer, title: t('logistics.wl10.feature.efficientOp'), description: t('logistics.wl10.feature.efficientOp.desc') },
    { icon: Shield, title: t('logistics.wl10.feature.safeReliable'), description: t('logistics.wl10.feature.safeReliable.desc') },
    { icon: Zap, title: t('logistics.wl10.feature.quickDeploy'), description: t('logistics.wl10.feature.quickDeploy.desc') },
  ];

  const applications = [
    t('logistics.wl10.app.lastMile'),
    t('logistics.wl10.app.instantDelivery'),
    t('logistics.wl10.app.foodDelivery'),
    t('logistics.wl10.app.medicalSupply'),
    t('logistics.wl10.app.ecommerce'),
    t('logistics.wl10.app.expressDocument'),
  ];

  return (
    <ProductDetailTemplate
      seoTitle={t('logistics.wl10.seoTitle')}
      seoDescription={t('logistics.wl10.seoDescription')}
      seoKeywords={t('logistics.wl10.seoKeywords')}
      breadcrumbs={[
        { label: t('nav.home'), path: "/" },
        { label: t('nav.products.logistics'), path: "/products/logistics" },
        { label: t('logistics.wl10.name') },
      ]}
      heroTitle={t('logistics.wl10.name')}
      heroDescription={t('logistics.wl10.description')}
      heroImage="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1200&q=80"
      heroHighlight={{ value: "10kg", label: t('specs.maxPayload') }}
      backLink={{ label: t('common.backTo') + t('nav.products.logistics'), path: "/products/logistics" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle={t('logistics.ctaTitle').replace('{{model}}', 'WL-10')}
      ctaDescription={t('logistics.ctaDescription')}
      relatedProducts={[
        { label: 'WL-20', path: '/products/logistics/wl-20', description: t('logistics.wl20.description') },
        { label: 'WL-30', path: '/products/logistics/wl-30', description: t('logistics.wl30.description') },
        { label: t('accessory.digitalFpv'), path: '/products/accessories/digital-fpv' },
        { label: t('accessory.fc'), path: '/products/accessories/fc-esc' },
      ]}
      relatedApplications={[
        { label: t('app.logistics'), path: '/applications/logistics' },
        { label: t('app.power'), path: '/applications/power-inspection' },
      ]}
    />
  );
};

export default WL10;
