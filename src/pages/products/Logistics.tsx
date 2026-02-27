import { LangLink as Link } from "@/components/LangLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { Button } from "@/components/ui/button";
import { 
  Wind, 
  Wifi, 
  BatteryCharging, 
  Navigation, 
  Package, 
  Camera,
  Image,
  Lightbulb,
  Mic,
  Target,
  Compass,
  MapPin,
  ChevronRight
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// 导入图片
import heroImage from "@/assets/products/logistics-hero-doubao.jpg";
import deliveryImage from "@/assets/products/logistics-delivery-clean.jpg";
import dropImage from "@/assets/products/logistics-drop.png";
import foldImage from "@/assets/products/logistics-fold.png";
import waypointImage from "@/assets/products/logistics-waypoint.png";
import appRescueImage from "@/assets/products/logistics-app-rescue.jpg";
import appFireImage from "@/assets/products/logistics-app-fire.jpg";
import appPoliceImage from "@/assets/products/logistics-app-police.jpg";
import appPowerImage from "@/assets/products/logistics-app-power.jpg";
import appOilImage from "@/assets/products/logistics-app-oil.jpg";
import appSurveyImage from "@/assets/products/logistics-app-survey.jpg";
import speakerImage from "@/assets/products/logistics-speaker.png";
import carbonImage from "@/assets/products/logistics-carbon.png";

const Logistics = () => {
  const { t } = useLanguage();

  const highlights = [
    { title: t('logistics.sy800.h1.title'), description: t('logistics.sy800.h1.desc') },
    { title: t('logistics.sy800.h2.title'), description: t('logistics.sy800.h2.desc') },
    { title: t('logistics.sy800.h3.title'), description: t('logistics.sy800.h3.desc') },
    { title: t('logistics.sy800.h4.title'), description: t('logistics.sy800.h4.desc') },
    { title: t('logistics.sy800.h5.title'), description: t('logistics.sy800.h5.desc') },
  ];

  const features = [
    { icon: Wind, title: t('logistics.sy800.f1.title'), description: t('logistics.sy800.f1.desc') },
    { icon: Wifi, title: t('logistics.sy800.f2.title'), description: t('logistics.sy800.f2.desc') },
    { icon: BatteryCharging, title: t('logistics.sy800.f3.title'), description: t('logistics.sy800.f3.desc') },
    { icon: Navigation, title: t('logistics.sy800.f4.title'), description: t('logistics.sy800.f4.desc') },
    { icon: Package, title: t('logistics.sy800.f5.title'), description: t('logistics.sy800.f5.desc') },
    { icon: Camera, title: t('logistics.sy800.f6.title'), description: t('logistics.sy800.f6.desc') },
    { icon: Image, title: t('logistics.sy800.f7.title'), description: t('logistics.sy800.f7.desc') },
    { icon: Lightbulb, title: t('logistics.sy800.f8.title'), description: t('logistics.sy800.f8.desc') },
    { icon: Mic, title: t('logistics.sy800.f9.title'), description: t('logistics.sy800.f9.desc') },
    { icon: Target, title: t('logistics.sy800.f10.title'), description: t('logistics.sy800.f10.desc') },
    { icon: Compass, title: t('logistics.sy800.f11.title'), description: t('logistics.sy800.f11.desc') },
    { icon: MapPin, title: t('logistics.sy800.f12.title'), description: t('logistics.sy800.f12.desc') },
  ];

  const specs = [
    { label: t('logistics.sy800.spec.model'), value: "SY800-2" },
    { label: t('logistics.sy800.spec.datalink'), value: t('logistics.sy800.spec.datalinkVal') },
    { label: t('logistics.sy800.spec.material'), value: t('logistics.sy800.spec.materialVal') },
    { label: t('logistics.sy800.spec.type'), value: t('logistics.sy800.spec.typeVal') },
    { label: t('logistics.sy800.spec.propeller'), value: t('logistics.sy800.spec.propellerVal') },
    { label: t('logistics.sy800.spec.motor'), value: "D4114" },
    { label: t('logistics.sy800.spec.battery'), value: t('logistics.sy800.spec.batteryVal') },
    { label: t('logistics.sy800.spec.chargeTime'), value: t('logistics.sy800.spec.chargeTimeVal') },
    { label: t('logistics.sy800.spec.wheelbase'), value: "800mm" },
    { label: t('logistics.sy800.spec.bodySize'), value: "1180mm*950mm*230mm" },
    { label: t('logistics.sy800.spec.foldSize'), value: "320mm*320mm*40mm" },
    { label: t('logistics.sy800.spec.maxWeight'), value: "6KG" },
    { label: t('logistics.sy800.spec.bodyWeight'), value: "2.25KG" },
    { label: t('logistics.sy800.spec.light'), value: t('logistics.sy800.spec.lightVal') },
    { label: t('logistics.sy800.spec.drop'), value: t('logistics.sy800.spec.dropVal') },
    { label: t('logistics.sy800.spec.loudspeaker'), value: t('logistics.sy800.spec.loudspeakerVal') },
    { label: t('logistics.sy800.spec.flightTime'), value: t('logistics.sy800.spec.flightTimeVal') },
    { label: t('logistics.sy800.spec.rcRange'), value: t('logistics.sy800.spec.rcRangeVal') },
    { label: t('logistics.sy800.spec.altitude'), value: t('logistics.sy800.spec.altitudeVal') },
    { label: t('logistics.sy800.spec.videoRange'), value: t('logistics.sy800.spec.videoRangeVal') },
    { label: t('logistics.sy800.spec.payload'), value: "2KG" },
  ];

  const appItems = [
    { title: t('logistics.sy800.app1'), image: appRescueImage },
    { title: t('logistics.sy800.app2'), image: appFireImage },
    { title: t('logistics.sy800.app3'), image: appPoliceImage },
    { title: t('logistics.sy800.app4'), image: appPowerImage },
    { title: t('logistics.sy800.app5'), image: appOilImage },
    { title: t('logistics.sy800.app6'), image: appSurveyImage },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO 
        title={t('logistics.sy800.seo.title')}
        description={t('logistics.sy800.seo.desc')}
        path="/products/logistics"
        type="product"
      />
      <Header />
      <FloatingContact />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt={t('logistics.sy800.heroTitle')}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl rounded-3xl bg-black/70 border border-white/20 p-6 md:p-8 shadow-lg">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              {t('logistics.sy800.heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-2">
              {t('logistics.sy800.heroSubtitle')}
            </p>
            <p className="text-lg text-cyan-400 font-semibold mb-8">
              {t('logistics.sy800.heroSlogan')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  {t('logistics.sy800.getQuote')}
                </Button>
              </Link>
              <a href="#specs">
                <Button size="lg" variant="outline">
                  {t('logistics.sy800.viewSpecs')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {highlights.map((item, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-4 md:p-6 border border-border rounded-xl bg-background hover:border-primary/50 transition-colors min-w-[140px]"
              >
                <span className="text-lg md:text-xl font-bold text-foreground">{item.title}</span>
                <span className="text-sm text-muted-foreground mt-1">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Transport */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                {t('logistics.sy800.delivery.title')}
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                {t('logistics.sy800.delivery.subtitle')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t('logistics.sy800.delivery.desc')}
              </p>
              <p className="text-lg font-semibold text-foreground">
                {t('logistics.sy800.delivery.weight')}
              </p>
            </div>
            <div className="flex justify-center">
              <img 
                src={deliveryImage} 
                alt={t('logistics.sy800.delivery.title')}
                className="w-full max-w-lg rounded-2xl shadow-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dual Drop */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <img 
                src={dropImage} 
                alt={t('logistics.sy800.drop.subtitle')}
                className="w-full max-w-lg rounded-2xl shadow-xl"
                loading="lazy"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                {t('logistics.sy800.drop.title')}
              </h2>
              <h3 className="text-2xl font-bold text-primary mb-6">
                {t('logistics.sy800.drop.subtitle')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t('logistics.sy800.drop.desc')}
              </p>
              <p className="text-lg text-foreground">
                {t('logistics.sy800.drop.detail')}
              </p>
              <div className="mt-6 p-4 bg-primary/10 rounded-xl">
                <p className="font-semibold text-foreground">{t('logistics.sy800.drop.hookTitle')}</p>
                <p className="text-sm text-muted-foreground">{t('logistics.sy800.drop.hookDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Foldable */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {t('logistics.sy800.fold.title')}
            </h2>
            <h3 className="text-2xl font-bold text-primary mb-4">
              {t('logistics.sy800.fold.subtitle')}
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('logistics.sy800.fold.desc')}
            </p>
          </div>
          <div className="flex justify-center">
            <img 
              src={foldImage} 
              alt={t('logistics.sy800.fold.title')}
              className="w-full max-w-4xl rounded-2xl shadow-xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Waypoint Planning */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                {t('logistics.sy800.waypoint.title')}
              </h2>
              <h3 className="text-2xl font-bold text-primary mb-6">
                {t('logistics.sy800.waypoint.subtitle')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t('logistics.sy800.waypoint.desc')}
              </p>
              <p className="text-lg text-foreground mb-6">
                {t('logistics.sy800.waypoint.autoFly')}
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">{t('logistics.sy800.waypoint.point1')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">{t('logistics.sy800.waypoint.point2')}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src={waypointImage} 
                alt={t('logistics.sy800.waypoint.title')}
                className="w-full max-w-lg rounded-2xl shadow-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Speaker */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <img 
                src={speakerImage} 
                alt={t('logistics.sy800.speaker.title')}
                className="w-full max-w-lg rounded-2xl shadow-xl"
                loading="lazy"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                {t('logistics.sy800.speaker.title')}
              </h2>
              <h3 className="text-2xl font-bold text-primary mb-6">
                {t('logistics.sy800.speaker.subtitle')}
              </h3>
              <p className="text-muted-foreground text-lg">
                {t('logistics.sy800.speaker.desc')}
              </p>
              <ul className="mt-6 space-y-2 text-muted-foreground">
                <li>• {t('logistics.sy800.speaker.realtime')}</li>
                <li>• {t('logistics.sy800.speaker.loop')}</li>
                <li>• {t('logistics.sy800.speaker.text')}</li>
                <li>• {t('logistics.sy800.speaker.mp3')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Carbon Fiber */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {t('logistics.sy800.carbon.title')}
            </h2>
            <p className="text-muted-foreground">{t('logistics.sy800.carbon.desc')}</p>
          </div>
          <div className="flex justify-center">
            <img 
              src={carbonImage} 
              alt={t('logistics.sy800.carbon.title')}
              className="w-full max-w-4xl rounded-2xl shadow-xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {t('logistics.sy800.feat.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('logistics.sy800.feat.desc')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {t('logistics.sy800.appTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {appItems.map((item, index) => (
              <div 
                key={index}
                className="relative group overflow-hidden rounded-xl aspect-[4/3]"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section id="specs" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {t('logistics.sy800.specsTitle')}
            </h2>
            <p className="text-muted-foreground">{t('logistics.sy800.specsSubtitle')}</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-1">
              {specs.map((spec, index) => (
                <div 
                  key={index}
                  className={`grid grid-cols-2 gap-4 p-4 ${index % 2 === 0 ? 'bg-muted/30' : 'bg-background'}`}
                >
                  <span className="text-muted-foreground">{spec.label}</span>
                  <span className="text-foreground font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('logistics.sy800.cta.title')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('logistics.sy800.cta.desc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" variant="secondary">
                {t('logistics.sy800.cta.contact')}
              </Button>
            </Link>
            <a href="mailto:sales@caniuav.com">
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                {t('template.emailConsult')}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Logistics;
