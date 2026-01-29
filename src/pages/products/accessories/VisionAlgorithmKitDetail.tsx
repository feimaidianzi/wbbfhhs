import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { SEO } from "@/components/SEO";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, ShoppingCart, FileText } from "lucide-react";
import { getVisionAlgorithmKitById } from "@/data/gimbalProducts";
import { useLanguage } from "@/contexts/LanguageContext";

const VisionAlgorithmKitDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { language } = useLanguage();
  const kit = productId ? getVisionAlgorithmKitById(productId) : undefined;

  if (!kit) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">
              {language === 'zh' ? "产品未找到" : "Product Not Found"}
            </h1>
            <Link to="/products/accessories/gimbal">
              <Button>
                {language === 'zh' ? "返回吊舱列表" : "Back to Gimbal List"}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const name = language === 'zh' ? kit.name : kit.nameEn;
  const description = language === 'zh' ? kit.description : kit.descriptionEn;
  const features = language === 'zh' ? kit.features : kit.featuresEn;
  const highlights = language === 'zh' ? kit.highlights : kit.highlightsEn;
  const specs = language === 'zh' ? kit.specs : (kit.specsEn || kit.specs);

  return (
    <>
      <SEO
        title={`${name} - ${language === 'zh' ? "长凌科技" : "CANI Technology"}`}
        description={description}
        keywords={features.join(",")}
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4">
            <BackButton 
              to="/products/accessories/gimbal" 
              label={language === 'zh' ? "返回吊舱/云台" : "Back to Gimbal"} 
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-[4/3] bg-muted rounded-xl overflow-hidden">
                  <img
                    src={kit.image}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {kit.gallery && kit.gallery.length > 1 && (
                  <div className="grid grid-cols-3 gap-4">
                    {kit.gallery.slice(0, 3).map((img, idx) => (
                      <div key={idx} className="aspect-square bg-muted rounded-lg overflow-hidden">
                        <img
                          src={img}
                          alt={`${name} ${idx + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="space-y-6">
                <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>
                <p className="text-lg text-muted-foreground">{description}</p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h3 className="font-semibold">
                    {language === 'zh' ? "核心特性" : "Key Features"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {kit.purchaseUrl && (
                    <a href={kit.purchaseUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        {language === 'zh' ? "立即购买" : "Buy Now"}
                      </Button>
                    </a>
                  )}
                  {kit.documentUrl && (
                    <a href={kit.documentUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="gap-2">
                        <FileText className="w-4 h-4" />
                        {language === 'zh' ? "查看文档" : "View Docs"}
                      </Button>
                    </a>
                  )}
                  <Link to="/contact">
                    <Button variant="outline" className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      {language === 'zh' ? "联系咨询" : "Contact Us"}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">
              {language === 'zh' ? "规格参数" : "Specifications"}
            </h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="divide-y divide-border">
                {Object.entries(specs).map(([key, value], idx) => (
                  <div key={idx} className="flex">
                    <div className="w-1/3 px-6 py-4 bg-muted/50 font-medium">
                      {key}
                    </div>
                    <div className="w-2/3 px-6 py-4">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {language === 'zh' ? "需要定制化解决方案？" : "Need a Custom Solution?"}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {language === 'zh' 
                ? "我们提供专业的技术支持和定制开发服务，满足您的特定需求"
                : "We provide professional technical support and custom development services to meet your specific needs"}
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2"
              >
                {language === 'zh' ? "联系我们" : "Contact Us"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
};

export default VisionAlgorithmKitDetail;
