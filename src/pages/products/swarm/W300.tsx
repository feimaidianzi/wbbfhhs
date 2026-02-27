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
import { ArrowRight, Check, Cpu, Radio, Navigation, Layers, Monitor, Camera, Zap, Code, ChevronDown, Crosshair } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";

import heroImage from "@/assets/products/swarm-mocap-showcase.jpg";
import detailImage from "@/assets/products/swarm-w300-detail.jpg";
import softwareImage from "@/assets/products/swarm-w300-software.jpg";
import setupImage from "@/assets/products/swarm-w300-setup.jpg";
import groundStationImage from "@/assets/products/swarm-ground-station.jpg";
import communicationImage from "@/assets/products/swarm-communication.png";

const W300 = () => {
  const { t } = useLanguage();

  const features = [
    { icon: <Crosshair className="h-6 w-6" />, titleKey: "w300.feature.mocap.title", descKey: "w300.feature.mocap.desc" },
    { icon: <Cpu className="h-6 w-6" />, titleKey: "w300.feature.jetson.title", descKey: "w300.feature.jetson.desc" },
    { icon: <Code className="h-6 w-6" />, titleKey: "w300.feature.opensource.title", descKey: "w300.feature.opensource.desc" },
    { icon: <Camera className="h-6 w-6" />, titleKey: "w300.feature.submm.title", descKey: "w300.feature.submm.desc" },
    { icon: <Monitor className="h-6 w-6" />, titleKey: "w300.feature.groundStation.title", descKey: "w300.feature.groundStation.desc" },
    { icon: <Layers className="h-6 w-6" />, titleKey: "w300.feature.formation.title", descKey: "w300.feature.formation.desc" },
  ];

  const specifications = {
    drone: [
      { labelKey: "w300.spec.drone.type", value: t("w300.spec.drone.type.value") },
      { labelKey: "w300.spec.drone.wheelbase", value: "250mm" },
      { labelKey: "w300.spec.drone.weight", value: "0.58kg" },
      { labelKey: "w300.spec.drone.takeoffWeight", value: "1.0kg" },
      { labelKey: "w300.spec.drone.flightTime", value: "12min" },
      { labelKey: "w300.spec.drone.hoverAccuracy", value: t("w300.spec.drone.hoverAccuracy.value") },
      { labelKey: "w300.spec.drone.fc", value: "Pixhawk 6C" },
      { labelKey: "w300.spec.drone.environment", value: t("w300.spec.drone.environment.value") },
    ],
    mocap: [
      { labelKey: "w300.spec.mocap.system", value: "OptiTrack / NOKOV / VICON" },
      { labelKey: "w300.spec.mocap.accuracy", value: "±1mm" },
      { labelKey: "w300.spec.mocap.refreshRate", value: "360Hz" },
      { labelKey: "w300.spec.mocap.latency", value: "<0.2ms" },
      { labelKey: "w300.spec.mocap.markers", value: t("w300.spec.mocap.markers.value") },
      { labelKey: "w300.spec.mocap.range", value: t("w300.spec.mocap.range.value") },
    ],
    computer: [
      { labelKey: "w300.spec.computer.name", value: "Allspark2" },
      { labelKey: "w300.spec.computer.module", value: "NVIDIA Jetson Orin NX" },
      { labelKey: "w300.spec.computer.ai", value: "100 TOPS" },
      { labelKey: "w300.spec.computer.memory", value: "16GB LPDDR5" },
      { labelKey: "w300.spec.computer.gpu", value: "NVIDIA Ampere (918MHz)" },
      { labelKey: "w300.spec.computer.cpu", value: "8-core Arm Cortex-A78AE" },
    ],
  };

  const images = [heroImage, softwareImage, setupImage];

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={t("w300.seo.title")}
        description={t("w300.seo.description")}
        keywords={t("w300.seo.keywords")}
        path="/products/swarm/w300"
      />
      <PageStructuredData data={{ type: 'Product', name: 'W300 MOCAP Swarm Kit', description: t("w300.seo.description"), category: 'Swarm Drone System', sku: 'W300-MOCAP' }} />
      <Header />
      <FloatingContact />
      <BackButton to="/products/swarm" label={t('w300.back')} />

      <main>
        {/* Hero */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt={t("w300.hero.title")} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </div>
          <div className="container-custom relative z-10 text-center py-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="bg-accent/90 text-accent-foreground mb-4">W300 MOCAP</Badge>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              {t('w300.hero.title')}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8">
              {t('w300.hero.subtitle')}
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
        </section>

        {/* Highlights */}
        <section className="py-12 bg-accent/10">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "±1mm", labelKey: "w300.highlight.accuracy" },
                { value: "360Hz", labelKey: "w300.highlight.refreshRate" },
                { value: "100 TOPS", labelKey: "w300.highlight.tops" },
                { value: "<0.2ms", labelKey: "w300.highlight.latency" },
              ].map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className="text-3xl md:text-4xl font-black text-accent">{item.value}</div>
                  <div className="text-sm text-muted-foreground">{t(item.labelKey)}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{t('w300.gallery.title')}</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {images.map((img, index) => (
                <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <img src={img} alt={`W300 MOCAP ${index + 1}`} className="rounded-xl w-full aspect-[4/3] object-cover shadow-lg" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{t('w300.features.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t('w300.features.desc')}</p>
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

        {/* MOCAP Technology */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <Badge className="mb-4">{t('w300.mocap.badge')}</Badge>
                <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">{t('w300.mocap.title')}</h2>
                <p className="text-muted-foreground mb-6">{t('w300.mocap.desc')}</p>
                <ul className="space-y-3">
                  {["w300.mocap.feature1", "w300.mocap.feature2", "w300.mocap.feature3", "w300.mocap.feature4"].map((key, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <img src={detailImage} alt="MOCAP System" className="rounded-2xl shadow-2xl w-full" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Software Architecture */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{t('w300.software.title')}</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">{t('w300.software.desc')}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center">
              <img src={communicationImage} alt={t('w300.software.title')} className="rounded-2xl shadow-2xl max-w-4xl w-full bg-white p-4" />
            </motion.div>
          </div>
        </section>

        {/* Specifications */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-foreground">{t('w300.specs.title')}</h2>
            </motion.div>
            <Tabs defaultValue="drone" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="drone">{t('w300.specs.tab.drone')}</TabsTrigger>
                <TabsTrigger value="mocap">{t('w300.specs.tab.mocap')}</TabsTrigger>
                <TabsTrigger value="computer">{t('w300.specs.tab.computer')}</TabsTrigger>
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

        {/* Related Products */}
        <section className="py-16 bg-muted/50">
          <div className="container-custom">
            <h3 className="text-xl font-bold text-foreground mb-6">{t('w300.related.title')}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/products/swarm/w200" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/30 hover:border-accent/30 transition-all group">
                <ArrowRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                <div>
                  <span className="font-medium text-foreground group-hover:text-accent transition-colors">{t('w300.related.w200')}</span>
                  <p className="text-xs text-muted-foreground mt-1">{t('w300.related.w200.desc')}</p>
                </div>
              </Link>
              <Link to="/products/swarm/w400" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/30 hover:border-accent/30 transition-all group">
                <ArrowRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                <div>
                  <span className="font-medium text-foreground group-hover:text-accent transition-colors">{t('w300.related.w400')}</span>
                  <p className="text-xs text-muted-foreground mt-1">{t('w300.related.w400.desc')}</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('w300.cta.title')}</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">{t('w300.cta.desc')}</p>
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

export default W300;
