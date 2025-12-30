import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Package, Truck, MapPin, Timer, Shield, Zap } from "lucide-react";

const WL10 = () => {
  const specs = [
    { label: "最大载重", value: "10kg" },
    { label: "航程", value: "30km" },
    { label: "巡航速度", value: "60km/h" },
    { label: "续航时间", value: "40分钟" },
    { label: "投递精度", value: "±10cm" },
    { label: "工作温度", value: "-20°C~45°C" },
    { label: "抗风等级", value: "5级" },
    { label: "货舱容积", value: "20L" },
  ];

  const features = [
    { icon: Package, title: "轻量载荷", description: "10kg载重满足城市配送需求，适合各类快递包裹" },
    { icon: Truck, title: "快速配送", description: "30分钟内完成配送，提升客户满意度" },
    { icon: MapPin, title: "精准投递", description: "厘米级定位精度，确保准确送达" },
    { icon: Timer, title: "高效运营", description: "智能航线规划，优化配送效率" },
    { icon: Shield, title: "安全可靠", description: "多重安全保护机制，确保飞行安全" },
    { icon: Zap, title: "快速部署", description: "5分钟完成起飞准备，快速响应需求" },
  ];

  const applications = [
    "城市最后一公里配送",
    "即时配送服务",
    "餐饮外卖配送",
    "医药物资配送",
    "电商快递物流",
    "紧急文件速递",
  ];

  return (
    <ProductDetailTemplate
      seoTitle="WL-10物流无人机 - 城市最后一公里配送解决方案"
      seoDescription="WL-10轻量级物流无人机，10kg载重，30km航程，适用于城市最后一公里配送、即时配送等场景"
      seoKeywords="物流无人机,城市配送,最后一公里,即时配送,WL-10"
      breadcrumbs={[
        { label: "首页", path: "/" },
        { label: "物流无人机", path: "/products/logistics" },
        { label: "WL-10物流无人机" },
      ]}
      heroTitle="WL-10物流无人机"
      heroDescription="轻量级物流配送平台，适用于城市最后一公里配送场景。快速响应即时配送需求，是城市物流的理想选择。"
      heroImage="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1200&q=80"
      heroHighlight={{ value: "10kg", label: "最大载重" }}
      backLink={{ label: "返回物流无人机", path: "/products/logistics" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle="了解更多WL-10解决方案"
      ctaDescription="联系我们的专业团队，获取定制化配置方案和详细报价"
    />
  );
};

export default WL10;
