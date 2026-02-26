import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Package, Truck, MapPin, Timer, Shield, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import wl20Img from "@/assets/seo/logistics-wl20.jpg";

const WL20 = () => {
  const { t } = useLanguage();

  const specs = [
    { label: t('specs.maxPayload'), value: "20kg" },
    { label: t('logistics.specs.range'), value: "50km" },
    { label: t('logistics.specs.cruiseSpeed'), value: "80km/h" },
    { label: t('specs.flightTime'), value: t('logistics.wl20.spec.flightTime') },
    { label: t('logistics.specs.deliveryAccuracy'), value: "±5cm" },
    { label: t('specs.operatingTemp'), value: "-20°C~45°C" },
    { label: t('specs.windResistance'), value: t('logistics.wl20.spec.windResistance') },
    { label: t('logistics.specs.cargoVolume'), value: "40L" },
  ];

  const features = [
    { icon: Package, title: t('logistics.wl20.feature.mediumPayload'), description: t('logistics.wl20.feature.mediumPayload.desc') },
    { icon: Truck, title: t('logistics.wl20.feature.intercityDelivery'), description: t('logistics.wl20.feature.intercityDelivery.desc') },
    { icon: MapPin, title: t('logistics.wl20.feature.highPrecision'), description: t('logistics.wl20.feature.highPrecision.desc') },
    { icon: Timer, title: t('logistics.wl20.feature.longEndurance'), description: t('logistics.wl20.feature.longEndurance.desc') },
    { icon: Shield, title: t('logistics.wl20.feature.allWeather'), description: t('logistics.wl20.feature.allWeather.desc') },
    { icon: Zap, title: t('logistics.wl20.feature.smartNavigation'), description: t('logistics.wl20.feature.smartNavigation.desc') },
  ];

  const applications = [
    t('logistics.wl20.app.intercityExpress'),
    t('logistics.wl20.app.medicalTransport'),
    t('logistics.wl20.app.freshProduct'),
    t('logistics.wl20.app.agricultural'),
    t('logistics.wl20.app.industrialParts'),
    t('logistics.wl20.app.emergencySupply'),
  ];

  return (
    <ProductDetailTemplate
      seoTitle={t('logistics.wl20.seoTitle')}
      seoDescription={t('logistics.wl20.seoDescription')}
      seoKeywords={t('logistics.wl20.seoKeywords')}
      breadcrumbs={[
        { label: t('nav.home'), path: "/" },
        { label: t('nav.products.logistics'), path: "/products/logistics" },
        { label: t('logistics.wl20.name') },
      ]}
      heroTitle={t('logistics.wl20.name')}
      heroDescription={t('logistics.wl20.description')}
      heroImage={wl20Img}
      heroHighlight={{ value: "20kg", label: t('specs.maxPayload') }}
      backLink={{ label: t('common.backTo') + t('nav.products.logistics'), path: "/products/logistics" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle={t('logistics.ctaTitle').replace('{{model}}', 'WL-20')}
      ctaDescription={t('logistics.ctaDescription')}
      relatedProducts={[
        { label: 'WL-10', path: '/products/logistics/wl-10' },
        { label: 'WL-30', path: '/products/logistics/wl-30' },
        { label: t('accessory.digitalFpv'), path: '/products/accessories/digital-fpv' },
      ]}
      relatedApplications={[
        { label: t('app.logistics'), path: '/applications/logistics' },
      ]}
    />
  );
};

export default WL20;
