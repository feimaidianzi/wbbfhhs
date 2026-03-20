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
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-accent font-mono text-sm tracking-widest uppercase mb-2 block">Software Architecture</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            {t('swarm.c30softwarearchitecturesection.k189')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('swarm.c30softwarearchitecturesection.k190')}
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
                <text x="100" y="22" textAnchor="middle" className="fill-foreground text-[13px] font-bold">{t('swarm.c30softwarearchitecturesection.k191')}</text>
                <text x="100" y="40" textAnchor="middle" fill="hsl(185, 80%, 50%)" className="text-[10px]">{t('swarm.c30softwarearchitecturesection.k192')}</text>
              </g>

              {/* UDP Multicast Node */}
              <g transform="translate(400, 110)">
                <ellipse cx="50" cy="20" rx="70" ry="20" fill="hsl(185, 80%, 50%)" opacity="0.1" stroke="hsl(185, 80%, 50%)" strokeWidth="1" />
                <text x="50" y="24" textAnchor="middle" fill="hsl(185, 80%, 50%)" className="text-[11px] font-semibold">{t('swarm.c30softwarearchitecturesection.k193')}</text>
              </g>

              {/* Lines from GS to UDP */}
              <line x1="450" y1="80" x2="450" y2="110" stroke="hsl(185, 80%, 50%)" strokeWidth="1.5" markerEnd="url(#arrowCyan)" strokeDasharray="4,3" />

              {/* ===== COMMUNICATION NODES (Row 2) ===== */}
              {[
                { x: 100, label: t('swarm.c30softwarearchitecturesection.k194') },
                { x: 370, label: t('swarm.c30softwarearchitecturesection.k195') },
                { x: 640, label: t('swarm.c30softwarearchitecturesection.k196') },
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
                <text y="0" className="fill-muted-foreground text-[9px]">swarm → {t('swarm.c30softwarearchitecturesection.k197')}:</text>
                <text y="13" className="fill-muted-foreground text-[9px]">1. {t('swarm.c30softwarearchitecturesection.k198')}</text>
                <text y="26" className="fill-muted-foreground text-[9px]">2. {t('swarm.c30softwarearchitecturesection.k199')}</text>
              </g>
              <g transform="translate(560, 240)">
                <text y="0" className="fill-muted-foreground text-[9px]">{t('swarm.c30softwarearchitecturesection.k197')} → swarm:</text>
                <text y="13" className="fill-muted-foreground text-[9px]">1. {t('swarm.c30softwarearchitecturesection.k200')}</text>
                <text y="26" className="fill-muted-foreground text-[9px]">2. {t('swarm.c30softwarearchitecturesection.k201')}</text>
                <text y="39" className="fill-muted-foreground text-[9px]">3. {t('swarm.c30softwarearchitecturesection.k202')}</text>
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
                {t('swarm.c30softwarearchitecturesection.k203')}
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
                title: t('swarm.c30softwarearchitecturesection.k204'),
                desc: t('swarm.c30softwarearchitecturesection.k205'),
                topics: ["formation_control", "formation_state", "formation_move"],
              },
              {
                title: t('swarm.c30softwarearchitecturesection.k206'),
                desc: t('swarm.c30softwarearchitecturesection.k207'),
                topics: ["/uav*/mavros", "cmd/arming", "set_mode"],
              },
              {
                title: t('swarm.c30softwarearchitecturesection.k208'),
                desc: t('swarm.c30softwarearchitecturesection.k209'),
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
