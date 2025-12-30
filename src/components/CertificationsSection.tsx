const certifications = [
  { name: "ISO9001", description: "质量管理体系认证" },
  { name: "ISO14001", description: "环境管理体系认证" },
  { name: "CE", description: "欧盟CE认证" },
  { name: "FCC", description: "美国FCC认证" },
  { name: "CCC", description: "中国强制认证" },
  { name: "CAAC", description: "民航局型号合格证" },
];

export const CertificationsSection = () => {
  return (
    <section className="py-16 bg-background border-t border-border/50">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h3 className="text-xl font-bold text-foreground mb-2">资质认证</h3>
          <p className="text-muted-foreground text-sm">
            长凌电子通过多项国际国内权威认证，品质值得信赖
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-6 py-3 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <span className="text-accent font-bold text-xs">{cert.name}</span>
              </div>
              <span className="text-muted-foreground text-sm">{cert.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
