import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Download, Phone, Mail, Wifi, Zap, Monitor, HardDrive } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { BackButton } from "@/components/BackButton";
import { digitalFpvProducts } from "@/data/digitalFpvProducts";
import { SEO } from "@/components/SEO";

const DigitalFpvDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = digitalFpvProducts.find(p => p.id === productId);

  if (!product) {
    return <Navigate to="/products/accessories/digital-fpv" replace />;
  }

  const iconMap: Record<string, typeof Wifi> = {
    "高清数字传输": Monitor,
    "低延迟设计": Zap,
    "1080P高清输出": Monitor,
    "内置录像功能": HardDrive,
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title={`${product.name} - 数字图传`}
        description={product.description}
        keywords={`数字图传,${product.name},FPV,高清视频传输`}
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="bg-secondary py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">首页</Link>
              <span>/</span>
              <Link to="/products/accessories" className="hover:text-accent">配件及设备</Link>
              <span>/</span>
              <Link to="/products/accessories/digital-fpv" className="hover:text-accent">数字图传</Link>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary via-primary/95 to-accent/20">
          <div className="container-custom">
            <BackButton to="/products/accessories/digital-fpv" label="返回数字图传" />
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-accent font-medium mb-2">{product.slogan}</div>
                <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                  {product.name}
                </h1>
                <p className="text-xl text-primary-foreground/80 mb-2">{product.subSlogan}</p>
                <p className="text-primary-foreground/70 mb-6">{product.description}</p>
                
                {/* Key Features */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {product.keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      <span className="text-primary-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="text-3xl font-bold text-accent">{product.price}</div>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-6">
                  <Link to="/contact">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6">
                      立即咨询
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-white/50 text-white hover:bg-white/10">
                    <Download className="w-4 h-4 mr-2" />
                    下载手册
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white/10 backdrop-blur rounded-3xl p-8">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">产品特点</h2>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.features.map((feature, index) => {
                const IconComponent = iconMap[feature.title] || Wifi;
                return (
                  <div key={index} className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
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
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">技术规格</h2>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.specs.map((specGroup, groupIndex) => (
                <div key={groupIndex} className="bg-card rounded-xl overflow-hidden shadow-card">
                  <div className="bg-primary px-6 py-4">
                    <h3 className="text-lg font-bold text-primary-foreground">{specGroup.category}</h3>
                  </div>
                  <div className="p-6">
                    <table className="w-full">
                      <tbody>
                        {specGroup.items.map((item, itemIndex) => (
                          <tr key={itemIndex} className="border-b border-border last:border-0">
                            <td className="py-3 text-muted-foreground text-sm w-1/3">{item.label}</td>
                            <td className="py-3 text-foreground text-sm font-medium">{item.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                  需要更多信息？
                </h2>
                <p className="text-primary-foreground/80 mb-6">
                  联系我们的专业技术团队，获取产品详细信息和技术支持
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6">
                      立即咨询
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-primary-foreground/10 backdrop-blur rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-primary-foreground/60 text-sm">服务热线</div>
                    <div className="text-primary-foreground font-bold">400-XXX-XXXX</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-primary-foreground/60 text-sm">电子邮箱</div>
                    <div className="text-primary-foreground font-bold">support@example.com</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default DigitalFpvDetail;
