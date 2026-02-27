import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Satellite, Cpu, Code, MapPin, Monitor, Layers, Crosshair, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { OptimizedImage } from "@/components/OptimizedImage";
import droneMainImg from "@/assets/products/w400-drone-main.webp";
import swarmFormationImg from "@/assets/products/w400-swarm-formation.webp";

const W400FeaturesSection = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const features = [
    {
      icon: <Satellite className="h-6 w-6" />,
      title: isZh ? "GPS多星定位" : "Multi-GNSS Positioning",
      desc: isZh ? "GPS/GLONASS/北斗/Galileo四星融合，可选RTK厘米级差分" : "GPS/GLONASS/BeiDou/Galileo quad-constellation with optional RTK",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: isZh ? "旗舰AI算力" : "Flagship AI Computing",
      desc: isZh ? "Allspark2 + Jetson Orin NX，100 TOPS边缘推理" : "Allspark2 + Jetson Orin NX with 100 TOPS edge inference",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: isZh ? "ROS+PX4双系统" : "ROS + PX4 Dual Stack",
      desc: isZh ? "开源软件架构，Prometheus R1.6集群控制框架" : "Open-source stack with Prometheus R1.6 swarm framework",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: isZh ? "室外大范围作业" : "Outdoor Large-Scale Ops",
      desc: isZh ? "600mm六旋翼平台，重载长续航，抗风性能优异" : "600mm hexacopter platform with heavy payload and long endurance",
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      title: isZh ? "Qt专业地面站" : "Qt Professional GCS",
      desc: isZh ? "可视化编队编排、多机任务规划与实时状态监控" : "Visual formation choreography, multi-UAV mission planning & monitoring",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: isZh ? "全自组网通讯" : "Self-Organizing Mesh",
      desc: isZh ? "Mini Homer Mesh自组网，1km通信距离，3Mbps带宽" : "Mini Homer Mesh networking, 1km range, 3Mbps bandwidth",
    },
  ];

  const capabilities = [
    { icon: <Layers className="h-5 w-5" />, title: isZh ? "集群编队飞行" : "Swarm Formation Flight", desc: isZh ? "三角、纵队、方形、圆形等多种编队" : "Triangle, line, square, circle formations" },
    { icon: <MapPin className="h-5 w-5" />, title: isZh ? "智能自主巡航" : "Autonomous Waypoint Cruise", desc: isZh ? "多机航点规划与自主巡航" : "Multi-UAV waypoint planning & cruise" },
    { icon: <Crosshair className="h-5 w-5" />, title: isZh ? "目标识别与追踪" : "Target Detection & Tracking", desc: isZh ? "AI驱动的实时目标检测与跟踪" : "AI-powered real-time detection & tracking" },
    { icon: <Search className="h-5 w-5" />, title: isZh ? "集群搜索" : "Cooperative Search", desc: isZh ? "多机协同区域搜索与覆盖" : "Multi-UAV cooperative area search & coverage" },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        {/* Product Hero Image */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-3xl mx-auto mb-12">
          <OptimizedImage src={droneMainImg} alt="CANI-W400 六旋翼无人机整机" aspectRatio="4/3" className="w-full rounded-2xl" objectFit="contain" />
        </motion.div>

        {/* Swarm Formation Image */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto mb-16">
          <OptimizedImage src={swarmFormationImg} alt={isZh ? "CANI-W400 集群编队飞行" : "CANI-W400 Swarm Formation Flight"} aspectRatio="16/9" className="w-full rounded-2xl" objectFit="cover" />
          <p className="text-center text-xs text-muted-foreground mt-3">{isZh ? 'CANI-W400 三机集群编队飞行实拍' : 'CANI-W400 Three-Drone Swarm Formation in Action'}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{isZh ? '核心优势' : 'Core Advantages'}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{isZh ? '600mm六旋翼旗舰平台，四星定位 + AI边缘计算，专为室外大范围集群任务设计' : '600mm hexacopter flagship with quad-GNSS + AI edge computing for outdoor large-scale swarm missions'}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Card className="h-full bg-card border-accent/10 hover:border-accent/30 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">{f.icon}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Capabilities Grid */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">{isZh ? '可实现功能' : 'Achievable Capabilities'}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {capabilities.map((c, i) => (
              <div key={i} className="bg-accent/5 border border-accent/10 rounded-xl p-4 text-center hover:border-accent/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3 text-accent">{c.icon}</div>
                <div className="font-bold text-sm text-foreground">{c.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default W400FeaturesSection;
