import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Cpu, Wifi, Camera, Navigation, Battery, Fan, Monitor } from "lucide-react";

const C30HardwareSection = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const components = [
    { icon: <Camera className="h-5 w-5" />, label: isZh ? "动捕反光标记" : "MoCap Reflective Markers", desc: isZh ? "红外反光标记点" : "IR reflective markers", position: "top-[12%] left-[5%]" },
    { icon: <Cpu className="h-5 w-5" />, label: isZh ? "Pixhawk 6C 飞控" : "Pixhawk 6C FC", desc: isZh ? "开源飞控系统" : "Open-source FC", position: "top-[10%] right-[5%]" },
    { icon: <Monitor className="h-5 w-5" />, label: isZh ? "Jetson Orin NX" : "Jetson Orin NX", desc: "100 TOPS · 16GB", position: "top-[42%] left-[3%]" },
    { icon: <Wifi className="h-5 w-5" />, label: isZh ? "WiFi 通讯模块" : "WiFi Comm Module", desc: isZh ? "集群自组网" : "Swarm mesh network", position: "top-[42%] right-[3%]" },
    { icon: <Battery className="h-5 w-5" />, label: isZh ? "4S LiPo 电池" : "4S LiPo Battery", desc: "4S 5300mAh", position: "bottom-[22%] left-[8%]" },
    { icon: <Fan className="h-5 w-5" />, label: isZh ? "高效螺旋桨" : "Efficient Propellers", desc: isZh ? "低噪高效桨叶" : "Low-noise blades", position: "bottom-[22%] right-[8%]" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{isZh ? '硬件配置总览' : 'Hardware Overview'}</h2>
          <p className="text-muted-foreground">{isZh ? 'CANI C30 无人机核心硬件组件' : 'CANI C30 drone core hardware components'}</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative mx-auto w-full aspect-square max-w-lg">
            {/* Drone frame CSS */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-3 bg-gradient-to-r from-accent/60 via-foreground/30 to-accent/60 rotate-45 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-3 bg-gradient-to-r from-accent/60 via-foreground/30 to-accent/60 -rotate-45 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-card border-2 border-accent/40 rounded-lg shadow-[0_0_30px_hsl(var(--accent)/0.2)] flex items-center justify-center">
                  <span className="text-sm font-bold text-accent">C30</span>
                </div>
                {["top-0 left-0 -translate-x-1/2 -translate-y-1/2", "top-0 right-0 translate-x-1/2 -translate-y-1/2", "bottom-0 left-0 -translate-x-1/2 translate-y-1/2", "bottom-0 right-0 translate-x-1/2 translate-y-1/2"].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-14 h-14 rounded-full border-2 border-accent/30 bg-accent/5 animate-spin`} style={{ animationDuration: '4s' }}>
                    <div className="absolute inset-1 rounded-full border border-dashed border-accent/20" />
                    {/* MoCap markers */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_6px_hsl(var(--accent)/0.8)]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Labels */}
            {components.map((comp, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }} className={`absolute ${comp.position} z-10`}>
                <div className="bg-card/95 backdrop-blur-sm border border-accent/20 rounded-lg px-3 py-2 shadow-lg hover:border-accent/50 hover:shadow-[0_0_15px_hsl(var(--accent)/0.1)] transition-all duration-300 group cursor-default">
                  <div className="flex items-center gap-2">
                    <div className="text-accent group-hover:scale-110 transition-transform">{comp.icon}</div>
                    <div>
                      <div className="text-xs font-bold text-foreground whitespace-nowrap">{comp.label}</div>
                      <div className="text-[10px] text-muted-foreground whitespace-nowrap">{comp.desc}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          {components.map((comp, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border/30 hover:border-accent/30 transition-colors">
              <div className="text-accent">{comp.icon}</div>
              <div>
                <div className="text-sm font-medium text-foreground">{comp.label}</div>
                <div className="text-xs text-muted-foreground">{comp.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default C30HardwareSection;
