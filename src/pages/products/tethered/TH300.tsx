import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LangLink as Link } from "@/components/LangLink";
import { BackButton } from "@/components/BackButton";
import { FloatingContact } from "@/components/FloatingContact";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageStructuredData } from "@/components/PageStructuredData";
import { useLanguage } from "@/contexts/LanguageContext";
import { Weight, Clock, Mountain, Sun, Radio, Leaf, Wifi, Shield, Zap, Settings, Gauge, Cable, Monitor, Eye, ChevronRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

import heroImg from "@/assets/products/th300-hero-mountain.png";
import payloadImg from "@/assets/products/th300-payload-30kg-clean.png";
import lightingImg from "@/assets/products/th300-lighting-clean.png";
import commRelayImg from "@/assets/products/th300-comm-relay-clean.png";
import envMonitorImg from "@/assets/products/th300-env-monitor-clean.png";
import fiberBtImg from "@/assets/products/th300-fiber-bt-clean.png";
import flight24hImg from "@/assets/products/th300-24h-flight-clean.png";
import altitude200mImg from "@/assets/products/th300-200m-altitude-clean.png";
import safetyImg from "@/assets/products/th300-safety-design-clean.png";
import voltageImg from "@/assets/products/th300-voltage-adjust-clean.png";
import droneDisplayImg from "@/assets/products/th300-drone-display-clean.png";

import firefightingImg from "@/assets/seo/firefighting-aerial-response.jpg";
import emergencyImg from "@/assets/seo/emergency-rescue-night.jpg";
import rescueImg from "@/assets/seo/emergency-rescue.jpg";
import powerImg from "@/assets/seo/power-transmission-inspection.jpg";

const TH300 = () => {
  const { t } = useLanguage();

  // Hero highlights
  const heroStats = [
    { value: "24h", label: t('tethered.th300.k809') },
    { value: "30kg", label: t('tethered.th300.k810') },
    { value: "200m", label: t('tethered.th200.k722') },
  ];

  // Core features - from reference images
  const coreFeatures = [
    {
      icon: Weight,
      value: "30",
      unit: "kg",
      title: t('tethered.th300.k811'),
      desc: t('tethered.th300.k812'),
      image: payloadImg,
    },
    {
      icon: Clock,
      value: "24",
      unit: "h",
      title: t('tethered.th300.k813'),
      desc: t('tethered.th300.k814'),
      image: flight24hImg,
    },
    {
      icon: Mountain,
      value: "200",
      unit: "m",
      title: t('tethered.th300.k815'),
      desc: t('tethered.th300.k816'),
      image: altitude200mImg,
    },
  ];

  // Payload/application modules
  const payloadModules = [
    {
      icon: Sun,
      title: t('tethered.th300.k817'),
      desc: t('tethered.th300.k818'),
      image: lightingImg,
    },
    {
      icon: Radio,
      title: t('tethered.th200.k720'),
      desc: t('tethered.th300.k819'),
      image: commRelayImg,
    },
    {
      icon: Leaf,
      title: t('tethered.th300.k820'),
      desc: t('tethered.th300.k821'),
      image: envMonitorImg,
    },
    {
      icon: Wifi,
      title: t('tethered.th300.k822'),
      desc: t('tethered.th300.k823'),
      image: fiberBtImg,
    },
  ];

  // Ground station features
  const groundStationFeatures = [
    {
      icon: Shield,
      title: t('tethered.th300.k824'),
      desc: t('tethered.th300.k825'),
      image: safetyImg,
      labels: [t('tethered.th300.gs.l1'), t('tethered.th300.gs.l2'), t('tethered.th300.gs.l3'), t('tethered.th300.gs.l4'), t('tethered.th300.gs.l5'), t('tethered.th300.gs.l6'), t('tethered.th300.gs.l7'), t('tethered.th300.gs.l8')],
    },
    {
      icon: Gauge,
      title: t('tethered.th300.k826'),
      desc: t('tethered.th300.k827'),
      image: voltageImg,
    },
  ];

  // Drone specs (10kg aircraft)
  const droneSpecs = [
    { label: t('tethered.th300.k828'), value: t('tethered.th300.k829') },
    { label: t('tethered.th300.k830'), value: t('tethered.th300.k831') },
    { label: t('swarm.c20specssection.k64'), value: "1834mm" },
    { label: t('tethered.th200.k739'), value: "1300×1300×540mm" },
    { label: t('tethered.th200.k740'), value: "880×760×540mm" },
    { label: t('tethered.th300.k832'), value: "9.5kg" },
    { label: t('tethered.th200.k745'), value: "10kg" },
    { label: t('tethered.th300.k833'), value: "25kg" },
    { label: t('tethered.th300.k834'), value: t('tethered.th300.k835') },
    { label: t('tethered.th300.k836'), value: "±5cm" },
    { label: t('swarm.c20specssection.k73'), value: t('tethered.th300.k837') },
    { label: t('swarm.c20specssection.k65'), value: "2388" },
    { label: t('tethered.th300.k838'), value: "6s16000mAh15c ×2" },
    { label: t('tethered.th300.k839'), value: "H16" },
    { label: t('tethered.th300.k840'), value: "10km" },
    { label: t('tethered.th300.k841'), value: "30min" },
    { label: t('swarm.w400specssection.k384'), value: "≤10m/s" },
    { label: t('tethered.th300.k842'), value: t('tethered.th300.k843') },
  ];

  // Ground station specs (3.5KW)
  const stationSpecs = [
    { label: t('tethered.th300.k844'), value: "3500W", highlight: true },
    { label: t('tethered.th300.k845'), value: "50cm×40cm×35cm (L×W×H)" },
    { label: t('tethered.th300.k846'), value: "29±1kg" },
    { label: t('tethered.th300.k847'), value: t('tethered.th300.k848') },
    { label: t('tethered.th300.k849'), value: "1.8kg" },
    { label: t('tethered.th300.k850'), value: "48Vdc" },
    { label: t('tethered.th200.k764'), value: "220Vac 50Hz" },
    { label: t('tethered.th300.k851'), value: "8A" },
    { label: t('tethered.th300.k852'), value: "3.5kW", highlight: true },
    { label: t('tethered.th300.k853'), value: "50kg" },
    { label: t('tethered.th300.k854'), value: t('tethered.th300.k855') },
    { label: t('tethered.th300.k856'), value: t('tethered.th300.k857') },
  ];

  // Application scenarios
  const applications = [
    { title: t('tethered.th300.k858'), image: firefightingImg, desc: t('tethered.th300.k859') },
    { title: t('tethered.th300.k860'), image: emergencyImg, desc: t('tethered.th300.k861') },
    { title: t('tethered.th300.k862'), image: rescueImg, desc: t('tethered.th300.k863') },
    { title: t('tethered.th200.k778'), image: powerImg, desc: t('tethered.th300.k864') },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <MultiLanguageSEO
        title={t('tethered.th300.k865')}
        description={t('tethered.th300.k866')}
        keywords={t('tethered.th300.k867')}
        path="/products/tethered/th-300"
      />
      <PageStructuredData data={{ type: 'Product', name: 'CANI T300', description: 'Heavy-Payload Tethered Drone System', category: 'Tethered Drone', sku: 'T300' }} />
      <Header />
      <FloatingContact />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img src={heroImg} alt="CANI T300" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-950/30 to-gray-950" />
        </div>

        <BackButton to="/products/tethered" label={t('tethered.th200.k787')} />

        <div className="relative z-10 container mx-auto px-4 text-center pt-20">
          <p className="text-cyan-400 font-mono tracking-[0.3em] uppercase text-sm mb-4 animate-fade-in">
            CANI T300 TETHERED SYSTEM
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 animate-fade-in tracking-tight">
            {t('tethered.th300.k868')}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {t('tethered.th300.k869')}
          </p>

          {/* Hero stats */}
          <div className="flex justify-center gap-12 md:gap-20 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {heroStats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-5xl font-black text-white">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center gap-4 mt-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/contact">
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold px-8 py-3 min-h-[44px] min-w-[44px] text-base">
                <Phone className="w-4 h-4 mr-2" />
                {t('acc.canifmtdetail.k525')}
              </Button>
            </Link>
            <a href="#specs">
              <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-800 px-8 py-3 min-h-[44px] min-w-[44px] text-base">
                {t('acc.canifmtdetail.k526')}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ===== CORE FEATURES - 3 big cards ===== */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            {t('tethered.th300.k870')}
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            {t('tethered.th300.k871')}
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {coreFeatures.map((feat, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden border border-gray-800 hover:border-cyan-500/50 transition-all duration-500">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={feat.image} alt={feat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-5xl font-black text-cyan-400">{feat.value}</span>
                    <span className="text-xl font-bold text-cyan-400/80">{feat.unit}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DRONE DISPLAY ===== */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            {t('tethered.th200.k790')}
          </h2>
          <p className="text-gray-400 text-center mb-12">
            {t('tethered.th300.k872')}
          </p>
          <div className="max-w-3xl mx-auto">
            <img src={droneDisplayImg} alt="CANI T300 Drone Views" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* ===== PAYLOAD MODULES ===== */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            {t('tethered.th300.k873')}
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            {t('tethered.th300.k874')}
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {payloadModules.map((mod, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden border border-gray-800 hover:border-cyan-500/30 transition-all duration-500">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={mod.image} alt={mod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <mod.icon className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-xl font-bold text-white">{mod.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{mod.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GROUND STATION ===== */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            {t('tethered.th300.k875')}
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            {t('tethered.th300.k876')}
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {groundStationFeatures.map((feat, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={feat.image} alt={feat.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <feat.icon className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">{feat.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPECIFICATIONS ===== */}
      <section id="specs" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            {t('tethered.th200.k801')}
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Drone specs */}
            <div>
              <h3 className="text-cyan-400 font-bold text-lg mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                {t('tethered.th300.k877')}
              </h3>
              <div className="space-y-0">
                {droneSpecs.map((spec, i) => (
                  <div key={i} className={`flex justify-between py-3 border-b border-gray-800 ${i % 2 === 0 ? 'bg-gray-800/20' : ''} px-3 rounded-sm`}>
                    <span className="text-gray-400 text-sm">{spec.label}</span>
                    <span className="text-white text-sm font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Station specs */}
            <div>
              <h3 className="text-cyan-400 font-bold text-lg mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                {t('tethered.th300.k878')}
              </h3>
              <div className="space-y-0">
                {stationSpecs.map((spec, i) => (
                  <div key={i} className={`flex justify-between py-3 border-b border-gray-800 ${spec.highlight ? 'bg-cyan-500/5' : i % 2 === 0 ? 'bg-gray-800/20' : ''} px-3 rounded-sm`}>
                    <span className="text-gray-400 text-sm">{spec.label}</span>
                    <span className={`text-sm font-medium ${spec.highlight ? 'text-cyan-400' : 'text-white'}`}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== APPLICATION SCENARIOS ===== */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            {t('acc.vrxdetail.k616')}
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            {t('tethered.th300.k879')}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {applications.map((app, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer">
                <img src={app.image} alt={app.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-white font-bold text-lg">{app.title}</h4>
                  <p className="text-gray-300 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{app.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Article */}
      <section className="py-12 bg-gray-900/50 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gray-800/60 rounded-xl p-6 flex items-center gap-4 hover:bg-gray-800/80 transition-colors">
            <div className="text-3xl">📰</div>
            <div className="flex-1">
              <p className="text-sm text-cyan-400 font-mono mb-1">{t('prod.logistics.k451')}</p>
              <Link to="/news/d41bdc36-2dbc-432a-9fb8-0f321b7348bd" className="text-white font-semibold hover:text-cyan-300 transition-colors">
                {t('tethered.th300.k880')}
              </Link>
              <p className="text-gray-400 text-sm mt-1">{t('tethered.th300.k881')}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('tethered.th300.k882')}
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            {t('tethered.th200.k808')}
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact">
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold px-8 py-3 min-h-[44px] min-w-[44px]">
                <Phone className="w-4 h-4 mr-2" />
                {t('acc.canifmtdetail.k547')}
              </Button>
            </Link>
            <a href="mailto:info@caniuav.com">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 min-h-[44px] min-w-[44px]">
                <Mail className="w-4 h-4 mr-2" />
                info@caniuav.com
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TH300;
