import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageStructuredData } from "@/components/PageStructuredData";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "@/lib/motion-shim";
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
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={t('swarmpage.w400.k687')}
        description={t('swarmpage.w400.k688')}
        keywords={t('swarmpage.w400.k689')}
        path="/products/swarm/w400"
      />
      <PageStructuredData data={{ type: 'Product', name: 'CANI-W400 GPS Flagship Swarm Kit', description: t('swarmpage.w400.k690'), category: 'Swarm Drone System', sku: 'CANI-W400-GPS' }} />
      <Header />
      <FloatingContact />
      <BackButton to="/products/swarm" label={t('swarmpage.w400.k691')} />

      <main>
        {/* Hero */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroBg} alt="CANI-W400 GPS Swarm" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </div>
          <div className="container-custom relative z-10 text-center py-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="bg-accent/90 text-accent-foreground mb-4">CANI-W400 GPS · {t('swarmpage.w400.k692')}</Badge>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              {t('swarmpage.w400.k693')}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto mb-8">
              {t('swarmpage.w400.k694')}
            </motion.p>

            {/* Key metrics */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="flex flex-wrap justify-center gap-6 mb-8">
              {[
                { value: "600mm", label: t('swarmpage.w400.k695') },
                { value: "30min", label: t('swarmpage.w400.k696') },
                { value: "4kg", label: t('swarmpage.w400.k697') },
                { value: "10000mAh", label: t('swarmpage.w400.k698') },
                { value: "100 TOPS", label: t('swarmpage.w400.k699') },
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
            <h3 className="text-xl font-bold text-foreground mb-6">{t('swarmpage.w400.k700')}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/products/swarm/w200" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/30 hover:border-accent/30 transition-all group min-h-[44px]">
                <ArrowRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                <div>
                  <span className="font-medium text-foreground group-hover:text-accent transition-colors">CANI C20 UWB {t('swarmpage.w400.k701')}</span>
                  <p className="text-xs text-muted-foreground mt-1">{t('swarmpage.w400.k702')}</p>
                </div>
              </Link>
              <Link to="/products/swarm/w300" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/30 hover:border-accent/30 transition-all group min-h-[44px]">
                <ArrowRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                <div>
                  <span className="font-medium text-foreground group-hover:text-accent transition-colors">CANI C30 MoCap {t('swarmpage.w400.k701')}</span>
                  <p className="text-xs text-muted-foreground mt-1">{t('swarmpage.w400.k703')}</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('swarmpage.w400.k704')}</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">{t('swarmpage.w400.k705')}</p>
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
