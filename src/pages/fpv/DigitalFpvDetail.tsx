import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Download, Phone, Mail, Wifi, Zap, Monitor, HardDrive, Radio, Settings, Antenna, Cable, Thermometer, Target } from "lucide-react";
import { useParams, Navigate } from "react-router-dom";
import { LangLink as Link } from "@/components/LangLink";
import { BackButton } from "@/components/BackButton";
import { digitalFpvProducts } from "@/data/digitalFpvProducts";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const DigitalFpvDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { language, t } = useLanguage();
  const product = digitalFpvProducts.find(p => p.id === productId);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return <Navigate to="/products/accessories/digital-fpv" replace />;
  }

  // Use a function to map feature title keys to icons
  const getFeatureIcon = (titleKey: string): typeof Wifi => {
    const keyMap: Record<string, typeof Wifi> = {
      'digitalFpv.feature.hd': Monitor,
      'digitalFpv.feature.lowLatency': Zap,
      'digitalFpv.feature.1080p': Monitor,
      'digitalFpv.feature.recording': HardDrive,
      'digitalFpv.feature.longRange': Radio,
      'digitalFpv.feature.sdr': Settings,
      'digitalFpv.feature.fhss': Antenna,
      'digitalFpv.feature.networking': Cable,
      'digitalFpv.feature.wideVoltage': Zap,
      'digitalFpv.feature.fcCompat': Target,
    };
    for (const [key, icon] of Object.entries(keyMap)) {
      if (titleKey.includes(key) || titleKey === key) return icon;
    }
    return Wifi;
  };

  const isS900 = product.id === "s900-datalink";

  // Build JSON-LD Product schema with additionalProperty
  const productJsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: `CaniUAV ${t(product.nameKey)}`,
    description: t(product.descriptionKey),
    image: product.image,
    brand: { '@type': 'Brand', name: 'CaniUAV' },
    sku: `CANI-${product.id.toUpperCase()}`,
    manufacturer: {
      '@type': 'Organization',
      name: language === 'zh' ? '长凌科技有限公司' : 'CANI Technology Co., Ltd.',
    },
    additionalProperty: product.specs.flatMap(specGroup =>
      specGroup.items.map(item => ({
        '@type': 'PropertyValue',
        name: t(item.labelKey),
        value: item.value,
      }))
    ),
  };

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO 
        title={`${t(product.nameKey)} - ${t('digitalFpv.title')}`}
        description={t(product.descriptionKey)}
        keywords={`${t('digitalFpv.title')},${t(product.nameKey)},FPV,${t('digitalFpv.seo.keywords')}`}
        path={`/products/accessories/digital-fpv/${productId}`}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>
      </Helmet>
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="bg-secondary py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">{t('nav.home')}</Link>
              <span>/</span>
              <Link to="/products/accessories" className="hover:text-accent">{t('nav.products.accessories')}</Link>
              <span>/</span>
              <Link to="/products/accessories/digital-fpv" className="hover:text-accent">{t('digitalFpv.title')}</Link>
              <span>/</span>
              <span className="text-foreground">{t(product.nameKey)}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary via-primary/95 to-accent/20">
          <div className="container-custom">
            <BackButton to="/products/accessories/digital-fpv" label={t('digitalFpv.backToDigitalFpv')} />
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-accent font-medium mb-2">{t(product.sloganKey)}</div>
                <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                  {t(product.nameKey)}
                </h1>
                <p className="text-xl text-primary-foreground/80 mb-2">{t(product.subSloganKey)}</p>
                <p className="text-primary-foreground/70 mb-6">{t(product.descriptionKey)}</p>
                
                {/* Key Features */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {product.keyFeatureKeys.map((featureKey, index) => (
                    <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      <span className="text-primary-foreground text-sm">{t(featureKey)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-4 mt-6">
                  <Link to="/contact">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6">
                      {t('common.inquireNow')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white">
                    <Download className="w-4 h-4 mr-2" />
                    {t('common.downloadManual')}
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white/10 backdrop-blur rounded-3xl p-8">
                  <img
                    src={product.gallery[selectedImage] || product.image}
                    alt={`${t(product.nameKey)} - CaniUAV industrial digital video transmission system`}
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
                {/* Thumbnail gallery */}
                {product.gallery.length > 1 && (
                  <div className="flex gap-2 mt-4 justify-center flex-wrap">
                    {product.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === idx ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`${t(product.nameKey)} view ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* S900 Highlight Stats */}
        {isS900 && (
          <section className="py-12 bg-accent/10">
            <div className="container-custom">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-card rounded-2xl shadow-card">
                  <div className="text-4xl font-bold text-accent mb-2">12KM</div>
                  <div className="text-muted-foreground text-sm">{t('digitalFpv.s900.stat.range')}</div>
                </div>
                <div className="text-center p-6 bg-card rounded-2xl shadow-card">
                  <div className="text-4xl font-bold text-accent mb-2">1Mbps</div>
                  <div className="text-muted-foreground text-sm">{t('digitalFpv.s900.stat.airRate')}</div>
                </div>
                <div className="text-center p-6 bg-card rounded-2xl shadow-card">
                  <div className="text-4xl font-bold text-accent mb-2">100mW</div>
                  <div className="text-muted-foreground text-sm">{t('digitalFpv.s900.stat.power')}</div>
                </div>
                <div className="text-center p-6 bg-card rounded-2xl shadow-card">
                  <div className="text-4xl font-bold text-accent mb-2">21g</div>
                  <div className="text-muted-foreground text-sm">{t('digitalFpv.s900.stat.weight')}</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* S900 Interface Section */}
        {isS900 && (
          <section className="py-16 bg-background">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('digitalFpv.s900.interface.title')}</h2>
                <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex gap-4 items-start p-4 bg-card rounded-xl shadow-card">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Antenna className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{t('digitalFpv.s900.interface.antenna')}</h4>
                      <p className="text-muted-foreground text-sm">{t('digitalFpv.s900.interface.antennaDesc')}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 bg-card rounded-xl shadow-card">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Settings className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{t('digitalFpv.s900.interface.modeSwitch')}</h4>
                      <p className="text-muted-foreground text-sm">{t('digitalFpv.s900.interface.modeSwitchDesc')}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 bg-card rounded-xl shadow-card">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Radio className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{t('digitalFpv.s900.interface.bind')}</h4>
                      <p className="text-muted-foreground text-sm">{t('digitalFpv.s900.interface.bindDesc')}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 bg-card rounded-xl shadow-card">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Cable className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{t('digitalFpv.s900.interface.typec')}</h4>
                      <p className="text-muted-foreground text-sm">{t('digitalFpv.s900.interface.typecDesc')}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 bg-card rounded-xl shadow-card">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{t('digitalFpv.s900.interface.gh125')}</h4>
                      <p className="text-muted-foreground text-sm">{t('digitalFpv.s900.interface.gh125Desc')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <img src={product.gallery[0]} alt="S900 UAV Datalink Radio front view" className="rounded-xl shadow-lg" />
                  <img src={product.gallery[3]} alt="S900 UAV Datalink Radio side view" className="rounded-xl shadow-lg" />
                  <img src={product.gallery[6]} alt="S900 UAV Datalink Radio interface detail" className="rounded-xl shadow-lg" />
                  <img src={product.gallery[1]} alt="S900 UAV Datalink Radio top view" className="rounded-xl shadow-lg" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('common.productFeatures')}</h2>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.features.map((feature, index) => {
                const IconComponent = getFeatureIcon(feature.titleKey);
                return (
                  <div key={index} className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{t(feature.titleKey)}</h3>
                    <p className="text-muted-foreground text-sm">{t(feature.descriptionKey)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* S900 Software Config Section */}
        {isS900 && (
          <section className="py-16 bg-background">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('digitalFpv.s900.software.title')}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">{t('digitalFpv.s900.software.desc')}</p>
                <div className="w-20 h-1 bg-accent mx-auto rounded-full mt-4" />
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-bold mb-2">{t('digitalFpv.s900.software.baudRate')}</h4>
                  <p className="text-muted-foreground text-sm">{t('digitalFpv.s900.software.baudRateDesc')}</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Radio className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-bold mb-2">{t('digitalFpv.s900.software.airRate')}</h4>
                  <p className="text-muted-foreground text-sm">{t('digitalFpv.s900.software.airRateDesc')}</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-bold mb-2">{t('digitalFpv.s900.software.txPower')}</h4>
                  <p className="text-muted-foreground text-sm">{t('digitalFpv.s900.software.txPowerDesc')}</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Cable className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-bold mb-2">{t('digitalFpv.s900.software.workMode')}</h4>
                  <p className="text-muted-foreground text-sm">{t('digitalFpv.s900.software.workModeDesc')}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Gallery Section for S900 */}
        {isS900 && (
          <section className="py-16 bg-secondary">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('common.productGallery')}</h2>
                <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {product.gallery.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="aspect-square rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all cursor-pointer"
                    onClick={() => setSelectedImage(idx)}
                  >
                    <img 
                      src={img} 
                      alt={`${t(product.nameKey)} - industrial UAV datalink view ${idx + 1}`} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Specifications Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('common.techSpecs')}</h2>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.specs.map((specGroup, groupIndex) => (
                <div key={groupIndex} className="bg-card rounded-xl overflow-hidden shadow-card">
                  <div className="bg-primary px-6 py-4">
                    <h3 className="text-lg font-bold text-primary-foreground">{t(specGroup.categoryKey)}</h3>
                  </div>
                  <div className="p-6">
                    <table className="w-full">
                      <tbody>
                        {specGroup.items.map((item, itemIndex) => (
                          <tr key={itemIndex} className="border-b border-border last:border-0">
                            <td className="py-3 text-muted-foreground text-sm w-1/3">{t(item.labelKey)}</td>
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
                  {t('common.needMoreInfo')}
                </h2>
                <p className="text-primary-foreground/80 mb-6">
                  {t('digitalFpv.cta.subtitle')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6">
                      {t('common.inquireNow')}
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
                    <div className="text-primary-foreground/60 text-sm">{t('contact.phone')}</div>
                    <div className="text-primary-foreground font-bold">17674048404</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-primary-foreground/60 text-sm">{t('contact.email')}</div>
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
