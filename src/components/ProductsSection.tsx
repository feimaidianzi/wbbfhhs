import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "长凌机场",
    description: "全自动无人机起降平台",
    price: "智能巡检解决方案",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80",
    link: "/products/airport",
  },
  {
    name: "系留无人机",
    description: "24小时不间断工作",
    price: "长时滞空方案",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    link: "/products/tethered",
  },
  {
    name: "物流无人机",
    description: "高效智能配送系统",
    price: "空中物流方案",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
    link: "/products/logistics",
  },
  {
    name: "多旋翼无人机",
    description: "工业级多旋翼平台",
    price: "多场景应用",
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
    link: "/products/multi-rotor",
  },
];

export const ProductsSection = () => {
  return (
    <section id="products" className="py-20 md:py-28 bg-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-accent text-2xl font-black">&lt;</span>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">
                产品系列
              </h2>
              <span className="text-accent text-2xl font-black">\&gt;</span>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              长凌电子提供全系列工业级无人机产品，从自动机场到系留平台，从物流配送到多旋翼平台，满足各行业应用需求。
            </p>
          </div>
          <div className="flex items-end justify-start lg:justify-end">
            <Link 
              to="/products"
              className="inline-flex items-center gap-2 text-accent hover:text-orange-light font-semibold text-lg group"
            >
              查看全部产品
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((product, index) => (
            <Link
              key={index}
              to={product.link}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-accent font-semibold text-sm">{product.price}</span>
                  <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
