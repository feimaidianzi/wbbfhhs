import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const HeroContent = () => {
  const { language } = useLanguage();

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-6"
      >
        <span className="inline-block px-4 py-2 rounded-full border border-accent/30 bg-accent/5 text-accent text-sm font-medium tracking-wider uppercase">
          {language === 'zh' ? '无人机核心配件专家' : 'Drone Core Components Expert'}
        </span>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 leading-tight"
      >
        <span className="block text-foreground">
          {language === 'zh' ? '重新定义' : 'Redefining'}
        </span>
        <span className="block bg-gradient-to-r from-accent via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {language === 'zh' ? '飞行体验' : 'Flight Experience'}
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
      >
        {language === 'zh' 
          ? '专注无人机图传、飞控、云台等核心配件研发，10年技术沉淀，为全球飞手提供专业级解决方案'
          : 'Focusing on drone FPV, flight controllers, gimbals and core accessories. 10 years of expertise, providing professional solutions for pilots worldwide.'}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 mb-16"
      >
        <Link to="/products">
          <Button 
            size="lg" 
            className="group relative overflow-hidden bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-semibold rounded-full"
          >
            <span className="relative z-10 flex items-center gap-2">
              {language === 'zh' ? '探索产品' : 'Explore Products'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-accent to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        </Link>
        
        <Link to="/about">
          <Button 
            variant="outline" 
            size="lg"
            className="group relative overflow-hidden border-accent/30 hover:border-accent/60 text-foreground px-8 py-6 text-lg font-semibold rounded-full bg-background/50 backdrop-blur-sm"
          >
            <Play className="w-5 h-5 mr-2 text-accent" />
            {language === 'zh' ? '了解长凌' : 'About CANI'}
          </Button>
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="grid grid-cols-3 gap-8 md:gap-16 mb-16"
      >
        {[
          { value: '200+', label: language === 'zh' ? '产品型号' : 'Products' },
          { value: '10+', label: language === 'zh' ? '年深耕' : 'Years' },
          { value: '500+', label: language === 'zh' ? '合作伙伴' : 'Partners' },
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl md:text-4xl font-black text-accent mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer hover:text-accent transition-colors">
          <span className="text-xs tracking-widest uppercase">
            {language === 'zh' ? '向下滚动' : 'Scroll Down'}
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </motion.div>
    </div>
  );
};
