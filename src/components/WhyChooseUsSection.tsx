import { Target, Award, Users, Globe, TrendingUp, Zap, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const getStatsData = (language: 'zh' | 'en') => [
  {
    value: 15,
    suffix: "+",
    label: language === 'zh' ? "年技术沉淀" : "Years Technology",
    icon: Target
  }, {
    value: 200,
    suffix: "+",
    label: language === 'zh' ? "核心专利" : "Core Patents",
    icon: Award
  }, {
    value: 500,
    suffix: "+",
    label: language === 'zh' ? "企业客户" : "Enterprise Clients",
    icon: Users
  }, {
    value: 30,
    suffix: "+",
    label: language === 'zh' ? "省市覆盖" : "Provinces Covered",
    icon: Globe
  }
];

const getAdvantagesData = (language: 'zh' | 'en') => [
  {
    icon: Zap,
    title: language === 'zh' ? "核心技术自主" : "Independent Core Tech",
    description: language === 'zh' 
      ? "飞控算法、图传协议、云台控制等核心技术完全自主研发，不受卡脖子"
      : "Flight control algorithms, video protocols, gimbal control—all independently developed"
  }, {
    icon: Shield,
    title: language === 'zh' ? "航空级品质" : "Aviation-grade Quality",
    description: language === 'zh' 
      ? "元器件选型严格，工艺标准对标军工，每批次全检出厂"
      : "Strict component selection, military-grade processes, 100% inspection before shipping"
  }, {
    icon: TrendingUp,
    title: language === 'zh' ? "实战经验丰富" : "Rich Practical Experience",
    description: language === 'zh' 
      ? "电力巡检、应急救援、物流配送等场景大规模验证，方案成熟可靠"
      : "Large-scale validation in power inspection, emergency rescue, logistics—mature and reliable solutions"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Animated counter hook
const useCountUp = (end: number, duration: number = 2000, shouldStart: boolean = false) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!shouldStart) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, shouldStart]);
  
  return count;
};

// Counter component
const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCountUp(value, 2000, isInView);
  
  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

export const WhyChooseUsSection = () => {
  const { baseLang: language } = useLanguage();
  const stats = getStatsData(language);
  const advantages = getAdvantagesData(language);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Background decoration - unified white theme */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-0 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-primary/3 rounded-full blur-3xl" />
      
      {/* Animated particles - hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${10 + i * 11}%`,
              top: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${5 + i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative px-4 sm:px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-6 sm:w-8 h-px bg-primary" />
            <span className="text-primary text-xs sm:text-sm tracking-widest uppercase font-medium">
              {language === 'zh' ? '核心优势' : 'CORE ADVANTAGES'}
            </span>
            <div className="w-6 sm:w-8 h-px bg-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-3 sm:mb-4">
            {language === 'zh' ? "为什么信赖长凌" : "Why Trust CANI"}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            {language === 'zh' 
              ? "15年专注无人机核心技术，从实验室到生产线，从研发到交付，每一步都精益求精"
              : "15 years focused on core drone technology. From lab to production line, from R&D to delivery—excellence at every step"}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-white text-center p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-border/40 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl group shadow-sm"
            >
              <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-muted-foreground text-xs sm:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Advantages Cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {advantages.map((advantage, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-white p-5 sm:p-6 md:p-8 rounded-lg sm:rounded-xl border border-border/40 hover:border-primary/30 transition-all duration-500 group hover:-translate-y-1 sm:hover:-translate-y-2 shadow-sm hover:shadow-xl"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:bg-primary/15 group-hover:shadow-lg transition-all duration-300">
                <advantage.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">
                {advantage.title}
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
