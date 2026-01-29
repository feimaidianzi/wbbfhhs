import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Plane,
  Rocket,
  Cpu,
  Radio,
  Settings,
  Eye,
  Users,
  Truck,
  Camera,
  Monitor,
  CircuitBoard,
} from "lucide-react";
import { amovlabCategories } from "@/data/amovlabProducts";
import { SEO } from "@/components/SEO";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Plane,
  Rocket,
  Cpu,
  Radio,
  Settings,
  Eye,
  Users,
  Truck,
  Camera,
  Monitor,
  CircuitBoard,
};

const AmovlabProducts = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isEn = language === "en";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={isEn ? "Changling Research Products - Research UAV & Robotics" : "长凌科研产品中心 - 科研无人机与机器人"}
        description={
          isEn
            ? "Explore Changling Technology's comprehensive range of research UAV platforms, onboard computers, flight controllers, and development kits for robotics research."
            : "探索长凌科技全系列科研无人机开发平台、机载计算机、飞控和开发套件，助力机器人科研。"
        }
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-primary to-purple-600 text-white py-20">
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
              {isEn ? "Research Products" : "科研产品"}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isEn ? "Changling Research Products" : "长凌科研产品中心"}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {isEn
                ? "Professional research UAV platforms and robotics development kits. From onboard computers to swarm formation systems, empowering your research with cutting-edge technology."
                : "专业科研无人机开发平台与机器人开发套件。从机载计算机到集群编队系统，以前沿技术赋能您的科研工作。"}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-2xl font-bold">
                  {amovlabCategories.reduce(
                    (sum, cat) => sum + cat.products.length,
                    0
                  )}
                  +
                </div>
                <div className="text-sm text-white/70">
                  {isEn ? "Products" : "款产品"}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-2xl font-bold">
                  {amovlabCategories.length}
                </div>
                <div className="text-sm text-white/70">
                  {isEn ? "Categories" : "个分类"}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-2xl font-bold">ROS</div>
                <div className="text-sm text-white/70">
                  {isEn ? "Compatible" : "兼容"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {isEn ? "Product Categories" : "产品分类"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isEn
                ? "Browse our comprehensive range of research UAV platforms, computing modules, and development kits."
                : "浏览我们全系列的科研无人机平台、计算模块和开发套件。"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amovlabCategories.map((category) => {
              const IconComponent = iconMap[category.icon] || Plane;
              return (
                <Card
                  key={category.id}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  onClick={() => navigate(`/products/amovlab/${category.id}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <IconComponent className="w-7 h-7 text-primary group-hover:text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {isEn ? category.nameEn : category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {isEn ? category.descriptionEn : category.description}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {category.products.length}{" "}
                          {isEn ? "Products" : "款产品"}
                        </Badge>
                      </div>
                    </div>

                    {/* Preview Images */}
                    <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                      {category.products.slice(0, 3).map((product, idx) => (
                        <div
                          key={product.id}
                          className="w-16 h-16 rounded-lg overflow-hidden bg-muted"
                        >
                          <img
                            src={product.image}
                            alt={isEn ? product.nameEn : product.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                      {category.products.length > 3 && (
                        <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground">
                          +{category.products.length - 3}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {isEn ? "Need Help Choosing?" : "需要选型帮助？"}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            {isEn
              ? "Our team can help you find the right products for your research needs."
              : "我们的团队可以帮助您找到最适合您科研需求的产品。"}
          </p>
          <Button size="lg" onClick={() => navigate("/contact")}>
            {isEn ? "Contact Us" : "联系我们"}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AmovlabProducts;
