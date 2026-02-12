import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Radio, Weight, Clock, Navigation, Thermometer, Zap, Sun, Camera } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import th200Hero from "@/assets/products/th-200-hero.png";

const TH200 = () => {
  const { t } = useLanguage();

  const specs = [
    { label: t('specs.wheelbase'), value: "1200mm" },
    { label: t('specs.maxPayload'), value: "10kg" },
    { label: t('tethered.th200.spec.unfoldedSize'), value: "1000×1000×600mm" },
    { label: t('tethered.th200.spec.foldedSize'), value: "620×620×600mm" },
    { label: t('tethered.th200.spec.bodyWeight'), value: t('tethered.th200.spec.bodyWeight.value') },
    { label: t('tethered.th200.spec.maxTakeoffWeight'), value: "29kg" },
    { label: t('tethered.th200.spec.maxFlightSpeed'), value: t('tethered.th200.spec.maxFlightSpeed.value') },
    { label: t('specs.windResistance'), value: t('tethered.th200.spec.windResistance.value') },
    { label: t('specs.flightTime'), value: t('tethered.th200.spec.flightTime.value') },
    { label: t('tethered.th200.spec.maxFlightAltitude'), value: t('tethered.th200.spec.maxFlightAltitude.value') },
    { label: t('tethered.th200.spec.maxElevation'), value: t('tethered.th200.spec.maxElevation.value') },
    { label: t('specs.controlRange'), value: "15km" },
    { label: t('tethered.th200.spec.positionAccuracy'), value: t('tethered.th200.spec.positionAccuracy.value') },
    { label: t('tethered.th200.spec.waterproof'), value: t('tethered.th200.spec.waterproof.value') },
    { label: t('specs.operatingTemp'), value: "-20°C ~ 55°C" },
  ];

  const features = [
    { icon: Radio, title: t('tethered.th200.feature.commRelay'), description: t('tethered.th200.feature.commRelay.desc') },
    { icon: Weight, title: t('tethered.th200.feature.payload'), description: t('tethered.th200.feature.payload.desc') },
    { icon: Clock, title: t('tethered.th200.feature.flight24h'), description: t('tethered.th200.feature.flight24h.desc') },
    { icon: Navigation, title: t('tethered.th200.feature.highPrecision'), description: t('tethered.th200.feature.highPrecision.desc') },
    { icon: Thermometer, title: t('tethered.th200.feature.cooling'), description: t('tethered.th200.feature.cooling.desc') },
    { icon: Zap, title: t('tethered.th200.feature.powerful'), description: t('tethered.th200.feature.powerful.desc') },
    { icon: Sun, title: t('tethered.th200.feature.lighting'), description: t('tethered.th200.feature.lighting.desc') },
    { icon: Camera, title: t('tethered.th200.feature.multiPayload'), description: t('tethered.th200.feature.multiPayload.desc') },
  ];

  const applications = [
    t('tethered.th200.app.emergencyLighting'),
    t('tethered.th200.app.commRelay'),
    t('tethered.th200.app.securityPatrol'),
    t('tethered.th200.app.eventSecurity'),
    t('tethered.th200.app.fireRescue'),
    t('tethered.th200.app.remoteCoverage'),
  ];

  return (
    <ProductDetailTemplate
      seoTitle={t('tethered.th200.seoTitle')}
      seoDescription={t('tethered.th200.seoDescription')}
      seoKeywords={t('tethered.th200.seoKeywords')}
      breadcrumbs={[
        { label: t('nav.home'), path: "/" },
        { label: t('nav.products.tethered'), path: "/products/tethered" },
        { label: t('tethered.th200.name') },
      ]}
      heroTitle={t('tethered.th200.name')}
      heroDescription={t('tethered.th200.description')}
      heroImage={th200Hero}
      heroHighlight={{ value: "24h", label: t('tethered.th200.highlight') }}
      backLink={{ label: t('common.backTo') + t('nav.products.tethered'), path: "/products/tethered" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle={t('tethered.ctaTitle').replace('{{model}}', 'TH-200')}
      ctaDescription={t('tethered.ctaDescription')}
      relatedProducts={[
        { label: 'TH-300', path: '/products/tethered/th-300' },
        { label: t('accessory.digitalFpv'), path: '/products/accessories/digital-fpv' },
        { label: t('accessory.gimbal'), path: '/products/accessories/gimbal' },
      ]}
      relatedApplications={[
        { label: t('app.tethered'), path: '/applications/tethered' },
        { label: t('app.firefighting'), path: '/applications/firefighting' },
        { label: t('app.power'), path: '/applications/power-inspection' },
      ]}
    />
  );
};

export default TH200;
