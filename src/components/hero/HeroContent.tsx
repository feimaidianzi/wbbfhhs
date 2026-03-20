import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LangLink } from "@/components/LangLink";
import { ArrowRight, Play, ChevronDown, Cpu, Radio, Wifi, Shield, Zap, Target } from "lucide-react";
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

const floatIconVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 1.5 + i * 0.2,
      duration: 0.6,
      type: "spring",
      stiffness: 200,
    },
  }),
};

export const HeroContent = () => {
  const { t } = useLanguage();

  const stats = [
    { value: '200+', labelKey: 'hero.stat.products' },
    { value: '10+', labelKey: 'hero.stat.years' },
    { value: '500+', labelKey: 'hero.stat.partners' },
  ];

  const floatingIcons = [
    { Icon: Cpu, x: 'right-[8%]', y: 'top-[18%]', delay: 0, color: 'text-cyan-400' },
    { Icon: Radio, x: 'right-[22%]', y: 'top-[32%]', delay: 1, color: 'text-blue-400' },
    { Icon: Wifi, x: 'right-[6%]', y: 'top-[48%]', delay: 2, color: 'text-purple-400' },
    { Icon: Shield, x: 'right-[18%]', y: 'top-[62%]', delay: 3, color: 'text-emerald-400' },
    { Icon: Zap, x: 'right-[30%]', y: 'top-[22%]', delay: 4, color: 'text-amber-400' },
    { Icon: Target, x: 'right-[12%]', y: 'top-[76%]', delay: 5, color: 'text-rose-400' },
  ];

  return (
    <div 
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20"
    >
      {/* === 装饰层：扫描线 === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* 水平扫描线 */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          initial={{ top: '10%' }}
          animate={{ top: ['10%', '90%', '10%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        {/* 第二条扫描线 */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
          initial={{ top: '60%' }}
          animate={{ top: ['60%', '20%', '60%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* === 装饰层：角落标记 === */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* 左上角标记 */}
        <div className="absolute top-24 left-8 hidden lg:block">
          <div className="w-16 h-16 border-l-2 border-t-2 border-cyan-400/30" />
          <span className="text-[10px] text-cyan-400/40 font-mono mt-1 block">SYS.01</span>
        </div>
        {/* 右下角标记 */}
        <div className="absolute bottom-32 right-8 hidden lg:block">
          <div className="w-16 h-16 border-r-2 border-b-2 border-cyan-400/30" />
          <span className="text-[10px] text-cyan-400/40 font-mono mt-1 block text-right">RF.OK</span>
        </div>
        {/* 左下角 */}
        <div className="absolute bottom-32 left-8 hidden lg:block">
          <span className="text-[10px] text-cyan-400/30 font-mono">
            FREQ: 5.8GHz<br/>PWR: 10W<br/>LAT: ≤30ms
          </span>
        </div>
      </div>

      {/* === 装饰层：浮动技术图标 === */}
      <div className="absolute inset-0 pointer-events-none z-[1] hidden lg:block">
        {floatingIcons.map(({ Icon, x, y, delay, color }, index) => (
          <motion.div
            key={index}
            custom={delay}
            variants={floatIconVariants}
            initial="hidden"
            animate="visible"
            className={`absolute ${x} ${y}`}
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
              className="relative"
            >
              {/* 光晕 */}
              <div className={`absolute inset-0 blur-xl ${color} opacity-20 scale-150`} />
              {/* 六边形边框 */}
              <div className="w-14 h-14 flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              {/* 连线点 */}
              <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-current ${color} opacity-60`} />
            </motion.div>
          </motion.div>
        ))}

        {/* 图标之间的连线 */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
          <motion.line
            x1="88%" y1="20%" x2="76%" y2="34%"
            stroke="rgba(6,182,212,0.12)" strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 2 }}
          />
          <motion.line
            x1="76%" y1="34%" x2="92%" y2="50%"
            stroke="rgba(59,130,246,0.12)" strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 2.5 }}
          />
          <motion.line
            x1="92%" y1="50%" x2="80%" y2="64%"
            stroke="rgba(139,92,246,0.1)" strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 3 }}
          />
        </svg>
      </div>

      {/* === 主内容区 === */}
      <div className="w-full max-w-6xl mx-auto">
        {/* Tagline */}
        <div className="mb-8 hero-animate-tagline">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 text-cyan-400 text-sm font-medium tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            {t('hero.tagline')}
          </span>
        </div>

        {/* Main Title */}
        <h1 
          className="hero-animate-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight"
        >
          <span className="block text-white mb-2">
            {t('hero.title.line1')}
          </span>
          <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            {t('hero.title.line2')}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="hero-animate-subtitle text-lg md:text-xl text-white/70 max-w-2xl mb-12 leading-relaxed"
        >
          {t('hero.subtitle')}
        </p>

        {/* CTA Buttons */}
        <div
          className="hero-animate-buttons flex flex-col sm:flex-row gap-4 mb-20"
        >
          <LangLink to="/products">
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-105 min-h-[44px] min-w-[44px]"
            >
              {/* 按钮光效 */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-2">
                {t('hero.cta.explore')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </LangLink>
          
          <LangLink to="/about">
            <Button 
              variant="outline" 
              size="lg"
              className="group relative overflow-hidden border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 min-h-[44px] min-w-[44px]"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              {t('hero.cta.about')}
            </Button>
          </LangLink>
        </div>

        {/* Stats - 卡片式 */}
        <div className="flex flex-wrap gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              custom={index}
              variants={statsVariants}
              initial="hidden"
              animate="visible"
              className="relative group"
            >
              <div className="px-6 py-4 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-cyan-400/30 hover:bg-cyan-500/[0.05] transition-all duration-300">
                <div className="text-4xl md:text-5xl font-black text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-white/50 uppercase tracking-wider">
                  {t(stat.labelKey)}
                </div>
              </div>
              {/* 底部装饰线 */}
              <div className="absolute -bottom-px left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            {t('hero.scroll')}
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
