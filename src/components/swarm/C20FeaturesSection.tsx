import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation, Cpu, Code, Radio, Eye, Layers, Zap, Package } from "lucide-react";

const C20FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Navigation className="h-6 w-6" />,
      title: t('swarm.c20featuressection.k1'),
      desc: t('swarm.c20featuressection.k2'),
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: t('swarm.c20featuressection.k3'),
      desc: t('swarm.c20featuressection.k4'),
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: t('swarm.c20featuressection.k5'),
      desc: t('swarm.c20featuressection.k6'),
    },
    {
      icon: <Radio className="h-6 w-6" />,
      title: t('swarm.c20featuressection.k7'),
      desc: t('swarm.c20featuressection.k8'),
    },
    {
      icon: <Package className="h-6 w-6" />,
      title: t('swarm.c20featuressection.k9'),
      desc: t('swarm.c20featuressection.k10'),
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: t('swarm.c20featuressection.k11'),
      desc: t('swarm.c20featuressection.k12'),
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{t('swarm.c20featuressection.k13')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('swarm.c20featuressection.k14')}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <Card className="h-full bg-card border-accent/10 hover:border-accent/40 hover:shadow-[0_0_20px_hsl(var(--accent)/0.15)] transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default C20FeaturesSection;
