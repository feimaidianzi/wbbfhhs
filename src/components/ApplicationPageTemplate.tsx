import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Mail, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

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

interface ApplicationPageTemplateProps {
  // SEO
  seoTitle: string;
  seoDescription: string;
  seoKeywords?: string;

  // Hero Section
  heroTitle: string;
  heroSubtitle?: string;
  heroDescription: string;
  heroImage: string;
  heroStats?: { value: string; label: string }[];

  // Introduction Section
  introTitle?: string;
  introDescription?: string;
  introImage?: string;
  introPoints?: string[];

  // Advantages Section
  advantages?: Advantage[];
  advantagesTitle?: string;

  // Features Section
  features: Feature[];
  featuresTitle?: string;

  // Scenarios Section
  scenarios: Scenario[];
  scenariosTitle?: string;

  // Products Section (optional)
  products?: Product[];
  productsTitle?: string;

  // CTA Section
  ctaTitle: string;
  ctaDescription?: string;
  ctaProductLink?: string;
}

const ApplicationPageTemplate = ({
  seoTitle,
  seoDescription,
  seoKeywords,
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
  advantagesTitle = "核心优势",
  features,
  featuresTitle = "技术特点",
  scenarios,
  scenariosTitle = "应用场景",
  products,
  productsTitle = "产品系列",
  ctaTitle,
  ctaDescription,
  ctaProductLink,
}: ApplicationPageTemplateProps) => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
      />
      <Header />
      <FloatingContact />

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
              {heroSubtitle && (
                <p className="text-accent font-medium mb-3 text-lg">{heroSubtitle}</p>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {heroTitle}
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
                {heroDescription}
              </p>

              {heroStats && heroStats.length > 0 && (
                <div className="flex flex-wrap gap-6 mb-8">
                  {heroStats.map((stat, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl">
                      <div className="text-2xl font-bold text-accent">{stat.value}</div>
                      <div className="text-white/80 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-accent text-white hover:bg-accent/90 font-bold shadow-lg group">
                    咨询方案
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" className="bg-white/95 text-primary hover:bg-white font-bold shadow-lg">
                  <Phone className="mr-2 h-4 w-4" />
                  电话咨询
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        {(introTitle || introDescription || introImage) && (
          <section className="py-20 bg-background">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {introTitle || `${heroTitle}概述`}
                </h2>
                {introDescription && (
                  <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                    {introDescription}
                  </p>
                )}
              </div>

              {(introImage || introPoints) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {introImage && (
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src={introImage}
                        alt={introTitle || heroTitle}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                  {introPoints && (
                    <div className="space-y-4">
                      {introPoints.map((point, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="h-4 w-4 text-primary" />
                          </div>
                          <p className="text-foreground">{point}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Advantages Section */}
        {advantages && advantages.length > 0 && (
          <section className="py-20 bg-muted">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {advantagesTitle}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {advantages.map((item, index) => (
                  <div
                    key={index}
                    className="bg-card p-8 rounded-xl shadow-card hover:shadow-card-hover transition-all group text-center"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    {item.value && (
                      <div className="text-3xl font-bold text-primary mb-2">{item.value}</div>
                    )}
                    <h3 className="text-lg font-bold text-card-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className={`py-20 ${advantages && advantages.length > 0 ? 'bg-background' : 'bg-muted'}`}>
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {featuresTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scenarios Section */}
        <section className="py-20 bg-muted">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {scenariosTitle}
              </h2>
            </div>

            {scenarios.some(s => s.detailDescription) ? (
              // Detailed scenario layout
              <div className="space-y-12">
                {scenarios.map((scenario, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                  >
                    <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                        <img
                          src={scenario.image}
                          alt={scenario.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="flex items-center gap-3 mb-4">
                        {scenario.icon && (
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <scenario.icon className="h-6 w-6 text-primary" />
                          </div>
                        )}
                        <h3 className="text-2xl font-bold text-foreground">{scenario.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {scenario.detailDescription || scenario.description}
                      </p>
                      {scenario.highlights && (
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          {scenario.highlights.map((highlight, i) => (
                            <div key={i} className="text-center p-3 bg-card rounded-lg shadow-sm">
                              <div className="text-lg font-bold text-primary">{highlight.value}</div>
                              <div className="text-xs text-muted-foreground">{highlight.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      {scenario.features && (
                        <div className="flex flex-wrap gap-2">
                          {scenario.features.map((feature, i) => (
                            <span key={i} className="text-sm bg-primary/10 text-primary px-4 py-2 rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Simple card layout
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {scenarios.map((scenario, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={scenario.image}
                        alt={scenario.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-card-foreground mb-3">{scenario.title}</h3>
                      <p className="text-muted-foreground text-sm">{scenario.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Products Section */}
        {products && products.length > 0 && (
          <section className="py-20 bg-background">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {productsTitle}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all group"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-card-foreground">{product.model}</h3>
                    </div>
                    {(product.payload || product.range) && (
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {product.payload && (
                          <div className="text-center p-3 bg-muted rounded-lg">
                            <div className="text-lg font-bold text-primary">{product.payload}</div>
                            <div className="text-xs text-muted-foreground">载荷</div>
                          </div>
                        )}
                        {product.range && (
                          <div className="text-center p-3 bg-muted rounded-lg">
                            <div className="text-lg font-bold text-primary">{product.range}</div>
                            <div className="text-xs text-muted-foreground">航程/高度</div>
                          </div>
                        )}
                      </div>
                    )}
                    <p className="text-muted-foreground text-sm text-center mb-6">
                      {product.description}
                    </p>
                    <Link to={product.link}>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        了解详情
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{ctaTitle}</h2>
            {ctaDescription && (
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">{ctaDescription}</p>
            )}
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-accent text-white hover:bg-accent/90 font-bold shadow-lg group">
                  <Mail className="mr-2 h-4 w-4" />
                  立即咨询
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              {ctaProductLink && (
                <Link to={ctaProductLink}>
                  <Button size="lg" className="bg-white/95 text-primary hover:bg-white font-bold shadow-lg">
                    查看产品
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ApplicationPageTemplate;
