import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle, AlertTriangle, Activity, Cpu, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { OptimizedImage } from "@/components/OptimizedImage";
import selfcheckImg from "@/assets/products/w400-selfcheck.png";
import rtkImg from "@/assets/products/w400-rtk-coordinate.png";

const W400IntelligentSystemSection = () => {
  const { t } = useLanguage();

  const selfCheckItems = [
    { icon: <CheckCircle className="h-5 w-5" />, title: t('swarm.w400intelligentsystemsection.k336'), desc: t('swarm.w400intelligentsystemsection.k337') },
    { icon: <Activity className="h-5 w-5" />, title: t('swarm.w400intelligentsystemsection.k338'), desc: t('swarm.w400intelligentsystemsection.k339') },
    { icon: <Cpu className="h-5 w-5" />, title: t('swarm.w400intelligentsystemsection.k340'), desc: t('swarm.w400intelligentsystemsection.k341') },
    { icon: <AlertTriangle className="h-5 w-5" />, title: t('swarm.w400intelligentsystemsection.k342'), desc: t('swarm.w400intelligentsystemsection.k343') },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        {/* Self-Check System */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-bold mb-4">
            <ShieldCheck className="h-4 w-4" />
            {t('swarm.w400intelligentsystemsection.k344')}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            {t('swarm.w400intelligentsystemsection.k345')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('swarm.w400intelligentsystemsection.k346')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <OptimizedImage src={selfcheckImg} alt={t('swarm.w400intelligentsystemsection.k347')} aspectRatio="1/1" className="w-full max-w-md mx-auto rounded-2xl" objectFit="contain" />
          </motion.div>
          <div className="space-y-4">
            {selfCheckItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-card border-border/30 hover:border-accent/30 transition-colors">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RTK Coordinate Correction */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Search className="h-4 w-4" />
            {t('swarm.w400intelligentsystemsection.k348')}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            {t('swarm.w400intelligentsystemsection.k349')}
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {t('swarm.w400intelligentsystemsection.k350')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Before: individual origins */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="bg-card border-border/30 overflow-hidden">
              <CardContent className="p-0">
                <OptimizedImage src={rtkImg} alt={t('swarm.w400intelligentsystemsection.k351')} aspectRatio="4/3" className="w-full" objectFit="contain" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Explanation cards */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
            <Card className="bg-card border-accent/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-accent font-bold mb-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs">1</span>
                  {t('swarm.w400intelligentsystemsection.k352')}
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('swarm.w400intelligentsystemsection.k353')}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-accent/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-accent font-bold mb-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs">2</span>
                  {t('swarm.w400intelligentsystemsection.k354')}
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('swarm.w400intelligentsystemsection.k355')}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-accent/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-accent font-bold mb-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs">3</span>
                  {t('swarm.w400intelligentsystemsection.k356')}
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('swarm.w400intelligentsystemsection.k357')}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default W400IntelligentSystemSection;
