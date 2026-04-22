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
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={t('swarmpage.w300.k674')}
        description={t('swarmpage.w300.k675')}
        keywords={t('swarmpage.w300.k676')}
        path="/products/swarm/w300"
      />
      <PageStructuredData data={{ type: 'Product', name: 'CANI W300 MoCap Swarm Kit', description: 'Motion capture swarm drone development kit with sub-mm precision', category: 'Swarm Drone System', sku: 'CANI-W300-MOCAP' }} />
      <Header />
      <FloatingContact />
      <BackButton to="/products/swarm" label={t('swarmpage.w200.k660')} />

      <main>
        {/* Hero */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt="CANI W300 MoCap Swarm" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          </div>
          <div className="container-custom relative z-10 text-center py-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="bg-accent/90 text-accent-foreground mb-4 text-sm">CANI W300 · MOCAP</Badge>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              {t('swarmpage.w300.k677')}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto mb-8">
              {t('swarmpage.w300.k678')}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 min-h-[44px]">
                  {t('acc.canifmtdetail.k525')}
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
                { value: "±1mm", label: t('swarm.c30mocappositioningsection.k161') },
                { value: "360Hz", label: t('swarmpage.w300.k679') },
                { value: "100 TOPS", label: t('swarm.c30specssection.k221') },
                { value: "<0.2ms", label: t('swarm.c30mocappositioningsection.k167') },
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
            <h3 className="text-xl font-bold text-foreground mb-6">{t('swarmpage.w200.k665')}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/products/swarm/w200" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/30 hover:border-accent/30 transition-all group">
                <ArrowRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                <div>
                  <span className="font-medium text-foreground group-hover:text-accent transition-colors">{t('swarmpage.w300.k680')}</span>
                  <p className="text-xs text-muted-foreground mt-1">{t('swarmpage.w300.k681')}</p>
                </div>
              </Link>
              <Link to="/products/swarm/w400" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/30 hover:border-accent/30 transition-all group">
                <ArrowRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                <div>
                  <span className="font-medium text-foreground group-hover:text-accent transition-colors">{t('swarmpage.w300.k682')}</span>
                  <p className="text-xs text-muted-foreground mt-1">{t('swarmpage.w200.k669')}</p>
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
                <p className="text-sm text-accent font-mono mb-1">{t('prod.logistics.k451')}</p>
                <Link to="/news/ae1840e0-92c2-43aa-b36d-0b5b84c6c158" className="text-foreground font-semibold hover:text-accent transition-colors">
                  {t('swarmpage.w300.k683')}
                </Link>
                <p className="text-muted-foreground text-sm mt-1">{t('swarmpage.w300.k684')}</p>
              </div>
              <ChevronDown className="w-5 h-5 text-muted-foreground rotate-[-90deg]" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('swarmpage.w300.k685')}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {t('swarmpage.w300.k686')}
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 min-h-[44px]">
                {t('acc.canifmtdetail.k547')}
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
