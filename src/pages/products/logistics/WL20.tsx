import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Package, Truck, MapPin, Timer, Shield, Zap } from "lucide-react";

const WL20 = () => {
  const specs = [
    { label: "最大载重", value: "20kg" },
    { label: "航程", value: "50km" },
    { label: "巡航速度", value: "80km/h" },
    { label: "续航时间", value: "50分钟" },
    { label: "投递精度", value: "±5cm" },
    { label: "工作温度", value: "-20°C~45°C" },
    { label: "抗风等级", value: "6级" },
    { label: "货舱容积", value: "40L" },
  ];

  const features = [
    { icon: Package, title: "中型载荷", description: "20kg载重满足多种配送需求，覆盖更多货物类型" },
    { icon: Truck, title: "城际配送", description: "50km航程覆盖城际距离，拓展配送范围" },
    { icon: MapPin, title: "高精度投递", description: "±5cm投递精度，确保精准到位" },
    { icon: Timer, title: "长续航能力", description: "50分钟续航时间，完成更远距离任务" },
    { icon: Shield, title: "全天候作业", description: "适应多种天气条件，保障配送稳定性" },
    { icon: Zap, title: "智能导航", description: "自主避障导航系统，安全高效飞行" },
  ];

  const applications = [
    "城际快递配送",
    "医疗物资运输",
    "生鲜产品配送",
    "农产品运输",
    "工业零部件配送",
    "紧急物资投送",
  ];

  return (
    <ProductDetailTemplate
      seoTitle="WL-20物流无人机 - 城际物流配送解决方案"
      seoDescription="WL-20中型物流无人机，20kg载重，50km航程，适用于城际快递、医疗物资运输等场景"
      seoKeywords="物流无人机,城际配送,医疗物流,WL-20,无人机配送"
      breadcrumbs={[
        { label: "首页", path: "/" },
        { label: "物流无人机", path: "/products/logistics" },
        { label: "WL-20物流无人机" },
      ]}
      heroTitle="WL-20物流无人机"
      heroDescription="中型物流配送平台，适用于城际快递和医疗物资运输，满足中等距离配送需求。强大的载荷能力和续航性能，是城际物流的最佳选择。"
      heroImage="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80"
      heroHighlight={{ value: "20kg", label: "最大载重" }}
      backLink={{ label: "返回物流无人机", path: "/products/logistics" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle="了解更多WL-20解决方案"
      ctaDescription="联系我们的专业团队，获取定制化配置方案和详细报价"
    />
  );
};

export default WL20;
