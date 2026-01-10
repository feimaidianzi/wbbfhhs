import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Radio, Zap, Settings, Shield, Thermometer, Cpu, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProducts49to61, getProducts61to72, frequencyTable49to61, frequencyTable61to72, VtxProduct } from "@/data/vtxProducts";
const features = [{
  icon: Radio,
  title: "高性能射频",
  description: "采用罗杰斯4350B高性能射频PCB材料，确保优秀的射频性能"
}, {
  icon: Zap,
  title: "大功率输出",
  description: "多档功率可调，最高37W输出，远距离高清图传"
}, {
  icon: Thermometer,
  title: "优异散热",
  description: "内置散热风扇与散热器，CNC铝合金外壳，严酷环境下稳定工作"
}, {
  icon: Settings,
  title: "灵活配置",
  description: "支持80频道，任意频点及频率组合定制（step 1MHz）"
}, {
  icon: Shield,
  title: "安全保护",
  description: "5秒缓启动功能，避免瞬时最大功率烧毁设备"
}, {
  icon: Cpu,
  title: "智能控制",
  description: "支持SA协议与Betaflight软件控制，支持PIT模式"
}];
const ProductCard = ({
  product
}: {
  product: VtxProduct;
}) => <Link to={`/products/accessories/vtx-vrx/${product.id}`} className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 group block">
    <div className="aspect-video bg-muted/30 p-4 flex items-center justify-center">
      <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
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
          {product.highlights.slice(0, 4).map((highlight, idx) => <li key={idx} className="text-sm flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>{highlight}</span>
            </li>)}
        </ul>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="font-semibold text-sm text-muted-foreground mb-3">技术规格</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">输入电压：</span>
            <span>{product.specs.inputVoltage.split('，')[0]}</span>
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

      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-primary">
        <span className="text-sm font-medium">查看详情</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </Link>;
const FrequencyTable = ({
  data
}: {
  data: typeof frequencyTable49to61;
}) => <div className="overflow-x-auto">
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
        {data.map((row, idx) => <tr key={idx} className={idx % 2 === 0 ? "bg-background" : "bg-muted/20"}>
            <td className="px-4 py-2 font-medium">{row.band}</td>
            <td className="px-4 py-2 text-center">{row.ch1}</td>
            <td className="px-4 py-2 text-center">{row.ch2}</td>
            <td className="px-4 py-2 text-center">{row.ch3}</td>
            <td className="px-4 py-2 text-center">{row.ch4}</td>
            <td className="px-4 py-2 text-center">{row.ch5}</td>
            <td className="px-4 py-2 text-center">{row.ch6}</td>
            <td className="px-4 py-2 text-center">{row.ch7}</td>
            <td className="px-4 py-2 text-center">{row.ch8}</td>
          </tr>)}
      </tbody>
    </table>
  </div>;
const VtxVrx = () => {
  const products49to61 = getProducts49to61();
  const products61to72 = getProducts61to72();
  return <>
      <SEO title="VTX/VRX 视频发射器与接收器 - 长凌科技" description="长凌科技VTX视频发射器与VRX接收器系列，提供4.9-6.1GHz和6.1-7.2GHz两大频段，功率从2.5W到37W全覆盖，专业FPV图传解决方案" />
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
                VTX/VRX 图传系统
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                高性能FPV视频发射器（VTX）与接收器（VRX）系列，采用罗杰斯4350B高性能射频材料，提供从2.5W到37W多档功率选择，
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
              {features.map((feature, idx) => <div key={idx} className="flex gap-4 p-6 bg-card rounded-xl border border-border">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>)}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">产品系列</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              根据频段分类，我们提供两大产品线，满足不同应用场景需求。点击产品查看详细规格。
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
                  {products49to61.map(product => <ProductCard key={product.id} product={product} />)}
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
                  {products61to72.map(product => <ProductCard key={product.id} product={product} />)}
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
                <p className="text-sm text-muted-foreground">通过Betaflight地面站软件可便捷进入/退出PIT模式；上电前按住按键可进入PIT模式；重启可退出PIT模式。</p>
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
    </>;
};
export default VtxVrx;