import { Building2, GraduationCap, Landmark, Factory, Zap, Rocket, FlaskConical, Fuel } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const getPartnersData = (language: 'zh' | 'en') => [
  { name: language === 'zh' ? "中船重工" : "CSIC", icon: Factory },
  { name: language === 'zh' ? "中国铁塔" : "China Tower", icon: Building2 },
  { name: language === 'zh' ? "湖北省民政厅" : "Hubei Civil Affairs", icon: Landmark },
  { name: language === 'zh' ? "青海大学" : "Qinghai University", icon: GraduationCap },
  { name: language === 'zh' ? "山东大学" : "Shandong University", icon: GraduationCap },
  { name: language === 'zh' ? "华中科技大学" : "HUST", icon: GraduationCap },
  { name: language === 'zh' ? "清华大学" : "Tsinghua University", icon: GraduationCap },
  { name: language === 'zh' ? "中国科学院" : "Chinese Academy of Sciences", icon: FlaskConical },
  { name: language === 'zh' ? "中国工程物理研究院" : "CAEP", icon: FlaskConical },
  { name: language === 'zh' ? "湖北省电力公司" : "Hubei Power", icon: Zap },
  { name: language === 'zh' ? "中国运载火箭技术研究院" : "CALT", icon: Rocket },
  { name: language === 'zh' ? "合邦电力" : "Hebang Power", icon: Zap },
  { name: language === 'zh' ? "国家管网" : "PipeChina", icon: Factory },
  { name: language === 'zh' ? "中国商飞" : "COMAC", icon: Rocket },
  { name: language === 'zh' ? "航空工业光电所" : "AVIC Optronics", icon: FlaskConical },
  { name: language === 'zh' ? "中国航天科工集团" : "CASIC", icon: Rocket },
  { name: language === 'zh' ? "武汉大学" : "Wuhan University", icon: GraduationCap },
  { name: language === 'zh' ? "国家电投" : "SPIC", icon: Zap },
  { name: language === 'zh' ? "中国石化" : "Sinopec", icon: Fuel },
  { name: language === 'zh' ? "中国石油" : "PetroChina", icon: Fuel },
];

export const PartnersSection = () => {
  const { language } = useLanguage();
  const partners = getPartnersData(language);

  const stats = [
    { value: "100+", label: language === 'zh' ? "合作企业" : "Partner Enterprises" },
    { value: "50+", label: language === 'zh' ? "高校院所" : "Universities" },
    { value: "30+", label: language === 'zh' ? "政府单位" : "Government Agencies" },
    { value: language === 'zh' ? "15年" : "15 Yrs", label: language === 'zh' ? "行业经验" : "Industry Experience" },
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
            {language === 'zh' ? "值得信赖" : "Trusted By"}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {language === 'zh' ? "合作伙伴" : "Our Partners"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'zh' 
              ? "与众多知名企业及研究机构建立长期战略合作关系"
              : "Long-term strategic partnerships with leading enterprises and research institutions"}
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
