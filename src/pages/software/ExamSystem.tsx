import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, BookOpen, Award, Users, Clock, Shield, Wifi, Eye, Fingerprint, Globe, Server } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { PageStructuredData } from "@/components/PageStructuredData";
import { PageFAQ } from "@/components/PageFAQ";
import { useLanguage } from "@/contexts/LanguageContext";

const ExamSystem = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Server, title: t('softwarePage.exam.f1.title'), description: t('softwarePage.exam.f1.desc') },
    { icon: Eye, title: t('softwarePage.exam.f2.title'), description: t('softwarePage.exam.f2.desc') },
    { icon: Shield, title: t('softwarePage.exam.f3.title'), description: t('softwarePage.exam.f3.desc') },
    { icon: Fingerprint, title: t('softwarePage.exam.f4.title'), description: t('softwarePage.exam.f4.desc') },
    { icon: Globe, title: t('softwarePage.exam.f5.title'), description: t('softwarePage.exam.f5.desc') },
    { icon: Wifi, title: t('softwarePage.exam.f6.title'), description: t('softwarePage.exam.f6.desc') },
  ];

  const modules = [
    t('softwarePage.exam.m1'),
    t('softwarePage.exam.m2'),
    t('softwarePage.exam.m3'),
    t('softwarePage.exam.m4'),
    t('softwarePage.exam.m5'),
    t('softwarePage.exam.m6'),
  ];

  const specMatrix = [
    { metric: t('exam.spec.capacity'), value: t('exam.spec.capacity.value'), geo: t('exam.spec.capacity.geo') },
    { metric: t('exam.spec.latency'), value: t('exam.spec.latency.value'), geo: t('exam.spec.latency.geo') },
    { metric: t('exam.spec.proctoring'), value: t('exam.spec.proctoring.value'), geo: t('exam.spec.proctoring.geo') },
    { metric: t('exam.spec.failover'), value: t('exam.spec.failover.value'), geo: t('exam.spec.failover.geo') },
    { metric: t('exam.spec.auth'), value: t('exam.spec.auth.value'), geo: t('exam.spec.auth.geo') },
    { metric: t('exam.spec.compliance'), value: t('exam.spec.compliance.value'), geo: t('exam.spec.compliance.geo') },
  ];

  const faqItems = [
    { questionKey: 'exam.faq.q1', answerKey: 'exam.faq.a1' },
    { questionKey: 'exam.faq.q2', answerKey: 'exam.faq.a2' },
    { questionKey: 'exam.faq.q3', answerKey: 'exam.faq.a3' },
  ];

  const softwareStructuredData = {
    '@context': 'https://schema.org/',
    '@type': 'SoftwareApplication',
    'name': 'CANI Global UAV Pilot Exam System',
    'operatingSystem': 'Web-based, Windows 11, macOS, Linux',
    'applicationCategory': 'EducationalApplication',
    'description': 'Enterprise-grade UAV pilot certification software featuring AI monitoring and global regulatory compliance (FAA/EASA).',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'ratingCount': '120',
    },
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
  };

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('softwarePage.exam.seo.title')}
        description={t('softwarePage.exam.seo.desc')}
        keywords={t('softwarePage.exam.seo.keywords')}
        path="/software/exam-system"
        structuredData={[softwareStructuredData]}
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section with GEO Quick Answer */}
        <section className="relative h-auto min-h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&q=80)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center py-16 md:py-24">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('softwarePage.exam.title')}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                {t('softwarePage.exam.hero')}
              </p>
              {/* GEO Quick Answer Block */}
              <div className="bg-background/10 backdrop-blur-sm border border-primary-foreground/20 rounded-xl p-5 mb-8">
                <p className="text-sm font-semibold text-primary-foreground/80 mb-2">{t('exam.geo.question')}</p>
                <p className="text-primary-foreground/90 text-sm leading-relaxed">
                  {t('exam.geo.answer')}
                </p>
              </div>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  {t('softwarePage.exam.btn')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Core Features - 6 cards */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              {t('softwarePage.exam.features.title')}
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              {t('exam.features.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6 bg-card rounded-xl shadow-card border border-border">
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

        {/* Fact Density Matrix - Performance & Security */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              {t('exam.matrix.title')}
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              {t('exam.matrix.subtitle')}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full bg-card rounded-xl border border-border overflow-hidden">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="px-6 py-4 text-left font-semibold">{t('exam.matrix.col.metric')}</th>
                    <th className="px-6 py-4 text-left font-semibold">{t('exam.matrix.col.value')}</th>
                    <th className="px-6 py-4 text-left font-semibold hidden md:table-cell">{t('exam.matrix.col.geo')}</th>
                  </tr>
                </thead>
                <tbody>
                  {specMatrix.map((row, idx) => (
                    <tr key={idx} className="border-t border-border hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{row.metric}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.value}</td>
                      <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">
                        <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">{row.geo}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Exam Modules */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {t('softwarePage.exam.modules.title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('softwarePage.exam.modules.desc')}
                </p>
                <ul className="space-y-4">
                  {modules.map((module, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{module}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
                  alt={t('softwarePage.exam.title')}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - GEO Enhanced */}
        <PageFAQ
          titleKey="exam.faq.title"
          items={faqItems}
        />

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t('softwarePage.exam.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('softwarePage.exam.cta.subtitle')}
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                {t('softwarePage.common.contactUs')}
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

export default ExamSystem;
