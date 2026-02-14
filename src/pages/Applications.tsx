import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Truck, Shield, Leaf, Flame, Link2, Lightbulb, Car, ChevronDown } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Applications = () => {
  const { t } = useLanguage();

  const applications = [
    {
      name: t('applications.power.name'),
      description: t('applications.power.desc'),
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
      href: "/applications/power-inspection",
      icon: Zap,
      stats: [t('applications.power.stat1'), t('applications.power.stat2')],
    },
    {
      name: t('applications.logistics.name'),
      description: t('applications.logistics.desc'),
      image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&q=80",
      href: "/applications/logistics",
      icon: Truck,
      stats: [t('applications.logistics.stat1'), t('applications.logistics.stat2')],
    },
    {
      name: t('applications.military.name'),
      description: t('applications.military.desc'),
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
      href: "/applications/military",
      icon: Shield,
      stats: [t('applications.military.stat1'), t('applications.military.stat2')],
    },
    {
      name: t('applications.environment.name'),
      description: t('applications.environment.desc'),
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      href: "/solutions/industrial-uav-environmental-monitoring",
      icon: Leaf,
      stats: [t('applications.environment.stat1'), t('applications.environment.stat2')],
    },
    {
      name: t('applications.firefighting.name'),
      description: t('applications.firefighting.desc'),
      image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=800&q=80",
      href: "/applications/firefighting",
      icon: Flame,
      stats: [t('applications.firefighting.stat1'), t('applications.firefighting.stat2')],
    },
    {
      name: t('applications.tethered.name'),
      description: t('applications.tethered.desc'),
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
      href: "/applications/tethered",
      icon: Link2,
      stats: [t('applications.tethered.stat1'), t('applications.tethered.stat2')],
    },
    {
      name: t('applications.transport.name'),
      description: t('applications.transport.desc'),
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
      href: "/solutions/industrial-uav-transportation-monitoring",
      icon: Car,
      stats: [t('applications.transport.stat1'), t('applications.transport.stat2')],
    },
    {
      name: t('applications.solutions.name'),
      description: t('applications.solutions.desc'),
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      href: "/applications/solutions",
      icon: Lightbulb,
      stats: [t('applications.solutions.stat1'), t('applications.solutions.stat2')],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const collectionData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('applications.seo.title'),
    description: t('applications.seo.description'),
    url: 'https://www.caniuav.com/applications',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: applications.length,
      itemListElement: applications.map((app, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: { '@type': 'Service', name: app.name, description: app.description, url: `https://www.caniuav.com${app.href}` },
      })),
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={t('applications.seo.title')}
        description={t('applications.seo.description')}
        keywords={t('applications.seo.keywords')}
        path="/applications"
        structuredData={collectionData}
      />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80)" }} />
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="container-custom relative z-10 text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-background/70 backdrop-blur-md border border-border text-accent text-sm font-medium mb-6">
                {t('applications.hero.badge')}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6"
            >
              <span className="inline-block px-6 py-4 rounded-3xl bg-background/70 backdrop-blur-md border border-border">
                {t('applications.hero.title')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              <span className="inline-block px-6 py-4 rounded-3xl bg-background/70 backdrop-blur-md border border-border">
                {t('applications.hero.subtitle')}
              </span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
          </motion.div>
        </section>

        {/* Applications Grid */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {applications.map((app, index) => {
                const Icon = app.icon;
                return (
                  <motion.div key={index} variants={itemVariants}>
                    <Link
                      to={app.href}
                      className="group block h-full bg-card rounded-2xl overflow-hidden border border-accent/10 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2"
                    >
                      {/* Image */}
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={app.image}
                          alt={app.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Icon Badge */}
                        <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-accent/90 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-accent-foreground" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                          {app.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {app.description}
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {app.stats.map((stat, i) => (
                            <span key={i} className="text-xs px-3 py-1 bg-accent/10 text-accent rounded-full font-medium">
                              {stat}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center text-accent font-medium group-hover:translate-x-1 transition-transform">
                          {t('applications.learnMore')}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-cyan-500/10 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="container-custom relative text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
                {t('applications.cta.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t('applications.cta.subtitle')}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-semibold rounded-full group">
                  {t('applications.cta.btn')}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Applications;