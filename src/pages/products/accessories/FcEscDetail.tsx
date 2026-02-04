import { useParams, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import { Check, AlertTriangle, Cpu, Zap, Package } from "lucide-react";
import { getFcEscProductById } from "@/data/fcEscProducts";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const FcEscDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getFcEscProductById(productId) : null;
  const [selectedImage, setSelectedImage] = useState(0);
  const { t } = useLanguage();

  if (!product) {
    return <Navigate to="/products/accessories/fc-esc" replace />;
  }

  const images = product.images || [product.image];

  return (
    <>
      <SEO 
        title={`${product.name} ${product.model} - ${t('company.name')}`}
        description={`${product.name}，${product.category}，${product.highlights.slice(0, 3).join('，')}，${t('fcEscDetail.seoDesc')}`}
      />
      <Header />
      <main className="min-h-screen bg-background">
        <BackButton to="/products/accessories/fc-esc" />

        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="bg-card rounded-2xl p-8 border border-border aspect-square flex items-center justify-center">
                  <img src={images[selectedImage]} alt={product.name} className="max-h-full max-w-full object-contain" />
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setSelectedImage(idx)} 
                        className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${selectedImage === idx ? 'border-primary' : 'border-border hover:border-primary/50'}`}
                      >
                        <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
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
                  {product.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button size="lg" asChild>
                    <Link to="/contact">{t('accessoryDetail.getQuote')}</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#specs">{t('accessoryDetail.viewSpecs')}</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Description */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t('accessoryDetail.productFeatures')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.description.map((desc, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                  <Cpu className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section id="specs" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t('accessoryDetail.techSpecs')}</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* FC Specs */}
              {product.fcSpecs && (
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="px-6 py-4 bg-primary/10 border-b border-border">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-primary" />
                      {t('accessoryDetail.fcSpecs')}
                    </h3>
                  </div>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30 w-1/3">{t('accessoryDetail.processor')}</td>
                        <td className="px-6 py-3">{product.fcSpecs.mcu}</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.gyroscope')}</td>
                        <td className="px-6 py-3">{product.fcSpecs.gyro}</td>
                      </tr>
                      {product.fcSpecs.osd && (
                        <tr className="border-b border-border">
                          <td className="px-6 py-3 font-medium bg-muted/30">OSD</td>
                          <td className="px-6 py-3">{product.fcSpecs.osd}</td>
                        </tr>
                      )}
                      {product.fcSpecs.blackbox && (
                        <tr className="border-b border-border">
                          <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.blackbox')}</td>
                          <td className="px-6 py-3">{product.fcSpecs.blackbox}</td>
                        </tr>
                      )}
                      {product.fcSpecs.uart && (
                        <tr className="border-b border-border">
                          <td className="px-6 py-3 font-medium bg-muted/30">UART</td>
                          <td className="px-6 py-3">{product.fcSpecs.uart}</td>
                        </tr>
                      )}
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.inputVoltage')}</td>
                        <td className="px-6 py-3">{product.fcSpecs.voltage}</td>
                      </tr>
                      {product.fcSpecs.bec && (
                        <tr className="border-b border-border">
                          <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.becOutput')}</td>
                          <td className="px-6 py-3">{product.fcSpecs.bec}</td>
                        </tr>
                      )}
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.size')}</td>
                        <td className="px-6 py-3">{product.fcSpecs.size}</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.weight')}</td>
                        <td className="px-6 py-3">{product.fcSpecs.weight}</td>
                      </tr>
                      {product.fcSpecs.firmware && (
                        <tr>
                          <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.firmwareSupport')}</td>
                          <td className="px-6 py-3">{product.fcSpecs.firmware}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* ESC Specs */}
              {product.escSpecs && (
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="px-6 py-4 bg-primary/10 border-b border-border">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      {t('accessoryDetail.escSpecs')}
                    </h3>
                  </div>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30 w-1/3">{t('accessoryDetail.continuousCurrent')}</td>
                        <td className="px-6 py-3">{product.escSpecs.current}</td>
                      </tr>
                      {product.escSpecs.peakCurrent && (
                        <tr className="border-b border-border">
                          <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.peakCurrent')}</td>
                          <td className="px-6 py-3">{product.escSpecs.peakCurrent}</td>
                        </tr>
                      )}
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.inputVoltage')}</td>
                        <td className="px-6 py-3">{product.escSpecs.voltage}</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.protocol')}</td>
                        <td className="px-6 py-3">{product.escSpecs.protocol}</td>
                      </tr>
                      {product.escSpecs.mosfet && (
                        <tr className="border-b border-border">
                          <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.mosfet')}</td>
                          <td className="px-6 py-3">{product.escSpecs.mosfet}</td>
                        </tr>
                      )}
                      {product.escSpecs.pcbLayers && (
                        <tr className="border-b border-border">
                          <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.pcbLayers')}</td>
                          <td className="px-6 py-3">{product.escSpecs.pcbLayers}</td>
                        </tr>
                      )}
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.size')}</td>
                        <td className="px-6 py-3">{product.escSpecs.size}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 font-medium bg-muted/30">{t('accessoryDetail.weight')}</td>
                        <td className="px-6 py-3">{product.escSpecs.weight}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">{t('accessoryDetail.featureHighlights')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Package Includes */}
        {product.packageIncludes && product.packageIncludes.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <Package className="w-6 h-6 text-primary" />
                {t('accessoryDetail.packageContents')}
              </h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {product.packageIncludes.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Notes */}
        {product.notes && product.notes.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">{t('accessoryDetail.notes')}</h2>
              <div className="space-y-4">
                {product.notes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t('accessoryDetail.customSolution')}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {t('accessoryDetail.oemOdm')}
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">{t('contact.title')}</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 hover:bg-primary-foreground/10" asChild>
                <Link to="/products/accessories/fc-esc">{t('accessoryDetail.viewMoreProducts')}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
};

export default FcEscDetail;