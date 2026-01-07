import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Package, Truck, MapPin, Timer, Shield, Zap } from "lucide-react";

const WL20 = () => {
  const specs = [
    { label: "最大载重", labelEn: "Max Payload", value: "20kg", valueEn: "20kg" },
    { label: "航程", labelEn: "Range", value: "50km", valueEn: "50km" },
    { label: "巡航速度", labelEn: "Cruise Speed", value: "80km/h", valueEn: "80km/h" },
    { label: "续航时间", labelEn: "Flight Time", value: "50分钟", valueEn: "50 min" },
    { label: "投递精度", labelEn: "Delivery Accuracy", value: "±5cm", valueEn: "±5cm" },
    { label: "工作温度", labelEn: "Operating Temp", value: "-20°C~45°C", valueEn: "-20°C~45°C" },
    { label: "抗风等级", labelEn: "Wind Resistance", value: "6级", valueEn: "Level 6" },
    { label: "货舱容积", labelEn: "Cargo Volume", value: "40L", valueEn: "40L" },
  ];

  const features = [
    { icon: Package, title: "中型载荷", titleEn: "Medium Payload", description: "20kg载重满足多种配送需求，覆盖更多货物类型", descriptionEn: "20kg payload meets various delivery needs, covering more cargo types" },
    { icon: Truck, title: "城际配送", titleEn: "Inter-city Delivery", description: "50km航程覆盖城际距离，拓展配送范围", descriptionEn: "50km range covers inter-city distances, expanding delivery scope" },
    { icon: MapPin, title: "高精度投递", titleEn: "High-Precision", description: "±5cm投递精度，确保精准到位", descriptionEn: "±5cm delivery accuracy ensures precise placement" },
    { icon: Timer, title: "长续航能力", titleEn: "Long Endurance", description: "50分钟续航时间，完成更远距离任务", descriptionEn: "50-minute flight time for longer distance missions" },
    { icon: Shield, title: "全天候作业", titleEn: "All-Weather", description: "适应多种天气条件，保障配送稳定性", descriptionEn: "Adapts to various weather conditions for stable delivery" },
    { icon: Zap, title: "智能导航", titleEn: "Smart Navigation", description: "自主避障导航系统，安全高效飞行", descriptionEn: "Autonomous obstacle avoidance for safe and efficient flight" },
  ];

  const applications = [
    { zh: "城际快递配送", en: "Inter-city Express Delivery" },
    { zh: "医疗物资运输", en: "Medical Supply Transport" },
    { zh: "生鲜产品配送", en: "Fresh Product Delivery" },
    { zh: "农产品运输", en: "Agricultural Product Transport" },
    { zh: "工业零部件配送", en: "Industrial Parts Delivery" },
    { zh: "紧急物资投送", en: "Emergency Supply Drop" },
  ];

  return (
    <ProductDetailTemplate
      seoTitle="WL-20物流无人机 - 城际物流配送解决方案"
      seoTitleEn="WL-20 Logistics Drone - Inter-city Delivery Solution"
      seoDescription="WL-20中型物流无人机，20kg载重，50km航程，适用于城际快递、医疗物资运输等场景"
      seoDescriptionEn="WL-20 medium logistics drone with 20kg payload and 50km range for inter-city express and medical transport"
      seoKeywords="物流无人机,城际配送,医疗物流,WL-20,无人机配送"
      breadcrumbs={[
        { label: "首页", labelEn: "Home", path: "/" },
        { label: "物流无人机", labelEn: "Logistics Drones", path: "/products/logistics" },
        { label: "WL-20物流无人机", labelEn: "WL-20 Drone" },
      ]}
      heroTitle="WL-20物流无人机"
      heroTitleEn="WL-20 Logistics Drone"
      heroDescription="中型物流配送平台，适用于城际快递和医疗物资运输，满足中等距离配送需求。强大的载荷能力和续航性能，是城际物流的最佳选择。"
      heroDescriptionEn="Medium logistics platform for inter-city express and medical transport. Powerful payload capacity and endurance make it the best choice for inter-city logistics."
      heroImage="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80"
      heroHighlight={{ value: "20kg", label: "最大载重", labelEn: "Max Payload" }}
      backLink={{ label: "返回物流无人机", labelEn: "Back to Logistics", path: "/products/logistics" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle="了解更多WL-20解决方案"
      ctaTitleEn="Learn More About WL-20 Solutions"
      ctaDescription="联系我们的专业团队，获取定制化配置方案和详细报价"
      ctaDescriptionEn="Contact our professional team for customized configuration and detailed quotation"
    />
  );
};

export default WL20;
