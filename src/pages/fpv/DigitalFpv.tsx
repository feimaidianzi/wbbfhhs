import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wifi, Monitor, Zap, Radio, ShieldCheck } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { BackButton } from "@/components/BackButton";
import { digitalFpvProducts, digitalFpvCategories } from "@/data/digitalFpvProducts";
import { useLanguage } from "@/contexts/LanguageContext";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DigitalFpv = () => {
  const { language, t } = useLanguage();

  // GEO FAQ data
  const faqItems = [
    { q: t('digitalFpv.geo.faq.q1'), a: t('digitalFpv.geo.faq.a1') },
    { q: t('digitalFpv.geo.faq.q2'), a: t('digitalFpv.geo.faq.a2') },
    { q: t('digitalFpv.geo.faq.q3'), a: t('digitalFpv.geo.faq.a3') },
    { q: t('digitalFpv.geo.faq.q4'), a: t('digitalFpv.geo.faq.a4') },
    { q: t('digitalFpv.geo.faq.q5'), a: t('digitalFpv.geo.faq.a5') },
    { q: t('digitalFpv.geo.faq.q6'), a: t('digitalFpv.geo.faq.a6') },
  ];

  // JSON-LD FAQPage schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  // Comparison data rows
  const comparisonRows = [
    { key: 'maxPower', cani: 'cani.power', dji: 'dji.power', walksnail: 'walksnail.power' },
    { key: 'range', cani: 'cani.range', dji: 'dji.range', walksnail: 'walksnail.range' },
    { key: 'modulation', cani: 'cani.modulation', dji: 'dji.modulation', walksnail: 'walksnail.modulation' },
    { key: 'encryption', cani: 'cani.encryption', dji: 'dji.encryption', walksnail: 'walksnail.encryption' },
    { key: 'platform', cani: 'cani.platform', dji: 'dji.platform', walksnail: 'walksnail.platform' },
  ];

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('digitalFpv.seo.title')}
        description={t('digitalFpv.seo.description')}
        keywords={t('digitalFpv.seo.keywords')}
        path="/products/accessories/digital-fpv"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="bg-secondary py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">{t('nav.home')}</Link>
              <span>/</span>
              <Link to="/products/accessories" className="hover:text-accent">{t('nav.products.accessories')}</Link>
              <span>/</span>
              <span className="text-foreground">{t('digitalFpv.title')}</span>
            </div>
          </div>
        </div>

        {/* Hero with GEO Quick Answer */}
        <section className="relative h-auto min-h-[400px] md:min-h-[500px] overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="relative container-custom py-16 flex items-center">
            <div className="max-w-3xl">
              <BackButton to="/products/accessories" label={t('digitalFpv.backToAccessories')} />
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('digitalFpv.title')}
              </h1>
              <p className="text-lg text-primary-foreground/90 mb-4">
                {t('digitalFpv.hero.subtitle')}
              </p>
              {/* GEO Quick Answer Block */}
              <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-xl p-5 mb-6">
                <p className="text-primary-foreground/85 text-sm leading-relaxed">
                  {t('digitalFpv.hero.quickAnswer')}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                  <Wifi className="w-5 h-5 text-accent" />
                  <span className="text-primary-foreground text-sm">{t('digitalFpv.feature.wifi')}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                  <Monitor className="w-5 h-5 text-accent" />
                  <span className="text-primary-foreground text-sm">{t('digitalFpv.feature.hd')}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                  <Zap className="w-5 h-5 text-accent" />
                  <span className="text-primary-foreground text-sm">{t('digitalFpv.feature.lowLatency')}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                  <span className="text-primary-foreground text-sm">AES-256</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        {digitalFpvCategories.map((category) => {
          const categoryProducts = digitalFpvProducts.filter(p => p.category === category.id);
          if (categoryProducts.length === 0) return null;
          
          return (
            <section key={category.id} className="py-16 bg-background">
              <div className="container-custom">
                <div className="flex items-center gap-4 mb-8">
                  <Radio className="w-8 h-8 text-accent" />
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">{t(category.nameKey)}</h2>
                    <p className="text-muted-foreground">{t(category.descriptionKey)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={product.customLink || `/products/accessories/digital-fpv/${product.id}`}
                      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-secondary to-secondary/50 relative">
                        <img
                          src={product.image}
                          alt={t(product.nameKey)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-accent text-sm font-medium mb-2">{t(product.sloganKey)}</div>
                        <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                          {t(product.nameKey)}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">{t(product.subSloganKey)}</p>
                        
                        {/* Key Features */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.keyFeatureKeys.map((featureKey, i) => (
                            <span key={i} className="text-xs bg-secondary text-foreground px-2 py-1 rounded">
                              {t(featureKey)}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center text-accent text-sm font-medium group-hover:gap-3 gap-1 transition-all">
                          <span>{t('common.viewDetails')}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* B2B Comparison Table */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('digitalFpv.comparison.title')}</h2>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full bg-card rounded-xl overflow-hidden shadow-card">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="px-6 py-4 text-left font-bold">{t('digitalFpv.comparison.dimension')}</th>
                    <th className="px-6 py-4 text-left font-bold">CaniUAV FV10W-A1</th>
                    <th className="px-6 py-4 text-left font-bold">DJI Transmission</th>
                    <th className="px-6 py-4 text-left font-bold">Walksnail Avatar HD</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, idx) => (
                    <tr key={row.key} className={idx % 2 === 0 ? 'bg-card' : 'bg-secondary/30'}>
                      <td className="px-6 py-4 font-medium text-foreground">{t(`digitalFpv.comparison.${row.key}`)}</td>
                      <td className="px-6 py-4 text-accent font-semibold">{t(`digitalFpv.comparison.${row.cani}`)}</td>
                      <td className="px-6 py-4 text-muted-foreground">{t(`digitalFpv.comparison.${row.dji}`)}</td>
                      <td className="px-6 py-4 text-muted-foreground">{t(`digitalFpv.comparison.${row.walksnail}`)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* GEO FAQ Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t('digitalFpv.geo.faq.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('digitalFpv.geo.faq.subtitle')}
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="bg-card rounded-xl border border-border px-6 shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t('digitalFpv.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('digitalFpv.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                  {t('common.contactUs')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/products/accessories">
                <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-8 py-6 text-lg">
                  {t('digitalFpv.viewOtherAccessories')}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default DigitalFpv;
