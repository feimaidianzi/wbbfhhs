import { useParams, useNavigate, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, FileText, ShoppingCart } from "lucide-react";
import { amovlabCategories, AmovlabProduct } from "@/data/amovlabProducts";
import { SEO } from "@/components/SEO";

const AmovlabCategoryList = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isEn = language === "en";

  const category = amovlabCategories.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {isEn ? "Category Not Found" : "分类未找到"}
          </h1>
          <Button onClick={() => navigate("/products/amovlab")}>
            {isEn ? "Back to Products" : "返回产品中心"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${isEn ? category.nameEn : category.name} - ${isEn ? "Amovlab Products" : "阿木实验室产品"}`}
        description={isEn ? category.descriptionEn : category.description}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate("/products/amovlab")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {isEn ? "Back to Amovlab Products" : "返回阿木产品中心"}
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {isEn ? category.nameEn : category.name}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {isEn ? category.descriptionEn : category.description}
          </p>
          <div className="mt-4">
            <Badge variant="secondary" className="text-sm">
              {category.products.length} {isEn ? "Products" : "个产品"}
            </Badge>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.products.map((product) => (
              <ProductCard key={product.id} product={product} isEn={isEn} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ProductCard = ({
  product,
  isEn,
}: {
  product: AmovlabProduct;
  isEn: boolean;
}) => {
  return (
    <Link to={`/products/amovlab/${product.category}/${product.id}`}>
      <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
        <div className="aspect-video relative overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={isEn ? product.nameEn : product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <CardContent className="p-5">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {isEn ? product.nameEn : product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {isEn ? product.descriptionEn : product.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {(isEn ? product.featuresEn : product.features)
              .slice(0, 3)
              .map((feature, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-2 pt-3 border-t border-border">
            {product.documentUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(product.documentUrl, "_blank");
                }}
              >
                <FileText className="h-3 w-3 mr-1" />
                {isEn ? "Docs" : "文档"}
              </Button>
            )}
            {product.taobaoUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(product.taobaoUrl, "_blank");
                }}
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                {isEn ? "Buy" : "购买"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AmovlabCategoryList;
