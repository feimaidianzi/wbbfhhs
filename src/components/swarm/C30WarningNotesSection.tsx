import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { AlertTriangle, Camera, Maximize, Users } from "lucide-react";

const C30WarningNotesSection = () => {
  const { t } = useLanguage();

  const notes = [
    {
      icon: Maximize,
      title: t('swarm.c30warningnotessection.k228'),
      items: [
        t('swarm.c30warningnotessection.k229'),
        t('swarm.c30warningnotessection.k230'),
        t('swarm.c30warningnotessection.k231'),
      ],
    },
    {
      icon: Camera,
      title: t('swarm.c30warningnotessection.k232'),
      items: [
        t('swarm.c30warningnotessection.k233'),
        t('swarm.c30warningnotessection.k234'),
        t('swarm.c30warningnotessection.k235'),
      ],
    },
    {
      icon: Users,
      title: t('swarm.c30warningnotessection.k236'),
      items: [
        t('swarm.c30warningnotessection.k237'),
        t('swarm.c30warningnotessection.k238'),
      ],
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-destructive/5 border-2 border-destructive/20 overflow-hidden"
        >
          {/* Header bar */}
          <div className="bg-destructive/10 px-6 py-4 flex items-center gap-3 border-b border-destructive/20">
            <AlertTriangle className="w-6 h-6 text-destructive shrink-0" />
            <h3 className="text-lg font-bold text-destructive">
              {t('swarm.c30warningnotessection.k239')}
            </h3>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-3 gap-6">
              {notes.map((note, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 mb-3">
                    <note.icon className="w-5 h-5 text-destructive/70" />
                    <h4 className="font-bold text-foreground text-sm">{note.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {note.items.map((item, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-destructive/60 mt-1 shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default C30WarningNotesSection;
