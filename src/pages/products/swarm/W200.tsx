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
import { motion } from "@/lib/motion-shim";
import { ArrowRight, ChevronDown, Check } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";

import heroImage from "@/assets/products/c20-fleet-render.png";

import C20HardwareSection from "@/components/swarm/C20HardwareSection";
import C20NetworkArchitecture from "@/components/swarm/C20NetworkArchitecture";
import C20FeaturesSection from "@/components/swarm/C20FeaturesSection";
import C20SpecsSection from "@/components/swarm/C20SpecsSection";
import C20PackageSection from "@/components/swarm/C20PackageSection";

const W200 = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={t('swarmpage.w200.k657')}
        description={t('swarmpage.w200.k658')}
        keywords={t('swarmpage.w200.k659')}
        path="/products/swarm/w200"
      />
      <PageStructuredData data={{ type: 'Product', name: 'CANI W200 UWB Swarm Kit', description: 'UWB swarm drone development kit with 3 drones, 10cm accuracy, open-source ROS architecture', category: 'Swarm Drone System', sku: 'CANI-W200-UWB' }} />
      <Header />
      <FloatingContact />
      <BackButton to="/products/swarm" label={t('swarmpage.w200.k660')} />

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
              {t('swarmpage.w200.k661')}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto mb-8">
              {t('swarmpage.w200.k662')}
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

        {/* Key Highlights */}
        <section className="py-12 bg-accent/10">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "3", label: t('swarmpage.w200.k663') },
                { value: "10cm", label: t('swarm.c30mocappositioningsection.k161') },
                { value: "200Hz", label: t('swarmpage.w200.k664') },
                { value: "230mm", label: t('swarm.c20specssection.k64') },
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
            <h3 className="text-xl font-bold text-foreground mb-6">{t('swarmpage.w200.k665')}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/products/swarm/w300" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/30 hover:border-accent/30 transition-all group">
                <ArrowRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                <div>
                  <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                    {t('swarmpage.w200.k666')}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{t('swarmpage.w200.k667')}</p>
                </div>
              </Link>
              <Link to="/products/swarm/w400" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/30 hover:border-accent/30 transition-all group">
                <ArrowRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                <div>
                  <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                    {t('swarmpage.w200.k668')}
                  </span>
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
                <Link to="/news/4c398245-7eff-424d-b155-6323624f8a0e" className="text-foreground font-semibold hover:text-accent transition-colors">
                  {t('swarmpage.w200.k670')}
                </Link>
                <p className="text-muted-foreground text-sm mt-1">{t('swarmpage.w200.k671')}</p>
              </div>
              <ChevronDown className="w-5 h-5 text-muted-foreground rotate-[-90deg]" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('swarmpage.w200.k672')}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {t('swarmpage.w200.k673')}
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

export default W200;
