import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Cpu } from "lucide-react";
import { carrierBoardProducts } from "@/data/changling/carrierBoards";
import { SEO } from "@/components/SEO";

const CarrierBoards = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isEn = language === "en";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={isEn ? "Carrier Boards - CANI Technology" : "扩展板卡 - 长凌科技"}
        description={
          isEn
            ? "Explore CANI Technology's Jetson carrier boards for UAV and robotics applications. High-quality expansion boards for Orin NX, Xavier NX, and Nano modules."
            : "探索长凌科技的Jetson扩展载板产品，适用于无人机和机器人应用。提供Orin NX、Xavier NX、Nano等模块的扩展板卡。"
        }
      />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-primary to-blue-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <Button
            variant="ghost"
            className="mb-6 text-white/80 hover:text-white hover:bg-white/10"
            onClick={() => navigate("/products")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {isEn ? "Back to Products" : "返回产品中心"}
          </Button>

          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              {isEn ? "Expansion Hardware" : "扩展硬件"}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isEn ? "Carrier Boards" : "扩展板卡"}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {isEn
                ? "High-quality expansion carrier boards designed for Jetson computing modules. Perfect for UAV onboard computing and robotics applications."
                : "专为Jetson计算模块设计的高品质扩展载板。适用于无人机机载计算和机器人应用。"}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-2xl font-bold">{carrierBoardProducts.length}</div>
                <div className="text-sm text-white/70">{isEn ? "Products" : "款产品"}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-2xl font-bold">Jetson</div>
                <div className="text-sm text-white/70">{isEn ? "Compatible" : "兼容"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {carrierBoardProducts.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={isEn ? product.nameEn : product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Cpu className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {isEn ? product.nameEn : product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {isEn ? product.descriptionEn : product.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {(isEn ? product.featuresEn : product.features).slice(0, 3).map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(isEn ? (product.specsEn || product.specs) : product.specs)
                        .slice(0, 4)
                        .map(([key, value]) => (
                          <div key={key} className="flex flex-col">
                            <span className="text-muted-foreground">{key}</span>
                            <span className="font-medium text-foreground">{value}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {isEn ? "Need Custom Carrier Board?" : "需要定制载板？"}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            {isEn
              ? "Contact us for custom carrier board design and development services."
              : "联系我们获取定制载板设计和开发服务。"}
          </p>
          <Button size="lg" onClick={() => navigate("/contact")}>
            {isEn ? "Contact Us" : "联系我们"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CarrierBoards;
