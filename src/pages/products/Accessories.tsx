import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Package, Zap, Settings, Shield, Wrench, Battery } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "原装配件",
    description: "官方原装配件，完美适配各系列无人机",
  },
  {
    icon: Zap,
    title: "高性能电池",
    description: "高能量密度锂电池，续航更持久",
  },
  {
    icon: Settings,
    title: "精密零件",
    description: "航空级材料，精密加工，品质保障",
  },
  {
    icon: Shield,
    title: "安全可靠",
    description: "严格质检，确保飞行安全稳定",
  },
  {
    icon: Wrench,
    title: "维修工具",
    description: "专业维修保养工具套装",
  },
  {
    icon: Battery,
    title: "充电设备",
    description: "智能充电器，安全高效充电",
  },
];

const products = [
  {
    name: "VTX视频发射器 (4.9-6.1GHz)",
    description: "4.9-6.1GHz频段视频发射器，2.5W-37W多功率可选，80频道支持",
    specs: ["4.9-6.1GHz", "2.5W-37W可选", "80频道"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    link: "/products/accessories/vtx",
  },
  {
    name: "VTX视频发射器 (6.1-7.2GHz)",
    description: "6.1-7.2GHz高频段视频发射器，有效规避干扰，64频道配置",
    specs: ["6.1-7.2GHz", "10W输出", "64频道"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    link: "/products/accessories/vtx",
  },
  {
    name: "VRX视频接收器",
    description: "高灵敏度视频接收器，稳定接收图传信号，支持多频道切换",
    specs: ["多频道支持", "高灵敏度", "OSD显示"],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80",
    link: "/products/accessories/vrx",
  },
  {
    name: "其他配件",
    description: "各类无人机辅助配件，包括支架、保护罩、收纳包等",
    specs: ["支架配件", "保护配件", "收纳装备"],
    image: "https://images.unsplash.com/photo-1619641805634-98e5c7f0c8d3?w=600&q=80",
    link: "/products/accessories/others",
  },
  {
    name: "电控系列",
    description: "高性能电子调速器，精准控制电机转速",
    specs: ["大电流设计", "低发热", "快速响应"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    link: "/products/accessories/esc",
  },
  {
    name: "电池/充电器",
    description: "高能量密度锂聚合物电池与智能充电设备",
    specs: ["大容量电池", "智能充电", "安全保护"],
    image: "https://images.unsplash.com/photo-1619641805634-98e5c7f0d3?w=600&q=80",
    link: "/products/accessories/battery",
  },
  {
    name: "飞控",
    description: "专业飞控系统，支持多种飞行模式与智能功能",
    specs: ["多模式飞行", "GPS定位", "自动返航"],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80",
    link: "/products/accessories/flight-controller",
  },
  {
    name: "螺旋桨",
    description: "高效碳纤维/尼龙复合螺旋桨，提升动力效率",
    specs: ["碳纤维材质", "高效设计", "多规格可选"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    link: "/products/accessories/propeller",
  },
  {
    name: "ELRS",
    description: "ExpressLRS远距离控制系统，稳定可靠的控制链路",
    specs: ["远距离传输", "低延迟", "开源协议"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
    link: "/products/accessories/elrs",
  },
  {
    name: "无人机吊舱",
    description: "高性能光电吊舱，支持可见光/红外/激光多传感器融合",
    specs: ["4K高清", "30倍变焦", "AI识别"],
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
    link: "/products/accessories/gimbal",
  },
];

const stats = [
  { value: "100+", title: "配件种类", description: "满足各种需求" },
  { value: "99%", title: "适配率", description: "全系列无人机适配" },
  { value: "2年", title: "质保期限", description: "售后无忧" },
  { value: "48h", title: "发货时效", description: "快速配送" },
];

const applications = [
  {
    title: "电池更换",
    description: "高品质备用电池，延长作业时间",
    image: "https://images.unsplash.com/photo-1619641805634-98e5c7f0d3?w=600&q=80",
  },
  {
    title: "桨叶替换",
    description: "原装桨叶，保证飞行稳定性",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
  },
  {
    title: "维修保养",
    description: "专业工具，轻松完成日常保养",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  },
  {
    title: "升级改装",
    description: "性能升级配件，提升飞行体验",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
];

const techSpecs = [
  { label: "电池类型", value: "LiPo / LiHV / 固态" },
  { label: "桨叶材质", value: "碳纤维 / 尼龙复合" },
  { label: "遥控频率", value: "2.4GHz / 5.8GHz" },
  { label: "图传制式", value: "数字高清 / 模拟" },
  { label: "工具材质", value: "铬钒钢 / 铝合金" },
  { label: "包装标准", value: "航空级防护" },
  { label: "认证标准", value: "CE / FCC / RoHS" },
  { label: "质保期限", value: "1-2年" },
];

const cases = [
  {
    title: "电力巡检队配件供应",
    description: "为某省电网巡检队提供全年配件供应服务，保障日常作业",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
  },
  {
    title: "物流企业电池方案",
    description: "为物流无人机企业提供定制电池解决方案，提升配送效率",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
  },
  {
    title: "培训机构设备配套",
    description: "为无人机培训机构提供完整的配件和工具套装",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80",
  },
];

const Accessories = () => {
  return (
    <ProductPageTemplate
      heroTitle="无人机配件"
      heroSubtitle="原装配件与专业工具"
      heroImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
      features={features}
      products={products}
      stats={stats}
      applications={applications}
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Accessories;