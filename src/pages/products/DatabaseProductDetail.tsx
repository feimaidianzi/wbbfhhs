import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLangNavigate } from '@/hooks/useLangNavigate';
import { LangLink as Link } from "@/components/LangLink";
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingContact } from '@/components/FloatingContact';
import { MultiLanguageSEO } from '@/components/MultiLanguageSEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BackButton } from '@/components/BackButton';
import ProductSpecifications from '@/components/ProductSpecifications';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check, Loader2, Phone, ArrowRight, ImageOff } from 'lucide-react';
import { Helmet } from "@/lib/helmet-shim";
import { LanguageCode } from '@/i18n/languages';
import { getDomainForLanguage, getHtmlLang } from '@/utils/seoConfig';
import { buildOgImageUrl } from '@/utils/ogImage';

interface Product {
  id: string;
  name: string;
  name_en: string | null;
  description: string | null;
  description_en: string | null;
  category: string;
  subcategory: string | null;
  price: number | null;
  original_price: number | null;
  images: string[] | null;
  specifications: any;
  features: string[] | null;
  is_featured: boolean | null;
}

const DatabaseProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useLangNavigate();
  const { language, baseLang, t } = useLanguage();
  const isEn = baseLang === 'en';
  const langCode = language as LanguageCode;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        navigate('/products');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .eq('is_published', true)
          .maybeSingle();

        if (error) throw error;
        
        if (!data) {
          navigate('/products');
          return;
        }

        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return null;
  }

  const productName = isEn && product.name_en ? product.name_en : product.name;
  const productDescription = isEn && product.description_en ? product.description_en : product.description;
  const images = product.images || [];
  const features = product.features || [];

  // Create domain and URLs for structured data
  const currentDomain = getDomainForLanguage(langCode);
  const productUrl = `${currentDomain}/products/detail/${product.id}`;
  const productImage = images.length > 0 
    ? (images[0].startsWith('http') ? images[0] : `${currentDomain}${images[0]}`)
    : `${currentDomain}/logo.png`;

  // Create product structured data
  const productStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    description: productDescription || productName,
    image: images.map(img => img.startsWith('http') ? img : `${currentDomain}${img}`),
    url: productUrl,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'CANI',
    },
    category: product.subcategory || product.category,
    manufacturer: {
      '@type': 'Organization',
      name: t('company.fullName'),
      url: currentDomain,
    },
    offers: product.price ? {
      '@type': 'Offer',
      priceCurrency: 'CNY',
      price: product.price,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: t('company.name'),
      },
    } : {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: t('company.name'),
      },
    },
    inLanguage: getHtmlLang(langCode),
  };

  // Create breadcrumb structured data
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('nav.home'),
        item: currentDomain,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('nav.products'),
        item: `${currentDomain}/products`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: productName,
        item: productUrl,
      },
    ],
  };

  return (
    <>
      <MultiLanguageSEO
        title={`${productName} - ${t('company.name')}`}
        description={productDescription || productName}
        path={`/products/detail/${product.id}`}
      />
      {/* Product JSON-LD Structured Data */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(productStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background">
        <BackButton to="/products" />

        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="bg-card rounded-2xl p-8 border border-border aspect-square flex items-center justify-center">
                  {images.length > 0 ? (
                    <img
                      src={images[activeImage]}
                      alt={`CANI ${productName} - Industrial UAV Component Product Photo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-muted-foreground flex flex-col items-center gap-2">
                      <ImageOff className="w-16 h-16" />
                      <span>{t('productDetail.noImage')}</span>
                    </div>
                  )}
                </div>
                
                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                          activeImage === index
                            ? 'border-primary'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`CANI ${productName} - Detail View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {product.is_featured && (
                    <Badge className="bg-amber-500/20 text-amber-600 border-amber-500/30">
                      {t('productDetail.featured')}
                    </Badge>
                  )}
                  {product.subcategory && (
                    <Badge variant="secondary">{product.subcategory}</Badge>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{productName}</h1>
                
                {productDescription && (
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {productDescription}
                  </p>
                )}


                {/* Features */}
                {features.length > 0 && (
                  <div className="space-y-2 mb-8">
                    <h3 className="font-semibold text-foreground mb-3">
                      {t('productDetail.keyFeatures')}
                    </h3>
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link to="/contact">
                      {t('productDetail.getQuote')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#specs">
                      <Phone className="mr-2 h-4 w-4" />
                      {t('productDetail.contactUs')}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications Section */}
        <div id="specs">
          <ProductSpecifications specifications={product.specifications} />
        </div>
      </main>
      <FloatingContact />
      <Footer />
    </>
  );
};

export default DatabaseProductDetail;
