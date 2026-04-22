import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "@/lib/motion-shim";
import { Card, CardContent } from "@/components/ui/card";
import { Crosshair, Cpu, Code, Camera, Monitor, Layers, Zap, Users } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import droneMainImg from "@/assets/products/c30-drone-main.webp";

const C30FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Crosshair className="h-6 w-6" />,
      title: t('swarm.c30featuressection.k116'),
      desc: t('swarm.c30featuressection.k117'),
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: t('swarm.c30featuressection.k118'),
      desc: t('swarm.c30featuressection.k119'),
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: t('swarm.c30featuressection.k120'),
      desc: t('swarm.c30featuressection.k121'),
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: t('swarm.c30featuressection.k122'),
      desc: t('swarm.c30featuressection.k123'),
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      title: t('swarm.c30featuressection.k124'),
      desc: t('swarm.c30featuressection.k125'),
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t('swarm.c30featuressection.k126'),
      desc: t('swarm.c30featuressection.k127'),
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        {/* Product Hero Image */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-2xl mx-auto mb-12">
          <OptimizedImage src={droneMainImg} alt="CANI C30 动捕集群无人机整机" aspectRatio="4/3" className="w-full rounded-2xl" objectFit="contain" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{t('swarm.c20featuressection.k13')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('swarm.c30featuressection.k128')}</p>
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

export default C30FeaturesSection;
