import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sparkles, Users, Palette, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const features = [
  { icon: Sparkles, title: "震撼效果", description: "百架级无人机编队表演" },
  { icon: Palette, title: "定制设计", description: "图案文字3D造型定制" },
  { icon: Users, title: "专业团队", description: "经验丰富的执行团队" },
  { icon: Shield, title: "安全保障", description: "完善的安全保障体系" },
];

const scenarios = ["企业庆典活动", "城市节日庆典", "景区夜游项目", "大型体育赛事", "文化旅游推广", "商业品牌发布"];

const DroneShow = () => {
  return (
    <div className="min-h-screen">
      <SEO title="无人机表演" description="飞迈科技专业无人机编队灯光表演服务。" keywords="无人机表演,灯光秀,编队表演" url="/projects/show" />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80)" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">无人机表演</h1>
              <p className="text-lg text-primary-foreground/90 mb-8">震撼视觉盛宴，点亮夜空</p>
              <Link to="/contact"><Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">预约表演<ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
            </div>
          </div>
        </section>
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {features.map((f, i) => (<div key={i} className="text-center p-6 bg-card rounded-xl shadow-card"><div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4"><f.icon className="w-8 h-8 text-accent" /></div><h3 className="text-lg font-bold mb-2">{f.title}</h3><p className="text-muted-foreground text-sm">{f.description}</p></div>))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-video rounded-xl overflow-hidden shadow-card"><img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" alt="表演" className="w-full h-full object-cover" /></div>
              <div><h2 className="text-2xl font-bold mb-6">应用场景</h2><ul className="space-y-4">{scenarios.map((s, i) => (<li key={i} className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-accent" /><span>{s}</span></li>))}</ul></div>
            </div>
          </div>
        </section>
      </main>
      <Footer /><FloatingContact />
    </div>
  );
};
export default DroneShow;