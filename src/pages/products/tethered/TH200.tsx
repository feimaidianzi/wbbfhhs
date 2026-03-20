import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LangLink as Link } from "@/components/LangLink";
import { BackButton } from "@/components/BackButton";
import { FloatingContact } from "@/components/FloatingContact";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageStructuredData } from "@/components/PageStructuredData";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Weight, Clock, Mountain, Sun, Radio, Wind, Shield, Zap, Settings, Gauge,
  Camera, Eye, Volume2, Thermometer, Navigation, Phone, Mail, ChevronRight,
  Cpu, Wifi, Target, Plane
} from "lucide-react";

import heroImg from "@/assets/products/th200-hero-mountain.jpg";
import emergencyLightImg from "@/assets/products/th200-emergency-lighting-clean.jpg";
import coolingImg from "@/assets/products/th200-cooling-system.jpg";
import commRelayImg from "@/assets/products/th200-comm-relay.jpg";
import tetherEquipImg from "@/assets/products/th200-tether-equipment-clean.jpg";
import droneDisplayImg from "@/assets/products/th200-product-display-clean.jpg";

import firefightingImg from "@/assets/seo/firefighting-aerial-response.jpg";
import emergencyImg from "@/assets/seo/emergency-rescue-night.jpg";
import powerImg from "@/assets/seo/power-transmission-inspection.jpg";
import maritimeImg from "@/assets/seo/maritime-drone.jpg";

const TH200 = () => {
  const { t } = useLanguage();

  // Hero highlight stats
  const heroStats = [
    { icon: Radio, value: t('tethered.th200.k706'), label: t('tethered.th200.k707') },
    { icon: Weight, value: "10kg", label: t('tethered.th200.k708') },
    { icon: Clock, value: "24h", label: t('tethered.th200.k709') },
    { icon: Navigation, value: t('tethered.th200.k710'), label: "RTK cm-level" },
    { icon: Settings, value: t('tethered.th200.k711'), label: t('tethered.th200.k712') },
    { icon: Cpu, value: t('tethered.th200.k713'), label: t('tethered.th200.k714') },
  ];

  // Core feature sections with images
  const coreFeatures = [
    {
      title: t('tethered.th200.k715'),
      desc: t('tethered.th200.k716'),
      image: emergencyLightImg,
      accent: "text-amber-400",
      stats: [
        { value: "20,000", unit: t('tethered.th200.k717'), label: t('tethered.th200.k718') },
        { value: "10,000", unit: "m²", label: t('tethered.th200.k719') },
      ],
    },
    {
      title: t('tethered.th200.k720'),
      desc: t('tethered.th200.k721'),
      image: commRelayImg,
      accent: "text-cyan-400",
      stats: [
        { value: "200", unit: "m", label: t('tethered.th200.k722') },
        { value: "5", unit: "km", label: t('tethered.th200.k723') },
      ],
    },
    {
      title: t('tethered.th200.k724'),
      desc: t('tethered.th200.k725'),
      image: coolingImg,
      accent: "text-green-400",
      stats: [
        { value: t('tethered.th200.k726'), unit: "", label: t('tethered.th200.k727') },
        { value: "24h", unit: "", label: t('tethered.th200.k728') },
      ],
    },
  ];

  // Payload modules grid
  const payloads = [
    { icon: Camera, name: t('tethered.th200.k729') },
    { icon: Eye, name: t('tethered.th200.k730') },
    { icon: Target, name: t('tethered.th200.k731') },
    { icon: Volume2, name: t('tethered.th200.k732') },
    { icon: Sun, name: t('tethered.th200.k733') },
    { icon: Zap, name: t('tethered.th200.k734') },
  ];

  // Flight platform specs (from OCR of reference image)
  const flightSpecs = [
    { label: t('tethered.th200.k735'), value: t('swarm.c20specssection.k63') },
    { label: t('tethered.th200.k736'), value: t('tethered.th200.k737') },
    { label: t('swarm.c20specssection.k73'), value: t('tethered.th200.k738') },
    { label: t('swarm.c20specssection.k64'), value: "1200mm" },
    { label: t('tethered.th200.k739'), value: "1000×1000×600mm" },
    { label: t('tethered.th200.k740'), value: "620×620×600mm" },
    { label: t('tethered.th200.k741'), value: t('tethered.th200.k742')' },
    { label: t('tethered.th200.k743'), value: t('tethered.th200.k744') },
    { label: t('tethered.th200.k745'), value: "10kg", highlight: true },
    { label: t('swarm.c20specssection.k67'), value: "29kg" },
  ];

  const performanceSpecs = [
    { label: t('swarm.w400specssection.k384'), value: t('tethered.th200.k746') },
    { label: t('tethered.th200.k747'), value: t('tethered.th200.k748'), highlight: true },
    { label: t('tethered.th200.k749'), value: t('tethered.th200.k750'), highlight: true },
    { label: t('tethered.th200.k751'), value: t('tethered.th200.k752') },
    { label: t('tethered.th200.k753'), value: t('tethered.th200.k754') },
    { label: t('tethered.th200.k755'), value: t('tethered.th200.k756') },
    { label: t('acc.canifmtdetail.k513'), value: t('tethered.th200.k757') },
  ];

  const navSpecs = [
    { label: t('tethered.th200.k758'), value: "GPS L1 L2 / GLONASS L1 L2 / BDS B1 B2" },
    { label: t('tethered.th200.k759'), value: "±2.5m(GNSS) / ±0.8m(DGPS) / ±1.5cm+1ppm(RTK)" },
    { label: t('tethered.th200.k760'), value: "±1.5m(GNSS) / ±0.4m(DGPS) / ±1.0cm+1ppm(RTK)" },
    { label: t('tethered.th200.k761'), value: t('tethered.th200.k762') },
    { label: t('tethered.th200.k763'), value: "-20°C ~ 55°C" },
  ];

  // Tether equipment specs (from OCR)
  const tetherAirSpecs = [
    { label: t('tethered.th200.k764'), value: "580~810Vdc", sub: t('tethered.th200.k765') },
    { label: t('tethered.th200.k766'), value: "50Vdc±1% / 58Vdc±1%", sub: t('tethered.th200.k767') },
    { label: t('tethered.th200.k768'), value: t('tethered.th200.k769'), highlight: true },
  ];

  const tetherCableSpecs = [
    { label: t('tethered.th200.k770'), value: t('tethered.th200.k771') },
    { label: t('tethered.th200.k772'), value: t('tethered.th200.k773') },
  ];

  const tetherGroundSpecs = [
    { label: t('tethered.th200.k764'), value: t('tethered.th200.k774') },
    { label: t('tethered.th200.k766'), value: t('tethered.th200.k775') },
    { label: t('tethered.th200.k768'), value: t('tethered.th200.k776'), highlight: true },
  ];

  // Application scenarios
  const applications = [
    { title: t('tethered.th200.k715'), desc: t('tethered.th200.k777'), image: emergencyImg },
    { title: t('tethered.th200.k778'), desc: t('tethered.th200.k779'), image: powerImg },
    { title: t('tethered.th200.k780'), desc: t('tethered.th200.k781'), image: firefightingImg },
    { title: t('tethered.th200.k782'), desc: t('tethered.th200.k783'), image: maritimeImg },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <MultiLanguageSEO
        title={t('tethered.th200.k784')}
        description={t('tethered.th200.k785')}
        keywords={t('tethered.th200.k786')}
        path="/products/tethered/th-200"
      />
      <PageStructuredData data={{ type: 'Product', name: 'CANI TH-200', description: 'Tethered Lighting Drone System', category: 'Tethered Drone', sku: 'TH-200' }} />
      <Header />
      <FloatingContact />

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="CANI TH-200" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-transparent to-gray-950" />
        </div>

        <BackButton to="/products/tethered" label={t('tethered.th200.k787')} />

        <div className="relative z-10 container mx-auto px-4 text-center pt-20">
          <p className="text-cyan-400 font-mono tracking-[0.3em] uppercase text-sm mb-4 animate-fade-in">
            CANI TH-200 TETHERED SYSTEM
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 animate-fade-in tracking-tight">
            {t('tethered.th200.k788')}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {t('tethered.th200.k789')}
          </p>

          {/* Hero stat badges */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {heroStats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1 bg-gray-950/60 backdrop-blur-sm rounded-xl p-3 border border-gray-700/50">
                <stat.icon className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-bold text-sm">{stat.value}</span>
                <span className="text-gray-400 text-[10px] leading-tight text-center">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center gap-4 mt-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/contact">
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold px-8 py-3 min-h-[44px] text-base">
                <Phone className="w-4 h-4 mr-2" />
                {t('acc.canifmtdetail.k525')}
              </Button>
            </Link>
            <a href="#specs">
              <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-800 px-8 py-3 min-h-[44px] text-base">
                {t('acc.canifmtdetail.k526')}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ===== PRODUCT DISPLAY ===== */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gray-500 font-mono text-xs tracking-widest uppercase mb-2">Product Display</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {t('tethered.th200.k790')}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-4">
            <img src={droneDisplayImg} alt="CANI TH-200 Multi-angle View" className="w-full h-auto" />
          </div>
          <p className="text-gray-500 text-center text-sm mt-4">
            {t('tethered.th200.k791')}
          </p>
        </div>
      </section>

      {/* ===== CORE FEATURES (alternating layout) ===== */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('tethered.th200.k792')}
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              {t('tethered.th200.k793')}
            </p>
          </div>

          <div className="space-y-24 max-w-6xl mx-auto">
            {coreFeatures.map((feat, i) => (
              <div key={i} className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'md:[direction:rtl]' : ''}`}>
                {/* Image */}
                <div className={`rounded-2xl overflow-hidden border border-gray-800 ${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                  <img src={feat.image} alt={feat.title} className="w-full h-auto aspect-[4/3] object-cover" />
                </div>

                {/* Content */}
                <div className={`space-y-6 ${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                  <h3 className={`text-2xl md:text-3xl font-bold ${feat.accent}`}>{feat.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feat.desc}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {feat.stats.map((stat, j) => (
                      <div key={j} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                        <div className="flex items-baseline gap-1">
                          <span className={`text-2xl md:text-3xl font-black ${feat.accent}`}>{stat.value}</span>
                          <span className="text-gray-400 text-sm">{stat.unit}</span>
                        </div>
                        <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PAYLOAD MODULES GRID ===== */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('tethered.th200.k794')}
            </h2>
            <p className="text-gray-400">{t('tethered.th200.k795')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {payloads.map((p, i) => (
              <div key={i} className="group bg-gray-900 border border-gray-800 rounded-xl p-6 text-center hover:border-cyan-500/30 transition-all duration-300">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gray-800 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                  <p.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <p className="text-white font-medium text-sm">{p.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TETHER EQUIPMENT ===== */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('tethered.th200.k796')}
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              {t('tethered.th200.k797')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden border border-gray-800">
              <img src={tetherEquipImg} alt={t('tethered.th200.k796')} className="w-full h-auto" />
            </div>

            {/* Specs breakdown */}
            <div className="space-y-8">
              {/* Airborne module */}
              <div>
                <h4 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Plane className="w-4 h-4" />
                  {t('tethered.th200.k798')}
                </h4>
                {tetherAirSpecs.map((s, i) => (
                  <div key={i} className="flex justify-between py-2.5 border-b border-gray-800 px-2">
                    <span className="text-gray-400 text-sm">{s.label}</span>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${s.highlight ? 'text-cyan-400' : 'text-white'}`}>{s.value}</span>
                      {s.sub && <p className="text-gray-600 text-[10px]">{s.sub}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cable */}
              <div>
                <h4 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Wifi className="w-4 h-4" />
                  {t('tethered.th200.k799')}
                </h4>
                {tetherCableSpecs.map((s, i) => (
                  <div key={i} className="flex justify-between py-2.5 border-b border-gray-800 px-2">
                    <span className="text-gray-400 text-sm">{s.label}</span>
                    <span className="text-white text-sm font-medium text-right max-w-[60%]">{s.value}</span>
                  </div>
                ))}
              </div>

              {/* Ground station */}
              <div>
                <h4 className="text-green-400 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  {t('tethered.th200.k800')}
                </h4>
                {tetherGroundSpecs.map((s, i) => (
                  <div key={i} className="flex justify-between py-2.5 border-b border-gray-800 px-2">
                    <span className="text-gray-400 text-sm">{s.label}</span>
                    <span className={`text-sm font-medium text-right max-w-[60%] ${s.highlight ? 'text-green-400' : 'text-white'}`}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TECHNICAL SPECIFICATIONS (Tabs) ===== */}
      <section id="specs" className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gray-500 font-mono text-xs tracking-widest uppercase mb-2">Technical Parameter</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {t('tethered.th200.k801')}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="flight" className="w-full">
              <TabsList className="w-full grid grid-cols-3 bg-gray-900 border border-gray-800 mb-8">
                <TabsTrigger value="flight" className="data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400">
                  {t('swarm.w400specssection.k380')}
                </TabsTrigger>
                <TabsTrigger value="performance" className="data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400">
                  {t('tethered.th200.k802')}
                </TabsTrigger>
                <TabsTrigger value="navigation" className="data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400">
                  {t('tethered.th200.k803')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="flight">
                <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                  {flightSpecs.map((spec, i) => (
                    <div key={i} className={`flex justify-between py-3.5 px-5 border-b border-gray-800/50 ${i % 2 === 0 ? 'bg-gray-800/20' : ''}`}>
                      <span className="text-gray-400 text-sm min-w-[120px]">{spec.label}</span>
                      <span className={`text-sm font-medium text-right ${spec.highlight ? 'text-cyan-400' : 'text-white'}`}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="performance">
                <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                  {performanceSpecs.map((spec, i) => (
                    <div key={i} className={`flex justify-between py-3.5 px-5 border-b border-gray-800/50 ${i % 2 === 0 ? 'bg-gray-800/20' : ''}`}>
                      <span className="text-gray-400 text-sm min-w-[120px]">{spec.label}</span>
                      <span className={`text-sm font-medium text-right max-w-[65%] ${spec.highlight ? 'text-cyan-400' : 'text-white'}`}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="navigation">
                <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                  {navSpecs.map((spec, i) => (
                    <div key={i} className={`flex justify-between py-3.5 px-5 border-b border-gray-800/50 ${i % 2 === 0 ? 'bg-gray-800/20' : ''}`}>
                      <span className="text-gray-400 text-sm min-w-[120px]">{spec.label}</span>
                      <span className="text-white text-sm font-medium text-right max-w-[65%]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* ===== APPLICATION SCENARIOS ===== */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('acc.vrxdetail.k616')}
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              {t('tethered.th200.k804')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {applications.map((app, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer">
                <img src={app.image} alt={app.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-white font-bold text-lg mb-1">{app.title}</h4>
                  <p className="text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">{app.desc}</p>
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
              <Link to="/news/8378d971-a42f-4169-a093-0d25d46f8a69" className="text-white font-semibold hover:text-cyan-300 transition-colors">
                {t('tethered.th200.k805')}
              </Link>
              <p className="text-gray-400 text-sm mt-1">{t('tethered.th200.k806')}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('tethered.th200.k807')}
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            {t('tethered.th200.k808')}
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact">
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold px-8 py-3 min-h-[44px]">
                <Phone className="w-4 h-4 mr-2" />
                {t('acc.canifmtdetail.k547')}
              </Button>
            </Link>
            <a href="mailto:info@caniuav.com">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 min-h-[44px]">
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

export default TH200;
