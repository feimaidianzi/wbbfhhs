import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const C20PackageSection = () => {
  const { t } = useLanguage();

  const packageList = [
    { name: t('swarm.c20packagesection.k39'), spec: "230mm", qty: "3" },
    { name: t('swarm.c20packagesection.k40'), spec: t('swarm.c20packagesection.k41') Tri-blade', qty: t('swarm.c20packagesection.k42') },
    { name: t('swarm.c20packagesection.k43'), spec: "Pixhawk", qty: "3" },
    { name: t('swarm.c20hardwaresection.k19'), spec: t('swarm.c20packagesection.k44'), qty: "1+3" },
    { name: t('swarm.c20packagesection.k45'), spec: "Linktrack P-B", qty: "4" },
    { name: t('swarm.c20hardwaresection.k17'), spec: "Linktrack P-B", qty: "3" },
    { name: t('swarm.c20hardwaresection.k23'), spec: "4S 3000mAh", qty: "3" },
    { name: t('swarm.c20packagesection.k46'), spec: t('swarm.c20packagesection.k47'), qty: "3" },
    { name: t('swarm.c20packagesection.k48'), spec: t('swarm.c20packagesection.k49'), qty: "1" },
    { name: t('swarm.c20packagesection.k50'), spec: t('swarm.c20packagesection.k51'), qty: "1" },
    { name: t('swarm.c20packagesection.k52'), spec: "QGroundControl", qty: t('swarm.c20packagesection.k53') },
    { name: t('swarm.c20packagesection.k54'), spec: t('swarm.c20packagesection.k55'), qty: "1" },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{t('swarm.c20packagesection.k56')}</h2>
          <p className="text-muted-foreground">{t('swarm.c20packagesection.k57')}</p>
        </motion.div>
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="bg-accent/10">
                    <th className="px-6 py-4 text-left font-bold text-foreground">{t('swarm.c20packagesection.k58')}</th>
                    <th className="px-6 py-4 text-left font-bold text-foreground">{t('swarm.c20packagesection.k59')}</th>
                    <th className="px-6 py-4 text-center font-bold text-foreground">{t('swarm.c20packagesection.k60')}</th>
                  </tr>
                </thead>
                <tbody>
                  {packageList.map((item, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-muted/50' : 'bg-card'} hover:bg-accent/5 transition-colors`}>
                      <td className="px-6 py-3 text-foreground border-b border-border/30 font-medium">{item.name}</td>
                      <td className="px-6 py-3 text-muted-foreground border-b border-border/30">{item.spec}</td>
                      <td className="px-6 py-3 text-center text-muted-foreground border-b border-border/30">{item.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default C20PackageSection;
