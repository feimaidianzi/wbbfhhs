import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Camera, Settings, Shield, Cpu, Zap, Wind } from "lucide-react";

const features = [
  { icon: Camera, title: "多载荷兼容", titleEn: "Multi-Payload Compatible", description: "支持多种专业载荷设备", descriptionEn: "Supports various professional payload devices" },
  { icon: Settings, title: "模块化设计", titleEn: "Modular Design", description: "快速更换，灵活配置", descriptionEn: "Quick replacement, flexible configuration" },
  { icon: Shield, title: "工业级可靠", titleEn: "Industrial Reliability", description: "恶劣环境稳定作业", descriptionEn: "Stable operation in harsh environments" },
  { icon: Cpu, title: "智能飞控", titleEn: "Smart Flight Control", description: "自主避障，智能航线", descriptionEn: "Autonomous obstacle avoidance, smart routing" },
  { icon: Zap, title: "长续航", titleEn: "Long Endurance", description: "最长续航55分钟", descriptionEn: "Up to 55 minutes flight time" },
  { icon: Wind, title: "强抗风", titleEn: "Wind Resistant", description: "7级风稳定作业", descriptionEn: "Stable in Level 7 winds" },
];

const products = [
  { name: "X650多旋翼无人机", nameEn: "X650 Multi-Rotor Drone", description: "紧凑型工业无人机，适用于日常巡检和数据采集任务，便携性强，快速部署。", descriptionEn: "Compact industrial drone for daily inspection and data collection, highly portable, rapid deployment.", specs: ["轴距: 650mm", "最大载重: 2kg", "续航时间: 35分钟", "抗风等级: 5级"], specsEn: ["Wheelbase: 650mm", "Max Payload: 2kg", "Flight Time: 35min", "Wind Resistance: Level 5"], image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80", link: "/products/multi-rotor/x650" },
  { name: "X850多旋翼无人机", nameEn: "X850 Multi-Rotor Drone", description: "中型工业无人机，具备更强载荷能力和更长续航时间，满足专业级作业需求。", descriptionEn: "Medium industrial drone with stronger payload capacity and longer flight time for professional operations.", specs: ["轴距: 850mm", "最大载重: 5kg", "续航时间: 45分钟", "抗风等级: 6级"], specsEn: ["Wheelbase: 850mm", "Max Payload: 5kg", "Flight Time: 45min", "Wind Resistance: Level 6"], image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80", link: "/products/multi-rotor/x850" },
  { name: "X1200多旋翼无人机", nameEn: "X1200 Multi-Rotor Drone", description: "大型工业无人机，适用于重型载荷和长航时任务，是专业级应用的理想选择。", descriptionEn: "Large industrial drone for heavy payloads and long-duration missions, ideal for professional applications.", specs: ["轴距: 1200mm", "最大载重: 10kg", "续航时间: 55分钟", "抗风等级: 7级"], specsEn: ["Wheelbase: 1200mm", "Max Payload: 10kg", "Flight Time: 55min", "Wind Resistance: Level 7"], image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=600&q=80", link: "/products/multi-rotor/x1200" },
  { name: "X1600多旋翼无人机", nameEn: "X1600 Multi-Rotor Drone", description: "超大型工业无人机，满足特殊行业的超重载荷需求，适用于专业测绘、运输等场景。", descriptionEn: "Extra-large industrial drone for special industry heavy payload needs, suitable for mapping, transport, etc.", specs: ["轴距: 1600mm", "最大载重: 20kg", "续航时间: 40分钟", "抗风等级: 6级"], specsEn: ["Wheelbase: 1600mm", "Max Payload: 20kg", "Flight Time: 40min", "Wind Resistance: Level 6"], image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80", link: "/products/multi-rotor/x1600" },
];

const stats = [
  { value: "20kg", title: "最大载重", titleEn: "Max Payload", description: "满足重载需求", descriptionEn: "Meet heavy load needs" },
  { value: "55min", title: "最长续航", titleEn: "Max Flight Time", description: "长时间作业", descriptionEn: "Extended operations" },
  { value: "7级", title: "抗风能力", titleEn: "Wind Resistance", description: "恶劣天气作业", descriptionEn: "Harsh weather ops" },
  { value: "10km", title: "控制距离", titleEn: "Control Range", description: "远距离操控", descriptionEn: "Long-range control" },
];

const applications = [
  { title: "电力巡检", titleEn: "Power Inspection", description: "输电线路、变电站等电力设施智能巡检", descriptionEn: "Smart inspection of transmission lines, substations, etc." },
  { title: "石油管道", titleEn: "Oil & Gas Pipeline", description: "油气管道日常巡护和泄漏检测", descriptionEn: "Daily patrol and leak detection for oil/gas pipelines" },
  { title: "公安执法", titleEn: "Law Enforcement", description: "空中侦察、追踪取证、现场管控", descriptionEn: "Aerial reconnaissance, tracking, scene control" },
  { title: "消防救援", titleEn: "Fire & Rescue", description: "火情侦察、搜救定位、物资投送", descriptionEn: "Fire reconnaissance, search & rescue, supply delivery" },
  { title: "测绘勘察", titleEn: "Surveying & Mapping", description: "地形测绘、三维建模、工程勘察", descriptionEn: "Terrain mapping, 3D modeling, engineering survey" },
  { title: "环保监测", titleEn: "Environmental Monitor", description: "大气监测、水质采样、污染源追踪", descriptionEn: "Air monitoring, water sampling, pollution tracking" },
  { title: "农业植保", titleEn: "Agriculture", description: "农情监测、精准施肥、病虫害防治", descriptionEn: "Crop monitoring, precision fertilization, pest control" },
  { title: "应急通信", titleEn: "Emergency Comms", description: "临时通信基站、信号中继覆盖", descriptionEn: "Temporary base station, signal relay coverage" },
];

const techSpecs = [
  { label: "飞控系统", labelEn: "Flight Control", value: "自研工业级飞控", valueEn: "Self-developed Industrial FC" },
  { label: "定位系统", labelEn: "Positioning", value: "GPS + 北斗 + GLONASS", valueEn: "GPS + BeiDou + GLONASS" },
  { label: "避障系统", labelEn: "Obstacle Avoidance", value: "六向感知避障", valueEn: "6-directional Sensing" },
  { label: "图传系统", labelEn: "Video Transmission", value: "1080P/4K 实时图传", valueEn: "1080P/4K Real-time Video" },
  { label: "图传距离", labelEn: "Video Range", value: "≤10km", valueEn: "≤10km" },
  { label: "工作温度", labelEn: "Operating Temp", value: "-20°C ~ +50°C", valueEn: "-20°C ~ +50°C" },
  { label: "防护等级", labelEn: "Protection", value: "IP54", valueEn: "IP54" },
  { label: "起飞重量", labelEn: "Takeoff Weight", value: "2-35kg（不同型号）", valueEn: "2-35kg (varies by model)" },
];

const cases = [
  { title: "南方电网巡检", titleEn: "China Southern Power Grid", description: "部署X850无人机用于输电线路巡检，巡检效率提升5倍", descriptionEn: "Deployed X850 drones for transmission line inspection, 5x efficiency improvement", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80" },
  { title: "深圳公安", titleEn: "Shenzhen Police", description: "配备多旋翼无人机平台，执行空中巡逻和应急响应任务", descriptionEn: "Equipped with multi-rotor platform for aerial patrol and emergency response", image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=600&q=80" },
  { title: "自然资源部测绘", titleEn: "Natural Resources Survey", description: "使用X1200进行大比例尺地形测绘，成图精度达厘米级", descriptionEn: "Used X1200 for large-scale terrain mapping with centimeter-level accuracy", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
];

const MultiRotor = () => {
  return (
    <ProductPageTemplate
      heroTitle="多旋翼无人机平台"
      heroTitleEn="Multi-Rotor Drone Platform"
      heroSubtitle="工业级多旋翼平台，模块化设计，满足多行业应用需求。从轻型到重型，为不同任务提供最佳飞行平台"
      heroSubtitleEn="Industrial multi-rotor platform with modular design for various industries. From light to heavy-duty, providing optimal flight platforms for different missions"
      heroImage="https://images.unsplash.com/photo-1506947411487-a56738267384?w=1920&q=80"
      features={features}
      featuresTitle="平台优势"
      featuresTitleEn="Platform Advantages"
      products={products}
      productsTitle="产品系列"
      productsTitleEn="Product Series"
      productsSubtitle="从轻型到重型，长凌科技多旋翼平台覆盖全尺寸需求"
      productsSubtitleEn="From light to heavy-duty, CANI multi-rotor platforms cover all size requirements"
      stats={stats}
      applications={applications}
      applicationsTitle="应用领域"
      applicationsTitleEn="Application Areas"
      techSpecs={techSpecs}
      cases={cases}
      // SEO增强
      seoCategory="multi-rotor"
      seoCategoryDescription="长凌科技多旋翼无人机产品系列，涵盖X650、X850、X1200、X1600等多种型号，载重2-20kg，续航35-55分钟，适用于电力巡检、测绘、消防、安防等专业应用。"
      seoCategoryDescriptionEn="CANI multi-rotor drone series including X650, X850, X1200, X1600 models with 2-20kg payload, 35-55 min flight time, suitable for power inspection, mapping, firefighting, and security applications."
      seoKeywords={[
        '多旋翼无人机', '工业无人机', 'X650无人机', 'X850无人机', 'X1200无人机', 'X1600无人机',
        '电力巡检无人机', '测绘无人机', '消防无人机', '安防无人机', '大载重无人机', '长续航无人机',
        '专业无人机平台', '行业无人机', '工业级飞行平台', '无人机厂家', '无人机批发'
      ]}
      seoKeywordsEn={[
        'multi-rotor drone', 'industrial drone', 'X650 drone', 'X850 drone', 'X1200 drone', 'X1600 drone',
        'power inspection drone', 'mapping drone', 'firefighting drone', 'security drone', 'heavy payload drone',
        'long endurance drone', 'professional drone platform', 'enterprise drone', 'drone manufacturer'
      ]}
    />
  );
};

export default MultiRotor;