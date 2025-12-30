import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Camera, Settings, Shield, Cpu, Zap, Wind } from "lucide-react";

const X850 = () => {
  const specs = [
    { label: "轴距", value: "850mm" },
    { label: "最大载重", value: "5kg" },
    { label: "续航时间", value: "45分钟" },
    { label: "抗风等级", value: "6级" },
    { label: "飞行速度", value: "72km/h" },
    { label: "控制距离", value: "8km" },
    { label: "工作温度", value: "-20°C~50°C" },
    { label: "防护等级", value: "IP54" },
  ];

  const features = [
    { icon: Camera, title: "专业载荷", description: "5kg载重支持专业设备挂载" },
    { icon: Settings, title: "模块化设计", description: "快速更换多种载荷，灵活配置" },
    { icon: Shield, title: "高可靠性", description: "工业级冗余设计，安全可靠" },
    { icon: Cpu, title: "智能避障", description: "360°全向感知，自主避障" },
    { icon: Zap, title: "长续航", description: "45分钟持续作业，效率更高" },
    { icon: Wind, title: "强抗风", description: "6级风稳定飞行，适应恶劣环境" },
  ];

  const applications = ["电力巡检作业", "管道巡护监测", "公安执法支援", "消防侦察救援", "测绘勘察任务", "环保监测分析"];

  return (
    <ProductDetailTemplate
      seoTitle="X850多旋翼无人机 - 中型工业无人机"
      seoDescription="X850中型工业无人机，5kg载重，45分钟续航，适用于电力巡检、公安执法等场景"
      seoKeywords="多旋翼无人机,X850,电力巡检,工业无人机"
      breadcrumbs={[
        { label: "首页", path: "/" },
        { label: "多旋翼无人机", path: "/products/multi-rotor" },
        { label: "X850多旋翼无人机" },
      ]}
      heroTitle="X850多旋翼无人机"
      heroDescription="中型工业无人机，具备更强载荷能力和更长续航时间，满足专业级作业需求。是电力巡检、公安执法等场景的可靠选择。"
      heroImage="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80"
      heroHighlight={{ value: "5kg", label: "最大载重" }}
      backLink={{ label: "返回多旋翼无人机", path: "/products/multi-rotor" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle="了解更多X850解决方案"
      ctaDescription="联系我们的专业团队，获取定制化配置方案和详细报价"
    />
  );
};

export default X850;
