import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Camera, Settings, Shield, Cpu, Zap, Wind } from "lucide-react";

const X1200 = () => {
  const specs = [
    { label: "轴距", labelEn: "Wheelbase", value: "1200mm", valueEn: "1200mm" },
    { label: "最大载重", labelEn: "Max Payload", value: "10kg", valueEn: "10kg" },
    { label: "续航时间", labelEn: "Flight Time", value: "55分钟", valueEn: "55 min" },
    { label: "抗风等级", labelEn: "Wind Resistance", value: "7级", valueEn: "Level 7" },
    { label: "飞行速度", labelEn: "Flight Speed", value: "65km/h", valueEn: "65km/h" },
    { label: "控制距离", labelEn: "Control Range", value: "10km", valueEn: "10km" },
    { label: "工作温度", labelEn: "Operating Temp", value: "-20°C~50°C", valueEn: "-20°C~50°C" },
    { label: "防护等级", labelEn: "Protection", value: "IP54", valueEn: "IP54" },
  ];

  const features = [
    { icon: Camera, title: "重型载荷", titleEn: "Heavy Payload", description: "10kg支持专业级设备挂载", descriptionEn: "10kg supports professional-grade equipment" },
    { icon: Settings, title: "多载荷支持", titleEn: "Multi-Payload", description: "支持多种专业载荷同时挂载", descriptionEn: "Supports multiple payloads simultaneously" },
    { icon: Shield, title: "极高可靠性", titleEn: "Ultra Reliability", description: "双冗余飞控系统，安全保障", descriptionEn: "Dual redundant flight control system" },
    { icon: Cpu, title: "智能系统", titleEn: "Smart System", description: "AI智能识别，自动化作业", descriptionEn: "AI recognition, automated operations" },
    { icon: Zap, title: "超长续航", titleEn: "Ultra Endurance", description: "55分钟持续作业，效率卓越", descriptionEn: "55 minutes continuous operation" },
    { icon: Wind, title: "超强抗风", titleEn: "Ultra Wind Resistance", description: "7级风稳定飞行，全天候作业", descriptionEn: "Stable in level 7 wind, all-weather operation" },
  ];

  const applications = [
    { zh: "专业测绘制图", en: "Professional Mapping" },
    { zh: "重型巡检任务", en: "Heavy Inspection" },
    { zh: "应急救援支援", en: "Emergency Rescue" },
    { zh: "科研探测分析", en: "Scientific Research" },
    { zh: "农业植保作业", en: "Agricultural Spraying" },
    { zh: "环境监测评估", en: "Environmental Assessment" },
  ];

  return (
    <ProductDetailTemplate
      seoTitle="X1200多旋翼无人机 - 大型工业无人机"
      seoTitleEn="X1200 Multi-Rotor Drone - Large Industrial UAV"
      seoDescription="X1200大型工业无人机，10kg载重，55分钟续航，适用于专业测绘、应急救援等场景"
      seoDescriptionEn="X1200 large industrial drone with 10kg payload and 55-minute flight time for professional mapping and emergency rescue"
      seoKeywords="多旋翼无人机,X1200,专业测绘,应急救援"
      breadcrumbs={[
        { label: "首页", labelEn: "Home", path: "/" },
        { label: "多旋翼无人机", labelEn: "Multi-Rotor Drones", path: "/products/multi-rotor" },
        { label: "X1200多旋翼无人机", labelEn: "X1200 Drone" },
      ]}
      heroTitle="X1200多旋翼无人机"
      heroTitleEn="X1200 Multi-Rotor Drone"
      heroDescription="大型工业无人机，适用于重型载荷和长航时任务，是专业级应用的理想选择。55分钟超长续航，满足各种复杂任务需求。"
      heroDescriptionEn="Large industrial drone for heavy payloads and long-duration missions. 55 minutes ultra-long endurance meets various complex mission requirements."
      heroImage="https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=1200&q=80"
      heroHighlight={{ value: "10kg", label: "最大载重", labelEn: "Max Payload" }}
      backLink={{ label: "返回多旋翼无人机", labelEn: "Back to Multi-Rotor", path: "/products/multi-rotor" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle="了解更多X1200解决方案"
      ctaTitleEn="Learn More About X1200 Solutions"
      ctaDescription="联系我们的专业团队，获取定制化配置方案和详细报价"
      ctaDescriptionEn="Contact our professional team for customized configuration and detailed quotation"
    />
  );
};

export default X1200;
