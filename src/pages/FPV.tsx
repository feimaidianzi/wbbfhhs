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
  Gauge,
  Wind,
  Timer,
  Package,
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
  name: { zh: string; en: string };
  tag: { zh: string; en: string };
  positioning: { zh: string; en: string };
  config: { zh: string[]; en: string[] };
  specs: Array<{ value: string; label: { zh: string; en: string } }>;
  image: string;
  accent: string;
}

const FPV = () => {
  const { t, baseLang } = useLanguage();
  const isEn = baseLang === "en";
  const tr = (v: { zh: string; en: string }) => (isEn ? v.en : v.zh);

  const products: FpvProduct[] = [
    {
      code: "SF-C1S",
      name: { zh: "SF-C1S 1S 微型穿越机", en: "SF-C1S 1S Micro FPV" },
      tag: { zh: "入门 · 微型", en: "Entry · Micro" },
      positioning: {
        zh: "新手友好与专业性能兼具，极致轻便机身搭配灵活操控，从入门到进阶的完美选择。",
        en: "Beginner-friendly with pro performance — ultra-light frame and agile control for first-flight to advanced.",
      },
      config: {
        zh: ["1102 无刷电机 + 1S 电调", "F411 微型飞控", "40mm 三叶桨，推力充沛", "双频抗干扰，图传 500m"],
        en: ["1102 brushless + 1S ESC", "F411 micro FC", "40mm tri-blade, strong thrust", "Dual-band VTX, 500m range"],
      },
      specs: [
        { value: "30 km/h", label: { zh: "极速", en: "Top Speed" } },
        { value: "3-5 min", label: { zh: "续航", en: "Flight Time" } },
        { value: "Lv.2", label: { zh: "抗风", en: "Wind Rating" } },
        { value: "15 g", label: { zh: "重量", en: "Weight" } },
      ],
      image: fpvC1sImg,
      accent: "from-cyan-500/30 to-blue-500/10",
    },
    {
      code: "SF-R5",
      name: { zh: "爆闪 5 寸竞速穿越机", en: "Flash-5 Racing FPV" },
      tag: { zh: "竞速 · 高级", en: "Racing · Advanced" },
      positioning: {
        zh: "高级竞速穿越机，极致性能与操控手感，专为赛道而生。",
        en: "Advanced racing rig — extreme performance and feel, born for the track.",
      },
      config: {
        zh: ["高强度碳纤维机架", "F722 竞速飞控", "2207 2700KV 电机", "2.5W 高清图传 + 1550mAh 120C 电池"],
        en: ["High-strength carbon frame", "F722 racing FC", "2207 2700KV motor", "2.5W HD VTX + 1550mAh 120C pack"],
      },
      specs: [
        { value: "170 km/h", label: { zh: "极速", en: "Top Speed" } },
        { value: "5-7 min", label: { zh: "续航", en: "Flight Time" } },
        { value: "Lv.6", label: { zh: "抗风", en: "Wind Rating" } },
        { value: "-10~45℃", label: { zh: "温域", en: "Temp Range" } },
      ],
      image: fpvR5Img,
      accent: "from-orange-500/30 to-red-500/10",
    },
    {
      code: "SF-F5XH",
      name: { zh: "黑闪 5X H 花飞拍摄穿越机", en: "Black-Flash 5X H Freestyle FPV" },
      tag: { zh: "花飞 · 拍摄", en: "Freestyle · Cinematic" },
      positioning: {
        zh: "沉浸式花飞体验，为追求极限视角与飞行艺术的飞手而生。",
        en: "Immersive freestyle for pilots chasing extreme angles and aerial artistry.",
      },
      config: {
        zh: ["2206 2050KV 电机", "60A 32-bit 4合1 电调", "F722 飞控", "数字图传 & 模拟图传全兼容"],
        en: ["2206 2050KV motor", "60A 32-bit 4-in-1 ESC", "F722 FC", "Digital & analog VTX compatible"],
      },
      specs: [
        { value: "150 km/h", label: { zh: "极速", en: "Top Speed" } },
        { value: "6 min", label: { zh: "续航", en: "Flight Time" } },
        { value: "Lv.5", label: { zh: "抗风", en: "Wind Rating" } },
        { value: "-10~45℃", label: { zh: "温域", en: "Temp Range" } },
      ],
      image: fpvF5xhImg,
      accent: "from-purple-500/30 to-pink-500/10",
    },
    {
      code: "SF-C7",
      name: { zh: "SF-C7 7 寸重载穿越机", en: "SF-C7 7-inch Heavy-Lift FPV" },
      tag: { zh: "中长航时 · 挂载", en: "Mid-Endurance · Payload" },
      positioning: {
        zh: "专为户外多任务场景设计的中长航时穿越机，平衡速度与续航，满足专业飞行与挂载需求。",
        en: "Mid-endurance platform for outdoor multi-mission ops — balanced speed, range and payload capacity.",
      },
      config: {
        zh: ["1307 无刷电机", "7S 1500mAh 电池", "F722 高性能飞控", "2.5W 模拟图传"],
        en: ["1307 brushless motor", "7S 1500mAh pack", "F722 high-perf FC", "2.5W analog VTX"],
      },
      specs: [
        { value: "120 km/h", label: { zh: "最大速度", en: "Top Speed" } },
        { value: "10 min", label: { zh: "续航时间", en: "Flight Time" } },
        { value: "Lv.5", label: { zh: "最大抗风", en: "Wind Rating" } },
        { value: "1.5 kg", label: { zh: "载荷能力", en: "Payload" } },
      ],
      image: fpvC7Img,
      accent: "from-emerald-500/30 to-teal-500/10",
    },
    {
      code: "SF-C10",
      name: { zh: "SF-C10 10 寸长航时穿越机", en: "SF-C10 10-inch Long-Endurance FPV" },
      tag: { zh: "长航时 · 户外作业", en: "Long-Endurance · Field Ops" },
      positioning: {
        zh: "专为长时间户外作业设计，兼顾续航能力与飞行性能。同系列还提供 11/12 寸更大载重型号。",
        en: "Engineered for sustained field missions — endurance plus performance. 11/12-inch variants available for heavier payloads.",
      },
      config: {
        zh: ["2306 2400KV 电机", "6S 3000mAh 100C 电池", "F722 飞控", "2.5W 模拟图传"],
        en: ["2306 2400KV motor", "6S 3000mAh 100C pack", "F722 FC", "2.5W analog VTX"],
      },
      specs: [
        { value: "120 km/h", label: { zh: "速度", en: "Speed" } },
        { value: "15 min", label: { zh: "续航", en: "Endurance" } },
        { value: "Lv.6", label: { zh: "抗风", en: "Wind Rating" } },
        { value: "3 kg", label: { zh: "载荷", en: "Payload" } },
      ],
      image: fpvC10Img,
      accent: "from-sky-500/30 to-indigo-500/10",
    },
    {
      code: "SF-C15",
      name: { zh: "SF-C15 15 寸重载穿越机", en: "SF-C15 15-inch Heavy-Load FPV" },
      tag: { zh: "重载 · 强抗风", en: "Heavy-Load · High-Wind" },
      positioning: {
        zh: "重型穿越机，专为大型载重作业场景设计，具备出色的抗风能力与动力冗余。",
        en: "Heavy-lift platform built for high-payload missions with class-leading wind resistance and power redundancy.",
      },
      config: {
        zh: ["3110 1200KV 电机", "8S 5000mAh 100C 电池", "F722 飞控", "2.5W 图传"],
        en: ["3110 1200KV motor", "8S 5000mAh 100C pack", "F722 FC", "2.5W VTX"],
      },
      specs: [
        { value: "100 km/h", label: { zh: "速度", en: "Speed" } },
        { value: "20 min", label: { zh: "续航", en: "Endurance" } },
        { value: "Lv.8", label: { zh: "抗风", en: "Wind Rating" } },
        { value: "10 kg", label: { zh: "载荷", en: "Payload" } },
      ],
      image: fpvC15Img,
      accent: "from-amber-500/30 to-orange-500/10",
    },
    {
      code: "SF-AI",
      name: { zh: "AI 火箭穿越机", en: "AI-Rocket FPV" },
      tag: { zh: "智能 · 高速拦截", en: "Intelligent · High-Speed Intercept" },
      positioning: {
        zh: "新一代智能无人机，专为高速拦截与精准打击打造，AI 识别锁定保持 95% 以上命中率。",
        en: "Next-gen intelligent UAV for high-speed intercept and precision strikes — AI lock-on sustains 95%+ hit rate.",
      },
      config: {
        zh: ["复合材料机身，过冗余动力", "AI 识别锁定系统", "超载环境下稳定飞行", "支持 500g 任务负载"],
        en: ["Composite airframe, redundant power", "AI target lock-on system", "Stable under overload conditions", "Supports 500g mission payload"],
      },
      specs: [
        { value: "480 km/h", label: { zh: "极速巡航", en: "Cruise Top" } },
        { value: "5 min", label: { zh: "飞行续航", en: "Flight Time" } },
        { value: "Lv.6", label: { zh: "抗风能力", en: "Wind Rating" } },
        { value: "500 g", label: { zh: "任务负载", en: "Payload" } },
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
    {
      icon: Cpu,
      title: { zh: "硬件定制", en: "Hardware" },
      items: {
        zh: ["动力系统：电机/电调/电池组合，匹配速度与续航需求", "飞控系统：定制算法与传感器配置", "机身结构：碳纤维气动优化与挂载能力"],
        en: ["Powertrain: motor/ESC/battery combos tuned to speed & endurance", "Flight control: custom algorithms & sensor stacks", "Frame: carbon aero optimisation & payload mounts"],
      },
    },
    {
      icon: Radio,
      title: { zh: "软件定制", en: "Software" },
      items: {
        zh: ["飞行控制：定制飞行模式与任务规划", "图传系统：多频段与传输距离适配", "地面站：实时数据/分析/远程操控"],
        en: ["Flight control: custom modes & mission planning", "VTX: multi-band & range adaptation", "Ground station: live telemetry, analytics, remote ops"],
      },
    },
    {
      icon: Palette,
      title: { zh: "外观定制", en: "Appearance" },
      items: {
        zh: ["个性化涂装：定制配色与图案", "品牌标识印刷：LOGO/型号/Slogan", "提升品牌辨识度"],
        en: ["Custom liveries & patterns", "Brand printing: logo/model/slogan", "Stronger brand identity"],
      },
    },
    {
      icon: Target,
      title: { zh: "场景定制", en: "Scenario" },
      items: {
        zh: ["竞速竞赛：极致动力与操控", "花飞拍摄：稳定灵活兼顾", "专业训练：高容错安全方案", "军警应用：稳定侦察平台"],
        en: ["Racing: max power & control", "Freestyle/cine: stable + agile", "Training: high-tolerance safety", "Mil/LE: stable recon platform"],
      },
    },
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
                {isEn ? "SF FPV Drone Series" : "SF 穿越机系列"}
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {isEn ? "FPV Drone Series" : "FPV 穿越机系列"}
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {isEn
                  ? "From 1S micro trainers to 15-inch heavy-lift and AI intercept platforms — seven specialised airframes covering racing, freestyle, cinematic, long-range and mission roles."
                  : "从 1S 微型入门机到 15 寸重载与 AI 拦截平台，七款专业机型覆盖竞速、花飞、拍摄、长航与任务场景。"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-cyan-500 hover:bg-cyan-400 text-[#0a0f1a] px-8 py-6 text-lg shadow-lg font-semibold">
                  <a href="#fpv-lineup">
                    {isEn ? "Browse Lineup" : "查看全部机型"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg">
                  <Link to="/contact">{isEn ? "Request Quote" : "获取报价"}</Link>
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
                {isEn ? "FPV Lineup" : "穿越机机型阵列"}
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                {isEn
                  ? "Seven specialised platforms — from 15g micro to 10kg heavy-lift and 480km/h AI intercept."
                  : "七款专业机型 — 从 15g 微型到 10kg 重载、480km/h AI 拦截全覆盖。"}
              </p>
              <div className="w-20 h-1 bg-cyan-400 mx-auto rounded-full mt-4" />
            </div>

            <div className="space-y-10">
              {products.map((p, idx) => (
                <article
                  key={p.code}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#0d1424] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-colors"
                >
                  <div className={`relative aspect-[16/10] lg:aspect-auto overflow-hidden ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                    <img
                      loading="lazy"
                      decoding="async"
                      src={p.image}
                      alt={tr(p.name)}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} pointer-events-none`} />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-[#0a0f1a]/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono rounded">
                        {p.code}
                      </span>
                      <span className="px-3 py-1 bg-[#0a0f1a]/80 border border-white/20 text-white/80 text-xs rounded">
                        {tr(p.tag)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{tr(p.name)}</h3>
                      <p className="text-white/70 leading-relaxed mb-6">{tr(p.positioning)}</p>

                      <div className="mb-6">
                        <div className="text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-3">
                          {isEn ? "Core Configuration" : "核心配置"}
                        </div>
                        <ul className="space-y-2">
                          {(isEn ? p.config.en : p.config.zh).map((c, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                              <span className="text-cyan-400 mt-1">▍</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-white/10">
                      {p.specs.map((s, i) => (
                        <div key={i} className="text-center">
                          <div className="text-lg md:text-xl font-bold text-cyan-300">{s.value}</div>
                          <div className="text-xs text-white/50 mt-1">{tr(s.label)}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-xs text-white/40">
                        {isEn ? "Specs depend on environment & payload." : "性能数据受环境与载荷影响"}
                      </span>
                      <Button asChild size="sm" variant="outline" className="border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10 min-h-[44px]">
                        <Link to="/contact">
                          {isEn ? "Get Quote" : "获取报价"}
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Customization */}
        <section className="py-20 bg-[#0d1424] border-y border-white/5">
          <div className="container-custom">
            <div className="text-center mb-14">
              <div className="inline-block px-4 py-1 bg-cyan-500/10 border border-cyan-400/30 rounded-full text-cyan-300 text-sm mb-4">
                {isEn ? "OEM / ODM" : "OEM / ODM 服务"}
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">
                {isEn ? "FPV Customisation Services" : "穿越机系列 · 定制化服务"}
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                {isEn
                  ? "Hardware, software, livery and scenario-level customisation — built around your mission profile."
                  : "硬件、软件、外观与场景四维定制 — 围绕您的任务需求量身打造。"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {customization.map((c, i) => (
                <div key={i} className="bg-[#0a0f1a] border border-white/10 rounded-xl p-6 hover:border-cyan-400/30 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center mb-4">
                    <c.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-4">{tr(c.title)}</h3>
                  <ul className="space-y-2">
                    {(isEn ? c.items.en : c.items.zh).map((it, j) => (
                      <li key={j} className="text-sm text-white/70 flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">·</span>
                        <span>{it}</span>
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
              {isEn ? "Need a tailored FPV platform?" : "需要定制专属 FPV 平台？"}
            </h2>
            <p className="text-white/70 mb-10 max-w-2xl mx-auto">
              {isEn
                ? "Talk to our engineering team about racing, cinematic, heavy-lift or AI mission requirements."
                : "与我们的工程团队对接竞速、拍摄、重载或 AI 任务需求。"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-cyan-500 hover:bg-cyan-400 text-[#0a0f1a] px-10 py-6 text-lg font-semibold shadow-lg min-h-[44px]">
                <Link to="/contact">
                  {isEn ? "Email Us" : "联系我们"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 px-10 py-6 text-lg min-h-[44px]">
                <Link to="/custom-research">{isEn ? "Custom R&D" : "定制研发"}</Link>
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
