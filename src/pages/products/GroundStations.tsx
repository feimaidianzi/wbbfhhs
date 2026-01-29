import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Monitor } from "lucide-react";
import { groundStationProducts } from "@/data/changling/groundStations";
import { SEO } from "@/components/SEO";

const GroundStations = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isEn = language === "en";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={isEn ? "Ground Control Stations - CANI Technology" : "地面站 - 长凌科技"}
        description={
          isEn
            ? "Professional UAV ground control stations by CANI Technology. Integrated display, controller, and video receiver for multi-UAV management."
            : "长凌科技专业无人机地面站产品。集成显示器、遥控器和图传接收，支持多机管理和任务规划。"
        }
      />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-primary to-teal-600 text-white py-20">
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
              {isEn ? "Ground Control" : "地面控制"}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isEn ? "Ground Control Stations" : "地面站"}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {isEn
                ? "Professional UAV ground control stations with integrated display, controller, and video receiver. Designed for efficient multi-UAV management and mission planning."
                : "专业级无人机地面站，集成显示器、遥控器和图传接收。为高效多机管理和任务规划而设计。"}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-2xl font-bold">{groundStationProducts.length}</div>
                <div className="text-sm text-white/70">{isEn ? "Products" : "款产品"}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-2xl font-bold">{isEn ? "Pro" : "专业"}</div>
                <div className="text-sm text-white/70">{isEn ? "Grade" : "级别"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {groundStationProducts.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300"
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
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Monitor className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {isEn ? product.nameEn : product.name}
                      </h3>
                      <p className="text-muted-foreground mt-2">
                        {isEn ? product.descriptionEn : product.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {(isEn ? product.featuresEn : product.features).map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-foreground mb-3">
                      {isEn ? "Specifications" : "规格参数"}
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {Object.entries(isEn ? (product.specsEn || product.specs) : product.specs).map(
                        ([key, value]) => (
                          <div key={key} className="flex flex-col">
                            <span className="text-muted-foreground text-xs">{key}</span>
                            <span className="font-medium text-foreground">{value}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {product.documentUrl && (
                    <div className="mt-4 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(product.documentUrl, "_blank")}
                      >
                        {isEn ? "Documentation" : "查看文档"}
                      </Button>
                      {product.purchaseUrl && (
                        <Button
                          size="sm"
                          onClick={() => window.open(product.purchaseUrl, "_blank")}
                        >
                          {isEn ? "Purchase" : "立即购买"}
                        </Button>
                      )}
                    </div>
                  )}
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
            {isEn ? "Need Custom Ground Station?" : "需要定制地面站？"}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            {isEn
              ? "Contact us for custom ground station solutions tailored to your specific needs."
              : "联系我们获取满足您特定需求的定制地面站解决方案。"}
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

export default GroundStations;
