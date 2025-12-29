import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProductsSection } from "@/components/ProductsSection";
import { CompanyIntroSection } from "@/components/CompanyIntroSection";
import { ApplicationsSection } from "@/components/ApplicationsSection";
import { NewsSection } from "@/components/NewsSection";
import { PartnersSection } from "@/components/PartnersSection";
import { CitiesSection } from "@/components/CitiesSection";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <CompanyIntroSection />
        <ApplicationsSection />
        <NewsSection />
        <PartnersSection />
        <CitiesSection />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Index;
