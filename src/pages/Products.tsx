import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Grid3X3, List } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO, createBreadcrumbStructuredData } from "@/components/SEO";

const categories = [
  { id: "all", name: "全部产品" },
  { id: "multi-rotor", name: "多旋翼" },
  { id: "airport", name: "自动机场" },
  { id: "fixed-wing", name: "固定翼" },
  { id: "swarm", name: "无人机集群" },
  { id: "tethered", name: "系留无人机" },
  { id: "logistics", name: "物流无人机" },
  { id: "firefighting", name: "消防无人机" },
  { id: "agriculture", name: "植保无人机" },
  { id: "training", name: "教练无人机" },
  { id: "work-drone", name: "作业无人机" },
  { id: "fpv", name: "FPV穿越机" },
  { id: "accessories", name: "无人机配件" },
  { id: "payload", name: "吊舱载荷" },
];

const products = [
  // 多旋翼
  {
    id: 1,
    name: "黑鸟S30",
    category: "multi-rotor",
    description: "工业级多旋翼无人机，大载重、长续航",
    specs: ["载重: 30kg", "续航: 55分钟", "抗风: 7级"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    link: "/products/multi-rotor",
    hot: true,
  },
  {
    id: 2,
    name: "海鸥S23",
    category: "multi-rotor",
    description: "高性能多用途无人机，适用于巡检测绘",
    specs: ["载重: 15kg", "续航: 45分钟", "抗风: 6级"],
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
    link: "/products/multi-rotor",
  },
  {
    id: 3,
    name: "雄鹰X50",
    category: "multi-rotor",
    description: "重载多旋翼平台，支持多种任务载荷",
    specs: ["载重: 50kg", "续航: 40分钟", "抗风: 7级"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
    link: "/products/multi-rotor",
  },
  // 自动机场
  {
    id: 4,
    name: "车载自动机场",
    category: "airport",
    description: "移动式自动机场，3分钟快速部署",
    specs: ["载机: ≤30kg", "展开: <3分钟", "防护: IP65"],
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80",
    link: "/products/airport/vehicle-mounted",
    hot: true,
  },
  {
    id: 5,
    name: "UHS 1000自动机场",
    category: "airport",
    description: "大型工业级自动机场，1000W大功率充电",
    specs: ["载机: ≤50kg", "充电: 1000W", "防护: IP65"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    link: "/products/airport/uhs-1000",
  },
  {
    id: 6,
    name: "UHS 600自动机场",
    category: "airport",
    description: "紧凑型自动机场，城市级巡检首选",
    specs: ["载机: ≤25kg", "占地: 2m²", "部署: <10分钟"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
    link: "/products/airport/uhs-600",
  },
  {
    id: 7,
    name: "UHS 400P自动机场",
    category: "airport",
    description: "便携式自动机场，单人可搬运",
    specs: ["载机: ≤15kg", "整机: <50kg", "便携设计"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
    link: "/products/airport/uhs-400p",
  },
  // 固定翼
  {
    id: 8,
    name: "翼龙V100",
    category: "fixed-wing",
    description: "垂直起降固定翼，长航时大范围巡检",
    specs: ["航时: 4小时", "航程: 200km", "载重: 5kg"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
    link: "/products/multi-rotor",
  },
  {
    id: 9,
    name: "天眼E50",
    category: "fixed-wing",
    description: "电动固定翼测绘无人机",
    specs: ["航时: 2小时", "航程: 100km", "载重: 3kg"],
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
    link: "/products/multi-rotor",
  },
  // 集群
  {
    id: 10,
    name: "蜂群S100",
    category: "swarm",
    description: "100架规模集群表演系统",
    specs: ["规模: 100架", "精度: ±10cm", "编队飞行"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    link: "/products/swarm",
    hot: true,
  },
  {
    id: 11,
    name: "蜂群S500",
    category: "swarm",
    description: "500架大规模集群控制系统",
    specs: ["规模: 500架", "精度: ±10cm", "智能调度"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    link: "/products/swarm",
  },
  // 系留
  {
    id: 12,
    name: "系留T200",
    category: "tethered",
    description: "200米系留无人机，24小时不间断作业",
    specs: ["高度: 200m", "续航: 24h", "载重: 10kg"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    link: "/products/tethered",
  },
  {
    id: 13,
    name: "系留T100",
    category: "tethered",
    description: "100米系留平台，应急通信保障",
    specs: ["高度: 100m", "续航: 24h", "载重: 5kg"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
    link: "/products/tethered",
  },
  // 物流
  {
    id: 14,
    name: "大力神M6-H11",
    category: "logistics",
    description: "大载重物流无人机，支持50kg货物运输",
    specs: ["载重: 50kg", "航程: 30km", "智能投放"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
    link: "/products/logistics",
    hot: true,
  },
  {
    id: 15,
    name: "大力神M4-H11",
    category: "logistics",
    description: "中型物流无人机，城市配送专用",
    specs: ["载重: 30kg", "航程: 25km", "精准投放"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    link: "/products/logistics",
  },
  // 消防
  {
    id: 16,
    name: "火凤凰F100",
    category: "firefighting",
    description: "高层消防灭火无人机",
    specs: ["载弹: 100L", "射程: 50m", "热成像"],
    image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=600&q=80",
    link: "/products/firefighting",
  },
  // 吊舱
  {
    id: 17,
    name: "D90全彩夜视吊舱",
    category: "payload",
    description: "全彩夜视，清晰成像，适用于夜间巡检",
    specs: ["分辨率: 4K", "变焦: 30倍", "夜视增强"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    link: "/products/multi-rotor",
  },
  {
    id: 18,
    name: "D80 40倍4K吊舱",
    category: "payload",
    description: "40倍光学变焦，4K高清画质",
    specs: ["分辨率: 4K", "变焦: 40倍", "激光测距"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    link: "/products/multi-rotor",
  },
  // 植保无人机
  {
    id: 19,
    name: "ZB-16植保无人机",
    category: "agriculture",
    description: "16升药箱容量，适合小型农田精准作业",
    specs: ["药箱: 16L", "喷幅: 4-6m", "续航: 15min"],
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&q=80",
    link: "/products/agriculture",
    hot: true,
  },
  {
    id: 20,
    name: "ZB-30植保无人机",
    category: "agriculture",
    description: "30升大容量药箱，高效大面积作业首选",
    specs: ["药箱: 30L", "喷幅: 5-8m", "续航: 12min"],
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80",
    link: "/products/agriculture",
  },
  // 教练无人机
  {
    id: 21,
    name: "六轴教练机 Hawk-02",
    category: "training",
    description: "入门级六轴教练机，稳定易操控，适合初学者",
    specs: ["轴距: 450mm", "续航: 20min", "载重: 0.5kg"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    link: "/products/training",
  },
  {
    id: 22,
    name: "八轴教练机 Hawk-01",
    category: "training",
    description: "专业级八轴教练机，模拟工业机操控体验",
    specs: ["轴距: 680mm", "续航: 25min", "载重: 2kg"],
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
    link: "/products/training",
  },
  // 作业无人机
  {
    id: 23,
    name: "TUTU-32E 复合翼无人机",
    category: "work-drone",
    description: "电动垂直起降复合翼平台，航时长、速度快、载荷大",
    specs: ["翼展: 3.2m", "航时: 4h", "载荷: 5kg"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
    link: "/products/work-drone",
    hot: true,
  },
  {
    id: 24,
    name: "YP-T5 垂起固定翼",
    category: "work-drone",
    description: "超轻碳纤维机身，结构强度高，适合长距离测绘巡检",
    specs: ["翼展: 2.5m", "航时: 2.5h", "载荷: 3kg"],
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80",
    link: "/products/work-drone",
  },
  // FPV穿越机
  {
    id: 25,
    name: "CL-R5 竞速套装",
    category: "fpv",
    description: "专业竞速级FPV无人机，适合赛事训练和极限飞行",
    specs: ["时速: 160km/h", "延迟: <28ms", "5寸机架"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    link: "/fpv",
    hot: true,
  },
  {
    id: 26,
    name: "CL-LR7 远航版",
    category: "fpv",
    description: "7寸长续航穿越机，探索更远距离",
    specs: ["续航: 35min", "图传: 15km", "载重: 500g"],
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
    link: "/fpv",
  },
  // 无人机配件
  {
    id: 27,
    name: "智能飞行电池",
    category: "accessories",
    description: "高能量密度锂聚合物电池，支持智能电量管理",
    specs: ["容量: 5200mAh", "电压: 22.2V", "循环: 300+"],
    image: "https://images.unsplash.com/photo-1619641805634-98e5c7f0c8d3?w=600&q=80",
    link: "/products/accessories",
  },
  {
    id: 28,
    name: "碳纤维桨叶",
    category: "accessories",
    description: "高强度碳纤维复合材料，动力效率提升15%",
    specs: ["材质: 碳纤维", "适配: 全系列", "效率: +15%"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    link: "/products/accessories",
  },
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const breadcrumbData = createBreadcrumbStructuredData([
    { name: '首页', url: '/' },
    { name: '系列产品', url: '/products' },
  ]);

  return (
    <div className="min-h-screen">
      <SEO
        title="系列产品"
        description="长凌电子全系列无人机产品，包括多旋翼无人机、自动机场、系留无人机、物流无人机、集群无人机等工业级解决方案。"
        keywords="无人机产品,多旋翼无人机,自动机场,系留无人机,物流无人机,集群无人机,工业无人机"
        url="/products"
        structuredData={breadcrumbData}
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Banner */}
        <section className="relative h-[350px] md:h-[450px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
          </div>
          
          {/* Floating product images */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 opacity-20">
              <img src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=300&q=80" alt="" className="w-full h-full object-contain" />
            </div>
            <div className="absolute top-1/3 right-[15%] w-40 h-40 md:w-56 md:h-56 opacity-30">
              <img src="https://images.unsplash.com/photo-1506947411487-a56738267384?w=300&q=80" alt="" className="w-full h-full object-contain" />
            </div>
            <div className="absolute bottom-1/4 right-[30%] w-28 h-28 md:w-40 md:h-40 opacity-20">
              <img src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=300&q=80" alt="" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="relative container-custom h-full flex items-center justify-center text-center">
            <div className="max-w-3xl animate-fade-in">
              <div className="inline-block px-4 py-1 bg-accent/20 rounded-full text-accent text-sm font-medium mb-4">
                长凌电子 · 专业无人机制造商
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 leading-tight">
                系列产品
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                覆盖工业级多旋翼、自动机场、集群系统、物流配送等全产品线，为各行业提供专业无人机解决方案
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary to-transparent" />
        </section>

        {/* Category Tabs */}
        <section className="bg-primary sticky top-16 md:top-20 z-40">
          <div className="container-custom">
            <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? "bg-accent text-accent-foreground shadow-lg"
                      : "bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 md:py-20 bg-background">
          <div className="container-custom">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8">
              <div className="text-muted-foreground">
                共 <span className="text-foreground font-semibold">{filteredProducts.length}</span> 款产品
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-accent/10 text-accent" : "text-muted-foreground"}
                >
                  <Grid3X3 className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-accent/10 text-accent" : "text-muted-foreground"}
                >
                  <List className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={product.link}
                    className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative bg-secondary">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {product.hot && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                          热销
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.specs.slice(0, 2).map((spec, i) => (
                          <span key={i} className="text-xs bg-secondary px-2 py-1 rounded text-foreground/70">
                            {spec}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center text-accent text-sm font-medium">
                        了解更多
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={product.link}
                    className="group flex gap-6 bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all p-4"
                  >
                    <div className="w-48 h-36 flex-shrink-0 overflow-hidden rounded-xl bg-secondary">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 py-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                            {product.name}
                            {product.hot && (
                              <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded">
                                热销
                              </span>
                            )}
                          </h3>
                          <p className="text-muted-foreground mb-3">
                            {product.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.specs.map((spec, i) => (
                          <span key={i} className="text-xs bg-secondary px-2 py-1 rounded text-foreground/70">
                            {spec}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center text-accent text-sm font-medium">
                        查看详情
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="container-custom text-center relative">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
              没有找到合适的产品？
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              长凌电子提供定制化无人机解决方案，满足您的特殊需求
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg shadow-lg" asChild>
                <Link to="/custom-research">
                  科研定制
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-8 py-6 text-lg backdrop-blur-sm" asChild>
                <Link to="/contact">
                  联系我们
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Products;
