import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Satellite, Cpu, Monitor, Radio, Navigation, Layers } from "lucide-react";

const W400SystemArchitecture = () => {
  const { t } = useLanguage();

  const systemFlow = [
    {
      icon: <Satellite className="h-5 w-5" />,
      title: t('swarm.w400systemarchitecture.k422'),
      items: [
        "GPS / GLONASS / BeiDou / Galileo",
        t('swarm.w400systemarchitecture.k423'),
        t('swarm.w400systemarchitecture.k424'),
      ],
    },
    {
      icon: <Radio className="h-5 w-5" />,
      title: t('swarm.w200systemarchitecture.k244'),
      items: [
        "Mini Homer",
        t('swarm.w400systemarchitecture.k425'),
        t('swarm.w400systemarchitecture.k426'),
        t('swarm.w400systemarchitecture.k427'),
      ],
    },
    {
      icon: <Cpu className="h-5 w-5" />,
      title: t('swarm.w400systemarchitecture.k428'),
      items: [
        "Allspark2 + Jetson Orin NX",
        "100 TOPS AI",
        "16GB LPDDR5",
        "8-core Arm Cortex-A78AE",
      ],
    },
    {
      icon: <Monitor className="h-5 w-5" />,
      title: t('swarm.w200systemarchitecture.k248'),
      items: [
        t('swarm.w200systemarchitecture.k249'),
        t('swarm.w400systemarchitecture.k429'),
        t('swarm.w400systemarchitecture.k430'),
      ],
    },
  ];

  // Extracted from swarm-w400-detail.jpg / swarm-w400-system.jpg
  const taskFlow = [
    { label: t('swarm.w400systemarchitecture.k431'), desc: t('swarm.w400swarmmissionsection.k408') },
    { label: t('swarm.w400systemarchitecture.k432'), desc: t('swarm.w400swarmmissionsection.k410') },
    { label: t('swarm.w400systemarchitecture.k433'), desc: t('swarm.w400swarmmissionsection.k412') },
  ];

  return (
    <section className="py-20 bg-secondary">
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
            {t('swarm.w400systemarchitecture.k434')}
          </p>
        </motion.div>

        {/* Task Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="bg-card rounded-2xl border border-border/30 p-8">
            <h3 className="text-center text-sm font-bold text-muted-foreground mb-6 uppercase tracking-wider">
              {t('swarm.w400systemarchitecture.k435')}
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-6">
              {taskFlow.map((task, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="bg-accent/10 border-2 border-accent/30 rounded-xl px-6 py-4 text-center min-w-[140px]">
                    <div className="font-bold text-accent text-lg">{task.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{task.desc}</div>
                  </div>
                  {index < taskFlow.length - 1 && (
                    <div className="hidden md:block text-accent">
                      <Navigation className="h-4 w-4 rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <div className="w-8 h-px bg-accent"></div>
              <span>{t('swarm.w400systemarchitecture.k436')}</span>
              <div className="w-8 h-px bg-accent"></div>
            </div>
          </div>
        </motion.div>

        {/* System blocks */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemFlow.map((block, index) => (
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
      </div>
    </section>
  );
};

export default W400SystemArchitecture;
