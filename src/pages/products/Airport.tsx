import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Plane, Zap, Cloud, Wifi, Settings, Shield } from "lucide-react";

const features = [
  { icon: Plane, title: "全自动起降", description: "无需人工干预，一键起飞降落" },
  { icon: Zap, title: "智能充电", description: "自动对接充电，快速恢复续航" },
  { icon: Cloud, title: "全天候作业", description: "-20°C~55°C环境适应能力" },
  { icon: Wifi, title: "远程控制", description: "4G/5G远程监控与操作" },
  { icon: Settings, title: "模块化设计", description: "易于维护，快速部署" },
  { icon: Shield, title: "高防护等级", description: "IP65防护，适应恶劣环境" },
];

const products = [
  {
    name: "车载自动机场",
    description: "多维跨域，相得益彰。空地跨域协同、人机共融的智能化解决方案，可快速部署于各类车辆平台，实现移动式无人值守巡检。",
    specs: ["载机重量: ≤30kg", "展开时间: <3分钟", "工作温度: -20°C~55°C", "防护等级: IP65"],
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80",
    link: "/products/airport/vehicle-mounted",
  },
  {
    name: "UHS 1000自动机场",
    description: "UHS智能停机坪，全自动起降充电，适用于大型工业无人机的自动化作业，支持多种任务载荷快速更换。",
    specs: ["载机重量: ≤50kg", "充电功率: 1000W", "防护等级: IP65", "充电时间: <45分钟"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    link: "/products/airport/uhs-1000",
  },
  {
    name: "UHS 600自动机场",
    description: "紧凑型自动机场，适用于多种场景，具备快速部署和高效运营能力，是城市级巡检的理想选择。",
    specs: ["载机重量: ≤25kg", "充电功率: 600W", "占地面积: 2m²", "部署时间: <10分钟"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
    link: "/products/airport/uhs-600",
  },
  {
    name: "UHS 400P自动机场",
    description: "便携式自动机场，快速部署，适合临时性巡检和应急响应场景，单人即可完成搬运和安装。",
    specs: ["载机重量: ≤15kg", "充电功率: 400W", "整机重量: <50kg", "便携设计"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
    link: "/products/airport/uhs-400p",
  },
];

const stats = [
  { value: "24/7", title: "全天候值守", description: "无人值守持续作业" },
  { value: "3分钟", title: "快速部署", description: "车载机场展开时间" },
  { value: "50kg", title: "最大载机", description: "支持大型工业无人机" },
  { value: "IP65", title: "防护等级", description: "适应恶劣环境" },
];

const applications = [
  { title: "电力巡检", description: "输电线路、变电站自动化巡检" },
  { title: "石油管道", description: "长距离管道日常巡护监测" },
  { title: "光伏电站", description: "大规模光伏组件热斑检测" },
  { title: "城市安防", description: "重点区域24小时空中监控" },
  { title: "高速公路", description: "交通流量监测与事故响应" },
  { title: "港口码头", description: "货场监控与船舶引导" },
  { title: "水利设施", description: "水库大坝安全监测" },
  { title: "应急救援", description: "灾害现场快速部署侦察" },
];

const techSpecs = [
  { label: "工作环境温度", value: "-20°C ~ +55°C" },
  { label: "工作环境湿度", value: "0% ~ 95% RH" },
  { label: "抗风能力", value: "≤12m/s (6级风)" },
  { label: "定位精度", value: "±5cm (RTK)" },
  { label: "充电接口", value: "智能磁吸式自动对接" },
  { label: "通信方式", value: "4G/5G/专网" },
  { label: "供电方式", value: "市电/太阳能/柴油发电" },
  { label: "远程控制", value: "支持Web/APP多端控制" },
];

const cases = [
  {
    title: "国家电网新疆分公司",
    description: "部署20套自动机场，实现超高压输电线路智能巡检，巡检效率提升300%",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
  },
  {
    title: "中石油西气东输",
    description: "沿线布设自动机场网络，实现管道24小时无人值守监控",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
  },
  {
    title: "深圳交通管理局",
    description: "城市高架桥自动巡检系统，每日自动完成全线路巡查任务",
    image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=600&q=80",
  },
];

const Airport = () => {
  return (
    <ProductPageTemplate
      heroTitle="长凌机场系统"
      heroSubtitle="全自动无人机起降平台，实现无人值守、智能巡检、自动充电的一体化解决方案，让无人机真正实现7×24小时全天候作业能力"
      heroImage="https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1920&q=80"
      features={features}
      featuresTitle="核心优势"
      products={products}
      productsTitle="产品系列"
      productsSubtitle="长凌电子提供多种规格的自动机场解决方案，满足不同场景的应用需求"
      stats={stats}
      applications={applications}
      applicationsTitle="应用场景"
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Airport;
