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
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { language } = useLanguage();

  const homeStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: language === 'zh' ? '飞迈科技有限公司' : 'FlyMind Technology Co., Ltd.',
    alternateName: 'FlyMind',
    url: 'https://www.flymind.com',
    logo: 'https://www.flymind.com/logo.png',
    description: language === 'zh' 
      ? '专业工业无人机研发制造商，提供系留无人机、物流无人机、无人机机场等产品及解决方案'
      : 'Professional industrial drone R&D manufacturer, providing tethered drones, logistics drones, drone airports and other products and solutions',
    address: {
      '@type': 'PostalAddress',
      addressLocality: language === 'zh' ? '长沙' : 'Changsha',
      addressRegion: language === 'zh' ? '湖南' : 'Hunan',
      addressCountry: 'CN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+86-17674048404',
      contactType: 'customer service',
      availableLanguage: language === 'zh' ? 'Chinese' : 'English',
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={language === 'zh' ? "首页" : "Home"}
        description={language === 'zh' 
          ? "飞迈科技有限公司，专注于工业无人机研发制造，提供系留无人机、物流无人机、无人机机场、集群无人机等产品及行业解决方案。"
          : "FlyMind Technology Co., Ltd., focusing on industrial drone R&D and manufacturing, providing tethered drones, logistics drones, drone airports, swarm drones and industry solutions."}
        keywords={language === 'zh' 
          ? "无人机,工业无人机,系留无人机,物流无人机,无人机机场,集群无人机,飞迈,FlyMind"
          : "drone,industrial drone,tethered drone,logistics drone,drone airport,swarm drone,FlyMind"}
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
