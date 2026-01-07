import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Camera, Settings, Shield, Cpu, Zap, Wind } from "lucide-react";

const X1600 = () => {
  const specs = [
    { label: "轴距", labelEn: "Wheelbase", value: "1600mm", valueEn: "1600mm" },
    { label: "最大载重", labelEn: "Max Payload", value: "20kg", valueEn: "20kg" },
    { label: "续航时间", labelEn: "Flight Time", value: "40分钟", valueEn: "40 min" },
    { label: "抗风等级", labelEn: "Wind Resistance", value: "6级", valueEn: "Level 6" },
    { label: "飞行速度", labelEn: "Flight Speed", value: "54km/h", valueEn: "54km/h" },
    { label: "控制距离", labelEn: "Control Range", value: "10km", valueEn: "10km" },
    { label: "工作温度", labelEn: "Operating Temp", value: "-20°C~50°C", valueEn: "-20°C~50°C" },
    { label: "防护等级", labelEn: "Protection", value: "IP54", valueEn: "IP54" },
  ];

  const features = [
    { icon: Camera, title: "超重载荷", titleEn: "Ultra Heavy Payload", description: "20kg支持特殊任务载荷挂载", descriptionEn: "20kg supports special mission payloads" },
    { icon: Settings, title: "专业定制", titleEn: "Custom Solutions", description: "支持定制化配置，满足特殊需求", descriptionEn: "Customizable configuration for special requirements" },
    { icon: Shield, title: "工业级品质", titleEn: "Industrial Quality", description: "满足严苛工业环境要求", descriptionEn: "Meets harsh industrial environment requirements" },
    { icon: Cpu, title: "高精度定位", titleEn: "High-Precision", description: "RTK厘米级定位，精准作业", descriptionEn: "RTK centimeter-level positioning" },
    { icon: Zap, title: "大动力系统", titleEn: "High Power System", description: "强劲动力系统，稳定可靠", descriptionEn: "Powerful propulsion system, stable and reliable" },
    { icon: Wind, title: "超强稳定性", titleEn: "Ultra Stability", description: "超大尺寸带来更强稳定性", descriptionEn: "Large size brings enhanced stability" },
  ];

  const applications = [
    { zh: "专业测绘制图", en: "Professional Mapping" },
    { zh: "物资运输配送", en: "Cargo Delivery" },
    { zh: "特种作业任务", en: "Special Operations" },
    { zh: "科研实验支持", en: "Scientific Research" },
    { zh: "重型航拍摄影", en: "Heavy Aerial Photography" },
    { zh: "工业检测分析", en: "Industrial Inspection" },
  ];

  return (
    <ProductDetailTemplate
      seoTitle="X1600多旋翼无人机 - 超大型工业无人机"
      seoTitleEn="X1600 Multi-Rotor Drone - Extra Large Industrial UAV"
      seoDescription="X1600超大型工业无人机，20kg载重，适用于专业测绘、物资运输等特殊场景"
      seoDescriptionEn="X1600 extra large industrial drone with 20kg payload for professional mapping and cargo transport"
      seoKeywords="多旋翼无人机,X1600,重型载荷,物资运输"
      breadcrumbs={[
        { label: "首页", labelEn: "Home", path: "/" },
        { label: "多旋翼无人机", labelEn: "Multi-Rotor Drones", path: "/products/multi-rotor" },
        { label: "X1600多旋翼无人机", labelEn: "X1600 Drone" },
      ]}
      heroTitle="X1600多旋翼无人机"
      heroTitleEn="X1600 Multi-Rotor Drone"
      heroDescription="超大型工业无人机，满足特殊行业的超重载荷需求。20kg最大载重，适用于专业测绘、物资运输等特殊场景。"
      heroDescriptionEn="Extra large industrial drone for ultra-heavy payload requirements. 20kg max payload, ideal for professional mapping and cargo transport."
      heroImage="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1200&q=80"
      heroHighlight={{ value: "20kg", label: "最大载重", labelEn: "Max Payload" }}
      backLink={{ label: "返回多旋翼无人机", labelEn: "Back to Multi-Rotor", path: "/products/multi-rotor" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle="了解更多X1600解决方案"
      ctaTitleEn="Learn More About X1600 Solutions"
      ctaDescription="联系我们的专业团队，获取定制化配置方案和详细报价"
      ctaDescriptionEn="Contact our professional team for customized configuration and detailed quotation"
    />
  );
};

export default X1600;
