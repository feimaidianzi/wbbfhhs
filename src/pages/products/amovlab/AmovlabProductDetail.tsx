import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  ShoppingCart,
  CheckCircle,
  Star,
} from "lucide-react";
import { amovlabCategories, AmovlabProduct } from "@/data/amovlabProducts";
import { SEO } from "@/components/SEO";

const AmovlabProductDetail = () => {
  const { categoryId, productId } = useParams<{
    categoryId: string;
    productId: string;
  }>();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isEn = language === "en";

  const category = amovlabCategories.find((c) => c.id === categoryId);
  const product = category?.products.find((p) => p.id === productId);

  if (!product || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {isEn ? "Product Not Found" : "产品未找到"}
          </h1>
          <Button onClick={() => navigate("/products/amovlab")}>
            {isEn ? "Back to Products" : "返回产品中心"}
          </Button>
        </div>
      </div>
    );
  }

  const specs = isEn && product.specsEn ? product.specsEn : product.specs;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${isEn ? product.nameEn : product.name} - ${isEn ? "Amovlab" : "阿木实验室"}`}
        description={isEn ? product.descriptionEn : product.description}
        image={product.image}
      />

      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0"
              onClick={() => navigate("/products/amovlab")}
            >
              {isEn ? "Amovlab Products" : "阿木产品中心"}
            </Button>
            <span>/</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0"
              onClick={() => navigate(`/products/amovlab/${categoryId}`)}
            >
              {isEn ? category.nameEn : category.name}
            </Button>
            <span>/</span>
            <span className="text-foreground">
              {isEn ? product.nameEn : product.name}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate(`/products/amovlab/${categoryId}`)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {isEn ? `Back to ${category.nameEn}` : `返回${category.name}`}
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={isEn ? product.nameEn : product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.gallery.slice(0, 4).map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer hover:ring-2 ring-primary transition-all"
                    >
                      <img
                        src={img}
                        alt={`${isEn ? product.nameEn : product.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-3">
                  {isEn ? category.nameEn : category.name}
                </Badge>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {isEn ? product.nameEn : product.name}
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                  {isEn ? product.descriptionEn : product.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">
                  {isEn ? "Highlights" : "产品亮点"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(isEn ? product.highlightsEn : product.highlights).map(
                    (highlight, idx) => (
                      <Badge key={idx} className="bg-primary/10 text-primary">
                        <Star className="h-3 w-3 mr-1" />
                        {highlight}
                      </Badge>
                    )
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">
                  {isEn ? "Key Features" : "核心特点"}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {(isEn ? product.featuresEn : product.features).map(
                    (feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                {product.documentUrl && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(product.documentUrl, "_blank")}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {isEn ? "Documentation" : "查看文档"}
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Button>
                )}
                {product.taobaoUrl && (
                  <Button
                    onClick={() => window.open(product.taobaoUrl, "_blank")}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {isEn ? "Buy on Taobao" : "淘宝购买"}
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Button>
                )}
                {product.jdUrl && (
                  <Button
                    variant="secondary"
                    onClick={() => window.open(product.jdUrl, "_blank")}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {isEn ? "Buy on JD" : "京东购买"}
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {isEn ? "Technical Specifications" : "技术参数"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(specs).map(([key, value], idx) => (
                  <div
                    key={idx}
                    className={`flex justify-between py-3 px-4 rounded-lg ${
                      idx % 2 === 0 ? "bg-muted/50" : ""
                    }`}
                  >
                    <span className="font-medium text-foreground">{key}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Products */}
      {category.products.length > 1 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {isEn ? "Related Products" : "相关产品"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {category.products
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Card
                    key={relatedProduct.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() =>
                      navigate(
                        `/products/amovlab/${categoryId}/${relatedProduct.id}`
                      )
                    }
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedProduct.image}
                        alt={
                          isEn ? relatedProduct.nameEn : relatedProduct.name
                        }
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-3">
                      <h4 className="font-medium text-sm line-clamp-2">
                        {isEn ? relatedProduct.nameEn : relatedProduct.name}
                      </h4>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AmovlabProductDetail;
