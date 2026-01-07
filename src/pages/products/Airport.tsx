import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Plane, Zap, Cloud, Wifi, Settings, Shield } from "lucide-react";

const features = [
  { icon: Plane, title: "全自动起降", titleEn: "Auto Takeoff/Landing", description: "无需人工干预，一键起飞降落", descriptionEn: "No manual intervention, one-click takeoff and landing" },
  { icon: Zap, title: "智能充电", titleEn: "Smart Charging", description: "自动对接充电，快速恢复续航", descriptionEn: "Auto-docking charging, rapid endurance recovery" },
  { icon: Cloud, title: "全天候作业", titleEn: "All-Weather Operation", description: "-20°C~55°C环境适应能力", descriptionEn: "-20°C~55°C environmental adaptability" },
  { icon: Wifi, title: "远程控制", titleEn: "Remote Control", description: "4G/5G远程监控与操作", descriptionEn: "4G/5G remote monitoring and operation" },
  { icon: Settings, title: "模块化设计", titleEn: "Modular Design", description: "易于维护，快速部署", descriptionEn: "Easy maintenance, rapid deployment" },
  { icon: Shield, title: "高防护等级", titleEn: "High Protection", description: "IP65防护，适应恶劣环境", descriptionEn: "IP65 protection, adapts to harsh environments" },
];

const products = [
  { name: "车载自动机场", nameEn: "Vehicle-Mounted Drone Nest", description: "多维跨域，相得益彰。空地跨域协同、人机共融的智能化解决方案，可快速部署于各类车辆平台，实现移动式无人值守巡检。", descriptionEn: "Multi-domain coordination solution. Air-ground cross-domain collaboration, human-machine integration, rapidly deployable on various vehicle platforms for mobile unmanned inspection.", specs: ["载机重量: ≤30kg", "展开时间: <3分钟", "工作温度: -20°C~55°C", "防护等级: IP65"], specsEn: ["Drone Weight: ≤30kg", "Deployment: <3min", "Operating Temp: -20°C~55°C", "Protection: IP65"], image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80", link: "/products/airport/vehicle-mounted" },
  { name: "UHS 1000自动机场", nameEn: "UHS 1000 Drone Nest", description: "UHS智能停机坪，全自动起降充电，适用于大型工业无人机的自动化作业，支持多种任务载荷快速更换。", descriptionEn: "UHS smart landing pad, fully automatic takeoff/landing and charging, suitable for large industrial drone automation, supports rapid payload switching.", specs: ["载机重量: ≤50kg", "充电功率: 1000W", "防护等级: IP65", "充电时间: <45分钟"], specsEn: ["Drone Weight: ≤50kg", "Charging Power: 1000W", "Protection: IP65", "Charging Time: <45min"], image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80", link: "/products/airport/uhs-1000" },
  { name: "UHS 600自动机场", nameEn: "UHS 600 Drone Nest", description: "紧凑型自动机场，适用于多种场景，具备快速部署和高效运营能力，是城市级巡检的理想选择。", descriptionEn: "Compact drone nest for various scenarios, with rapid deployment and efficient operation capabilities, ideal for urban-level inspection.", specs: ["载机重量: ≤25kg", "充电功率: 600W", "占地面积: 2m²", "部署时间: <10分钟"], specsEn: ["Drone Weight: ≤25kg", "Charging Power: 600W", "Footprint: 2m²", "Deployment: <10min"], image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80", link: "/products/airport/uhs-600" },
  { name: "UHS 400P自动机场", nameEn: "UHS 400P Drone Nest", description: "便携式自动机场，快速部署，适合临时性巡检和应急响应场景，单人即可完成搬运和安装。", descriptionEn: "Portable drone nest, rapid deployment, suitable for temporary inspection and emergency response, single-person transport and installation.", specs: ["载机重量: ≤15kg", "充电功率: 400W", "整机重量: <50kg", "便携设计"], specsEn: ["Drone Weight: ≤15kg", "Charging Power: 400W", "Total Weight: <50kg", "Portable Design"], image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80", link: "/products/airport/uhs-400p" },
];

const stats = [
  { value: "24/7", title: "全天候值守", titleEn: "All-Day Operation", description: "无人值守持续作业", descriptionEn: "Unattended continuous operation" },
  { value: "3分钟", title: "快速部署", titleEn: "Rapid Deployment", description: "车载机场展开时间", descriptionEn: "Vehicle nest deployment time" },
  { value: "50kg", title: "最大载机", titleEn: "Max Drone Weight", description: "支持大型工业无人机", descriptionEn: "Supports large industrial drones" },
  { value: "IP65", title: "防护等级", titleEn: "Protection", description: "适应恶劣环境", descriptionEn: "Harsh environment ready" },
];

const applications = [
  { title: "电力巡检", titleEn: "Power Inspection", description: "输电线路、变电站自动化巡检", descriptionEn: "Automated inspection of power lines and substations" },
  { title: "石油管道", titleEn: "Oil Pipelines", description: "长距离管道日常巡护监测", descriptionEn: "Daily patrol monitoring of long-distance pipelines" },
  { title: "光伏电站", titleEn: "Solar Power Plants", description: "大规模光伏组件热斑检测", descriptionEn: "Large-scale solar panel hot spot detection" },
  { title: "城市安防", titleEn: "Urban Security", description: "重点区域24小时空中监控", descriptionEn: "24-hour aerial monitoring of key areas" },
  { title: "高速公路", titleEn: "Highways", description: "交通流量监测与事故响应", descriptionEn: "Traffic monitoring and accident response" },
  { title: "港口码头", titleEn: "Ports & Docks", description: "货场监控与船舶引导", descriptionEn: "Yard monitoring and ship guidance" },
  { title: "水利设施", titleEn: "Water Facilities", description: "水库大坝安全监测", descriptionEn: "Reservoir and dam safety monitoring" },
  { title: "应急救援", titleEn: "Emergency Rescue", description: "灾害现场快速部署侦察", descriptionEn: "Rapid deployment for disaster site reconnaissance" },
];

const techSpecs = [
  { label: "工作环境温度", labelEn: "Operating Temp", value: "-20°C ~ +55°C", valueEn: "-20°C ~ +55°C" },
  { label: "工作环境湿度", labelEn: "Operating Humidity", value: "0% ~ 95% RH", valueEn: "0% ~ 95% RH" },
  { label: "抗风能力", labelEn: "Wind Resistance", value: "≤12m/s (6级风)", valueEn: "≤12m/s (Level 6)" },
  { label: "定位精度", labelEn: "Positioning", value: "±5cm (RTK)", valueEn: "±5cm (RTK)" },
  { label: "充电接口", labelEn: "Charging Interface", value: "智能磁吸式自动对接", valueEn: "Smart magnetic auto-docking" },
  { label: "通信方式", labelEn: "Communication", value: "4G/5G/专网", valueEn: "4G/5G/Private Network" },
  { label: "供电方式", labelEn: "Power Supply", value: "市电/太阳能/柴油发电", valueEn: "Grid/Solar/Diesel Generator" },
  { label: "远程控制", labelEn: "Remote Control", value: "支持Web/APP多端控制", valueEn: "Web/APP multi-platform control" },
];

const cases = [
  { title: "国家电网新疆分公司", titleEn: "State Grid Xinjiang", description: "部署20套自动机场，实现超高压输电线路智能巡检，巡检效率提升300%", descriptionEn: "Deployed 20 drone nests for UHV transmission line smart inspection, 300% efficiency improvement", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80" },
  { title: "中石油西气东输", titleEn: "PetroChina West-East Pipeline", description: "沿线布设自动机场网络，实现管道24小时无人值守监控", descriptionEn: "Deployed drone nest network along the pipeline for 24-hour unattended monitoring", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80" },
  { title: "深圳交通管理局", titleEn: "Shenzhen Traffic Management", description: "城市高架桥自动巡检系统，每日自动完成全线路巡查任务", descriptionEn: "Urban overpass auto-inspection system, daily automatic full-route patrol", image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=600&q=80" },
];

const Airport = () => {
  return (
    <ProductPageTemplate
      heroTitle="飞迈机场系统"
      heroTitleEn="Feimai Drone Nest System"
      heroSubtitle="全自动无人机起降平台，实现无人值守、智能巡检、自动充电的一体化解决方案，让无人机真正实现7×24小时全天候作业能力"
      heroSubtitleEn="Fully automatic drone takeoff/landing platform, integrated solution for unattended operation, smart inspection, and auto-charging, enabling true 24/7 all-weather drone operations"
      heroImage="https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1920&q=80"
      features={features}
      featuresTitle="核心优势"
      featuresTitleEn="Core Advantages"
      products={products}
      productsTitle="产品系列"
      productsTitleEn="Product Series"
      productsSubtitle="飞迈科技提供多种规格的自动机场解决方案，满足不同场景的应用需求"
      productsSubtitleEn="Feimai provides various drone nest solutions to meet different application needs"
      stats={stats}
      applications={applications}
      applicationsTitle="应用场景"
      applicationsTitleEn="Application Scenarios"
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Airport;