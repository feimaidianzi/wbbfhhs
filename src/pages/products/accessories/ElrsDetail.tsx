import { useParams, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { ArrowRight, Phone, Radio, Wifi, Zap, Signal, Shield, Settings, Check } from "lucide-react";
import { elrsProducts } from "@/data/elrsProducts";
import { useLanguage } from "@/contexts/LanguageContext";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "双天线分集接收": Radio,
  "超远控制距离": Signal,
  "超低延迟": Zap,
  "固件可升级": Settings,
  "轻量化设计": Shield,
  "多速率支持": Wifi,
  "成熟稳定": Shield,
  "超远距离": Signal,
  "轻巧便携": Shield,
  "简单可靠": Check,
  "开源固件": Settings,
  "超轻量设计": Shield,
  "陶瓷天线": Radio,
  "高刷新率": Zap,
  "入门友好": Check,
  "适合室内": Shield,
  "多功率可选": Settings,
  "LNA信号增强": Signal,
  "更高灵敏度": Signal,
  "更好抗干扰": Shield,
  "适合远距离": Signal,
  "稳定可靠": Shield,
  "Moxon定向设计": Radio,
  "高增益": Signal,
  "遥控器专用": Radio,
  "优质做工": Shield,
  "即插即用": Check,
  "远航必备": Signal,
  "T型设计": Radio,
  "超轻量": Shield,
  "IPEX接口": Settings,
  "稳定信号": Signal,
  "耐用设计": Shield,
  "性价比高": Check,
  "远距离优化": Signal,
  "轻量化": Shield,
  "柔性材质": Shield,
  "简单安装": Check,
  "稳定接收": Signal,
  "耐用可靠": Shield,
};

const ElrsDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = elrsProducts.find(p => p.id === productId);
  const { t } = useLanguage();

  if (!product) {
    return <Navigate to="/products/accessories/elrs" replace />;
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title={`${product.name} - ${t('elrsDetail.seoTitle')}`}
        description={product.description}
        keywords={`${product.name},ELRS,ExpressLRS,${product.keyFeatures.join(',')}`}
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="bg-secondary py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <Link to="/" className="hover:text-accent">{t('nav.home')}</Link>
              <span>/</span>
              <Link to="/products/accessories" className="hover:text-accent">{t('nav.products')}</Link>
              <span>/</span>
              <Link to="/products/accessories/elrs" className="hover:text-accent">ELRS</Link>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-accent/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.08),transparent_50%)]" />
          <div className="relative container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Product Image */}
              <div className="order-2 lg:order-1">
                <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto max-h-[400px] object-contain mx-auto"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Radio className="w-4 h-4" />
                  {product.slogan}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                  {product.name}
                </h1>
                <p className="text-lg text-primary-foreground/80 mb-6">
                  {product.description}
                </p>
                
                {/* Key Features */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {product.keyFeatures.map((feature, i) => (
                    <span key={i} className="bg-white/10 backdrop-blur text-primary-foreground px-4 py-2 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                  <div className="text-4xl font-bold text-accent">{product.price}</div>
                  <div className="flex gap-4">
                    <Link to="/contact">
                      <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3">
                        <Phone className="w-4 h-4 mr-2" />
                        {t('accessoryDetail.inquireNow')}
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="border-white/50 text-white hover:bg-white/10 px-6 py-3"
                    >
                      {t('accessoryDetail.downloadManual')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{t('accessoryDetail.productFeatures')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((feature, index) => {
                const IconComponent = iconMap[feature.title] || Check;
                return (
                  <div 
                    key={index}
                    className="bg-card rounded-xl p-6 border border-border hover:border-accent/50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-card-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Specifications Section */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{t('accessoryDetail.techSpecs')}</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl overflow-hidden shadow-lg">
                {product.specs.map((specGroup, groupIndex) => (
                  <div key={groupIndex} className="border-b border-border last:border-b-0">
                    <div className="bg-primary/5 px-6 py-4">
                      <h3 className="font-bold text-foreground">{specGroup.category}</h3>
                    </div>
                    <div className="divide-y divide-border">
                      {specGroup.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between px-6 py-3">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-medium text-foreground">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t('accessoryDetail.needMoreInfo')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('accessoryDetail.contactDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                  {t('contact.title')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/products/accessories/elrs">
                <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-8 py-6 text-lg">
                  {t('accessoryDetail.viewMoreProducts')}
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

export default ElrsDetail;