import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Package, Truck, MapPin, Timer, Shield, Zap } from "lucide-react";

const WL30 = () => {
  const specs = [
    { label: "最大载重", labelEn: "Max Payload", value: "30kg", valueEn: "30kg" },
    { label: "航程", labelEn: "Range", value: "80km", valueEn: "80km" },
    { label: "巡航速度", labelEn: "Cruise Speed", value: "100km/h", valueEn: "100km/h" },
    { label: "续航时间", labelEn: "Flight Time", value: "60分钟", valueEn: "60 min" },
    { label: "投递精度", labelEn: "Delivery Accuracy", value: "±5cm", valueEn: "±5cm" },
    { label: "工作温度", labelEn: "Operating Temp", value: "-20°C~45°C", valueEn: "-20°C~45°C" },
    { label: "抗风等级", labelEn: "Wind Resistance", value: "7级", valueEn: "Level 7" },
    { label: "货舱容积", labelEn: "Cargo Volume", value: "60L", valueEn: "60L" },
  ];

  const features = [
    { icon: Package, title: "重型载荷", titleEn: "Heavy Payload", description: "30kg满足大件运输需求，覆盖更多货物类型", descriptionEn: "30kg meets heavy transport needs, covering more cargo types" },
    { icon: Truck, title: "远程配送", titleEn: "Long-Range Delivery", description: "80km航程突破地形限制，连接偏远地区", descriptionEn: "80km range breaks terrain limits, connecting remote areas" },
    { icon: MapPin, title: "精准定位", titleEn: "Precise Positioning", description: "RTK厘米级定位精度，确保精准投递", descriptionEn: "RTK centimeter-level positioning ensures precise delivery" },
    { icon: Timer, title: "超长续航", titleEn: "Ultra Endurance", description: "60分钟持续飞行能力，完成复杂任务", descriptionEn: "60-minute continuous flight for complex missions" },
    { icon: Shield, title: "强抗风能力", titleEn: "Strong Wind Resistance", description: "7级风稳定飞行，适应恶劣天气", descriptionEn: "Stable flight in level 7 wind, adapts to harsh weather" },
    { icon: Zap, title: "快速响应", titleEn: "Quick Response", description: "应急物资快速投送，及时救援", descriptionEn: "Rapid emergency supply delivery for timely rescue" },
  ];

  const applications = [
    { zh: "偏远地区配送", en: "Remote Area Delivery" },
    { zh: "应急物资投放", en: "Emergency Supply Drop" },
    { zh: "山区物资运输", en: "Mountain Supply Transport" },
    { zh: "海岛配送服务", en: "Island Delivery Service" },
    { zh: "灾区救援支援", en: "Disaster Relief Support" },
    { zh: "农产品出山物流", en: "Agricultural Export Logistics" },
  ];

  return (
    <ProductDetailTemplate
      seoTitle="WL-30物流无人机 - 重型物流配送解决方案"
      seoTitleEn="WL-30 Logistics Drone - Heavy Logistics Delivery Solution"
      seoDescription="WL-30重型物流无人机，30kg载重，80km航程，适用于偏远地区配送、应急救援等场景"
      seoDescriptionEn="WL-30 heavy logistics drone with 30kg payload and 80km range for remote area delivery and emergency rescue"
      seoKeywords="重型物流无人机,偏远地区配送,应急救援,WL-30"
      breadcrumbs={[
        { label: "首页", labelEn: "Home", path: "/" },
        { label: "物流无人机", labelEn: "Logistics Drones", path: "/products/logistics" },
        { label: "WL-30物流无人机", labelEn: "WL-30 Drone" },
      ]}
      heroTitle="WL-30物流无人机"
      heroTitleEn="WL-30 Logistics Drone"
      heroDescription="重型物流配送平台，适用于偏远地区物资投送和应急救援，突破地形限制，让配送无处不达。强大的载荷和续航能力，是极端环境配送的首选方案。"
      heroDescriptionEn="Heavy logistics platform for remote area supply delivery and emergency rescue. Breaks terrain limits for delivery anywhere. Powerful payload and endurance make it the top choice for extreme environment delivery."
      heroImage="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80"
      heroHighlight={{ value: "30kg", label: "最大载重", labelEn: "Max Payload" }}
      backLink={{ label: "返回物流无人机", labelEn: "Back to Logistics", path: "/products/logistics" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle="了解更多WL-30解决方案"
      ctaTitleEn="Learn More About WL-30 Solutions"
      ctaDescription="联系我们的专业团队，获取定制化配置方案和详细报价"
      ctaDescriptionEn="Contact our professional team for customized configuration and detailed quotation"
    />
  );
};

export default WL30;
