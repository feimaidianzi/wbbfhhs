import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, Check, Cpu, Radio, Navigation, Layers, Monitor, Wifi, Box, Zap, Users, Target, Settings, Rocket, Shield, Code, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

// 导入产品图片
import heroImage from "@/assets/products/swarm-p230-uwb-hero.jpg";
import uwbImage from "@/assets/products/swarm-uwb-positioning.jpg";
import formationImage from "@/assets/products/swarm-formation.jpg";
import groundStationImage from "@/assets/products/swarm-ground-station.jpg";
import hardwareImage from "@/assets/products/swarm-hardware.jpg";
import communicationImage from "@/assets/products/swarm-communication.png";

const SwarmKit = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <Navigation className="h-6 w-6" />,
      titleKey: "swarm.feature.uwb.title",
      descKey: "swarm.feature.uwb.desc"
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      titleKey: "swarm.feature.jetson.title",
      descKey: "swarm.feature.jetson.desc"
    },
    {
      icon: <Code className="h-6 w-6" />,
      titleKey: "swarm.feature.opensource.title",
      descKey: "swarm.feature.opensource.desc"
    },
    {
      icon: <Radio className="h-6 w-6" />,
      titleKey: "swarm.feature.distributed.title",
      descKey: "swarm.feature.distributed.desc"
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      titleKey: "swarm.feature.groundStation.title",
      descKey: "swarm.feature.groundStation.desc"
    },
    {
      icon: <Layers className="h-6 w-6" />,
      titleKey: "swarm.feature.formation.title",
      descKey: "swarm.feature.formation.desc"
    }
  ];

  const specifications = {
    drone: [
      { labelKey: "swarm.spec.drone.type", value: t("swarm.spec.drone.type.value") },
      { labelKey: "swarm.spec.drone.wheelbase", value: "250mm" },
      { labelKey: "swarm.spec.drone.weight", value: "0.76kg" },
      { labelKey: "swarm.spec.drone.takeoffWeight", value: "1.23kg" },
      { labelKey: "swarm.spec.drone.flightTime", value: "10min" },
      { labelKey: "swarm.spec.drone.hoverAccuracy", value: t("swarm.spec.drone.hoverAccuracy.value") },
      { labelKey: "swarm.spec.drone.fc", value: "Pixhawk 6C" },
      { labelKey: "swarm.spec.drone.environment", value: t("swarm.spec.drone.environment.value") }
    ],
    computer: [
      { labelKey: "swarm.spec.computer.name", value: "Allspark2" },
      { labelKey: "swarm.spec.computer.module", value: "NVIDIA Jetson Orin NX" },
      { labelKey: "swarm.spec.computer.ai", value: "100 TOPS" },
      { labelKey: "swarm.spec.computer.memory", value: "16GB LPDDR5" },
      { labelKey: "swarm.spec.computer.gpu", value: "NVIDIA Ampere (918MHz)" },
      { labelKey: "swarm.spec.computer.cpu", value: "8-core Arm Cortex-A78AE" },
      { labelKey: "swarm.spec.computer.weight", value: "188g" },
      { labelKey: "swarm.spec.computer.dimensions", value: "102.5×62.5×31mm" }
    ],
    uwb: [
      { labelKey: "swarm.spec.uwb.accuracy", value: "10cm" },
      { labelKey: "swarm.spec.uwb.refreshRate", value: "200Hz" },
      { labelKey: "swarm.spec.uwb.latency", value: "<0.5ms" },
      { labelKey: "swarm.spec.uwb.maxTags", value: "200" },
      { labelKey: "swarm.spec.uwb.maxStations", value: "120" },
      { labelKey: "swarm.spec.uwb.range", value: "500m" },
      { labelKey: "swarm.spec.uwb.bandwidth", value: "3Mbps" },
      { labelKey: "swarm.spec.uwb.weight", value: "34.3g" }
    ]
  };

  const packageList = [
    { nameKey: "swarm.package.drone", specKey: "swarm.package.drone.spec", qty: "3" },
    { nameKey: "swarm.package.propeller", specKey: "swarm.package.propeller.spec", qtyKey: "swarm.package.propeller.qty" },
    { nameKey: "swarm.package.controller", spec: "Amovlab-E2", qty: "3" },
    { nameKey: "swarm.package.commMobile", spec: "Mini Homer", qty: "6" },
    { nameKey: "swarm.package.commBase", spec: "Mini Homer", qty: "1" },
    { nameKey: "swarm.package.uwbStation", spec: "Linktrack P-B", qty: "4" },
    { nameKey: "swarm.package.uwbTag", spec: "Linktrack P-B", qty: "3" },
    { nameKey: "swarm.package.computer", spec: "Allspark2 Orin NX", qty: "3" },
    { nameKey: "swarm.package.simController", specKey: "swarm.package.simController.spec", qty: "1" },
    { nameKey: "swarm.package.simPC", spec: "SWNUC12WSKi5000", qty: "1" },
    { nameKey: "swarm.package.battery", spec: "4S 5300mAh LiPo", qty: "3" },
    { nameKey: "swarm.package.charger", spec: "1SDT-PD60", qty: "3" }
  ];

  const formationKeys = [
    "swarm.formation.triangle",
    "swarm.formation.column",
    "swarm.formation.square",
    "swarm.formation.circle",
    "swarm.formation.orbit",
    "swarm.formation.leaderFollower",
    "swarm.formation.switch",
    "swarm.formation.position"
  ];

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={t("swarm.seo.title")}
        description={t("swarm.seo.description")}
        keywords={t("swarm.seo.keywords")}
        path="/products/swarm-kit"
      />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt="P230-UWB Swarm Kit" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </div>

          <div className="container-custom relative z-10 text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <BackButton to="/products" label={t('swarm.back')} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-accent/90 text-accent-foreground mb-4">
                Prometheus 230-UWB
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
            >
              {t('swarm.hero.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8"
            >
              {t('swarm.hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8">
                  {t('common.contactUs')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-6 h-6 text-white/60 animate-bounce" />
          </motion.div>
        </section>

        {/* Key Highlights */}
        <section className="py-12 bg-accent/10">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "3", labelKey: "swarm.highlight.drones" },
                { value: "10cm", labelKey: "swarm.highlight.accuracy" },
                { value: "100", labelKey: "swarm.highlight.tops" },
                { value: "200Hz", labelKey: "swarm.highlight.refreshRate" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-black text-accent">{item.value}</div>
                  <div className="text-sm text-muted-foreground">{t(item.labelKey)}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                {t('swarm.features.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('swarm.features.desc')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full bg-card border-accent/10 hover:border-accent/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{t(feature.titleKey)}</h3>
                      <p className="text-sm text-muted-foreground">{t(feature.descKey)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* UWB Positioning Section */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge className="mb-4">{t('swarm.uwb.badge')}</Badge>
                <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
                  {t('swarm.uwb.title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('swarm.uwb.desc')}
                </p>
                <ul className="space-y-3">
                  {[
                    "swarm.uwb.feature1",
                    "swarm.uwb.feature2",
                    "swarm.uwb.feature3",
                    "swarm.uwb.feature4"
                  ].map((key, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img src={uwbImage} alt="UWB Positioning" className="rounded-2xl shadow-2xl w-full" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Formation Modes */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <img alt="Formation Modes" className="rounded-2xl shadow-2xl w-full" src="/lovable-uploads/0691809d-4d01-442d-aeb4-0d42e61e945a.png" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <Badge className="mb-4">{t('swarm.formationSection.badge')}</Badge>
                <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
                  {t('swarm.formationSection.title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('swarm.formationSection.desc')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {formationKeys.map((key, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {t(key)}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Communication System */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4">{t('swarm.comm.badge')}</Badge>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                {t('swarm.comm.title')}
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                {t('swarm.comm.desc')}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <img
                src={communicationImage}
                alt={t('swarm.comm.imageAlt')}
                className="rounded-2xl shadow-2xl max-w-4xl w-full bg-white p-4"
              />
            </motion.div>
          </div>
        </section>

        {/* Ground Station */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge className="mb-4">{t('swarm.groundStation.badge')}</Badge>
                <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
                  {t('swarm.groundStation.title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('swarm.groundStation.desc')}
                </p>
                <ul className="space-y-3">
                  {[
                    "swarm.groundStation.feature1",
                    "swarm.groundStation.feature2",
                    "swarm.groundStation.feature3",
                    "swarm.groundStation.feature4"
                  ].map((key, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img src={groundStationImage} alt="Ground Station" className="rounded-2xl shadow-2xl w-full" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                {t('swarm.specs.title')}
              </h2>
            </motion.div>

            <Tabs defaultValue="drone" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="drone">{t('swarm.specs.tab.drone')}</TabsTrigger>
                <TabsTrigger value="computer">{t('swarm.specs.tab.computer')}</TabsTrigger>
                <TabsTrigger value="uwb">{t('swarm.specs.tab.uwb')}</TabsTrigger>
              </TabsList>

              {Object.entries(specifications).map(([key, specs]) => (
                <TabsContent key={key} value={key}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {specs.map((spec, index) => (
                          <div key={index} className="flex justify-between py-3 border-b border-accent/10 last:border-0">
                            <span className="text-muted-foreground">{t(spec.labelKey)}</span>
                            <span className="font-medium text-foreground">{spec.value}</span>
                          </div>
                        ))}
                      </div>
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                {t('swarm.package.title')}
              </h2>
              <p className="text-muted-foreground">
                {t('swarm.package.subtitle')}
              </p>
            </motion.div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-accent/10 bg-accent/5">
                        <th className="text-left p-4 font-semibold">{t('swarm.package.header.name')}</th>
                        <th className="text-left p-4 font-semibold">{t('swarm.package.header.spec')}</th>
                        <th className="text-center p-4 font-semibold">{t('swarm.package.header.qty')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packageList.map((item, index) => (
                        <tr key={index} className="border-b border-accent/10 last:border-0">
                          <td className="p-4 font-medium">{t(item.nameKey)}</td>
                          <td className="p-4 text-muted-foreground">{item.specKey ? t(item.specKey) : item.spec}</td>
                          <td className="p-4 text-center">{item.qtyKey ? t(item.qtyKey) : item.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-cyan-500/10">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
                {t('swarm.cta.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t('swarm.cta.desc')}
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8">
                  {t('common.contactUs')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
};

export default SwarmKit;
