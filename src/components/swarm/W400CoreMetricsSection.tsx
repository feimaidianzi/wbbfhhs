import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Battery, Weight, Timer, Zap, Ruler, Wind } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import enduranceImg from "@/assets/products/w400-endurance.png";

const W400CoreMetricsSection = () => {
  const { t } = useLanguage();

  const metrics = [
    { icon: <Timer className="h-6 w-6" />, value: "30min", label: t('swarm.w400coremetricssection.k288'), desc: t('swarm.w400coremetricssection.k289') },
    { icon: <Weight className="h-6 w-6" />, value: "4kg", label: t('swarm.c20specssection.k67'), desc: t('swarm.w400coremetricssection.k290') },
    { icon: <Battery className="h-6 w-6" />, value: "10000mAh", label: t('swarm.w400coremetricssection.k291'), desc: t('swarm.w400coremetricssection.k292') },
    { icon: <Zap className="h-6 w-6" />, value: "22.2V", label: t('swarm.c20specssection.k79'), desc: t('swarm.w400coremetricssection.k293') },
    { icon: <Ruler className="h-6 w-6" />, value: "600mm", label: t('swarm.w400coremetricssection.k294'), desc: t('swarm.w400coremetricssection.k295') },
    { icon: <Wind className="h-6 w-6" />, value: t('swarm.w400coremetricssection.k296'), label: t('swarm.w400coremetricssection.k297'), desc: t('swarm.w400coremetricssection.k298') },
  ];

  return (
    <section className="py-20 bg-[hsl(220,20%,8%)] text-white relative overflow-hidden">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
      
      <div className="container-custom relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            {t('swarm.w400coremetricssection.k299')}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {t('swarm.w400coremetricssection.k300')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Product image */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <OptimizedImage src={enduranceImg} alt={t('swarm.w400coremetricssection.k301')} aspectRatio="4/3" className="w-full rounded-2xl" objectFit="contain" />
          </motion.div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-accent/40 transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent/30 transition-colors">
                    {m.icon}
                  </div>
                  <div className="text-2xl font-black text-accent">{m.value}</div>
                </div>
                <div className="font-bold text-sm text-white/90">{m.label}</div>
                <div className="text-xs text-white/50 mt-1">{m.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Battery energy dashboard */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 max-w-3xl mx-auto">
          <div className="bg-white/5 border border-accent/20 rounded-2xl p-6 md:p-8">
            <h3 className="text-center text-sm font-bold text-accent mb-6 uppercase tracking-wider flex items-center justify-center gap-2">
              <Zap className="h-4 w-4" />
              {t('swarm.w400coremetricssection.k302')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { val: "22.2V", lab: t('swarm.w400coremetricssection.k303') },
                { val: "10000mAh", lab: t('swarm.w400coremetricssection.k304') },
                { val: "222Wh", lab: t('swarm.w400coremetricssection.k305') },
                { val: "XT60", lab: t('swarm.w400coremetricssection.k306') },
              ].map((b, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="text-xl md:text-2xl font-black text-accent">{b.val}</div>
                  <div className="text-xs text-white/50 mt-1">{b.lab}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default W400CoreMetricsSection;
