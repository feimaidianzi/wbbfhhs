import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Radio, Zap, Settings, Shield, Thermometer, Cpu } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import vtx2w5 from "@/assets/vtx/vtx-2.5w.png";
import vtx3w from "@/assets/vtx/vtx-3w.png";
import vtx10w from "@/assets/vtx/vtx-10w.png";
import vtx16w from "@/assets/vtx/vtx-16w.png";
import vtx25w from "@/assets/vtx/vtx-25w.png";
import vtx37w from "@/assets/vtx/vtx-37w.png";

// 4.9GHz-6.1GHz 产品系列
const products49to61 = [
  {
    id: "flym-pv02w500-a1",
    model: "FLYM-PV02W500-A1",
    name: "2.5W 视频发射器",
    power: "2.5W",
    frequency: "4.9-6.1GHz",
    channels: 80,
    image: vtx2w5,
    specs: {
      inputVoltage: "12-28V (推荐6S电池)",
      outputVoltage: "5V",
      powerLevels: "25mW/2.5W",
      mountingSize: "30.5×30.5mm",
      antennaInterface: "MMCX",
      consumption: "12V@800mA 或 28V@300mA",
      features: "内置散热风扇 & 散热器",
      microphone: "不支持",
      cableInterface: "JST 6针",
      weight: "23g",
      size: "36×36×8mm"
    },
    highlights: [
      "采用高性能射频PCB材料（罗杰斯4350B）",
      "优良的散热设计",
      "支持80频道，4.8~6.1GHz",
      "支持SA协议与PIT模式",
      "高强度CNC铝合金外壳",
      "轻量化设计，仅23g"
    ]
  },
  {
    id: "flym-pv03w000-a1",
    model: "FLYM-PV03W000-A1",
    name: "3W 视频发射器",
    power: "3W",
    frequency: "4.9-6.1GHz",
    channels: 80,
    image: vtx3w,
    specs: {
      inputVoltage: "12-28V (推荐6S电池)",
      outputVoltage: "5V",
      powerLevels: "25mW/3W",
      mountingSize: "30.5×30.5mm",
      antennaInterface: "MMCX",
      consumption: "12V@800mA 或 28V@300mA",
      features: "内置散热风扇 & 散热器",
      microphone: "不支持",
      cableInterface: "JST 6针",
      weight: "23g",
      size: "36×36×8mm"
    },
    highlights: [
      "采用高性能射频PCB材料（罗杰斯4350B）",
      "优良的散热设计",
      "支持80频道，4.8~6.1GHz",
      "支持SA协议与PIT模式",
      "高强度CNC铝合金外壳",
      "轻量化设计，仅23g"
    ]
  },
  {
    id: "fv10w-a1",
    model: "FV10W-A1",
    name: "10W 视频发射器",
    power: "10W",
    frequency: "4.9-6.1GHz",
    channels: 80,
    image: vtx10w,
    specs: {
      inputVoltage: "12-28V (推荐6S电池)",
      outputVoltage: "5V",
      powerLevels: "1W/3W/5W/7W/10W",
      mountingSize: "30.5×30.5mm",
      antennaInterface: "SMA",
      consumption: "12V/2.8A 或 28V/1.1A",
      features: "智能音频/内置散热风扇 & 散热器",
      microphone: "内置",
      cableInterface: "JST 8针（双输入双接地）",
      weight: "47g",
      size: "68×36×15mm"
    },
    highlights: [
      "5档功率可调 (1W/3W/5W/7W/10W)",
      "内置散热风扇与麦克风",
      "所有元件均置于散热器保护下",
      "4个安装孔位，便于固定",
      "支持Betaflight软件控制",
      "5秒缓启动保护功能"
    ]
  },
  {
    id: "fv16w-a1",
    model: "FV16W-A1",
    name: "16W 视频发射器",
    power: "16W",
    frequency: "4.9-6.1GHz",
    channels: 80,
    image: vtx16w,
    specs: {
      inputVoltage: "12-28V (推荐6S电池)",
      outputVoltage: "5V",
      powerLevels: "16W (可定制)",
      mountingSize: "30.5×30.5mm",
      antennaInterface: "SMA",
      consumption: "12V-28V",
      features: "智能音频/内置散热风扇 & 散热器",
      microphone: "内置",
      cableInterface: "JST 8针（双输入双接地）",
      weight: "47g",
      size: "68×36×15mm"
    },
    highlights: [
      "16W大功率输出",
      "内置散热风扇与麦克风",
      "所有元件均置于散热器保护下",
      "4个安装孔位，便于固定",
      "功率档位可定制",
      "支持Betaflight软件控制"
    ]
  },
  {
    id: "fv25w-a1",
    model: "FV25W-A1",
    name: "25W 视频发射器",
    power: "25W",
    frequency: "4.9-6.1GHz",
    channels: 80,
    image: vtx25w,
    specs: {
      inputVoltage: "24-28V (推荐6S电池)",
      outputVoltage: "5V",
      powerLevels: "25W (可定制)",
      mountingSize: "30.5×30.5mm",
      antennaInterface: "SMA",
      consumption: "24V-28V",
      features: "智能音频/内置散热风扇 & 散热器",
      microphone: "内置",
      cableInterface: "JST 8针（双输入双接地）",
      weight: "47g",
      size: "68×36×15mm"
    },
    highlights: [
      "25W大功率输出，远距离传输",
      "内置散热风扇与麦克风",
      "所有元件均置于散热器保护下",
      "4个安装孔位，便于固定",
      "功率档位可定制",
      "支持Betaflight软件控制"
    ]
  },
  {
    id: "fv37w-a1",
    model: "FV37W-A1",
    name: "37W 视频发射器",
    power: "37W",
    frequency: "4.9-6.1GHz",
    channels: 80,
    image: vtx37w,
    specs: {
      inputVoltage: "24-28V (推荐6S电池)",
      outputVoltage: "5V",
      powerLevels: "37W (可定制)",
      mountingSize: "30.5×30.5mm",
      antennaInterface: "SMA",
      consumption: "24V-28V",
      features: "智能音频/内置散热风扇 & 散热器",
      microphone: "内置",
      cableInterface: "JST 8针（双输入双接地）",
      weight: "47g",
      size: "68×36×15mm"
    },
    highlights: [
      "37W超大功率，极限远距离传输",
      "内置散热风扇与麦克风",
      "所有元件均置于散热器保护下",
      "4个安装孔位，便于固定",
      "功率档位可定制",
      "支持Betaflight软件控制"
    ]
  }
];

// 6.1GHz-7.2GHz 产品系列 (暂无详细资料，显示占位)
const products61to72 = [
  {
    id: "fv10w-72",
    model: "FV10W-7.2",
    name: "10W 视频发射器 (7.2GHz)",
    power: "10W",
    frequency: "6.1-7.2GHz",
    channels: 64,
    image: vtx10w,
    specs: {
      inputVoltage: "12-28V (推荐6S电池)",
      outputVoltage: "5V",
      powerLevels: "1W/3W/5W/7W/10W",
      mountingSize: "30.5×30.5mm",
      antennaInterface: "SMA",
      consumption: "12V/2.8A 或 28V/1.1A",
      features: "智能音频/内置散热风扇 & 散热器",
      microphone: "内置",
      cableInterface: "JST 8针（双输入双接地）",
      weight: "47g",
      size: "68×36×15mm"
    },
    highlights: [
      "7.2GHz高频段，规避干扰",
      "64频道可选",
      "5档功率可调 (1W/3W/5W/7W/10W)",
      "内置散热风扇与麦克风",
      "所有元件均置于散热器保护下",
      "支持Betaflight软件控制"
    ]
  }
];

const frequencyTable49to61 = [
  { band: "Band A", ch1: 5865, ch2: 5845, ch3: 5825, ch4: 5805, ch5: 5785, ch6: 5765, ch7: 5745, ch8: 5725 },
  { band: "Band b", ch1: 5733, ch2: 5752, ch3: 5771, ch4: 5790, ch5: 5809, ch6: 5828, ch7: 5847, ch8: 5866 },
  { band: "Band E", ch1: 5705, ch2: 5685, ch3: 5665, ch4: 5645, ch5: 5885, ch6: 5905, ch7: 5925, ch8: 5945 },
  { band: "Band F", ch1: 5740, ch2: 5760, ch3: 5780, ch4: 5800, ch5: 5820, ch6: 5840, ch7: 5860, ch8: 5880 },
  { band: "Band r", ch1: 5658, ch2: 5695, ch3: 5732, ch4: 5769, ch5: 5806, ch6: 5843, ch7: 5880, ch8: 5917 },
  { band: "Band P", ch1: 5653, ch2: 5693, ch3: 5733, ch4: 5773, ch5: 5813, ch6: 5853, ch7: 5893, ch8: 5933 },
  { band: "Band L", ch1: 5333, ch2: 5373, ch3: 5413, ch4: 5453, ch5: 5493, ch6: 5533, ch7: 5573, ch8: 5613 },
  { band: "Band U", ch1: 5325, ch2: 5348, ch3: 5366, ch4: 5384, ch5: 5402, ch6: 5420, ch7: 5438, ch8: 5456 },
  { band: "Band O", ch1: 5474, ch2: 5492, ch3: 5510, ch4: 5528, ch5: 5546, ch6: 5564, ch7: 5582, ch8: 5600 },
  { band: "Band X", ch1: 4990, ch2: 5020, ch3: 5050, ch4: 5080, ch5: 5110, ch6: 5140, ch7: 5170, ch8: 5200 }
];

const frequencyTable61to72 = [
  { band: "Band A", ch1: 6110, ch2: 6130, ch3: 6150, ch4: 6170, ch5: 6190, ch6: 6210, ch7: 6230, ch8: 6250 },
  { band: "Band B", ch1: 6270, ch2: 6290, ch3: 6310, ch4: 6330, ch5: 6350, ch6: 6370, ch7: 6390, ch8: 6410 },
  { band: "Band E", ch1: 6430, ch2: 6450, ch3: 6470, ch4: 6490, ch5: 6510, ch6: 6530, ch7: 6550, ch8: 6570 },
  { band: "Band F", ch1: 6590, ch2: 6610, ch3: 6630, ch4: 6650, ch5: 6670, ch6: 6690, ch7: 6710, ch8: 6730 },
  { band: "Band R", ch1: 6750, ch2: 6770, ch3: 6790, ch4: 6810, ch5: 6830, ch6: 6850, ch7: 6870, ch8: 6890 },
  { band: "Band P", ch1: 6910, ch2: 6930, ch3: 6950, ch4: 6970, ch5: 6990, ch6: 7010, ch7: 7030, ch8: 7050 },
  { band: "Band H", ch1: 7070, ch2: 7090, ch3: 7110, ch4: 7130, ch5: 7150, ch6: 7170, ch7: 7190, ch8: 7210 },
  { band: "Band U", ch1: 6115, ch2: 6265, ch3: 6425, ch4: 6585, ch5: 6745, ch6: 6905, ch7: 7065, ch8: 7185 }
];

const features = [
  {
    icon: Radio,
    title: "高性能射频",
    description: "采用罗杰斯4350B高性能射频PCB材料，确保优秀的射频性能"
  },
  {
    icon: Zap,
    title: "大功率输出",
    description: "多档功率可调，最高37W输出，远距离高清图传"
  },
  {
    icon: Thermometer,
    title: "优异散热",
    description: "内置散热风扇与散热器，CNC铝合金外壳，严酷环境下稳定工作"
  },
  {
    icon: Settings,
    title: "灵活配置",
    description: "支持80频道，任意频点及频率组合定制（step 1MHz）"
  },
  {
    icon: Shield,
    title: "安全保护",
    description: "5秒缓启动功能，避免瞬时最大功率烧毁设备"
  },
  {
    icon: Cpu,
    title: "智能控制",
    description: "支持SA协议与Betaflight软件控制，支持PIT模式"
  }
];

const ProductCard = ({ product }: { product: typeof products49to61[0] }) => (
  <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 group">
    <div className="aspect-video bg-muted/30 p-4 flex items-center justify-center">
      <img 
        src={product.image} 
        alt={product.name}
        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">{product.power}</span>
        <span className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">{product.channels}CH</span>
      </div>
      <h3 className="text-xl font-bold mb-1">{product.name}</h3>
      <p className="text-sm text-muted-foreground mb-4">{product.model}</p>
      
      <div className="space-y-3">
        <h4 className="font-semibold text-sm text-muted-foreground">产品亮点</h4>
        <ul className="space-y-1">
          {product.highlights.slice(0, 4).map((highlight, idx) => (
            <li key={idx} className="text-sm flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="font-semibold text-sm text-muted-foreground mb-3">技术规格</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">输入电压：</span>
            <span>{product.specs.inputVoltage.split(' ')[0]}</span>
          </div>
          <div>
            <span className="text-muted-foreground">天线接口：</span>
            <span>{product.specs.antennaInterface}</span>
          </div>
          <div>
            <span className="text-muted-foreground">重量：</span>
            <span>{product.specs.weight}</span>
          </div>
          <div>
            <span className="text-muted-foreground">尺寸：</span>
            <span>{product.specs.size}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FrequencyTable = ({ data }: { data: typeof frequencyTable49to61 }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-muted/50">
          <th className="px-4 py-3 text-left font-semibold">频段</th>
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
        {data.map((row, idx) => (
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
);

const VTX = () => {
  return (
    <>
      <SEO 
        title="VTX视频发射器 - 飞迈科技"
        description="飞迈科技VTX视频发射器系列，提供4.9-6.1GHz和6.1-7.2GHz两大频段，功率从2.5W到37W全覆盖，专业FPV图传解决方案"
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4">
            <Link to="/products/accessories" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
              <ArrowLeft className="w-4 h-4" />
              返回配件列表
            </Link>
            
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                VTX视频发射器
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                高性能FPV视频发射器系列，采用罗杰斯4350B高性能射频材料，提供从2.5W到37W多档功率选择，
                支持4.9-6.1GHz和6.1-7.2GHz两大频段，满足各类远距离高清图传需求。
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/contact">获取报价</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#products">查看产品</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">产品特色</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4 p-6 bg-card rounded-xl border border-border">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">产品系列</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              根据频段分类，我们提供两大产品线，满足不同应用场景需求
            </p>

            <Tabs defaultValue="49-61" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="49-61" className="text-sm">4.9GHz - 6.1GHz</TabsTrigger>
                <TabsTrigger value="61-72" className="text-sm">6.1GHz - 7.2GHz</TabsTrigger>
              </TabsList>

              <TabsContent value="49-61">
                <div className="mb-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h3 className="font-semibold text-lg mb-2">4.9GHz - 6.1GHz 频段</h3>
                  <p className="text-sm text-muted-foreground">
                    传统5.8GHz频段产品线，80频道支持，兼容主流FPV设备，适用于竞速、穿越、航拍等多种场景。
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products49to61.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Frequency Table */}
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">频段与频道频率表 (MHz)</h3>
                  <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <FrequencyTable data={frequencyTable49to61} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="61-72">
                <div className="mb-8 p-4 bg-secondary/50 rounded-lg border border-secondary">
                  <h3 className="font-semibold text-lg mb-2">6.1GHz - 7.2GHz 频段</h3>
                  <p className="text-sm text-muted-foreground">
                    高频段产品线，有效规避传统5.8GHz频段干扰，64频道配置，适用于专业级长距离图传应用。
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products61to72.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-muted/50 rounded-xl text-center">
                  <p className="text-muted-foreground">更多6.1-7.2GHz频段产品即将上线，敬请期待...</p>
                  <Button variant="outline" className="mt-4" asChild>
                    <Link to="/contact">联系我们了解更多</Link>
                  </Button>
                </div>

                {/* Frequency Table */}
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">频段与频道频率表 (MHz)</h3>
                  <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <FrequencyTable data={frequencyTable61to72} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Usage Notes */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">使用注意事项</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="p-4 bg-card rounded-lg border border-border">
                <h4 className="font-semibold mb-2">⚡ 电源连接要求</h4>
                <p className="text-sm text-muted-foreground">
                  必须严格按照焊盘位置焊接双12-28V电源输入线及双接地线，禁止仅焊接单根线，确保设备电源传输稳定。
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border">
                <h4 className="font-semibold mb-2">📡 天线安装要求</h4>
                <p className="text-sm text-muted-foreground">
                  通电前务必完成天线接口与天线的安装，避免因未安装天线导致设备故障或性能下降。
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border">
                <h4 className="font-semibold mb-2">🌡️ 散热器禁止拆卸</h4>
                <p className="text-sm text-muted-foreground">
                  设备散热器对散热至关重要，禁止擅自拆卸，以防过热损坏设备。
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border">
                <h4 className="font-semibold mb-2">📍 安装位置建议</h4>
                <p className="text-sm text-muted-foreground">
                  为达到最佳散热效果，请将视频发射器（VTX）安装在无人机框架最顶部，确保空气流通。
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border">
                <h4 className="font-semibold mb-2">🔋 PIT模式操作</h4>
                <p className="text-sm text-muted-foreground">
                  通过Betaflight地面站软件可便捷进入/退出PIT模式；长按设备按钮15秒也可退出PIT模式；若未主动退出，下次通电时设备仍保持PIT模式。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">需要定制化解决方案？</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              我们支持任意频点及频率组合定制（step 1MHz），功率档位定制，满足您的特殊需求。
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">联系我们</Link>
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

export default VTX;
