import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation, Cpu, Code, Radio, Eye, Layers, Zap, Package } from "lucide-react";

const C20FeaturesSection = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const features = [
    {
      icon: <Navigation className="h-6 w-6" />,
      title: isZh ? "UWB 高精度定位" : "UWB High-Precision Positioning",
      desc: isZh ? "10cm 定位精度，200Hz 刷新率，亚毫秒级延迟，无需GPS即可实现精准室内导航。" : "10cm accuracy, 200Hz refresh rate, sub-millisecond latency for precise indoor navigation without GPS.",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: isZh ? "Pixhawk 开源飞控" : "Pixhawk Open-Source FC",
      desc: isZh ? "基于 Pixhawk 飞控平台，支持 PX4/ArduPilot 固件，完全开源可定制。" : "Based on Pixhawk FC platform, supports PX4/ArduPilot firmware, fully open-source and customizable.",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: isZh ? "ROS 开源架构" : "ROS Open-Source Architecture",
      desc: isZh ? "完整的 ROS 集群通讯架构，支持自定义编队算法和路径规划开发。" : "Complete ROS swarm communication architecture supporting custom formation algorithms and path planning.",
    },
    {
      icon: <Radio className="h-6 w-6" />,
      title: isZh ? "动态组网通讯" : "Dynamic Mesh Networking",
      desc: isZh ? "WiFi + 自组网通讯方案，支持多机间实时数据共享与协同决策。" : "WiFi + self-organizing mesh networking for real-time data sharing and collaborative decision-making.",
    },
    {
      icon: <Package className="h-6 w-6" />,
      title: isZh ? "一键起飞部署" : "One-Click Deployment",
      desc: isZh ? "预配置的软硬件系统，开箱即用，快速完成从组装到编队飞行的全流程。" : "Pre-configured hardware & software system, ready-to-fly, rapid setup from assembly to formation flight.",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: isZh ? "编队任务规划" : "Formation Mission Planning",
      desc: isZh ? "支持多种编队队形和任务模式，配备地面站软件进行可视化编队编排。" : "Multiple formation patterns and mission modes with ground station software for visual formation choreography.",
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{isZh ? '核心优势' : 'Core Advantages'}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{isZh ? '为科研团队和开发者打造的一体化集群无人机解决方案' : 'All-in-one swarm drone solution designed for research teams and developers'}</p>
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

export default C20FeaturesSection;
