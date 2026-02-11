import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Clock, Zap, Shield, Radio, Eye, Settings, Plane, Volume2, Lightbulb, Flame, Battery } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import th300Drone from "@/assets/products/th-300-drone.png";

const TH300 = () => {
  const { t } = useLanguage();

  const specs = [
    { label: t('tethered.th300.spec.motorWheelbase'), value: "1380mm" },
    { label: t('tethered.th200.spec.unfoldedSize'), value: "1480×1480×550mm" },
    { label: t('tethered.th200.spec.foldedSize'), value: "500×500×550mm" },
    { label: t('tethered.th300.spec.propellerSize'), value: t('tethered.th300.spec.propellerSize.value') },
    { label: t('specs.maxPayload'), value: "≥20KG" },
    { label: t('tethered.th300.spec.standardFlightTime'), value: t('tethered.th300.spec.standardFlightTime.value') },
    { label: t('tethered.th300.spec.chargingTime'), value: t('tethered.th300.spec.chargingTime.value') },
    { label: t('specs.windResistance'), value: t('tethered.th300.spec.windResistance.value') },
    { label: t('tethered.th300.spec.flightElevation'), value: t('tethered.th300.spec.flightElevation.value') },
    { label: t('tethered.th300.spec.flightAltitude'), value: t('tethered.th300.spec.flightAltitude.value') },
    { label: t('specs.controlRange'), value: "20KM" },
    { label: t('tethered.th300.spec.hoverAccuracy'), value: t('tethered.th300.spec.hoverAccuracy.value') },
    { label: t('specs.protection'), value: t('tethered.th300.spec.protection.value') },
    { label: t('tethered.th300.spec.bodyMaterial'), value: t('tethered.th300.spec.bodyMaterial.value') },
    { label: t('tethered.th300.spec.deployTime'), value: t('tethered.th300.spec.deployTime.value') },
    { label: t('specs.operatingTemp'), value: t('tethered.th300.spec.operatingTemp.value') },
  ];

  const features = [
    { icon: Plane, title: t('tethered.th300.feature.heavyPayload'), description: t('tethered.th300.feature.heavyPayload.desc') },
    { icon: Shield, title: t('tethered.th300.feature.ip56'), description: t('tethered.th300.feature.ip56.desc') },
    { icon: Radio, title: t('tethered.th300.feature.remoteControl'), description: t('tethered.th300.feature.remoteControl.desc') },
    { icon: Clock, title: t('tethered.th300.feature.longEndurance'), description: t('tethered.th300.feature.longEndurance.desc') },
    { icon: Settings, title: t('tethered.th300.feature.quickDeploy'), description: t('tethered.th300.feature.quickDeploy.desc') },
    { icon: Eye, title: t('tethered.th300.feature.highAltitude'), description: t('tethered.th300.feature.highAltitude.desc') },
    { icon: Lightbulb, title: t('tethered.th300.feature.searchlight'), description: t('tethered.th300.feature.searchlight.desc') },
    { icon: Volume2, title: t('tethered.th300.feature.speaker'), description: t('tethered.th300.feature.speaker.desc') },
    { icon: Flame, title: t('tethered.th300.feature.fireBall'), description: t('tethered.th300.feature.fireBall.desc') },
    { icon: Battery, title: t('tethered.th300.feature.solidBattery'), description: t('tethered.th300.feature.solidBattery.desc') },
  ];

  const applications = [
    t('tethered.th300.app.patrolMonitoring'),
    t('tethered.th300.app.emergencyAnnouncement'),
    t('tethered.th300.app.nightLighting'),
    t('tethered.th300.app.forestFirefighting'),
    t('tethered.th300.app.securityPatrol'),
    t('tethered.th300.app.searchRescue'),
  ];

  return (
    <ProductDetailTemplate
      seoTitle={t('tethered.th300.seoTitle')}
      seoDescription={t('tethered.th300.seoDescription')}
      seoKeywords={t('tethered.th300.seoKeywords')}
      breadcrumbs={[
        { label: t('nav.home'), path: "/" },
        { label: t('nav.products.tethered'), path: "/products/tethered" },
        { label: t('tethered.th300.name') },
      ]}
      heroTitle={t('tethered.th300.name')}
      heroDescription={t('tethered.th300.description')}
      heroImage={th300Drone}
      heroHighlight={{ value: "20KG", label: t('specs.maxPayload') }}
      backLink={{ label: t('common.backTo') + t('nav.products.tethered'), path: "/products/tethered" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle={t('tethered.ctaTitle').replace('{{model}}', 'TH-300')}
      ctaDescription={t('tethered.ctaDescription')}
    />
  );
};

export default TH300;
