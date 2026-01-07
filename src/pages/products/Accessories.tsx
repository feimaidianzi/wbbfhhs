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
    name: "VTX视频发射器",
    description: "专业级视频发射器，支持4.9-7.2GHz全频段覆盖，2.5W-37W多功率可选，80频道支持，满足不同距离和场景的图传需求",
    specs: ["4.9-7.2GHz全频段", "2.5W-37W可选", "80频道"],
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/f5d88edf91.jpg",
    link: "/products/accessories/vtx-vrx",
  },
  {
    name: "飞控/电调",
    description: "高性能飞控与电调系统，采用STM32F405/F722处理器，ICM42688陀螺仪，支持Betaflight/INAV固件，适配各类穿越机",
    specs: ["F405/F722处理器", "55A-100A电调", "多种固件"],
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/b67564581a.jpg",
    link: "/products/accessories/fc-esc",
  },
  {
    name: "吊舱/云台",
    description: "专业无人机吊舱与云台系统，支持可见光、红外热成像、激光测距等多传感器融合，适用于巡检、安防、消防等场景",
    specs: ["4K高清", "30倍变焦", "AI智能识别"],
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/05f45628ec.jpg",
    link: "/products/accessories/gimbal",
  },
  {
    name: "数字图传",
    description: "高清数字视频传输系统，采用WiFi技术实现1080P 60fps低延迟传输，支持OpenIPC和Ruby FPV系统，沉浸式飞行体验",
    specs: ["1080P 60fps", "低延迟", "双系统兼容"],
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/23/products/3360a61357.jpg",
    link: "/products/accessories/digital-fpv",
  },
  {
    name: "相机",
    description: "专业运动相机与航拍相机，支持4K高清录像，170°超广角镜头，防水设计，WiFi实时传输，适合航拍、运动记录",
    specs: ["4K录像", "170°广角", "WiFi传输"],
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/ba2a10b0ec.jpg",
    link: "/products/accessories/camera",
  },
  {
    name: "ELRS遥控系统",
    description: "ExpressLRS开源遥控协议，超低延迟、超远距离控制，支持915/868MHz和2.4GHz频段，开源固件持续更新",
    specs: ["超低延迟", "超远距离", "开源协议"],
    image: "https://inew.foxeer.com//upload/s/goods/2023-12-12/11-16-45-6577d09dee618.images.400x400.jpg",
    link: "/products/accessories/elrs",
  },
  {
    name: "监视器/FPV眼镜",
    description: "FPV监视器与眼镜，内置5.8G 40频道接收器和DVR录像功能，IPS高清屏幕，双接收分集，沉浸式飞行体验",
    specs: ["5.8G 40频道", "内置DVR", "IPS高清屏"],
    image: "https://inew.foxeer.com//upload/s/goods/2023-03-31/17-24-03-6426a6b30b1e9.images.400x400.jpg",
    link: "/products/accessories/others",
  },
  {
    name: "GPS模块",
    description: "高精度GPS定位模块，采用Ublox M10芯片，支持5883电子罗盘，快速搜星，2.5米CEP定位精度，多种孔距可选",
    specs: ["M10芯片", "快速搜星", "带罗盘"],
    image: "https://inew.foxeer.com//upload/s/goods/2025-06-27/12-02-37-685e17dd58835.images.400x400.png",
    link: "/products/accessories/others",
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