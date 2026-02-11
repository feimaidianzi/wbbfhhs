import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LangLink as Link } from "@/components/LangLink";
import { BackButton } from "@/components/BackButton";
import { LayoutGrid, Droplets, Settings, Cpu, Zap, Truck, Monitor } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import th100Hero from "@/assets/products/th-100-hero.png";
import th100GroundUnit from "@/assets/products/th-100-ground-unit.png";
import th100CleaningModes from "@/assets/products/th-100-cleaning-modes.png";
import th100Telescopic from "@/assets/products/th-100-telescopic.png";
import th100Psdk from "@/assets/products/th-100-psdk.png";
import th100Drone from "@/assets/products/th-100-drone.png";
import th100Controller from "@/assets/products/th-100-controller.png";
import th100PowerUnit from "@/assets/products/th-100-power-unit.png";
import th100WashSystem from "@/assets/products/th-100-wash-system.png";
import th100CleaningSystem from "@/assets/products/th-100-cleaning-system.png";
import th100Tower from "@/assets/products/th-100-tower.jpg";
import th100Insulator from "@/assets/products/th-100-insulator.jpg";
import th100Building from "@/assets/products/th-100-building.jpg";
import th100Solar from "@/assets/products/th-100-solar.jpg";
import th100Wash1 from "@/assets/products/th-100-wash-1.png";
import th100Wash2 from "@/assets/products/th-100-wash-2.png";
import th100Wash3 from "@/assets/products/th-100-wash-3.png";
import th100Before from "@/assets/products/th-100-before.png";

const TH100 = () => {
  const { t } = useLanguage();

  const highlights = [{
    icon: LayoutGrid,
    title: t('th100.highlight.multiMode'),
    subtitle: t('th100.highlight.multiMode.sub')
  }, {
    icon: Droplets,
    title: "195 Bar",
    subtitle: t('th100.highlight.pressure')
  }, {
    icon: Settings,
    title: "IP55",
    subtitle: t('th100.highlight.protection')
  }, {
    icon: Cpu,
    title: "PSDK",
    subtitle: t('th100.highlight.psdk')
  }, {
    icon: Zap,
    title: "4-6kW",
    subtitle: t('th100.highlight.power')
  }, {
    icon: Truck,
    title: "50-100m",
    subtitle: t('th100.highlight.height')
  }];

  const leftSpecs = [{
    label: t('th100.spec.weight'),
    value: "15Kg"
  }, {
    label: t('th100.spec.protection'),
    value: "IP55"
  }, {
    label: t('th100.spec.operatingTemp'),
    value: "-30°C ~ 55°C"
  }, {
    label: t('th100.spec.humidity'),
    value: "5%~95%"
  }, {
    label: t('th100.spec.maxAltitude'),
    value: t('th100.spec.maxAltitude.value')
  }, {
    label: t('th100.spec.cableDurability'),
    value: t('th100.spec.cableDurability.value')
  }];

  const rightSpecs = [{
    label: t('th100.spec.workingHeight'),
    value: t('th100.spec.workingHeight.value')
  }, {
    label: t('th100.spec.maxPower'),
    value: "4KW / 6KW"
  }, {
    label: t('th100.spec.workingPressure'),
    value: "195 Bar"
  }, {
    label: t('th100.spec.pumpWaterproof'),
    value: "IPX5"
  }, {
    label: t('th100.spec.mobility'),
    value: t('th100.spec.mobility.value')
  }, {
    label: t('th100.spec.customization'),
    value: t('th100.spec.customization.value')
  }, {
    label: t('th100.spec.openSystem'),
    value: t('th100.spec.openSystem.value')
  }];

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO 
        title={t('th100.seo.title')} 
        description={t('th100.seo.description')} 
        keywords={t('th100.seo.keywords')} 
        path="/products/tethered/th-100"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-5" />
        
        <BackButton to="/products/tethered" label={t('th100.back')} />

        <div className="container mx-auto px-4 text-center pt-16 md:pt-20">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
            {t('th100.hero.title')}
          </h1>
          <div className="space-y-2 mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <p className="text-lg md:text-xl text-gray-300">
              {t('th100.hero.subtitle1')}
            </p>
            <p className="text-lg md:text-xl text-gray-300">
              {t('th100.hero.subtitle2')}
            </p>
          </div>

          <div className="max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <img src={th100Hero} alt={t('th100.hero.title')} className="w-full h-auto animate-float" />
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {highlights.map((item, index) => (
              <div key={index} className="group flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:from-gray-100 group-hover:to-gray-300 transition-all duration-300">
                  <item.icon className="w-10 h-10 md:w-12 md:h-12 text-gray-800" />
                </div>
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Pressure Tethered Cleaning System Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 animate-fade-in">
            {t('th100.section.cleaning.title')}
          </h2>
          <p className="text-center text-gray-400 max-w-4xl mx-auto mb-12 animate-fade-in leading-relaxed" style={{ animationDelay: "0.1s" }}>
            {t('th100.section.cleaning.desc')}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-blue-500 transition-colors">
              <img src={th100Drone} alt={t('th100.component.drone')} className="w-full h-48 object-contain mb-4" />
              <h4 className="text-white font-semibold text-center">{t('th100.component.drone')}</h4>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-blue-500 transition-colors">
              <img src={th100Controller} alt={t('th100.component.controller')} className="w-full h-48 object-contain mb-4" />
              <h4 className="text-white font-semibold text-center">{t('th100.component.controller')}</h4>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-blue-500 transition-colors">
              <img src={th100PowerUnit} alt={t('th100.component.powerUnit')} className="w-full h-48 object-contain mb-4" />
              <h4 className="text-white font-semibold text-center">{t('th100.component.powerUnit')}</h4>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-blue-500 transition-colors">
              <img src={th100WashSystem} alt={t('th100.component.washSystem')} className="w-full h-48 object-contain mb-4" />
              <h4 className="text-white font-semibold text-center">{t('th100.component.washSystem')}</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Ground Unit Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 animate-fade-in">
            {t('th100.section.specs.title')}
          </h2>
          
          <div className="max-w-5xl mx-auto mt-8">
            <p className="text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: "0.15s" }}>
              {t('th100.section.specs.desc')}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              {/* Left specs */}
              <div className="space-y-1">
                <div className="flex border-b border-gray-700 py-3">
                  <span className="text-gray-400 w-40">{t('th100.spec.description')}</span>
                  <span className="text-gray-300 flex-1">
                    {t('th100.spec.description.value')}
                  </span>
                </div>
                {leftSpecs.map((spec, index) => (
                  <div key={index} className="flex border-b border-gray-700 py-3">
                    <span className="text-gray-400 w-40">{spec.label}</span>
                    <span className="text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
              
              {/* Right specs */}
              <div className="space-y-1">
                {rightSpecs.map((spec, index) => (
                  <div key={index} className="flex border-b border-gray-700 py-3">
                    <span className="text-gray-400 w-32">{spec.label}</span>
                    <span className="text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cleaning Modes Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 animate-fade-in">
            {t('th100.section.modes.title')}
          </h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {t('th100.section.modes.desc')}
          </p>
          
          <div className="max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <img src={th100CleaningModes} alt={t('th100.section.modes.title')} className="w-full h-auto hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </section>

      {/* Telescopic Design Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 animate-fade-in">
            {t('th100.section.telescopic.title')}
          </h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {t('th100.section.telescopic.desc')}
          </p>
          
          <div className="max-w-5xl mx-auto animate-fade-in relative" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <img src={th100Telescopic} alt={t('th100.section.telescopic.title')} className="w-full h-auto" />
              <div className="absolute top-[15%] right-[5%] text-right">
                <p className="text-amber-500 font-semibold text-lg md:text-xl">
                  {t('th100.telescopic.maxLength')}
                </p>
              </div>
              <div className="absolute bottom-[20%] right-[5%] text-right">
                <p className="text-amber-500 font-semibold text-lg md:text-xl">
                  {t('th100.telescopic.minLength')}
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-8">
              <div className="text-center">
                <p className="text-gray-300">{t('th100.telescopic.maxLabel')}<span className="text-white font-bold">{t('th100.telescopic.maxValue')}</span></p>
                <p className="text-amber-500 text-sm">{t('th100.telescopic.maxNote')}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-300">{t('th100.telescopic.minLabel')}<span className="text-white font-bold">{t('th100.telescopic.minValue')}</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PSDK Control Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 animate-fade-in">
            {t('th100.section.psdk.title')}
          </h2>
          
          <div className="max-w-5xl mx-auto mt-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <img src={th100Psdk} alt={t('th100.section.psdk.title')} className="w-full h-auto hover:scale-105 transition-transform duration-500" />
            <div className="flex items-center justify-center gap-2 mt-8">
              <Monitor className="w-6 h-6 text-blue-400" />
              <p className="text-xl text-white">
                {t('th100.psdk.fpv')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cleaning Comparison Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 animate-fade-in">
            {t('th100.section.results.title')}
          </h2>
          
          <div className="max-w-6xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <img src={th100Wash1} alt={t('th100.wash.first')} className="w-full h-48 object-cover rounded-xl mb-4" />
                <p className="text-gray-400">{t('th100.wash.first')}</p>
                <p className="text-white font-semibold">{t('th100.wash.first.agent')}</p>
              </div>
              <div className="text-center">
                <img src={th100Wash2} alt={t('th100.wash.second')} className="w-full h-48 object-cover rounded-xl mb-4" />
                <p className="text-gray-400">{t('th100.wash.second')}</p>
                <p className="text-white font-semibold">{t('th100.wash.second.agent')}</p>
              </div>
              <div className="text-center">
                <img src={th100Wash3} alt={t('th100.wash.third')} className="w-full h-48 object-cover rounded-xl mb-4" />
                <p className="text-gray-400">{t('th100.wash.third')}</p>
                <p className="text-white font-semibold">{t('th100.wash.third.agent')}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <img src={th100Before} alt={t('th100.comparison.before')} className="w-full h-64 object-cover rounded-xl mb-4" />
                <p className="text-amber-500 font-semibold text-lg">{t('th100.comparison.before')}</p>
              </div>
              <div className="text-center">
                <img src={th100Before} alt={t('th100.comparison.after')} className="w-full h-64 object-cover rounded-xl mb-4" />
                <p className="text-green-500 font-semibold text-lg">{t('th100.comparison.after')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cleaning System Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 animate-fade-in">
            {t('th100.section.system.title')}
          </h2>
          <p className="text-center text-gray-300 max-w-4xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {t('th100.section.system.desc')}
          </p>
          
          <div className="max-w-4xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <img src={th100CleaningSystem} alt={t('th100.section.system.title')} className="w-full h-auto" />
          </div>

          {/* Application Scenarios */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="group text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="overflow-hidden rounded-xl mb-4">
                <img src={th100Tower} alt={t('th100.app.tower')} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-white font-semibold">{t('th100.app.tower')}</p>
            </div>
            <div className="group text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="overflow-hidden rounded-xl mb-4">
                <img src={th100Insulator} alt={t('th100.app.insulator')} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-white font-semibold">{t('th100.app.insulator')}</p>
            </div>
            <div className="group text-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="overflow-hidden rounded-xl mb-4">
                <img src={th100Building} alt={t('th100.app.building')} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-white font-semibold">{t('th100.app.building')}</p>
            </div>
            <div className="group text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="overflow-hidden rounded-xl mb-4">
                <img src={th100Solar} alt={t('th100.app.solar')} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-white font-semibold">{t('th100.app.solar')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in">
            {t('th100.cta.title')}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {t('th100.cta.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Link to="/contact" className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              {t('common.contactNow')}
            </Link>
            <Link to="/products/tethered" className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              {t('common.viewMoreProducts')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TH100;
