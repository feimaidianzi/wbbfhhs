import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Truck } from "lucide-react";
import { researchUGVProducts } from "@/data/changling/researchUGV";
import { SEO } from "@/components/SEO";

const ResearchUGV = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isEn = language === "en";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={isEn ? "Research UGV - CANI Technology" : "科研无人车 - 长凌科技"}
        description={
          isEn
            ? "Research-grade unmanned ground vehicles by CANI Technology. ROS-based platforms for autonomous navigation, SLAM, and air-ground coordination research."
            : "长凌科技科研级无人地面车辆。基于ROS系统的平台，支持自主导航、SLAM和空地协同研究。"
        }
      />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-red-500 to-rose-600 text-white py-20">
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
              {isEn ? "Ground Robotics" : "地面机器人"}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isEn ? "Research UGV" : "科研无人车"}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {isEn
                ? "Research-grade unmanned ground vehicles equipped with ROS system and multi-sensor suite. Perfect for autonomous navigation, SLAM, and air-ground coordination research."
                : "科研级无人地面车辆，搭载ROS系统和多传感器套件。适用于自主导航、SLAM和空地协同研究。"}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-2xl font-bold">{researchUGVProducts.length}</div>
                <div className="text-sm text-white/70">{isEn ? "Products" : "款产品"}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-2xl font-bold">ROS</div>
                <div className="text-sm text-white/70">{isEn ? "Based" : "系统"}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-2xl font-bold">20kg</div>
                <div className="text-sm text-white/70">{isEn ? "Payload" : "载荷"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {researchUGVProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Gallery */}
                <div className="space-y-4 p-6 bg-muted/30">
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                    <img
                      src={product.image}
                      alt={isEn ? product.nameEn : product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {product.gallery.slice(0, 3).map((img, idx) => (
                      <div key={idx} className="aspect-video overflow-hidden rounded-lg bg-muted">
                        <img
                          src={img}
                          alt={`${product.name} ${idx + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Truck className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {isEn ? product.nameEn : product.name}
                      </h2>
                      <p className="text-muted-foreground mt-2">
                        {isEn ? product.descriptionEn : product.description}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      {isEn ? "Key Features" : "核心特点"}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(isEn ? product.featuresEn : product.features).map((feature, idx) => (
                        <Badge key={idx} variant="secondary">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      {isEn ? "Specifications" : "技术规格"}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(isEn ? (product.specsEn || product.specs) : product.specs).map(
                        ([key, value]) => (
                          <div key={key} className="bg-muted/50 rounded-lg p-3">
                            <div className="text-xs text-muted-foreground">{key}</div>
                            <div className="font-medium text-foreground">{value}</div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      {isEn ? "Applications" : "应用场景"}
                    </h3>
                    <ul className="space-y-2">
                      {(isEn ? product.highlightsEn : product.highlights).map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    {product.documentUrl && (
                      <Button
                        variant="outline"
                        onClick={() => window.open(product.documentUrl, "_blank")}
                      >
                        {isEn ? "Documentation" : "查看文档"}
                      </Button>
                    )}
                    {product.purchaseUrl && (
                      <Button onClick={() => window.open(product.purchaseUrl, "_blank")}>
                        {isEn ? "Purchase" : "立即购买"}
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => navigate("/contact")}>
                      {isEn ? "Inquire" : "咨询详情"}
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {isEn ? "Air-Ground Coordination Research?" : "空地协同研究？"}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            {isEn
              ? "Combine our research UGV with UAV platforms for comprehensive air-ground coordination experiments."
              : "将我们的科研无人车与无人机平台结合，进行全面的空地协同实验。"}
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

export default ResearchUGV;
