import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const C30SpecsSection = () => {
  const { t } = useLanguage();

  const specs = {
    drone: {
      label: t('swarm.c20specssection.k61'),
      items: [
        { label: t('swarm.c20specssection.k62'), value: t('swarm.c20specssection.k63') },
        { label: t('swarm.c20specssection.k64'), value: "250mm" },
        { label: t('swarm.c20specssection.k66'), value: "0.58kg" },
        { label: t('swarm.c20specssection.k67'), value: "1.0kg" },
        { label: t('swarm.c20specssection.k68'), value: "12min" },
        { label: t('swarm.c20specssection.k70'), value: "±1mm (MoCap)" },
        { label: t('swarm.c20packagesection.k43'), value: "Pixhawk 6C" },
        { label: t('swarm.c20specssection.k71'), value: t('swarm.c30specssection.k210') },
      ],
    },
    mocap: {
      label: t('swarm.c30specssection.k211'),
      items: [
        { label: t('swarm.c30specssection.k212'), value: "OptiTrack / NOKOV / VICON" },
        { label: t('swarm.c20specssection.k84'), value: "±1mm", highlight: true },
        { label: t('swarm.c20specssection.k85'), value: "360Hz", highlight: true },
        { label: t('swarm.c30specssection.k213'), value: "<0.2ms" },
        { label: t('swarm.c30specssection.k214'), value: t('swarm.c30specssection.k215') },
        { label: t('swarm.c30specssection.k216'), value: t('swarm.c30specssection.k217') },
      ],
    },
    computer: {
      label: t('swarm.c30specssection.k218'),
      items: [
        { label: t('swarm.c30specssection.k219'), value: "Allspark2" },
        { label: t('swarm.c30specssection.k220'), value: "NVIDIA Jetson Orin NX" },
        { label: t('swarm.c30specssection.k221'), value: "100 TOPS", highlight: true },
        { label: t('swarm.c30specssection.k222'), value: "16GB LPDDR5" },
        { label: "GPU", value: "NVIDIA Ampere (918MHz)" },
        { label: "CPU", value: "8-core Arm Cortex-A78AE" },
        { label: t('swarm.c30specssection.k223'), value: "188g" },
        { label: t('swarm.c30specssection.k224'), value: "102.5×62.5×31mm" },
      ],
    },
    comm: {
      label: t('swarm.c20specssection.k93'),
      items: [
        { label: t('swarm.c30specssection.k225'), value: t('swarm.c20specssection.k95') },
        { label: t('swarm.c20specssection.k96'), value: "MAVLink / ROS Topic" },
        { label: t('swarm.c20specssection.k97'), value: t('swarm.c30specssection.k226') },
        { label: t('swarm.c30specssection.k227'), value: "Prometheus Framework" },
        { label: t('swarm.c20specssection.k100'), value: t('swarm.c20specssection.k101') },
      ],
    },
  };

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground">{t('swarm.c20specssection.k104')}</h2>
        </motion.div>
        <Tabs defaultValue="drone" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            {Object.entries(specs).map(([key, { label }]) => (
              <TabsTrigger key={key} value={key} className="text-xs md:text-sm">{label}</TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(specs).map(([key, { items }]) => (
            <TabsContent key={key} value={key}>
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[400px]">
                      <tbody>
                        {items.map((spec, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-muted/50' : 'bg-card'}>
                            <td className="px-6 py-4 font-medium text-foreground border-b border-border/30 w-1/3 whitespace-nowrap">{spec.label}</td>
                            <td className={`px-6 py-4 border-b border-border/30 ${(spec as any).highlight ? 'text-accent font-bold' : 'text-muted-foreground'}`}>{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default C30SpecsSection;
