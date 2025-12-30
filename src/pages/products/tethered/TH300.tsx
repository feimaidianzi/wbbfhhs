import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Clock, Zap, Shield, Radio, Eye, Settings } from "lucide-react";

const TH300 = () => {
  const specs = [
    { label: "有效载荷", value: "15kg" },
    { label: "升空高度", value: "300m" },
    { label: "抗风等级", value: "8级" },
    { label: "供电功率", value: "5kW" },
    { label: "系留线缆", value: "300m" },
    { label: "工作温度", value: "-20°C~50°C" },
    { label: "部署时间", value: "<10分钟" },
    { label: "连续工作", value: "24小时" },
  ];

  const features = [
    { icon: Clock, title: "超强续航", description: "24小时全天候不间断工作，持续执行任务" },
    { icon: Zap, title: "大功率系统", description: "5kW供电支持重型载荷，满足专业需求" },
    { icon: Shield, title: "超强抗风", description: "8级强风稳定作业，极端天气可靠运行" },
    { icon: Radio, title: "多载荷挂载", description: "支持多载荷同时挂载，任务能力强大" },
    { icon: Eye, title: "超远覆盖", description: "300米高度覆盖更广，监控范围更大" },
    { icon: Settings, title: "全自动化", description: "智能起降、自动排线，操作简便高效" },
  ];

  const applications = [
    "重大活动安保",
    "国境线监视",
    "海岸线巡逻",
    "森林火灾监测",
    "应急通信保障",
    "大型赛事保障",
  ];

  return (
    <ProductDetailTemplate
      seoTitle="TH-300系留无人机 - 重型系留平台解决方案"
      seoDescription="TH-300重型系留无人机，300m升空高度，15kg载荷，适用于重大活动安保、国境监视等场景"
      seoKeywords="系留无人机,TH-300,重大活动安保,国境监视,应急通信"
      breadcrumbs={[
        { label: "首页", path: "/" },
        { label: "系留无人机", path: "/products/tethered" },
        { label: "TH-300系留无人机" },
      ]}
      heroTitle="TH-300系留无人机"
      heroDescription="重型系留平台，适用于大型活动安保、应急通信等重要场景。支持多载荷同时挂载，是专业级应用的旗舰选择。"
      heroImage="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80"
      heroHighlight={{ value: "300m", label: "升空高度" }}
      backLink={{ label: "返回系留无人机", path: "/products/tethered" }}
      features={features}
      specs={specs}
      applications={applications}
      ctaTitle="了解更多TH-300解决方案"
      ctaDescription="联系我们的专业团队，获取定制化配置方案和详细报价"
    />
  );
};

export default TH300;
