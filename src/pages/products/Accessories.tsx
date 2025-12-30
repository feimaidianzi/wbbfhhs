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
    name: "智能飞行电池",
    description: "高能量密度锂聚合物电池，支持智能电量管理",
    specs: ["容量: 5200mAh", "电压: 22.2V", "循环次数: 300+"],
    image: "https://images.unsplash.com/photo-1619641805634-98e5c7f0c8d3?w=600&q=80",
    link: "/products/accessories/battery",
  },
  {
    name: "多功能充电器",
    description: "6通道智能充电器，支持多种电池类型",
    specs: ["通道: 6路", "功率: 1000W", "支持: LiPo/LiHV"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    link: "/products/accessories/charger",
  },
  {
    name: "碳纤维桨叶",
    description: "高强度碳纤维复合材料，动力效率提升15%",
    specs: ["材质: 碳纤维", "规格: 多种可选", "适配: 全系列"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    link: "/products/accessories/propeller",
  },
  {
    name: "遥控器套装",
    description: "专业级遥控器，16通道控制，高清图传",
    specs: ["通道: 16CH", "图传: 1080P", "延迟: <100ms"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
    link: "/products/accessories/controller",
  },
  {
    name: "FPV眼镜",
    description: "沉浸式第一视角飞行体验，高清低延迟显示",
    specs: ["分辨率: 1920×1080", "延迟: <28ms", "视场角: 46°"],
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
    link: "/products/accessories/fpv-goggles",
  },
  {
    name: "专业工具套装",
    description: "无人机维修保养必备工具，专业级品质",
    specs: ["工具: 32件", "材质: 铬钒钢", "收纳: 便携盒"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    link: "/products/accessories/toolkit",
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
