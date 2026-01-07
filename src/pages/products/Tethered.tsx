import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Clock, Zap, Shield, Radio, Eye, Settings } from "lucide-react";

const features = [
  { icon: Clock, title: "24小时不间断", titleEn: "24-Hour Non-Stop", description: "持续供电，无限续航能力", descriptionEn: "Continuous power, unlimited endurance" },
  { icon: Zap, title: "最高300米", titleEn: "Up to 300m", description: "升空高度可达300米", descriptionEn: "Altitude up to 300 meters" },
  { icon: Shield, title: "5分钟部署", titleEn: "5-Min Deployment", description: "快速展开，即插即用", descriptionEn: "Rapid deployment, plug and play" },
  { icon: Radio, title: "智能排线", titleEn: "Smart Cable Mgmt", description: "自动收放线，智能管理", descriptionEn: "Auto cable retraction, smart management" },
  { icon: Eye, title: "高清传输", titleEn: "HD Transmission", description: "4K超高清实时图传", descriptionEn: "4K ultra-HD real-time video" },
  { icon: Settings, title: "一体化设计", titleEn: "Integrated Design", description: "集成供电、通信、控制", descriptionEn: "Integrated power, comms, control" },
];

const products = [
  { name: "TH-100系留无人机", nameEn: "TH-100 Tethered Drone", description: "轻量化系留平台，适用于临时性监控、通信中继等应用场景，单人即可完成部署操作。", descriptionEn: "Lightweight tethered platform for temporary surveillance, communication relay, single-person deployment.", specs: ["有效载荷: 5kg", "升空高度: 100m", "抗风等级: 6级", "供电功率: 1.5kW"], specsEn: ["Payload: 5kg", "Altitude: 100m", "Wind Resistance: Level 6", "Power: 1.5kW"], image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80", link: "/products/tethered/th-100" },
  { name: "TH-200系留无人机", nameEn: "TH-200 Tethered Drone", description: "中型系留平台，具备更强的载荷能力和更高的升空高度，适用于长期部署场景。", descriptionEn: "Medium tethered platform with stronger payload and higher altitude for long-term deployment scenarios.", specs: ["有效载荷: 10kg", "升空高度: 200m", "抗风等级: 7级", "供电功率: 3kW"], specsEn: ["Payload: 10kg", "Altitude: 200m", "Wind Resistance: Level 7", "Power: 3kW"], image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80", link: "/products/tethered/th-200" },
  { name: "TH-300系留无人机", nameEn: "TH-300 Tethered Drone", description: "重型系留平台，适用于大型活动安保、应急通信等重要场景，支持多载荷同时挂载。", descriptionEn: "Heavy-duty tethered platform for major event security, emergency comms, supports multiple simultaneous payloads.", specs: ["有效载荷: 15kg", "升空高度: 300m", "抗风等级: 8级", "供电功率: 5kW"], specsEn: ["Payload: 15kg", "Altitude: 300m", "Wind Resistance: Level 8", "Power: 5kW"], image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80", link: "/products/tethered/th-300" },
];

const stats = [
  { value: "24h", title: "连续工作", titleEn: "Continuous Work", description: "不间断供电作业", descriptionEn: "Non-stop powered operation" },
  { value: "300m", title: "升空高度", titleEn: "Altitude", description: "覆盖更广范围", descriptionEn: "Cover wider area" },
  { value: "8级", title: "抗风能力", titleEn: "Wind Resistance", description: "恶劣天气作业", descriptionEn: "Harsh weather operation" },
  { value: "5min", title: "部署时间", titleEn: "Deployment Time", description: "快速响应需求", descriptionEn: "Rapid response" },
];

const applications = [
  { title: "大型活动安保", titleEn: "Major Event Security", description: "演唱会、体育赛事等大型活动的空中安保监控", descriptionEn: "Aerial security for concerts, sports events and major activities" },
  { title: "应急通信中继", titleEn: "Emergency Comm Relay", description: "灾害现场快速建立临时通信网络覆盖", descriptionEn: "Rapidly establish temporary communication network at disaster sites" },
  { title: "边境巡逻监视", titleEn: "Border Patrol", description: "重点区域长时间不间断空中监视", descriptionEn: "Long-duration uninterrupted aerial surveillance of key areas" },
  { title: "森林防火监测", titleEn: "Forest Fire Monitoring", description: "火险高发期持续监测，及时预警", descriptionEn: "Continuous monitoring during high fire risk periods, timely alerts" },
  { title: "交通流量监控", titleEn: "Traffic Monitoring", description: "重大节假日交通枢纽实时监控", descriptionEn: "Real-time monitoring of traffic hubs during major holidays" },
  { title: "城市安防监控", titleEn: "Urban Security", description: "重点区域常态化空中安防部署", descriptionEn: "Routine aerial security deployment in key areas" },
];

const techSpecs = [
  { label: "地面供电系统", labelEn: "Ground Power System", value: "AC220V/380V 输入", valueEn: "AC220V/380V Input" },
  { label: "系留线缆长度", labelEn: "Tether Cable Length", value: "100m/200m/300m 可选", valueEn: "100m/200m/300m Options" },
  { label: "线缆重量", labelEn: "Cable Weight", value: "≤8kg/100m", valueEn: "≤8kg/100m" },
  { label: "自动排线系统", labelEn: "Auto Cable System", value: "智能张力控制", valueEn: "Smart Tension Control" },
  { label: "工作环境温度", labelEn: "Operating Temp", value: "-20°C ~ +50°C", valueEn: "-20°C ~ +50°C" },
  { label: "抗风能力", labelEn: "Wind Resistance", value: "持续风速 ≤17m/s", valueEn: "Sustained Wind ≤17m/s" },
  { label: "载荷接口", labelEn: "Payload Interface", value: "标准云台接口 + 自定义接口", valueEn: "Standard Gimbal + Custom Interface" },
  { label: "图传距离", labelEn: "Video Range", value: "无限制（有线传输）", valueEn: "Unlimited (Wired)" },
];

const cases = [
  { title: "北京冬奥会安保", titleEn: "Beijing Winter Olympics Security", description: "为冬奥会场馆提供24小时不间断空中安保监控，保障赛事顺利进行", descriptionEn: "Provided 24-hour continuous aerial security for Winter Olympics venues, ensuring smooth event operation", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80" },
  { title: "广西边境巡逻", titleEn: "Guangxi Border Patrol", description: "部署系留无人机系统，实现重点区域全天候监视，有效提升管控效能", descriptionEn: "Deployed tethered drone system for all-weather surveillance of key areas, improving control effectiveness", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
  { title: "云南森林防火", titleEn: "Yunnan Forest Fire Prevention", description: "在高火险期部署系留平台，成功预警多起火情，将火灾消灭在萌芽状态", descriptionEn: "Deployed tethered platform during high fire risk period, successfully detected multiple fires early", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80" },
];

const Tethered = () => {
  return (
    <ProductPageTemplate
      heroTitle="系留无人机系统"
      heroTitleEn="Tethered Drone System"
      heroSubtitle="24小时不间断工作，最高升空高度达300米，5分钟快速部署。突破传统无人机续航限制，实现真正的全天候持续作业"
      heroSubtitleEn="24-hour non-stop operation, up to 300m altitude, 5-minute rapid deployment. Breaking traditional drone endurance limits for true all-weather continuous operation"
      heroImage="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80"
      features={features}
      featuresTitle="核心优势"
      featuresTitleEn="Core Advantages"
      products={products}
      productsTitle="产品系列"
      productsTitleEn="Product Series"
      productsSubtitle="多种规格系留无人机，满足不同场景的长时间滞空需求"
      productsSubtitleEn="Various tethered drone specifications to meet long-duration hovering needs for different scenarios"
      stats={stats}
      applications={applications}
      applicationsTitle="应用场景"
      applicationsTitleEn="Application Scenarios"
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Tethered;