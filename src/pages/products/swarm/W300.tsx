import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageStructuredData } from "@/components/PageStructuredData";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";

import heroImage from "@/assets/products/cani-c30-hero-bg.webp";

import C30FeaturesSection from "@/components/swarm/C30FeaturesSection";
import C30ArchitectureSection from "@/components/swarm/C30ArchitectureSection";
import C30SpecsSection from "@/components/swarm/C30SpecsSection";
import C30PackageSection from "@/components/swarm/C30PackageSection";
import C30HardwareSection from "@/components/swarm/C30HardwareSection";
import C30MoCapPositioningSection from "@/components/swarm/C30MoCapPositioningSection";
import C30SoftwareArchitectureSection from "@/components/swarm/C30SoftwareArchitectureSection";
import C30FormationDemoSection from "@/components/swarm/C30FormationDemoSection";
import C30WarningNotesSection from "@/components/swarm/C30WarningNotesSection";

const W300 = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={isZh ? "CANI C30 动捕集群开发套件 | 亚毫米级精度编队" : "CANI C30 MoCap Swarm Kit | Sub-mm Precision Formation"}
        description={isZh ? "CANI C30 动作捕捉集群套件，兼容OptiTrack/NOKOV/VICON，±1mm定位精度，360Hz刷新率，Jetson Orin NX机载计算，ROS开源架构。" : "CANI C30 Motion Capture swarm kit, compatible with OptiTrack/NOKOV/VICON, ±1mm accuracy, 360Hz refresh, Jetson Orin NX onboard computing, open-source ROS."}
        keywords={isZh ? "动捕集群,MOCAP无人机,编队飞行,OptiTrack,VICON,ROS" : "mocap swarm,motion capture drone,formation flight,OptiTrack,VICON,ROS"}
        path="/products/swarm/w300"
      />
      <PageStructuredData data={{ type: 'Product', name: 'CANI C30 MoCap Swarm Kit', description: 'Motion capture swarm drone development kit with sub-mm precision', category: 'Swarm Drone System', sku: 'CANI-C30-MOCAP' }} />
      <Header />
      <FloatingContact />
      <BackButton to="/products/swarm" label={isZh ? '← 返回集群产品' : '← Back to Swarm'} />

      <main>
        {/* Hero */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt="CANI C30 MoCap Swarm" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          </div>
          <div className="container-custom relative z-10 text-center py-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="bg-accent/90 text-accent-foreground mb-4 text-sm">CANI C30 · MOCAP</Badge>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              {isZh ? 'CANI C30 无人机集群平台' : 'CANI C30 Drone Swarm Platform'}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto mb-8">
              {isZh
                ? '通过通信模块与自研通信软件实现无人机间数据互通，机载计算机可获取任一无人机状态信息并控制。提供模式控制、位置控制、一字队形、三角队形、队形变换等功能Demo及丰富的集群控制接口，定制地面站简化操作，让用户专注于集群算法开发。'
                : 'Inter-drone data sharing via proprietary communication modules. Onboard computers access and control any drone\'s status. Includes mode control, position control, line/triangle formation, formation switching demos with rich swarm APIs. Custom ground station simplifies operations for algorithm-focused R&D.'}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 min-h-[44px]">
                  {isZh ? '获取报价' : 'Get Quote'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <ChevronDown className="w-6 h-6 text-white/60 animate-bounce" />
          </motion.div>
        </section>

        {/* Key Stats */}
        <section className="py-12 bg-accent/10">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "±1mm", label: isZh ? "定位精度" : "Positioning Accuracy" },
                { value: "360Hz", label: isZh ? "捕捉刷新率" : "Capture Refresh Rate" },
                { value: "100 TOPS", label: isZh ? "AI 算力" : "AI Performance" },
                { value: "<0.2ms", label: isZh ? "系统延迟" : "System Latency" },
              ].map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className="text-3xl md:text-4xl font-black text-accent">{item.value}</div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <C30MoCapPositioningSection />
        <C30FeaturesSection />
        <C30HardwareSection />
        <C30SoftwareArchitectureSection />
        <C30FormationDemoSection />
        <C30ArchitectureSection />
        <C30SpecsSection />
        <C30PackageSection />
        <C30WarningNotesSection />

        {/* Related Products */}
        <section className="py-16 bg-muted/50">
          <div className="container-custom">
            <h3 className="text-xl font-bold text-foreground mb-6">{isZh ? '相关集群产品' : 'Related Swarm Products'}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/products/swarm/w200" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/30 hover:border-accent/30 transition-all group">
                <ArrowRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                <div>
                  <span className="font-medium text-foreground group-hover:text-accent transition-colors">{isZh ? 'CANI C20 UWB集群套件' : 'CANI C20 UWB Swarm Kit'}</span>
                  <p className="text-xs text-muted-foreground mt-1">{isZh ? 'UWB高精度室内定位编队方案' : 'UWB high-precision indoor positioning formation'}</p>
                </div>
              </Link>
              <Link to="/products/swarm/w400" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/30 hover:border-accent/30 transition-all group">
                <ArrowRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                <div>
                  <span className="font-medium text-foreground group-hover:text-accent transition-colors">{isZh ? 'CANI C40 GPS集群套件' : 'CANI C40 GPS Swarm Kit'}</span>
                  <p className="text-xs text-muted-foreground mt-1">{isZh ? '户外大规模GPS编队飞行系统' : 'Outdoor large-scale GPS formation flight'}</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {isZh ? '开启亚毫米级精度集群研究' : 'Start Sub-mm Precision Swarm Research'}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {isZh ? 'CANI C30 为科研团队提供最高精度的室内集群编队平台，兼容主流动捕系统，助力前沿算法验证。' : 'CANI C30 provides the highest precision indoor swarm platform for research teams, compatible with mainstream MoCap systems.'}
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 min-h-[44px]">
                {isZh ? '联系我们' : 'Contact Us'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default W300;
