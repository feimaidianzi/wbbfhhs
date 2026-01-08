import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingContact } from '@/components/FloatingContact';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductSpecifications from '@/components/ProductSpecifications';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Check, Loader2, Phone, ArrowRight, ImageOff } from 'lucide-react';

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
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isEn = language === 'en';
  
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

  return (
    <>
      <SEO
        title={`${productName} - ${isEn ? 'FeiMai Technology' : '飞迈科技'}`}
        description={productDescription || productName}
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <section className="pt-8 pb-4 bg-muted/30">
          <div className="container mx-auto px-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              {isEn ? 'Back to Products' : '返回产品列表'}
            </Link>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="bg-card rounded-2xl p-8 border border-border aspect-square flex items-center justify-center">
                  {images.length > 0 ? (
                    <img
                      src={images[activeImage]}
                      alt={productName}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-muted-foreground flex flex-col items-center gap-2">
                      <ImageOff className="w-16 h-16" />
                      <span>{isEn ? 'No image' : '暂无图片'}</span>
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
                          alt={`${productName} ${index + 1}`}
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
                      {isEn ? 'Featured' : '推荐'}
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

                {/* Price */}
                {product.price && (
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-bold text-primary">
                      ¥{product.price.toLocaleString()}
                    </span>
                    {product.original_price && product.original_price > product.price && (
                      <span className="text-lg text-muted-foreground line-through">
                        ¥{product.original_price.toLocaleString()}
                      </span>
                    )}
                  </div>
                )}

                {/* Features */}
                {features.length > 0 && (
                  <div className="space-y-2 mb-8">
                    <h3 className="font-semibold text-foreground mb-3">
                      {isEn ? 'Key Features' : '产品特性'}
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
                      {isEn ? 'Get Quote' : '获取报价'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#specs">
                      <Phone className="mr-2 h-4 w-4" />
                      {isEn ? 'Contact Us' : '电话咨询'}
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
