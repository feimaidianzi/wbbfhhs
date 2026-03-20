import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { BookOpen, Wrench, Code, Monitor, Layers } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import trainingImg from "@/assets/products/w400-training.webp";

const W400TrainingSection = () => {
  const { t } = useLanguage();

  const curriculum = [
    {
      icon: <BookOpen className="h-5 w-5" />,
      chapter: t('swarm.w400trainingsection.k437'),
      items: [
        { id: "1.1", title: t('swarm.w400trainingsection.k438') },
        { id: "1.2", title: t('swarm.w400trainingsection.k439') },
        { id: "1.3", title: t('swarm.w400trainingsection.k440') },
      ],
    },
    {
      icon: <Wrench className="h-5 w-5" />,
      chapter: t('swarm.w400trainingsection.k441'),
      items: [],
    },
    {
      icon: <Layers className="h-5 w-5" />,
      chapter: t('swarm.w400trainingsection.k442'),
      items: [
        { id: "2.1", title: t('swarm.w400trainingsection.k443') },
        { id: "2.2", title: t('swarm.w400trainingsection.k444') },
      ],
    },
    {
      icon: <Monitor className="h-5 w-5" />,
      chapter: t('swarm.w400trainingsection.k445'),
      items: [],
    },
    {
      icon: <Code className="h-5 w-5" />,
      chapter: t('swarm.w400trainingsection.k446'),
      items: [],
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{t('swarm.w400trainingsection.k447')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('swarm.w400trainingsection.k448')}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          {/* Training Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <OptimizedImage src={trainingImg} alt={t('swarm.w400trainingsection.k449')} aspectRatio="16/9" className="w-full rounded-2xl" objectFit="cover" />
          </motion.div>

          {/* Curriculum */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
            <h3 className="text-lg font-bold text-accent mb-4">{t('swarm.w400trainingsection.k450')}</h3>
            {curriculum.map((ch, i) => (
              <div key={i} className="bg-card border border-border/30 rounded-xl p-4 hover:border-accent/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">{ch.icon}</div>
                  <span className="font-bold text-sm text-foreground">{ch.chapter}</span>
                </div>
                {ch.items.length > 0 && (
                  <div className="ml-11 space-y-1">
                    {ch.items.map((item) => (
                      <div key={item.id} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="text-accent/60 font-mono">{item.id}</span>
                        <span>{item.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default W400TrainingSection;
