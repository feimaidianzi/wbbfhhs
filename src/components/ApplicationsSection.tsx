import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Droplets, Car, Leaf, Zap, AlertTriangle, MapPin } from "lucide-react";
import { LangLink } from "@/components/LangLink";
import { useLanguage } from "@/contexts/LanguageContext";

export const ApplicationsSection = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const applications = [
    {
      id: "water",
      nameKey: "applications.water",
      descKey: "applications.water.desc",
      image: "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?w=1200&q=80",
      icon: Droplets,
      link: "/applications/water",
    },
    {
      id: "traffic",
      nameKey: "applications.traffic",
      descKey: "applications.traffic.desc",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80",
      icon: Car,
      link: "/applications/traffic",
    },
    {
      id: "environment",
      nameKey: "applications.environment",
      descKey: "applications.environment.desc",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
      icon: Leaf,
      link: "/applications/environment",
    },
    {
      id: "power",
      nameKey: "applications.power",
      descKey: "applications.power.desc",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80",
      icon: Zap,
      link: "/applications/power",
    },
    {
      id: "emergency",
      nameKey: "applications.emergency",
      descKey: "applications.emergency.desc",
      image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=1200&q=80",
      icon: AlertTriangle,
      link: "/applications/emergency",
    },
    {
      id: "surveying",
      nameKey: "applications.surveying",
      descKey: "applications.surveying.desc",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      icon: MapPin,
      link: "/applications/surveying",
    },
  ];

  return (
    <section id="applications" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            {t('applications.section.tag')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6">
            {t('applications.section.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('applications.section.desc.prefix')}
            <LangLink to="/applications/power-inspection" className="text-accent hover:underline">{t('applications.section.keyword.power')}</LangLink>
            {t('applications.section.desc.sep1')}
            <LangLink to="/applications/firefighting" className="text-accent hover:underline">{t('applications.section.keyword.fire')}</LangLink>
            {t('applications.section.desc.suffix')}
          </p>
        </motion.div>

        {/* Interactive Application Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Application List */}
          <div className="lg:col-span-1 space-y-4">
            {applications.map((app, index) => (
              <motion.button
                key={app.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveIndex(index)}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-500 group ${
                  activeIndex === index 
                    ? 'bg-accent/10 border-2 border-accent' 
                    : 'bg-card border border-accent/10 hover:border-accent/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-accent text-accent-foreground' 
                      : 'bg-accent/10 text-accent group-hover:bg-accent/20'
                  }`}>
                    <app.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold transition-colors ${
                      activeIndex === index ? 'text-accent' : 'text-foreground'
                    }`}>
                      {t(app.nameKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {t(app.descKey)}
                    </p>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-all duration-300 ${
                    activeIndex === index 
                      ? 'text-accent translate-x-0 opacity-100' 
                      : 'text-muted-foreground -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                  }`} />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right - Featured Image */}
          <motion.div 
            className="lg:col-span-2 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-card">
              {applications.map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={false}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    scale: activeIndex === index ? 1 : 1.1,
                  }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0"
                >
                  <img
                    src={app.image}
                    alt={`CANI ${t(app.nameKey)} - UAV Industry Application Scenario`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                    <div className="rounded-3xl bg-black/70 border border-white/20 p-6 md:p-8 max-w-2xl">
                      <h3 className="text-3xl md:text-4xl font-black text-white mb-3">
                        {t(app.nameKey)}
                      </h3>
                      <p className="text-lg text-white/70 mb-6">
                        {t(app.descKey)}
                      </p>
                      <LangLink 
                        to={app.link}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors"
                      >
                        {t('applications.learnMore')}
                        <ArrowRight className="w-5 h-5" />
                      </LangLink>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {applications.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === index 
                      ? 'w-8 bg-accent' 
                      : 'w-2 bg-accent/30 hover:bg-accent/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-12"
        >
          <LangLink 
            to="/applications"
            className="inline-flex items-center gap-3 text-accent hover:text-accent/80 font-semibold text-lg group"
          >
            {t('applications.viewAll')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </LangLink>
        </motion.div>
      </div>
    </section>
  );
};
