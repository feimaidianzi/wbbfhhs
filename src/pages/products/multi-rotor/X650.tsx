import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Camera, Settings, Shield, Cpu, Zap, Wind } from "lucide-react";

const X650 = () => {
  const specs = [
    { label: "轴距", value: "650mm" },
    { label: "最大载重", value: "2kg" },
    { label: "续航时间", value: "35分钟" },
    { label: "抗风等级", value: "5级" },
    { label: "飞行速度", value: "54km/h" },
    { label: "控制距离", value: "5km" },
    { label: "工作温度", value: "-20°C~50°C" },
    { label: "防护等级", value: "IP54" },
  ];

  const features = [
    { icon: Camera, title: "紧凑便携", description: "650mm轴距，便于携带运输，快速机动" },
    { icon: Settings, title: "快速部署", description: "5分钟完成飞行准备，响应迅速" },
    { icon: Shield, title: "稳定可靠", description: "工业级飞控系统，稳定性强" },
    { icon: Cpu, title: "智能飞控", description: "自主避障导航，智能化操控" },
    { icon: Zap, title: "长续航", description: "35分钟持续飞行，满足常规任务" },
    { icon: Wind, title: "抗风性好", description: "5级风稳定作业，适应多种环境" },
  ];

  const applications = ["日常巡检作业", "数据采集分析", "现场勘察调研", "小型测绘任务", "安防监控巡逻", "教学培训演练"];

  return (
    <ProductDetailTemplate
      seoTitle="X650多旋翼无人机 - 紧凑型工业无人机"
      seoDescription="X650紧凑型工业无人机，650mm轴距，2kg载重，适用于日常巡检、数据采集等场景"
      seoKeywords="多旋翼无人机,X650,工业无人机,巡检无人机"
      breadcrumbs={[
        { label: "首页", path: "/" },
        { label: "多旋翼无人机", path: "/products/multi-rotor" },
        { label: "X650多旋翼无人机" },
      ]}
      heroTitle="X650多旋翼无人机"
      heroDescription="紧凑型工业无人机，适用于日常巡检和数据采集任务。便携性强，快速部署，是入门级工业应用的理想选择。"
      heroImage="https://images.unsplash.com/photo-1506947411487-a56738267384?w=1200&q=80"
      heroHighlight={{ value: "650mm", label: "轴距" }}
      backLink={{ label: "返回多旋翼无人机", path: "/products/multi-rotor" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle="了解更多X650解决方案"
      ctaDescription="联系我们的专业团队，获取定制化配置方案和详细报价"
    />
  );
};

export default X650;
