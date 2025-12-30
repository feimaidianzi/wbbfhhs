import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Plane, Wind, Target, Settings, Navigation, Shield } from "lucide-react";

const features = [
  {
    icon: Plane,
    title: "复合翼设计",
    description: "垂直起降+固定翼飞行，融合两者优势",
  },
  {
    icon: Wind,
    title: "长航时远距离",
    description: "航时长达4小时，航程超过200公里",
  },
  {
    icon: Target,
    title: "精准定位",
    description: "厘米级RTK定位，满足测绘精度需求",
  },
  {
    icon: Settings,
    title: "模块化载荷",
    description: "支持多种任务载荷快速更换",
  },
  {
    icon: Navigation,
    title: "智能航线",
    description: "AI航线规划，自动避障与返航",
  },
  {
    icon: Shield,
    title: "全天候作业",
    description: "抗6级风，IP54防护等级",
  },
];

const products = [
  {
    name: "TUTU-32E 复合翼无人机",
    description: "电动垂直起降复合翼平台，航时长、速度快、载荷大",
    specs: ["翼展: 3.2m", "航时: 4h", "载荷: 5kg"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
    link: "/products/work-drone/tutu-32e",
  },
  {
    name: "YP-T5 垂起固定翼",
    description: "超轻碳纤维机身，结构强度高，适合长距离测绘巡检",
    specs: ["翼展: 2.5m", "航时: 2.5h", "载荷: 3kg"],
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80",
    link: "/products/work-drone/yp-t5",
  },
  {
    name: "CL-VT800 大型复合翼",
    description: "工业级大载荷复合翼平台，适合重型任务作业",
    specs: ["翼展: 4.5m", "航时: 5h", "载荷: 10kg"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    link: "/products/work-drone/cl-vt800",
  },
  {
    name: "CL-FW300 测绘专用版",
    description: "专业测绘航测复合翼，搭载高精度RTK模块",
    specs: ["翼展: 2.8m", "航时: 3h", "精度: 2cm"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
    link: "/products/work-drone/cl-fw300",
  },
];

const stats = [
  { value: "4h+", title: "最长航时", description: "电动复合翼领先水平" },
  { value: "200km", title: "作业半径", description: "覆盖广域区域" },
  { value: "10kg", title: "最大载荷", description: "满足重型任务" },
  { value: "6级", title: "抗风能力", description: "全天候稳定作业" },
];

const applications = [
  {
    title: "大面积测绘",
    description: "高效完成千平方公里级航测任务",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80",
  },
  {
    title: "长距离巡检",
    description: "电力线路、管道等线性目标巡检",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
  },
  {
    title: "应急通信",
    description: "灾害救援时空中通信中继平台",
    image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=600&q=80",
  },
  {
    title: "海洋监测",
    description: "海域巡逻、渔业监测、海上搜救",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
  },
];

const techSpecs = [
  { label: "翼展范围", value: "2.5m - 4.5m" },
  { label: "最大航时", value: "5小时" },
  { label: "巡航速度", value: "80-120km/h" },
  { label: "最大载荷", value: "10kg" },
  { label: "起飞方式", value: "垂直起降" },
  { label: "定位精度", value: "RTK 2cm" },
  { label: "控制距离", value: "100km" },
  { label: "防护等级", value: "IP54" },
];

const cases = [
  {
    title: "新疆地质勘测项目",
    description: "完成50万公顷区域高精度地形测绘，效率提升20倍",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80",
  },
  {
    title: "海上风电场巡检",
    description: "为海上风电场提供定期巡检服务，及时发现设备隐患",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
  },
  {
    title: "边境线巡逻任务",
    description: "配合边防执勤，实现长距离边境线自动化巡逻",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80",
  },
];

const WorkDrone = () => {
  return (
    <ProductPageTemplate
      heroTitle="作业无人机"
      heroSubtitle="复合翼长航时作业平台"
      heroImage="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80"
      features={features}
      products={products}
      stats={stats}
      applications={applications}
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default WorkDrone;
