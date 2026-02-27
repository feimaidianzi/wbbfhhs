import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Wifi, Monitor, Navigation, Radio, Cpu, Layers } from "lucide-react";

const W200SystemArchitecture = () => {
  const { t, language } = useLanguage();

  const isZh = language === 'zh';

  const archBlocks = [
    {
      icon: <Navigation className="h-5 w-5" />,
      title: isZh ? "UWB定位系统" : "UWB Positioning",
      items: [
        isZh ? "4个UWB基站 (Linktrack P-B)" : "4× UWB Base Stations (Linktrack P-B)",
        isZh ? "3个UWB标签" : "3× UWB Tags",
        isZh ? "10cm定位精度，200Hz刷新率" : "10cm accuracy, 200Hz refresh rate",
      ],
    },
    {
      icon: <Radio className="h-5 w-5" />,
      title: isZh ? "通信网络" : "Communication Network",
      items: [
        isZh ? "Mini Homer移动端 ×6" : "Mini Homer Mobile ×6",
        isZh ? "Mini Homer基站端 ×1" : "Mini Homer Base ×1",
        isZh ? "TCP/IP通信协议" : "TCP/IP Protocol",
      ],
    },
    {
      icon: <Cpu className="h-5 w-5" />,
      title: isZh ? "机载计算" : "Onboard Computing",
      items: [
        "Allspark2 Orin NX",
        "100 TOPS AI",
        "16GB LPDDR5",
      ],
    },
    {
      icon: <Monitor className="h-5 w-5" />,
      title: isZh ? "地面站控制" : "Ground Station Control",
      items: [
        isZh ? "Prometheus集群控制系统" : "Prometheus Swarm Control",
        isZh ? "Qt人机交互界面" : "Qt HMI Interface",
        isZh ? "实时监控与编队指令" : "Real-time monitoring & commands",
      ],
    },
  ];

  const keyFeatures = [
    isZh ? "250轴距无人机平台，具备室内外飞行能力" : "250mm wheelbase drone platform with indoor/outdoor flight capability",
    isZh ? "UWB定位，可在无GPS的特殊环境下飞行" : "UWB positioning enables flight in GPS-denied environments",
    isZh ? "基站搭建简易，部署灵活方便" : "Easy base station setup with flexible deployment",
    isZh ? "性能优异，续航时间长" : "Excellent performance with extended flight time",
    isZh ? "搭配地面站软件，简单操作即可完成集群编队、目标追踪、同时起降等，适配室内外多种应用环境，是集群无人机研究和教学的首选平台。" : "Combined with ground station software for easy swarm formation, target tracking, and simultaneous takeoff/landing. Ideal for research and education in indoor/outdoor environments.",
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            {isZh ? "系统架构" : "System Architecture"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isZh
              ? "集群通信软件系统采用分布式架构，利用socket网络编程技术和TCP/IP通信机制实现多机协同控制"
              : "Distributed software architecture using socket networking and TCP/IP communication for multi-drone cooperative control"}
          </p>
        </motion.div>

        {/* Architecture blocks */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {archBlocks.map((block, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border/30 rounded-xl p-6 hover:border-accent/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                {block.icon}
              </div>
              <h3 className="font-bold text-foreground mb-3">{block.title}</h3>
              <ul className="space-y-2">
                {block.items.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Key features list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-accent/5 rounded-2xl p-8 border border-accent/10"
        >
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">
            {isZh ? "套件特点" : "Kit Features"}
          </h3>
          <ul className="space-y-4">
            {keyFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold mt-0.5">
                  {index + 1}
                </span>
                <span className="text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default W200SystemArchitecture;
