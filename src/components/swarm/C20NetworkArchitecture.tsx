import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Radio, Wifi, Monitor, Navigation, Cpu, ArrowRight, ArrowDown } from "lucide-react";

const C20NetworkArchitecture = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{t('swarm.c20networkarchitecture.k28')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('swarm.c20networkarchitecture.k29')}</p>
        </motion.div>

        {/* Network topology */}
        <div className="max-w-5xl mx-auto">
          {/* Top: Ground Station */}
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center mb-8">
            <div className="bg-card border-2 border-accent/40 rounded-xl px-6 py-4 shadow-[0_0_25px_hsl(var(--accent)/0.15)] text-center">
              <Monitor className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="font-bold text-foreground">{t('swarm.c20networkarchitecture.k30')}</div>
              <div className="text-xs text-muted-foreground">{t('swarm.c20networkarchitecture.k31')}</div>
            </div>
          </motion.div>

          {/* Connection line */}
          <div className="flex justify-center mb-4">
            <div className="flex flex-col items-center">
              <div className="w-px h-8 bg-gradient-to-b from-accent/60 to-accent/20" />
              <div className="text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded">{t('swarm.c20networkarchitecture.k32')}</div>
              <div className="w-px h-8 bg-gradient-to-b from-accent/20 to-accent/60" />
            </div>
          </div>

          {/* Middle: Communication Hub */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex justify-center mb-8">
            <div className="bg-card border border-accent/30 rounded-xl px-6 py-4 text-center">
              <Wifi className="h-6 w-6 text-accent mx-auto mb-2" />
              <div className="font-bold text-sm text-foreground">{t('swarm.c20networkarchitecture.k33')}</div>
              <div className="text-xs text-muted-foreground">{t('swarm.c20networkarchitecture.k34')}</div>
            </div>
          </motion.div>

          {/* Connection lines to drones */}
          <div className="flex justify-center mb-4">
            <div className="relative w-full max-w-xl">
              <div className="absolute left-1/2 top-0 w-px h-6 bg-accent/40 -translate-x-1/2" />
              <div className="absolute top-6 left-[15%] right-[15%] h-px bg-accent/30" />
              {[15, 50, 85].map((pct) => (
                <div key={pct} className="absolute h-6 w-px bg-accent/40" style={{ left: `${pct}%`, top: 24 }} />
              ))}
            </div>
          </div>

          {/* Drones row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((droneId) => (
              <motion.div
                key={droneId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: droneId * 0.15 }}
                className="bg-card border border-border/50 rounded-xl p-5 text-center hover:border-accent/40 hover:shadow-[0_0_20px_hsl(var(--accent)/0.1)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <Cpu className="h-6 w-6 text-accent" />
                </div>
                <div className="font-bold text-foreground mb-1">{t('swarm.c20networkarchitecture.k35')}</div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center justify-center gap-1"><Navigation className="h-3 w-3 text-accent" /> UWB Tag</div>
                  <div className="flex items-center justify-center gap-1"><Cpu className="h-3 w-3 text-accent" /> Pixhawk FC</div>
                  <div className="flex items-center justify-center gap-1"><Radio className="h-3 w-3 text-accent" /> WiFi Comm</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* UWB Positioning Layer */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 text-center">{t('swarm.c20networkarchitecture.k36')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((stationId) => (
                  <div key={stationId} className="flex flex-col items-center gap-2 p-3 bg-card rounded-lg border border-accent/10">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <Navigation className="h-5 w-5 text-accent" />
                    </div>
                    <span className="text-xs font-medium text-foreground">{t('swarm.c20networkarchitecture.k37')}</span>
                    <span className="text-[10px] text-muted-foreground">Linktrack P-B</span>
                    {/* Animated pulse ring */}
                    <div className="relative w-6 h-6">
                      <div className="absolute inset-0 rounded-full border border-accent/30 animate-ping" style={{ animationDuration: '2s' }} />
                      <div className="absolute inset-1 rounded-full bg-accent/20" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-xs text-muted-foreground">
                {t('swarm.c20networkarchitecture.k38')}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default C20NetworkArchitecture;
