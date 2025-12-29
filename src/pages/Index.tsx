import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProductsSection } from "@/components/ProductsSection";
import { CompanyIntroSection } from "@/components/CompanyIntroSection";
import { ApplicationsSection } from "@/components/ApplicationsSection";
import { NewsSection } from "@/components/NewsSection";
import { PartnersSection } from "@/components/PartnersSection";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { SEO } from "@/components/SEO";

const Index = () => {
  const homeStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '长凌电子科技有限公司',
    alternateName: '长凌电子',
    url: 'https://www.changling.com',
    logo: 'https://www.changling.com/logo.png',
    description: '专业工业无人机研发制造商，提供系留无人机、物流无人机、无人机机场等产品及解决方案',
    address: {
      '@type': 'PostalAddress',
      addressLocality: '武汉',
      addressRegion: '湖北',
      addressCountry: 'CN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+86-18771937458',
      contactType: 'customer service',
      availableLanguage: 'Chinese',
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="首页"
        description="长凌电子科技有限公司，专注于工业无人机研发制造，提供系留无人机、物流无人机、无人机机场、集群无人机等产品及行业解决方案。"
        keywords="无人机,工业无人机,系留无人机,物流无人机,无人机机场,集群无人机,长凌电子"
        url="/"
        structuredData={homeStructuredData}
      />
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <CompanyIntroSection />
        <ApplicationsSection />
        <NewsSection />
        <PartnersSection />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Index;
