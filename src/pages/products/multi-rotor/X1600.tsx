import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Camera, Settings, Shield, Cpu, Zap, Wind } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const X1600 = () => {
  const { t } = useLanguage();

  const specs = [
    { label: t('specs.wheelbase'), value: "1600mm" },
    { label: t('specs.maxPayload'), value: "20kg" },
    { label: t('specs.flightTime'), value: t('multiRotor.x1600.spec.flightTime') },
    { label: t('specs.windResistance'), value: t('multiRotor.x1600.spec.windResistance') },
    { label: t('specs.flightSpeed'), value: "54km/h" },
    { label: t('specs.controlRange'), value: "10km" },
    { label: t('specs.operatingTemp'), value: "-20°C~50°C" },
    { label: t('specs.protection'), value: "IP54" },
  ];

  const features = [
    { icon: Camera, title: t('multiRotor.x1600.feature.ultraHeavy'), description: t('multiRotor.x1600.feature.ultraHeavy.desc') },
    { icon: Settings, title: t('multiRotor.x1600.feature.customSolutions'), description: t('multiRotor.x1600.feature.customSolutions.desc') },
    { icon: Shield, title: t('multiRotor.x1600.feature.industrialQuality'), description: t('multiRotor.x1600.feature.industrialQuality.desc') },
    { icon: Cpu, title: t('multiRotor.x1600.feature.highPrecision'), description: t('multiRotor.x1600.feature.highPrecision.desc') },
    { icon: Zap, title: t('multiRotor.x1600.feature.highPower'), description: t('multiRotor.x1600.feature.highPower.desc') },
    { icon: Wind, title: t('multiRotor.x1600.feature.ultraStability'), description: t('multiRotor.x1600.feature.ultraStability.desc') },
  ];

  const applications = [
    t('multiRotor.x1600.app.mapping'),
    t('multiRotor.x1600.app.cargoDelivery'),
    t('multiRotor.x1600.app.specialOps'),
    t('multiRotor.x1600.app.scientificResearch'),
    t('multiRotor.x1600.app.heavyAerial'),
    t('multiRotor.x1600.app.industrialInspection'),
  ];

  return (
    <ProductDetailTemplate
      seoTitle={t('multiRotor.x1600.seoTitle')}
      seoDescription={t('multiRotor.x1600.seoDescription')}
      seoKeywords={t('multiRotor.x1600.seoKeywords')}
      breadcrumbs={[
        { label: t('nav.home'), path: "/" },
        { label: t('product.multiRotor'), path: "/products/multi-rotor" },
        { label: t('multiRotor.x1600.name') },
      ]}
      heroTitle={t('multiRotor.x1600.name')}
      heroDescription={t('multiRotor.x1600.description')}
      heroImage="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1200&q=80"
      heroHighlight={{ value: "20kg", label: t('specs.maxPayload') }}
      backLink={{ label: t('common.backTo') + t('product.multiRotor'), path: "/products/multi-rotor" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle={t('multiRotor.ctaTitle').replace('{{model}}', 'X1600')}
      ctaDescription={t('multiRotor.ctaDescription')}
    />
  );
};

export default X1600;
