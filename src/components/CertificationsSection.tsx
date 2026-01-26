import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Shield, Award, CheckCircle2 } from "lucide-react";

const getCertificationsData = (language: 'zh' | 'en') => [
  { 
    name: "ISO9001", 
    description: language === 'zh' ? "质量管理体系认证" : "Quality Management",
  },
  { 
    name: "ISO14001", 
    description: language === 'zh' ? "环境管理体系认证" : "Environmental Management",
  },
  { 
    name: "CE", 
    description: language === 'zh' ? "欧盟CE认证" : "EU CE Certification",
  },
  { 
    name: "FCC", 
    description: language === 'zh' ? "美国FCC认证" : "US FCC Certification",
  },
  { 
    name: "CCC", 
    description: language === 'zh' ? "中国强制认证" : "China CCC Certification",
  },
  { 
    name: "CAAC", 
    description: language === 'zh' ? "民航局型号合格证" : "CAAC Type Certificate",
  },
];

export const CertificationsSection = () => {
  const { baseLang: language } = useLanguage();
  const certifications = getCertificationsData(language);

  return (
    <section className="py-16 md:py-20 bg-background border-t border-border/50">
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
                {language === 'zh' ? "品质保障" : "Quality Assurance"}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {language === 'zh' ? "资质认证" : "Certifications"}
            </h3>
            <p className="text-muted-foreground">
              {language === 'zh' 
                ? "通过多项国际国内权威认证，品质值得信赖"
                : "Certified by multiple international and domestic authorities, quality you can trust"}
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
