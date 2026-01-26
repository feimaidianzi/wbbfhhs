import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Headphones, Truck, Settings, ArrowRight, Award, Users, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const getAdvantagesData = (language: 'zh' | 'en') => [
  {
    icon: CheckCircle2,
    title: language === 'zh' ? "产品矩阵完整" : "Complete Product Matrix",
    description: language === 'zh' 
      ? "图传、飞控、云台、遥控全覆盖，一站式采购无人机核心配件"
      : "Full coverage of FPV, FC, gimbal, remote. One-stop procurement.",
  },
  {
    icon: Headphones,
    title: language === 'zh' ? "技术响应迅速" : "Rapid Technical Response",
    description: language === 'zh' 
      ? "工程师团队7×24在线，选型、调试、故障排查一对一支持"
      : "24/7 engineering support. One-on-one assistance.",
  },
  {
    icon: Truck,
    title: language === 'zh' ? "供应链保障" : "Supply Chain Guarantee",
    description: language === 'zh' 
      ? "核心元器件自主可控，备货充足，紧急订单48小时内发货"
      : "Self-controlled components, stocked. 48h emergency shipping.",
  },
  {
    icon: Settings,
    title: language === 'zh' ? "深度定制能力" : "Deep Customization",
    description: language === 'zh' 
      ? "从接口协议到外观结构，从软件算法到系统集成，灵活定制"
      : "From protocols to structure, from software to integration.",
  },
];

const getStatsData = (language: 'zh' | 'en') => [
  { value: "200+", label: language === 'zh' ? "产品型号" : "Products", icon: Award },
  { value: "10+", label: language === 'zh' ? "年深耕" : "Years", icon: Clock },
  { value: "500+", label: language === 'zh' ? "合作伙伴" : "Partners", icon: Users },
];

export const CompanyIntroSection = () => {
  const { baseLang: language } = useLanguage();
  const advantages = getAdvantagesData(language);
  const stats = getStatsData(language);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              {language === 'zh' ? '关于长凌' : 'About CANI'}
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight">
              {language === 'zh' ? (
                <>
                  专注无人机配件<br />
                  <span className="text-accent">10年技术沉淀</span>
                </>
              ) : (
                <>
                  Focused on Drone Accessories<br />
                  <span className="text-accent">10 Years of Expertise</span>
                </>
              )}
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {language === 'zh' 
                ? '长凌科技不只是卖配件，而是提供整套飞行解决方案。从产品选型到系统集成，从技术培训到售后保障，全程陪伴您的无人机项目落地。我们服务电力、物流、消防等500+企业客户，积累了丰富的实战经验。'
                : 'CANI doesn\'t just sell parts—we deliver complete flight solutions. From product selection to system integration, from training to after-sales, we accompany your project from start to finish. Serving 500+ enterprise clients in power, logistics, firefighting.'}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-4 rounded-2xl bg-secondary/50 border border-accent/10"
                >
                  <stat.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-black text-accent">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <Link to="/about">
              <Button className="group bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-semibold rounded-full">
                {language === 'zh' ? '了解更多' : 'Learn More'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Right - Advantages Grid */}
          <motion.div
            style={{ opacity }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {advantages.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-card border border-accent/10 hover:border-accent/30 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
