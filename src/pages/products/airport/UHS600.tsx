import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Mail, Zap, Cloud, Wifi, Settings, Shield, Box } from "lucide-react";
import { Link } from "react-router-dom";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";

const UHS600 = () => {
  const { t } = useLanguage();

  const specs = [
    { labelKey: 'airport.uhs400p.spec.droneWeight', value: "≤25kg" },
    { labelKey: 'airport.uhs400p.spec.chargingPower', value: "600W" },
    { labelKey: 'airport.uhs400p.spec.chargingTime', value: "<40min" },
    { labelKey: 'airport.uhs600.spec.footprint', value: "2m²" },
    { labelKey: 'airport.uhs400p.spec.deployTime', value: "<10min" },
    { labelKey: 'airport.uhs400p.spec.protection', value: "IP65" },
    { labelKey: 'airport.uhs400p.spec.operatingTemp', value: "-20°C~55°C" },
    { labelKey: 'airport.uhs400p.spec.communication', value: "4G/5G" },
    { labelKey: 'airport.uhs600.spec.positionAccuracy', value: "±5cm (RTK)" },
  ];

  const features = [
    { icon: Box, titleKey: 'airport.uhs600.feature.compact', descKey: 'airport.uhs600.feature.compact.desc' },
    { icon: Zap, titleKey: 'airport.uhs600.feature.efficientCharge', descKey: 'airport.uhs600.feature.efficientCharge.desc' },
    { icon: Cloud, titleKey: 'airport.uhs400p.feature.allWeather', descKey: 'airport.uhs400p.feature.allWeather.desc' },
    { icon: Wifi, titleKey: 'airport.uhs600.feature.remoteManage', descKey: 'airport.uhs600.feature.remoteManage.desc' },
    { icon: Shield, titleKey: 'airport.uhs600.feature.safeStable', descKey: 'airport.uhs600.feature.safeStable.desc' },
    { icon: Settings, titleKey: 'airport.uhs600.feature.quickDeploy', descKey: 'airport.uhs600.feature.quickDeploy.desc' },
  ];

  const applications = [
    'airport.uhs600.app.cityInspection',
    'airport.uhs600.app.mediumSolar',
    'airport.uhs600.app.distribution',
    'airport.uhs600.app.urbanSecurity',
    'airport.uhs600.app.smartPark',
    'airport.uhs600.app.waterFacility',
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="bg-secondary py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">{t('airport.common.home')}</Link>
              <span>/</span>
              <Link to="/products/airport" className="hover:text-accent">{t('airport.common.airportSystems')}</Link>
              <span>/</span>
              <span className="text-foreground">{t('airport.uhs600.name')}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <BackButton to="/products/airport" label={t('airport.common.backToAirport')} />
                <h1 className="text-3xl md:text-5xl font-bold mb-6">
                  {t('airport.uhs600.name')}
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {t('airport.uhs600.hero')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                    {t('airport.common.getQuote')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button className="bg-primary/10 border border-primary/30 text-foreground hover:bg-primary/20 px-8 py-6 text-lg">
                    <Phone className="w-5 h-5 mr-2" />
                    {t('airport.common.callUs')}
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&q=80"
                  alt={t('airport.uhs600.name')}
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground px-6 py-3 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold">2m²</div>
                  <div className="text-sm">{t('airport.uhs600.feature.compact')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">
              {t('airport.common.coreAdvantages')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{t(feature.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(feature.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specs */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">
              {t('airport.common.techSpecs')}
            </h2>
            <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-card overflow-hidden">
              <table className="w-full">
                <tbody>
                  {specs.map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-secondary/30' : ''}>
                      <td className="px-6 py-4 font-medium border-b border-border/50">
                        {t(spec.labelKey)}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground border-b border-border/50">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">
              {t('airport.common.appScenarios')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {applications.map((appKey, index) => (
                <div key={index} className="flex items-center gap-3 bg-card p-4 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>{t(appKey)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-6">
              {t('airport.uhs600.ctaTitle')}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              {t('airport.common.contactTeam')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg">
                <Mail className="w-5 h-5 mr-2" />
                {t('airport.common.contactNow')}
              </Button>
              <a href="tel:+8617674048404">
                <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-10 py-6 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  17674048404
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default UHS600;
