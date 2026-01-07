import { useParams, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { ArrowRight, Phone, Monitor, Tv, Satellite, Navigation, Check, Shield, Zap, Settings } from "lucide-react";
import { otherAccessoriesProducts } from "@/data/otherAccessoriesProducts";
import { useLanguage } from "@/contexts/LanguageContext";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "IPS高清屏": Monitor,
  "40频道接收": Satellite,
  "内置DVR录像": Tv,
  "内置电池": Zap,
  "便携设计": Shield,
  "即插即用": Check,
  "双接收分集": Satellite,
  "沉浸式体验": Tv,
  "40频道覆盖": Satellite,
  "内置DVR": Tv,
  "长续航电池": Zap,
  "舒适佩戴": Shield,
  "入门首选": Check,
  "DVR录像": Tv,
  "遮光罩": Shield,
  "7寸大屏": Monitor,
  "高亮度": Monitor,
  "宽电压输入": Zap,
  "专业应用": Shield,
  "M10高性能芯片": Satellite,
  "快速搜星": Navigation,
  "高定位精度": Navigation,
  "120mm标准孔距": Settings,
  "低功耗": Zap,
  "180mm孔距": Settings,
  "快速定位": Navigation,
  "轻量化": Shield,
  "简单安装": Check,
  "250mm孔距": Settings,
  "稳定可靠": Shield,
  "轻量设计": Shield,
  "GPS+罗盘二合一": Satellite,
  "5883高精度罗盘": Navigation,
  "M10 GPS芯片": Satellite,
  "一体化设计": Settings,
  "双接口": Settings,
  "二合一设计": Settings,
  "5883电子罗盘": Navigation,
  "M10定位芯片": Satellite,
  "抗干扰设计": Shield,
};

const OtherAccessoriesDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = otherAccessoriesProducts.find(p => p.id === productId);
  const { language } = useLanguage();
  const isEn = language === 'en';

  if (!product) {
    return <Navigate to="/products/accessories/others" replace />;
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title={`${product.name} - ${isEn ? "Other Accessories" : "其他配件"}`}
        description={product.description}
        keywords={`${product.name},${product.keyFeatures.join(',')}`}
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="bg-secondary py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <Link to="/" className="hover:text-accent">{isEn ? "Home" : "首页"}</Link>
              <span>/</span>
              <Link to="/products/accessories" className="hover:text-accent">{isEn ? "Accessories" : "配件及设备"}</Link>
              <span>/</span>
              <Link to="/products/accessories/others" className="hover:text-accent">{isEn ? "Other Accessories" : "其他配件"}</Link>
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
                  {product.category === "monitor" ? <Tv className="w-4 h-4" /> : <Satellite className="w-4 h-4" />}
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
                        {isEn ? "Inquire Now" : "立即咨询"}
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="border-white/50 text-white hover:bg-white/10 px-6 py-3"
                    >
                      {isEn ? "Download Manual" : "下载手册"}
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
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{isEn ? "Product Features" : "产品特性"}</h2>
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
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{isEn ? "Technical Specifications" : "技术规格"}</h2>
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
              {isEn ? "Need More Information?" : "需要更多信息？"}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Contact us for detailed product information, technical support or bulk purchase quotes"
                : "联系我们获取详细产品资料、技术支持或批量采购报价"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                  {isEn ? "Contact Us" : "联系我们"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/products/accessories/others">
                <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-8 py-6 text-lg">
                  {isEn ? "View All Accessories" : "查看全部配件"}
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

export default OtherAccessoriesDetail;
