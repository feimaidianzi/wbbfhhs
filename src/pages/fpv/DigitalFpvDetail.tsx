import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Download, Phone, Mail, Wifi, Zap, Monitor, HardDrive, Radio, Settings, Antenna, Cable, Thermometer, Target, FileText, BookOpen, Truck, Users, Smartphone, Code, ToggleLeft } from "lucide-react";
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
  const { t } = useLanguage();
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
  const isWifiLink2 = product.id === "wifilink2";
  const isHDA30 = product.id === "hd-1400-a30";
  const isHDA50 = product.id === "hd-1400-a50";
  const isHDSeries = product.id.startsWith("hd-");
  const isHDA100 = product.id === "hd-1400-a100";
  const isHDA150 = product.id === "hd-1400-a150";

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
      name: t('acc.cameradetail.k454'),
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
        title={isS900 ? t('digitalFpv.s900.seo.title') : isWifiLink2 ? t('digitalFpv.wifilink2.seo.title') : isHDA30 ? t('digitalFpv.h.a30.seo.title') : isHDA50 ? t('digitalFpv.h.a50.seo.title') : isHDA100 ? t('digitalFpv.h.a100.seo.title') : isHDA150 ? t('digitalFpv.h.a150.seo.title') : `${t(product.nameKey)} - ${t('digitalFpv.title')}`}
        description={isS900 ? t('digitalFpv.s900.seo.description') : isWifiLink2 ? t('digitalFpv.wifilink2.seo.description') : isHDA30 ? t('digitalFpv.h.a30.seo.description') : isHDA50 ? t('digitalFpv.h.a50.seo.description') : isHDA100 ? t('digitalFpv.h.a100.seo.description') : isHDA150 ? t('digitalFpv.h.a150.seo.description') : t(product.descriptionKey)}
        keywords={`${t('digitalFpv.title')},${t(product.nameKey)},${isS900 ? 'MAVLink,datalink,telemetry,point-to-multipoint,' : isWifiLink2 ? 'OpenIPC,H.265,1080P,WiFi FPV,open-source,Ruby FPV,low-latency HD,' : isHDA30 ? '1.4GHz,BVLOS,OFDM,MIMO,30km datalink,anti-interference,sub-2GHz,tactical video,' : isHDA50 ? '1.4GHz,50km,BVLOS,ultra-long range,strategic datalink,maritime,border surveillance,high-linear PA,' : isHDA100 ? '1.4GHz,100km,BVLOS,strategic microwave,COFDM,earth curvature,maritime surveillance,HALE,tactical datalink,' : isHDA150 ? '1.4GHz,150km,BVLOS,strategic microwave backbone,COFDM,HALE,maritime border surveillance,ultra-long range,-108dBm,tactical datalink,' : isHDSeries ? '1.4GHz,OFDM,MIMO,BVLOS,industrial datalink,' : 'FPV,'}${t('digitalFpv.seo.keywords')}`}
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

        {/* WiFiLink2 Highlight Stats */}
        {isWifiLink2 && (
          <section className="py-12 bg-accent/10">
            <div className="container-custom">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-card rounded-2xl shadow-card">
                  <div className="text-4xl font-bold text-accent mb-2">15g</div>
                  <div className="text-muted-foreground text-sm">{t('fpv.digitalfpvdetail.k885')}</div>
                </div>
                <div className="text-center p-6 bg-card rounded-2xl shadow-card">
                  <div className="text-4xl font-bold text-accent mb-2">90FPS</div>
                  <div className="text-muted-foreground text-sm">{t('fpv.digitalfpvdetail.k886')}</div>
                </div>
                <div className="text-center p-6 bg-card rounded-2xl shadow-card">
                  <div className="text-4xl font-bold text-accent mb-2">IMX415</div>
                  <div className="text-muted-foreground text-sm">{t('fpv.digitalfpvdetail.k887')}</div>
                </div>
                <div className="text-center p-6 bg-card rounded-2xl shadow-card">
                  <div className="text-4xl font-bold text-accent mb-2">OpenIPC</div>
                  <div className="text-muted-foreground text-sm">{t('fpv.digitalfpvdetail.k888')}</div>
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

        {/* S900 Cross-Link: Platform Integration */}
        {isS900 && (
          <section className="py-16 bg-accent/5">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('digitalFpv.s900.crossLink.title')}</h2>
                <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-6" />
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {t('digitalFpv.s900.crossLink.desc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/products/logistics">
                    <Button variant="outline" className="gap-2 px-6 py-5">
                      <Truck className="w-5 h-5" />
                      {t('digitalFpv.s900.crossLink.logistics')}
                    </Button>
                  </Link>
                  <Link to="/products/swarm">
                    <Button variant="outline" className="gap-2 px-6 py-5">
                      <Users className="w-5 h-5" />
                      {t('digitalFpv.s900.crossLink.swarm')}
                    </Button>
                  </Link>
                </div>
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

        {/* WiFiLink2 Open Architecture Section */}
        {isWifiLink2 && (
          <section className="py-16 bg-background">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('digitalFpv.wifilink2.arch.title')}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">{t('digitalFpv.wifilink2.arch.desc')}</p>
                <div className="w-20 h-1 bg-accent mx-auto rounded-full mt-4" />
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Code className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-bold mb-2">{t('digitalFpv.wifilink2.arch.open')}</h4>
                  <p className="text-muted-foreground text-sm">{t('digitalFpv.wifilink2.arch.openDesc')}</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-bold mb-2">{t('digitalFpv.wifilink2.arch.api')}</h4>
                  <p className="text-muted-foreground text-sm">{t('digitalFpv.wifilink2.arch.apiDesc')}</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ToggleLeft className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-bold mb-2">{t('digitalFpv.wifilink2.arch.ruby')}</h4>
                  <p className="text-muted-foreground text-sm">{t('digitalFpv.wifilink2.arch.rubyDesc')}</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-bold mb-2">{t('digitalFpv.wifilink2.arch.mobile')}</h4>
                  <p className="text-muted-foreground text-sm">{t('digitalFpv.wifilink2.arch.mobileDesc')}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* WiFiLink2 Deep Dive Article Link */}
        {isWifiLink2 && (
          <section className="py-12 bg-secondary">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto">
                <Link to="/news/a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d" className="group block bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all overflow-hidden border border-border">
                  <div className="flex flex-col md:flex-row items-center gap-6 p-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-8 h-8 text-accent" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">
                        {t('acc.cameradetail.k457')}
                      </div>
                      <h3 className="text-lg font-bold text-card-foreground group-hover:text-accent transition-colors mb-1">
                        {t('fpv.digitalfpvdetail.k889')}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t('fpv.digitalfpvdetail.k890')}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </div>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* WiFiLink2 Cross-Link: Best Value Positioning */}
        {isWifiLink2 && (
          <section className="py-16 bg-accent/5">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('digitalFpv.wifilink2.crossLink.title')}</h2>
                <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-6" />
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {t('digitalFpv.wifilink2.crossLink.desc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
                  <Link to="/products/accessories/other-accessories">
                    <Button variant="outline" className="gap-2 px-6 py-5">
                      <Monitor className="w-5 h-5" />
                      {t('digitalFpv.wifilink2.crossLink.monitors')}
                    </Button>
                  </Link>
                  <Link to="/products/accessories/vtx-vrx">
                    <Button variant="outline" className="gap-2 px-6 py-5">
                      <Radio className="w-5 h-5" />
                      {t('digitalFpv.wifilink2.crossLink.analog')}
                    </Button>
                  </Link>
                  <Link to="/products/accessories/digital-fpv/s900-datalink">
                    <Button variant="outline" className="gap-2 px-6 py-5">
                      <Antenna className="w-5 h-5" />
                      {t('digitalFpv.wifilink2.crossLink.s900')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* HD-1400-A30 Frequency Advantage Section */}
        {isHDA30 && (
          <section className="py-16 bg-background">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('digitalFpv.h.a30.freqAdvantage.title')}</h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">{t('digitalFpv.h.a30.freqAdvantage.desc')}</p>
                <div className="w-20 h-1 bg-accent mx-auto rounded-full mt-4" />
              </div>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Radio className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-bold mb-2">{t('digitalFpv.h.a30.freqAdvantage.pure')}</h4>
                  <p className="text-muted-foreground text-sm">{t('digitalFpv.h.a30.freqAdvantage.pureDesc')}</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Antenna className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-bold mb-2">{t('digitalFpv.h.a30.freqAdvantage.balance')}</h4>
                  <p className="text-muted-foreground text-sm">{t('digitalFpv.h.a30.freqAdvantage.balanceDesc')}</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-bold mb-2">{t('digitalFpv.h.a30.freqAdvantage.bvlos')}</h4>
                  <p className="text-muted-foreground text-sm">{t('digitalFpv.h.a30.freqAdvantage.bvlosDesc')}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* HD-1400-A30 Cross-Link: Platform Integration */}
        {isHDA30 && (
          <section className="py-16 bg-accent/5">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('digitalFpv.h.a30.crossLink.title')}</h2>
                <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-6" />
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {t('digitalFpv.h.a30.crossLink.desc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
                  <Link to="/products/swarm">
                    <Button variant="outline" className="gap-2 px-6 py-5">
                      <Users className="w-5 h-5" />
                      {t('digitalFpv.h.a30.crossLink.swarm')}
                    </Button>
                  </Link>
                  <Link to="/products/logistics">
                    <Button variant="outline" className="gap-2 px-6 py-5">
                      <Truck className="w-5 h-5" />
                      {t('digitalFpv.h.a30.crossLink.logistics')}
                    </Button>
                  </Link>
                  <Link to="/products/tethered">
                    <Button variant="outline" className="gap-2 px-6 py-5">
                      <Cable className="w-5 h-5" />
                      {t('digitalFpv.h.a30.crossLink.tethered')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* HD-1400-A50 Strategic Advantage Section */}
        {isHDA50 && (
          <section className="py-16 bg-background">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('digitalFpv.h.a50.strategic.title')}</h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">{t('digitalFpv.h.a50.strategic.desc')}</p>
                <div className="w-20 h-1 bg-accent mx-auto rounded-full mt-4" />
              </div>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-bold mb-2">{t('digitalFpv.h.a50.strategic.linkBudget')}</h4>
                  <p className="text-muted-foreground text-sm">{t('digitalFpv.h.a50.strategic.linkBudgetDesc')}</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Antenna className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-bold mb-2">{t('digitalFpv.h.a50.strategic.maritime')}</h4>
                  <p className="text-muted-foreground text-sm">{t('digitalFpv.h.a50.strategic.maritimeDesc')}</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <HardDrive className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-bold mb-2">{t('digitalFpv.h.a50.strategic.security')}</h4>
                  <p className="text-muted-foreground text-sm">{t('digitalFpv.h.a50.strategic.securityDesc')}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* HD-1400-A50 Cross-Link: Strategic Platform */}
        {isHDA50 && (
          <section className="py-16 bg-accent/5">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('digitalFpv.h.a50.crossLink.title')}</h2>
                <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-6" />
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {t('digitalFpv.h.a50.crossLink.desc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
                  <Link to="/products/swarm">
                    <Button variant="outline" className="gap-2 px-6 py-5">
                      <Users className="w-5 h-5" />
                      {t('digitalFpv.h.a50.crossLink.swarm')}
                    </Button>
                  </Link>
                  <Link to="/products/logistics">
                    <Button variant="outline" className="gap-2 px-6 py-5">
                      <Truck className="w-5 h-5" />
                      {t('digitalFpv.h.a50.crossLink.logistics')}
                    </Button>
                  </Link>
                  <Link to="/products/tethered">
                    <Button variant="outline" className="gap-2 px-6 py-5">
                      <Cable className="w-5 h-5" />
                      {t('digitalFpv.h.a50.crossLink.tethered')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* HD-1400-A100 Strategic Advantage Section */}
        {isHDA100 && (
          <section className="py-16 bg-background">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('digitalFpv.h.a100.strategic.title')}</h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">{t('digitalFpv.h.a100.strategic.desc')}</p>
                <div className="w-20 h-1 bg-accent mx-auto rounded-full mt-4" />
              </div>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Radio className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-bold mb-2">{t('digitalFpv.h.a100.strategic.sensitivity')}</h4>
                  <p className="text-muted-foreground text-sm">{t('digitalFpv.h.a100.strategic.sensitivityDesc')}</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-bold mb-2">{t('digitalFpv.h.a100.strategic.adaptive')}</h4>
                  <p className="text-muted-foreground text-sm">{t('digitalFpv.h.a100.strategic.adaptiveDesc')}</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-bold mb-2">{t('digitalFpv.h.a100.strategic.curvature')}</h4>
                  <p className="text-muted-foreground text-sm">{t('digitalFpv.h.a100.strategic.curvatureDesc')}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* HD-1400-A100 Cross-Link: Strategic Platform */}
        {isHDA100 && (
          <section className="py-16 bg-accent/5">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('digitalFpv.h.a100.crossLink.title')}</h2>
                <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-6" />
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {t('digitalFpv.h.a100.crossLink.desc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
                  <Link to="/products/swarm">
                    <Button variant="outline" className="gap-2 px-6 py-5">
                      <Users className="w-5 h-5" />
                      {t('digitalFpv.h.a100.crossLink.swarm')}
                    </Button>
                  </Link>
                  <Link to="/products/logistics">
                    <Button variant="outline" className="gap-2 px-6 py-5">
                      <Truck className="w-5 h-5" />
                      {t('digitalFpv.h.a100.crossLink.logistics')}
                    </Button>
                  </Link>
                  <Link to="/products/tethered">
                    <Button variant="outline" className="gap-2 px-6 py-5">
                      <Cable className="w-5 h-5" />
                      {t('digitalFpv.h.a100.crossLink.tethered')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

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
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-primary-foreground/60 text-sm">{t('contact.info.email')}</div>
                    <div className="text-primary-foreground font-bold">sales@caniuav.com</div>
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
