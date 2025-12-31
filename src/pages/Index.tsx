import { Header } from "@/components/Header";
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
import { SEO } from "@/components/SEO";

const Index = () => {
  const homeStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '晓鸟科技有限公司',
    alternateName: '晓鸟科技',
    url: 'https://www.xiaoniao.com',
    logo: 'https://www.xiaoniao.com/logo.png',
    description: '专业工业无人机研发制造商，提供系留无人机、物流无人机、无人机机场等产品及解决方案',
    address: {
      '@type': 'PostalAddress',
      addressLocality: '邵阳',
      addressRegion: '湖南',
      addressCountry: 'CN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+86-17674048404',
      contactType: 'customer service',
      availableLanguage: 'Chinese',
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="首页"
        description="晓鸟科技有限公司，专注于工业无人机研发制造，提供系留无人机、物流无人机、无人机机场、集群无人机等产品及行业解决方案。"
        keywords="无人机,工业无人机,系留无人机,物流无人机,无人机机场,集群无人机,晓鸟科技"
        url="/"
        structuredData={homeStructuredData}
      />
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <CompanyIntroSection />
        <WhyChooseUsSection />
        <SolutionsSection />
        <ApplicationsSection />
        <NewsSection />
        <PartnersSection />
        <CertificationsSection />
        <CTASection />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Index;