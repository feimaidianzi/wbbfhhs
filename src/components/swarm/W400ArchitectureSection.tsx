import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Satellite, Monitor, Wifi, Cpu, Navigation, Radio } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import gcsImg from "@/assets/products/w400-ground-station.webp";

const W400ArchitectureSection = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{isZh ? '集群系统架构' : 'Swarm System Architecture'}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{isZh ? '从GPS定位到编队控制的完整技术链路，Prometheus R1.6集群控制系统' : 'Complete tech chain from GPS positioning to formation control with Prometheus R1.6 framework'}</p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {/* Layer 1: GPS Positioning */}
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="bg-card border-2 border-accent/30 rounded-xl p-6 shadow-[0_0_20px_hsl(var(--accent)/0.1)]">
              <div className="flex items-center gap-3 mb-4">
                <Satellite className="h-6 w-6 text-accent" />
                <h3 className="font-bold text-foreground text-lg">{isZh ? 'GPS 多星定位层' : 'Multi-GNSS Positioning Layer'}</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(isZh
                  ? ["GPS / GLONASS / 北斗 / Galileo", "RTK差分定位（可选）", "悬停精度 ±0.3m 水平", "室外全天候工作"]
                  : ["GPS / GLONASS / BeiDou / Galileo", "RTK Differential (Optional)", "Hover ±0.3m Horizontal", "All-Weather Outdoor"]
                ).map((item, i) => (
                  <div key={i} className="bg-accent/5 rounded-lg p-3 text-center text-sm text-foreground border border-accent/10">{item}</div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Connector */}
          <div className="flex justify-center items-center gap-2">
            <div className="w-px h-8 bg-gradient-to-b from-accent/40 to-accent/20" />
            <span className="text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded">{isZh ? '位姿数据流' : 'Pose Data Stream'}</span>
            <div className="w-px h-8 bg-gradient-to-b from-accent/20 to-accent/40" />
          </div>

          {/* Layer 2: Ground Station */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="bg-card border border-accent/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Monitor className="h-6 w-6 text-accent" />
                <h3 className="font-bold text-foreground">{isZh ? '地面站控制层' : 'Ground Station Control Layer'}</h3>
              </div>
              <div className="flex justify-center mb-4">
                <OptimizedImage src={gcsImg} alt={isZh ? "CANI-W400 地面站遥控器" : "CANI-W400 Ground Control Station"} aspectRatio="4/3" className="w-48 rounded-lg" objectFit="contain" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(isZh
                  ? [{ t: "Prometheus R1.6 集群控制", d: "编队算法 + 任务调度核心" }, { t: "Qt 地面站", d: "可视化编排、多机状态监控" }, { t: "ROS 通讯框架", d: "MAVLink + ROS Topic 分布式通讯" }]
                  : [{ t: "Prometheus R1.6 Swarm Ctrl", d: "Formation algorithms + task scheduling" }, { t: "Qt Ground Station", d: "Visual choreography + status monitoring" }, { t: "ROS Comm Framework", d: "MAVLink + ROS Topic distributed comms" }]
                ).map((item, i) => (
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
            <span className="text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded">{isZh ? 'Mini Homer Mesh 自组网' : 'Mini Homer Mesh Network'}</span>
            <div className="w-px h-8 bg-gradient-to-b from-accent/20 to-accent/40" />
          </div>

          {/* Layer 3: Drone Fleet */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="bg-card border border-border/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="h-6 w-6 text-accent" />
                <h3 className="font-bold text-foreground">{isZh ? '无人机编队层' : 'Drone Formation Layer'}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((id) => (
                  <div key={id} className="bg-accent/5 rounded-lg p-4 border border-accent/10 text-center hover:border-accent/30 hover:shadow-[0_0_15px_hsl(var(--accent)/0.1)] transition-all">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-2">
                      <Navigation className="h-5 w-5 text-accent" />
                    </div>
                    <div className="font-bold text-sm text-foreground">{isZh ? `CANI-W400 #${id}` : `CANI-W400 #${id}`}</div>
                    <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                      <div>Pixhawk 6C + Jetson Orin NX</div>
                      <div>{isZh ? 'GPS定位 · Mesh通讯 · 100 TOPS' : 'GPS · Mesh Comms · 100 TOPS'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Why W400 comparison */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">{isZh ? '为什么选择 CANI-W400？' : 'Why Choose CANI-W400?'}</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="bg-accent/10">
                  <th className="px-4 py-3 text-left text-sm font-bold text-foreground">{isZh ? '对比项' : 'Comparison'}</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-muted-foreground">CANI C20 (UWB)</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-muted-foreground">CANI C30 (MoCap)</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-accent">CANI-W400 (GPS)</th>
                </tr>
              </thead>
              <tbody>
                {(isZh
                  ? [["定位方式", "UWB 基站", "动捕相机", "GPS 四星定位"], ["使用环境", "室内/半室外", "室内动捕间", "室外全场景"], ["轴距/机型", "250mm 四旋翼", "250mm 四旋翼", "600mm 六旋翼"], ["续航时间", "8min", "12min", "25min"], ["负载能力", "轻载", "轻载", "重载"], ["通信距离", "200m", "WiFi", "1km Mesh"]]
                  : [["Positioning", "UWB Stations", "MoCap Cameras", "GPS Quad-GNSS"], ["Environment", "Indoor/Semi-outdoor", "Indoor MoCap Lab", "Full Outdoor"], ["Frame/Type", "250mm Quad", "250mm Quad", "600mm Hexa"], ["Endurance", "8min", "12min", "25min"], ["Payload", "Light", "Light", "Heavy"], ["Comm Range", "200m", "WiFi", "1km Mesh"]]
                ).map(([label, c20, c30, w400], i) => (
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
