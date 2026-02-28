import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageStructuredData } from "@/components/PageStructuredData";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Check } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";

import heroImage from "@/assets/products/c20-fleet-render.png";

import C20HardwareSection from "@/components/swarm/C20HardwareSection";
import C20NetworkArchitecture from "@/components/swarm/C20NetworkArchitecture";
import C20FeaturesSection from "@/components/swarm/C20FeaturesSection";
import C20SpecsSection from "@/components/swarm/C20SpecsSection";
import C20PackageSection from "@/components/swarm/C20PackageSection";

const W200 = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={isZh ? "CANI W200 UWB集群无人机开发套件 | 高精度室内定位" : "CANI W200 UWB Swarm Drone Development Kit | High-Precision Indoor Positioning"}
        description={isZh ? "CANI W200 UWB集群开发套件，3架230mm轴距无人机，10cm定位精度，200Hz刷新率，支持Pixhawk飞控和ROS开源架构，适用于科研和编队飞行。" : "CANI W200 UWB swarm development kit with 3x 230mm drones, 10cm positioning accuracy, 200Hz refresh rate, Pixhawk FC and open-source ROS architecture for research and formation flight."}
        keywords={isZh ? "集群无人机,UWB定位,编队飞行,Pixhawk,ROS,科研无人机" : "swarm drone,UWB positioning,formation flight,Pixhawk,ROS,research drone"}
        path="/products/swarm/w200"
      />
      <PageStructuredData data={{ type: 'Product', name: 'CANI W200 UWB Swarm Kit', description: 'UWB swarm drone development kit with 3 drones, 10cm accuracy, open-source ROS architecture', category: 'Swarm Drone System', sku: 'CANI-W200-UWB' }} />
      <Header />
      <FloatingContact />
      <BackButton to="/products/swarm" label={isZh ? '← 返回集群产品' : '← Back to Swarm'} />

      <main>
        {/* Hero */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black">
            <img src={heroImage} alt="CANI W200 Swarm Fleet" className="w-full h-full object-contain object-center opacity-40" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </div>
          <div className="container-custom relative z-10 text-center py-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="bg-accent/90 text-accent-foreground mb-4 text-sm">CANI W200 · UWB</Badge>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              {isZh ? 'CANI W200 集群编队套件' : 'CANI W200 Swarm Formation Kit'}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto mb-8">
              {isZh
                ? '灵活应用于室内外无人机集群研究的编队平台方案，包含无人机、UWB定位模块、通信模块、飞行控制器、机载计算机及集群控制软件。基于ROS与PX4开源平台，结合Prometheus集群控制子模块，提供编队功能Demo与地面站人机交互。'
                : 'A flexible indoor/outdoor swarm formation platform with drones, UWB positioning, communication modules, flight controllers, onboard computers, and swarm control software. Built on ROS + PX4 with Prometheus formation control modules, demos, and ground station HMI.'}
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

        {/* Key Highlights */}
        <section className="py-12 bg-accent/10">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "3", label: isZh ? "架无人机" : "Drones" },
                { value: "10cm", label: isZh ? "定位精度" : "Positioning Accuracy" },
                { value: "200Hz", label: isZh ? "UWB刷新率" : "UWB Refresh Rate" },
                { value: "230mm", label: isZh ? "轴距" : "Wheelbase" },
              ].map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className="text-3xl md:text-4xl font-black text-accent">{item.value}</div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features with micro-interactions */}
        <C20FeaturesSection />

        {/* Hardware Labeled Diagram */}
        <C20HardwareSection />

        {/* UWB Network Architecture */}
        <C20NetworkArchitecture />

        {/* Specifications (tabbed) */}
        <C20SpecsSection />

        {/* Package List */}
        <C20PackageSection />

        {/* Related Products */}
        <section className="py-16 bg-muted/50">
          <div className="container-custom">
            <h3 className="text-xl font-bold text-foreground mb-6">{isZh ? '相关集群产品' : 'Related Swarm Products'}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/products/swarm/w300" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/30 hover:border-accent/30 transition-all group">
                <ArrowRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                <div>
                  <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                    {isZh ? 'CANI C30 动捕集群套件' : 'CANI C30 MoCap Swarm Kit'}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{isZh ? '基于动捕系统的高精度室内编队方案' : 'High-precision indoor formation with motion capture'}</p>
                </div>
              </Link>
              <Link to="/products/swarm/w400" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/30 hover:border-accent/30 transition-all group">
                <ArrowRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                <div>
                  <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                    {isZh ? 'CANI C40 GPS集群套件' : 'CANI C40 GPS Swarm Kit'}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{isZh ? '户外大规模GPS编队飞行系统' : 'Outdoor large-scale GPS formation flight'}</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Article */}
        <section className="py-12 bg-muted/50 border-t border-border">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
              <div className="text-3xl">📰</div>
              <div className="flex-1">
                <p className="text-sm text-accent font-mono mb-1">{isZh ? '深度解读' : 'Deep Dive'}</p>
                <Link to="/news/4c398245-7eff-424d-b155-6323624f8a0e" className="text-foreground font-semibold hover:text-accent transition-colors">
                  {isZh ? '协同作业先锋：W200 蜂群无人机系统——一站式集群全栈开发平台' : 'Collaborative Pioneer: W200 Swarm UAV — One-stop Full-stack Swarm Platform'}
                </Link>
                <p className="text-muted-foreground text-sm mt-1">{isZh ? '了解 W200 的分布式集群协议与协同控制算法' : 'Explore W200 distributed swarm protocols and collaborative algorithms'}</p>
              </div>
              <ChevronDown className="w-5 h-5 text-muted-foreground rotate-[-90deg]" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {isZh ? '开启您的集群无人机研究' : 'Start Your Swarm Drone Research'}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {isZh ? 'CANI C20套件提供开箱即用的UWB集群编队解决方案，助力科研团队快速验证算法。' : 'The CANI C20 kit provides a ready-to-fly UWB swarm formation solution to help research teams rapidly validate algorithms.'}
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

export default W200;
