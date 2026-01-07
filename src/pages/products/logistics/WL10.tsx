import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Package, Truck, MapPin, Timer, Shield, Zap } from "lucide-react";

const WL10 = () => {
  const specs = [
    { label: "最大载重", labelEn: "Max Payload", value: "10kg", valueEn: "10kg" },
    { label: "航程", labelEn: "Range", value: "30km", valueEn: "30km" },
    { label: "巡航速度", labelEn: "Cruise Speed", value: "60km/h", valueEn: "60km/h" },
    { label: "续航时间", labelEn: "Flight Time", value: "40分钟", valueEn: "40 min" },
    { label: "投递精度", labelEn: "Delivery Accuracy", value: "±10cm", valueEn: "±10cm" },
    { label: "工作温度", labelEn: "Operating Temp", value: "-20°C~45°C", valueEn: "-20°C~45°C" },
    { label: "抗风等级", labelEn: "Wind Resistance", value: "5级", valueEn: "Level 5" },
    { label: "货舱容积", labelEn: "Cargo Volume", value: "20L", valueEn: "20L" },
  ];

  const features = [
    { icon: Package, title: "轻量载荷", titleEn: "Light Payload", description: "10kg载重满足城市配送需求，适合各类快递包裹", descriptionEn: "10kg payload meets urban delivery needs for various packages" },
    { icon: Truck, title: "快速配送", titleEn: "Fast Delivery", description: "30分钟内完成配送，提升客户满意度", descriptionEn: "Complete delivery within 30 minutes, enhancing customer satisfaction" },
    { icon: MapPin, title: "精准投递", titleEn: "Precise Delivery", description: "厘米级定位精度，确保准确送达", descriptionEn: "Centimeter-level positioning ensures accurate delivery" },
    { icon: Timer, title: "高效运营", titleEn: "Efficient Operation", description: "智能航线规划，优化配送效率", descriptionEn: "Smart route planning optimizes delivery efficiency" },
    { icon: Shield, title: "安全可靠", titleEn: "Safe & Reliable", description: "多重安全保护机制，确保飞行安全", descriptionEn: "Multiple safety protection mechanisms ensure flight safety" },
    { icon: Zap, title: "快速部署", titleEn: "Quick Deployment", description: "5分钟完成起飞准备，快速响应需求", descriptionEn: "Ready to fly in 5 minutes, quick response to demands" },
  ];

  const applications = [
    { zh: "城市最后一公里配送", en: "Last-Mile Urban Delivery" },
    { zh: "即时配送服务", en: "Instant Delivery Service" },
    { zh: "餐饮外卖配送", en: "Food Delivery" },
    { zh: "医药物资配送", en: "Medical Supply Delivery" },
    { zh: "电商快递物流", en: "E-commerce Logistics" },
    { zh: "紧急文件速递", en: "Express Document Delivery" },
  ];

  return (
    <ProductDetailTemplate
      seoTitle="WL-10物流无人机 - 城市最后一公里配送解决方案"
      seoTitleEn="WL-10 Logistics Drone - Last-Mile Urban Delivery Solution"
      seoDescription="WL-10轻量级物流无人机，10kg载重，30km航程，适用于城市最后一公里配送、即时配送等场景"
      seoDescriptionEn="WL-10 lightweight logistics drone with 10kg payload and 30km range for last-mile urban and instant delivery"
      seoKeywords="物流无人机,城市配送,最后一公里,即时配送,WL-10"
      breadcrumbs={[
        { label: "首页", labelEn: "Home", path: "/" },
        { label: "物流无人机", labelEn: "Logistics Drones", path: "/products/logistics" },
        { label: "WL-10物流无人机", labelEn: "WL-10 Drone" },
      ]}
      heroTitle="WL-10物流无人机"
      heroTitleEn="WL-10 Logistics Drone"
      heroDescription="轻量级物流配送平台，适用于城市最后一公里配送场景。快速响应即时配送需求，是城市物流的理想选择。"
      heroDescriptionEn="Lightweight logistics platform for last-mile urban delivery. Quick response to instant delivery demands, ideal for urban logistics."
      heroImage="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1200&q=80"
      heroHighlight={{ value: "10kg", label: "最大载重", labelEn: "Max Payload" }}
      backLink={{ label: "返回物流无人机", labelEn: "Back to Logistics", path: "/products/logistics" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle="了解更多WL-10解决方案"
      ctaTitleEn="Learn More About WL-10 Solutions"
      ctaDescription="联系我们的专业团队，获取定制化配置方案和详细报价"
      ctaDescriptionEn="Contact our professional team for customized configuration and detailed quotation"
    />
  );
};

export default WL10;
