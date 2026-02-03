import { useParams, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, AlertTriangle, Cpu, Zap, Package } from "lucide-react";
import { getFcEscProductById } from "@/data/fcEscProducts";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
const FcEscDetail = () => {
  const {
    productId
  } = useParams<{
    productId: string;
  }>();
  const product = productId ? getFcEscProductById(productId) : null;
  const [selectedImage, setSelectedImage] = useState(0);
  const {
    language
  } = useLanguage();
  const isEn = language === 'en';
  if (!product) {
    return <Navigate to="/products/accessories/fc-esc" replace />;
  }
  const images = product.images || [product.image];
  return <>
      <SEO title={`${product.name} ${product.model} - ${isEn ? "FeiMai Technology" : "飞迈科技"}`} description={`${product.name}，${product.category}，${product.highlights.slice(0, 3).join('，')}，${isEn ? "Professional FPV Electronics" : "专业FPV电子产品"}`} />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <section className="pt-8 pb-4 bg-muted/30">
          <div className="container mx-auto px-4">
            <Link to="/products/accessories/fc-esc" className="inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft className="w-4 h-4" />
              {isEn ? "Back to FC/ESC Series" : "返回飞塔系列"}
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
                  <img src={images[selectedImage]} alt={product.name} className="max-h-full max-w-full object-contain" />
                </div>
                {images.length > 1 && <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, idx) => <button key={idx} onClick={() => setSelectedImage(idx)} className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${selectedImage === idx ? 'border-primary' : 'border-border hover:border-primary/50'}`}>
                        
                      </button>)}
                  </div>}
              </div>

              {/* Product Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">{product.category}</span>
                  <span className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full">{product.price}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
                <p className="text-xl text-muted-foreground mb-6">{product.model}</p>
                
                {/* Highlights */}
                <div className="space-y-2 mb-8">
                  {product.highlights.map((highlight, idx) => <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>)}
                </div>

                <div className="flex gap-4">
                  <Button size="lg" asChild>
                    <Link to="/contact">{isEn ? "Get Quote" : "获取报价"}</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#specs">{isEn ? "View Specs" : "查看规格"}</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Description */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{isEn ? "Product Features" : "产品特色"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.description.map((desc, idx) => <div key={idx} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                  <Cpu className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{desc}</span>
                </div>)}
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section id="specs" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{isEn ? "Technical Specifications" : "技术参数"}</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* FC Specs */}
              {product.fcSpecs && <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="px-6 py-4 bg-primary/10 border-b border-border">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-primary" />
                      {isEn ? "Flight Controller Specs" : "飞控参数"}
                    </h3>
                  </div>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30 w-1/3">{isEn ? "Processor" : "处理器"}</td>
                        <td className="px-6 py-3">{product.fcSpecs.mcu}</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30">{isEn ? "Gyroscope" : "陀螺仪"}</td>
                        <td className="px-6 py-3">{product.fcSpecs.gyro}</td>
                      </tr>
                      {product.fcSpecs.osd && <tr className="border-b border-border">
                          <td className="px-6 py-3 font-medium bg-muted/30">OSD</td>
                          <td className="px-6 py-3">{product.fcSpecs.osd}</td>
                        </tr>}
                      {product.fcSpecs.blackbox && <tr className="border-b border-border">
                          <td className="px-6 py-3 font-medium bg-muted/30">{isEn ? "Blackbox" : "黑匣子"}</td>
                          <td className="px-6 py-3">{product.fcSpecs.blackbox}</td>
                        </tr>}
                      {product.fcSpecs.uart && <tr className="border-b border-border">
                          <td className="px-6 py-3 font-medium bg-muted/30">UART</td>
                          <td className="px-6 py-3">{product.fcSpecs.uart}</td>
                        </tr>}
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30">{isEn ? "Input Voltage" : "输入电压"}</td>
                        <td className="px-6 py-3">{product.fcSpecs.voltage}</td>
                      </tr>
                      {product.fcSpecs.bec && <tr className="border-b border-border">
                          <td className="px-6 py-3 font-medium bg-muted/30">{isEn ? "BEC Output" : "BEC输出"}</td>
                          <td className="px-6 py-3">{product.fcSpecs.bec}</td>
                        </tr>}
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30">{isEn ? "Size/Mounting" : "尺寸/孔距"}</td>
                        <td className="px-6 py-3">{product.fcSpecs.size}</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30">{isEn ? "Weight" : "重量"}</td>
                        <td className="px-6 py-3">{product.fcSpecs.weight}</td>
                      </tr>
                      {product.fcSpecs.firmware && <tr>
                          <td className="px-6 py-3 font-medium bg-muted/30">{isEn ? "Firmware Support" : "固件支持"}</td>
                          <td className="px-6 py-3">{product.fcSpecs.firmware}</td>
                        </tr>}
                    </tbody>
                  </table>
                </div>}

              {/* ESC Specs */}
              {product.escSpecs && <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="px-6 py-4 bg-primary/10 border-b border-border">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      {isEn ? "ESC Specs" : "电调参数"}
                    </h3>
                  </div>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30 w-1/3">{isEn ? "Continuous Current" : "持续电流"}</td>
                        <td className="px-6 py-3">{product.escSpecs.current}</td>
                      </tr>
                      {product.escSpecs.peakCurrent && <tr className="border-b border-border">
                          <td className="px-6 py-3 font-medium bg-muted/30">{isEn ? "Peak Current" : "峰值电流"}</td>
                          <td className="px-6 py-3">{product.escSpecs.peakCurrent}</td>
                        </tr>}
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30">{isEn ? "Input Voltage" : "输入电压"}</td>
                        <td className="px-6 py-3">{product.escSpecs.voltage}</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30">{isEn ? "Protocol Support" : "协议支持"}</td>
                        <td className="px-6 py-3">{product.escSpecs.protocol}</td>
                      </tr>
                      {product.escSpecs.mosfet && <tr className="border-b border-border">
                          <td className="px-6 py-3 font-medium bg-muted/30">{isEn ? "MOSFET" : "MOS管"}</td>
                          <td className="px-6 py-3">{product.escSpecs.mosfet}</td>
                        </tr>}
                      {product.escSpecs.pcbLayers && <tr className="border-b border-border">
                          <td className="px-6 py-3 font-medium bg-muted/30">{isEn ? "PCB Layers" : "PCB层数"}</td>
                          <td className="px-6 py-3">{product.escSpecs.pcbLayers}</td>
                        </tr>}
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30">{isEn ? "Size/Mounting" : "尺寸/孔距"}</td>
                        <td className="px-6 py-3">{product.escSpecs.size}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 font-medium bg-muted/30">{isEn ? "Weight" : "重量"}</td>
                        <td className="px-6 py-3">{product.escSpecs.weight}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>}
            </div>
          </div>
        </section>

        {/* Features */}
        {product.features && product.features.length > 0 && <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">{isEn ? "Product Features" : "产品特点"}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.features.map((feature, idx) => <div key={idx} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>)}
              </div>
            </div>
          </section>}

        {/* Package Includes */}
        {product.packageIncludes && product.packageIncludes.length > 0 && <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <Package className="w-6 h-6 text-primary" />
                {isEn ? "Package Contents" : "包装清单"}
              </h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {product.packageIncludes.map((item, idx) => <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>)}
                </ul>
              </div>
            </div>
          </section>}

        {/* Notes */}
        {product.notes && product.notes.length > 0 && <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">{isEn ? "Notes" : "注意事项"}</h2>
              <div className="space-y-4">
                {product.notes.map((note, idx) => <div key={idx} className="flex items-start gap-3 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{note}</span>
                  </div>)}
              </div>
            </div>
          </section>}

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {isEn ? "Need Customized Solutions?" : "需要定制化解决方案？"}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {isEn ? "We offer OEM/ODM customization services, including custom firmware, ESC parameters, and stack configurations." : "我们提供OEM/ODM定制服务，可根据您的需求定制飞控固件、电调参数、飞塔配置等。"}
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">{isEn ? "Contact Us" : "联系我们"}</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 hover:bg-primary-foreground/10" asChild>
                <Link to="/products/accessories/fc-esc">{isEn ? "View More Products" : "查看更多产品"}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </>;
};
export default FcEscDetail;