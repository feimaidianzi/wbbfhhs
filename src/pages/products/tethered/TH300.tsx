import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Clock, Zap, Shield, Radio, Eye, Settings, Plane, Target, Volume2, Lightbulb, Flame, Battery } from "lucide-react";

import th300Drone from "@/assets/products/th-300-drone.png";

const TH300 = () => {
  const specs = [
    { label: "对称电机轴距", labelEn: "Motor Wheelbase", value: "1380mm", valueEn: "1380mm" },
    { label: "展开尺寸", labelEn: "Unfolded Size", value: "1480×1480×550mm", valueEn: "1480×1480×550mm" },
    { label: "折叠尺寸", labelEn: "Folded Size", value: "500×500×550mm", valueEn: "500×500×550mm" },
    { label: "桨叶规格", labelEn: "Propeller Size", value: "直径×螺距: 36×7 inch", valueEn: "Diameter×Pitch: 36×7 inch" },
    { label: "最大载重", labelEn: "Max Payload", value: "≥20KG", valueEn: "≥20KG" },
    { label: "标准飞行时间", labelEn: "Flight Time", value: "≥40分钟（空载）", valueEn: "≥40min (empty)" },
    { label: "充电时间", labelEn: "Charging Time", value: "50分钟", valueEn: "50 minutes" },
    { label: "最大抗风", labelEn: "Wind Resistance", value: "7级", valueEn: "Level 7" },
    { label: "飞行海拔", labelEn: "Flight Elevation", value: "≥4000米", valueEn: "≥4000m" },
    { label: "飞行高度", labelEn: "Flight Altitude", value: "≥2000米", valueEn: "≥2000m" },
    { label: "最大控制距离", labelEn: "Control Range", value: "20KM", valueEn: "20KM" },
    { label: "悬停精度", labelEn: "Hover Accuracy", value: "垂直/水平: ±0.5m", valueEn: "Vertical/Horizontal: ±0.5m" },
    { label: "防护等级", labelEn: "Protection Rating", value: "IP56 防尘防水", valueEn: "IP56 Dust/Water Resistant" },
    { label: "机身材料", labelEn: "Body Material", value: "碳纤维材料", valueEn: "Carbon Fiber" },
    { label: "部署时间", labelEn: "Deployment Time", value: "≤1分钟（2人）", valueEn: "≤1 min (2 persons)" },
    { label: "工作温度", labelEn: "Operating Temp", value: "-40℃至+70℃", valueEn: "-40°C to +70°C" },
  ];

  const features = [
    { icon: Plane, title: "大载重能力", titleEn: "Heavy Payload", description: "≥20KG最大载重，支持多载荷同时挂载", descriptionEn: "≥20KG max payload, supports multiple payloads simultaneously" },
    { icon: Shield, title: "IP56防护", titleEn: "IP56 Protection", description: "防尘防水设计，可在中雨天气飞行", descriptionEn: "Dust and water resistant, flies in moderate rain" },
    { icon: Radio, title: "远程控制", titleEn: "Remote Control", description: "20KM最大控制距离，三重卫星定位", descriptionEn: "20KM max range, triple satellite positioning" },
    { icon: Clock, title: "长续航", titleEn: "Long Endurance", description: "≥40分钟空载飞行时间", descriptionEn: "≥40min empty flight time" },
    { icon: Settings, title: "快速部署", titleEn: "Quick Deployment", description: "折叠设计，2人≤1分钟完成部署", descriptionEn: "Foldable design, deploys in ≤1 min with 2 persons" },
    { icon: Eye, title: "高海拔作业", titleEn: "High Altitude", description: "飞行海拔≥4000米，适应高原环境", descriptionEn: "Flight elevation ≥4000m, suitable for plateau" },
    { icon: Lightbulb, title: "探照灯", titleEn: "Searchlight", description: "200W功率，≥1000米照射距离", descriptionEn: "200W power, ≥1000m illumination range" },
    { icon: Volume2, title: "智能喊话器", titleEn: "Smart Speaker", description: "180分贝，≥600米传播距离", descriptionEn: "180dB, ≥600m broadcast range" },
    { icon: Flame, title: "灭火球抛投", titleEn: "Fire Ball Launcher", description: "搭载4枚灭火弹，遇火自爆", descriptionEn: "4 fire balls, auto-detonates on fire" },
    { icon: Battery, title: "高压固态电池", titleEn: "Solid-State Battery", description: "61V 31000mAh，适应≥6000米海拔", descriptionEn: "61V 31000mAh, suitable for ≥6000m altitude" },
  ];

  const applications = [
    { zh: "巡查监控作业", en: "Patrol Monitoring" },
    { zh: "应急喊话广播", en: "Emergency Announcement" },
    { zh: "夜间照明支援", en: "Night Lighting" },
    { zh: "森林消防救援", en: "Forest Firefighting" },
    { zh: "安防巡逻监视", en: "Security Patrol" },
    { zh: "搜救行动支援", en: "Search & Rescue" },
  ];

  return (
    <ProductDetailTemplate
      seoTitle="TH-300系留消防无人机 - 巡查/喊话/照明/消防多功能平台"
      seoTitleEn="TH-300 Tethered Firefighting Drone - Multi-function Platform"
      seoDescription="TH-300系留消防无人机，1380mm轴距，≥20KG载重，40分钟续航，支持探照灯、喊话器、灭火球等多任务载荷"
      seoDescriptionEn="TH-300 tethered firefighting drone, 1380mm wheelbase, ≥20KG payload, 40min endurance, supports searchlight, speaker, fire extinguishing balls and more"
      seoKeywords="系留消防无人机,TH-300,巡查无人机,喊话无人机,照明无人机,消防无人机"
      breadcrumbs={[
        { label: "首页", labelEn: "Home", path: "/" },
        { label: "系留无人机", labelEn: "Tethered Drones", path: "/products/tethered" },
        { label: "TH-300系留消防无人机", labelEn: "TH-300 Drone" },
      ]}
      heroTitle="TH-300系留消防无人机"
      heroTitleEn="TH-300 Tethered Firefighting Drone"
      heroDescription="巡查、喊话、照明、消防多功能平台，≥20KG大载重能力，支持多种任务载荷同时挂载，7级抗风稳定飞行，IP56防护等级适应复杂环境。"
      heroDescriptionEn="Multi-function platform for patrol, announcement, lighting, and firefighting. ≥20KG heavy payload capacity, supports multiple task payloads simultaneously, Level 7 wind resistance for stable flight, IP56 protection for complex environments."
      heroImage={th300Drone}
      heroHighlight={{ value: "20KG", label: "最大载重", labelEn: "Max Payload" }}
      backLink={{ label: "返回系留无人机", labelEn: "Back to Tethered", path: "/products/tethered" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle="了解更多TH-300解决方案"
      ctaTitleEn="Learn More About TH-300 Solutions"
      ctaDescription="联系我们的专业团队，获取定制化配置方案和详细报价"
      ctaDescriptionEn="Contact our professional team for customized configuration and detailed quotation"
    />
  );
};

export default TH300;
