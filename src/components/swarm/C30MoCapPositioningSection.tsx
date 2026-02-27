import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Crosshair, Gauge, Zap, MonitorSmartphone } from "lucide-react";
import mocapSystemImg from "@/assets/products/c30-mocap-system.png";

/** Animated counter that counts up when in view */
const AnimatedCounter = ({ end, suffix = "", prefix = "", duration = 2000 }: { end: number; suffix?: string; prefix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

const C30MoCapPositioningSection = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const metrics = [
    {
      icon: Crosshair,
      value: <AnimatedCounter end={1} prefix="±" suffix="mm" />,
      label: isZh ? "定位精度" : "Positioning Accuracy",
      sublabel: isZh ? "亚毫米级" : "Sub-millimeter",
      desc: isZh ? "动捕系统提供亚毫米级三维空间定位，满足高精度编队控制需求" : "MoCap provides sub-mm 3D spatial positioning for high-precision formation control",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: Gauge,
      value: <AnimatedCounter end={260} suffix="Hz" />,
      label: isZh ? "数据刷新率" : "Data Refresh Rate",
      sublabel: isZh ? "高速捕捉" : "High-speed Capture",
      desc: isZh ? "260Hz位姿数据输出，确保快速机动时的实时状态反馈" : "260Hz pose data output for real-time feedback during rapid maneuvers",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: Zap,
      value: <><AnimatedCounter prefix="<" end={4} suffix="ms" /></>,
      label: isZh ? "系统延迟" : "System Latency",
      sublabel: isZh ? "超低延迟" : "Ultra-low Latency",
      desc: isZh ? "端到端延迟低于4毫秒，保证集群控制指令的即时执行" : "End-to-end latency below 4ms for instant swarm command execution",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: MonitorSmartphone,
      value: isZh ? "一键操控" : "1-Click",
      label: isZh ? "软件操控" : "Software Control",
      sublabel: isZh ? "简单易用" : "Easy to Use",
      desc: isZh ? "提供一键创建刚体、一键标定、三维展示、轨迹显示等功能" : "One-click rigid body creation, calibration, 3D display, and trajectory visualization",
      color: "from-violet-500 to-purple-600",
    },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="container-custom relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-accent font-mono text-sm tracking-widest uppercase mb-2 block">MoCap Positioning System</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            {isZh ? '动作捕捉定位系统' : 'Motion Capture Positioning System'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isZh
              ? '兼容OptiTrack / NOKOV / VICON主流动捕系统，为室内编队提供业界领先的定位精度与刷新率'
              : 'Compatible with OptiTrack / NOKOV / VICON mainstream MoCap systems, delivering industry-leading indoor positioning accuracy and refresh rate'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Metrics cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <div className="p-6 rounded-2xl bg-card border border-border/30 hover:border-accent/40 transition-all duration-300 h-full">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${m.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <m.icon className="w-6 h-6 text-accent mb-3" />
                    <div className="text-3xl md:text-4xl font-black text-foreground mb-1">
                      {m.value}
                    </div>
                    <div className="text-sm font-semibold text-accent mb-1">{m.sublabel}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{m.desc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* MoCap illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-border/20 bg-card">
              <img
                src={mocapSystemImg}
                alt={isZh ? "动作捕捉定位系统" : "Motion Capture Positioning System"}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            {/* Floating specs */}
            <div className="absolute -bottom-4 -left-4 bg-card/95 backdrop-blur border border-accent/30 rounded-xl p-3 shadow-lg">
              <div className="text-xs text-muted-foreground">{isZh ? '支持系统' : 'Supported'}</div>
              <div className="text-sm font-bold text-foreground">OptiTrack · NOKOV · VICON</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default C30MoCapPositioningSection;
