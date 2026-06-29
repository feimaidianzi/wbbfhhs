import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Zap,
  Eye,
  Radio,
  Shield,
  Cpu,
  Palette,
  Target,
} from "lucide-react";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import fpvHeroImg from "@/assets/seo/fpv-drone-aerial.jpg";
import sfC1sAsset from "@/assets/fpv/sf-c1s.png.asset.json";
import sfR5Asset from "@/assets/fpv/sf-r5.png.asset.json";
import sfF5xhAsset from "@/assets/fpv/sf-f5xh.png.asset.json";
import sfC7Asset from "@/assets/fpv/sf-c7.png.asset.json";
import sfC10Asset from "@/assets/fpv/sf-c10.png.asset.json";
import sfC15Asset from "@/assets/fpv/sf-c15.png.asset.json";
import sfAiAsset from "@/assets/fpv/sf-ai.png.asset.json";

const fpvC1sImg = sfC1sAsset.url;
const fpvR5Img = sfR5Asset.url;
const fpvF5xhImg = sfF5xhAsset.url;
const fpvC7Img = sfC7Asset.url;
const fpvC10Img = sfC10Asset.url;
const fpvC15Img = sfC15Asset.url;
const fpvAiImg = sfAiAsset.url;

interface FpvProduct {
  code: string;
  key: string;
  configCount: number;
  specs: Array<{ value: string; labelKey: string }>;
  image: string;
  accent: string;
}

const FPV = () => {
  const { t } = useLanguage();

  const products: FpvProduct[] = [
    {
      code: "SF-C1S",
      key: "c1s",
      configCount: 4,
      specs: [
        { value: "30 km/h", labelKey: "fpv.product.c1s.specs.0" },
        { value: "3-5 min", labelKey: "fpv.product.c1s.specs.1" },
        { value: "Lv.2", labelKey: "fpv.product.c1s.specs.2" },
        { value: "15 g", labelKey: "fpv.product.c1s.specs.3" },
      ],
      image: fpvC1sImg,
      accent: "from-cyan-500/30 to-blue-500/10",
    },
    {
      code: "SF-R5",
      key: "r5",
      configCount: 4,
      specs: [
        { value: "170 km/h", labelKey: "fpv.product.r5.specs.0" },
        { value: "5-7 min", labelKey: "fpv.product.r5.specs.1" },
        { value: "Lv.6", labelKey: "fpv.product.r5.specs.2" },
        { value: "-10~45℃", labelKey: "fpv.product.r5.specs.3" },
      ],
      image: fpvR5Img,
      accent: "from-orange-500/30 to-red-500/10",
    },
    {
      code: "SF-F5XH",
      key: "f5xh",
      configCount: 4,
      specs: [
        { value: "150 km/h", labelKey: "fpv.product.f5xh.specs.0" },
        { value: "6 min", labelKey: "fpv.product.f5xh.specs.1" },
        { value: "Lv.5", labelKey: "fpv.product.f5xh.specs.2" },
        { value: "-10~45℃", labelKey: "fpv.product.f5xh.specs.3" },
      ],
      image: fpvF5xhImg,
      accent: "from-purple-500/30 to-pink-500/10",
    },
    {
      code: "SF-C7",
      key: "c7",
      configCount: 4,
      specs: [
        { value: "120 km/h", labelKey: "fpv.product.c7.specs.0" },
        { value: "10 min", labelKey: "fpv.product.c7.specs.1" },
        { value: "Lv.5", labelKey: "fpv.product.c7.specs.2" },
        { value: "1.5 kg", labelKey: "fpv.product.c7.specs.3" },
      ],
      image: fpvC7Img,
      accent: "from-emerald-500/30 to-teal-500/10",
    },
    {
      code: "SF-C10",
      key: "c10",
      configCount: 4,
      specs: [
        { value: "120 km/h", labelKey: "fpv.product.c10.specs.0" },
        { value: "15 min", labelKey: "fpv.product.c10.specs.1" },
        { value: "Lv.6", labelKey: "fpv.product.c10.specs.2" },
        { value: "3 kg", labelKey: "fpv.product.c10.specs.3" },
      ],
      image: fpvC10Img,
      accent: "from-sky-500/30 to-indigo-500/10",
    },
    {
      code: "SF-C15",
      key: "c15",
      configCount: 4,
      specs: [
        { value: "100 km/h", labelKey: "fpv.product.c15.specs.0" },
        { value: "20 min", labelKey: "fpv.product.c15.specs.1" },
        { value: "Lv.8", labelKey: "fpv.product.c15.specs.2" },
        { value: "10 kg", labelKey: "fpv.product.c15.specs.3" },
      ],
      image: fpvC15Img,
      accent: "from-amber-500/30 to-orange-500/10",
    },
    {
      code: "SF-AI",
      key: "ai",
      configCount: 4,
      specs: [
        { value: "480 km/h", labelKey: "fpv.product.ai.specs.0" },
        { value: "5 min", labelKey: "fpv.product.ai.specs.1" },
        { value: "Lv.6", labelKey: "fpv.product.ai.specs.2" },
        { value: "500 g", labelKey: "fpv.product.ai.specs.3" },
      ],
      image: fpvAiImg,
      accent: "from-rose-500/30 to-fuchsia-500/10",
    },
  ];

  const features = [
    { icon: Zap, title: t("fpv.features.speed.title"), description: t("fpv.features.speed.desc") },
    { icon: Eye, title: t("fpv.features.fpv.title"), description: t("fpv.features.fpv.desc") },
    { icon: Radio, title: t("fpv.features.latency.title"), description: t("fpv.features.latency.desc") },
    { icon: Shield, title: t("fpv.features.durable.title"), description: t("fpv.features.durable.desc") },
  ];

  const customization = [
    { icon: Cpu, key: "hw", itemCount: 3 },
    { icon: Radio, key: "sw", itemCount: 3 },
    { icon: Palette, key: "look", itemCount: 3 },
    { icon: Target, key: "scenario", itemCount: 4 },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <MultiLanguageSEO
        title={t("fpv.seo.title")}
        description={t("fpv.seo.description")}
        keywords={t("fpv.seo.keywords")}
        path="/fpv"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero */}
        <section className="relative h-[460px] md:h-[560px] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fpvHeroImg})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a]/95 via-[#0a0f1a]/70 to-transparent" />
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl animate-fade-in">
              <div className="inline-block px-4 py-1 bg-cyan-500/10 border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-medium mb-4">
                {t("fpv.hero.badge")}
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {t("fpv.hero.title")}
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {t("fpv.hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-cyan-500 hover:bg-cyan-400 text-[#0a0f1a] px-8 py-6 text-lg shadow-lg font-semibold">
                  <a href="#fpv-lineup">
                    {t("fpv.hero.cta.browse")}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white px-8 py-6 text-lg">
                  <Link to="/contact">{t("fpv.hero.cta.quote")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-[#0d1424] border-y border-white/5">
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <feature.icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Lineup */}
        <section id="fpv-lineup" className="py-20 bg-[#0a0f1a]">
          <div className="container-custom">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">
                {t("fpv.lineup.title")}
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                {t("fpv.lineup.subtitle")}
              </p>
              <div className="w-20 h-1 bg-cyan-400 mx-auto rounded-full mt-4" />
            </div>

            <div className="space-y-10">
              {products.map((p, idx) => {
                const name = t(`fpv.product.${p.key}.name`);
                return (
                  <article
                    key={p.code}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#0d1424] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-colors"
                  >
                    <div className={`relative aspect-[16/10] lg:aspect-auto overflow-hidden ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                      <img
                        loading="lazy"
                        decoding="async"
                        src={p.image}
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} pointer-events-none`} />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 bg-[#0a0f1a]/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono rounded">
                          {p.code}
                        </span>
                        <span className="px-3 py-1 bg-[#0a0f1a]/80 border border-white/20 text-white/80 text-xs rounded">
                          {t(`fpv.product.${p.key}.tag`)}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{name}</h3>
                        <p className="text-white/70 leading-relaxed mb-6">{t(`fpv.product.${p.key}.positioning`)}</p>

                        <div className="mb-6">
                          <div className="text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-3">
                            {t("fpv.lineup.coreConfig")}
                          </div>
                          <ul className="space-y-2">
                            {Array.from({ length: p.configCount }).map((_, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                                <span className="text-cyan-400 mt-1">▍</span>
                                <span>{t(`fpv.product.${p.key}.config.${i}`)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-white/10">
                        {p.specs.map((s, i) => (
                          <div key={i} className="text-center">
                            <div className="text-lg md:text-xl font-bold text-cyan-300">{s.value}</div>
                            <div className="text-xs text-white/50 mt-1">{t(s.labelKey)}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-xs text-white/40">{t("fpv.lineup.specsCaveat")}</span>
                        <Button asChild size="sm" variant="outline" className="border-cyan-400/50 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/25 hover:text-white hover:border-cyan-300 min-h-[44px]">
                          <Link to="/contact">
                            {t("fpv.lineup.getQuote")}
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Customization */}
        <section className="py-20 bg-[#0d1424] border-y border-white/5">
          <div className="container-custom">
            <div className="text-center mb-14">
              <div className="inline-block px-4 py-1 bg-cyan-500/10 border border-cyan-400/30 rounded-full text-cyan-300 text-sm mb-4">
                {t("fpv.custom.badge")}
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">
                {t("fpv.custom.title")}
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                {t("fpv.custom.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {customization.map((c) => (
                <div key={c.key} className="bg-[#0a0f1a] border border-white/10 rounded-xl p-6 hover:border-cyan-400/30 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center mb-4">
                    <c.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-4">{t(`fpv.custom.${c.key}.title`)}</h3>
                  <ul className="space-y-2">
                    {Array.from({ length: c.itemCount }).map((_, j) => (
                      <li key={j} className="text-sm text-white/70 flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">·</span>
                        <span>{t(`fpv.custom.${c.key}.items.${j}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#0a0f1a] relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="container-custom text-center relative">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              {t("fpv.cta.title")}
            </h2>
            <p className="text-white/70 mb-10 max-w-2xl mx-auto">
              {t("fpv.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-cyan-500 hover:bg-cyan-400 text-[#0a0f1a] px-10 py-6 text-lg font-semibold shadow-lg min-h-[44px]">
                <Link to="/contact">
                  {t("fpv.cta.email")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent border-cyan-400/60 text-cyan-100 hover:bg-cyan-500/20 hover:text-white hover:border-cyan-300 px-10 py-6 text-lg min-h-[44px]">
                <Link to="/custom-research">{t("fpv.cta.customRd")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default FPV;
