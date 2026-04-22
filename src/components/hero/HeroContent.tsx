import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LangLink } from "@/components/LangLink";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Mobile hero image — smaller real product photo for fast load
const HERO_PCB_SRC = "/hero-fc-board-sm.webp";

const statsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.2 + i * 0.15,
      duration: 0.6,
      ease: "easeOut",
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

  return (
    <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 sm:px-10 lg:px-16 xl:px-24 pt-20">
      {/* Reserve vertical space to prevent CLS while async translations load */}
      <div className="w-full max-w-2xl" style={{ minHeight: '520px' }}>
        {/* Tagline */}
        <div className="mb-6 hero-animate-tagline">
          <span className="inline-block min-h-[24px]" />{/* spacer to prevent first-paint shift */}
          <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium tracking-[0.2em] uppercase text-blue-400/90 border border-blue-400/20 rounded-full bg-blue-400/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            {t('hero.tagline')}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="hero-animate-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight text-white">
          <span className="block mb-1">
            {t('hero.title.line1')}
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            {t('hero.title.line2')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-animate-subtitle text-base md:text-lg text-white/50 max-w-xl mb-10 leading-relaxed">
          {t('hero.subtitle')}
        </p>

        {/* Mobile product image */}
        <div className="lg:hidden mb-10 hero-animate-image">
          <img
            src={HERO_PCB_SRC}
            alt="CANI industrial drone flight controller PCBA"
            width={640}
            height={341}
            fetchPriority="high"
            decoding="async"
            className="w-full max-w-md mx-auto rounded-lg"
            style={{ aspectRatio: '640 / 341' }}
          />
        </div>

        {/* CTA Buttons */}
        <div className="hero-animate-buttons flex flex-col sm:flex-row gap-3 mb-16">
          <LangLink to="/products">
            <Button
              size="lg"
              className="group bg-blue-500 hover:bg-blue-400 text-white px-8 py-5 text-base font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 min-h-[44px]"
            >
              <span className="flex items-center gap-2">
                {t('hero.cta.explore')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </LangLink>

          <LangLink to="/about">
            <Button
              variant="outline"
              size="lg"
              className="group border-white/15 bg-transparent hover:bg-white/5 hover:border-white/30 text-white/80 hover:text-white px-8 py-5 text-base font-medium rounded-lg transition-all duration-300 min-h-[44px]"
            >
              <Play className="w-4 h-4 mr-2" />
              {t('hero.cta.about')}
            </Button>
          </LangLink>
        </div>

        {/* Stats — clean horizontal row */}
        <div className="flex gap-8 md:gap-12 hero-animate-stats">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={statsVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-white/40 uppercase tracking-wider">
                {t(stat.labelKey)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/30">
          <span className="text-[10px] tracking-[0.3em] uppercase">{t('hero.scroll')}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
