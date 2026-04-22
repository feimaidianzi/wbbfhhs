import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "@/lib/motion-shim";
import { Satellite, Cpu, Code, MapPin, Monitor, Layers, Crosshair, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { OptimizedImage } from "@/components/OptimizedImage";

import swarmFormationImg from "@/assets/products/w400-swarm-formation.webp";

const W400FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Satellite className="h-6 w-6" />,
      title: t('swarm.w400featuressection.k307'),
      desc: t('swarm.w400featuressection.k308'),
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: t('swarm.w400featuressection.k309'),
      desc: t('swarm.w400featuressection.k310'),
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: t('swarm.w400featuressection.k311'),
      desc: t('swarm.w400featuressection.k312'),
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: t('swarm.w400featuressection.k313'),
      desc: t('swarm.w400featuressection.k314'),
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      title: t('swarm.w400featuressection.k315'),
      desc: t('swarm.w400featuressection.k316'),
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: t('swarm.w400featuressection.k317'),
      desc: t('swarm.w400featuressection.k318'),
    },
  ];

  const capabilities = [
    { icon: <Layers className="h-5 w-5" />, title: t('swarm.w400featuressection.k319'), desc: t('swarm.w400featuressection.k320') },
    { icon: <MapPin className="h-5 w-5" />, title: t('swarm.w400featuressection.k321'), desc: t('swarm.w400featuressection.k322') },
    { icon: <Crosshair className="h-5 w-5" />, title: t('swarm.w400featuressection.k323'), desc: t('swarm.w400featuressection.k324') },
    { icon: <Search className="h-5 w-5" />, title: t('swarm.w400featuressection.k325'), desc: t('swarm.w400featuressection.k326') },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        {/* Swarm Formation Image */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto mb-16">
          <OptimizedImage src={swarmFormationImg} alt={t('swarm.w400featuressection.k327')} aspectRatio="16/9" className="w-full rounded-2xl" objectFit="cover" />
          <p className="text-center text-xs text-muted-foreground mt-3">{t('swarm.w400featuressection.k328')}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{t('swarm.c20featuressection.k13')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('swarm.w400featuressection.k329')}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Card className="h-full bg-card border-accent/10 hover:border-accent/30 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">{f.icon}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Capabilities Grid */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">{t('swarm.w400featuressection.k330')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {capabilities.map((c, i) => (
              <div key={i} className="bg-accent/5 border border-accent/10 rounded-xl p-4 text-center hover:border-accent/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3 text-accent">{c.icon}</div>
                <div className="font-bold text-sm text-foreground">{c.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default W400FeaturesSection;
