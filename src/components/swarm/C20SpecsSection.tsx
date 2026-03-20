import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const C20SpecsSection = () => {
  const { t } = useLanguage();

  const specs = {
    drone: {
      label: t('swarm.c20specssection.k61'),
      items: [
        { label: t('swarm.c20specssection.k62'), value: t('swarm.c20specssection.k63') },
        { label: t('swarm.c20specssection.k64'), value: "230mm" },
        { label: t('swarm.c20specssection.k65'), value: t('swarm.c20packagesection.k41') Tri-blade' },
        { label: t('swarm.c20specssection.k66'), value: "0.68kg" },
        { label: t('swarm.c20specssection.k67'), value: "1.1kg" },
        { label: t('swarm.c20specssection.k68'), value: t('swarm.c20specssection.k69') },
        { label: t('swarm.c20specssection.k70'), value: "±10cm" },
        { label: t('swarm.c20packagesection.k43'), value: "Pixhawk" },
        { label: t('swarm.c20specssection.k71'), value: t('swarm.c20specssection.k72') },
      ],
    },
    power: {
      label: t('swarm.c20specssection.k73'),
      items: [
        { label: t('swarm.c20specssection.k74'), value: t('swarm.c20specssection.k75') },
        { label: t('swarm.c20specssection.k76'), value: t('swarm.c20specssection.k77') },
        { label: t('swarm.c20specssection.k78'), value: "4S 3000mAh LiPo" },
        { label: t('swarm.c20specssection.k79'), value: "14.8V" },
        { label: t('swarm.c20specssection.k80'), value: t('swarm.c20packagesection.k46') },
        { label: t('swarm.c20specssection.k81'), value: t('swarm.c20specssection.k82') },
      ],
    },
    uwb: {
      label: t('swarm.c20specssection.k83'),
      items: [
        { label: t('swarm.c20specssection.k84'), value: "10cm", highlight: true },
        { label: t('swarm.c20specssection.k85'), value: "200Hz", highlight: true },
        { label: t('swarm.c20specssection.k86'), value: "<0.5ms" },
        { label: t('swarm.c20specssection.k87'), value: "200" },
        { label: t('swarm.c20specssection.k88'), value: "4 (max 120)" },
        { label: t('swarm.c20specssection.k89'), value: "500m" },
        { label: t('swarm.c20specssection.k90'), value: "3Mbps" },
        { label: t('swarm.c20specssection.k91'), value: "34.3g" },
        { label: t('swarm.c20specssection.k92'), value: "Linktrack P-B" },
      ],
    },
    comm: {
      label: t('swarm.c20specssection.k93'),
      items: [
        { label: t('swarm.c20specssection.k94'), value: t('swarm.c20specssection.k95') },
        { label: t('swarm.c20specssection.k96'), value: "MAVLink / ROS" },
        { label: t('swarm.c20specssection.k97'), value: t('swarm.c20specssection.k98') },
        { label: t('swarm.c20packagesection.k48'), value: t('swarm.c20specssection.k99') },
        { label: t('swarm.c20specssection.k100'), value: t('swarm.c20specssection.k101') },
        { label: t('swarm.c20specssection.k102'), value: t('swarm.c20specssection.k103') },
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

export default C20SpecsSection;
