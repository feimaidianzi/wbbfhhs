/**
 * 长凌科技 - 科研无人机开发平台 & 基础飞行平台
 * 用于多旋翼无人机分类下
 */

export interface ResearchPlatformProduct {
  id: string;
  name: string;
  nameEn: string;
  subcategory: "research" | "basic";
  description: string;
  descriptionEn: string;
  image: string;
  gallery: string[];
  specs: Record<string, string>;
  specsEn?: Record<string, string>;
  features: string[];
  featuresEn: string[];
  highlights: string[];
  highlightsEn: string[];
  documentUrl?: string;
  purchaseUrl?: string;
}

// ==================== 科研无人机开发平台 ====================
export const researchDronePlatforms: ResearchPlatformProduct[] = [
  {
    id: "cl-su17",
    name: "长凌SU17科研版无人机",
    nameEn: "CANI SU17 Research UAV",
    subcategory: "research",
    description: "新一代科研无人机开发平台，集成高性能计算、先进感知与开源软件栈，支持ROS2开发环境，适用于自主飞行、SLAM、目标识别等科研场景。",
    descriptionEn: "Next-generation research UAV development platform with integrated high-performance computing, advanced sensors, and open-source software stack. Supports ROS2 development for autonomous flight, SLAM, and target recognition research.",
    image: "https://qiniu.md.amovlab.com/img/p/202412/20241225/1916559035079338957045760.jpg",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202412/20241225/1916559035079338957045760.jpg",
      "https://qiniu.md.amovlab.com/img/p/202410/20241016/1226094606003116935053312.jpg",
      "https://qiniu.md.amovlab.com/img/p/202412/20241225/1133583587850456925110272.jpg",
      "https://qiniu.md.amovlab.com/img/p/202410/20241016/1225584651559150210351104.jpg"
    ],
    specs: {
      "机型": "四旋翼",
      "轴距": "450mm",
      "起飞重量": "2.5kg",
      "续航时间": "25min",
      "飞控": "Pixhawk 6C",
      "机载计算机": "Jetson Orin NX",
      "相机": "Intel RealSense D435i",
      "定位系统": "RTK/UWB可选"
    },
    specsEn: {
      "Type": "Quadrotor",
      "Wheelbase": "450mm",
      "Takeoff Weight": "2.5kg",
      "Flight Time": "25min",
      "Flight Controller": "Pixhawk 6C",
      "Onboard Computer": "Jetson Orin NX",
      "Camera": "Intel RealSense D435i",
      "Positioning": "RTK/UWB Optional"
    },
    features: ["ROS2开发环境", "深度相机集成", "开源软件栈", "模块化设计"],
    featuresEn: ["ROS2 Development Environment", "Depth Camera Integration", "Open-source Software Stack", "Modular Design"],
    highlights: ["适用于科研教学", "支持多种算法验证", "完善的文档支持"],
    highlightsEn: ["Suitable for Research & Education", "Supports Various Algorithm Validation", "Comprehensive Documentation"],
    documentUrl: "https://docs.amovlab.com/su17/#/",
    purchaseUrl: "https://item.taobao.com/item.htm?id=839797616353"
  },
  {
    id: "cl-p600",
    name: "P600 科研无人机开发平台",
    nameEn: "P600 Research UAV Development Platform",
    subcategory: "research",
    description: "大型科研无人机开发平台，轴距600mm，支持大负载和长续航，配备Allspark 2机载计算机，适用于复杂科研任务和室外大规模实验。",
    descriptionEn: "Large research UAV platform with 600mm wheelbase, supporting heavy payloads and extended flight time. Equipped with Allspark 2 onboard computer for complex research tasks and large-scale outdoor experiments.",
    image: "https://qiniu.md.amovlab.com/img/p/202410/20241030/2006091054142280949989376.jpg",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202410/20241030/2006091054142280949989376.jpg",
      "https://qiniu.md.amovlab.com/img/p/202409/20240909/1433127092769058843623424.jpg",
      "https://qiniu.md.amovlab.com/img/p/202410/20241030/2006181091350594905341952.jpg"
    ],
    specs: {
      "机型": "六旋翼",
      "轴距": "600mm",
      "起飞重量": "4.5kg",
      "最大载荷": "2kg",
      "续航时间": "30min",
      "飞控": "Pixhawk 6X",
      "机载计算机": "Allspark 2",
      "图传": "LQ-3"
    },
    specsEn: {
      "Type": "Hexacopter",
      "Wheelbase": "600mm",
      "Takeoff Weight": "4.5kg",
      "Max Payload": "2kg",
      "Flight Time": "30min",
      "Flight Controller": "Pixhawk 6X",
      "Onboard Computer": "Allspark 2",
      "Video Link": "LQ-3"
    },
    features: ["大载荷能力", "高性能计算平台", "长续航设计", "模块化负载"],
    featuresEn: ["Heavy Payload Capacity", "High-Performance Computing", "Long Endurance Design", "Modular Payload"],
    highlights: ["室外大规模实验", "支持多传感器融合", "工业级可靠性"],
    highlightsEn: ["Large-scale Outdoor Experiments", "Multi-sensor Fusion Support", "Industrial-grade Reliability"],
    documentUrl: "https://docs.amovlab.com/p600u-v2-wiki-P600Allspark2/#/",
    purchaseUrl: "https://item.taobao.com/item.htm?id=834820366178"
  },
  {
    id: "cl-p450",
    name: "P450 科研无人机开发平台",
    nameEn: "P450 Research UAV Development Platform",
    subcategory: "research",
    description: "中型科研无人机开发平台，轴距450mm，平衡了便携性与负载能力，支持RTK高精度定位，适用于自主导航、视觉算法等研究。",
    descriptionEn: "Medium-sized research UAV platform with 450mm wheelbase, balancing portability and payload capacity. Supports RTK high-precision positioning for autonomous navigation and visual algorithm research.",
    image: "https://qiniu.md.amovlab.com/img/p/202505/20250507/1113335306427318447734784.jpg",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202505/20250507/1113335306427318447734784.jpg",
      "https://qiniu.md.amovlab.com/img/p/202505/20250507/1113445259179721383575552.jpg",
      "https://qiniu.md.amovlab.com/img/p/202505/20250507/1113375289772881813798912.jpg"
    ],
    specs: {
      "机型": "四旋翼",
      "轴距": "450mm",
      "起飞重量": "2.2kg",
      "最大载荷": "800g",
      "续航时间": "25min",
      "飞控": "Pixhawk 6C",
      "定位": "RTK可选"
    },
    specsEn: {
      "Type": "Quadrotor",
      "Wheelbase": "450mm",
      "Takeoff Weight": "2.2kg",
      "Max Payload": "800g",
      "Flight Time": "25min",
      "Flight Controller": "Pixhawk 6C",
      "Positioning": "RTK Optional"
    },
    features: ["RTK高精度定位", "视觉导航", "开源代码", "模块化"],
    featuresEn: ["RTK High-Precision Positioning", "Visual Navigation", "Open Source Code", "Modular Design"],
    highlights: ["入门科研首选", "室内外通用", "丰富教程"],
    highlightsEn: ["Ideal for Research Beginners", "Indoor/Outdoor Versatile", "Rich Tutorials"],
    documentUrl: "https://docs.amovlab.com/p450-v2-rtk/#/",
    purchaseUrl: "https://item.taobao.com/item.htm?id=747118449265"
  },
  {
    id: "cl-p230",
    name: "P230科研无人机",
    nameEn: "P230 Research UAV",
    subcategory: "research",
    description: "紧凑型科研无人机，轴距230mm，专为室内科研场景设计，支持光流/UWB/MOCAP定位，适合SLAM、视觉算法研究。",
    descriptionEn: "Compact research UAV with 230mm wheelbase, designed for indoor research scenarios. Supports optical flow/UWB/MOCAP positioning, suitable for SLAM and visual algorithm research.",
    image: "https://qiniu.md.amovlab.com/img/p/202405/20240520/1839015175165283471556608.jpg",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202405/20240520/1839015175165283471556608.jpg",
      "https://qiniu.md.amovlab.com/img/p/202405/20240520/1839315049770448263413760.jpg",
      "https://qiniu.md.amovlab.com/img/p/202405/20240520/1839015175134547880280064.jpg"
    ],
    specs: {
      "机型": "四旋翼",
      "轴距": "230mm",
      "起飞重量": "500g",
      "续航时间": "15min",
      "飞控": "Pixhawk",
      "定位": "光流/UWB/MOCAP"
    },
    specsEn: {
      "Type": "Quadrotor",
      "Wheelbase": "230mm",
      "Takeoff Weight": "500g",
      "Flight Time": "15min",
      "Flight Controller": "Pixhawk",
      "Positioning": "Optical Flow/UWB/MOCAP"
    },
    features: ["室内专用", "多定位模式", "轻量化", "安全设计"],
    featuresEn: ["Indoor Dedicated", "Multi-positioning Modes", "Lightweight", "Safe Design"],
    highlights: ["实验室首选", "快速部署", "低成本验证"],
    highlightsEn: ["Lab Preferred", "Quick Deployment", "Low-cost Validation"],
    documentUrl: "https://docs.amovlab.com/p250u-v2/#/",
    purchaseUrl: "https://item.taobao.com/item.htm?id=766557715161"
  },
  {
    id: "cl-jcv600",
    name: "JCV-600 基础款无人机",
    nameEn: "JCV-600 Basic UAV",
    subcategory: "research",
    description: "基础款科研无人机，600mm轴距六旋翼设计，适合入门级科研教学和基础飞行测试。",
    descriptionEn: "Basic research UAV with 600mm wheelbase hexacopter design, suitable for entry-level research education and basic flight testing.",
    image: "https://qiniu.md.amovlab.com/img/p/202203/20220329/1608517953410180757159936.jpg",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202203/20220329/1608517953410180757159936.jpg"
    ],
    specs: {
      "机型": "六旋翼",
      "轴距": "600mm",
      "飞控": "Pixhawk",
      "续航时间": "20min"
    },
    specsEn: {
      "Type": "Hexacopter",
      "Wheelbase": "600mm",
      "Flight Controller": "Pixhawk",
      "Flight Time": "20min"
    },
    features: ["稳定可靠", "易于维护", "开源兼容"],
    featuresEn: ["Stable & Reliable", "Easy Maintenance", "Open Source Compatible"],
    highlights: ["教学入门", "性价比高"],
    highlightsEn: ["Teaching Entry-level", "Cost-effective"],
    documentUrl: "",
    purchaseUrl: ""
  }
];

// ==================== 基础飞行平台 ====================
export const basicFlightPlatforms: ResearchPlatformProduct[] = [
  {
    id: "cl-f230",
    name: "F230基础飞行平台",
    nameEn: "F230 Basic Flight Platform",
    subcategory: "basic",
    description: "入门级基础飞行平台，轴距230mm，采用开源飞控，适合飞行爱好者和初学者进行基础飞行训练和二次开发。",
    descriptionEn: "Entry-level basic flight platform with 230mm wheelbase, using open-source flight controller. Suitable for flight enthusiasts and beginners for basic flight training and secondary development.",
    image: "https://qiniu.md.amovlab.com/img/p/202407/20240710/1513533313730757394006016.jpg",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202407/20240710/1513533313730757394006016.jpg",
      "https://qiniu.md.amovlab.com/img/p/202407/20240710/1513533314152367217278976.jpg",
      "https://qiniu.md.amovlab.com/img/p/202407/20240710/1513533313946344799961088.jpg"
    ],
    specs: {
      "机型": "四旋翼",
      "轴距": "230mm",
      "起飞重量": "380g",
      "续航时间": "12min",
      "飞控": "开源飞控"
    },
    specsEn: {
      "Type": "Quadrotor",
      "Wheelbase": "230mm",
      "Takeoff Weight": "380g",
      "Flight Time": "12min",
      "Flight Controller": "Open Source FC"
    },
    features: ["入门友好", "开源飞控", "易于维修", "低成本"],
    featuresEn: ["Beginner Friendly", "Open Source FC", "Easy Repair", "Low Cost"],
    highlights: ["飞行训练", "二次开发基础"],
    highlightsEn: ["Flight Training", "Development Foundation"],
    documentUrl: "https://docs.amovlab.com/sfp-v1-v6c/#/",
    purchaseUrl: "https://item.taobao.com/item.htm?id=727717824799"
  },
  {
    id: "cl-f410",
    name: "F410基础飞行平台",
    nameEn: "F410 Basic Flight Platform",
    subcategory: "basic",
    description: "中型基础飞行平台，轴距410mm，更强的载荷能力和续航性能，适合进阶飞行训练和轻量级应用开发。",
    descriptionEn: "Medium basic flight platform with 410mm wheelbase, offering stronger payload capacity and endurance. Suitable for advanced flight training and lightweight application development.",
    image: "https://qiniu.md.amovlab.com/img/p/202509/20250910/1128193588254623753732096.png",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202509/20250910/1128193588254623753732096.png",
      "https://qiniu.md.amovlab.com/img/p/202509/20250910/1121151812288331707219968.jpg",
      "https://qiniu.md.amovlab.com/img/p/202509/20250910/1121151811856828808462336.jpg"
    ],
    specs: {
      "机型": "四旋翼",
      "轴距": "410mm",
      "起飞重量": "1.2kg",
      "续航时间": "20min",
      "飞控": "Pixhawk 6C"
    },
    specsEn: {
      "Type": "Quadrotor",
      "Wheelbase": "410mm",
      "Takeoff Weight": "1.2kg",
      "Flight Time": "20min",
      "Flight Controller": "Pixhawk 6C"
    },
    features: ["中型平台", "扩展性强", "Pixhawk飞控", "稳定飞行"],
    featuresEn: ["Medium Platform", "High Extensibility", "Pixhawk FC", "Stable Flight"],
    highlights: ["进阶训练", "轻量应用"],
    highlightsEn: ["Advanced Training", "Lightweight Applications"],
    documentUrl: "https://docs.amovlab.com/f450-v6c-wiki/#/",
    purchaseUrl: "https://item.taobao.com/item.htm?id=713417934359"
  },
  {
    id: "cl-easydrone-z410",
    name: "EasyDrone Z410升级款无人机",
    nameEn: "EasyDrone Z410 Upgraded UAV",
    subcategory: "basic",
    description: "EasyDrone系列升级款，410mm轴距，预装调试完成，到手即飞，适合教育培训和快速入门。",
    descriptionEn: "Upgraded EasyDrone series with 410mm wheelbase, pre-installed and calibrated, ready to fly out of the box. Suitable for education and quick start.",
    image: "https://qiniu.md.amovlab.com/img/p/202403/20240327/1551247414478027117133824.jpg",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202403/20240327/1551247414478027117133824.jpg",
      "https://qiniu.md.amovlab.com/img/p/202403/20240327/1551427339542146187362304.jpg",
      "https://qiniu.md.amovlab.com/img/p/202403/20240327/1551247414489452103434240.jpg"
    ],
    specs: {
      "机型": "四旋翼",
      "轴距": "410mm",
      "到手即飞": "是",
      "续航时间": "18min"
    },
    specsEn: {
      "Type": "Quadrotor",
      "Wheelbase": "410mm",
      "Ready to Fly": "Yes",
      "Flight Time": "18min"
    },
    features: ["到手即飞", "预装调试", "教育适用", "快速上手"],
    featuresEn: ["Ready to Fly", "Pre-calibrated", "Education Suitable", "Quick Start"],
    highlights: ["新手友好", "教育首选"],
    highlightsEn: ["Beginner Friendly", "Education Preferred"],
    documentUrl: "https://docs.amovlab.com/easydrone-wiki/#/",
    purchaseUrl: "https://item.taobao.com/item.htm?id=739244799999"
  }
];

// ==================== 集群编队开发套件 ====================
export const swarmFormationKits: ResearchPlatformProduct[] = [
  {
    id: "cl-p230-uwb",
    name: "P230-UWB 集群编队开发套件",
    nameEn: "P230-UWB Swarm Formation Development Kit",
    subcategory: "research",
    description: "基于UWB定位的集群编队开发套件，包含多架P230无人机和UWB定位系统，支持室内外集群编队飞行研究。",
    descriptionEn: "UWB positioning-based swarm formation development kit, including multiple P230 UAVs and UWB positioning system. Supports indoor/outdoor swarm formation flight research.",
    image: "https://qiniu.md.amovlab.com/img/p/202407/20240710/1540083290100602561789952.jpg",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202407/20240710/1540083290100602561789952.jpg",
      "https://qiniu.md.amovlab.com/img/p/202407/20240710/1540083289882241009614848.jpg",
      "https://qiniu.md.amovlab.com/img/p/202407/20240710/1540083289871997013491712.jpg"
    ],
    specs: {
      "无人机": "P230 x 多架",
      "定位系统": "UWB",
      "定位精度": "10cm",
      "通信": "无线组网",
      "应用": "集群编队"
    },
    specsEn: {
      "UAVs": "P230 x Multiple",
      "Positioning": "UWB",
      "Accuracy": "10cm",
      "Communication": "Wireless Network",
      "Applications": "Swarm Formation"
    },
    features: ["UWB定位", "多机协同", "室内外通用", "开源软件"],
    featuresEn: ["UWB Positioning", "Multi-UAV Coordination", "Indoor/Outdoor Versatile", "Open Source Software"],
    highlights: ["集群研究", "编队控制", "协同算法"],
    highlightsEn: ["Swarm Research", "Formation Control", "Cooperative Algorithms"],
    documentUrl: "https://wiki.amovlab.com/public/formationwiki/",
    purchaseUrl: "https://item.taobao.com/item.htm?id=642332624704"
  },
  {
    id: "cl-p600-swarm",
    name: "P600集群编队开发套件",
    nameEn: "P600 Swarm Formation Development Kit",
    subcategory: "research",
    description: "大型无人机集群编队套件，基于P600平台，支持更大载荷和更长续航的集群编队实验。",
    descriptionEn: "Large UAV swarm formation kit based on P600 platform, supporting heavier payloads and longer endurance swarm formation experiments.",
    image: "https://qiniu.md.amovlab.com/img/p/202310/20231027/1707497608159648083968000.jpg",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202310/20231027/1707497608159648083968000.jpg"
    ],
    specs: {
      "无人机": "P600 x 多架",
      "载荷能力": "大载荷",
      "续航": "长续航",
      "应用": "室外集群"
    },
    specsEn: {
      "UAVs": "P600 x Multiple",
      "Payload": "Heavy Payload",
      "Endurance": "Long Endurance",
      "Applications": "Outdoor Swarm"
    },
    features: ["大型平台", "长续航", "室外适用"],
    featuresEn: ["Large Platform", "Long Endurance", "Outdoor Suitable"],
    highlights: ["大规模集群", "室外实验"],
    highlightsEn: ["Large-scale Swarm", "Outdoor Experiments"],
    documentUrl: "",
    purchaseUrl: ""
  }
];

// 合并所有产品
export const allResearchPlatforms = [
  ...researchDronePlatforms,
  ...basicFlightPlatforms,
  ...swarmFormationKits
];

// 多旋翼子分类
export const multiRotorSubcategories = [
  {
    id: "research",
    name: "科研无人机开发平台",
    nameEn: "Research UAV Platforms",
    description: "高性能科研无人机，支持ROS开发",
    descriptionEn: "High-performance research UAVs with ROS support",
    products: researchDronePlatforms
  },
  {
    id: "basic",
    name: "基础飞行平台",
    nameEn: "Basic Flight Platforms", 
    description: "入门级飞行平台，适合飞行训练",
    descriptionEn: "Entry-level flight platforms for training",
    products: basicFlightPlatforms
  },
  {
    id: "swarm",
    name: "集群编队开发套件",
    nameEn: "Swarm Formation Dev Kits",
    description: "多机协同编队开发平台",
    descriptionEn: "Multi-UAV cooperative formation platform",
    products: swarmFormationKits
  }
];
