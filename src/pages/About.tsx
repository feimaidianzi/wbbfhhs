import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { Target, Users, Award, ArrowRight, Cpu, BarChart3, Globe2, ShieldCheck } from "lucide-react";
import workshopAssembly from "@/assets/seo/workshop-assembly.jpg";
import { MultiLanguageSEO, createLocalizedBreadcrumbData } from "@/components/MultiLanguageSEO";
import { useLanguage as useLanguageHook } from "@/contexts/LanguageContext";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  const milestones = [
    { year: "2015", title: t('about.milestone.2015.title'), description: t('about.milestone.2015.desc') },
    { year: "2017", title: t('about.milestone.2017.title'), description: t('about.milestone.2017.desc') },
    { year: "2019", title: t('about.milestone.2019.title'), description: t('about.milestone.2019.desc') },
    { year: "2021", title: t('about.milestone.2021.title'), description: t('about.milestone.2021.desc') },
    { year: "2023", title: t('about.milestone.2023.title'), description: t('about.milestone.2023.desc') },
    { year: "2024", title: t('about.milestone.2024.title'), description: t('about.milestone.2024.desc') },
  ];

  const values = [
    { icon: Target, title: t('about.value.mission'), description: t('about.value.mission.desc') },
    { icon: Users, title: t('about.value.vision'), description: t('about.value.vision.desc') },
    { icon: Award, title: t('about.value.values'), description: t('about.value.values.desc') },
  ];

  const stats = [
    { value: "200+", label: t('about.stat.professionals') },
    { value: "50+", label: t('about.stat.patents') },
    { value: "1000+", label: t('about.stat.clientsServed') },
    { value: "20+", label: t('about.stat.citiesCovered') },
  ];

  const { language } = useLanguageHook();
  
  const breadcrumbData = createLocalizedBreadcrumbData([
    { name: t('nav.home'), url: '/' },
    { name: t('about.title'), url: '/about' },
  ], language);

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('about.title')}
        description={t('about.seoDescription')}
        keywords={t('about.seoKeywords')}
        path="/about"
        structuredData={breadcrumbData}
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('about.title')}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                {t('about.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Company Intro */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {t('about.profile.title')}
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {t('about.profile.p1')}
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {t('about.profile.p2')}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t('about.profile.p3')}
                </p>
                {/* E-E-A-T Trust Signals */}
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <Award className="w-3.5 h-3.5" />
                    {t('footer.qualification')}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium">
                    10+ {t('hero.stat.years')}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                    ISO 9001
                  </span>
                </div>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src={workshopAssembly}
                  alt="长凌科技无人机组装车间实拍 - CANI Technology drone assembly workshop"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-primary">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-primary-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('about.culture.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((item, index) => (
                <div key={index} className="bg-card rounded-xl p-8 shadow-card text-center">
                  <item.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-card-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('about.milestones.title')}
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}
                    >
                      <div className="bg-card rounded-xl p-6 shadow-card inline-block">
                        <div className="text-2xl font-bold text-accent mb-2">{milestone.year}</div>
                        <h3 className="text-lg font-semibold text-card-foreground mb-1">
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Core Team */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('about.coreTeam.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { nameKey: 'about.team.rd.name', roleKey: 'about.team.rd.role', descKey: 'about.team.rd.desc', icon: Cpu },
                { nameKey: 'about.team.prod.name', roleKey: 'about.team.prod.role', descKey: 'about.team.prod.desc', icon: BarChart3 },
                { nameKey: 'about.team.market.name', roleKey: 'about.team.market.role', descKey: 'about.team.market.desc', icon: Globe2 },
              ].map((member, index) => (
                <div key={index} className="bg-card rounded-xl p-8 shadow-card text-center">
                  <member.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-card-foreground">{t(member.nameKey)}</h3>
                  <p className="text-accent text-sm mb-3">{t(member.roleKey)}</p>
                  <p className="text-muted-foreground text-sm">{t(member.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('about.certifications.title')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { key: 'about.cert.hightech', icon: Award },
                { key: 'about.cert.patents', icon: Cpu },
                { key: 'about.cert.iso', icon: ShieldCheck },
                { key: 'about.cert.member', icon: Users },
              ].map((cert, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-card text-center border border-border">
                  <cert.icon className="w-10 h-10 text-accent mx-auto mb-3" />
                  <p className="text-sm font-medium text-card-foreground">{t(cert.key)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t('about.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('about.cta.description')}
            </p>
            <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
              {t('about.cta.button')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default About;
