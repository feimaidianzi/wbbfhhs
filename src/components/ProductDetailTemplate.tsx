import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Mail, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";

interface Spec {
  label: string;
  labelEn?: string;
  value: string;
  valueEn?: string;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
}

interface ProductDetailTemplateProps {
  // SEO
  seoTitle: string;
  seoTitleEn?: string;
  seoDescription: string;
  seoDescriptionEn?: string;
  seoKeywords?: string;
  
  // Breadcrumb
  breadcrumbs: { label: string; labelEn?: string; path?: string }[];
  
  // Hero Section
  heroTitle: string;
  heroTitleEn?: string;
  heroDescription: string;
  heroDescriptionEn?: string;
  heroImage: string;
  heroHighlight?: { value: string; label: string; labelEn?: string };
  backLink: { label: string; labelEn?: string; path: string };
  
  // Features Section
  features: Feature[];
  featuresTitle?: string;
  featuresTitleEn?: string;
  
  // Specs Section
  specs: Spec[];
  specsTitle?: string;
  specsTitleEn?: string;
  
  // Applications Section
  applications: string[] | { zh: string; en: string }[];
  applicationsTitle?: string;
  applicationsTitleEn?: string;
  
  // CTA Section
  ctaTitle: string;
  ctaTitleEn?: string;
  ctaDescription?: string;
  ctaDescriptionEn?: string;
}

const ProductDetailTemplate = ({
  seoTitle,
  seoTitleEn,
  seoDescription,
  seoDescriptionEn,
  seoKeywords,
  breadcrumbs,
  heroTitle,
  heroTitleEn,
  heroDescription,
  heroDescriptionEn,
  heroImage,
  heroHighlight,
  backLink,
  features,
  featuresTitle = "核心优势",
  featuresTitleEn = "Key Features",
  specs,
  specsTitle = "技术参数",
  specsTitleEn = "Specifications",
  applications,
  applicationsTitle = "应用场景",
  applicationsTitleEn = "Applications",
  ctaTitle,
  ctaTitleEn,
  ctaDescription,
  ctaDescriptionEn,
}: ProductDetailTemplateProps) => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const getAppText = (app: string | { zh: string; en: string }) => {
    if (typeof app === 'string') return app;
    return isEn ? app.en : app.zh;
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={isEn && seoTitleEn ? seoTitleEn : seoTitle}
        description={isEn && seoDescriptionEn ? seoDescriptionEn : seoDescription}
        keywords={seoKeywords}
      />
      <Header />
      <FloatingContact />
      <BackButton to={backLink.path} label={isEn && backLink.labelEn ? backLink.labelEn : backLink.label} />
      <main>
        {/* Hero Section */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
          </div>
          <div className="container-custom relative z-10 h-full flex items-center">
            <div className="max-w-2xl text-white">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-white/80 mb-6">
                {breadcrumbs.map((item, index) => (
                  <span key={index} className="flex items-center gap-2">
                    {item.path ? (
                      <Link to={item.path} className="hover:text-white transition-colors">
                        {isEn && item.labelEn ? item.labelEn : item.label}
                      </Link>
                    ) : (
                      <span className="text-white">{isEn && item.labelEn ? item.labelEn : item.label}</span>
                    )}
                    {index < breadcrumbs.length - 1 && <span>/</span>}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {isEn && heroTitleEn ? heroTitleEn : heroTitle}
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
                {isEn && heroDescriptionEn ? heroDescriptionEn : heroDescription}
              </p>
              
              {heroHighlight && (
                <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl mb-8">
                  <div className="text-3xl font-bold text-accent">{heroHighlight.value}</div>
                  <div className="text-white/80">{isEn && heroHighlight.labelEn ? heroHighlight.labelEn : heroHighlight.label}</div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-accent text-white hover:bg-accent/90 font-bold shadow-lg group">
                    {isEn ? 'Get Quote' : '获取报价'}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" className="bg-white/95 text-primary hover:bg-white font-bold shadow-lg">
                  <Phone className="mr-2 h-4 w-4" />
                  {isEn ? 'Call Us' : '电话咨询'}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {isEn ? featuresTitleEn : featuresTitle}
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
                    {isEn && feature.titleEn ? feature.titleEn : feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {isEn && feature.descriptionEn ? feature.descriptionEn : feature.description}
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
                {isEn ? specsTitleEn : specsTitle}
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
                        {isEn && spec.labelEn ? spec.labelEn : spec.label}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground border-b border-border/30">
                        {isEn && spec.valueEn ? spec.valueEn : spec.value}
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
                {isEn ? applicationsTitleEn : applicationsTitle}
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
                  <span className="font-medium text-foreground">{getAppText(app)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {isEn && ctaTitleEn ? ctaTitleEn : ctaTitle}
            </h2>
            {(ctaDescription || ctaDescriptionEn) && (
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                {isEn && ctaDescriptionEn ? ctaDescriptionEn : ctaDescription}
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-accent text-white hover:bg-accent/90 font-bold shadow-lg group">
                  <Mail className="mr-2 h-4 w-4" />
                  {isEn ? 'Contact Us' : '立即咨询'}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" className="bg-white/95 text-primary hover:bg-white font-bold shadow-lg">
                <Phone className="mr-2 h-4 w-4" />
                400-888-8888
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailTemplate;
