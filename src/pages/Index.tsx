import { Header } from "@/components/Header";
import { SEOTextContent } from "@/components/SEOTextContent";
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
import { AIAssistant } from "@/components/AIAssistant";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { language } = useLanguage();

  const homeStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: language === 'zh' ? '长凌科技有限公司' : 'CANI Technology Co., Ltd.',
    alternateName: 'CANI',
    url: 'https://www.cani.com',
    logo: 'https://www.cani.com/logo.png',
    description: language === 'zh' 
      ? '专业无人机配件供应商，提供数字图传、VTX视频发射器、飞控电调、云台吊舱等无人机配件'
      : 'Professional drone accessories supplier, providing digital FPV, VTX video transmitters, flight controllers, gimbals and other drone accessories',
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
          ? "长凌科技有限公司，专注于工业无人机零配件，提供数字图传、VTX视频发射器、飞控电调、云台吊舱、ELRS遥控等专业无人机配件。"
          : "CANI Technology Co., Ltd., focusing on industrial drone accessories, providing digital FPV, VTX video transmitters, flight controllers, gimbals, ELRS remote controls and other professional drone accessories."}
        keywords={language === 'zh' 
          ? "无人机配件,数字图传,VTX视频发射器,飞控电调,云台吊舱,ELRS遥控,长凌,CANI"
          : "drone accessories,digital FPV,VTX video transmitter,flight controller,gimbal,ELRS,CANI"}
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
        <FAQSection category="general" limit={4} />
        <CTASection />
        <SEOTextContent page="home" />
      </main>
      <Footer />
      <FloatingContact />
      <AIAssistant />
    </div>
  );
};

export default Index;
