import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { SEO } from "@/components/SEO";
import { BackButton } from "@/components/BackButton";
import { cameraProducts } from "@/data/cameraProducts";
import { ArrowRight, Check, Camera, Wifi, Droplets, Monitor, Battery, Aperture, Package } from "lucide-react";
import sj4000Lens from "@/assets/camera/sj4000-lens.png";
import sj4000Colors from "@/assets/camera/sj4000-colors.png";
import sj4000Accessories from "@/assets/camera/sj4000-accessories.png";

const featureIcons: Record<string, React.ReactNode> = {
  "1200万像素COMS大广角成像": <Aperture className="w-8 h-8" />,
  "1080P高清画质": <Monitor className="w-8 h-8" />,
  "WiFi无线传输": <Wifi className="w-8 h-8" />,
  "30米防水设计": <Droplets className="w-8 h-8" />,
  "多种安装配件": <Camera className="w-8 h-8" />,
  "移动侦测功能": <Battery className="w-8 h-8" />,
};

const CameraDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = cameraProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">产品未找到</h1>
            <Link to="/products/accessories/camera" className="text-primary hover:underline">
              返回相机列表
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${product.name} - 飞迈科技`}
        description={`${product.slogan}。${product.highlights.join("，")}`}
        keywords={`${product.model},运动相机,高清相机,WiFi相机,防水相机`}
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <BackButton to="/products/accessories/camera" label="返回相机列表" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
              <div className="order-2 lg:order-1">
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm mb-4">
                  {product.model}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {product.slogan}
                </h1>
                <p className="text-xl text-white/80 mb-6">{product.subSlogan}</p>
                
                {/* Key Features */}
                <div className="grid grid-cols-5 gap-3 mb-8">
                  {product.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="text-lg font-bold text-primary">{feature.value}</div>
                      <div className="text-xs text-white/60">{feature.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <Link
                    to="/contact"
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                  >
                    立即咨询
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lens & Sensor Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src={sj4000Lens}
                  alt="1200万像素CMOS大广角成像"
                  className="w-full max-w-lg mx-auto"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">1200万像素COMS大广角成像</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  170度大广角，拍摄视野更加宽广，1200万像素拍照图像质量进一步提升。配备2.0英寸高清炫丽显示屏，您可以边看边拍，尽情享受拍摄的乐趣！
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-card rounded-xl border border-border">
                    <Camera className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground">1200万像素</div>
                  </div>
                  <div className="text-center p-4 bg-card rounded-xl border border-border">
                    <Aperture className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground">170°广角</div>
                  </div>
                  <div className="text-center p-4 bg-card rounded-xl border border-border">
                    <Monitor className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground">2.0寸屏幕</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">产品特点</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                专业级运动相机，满足各种极限运动拍摄需求
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                    {featureIcons[feature.title] || <Camera className="w-8 h-8" />}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Colors Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">多彩外观</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                多种颜色可选，展现你的个性风格
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <img
                src={sj4000Colors}
                alt="SJ4000 多彩外观"
                className="w-full rounded-xl"
              />
            </div>
          </div>
        </section>

        {/* Specs Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">技术规格</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                详细参数一览
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.specs.map((specGroup, idx) => (
                  <div key={idx} className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="px-6 py-4 bg-muted/50 border-b border-border">
                      <h3 className="font-semibold">{specGroup.category}</h3>
                    </div>
                    <div className="p-6">
                      <table className="w-full">
                        <tbody>
                          {specGroup.items.map((item, itemIdx) => (
                            <tr key={itemIdx} className="border-b border-border last:border-0">
                              <td className="py-3 text-muted-foreground text-sm w-1/3">{item.label}</td>
                              <td className="py-3 text-sm">{item.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Package Contents Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">标准配件</h2>
                <p className="text-muted-foreground mb-6">
                  丰富的安装配件，满足各种使用场景
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {product.packageContents.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img
                  src={sj4000Accessories}
                  alt="SJ4000 标准配件"
                  className="w-full max-w-lg mx-auto rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              准备好开启您的拍摄之旅？
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              联系我们获取详细报价和技术支持
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                to="/contact"
                className="px-8 py-3 bg-background text-foreground font-medium rounded-lg hover:bg-background/90 transition-colors"
              >
                联系我们
              </Link>
              <Link
                to="/products/accessories/camera"
                className="px-8 py-3 border border-white/30 font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                查看更多产品
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
};

export default CameraDetail;
