import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "@/lib/motion-shim";
import { Satellite, Monitor, Wifi, Cpu, Navigation, Radio } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import gcsImg from "@/assets/products/w400-ground-station.webp";

const W400ArchitectureSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{t('swarm.c30architecturesection.k105')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('swarm.w400architecturesection.k281')}</p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {/* Layer 1: GPS Positioning */}
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="bg-card border-2 border-accent/30 rounded-xl p-6 shadow-[0_0_20px_hsl(var(--accent)/0.1)]">
              <div className="flex items-center gap-3 mb-4">
                <Satellite className="h-6 w-6 text-accent" />
                <h3 className="font-bold text-foreground text-lg">{t('swarm.w400architecturesection.k282')}</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[t('swarm.w400arch.k916'), t('swarm.w400arch.k917'), t('swarm.w400arch.k918'), t('swarm.w400arch.k919')].map((item, i) => (
                  <div key={i} className="bg-accent/5 rounded-lg p-3 text-center text-sm text-foreground border border-accent/10">{item}</div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Connector */}
          <div className="flex justify-center items-center gap-2">
            <div className="w-px h-8 bg-gradient-to-b from-accent/40 to-accent/20" />
            <span className="text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded">{t('swarm.c30architecturesection.k108')}</span>
            <div className="w-px h-8 bg-gradient-to-b from-accent/20 to-accent/40" />
          </div>

          {/* Layer 2: Ground Station */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="bg-card border border-accent/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Monitor className="h-6 w-6 text-accent" />
                <h3 className="font-bold text-foreground">{t('swarm.c30architecturesection.k109')}</h3>
              </div>
              <div className="flex justify-center mb-4">
                <OptimizedImage src={gcsImg} alt={t('swarm.w400architecturesection.k283')} aspectRatio="4/3" className="w-full max-w-md rounded-lg" objectFit="contain" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[{ t: t('swarm.w400arch.k920'), d: t('swarm.w400arch.k921') }, { t: t('swarm.w400arch.k922'), d: t('swarm.w400arch.k923') }, { t: t('swarm.w400arch.k924'), d: t('swarm.w400arch.k925') }].map((item, i) => (
                  <div key={i} className="bg-muted/50 rounded-lg p-3 border border-border/30">
                    <div className="font-medium text-sm text-foreground">{item.t}</div>
                    <div className="text-xs text-muted-foreground mt-1">{item.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Connector */}
          <div className="flex justify-center items-center gap-2">
            <div className="w-px h-8 bg-gradient-to-b from-accent/40 to-accent/20" />
            <span className="text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded">{t('swarm.w400architecturesection.k284')}</span>
            <div className="w-px h-8 bg-gradient-to-b from-accent/20 to-accent/40" />
          </div>

          {/* Layer 3: Drone Fleet */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="bg-card border border-border/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="h-6 w-6 text-accent" />
                <h3 className="font-bold text-foreground">{t('swarm.c30architecturesection.k111')}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((id) => (
                  <div key={id} className="bg-accent/5 rounded-lg p-4 border border-accent/10 text-center hover:border-accent/30 hover:shadow-[0_0_15px_hsl(var(--accent)/0.1)] transition-all">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-2">
                      <Navigation className="h-5 w-5 text-accent" />
                    </div>
                    <div className="font-bold text-sm text-foreground">{t('swarm.w400architecturesection.k285')}</div>
                    <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                      <div>Pixhawk 6C + Jetson Orin NX</div>
                      <div>{t('swarm.w400architecturesection.k286')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Why W400 comparison */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">{t('swarm.w400architecturesection.k287')}</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="bg-accent/10">
                  <th className="px-4 py-3 text-left text-sm font-bold text-foreground">{t('swarm.c30architecturesection.k115')}</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-muted-foreground">CANI C20 (UWB)</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-muted-foreground">CANI C30 (MoCap)</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-accent">CANI-W400 (GPS)</th>
                </tr>
              </thead>
              <tbody>
                {[[t('swarm.w400arch.k926'), t('swarm.w400arch.k932'), t('swarm.w400arch.k933'), t('swarm.w400arch.k934')], [t('swarm.w400arch.k927'), t('swarm.w400arch.k935'), t('swarm.w400arch.k936'), t('swarm.w400arch.k937')], [t('swarm.w400arch.k928'), "250mm Quad", "250mm Quad", "600mm Hexa"], [t('swarm.w400arch.k929'), "8min", "12min", "25min"], [t('swarm.w400arch.k930'), t('swarm.w400arch.k938'), t('swarm.w400arch.k939'), t('swarm.w400arch.k940')], [t('swarm.w400arch.k931'), "200m", "WiFi", "1km Mesh"]].map(([label, c20, c30, w400], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-muted/50' : 'bg-card'}>
                    <td className="px-4 py-3 text-sm font-medium text-foreground border-b border-border/30">{label}</td>
                    <td className="px-4 py-3 text-sm text-center text-muted-foreground border-b border-border/30">{c20}</td>
                    <td className="px-4 py-3 text-sm text-center text-muted-foreground border-b border-border/30">{c30}</td>
                    <td className="px-4 py-3 text-sm text-center text-accent font-bold border-b border-border/30">{w400}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default W400ArchitectureSection;
