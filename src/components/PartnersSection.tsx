import { Globe, Plane, Shield, Factory, Zap, Radar, Mountain, Waves } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export const PartnersSection = () => {
  const { t } = useLanguage();

  const partners = [
    { name: t('partnersSection.partner.skywatch'), icon: Radar },
    { name: t('partnersSection.partner.wingtra'), icon: Plane },
    { name: t('partnersSection.partner.acecore'), icon: Factory },
    { name: t('partnersSection.partner.quaternium'), icon: Zap },
    { name: t('partnersSection.partner.flyability'), icon: Shield },
    { name: t('partnersSection.partner.skydio'), icon: Radar },
    { name: t('partnersSection.partner.parazero'), icon: Shield },
    { name: t('partnersSection.partner.delair'), icon: Plane },
    { name: t('partnersSection.partner.ideaforge'), icon: Factory },
    { name: t('partnersSection.partner.terra'), icon: Globe },
    { name: t('partnersSection.partner.microdrones'), icon: Plane },
    { name: t('partnersSection.partner.droneup'), icon: Mountain },
    { name: t('partnersSection.partner.aerodyne'), icon: Globe },
    { name: t('partnersSection.partner.doosan'), icon: Zap },
    { name: t('partnersSection.partner.hubsan'), icon: Factory },
    { name: t('partnersSection.partner.flymotion'), icon: Radar },
    { name: t('partnersSection.partner.heven'), icon: Waves },
    { name: t('partnersSection.partner.airobotics'), icon: Shield },
    { name: t('partnersSection.partner.corvus'), icon: Plane },
    { name: t('partnersSection.partner.skyeton'), icon: Radar },
  ];

  const stats = [
    { value: t('partnersSection.stat1.value'), label: t('partnersSection.stat1.label') },
    { value: t('partnersSection.stat2.value'), label: t('partnersSection.stat2.label') },
    { value: t('partnersSection.stat3.value'), label: t('partnersSection.stat3.label') },
    { value: t('partnersSection.stat4.value'), label: t('partnersSection.stat4.label') },
  ];

  return (
    <section className="py-20 md:py-28 bg-secondary/50 overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-medium mb-2">
            {t('partnersSection.badge')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('partnersSection.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('partnersSection.subtitle')}
          </p>
        </motion.div>

        {/* Partner Logos Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-16"
        >
          {partners.slice(0, 10).map((partner, index) => {
            const IconComponent = partner.icon;
            return (
              <div
                key={index}
                className="group flex items-center gap-3 p-4 bg-background rounded-xl border border-border/50 hover:border-accent/30 hover:shadow-sm transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <IconComponent className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground truncate">
                  {partner.name}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* Scrolling Partners */}
        <div className="relative mb-16">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-secondary/50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-secondary/50 to-transparent z-10" />
          <div className="flex animate-scroll">
            {[...partners, ...partners].map((partner, index) => {
              const IconComponent = partner.icon;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 mx-3 px-5 py-2.5 bg-background rounded-full border border-border/50 flex items-center gap-2"
                >
                  <IconComponent className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-foreground whitespace-nowrap">
                    {partner.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-background rounded-2xl border border-border/50">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
