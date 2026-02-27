import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Crosshair, Cpu, Code, Camera, Monitor, Layers, Zap, Users } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import droneMainImg from "@/assets/products/c30-drone-main.webp";

const C30FeaturesSection = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const features = [
    {
      icon: <Crosshair className="h-6 w-6" />,
      title: isZh ? "全自动集群编队" : "Fully Autonomous Formation",
      desc: isZh ? "支持一键起飞、自主编队、队形变换和自动降落，无需人工干预即可完成复杂编队任务。" : "One-click takeoff, autonomous formation, shape transitions, and auto-landing without manual intervention.",
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: isZh ? "动捕高精度定位" : "MoCap High-Precision Positioning",
      desc: isZh ? "兼容 OptiTrack/NOKOV/VICON 动捕系统，±1mm 定位精度，360Hz 刷新率，无漂移累积误差。" : "Compatible with OptiTrack/NOKOV/VICON, ±1mm accuracy, 360Hz refresh rate, zero drift accumulation.",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: isZh ? "Jetson Orin NX 边缘计算" : "Jetson Orin NX Edge Computing",
      desc: isZh ? "搭载 NVIDIA Jetson Orin NX，100 TOPS AI 算力，支持实时目标检测和路径规划。" : "NVIDIA Jetson Orin NX with 100 TOPS AI performance for real-time detection and path planning.",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: isZh ? "ROS 开源集群架构" : "ROS Open-Source Swarm Architecture",
      desc: isZh ? "基于 ROS 的完整集群控制框架，支持自定义编队算法、避障策略和任务规划开发。" : "Complete ROS-based swarm control framework supporting custom formation, obstacle avoidance, and task planning.",
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      title: isZh ? "可视化地面站" : "Visual Ground Station",
      desc: isZh ? "Qt 地面站软件，实时显示各机状态、编队轨迹和传感器数据，支持一键任务下发。" : "Qt ground station with real-time status display, formation trajectories, sensor data, and one-click mission dispatch.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: isZh ? "灵活集群规模" : "Flexible Swarm Scale",
      desc: isZh ? "标配3机编队，支持扩展至更大规模集群，满足从教学演示到科研验证的不同需求。" : "Standard 3-drone formation, scalable to larger swarms for educational demos to research validation.",
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        {/* Product Hero Image */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-2xl mx-auto mb-12">
          <OptimizedImage src={droneMainImg} alt="CANI C30 动捕集群无人机整机" aspectRatio="4/3" className="w-full rounded-2xl" objectFit="contain" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{isZh ? '核心优势' : 'Core Advantages'}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{isZh ? '面向科研与教育的亚毫米级精度集群无人机解决方案' : 'Sub-mm precision swarm drone solution for research and education'}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <Card className="h-full bg-card border-accent/10 hover:border-accent/40 hover:shadow-[0_0_20px_hsl(var(--accent)/0.15)] transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default C30FeaturesSection;
