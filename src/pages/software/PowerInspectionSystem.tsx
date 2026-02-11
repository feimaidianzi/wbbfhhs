import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, Eye, FileText, AlertTriangle } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const PowerInspectionSystem = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Zap, title: t('softwarePage.powerInspection.f1.title'), description: t('softwarePage.powerInspection.f1.desc') },
    { icon: Eye, title: t('softwarePage.powerInspection.f2.title'), description: t('softwarePage.powerInspection.f2.desc') },
    { icon: FileText, title: t('softwarePage.powerInspection.f3.title'), description: t('softwarePage.powerInspection.f3.desc') },
    { icon: AlertTriangle, title: t('softwarePage.powerInspection.f4.title'), description: t('softwarePage.powerInspection.f4.desc') },
  ];

  const defectTypes = [
    t('softwarePage.powerInspection.d1'),
    t('softwarePage.powerInspection.d2'),
    t('softwarePage.powerInspection.d3'),
    t('softwarePage.powerInspection.d4'),
    t('softwarePage.powerInspection.d5'),
    t('softwarePage.powerInspection.d6'),
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('softwarePage.powerInspection.seo.title')}
        description={t('softwarePage.powerInspection.seo.desc')}
        keywords={t('softwarePage.powerInspection.seo.keywords')}
        path="/software/power-inspection-system"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('softwarePage.powerInspection.title')}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                {t('softwarePage.powerInspection.hero')}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {t('softwarePage.powerInspection.btn')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('softwarePage.powerInspection.features.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6 bg-card rounded-xl shadow-card">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&q=80"
                  alt={t('softwarePage.powerInspection.title')}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {t('softwarePage.powerInspection.defects.title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('softwarePage.powerInspection.defects.desc')}
                </p>
                <ul className="space-y-4">
                  {defectTypes.map((defect, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{defect}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t('softwarePage.powerInspection.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('softwarePage.powerInspection.cta.subtitle')}
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                {t('softwarePage.common.consult')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default PowerInspectionSystem;
