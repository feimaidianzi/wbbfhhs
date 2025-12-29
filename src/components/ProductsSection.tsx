import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    name: "车载自动机场",
    description: "多维跨域，相得益彰 空地跨域协同、人机共...",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80",
  },
  {
    name: "UHS 1000自动机场",
    description: "UHS智能停机坪，全自动起降充电",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
  },
  {
    name: "UHS 600自动机场",
    description: "紧凑型自动机场，适用于多种场景",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
  },
  {
    name: "UHS 400P自动机场",
    description: "便携式自动机场，快速部署",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
  },
  {
    name: "黑鸟S30无人机",
    description: "垂直起降固定翼无人机，续航时间长",
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
  },
  {
    name: "海鸥S23无人机",
    description: "海鸥S23无人机，高性能多用途",
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=600&q=80",
  },
  {
    name: "D90全彩夜视吊舱",
    description: "全彩夜视，清晰成像",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  },
  {
    name: "D80 40倍4K吊舱",
    description: "40倍光学变焦，4K高清画质",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
  },
  {
    name: "D80双视场吊舱",
    description: "双视场切换，广角与长焦兼备",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  },
];

export const ProductsSection = () => {
  return (
    <section id="products" className="py-16 md:py-24 bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            长凌无人机
          </h2>
          <Button variant="ghost" className="text-accent hover:text-orange-light group">
            查看更多
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {product.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  了解更多
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
