import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Radio, Navigation, Triangle, Minus, ArrowDownUp, Waypoints } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { OptimizedImage } from "@/components/OptimizedImage";
import taskImg from "@/assets/products/w400-task-allocation.png";
import formationImg from "@/assets/products/w400-formation-flight.png";

const W400SwarmMissionSection = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const formations = [
    { icon: <Minus className="h-5 w-5" />, title: isZh ? "一字队形" : "Line Formation", desc: isZh ? "横向排列，适合大面积巡检扫描" : "Lateral alignment for wide-area patrol scanning" },
    { icon: <Triangle className="h-5 w-5" />, title: isZh ? "三角队形" : "Triangle Formation", desc: isZh ? "三角构型，适合追踪与围堵" : "Triangular config for tracking & encirclement" },
    { icon: <ArrowDownUp className="h-5 w-5" />, title: isZh ? "队形变换" : "Formation Switching", desc: isZh ? "运行中实时切换队形，灵活应对任务变化" : "Real-time formation switch during flight for mission flexibility" },
  ];

  const tasks = [
    { label: isZh ? "任务 A" : "Task A", desc: isZh ? "编队飞行" : "Formation Flight", color: "bg-accent" },
    { label: isZh ? "任务 B" : "Task B", desc: isZh ? "航点巡航" : "Waypoint Cruise", color: "bg-accent" },
    { label: isZh ? "任务 C" : "Task C", desc: isZh ? "目标追踪" : "Target Tracking", color: "bg-accent" },
  ];

  return (
    <section className="py-20 bg-[hsl(220,20%,8%)] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:30px_30px]" />
      
      <div className="container-custom relative z-10">
        {/* Task Allocation */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Radio className="h-4 w-4" />
            {isZh ? '集群任务调度' : 'Swarm Task Scheduling'}
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            {isZh ? '任务自主分配' : 'Autonomous Task Allocation'}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {isZh ? '地面站统一发送指令，多架无人机自主领取并执行不同任务，实现高效协同作业' : 'Ground station sends unified commands, multiple UAVs autonomously claim and execute different tasks for efficient coordination'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <OptimizedImage src={taskImg} alt={isZh ? "任务自主分配示意图" : "Task Allocation Diagram"} aspectRatio="4/3" className="w-full rounded-2xl" objectFit="contain" />
          </motion.div>

          <div>
            {/* Task flow */}
            <div className="space-y-4 mb-8">
              {tasks.map((task, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-xl ${task.color}/20 flex items-center justify-center`}>
                    <Navigation className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-accent/30 transition-colors">
                    <div className="font-bold text-accent">{task.label}</div>
                    <div className="text-sm text-white/60">{task.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-2 text-accent font-bold mb-2">
                <Waypoints className="h-4 w-4" />
                {isZh ? '地面站指令控制' : 'Ground Station Command Control'}
              </div>
              <p className="text-sm text-white/60">
                {isZh ? 'Prometheus集群控制系统通过Mesh自组网向各机下发差异化任务指令，支持实时任务重分配与应急调度' : 'Prometheus swarm control system distributes differentiated task commands via Mesh networking, supporting real-time task reassignment and emergency dispatch'}
              </p>
            </div>
          </div>
        </div>

        {/* Formation Flight */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            {isZh ? '可实现功能 · 编队飞行' : 'Capabilities · Formation Flight'}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {isZh ? '本开发平台提供丰富的demo例程，支持一字队形、三角队形以及队形变换等多种编队模式' : 'The development platform provides rich demo programs supporting line, triangle, and dynamic formation switching modes'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 order-2 lg:order-1">
            {formations.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-white/5 border-white/10 hover:border-accent/30 transition-colors">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{f.title}</h4>
                      <p className="text-sm text-white/50 mt-1">{f.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
            <OptimizedImage src={formationImg} alt={isZh ? "编队飞行功能展示" : "Formation Flight Demo"} aspectRatio="4/3" className="w-full rounded-2xl" objectFit="contain" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default W400SwarmMissionSection;
