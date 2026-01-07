import { useParams, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, AlertTriangle, Settings, Radio } from "lucide-react";
import { getProductById } from "@/data/vtxProducts";

const VtxDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getProductById(productId) : null;

  if (!product) {
    return <Navigate to="/products/accessories/vtx-vrx" replace />;
  }

  return (
    <>
      <SEO 
        title={`${product.name} ${product.model} - 飞迈科技`}
        description={`${product.name}，${product.frequency}频段，${product.channels}频道，${product.power}输出功率，专业FPV视频发射器`}
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <section className="pt-8 pb-4 bg-muted/30">
          <div className="container mx-auto px-4">
            <Link to="/products/accessories/vtx-vrx" className="inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft className="w-4 h-4" />
              返回VTX/VRX产品列表
            </Link>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Product Image */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full max-w-md mx-auto object-contain"
                />
              </div>

              {/* Product Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">{product.power}</span>
                  <span className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full">{product.channels}CH</span>
                  <span className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full">{product.frequency}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
                <p className="text-xl text-muted-foreground mb-6">{product.model}</p>
                
                {/* Highlights */}
                <div className="space-y-2 mb-8">
                  {product.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button size="lg" asChild>
                    <Link to="/contact">获取报价</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#specs">查看规格</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Features Description */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">产品特色</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.description.map((desc, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                  <Radio className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section id="specs" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">技术参数</h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50 w-1/3">型号</td>
                    <td className="px-6 py-4">{product.model}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">输入电压</td>
                    <td className="px-6 py-4">{product.specs.inputVoltage}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">输出电压</td>
                    <td className="px-6 py-4">{product.specs.outputVoltage}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">频道数量</td>
                    <td className="px-6 py-4">{product.channels}CH</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">功率档位</td>
                    <td className="px-6 py-4">{product.specs.powerLevels}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">安装孔位尺寸</td>
                    <td className="px-6 py-4">{product.specs.mountingSize}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">天线接口</td>
                    <td className="px-6 py-4">{product.specs.antennaInterface}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">功耗</td>
                    <td className="px-6 py-4">{product.specs.consumption}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">附加功能</td>
                    <td className="px-6 py-4">{product.specs.features}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">麦克风</td>
                    <td className="px-6 py-4">{product.specs.microphone}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">线缆接口</td>
                    <td className="px-6 py-4">{product.specs.cableInterface}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-medium bg-muted/50">重量</td>
                    <td className="px-6 py-4">{product.specs.weight}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium bg-muted/50">尺寸</td>
                    <td className="px-6 py-4">{product.specs.size}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Operation Guide */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">操作说明</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">频段选择</h3>
                <p className="text-sm text-muted-foreground">{product.operationGuide.bandSelection}</p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Radio className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">频道选择</h3>
                <p className="text-sm text-muted-foreground">{product.operationGuide.channelSelection}</p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">功率选择</h3>
                <p className="text-sm text-muted-foreground">{product.operationGuide.powerSelection}</p>
              </div>
            </div>

            {/* Power Levels Table */}
            {product.operationGuide.powerLevelsTable && (
              <div className="mt-8">
                <h3 className="font-semibold mb-4">功率档位对照表</h3>
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-6 py-3 text-left font-semibold">档位</th>
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
                  设置完成后，LED将依次显示"频段→频道→功率"。注意：显示功率时，LED会快速闪烁对应数字2次。
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Frequency Table */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">频段与频道频率表 (MHz)</h2>
            <div className="bg-card rounded-xl border border-border overflow-x-auto">
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
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">注意事项</h2>
            <div className="space-y-4">
              {product.notes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{note}</span>
                </div>
              ))}
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
              <Button size="lg" variant="outline" className="border-primary-foreground/30 hover:bg-primary-foreground/10" asChild>
                <Link to="/products/accessories/vtx-vrx">查看更多产品</Link>
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
