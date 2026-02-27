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
import W400HardwareSection from "@/components/swarm/W400HardwareSection";
import W400ArchitectureSection from "@/components/swarm/W400ArchitectureSection";
import W400SpecsSection from "@/components/swarm/W400SpecsSection";
import W400PackageSection from "@/components/swarm/W400PackageSection";

const W400 = () => {
  const { t, language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={isZh ? 'CANI-W400 GPS旗舰集群编队套件 | 室外大范围无人机集群平台 | CANI长凌科技' : 'CANI-W400 GPS Flagship Swarm Kit | Outdoor Large-Scale Drone Swarm Platform | CANI'}
        description={isZh ? 'CANI-W400 GPS旗舰集群套件，600mm六旋翼平台，GPS四星定位，25分钟续航，Jetson Orin NX 100 TOPS AI算力，Prometheus R1.6集群控制系统。' : 'CANI-W400 GPS flagship swarm kit with 600mm hexacopter, quad-GNSS positioning, 25-min endurance, Jetson Orin NX 100 TOPS AI, Prometheus R1.6 swarm control.'}
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
              {isZh ? 'CANI-W400 旗舰级无人机集群平台' : 'CANI-W400 Flagship Drone Swarm Platform'}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8">
              {isZh ? '600mm六旋翼 · 重载长续航 · GPS四星定位 · 全环境室外作业' : '600mm Hexacopter · Heavy Payload · Quad-GNSS · Full Outdoor Operations'}
            </motion.p>

            {/* Key metrics */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="flex flex-wrap justify-center gap-6 mb-8">
              {[
                { value: "600mm", label: isZh ? "六旋翼轴距" : "Hexa Wheelbase" },
                { value: "25min", label: isZh ? "续航时间" : "Flight Time" },
                { value: "100 TOPS", label: isZh ? "AI算力" : "AI Computing" },
                { value: "1km", label: isZh ? "Mesh通信" : "Mesh Range" },
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

        {/* Features + Capabilities */}
        <W400FeaturesSection />

        {/* Hardware Architecture */}
        <W400HardwareSection />

        {/* System Architecture */}
        <W400ArchitectureSection />

        {/* Specs */}
        <W400SpecsSection />

        {/* Package */}
        <W400PackageSection />

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
