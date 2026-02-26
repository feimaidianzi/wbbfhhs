import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, Wrench, FileText, Users, CheckCircle, Cpu, Plane, Code, Package } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import customResearchHeroImg from "@/assets/seo/custom-research-lab.jpg";
import customResearchCapImg from "@/assets/seo/custom-accessories-hardware.jpg";
import customCase1Img from "@/assets/seo/custom-research-lab.jpg";
import customCase2Img from "@/assets/seo/fpv-drone-aerial.jpg";
import customCase3Img from "@/assets/seo/swarm-drone-formation.jpg";

const CustomResearch = () => {
  const { t } = useLanguage();

  const subCategories = [
    { name: t('header.accessoryCustom'), href: "/custom-research/accessories", description: t('header.accessoryCustom.desc'), icon: Cpu },
    { name: t('header.droneCustom'), href: "/custom-research/drone", description: t('header.droneCustom.desc'), icon: Plane },
    { name: t('header.softwareCustom'), href: "/custom-research/software", description: t('header.softwareCustom.desc'), icon: Code },
    { name: t('header.payloadCustom'), href: "/custom-research/payload", description: t('header.payloadCustom.desc'), icon: Package },
  ];

  const services = [
    { icon: Lightbulb, title: t('customResearch.services.analysis.title'), description: t('customResearch.services.analysis.desc') },
    { icon: FileText, title: t('customResearch.services.design.title'), description: t('customResearch.services.design.desc') },
    { icon: Wrench, title: t('customResearch.services.dev.title'), description: t('customResearch.services.dev.desc') },
    { icon: Users, title: t('customResearch.services.support.title'), description: t('customResearch.services.support.desc') },
  ];

  const cases = [
    { title: t('customResearch.case1.title'), client: t('customResearch.case1.client'), description: t('customResearch.case1.desc'), image: customCase1Img },
    { title: t('customResearch.case2.title'), client: t('customResearch.case2.client'), description: t('customResearch.case2.desc'), image: customCase2Img },
    { title: t('customResearch.case3.title'), client: t('customResearch.case3.client'), description: t('customResearch.case3.desc'), image: customCase3Img },
  ];

  const capabilities = [
    t('customResearch.capabilities.flightControl'),
    t('customResearch.capabilities.powerSystem'),
    t('customResearch.capabilities.airframe'),
    t('customResearch.capabilities.payload'),
    t('customResearch.capabilities.groundStation'),
    t('customResearch.capabilities.communication'),
    t('customResearch.capabilities.navigation'),
    t('customResearch.capabilities.swarm'),
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('customResearch.seo.title')}
        description={t('customResearch.seo.description')}
        keywords={t('customResearch.seo.keywords')}
        path="/custom-research"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${customResearchHeroImg})` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">{t('customResearch.hero.title')}</h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">{t('customResearch.hero.subtitle')}</p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 min-h-[44px]">
                  {t('customResearch.hero.cta')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Sub-Categories */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('customResearch.services.title')}</h2>
              <div className="w-12 h-0.5 bg-accent mx-auto mt-2" />
            </div>
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {subCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <motion.div key={cat.href} variants={itemVariants}>
                    <Link to={cat.href} className="group block h-full p-6 bg-card rounded-2xl border border-border hover:border-accent/40 transition-all duration-300 hover:-translate-y-1">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">{cat.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{cat.description}</p>
                      <div className="flex items-center text-accent text-sm font-medium">
                        {t('common.learnMore')}
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="text-sm text-accent font-medium mb-2">0{index + 1}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">{t('customResearch.capabilities.title')}</h2>
                <p className="text-muted-foreground mb-6">{t('customResearch.capabilities.desc')}</p>
                <div className="grid grid-cols-2 gap-4">
                  {capabilities.map((cap, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground text-sm">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img src={customResearchCapImg} alt={t('customResearch.capabilities.title')} className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Cases */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">{t('customResearch.cases.title')}</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">{t('customResearch.cases.subtitle')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cases.map((item, index) => (
                <div key={index} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all">
                  <div className="aspect-video overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-accent font-medium mb-2">{item.client}</div>
                    <h3 className="text-lg font-bold text-card-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">{t('customResearch.cta.title')}</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">{t('customResearch.cta.subtitle')}</p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 min-h-[44px]">
                {t('customResearch.cta.btn')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default CustomResearch;
