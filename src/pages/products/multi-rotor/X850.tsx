import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Camera, Settings, Shield, Cpu, Zap, Wind } from "lucide-react";

const X850 = () => {
  const specs = [
    { label: "轴距", labelEn: "Wheelbase", value: "850mm", valueEn: "850mm" },
    { label: "最大载重", labelEn: "Max Payload", value: "5kg", valueEn: "5kg" },
    { label: "续航时间", labelEn: "Flight Time", value: "45分钟", valueEn: "45 min" },
    { label: "抗风等级", labelEn: "Wind Resistance", value: "6级", valueEn: "Level 6" },
    { label: "飞行速度", labelEn: "Flight Speed", value: "72km/h", valueEn: "72km/h" },
    { label: "控制距离", labelEn: "Control Range", value: "8km", valueEn: "8km" },
    { label: "工作温度", labelEn: "Operating Temp", value: "-20°C~50°C", valueEn: "-20°C~50°C" },
    { label: "防护等级", labelEn: "Protection", value: "IP54", valueEn: "IP54" },
  ];

  const features = [
    { icon: Camera, title: "专业载荷", titleEn: "Professional Payload", description: "5kg载重支持专业设备挂载", descriptionEn: "5kg payload supports professional equipment" },
    { icon: Settings, title: "模块化设计", titleEn: "Modular Design", description: "快速更换多种载荷，灵活配置", descriptionEn: "Quick payload replacement, flexible configuration" },
    { icon: Shield, title: "高可靠性", titleEn: "High Reliability", description: "工业级冗余设计，安全可靠", descriptionEn: "Industrial-grade redundancy design" },
    { icon: Cpu, title: "智能避障", titleEn: "Smart Avoidance", description: "360°全向感知，自主避障", descriptionEn: "360° omnidirectional sensing, autonomous avoidance" },
    { icon: Zap, title: "长续航", titleEn: "Long Endurance", description: "45分钟持续作业，效率更高", descriptionEn: "45 minutes continuous operation" },
    { icon: Wind, title: "强抗风", titleEn: "Strong Wind Resistance", description: "6级风稳定飞行，适应恶劣环境", descriptionEn: "Stable in level 6 wind, adapts to harsh conditions" },
  ];

  const applications = [
    { zh: "电力巡检作业", en: "Power Line Inspection" },
    { zh: "管道巡护监测", en: "Pipeline Monitoring" },
    { zh: "公安执法支援", en: "Law Enforcement" },
    { zh: "消防侦察救援", en: "Fire & Rescue" },
    { zh: "测绘勘察任务", en: "Surveying & Mapping" },
    { zh: "环保监测分析", en: "Environmental Monitoring" },
  ];

  return (
    <ProductDetailTemplate
      seoTitle="X850多旋翼无人机 - 中型工业无人机"
      seoTitleEn="X850 Multi-Rotor Drone - Medium Industrial UAV"
      seoDescription="X850中型工业无人机，5kg载重，45分钟续航，适用于电力巡检、公安执法等场景"
      seoDescriptionEn="X850 medium industrial drone with 5kg payload and 45-minute flight time for power inspection and law enforcement"
      seoKeywords="多旋翼无人机,X850,电力巡检,工业无人机"
      breadcrumbs={[
        { label: "首页", labelEn: "Home", path: "/" },
        { label: "多旋翼无人机", labelEn: "Multi-Rotor Drones", path: "/products/multi-rotor" },
        { label: "X850多旋翼无人机", labelEn: "X850 Drone" },
      ]}
      heroTitle="X850多旋翼无人机"
      heroTitleEn="X850 Multi-Rotor Drone"
      heroDescription="中型工业无人机，具备更强载荷能力和更长续航时间，满足专业级作业需求。是电力巡检、公安执法等场景的可靠选择。"
      heroDescriptionEn="Medium industrial drone with enhanced payload capacity and longer flight time. A reliable choice for power inspection and law enforcement."
      heroImage="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80"
      heroHighlight={{ value: "5kg", label: "最大载重", labelEn: "Max Payload" }}
      backLink={{ label: "返回多旋翼无人机", labelEn: "Back to Multi-Rotor", path: "/products/multi-rotor" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle="了解更多X850解决方案"
      ctaTitleEn="Learn More About X850 Solutions"
      ctaDescription="联系我们的专业团队，获取定制化配置方案和详细报价"
      ctaDescriptionEn="Contact our professional team for customized configuration and detailed quotation"
    />
  );
};

export default X850;
