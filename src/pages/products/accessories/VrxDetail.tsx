import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LangLink as Link } from "@/components/LangLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import { Check, Radio, Zap, Shield, Cpu, Eye, Settings, ChevronRight } from "lucide-react";
import { getVrxProductById } from "@/data/vrxProducts";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageFAQ } from "@/components/PageFAQ";
import vrxPinout from "@/assets/vrx/vrx-5849-pinout.png";

const VrxDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getVrxProductById(productId) : null;
  const { language } = useLanguage();
  const isZh = language === 'zh';

  if (!product) {
    return <Navigate to="/products/accessories/vtx-vrx" replace />;
  }

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": `CANI LongLink ${product.model}`,
    "description": isZh ? product.descZh : product.descEn,
    "brand": { "@type": "Brand", "name": "CANI UAV" },
    "manufacturer": { "@type": "Organization", "name": "CANI长凌科技", "url": "https://www.caniuav.com" },
    "sku": product.model,
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Frequency Range", "value": product.frequency },
      { "@type": "PropertyValue", "name": "Sensitivity", "value": product.sensitivity },
      { "@type": "PropertyValue", "name": "Demodulation", "value": "FM/PLL" },
      { "@type": "PropertyValue", "name": "Channels", "value": `${product.channels}CH (6 Bands)` },
    ],
    "offers": {
      "@type": "Offer",
      "url": `https://www.caniuav.com/products/accessories/vtx-vrx/vrx/${product.id}`,
      "availability": "https://schema.org/InStock"
    }
  };

  const faqItems = [
    {
      questionKey: isZh ? "vrxFaq.q1" : "vrxFaq.q1",
      answerKey: isZh ? "vrxFaq.a1" : "vrxFaq.a1",
    },
  ];

  const highlights = isZh ? product.highlightsZh : product.highlightsEn;

  return (
    <>
      <MultiLanguageSEO
        title={isZh
          ? `极致灵敏度：${product.model} 双芯片模拟图传接收模组 | CANI`
          : `Ultimate Sensitivity: ${product.model} Dual-Chip Analog Rx Module | CANI`
        }
        description={isZh ? product.descZh : product.descEn}
        path={`/products/accessories/vtx-vrx/vrx/${product.id}`}
        type="product"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background">
        <BackButton to="/products/accessories/vtx-vrx" />

        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-accent/10 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <img
                  src={product.image}
                  alt={`CANI ${product.model} dual-chip 5.8GHz analog video receiver module -97dBm sensitivity`}
                  title={`CANI ${product.model} Industrial Analog VRX Module`}
                  className="w-full max-w-md mx-auto object-contain"
                  loading="eager"
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="px-3 py-1 text-sm bg-accent/20 text-accent-foreground rounded-full font-bold">VRX</span>
                  <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">{product.sensitivity}</span>
                  <span className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full">{product.channels}CH</span>
                  <span className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full">{product.frequency}</span>
                  <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">{isZh ? '零延迟' : 'Zero Latency'}</span>
                  <span className="px-3 py-1 text-sm bg-accent text-accent-foreground rounded-full font-medium">Dual Chip</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {isZh ? '工业级 5.8GHz 双芯片模拟图传接收核心' : 'Industrial 5.8GHz Dual-Chip Analog Video Rx Core'}
                </h1>
                <p className="text-xl text-muted-foreground mb-4">{product.model}</p>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed border-l-2 border-accent pl-4">
                  {isZh ? product.descZh : product.descEn}
                </p>

                <div className="space-y-2 mb-8">
                  {highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button size="lg" asChild>
                    <Link to="/contact">{isZh ? '获取报价' : 'Get Quote'}</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#specs">{isZh ? '查看参数' : 'View Specs'}</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Layers */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{isZh ? '产品深度解析' : 'Technology Deep Dive'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">{isZh ? '硬件层：双芯片解调' : 'Hardware: Dual-Chip Demod'}</h3>
                <p className="text-sm text-muted-foreground">
                  {isZh
                    ? '采用成熟的 FM/PLL 锁相环解调技术，双芯片架构信号捕获更精准，多径干扰下画面跳动更少。核心射频电路优化灵敏度高达 -97dBm。'
                    : 'Mature FM/PLL demodulation with dual-chip architecture for more precise signal acquisition. Optimized RF circuit achieves -97dBm sensitivity.'}
                </p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Radio className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{isZh ? '协议层：智能搜频' : 'Protocol: Smart Scanning'}</h3>
                <p className="text-sm text-muted-foreground">
                  {isZh
                    ? '自研搜频算法支持极速自动扫描与频率精确锁定。兼容 SmartAudio 协议，通过 SPI 接口实现频率和参数快速配置。'
                    : 'Proprietary scanning algorithm for rapid auto-scan and precise frequency lock. SmartAudio compatible via SPI interface for fast configuration.'}
                </p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{isZh ? '集成层：即插即用' : 'Integration: Plug & Play'}</h3>
                <p className="text-sm text-muted-foreground">
                  {isZh
                    ? '标准 14-Pin 接口定义（5V/GND/VIDEO/AUDIO/RSSI/SPI），方便快速集成至手持地面站、FPV 眼镜或工业监控塔。'
                    : 'Standard 14-Pin interface (5V/GND/VIDEO/AUDIO/RSSI/SPI) for rapid integration into handheld GCS, FPV goggles, or industrial monitoring towers.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section id="specs" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{isZh ? '详细技术参数' : 'Detailed Specifications'}</h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-6 py-3 text-left font-semibold w-1/3">{isZh ? '参数' : 'Parameter'}</th>
                    <th className="px-6 py-3 text-left font-semibold">{isZh ? '技术指标' : 'Specification'}</th>
                  </tr>
                </thead>
                <tbody>
                  {product.specs.map((spec, idx) => (
                    <tr key={idx} className={`border-b border-border ${spec.highlight ? 'bg-accent/5' : idx % 2 === 0 ? 'bg-background' : ''}`}>
                      <td className={`px-6 py-4 font-medium ${spec.highlight ? 'text-accent' : ''}`}>
                        {isZh ? spec.labelZh : spec.labelEn}
                      </td>
                      <td className={`px-6 py-4 ${spec.highlight ? 'font-bold text-accent' : ''}`}>
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pin Assignment */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{isZh ? '引脚定义' : 'Pin Assignment'}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Core Module Pins */}
              <div>
                <h3 className="font-semibold mb-4 text-lg">{isZh ? '核心模组引脚 (14-Pin)' : 'Core Module Pins (14-Pin)'}</h3>
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border">
                        <th className="px-4 py-2 text-center font-semibold w-20">PIN</th>
                        <th className="px-4 py-2 text-left font-semibold">{isZh ? '定义' : 'Definition'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.pinDefinitions.map((p, idx) => (
                        <tr key={idx} className={`border-b border-border/50 ${
                          p.definition === 'GND' ? '' :
                          p.definition === '5V' ? 'bg-destructive/5' :
                          p.definition === 'VIDEO' || p.definition === 'AUDIO' ? 'bg-primary/5' :
                          p.definition === 'ANT' ? 'bg-accent/5' :
                          'bg-secondary/30'
                        }`}>
                          <td className="px-4 py-2 text-center font-mono font-bold">{p.pin}</td>
                          <td className="px-4 py-2 font-medium">{p.definition}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Machine Module Pins */}
              <div>
                <h3 className="font-semibold mb-4 text-lg">{isZh ? '整机模组引脚 (9-Pin)' : 'Machine Module Pins (9-Pin)'}</h3>
                <div className="bg-card rounded-xl border border-border overflow-hidden mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border">
                        <th className="px-4 py-2 text-center font-semibold w-20">PIN</th>
                        <th className="px-4 py-2 text-left font-semibold">{isZh ? '定义' : 'Definition'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.machineModulePins.map((p, idx) => (
                        <tr key={idx} className={`border-b border-border/50 ${
                          p.definition === 'GND' ? '' :
                          p.definition === '5V' ? 'bg-destructive/5' :
                          p.definition === 'VIDEO' || p.definition === 'AUDIO' ? 'bg-primary/5' :
                          ''
                        }`}>
                          <td className="px-4 py-2 text-center font-mono font-bold">{p.pin}</td>
                          <td className="px-4 py-2 font-medium">{p.definition}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Frequency Table */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{isZh ? '频率表' : 'Frequency Table'}</h2>
            <div className="bg-card rounded-xl border border-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left font-semibold">{isZh ? '频段' : 'Band'}</th>
                    {[1,2,3,4,5,6,7,8].map(ch => (
                      <th key={ch} className="px-4 py-3 text-center font-semibold">CH{ch}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {product.frequencyTable.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                      <td className="px-4 py-2 font-medium font-mono">Band {row.band}</td>
                      {row.frequencies.map((freq, fi) => (
                        <td key={fi} className="px-4 py-2 text-center font-mono">{freq}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{isZh ? '单位: MHz' : 'Unit: MHz'}</p>
          </div>
        </section>

        {/* Application Scenarios */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{isZh ? '应用场景' : 'Application Scenarios'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">{isZh ? 'FPV 眼镜集成' : 'FPV Goggle Integration'}</h3>
                <p className="text-sm text-muted-foreground">
                  {isZh
                    ? '零延迟模拟信号直接驱动显示屏，-97dBm灵敏度确保远距离飞行时画面依然清晰稳定。'
                    : 'Zero-latency analog signal directly drives the display. -97dBm sensitivity ensures clear and stable video during long-range flights.'}
                </p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{isZh ? '工业监控终端' : 'Industrial Monitor'}</h3>
                <p className="text-sm text-muted-foreground">
                  {isZh
                    ? '集成至固定监控塔或移动指挥终端，实时接收现场视频。宽工作温度范围 -10℃~+65℃ 适应复杂环境。'
                    : 'Integrate into fixed monitoring towers or mobile command terminals for real-time field video. Wide operating temperature -10℃~+65℃.'}
                </p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{isZh ? '手持地面站' : 'Handheld GCS'}</h3>
                <p className="text-sm text-muted-foreground">
                  {isZh
                    ? '低功耗 ≤200mA 设计，3.3V~5.0V宽电压适配，便于嵌入手持设备或便携式接收系统。'
                    : 'Low power ≤200mA design with 3.3V~5.0V wide voltage for easy embedding into handheld devices or portable reception systems.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* OEM/ODM Service */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{isZh ? '商业合作与定制' : 'OEM/ODM Customization'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold mb-2 text-primary">{isZh ? '硬件 ODM' : 'Hardware ODM'}</h3>
                <p className="text-sm text-muted-foreground">
                  {isZh
                    ? '支持 PCBA 尺寸微调、接口类型定制（如增加 RSSI 输出引脚）以及特定外壳散热开发。'
                    : 'PCBA size adjustment, interface customization (e.g., additional RSSI output pins), and specific enclosure thermal design.'}
                </p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold mb-2 text-primary">{isZh ? '固件定制' : 'Firmware Customization'}</h3>
                <p className="text-sm text-muted-foreground">
                  {isZh
                    ? '可根据客户需求锁死特定合规频段，或定制专属的开机显示界面逻辑。'
                    : 'Lock specific compliant frequency bands or customize boot display logic per customer requirements.'}
                </p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold mb-2 text-primary">{isZh ? '一站式贴牌 OEM' : 'White-Label OEM'}</h3>
                <p className="text-sm text-muted-foreground">
                  {isZh
                    ? '提供从电路板丝印到包装说明书的完整品牌化交付方案。'
                    : 'Complete branding delivery from PCB silkscreen to packaging and documentation.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {isZh ? '需要定制接收模组方案？' : 'Need a Custom Receiver Solution?'}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {isZh
                ? 'CANI 提供从模组到整机的一站式开发支持，联系我们获取专属技术方案。'
                : 'CANI provides end-to-end development support from modules to complete systems. Contact us for a tailored solution.'}
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">{isZh ? '联系我们' : 'Contact Us'}</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/products/accessories/vtx-vrx">{isZh ? '返回产品列表' : 'Back to Products'}</Link>
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

export default VrxDetail;
