import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wifi, Monitor, Zap, Radio } from "lucide-react";
import { Link } from "react-router-dom";
import { BackButton } from "@/components/BackButton";
import { digitalFpvProducts, digitalFpvCategories } from "@/data/digitalFpvProducts";

const DigitalFpv = () => {
  return (
    <div className="min-h-screen">
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
              <span className="text-foreground">数字图传</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <BackButton to="/products/accessories" label="返回配件及设备" />
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                数字图传
              </h1>
              <p className="text-lg text-primary-foreground/90 mb-6">
                高清数字视频传输解决方案，低延迟、高画质，为FPV飞行带来沉浸式体验
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                  <Wifi className="w-5 h-5 text-accent" />
                  <span className="text-primary-foreground text-sm">WiFi传输</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                  <Monitor className="w-5 h-5 text-accent" />
                  <span className="text-primary-foreground text-sm">1080P高清</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                  <Zap className="w-5 h-5 text-accent" />
                  <span className="text-primary-foreground text-sm">低延迟</span>
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
                    <h2 className="text-2xl md:text-3xl font-bold">{category.name}</h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/products/accessories/digital-fpv/${product.id}`}
                      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-secondary to-secondary/50 relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                            {product.price}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="text-accent text-sm font-medium mb-2">{product.slogan}</div>
                        <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">{product.subSlogan}</p>
                        
                        {/* Key Features */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.keyFeatures.map((feature, i) => (
                            <span key={i} className="text-xs bg-secondary text-foreground px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center text-accent text-sm font-medium group-hover:gap-3 gap-1 transition-all">
                          <span>查看详情</span>
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

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              需要技术支持？
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              联系我们的专业技术团队，获取数字图传选型建议和技术支持
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                  联系我们
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/products/accessories">
                <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-8 py-6 text-lg">
                  查看其他配件
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
