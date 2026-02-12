import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Mail, Cpu, Radio, Camera, Settings, Zap, Wifi, Users, Building2, Wrench, Cog } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageStructuredData } from "@/components/PageStructuredData";

const AccessoriesCustom = () => {
  const { t } = useLanguage();

  const departments = [
    { icon: Cpu, titleKey: 'customAccessories.dept.embedded', descKey: 'customAccessories.dept.embedded.desc', count: "40+" },
    { icon: Cog, titleKey: 'customAccessories.dept.hardware', descKey: 'customAccessories.dept.hardware.desc', count: "35+" },
    { icon: Settings, titleKey: 'customAccessories.dept.software', descKey: 'customAccessories.dept.software.desc', count: "50+" },
    { icon: Wrench, titleKey: 'customAccessories.dept.structure', descKey: 'customAccessories.dept.structure.desc', count: "30+" },
    { icon: Users, titleKey: 'customAccessories.dept.support', descKey: 'customAccessories.dept.support.desc', count: "25+" },
    { icon: Building2, titleKey: 'customAccessories.dept.assembly', descKey: 'customAccessories.dept.assembly.desc', count: "20+" },
  ];

  const accessories = [
    { icon: Cpu, titleKey: 'customAccessories.types.fc', itemsKey: 'customAccessories.types.fc.items' },
    { icon: Zap, titleKey: 'customAccessories.types.esc', itemsKey: 'customAccessories.types.esc.items' },
    { icon: Radio, titleKey: 'customAccessories.types.vtx', itemsKey: 'customAccessories.types.vtx.items' },
    { icon: Wifi, titleKey: 'customAccessories.types.datalink', itemsKey: 'customAccessories.types.datalink.items' },
    { icon: Camera, titleKey: 'customAccessories.types.gimbal', itemsKey: 'customAccessories.types.gimbal.items' },
    { icon: Settings, titleKey: 'customAccessories.types.other', itemsKey: 'customAccessories.types.other.items' },
  ];

  const serviceKeys = [
    'customAccessories.services.oem',
    'customAccessories.services.firmware',
    'customAccessories.services.hardware',
    'customAccessories.services.protocol',
    'customAccessories.services.cert',
    'customAccessories.services.batch',
    'customAccessories.services.quality',
    'customAccessories.services.training',
  ];

  const caseKeys = [
    { clientKey: 'customAccessories.cases.fc.client', titleKey: 'customAccessories.cases.fc.title', descKey: 'customAccessories.cases.fc.desc' },
    { clientKey: 'customAccessories.cases.vtx.client', titleKey: 'customAccessories.cases.vtx.title', descKey: 'customAccessories.cases.vtx.desc' },
    { clientKey: 'customAccessories.cases.esc.client', titleKey: 'customAccessories.cases.esc.title', descKey: 'customAccessories.cases.esc.desc' },
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('customAccessories.seo.title')}
        description={t('customAccessories.seo.desc')}
        keywords={t('customAccessories.seo.keywords')}
        path="/custom-research/accessories"
      />
      <PageStructuredData data={{ type: 'Service', name: t('customAccessories.seo.title'), description: t('customAccessories.seo.desc'), serviceType: 'Accessories OEM/ODM' }} />
      <Header />
      <main className="pt-16 md:pt-20">
        <div className="bg-secondary py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">{t('nav.home')}</Link>
              <span>/</span>
              <Link to="/custom-research" className="hover:text-accent">{t('nav.custom')}</Link>
              <span>/</span>
              <span className="text-foreground">{t('customAccessories.breadcrumb.current')}</span>
            </div>
          </div>
        </div>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <BackButton to="/custom-research" label={t('customAccessories.back')} />
                <h1 className="text-3xl md:text-5xl font-bold mb-6">{t('customAccessories.title')}</h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {t('customAccessories.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                    {t('customAccessories.btn.consult')} <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button className="bg-primary/10 border border-primary/30 text-foreground hover:bg-primary/20 px-8 py-6 text-lg">
                    <Phone className="w-5 h-5 mr-2" /> {t('customAccessories.btn.call')}
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80" alt={t('customAccessories.title')} className="rounded-2xl shadow-2xl w-full" />
                <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground px-6 py-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold">200+</div>
                  <div className="text-sm">{t('customAccessories.engineers')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t('customAccessories.team.title')}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
              {t('customAccessories.team.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((dept, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl shadow-card hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center">
                      <dept.icon className="w-7 h-7 text-accent" />
                    </div>
                    <div className="text-2xl font-bold text-accent">{dept.count}</div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{t(dept.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(dept.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t('customAccessories.types.title')}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
              {t('customAccessories.types.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {accessories.map((item, index) => {
                const items = t(item.itemsKey).split('|');
                return (
                  <div key={index} className="bg-card p-8 rounded-2xl shadow-card">
                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                      <item.icon className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{t(item.titleKey)}</h3>
                    <ul className="space-y-2">
                      {items.map((subItem, subIndex) => (
                        <li key={subIndex} className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                          <span>{subItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">{t('customAccessories.services.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {serviceKeys.map((key, index) => (
                <div key={index} className="flex items-center gap-3 bg-card p-4 rounded-xl shadow-card">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>{t(key)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t('customAccessories.cases.title')}</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
              {t('customAccessories.cases.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseKeys.map((item, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl shadow-card">
                  <div className="text-sm text-accent font-medium mb-2">{t(item.clientKey)}</div>
                  <h3 className="text-xl font-bold mb-3">{t(item.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(item.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-6">
              {t('customAccessories.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('customAccessories.cta.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg">
                <Mail className="w-5 h-5 mr-2" /> {t('customAccessories.cta.consult')}
              </Button>
              <a href="tel:+8617674048404">
                <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-10 py-6 text-lg">
                  <Phone className="w-5 h-5 mr-2" /> 17674048404
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default AccessoriesCustom;
