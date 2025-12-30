import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Package, Truck, MapPin, Timer, Shield, Zap } from "lucide-react";

const WL30 = () => {
  const specs = [
    { label: "最大载重", value: "30kg" },
    { label: "航程", value: "80km" },
    { label: "巡航速度", value: "100km/h" },
    { label: "续航时间", value: "60分钟" },
    { label: "投递精度", value: "±5cm" },
    { label: "工作温度", value: "-20°C~45°C" },
    { label: "抗风等级", value: "7级" },
    { label: "货舱容积", value: "60L" },
  ];

  const features = [
    { icon: Package, title: "重型载荷", description: "30kg满足大件运输需求，覆盖更多货物类型" },
    { icon: Truck, title: "远程配送", description: "80km航程突破地形限制，连接偏远地区" },
    { icon: MapPin, title: "精准定位", description: "RTK厘米级定位精度，确保精准投递" },
    { icon: Timer, title: "超长续航", description: "60分钟持续飞行能力，完成复杂任务" },
    { icon: Shield, title: "强抗风能力", description: "7级风稳定飞行，适应恶劣天气" },
    { icon: Zap, title: "快速响应", description: "应急物资快速投送，及时救援" },
  ];

  const applications = [
    "偏远地区配送",
    "应急物资投放",
    "山区物资运输",
    "海岛配送服务",
    "灾区救援支援",
    "农产品出山物流",
  ];

  return (
    <ProductDetailTemplate
      seoTitle="WL-30物流无人机 - 重型物流配送解决方案"
      seoDescription="WL-30重型物流无人机，30kg载重，80km航程，适用于偏远地区配送、应急救援等场景"
      seoKeywords="重型物流无人机,偏远地区配送,应急救援,WL-30"
      breadcrumbs={[
        { label: "首页", path: "/" },
        { label: "物流无人机", path: "/products/logistics" },
        { label: "WL-30物流无人机" },
      ]}
      heroTitle="WL-30物流无人机"
      heroDescription="重型物流配送平台，适用于偏远地区物资投送和应急救援，突破地形限制，让配送无处不达。强大的载荷和续航能力，是极端环境配送的首选方案。"
      heroImage="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80"
      heroHighlight={{ value: "30kg", label: "最大载重" }}
      backLink={{ label: "返回物流无人机", path: "/products/logistics" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle="了解更多WL-30解决方案"
      ctaDescription="联系我们的专业团队，获取定制化配置方案和详细报价"
    />
  );
};

export default WL30;
