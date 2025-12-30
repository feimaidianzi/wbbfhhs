import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Clock, Zap, Shield, Radio, Eye, Settings } from "lucide-react";

const TH100 = () => {
  const specs = [
    { label: "有效载荷", value: "5kg" },
    { label: "升空高度", value: "100m" },
    { label: "抗风等级", value: "6级" },
    { label: "供电功率", value: "1.5kW" },
    { label: "系留线缆", value: "100m" },
    { label: "工作温度", value: "-20°C~50°C" },
    { label: "部署时间", value: "<5分钟" },
    { label: "连续工作", value: "24小时" },
  ];

  const features = [
    { icon: Clock, title: "24小时不间断", description: "持续供电，无限续航能力，满足长时间作业需求" },
    { icon: Zap, title: "快速部署", description: "单人5分钟内完成部署，快速响应任务需求" },
    { icon: Shield, title: "轻量化设计", description: "整机轻便，便于携带运输，适合快速机动" },
    { icon: Radio, title: "智能排线", description: "自动收放线系统，智能管理系留线缆" },
    { icon: Eye, title: "高清传输", description: "1080P实时图传，画面清晰流畅" },
    { icon: Settings, title: "即插即用", description: "标准接口设计，快速连接各类载荷" },
  ];

  const applications = [
    "临时性活动安保",
    "应急通信中继",
    "交通监控执法",
    "临时安防部署",
    "工地监控巡查",
    "小型活动保障",
  ];

  return (
    <ProductDetailTemplate
      seoTitle="TH-100系留无人机 - 轻量化系留平台解决方案"
      seoDescription="TH-100轻量化系留无人机，100m升空高度，24小时不间断工作，适用于临时监控、通信中继等场景"
      seoKeywords="系留无人机,TH-100,临时监控,通信中继,24小时续航"
      breadcrumbs={[
        { label: "首页", path: "/" },
        { label: "系留无人机", path: "/products/tethered" },
        { label: "TH-100系留无人机" },
      ]}
      heroTitle="TH-100系留无人机"
      heroDescription="轻量化系留平台，适用于临时性监控、通信中继等应用场景。单人即可完成部署操作，是临时任务和快速响应的理想选择。"
      heroImage="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80"
      heroHighlight={{ value: "100m", label: "升空高度" }}
      backLink={{ label: "返回系留无人机", path: "/products/tethered" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle="了解更多TH-100解决方案"
      ctaDescription="联系我们的专业团队，获取定制化配置方案和详细报价"
    />
  );
};

export default TH100;
