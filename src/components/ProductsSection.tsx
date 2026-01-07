import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const getCategoriesData = (language: 'zh' | 'en') => [
  {
    name: language === 'zh' ? "VTX/VRX" : "VTX/VRX",
    description: language === 'zh' ? "4.9-7.2GHz全频段视频发射器" : "4.9-7.2GHz Full Band Video Transmitter",
    price: language === 'zh' ? "高清图传方案" : "HD Video Solution",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    link: "/products/accessories/vtx-vrx",
    isNew: true,
  },
  {
    name: language === 'zh' ? "飞控/电调" : "FC/ESC",
    description: language === 'zh' ? "专业级飞行控制系统" : "Professional Flight Control System",
    price: language === 'zh' ? "稳定飞行方案" : "Stable Flight Solution",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80",
    link: "/products/accessories/fc-esc",
  },
  {
    name: language === 'zh' ? "吊舱/云台" : "Gimbal/Pod",
    description: language === 'zh' ? "多轴稳定云台系统" : "Multi-axis Stabilization System",
    price: language === 'zh' ? "航拍增稳方案" : "Aerial Stabilization",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
    link: "/products/accessories/gimbal",
  },
  {
    name: language === 'zh' ? "ELRS遥控" : "ELRS Remote",
    description: language === 'zh' ? "ExpressLRS远程控制" : "ExpressLRS Remote Control",
    price: language === 'zh' ? "超远距离方案" : "Long Range Solution",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    link: "/products/accessories/elrs",
    isNew: true,
  },
  {
    name: language === 'zh' ? "数字图传" : "Digital FPV",
    description: language === 'zh' ? "高清数字FPV系统" : "HD Digital FPV System",
    price: language === 'zh' ? "沉浸式体验方案" : "Immersive Experience",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    link: "/products/accessories/digital-fpv",
  },
];

export const ProductsSection = () => {
  const { language, t } = useLanguage();
  const categories = getCategoriesData(language);

  return (
    <section id="products" className="py-20 md:py-28 bg-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-accent text-2xl font-black">&lt;</span>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">
                {language === 'zh' ? '无人机配件' : 'Drone Accessories'}
              </h2>
              <span className="text-accent text-2xl font-black">\&gt;</span>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {language === 'zh' 
                ? '飞迈科技提供全系列专业无人机配件，从视频发射器到飞控系统，从云台吊舱到远程遥控，满足各类飞行需求。'
                : 'FlyMind provides a full range of professional drone accessories, from video transmitters to flight controllers, from gimbals to remote controls, meeting all flight needs.'}
            </p>
          </div>
          <div className="flex items-end justify-start lg:justify-end animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Link 
              to="/products"
              className="inline-flex items-center gap-2 text-accent hover:text-orange-light font-semibold text-lg group"
            >
              {t('section.products.viewAll')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((product, index) => (
            <Link
              key={index}
              to={product.link}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-3 hover:rotate-[0.5deg] animate-fade-in"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {product.isNew && (
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-bold animate-pulse shadow-lg">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>NEW</span>
                  </div>
                )}
                {product.isNew && (
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 animate-[pulse_2s_ease-in-out_infinite] transition-opacity duration-500" />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-3 group-hover:text-foreground/80 transition-colors duration-300">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-accent font-semibold text-sm">{product.price}</span>
                  <span className="text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
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
