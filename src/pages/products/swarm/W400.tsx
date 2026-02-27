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

import heroBg from "@/assets/products/cani-w400-hero-bg.webp";

import W400FeaturesSection from "@/components/swarm/W400FeaturesSection";
import W400CoreMetricsSection from "@/components/swarm/W400CoreMetricsSection";
import W400IntelligentSystemSection from "@/components/swarm/W400IntelligentSystemSection";
import W400SwarmMissionSection from "@/components/swarm/W400SwarmMissionSection";
import W400HardwareSection from "@/components/swarm/W400HardwareSection";
import W400ArchitectureSection from "@/components/swarm/W400ArchitectureSection";
import W400SpecsSection from "@/components/swarm/W400SpecsSection";
import W400PackageSection from "@/components/swarm/W400PackageSection";
import W400TrainingSection from "@/components/swarm/W400TrainingSection";

const W400 = () => {
  const { t, language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={isZh ? 'CANI-W400 集群编队开发套件 | 室外GPS无人机集群平台 | CANI长凌科技' : 'CANI-W400 Swarm Formation Dev Kit | Outdoor GPS Drone Swarm Platform | CANI'}
        description={isZh ? 'CANI-W400集群编队开发套件，针对室外无人机集群研究开发，600mm六旋翼，GPS四星定位，基于ROS与PX4开源平台，结合Prometheus集群控制系统。' : 'CANI-W400 outdoor swarm formation dev kit with 600mm hexacopter, quad-GNSS, ROS + PX4 open-source platforms, Prometheus swarm control system.'}
        keywords={isZh ? 'CANI-W400,GPS集群,室外集群,六旋翼,无人机集群,Jetson Orin,集群编队,Prometheus' : 'CANI-W400,GPS swarm,outdoor swarm,hexacopter,drone swarm,Jetson Orin,formation,Prometheus'}
        path="/products/swarm/w400"
      />
      <PageStructuredData data={{ type: 'Product', name: 'CANI-W400 GPS Flagship Swarm Kit', description: isZh ? 'CANI-W400 GPS旗舰集群编队开发平台' : 'CANI-W400 GPS Flagship Swarm Development Platform', category: 'Swarm Drone System', sku: 'CANI-W400-GPS' }} />
      <Header />
      <FloatingContact />
      <BackButton to="/products/swarm" label={isZh ? '返回集群系统' : 'Back to Swarm Systems'} />

      <main>
        {/* Hero */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroBg} alt="CANI-W400 GPS Swarm" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </div>
          <div className="container-custom relative z-10 text-center py-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="bg-accent/90 text-accent-foreground mb-4">CANI-W400 GPS · {isZh ? '旗舰级' : 'Flagship'}</Badge>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              {isZh ? 'CANI-W400 集群编队开发套件' : 'CANI-W400 Swarm Formation Dev Kit'}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto mb-8">
              {isZh
                ? '针对室外无人机集群研究开发的编队平台方案，包含无人机、定位模块、通信模块、飞行控制器、机载计算机及配套集群控制软件系统。基于ROS与PX4两大开源平台，结合Prometheus集群控制子模块，提供编队功能Demo与地面站人机交互。'
                : 'An outdoor swarm formation platform for research, integrating drones, positioning, communication, flight controllers, onboard computers, and swarm control software built on ROS + PX4 open-source platforms with Prometheus formation control modules.'}
            </motion.p>

            {/* Key metrics */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="flex flex-wrap justify-center gap-6 mb-8">
              {[
                { value: "600mm", label: isZh ? "六旋翼轴距" : "Hexa Wheelbase" },
                { value: "30min", label: isZh ? "最长续航" : "Max Endurance" },
                { value: "4kg", label: isZh ? "最大起飞重量" : "Max Takeoff" },
                { value: "10000mAh", label: isZh ? "高压电池" : "HV Battery" },
                { value: "100 TOPS", label: isZh ? "AI算力" : "AI Computing" },
              ].map((m, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-black text-accent">{m.value}</div>
                  <div className="text-xs text-white/60">{m.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 min-h-[44px] min-w-[44px]">
                  {t('common.contactUs')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <ChevronDown className="w-6 h-6 text-white/60 animate-bounce" />
          </motion.div>
        </section>

        {/* Core Metrics - Endurance & Payload */}
        <W400CoreMetricsSection />

        {/* Features + Capabilities */}
        <W400FeaturesSection />

        {/* Intelligent System - Self-Check & RTK */}
        <W400IntelligentSystemSection />

        {/* Swarm Mission - Task Allocation & Formation */}
        <W400SwarmMissionSection />

        {/* Hardware Architecture */}
        <W400HardwareSection />

        {/* System Architecture */}
        <W400ArchitectureSection />

        {/* Specs */}
        <W400SpecsSection />

        {/* Package */}
        <W400PackageSection />

        {/* Training */}
        <W400TrainingSection />

        {/* Related Products */}
        <section className="py-16 bg-muted/50">
          <div className="container-custom">
            <h3 className="text-xl font-bold text-foreground mb-6">{isZh ? '相关产品' : 'Related Products'}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/products/swarm/w200" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/30 hover:border-accent/30 transition-all group min-h-[44px]">
                <ArrowRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                <div>
                  <span className="font-medium text-foreground group-hover:text-accent transition-colors">CANI C20 UWB {isZh ? '集群套件' : 'Swarm Kit'}</span>
                  <p className="text-xs text-muted-foreground mt-1">{isZh ? 'UWB定位，厘米级精度，室内外集群编队' : 'UWB positioning, cm accuracy, indoor/outdoor swarm'}</p>
                </div>
              </Link>
              <Link to="/products/swarm/w300" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/30 hover:border-accent/30 transition-all group min-h-[44px]">
                <ArrowRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                <div>
                  <span className="font-medium text-foreground group-hover:text-accent transition-colors">CANI C30 MoCap {isZh ? '集群套件' : 'Swarm Kit'}</span>
                  <p className="text-xs text-muted-foreground mt-1">{isZh ? '动捕定位，亚毫米级精度，室内精密编队' : 'MoCap positioning, sub-mm accuracy, precision indoor formation'}</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{isZh ? '开启GPS旗舰集群研究之旅' : 'Start Your GPS Flagship Swarm Research'}</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">{isZh ? '联系我们获取CANI-W400 GPS旗舰集群套件详细报价和技术支持' : 'Contact us for CANI-W400 GPS Flagship Swarm Kit pricing and technical support'}</p>
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 min-h-[44px] min-w-[44px]">
                {t('common.contactUs')}
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

export default W400;
