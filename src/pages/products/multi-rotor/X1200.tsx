import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Camera, Settings, Shield, Cpu, Zap, Wind } from "lucide-react";

const X1200 = () => {
  const specs = [
    { label: "轴距", value: "1200mm" },
    { label: "最大载重", value: "10kg" },
    { label: "续航时间", value: "55分钟" },
    { label: "抗风等级", value: "7级" },
    { label: "飞行速度", value: "65km/h" },
    { label: "控制距离", value: "10km" },
    { label: "工作温度", value: "-20°C~50°C" },
    { label: "防护等级", value: "IP54" },
  ];

  const features = [
    { icon: Camera, title: "重型载荷", description: "10kg支持专业级设备挂载" },
    { icon: Settings, title: "多载荷支持", description: "支持多种专业载荷同时挂载" },
    { icon: Shield, title: "极高可靠性", description: "双冗余飞控系统，安全保障" },
    { icon: Cpu, title: "智能系统", description: "AI智能识别，自动化作业" },
    { icon: Zap, title: "超长续航", description: "55分钟持续作业，效率卓越" },
    { icon: Wind, title: "超强抗风", description: "7级风稳定飞行，全天候作业" },
  ];

  const applications = ["专业测绘制图", "重型巡检任务", "应急救援支援", "科研探测分析", "农业植保作业", "环境监测评估"];

  return (
    <ProductDetailTemplate
      seoTitle="X1200多旋翼无人机 - 大型工业无人机"
      seoDescription="X1200大型工业无人机，10kg载重，55分钟续航，适用于专业测绘、应急救援等场景"
      seoKeywords="多旋翼无人机,X1200,专业测绘,应急救援"
      breadcrumbs={[
        { label: "首页", path: "/" },
        { label: "多旋翼无人机", path: "/products/multi-rotor" },
        { label: "X1200多旋翼无人机" },
      ]}
      heroTitle="X1200多旋翼无人机"
      heroDescription="大型工业无人机，适用于重型载荷和长航时任务，是专业级应用的理想选择。55分钟超长续航，满足各种复杂任务需求。"
      heroImage="https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=1200&q=80"
      heroHighlight={{ value: "10kg", label: "最大载重" }}
      backLink={{ label: "返回多旋翼无人机", path: "/products/multi-rotor" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle="了解更多X1200解决方案"
      ctaDescription="联系我们的专业团队，获取定制化配置方案和详细报价"
    />
  );
};

export default X1200;
