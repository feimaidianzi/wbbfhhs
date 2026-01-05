import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, ShoppingCart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { BackButton } from "@/components/BackButton";

const categoryData: Record<string, {
  title: string;
  description: string;
  heroImage: string;
  products: {
    name: string;
    description: string;
    specs: string[];
    image: string;
    price: string;
    features: string[];
  }[];
}> = {
  "套装系列": {
    title: "套装系列",
    description: "完整FPV飞行套装，包含穿越机、遥控器、眼镜等全套设备，开箱即飞，适合入门玩家快速上手",
    heroImage: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80",
    products: [
      {
        name: "CL-S1 入门套装",
        description: "专为新手设计的完整入门套装，包含一切所需设备，安全易学",
        specs: ["机架尺寸: 5寸", "续航: 10分钟", "图传: 5.8G", "遥控距离: 1km"],
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
        price: "¥1,999",
        features: ["开箱即飞", "自稳模式", "新手保护", "中文教程"],
      },
      {
        name: "CL-S2 进阶套装",
        description: "适合有一定基础的玩家，性能更强，功能更全",
        specs: ["机架尺寸: 5寸", "续航: 12分钟", "图传: 数字图传", "遥控距离: 3km"],
        image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
        price: "¥3,299",
        features: ["数字高清", "GPS定位", "一键返航", "飞行记录"],
      },
      {
        name: "CL-S3 专业套装",
        description: "专业级配置，满足高阶玩家的各种需求",
        specs: ["机架尺寸: 5寸", "续航: 15分钟", "图传: O3图传", "遥控距离: 10km"],
        image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
        price: "¥5,999",
        features: ["O3超清图传", "低延迟", "专业遥控器", "多种飞行模式"],
      },
    ],
  },
  "竞速系列": {
    title: "竞速系列",
    description: "专业竞速穿越机，极致速度体验，为赛事而生，适合追求速度与激情的玩家",
    heroImage: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1920&q=80",
    products: [
      {
        name: "CL-R5 竞速版",
        description: "5寸专业竞速机，轻量化设计，极致速度",
        specs: ["最高时速: 160km/h", "电机: 2806.5 1300KV", "电池: 6S 1100mAh", "重量: 380g"],
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
        price: "¥2,999",
        features: ["碳纤维机架", "低延迟图传", "竞速调参", "赛事认证"],
      },
      {
        name: "CL-R5 Pro 赛事版",
        description: "赛事级配置，专业飞手首选",
        specs: ["最高时速: 180km/h", "电机: 2807 1500KV", "电池: 6S 1300mAh", "重量: 350g"],
        image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
        price: "¥4,599",
        features: ["钛合金螺丝", "定制电调", "竞速固件", "技术支持"],
      },
      {
        name: "CL-R3 室内竞速",
        description: "3寸室内竞速机，适合室内场地训练",
        specs: ["最高时速: 100km/h", "电机: 1404 3800KV", "电池: 4S 650mAh", "重量: 150g"],
        image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
        price: "¥1,599",
        features: ["室内适用", "桨叶保护", "静音设计", "快速充电"],
      },
    ],
  },
  "花飞系列": {
    title: "花飞系列",
    description: "自由式花飞穿越机，灵活机动，适合特技飞行和创意拍摄",
    heroImage: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=1920&q=80",
    products: [
      {
        name: "CL-F3 入门花飞",
        description: "3寸入门花飞机，室内外皆可飞行",
        specs: ["轴距: 140mm", "重量: 180g", "续航: 8分钟", "电池: 4S 650mAh"],
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
        price: "¥1,299",
        features: ["轻巧灵活", "桨叶保护", "适合新手", "特技模式"],
      },
      {
        name: "CL-F5 标准花飞",
        description: "5寸标准花飞机，动力充沛，动作流畅",
        specs: ["轴距: 220mm", "重量: 350g", "续航: 10分钟", "电池: 6S 1100mAh"],
        image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
        price: "¥2,299",
        features: ["大动力", "流畅操控", "3D飞行", "可挂载相机"],
      },
      {
        name: "CL-F7 专业花飞",
        description: "7寸专业花飞机，大尺寸带来更强表现力",
        specs: ["轴距: 280mm", "重量: 550g", "续航: 12分钟", "电池: 6S 1500mAh"],
        image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
        price: "¥3,599",
        features: ["专业级", "大载荷", "稳定悬停", "高清拍摄"],
      },
    ],
  },
  "远航系列": {
    title: "远航系列",
    description: "长续航远距离飞行，探索更广阔的天空，适合远距离巡航和航拍",
    heroImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80",
    products: [
      {
        name: "CL-LR5 标准远航",
        description: "5寸远航机，平衡续航与性能",
        specs: ["续航: 25分钟", "图传距离: 10km", "载重: 300g", "电池: 6S 2200mAh"],
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
        price: "¥3,299",
        features: ["长续航", "GPS定位", "一键返航", "低电压保护"],
      },
      {
        name: "CL-LR7 专业远航",
        description: "7寸专业远航机，更长续航，更远距离",
        specs: ["续航: 35分钟", "图传距离: 15km", "载重: 500g", "电池: 6S 3000mAh"],
        image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
        price: "¥4,599",
        features: ["超长续航", "高清图传", "双GPS", "失控保护"],
      },
      {
        name: "CL-LR10 极限远航",
        description: "10寸极限远航机，挑战飞行极限",
        specs: ["续航: 50分钟", "图传距离: 20km", "载重: 1kg", "电池: 6S 5000mAh"],
        image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
        price: "¥7,999",
        features: ["极限续航", "专业载荷", "稳定平台", "多任务支持"],
      },
    ],
  },
  "航拍系列": {
    title: "航拍系列",
    description: "稳定航拍与FPV结合，捕捉震撼画面，适合影视创作和内容创作者",
    heroImage: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1920&q=80",
    products: [
      {
        name: "CL-C5 航拍入门",
        description: "5寸航拍穿越机，稳定拍摄入门之选",
        specs: ["云台: 2轴", "相机: 裸机位", "续航: 15分钟", "稳定性: 高"],
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
        price: "¥2,999",
        features: ["2轴云台", "稳定画面", "GoPro适配", "跟随模式"],
      },
      {
        name: "CL-C7 航拍专业",
        description: "7寸专业航拍机，专业影视级画质",
        specs: ["云台: 3轴", "相机: RED/BMPCC", "续航: 20分钟", "载重: 1.5kg"],
        image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
        price: "¥8,999",
        features: ["3轴增稳", "专业相机", "影视级", "静音设计"],
      },
      {
        name: "CL-C10 航拍旗舰",
        description: "10寸旗舰航拍机，电影级拍摄平台",
        specs: ["云台: 3轴陀螺", "相机: 电影机", "续航: 25分钟", "载重: 3kg"],
        image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
        price: "¥15,999",
        features: ["电影级平台", "超强载荷", "精准控制", "专业团队支持"],
      },
    ],
  },
};

const FPVCategory = () => {
  const { category } = useParams<{ category: string }>();
  const data = category ? categoryData[category] : null;

  if (!data) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16 md:pt-20">
          <div className="container-custom py-20 text-center">
            <h1 className="text-2xl font-bold mb-4">分类不存在</h1>
            <Link to="/fpv" className="text-accent hover:underline">
              返回FPV首页
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="bg-secondary py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">首页</Link>
              <span>/</span>
              <Link to="/fpv" className="hover:text-accent">FPV穿越机</Link>
              <span>/</span>
              <span className="text-foreground">{data.title}</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="relative h-[300px] md:h-[400px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${data.heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <BackButton to="/fpv" label="返回FPV首页" />
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {data.title}
              </h1>
              <p className="text-lg text-primary-foreground/90">
                {data.description}
              </p>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">产品列表</h2>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.products.map((product, index) => (
                <div
                  key={index}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-2">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">{product.description}</p>
                    
                    {/* Specs */}
                    <div className="bg-secondary/50 rounded-xl p-4 mb-4">
                      <div className="grid grid-cols-2 gap-2">
                        {product.specs.map((spec, i) => (
                          <div key={i} className="text-xs text-foreground/80">
                            {spec}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.features.map((feature, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-accent">{product.price}</span>
                      <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        立即购买
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              需要更多帮助？
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              联系我们的专业顾问，获取选购建议和定制方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                在线咨询
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-8 py-6 text-lg">
                查看全部产品
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

export default FPVCategory;
