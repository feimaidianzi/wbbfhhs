import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const C20SpecsSection = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const specs = {
    drone: {
      label: isZh ? "机体参数" : "Drone Specs",
      items: [
        { label: isZh ? "机型" : "Type", value: isZh ? "四旋翼" : "Quadrotor" },
        { label: isZh ? "轴距" : "Wheelbase", value: "230mm" },
        { label: isZh ? "螺旋桨" : "Propeller", value: isZh ? '5寸三叶桨' : '5" Tri-blade' },
        { label: isZh ? "空机重量" : "Empty Weight", value: "0.68kg" },
        { label: isZh ? "最大起飞重量" : "Max Takeoff Weight", value: "1.1kg" },
        { label: isZh ? "续航时间" : "Flight Time", value: isZh ? "约10min" : "~10min" },
        { label: isZh ? "悬停精度" : "Hover Accuracy", value: "±10cm" },
        { label: isZh ? "飞控" : "Flight Controller", value: "Pixhawk" },
        { label: isZh ? "使用环境" : "Environment", value: isZh ? "室内/遮蔽环境" : "Indoor/Sheltered" },
      ],
    },
    power: {
      label: isZh ? "动力系统" : "Power System",
      items: [
        { label: isZh ? "电机" : "Motors", value: isZh ? "2306 无刷电机" : "2306 Brushless Motor" },
        { label: isZh ? "电调" : "ESC", value: isZh ? "四合一 30A" : "4-in-1 30A" },
        { label: isZh ? "电池" : "Battery", value: "4S 3000mAh LiPo" },
        { label: isZh ? "电池电压" : "Battery Voltage", value: "14.8V" },
        { label: isZh ? "充电器" : "Charger", value: isZh ? "平衡充电器" : "Balance Charger" },
        { label: isZh ? "最大推力" : "Max Thrust", value: isZh ? "单轴 >800g" : "Per arm >800g" },
      ],
    },
    uwb: {
      label: isZh ? "UWB 定位" : "UWB Positioning",
      items: [
        { label: isZh ? "定位精度" : "Accuracy", value: "10cm", highlight: true },
        { label: isZh ? "刷新率" : "Refresh Rate", value: "200Hz", highlight: true },
        { label: isZh ? "通讯延迟" : "Latency", value: "<0.5ms" },
        { label: isZh ? "最大标签数" : "Max Tags", value: "200" },
        { label: isZh ? "基站数量" : "Base Stations", value: "4 (max 120)" },
        { label: isZh ? "定位距离" : "Range", value: "500m" },
        { label: isZh ? "通讯带宽" : "Bandwidth", value: "3Mbps" },
        { label: isZh ? "标签重量" : "Tag Weight", value: "34.3g" },
        { label: isZh ? "定位模块" : "Module", value: "Linktrack P-B" },
      ],
    },
    comm: {
      label: isZh ? "通讯系统" : "Communication",
      items: [
        { label: isZh ? "组网方式" : "Network Type", value: isZh ? "WiFi 自组网" : "WiFi Mesh" },
        { label: isZh ? "通讯协议" : "Protocol", value: "MAVLink / ROS" },
        { label: isZh ? "地面站" : "Ground Station", value: isZh ? "QGroundControl" : "QGroundControl" },
        { label: isZh ? "遥控器" : "Remote Controller", value: isZh ? "支持遥控接入" : "RC Supported" },
        { label: isZh ? "数据链路" : "Data Link", value: isZh ? "WiFi 双向通讯" : "WiFi Bi-directional" },
        { label: isZh ? "集群上限" : "Swarm Max", value: isZh ? "理论 200 架" : "Theoretical 200" },
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
