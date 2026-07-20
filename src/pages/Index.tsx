import React, { lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProductsSection } from "@/components/ProductsSection";
import { CompanyIntroSection } from "@/components/CompanyIntroSection";
import { Footer } from "@/components/Footer";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { DeferredMount } from "@/components/DeferredMount";

// Defer heavy framer-motion wrappers and floating contact (not LCP-critical)
const FloatingContact = lazy(() => import("@/components/FloatingContact").then(m => ({ default: m.FloatingContact })));
const ScrollReveal = lazy(() => import("@/components/ScrollAnimations").then(m => ({ default: m.ScrollReveal })));
const ParallaxSection = lazy(() => import("@/components/ScrollAnimations").then(m => ({ default: m.ParallaxSection })));

// Lazy-load below-fold sections — not needed for LCP
const FAQSection = lazy(() => import("@/components/FAQSection").then(m => ({ default: m.FAQSection })));
const AEOFAQSection = lazy(() => import("@/components/AEOFAQSection").then(m => ({ default: m.AEOFAQSection })));
const ApplicationsSection = lazy(() => import("@/components/ApplicationsSection").then(m => ({ default: m.ApplicationsSection })));
const WhyChooseUsSection = lazy(() => import("@/components/WhyChooseUsSection").then(m => ({ default: m.WhyChooseUsSection })));
const SolutionsSection = lazy(() => import("@/components/SolutionsSection").then(m => ({ default: m.SolutionsSection })));
const CTASection = lazy(() => import("@/components/CTASection").then(m => ({ default: m.CTASection })));
const CertificationsSection = lazy(() => import("@/components/CertificationsSection").then(m => ({ default: m.CertificationsSection })));
const NewsSection = lazy(() => import("@/components/NewsSection").then(m => ({ default: m.NewsSection })));
const PartnersSection = lazy(() => import("@/components/PartnersSection").then(m => ({ default: m.PartnersSection })));

const Index = () => {
  const { t } = useLanguage();

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
        name: t('acc.cameradetail.k454'),
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
          email: 'so_0307@qq.com',
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
          'Industrial UAV Platforms',
          'Swarm Drone Systems',
          'Tethered UAV Systems',
          'Logistics Delivery Drones',
          'Multi-Rotor Industrial Drones',
          'FPV Mission Drones',
          'Power Inspection UAV',
          'Emergency Response UAV',
        ],
      },
      {
        '@type': 'WebSite',
        name: t('acc.cameradetail.k454'),
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
        
        {/* SEO Intro Text — direct render, no framer-motion to protect LCP */}
        <section className="py-12 bg-background">
          <div className="container-custom">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto text-center">
              {t('home.seoIntro')}
            </p>
          </div>
        </section>

        {/* Products — direct render (above-fold on most viewports) */}
        <ProductsSection />

        {/* Company intro — direct render */}
        <CompanyIntroSection />
        
        {/* Brand Summary — direct render */}
        <section className="py-12 bg-secondary">
          <div className="container-custom">
            <p className="text-base text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              {t('home.brandSummary')}
            </p>
          </div>
        </section>

        {/* Mid-page sections — mount only when scrolling near them (IntersectionObserver) */}
        <DeferredMount whenVisible rootMargin="800px" minHeight={600}>
          <Suspense fallback={null}>
            <ScrollReveal direction="right" delay={0.1}>
              <WhyChooseUsSection />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0}>
              <SolutionsSection />
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.1}>
              <ApplicationsSection />
            </ScrollReveal>
          </Suspense>
        </DeferredMount>

        {/* Below-fold sections — mount only when nearing viewport */}
        <DeferredMount whenVisible rootMargin="600px" minHeight={800}>
          <Suspense fallback={null}>
            <ScrollReveal direction="up" delay={0}>
              <NewsSection />
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <PartnersSection />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0}>
              <CertificationsSection />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <AEOFAQSection includeSchema={false} />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0}>
              <FAQSection category="general" limit={6} includeSchema={false} />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0}>
              <FAQSection category="products" limit={4} showTitle={false} includeSchema={false} />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <CTASection />
            </ScrollReveal>
          </Suspense>
        </DeferredMount>
        
      </main>
      <Footer />
      {/* Floating contact — mount on first interaction or after 5s idle */}
      <DeferredMount delay={5000} onInteraction>
        <Suspense fallback={null}>
          <FloatingContact />
        </Suspense>
      </DeferredMount>
    </div>
  );
};

export default Index;
