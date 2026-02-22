import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Shield, CheckCircle2 } from "lucide-react";

export const CertificationsSection = () => {
  const { t } = useLanguage();

  const certifications = [
    { name: t('certsSection.iso9001'), description: t('certsSection.iso9001.desc') },
    { name: t('certsSection.iso14001'), description: t('certsSection.iso14001.desc') },
    { name: t('certsSection.ce'), description: t('certsSection.ce.desc') },
    { name: t('certsSection.fcc'), description: t('certsSection.fcc.desc') },
    { name: t('certsSection.ccc'), description: t('certsSection.ccc.desc') },
    { name: t('certsSection.caac'), description: t('certsSection.caac.desc') },
  ];

  return (
    <section className="py-16 md:py-20 bg-background border-t border-border/50" id="certifications">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full mb-4">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                {t('certsSection.badge')}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t('certsSection.title')}
            </h3>
            <p className="text-muted-foreground">
              {t('certsSection.subtitle')}
            </p>
          </motion.div>

          {/* Right - Certifications Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:w-2/3"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center shrink-0 border border-border/50 group-hover:border-accent/30 transition-colors">
                    <span className="text-sm font-bold text-accent">{cert.name}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                      <span className="text-sm font-medium text-foreground">{cert.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{cert.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
