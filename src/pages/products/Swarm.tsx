import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Users, Brain, Network, Sparkles, Eye, Settings } from "lucide-react";

const features = [
  { icon: Users, title: "大规模编队", titleEn: "Large-Scale Formation", description: "支持1000+架无人机协同", descriptionEn: "Supports 1000+ drone coordination" },
  { icon: Brain, title: "智能决策", titleEn: "Smart Decision", description: "分布式智能协同算法", descriptionEn: "Distributed intelligent coordination algorithms" },
  { icon: Network, title: "自组网通信", titleEn: "Ad-Hoc Network", description: "高可靠集群通信系统", descriptionEn: "High-reliability swarm communication system" },
  { icon: Sparkles, title: "精准定位", titleEn: "Precision Positioning", description: "RTK厘米级定位精度", descriptionEn: "RTK centimeter-level positioning" },
  { icon: Eye, title: "实时监控", titleEn: "Real-time Monitoring", description: "全编队状态可视化", descriptionEn: "Full formation status visualization" },
  { icon: Settings, title: "模块化平台", titleEn: "Modular Platform", description: "快速适配多种任务", descriptionEn: "Rapid adaptation for various missions" },
];

const products = [
  { name: "集群表演系统", nameEn: "Swarm Show System", description: "大规模无人机灯光表演解决方案，打造震撼视觉盛宴。支持复杂3D图案编排，实现精准同步表演。", descriptionEn: "Large-scale drone light show solution for stunning visual experiences. Supports complex 3D pattern choreography with precise synchronization.", specs: ["编队规模: 100-10000架", "定位精度: ±2cm", "同步精度: <20ms", "表演时长: ≤30分钟"], specsEn: ["Formation: 100-10000 drones", "Positioning: ±2cm", "Sync Accuracy: <20ms", "Show Duration: ≤30min"], image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
  { name: "集群巡检系统", nameEn: "Swarm Inspection System", description: "多机协同巡检解决方案，大幅提升巡检效率和覆盖范围，支持智能任务分配和协同避障。", descriptionEn: "Multi-drone coordinated inspection solution, greatly improving efficiency and coverage, with smart task allocation and cooperative obstacle avoidance.", specs: ["编队规模: 5-50架", "覆盖效率: 提升10倍", "自主避障: 360°全向", "协同精度: <1m"], specsEn: ["Formation: 5-50 drones", "Efficiency: 10x Increase", "Obstacle Avoidance: 360°", "Coordination: <1m"], image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80" },
  { name: "集群作业系统", nameEn: "Swarm Operation System", description: "多机协同作业解决方案，适用于农业植保、测绘等场景，实现大面积高效作业。", descriptionEn: "Multi-drone coordinated operation solution for agriculture, surveying, etc., enabling large-area efficient operations.", specs: ["编队规模: 3-20架", "作业效率: 提升5倍", "航线规划: 智能分配", "作业精度: <10cm"], specsEn: ["Formation: 3-20 drones", "Efficiency: 5x Increase", "Route Planning: Smart Allocation", "Precision: <10cm"], image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80" },
];

const stats = [
  { value: "10000+", title: "最大编队", titleEn: "Max Formation", description: "单次表演规模", descriptionEn: "Single show scale" },
  { value: "±2cm", title: "定位精度", titleEn: "Positioning", description: "RTK高精度定位", descriptionEn: "RTK high precision" },
  { value: "<20ms", title: "同步精度", titleEn: "Sync Accuracy", description: "毫秒级协同控制", descriptionEn: "Millisecond coordination" },
  { value: "10倍", title: "效率提升", titleEn: "Efficiency Boost", description: "相比传统作业", descriptionEn: "vs traditional operations" },
];

const applications = [
  { title: "灯光表演", titleEn: "Light Shows", description: "大型活动、节庆典礼的空中灯光秀，打造难忘视觉体验", descriptionEn: "Aerial light shows for major events and celebrations, creating unforgettable visual experiences" },
  { title: "协同巡检", titleEn: "Coordinated Inspection", description: "电力、石油管道等大范围基础设施协同巡检", descriptionEn: "Coordinated inspection of power lines, pipelines and large-scale infrastructure" },
  { title: "农业植保", titleEn: "Agricultural Protection", description: "大面积农田的高效协同植保作业", descriptionEn: "Efficient coordinated crop protection for large farmlands" },
  { title: "应急搜救", titleEn: "Emergency Rescue", description: "大范围区域的快速搜索救援，争分夺秒", descriptionEn: "Rapid search and rescue over large areas, every second counts" },
  { title: "测绘勘察", titleEn: "Surveying", description: "大面积地形测绘，快速获取高精度数据", descriptionEn: "Large-area terrain mapping, rapidly acquiring high-precision data" },
  { title: "边境巡逻", titleEn: "Border Patrol", description: "大范围边境区域协同监视巡逻", descriptionEn: "Coordinated surveillance patrol over large border areas" },
];

const techSpecs = [
  { label: "单机重量", labelEn: "Single Drone Weight", value: "≤2kg（表演机）", valueEn: "≤2kg (Show Drone)" },
  { label: "飞行时间", labelEn: "Flight Time", value: "≤30分钟", valueEn: "≤30 minutes" },
  { label: "LED亮度", labelEn: "LED Brightness", value: "5000流明", valueEn: "5000 lumens" },
  { label: "色彩数量", labelEn: "Color Count", value: "1600万色", valueEn: "16 million colors" },
  { label: "通信延迟", labelEn: "Comm Latency", value: "<10ms", valueEn: "<10ms" },
  { label: "抗风能力", labelEn: "Wind Resistance", value: "5级风", valueEn: "Level 5 Wind" },
  { label: "工作温度", labelEn: "Operating Temp", value: "-10°C ~ +40°C", valueEn: "-10°C ~ +40°C" },
  { label: "起降方式", labelEn: "Takeoff/Landing", value: "垂直起降", valueEn: "VTOL" },
];

const cases = [
  { title: "国庆70周年庆典", titleEn: "70th National Day Celebration", description: "参与天安门广场庆典活动，3000架无人机组成巨型国旗图案", descriptionEn: "Participated in Tiananmen Square celebration, 3000 drones forming giant national flag pattern", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
  { title: "杭州亚运会", titleEn: "Hangzhou Asian Games", description: "开幕式无人机表演，5000架无人机演绎亚运主题图案", descriptionEn: "Opening ceremony drone show, 5000 drones performing Asian Games themed patterns", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80" },
  { title: "新疆棉花植保", titleEn: "Xinjiang Cotton Protection", description: "20架无人机协同作业，日作业面积超5000亩", descriptionEn: "20 drones coordinated operation, daily coverage over 5000 mu (333 hectares)", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80" },
];

const Swarm = () => {
  return (
    <ProductPageTemplate
      heroTitle="集群无人机系统"
      heroTitleEn="Swarm Drone System"
      heroSubtitle="智能集群控制，多机协同作业，开启无人机应用新纪元。从震撼表演到高效作业，让无人机发挥更大价值"
      heroSubtitleEn="Intelligent swarm control, multi-drone coordination, opening a new era of drone applications. From stunning shows to efficient operations, maximizing drone value"
      heroImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
      features={features}
      featuresTitle="技术优势"
      featuresTitleEn="Technical Advantages"
      products={products}
      productsTitle="解决方案"
      productsTitleEn="Solutions"
      productsSubtitle="从表演到作业，飞迈科技集群系统满足多样化应用需求"
      productsSubtitleEn="From shows to operations, Feimai swarm systems meet diverse application needs"
      stats={stats}
      applications={applications}
      applicationsTitle="应用场景"
      applicationsTitleEn="Application Scenarios"
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Swarm;