import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LangLink } from "@/components/LangLink";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Headphones, Truck, Settings, ArrowRight, Award, Users, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const CompanyIntroSection = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const advantages = [
    {
      icon: CheckCircle2,
      title: t('companyIntro.advantage1.title'),
      description: t('companyIntro.advantage1.desc'),
    },
    {
      icon: Headphones,
      title: t('companyIntro.advantage2.title'),
      description: t('companyIntro.advantage2.desc'),
    },
    {
      icon: Truck,
      title: t('companyIntro.advantage3.title'),
      description: t('companyIntro.advantage3.desc'),
    },
    {
      icon: Settings,
      title: t('companyIntro.advantage4.title'),
      description: t('companyIntro.advantage4.desc'),
    },
  ];

  const stats = [
    { value: t('companyIntro.stat1.value'), label: t('companyIntro.stat1.label'), icon: Award },
    { value: t('companyIntro.stat2.value'), label: t('companyIntro.stat2.label'), icon: Clock },
    { value: t('companyIntro.stat3.value'), label: t('companyIntro.stat3.label'), icon: Users },
  ];

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
              {t('companyIntro.badge')}
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight">
              {t('companyIntro.title.line1')}<br />
              <span className="text-accent">{t('companyIntro.title.line2')}</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t('companyIntro.description')}
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
                {t('companyIntro.learnMore')}
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
