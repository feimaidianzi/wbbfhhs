import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Mail, ChevronDown } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { LangLink } from "@/components/LangLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { ProductCollectionSEO } from "@/components/ProductCollectionSEO";
import { RichSEOContent, getSEOContentForCategory } from "@/components/RichSEOContent";

// Helper function for template text (used for structured data and UI)
const getTemplateText = (isEn: boolean, t: (key: string) => string, key: string, fallbackZh: string, fallbackEn: string) => {
  const translated = t(`template.${key}`);
  // If translation returns the key itself, use fallback
  if (translated === `template.${key}`) {
    return isEn ? fallbackEn : fallbackZh;
  }
  return translated;
};

interface Feature {
  icon: LucideIcon;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
}

interface Product {
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  specs: string[];
  specsEn?: string[];
  image: string;
  link?: string;
}

interface Stat {
  value: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
}

interface Application {
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  image?: string;
}

interface Case {
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  image: string;
}

interface ProductPageTemplateProps {
  heroTitle: string;
  heroTitleEn?: string;
  heroSubtitle: string;
  heroSubtitleEn?: string;
  heroImage: string;
  features: Feature[];
  featuresTitle?: string;
  featuresTitleEn?: string;
  products: Product[];
  productsTitle?: string;
  productsTitleEn?: string;
  productsSubtitle?: string;
  productsSubtitleEn?: string;
  stats?: Stat[];
  applications?: Application[];
  applicationsTitle?: string;
  applicationsTitleEn?: string;
  techSpecs?: { label: string; labelEn?: string; value: string; valueEn?: string }[];
  cases?: Case[];
  // SEO增强属性
  seoCategory?: string;
  seoCategoryDescription?: string;
  seoCategoryDescriptionEn?: string;
  seoKeywords?: string[];
  seoKeywordsEn?: string[];
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

const ProductPageTemplate = ({
  heroTitle,
  heroTitleEn,
  heroSubtitle,
  heroSubtitleEn,
  heroImage,
  features,
  featuresTitle = "核心优势",
  featuresTitleEn = "Core Advantages",
  products,
  productsTitle = "产品系列",
  productsTitleEn = "Product Series",
  productsSubtitle,
  productsSubtitleEn,
  stats,
  applications,
  applicationsTitle = "应用场景",
  applicationsTitleEn = "Applications",
  cases,
  seoCategory,
  seoCategoryDescription,
  seoCategoryDescriptionEn,
  seoKeywords = [],
  seoKeywordsEn = [],
}: ProductPageTemplateProps) => {
  const { baseLang, t } = useLanguage();
  const isEn = baseLang === 'en';

  // 获取预定义的SEO内容
  const categorySlug = seoCategory || heroTitle.toLowerCase().replace(/\s+/g, '-');
  const seoContent = getSEOContentForCategory(categorySlug);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* SEO增强组件 */}
      <ProductCollectionSEO
        category={heroTitle}
        categoryEn={heroTitleEn || heroTitle}
        categoryDescription={seoCategoryDescription || heroSubtitle}
        categoryDescriptionEn={seoCategoryDescriptionEn || heroSubtitleEn || heroSubtitle}
        products={products}
        keywords={seoKeywords.length > 0 ? seoKeywords : (seoContent?.keywords || [])}
        keywordsEn={seoKeywordsEn.length > 0 ? seoKeywordsEn : (seoContent?.keywordsEn || [])}
        buyingGuide={seoContent ? {
          title: seoContent.contentBlocks[0]?.title || '购买指南',
          titleEn: seoContent.contentBlocks[0]?.titleEn || 'Buying Guide',
          content: seoContent.contentBlocks[0]?.paragraphs || [],
          contentEn: seoContent.contentBlocks[0]?.paragraphsEn || [],
        } : undefined}
      />

      {/* 额外的富文本SEO内容 */}
      {seoContent && (
        <RichSEOContent
          pageName={heroTitle}
          pageNameEn={heroTitleEn || heroTitle}
          contentBlocks={seoContent.contentBlocks}
          additionalKeywords={seoContent.keywords}
          additionalKeywordsEn={seoContent.keywordsEn}
        />
      )}

      <main>
        {/* Immersive Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Parallax Effect */}
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
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-black/60 border border-white/20 text-white text-sm font-medium mb-6">
                {t('template.brandSlogan')}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight"
            >
              <span className="inline-block px-6 py-4 rounded-3xl bg-black/60 border border-white/20 text-white">
                {isEn && heroTitleEn ? heroTitleEn : heroTitle}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl max-w-3xl mx-auto mb-10"
            >
              <span className="inline-block px-6 py-4 rounded-3xl bg-black/60 border border-white/20 text-white/90">
                {isEn && heroSubtitleEn ? heroSubtitleEn : heroSubtitle}
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <LangLink to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-semibold rounded-full group">
                  {t('template.getQuote')}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </LangLink>
              <a href="tel:+8617674048404">
                <Button variant="outline" className="border-accent/30 hover:border-accent text-foreground px-8 py-6 text-lg font-semibold rounded-full">
                  <Phone className="w-5 h-5 mr-2" />
                  {t('template.callNow')}
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
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        {stats && stats.length > 0 && (
          <section className="py-20 bg-secondary relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.05),transparent_70%)]" />
            <div className="container-custom relative">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
              >
                {stats.map((stat, index) => (
                  <motion.div key={index} variants={itemVariants} className="text-center">
                    <div className="text-4xl md:text-5xl font-black text-accent mb-2">{stat.value}</div>
                    <div className="text-lg font-semibold text-foreground mb-1">
                      {isEn && stat.titleEn ? stat.titleEn : stat.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {isEn && stat.descriptionEn ? stat.descriptionEn : stat.description}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                {t('template.whyChooseUs')}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
                {isEn ? featuresTitleEn : featuresTitle}
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
                    className="group p-8 rounded-2xl bg-card border border-accent/10 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="font-bold text-xl text-foreground mb-3 group-hover:text-accent transition-colors">
                      {isEn && feature.titleEn ? feature.titleEn : feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {isEn && feature.descriptionEn ? feature.descriptionEn : feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-24 bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.05),transparent_50%)]" />
          <div className="container-custom relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                {t('template.productLineup')}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
                {isEn ? productsTitleEn : productsTitle}
              </h2>
              {(productsSubtitle || productsSubtitleEn) && (
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  {isEn && productsSubtitleEn ? productsSubtitleEn : productsSubtitle}
                </p>
              )}
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`grid grid-cols-1 ${products.length <= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}
            >
              {products.map((product, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group"
                >
                  <div className="relative rounded-2xl overflow-hidden bg-card border border-accent/10 hover:border-accent/30 transition-all duration-500">
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={isEn && product.nameEn ? product.nameEn : product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                        {isEn && product.nameEn ? product.nameEn : product.name}
                      </h3>
                      <p className="text-muted-foreground mb-5 line-clamp-2">
                        {isEn && product.descriptionEn ? product.descriptionEn : product.description}
                      </p>

                      {/* Specs */}
                      <div className="space-y-2 mb-6 p-4 rounded-xl bg-secondary/50">
                        {(isEn && product.specsEn ? product.specsEn : product.specs).map((spec, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                            <span className="text-foreground/80">{spec}</span>
                          </div>
                        ))}
                      </div>

                      {product.link ? (
                        <Link to={product.link}>
                          <Button className="w-full bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground font-semibold group/btn">
                            {t('template.learnMore')}
                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      ) : (
                        <Button className="w-full bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground font-semibold group/btn">
                          {t('template.learnMore')}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Cases Section */}
        {cases && cases.length > 0 && (
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
                  {t('template.caseStudies')}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
                  {t('template.successCases')}
                </h2>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {cases.map((caseItem, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group rounded-2xl overflow-hidden bg-card border border-accent/10 hover:border-accent/30 transition-all duration-500"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={caseItem.image}
                        alt={isEn && caseItem.titleEn ? caseItem.titleEn : caseItem.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">
                        {isEn && caseItem.titleEn ? caseItem.titleEn : caseItem.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {isEn && caseItem.descriptionEn ? caseItem.descriptionEn : caseItem.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* Applications Section */}
        {applications && applications.length > 0 && (
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
                  {t('template.useCases')}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
                  {isEn ? applicationsTitleEn : applicationsTitle}
                </h2>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {applications.map((app, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group p-6 rounded-2xl bg-card border border-accent/10 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2"
                  >
                    <h3 className="font-bold text-lg text-foreground mb-3 group-hover:text-accent transition-colors">
                      {isEn && app.titleEn ? app.titleEn : app.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {isEn && app.descriptionEn ? app.descriptionEn : app.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-accent/10 via-background to-cyan-500/10 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="container-custom relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6">
                {t('template.readyToStart')}
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                {t('template.readyToStartDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg font-semibold rounded-full group">
                    <Mail className="w-5 h-5 mr-2" />
                    {t('template.contactUs')}
                  </Button>
                </Link>
                <a href="tel:+8617674048404">
                  <Button variant="outline" className="border-accent/30 hover:border-accent text-foreground px-10 py-6 text-lg font-semibold rounded-full">
                    <Phone className="w-5 h-5 mr-2" />
                    17674048404
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default ProductPageTemplate;
