import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, ShoppingCart } from "lucide-react";
import { useParams } from "react-router-dom";
import { LangLink as Link } from "@/components/LangLink";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import fpvHeroImg from "@/assets/seo/fpv-drone-aerial.jpg";
import fpvRacingImg from "@/assets/seo/fpv-racing-drone.jpg";
import fpvFreestyleImg from "@/assets/seo/fpv-freestyle-drone.jpg";
import fpvLongrangeImg from "@/assets/seo/fpv-longrange-drone.jpg";
import fpvCinewhoopImg from "@/assets/seo/fpv-cinewhoop-drone.jpg";

// Category data with translation keys
const categoryData: Record<string, {
  titleKey: string;
  descriptionKey: string;
  heroImage: string;
  products: {
    nameKey: string;
    descriptionKey: string;
    specsKeys: string[];
    image: string;
    priceKey: string;
    featuresKeys: string[];
  }[];
}> = {
  "kit": {
    titleKey: 'fpvCategory.kit.title',
    descriptionKey: 'fpvCategory.kit.description',
    heroImage: fpvHeroImg,
    products: [
      { nameKey: 'fpvCategory.kit.product1.name', descriptionKey: 'fpvCategory.kit.product1.description', specsKeys: ['fpvCategory.kit.product1.spec1', 'fpvCategory.kit.product1.spec2', 'fpvCategory.kit.product1.spec3', 'fpvCategory.kit.product1.spec4'], image: fpvHeroImg, priceKey: "fpvCategory.kit.product1.price", featuresKeys: ['fpvCategory.kit.product1.feature1', 'fpvCategory.kit.product1.feature2', 'fpvCategory.kit.product1.feature3', 'fpvCategory.kit.product1.feature4'] },
    ],
  },
  "racing": {
    titleKey: 'fpvCategory.racing.title',
    descriptionKey: 'fpvCategory.racing.description',
    heroImage: fpvRacingImg,
    products: [
      { nameKey: 'fpvCategory.racing.product1.name', descriptionKey: 'fpvCategory.racing.product1.description', specsKeys: ['fpvCategory.racing.product1.spec1', 'fpvCategory.racing.product1.spec2', 'fpvCategory.racing.product1.spec3', 'fpvCategory.racing.product1.spec4'], image: fpvRacingImg, priceKey: "fpvCategory.racing.product1.price", featuresKeys: ['fpvCategory.racing.product1.feature1', 'fpvCategory.racing.product1.feature2', 'fpvCategory.racing.product1.feature3', 'fpvCategory.racing.product1.feature4'] },
    ],
  },
  "freestyle": {
    titleKey: 'fpvCategory.freestyle.title',
    descriptionKey: 'fpvCategory.freestyle.description',
    heroImage: fpvFreestyleImg,
    products: [
      { nameKey: 'fpvCategory.freestyle.product1.name', descriptionKey: 'fpvCategory.freestyle.product1.description', specsKeys: ['fpvCategory.freestyle.product1.spec1', 'fpvCategory.freestyle.product1.spec2', 'fpvCategory.freestyle.product1.spec3', 'fpvCategory.freestyle.product1.spec4'], image: fpvFreestyleImg, priceKey: "fpvCategory.freestyle.product1.price", featuresKeys: ['fpvCategory.freestyle.product1.feature1', 'fpvCategory.freestyle.product1.feature2', 'fpvCategory.freestyle.product1.feature3', 'fpvCategory.freestyle.product1.feature4'] },
    ],
  },
  "longrange": {
    titleKey: 'fpvCategory.longrange.title',
    descriptionKey: 'fpvCategory.longrange.description',
    heroImage: fpvLongrangeImg,
    products: [
      { nameKey: 'fpvCategory.longrange.product1.name', descriptionKey: 'fpvCategory.longrange.product1.description', specsKeys: ['fpvCategory.longrange.product1.spec1', 'fpvCategory.longrange.product1.spec2', 'fpvCategory.longrange.product1.spec3', 'fpvCategory.longrange.product1.spec4'], image: fpvLongrangeImg, priceKey: "fpvCategory.longrange.product1.price", featuresKeys: ['fpvCategory.longrange.product1.feature1', 'fpvCategory.longrange.product1.feature2', 'fpvCategory.longrange.product1.feature3', 'fpvCategory.longrange.product1.feature4'] },
      { nameKey: 'fpvCategory.longrange.product2.name', descriptionKey: 'fpvCategory.longrange.product2.description', specsKeys: ['fpvCategory.longrange.product2.spec1', 'fpvCategory.longrange.product2.spec2', 'fpvCategory.longrange.product2.spec3', 'fpvCategory.longrange.product2.spec4'], image: fpvLongrangeImg, priceKey: "fpvCategory.longrange.product2.price", featuresKeys: ['fpvCategory.longrange.product2.feature1', 'fpvCategory.longrange.product2.feature2', 'fpvCategory.longrange.product2.feature3', 'fpvCategory.longrange.product2.feature4'] },
      { nameKey: 'fpvCategory.longrange.product3.name', descriptionKey: 'fpvCategory.longrange.product3.description', specsKeys: ['fpvCategory.longrange.product3.spec1', 'fpvCategory.longrange.product3.spec2', 'fpvCategory.longrange.product3.spec3', 'fpvCategory.longrange.product3.spec4'], image: fpvLongrangeImg, priceKey: "fpvCategory.longrange.product3.price", featuresKeys: ['fpvCategory.longrange.product3.feature1', 'fpvCategory.longrange.product3.feature2', 'fpvCategory.longrange.product3.feature3', 'fpvCategory.longrange.product3.feature4'] },
    ],
  },
  "cinematic": {
    titleKey: 'fpvCategory.cinematic.title',
    descriptionKey: 'fpvCategory.cinematic.description',
    heroImage: fpvCinewhoopImg,
    products: [
      { nameKey: 'fpvCategory.cinematic.product1.name', descriptionKey: 'fpvCategory.cinematic.product1.description', specsKeys: ['fpvCategory.cinematic.product1.spec1', 'fpvCategory.cinematic.product1.spec2', 'fpvCategory.cinematic.product1.spec3', 'fpvCategory.cinematic.product1.spec4'], image: fpvCinewhoopImg, priceKey: "fpvCategory.cinematic.product1.price", featuresKeys: ['fpvCategory.cinematic.product1.feature1', 'fpvCategory.cinematic.product1.feature2', 'fpvCategory.cinematic.product1.feature3', 'fpvCategory.cinematic.product1.feature4'] },
    ],
  },
};

const FPVCategory = () => {
  const { category } = useParams<{ category: string }>();
  const { t } = useLanguage();
  const data = category ? categoryData[category] : null;

  if (!data) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16 md:pt-20">
          <div className="container-custom py-20 text-center">
            <h1 className="text-2xl font-bold mb-4">{t('fpvCategory.notFound')}</h1>
            <Link to="/fpv" className="text-accent hover:underline">
              {t('fpvCategory.backToFpv')}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t(data.titleKey)}
        description={t(data.descriptionKey)}
        keywords={`FPV,${t(data.titleKey)}`}
        path={`/fpv/${category}`}
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="bg-secondary py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">{t('nav.home')}</Link>
              <span>/</span>
              <Link to="/fpv" className="hover:text-accent">{t('nav.fpv')}</Link>
              <span>/</span>
              <span className="text-foreground">{t(data.titleKey)}</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="relative h-[300px] md:h-[400px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${data.heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <BackButton to="/fpv" label={t('fpvCategory.backToFpv')} />
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t(data.titleKey)}
              </h1>
              <p className="text-lg text-primary-foreground/90">
                {t(data.descriptionKey)}
              </p>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">{t('fpvCategory.productList')}</h2>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.products.map((product, index) => (
                <div
                  key={index}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={t(product.nameKey)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-2">
                      {t(product.nameKey)}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {t(product.descriptionKey)}
                    </p>
                    
                    {/* Specs */}
                    <div className="bg-secondary/50 rounded-xl p-4 mb-4">
                      <div className="grid grid-cols-2 gap-2">
                        {product.specsKeys.map((specKey, i) => (
                          <div key={i} className="text-xs text-foreground/80">
                            {t(specKey)}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.featuresKeys.map((featureKey, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          {t(featureKey)}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-accent">{t('fpvCategory.getQuote')}</span>
                      <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {t('fpvCategory.buyNow')}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t('fpvCategory.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('fpvCategory.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                {t('fpvCategory.cta.consult')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-8 py-6 text-lg">
                {t('fpvCategory.cta.viewAll')}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default FPVCategory;
