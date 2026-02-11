import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Camera, Settings, Shield, Cpu, Zap, Wind } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const X650 = () => {
  const { t } = useLanguage();

  const specs = [
    { label: t('specs.wheelbase'), value: "650mm" },
    { label: t('specs.maxPayload'), value: "2kg" },
    { label: t('specs.flightTime'), value: t('multiRotor.x650.spec.flightTime') },
    { label: t('specs.windResistance'), value: t('multiRotor.x650.spec.windResistance') },
    { label: t('specs.flightSpeed'), value: "54km/h" },
    { label: t('specs.controlRange'), value: "5km" },
    { label: t('specs.operatingTemp'), value: "-20°C~50°C" },
    { label: t('specs.protection'), value: "IP54" },
  ];

  const features = [
    { icon: Camera, title: t('multiRotor.features.compactPortable'), description: t('multiRotor.features.compactPortableDesc') },
    { icon: Settings, title: t('multiRotor.features.quickDeploy'), description: t('multiRotor.features.quickDeployDesc') },
    { icon: Shield, title: t('multiRotor.features.stableReliable'), description: t('multiRotor.features.stableReliableDesc') },
    { icon: Cpu, title: t('multiRotor.features.smartControl'), description: t('multiRotor.features.smartControlDesc') },
    { icon: Zap, title: t('multiRotor.features.longEndurance'), description: t('multiRotor.features.longEnduranceDesc') },
    { icon: Wind, title: t('multiRotor.features.windResistant'), description: t('multiRotor.features.windResistantDesc') },
  ];

  const applications = [
    t('multiRotor.applications.routineInspection'),
    t('multiRotor.applications.dataCollection'),
    t('multiRotor.applications.fieldSurvey'),
    t('multiRotor.applications.smallMapping'),
    t('multiRotor.applications.securityPatrol'),
    t('multiRotor.applications.training'),
  ];

  return (
    <ProductDetailTemplate
      seoTitle={t('multiRotor.x650.seoTitle')}
      seoDescription={t('multiRotor.x650.seoDescription')}
      seoKeywords={t('multiRotor.x650.seoKeywords')}
      breadcrumbs={[
        { label: t('nav.home'), path: "/" },
        { label: t('nav.products.multiRotor'), path: "/products/multi-rotor" },
        { label: t('multiRotor.x650.name') },
      ]}
      heroTitle={t('multiRotor.x650.name')}
      heroDescription={t('multiRotor.x650.description')}
      heroImage="https://images.unsplash.com/photo-1506947411487-a56738267384?w=1200&q=80"
      heroHighlight={{ value: "650mm", label: t('specs.wheelbase') }}
      backLink={{ label: t('common.backTo') + t('nav.products.multiRotor'), path: "/products/multi-rotor" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle={t('multiRotor.x650.ctaTitle')}
      ctaDescription={t('multiRotor.x650.ctaDescription')}
    />
  );
};

export default X650;
