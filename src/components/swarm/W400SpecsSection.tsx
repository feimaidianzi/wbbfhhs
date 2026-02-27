import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const W400SpecsSection = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const specs = {
    drone: {
      label: isZh ? "飞行平台" : "Flight Platform",
      items: [
        { label: isZh ? "机型" : "Type", value: isZh ? "六旋翼" : "Hexacopter" },
        { label: isZh ? "对角线轴距" : "Diagonal Wheelbase", value: "600mm", highlight: true },
        { label: isZh ? "空机重量" : "Empty Weight", value: "2.8kg" },
        { label: isZh ? "最大起飞重量" : "Max Takeoff Weight", value: "4.5kg" },
        { label: isZh ? "最长飞行时间" : "Max Flight Time", value: "25min", highlight: true },
        { label: isZh ? "悬停精度" : "Hover Accuracy", value: isZh ? "水平±0.3m / 垂直±0.5m" : "H ±0.3m / V ±0.5m" },
        { label: isZh ? "最大飞行速度" : "Max Speed", value: "15m/s" },
        { label: isZh ? "抗风等级" : "Wind Resistance", value: isZh ? "5级" : "Level 5" },
        { label: isZh ? "飞控内核" : "Flight Controller", value: "Pixhawk 6C" },
        { label: isZh ? "GNSS模块" : "GNSS Module", value: "GPS/GLONASS/BeiDou/Galileo" },
        { label: isZh ? "工作环境" : "Environment", value: isZh ? "室外" : "Outdoor" },
        { label: isZh ? "电池" : "Battery", value: "6S 5200mAh LiPo" },
      ],
    },
    power: {
      label: isZh ? "动力系统" : "Propulsion",
      items: [
        { label: isZh ? "电机" : "Motors", value: isZh ? "无刷外转子 × 6" : "Brushless Outrunner × 6" },
        { label: isZh ? "电机KV值" : "Motor KV", value: "920KV" },
        { label: isZh ? "螺旋桨" : "Propellers", value: "10×4.5 CF" },
        { label: isZh ? "电调" : "ESC", value: isZh ? "30A BLHeli_S × 6" : "30A BLHeli_S × 6" },
        { label: isZh ? "电池接口" : "Battery Connector", value: "XT60" },
        { label: isZh ? "充电器" : "Charger", value: isZh ? "平衡充电器 × 3" : "Balance Charger × 3" },
      ],
    },
    computer: {
      label: isZh ? "机载计算" : "Onboard Computing",
      items: [
        { label: isZh ? "计算平台" : "Platform", value: "Allspark2" },
        { label: isZh ? "计算模块" : "Module", value: "NVIDIA Jetson Orin NX", highlight: true },
        { label: isZh ? "AI 算力" : "AI Performance", value: "100 TOPS", highlight: true },
        { label: isZh ? "内存" : "Memory", value: "16GB LPDDR5" },
        { label: "GPU", value: "NVIDIA Ampere (918MHz)" },
        { label: "CPU", value: "8-core Arm Cortex-A78AE" },
        { label: isZh ? "存储" : "Storage", value: "128GB NVMe SSD" },
        { label: isZh ? "尺寸" : "Dimensions", value: "102.5×62.5×31mm" },
        { label: isZh ? "重量" : "Weight", value: "188g" },
      ],
    },
    comm: {
      label: isZh ? "通讯系统" : "Communication",
      items: [
        { label: isZh ? "组网模块" : "Networking Module", value: "Mini Homer" },
        { label: isZh ? "通信距离" : "Comm Range", value: "1km", highlight: true },
        { label: isZh ? "数传带宽" : "Data Bandwidth", value: "3Mbps" },
        { label: isZh ? "通信协议" : "Protocol", value: "TCP/IP" },
        { label: isZh ? "网络拓扑" : "Topology", value: isZh ? "Mesh 自组网" : "Mesh Self-Organizing" },
        { label: isZh ? "集群控制" : "Swarm Control", value: "Prometheus R1.6" },
        { label: isZh ? "地面站" : "Ground Station", value: "Qt GCS + QGroundControl" },
        { label: isZh ? "数据链路" : "Data Link", value: "MAVLink / ROS Topic" },
      ],
    },
  };

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground">{isZh ? '规格参数' : 'Technical Specifications'}</h2>
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
