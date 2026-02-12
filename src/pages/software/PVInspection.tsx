import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sun, Eye, Zap, BarChart } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageStructuredData } from "@/components/PageStructuredData";
import { useLanguage } from "@/contexts/LanguageContext";

const PVInspection = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Sun, title: t('softwarePage.pvInspection.f1.title'), description: t('softwarePage.pvInspection.f1.desc') },
    { icon: Eye, title: t('softwarePage.pvInspection.f2.title'), description: t('softwarePage.pvInspection.f2.desc') },
    { icon: Zap, title: t('softwarePage.pvInspection.f3.title'), description: t('softwarePage.pvInspection.f3.desc') },
    { icon: BarChart, title: t('softwarePage.pvInspection.f4.title'), description: t('softwarePage.pvInspection.f4.desc') },
  ];

  const defectTypes = [
    t('softwarePage.pvInspection.d1'),
    t('softwarePage.pvInspection.d2'),
    t('softwarePage.pvInspection.d3'),
    t('softwarePage.pvInspection.d4'),
    t('softwarePage.pvInspection.d5'),
    t('softwarePage.pvInspection.d6'),
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('softwarePage.pvInspection.seo.title')}
        description={t('softwarePage.pvInspection.seo.desc')}
        keywords={t('softwarePage.pvInspection.seo.keywords')}
        path="/software/pv-inspection"
      />
      <PageStructuredData data={{ type: 'SoftwareApplication', name: t('softwarePage.pvInspection.seo.title'), description: t('softwarePage.pvInspection.seo.desc'), category: 'BusinessApplication' }} />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('softwarePage.pvInspection.title')}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                {t('softwarePage.pvInspection.hero')}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {t('softwarePage.pvInspection.btn')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('softwarePage.pvInspection.features.title')}
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
                  src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80"
                  alt={t('softwarePage.pvInspection.title')}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {t('softwarePage.pvInspection.defects.title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('softwarePage.pvInspection.defects.desc')}
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
              {t('softwarePage.pvInspection.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('softwarePage.pvInspection.cta.subtitle')}
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

export default PVInspection;
