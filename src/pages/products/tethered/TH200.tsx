import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Radio, Weight, Clock, Navigation, Layers, Cpu, Thermometer, Zap, Sun, Camera } from "lucide-react";

import th200Hero from "@/assets/products/th-200-hero.png";

const TH200 = () => {
  const specs = [
    { label: "轴距", labelEn: "Wheelbase", value: "1200mm", valueEn: "1200mm" },
    { label: "最大载荷", labelEn: "Max Payload", value: "10kg", valueEn: "10kg" },
    { label: "展开尺寸", labelEn: "Unfolded Size", value: "1000×1000×600mm", valueEn: "1000×1000×600mm" },
    { label: "折叠尺寸", labelEn: "Folded Size", value: "620×620×600mm", valueEn: "620×620×600mm" },
    { label: "机身重量", labelEn: "Body Weight", value: "11kg（不含电池）", valueEn: "11kg (without battery)" },
    { label: "最大起飞重量", labelEn: "Max Takeoff Weight", value: "29kg", valueEn: "29kg" },
    { label: "最大飞行速度", labelEn: "Max Flight Speed", value: "上升5m/s 下降3m/s 水平15m/s", valueEn: "Ascent 5m/s, Descent 3m/s, Horizontal 15m/s" },
    { label: "最大抗风", labelEn: "Wind Resistance", value: "15m/s（7级）", valueEn: "15m/s (Level 7)" },
    { label: "续航时间", labelEn: "Flight Time", value: "60min空载/系留24h", valueEn: "60min empty / 24h tethered" },
    { label: "最大飞行高度", labelEn: "Max Flight Altitude", value: "1000米", valueEn: "1000m" },
    { label: "最大飞行海拔", labelEn: "Max Elevation", value: "5000米", valueEn: "5000m" },
    { label: "控制距离", labelEn: "Control Range", value: "15km", valueEn: "15km" },
    { label: "定位精度", labelEn: "Positioning Accuracy", value: "RTK厘米级", valueEn: "RTK cm-level" },
    { label: "防水等级", labelEn: "Waterproof", value: "防中雨", valueEn: "Moderate rain resistant" },
    { label: "工作温度", labelEn: "Operating Temp", value: "-20°C ~ 55°C", valueEn: "-20°C ~ 55°C" },
  ];

  const features = [
    { icon: Radio, title: "通信中继", titleEn: "Comm Relay", description: "200米高度5公里覆盖", descriptionEn: "5km coverage at 200m altitude" },
    { icon: Weight, title: "10kg载荷", titleEn: "10kg Payload", description: "支持多种专业载荷", descriptionEn: "Multiple professional payloads supported" },
    { icon: Clock, title: "24小时滞空", titleEn: "24h Flight", description: "系留模式不间断工作", descriptionEn: "Continuous tethered operation" },
    { icon: Navigation, title: "高精度定位", titleEn: "High Precision", description: "RTK厘米级定位", descriptionEn: "RTK cm-level positioning" },
    { icon: Thermometer, title: "高效散热", titleEn: "Efficient Cooling", description: "离心式风冷系统", descriptionEn: "Centrifugal air cooling system" },
    { icon: Zap, title: "强劲动力", titleEn: "Powerful", description: "Ultra Carbon Pro碳纤维桨叶", descriptionEn: "Ultra Carbon Pro propellers" },
    { icon: Sun, title: "应急照明", titleEn: "Emergency Lighting", description: "4组20000流明矩阵灯", descriptionEn: "4 groups 20000 lumen matrix lights" },
    { icon: Camera, title: "多载荷适配", titleEn: "Multi-Payload", description: "变焦/红外/跟踪/喊话等", descriptionEn: "Zoom/IR/Tracking/Speaker etc." },
  ];

  const applications = [
    { zh: "应急照明作业", en: "Emergency Lighting" },
    { zh: "通信中继保障", en: "Communication Relay" },
    { zh: "安防监控巡逻", en: "Security Surveillance" },
    { zh: "大型活动保障", en: "Event Security" },
    { zh: "消防救援支援", en: "Fire & Rescue" },
    { zh: "偏远地区信号覆盖", en: "Remote Area Coverage" },
  ];

  return (
    <ProductDetailTemplate
      seoTitle="TH-200系留照明无人机 - 专业系留平台解决方案"
      seoTitleEn="TH-200 Tethered Lighting Drone - Professional Tethered Platform"
      seoDescription="TH-200系留照明无人机，200米升空高度，10kg载荷，24小时不间断滞空，适用于应急照明、通信中继等场景"
      seoDescriptionEn="TH-200 tethered lighting drone, 200m altitude, 10kg payload, 24-hour continuous flight for emergency lighting and communication relay"
      seoKeywords="系留无人机,TH-200,应急照明,通信中继,系留平台"
      breadcrumbs={[
        { label: "首页", labelEn: "Home", path: "/" },
        { label: "系留无人机", labelEn: "Tethered Drones", path: "/products/tethered" },
        { label: "TH-200系留照明无人机", labelEn: "TH-200 Drone" },
      ]}
      heroTitle="TH-200系留照明无人机"
      heroTitleEn="TH-200 Tethered Lighting Drone"
      heroDescription="工业级系留照明平台，10kg载荷能力，24小时持续滞空。配备4组20000流明矩阵灯，有效照明面积约10000平方米，适用于应急照明、通信中继等专业场景。"
      heroDescriptionEn="Industrial-grade tethered lighting platform with 10kg payload and 24-hour continuous flight. Equipped with 4 groups of 20000 lumen matrix lights covering approximately 10000 square meters, ideal for emergency lighting and communication relay."
      heroImage={th200Hero}
      heroHighlight={{ value: "24h", label: "持续滞空", labelEn: "Continuous Flight" }}
      backLink={{ label: "返回系留无人机", labelEn: "Back to Tethered", path: "/products/tethered" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle="了解更多TH-200解决方案"
      ctaTitleEn="Learn More About TH-200 Solutions"
      ctaDescription="联系我们的专业团队，获取定制化配置方案和详细报价"
      ctaDescriptionEn="Contact our professional team for customized configuration and detailed quotation"
    />
  );
};

export default TH200;
