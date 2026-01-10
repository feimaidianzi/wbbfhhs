import { useLanguage } from "@/contexts/LanguageContext";

const getCertificationsData = (language: 'zh' | 'en') => [
  { 
    name: "ISO9001", 
    description: language === 'zh' ? "质量管理体系认证" : "Quality Management",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80"
  },
  { 
    name: "ISO14001", 
    description: language === 'zh' ? "环境管理体系认证" : "Environmental Management",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80"
  },
  { 
    name: "CE", 
    description: language === 'zh' ? "欧盟CE认证" : "EU CE Certification",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80"
  },
  { 
    name: "FCC", 
    description: language === 'zh' ? "美国FCC认证" : "US FCC Certification",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80"
  },
  { 
    name: "CCC", 
    description: language === 'zh' ? "中国强制认证" : "China CCC Certification",
    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=400&q=80"
  },
  { 
    name: "CAAC", 
    description: language === 'zh' ? "民航局型号合格证" : "CAAC Type Certificate",
    image: "https://images.unsplash.com/photo-1606185540834-d6e7483ee1a4?w=400&q=80"
  },
];

export const CertificationsSection = () => {
  const { language } = useLanguage();
  const certifications = getCertificationsData(language);

  return (
    <section className="py-16 bg-background border-t border-border/50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {language === 'zh' ? "资质认证" : "Certifications"}
          </h3>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            {language === 'zh' 
              ? "长凌科技通过多项国际国内权威认证，品质值得信赖"
              : "CANI has passed multiple international and domestic authoritative certifications, quality you can trust"}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img 
                  src={cert.image} 
                  alt={`${cert.name} ${language === 'zh' ? '证书' : 'Certificate'}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-accent font-bold text-sm">{cert.name}</span>
                </div>
                <span className="text-muted-foreground text-sm">{cert.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
