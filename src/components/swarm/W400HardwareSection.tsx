import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { OptimizedImage } from "@/components/OptimizedImage";
import fcImg from "@/assets/products/w400-flight-controller.webp";
import jetsonImg from "@/assets/products/w400-jetson-module.webp";
import meshImg from "@/assets/products/w400-mesh-module.webp";

interface HardwarePin {
  id: string;
  label: string;
  desc: string;
  descEn: string;
  x: string; // percentage
  y: string;
}

const W400HardwareSection = () => {
  const { t, language } = useLanguage();
  const isZh = language === 'zh';
  const [activePin, setActivePin] = useState<string | null>(null);

  const pins: HardwarePin[] = [
    { id: "fc", label: "Pixhawk 6C", desc: "飞行控制器，STM32H743处理器，IMU冗余设计", descEn: "Flight controller, STM32H743 processor, redundant IMU design", x: "50%", y: "30%" },
    { id: "gps", label: "GNSS Module", desc: "GPS/GLONASS/北斗/Galileo四星定位，RTK可选", descEn: "GPS/GLONASS/BeiDou/Galileo quad-constellation, optional RTK", x: "50%", y: "10%" },
    { id: "jetson", label: "Jetson Orin NX", desc: "100 TOPS AI算力，16GB LPDDR5，8核A78AE", descEn: "100 TOPS AI, 16GB LPDDR5, 8-core A78AE", x: "30%", y: "45%" },
    { id: "homer", label: "Mini Homer", desc: "Mesh自组网通讯，1km距离，3Mbps带宽", descEn: "Mesh networking, 1km range, 3Mbps bandwidth", x: "70%", y: "45%" },
    { id: "esc", label: "ESC × 6", desc: "30A BLHeli_S电调，DShot协议", descEn: "30A BLHeli_S ESC with DShot protocol", x: "20%", y: "65%" },
    { id: "motor", label: "920KV Motor × 6", desc: "无刷外转子电机，10×4.5碳纤桨", descEn: "Brushless outrunner with 10×4.5 CF props", x: "80%", y: "65%" },
    { id: "battery", label: "6S 5200mAh", desc: "22.2V高压锂聚合物电池，XT60接口", descEn: "22.2V high-voltage LiPo, XT60 connector", x: "50%", y: "80%" },
    { id: "uart", label: "UART / USB", desc: "串口调试与数据输出，Type-C调试接口", descEn: "Serial debug & data output, Type-C debug port", x: "15%", y: "30%" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{t('swarm.w400hardwaresection.k331')}</h2>
          <p className="text-muted-foreground">{t('swarm.w400hardwaresection.k332')}</p>
        </motion.div>

        {/* Interactive hardware diagram - Desktop */}
        <div className="hidden md:block max-w-3xl mx-auto">
          <div className="relative bg-card border border-border/30 rounded-2xl p-8 aspect-[4/3]">
            {/* Hexacopter frame visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-64 h-64 text-accent/20">
                {/* Hex frame arms */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const x2 = 100 + 70 * Math.cos(rad);
                  const y2 = 100 + 70 * Math.sin(rad);
                  return <line key={i} x1="100" y1="100" x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" />;
                })}
                <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const cx = 100 + 70 * Math.cos(rad);
                  const cy = 100 + 70 * Math.sin(rad);
                  return <circle key={`m${i}`} cx={cx} cy={cy} r="12" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />;
                })}
              </svg>
            </div>

            {/* Interactive pins */}
            {pins.map((pin) => (
              <div
                key={pin.id}
                className="absolute z-10"
                style={{ left: pin.x, top: pin.y, transform: "translate(-50%, -50%)" }}
                onMouseEnter={() => setActivePin(pin.id)}
                onMouseLeave={() => setActivePin(null)}
              >
                <div className={`relative cursor-pointer transition-all ${activePin === pin.id ? 'scale-110' : ''}`}>
                  <div className={`px-2 py-1 rounded text-xs font-mono whitespace-nowrap border transition-colors ${activePin === pin.id ? 'bg-accent text-accent-foreground border-accent' : 'bg-card/80 text-foreground border-accent/30 hover:border-accent/60'}`}>
                    {pin.label}
                  </div>
                  {activePin === pin.id && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-card border border-accent/30 rounded-lg p-3 shadow-xl z-20">
                      <div className="font-bold text-sm text-accent mb-1">{pin.label}</div>
                      <div className="text-xs text-muted-foreground">{isZh ? pin.desc : pin.descEn}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile list view */}
        <div className="md:hidden max-w-lg mx-auto space-y-3">
          {pins.map((pin, i) => (
            <motion.div key={pin.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 bg-card border border-border/30 rounded-lg p-4 hover:border-accent/30 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
              <div>
                <div className="font-bold text-sm text-foreground font-mono">{pin.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{isZh ? pin.desc : pin.descEn}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hardware Component Gallery */}
        <div className="mt-16 max-w-5xl mx-auto">
          <h3 className="text-xl font-bold text-foreground mb-8 text-center">{t('swarm.c30hardwaresection.k158')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: fcImg, title: "Pixhawk 6C", desc: t('swarm.w400hardwaresection.k333') },
              { img: jetsonImg, title: "Jetson Orin NX", desc: t('swarm.w400hardwaresection.k334') },
              { img: meshImg, title: "Mini Homer", desc: t('swarm.w400hardwaresection.k335') },
            ].map((mod, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card border border-border/30 rounded-xl overflow-hidden hover:border-accent/30 transition-all group"
              >
                <div className="p-4">
                  <OptimizedImage src={mod.img} alt={mod.title} aspectRatio="4/3" className="w-full rounded-lg group-hover:scale-[1.02] transition-transform" objectFit="contain" />
                </div>
                <div className="px-4 pb-4 text-center">
                  <div className="font-bold text-accent text-sm">{mod.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{mod.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default W400HardwareSection;
