import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// 动画变体
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const statsVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 1.2 + i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export const HeroContent = () => {
  const { language } = useLanguage();

  const stats = [
    { value: '200+', label: language === 'zh' ? '产品型号' : 'Products' },
    { value: '10+', label: language === 'zh' ? '年深耕' : 'Years' },
    { value: '500+', label: language === 'zh' ? '合作伙伴' : 'Partners' },
  ];

  return (
    <motion.div 
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 主内容区 - 左对齐布局 */}
      <div className="w-full max-w-6xl mx-auto">
        {/* Tagline */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 text-cyan-400 text-sm font-medium tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            {language === 'zh' ? '无人机核心配件专家' : 'Drone Core Components Expert'}
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          variants={titleVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight"
        >
          <span className="block text-white mb-2">
            {language === 'zh' ? '重新定义' : 'Redefining'}
          </span>
          <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            {language === 'zh' ? '飞行体验' : 'Flight Experience'}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-white/70 max-w-2xl mb-12 leading-relaxed"
        >
          {language === 'zh' 
            ? '专注无人机图传、飞控、云台等核心配件研发，10年技术沉淀，为全球飞手提供专业级解决方案'
            : 'Focusing on drone FPV, flight controllers, gimbals and core accessories. 10 years of expertise, providing professional solutions for pilots worldwide.'}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mb-20"
        >
          <Link to="/products">
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                {language === 'zh' ? '探索产品' : 'Explore Products'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
          
          <Link to="/about">
            <Button 
              variant="outline" 
              size="lg"
              className="group relative overflow-hidden border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              {language === 'zh' ? '了解长凌' : 'About CANI'}
            </Button>
          </Link>
        </motion.div>

        {/* Stats - 水平排列 */}
        <div className="flex flex-wrap gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              custom={index}
              variants={statsVariants}
              initial="hidden"
              animate="visible"
              className="relative group"
            >
              <div className="text-4xl md:text-5xl font-black text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-sm text-white/50 uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3 text-white/40 cursor-pointer hover:text-white/70 transition-colors group">
          <span className="text-xs tracking-[0.3em] uppercase font-medium">
            {language === 'zh' ? '向下滚动' : 'Scroll'}
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
            <motion.div 
              className="w-1 h-2 bg-current rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
