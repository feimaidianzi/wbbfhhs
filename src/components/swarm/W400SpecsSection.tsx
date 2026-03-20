import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const W400SpecsSection = () => {
  const { t } = useLanguage();

  const specs = {
    drone: {
      label: t('swarm.w400specssection.k380'),
      items: [
        { label: t('swarm.c20specssection.k62'), value: t('swarm.w400specssection.k381') },
        { label: t('swarm.w400coremetricssection.k294'), value: "600mm", highlight: true },
        { label: t('swarm.c20specssection.k66'), value: "2.8kg" },
        { label: t('swarm.c20specssection.k67'), value: "4kg" },
        { label: t('swarm.w400specssection.k382'), value: "30min", highlight: true },
        { label: t('swarm.c20specssection.k70'), value: t('swarm.w400specssection.k383') },
        { label: t('swarm.w400specssection.k384'), value: "15m/s" },
        { label: t('swarm.w400coremetricssection.k297'), value: t('swarm.w400coremetricssection.k296') },
        { label: t('swarm.w400specssection.k385'), value: "Pixhawk 6C" },
        { label: t('swarm.w400specssection.k386'), value: "GPS/GLONASS/BeiDou/Galileo" },
        { label: t('swarm.w400specssection.k387'), value: t('swarm.w400specssection.k388') },
        { label: t('swarm.c20specssection.k78'), value: "6S 10000mAh LiPo (22.2V / 222Wh)", highlight: true },
      ],
    },
    power: {
      label: t('swarm.w400specssection.k389'),
      items: [
        { label: t('swarm.c20specssection.k74'), value: t('swarm.w400specssection.k390') },
        { label: t('swarm.w400specssection.k391'), value: "920KV" },
        { label: t('swarm.w400specssection.k392'), value: "10×4.5 CF" },
        { label: t('swarm.c20specssection.k76'), value: t('swarm.w400specssection.k393') },
        { label: t('swarm.w400specssection.k394'), value: "XT60" },
        { label: t('swarm.c20specssection.k80'), value: t('swarm.w400specssection.k395') },
      ],
    },
    computer: {
      label: t('swarm.c30specssection.k218'),
      items: [
        { label: t('swarm.c30specssection.k219'), value: "Allspark2" },
        { label: t('swarm.c30specssection.k220'), value: "NVIDIA Jetson Orin NX", highlight: true },
        { label: t('swarm.c30specssection.k221'), value: "100 TOPS", highlight: true },
        { label: t('swarm.c30specssection.k222'), value: "16GB LPDDR5" },
        { label: "GPU", value: "NVIDIA Ampere (918MHz)" },
        { label: "CPU", value: "8-core Arm Cortex-A78AE" },
        { label: t('swarm.w400specssection.k396'), value: "128GB NVMe SSD" },
        { label: t('swarm.c30specssection.k224'), value: "102.5×62.5×31mm" },
        { label: t('swarm.c30specssection.k223'), value: "188g" },
      ],
    },
    comm: {
      label: t('swarm.c20specssection.k93'),
      items: [
        { label: t('swarm.w400specssection.k397'), value: "Mini Homer" },
        { label: t('swarm.w400specssection.k398'), value: "1km", highlight: true },
        { label: t('swarm.w400specssection.k399'), value: "3Mbps" },
        { label: t('swarm.w400specssection.k400'), value: "TCP/IP" },
        { label: t('swarm.w400specssection.k401'), value: t('swarm.w400specssection.k402') },
        { label: t('swarm.c30specssection.k227'), value: "Prometheus R1.6" },
        { label: t('swarm.c20specssection.k97'), value: "Qt GCS + QGroundControl" },
        { label: t('swarm.c20specssection.k100'), value: "MAVLink / ROS Topic" },
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
                            <td className={`px-6 py-4 border-b border-border/30 ${spec.highlight ? 'text-accent font-bold' : 'text-muted-foreground'}`}>{spec.value}</td>
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

export default W400SpecsSection;
