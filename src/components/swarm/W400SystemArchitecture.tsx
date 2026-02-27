import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Satellite, Cpu, Monitor, Radio, Navigation, Layers } from "lucide-react";

const W400SystemArchitecture = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const systemFlow = [
    {
      icon: <Satellite className="h-5 w-5" />,
      title: isZh ? "GPS多频定位" : "Multi-GNSS Positioning",
      items: [
        "GPS / GLONASS / BeiDou / Galileo",
        isZh ? "RTK差分定位（可选）" : "RTK Differential (Optional)",
        isZh ? "悬停精度 ±0.3m 水平 / ±0.5m 垂直" : "Hover accuracy ±0.3m H / ±0.5m V",
      ],
    },
    {
      icon: <Radio className="h-5 w-5" />,
      title: isZh ? "通信网络" : "Communication Network",
      items: [
        "Mini Homer",
        isZh ? "TCP/IP 分布式通信" : "TCP/IP Distributed Comms",
        isZh ? "1km 通信距离，3Mbps" : "1km range, 3Mbps bandwidth",
        isZh ? "Mesh自组网拓扑" : "Mesh self-organizing topology",
      ],
    },
    {
      icon: <Cpu className="h-5 w-5" />,
      title: isZh ? "机载算力" : "Onboard Computing",
      items: [
        "Allspark2 + Jetson Orin NX",
        "100 TOPS AI",
        "16GB LPDDR5",
        "8-core Arm Cortex-A78AE",
      ],
    },
    {
      icon: <Monitor className="h-5 w-5" />,
      title: isZh ? "地面站控制" : "Ground Station Control",
      items: [
        isZh ? "Prometheus集群控制系统" : "Prometheus Swarm Control",
        isZh ? "Qt地面站操作界面" : "Qt Ground Station UI",
        isZh ? "多机任务规划与编队管理" : "Multi-UAV Mission & Formation",
      ],
    },
  ];

  // Extracted from swarm-w400-detail.jpg / swarm-w400-system.jpg
  const taskFlow = [
    { label: isZh ? "任务a" : "Task A", desc: isZh ? "编队飞行" : "Formation Flight" },
    { label: isZh ? "任务b" : "Task B", desc: isZh ? "航点巡航" : "Waypoint Cruise" },
    { label: isZh ? "任务c" : "Task C", desc: isZh ? "目标追踪" : "Target Tracking" },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            {isZh ? "系统架构" : "System Architecture"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isZh
              ? "基于GPS多频定位的室外集群系统，通过Mesh自组网实现多机协同，地面站统一指挥调度"
              : "Outdoor swarm system based on multi-GNSS positioning with Mesh networking for multi-UAV coordination and unified ground station control"}
          </p>
        </motion.div>

        {/* Task Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="bg-card rounded-2xl border border-border/30 p-8">
            <h3 className="text-center text-sm font-bold text-muted-foreground mb-6 uppercase tracking-wider">
              {isZh ? "多机任务调度流程" : "Multi-UAV Task Scheduling Flow"}
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-6">
              {taskFlow.map((task, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="bg-accent/10 border-2 border-accent/30 rounded-xl px-6 py-4 text-center min-w-[140px]">
                    <div className="font-bold text-accent text-lg">{task.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{task.desc}</div>
                  </div>
                  {index < taskFlow.length - 1 && (
                    <div className="hidden md:block text-accent">
                      <Navigation className="h-4 w-4 rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <div className="w-8 h-px bg-accent"></div>
              <span>{isZh ? "地面站发送指令" : "Ground Station Commands"}</span>
              <div className="w-8 h-px bg-accent"></div>
            </div>
          </div>
        </motion.div>

        {/* System blocks */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemFlow.map((block, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border/30 rounded-xl p-6 hover:border-accent/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                {block.icon}
              </div>
              <h3 className="font-bold text-foreground mb-3">{block.title}</h3>
              <ul className="space-y-2">
                {block.items.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default W400SystemArchitecture;
