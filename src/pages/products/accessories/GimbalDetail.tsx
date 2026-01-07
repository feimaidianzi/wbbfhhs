import { useParams, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, AlertTriangle, Package, Download, Play, HelpCircle } from "lucide-react";
import { getGimbalProductById } from "@/data/gimbalProducts";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GimbalDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getGimbalProductById(productId) : null;
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return <Navigate to="/products/accessories/gimbal" replace />;
  }

  const images = product.images || [product.image];

  return (
    <>
      <SEO 
        title={`${product.name} - 飞迈科技`}
        description={`${product.name}，${product.category}，${product.highlights.slice(0, 3).join('，')}，专业无人机吊舱产品`}
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <section className="pt-8 pb-4 bg-muted/30">
          <div className="container mx-auto px-4">
            <Link to="/products/accessories/gimbal" className="inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft className="w-4 h-4" />
              返回吊舱系列
            </Link>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="bg-card rounded-2xl p-8 border border-border aspect-square flex items-center justify-center">
                  <img 
                    src={images[selectedImage]} 
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                          selectedImage === idx ? 'border-primary' : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">{product.category}</span>
                  <span className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full">{product.price}</span>
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

        {/* Tabs Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-8">
                <TabsTrigger 
                  value="specs" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  技术参数
                </TabsTrigger>
                <TabsTrigger 
                  value="features" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  产品特色
                </TabsTrigger>
                <TabsTrigger 
                  value="applications" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  应用场景
                </TabsTrigger>
                {product.downloads && product.downloads.length > 0 && (
                  <TabsTrigger 
                    value="downloads" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  >
                    资料下载
                  </TabsTrigger>
                )}
                <TabsTrigger 
                  value="faq" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  常见问题
                </TabsTrigger>
              </TabsList>

              {/* Specs Tab */}
              <TabsContent value="specs" id="specs">
                <div className="space-y-6">
                  {/* Group specs by category */}
                  {(() => {
                    const categories = [...new Set(product.specs.map(s => s.category).filter(Boolean))];
                    if (categories.length > 0) {
                      return categories.map((category) => {
                        const categorySpecs = product.specs.filter(s => s.category === category);
                        return (
                          <div key={category} className="bg-card rounded-xl border border-border overflow-hidden">
                            <div className="px-6 py-3 bg-muted/50 border-b border-border">
                              <h4 className="font-semibold">{category}</h4>
                            </div>
                            <table className="w-full">
                              <tbody>
                                {categorySpecs.map((spec, idx) => (
                                  <tr key={idx} className="border-b border-border last:border-b-0">
                                    <td className="px-6 py-4 font-medium bg-muted/30 w-1/3">{spec.label}</td>
                                    <td className="px-6 py-4">{spec.value}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      });
                    }
                    // Fallback for specs without categories
                    return (
                      <div className="bg-card rounded-xl border border-border overflow-hidden">
                        <table className="w-full">
                          <tbody>
                            {product.specs.map((spec, idx) => (
                              <tr key={idx} className="border-b border-border last:border-b-0">
                                <td className="px-6 py-4 font-medium bg-muted/30 w-1/3">{spec.label}</td>
                                <td className="px-6 py-4">{spec.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  })()}
                </div>
              </TabsContent>

              {/* Features Tab */}
              <TabsContent value="features">
                <div className="space-y-8">
                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">产品描述</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.description.map((desc, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                          <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features List */}
                  {product.features && product.features.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">功能特点</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {product.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                            <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Package Includes */}
                  {product.packageIncludes && product.packageIncludes.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5 text-primary" />
                        包装清单
                      </h3>
                      <div className="bg-card rounded-xl border border-border p-6">
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {product.packageIncludes.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {product.notes && product.notes.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">注意事项</h3>
                      <div className="space-y-3">
                        {product.notes.map((note, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Applications Tab */}
              <TabsContent value="applications">
                {product.applications && product.applications.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.applications.map((app, idx) => (
                      <div key={idx} className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">
                            {idx + 1}
                          </div>
                          <div>
                            <p className="text-foreground">{app}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>暂无应用场景数据</p>
                  </div>
                )}
              </TabsContent>

              {/* Downloads Tab */}
              <TabsContent value="downloads">
                {product.downloads && product.downloads.length > 0 ? (
                  <div className="space-y-6">
                    {/* Group downloads by category */}
                    {['软件', '文档', '图纸'].map((category) => {
                      const categoryFiles = product.downloads?.filter(f => f.category === category) || [];
                      if (categoryFiles.length === 0) return null;
                      return (
                        <div key={category}>
                          <h4 className="text-lg font-semibold mb-3">{category}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categoryFiles.map((file, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group cursor-pointer"
                              >
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                  <Download className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium group-hover:text-primary transition-colors">{file.name}</p>
                                  <p className="text-sm text-muted-foreground uppercase">{file.type}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Download className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>暂无资料下载</p>
                  </div>
                )}
              </TabsContent>

              {/* FAQ Tab */}
              <TabsContent value="faq">
                <div className="text-center py-12 text-muted-foreground">
                  <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>暂无常见问题数据</p>
                  <p className="text-sm mt-2">如有疑问，请联系我们的技术支持团队</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">需要定制化吊舱解决方案？</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              我们提供OEM/ODM定制服务，可根据您的需求定制传感器配置、接口协议、外观设计等
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">联系我们</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 hover:bg-primary-foreground/10" asChild>
                <Link to="/products/accessories/gimbal">查看更多产品</Link>
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

export default GimbalDetail;
