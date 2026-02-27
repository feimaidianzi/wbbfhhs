import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { BookOpen, Wrench, Code, Monitor, Layers } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import trainingImg from "@/assets/products/w400-training.webp";

const W400TrainingSection = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const curriculum = [
    {
      icon: <BookOpen className="h-5 w-5" />,
      chapter: isZh ? "一、基础知识" : "I. Fundamentals",
      items: [
        { id: "1.1", title: isZh ? "自主无人机硬件系统" : "Autonomous UAV Hardware System" },
        { id: "1.2", title: isZh ? "集群编队硬件系统" : "Swarm Formation Hardware System" },
        { id: "1.3", title: isZh ? "自主无人机软件系统" : "Autonomous UAV Software System" },
      ],
    },
    {
      icon: <Wrench className="h-5 w-5" />,
      chapter: isZh ? "二、实操讲解" : "II. Hands-on Training",
      items: [],
    },
    {
      icon: <Layers className="h-5 w-5" />,
      chapter: isZh ? "三、Prometheus 自主无人机软件平台" : "III. Prometheus UAV Software Platform",
      items: [
        { id: "2.1", title: isZh ? "Prometheus 软件框架" : "Prometheus Software Framework" },
        { id: "2.2", title: isZh ? "Prometheus 仿真系统" : "Prometheus Simulation System" },
      ],
    },
    {
      icon: <Monitor className="h-5 w-5" />,
      chapter: isZh ? "四、Swarm Control · 地面站代码框架讲解" : "IV. Swarm Control & GCS Code Framework",
      items: [],
    },
    {
      icon: <Code className="h-5 w-5" />,
      chapter: isZh ? "五、二次开发" : "V. Secondary Development",
      items: [],
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{isZh ? '配套培训' : 'Included Training Program'}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isZh
              ? '可根据用户情况调整培训内容，保证能够完全掌握无人机集群编队套件的使用以及二次开发入门'
              : 'Training content can be customized to ensure complete mastery of the swarm kit and secondary development fundamentals'}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          {/* Training Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <OptimizedImage src={trainingImg} alt={isZh ? "CANI-W400 配套培训" : "CANI-W400 Training Program"} aspectRatio="16/9" className="w-full rounded-2xl" objectFit="cover" />
          </motion.div>

          {/* Curriculum */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
            <h3 className="text-lg font-bold text-accent mb-4">{isZh ? '培训目录' : 'Curriculum'}</h3>
            {curriculum.map((ch, i) => (
              <div key={i} className="bg-card border border-border/30 rounded-xl p-4 hover:border-accent/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">{ch.icon}</div>
                  <span className="font-bold text-sm text-foreground">{ch.chapter}</span>
                </div>
                {ch.items.length > 0 && (
                  <div className="ml-11 space-y-1">
                    {ch.items.map((item) => (
                      <div key={item.id} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="text-accent/60 font-mono">{item.id}</span>
                        <span>{item.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default W400TrainingSection;
