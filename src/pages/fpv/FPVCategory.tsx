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
    price: string;
    featuresKeys: string[];
  }[];
}> = {
  "kit": {
    titleKey: 'fpvCategory.kit.title',
    descriptionKey: 'fpvCategory.kit.description',
    heroImage: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80",
    products: [
      {
        nameKey: 'fpvCategory.kit.product1.name',
        descriptionKey: 'fpvCategory.kit.product1.description',
        specsKeys: ['fpvCategory.kit.product1.spec1', 'fpvCategory.kit.product1.spec2', 'fpvCategory.kit.product1.spec3', 'fpvCategory.kit.product1.spec4'],
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
        price: "¥1,999",
        featuresKeys: ['fpvCategory.kit.product1.feature1', 'fpvCategory.kit.product1.feature2', 'fpvCategory.kit.product1.feature3', 'fpvCategory.kit.product1.feature4'],
      },
      {
        nameKey: 'fpvCategory.kit.product2.name',
        descriptionKey: 'fpvCategory.kit.product2.description',
        specsKeys: ['fpvCategory.kit.product2.spec1', 'fpvCategory.kit.product2.spec2', 'fpvCategory.kit.product2.spec3', 'fpvCategory.kit.product2.spec4'],
        image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
        price: "¥3,299",
        featuresKeys: ['fpvCategory.kit.product2.feature1', 'fpvCategory.kit.product2.feature2', 'fpvCategory.kit.product2.feature3', 'fpvCategory.kit.product2.feature4'],
      },
      {
        nameKey: 'fpvCategory.kit.product3.name',
        descriptionKey: 'fpvCategory.kit.product3.description',
        specsKeys: ['fpvCategory.kit.product3.spec1', 'fpvCategory.kit.product3.spec2', 'fpvCategory.kit.product3.spec3', 'fpvCategory.kit.product3.spec4'],
        image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
        price: "¥5,999",
        featuresKeys: ['fpvCategory.kit.product3.feature1', 'fpvCategory.kit.product3.feature2', 'fpvCategory.kit.product3.feature3', 'fpvCategory.kit.product3.feature4'],
      },
    ],
  },
  "racing": {
    titleKey: 'fpvCategory.racing.title',
    descriptionKey: 'fpvCategory.racing.description',
    heroImage: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1920&q=80",
    products: [
      {
        nameKey: 'fpvCategory.racing.product1.name',
        descriptionKey: 'fpvCategory.racing.product1.description',
        specsKeys: ['fpvCategory.racing.product1.spec1', 'fpvCategory.racing.product1.spec2', 'fpvCategory.racing.product1.spec3', 'fpvCategory.racing.product1.spec4'],
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
        price: "¥2,999",
        featuresKeys: ['fpvCategory.racing.product1.feature1', 'fpvCategory.racing.product1.feature2', 'fpvCategory.racing.product1.feature3', 'fpvCategory.racing.product1.feature4'],
      },
      {
        nameKey: 'fpvCategory.racing.product2.name',
        descriptionKey: 'fpvCategory.racing.product2.description',
        specsKeys: ['fpvCategory.racing.product2.spec1', 'fpvCategory.racing.product2.spec2', 'fpvCategory.racing.product2.spec3', 'fpvCategory.racing.product2.spec4'],
        image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
        price: "¥4,599",
        featuresKeys: ['fpvCategory.racing.product2.feature1', 'fpvCategory.racing.product2.feature2', 'fpvCategory.racing.product2.feature3', 'fpvCategory.racing.product2.feature4'],
      },
      {
        nameKey: 'fpvCategory.racing.product3.name',
        descriptionKey: 'fpvCategory.racing.product3.description',
        specsKeys: ['fpvCategory.racing.product3.spec1', 'fpvCategory.racing.product3.spec2', 'fpvCategory.racing.product3.spec3', 'fpvCategory.racing.product3.spec4'],
        image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
        price: "¥1,599",
        featuresKeys: ['fpvCategory.racing.product3.feature1', 'fpvCategory.racing.product3.feature2', 'fpvCategory.racing.product3.feature3', 'fpvCategory.racing.product3.feature4'],
      },
    ],
  },
  "花飞系列": {
    titleKey: 'fpvCategory.freestyle.title',
    descriptionKey: 'fpvCategory.freestyle.description',
    heroImage: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=1920&q=80",
    products: [
      {
        nameKey: 'fpvCategory.freestyle.product1.name',
        descriptionKey: 'fpvCategory.freestyle.product1.description',
        specsKeys: ['fpvCategory.freestyle.product1.spec1', 'fpvCategory.freestyle.product1.spec2', 'fpvCategory.freestyle.product1.spec3', 'fpvCategory.freestyle.product1.spec4'],
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
        price: "¥1,299",
        featuresKeys: ['fpvCategory.freestyle.product1.feature1', 'fpvCategory.freestyle.product1.feature2', 'fpvCategory.freestyle.product1.feature3', 'fpvCategory.freestyle.product1.feature4'],
      },
      {
        nameKey: 'fpvCategory.freestyle.product2.name',
        descriptionKey: 'fpvCategory.freestyle.product2.description',
        specsKeys: ['fpvCategory.freestyle.product2.spec1', 'fpvCategory.freestyle.product2.spec2', 'fpvCategory.freestyle.product2.spec3', 'fpvCategory.freestyle.product2.spec4'],
        image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
        price: "¥2,299",
        featuresKeys: ['fpvCategory.freestyle.product2.feature1', 'fpvCategory.freestyle.product2.feature2', 'fpvCategory.freestyle.product2.feature3', 'fpvCategory.freestyle.product2.feature4'],
      },
      {
        nameKey: 'fpvCategory.freestyle.product3.name',
        descriptionKey: 'fpvCategory.freestyle.product3.description',
        specsKeys: ['fpvCategory.freestyle.product3.spec1', 'fpvCategory.freestyle.product3.spec2', 'fpvCategory.freestyle.product3.spec3', 'fpvCategory.freestyle.product3.spec4'],
        image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
        price: "¥3,599",
        featuresKeys: ['fpvCategory.freestyle.product3.feature1', 'fpvCategory.freestyle.product3.feature2', 'fpvCategory.freestyle.product3.feature3', 'fpvCategory.freestyle.product3.feature4'],
      },
    ],
  },
  "远航系列": {
    titleKey: 'fpvCategory.longrange.title',
    descriptionKey: 'fpvCategory.longrange.description',
    heroImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80",
    products: [
      {
        nameKey: 'fpvCategory.longrange.product1.name',
        descriptionKey: 'fpvCategory.longrange.product1.description',
        specsKeys: ['fpvCategory.longrange.product1.spec1', 'fpvCategory.longrange.product1.spec2', 'fpvCategory.longrange.product1.spec3', 'fpvCategory.longrange.product1.spec4'],
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
        price: "¥3,299",
        featuresKeys: ['fpvCategory.longrange.product1.feature1', 'fpvCategory.longrange.product1.feature2', 'fpvCategory.longrange.product1.feature3', 'fpvCategory.longrange.product1.feature4'],
      },
      {
        nameKey: 'fpvCategory.longrange.product2.name',
        descriptionKey: 'fpvCategory.longrange.product2.description',
        specsKeys: ['fpvCategory.longrange.product2.spec1', 'fpvCategory.longrange.product2.spec2', 'fpvCategory.longrange.product2.spec3', 'fpvCategory.longrange.product2.spec4'],
        image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
        price: "¥4,599",
        featuresKeys: ['fpvCategory.longrange.product2.feature1', 'fpvCategory.longrange.product2.feature2', 'fpvCategory.longrange.product2.feature3', 'fpvCategory.longrange.product2.feature4'],
      },
      {
        nameKey: 'fpvCategory.longrange.product3.name',
        descriptionKey: 'fpvCategory.longrange.product3.description',
        specsKeys: ['fpvCategory.longrange.product3.spec1', 'fpvCategory.longrange.product3.spec2', 'fpvCategory.longrange.product3.spec3', 'fpvCategory.longrange.product3.spec4'],
        image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
        price: "¥7,999",
        featuresKeys: ['fpvCategory.longrange.product3.feature1', 'fpvCategory.longrange.product3.feature2', 'fpvCategory.longrange.product3.feature3', 'fpvCategory.longrange.product3.feature4'],
      },
    ],
  },
  "航拍系列": {
    titleKey: 'fpvCategory.cinematic.title',
    descriptionKey: 'fpvCategory.cinematic.description',
    heroImage: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1920&q=80",
    products: [
      {
        nameKey: 'fpvCategory.cinematic.product1.name',
        descriptionKey: 'fpvCategory.cinematic.product1.description',
        specsKeys: ['fpvCategory.cinematic.product1.spec1', 'fpvCategory.cinematic.product1.spec2', 'fpvCategory.cinematic.product1.spec3', 'fpvCategory.cinematic.product1.spec4'],
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
        price: "¥2,999",
        featuresKeys: ['fpvCategory.cinematic.product1.feature1', 'fpvCategory.cinematic.product1.feature2', 'fpvCategory.cinematic.product1.feature3', 'fpvCategory.cinematic.product1.feature4'],
      },
      {
        nameKey: 'fpvCategory.cinematic.product2.name',
        descriptionKey: 'fpvCategory.cinematic.product2.description',
        specsKeys: ['fpvCategory.cinematic.product2.spec1', 'fpvCategory.cinematic.product2.spec2', 'fpvCategory.cinematic.product2.spec3', 'fpvCategory.cinematic.product2.spec4'],
        image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
        price: "¥8,999",
        featuresKeys: ['fpvCategory.cinematic.product2.feature1', 'fpvCategory.cinematic.product2.feature2', 'fpvCategory.cinematic.product2.feature3', 'fpvCategory.cinematic.product2.feature4'],
      },
      {
        nameKey: 'fpvCategory.cinematic.product3.name',
        descriptionKey: 'fpvCategory.cinematic.product3.description',
        specsKeys: ['fpvCategory.cinematic.product3.spec1', 'fpvCategory.cinematic.product3.spec2', 'fpvCategory.cinematic.product3.spec3', 'fpvCategory.cinematic.product3.spec4'],
        image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
        price: "¥15,999",
        featuresKeys: ['fpvCategory.cinematic.product3.feature1', 'fpvCategory.cinematic.product3.feature2', 'fpvCategory.cinematic.product3.feature3', 'fpvCategory.cinematic.product3.feature4'],
      },
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

                    <div className="flex items-center justify-end">
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
