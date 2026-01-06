import { Target, Award, Users, Globe, TrendingUp, Zap } from "lucide-react";
const stats = [{
  value: "15+",
  label: "年研发经验",
  icon: Target
}, {
  value: "200+",
  label: "专利技术",
  icon: Award
}, {
  value: "500+",
  label: "企业客户",
  icon: Users
}, {
  value: "30+",
  label: "省市覆盖",
  icon: Globe
}];
const advantages = [{
  icon: Zap,
  title: "技术领先",
  description: "自主研发飞控系统、智能算法，拥有完全自主知识产权"
}, {
  icon: TrendingUp,
  title: "品质保障",
  description: "航空级材料工艺，严格质检流程，确保每一台无人机可靠稳定"
}, {
  icon: Users,
  title: "专业服务",
  description: "7×24小时技术支持，全国服务网络，快速响应客户需求"
}];
export const WhyChooseUsSection = () => {
  return <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container-custom relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-accent text-2xl font-black">&lt;</span>
            <h2 className="text-3xl md:text-4xl font-black text-primary-foreground">为什么选择飞迈</h2>
            <span className="text-accent text-2xl font-black">\&gt;</span>
          </div>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            专注无人机研发制造15年，为各行业提供专业、可靠的无人机解决方案
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => <div key={index} className="text-center p-6 bg-primary-foreground/10 rounded-2xl backdrop-blur-sm border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-colors">
              <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-black text-primary-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-primary-foreground/70 text-sm">{stat.label}</div>
            </div>)}
        </div>

        {/* Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => <div key={index} className="p-8 bg-primary-foreground/5 rounded-2xl border border-primary-foreground/10 hover:border-accent/50 transition-colors group">
              <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                <advantage.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary-foreground mb-3">
                {advantage.title}
              </h3>
              <p className="text-primary-foreground/70 leading-relaxed">
                {advantage.description}
              </p>
            </div>)}
        </div>
      </div>
    </section>;
};