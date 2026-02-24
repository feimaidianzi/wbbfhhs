import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Mail, ChevronDown, LucideIcon } from "lucide-react";
import { LangLink } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";
import { LanguageCode } from "@/i18n/languages";
import { getDomainForLanguage, getHtmlLang } from "@/utils/seoConfig";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface Scenario {
  title: string;
  description: string;
  detailDescription?: string;
  image: string;
  icon?: LucideIcon;
  features?: string[];
  highlights?: { label: string; value: string }[];
}

interface Product {
  model: string;
  payload?: string;
  range?: string;
  description: string;
  link: string;
}

interface Advantage {
  icon: LucideIcon;
  title: string;
  description: string;
  value?: string;
}

interface RelatedLink {
  label: string;
  path: string;
  description?: string;
}

interface ApplicationPageTemplateProps {
  seoTitle: string;
  seoDescription: string;
  seoKeywords?: string;
  seoPath?: string;
  heroTitle: string;
  heroSubtitle?: string;
  heroDescription: string;
  heroImage: string;
  heroStats?: { value: string; label: string }[];
  introTitle?: string;
  introDescription?: string;
  introImage?: string;
  introPoints?: string[];
  advantages?: Advantage[];
  advantagesTitle?: string;
  features: Feature[];
  featuresTitle?: string;
  scenarios: Scenario[];
  scenariosTitle?: string;
  products?: Product[];
  productsTitle?: string;
  ctaTitle: string;
  ctaDescription?: string;
  ctaProductLink?: string;
  /** Optional case study or scenario adaptation text for E-E-A-T */
  caseStudy?: {
    title: string;
    content: string;
  };
  /** Related products for internal cross-linking */
  relatedProducts?: RelatedLink[];
  /** Related application pages for internal cross-linking */
  relatedApplications?: RelatedLink[];
  /** Extra sections rendered before CTA */
  children?: React.ReactNode;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const ApplicationPageTemplate = ({
  seoTitle,
  seoDescription,
  seoKeywords,
  seoPath = '',
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroImage,
  heroStats,
  introTitle,
  introDescription,
  introImage,
  introPoints,
  advantages,
  advantagesTitle,
  features,
  featuresTitle,
  scenarios,
  scenariosTitle,
  products,
  productsTitle,
  ctaTitle,
  ctaDescription,
  ctaProductLink,
  caseStudy,
  relatedProducts,
  relatedApplications,
  children,
}: ApplicationPageTemplateProps) => {
  const { language, t } = useLanguage();
  const langCode = language as LanguageCode;

  // Service structured data for application pages
  const currentDomain = getDomainForLanguage(langCode);
  const serviceStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: seoTitle,
    description: seoDescription,
    provider: {
      '@type': 'Organization',
      name: langCode === 'zh' ? '长凌科技' : 'CANI Technology',
      url: currentDomain,
      logo: `${currentDomain}/logo.png`,
    },
    areaServed: 'Worldwide',
    inLanguage: getHtmlLang(langCode),
    ...(products && products.length > 0 ? {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: productsTitle || t('template.relatedProducts'),
        itemListElement: products.map((p, i) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: p.model,
            description: p.description,
            brand: { '@type': 'Brand', name: 'CANI' },
          },
        })),
      },
    } : {}),
  };

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        path={seoPath}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(serviceStructuredData)}
        </script>
      </Helmet>
      <Header />
      <FloatingContact />

      <main>
        {/* Immersive Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          {/* Content */}
          <div className="container-custom relative z-10 text-center py-32">
            {heroSubtitle && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="inline-block px-4 py-2 rounded-full bg-background/70 backdrop-blur-md border border-border text-foreground text-sm font-medium mb-6">
                  {heroSubtitle}
                </span>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight"
            >
              <span className="inline-block px-6 py-4 rounded-3xl bg-background/70 backdrop-blur-md border border-border text-foreground">
                {heroTitle}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl max-w-3xl mx-auto mb-10"
            >
              <span className="inline-block px-6 py-4 rounded-3xl bg-background/70 backdrop-blur-md border border-border text-foreground">
                {heroDescription}
              </span>
            </motion.p>

            {/* Stats */}
            {heroStats && heroStats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap justify-center gap-6 mb-10"
              >
                {heroStats.map((stat, index) => (
                  <div key={index} className="px-6 py-4 rounded-2xl bg-background/70 backdrop-blur-md border border-border">
                    <div className="text-2xl md:text-3xl font-black text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <LangLink to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-semibold rounded-full group">
                  {t('template.consultSolution')}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </LangLink>
              <a href="mailto:sales@caniuav.com">
                <Button variant="outline" className="border-accent/30 hover:border-accent text-foreground px-8 py-6 text-lg font-semibold rounded-full">
                  <Mail className="w-5 h-5 mr-2" />
                  {t('template.emailConsult')}
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
          </motion.div>
        </section>

        {/* Introduction Section */}
        {(introTitle || introDescription || introImage) && (
          <section className="py-24 bg-secondary">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                  {t('template.overview')}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
                  {introTitle || `${heroTitle}${t('template.overview')}`}
                </h2>
                {introDescription && (
                  <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                    {introDescription}
                  </p>
                )}
              </motion.div>

              {(introImage || introPoints) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {introImage && (
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="rounded-2xl overflow-hidden"
                    >
                      <img
                        src={introImage}
                        alt={introTitle || heroTitle}
                        loading="lazy"
                        className="w-full h-auto object-cover"
                      />
                    </motion.div>
                  )}
                  {introPoints && (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="space-y-4"
                    >
                      {introPoints.map((point, index) => (
                        <motion.div 
                          key={index} 
                          variants={itemVariants}
                          className="flex items-start gap-4 p-5 bg-card rounded-xl border border-accent/10"
                        >
                          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="h-5 w-5 text-accent" />
                          </div>
                          <p className="text-foreground">{point}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Advantages Section */}
        {advantages && advantages.length > 0 && (
          <section className="py-24 bg-background">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                  {t('template.coreValue')}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
                  {advantagesTitle || t('template.coreAdvantages')}
                </h2>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {advantages.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="group p-8 rounded-2xl bg-card border border-accent/10 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 text-center"
                    >
                      <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                        <Icon className="h-8 w-8 text-accent" />
                      </div>
                      {item.value && (
                        <div className="text-3xl font-black text-accent mb-2">{item.value}</div>
                      )}
                      <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className={`py-24 ${advantages && advantages.length > 0 ? 'bg-secondary' : 'bg-background'}`}>
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                {t('template.techHighlight')}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
                {featuresTitle || t('template.techFeatures')}
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group p-6 rounded-2xl bg-card border border-accent/10 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 text-center"
                  >
                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Scenarios Section */}
        <section className="py-24 bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                {t('template.realApplication')}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
                {scenariosTitle || t('template.applicationScenarios')}
              </h2>
            </motion.div>

            {scenarios.some(s => s.detailDescription) ? (
              // Detailed scenario layout
              <div className="space-y-16">
                {scenarios.map((scenario, index) => {
                  const Icon = scenario.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? '' : ''}`}
                    >
                      <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                        <div className="aspect-video rounded-2xl overflow-hidden border border-accent/10">
                          <img
                            src={scenario.image}
                            alt={scenario.title}
                            loading="lazy"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      </div>
                      <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                        <div className="flex items-center gap-4 mb-6">
                          {Icon && (
                            <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center">
                              <Icon className="h-7 w-7 text-accent" />
                            </div>
                          )}
                          <h3 className="text-2xl md:text-3xl font-black text-foreground">{scenario.title}</h3>
                        </div>
                        <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                          {scenario.detailDescription || scenario.description}
                        </p>
                        {scenario.highlights && (
                          <div className="grid grid-cols-3 gap-4 mb-6">
                            {scenario.highlights.map((highlight, i) => (
                              <div key={i} className="text-center p-4 bg-card rounded-xl border border-accent/10">
                                <div className="text-xl font-black text-accent">{highlight.value}</div>
                                <div className="text-xs text-muted-foreground">{highlight.label}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        {scenario.features && (
                          <div className="flex flex-wrap gap-2">
                            {scenario.features.map((feature, i) => (
                              <span key={i} className="text-sm bg-accent/10 text-accent px-4 py-2 rounded-full font-medium">
                                {feature}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              // Simple card layout
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {scenarios.map((scenario, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group rounded-2xl overflow-hidden bg-card border border-accent/10 hover:border-accent/30 transition-all duration-500"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={scenario.image}
                        alt={scenario.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">{scenario.title}</h3>
                      <p className="text-muted-foreground text-sm">{scenario.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Products Section */}
        {products && products.length > 0 && (
          <section className="py-24 bg-secondary">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                  {t('template.recommendedProducts')}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
                  {productsTitle || t('template.productSeries')}
                </h2>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {products.map((product, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group bg-card rounded-2xl p-8 border border-accent/10 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-black text-foreground group-hover:text-accent transition-colors">{product.model}</h3>
                    </div>
                    {(product.payload || product.range) && (
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {product.payload && (
                          <div className="text-center p-4 bg-secondary rounded-xl">
                            <div className="text-xl font-black text-accent">{product.payload}</div>
                            <div className="text-xs text-muted-foreground">{t('template.payload')}</div>
                          </div>
                        )}
                        {product.range && (
                          <div className="text-center p-4 bg-secondary rounded-xl">
                            <div className="text-xl font-black text-accent">{product.range}</div>
                            <div className="text-xs text-muted-foreground">{t('template.rangeHeight')}</div>
                          </div>
                        )}
                      </div>
                    )}
                    <p className="text-muted-foreground text-sm text-center mb-6">
                      {product.description}
                    </p>
                    <LangLink to={product.link}>
                      <Button className="w-full bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground font-semibold group/btn">
                        {t('template.viewDetails')}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </LangLink>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* Case Study / E-E-A-T Section */}
        {caseStudy && (
          <section className="py-16 bg-secondary">
            <div className="container-custom max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card rounded-2xl p-8 border border-accent/10"
              >
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  {caseStudy.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{caseStudy.content}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="px-3 py-1 bg-accent/5 rounded-full">✅ {t('product.trust.highTech')}</span>
                  <span className="px-3 py-1 bg-accent/5 rounded-full">✅ {t('product.trust.iso')}</span>
                  <span className="px-3 py-1 bg-accent/5 rounded-full">✅ {t('product.trust.experience')}</span>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Related Products & Applications Internal Links */}
        {(relatedProducts?.length || relatedApplications?.length) && (
          <section className="py-16 bg-muted/50">
            <div className="container-custom">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {relatedProducts && relatedProducts.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-6">{t('product.relatedProducts')}</h3>
                    <div className="space-y-3">
                      {relatedProducts.map((item, idx) => (
                        <LangLink key={idx} to={item.path} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/30 hover:border-accent/30 transition-all group">
                          <ArrowRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                          <div>
                            <span className="font-medium text-foreground group-hover:text-accent transition-colors">{item.label}</span>
                            {item.description && <p className="text-xs text-muted-foreground mt-1">{item.description}</p>}
                          </div>
                        </LangLink>
                      ))}
                    </div>
                  </div>
                )}
                {relatedApplications && relatedApplications.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-6">{t('product.relatedApplications')}</h3>
                    <div className="space-y-3">
                      {relatedApplications.map((item, idx) => (
                        <LangLink key={idx} to={item.path} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/30 hover:border-accent/30 transition-all group">
                          <ArrowRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                          <div>
                            <span className="font-medium text-foreground group-hover:text-accent transition-colors">{item.label}</span>
                            {item.description && <p className="text-xs text-muted-foreground mt-1">{item.description}</p>}
                          </div>
                        </LangLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Extra sections from children */}
        {children}

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-accent/10 via-background to-cyan-500/10 relative overflow-hidden">
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6">{ctaTitle}</h2>
              {ctaDescription && (
                <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">{ctaDescription}</p>
              )}
              <div className="flex flex-wrap justify-center gap-4">
                <LangLink to="/contact">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg font-semibold rounded-full group">
                    <Mail className="mr-2 h-5 w-5" />
                    {t('template.inquiryNow')}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </LangLink>
                {ctaProductLink && (
                  <LangLink to={ctaProductLink}>
                    <Button variant="outline" className="border-accent/30 hover:border-accent text-foreground px-10 py-6 text-lg font-semibold rounded-full">
                      {t('template.viewProducts')}
                    </Button>
                  </LangLink>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ApplicationPageTemplate;
