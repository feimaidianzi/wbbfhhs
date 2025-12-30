import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Droplets, Gauge, Leaf, Shield, Zap, MapPin } from "lucide-react";

const features = [
  {
    icon: Droplets,
    title: "精准喷洒",
    description: "厘米级精准定位，均匀喷洒，减少农药浪费",
  },
  {
    icon: Gauge,
    title: "高效作业",
    description: "单架次作业面积大，效率是人工的50倍以上",
  },
  {
    icon: Leaf,
    title: "智能避障",
    description: "雷达+视觉双重避障，自动绕行障碍物",
  },
  {
    icon: Shield,
    title: "安全可靠",
    description: "远离农药接触，保护作业人员健康安全",
  },
  {
    icon: Zap,
    title: "快速换装",
    description: "模块化药箱设计，30秒快速换装继续作业",
  },
  {
    icon: MapPin,
    title: "智能规划",
    description: "AI路径规划，自动生成最优作业航线",
  },
];

const products = [
  {
    name: "ZB-16植保无人机",
    description: "16升药箱容量，适合小型农田精准作业",
    specs: ["药箱: 16L", "喷幅: 4-6m", "续航: 15min"],
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&q=80",
    link: "/products/agriculture/zb-16",
  },
  {
    name: "ZB-30植保无人机",
    description: "30升大容量药箱，高效大面积作业首选",
    specs: ["药箱: 30L", "喷幅: 5-8m", "续航: 12min"],
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80",
    link: "/products/agriculture/zb-30",
  },
  {
    name: "ZB-50植保无人机",
    description: "50升超大容量，专业农场级作业平台",
    specs: ["药箱: 50L", "喷幅: 6-10m", "续航: 10min"],
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80",
    link: "/products/agriculture/zb-50",
  },
];

const stats = [
  { value: "50+", title: "倍效率提升", description: "相比传统人工作业" },
  { value: "95%", title: "农药利用率", description: "精准喷洒减少浪费" },
  { value: "1000+", title: "服务农户", description: "覆盖全国多省市" },
  { value: "100万", title: "亩作业面积", description: "累计完成作业" },
];

const applications = [
  {
    title: "水稻田作业",
    description: "适应水田环境，精准施药施肥",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
  },
  {
    title: "果园喷洒",
    description: "立体喷洒技术，覆盖果树全方位",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80",
  },
  {
    title: "棉花田管理",
    description: "大面积高效作业，降低人工成本",
    image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=600&q=80",
  },
  {
    title: "播种撒肥",
    description: "精准播种，均匀撒肥，提高产量",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80",
  },
];

const techSpecs = [
  { label: "药箱容量", value: "16L / 30L / 50L" },
  { label: "喷洒效率", value: "10-20亩/小时" },
  { label: "喷幅范围", value: "4-10米可调" },
  { label: "流量控制", value: "0.5-6L/min" },
  { label: "雾化粒径", value: "80-300μm" },
  { label: "抗风等级", value: "6级" },
  { label: "防护等级", value: "IP67" },
  { label: "工作温度", value: "-10°C ~ 45°C" },
];

const cases = [
  {
    title: "新疆棉花种植基地",
    description: "10万亩棉花田植保作业，效率提升60倍，农药节省40%",
    image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=600&q=80",
  },
  {
    title: "江苏水稻种植区",
    description: "精准施药作业，病虫害防治效果提升35%",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
  },
  {
    title: "山东果园管理",
    description: "立体喷洒覆盖，果园作业效率提升50倍",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80",
  },
];

const Agriculture = () => {
  return (
    <ProductPageTemplate
      heroTitle="植保无人机"
      heroSubtitle="智慧农业解决方案"
      heroImage="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=1920&q=80"
      features={features}
      products={products}
      stats={stats}
      applications={applications}
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Agriculture;
