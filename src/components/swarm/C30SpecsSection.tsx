import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const C30SpecsSection = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const specs = {
    drone: {
      label: isZh ? "机体参数" : "Drone Specs",
      items: [
        { label: isZh ? "机型" : "Type", value: isZh ? "四旋翼" : "Quadrotor" },
        { label: isZh ? "轴距" : "Wheelbase", value: "250mm" },
        { label: isZh ? "空机重量" : "Empty Weight", value: "0.58kg" },
        { label: isZh ? "最大起飞重量" : "Max Takeoff Weight", value: "1.0kg" },
        { label: isZh ? "续航时间" : "Flight Time", value: "12min" },
        { label: isZh ? "悬停精度" : "Hover Accuracy", value: "±1mm (MoCap)" },
        { label: isZh ? "飞控" : "Flight Controller", value: "Pixhawk 6C" },
        { label: isZh ? "使用环境" : "Environment", value: isZh ? "室内动捕环境" : "Indoor MoCap Environment" },
      ],
    },
    mocap: {
      label: isZh ? "动捕系统" : "MoCap System",
      items: [
        { label: isZh ? "兼容系统" : "Compatible Systems", value: "OptiTrack / NOKOV / VICON" },
        { label: isZh ? "定位精度" : "Accuracy", value: "±1mm", highlight: true },
        { label: isZh ? "刷新率" : "Refresh Rate", value: "360Hz", highlight: true },
        { label: isZh ? "系统延迟" : "Latency", value: "<0.2ms" },
        { label: isZh ? "标记方式" : "Markers", value: isZh ? "红外反光标记点" : "IR Reflective Markers" },
        { label: isZh ? "覆盖范围" : "Coverage", value: isZh ? "取决于动捕系统配置" : "Depends on MoCap setup" },
      ],
    },
    computer: {
      label: isZh ? "机载计算" : "Onboard Computing",
      items: [
        { label: isZh ? "计算平台" : "Platform", value: "Allspark2" },
        { label: isZh ? "计算模块" : "Module", value: "NVIDIA Jetson Orin NX" },
        { label: isZh ? "AI 算力" : "AI Performance", value: "100 TOPS", highlight: true },
        { label: isZh ? "内存" : "Memory", value: "16GB LPDDR5" },
        { label: "GPU", value: "NVIDIA Ampere (918MHz)" },
        { label: "CPU", value: "8-core Arm Cortex-A78AE" },
        { label: isZh ? "重量" : "Weight", value: "188g" },
        { label: isZh ? "尺寸" : "Dimensions", value: "102.5×62.5×31mm" },
      ],
    },
    comm: {
      label: isZh ? "通讯系统" : "Communication",
      items: [
        { label: isZh ? "组网方式" : "Network", value: isZh ? "WiFi 自组网" : "WiFi Mesh" },
        { label: isZh ? "通讯协议" : "Protocol", value: "MAVLink / ROS Topic" },
        { label: isZh ? "地面站" : "Ground Station", value: isZh ? "Qt 地面站 + QGroundControl" : "Qt GCS + QGroundControl" },
        { label: isZh ? "集群控制" : "Swarm Control", value: "Prometheus Framework" },
        { label: isZh ? "数据链路" : "Data Link", value: isZh ? "WiFi 双向通讯" : "WiFi Bi-directional" },
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

export default C30SpecsSection;
