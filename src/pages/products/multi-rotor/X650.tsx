import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Camera, Settings, Shield, Cpu, Zap, Wind } from "lucide-react";

const X650 = () => {
  const specs = [
    { label: "轴距", labelEn: "Wheelbase", value: "650mm", valueEn: "650mm" },
    { label: "最大载重", labelEn: "Max Payload", value: "2kg", valueEn: "2kg" },
    { label: "续航时间", labelEn: "Flight Time", value: "35分钟", valueEn: "35 min" },
    { label: "抗风等级", labelEn: "Wind Resistance", value: "5级", valueEn: "Level 5" },
    { label: "飞行速度", labelEn: "Flight Speed", value: "54km/h", valueEn: "54km/h" },
    { label: "控制距离", labelEn: "Control Range", value: "5km", valueEn: "5km" },
    { label: "工作温度", labelEn: "Operating Temp", value: "-20°C~50°C", valueEn: "-20°C~50°C" },
    { label: "防护等级", labelEn: "Protection", value: "IP54", valueEn: "IP54" },
  ];

  const features = [
    { icon: Camera, title: "紧凑便携", titleEn: "Compact & Portable", description: "650mm轴距，便于携带运输，快速机动", descriptionEn: "650mm wheelbase, easy to carry and transport" },
    { icon: Settings, title: "快速部署", titleEn: "Quick Deployment", description: "5分钟完成飞行准备，响应迅速", descriptionEn: "Ready to fly in 5 minutes, fast response" },
    { icon: Shield, title: "稳定可靠", titleEn: "Stable & Reliable", description: "工业级飞控系统，稳定性强", descriptionEn: "Industrial-grade flight control system" },
    { icon: Cpu, title: "智能飞控", titleEn: "Smart Control", description: "自主避障导航，智能化操控", descriptionEn: "Autonomous obstacle avoidance navigation" },
    { icon: Zap, title: "长续航", titleEn: "Long Endurance", description: "35分钟持续飞行，满足常规任务", descriptionEn: "35 minutes continuous flight" },
    { icon: Wind, title: "抗风性好", titleEn: "Wind Resistant", description: "5级风稳定作业，适应多种环境", descriptionEn: "Stable operation in level 5 wind" },
  ];

  const applications = [
    { zh: "日常巡检作业", en: "Routine Inspection" },
    { zh: "数据采集分析", en: "Data Collection" },
    { zh: "现场勘察调研", en: "Field Survey" },
    { zh: "小型测绘任务", en: "Small Mapping" },
    { zh: "安防监控巡逻", en: "Security Patrol" },
    { zh: "教学培训演练", en: "Training & Education" },
  ];

  return (
    <ProductDetailTemplate
      seoTitle="X650多旋翼无人机 - 紧凑型工业无人机"
      seoTitleEn="X650 Multi-Rotor Drone - Compact Industrial UAV"
      seoDescription="X650紧凑型工业无人机，650mm轴距，2kg载重，适用于日常巡检、数据采集等场景"
      seoDescriptionEn="X650 compact industrial drone with 650mm wheelbase and 2kg payload, ideal for routine inspection and data collection"
      seoKeywords="多旋翼无人机,X650,工业无人机,巡检无人机"
      breadcrumbs={[
        { label: "首页", labelEn: "Home", path: "/" },
        { label: "多旋翼无人机", labelEn: "Multi-Rotor Drones", path: "/products/multi-rotor" },
        { label: "X650多旋翼无人机", labelEn: "X650 Drone" },
      ]}
      heroTitle="X650多旋翼无人机"
      heroTitleEn="X650 Multi-Rotor Drone"
      heroDescription="紧凑型工业无人机，适用于日常巡检和数据采集任务。便携性强，快速部署，是入门级工业应用的理想选择。"
      heroDescriptionEn="Compact industrial drone for routine inspection and data collection. Highly portable with quick deployment, ideal for entry-level industrial applications."
      heroImage="https://images.unsplash.com/photo-1506947411487-a56738267384?w=1200&q=80"
      heroHighlight={{ value: "650mm", label: "轴距", labelEn: "Wheelbase" }}
      backLink={{ label: "返回多旋翼无人机", labelEn: "Back to Multi-Rotor", path: "/products/multi-rotor" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle="了解更多X650解决方案"
      ctaTitleEn="Learn More About X650 Solutions"
      ctaDescription="联系我们的专业团队，获取定制化配置方案和详细报价"
      ctaDescriptionEn="Contact our professional team for customized configuration and detailed quotation"
    />
  );
};

export default X650;
