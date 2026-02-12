import { Header } from "@/components/Header";

import { FAQSection } from "@/components/FAQSection";
import { HeroSection } from "@/components/HeroSection";
import { ProductsSection } from "@/components/ProductsSection";
import { CompanyIntroSection } from "@/components/CompanyIntroSection";
import { ApplicationsSection } from "@/components/ApplicationsSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { SolutionsSection } from "@/components/SolutionsSection";
import { CTASection } from "@/components/CTASection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { NewsSection } from "@/components/NewsSection";
import { PartnersSection } from "@/components/PartnersSection";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  const homeStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: t('home.structured.name'),
    alternateName: 'CANI',
    url: 'https://www.caniuav.com',
    logo: 'https://www.caniuav.com/logo.png',
    description: t('home.structured.description'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: t('home.structured.addressLocality'),
      addressRegion: t('home.structured.addressRegion'),
      addressCountry: 'CN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+86-17674048404',
      contactType: t('home.structured.contactType'),
      availableLanguage: t('home.structured.availableLanguage'),
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={t('home.seo.title')}
        description={t('home.seo.description')}
        keywords={t('home.seo.keywords')}
        path="/"
        structuredData={homeStructuredData}
      />
      <Header />
      <main>
        <HeroSection />
        
        {/* SEO Intro Text */}
        <section className="py-12 bg-background">
          <div className="container-custom">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto text-center">
              {t('home.seoIntro')}
            </p>
          </div>
        </section>

        <ProductsSection />
        <CompanyIntroSection />
        
        {/* Brand Summary */}
        <section className="py-12 bg-secondary">
          <div className="container-custom">
            <p className="text-base text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              {t('home.brandSummary')}
            </p>
          </div>
        </section>

        <WhyChooseUsSection />
        <SolutionsSection />
        <ApplicationsSection />
        <NewsSection />
        <PartnersSection />
        <CertificationsSection />
        <FAQSection category="general" limit={6} />
        <FAQSection category="products" limit={4} showTitle={false} />
        <CTASection />
        
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Index;
