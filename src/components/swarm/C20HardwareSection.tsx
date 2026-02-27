import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Cpu, Radio, Zap, Navigation, Battery, Fan } from "lucide-react";

const C20HardwareSection = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const components = [
    { icon: <Cpu className="h-5 w-5" />, label: isZh ? "Pixhawk 飞控" : "Pixhawk FC", desc: isZh ? "开源飞控系统" : "Open-source flight controller", position: "top-[15%] left-[8%]" },
    { icon: <Navigation className="h-5 w-5" />, label: isZh ? "UWB 定位标签" : "UWB Tag", desc: isZh ? "Linktrack P-B 模块" : "Linktrack P-B module", position: "top-[10%] right-[8%]" },
    { icon: <Radio className="h-5 w-5" />, label: isZh ? "WiFi 通讯模块" : "WiFi Comm Module", desc: isZh ? "自组网数据链路" : "Self-organizing data link", position: "top-[45%] left-[5%]" },
    { icon: <Zap className="h-5 w-5" />, label: isZh ? "电调 (ESC)" : "ESC", desc: isZh ? "四合一30A电调" : "4-in-1 30A ESC", position: "top-[45%] right-[5%]" },
    { icon: <Battery className="h-5 w-5" />, label: isZh ? "4S LiPo 电池" : "4S LiPo Battery", desc: "4S 3000mAh", position: "bottom-[20%] left-[10%]" },
    { icon: <Fan className="h-5 w-5" />, label: isZh ? "5寸螺旋桨" : "5\" Propellers", desc: isZh ? "高效低噪桨叶" : "High-efficiency low-noise blades", position: "bottom-[20%] right-[10%]" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{isZh ? '硬件配置' : 'Hardware Configuration'}</h2>
          <p className="text-muted-foreground">{isZh ? 'CANI C20 集群无人机核心组件一览' : 'CANI C20 swarm drone core component overview'}</p>
        </motion.div>

        {/* Drone labeled diagram using CSS */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central drone representation */}
          <div className="relative mx-auto w-full aspect-square max-w-lg">
            {/* Drone body - CSS cross shape */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                {/* Arms */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-3 bg-gradient-to-r from-accent/60 via-foreground/30 to-accent/60 rotate-45 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-3 bg-gradient-to-r from-accent/60 via-foreground/30 to-accent/60 -rotate-45 rounded-full" />
                {/* Center body */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-card border-2 border-accent/40 rounded-lg shadow-[0_0_30px_hsl(var(--accent)/0.2)] flex items-center justify-center">
                  <span className="text-xs md:text-sm font-bold text-accent">C20</span>
                </div>
                {/* Motor circles */}
                {[
                  "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
                  "top-0 right-0 translate-x-1/2 -translate-y-1/2",
                  "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
                  "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
                ].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-accent/30 bg-accent/5 animate-spin`} style={{ animationDuration: '4s' }}>
                    <div className="absolute inset-1 rounded-full border border-dashed border-accent/20" />
                  </div>
                ))}
              </div>
            </div>

            {/* Component labels */}
            {components.map((comp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`absolute ${comp.position} z-10`}
              >
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

        {/* Component grid summary */}
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

export default C20HardwareSection;
