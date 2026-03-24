import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LangLink as Link } from "@/components/LangLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import { Check, AlertTriangle, Settings, Radio, Zap, Shield, Thermometer, ChevronRight } from "lucide-react";
import { getProductById } from "@/data/vtxProducts";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageFAQ } from "@/components/PageFAQ";

const VtxDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getProductById(productId) : null;
  const { t } = useLanguage();
  const isPV02 = productId === "flym-pv02w500-a1";
  const isPV03 = productId === "flym-pv03w000-a1";
  const isFV10W = productId === "fv10w-a1";
  const isFV16W = productId === "fv16w-a1";
  const isFV25W = productId === "fv25w-a1";
  const isFV37W = productId === "fv37w-a1";
  const isFV10W72 = productId === "fv10w-72";

  if (!product) {
    return <Navigate to="/products/accessories/vtx-vrx" replace />;
  }

  // PV02 专属 JSON-LD
  const pv02JsonLd = isPV02 ? {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "FLYM-PV02W500-A1 2.5W High-Power VTX",
    "description": "High-power UAV video transmitter with 2.5W (2500mW) output and 8km LOS range. Active cooling fan + CNC aluminum heatsink. Wide voltage DC 7-36V.",
    "brand": { "@type": "Brand", "name": "CANI Technology" },
    "sku": "PV02W500-A1",
    "mpn": "FLYM-PV02W500-A1",
    "image": "https://www.caniuav.com/assets/vtx/vtx-2.5w.png",
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "RF Output Power", "value": "2500mW (2.5W)" },
      { "@type": "PropertyValue", "name": "Transmission Range", "value": "8km LOS" },
      { "@type": "PropertyValue", "name": "Input Voltage", "value": "DC 7-36V (2-8S LiPo)" },
      { "@type": "PropertyValue", "name": "End-to-End Latency", "value": "≤30ms" },
      { "@type": "PropertyValue", "name": "Cooling System", "value": "Active Fan + CNC Heatsink" },
      { "@type": "PropertyValue", "name": "Frequency Band", "value": "4.9-6.1GHz" },
      { "@type": "PropertyValue", "name": "Channels", "value": "80" },
      { "@type": "PropertyValue", "name": "Weight", "value": "23g" }
    ],
    "offers": {
      "@type": "Offer",
      "url": "https://www.caniuav.com/products/accessories/vtx-vrx/flym-pv02w500-a1",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  } : null;

  const pv02FaqItems = [
    { questionKey: "vtxDetail.pv02.faq.q1", answerKey: "vtxDetail.pv02.faq.a1" },
    { questionKey: "vtxDetail.pv02.faq.q2", answerKey: "vtxDetail.pv02.faq.a2" },
    { questionKey: "vtxDetail.pv02.faq.q3", answerKey: "vtxDetail.pv02.faq.a3" },
  ];

  // PV03 JSON-LD
  const pv03JsonLd = isPV03 ? {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "FLYM-PV03W000-A1 3W FPV VTX",
    "description": "Extreme 3W (3000mW) high-power video transmitter for long-range FPV drones. Features active fan cooling and 10km LOS range. Supports SmartAudio & IRC Tramp.",
    "brand": { "@type": "Brand", "name": "CANI Technology" },
    "sku": "PV03W000-A1-3W-FPV",
    "mpn": "FLYM-PV03W000-A1",
    "image": "https://www.caniuav.com/assets/vtx/vtx-low-power.png",
    "keywords": "FPV VTX, Long Range FPV, 3W VTX, 3000mW Video Transmitter, 5.8GHz VTX",
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "RF Output Power", "value": "3000mW (3W)" },
      { "@type": "PropertyValue", "name": "Transmission Range", "value": "10km LOS" },
      { "@type": "PropertyValue", "name": "Input Voltage", "value": "DC 7-36V (2-8S LiPo)" },
      { "@type": "PropertyValue", "name": "End-to-End Latency", "value": "≤30ms" },
      { "@type": "PropertyValue", "name": "Cooling System", "value": "Active Fan + CNC Heatsink" },
      { "@type": "PropertyValue", "name": "Protocol", "value": "SmartAudio / IRC Tramp" },
      { "@type": "PropertyValue", "name": "Frequency Band", "value": "4.9-6.1GHz" },
      { "@type": "PropertyValue", "name": "Channels", "value": "80" },
      { "@type": "PropertyValue", "name": "Weight", "value": "23g" }
    ],
    "offers": {
      "@type": "Offer",
      "url": "https://www.caniuav.com/products/accessories/vtx-vrx/flym-pv03w000-a1",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  } : null;

  const pv03FaqItems = [
    { questionKey: "vtxDetail.pv03.faq.q1", answerKey: "vtxDetail.pv03.faq.a1" },
    { questionKey: "vtxDetail.pv03.faq.q2", answerKey: "vtxDetail.pv03.faq.a2" },
    { questionKey: "vtxDetail.pv03.faq.q3", answerKey: "vtxDetail.pv03.faq.a3" },
  ];

  // FV10W-A1 JSON-LD
  const fv10wJsonLd = isFV10W ? {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "FV10W-A1 10W Extreme Power FPV VTX",
    "description": "The most powerful 10W (10000mW) 5.8GHz video transmitter for extreme long-range and high-penetration FPV drones. 5-step adjustable power (1W/3W/5W/7W/10W), 80-channel spectrum, dual active cooling.",
    "brand": { "@type": "Brand", "name": "CANI Technology" },
    "sku": "FV10W-A1-10W",
    "mpn": "FV10W-A1",
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "RF Output Power", "value": "10000mW (10W)" },
      { "@type": "PropertyValue", "name": "Power Steps", "value": "1W / 3W / 5W / 7W / 10W" },
      { "@type": "PropertyValue", "name": "Frequency Band", "value": "4.9-6.1GHz" },
      { "@type": "PropertyValue", "name": "Channels", "value": "80CH" },
      { "@type": "PropertyValue", "name": "Input Voltage", "value": "DC 12-28V (3-6S LiPo)" },
      { "@type": "PropertyValue", "name": "Cooling System", "value": "Active Fan + CNC Aluminum Heatsink" },
      { "@type": "PropertyValue", "name": "Protocol", "value": "SmartAudio / IRC Tramp" },
      { "@type": "PropertyValue", "name": "Mounting Size", "value": "30.5×30.5mm" },
      { "@type": "PropertyValue", "name": "Weight", "value": "47g" }
    ],
    "offers": {
      "@type": "Offer",
      "url": "https://www.caniuav.com/products/accessories/vtx-vrx/fv10w-a1",
      "availability": "https://schema.org/InStock"
    }
  } : null;

  const fv10wFaqItems = [
    { questionKey: "vtxDetail.fv10w.faq.q1", answerKey: "vtxDetail.fv10w.faq.a1" },
    { questionKey: "vtxDetail.fv10w.faq.q2", answerKey: "vtxDetail.fv10w.faq.a2" },
    { questionKey: "vtxDetail.fv10w.faq.q3", answerKey: "vtxDetail.fv10w.faq.a3" },
  ];

  // FV16W-A1 JSON-LD
  const fv16wJsonLd = isFV16W ? {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "FV16W-A1 25W Extreme High Power VTX",
    "description": "World's most powerful FPV video transmitter with 16W and 25W dual power steps. Fully customizable for professional and industrial UAV missions. Quad fan + CNC full-shield cooling for continuous 25W output.",
    "brand": { "@type": "Brand", "name": "CANI Technology" },
    "sku": "FV16W-A1-25W",
    "mpn": "FV16W-A1",
    "keywords": "25W VTX, 16W VTX, Extreme FPV VTX, High Power Video Transmitter, Custom UAV VTX",
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "RF Output Power", "value": "25000mW (25W) / 16000mW (16W)" },
      { "@type": "PropertyValue", "name": "Power Steps", "value": "16W / 25W (Dual-Step)" },
      { "@type": "PropertyValue", "name": "Transmission Range", "value": "15km+ LOS" },
      { "@type": "PropertyValue", "name": "Frequency Band", "value": "4.9-6.1GHz" },
      { "@type": "PropertyValue", "name": "Channels", "value": "80CH" },
      { "@type": "PropertyValue", "name": "Input Voltage", "value": "DC 22-36V (6-8S LiPo)" },
      { "@type": "PropertyValue", "name": "Cooling System", "value": "Quad Fan + CNC Full-Shield Aluminum Enclosure" },
      { "@type": "PropertyValue", "name": "Customization", "value": "Full R&D / OEM Support" },
      { "@type": "PropertyValue", "name": "Mounting Size", "value": "30.5×30.5mm" },
      { "@type": "PropertyValue", "name": "Weight", "value": "47g" }
    ],
    "offers": {
      "@type": "Offer",
      "url": "https://www.caniuav.com/products/accessories/vtx-vrx/fv16w-a1",
      "availability": "https://schema.org/InStock"
    }
  } : null;

  const fv16wFaqItems = [
    { questionKey: "vtxDetail.fv16w.faq.q1", answerKey: "vtxDetail.fv16w.faq.a1" },
    { questionKey: "vtxDetail.fv16w.faq.q2", answerKey: "vtxDetail.fv16w.faq.a2" },
    { questionKey: "vtxDetail.fv16w.faq.q3", answerKey: "vtxDetail.fv16w.faq.a3" },
  ];

  // FV25W-A1 JSON-LD
  const fv25wJsonLd = isFV25W ? {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "FV25W-A1 25W Extreme Power FPV VTX",
    "description": "The world's most powerful 25W (25000mW) 5.8GHz video transmitter for extreme long-range and obstacle-penetration FPV drones. Dual industrial fan cooling, CNC housing, SmartAudio compatible.",
    "brand": { "@type": "Brand", "name": "CANI Technology" },
    "sku": "FV25W-A1-25W",
    "mpn": "FV25W-A1",
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "RF Output Power", "value": "25000mW (25W)" },
      { "@type": "PropertyValue", "name": "Power Steps", "value": "Customizable (incl. 16W / 25W)" },
      { "@type": "PropertyValue", "name": "Transmission Range", "value": "15-20km LOS" },
      { "@type": "PropertyValue", "name": "Frequency Band", "value": "4.9-6.1GHz" },
      { "@type": "PropertyValue", "name": "Channels", "value": "80CH / 96CH (Ultra-Wide)" },
      { "@type": "PropertyValue", "name": "Input Voltage", "value": "DC 22-36V (6-8S LiPo)" },
      { "@type": "PropertyValue", "name": "Cooling System", "value": "Dual High-RPM Fan + CNC Fin Array" },
      { "@type": "PropertyValue", "name": "End-to-End Latency", "value": "≤30ms" },
      { "@type": "PropertyValue", "name": "Protocol", "value": "SmartAudio / IRC Tramp" },
      { "@type": "PropertyValue", "name": "Mounting Size", "value": "30.5×30.5mm" }
    ],
    "offers": {
      "@type": "Offer",
      "url": "https://www.caniuav.com/products/accessories/vtx-vrx/fv25w-a1",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  } : null;

  const fv25wFaqItems = [
    { questionKey: "vtxDetail.fv25w.faq.q1", answerKey: "vtxDetail.fv25w.faq.a1" },
    { questionKey: "vtxDetail.fv25w.faq.q2", answerKey: "vtxDetail.fv25w.faq.a2" },
    { questionKey: "vtxDetail.fv25w.faq.q3", answerKey: "vtxDetail.fv25w.faq.a3" },
  ];

  // FV37W-A1 JSON-LD
  const fv37wJsonLd = isFV37W ? {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "FV37W-A1 37W God-Tier FPV VTX",
    "description": "The world's highest power 37W (37000mW) 5.8GHz video transmitter. Extreme obstacle penetration and 20km+ long-range reliability for professional UAVs.",
    "brand": { "@type": "Brand", "name": "CANI Technology" },
    "sku": "FV37W-A1-37W",
    "mpn": "FV37W-A1",
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "RF Output Power", "value": "37000mW (37W)" },
      { "@type": "PropertyValue", "name": "Power Steps", "value": "Dual-Gear (e.g. 20W / 37W)" },
      { "@type": "PropertyValue", "name": "Transmission Range", "value": "20km+ LOS" },
      { "@type": "PropertyValue", "name": "Frequency Band", "value": "4.9-6.1GHz" },
      { "@type": "PropertyValue", "name": "Channels", "value": "80CH / 96CH (Ultra-Wide)" },
      { "@type": "PropertyValue", "name": "Input Voltage", "value": "DC 24-42V (6-10S LiPo)" },
      { "@type": "PropertyValue", "name": "Cooling System", "value": "Triple High-RPM Fan + CNC Fin Base" },
      { "@type": "PropertyValue", "name": "End-to-End Latency", "value": "≤30ms" },
      { "@type": "PropertyValue", "name": "Protocol", "value": "SmartAudio / IRC Tramp" }
    ],
    "offers": {
      "@type": "Offer",
      "url": "https://www.caniuav.com/products/accessories/vtx-vrx/fv37w-a1",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  } : null;

  const fv37wFaqItems = [
    { questionKey: "vtxDetail.fv37w.faq.q1", answerKey: "vtxDetail.fv37w.faq.a1" },
    { questionKey: "vtxDetail.fv37w.faq.q2", answerKey: "vtxDetail.fv37w.faq.a2" },
    { questionKey: "vtxDetail.fv37w.faq.q3", answerKey: "vtxDetail.fv37w.faq.a3" },
  ];

  // SEO: 各产品使用专属 TDK
  const seoTitle = isPV02 ? t('vtxDetail.pv02.seo.title') : isPV03 ? t('vtxDetail.pv03.seo.title') : isFV10W ? t('vtxDetail.fv10w.seo.title') : isFV16W ? t('vtxDetail.fv16w.seo.title') : isFV25W ? t('vtxDetail.fv25w.seo.title') : isFV37W ? t('vtxDetail.fv37w.seo.title') : `${t(product.nameKey)} ${product.model}`;
  const seoDesc = isPV02 ? t('vtxDetail.pv02.seo.desc') : isPV03 ? t('vtxDetail.pv03.seo.desc') : isFV10W ? t('vtxDetail.fv10w.seo.desc') : isFV16W ? t('vtxDetail.fv16w.seo.desc') : isFV25W ? t('vtxDetail.fv25w.seo.desc') : isFV37W ? t('vtxDetail.fv37w.seo.desc') : `${t(product.nameKey)}，${product.frequency}${t('vtxDetail.seo.band')}，${product.channels}${t('vtxDetail.seo.channels')}，${product.power}${t('vtxDetail.seo.power')}，${t('vtxDetail.seo.vtxDesc')}`;

  return (
    <>
      <MultiLanguageSEO 
        title={seoTitle}
        description={seoDesc}
        path={`/products/accessories/vtx-vrx/${productId}`}
        type="product"
      />
      {isPV02 && pv02JsonLd && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(pv02JsonLd)}</script>
        </Helmet>
      )}
      {isPV03 && pv03JsonLd && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(pv03JsonLd)}</script>
        </Helmet>
      )}
      {isFV16W && fv16wJsonLd && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(fv16wJsonLd)}</script>
        </Helmet>
      )}
      {isFV25W && fv25wJsonLd && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(fv25wJsonLd)}</script>
        </Helmet>
      )}
      {isFV37W && fv37wJsonLd && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(fv37wJsonLd)}</script>
        </Helmet>
      )}
      <Header />
      <main className="min-h-screen bg-background">
        <BackButton to="/products/accessories/vtx-vrx" />

        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Product Image */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <img 
                  src={product.image} 
                  alt={
                    isPV02 ? "FLYM-PV02W500-A1 2.5W VTX with active cooling fan, 8km range UAV video transmitter industrial grade" :
                    isPV03 ? "FLYM-PV03W000-A1 3W 3000mW FPV VTX with active cooling, 10km long-range UAV video transmitter" :
                    isFV10W ? "FV10W-A1 10W 10000mW extreme power FPV VTX with dual active cooling, 80CH 5.8GHz video transmitter" :
                    isFV16W ? "FV16W-A1 25W 25000mW world's strongest FPV VTX with quad fan CNC cooling, 16W/25W dual-power video transmitter" :
                    isFV25W ? "FV25W-A1 25W 25000mW absolute power FPV VTX with dual industrial fan CNC housing, 15-20km extreme range video transmitter" :
                    isFV37W ? "FV37W-A1 37W 37000mW god-tier power FPV VTX with triple fan CNC cooling, 20km+ extreme range video transmitter" :
                    t(product.nameKey)
                  }
                  title={
                    isPV02 ? "FLYM-PV02W500-A1 2.5W High-Power UAV VTX" :
                    isPV03 ? "FLYM-PV03W000-A1 3W Ultra High-Power FPV VTX" :
                    isFV10W ? "FV10W-A1 10W Extreme Power 80CH FPV Video Transmitter" :
                    isFV16W ? "FV16W-A1 25W / 16W Adjustable Extreme Custom FPV VTX" :
                    isFV25W ? "FV25W-A1 25000mW (25W) Absolute Power FPV Video Transmitter" :
                    isFV37W ? "FV37W-A1 37000mW (37W) God-Tier Power FPV Video Transmitter" :
                    t(product.nameKey)
                  }
                  className="w-full max-w-md mx-auto object-contain"
                  loading="lazy"
                />
              </div>

              {/* Product Info */}
              <div>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">{product.power}</span>
                  <span className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full">{product.channels}CH</span>
                  <span className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full">{product.frequency}</span>
                  {isPV02 && <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">8km LOS</span>}
                  {isPV03 && <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">10km LOS</span>}
                  {isPV03 && <span className="px-3 py-1 text-sm bg-accent text-accent-foreground rounded-full font-medium">3000mW</span>}
                  {isFV10W && <span className="px-3 py-1 text-sm bg-destructive/10 text-destructive rounded-full font-bold">10000mW</span>}
                  {isFV10W && <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">80CH</span>}
                  {isFV10W && <span className="px-3 py-1 text-sm bg-accent text-accent-foreground rounded-full font-medium">5-Step Power</span>}
                  {isFV16W && <span className="px-3 py-1 text-sm bg-destructive/10 text-destructive rounded-full font-bold">25000mW</span>}
                  {isFV16W && <span className="px-3 py-1 text-sm bg-destructive/20 text-destructive rounded-full font-bold">16W/25W</span>}
                  {isFV16W && <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">15km+ LOS</span>}
                  {isFV16W && <span className="px-3 py-1 text-sm bg-accent text-accent-foreground rounded-full font-medium">Custom OEM</span>}
                  {isFV25W && <span className="px-3 py-1 text-sm bg-destructive/10 text-destructive rounded-full font-bold">25000mW</span>}
                  {isFV25W && <span className="px-3 py-1 text-sm bg-destructive/20 text-destructive rounded-full font-bold">15-20km LOS</span>}
                  {isFV25W && <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">80/96CH</span>}
                  {isFV25W && <span className="px-3 py-1 text-sm bg-accent text-accent-foreground rounded-full font-medium">≤30ms</span>}
                  {isFV37W && <span className="px-3 py-1 text-sm bg-destructive/10 text-destructive rounded-full font-bold">37000mW</span>}
                  {isFV37W && <span className="px-3 py-1 text-sm bg-destructive/20 text-destructive rounded-full font-bold">20km+ LOS</span>}
                  {isFV37W && <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">80/96CH</span>}
                  {isFV37W && <span className="px-3 py-1 text-sm bg-accent text-accent-foreground rounded-full font-medium">Triple Fan</span>}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {isPV02 ? t('vtxDetail.pv02.h1') : isPV03 ? t('vtxDetail.pv03.h1') : isFV10W ? t('vtxDetail.fv10w.h1') : isFV16W ? t('vtxDetail.fv16w.h1') : isFV25W ? t('vtxDetail.fv25w.h1') : isFV37W ? t('vtxDetail.fv37w.h1') : t(product.nameKey)}
                </h1>
                <p className="text-xl text-muted-foreground mb-4">{product.model}</p>
                {isPV02 && (
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed border-l-2 border-primary pl-4">
                    {t('vtxDetail.pv02.overview')}
                  </p>
                )}
                {isPV03 && (
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed border-l-2 border-primary pl-4">
                    {t('vtxDetail.pv03.overview')}
                  </p>
                )}
                {isFV10W && (
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed border-l-2 border-primary pl-4">
                    {t('vtxDetail.fv10w.overview')}
                  </p>
                )}
                {isFV16W && (
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed border-l-2 border-primary pl-4">
                    {t('vtxDetail.fv16w.overview')}
                  </p>
                )}
                {isFV25W && (
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed border-l-2 border-primary pl-4">
                    {t('vtxDetail.fv25w.overview')}
                  </p>
                )}
                {isFV37W && (
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed border-l-2 border-primary pl-4">
                    {t('vtxDetail.fv37w.overview')}
                  </p>
                )}
                
                {/* Highlights */}
                <div className="space-y-2 mb-8">
                  {product.highlightKeys.map((highlightKey, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{t(highlightKey)}</span>
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

        {/* Product Features Description */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t('accessoryDetail.productFeatures')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.descriptionKeys.map((descKey, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                  <Radio className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{t(descKey)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section id="specs" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t('accessoryDetail.techSpecs')}</h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50 w-1/3">{t('accessoryDetail.model')}</td>
                    <td className="px-6 py-4">{product.model}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.inputVoltage')}</td>
                    <td className="px-6 py-4">{t(product.specs.inputVoltageKey)}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.outputVoltage')}</td>
                    <td className="px-6 py-4">{product.specs.outputVoltage}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.channels')}</td>
                    <td className="px-6 py-4">{product.channels}CH</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.powerLevels')}</td>
                    <td className="px-6 py-4">{product.specs.powerLevels}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.mountingSize')}</td>
                    <td className="px-6 py-4">{product.specs.mountingSize}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.antennaInterface')}</td>
                    <td className="px-6 py-4">{product.specs.antennaInterface}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.consumption')}</td>
                    <td className="px-6 py-4">{t(product.specs.consumptionKey)}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.additionalFeatures')}</td>
                    <td className="px-6 py-4">{t(product.specs.featuresKey)}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.microphone')}</td>
                    <td className="px-6 py-4">{t(product.specs.microphoneKey)}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.cableInterface')}</td>
                    <td className="px-6 py-4">{t(product.specs.cableInterfaceKey)}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.weight')}</td>
                    <td className="px-6 py-4">{product.specs.weight}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium bg-muted/50">{t('accessoryDetail.size')}</td>
                    <td className="px-6 py-4">{product.specs.size}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Operation Guide */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t('accessoryDetail.operationGuide')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t('accessoryDetail.bandSelection')}</h3>
                <p className="text-sm text-muted-foreground">{t(product.operationGuide.bandSelectionKey)}</p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Radio className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t('accessoryDetail.channelSelection')}</h3>
                <p className="text-sm text-muted-foreground">{t(product.operationGuide.channelSelectionKey)}</p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t('accessoryDetail.powerSelection')}</h3>
                <p className="text-sm text-muted-foreground">{t(product.operationGuide.powerSelectionKey)}</p>
              </div>
            </div>

            {/* Power Levels Table */}
            {product.operationGuide.powerLevelsTable && (
              <div className="mt-8">
                <h3 className="font-semibold mb-4">{t('accessoryDetail.powerLevelsRef')}</h3>
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-6 py-3 text-left font-semibold">{t('vtxDetail.level')}</th>
                        {product.operationGuide.powerLevelsTable.map((item) => (
                          <th key={item.level} className="px-6 py-3 text-center font-semibold">{item.level}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-6 py-3 font-medium">{product.model}</td>
                        {product.operationGuide.powerLevelsTable.map((item) => (
                          <td key={item.level} className="px-6 py-3 text-center">{item.power}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {t('vtxDetail.ledNote')}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Frequency Table */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t('accessoryDetail.freqTable')}</h2>
            <div className="bg-card rounded-xl border border-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left font-semibold">{t('vtxDetail.band')}</th>
                    <th className="px-4 py-3 text-center font-semibold">CH1</th>
                    <th className="px-4 py-3 text-center font-semibold">CH2</th>
                    <th className="px-4 py-3 text-center font-semibold">CH3</th>
                    <th className="px-4 py-3 text-center font-semibold">CH4</th>
                    <th className="px-4 py-3 text-center font-semibold">CH5</th>
                    <th className="px-4 py-3 text-center font-semibold">CH6</th>
                    <th className="px-4 py-3 text-center font-semibold">CH7</th>
                    <th className="px-4 py-3 text-center font-semibold">CH8</th>
                  </tr>
                </thead>
                <tbody>
                  {product.frequencyTable.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                      <td className="px-4 py-2 font-medium">{row.band}</td>
                      <td className="px-4 py-2 text-center">{row.ch1}</td>
                      <td className="px-4 py-2 text-center">{row.ch2}</td>
                      <td className="px-4 py-2 text-center">{row.ch3}</td>
                      <td className="px-4 py-2 text-center">{row.ch4}</td>
                      <td className="px-4 py-2 text-center">{row.ch5}</td>
                      <td className="px-4 py-2 text-center">{row.ch6}</td>
                      <td className="px-4 py-2 text-center">{row.ch7}</td>
                      <td className="px-4 py-2 text-center">{row.ch8}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Notes */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t('accessoryDetail.notes')}</h2>
            <div className="space-y-4">
              {product.noteKeys.map((noteKey, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{t(noteKey)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PV02 Application Scenarios */}
        {isPV02 && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Application Scenarios</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">FPV Long-Range Flight</h3>
                  <p className="text-sm text-muted-foreground">{t('vtxDetail.pv02.application.fpv')}</p>
                </div>
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Industrial Inspection</h3>
                  <p className="text-sm text-muted-foreground">{t('vtxDetail.pv02.application.inspection')}</p>
                </div>
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Thermometer className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Search &amp; Rescue</h3>
                  <p className="text-sm text-muted-foreground">{t('vtxDetail.pv02.application.sar')}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PV02 FAQ */}
        {isPV02 && (
          <PageFAQ
            titleKey="vtxDetail.pv02.faq.title"
            items={pv02FaqItems}
            className="py-20"
          />
        )}

        {/* PV02 Technical Guide */}
        {isPV02 && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 text-center">{t('vtxDetail.pv02.techGuide.title')}</h2>
              <div className="max-w-3xl mx-auto space-y-6">
                {[
                  { titleKey: 'vtxDetail.pv02.techGuide.antenna.title', descKey: 'vtxDetail.pv02.techGuide.antenna.desc', icon: Radio },
                  { titleKey: 'vtxDetail.pv02.techGuide.power.title', descKey: 'vtxDetail.pv02.techGuide.power.desc', icon: Zap },
                  { titleKey: 'vtxDetail.pv02.techGuide.thermal.title', descKey: 'vtxDetail.pv02.techGuide.thermal.desc', icon: Thermometer },
                  { titleKey: 'vtxDetail.pv02.techGuide.rf.title', descKey: 'vtxDetail.pv02.techGuide.rf.desc', icon: Shield },
                ].map((tip, idx) => (
                  <div key={idx} className="p-6 bg-card rounded-xl border border-border">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <tip.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{t(tip.titleKey)}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{t(tip.descKey)}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <p className="text-sm text-center text-primary font-medium pt-4">{t('vtxDetail.pv02.techGuide.cta')}</p>
              </div>
            </div>
          </section>
        )}

        {/* PV03 Application Scenarios */}
        {isPV03 && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">{t('vtxDetail.pv03.application.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('vtxDetail.pv03.application.mountainTitle')}</h3>
                  <p className="text-sm text-muted-foreground">{t('vtxDetail.pv03.application.mountain')}</p>
                </div>
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('vtxDetail.pv03.application.bandoTitle')}</h3>
                  <p className="text-sm text-muted-foreground">{t('vtxDetail.pv03.application.bando')}</p>
                </div>
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Thermometer className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('vtxDetail.pv03.application.heavyFpvTitle')}</h3>
                  <p className="text-sm text-muted-foreground">{t('vtxDetail.pv03.application.heavyFpv')}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PV03 FAQ */}
        {isPV03 && (
          <PageFAQ
            titleKey="vtxDetail.pv03.faq.title"
            items={pv03FaqItems}
            className="py-20"
          />
        )}

        {/* FV10W Application Scenarios */}
        {isFV10W && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">{t('vtxDetail.fv10w.application.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('vtxDetail.fv10w.application.bandoTitle')}</h3>
                  <p className="text-sm text-muted-foreground">{t('vtxDetail.fv10w.application.bando')}</p>
                </div>
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('vtxDetail.fv10w.application.mountainTitle')}</h3>
                  <p className="text-sm text-muted-foreground">{t('vtxDetail.fv10w.application.mountain')}</p>
                </div>
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Thermometer className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('vtxDetail.fv10w.application.heavyFpvTitle')}</h3>
                  <p className="text-sm text-muted-foreground">{t('vtxDetail.fv10w.application.heavyFpv')}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FV10W Safety Warning */}
        {isFV10W && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                  <h2 className="text-lg font-bold text-destructive">{t('vtxDetail.fv10w.safety.title')}</h2>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive font-bold mt-0.5">▶</span>
                    <span>{t('vtxDetail.fv10w.safety.noAntenna')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive font-bold mt-0.5">▶</span>
                    <span>{t('vtxDetail.fv10w.safety.benchTest')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* FV10W FAQ */}
        {isFV10W && (
          <PageFAQ
            titleKey="vtxDetail.fv10w.faq.title"
            items={fv10wFaqItems}
            className="py-20"
          />
        )}

        {/* FV16W Application Scenarios */}
        {isFV16W && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">{t('vtxDetail.fv16w.application.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                    <Settings className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('vtxDetail.fv16w.application.customTitle')}</h3>
                  <p className="text-sm text-muted-foreground">{t('vtxDetail.fv16w.application.custom')}</p>
                </div>
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('vtxDetail.fv16w.application.sarTitle')}</h3>
                  <p className="text-sm text-muted-foreground">{t('vtxDetail.fv16w.application.sar')}</p>
                </div>
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Thermometer className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('vtxDetail.fv16w.application.cinemaTitle')}</h3>
                  <p className="text-sm text-muted-foreground">{t('vtxDetail.fv16w.application.cinema')}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FV16W Safety Warning */}
        {isFV16W && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                  <h2 className="text-lg font-bold text-destructive">{t('vtxDetail.fv16w.safety.title')}</h2>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive font-bold mt-0.5">▶</span>
                    <span>{t('vtxDetail.fv16w.safety.noAntenna')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive font-bold mt-0.5">▶</span>
                    <span>{t('vtxDetail.fv16w.safety.dualFan')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* FV16W FAQ */}
        {isFV16W && (
          <PageFAQ
            titleKey="vtxDetail.fv16w.faq.title"
            items={fv16wFaqItems}
            className="py-20"
          />
        )}

        {/* FV25W Application Scenarios */}
        {isFV25W && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">{t('vtxDetail.fv25w.application.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('vtxDetail.fv25w.application.bandoTitle')}</h3>
                  <p className="text-sm text-muted-foreground">{t('vtxDetail.fv25w.application.bando')}</p>
                </div>
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('vtxDetail.fv25w.application.cinemaTitle')}</h3>
                  <p className="text-sm text-muted-foreground">{t('vtxDetail.fv25w.application.cinema')}</p>
                </div>
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Thermometer className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('vtxDetail.fv25w.application.terrainTitle')}</h3>
                  <p className="text-sm text-muted-foreground">{t('vtxDetail.fv25w.application.terrain')}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FV25W Safety Warning */}
        {isFV25W && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                  <h2 className="text-lg font-bold text-destructive">{t('vtxDetail.fv25w.safety.title')}</h2>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive font-bold mt-0.5">▶</span>
                    <span>{t('vtxDetail.fv25w.safety.rfWarning')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive font-bold mt-0.5">▶</span>
                    <span>{t('vtxDetail.fv25w.safety.oemCustom')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* FV25W FAQ */}
        {isFV25W && (
          <PageFAQ
            titleKey="vtxDetail.fv25w.faq.title"
            items={fv25wFaqItems}
            className="py-20"
          />
        )}

        {/* FV37W Application Scenarios */}
        {isFV37W && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">{t('vtxDetail.fv37w.application.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('vtxDetail.fv37w.application.undergroundTitle')}</h3>
                  <p className="text-sm text-muted-foreground">{t('vtxDetail.fv37w.application.underground')}</p>
                </div>
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('vtxDetail.fv37w.application.heavyLiftTitle')}</h3>
                  <p className="text-sm text-muted-foreground">{t('vtxDetail.fv37w.application.heavyLift')}</p>
                </div>
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Thermometer className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('vtxDetail.fv37w.application.ewTitle')}</h3>
                  <p className="text-sm text-muted-foreground">{t('vtxDetail.fv37w.application.ew')}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FV37W Safety Warning */}
        {isFV37W && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                  <h2 className="text-lg font-bold text-destructive">{t('vtxDetail.fv37w.safety.title')}</h2>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive font-bold mt-0.5">▶</span>
                    <span>{t('vtxDetail.fv37w.safety.rfWarning')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive font-bold mt-0.5">▶</span>
                    <span>{t('vtxDetail.fv37w.safety.oemCustom')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* FV37W FAQ */}
        {isFV37W && (
          <PageFAQ
            titleKey="vtxDetail.fv37w.faq.title"
            items={fv37wFaqItems}
            className="py-20"
          />
        )}

        {/* Related Article for PV02 */}
        {isPV02 && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📰</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('prod.logistics.k451')}</p>
                  <Link to="/news/c0dc136e-1706-4404-9619-e8180901e19a" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.vtxdetail.k637')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">{t('acc.vtxdetail.k638')}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}

        {/* Related Article for PV03 */}
        {isPV03 && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📰</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('prod.logistics.k451')}</p>
                  <Link to="/news/0e111391-6e61-4e82-b656-b382e5b1333f" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.vtxdetail.k639')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">{t('acc.vtxdetail.k640')}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}

        {/* Related Article for FV10W */}
        {isFV10W && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📰</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('prod.logistics.k451')}</p>
                  <Link to="/news/3dda67fc-5d89-48fc-bbd7-a7056a732d99" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.vtxdetail.k641')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">{t('acc.vtxdetail.k642')}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}

        {/* Related Article for FV16W */}
        {isFV16W && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📰</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('prod.logistics.k451')}</p>
                  <Link to="/news/a1899cc4-f1d7-4f08-9669-2522c1f79a2e" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.vtxdetail.k643')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">{t('acc.vtxdetail.k644')}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}

        {/* Related Article for FV25W */}
        {isFV25W && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📰</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('prod.logistics.k451')}</p>
                  <Link to="/news/3adc5ee4-31fd-43a9-868b-ad8b9ec0cb38" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.vtxdetail.k645')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">{t('acc.vtxdetail.k646')}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}

        {/* Related Article for FV37W */}
        {isFV37W && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📰</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('prod.logistics.k451')}</p>
                  <Link to="/news/66dbf5b2-cf34-4e8c-908a-2e78860a3696" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.vtxdetail.k647')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">{t('acc.vtxdetail.k648')}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}

        {/* Related Article for FV10W-72 (7.2GHz) */}
        {isFV10W72 && (
          <section className="py-12 bg-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all border border-border/30">
                <div className="text-3xl">📰</div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-mono mb-1">{t('prod.logistics.k451')}</p>
                  <Link to="/news/b7e2f4a1-3c8d-4e5f-9a1b-2d3e4f5a6b7c" className="text-foreground font-semibold hover:text-accent transition-colors">
                    {t('acc.vtxdetail.k649')}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">{t('acc.vtxdetail.k650')}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </section>
        )}

        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t('accessoryDetail.customSolution')}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {t('accessoryDetail.customFreq')}
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">{t('contact.title')}</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/products/accessories/vtx-vrx">{t('accessoryDetail.viewMoreProducts')}</Link>
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

export default VtxDetail;
