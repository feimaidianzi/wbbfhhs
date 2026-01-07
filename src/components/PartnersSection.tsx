import { Building2, GraduationCap, Landmark, Factory, Zap, Rocket, FlaskConical, Fuel } from "lucide-react";

const partners = [
  {
    name: "中船重工",
    icon: Factory,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    name: "中国铁塔",
    icon: Building2,
    color: "bg-red-500/10 text-red-600",
  },
  {
    name: "湖北省民政厅",
    icon: Landmark,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    name: "青海大学",
    icon: GraduationCap,
    color: "bg-green-500/10 text-green-600",
  },
  {
    name: "山东大学",
    icon: GraduationCap,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    name: "华中科技大学",
    icon: GraduationCap,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    name: "清华大学",
    icon: GraduationCap,
    color: "bg-violet-500/10 text-violet-600",
  },
  {
    name: "中国科学院",
    icon: FlaskConical,
    color: "bg-cyan-500/10 text-cyan-600",
  },
  {
    name: "中国工程物理研究院",
    icon: FlaskConical,
    color: "bg-indigo-500/10 text-indigo-600",
  },
  {
    name: "湖北省电力公司",
    icon: Zap,
    color: "bg-yellow-500/10 text-yellow-600",
  },
  {
    name: "中国运载火箭技术研究院",
    icon: Rocket,
    color: "bg-red-500/10 text-red-600",
  },
  {
    name: "合邦电力",
    icon: Zap,
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    name: "国家管网",
    icon: Factory,
    color: "bg-teal-500/10 text-teal-600",
  },
  {
    name: "中国商飞",
    icon: Rocket,
    color: "bg-sky-500/10 text-sky-600",
  },
  {
    name: "航空工业光电所",
    icon: FlaskConical,
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    name: "中国航天科工集团",
    icon: Rocket,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    name: "武汉大学",
    icon: GraduationCap,
    color: "bg-red-500/10 text-red-600",
  },
  {
    name: "国家电投",
    icon: Zap,
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    name: "中国石化",
    icon: Fuel,
    color: "bg-red-500/10 text-red-600",
  },
  {
    name: "中国石油",
    icon: Fuel,
    color: "bg-red-500/10 text-red-600",
  },
];

export const PartnersSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            合作企业展示
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            与众多知名企业及机构建立长期合作关系，共同推动无人机技术发展
          </p>
        </div>

        {/* Partner Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
          {partners.slice(0, 10).map((partner, index) => {
            const IconComponent = partner.icon;
            return (
              <div
                key={index}
                className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`aspect-video overflow-hidden flex items-center justify-center ${partner.color}`}>
                  <IconComponent className="w-16 h-16 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                </div>
                <div className="p-3 text-center bg-card">
                  <span className="text-foreground font-medium text-sm">
                    {partner.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scrolling Partners */}
      <div className="relative">
        <div className="flex animate-scroll">
          {/* First set */}
          {partners.map((partner, index) => {
            const IconComponent = partner.icon;
            return (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-4 px-6 py-3 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
              >
                <IconComponent className="w-5 h-5 text-accent" />
                <span className="text-foreground font-medium whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            );
          })}
          {/* Duplicate for seamless scroll */}
          {partners.map((partner, index) => {
            const IconComponent = partner.icon;
            return (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-4 px-6 py-3 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
              >
                <IconComponent className="w-5 h-5 text-accent" />
                <span className="text-foreground font-medium whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="container-custom mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">100+</div>
            <div className="text-muted-foreground">合作企业</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">50+</div>
            <div className="text-muted-foreground">高校院所</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">30+</div>
            <div className="text-muted-foreground">政府单位</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">15年</div>
            <div className="text-muted-foreground">行业经验</div>
          </div>
        </div>
      </div>
    </section>
  );
};
