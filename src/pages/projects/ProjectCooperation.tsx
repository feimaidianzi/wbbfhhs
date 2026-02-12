import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Handshake, Building, Users, FileText } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const ProjectCooperation = () => {
  const { t } = useLanguage();

  const modes = [
    { icon: Handshake, title: t('cooperation.mode.strategic'), description: t('cooperation.mode.strategic.desc') },
    { icon: Building, title: t('cooperation.mode.government'), description: t('cooperation.mode.government.desc') },
    { icon: Users, title: t('cooperation.mode.tech'), description: t('cooperation.mode.tech.desc') },
    { icon: FileText, title: t('cooperation.mode.custom'), description: t('cooperation.mode.custom.desc') },
  ];

  const areas = [
    t('cooperation.area.smartCity'),
    t('cooperation.area.powerGrid'),
    t('cooperation.area.agriculture'),
    t('cooperation.area.environment'),
    t('cooperation.area.emergency'),
    t('cooperation.area.logistics'),
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO 
        title={t('cooperation.seo.title')} 
        description={t('cooperation.seo.description')} 
        keywords={t('cooperation.seo.keywords')} 
        path="/projects/cooperation" 
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80)" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('cooperation.hero.title')}
              </h1>
              <p className="text-lg text-primary-foreground/90 mb-8">
                {t('cooperation.hero.subtitle')}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {t('cooperation.hero.cta')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        {/* SEO Business Introduction */}
        <section className="py-12 bg-secondary">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {t('cooperation.seo.intro')}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3">
                  {t('cooperation.seo.cta')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {modes.map((m, i) => (
                <div key={i} className="text-center p-6 bg-card rounded-xl shadow-card">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <m.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{m.title}</h3>
                  <p className="text-muted-foreground text-sm">{m.description}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-6">{t('cooperation.areas.title')}</h2>
                <ul className="space-y-4">
                  {areas.map((a, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80" alt={t('cooperation.hero.title')} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default ProjectCooperation;
