import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Radio, Navigation, Triangle, Minus, ArrowDownUp, Waypoints } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { OptimizedImage } from "@/components/OptimizedImage";
import taskImg from "@/assets/products/w400-task-allocation.png";
import formationImg from "@/assets/products/w400-formation-flight.png";

const W400SwarmMissionSection = () => {
  const { t } = useLanguage();

  const formations = [
    { icon: <Minus className="h-5 w-5" />, title: t('swarm.c30formationdemosection.k135'), desc: t('swarm.w400swarmmissionsection.k403') },
    { icon: <Triangle className="h-5 w-5" />, title: t('swarm.c30formationdemosection.k138'), desc: t('swarm.w400swarmmissionsection.k404') },
    { icon: <ArrowDownUp className="h-5 w-5" />, title: t('swarm.w400swarmmissionsection.k405'), desc: t('swarm.w400swarmmissionsection.k406') },
  ];

  const tasks = [
    { label: t('swarm.w400swarmmissionsection.k407'), desc: t('swarm.w400swarmmissionsection.k408'), color: "bg-accent" },
    { label: t('swarm.w400swarmmissionsection.k409'), desc: t('swarm.w400swarmmissionsection.k410'), color: "bg-accent" },
    { label: t('swarm.w400swarmmissionsection.k411'), desc: t('swarm.w400swarmmissionsection.k412'), color: "bg-accent" },
  ];

  return (
    <section className="py-20 bg-[hsl(220,20%,8%)] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:30px_30px]" />
      
      <div className="container-custom relative z-10">
        {/* Task Allocation */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Radio className="h-4 w-4" />
            {t('swarm.w400swarmmissionsection.k413')}
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            {t('swarm.w400swarmmissionsection.k414')}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {t('swarm.w400swarmmissionsection.k415')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <OptimizedImage src={taskImg} alt={t('swarm.w400swarmmissionsection.k416')} aspectRatio="4/3" className="w-full rounded-2xl" objectFit="contain" />
          </motion.div>

          <div>
            {/* Task flow */}
            <div className="space-y-4 mb-8">
              {tasks.map((task, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-xl ${task.color}/20 flex items-center justify-center`}>
                    <Navigation className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-accent/30 transition-colors">
                    <div className="font-bold text-accent">{task.label}</div>
                    <div className="text-sm text-white/60">{task.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-2 text-accent font-bold mb-2">
                <Waypoints className="h-4 w-4" />
                {t('swarm.w400swarmmissionsection.k417')}
              </div>
              <p className="text-sm text-white/60">
                {t('swarm.w400swarmmissionsection.k418')}
              </p>
            </div>
          </div>
        </div>

        {/* Formation Flight */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            {t('swarm.w400swarmmissionsection.k419')}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {t('swarm.w400swarmmissionsection.k420')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 order-2 lg:order-1">
            {formations.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-white/5 border-white/10 hover:border-accent/30 transition-colors">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{f.title}</h4>
                      <p className="text-sm text-white/50 mt-1">{f.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
            <OptimizedImage src={formationImg} alt={t('swarm.w400swarmmissionsection.k421')} aspectRatio="4/3" className="w-full rounded-2xl" objectFit="contain" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default W400SwarmMissionSection;
