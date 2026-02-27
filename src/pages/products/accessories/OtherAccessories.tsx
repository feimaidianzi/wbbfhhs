import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, Navigation, Tv, Satellite } from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { BackButton } from "@/components/BackButton";
import { otherAccessoriesProducts, otherAccessoriesCategories } from "@/data/otherAccessoriesProducts";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  monitor: Tv,
  gps: Satellite,
};

const OtherAccessories = () => {
  const { t } = useLanguage();

  const otherAccFallback: Record<string, string> = {
    'otherAcc.category.monitor': '监视器/眼镜',
    'otherAcc.category.monitor.desc': 'FPV监视器与头戴眼镜，支持5.8G接收与DVR录制',
    'otherAcc.category.gps': 'GPS模块',
    'otherAcc.category.gps.desc': 'M10高精度GPS与GPS+电子罗盘一体模块',

    'otherAcc.monitor5ips.name': '5英寸IPS DVR监视器',
    'otherAcc.monitor5ips.slogan': '高清显示 | 内置DVR',
    'otherAcc.monitor5ips.subSlogan': '5英寸IPS屏，40CH接收，内置电池',
    'otherAcc.goggles40ch.name': '40CH FPV头戴眼镜',
    'otherAcc.goggles40ch.slogan': '沉浸体验 | 双接收分集',
    'otherAcc.goggles40ch.subSlogan': '双屏显示，内置DVR，飞行更沉浸',
    'otherAcc.monitor43.name': '4.3英寸DVR监视器',
    'otherAcc.monitor43.slogan': '轻便实用 | 入门优选',
    'otherAcc.monitor43.subSlogan': '40CH接收，便携小屏，性价比高',
    'otherAcc.monitor7lcd.name': '7英寸LCD监视器',
    'otherAcc.monitor7lcd.slogan': '大屏监看 | 专业图传',
    'otherAcc.monitor7lcd.subSlogan': '7英寸高亮显示，支持DVR录制',
    'otherAcc.gpsM10q120.name': 'M10Q GPS模块（120mm孔距）',
    'otherAcc.gpsM10q120.slogan': '快速搜星 | 高精定位',
    'otherAcc.gpsM10q120.subSlogan': 'Ublox M10芯片，标准120mm双孔安装',
    'otherAcc.gpsM10q180.name': 'M10Q GPS模块（180mm孔距）',
    'otherAcc.gpsM10q180.slogan': '稳定定位 | 安装灵活',
    'otherAcc.gpsM10q180.subSlogan': '180mm双孔设计，适配更多机型',
    'otherAcc.gpsM10q250.name': 'M10Q GPS模块（250mm孔距）',
    'otherAcc.gpsM10q250.slogan': '超长孔距 | 远距布置',
    'otherAcc.gpsM10q250.subSlogan': '250mm双孔布局，适合大型平台',
    'otherAcc.gpsM10q120Compass.name': 'M10Q GPS+罗盘模块（120mm）',
    'otherAcc.gpsM10q120Compass.slogan': '二合一 | 航向增强',
    'otherAcc.gpsM10q120Compass.subSlogan': 'GPS与QMC5883罗盘一体，布线更简洁',
    'otherAcc.gpsM10q180Compass.name': 'M10Q GPS+罗盘模块（180mm）',
    'otherAcc.gpsM10q180Compass.slogan': '定位+定向 | 一体集成',
    'otherAcc.gpsM10q180Compass.subSlogan': '180mm双孔，适配中大型飞行平台',

    'otherAcc.feature.5inchIPS': '5英寸IPS',
    'otherAcc.feature.40ch': '40频道接收',
    'otherAcc.feature.builtInDVR': '内置DVR',
    'otherAcc.feature.builtInBattery': '内置电池',
    'otherAcc.feature.dualDiversity': '双接收分集',
    'otherAcc.feature.immersive': '沉浸式体验',
    'otherAcc.feature.43inch': '4.3英寸小屏',
    'otherAcc.feature.costEffective': '高性价比',
    'otherAcc.feature.7inchBig': '7英寸大屏',
    'otherAcc.feature.professional': '专业级监看',
    'otherAcc.feature.m10Chip': 'Ublox M10芯片',
    'otherAcc.feature.120mmSpacing': '120mm孔距',
    'otherAcc.feature.fastLock': '快速搜星',
    'otherAcc.feature.highPrecision': '高精度定位',
    'otherAcc.feature.180mmSpacing': '180mm孔距',
    'otherAcc.feature.250mmSpacing': '250mm孔距',
    'otherAcc.feature.builtInCompass': '内置电子罗盘',
    'otherAcc.feature.twoInOne': '二合一设计',
  };

  const tf = (key: string) => {
    const translated = t(key);
    return translated === key ? (otherAccFallback[key] || key) : translated;
  };

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('otherAccessories.seo.title')}
        description={t('otherAccessories.seo.description')}
        keywords={t('otherAccessories.seo.keywords')}
        path="/products/accessories/others"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="bg-secondary py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">{t('otherAccessories.breadcrumb.home')}</Link>
              <span>/</span>
              <Link to="/products/accessories" className="hover:text-accent">{t('otherAccessories.breadcrumb.accessories')}</Link>
              <span>/</span>
              <span className="text-foreground">{t('otherAccessories.breadcrumb.others')}</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <BackButton to="/products/accessories" label={t('otherAccessories.back')} />
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('otherAccessories.hero.title')}
              </h1>
              <p className="text-lg text-primary-foreground/90 mb-6">
                {t('otherAccessories.hero.desc')}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                  <Monitor className="w-5 h-5 text-accent" />
                  <span className="text-primary-foreground text-sm">{t('otherAccessories.feature.monitor')}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                  <Tv className="w-5 h-5 text-accent" />
                  <span className="text-primary-foreground text-sm">{t('otherAccessories.feature.goggles')}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                  <Navigation className="w-5 h-5 text-accent" />
                  <span className="text-primary-foreground text-sm">{t('otherAccessories.feature.gps')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        {otherAccessoriesCategories.map((category) => {
          const categoryProducts = otherAccessoriesProducts.filter(p => p.category === category.id);
          if (categoryProducts.length === 0) return null;
          
          const IconComponent = categoryIcons[category.id] || Monitor;
          
          return (
            <section key={category.id} className="py-16 bg-background">
              <div className="container-custom">
                <div className="flex items-center gap-4 mb-8">
                  <IconComponent className="w-8 h-8 text-accent" />
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">{tf(category.nameKey)}</h2>
                    <p className="text-muted-foreground">{tf(category.descriptionKey)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/products/accessories/others/${product.id}`}
                      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
                    >
                      <div className="aspect-square overflow-hidden bg-gradient-to-br from-secondary to-secondary/50 relative p-4">
                        <img
                          src={product.image}
                          alt={tf(product.nameKey)}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <div className="text-accent text-sm font-medium mb-1">{tf(product.sloganKey)}</div>
                        <h3 className="text-lg font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                          {tf(product.nameKey)}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-1">{tf(product.subSloganKey)}</p>
                        
                        {/* Key Features */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {product.keyFeatureKeys.slice(0, 3).map((featureKey, i) => (
                            <span key={i} className="text-xs bg-secondary text-foreground px-2 py-0.5 rounded">
                              {tf(featureKey)}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center text-accent text-sm font-medium group-hover:gap-3 gap-1 transition-all">
                          <span>{t('otherAccessories.viewDetail')}</span>
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
              {t('otherAccessories.cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('otherAccessories.cta.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                  {t('otherAccessories.cta.btn')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/products/accessories">
                <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-8 py-6 text-lg">
                  {t('otherAccessories.cta.viewOthers')}
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

export default OtherAccessories;
