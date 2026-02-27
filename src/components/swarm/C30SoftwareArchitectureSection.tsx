import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

/**
 * Interactive SVG-based ROS Communication Architecture Diagram
 * Based on the swarm software framework images showing:
 * - Ground station & communication nodes (TCP/IP, UDP)
 * - Swarm nodes (ROS communication)  
 * - UAV control & MAVROS layers
 */
const C30SoftwareArchitectureSection = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-accent font-mono text-sm tracking-widest uppercase mb-2 block">Software Architecture</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            {isZh ? '集群软件框架图' : 'Swarm Software Architecture'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isZh
              ? '基于ROS的分布式集群通信架构，地面站通过UDP组播协调多机通信节点，每架无人机独立运行Swarm与MAVROS控制栈'
              : 'ROS-based distributed swarm communication architecture with UDP multicast ground station coordinating multi-UAV communication nodes'}
          </p>
        </motion.div>

        {/* Architecture Diagram as Interactive Code SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-card rounded-2xl border border-border/30 p-4 md:p-8 overflow-x-auto">
            <svg viewBox="0 0 900 620" className="w-full h-auto" style={{ minWidth: 600 }}>
              <defs>
                <marker id="arrowOrange" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" className="fill-accent" />
                </marker>
                <marker id="arrowCyan" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="hsl(185, 80%, 50%)" />
                </marker>
                <marker id="arrowPurple" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="hsl(270, 60%, 60%)" />
                </marker>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Protocol Legend */}
              <g transform="translate(20, 20)">
                <rect width="12" height="12" rx="2" className="fill-accent" opacity="0.8" />
                <text x="18" y="11" className="fill-foreground text-[10px]">TCP/IP</text>
                <rect y="18" width="12" height="12" rx="2" fill="hsl(185, 80%, 50%)" opacity="0.8" />
                <text x="18" y="29" className="fill-foreground text-[10px]">UDP</text>
                <rect y="36" width="12" height="12" rx="2" fill="hsl(270, 60%, 60%)" opacity="0.8" />
                <text x="18" y="47" className="fill-foreground text-[10px]">ROS</text>
              </g>

              {/* ===== GROUND STATION (Top) ===== */}
              <g transform="translate(350, 30)">
                <rect x="0" y="0" width="200" height="50" rx="10" fill="hsl(185, 80%, 50%)" opacity="0.15" stroke="hsl(185, 80%, 50%)" strokeWidth="1.5" />
                <text x="100" y="22" textAnchor="middle" className="fill-foreground text-[13px] font-bold">{isZh ? '地面站 & 通信节点' : 'Ground Station'}</text>
                <text x="100" y="40" textAnchor="middle" fill="hsl(185, 80%, 50%)" className="text-[10px]">{isZh ? '集群控制中心' : 'Swarm Control Center'}</text>
              </g>

              {/* UDP Multicast Node */}
              <g transform="translate(400, 110)">
                <ellipse cx="50" cy="20" rx="70" ry="20" fill="hsl(185, 80%, 50%)" opacity="0.1" stroke="hsl(185, 80%, 50%)" strokeWidth="1" />
                <text x="50" y="24" textAnchor="middle" fill="hsl(185, 80%, 50%)" className="text-[11px] font-semibold">{isZh ? 'UDP 组播地址' : 'UDP Multicast'}</text>
              </g>

              {/* Lines from GS to UDP */}
              <line x1="450" y1="80" x2="450" y2="110" stroke="hsl(185, 80%, 50%)" strokeWidth="1.5" markerEnd="url(#arrowCyan)" strokeDasharray="4,3" />

              {/* ===== COMMUNICATION NODES (Row 2) ===== */}
              {[
                { x: 100, label: isZh ? "通信节点 2" : "Comm Node 2" },
                { x: 370, label: isZh ? "通信节点 1" : "Comm Node 1" },
                { x: 640, label: isZh ? "通信节点 3" : "Comm Node 3" },
              ].map((n, i) => (
                <g key={i} transform={`translate(${n.x}, 180)`}>
                  <rect width="160" height="44" rx="8" fill="hsl(185, 80%, 50%)" opacity="0.12" stroke="hsl(185, 80%, 50%)" strokeWidth="1" />
                  <text x="80" y="28" textAnchor="middle" fill="hsl(185, 80%, 50%)" className="text-[12px] font-semibold">{n.label}</text>
                </g>
              ))}

              {/* UDP lines from multicast to comm nodes */}
              <line x1="400" y1="130" x2="180" y2="180" stroke="hsl(185, 80%, 50%)" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#arrowCyan)" />
              <line x1="450" y1="150" x2="450" y2="180" stroke="hsl(185, 80%, 50%)" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#arrowCyan)" />
              <line x1="500" y1="130" x2="720" y2="180" stroke="hsl(185, 80%, 50%)" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#arrowCyan)" />

              {/* Horizontal comm links between nodes */}
              <line x1="260" y1="202" x2="370" y2="202" className="stroke-accent" strokeWidth="1.5" markerEnd="url(#arrowOrange)" />
              <line x1="530" y1="202" x2="640" y2="202" className="stroke-accent" strokeWidth="1.5" markerEnd="url(#arrowOrange)" />

              {/* Comm node annotations */}
              <g transform="translate(270, 240)">
                <text y="0" className="fill-muted-foreground text-[9px]">swarm → {isZh ? '通信节点' : 'comm node'}:</text>
                <text y="13" className="fill-muted-foreground text-[9px]">1. {isZh ? '反馈地面站打印信息' : 'GS status feedback'}</text>
                <text y="26" className="fill-muted-foreground text-[9px]">2. {isZh ? 'GPS/RTK定位坐标原点偏移量' : 'GPS/RTK origin offset'}</text>
              </g>
              <g transform="translate(560, 240)">
                <text y="0" className="fill-muted-foreground text-[9px]">{isZh ? '通信节点' : 'comm node'} → swarm:</text>
                <text y="13" className="fill-muted-foreground text-[9px]">1. {isZh ? '全部无人机信息' : 'All UAV info'}</text>
                <text y="26" className="fill-muted-foreground text-[9px]">2. {isZh ? '通信状态' : 'Comm status'}</text>
                <text y="39" className="fill-muted-foreground text-[9px]">3. {isZh ? '集群控制指令' : 'Swarm commands'}</text>
              </g>

              {/* ===== SWARM NODES (Row 3) ===== */}
              {[
                { x: 110, label: "swarm2" },
                { x: 385, label: "swarm1" },
                { x: 660, label: "swarm3" },
              ].map((n, i) => (
                <g key={i} transform={`translate(${n.x}, 310)`}>
                  <polygon points="65,0 130,35 65,70 0,35" fill="hsl(50, 90%, 55%)" opacity="0.12" stroke="hsl(50, 90%, 55%)" strokeWidth="1" />
                  <text x="65" y="40" textAnchor="middle" className="fill-foreground text-[12px] font-bold">{n.label}</text>
                </g>
              ))}

              {/* Comm → Swarm lines (ROS) */}
              <line x1="180" y1="224" x2="175" y2="310" stroke="hsl(270, 60%, 60%)" strokeWidth="1.5" markerEnd="url(#arrowPurple)" />
              <line x1="450" y1="224" x2="450" y2="310" stroke="hsl(270, 60%, 60%)" strokeWidth="1.5" markerEnd="url(#arrowPurple)" />
              <line x1="720" y1="224" x2="725" y2="310" stroke="hsl(270, 60%, 60%)" strokeWidth="1.5" markerEnd="url(#arrowPurple)" />

              {/* Swarm description */}
              <text x="450" y="400" textAnchor="middle" className="fill-muted-foreground text-[10px] italic">
                {isZh ? '响应集群控制指令 · 集群系统监测 · 下发控制指令到 uav_control' : 'Respond to swarm commands · System monitoring · Relay to uav_control'}
              </text>

              {/* ===== UAV_CONTROL (Row 4) ===== */}
              {[
                { x: 110, label: "uav_control2" },
                { x: 385, label: "uav_control1" },
                { x: 660, label: "uav_control3" },
              ].map((n, i) => (
                <g key={i} transform={`translate(${n.x}, 420)`}>
                  <polygon points="65,0 130,30 65,60 0,30" fill="hsl(270, 60%, 60%)" opacity="0.12" stroke="hsl(270, 60%, 60%)" strokeWidth="1" />
                  <text x="65" y="35" textAnchor="middle" fill="hsl(270, 60%, 60%)" className="text-[11px] font-semibold">{n.label}</text>
                </g>
              ))}

              {/* Swarm → UAV Control lines */}
              <line x1="175" y1="380" x2="175" y2="420" stroke="hsl(270, 60%, 60%)" strokeWidth="1.5" markerEnd="url(#arrowPurple)" />
              <line x1="450" y1="380" x2="450" y2="420" stroke="hsl(270, 60%, 60%)" strokeWidth="1.5" markerEnd="url(#arrowPurple)" />
              <line x1="725" y1="380" x2="725" y2="420" stroke="hsl(270, 60%, 60%)" strokeWidth="1.5" markerEnd="url(#arrowPurple)" />

              {/* ===== MAVROS (Row 5) ===== */}
              {[
                { x: 120, label: "mavros2" },
                { x: 395, label: "mavros1" },
                { x: 670, label: "mavros3" },
              ].map((n, i) => (
                <g key={i} transform={`translate(${n.x}, 510)`}>
                  <rect width="110" height="40" rx="8" fill="hsl(270, 60%, 60%)" opacity="0.15" stroke="hsl(270, 60%, 60%)" strokeWidth="1" />
                  <text x="55" y="25" textAnchor="middle" fill="hsl(270, 60%, 60%)" className="text-[12px] font-bold">{n.label}</text>
                </g>
              ))}

              {/* UAV Control → MAVROS */}
              <line x1="175" y1="480" x2="175" y2="510" stroke="hsl(270, 60%, 60%)" strokeWidth="1.5" markerEnd="url(#arrowPurple)" />
              <line x1="450" y1="480" x2="450" y2="510" stroke="hsl(270, 60%, 60%)" strokeWidth="1.5" markerEnd="url(#arrowPurple)" />
              <line x1="725" y1="480" x2="725" y2="510" stroke="hsl(270, 60%, 60%)" strokeWidth="1.5" markerEnd="url(#arrowPurple)" />

              {/* Layer labels on right */}
              <g transform="translate(850, 200)">
                <text textAnchor="end" className="fill-muted-foreground text-[9px] font-mono" transform="rotate(-90)">TCP/IP + UDP</text>
              </g>
              <g transform="translate(870, 440)">
                <text textAnchor="end" className="fill-muted-foreground text-[9px] font-mono" transform="rotate(-90)">ROS Communication</text>
              </g>
            </svg>
          </div>

          {/* ROS Topic Detail - formation control flow */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              {
                title: isZh ? "Formation Control" : "Formation Control",
                desc: isZh ? "集群编队核心控制节点，接收Prometheus控制指令，输出位姿目标到MAVROS" : "Core formation control node receiving Prometheus commands, outputting pose targets to MAVROS",
                topics: ["formation_control", "formation_state", "formation_move"],
              },
              {
                title: isZh ? "MAVROS Bridge" : "MAVROS Bridge",
                desc: isZh ? "ROS与PX4飞控之间的通信桥梁，处理解锁、模式切换、位置目标等服务调用" : "Communication bridge between ROS and PX4 autopilot for arming, mode switching, and position targets",
                topics: ["/uav*/mavros", "cmd/arming", "set_mode"],
              },
              {
                title: isZh ? "Prometheus R1.6" : "Prometheus R1.6",
                desc: isZh ? "上层任务规划与决策系统，发布控制指令与队形变换命令到编队控制节点" : "Upper-layer mission planning and decision system publishing control and formation change commands",
                topics: ["control_command", "formation/change", "ControlCommand"],
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl border border-border/30 p-5"
              >
                <h4 className="text-sm font-bold text-accent mb-2 font-mono">{item.title}</h4>
                <p className="text-xs text-muted-foreground mb-3">{item.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {item.topics.map((t, j) => (
                    <span key={j} className="text-[10px] font-mono bg-accent/10 text-accent px-2 py-0.5 rounded">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default C30SoftwareArchitectureSection;
