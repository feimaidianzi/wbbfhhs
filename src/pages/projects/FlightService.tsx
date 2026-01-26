import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, Zap, Droplet, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const FlightService = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const services = [
    { icon: Camera, title: isEn ? "Aerial Mapping" : t('flightService.services.aerialMapping'), description: isEn ? "High-precision aerial & 3D modeling" : t('flightService.services.aerialMappingDesc') },
    { icon: Zap, title: isEn ? "Power Inspection" : t('flightService.services.powerInspection'), description: isEn ? "Transmission line inspection" : t('flightService.services.powerInspectionDesc') },
    { icon: Droplet, title: isEn ? "Agricultural Spraying" : t('flightService.services.agriculturalSpraying'), description: isEn ? "Crop spraying services" : t('flightService.services.agriculturalSprayingDesc') },
    { icon: Map, title: isEn ? "Emergency Rescue" : t('flightService.services.emergencyRescue'), description: isEn ? "Search & rescue, cargo delivery" : t('flightService.services.emergencyRescueDesc') },
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title={isEn ? "Flight Services" : t('flightService.title')} 
        description={isEn ? "CANI Technology professional drone flight operation services." : t('flightService.seoDescription')} 
        keywords={isEn ? "drone flight service,aerial photography,power inspection,crop spraying" : t('flightService.seoKeywords')} 
        url="/projects/flight-service" 
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80)" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {isEn ? "Flight Services" : t('flightService.title')}
              </h1>
              <p className="text-lg text-primary-foreground/90 mb-8">
                {isEn ? "Professional Flight Operations, Efficient Mission Completion" : t('flightService.subtitle')}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {isEn ? "Book Service" : t('flightService.bookService')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((s, i) => (
                <div key={i} className="text-center p-6 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <s.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default FlightService;
