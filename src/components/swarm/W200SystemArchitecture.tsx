import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "@/lib/motion-shim";
import { Wifi, Monitor, Navigation, Radio, Cpu, Layers } from "lucide-react";

const W200SystemArchitecture = () => {
  const { t } = useLanguage();

  const archBlocks = [
    {
      icon: <Navigation className="h-5 w-5" />,
      title: t('swarm.w200systemarchitecture.k240'),
      items: [
        t('swarm.w200systemarchitecture.k241'),
        t('swarm.w200systemarchitecture.k242'),
        t('swarm.w200systemarchitecture.k243'),
      ],
    },
    {
      icon: <Radio className="h-5 w-5" />,
      title: t('swarm.w200systemarchitecture.k244'),
      items: [
        t('swarm.w200systemarchitecture.k245'),
        t('swarm.w200systemarchitecture.k246'),
        t('swarm.w200systemarchitecture.k247'),
      ],
    },
    {
      icon: <Cpu className="h-5 w-5" />,
      title: t('swarm.c30specssection.k218'),
      items: [
        "Allspark2 Orin NX",
        "100 TOPS AI",
        "16GB LPDDR5",
      ],
    },
    {
      icon: <Monitor className="h-5 w-5" />,
      title: t('swarm.w200systemarchitecture.k248'),
      items: [
        t('swarm.w200systemarchitecture.k249'),
        t('swarm.w200systemarchitecture.k250'),
        t('swarm.w200systemarchitecture.k251'),
      ],
    },
  ];

  const keyFeatures = [
    t('swarm.w200systemarchitecture.k252'),
    t('swarm.w200systemarchitecture.k253'),
    t('swarm.w200systemarchitecture.k254'),
    t('swarm.w200systemarchitecture.k255'),
    t('swarm.w200systemarchitecture.k256'),
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            {t('swarm.w200systemarchitecture.k257')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('swarm.w200systemarchitecture.k258')}
          </p>
        </motion.div>

        {/* Architecture blocks */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {archBlocks.map((block, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border/30 rounded-xl p-6 hover:border-accent/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                {block.icon}
              </div>
              <h3 className="font-bold text-foreground mb-3">{block.title}</h3>
              <ul className="space-y-2">
                {block.items.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Key features list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-accent/5 rounded-2xl p-8 border border-accent/10"
        >
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">
            {t('swarm.w200systemarchitecture.k259')}
          </h3>
          <ul className="space-y-4">
            {keyFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold mt-0.5">
                  {index + 1}
                </span>
                <span className="text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default W200SystemArchitecture;
