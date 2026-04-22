import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "@/lib/motion-shim";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Unlock, Move, TriangleRight, ArrowUpDown } from "lucide-react";
import fleetImg from "@/assets/products/c30-fleet-render.png";

/** Simple SVG drone icon for diagrams */
const DroneIcon = ({ x, y, size = 28 }: { x: number; y: number; size?: number }) => (
  <g transform={`translate(${x - size / 2}, ${y - size / 2})`}>
    <circle cx={size / 2} cy={size / 2} r={size / 2 - 2} className="fill-accent/20 stroke-accent" strokeWidth="1.5" />
    <line x1={4} y1={size / 2} x2={size - 4} y2={size / 2} className="stroke-accent" strokeWidth="1.5" />
    <line x1={size / 2} y1={4} x2={size / 2} y2={size - 4} className="stroke-accent" strokeWidth="1.5" />
    <circle cx={size / 2} cy={size / 2} r={3} className="fill-accent" />
  </g>
);

const C30FormationDemoSection = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("mode");

  const tabs = [
    {
      id: "mode",
      icon: Unlock,
      label: t('swarm.c30formationdemosection.k129'),
      desc: t('swarm.c30formationdemosection.k130'),
      diagram: (
        <svg viewBox="0 0 300 200" className="w-full max-w-sm mx-auto">
          {/* Unlock/land icons */}
          <text x="100" y="25" textAnchor="middle" className="fill-accent text-[20px]">🔓</text>
          <text x="150" y="25" textAnchor="middle" className="fill-accent text-[20px]">⬇</text>
          <text x="200" y="25" textAnchor="middle" className="fill-accent text-[20px]">···</text>
          {/* Arrows down */}
          {[100, 150, 200].map((x, i) => (
            <line key={i} x1={x} y1={35} x2={x} y2={55} className="stroke-accent/60" strokeWidth="1" strokeDasharray="3,2" />
          ))}
          {/* Three drones in a row */}
          <DroneIcon x={80} y={100} size={40} />
          <DroneIcon x={150} y={100} size={40} />
          <DroneIcon x={220} y={100} size={40} />
          <text x="150" y="170" textAnchor="middle" className="fill-muted-foreground text-[11px]">{t('swarm.c30formationdemosection.k131')}</text>
        </svg>
      ),
    },
    {
      id: "position",
      icon: Move,
      label: t('swarm.c30formationdemosection.k132'),
      desc: t('swarm.c30formationdemosection.k133'),
      diagram: (
        <svg viewBox="0 0 300 200" className="w-full max-w-sm mx-auto">
          {/* Arrows up showing position commands */}
          <line x1="80" y1="80" x2="80" y2="40" className="stroke-accent" strokeWidth="1.5" markerEnd="url(#arrowUp)" />
          <line x1="150" y1="60" x2="150" y2="20" className="stroke-accent" strokeWidth="1.5" markerEnd="url(#arrowUp)" />
          <line x1="220" y1="80" x2="220" y2="40" className="stroke-accent" strokeWidth="1.5" markerEnd="url(#arrowUp)" />
          <defs>
            <marker id="arrowUp" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto">
              <polygon points="0 6, 3 0, 6 6" className="fill-accent" />
            </marker>
          </defs>
          <DroneIcon x={80} y={110} size={40} />
          <DroneIcon x={150} y={90} size={40} />
          <DroneIcon x={220} y={110} size={40} />
          <text x="150" y="170" textAnchor="middle" className="fill-muted-foreground text-[11px]">{t('swarm.c30formationdemosection.k134')}</text>
        </svg>
      ),
    },
    {
      id: "line",
      icon: ArrowUpDown,
      label: t('swarm.c30formationdemosection.k135'),
      desc: t('swarm.c30formationdemosection.k136'),
      diagram: (
        <svg viewBox="0 0 300 200" className="w-full max-w-sm mx-auto">
          <DroneIcon x={60} y={100} size={36} />
          <DroneIcon x={150} y={100} size={36} />
          <DroneIcon x={240} y={100} size={36} />
          {/* Line connecting */}
          <line x1="80" y1="100" x2="130" y2="100" className="stroke-accent/40" strokeWidth="1" strokeDasharray="4,3" />
          <line x1="170" y1="100" x2="220" y2="100" className="stroke-accent/40" strokeWidth="1" strokeDasharray="4,3" />
          <text x="150" y="170" textAnchor="middle" className="fill-muted-foreground text-[11px]">{t('swarm.c30formationdemosection.k137')}</text>
        </svg>
      ),
    },
    {
      id: "triangle",
      icon: TriangleRight,
      label: t('swarm.c30formationdemosection.k138'),
      desc: t('swarm.c30formationdemosection.k139'),
      diagram: (
        <svg viewBox="0 0 300 200" className="w-full max-w-sm mx-auto">
          <DroneIcon x={150} y={50} size={36} />
          <DroneIcon x={90} y={140} size={36} />
          <DroneIcon x={210} y={140} size={36} />
          {/* Triangle lines */}
          <line x1="150" y1="70" x2="100" y2="125" className="stroke-accent/40" strokeWidth="1" strokeDasharray="4,3" />
          <line x1="150" y1="70" x2="200" y2="125" className="stroke-accent/40" strokeWidth="1" strokeDasharray="4,3" />
          <line x1="110" y1="140" x2="190" y2="140" className="stroke-accent/40" strokeWidth="1" strokeDasharray="4,3" />
          <text x="150" y="190" textAnchor="middle" className="fill-muted-foreground text-[11px]">{t('swarm.c30formationdemosection.k140')}</text>
        </svg>
      ),
    },
    {
      id: "transform",
      icon: Move,
      label: t('swarm.c30formationdemosection.k141'),
      desc: t('swarm.c30formationdemosection.k142'),
      diagram: (
        <svg viewBox="0 0 300 200" className="w-full max-w-sm mx-auto">
          {/* Before: line */}
          <DroneIcon x={40} y={60} size={28} />
          <DroneIcon x={90} y={60} size={28} />
          <DroneIcon x={140} y={60} size={28} />
          {/* Arrows */}
          <text x="150" y="115" textAnchor="middle" className="fill-accent text-[16px] font-bold">⇩</text>
          {/* After: triangle */}
          <DroneIcon x={190} y={140} size={28} />
          <DroneIcon x={230} y={170} size={28} />
          <DroneIcon x={260} y={140} size={28} />
          <text x="80" y="40" className="fill-muted-foreground text-[9px]">{t('swarm.c30formationdemosection.k143')}</text>
          <text x="220" y="130" className="fill-muted-foreground text-[9px]">{t('swarm.c30formationdemosection.k144')}</text>
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-accent font-mono text-sm tracking-widest uppercase mb-2 block">Formation Demos</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            {t('swarm.c30formationdemosection.k145')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('swarm.c30formationdemosection.k146')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Fleet render image */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="rounded-2xl overflow-hidden border border-border/20 bg-card p-4">
              <img src={fleetImg} alt={t('swarm.c30formationdemosection.k147')} className="w-full h-auto" loading="lazy" />
            </div>
          </motion.div>

          {/* Right: Tabbed demos */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full flex-wrap h-auto gap-1 bg-muted/50 p-1">
                {tabs.map(tab => (
                  <TabsTrigger key={tab.id} value={tab.id} className="text-xs flex items-center gap-1 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                    <tab.icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {tabs.map(tab => (
                <TabsContent key={tab.id} value={tab.id} className="mt-6">
                  <div className="bg-card rounded-xl border border-border/30 p-6">
                    <p className="text-sm text-muted-foreground mb-6">{tab.desc}</p>
                    <div className="bg-muted/30 rounded-lg p-4">
                      {tab.diagram}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default C30FormationDemoSection;
