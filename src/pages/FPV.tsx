import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Eye, Radio, Shield, Package, Gauge, Flower2, Plane, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const FPV = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const features = isEn ? [
    { icon: Zap, title: "Ultra Fast Response", description: "Millisecond control response, enjoy the flight" },
    { icon: Eye, title: "First Person View", description: "Immersive FPV flight experience" },
    { icon: Radio, title: "Low Latency", description: "HD video transmission, real-time footage" },
    { icon: Shield, title: "Durable Build", description: "Carbon fiber frame, crash resistant" },
  ] : [
    { icon: Zap, title: "极速响应", description: "毫秒级操控响应，畅享飞行乐趣" },
    { icon: Eye, title: "第一视角", description: "沉浸式FPV飞行体验" },
    { icon: Radio, title: "低延迟", description: "高清图传，实时画面" },
    { icon: Shield, title: "坚固耐用", description: "碳纤维机架，抗摔耐撞" },
  ];

  const categories = isEn ? [
    { name: "Ready-to-Fly Kits", description: "Complete FPV flight kits, ready to fly out of the box, perfect for beginners", icon: Package, image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80", link: "/fpv/kits", products: 8 },
    { name: "Racing Series", description: "Professional racing drones, ultimate speed experience, built for competition", icon: Gauge, image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80", link: "/fpv/racing", products: 6 },
    { name: "Freestyle Series", description: "Freestyle FPV drones, agile and nimble, perfect for trick flying", icon: Flower2, image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80", link: "/fpv/freestyle", products: 5 },
    { name: "Long Range Series", description: "Long endurance and distance, explore wider skies", icon: Navigation, image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80", link: "/fpv/long-range", products: 4 },
    { name: "Cinewhoop Series", description: "Stable aerial footage with FPV, capture stunning visuals", icon: Plane, image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80", link: "/fpv/cinewhoop", products: 5 },
  ] : [
    { name: "套装系列", description: "完整FPV飞行套装，开箱即飞，适合入门玩家快速上手", icon: Package, image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80", link: "/fpv/套装系列", products: 8 },
    { name: "竞速系列", description: "专业竞速穿越机，极致速度体验，为赛事而生", icon: Gauge, image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80", link: "/fpv/竞速系列", products: 6 },
    { name: "花飞系列", description: "自由式花飞穿越机，灵活机动，适合特技飞行", icon: Flower2, image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80", link: "/fpv/花飞系列", products: 5 },
    { name: "远航系列", description: "长续航远距离飞行，探索更广阔的天空", icon: Navigation, image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80", link: "/fpv/远航系列", products: 4 },
    { name: "航拍系列", description: "稳定航拍与FPV结合，捕捉震撼画面", icon: Plane, image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80", link: "/fpv/航拍系列", products: 5 },
  ];

  const hotProducts = isEn ? [
    { name: "CL-R5 Racing Kit", category: "Racing Series", description: "Professional racing FPV drone, 5-inch frame, perfect for competition training and extreme flying.", specs: ["Max Speed: 160km/h", "Motor: 2806.5 1300KV", "Video Latency: <28ms"], image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80", price: "$399" },
    { name: "CL-F3 Freestyle Starter", category: "Freestyle Series", description: "3-inch freestyle drone, suitable for indoor and outdoor flying, great for beginners learning tricks.", specs: ["Wheelbase: 140mm", "Weight: 180g", "Flight Time: 8min"], image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80", price: "$179" },
    { name: "CL-LR7 Long Range", category: "Long Range Series", description: "7-inch long-range cruiser with efficient power system, explore greater distances.", specs: ["Flight Time: 35min", "Video Range: 15km", "Payload: 500g"], image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80", price: "$599" },
  ] : [
    { name: "CL-R5 竞速套装", category: "竞速系列", description: "专业竞速级FPV无人机，5寸机架，适合赛事训练和极限飞行。", specs: ["最高时速: 160km/h", "电机: 2806.5 1300KV", "图传延迟: <28ms"], image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80", price: "¥2,999" },
    { name: "CL-F3 花飞入门版", category: "花飞系列", description: "3寸花飞穿越机，室内外皆可飞行，适合新手练习特技。", specs: ["轴距: 140mm", "重量: 180g", "续航: 8分钟"], image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80", price: "¥1,299" },
    { name: "CL-LR7 远航版", category: "远航系列", description: "7寸长续航穿越机，搭载高效动力系统，探索更远距离。", specs: ["续航: 35分钟", "图传距离: 15km", "载重: 500g"], image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80", price: "¥4,599" },
  ];

  const accessories = isEn ? [
    { name: "HD FPV Goggles", price: "$179" },
    { name: "Radio Controller", price: "$89" },
    { name: "Battery Charger", price: "$49" },
    { name: "Spare Props Set", price: "$9" },
    { name: "Tool Kit", price: "$19" },
    { name: "Carrying Backpack", price: "$29" },
  ] : [
    { name: "高清FPV眼镜", price: "¥1,299" },
    { name: "遥控器", price: "¥599" },
    { name: "电池充电器", price: "¥299" },
    { name: "备用桨叶套装", price: "¥49" },
    { name: "工具套装", price: "¥129" },
    { name: "收纳背包", price: "¥199" },
  ];

  const articles = isEn ? [
    { title: "FPV Drone Beginner's Guide | How to Master Speed and Passion", excerpt: "Among the many types of drones, FPV drones have quickly become a favorite with their unique immersive experience and thrilling high-speed flying...", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80", date: "2025-08-15" },
    { title: "FPV Racing | Exploring the Infinite Possibilities of Extreme Flying", excerpt: "With the rapid development of drone technology, FPV racing drones have gradually become a favorite of flight enthusiasts and extreme sports lovers...", image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400&q=80", date: "2025-05-20" },
    { title: "FPV Drones | Breaking Visual Boundaries, Making Flight a New Engine for Creativity", excerpt: "In the era of visual-first short videos, a stunning, unique shot can touch hearts more than a thousand words...", image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=400&q=80", date: "2025-05-10" },
  ] : [
    { title: "FPV穿越机入门全解析 | 新手如何玩转速度与激情", excerpt: "在无人机的众多类型中，FPV穿越机凭借独特的沉浸式体验和极速飞行的爽感，迅速成为无人机爱好者的新宠...", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80", date: "2025-08-15" },
    { title: "穿越机FPV | 探索极限飞行的无限可能", excerpt: "随着无人机技术的飞速发展，穿越机FPV逐渐成为飞行爱好者和极限运动者的热宠...", image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400&q=80", date: "2025-05-20" },
    { title: "穿越机 | 释放视角的边界，让飞行成为创意的新引擎", excerpt: "在视觉至上的短视频时代，一段震撼、独特的镜头，往往比千言万语更能打动人心...", image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=400&q=80", date: "2025-05-10" },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={isEn ? "FPV Racing Drones" : "FPV穿越机"}
        description={isEn 
          ? "Feimai Technology FPV drone series, including ready-to-fly kits, racing, freestyle, long range series. Experience the thrill of high-speed flying."
          : "飞迈科技FPV穿越机系列，包括套装系列、竞速系列、花飞系列、远航系列，体验极速飞行的乐趣。"}
        keywords={isEn ? "FPV drone,racing drone,freestyle drone,FPV goggles,drone kit" : "FPV穿越机,竞速无人机,花飞穿越机,FPV眼镜,穿越机套装"}
        url="/fpv"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[450px] md:h-[550px] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80)" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl animate-fade-in">
              <div className="inline-block px-4 py-1 bg-accent/20 rounded-full text-accent text-sm font-medium mb-4">
                {isEn ? 'Feimai Technology · FPV Zone' : '飞迈科技 · FPV穿越机专区'}
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 leading-tight">
                {isEn ? 'FPV Racing Drones' : 'FPV 穿越机'}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                {isEn 
                  ? 'First-person view flight experience, the perfect fusion of speed and passion. From beginner kits to professional racing, meeting different pilot needs'
                  : '第一视角飞行体验，感受速度与激情的完美融合。从入门套装到专业竞速，满足不同玩家需求'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg shadow-lg">
                  {isEn ? 'Browse All Products' : '浏览全部产品'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-8 py-6 text-lg backdrop-blur-sm">
                  {isEn ? 'Beginner Guide' : '新手入门指南'}
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-secondary to-transparent" />
        </section>

        {/* Features */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">{isEn ? 'Product Categories' : '产品分类'}</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {isEn ? 'Choose the perfect FPV drone based on your flying style and use case' : '根据飞行风格和使用场景，选择最适合您的FPV穿越机'}
              </p>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full mt-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <Link key={index} to={category.link} className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <span className="text-sm text-card-foreground bg-card/80 px-2 py-1 rounded backdrop-blur-sm">
                        {category.products} {isEn ? 'products' : '款产品'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                    <div className="mt-4 flex items-center text-accent text-sm font-medium">
                      {isEn ? 'View All' : '查看全部'}
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Hot Products */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">{isEn ? 'Hot Products' : '热门产品'}</h2>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {hotProducts.map((product, index) => (
                <div key={index} className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">{product.category}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-2">{product.name}</h3>
                    <p className="text-muted-foreground mb-4 text-sm">{product.description}</p>
                    <div className="space-y-2 mb-4">
                      {product.specs.map((spec, i) => (<div key={i} className="text-sm text-foreground/80">• {spec}</div>))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-accent">{product.price}</span>
                      <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                        {isEn ? 'Learn More' : '了解详情'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Accessories */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{isEn ? 'Accessories' : '配件周边'}</h2>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {accessories.map((item, index) => (
                <div key={index} className="p-4 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all text-center group cursor-pointer">
                  <span className="text-sm font-medium text-card-foreground group-hover:text-accent transition-colors block mb-1">{item.name}</span>
                  <span className="text-xs text-muted-foreground">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">{isEn ? 'FPV News' : 'FPV资讯'}</h2>
              <p className="text-muted-foreground">{isEn ? 'Latest FPV technology and flying tips' : '了解最新FPV技术动态和飞行技巧'}</p>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full mt-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <div key={index} className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all cursor-pointer">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                    <h3 className="text-lg font-bold text-card-foreground mt-2 mb-3 group-hover:text-accent transition-colors line-clamp-2">{article.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{article.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                {isEn ? 'View More News' : '查看更多资讯'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="container-custom text-center relative">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
              {isEn ? 'Start Your FPV Journey' : '开启FPV飞行之旅'}
            </h2>
            <p className="text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              {isEn 
                ? 'Join the Feimai FPV community, share flying tips, exchange videos, and get exclusive offers'
                : '加入飞迈FPV玩家社群，交流飞行技巧，分享精彩视频，获取专属优惠'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg shadow-lg">
                {isEn ? 'Join Community' : '加入社群'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-10 py-6 text-lg backdrop-blur-sm">
                {isEn ? 'Contact Us' : '联系我们'}
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

export default FPV;