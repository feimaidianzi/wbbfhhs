import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "@/lib/motion-shim";
import { Crosshair, Cpu, Monitor, Radio, Wifi, Code } from "lucide-react";

const W300SystemArchitecture = () => {
  const { t } = useLanguage();

  const rosNodes = [
    {
      name: "formation_setmode",
      type: "Service",
      topic: t('swarm.w300systemarchitecture.k260'),
      color: "bg-blue-500/10 border-blue-500/30 text-blue-600",
    },
    {
      name: "/usr/*/mavros",
      type: "Node",
      topic: t('swarm.w300systemarchitecture.k261'),
      color: "bg-green-500/10 border-green-500/30 text-green-600",
    },
    {
      name: "formation_state",
      type: "Topic",
      topic: t('swarm.w300systemarchitecture.k262'),
      color: "bg-orange-500/10 border-orange-500/30 text-orange-600",
    },
  ];

  const serviceTopics = [
    { label: "/mavros/CommandBool", desc: t('swarm.w300systemarchitecture.k263') },
    { label: "/mavros/set_mode", desc: t('swarm.w300systemarchitecture.k264') },
    { label: "/mavros/local_position/pose", desc: t('swarm.w300systemarchitecture.k265') },
    { label: "/mavros/State", desc: t('swarm.w300systemarchitecture.k266') },
  ];

  const archBlocks = [
    {
      icon: <Crosshair className="h-5 w-5" />,
      title: t('swarm.w300systemarchitecture.k267'),
      items: [
        t('swarm.w300systemarchitecture.k268'),
        t('swarm.w300systemarchitecture.k269'),
        t('swarm.w300systemarchitecture.k270'),
      ],
    },
    {
      icon: <Radio className="h-5 w-5" />,
      title: t('swarm.w200systemarchitecture.k244'),
      items: [
        t('swarm.w300systemarchitecture.k271'),
        t('swarm.w300systemarchitecture.k272'),
        t('swarm.w300systemarchitecture.k273'),
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
      title: t('swarm.w300systemarchitecture.k274'),
      items: [
        t('swarm.w300systemarchitecture.k275'),
        t('swarm.w300systemarchitecture.k276'),
        t('swarm.w300systemarchitecture.k277'),
      ],
    },
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
            {t('swarm.w300systemarchitecture.k278')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('swarm.w300systemarchitecture.k279')}
          </p>
        </motion.div>

        {/* ROS Architecture Diagram as HTML */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-card rounded-2xl border border-border/30 p-8">
            <h3 className="text-center text-sm font-bold text-muted-foreground mb-8 uppercase tracking-wider">
              {t('swarm.w300systemarchitecture.k280')}
            </h3>

            {/* ROS Nodes */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8">
              {rosNodes.map((node, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`px-6 py-4 rounded-xl border-2 ${node.color} text-center min-w-[180px]`}>
                    <div className="text-xs font-medium opacity-70 mb-1">{node.type}</div>
                    <div className="font-mono text-sm font-bold">{node.name}</div>
                    <div className="text-xs mt-1 opacity-80">{node.topic}</div>
                  </div>
                  {index < rosNodes.length - 1 && (
                    <div className="hidden md:block absolute">
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Connecting arrows visual */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-8 h-px bg-accent"></div>
                <span>Service / Topic</span>
                <div className="w-8 h-px bg-accent"></div>
              </div>
            </div>

            {/* Service/Topic list */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {serviceTopics.map((item, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-3 text-center">
                  <div className="font-mono text-xs text-accent font-bold mb-1 break-all">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* System blocks */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>
    </section>
  );
};

export default W300SystemArchitecture;
