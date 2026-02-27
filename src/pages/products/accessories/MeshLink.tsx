import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { BackButton } from "@/components/BackButton";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { Button } from "@/components/ui/button";
import { LangLink } from "@/components/LangLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  ArrowRight, Mail, Phone, CheckCircle, Radio, Wifi, Zap, Shield, 
  Signal, Network, MapPin, Building, TreePine, Camera, Home, 
  MonitorSmartphone, Cpu, Gauge, Flame, Eye, BatteryCharging,
  Waves, ImageIcon, Activity
} from "lucide-react";

// Import clean images
import meshLinkAntenna from "@/assets/products/mesh-link-antenna.webp";
import meshLinkTriband from "@/assets/products/mesh-link-triband-clean.webp";
import meshLink1g4 from "@/assets/products/mesh-link-1g4-clean.webp";
import meshLinkPcb from "@/assets/products/mesh-link-pcb.webp";
import meshLinkInterfaces from "@/assets/products/mesh-link-interfaces.webp";
import MeshLinkInterfaceDiagram from "@/components/products/MeshLinkInterfaceDiagram";

const MeshLink = () => {
  const { t, baseLang } = useLanguage();

  const highlights = [
    { icon: Signal, text: t('meshLink.highlight.distance') },
    { icon: Shield, text: t('meshLink.highlight.penetration') },
    { icon: Wifi, text: t('meshLink.highlight.diffraction') },
    { icon: Zap, text: t('meshLink.highlight.lowPower') },
    { icon: Radio, text: t('meshLink.highlight.antiInterference') },
  ];

  const advantages = [
    { icon: Cpu, title: t('meshLink.advantage.sdr.title'), desc: t('meshLink.advantage.sdr.desc') },
    { icon: Waves, title: t('meshLink.advantage.bandwidth.title'), desc: t('meshLink.advantage.bandwidth.desc') },
    { icon: Gauge, title: t('meshLink.advantage.speed.title'), desc: t('meshLink.advantage.speed.desc') },
    { icon: Activity, title: t('meshLink.advantage.hopping.title'), desc: t('meshLink.advantage.hopping.desc') },
    { icon: ImageIcon, title: t('meshLink.advantage.maxrange.title'), desc: t('meshLink.advantage.maxrange.desc') },
  ];

  const serviceAreas = [
    { icon: MonitorSmartphone, label: t('meshLink.serviceArea.uav') },
    { icon: Flame, label: t('meshLink.serviceArea.fire') },
    { icon: Eye, label: t('meshLink.serviceArea.surveillance') },
    { icon: BatteryCharging, label: t('meshLink.serviceArea.inspection') },
  ];

  const frequencyBands = [
    { band: "800M", range: "806-826MHz", desc: t('meshLink.freq.800m.desc') },
    { band: "1.4G", range: "1427.9-1447.9MHz", desc: t('meshLink.freq.1g4.desc') },
    { band: "2.4G", range: "2401.5-2481.5MHz", desc: t('meshLink.freq.2g4.desc') },
  ];

  const applications = [
    { icon: TreePine, label: t('meshLink.app.agriculture') },
    { icon: Building, label: t('meshLink.app.construction') },
    { icon: Shield, label: t('meshLink.app.emergency') },
    { icon: MapPin, label: t('meshLink.app.scenic') },
    { icon: Home, label: t('meshLink.app.residential') },
    { icon: Camera, label: t('meshLink.app.security') },
    { icon: MonitorSmartphone, label: t('meshLink.app.uavRobot') },
    { icon: Network, label: t('meshLink.app.mesh') },
  ];

  const specs = [
    { category: t('meshLink.spec.cat.rf'), items: [
      { label: t('meshLink.spec.frequency'), value: "806-826MHz; 1427.9-1447.9MHz; 2401.5-2481.5MHz" },
      { label: t('meshLink.spec.txPower'), value: "2.4G/1.4G/800M 20-25dBm ±2dBm" },
      { label: t('meshLink.spec.sensitivity'), value: "2.4G: 10Mbps -102dBm; 5MHz -104dBm; 3MHz -106dBm\n1.4G: 10Mbps -103dBm; 5MHz -106dBm; 3MHz -108dBm\n800M: 10Mbps -103dBm; 5MHz -106dBm; 3MHz -108dBm" },
    ]},
    { category: t('meshLink.spec.cat.interface'), items: [
      { label: t('meshLink.spec.ethernet'), value: "RJ45 ×3" },
      { label: "UART", value: "UART(Data) ×1; UART(Config) ×1" },
      { label: "USB", value: "USB ×1" },
    ]},
    { category: t('meshLink.spec.cat.power'), items: [
      { label: t('meshLink.spec.powerInput'), value: "DC12V (7-24V) 1.0A" },
      { label: t('meshLink.spec.maxPower'), value: "< 3.5W" },
    ]},
    { category: t('meshLink.spec.cat.transmission'), items: [
      { label: t('meshLink.spec.antenna'), value: t('meshLink.spec.antenna.value') },
      { label: t('meshLink.spec.bandwidth'), value: "1.4MHz / 3MHz / 5MHz / 10MHz / 20MHz" },
      { label: t('meshLink.spec.speed'), value: t('meshLink.spec.speed.value') },
      { label: t('meshLink.spec.range'), value: t('meshLink.spec.range.value') },
    ]},
    { category: t('meshLink.spec.cat.latency'), items: [
      { label: t('meshLink.spec.dataLatency'), value: t('meshLink.spec.dataLatency.value') },
      { label: t('meshLink.spec.bootTime'), value: t('meshLink.spec.bootTime.value') },
    ]},
    { category: t('meshLink.spec.cat.config'), items: [
      { label: t('meshLink.spec.webConfig'), value: t('meshLink.spec.webConfig.value') },
    ]},
    { category: t('meshLink.spec.cat.environment'), items: [
      { label: t('meshLink.spec.storageTemp'), value: "-40°C ~ +85°C" },
      { label: t('meshLink.spec.operatingTemp'), value: "-20°C ~ +75°C" },
      { label: t('meshLink.spec.humidity'), value: "5% ~ 95%" },
    ]},
    { category: t('meshLink.spec.cat.physical'), items: [
      { label: t('meshLink.spec.size'), value: "75mm × 50mm, 35g" },
    ]},
  ];

  const commInterfaces = [
    t('meshLink.commInterface.usb'),
    t('meshLink.commInterface.dc'),
    t('meshLink.commInterface.ap'),
    t('meshLink.commInterface.debug'),
    t('meshLink.commInterface.data'),
    t('meshLink.commInterface.mainAnt'),
    t('meshLink.commInterface.auxAnt'),
    t('meshLink.commInterface.eth1'),
    t('meshLink.commInterface.eth2'),
    t('meshLink.commInterface.eth3'),
    t('meshLink.commInterface.power'),
  ];

  const caseStudies = [
    {
      title: t('meshLink.case.construction.title'),
      desc: t('meshLink.case.construction.desc'),
      details: [
        t('meshLink.case.construction.detail1'),
        t('meshLink.case.construction.detail2'),
        t('meshLink.case.construction.detail3'),
      ],
      icon: Building,
    },
    {
      title: t('meshLink.case.island.title'),
      desc: t('meshLink.case.island.desc'),
      details: [
        t('meshLink.case.island.detail1'),
        t('meshLink.case.island.detail2'),
        t('meshLink.case.island.detail3'),
        t('meshLink.case.island.detail4'),
      ],
      icon: MapPin,
    },
    {
      title: t('meshLink.case.village.title'),
      desc: t('meshLink.case.village.desc'),
      details: [
        t('meshLink.case.village.detail1'),
        t('meshLink.case.village.detail2'),
        t('meshLink.case.village.detail3'),
      ],
      icon: Home,
    },
    {
      title: t('meshLink.case.smartpark.title'),
      desc: t('meshLink.case.smartpark.desc'),
      details: [
        t('meshLink.case.smartpark.detail1'),
        t('meshLink.case.smartpark.detail2'),
        t('meshLink.case.smartpark.detail3'),
      ],
      icon: Network,
    },
  ];

  const keyFeatures = [
    { icon: Signal, title: t('meshLink.feature.range.title'), desc: t('meshLink.feature.range.desc') },
    { icon: Shield, title: t('meshLink.feature.penetration.title'), desc: t('meshLink.feature.penetration.desc') },
    { icon: Network, title: t('meshLink.feature.mesh.title'), desc: t('meshLink.feature.mesh.desc') },
    { icon: Radio, title: t('meshLink.feature.frequency.title'), desc: t('meshLink.feature.frequency.desc') },
    { icon: Zap, title: t('meshLink.feature.power.title'), desc: t('meshLink.feature.power.desc') },
    { icon: Gauge, title: t('meshLink.feature.latency.title'), desc: t('meshLink.feature.latency.desc') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={t('meshLink.seo.title')}
        description={t('meshLink.seo.description')}
        keywords={t('meshLink.seo.keywords')}
        path="/products/accessories/mesh-link"
        type="product"
      />
      <Header />
      <FloatingContact />
      <BackButton to="/products/accessories" label={t('meshLink.back')} />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
                  <LangLink to="/" className="hover:text-white transition-colors">{t('meshLink.breadcrumb.home')}</LangLink>
                  <span>/</span>
                  <LangLink to="/products/accessories" className="hover:text-white transition-colors">{t('meshLink.breadcrumb.accessories')}</LangLink>
                  <span>/</span>
                  <span className="text-white">{t('meshLink.breadcrumb.current')}</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {t('meshLink.hero.title')}
                </h1>
                <p className="text-xl md:text-2xl text-accent font-semibold mb-4">
                  {t('meshLink.hero.subtitle')}
                </p>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {t('meshLink.hero.desc')}
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {highlights.map((h, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white border border-white/20">
                      <h.icon className="w-4 h-4 text-accent" />
                      {h.text}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  <LangLink to="/contact">
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-lg group">
                      {t('template.getQuote')}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </LangLink>
                  <Button size="lg" className="bg-white/95 text-primary hover:bg-white font-bold shadow-lg">
                    <Phone className="mr-2 h-4 w-4" />
                    {t('template.callUs')}
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <img src={meshLinkAntenna} alt={t('meshLink.hero.title')} className="max-w-sm w-full rounded-2xl shadow-2xl" loading="eager" />
              </div>
            </div>
          </div>
        </section>

        {/* 五大优势 */}
        <section className="py-20 bg-muted">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
              {t('meshLink.advantages.title')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {advantages.map((a, i) => (
                <div key={i} className="flex flex-col items-center text-center bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <a.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-card-foreground mb-2">{a.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
              {t('meshLink.features.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {keyFeatures.map((f, i) => (
                <div key={i} className="bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <f.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Frequency Variants */}
        <section className="py-20 bg-muted">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              {t('meshLink.freq.title')}
            </h2>
            <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
              {t('meshLink.freq.desc')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl shadow-card overflow-hidden border border-border/30">
                <div className="aspect-square bg-muted/50 flex items-center justify-center p-8">
                  <img src={meshLinkTriband} alt="800M/1.4G/2.4G" className="max-h-full object-contain" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">{t('meshLink.freq.triband.title')}</h3>
                  <ul className="space-y-2">
                    {frequencyBands.map((fb, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                        <span className="font-medium text-foreground">{fb.band}</span>
                        <span className="text-muted-foreground">{fb.range}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-card rounded-2xl shadow-card overflow-hidden border border-border/30">
                <div className="aspect-square bg-muted/50 flex items-center justify-center p-8">
                  <img src={meshLink1g4} alt="1.4G" className="max-h-full object-contain" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">{t('meshLink.freq.singleband.title')}</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      <span className="font-medium text-foreground">1420-1530MHz</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-muted-foreground">{t('meshLink.freq.singleband.bandwidth')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HQL010P Core Module - Enhanced */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              {t('meshLink.module.title')}
            </h2>
            <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
              {t('meshLink.module.desc')}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div className="flex justify-center">
                <img src={meshLinkPcb} alt="HQL010P" className="max-w-md w-full rounded-xl shadow-lg" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">HQL010P</h3>
                <p className="text-lg text-accent font-semibold mb-6">{t('meshLink.module.hql010p.fullDesc')}</p>
                <ul className="space-y-3">
                  {[
                    t('meshLink.module.hql010p.point1'),
                    t('meshLink.module.hql010p.point2'),
                    t('meshLink.module.hql010p.point3'),
                    t('meshLink.module.hql010p.point4'),
                    t('meshLink.module.hql010p.point5'),
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Communication Interfaces - Detailed */}
        <section className="py-20 bg-muted">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              {t('meshLink.commInterface.title')}
            </h2>
            <p className="text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
              {t('meshLink.commInterface.desc')}
            </p>
            {/* Code-based interface diagram - responsive, i18n-ready */}
            <MeshLinkInterfaceDiagram lang={baseLang} />
            
            {/* Interface list cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mt-12">
              {commInterfaces.map((iface, i) => (
                <div key={i} className="flex items-center gap-3 bg-card p-3 rounded-lg border border-border/30">
                  <Cpu className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-medium text-foreground text-sm">{iface}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product & Service Application Areas */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              {t('meshLink.serviceAreas.title')}
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-16 uppercase tracking-widest">
              PRODUCT AND SERVICE AREAS
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {serviceAreas.map((area, i) => (
                <div key={i} className="flex flex-col items-center gap-4 bg-card p-8 rounded-xl shadow-card hover:shadow-card-hover transition-all text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <area.icon className="h-8 w-8 text-primary" />
                  </div>
                  <span className="font-medium text-foreground text-sm">{area.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Applications & Mesh */}
        <section className="py-20 bg-muted">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
              {t('meshLink.applications.title')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {applications.map((app, i) => (
                <div key={i} className="flex flex-col items-center gap-3 bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                    <app.icon className="h-7 w-7 text-primary" />
                  </div>
                  <span className="font-medium text-foreground text-sm">{app.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-16 max-w-3xl mx-auto bg-card p-8 rounded-2xl shadow-card border border-border/30">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Network className="w-6 h-6 text-accent" />
                {t('meshLink.mesh.title')}
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-1 shrink-0" />{t('meshLink.mesh.point1')}</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-1 shrink-0" />{t('meshLink.mesh.point2')}</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-1 shrink-0" />{t('meshLink.mesh.point3')}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Specs Table */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
              {t('meshLink.specs.title')}
            </h2>
            <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="px-6 py-3 text-left font-semibold w-1/6">{t('meshLink.specs.col.category')}</th>
                    <th className="px-6 py-3 text-left font-semibold w-1/4">{t('meshLink.specs.col.param')}</th>
                    <th className="px-6 py-3 text-left font-semibold">{t('meshLink.specs.col.value')}</th>
                  </tr>
                </thead>
                <tbody>
                  {specs.map((group, gi) => (
                    group.items.map((item, ii) => (
                      <tr key={`${gi}-${ii}`} className={`${(gi + ii) % 2 === 0 ? 'bg-muted/50' : 'bg-card'} hover:bg-primary/5 transition-colors`}>
                        {ii === 0 && (
                          <td className="px-6 py-3 font-semibold text-foreground border-b border-border/30 align-top" rowSpan={group.items.length}>
                            {group.category}
                          </td>
                        )}
                        <td className="px-6 py-3 font-medium text-foreground border-b border-border/30">{item.label}</td>
                        <td className="px-6 py-3 text-muted-foreground border-b border-border/30 whitespace-pre-line">{item.value}</td>
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 bg-muted">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
              {t('meshLink.cases.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {caseStudies.map((cs, i) => (
                <div key={i} className="bg-card rounded-2xl shadow-card overflow-hidden border border-border/30 hover:shadow-card-hover transition-all">
                  <div className="bg-primary/10 p-6 flex items-center gap-4">
                    <cs.icon className="w-10 h-10 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">{cs.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground text-sm mb-4">{cs.desc}</p>
                    <ul className="space-y-2">
                      {cs.details.map((d, di) => (
                        <li key={di} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('meshLink.cta.title')}</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">{t('meshLink.cta.desc')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <LangLink to="/contact">
                <Button size="lg" className="bg-accent text-white hover:bg-accent/90 font-bold shadow-lg group">
                  <Mail className="mr-2 h-4 w-4" />
                  {t('template.contactUs')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </LangLink>
              <a href="mailto:sales@caniuav.com">
                <Button size="lg" className="bg-white/95 text-primary hover:bg-white font-bold shadow-lg">
                  <Mail className="mr-2 h-4 w-4" />
                  sales@caniuav.com
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MeshLink;
