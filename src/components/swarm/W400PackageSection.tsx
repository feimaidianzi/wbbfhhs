import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { OptimizedImage } from "@/components/OptimizedImage";
import fullKitImg from "@/assets/products/w400-full-kit.webp";

const W400PackageSection = () => {
  const { t } = useLanguage();

  const items = [
    { name: t('swarm.w400packagesection.k358'), qty: "×3", cat: t('swarm.w400packagesection.k359') },
    { name: t('swarm.w400packagesection.k360'), qty: "×3", cat: t('swarm.w400packagesection.k361') },
    { name: t('swarm.w400packagesection.k362'), qty: "×3", cat: t('swarm.w400packagesection.k363') },
    { name: "Allspark2 + Jetson Orin NX", qty: "×3", cat: t('swarm.w400packagesection.k364') },
    { name: t('swarm.w400packagesection.k365'), qty: "×3", cat: t('swarm.w400packagesection.k366') },
    { name: "6S 5200mAh LiPo", qty: "×6", cat: t('swarm.w400packagesection.k367') },
    { name: t('swarm.c20packagesection.k46'), qty: "×3", cat: t('swarm.w400packagesection.k367') },
    { name: t('swarm.w400packagesection.k368'), qty: "×1", cat: t('swarm.w400packagesection.k369') },
    { name: "Prometheus R1.6", qty: "×1", cat: t('swarm.w400packagesection.k369') },
    { name: t('swarm.w400packagesection.k370'), qty: "×1", cat: t('swarm.w400packagesection.k371') },
    { name: t('swarm.w400packagesection.k372'), qty: "×1", cat: t('swarm.w400packagesection.k373') },
    { name: t('swarm.w400packagesection.k374'), qty: "—", cat: t('swarm.w400packagesection.k375') },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{t('swarm.c20packagesection.k56')}</h2>
          <p className="text-muted-foreground">{t('swarm.w400packagesection.k376')}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-3xl mx-auto mb-10">
          <OptimizedImage src={fullKitImg} alt={t('swarm.w400packagesection.k377')} aspectRatio="16/9" className="w-full rounded-2xl" objectFit="cover" />
        </motion.div>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="bg-accent/10">
                      <th className="px-6 py-3 text-left text-sm font-bold text-foreground">{t('swarm.w400packagesection.k378')}</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-foreground">{t('swarm.w400packagesection.k379')}</th>
                      <th className="px-6 py-3 text-center text-sm font-bold text-foreground">{t('swarm.c20packagesection.k60')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, i) => (
                      <tr key={i} className={`${i % 2 === 0 ? 'bg-muted/50' : 'bg-card'} hover:bg-accent/5 transition-colors`}>
                        <td className="px-6 py-3 text-sm text-accent font-medium border-b border-border/30">{item.cat}</td>
                        <td className="px-6 py-3 text-sm text-foreground border-b border-border/30">{item.name}</td>
                        <td className="px-6 py-3 text-sm text-center text-muted-foreground border-b border-border/30 font-mono">{item.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default W400PackageSection;
