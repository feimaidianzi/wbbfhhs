import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Mail, LucideIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { LangLink, LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO, createLocalizedProductSchema } from "@/components/MultiLanguageSEO";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "@/lib/helmet-shim";
import { LanguageCode } from "@/i18n/languages";
import { getDomainForLanguage, getHtmlLang, createLocalizedBreadcrumb } from "@/utils/seoConfig";

interface Spec {
  label: string;
  value: string;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface RelatedLink {
  label: string;
  path: string;
  description?: string;
}

interface ProductDetailTemplateProps {
  // SEO
  seoTitle: string;
  seoDescription: string;
  seoKeywords?: string;
  
  // Breadcrumb
  breadcrumbs: { label: string; path?: string }[];
  
  // Hero Section
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  heroHighlight?: { value: string; label: string };
  backLink: { label: string; path: string };
  
  // Features Section
  features: Feature[];
  featuresTitle?: string;
  
  // Specs Section
  specs: Spec[];
  specsTitle?: string;
  
  // Applications Section
  applications: string[];
  applicationsTitle?: string;
  
  // CTA Section
  ctaTitle: string;
  ctaDescription?: string;
  
  // Optional product metadata for structured data
  productSku?: string;
  productCategory?: string;
  productPrice?: number;

  // Related products/applications for internal linking
  relatedProducts?: RelatedLink[];
  relatedApplications?: RelatedLink[];
}

const ProductDetailTemplate = ({
  seoTitle,
  seoDescription,
  seoKeywords,
  breadcrumbs,
  heroTitle,
  heroDescription,
  heroImage,
  heroHighlight,
  backLink,
  features,
  featuresTitle,
  specs,
  specsTitle,
  applications,
  applicationsTitle,
  ctaTitle,
  ctaDescription,
  productSku,
  productCategory,
  productPrice,
  relatedProducts,
  relatedApplications,
}: ProductDetailTemplateProps) => {
  const { language, baseLang, t } = useLanguage();
  const location = useLocation();
  const langCode = language as LanguageCode;

  const displayFeaturesTitle = featuresTitle || t('template.keyFeatures');
  const displaySpecsTitle = specsTitle || t('template.specifications');
  const displayApplicationsTitle = applicationsTitle || t('template.applications');

  // Create product structured data
  const currentDomain = getDomainForLanguage(langCode);
  const productUrl = `${currentDomain}${location.pathname}`;
  const productImage = heroImage.startsWith('http') ? heroImage : `${currentDomain}${heroImage}`;

  const productStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: heroTitle,
    description: seoDescription,
    image: productImage,
    url: productUrl,
    sku: productSku || location.pathname.split('/').pop(),
    brand: {
      '@type': 'Brand',
      name: 'CANI',
    },
    category: productCategory || breadcrumbs[breadcrumbs.length - 2]?.label || 'Industrial Drone',
    manufacturer: {
      '@type': 'Organization',
      name: t('template.companyNameFull'),
      url: currentDomain,
    },
    offers: productPrice ? {
      '@type': 'Offer',
      priceCurrency: 'CNY',
      price: productPrice,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: t('template.companyName'),
      },
    } : {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: t('template.companyName'),
      },
    },
    additionalProperty: specs.map(spec => ({
      '@type': 'PropertyValue',
      name: spec.label,
      value: spec.value,
    })),
    inLanguage: getHtmlLang(langCode),
  };

  // Create breadcrumb structured data
  const breadcrumbData = createLocalizedBreadcrumb(
    breadcrumbs.map(b => ({
      name: b.label,
      url: b.path || '',
    })),
    langCode
  );

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        path={location.pathname}
      />
      {/* Product JSON-LD Structured Data */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(productStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>
      <Header />
      <FloatingContact />
      <BackButton to={backLink.path} label={backLink.label} />
      <main>
        {/* Hero Section */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="container-custom relative z-10 h-full flex items-center">
            <div className="max-w-2xl">
              <div className="rounded-3xl bg-black/70 border border-white/20 p-6 md:p-8">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
                {breadcrumbs.map((item, index) => (
                  <span key={index} className="flex items-center gap-2">
                    {item.path ? (
                      <Link to={item.path} className="hover:text-white transition-colors">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-white">{item.label}</span>
                    )}
                    {index < breadcrumbs.length - 1 && <span>/</span>}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                {heroTitle}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                {heroDescription}
              </p>
              
              {heroHighlight && (
                <div className="inline-flex items-center gap-4 bg-background/60 backdrop-blur-md px-6 py-3 rounded-xl mb-8 border border-border">
                  <div className="text-3xl font-bold text-foreground">{heroHighlight.value}</div>
                  <div className="text-muted-foreground">{heroHighlight.label}</div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4">
                <LangLink to="/contact">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-lg group">
                    {t('template.getQuote')}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </LangLink>
                <Button size="lg" className="bg-white/95 text-primary hover:bg-white font-bold shadow-lg">
                  <Phone className="mr-2 h-4 w-4" />
                  {t('template.callUs')}
                </Button>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* E-E-A-T Trust Badges */}
        <section className="py-8 bg-background border-b border-border/30">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                {t('product.trust.highTech')}
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                {t('product.trust.iso')}
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                {t('product.trust.experience')}
              </span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {displayFeaturesTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specs Section */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {displaySpecsTitle}
              </h2>
            </div>

            <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-card overflow-hidden">
              <table className="w-full">
                <tbody>
                  {specs.map((spec, index) => (
                    <tr 
                      key={index} 
                      className={`${index % 2 === 0 ? 'bg-muted/50' : 'bg-card'} hover:bg-primary/5 transition-colors`}
                    >
                      <td className="px-6 py-4 font-medium text-foreground border-b border-border/30 w-1/3">
                        {spec.label}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground border-b border-border/30">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="py-20 bg-muted">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {displayApplicationsTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {applications.map((app, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 bg-card p-5 rounded-xl shadow-card hover:shadow-card-hover transition-all"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{app}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

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

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {ctaTitle}
            </h2>
            {ctaDescription && (
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                {ctaDescription}
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-4">
              <LangLink to="/contact">
                <Button size="lg" className="bg-accent text-white hover:bg-accent/90 font-bold shadow-lg group">
                  <Mail className="mr-2 h-4 w-4" />
                  {t('template.contactUs')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </LangLink>
              <a href="mailto:so_0307@qq.com">
                <Button size="lg" className="bg-white/95 text-primary hover:bg-white font-bold shadow-lg">
                  <Mail className="mr-2 h-4 w-4" />
                  so_0307@qq.com
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailTemplate;
