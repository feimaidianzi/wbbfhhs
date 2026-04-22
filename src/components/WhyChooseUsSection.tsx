import { Target, Award, Users, Globe, TrendingUp, Zap, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";
import { useInViewLite } from "@/hooks/useInViewLite";

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

// Counter component (uses lightweight IntersectionObserver instead of framer-motion's useInView)
const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const { ref, inView } = useInViewLite<HTMLSpanElement>({ rootMargin: "-50px" });
  const count = useCountUp(value, 2000, inView);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

export const WhyChooseUsSection = () => {
  const { t } = useLanguage();
  const header = useInViewLite<HTMLDivElement>({ rootMargin: "-100px" });
  const statsView = useInViewLite<HTMLDivElement>({ rootMargin: "-50px" });
  const advantagesView = useInViewLite<HTMLDivElement>({ rootMargin: "-50px" });

  const stats = [
    { value: 15, suffix: "+", label: t('whyChoose.stat1.label'), icon: Target },
    { value: 200, suffix: "+", label: t('whyChoose.stat2.label'), icon: Award },
    { value: 500, suffix: "+", label: t('whyChoose.stat3.label'), icon: Users },
    { value: 30, suffix: "+", label: t('whyChoose.stat4.label'), icon: Globe },
  ];

  const advantages = [
    {
      icon: Zap,
      title: t('whyChoose.advantage1.title'),
      description: t('whyChoose.advantage1.desc'),
    },
    {
      icon: Shield,
      title: t('whyChoose.advantage2.title'),
      description: t('whyChoose.advantage2.desc'),
    },
    {
      icon: TrendingUp,
      title: t('whyChoose.advantage3.title'),
      description: t('whyChoose.advantage3.desc'),
    },
  ];

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
        <div
          ref={header.ref}
          className={`reveal-init reveal-fade text-center mb-8 sm:mb-12 md:mb-16 ${header.inView ? 'reveal-in' : ''}`}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-6 sm:w-8 h-px bg-primary" />
            <span className="text-primary text-xs sm:text-sm tracking-widest uppercase font-medium">
              {t('whyChoose.badge')}
            </span>
            <div className="w-6 sm:w-8 h-px bg-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-3 sm:mb-4">
            {t('whyChoose.title')}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            {t('whyChoose.subtitle')}
          </p>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsView.ref}
          className={`reveal-init reveal-fade grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-16 ${statsView.inView ? 'reveal-in' : ''}`}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="reveal-child bg-white text-center p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-border/40 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl group shadow-sm"
            >
              <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-muted-foreground text-xs sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Advantages Cards */}
        <div
          ref={advantagesView.ref}
          className={`reveal-init reveal-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 ${advantagesView.inView ? 'reveal-in' : ''}`}
        >
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="reveal-child bg-white p-5 sm:p-6 md:p-8 rounded-lg sm:rounded-xl border border-border/40 hover:border-primary/30 transition-all duration-500 group hover:-translate-y-1 sm:hover:-translate-y-2 shadow-sm hover:shadow-xl"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
