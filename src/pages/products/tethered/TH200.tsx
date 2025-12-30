import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Clock, Zap, Shield, Radio, Eye, Settings } from "lucide-react";

const TH200 = () => {
  const specs = [
    { label: "有效载荷", value: "10kg" },
    { label: "升空高度", value: "200m" },
    { label: "抗风等级", value: "7级" },
    { label: "供电功率", value: "3kW" },
    { label: "系留线缆", value: "200m" },
    { label: "工作温度", value: "-20°C~50°C" },
    { label: "部署时间", value: "<8分钟" },
    { label: "连续工作", value: "24小时" },
  ];

  const features = [
    { icon: Clock, title: "长期部署", description: "适用于长时间持续任务，稳定可靠运行" },
    { icon: Zap, title: "大功率供电", description: "3kW供电能力，支持更多专业载荷设备" },
    { icon: Shield, title: "强抗风性", description: "7级风稳定作业，适应恶劣天气环境" },
    { icon: Radio, title: "多载荷支持", description: "支持多种任务载荷，灵活配置" },
    { icon: Eye, title: "4K图传", description: "超高清实时视频传输，画质卓越" },
    { icon: Settings, title: "智能控制", description: "自动化运行管理，降低人工成本" },
  ];

  const applications = [
    "大型活动安保",
    "边境监视巡逻",
    "森林防火监测",
    "通信基站覆盖",
    "城市安防监控",
    "重点区域监控",
  ];

  return (
    <ProductDetailTemplate
      seoTitle="TH-200系留无人机 - 中型系留平台解决方案"
      seoDescription="TH-200中型系留无人机，200m升空高度，10kg载荷，适用于大型活动安保、边境监视等场景"
      seoKeywords="系留无人机,TH-200,安保监控,边境监视,森林防火"
      breadcrumbs={[
        { label: "首页", path: "/" },
        { label: "系留无人机", path: "/products/tethered" },
        { label: "TH-200系留无人机" },
      ]}
      heroTitle="TH-200系留无人机"
      heroDescription="中型系留平台，具备更强的载荷能力和更高的升空高度，适用于长期部署场景。是大型活动安保、边境监视等重要任务的可靠选择。"
      heroImage="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1200&q=80"
      heroHighlight={{ value: "200m", label: "升空高度" }}
      backLink={{ label: "返回系留无人机", path: "/products/tethered" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle="了解更多TH-200解决方案"
      ctaDescription="联系我们的专业团队，获取定制化配置方案和详细报价"
    />
  );
};

export default TH200;
