import { Header } from "@/components/Header";

import { FAQSection } from "@/components/FAQSection";
import { AEOFAQSection } from "@/components/AEOFAQSection";
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
import { ScrollReveal, ParallaxSection } from "@/components/ScrollAnimations";

const Index = () => {
  const { t, language } = useLanguage();

  const isZh = language === 'zh';

  // Consolidated FAQ data for single FAQPage schema
  const allFaqItems = [
    // AEO FAQ items
    { q: t('aeo.faq.q1'), a: t('aeo.faq.a1') },
    { q: t('aeo.faq.q2'), a: t('aeo.faq.a2') },
    { q: t('aeo.faq.q3'), a: t('aeo.faq.a3.aeo') || t('aeo.faq.a3') },
    { q: t('aeo.faq.q4'), a: t('aeo.faq.a4') },
    { q: t('aeo.faq.q5'), a: t('aeo.faq.a5') },
    // General FAQ items
    { q: t('faq.general.q1'), a: t('faq.general.a1') },
    { q: t('faq.general.q2'), a: t('faq.general.a2') },
    { q: t('faq.general.q3'), a: t('faq.general.a3') },
    { q: t('faq.general.q4'), a: t('faq.general.a4') },
    // Products FAQ items
    { q: t('faq.products.q1'), a: t('faq.products.a1') },
    { q: t('faq.products.q2'), a: t('faq.products.a2') },
    { q: t('faq.products.q3'), a: t('faq.products.a3') },
    { q: t('faq.products.q4'), a: t('faq.products.a4') },
  ];

  // Organization + WebSite + BreadcrumbList + single FAQPage consolidated @graph
  const homeStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: isZh ? '长凌科技' : 'CANI Technology',
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
          email: 'market@caniuav.com',
          contactType: t('home.structured.contactType'),
          availableLanguage: t('home.structured.availableLanguage'),
        },
        sameAs: [
          'https://linkedin.com/company/caniuav',
          'https://wa.me/84123456789',
        ],
        numberOfEmployees: { '@type': 'QuantitativeValue', value: '200+' },
        foundingDate: '2015',
        knowsAbout: [
          'Industrial UAV Components',
          '37W High-Power VTX',
          'Digital Video Link',
          'AI Guidance Module',
          'Power Inspection Drone',
        ],
      },
      {
        '@type': 'WebSite',
        name: isZh ? '长凌科技' : 'CANI Technology',
        alternateName: 'CANI',
        url: 'https://www.caniuav.com',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://www.caniuav.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.caniuav.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: isZh ? '工业无人机配件' : 'Industrial UAV Components',
            item: 'https://www.caniuav.com/products',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: isZh ? '数字图传' : 'Digital Video Link',
            item: 'https://www.caniuav.com/products/accessories/vtx',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: allFaqItems.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
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
        <ScrollReveal direction="up" delay={0.1}>
          <section className="py-12 bg-background">
            <div className="container-custom">
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto text-center">
                {t('home.seoIntro')}
              </p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0}>
          <ParallaxSection speed={0.2}>
            <ProductsSection />
          </ParallaxSection>
        </ScrollReveal>

        <ScrollReveal direction="left" delay={0.1}>
          <CompanyIntroSection />
        </ScrollReveal>
        
        {/* Brand Summary */}
        <ScrollReveal direction="up" delay={0}>
          <section className="py-12 bg-secondary">
            <div className="container-custom">
              <p className="text-base text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                {t('home.brandSummary')}
              </p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.1}>
          <ParallaxSection speed={0.15}>
            <WhyChooseUsSection />
          </ParallaxSection>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0}>
          <SolutionsSection />
        </ScrollReveal>

        <ScrollReveal direction="left" delay={0.1}>
          <ParallaxSection speed={0.2}>
            <ApplicationsSection />
          </ParallaxSection>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0}>
          <NewsSection />
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.1}>
          <PartnersSection />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0}>
          <ParallaxSection speed={0.15}>
            <CertificationsSection />
          </ParallaxSection>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <AEOFAQSection />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0}>
          <FAQSection category="general" limit={6} />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0}>
          <FAQSection category="products" limit={4} showTitle={false} />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <CTASection />
        </ScrollReveal>
        
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Index;
