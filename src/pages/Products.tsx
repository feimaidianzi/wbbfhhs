import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Grid3X3, LayoutList, Sparkles, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { MultiLanguageSEO, createLocalizedBreadcrumbData } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageCode } from "@/i18n/languages";

const Products = () => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = language === 'zh' ? [
    { id: "all", name: "全部产品" },
    { id: "tethered", name: "系留无人机" },
    { id: "logistics", name: "物流无人机" },
    { id: "fpv", name: "FPV穿越机" },
  ] : [
    { id: "all", name: "All Products" },
    { id: "tethered", name: "Tethered Drone" },
    { id: "logistics", name: "Logistics Drone" },
    { id: "fpv", name: "FPV Drone" },
  ];

  const products = language === 'zh' ? [
    { id: 12, name: "系留T200", category: "tethered", description: "200米系留无人机，24小时不间断作业", specs: ["高度: 200m", "续航: 24h", "载重: 10kg"], image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80", link: "/products/tethered" },
    { id: 14, name: "大力神M6-H11", category: "logistics", description: "大载重物流无人机，支持50kg货物运输", specs: ["载重: 50kg", "航程: 30km", "智能投放"], image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80", link: "/products/logistics", hot: true },
    { id: 25, name: "CL-R5 竞速套装", category: "fpv", description: "专业竞速级FPV无人机，适合赛事训练和极限飞行", specs: ["时速: 160km/h", "延迟: <28ms", "5寸机架"], image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80", link: "/fpv", hot: true },
  ] : [
    { id: 12, name: "Tethered T200", category: "tethered", description: "200m tethered drone, 24-hour continuous operation", specs: ["Altitude: 200m", "Endurance: 24h", "Payload: 10kg"], image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80", link: "/products/tethered" },
    { id: 14, name: "Hercules M6-H11", category: "logistics", description: "Heavy-lift logistics drone, supports 50kg cargo", specs: ["Payload: 50kg", "Range: 30km", "Smart Drop"], image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80", link: "/products/logistics", hot: true },
    { id: 25, name: "CL-R5 Racing Kit", category: "fpv", description: "Professional racing FPV drone for competition and extreme flying", specs: ["Speed: 160km/h", "Latency: <28ms", "5-inch Frame"], image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80", link: "/fpv", hot: true },
  ];

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const breadcrumbData = createLocalizedBreadcrumbData([
    { name: language === 'zh' ? '首页' : 'Home', url: '/' },
    { name: language === 'zh' ? '产品中心' : 'Products', url: '/products' },
  ], language as LanguageCode);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={language === 'zh' ? "产品中心" : "Products"}
        description={language === 'zh' 
          ? "长凌科技产品中心，提供工业无人机、自动机场、系留无人机、物流无人机、植保无人机、无人机配件等全系列产品。"
          : "CANI Technology product center, providing industrial drones, drone nests, tethered drones, logistics drones, agricultural drones, and accessories."}
        keywords={language === 'zh' 
          ? "工业无人机,自动机场,系留无人机,物流无人机,植保无人机,无人机配件,多旋翼无人机"
          : "industrial drone,drone nest,tethered drone,logistics drone,agricultural drone,drone accessories,multi-rotor drone"}
        path="/products"
        structuredData={breadcrumbData}
      />
      <Header />

      <main>
        {/* Immersive Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80)" }} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="container-custom relative z-10 text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-black/50 border border-white/30 text-white text-sm font-medium mb-6">
                {language === 'zh' ? '长凌科技 · 产品中心' : 'CANI Technology · Products'}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
            >
              {language === 'zh' ? '专业无人机产品' : 'Professional Drone Products'}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8"
            >
              {language === 'zh' 
                ? '覆盖工业级无人机、自动机场、系留平台、物流配送等全场景解决方案'
                : 'Complete solutions for industrial drones, drone nests, tethered platforms, and logistics delivery'}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-6 h-6 text-white/60 animate-bounce" />
          </motion.div>
        </section>

        {/* Category Filter & Products */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-accent text-accent-foreground"
                      : "bg-card border border-accent/20 text-foreground hover:border-accent/50"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-muted-foreground">
                {language === 'zh' ? `共 ${filteredProducts.length} 款产品` : `${filteredProducts.length} products found`}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-accent text-accent-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-accent text-accent-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
                >
                  <LayoutList className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={activeCategory}
              className={viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-6"
              }
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <Link
                    to={product.link}
                    className={`group block bg-card rounded-2xl overflow-hidden border border-accent/10 hover:border-accent/30 transition-all duration-500 ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    <div className={`overflow-hidden relative ${viewMode === "list" ? "w-64 flex-shrink-0" : "aspect-[4/3]"}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {product.hot && (
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-accent text-accent-foreground rounded-full text-xs font-bold">
                          <Sparkles className="w-3 h-3" />
                          HOT
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.specs.slice(0, 3).map((spec, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-secondary rounded-md text-muted-foreground">
                            {spec}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center text-accent text-sm font-medium">
                        {language === 'zh' ? '查看详情' : 'View Details'}
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-cyan-500/10 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="container-custom relative text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
                {language === 'zh' ? '找不到合适的产品？' : 'Can\'t find the right product?'}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {language === 'zh' 
                  ? '联系我们的专业团队，获取定制化解决方案'
                  : 'Contact our professional team for customized solutions'}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-semibold rounded-full group">
                  {language === 'zh' ? '立即咨询' : 'Contact Us'}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Products;
