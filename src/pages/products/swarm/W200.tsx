import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageStructuredData } from "@/components/PageStructuredData";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, Check, Cpu, Radio, Navigation, Layers, Monitor, Wifi, Zap, Target, Code, ChevronDown, Eye, Box } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";

import heroImage from "@/assets/products/swarm-uwb-showcase.jpg";
import hardwareImage from "@/assets/products/swarm-w200-hardware.jpg";
import componentsImage from "@/assets/products/swarm-w200-components.jpg";
import angleImage from "@/assets/products/swarm-w200-angle.jpg";
import detailImage from "@/assets/products/swarm-w200-detail.jpg";
import uwbImage from "@/assets/products/swarm-uwb-positioning.jpg";
import formationImage from "@/assets/products/swarm-formation.jpg";
import groundStationImage from "@/assets/products/swarm-ground-station.jpg";
import communicationImage from "@/assets/products/swarm-communication.png";

const W200 = () => {
  const { t } = useLanguage();

  const features = [
    { icon: <Navigation className="h-6 w-6" />, titleKey: "w200.feature.uwb.title", descKey: "w200.feature.uwb.desc" },
    { icon: <Cpu className="h-6 w-6" />, titleKey: "w200.feature.jetson.title", descKey: "w200.feature.jetson.desc" },
    { icon: <Code className="h-6 w-6" />, titleKey: "w200.feature.opensource.title", descKey: "w200.feature.opensource.desc" },
    { icon: <Radio className="h-6 w-6" />, titleKey: "w200.feature.distributed.title", descKey: "w200.feature.distributed.desc" },
    { icon: <Eye className="h-6 w-6" />, titleKey: "w200.feature.opticalFlow.title", descKey: "w200.feature.opticalFlow.desc" },
    { icon: <Layers className="h-6 w-6" />, titleKey: "w200.feature.formation.title", descKey: "w200.feature.formation.desc" },
  ];

  const specifications = {
    drone: [
      { labelKey: "w200.spec.drone.type", value: t("w200.spec.drone.type.value") },
      { labelKey: "w200.spec.drone.wheelbase", value: "250mm" },
      { labelKey: "w200.spec.drone.propeller", value: t("w200.spec.drone.propeller.value") },
      { labelKey: "w200.spec.drone.weight", value: "0.76kg" },
      { labelKey: "w200.spec.drone.takeoffWeight", value: "1.23kg" },
      { labelKey: "w200.spec.drone.flightTime", value: "10min" },
      { labelKey: "w200.spec.drone.hoverAccuracy", value: t("w200.spec.drone.hoverAccuracy.value") },
      { labelKey: "w200.spec.drone.fc", value: "Pixhawk 6C" },
      { labelKey: "w200.spec.drone.environment", value: t("w200.spec.drone.environment.value") },
    ],
    computer: [
      { labelKey: "w200.spec.computer.name", value: "Allspark2" },
      { labelKey: "w200.spec.computer.module", value: "NVIDIA Jetson Orin NX" },
      { labelKey: "w200.spec.computer.ai", value: "100 TOPS" },
      { labelKey: "w200.spec.computer.memory", value: "16GB LPDDR5" },
      { labelKey: "w200.spec.computer.gpu", value: "NVIDIA Ampere (918MHz)" },
      { labelKey: "w200.spec.computer.cpu", value: "8-core Arm Cortex-A78AE" },
      { labelKey: "w200.spec.computer.weight", value: "188g" },
      { labelKey: "w200.spec.computer.dimensions", value: "102.5×62.5×31mm" },
    ],
    uwb: [
      { labelKey: "w200.spec.uwb.accuracy", value: "10cm" },
      { labelKey: "w200.spec.uwb.refreshRate", value: "200Hz" },
      { labelKey: "w200.spec.uwb.latency", value: "<0.5ms" },
      { labelKey: "w200.spec.uwb.maxTags", value: "200" },
      { labelKey: "w200.spec.uwb.maxStations", value: "120" },
      { labelKey: "w200.spec.uwb.range", value: "500m" },
      { labelKey: "w200.spec.uwb.bandwidth", value: "3Mbps" },
      { labelKey: "w200.spec.uwb.weight", value: "34.3g" },
    ],
  };

  const packageList = [
    { name: t("w200.package.drone"), spec: t("w200.package.drone.spec"), qty: "3" },
    { name: t("w200.package.propeller"), spec: t("w200.package.propeller.spec"), qty: t("w200.package.propeller.qty") },
    { name: t("w200.package.controller"), spec: "Amovlab-E2", qty: "3" },
    { name: t("w200.package.commMobile"), spec: "Mini Homer", qty: "6" },
    { name: t("w200.package.commBase"), spec: "Mini Homer", qty: "1" },
    { name: t("w200.package.uwbStation"), spec: "Linktrack P-B", qty: "4" },
    { name: t("w200.package.uwbTag"), spec: "Linktrack P-B", qty: "3" },
    { name: t("w200.package.computer"), spec: "Allspark2 Orin NX", qty: "3" },
    { name: t("w200.package.battery"), spec: "4S 5300mAh LiPo", qty: "3" },
    { name: t("w200.package.charger"), spec: "1SDT-PD60", qty: "3" },
  ];

  const images = [heroImage, hardwareImage, componentsImage, angleImage];

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={t("w200.seo.title")}
        description={t("w200.seo.description")}
        keywords={t("w200.seo.keywords")}
        path="/products/swarm/w200"
      />
      <PageStructuredData data={{ type: 'Product', name: 'W200 UWB Swarm Kit', description: t("w200.seo.description"), category: 'Swarm Drone System', sku: 'W200-UWB' }} />
      <Header />
      <FloatingContact />
      <BackButton to="/products/swarm" label={t('w200.back')} />

      <main>
        {/* Hero */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt={t("w200.hero.title")} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </div>
          <div className="container-custom relative z-10 text-center py-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="bg-accent/90 text-accent-foreground mb-4">W200 UWB</Badge>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              {t('w200.hero.title')}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8">
              {t('w200.hero.subtitle')}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8">
                  {t('common.contactUs')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <ChevronDown className="w-6 h-6 text-white/60 animate-bounce" />
          </motion.div>
        </section>

        {/* Highlights */}
        <section className="py-12 bg-accent/10">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "3", labelKey: "w200.highlight.drones" },
                { value: "10cm", labelKey: "w200.highlight.accuracy" },
                { value: "100 TOPS", labelKey: "w200.highlight.tops" },
                { value: "200Hz", labelKey: "w200.highlight.refreshRate" },
              ].map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className="text-3xl md:text-4xl font-black text-accent">{item.value}</div>
                  <div className="text-sm text-muted-foreground">{t(item.labelKey)}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Gallery */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{t('w200.gallery.title')}</h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img, index) => (
                <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <img src={img} alt={`W200 UWB Swarm ${index + 1}`} className="rounded-xl w-full aspect-square object-cover shadow-lg" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{t('w200.features.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t('w200.features.desc')}</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <Card className="h-full bg-card border-accent/10 hover:border-accent/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">{feature.icon}</div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{t(feature.titleKey)}</h3>
                      <p className="text-sm text-muted-foreground">{t(feature.descKey)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* UWB Positioning */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <Badge className="mb-4">{t('w200.uwb.badge')}</Badge>
                <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">{t('w200.uwb.title')}</h2>
                <p className="text-muted-foreground mb-6">{t('w200.uwb.desc')}</p>
                <ul className="space-y-3">
                  {["w200.uwb.feature1", "w200.uwb.feature2", "w200.uwb.feature3", "w200.uwb.feature4"].map((key, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <img src={uwbImage} alt="UWB Positioning" className="rounded-2xl shadow-2xl w-full" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Hardware Detail Image */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{t('w200.hardware.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t('w200.hardware.desc')}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center">
              <img src={detailImage} alt={t('w200.hardware.title')} className="rounded-2xl shadow-2xl max-w-5xl w-full" />
            </motion.div>
          </div>
        </section>

        {/* Specifications */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-foreground">{t('w200.specs.title')}</h2>
            </motion.div>
            <Tabs defaultValue="drone" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="drone">{t('w200.specs.tab.drone')}</TabsTrigger>
                <TabsTrigger value="computer">{t('w200.specs.tab.computer')}</TabsTrigger>
                <TabsTrigger value="uwb">{t('w200.specs.tab.uwb')}</TabsTrigger>
              </TabsList>
              {Object.entries(specifications).map(([key, specs]) => (
                <TabsContent key={key} value={key}>
                  <Card>
                    <CardContent className="p-0">
                      <table className="w-full">
                        <tbody>
                          {specs.map((spec, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-muted/50' : 'bg-card'}`}>
                              <td className="px-6 py-4 font-medium text-foreground border-b border-border/30 w-1/3">{t(spec.labelKey)}</td>
                              <td className="px-6 py-4 text-muted-foreground border-b border-border/30">{spec.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Package List */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{t('w200.package.title')}</h2>
              <p className="text-muted-foreground">{t('w200.package.subtitle')}</p>
            </motion.div>
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="bg-accent/10">
                      <th className="px-6 py-4 text-left font-bold text-foreground">{t('w200.package.header.name')}</th>
                      <th className="px-6 py-4 text-left font-bold text-foreground">{t('w200.package.header.spec')}</th>
                      <th className="px-6 py-4 text-center font-bold text-foreground">{t('w200.package.header.qty')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packageList.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-muted/50' : 'bg-card'}>
                        <td className="px-6 py-3 text-foreground border-b border-border/30">{item.name}</td>
                        <td className="px-6 py-3 text-muted-foreground border-b border-border/30">{item.spec}</td>
                        <td className="px-6 py-3 text-center text-muted-foreground border-b border-border/30">{item.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-16 bg-muted/50">
          <div className="container-custom">
            <h3 className="text-xl font-bold text-foreground mb-6">{t('w200.related.title')}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/products/swarm/w300" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/30 hover:border-accent/30 transition-all group">
                <ArrowRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                <div>
                  <span className="font-medium text-foreground group-hover:text-accent transition-colors">{t('w200.related.w300')}</span>
                  <p className="text-xs text-muted-foreground mt-1">{t('w200.related.w300.desc')}</p>
                </div>
              </Link>
              <Link to="/products/swarm/w400" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/30 hover:border-accent/30 transition-all group">
                <ArrowRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                <div>
                  <span className="font-medium text-foreground group-hover:text-accent transition-colors">{t('w200.related.w400')}</span>
                  <p className="text-xs text-muted-foreground mt-1">{t('w200.related.w400.desc')}</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('w200.cta.title')}</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">{t('w200.cta.desc')}</p>
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8">
                {t('common.contactUs')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default W200;
