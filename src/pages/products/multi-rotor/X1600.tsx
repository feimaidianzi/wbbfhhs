import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Camera, Settings, Shield, Cpu, Zap, Wind } from "lucide-react";

const X1600 = () => {
  const specs = [
    { label: "轴距", value: "1600mm" },
    { label: "最大载重", value: "20kg" },
    { label: "续航时间", value: "40分钟" },
    { label: "抗风等级", value: "6级" },
    { label: "飞行速度", value: "54km/h" },
    { label: "控制距离", value: "10km" },
    { label: "工作温度", value: "-20°C~50°C" },
    { label: "防护等级", value: "IP54" },
  ];

  const features = [
    { icon: Camera, title: "超重载荷", description: "20kg支持特殊任务载荷挂载" },
    { icon: Settings, title: "专业定制", description: "支持定制化配置，满足特殊需求" },
    { icon: Shield, title: "工业级品质", description: "满足严苛工业环境要求" },
    { icon: Cpu, title: "高精度定位", description: "RTK厘米级定位，精准作业" },
    { icon: Zap, title: "大动力系统", description: "强劲动力系统，稳定可靠" },
    { icon: Wind, title: "超强稳定性", description: "超大尺寸带来更强稳定性" },
  ];

  const applications = ["专业测绘制图", "物资运输配送", "特种作业任务", "科研实验支持", "重型航拍摄影", "工业检测分析"];

  return (
    <ProductDetailTemplate
      seoTitle="X1600多旋翼无人机 - 超大型工业无人机"
      seoDescription="X1600超大型工业无人机，20kg载重，适用于专业测绘、物资运输等特殊场景"
      seoKeywords="多旋翼无人机,X1600,重型载荷,物资运输"
      breadcrumbs={[
        { label: "首页", path: "/" },
        { label: "多旋翼无人机", path: "/products/multi-rotor" },
        { label: "X1600多旋翼无人机" },
      ]}
      heroTitle="X1600多旋翼无人机"
      heroDescription="超大型工业无人机，满足特殊行业的超重载荷需求。20kg最大载重，适用于专业测绘、物资运输等特殊场景。"
      heroImage="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1200&q=80"
      heroHighlight={{ value: "20kg", label: "最大载重" }}
      backLink={{ label: "返回多旋翼无人机", path: "/products/multi-rotor" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle="了解更多X1600解决方案"
      ctaDescription="联系我们的专业团队，获取定制化配置方案和详细报价"
    />
  );
};

export default X1600;
