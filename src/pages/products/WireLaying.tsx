import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Mountain, Wind, Target, Zap, Shield, Clock } from "lucide-react";

const features = [
  { icon: Mountain, title: "复杂地形", description: "跨越山川河流，无惧地形限制" },
  { icon: Wind, title: "强抗风性", description: "8级抗风，稳定作业" },
  { icon: Target, title: "精准投放", description: "厘米级精度，一次成功" },
  { icon: Zap, title: "高效作业", description: "效率提升10倍以上" },
  { icon: Shield, title: "安全作业", description: "无需人员高空作业" },
  { icon: Clock, title: "快速响应", description: "30分钟内完成部署" },
];

const products = [
  {
    name: "JX-500架线无人机",
    description: "轻型架线平台，适用于配电线路和通信线路的引线作业，操作简便，单人即可完成作业。",
    specs: ["牵引力: 50N", "航程: 5km", "导线直径: ≤6mm", "抗风等级: 6级"],
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
  },
  {
    name: "JX-1000架线无人机",
    description: "中型架线平台，适用于110kV及以下输电线路架设，具备更强的牵引能力和更远的作业距离。",
    specs: ["牵引力: 100N", "航程: 8km", "导线直径: ≤12mm", "抗风等级: 7级"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
  },
  {
    name: "JX-2000架线无人机",
    description: "重型架线平台，适用于500kV超高压输电线路架设，是特高压工程的理想选择。",
    specs: ["牵引力: 200N", "航程: 10km", "导线直径: ≤20mm", "抗风等级: 8级"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
  },
];

const stats = [
  { value: "10倍", title: "效率提升", description: "相比传统人工架线" },
  { value: "60%", title: "成本降低", description: "综合作业成本" },
  { value: "100%", title: "安全保障", description: "无需人员攀爬作业" },
  { value: "99%", title: "成功率", description: "一次架线成功率" },
];

const applications = [
  { title: "超高压输电", description: "500kV及以上特高压输电线路架设" },
  { title: "山区架线", description: "复杂山地地形的电力线路建设" },
  { title: "跨江架线", description: "大跨度江河跨越架线作业" },
  { title: "铁路架线", description: "高铁接触网线路架设" },
  { title: "通信架线", description: "光缆、通信线路快速敷设" },
  { title: "应急抢修", description: "灾后电力线路快速恢复" },
];

const techSpecs = [
  { label: "最大飞行速度", value: "54km/h" },
  { label: "最大飞行高度", value: "2000m（相对高度）" },
  { label: "工作环境温度", value: "-20°C ~ +45°C" },
  { label: "定位精度", value: "RTK厘米级" },
  { label: "遥控距离", value: "10km" },
  { label: "续航时间", value: "35分钟（空载）" },
  { label: "电池容量", value: "22000mAh" },
  { label: "充电时间", value: "90分钟" },
];

const cases = [
  {
    title: "川藏联网工程",
    description: "在高海拔、复杂地形条件下完成超高压线路架设，创造世界纪录",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
  {
    title: "舟山跨海输电",
    description: "成功完成5公里跨海输电线路架设，节省工期30天",
    image: "https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?w=600&q=80",
  },
  {
    title: "雅鲁藏布江跨越",
    description: "在极端高原环境下完成世界最高海拔跨江架线作业",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
  },
];

const WireLaying = () => {
  return (
    <ProductPageTemplate
      seoPath="/products/wire-laying"
      heroTitle="架线无人机系统"
      heroSubtitle="跨越山川河流，高效完成电力架线作业。革命性的架线方式，让工程建设更安全、更高效、更经济"
      heroImage="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80"
      features={features}
      featuresTitle="核心优势"
      products={products}
      productsTitle="产品系列"
      productsSubtitle="从配电线路到超高压输电线路，飞迈科技架线无人机满足全电压等级需求"
      stats={stats}
      applications={applications}
      applicationsTitle="应用场景"
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default WireLaying;
