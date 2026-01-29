/**
 * Amovlab 阿木实验室产品数据
 * 数据来源: https://www.amovlab.com/product/
 */

export interface AmovlabProduct {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  subcategory?: string;
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
  taobaoUrl?: string;
  jdUrl?: string;
}

// ==================== 科研无人机开发平台 ====================
export const researchDronePlatforms: AmovlabProduct[] = [
  {
    id: "amov-su17",
    name: "阿木SU17科研版无人机",
    nameEn: "Amov SU17 Research UAV",
    category: "research-drones",
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
    taobaoUrl: "https://item.taobao.com/item.htm?id=839797616353"
  },
  {
    id: "amov-p600",
    name: "P600 科研无人机开发平台",
    nameEn: "P600 Research UAV Development Platform",
    category: "research-drones",
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
    taobaoUrl: "https://item.taobao.com/item.htm?id=834820366178"
  },
  {
    id: "amov-p450",
    name: "P450 科研无人机开发平台",
    nameEn: "P450 Research UAV Development Platform",
    category: "research-drones",
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
    taobaoUrl: "https://item.taobao.com/item.htm?id=747118449265"
  },
  {
    id: "amov-p230",
    name: "P230科研无人机",
    nameEn: "P230 Research UAV",
    category: "research-drones",
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
    taobaoUrl: "https://item.taobao.com/item.htm?id=766557715161"
  },
  {
    id: "amov-jcv600",
    name: "JCV-600 基础款无人机",
    nameEn: "JCV-600 Basic UAV",
    category: "research-drones",
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
    taobaoUrl: ""
  }
];

// ==================== 基础飞行平台 ====================
export const basicFlightPlatforms: AmovlabProduct[] = [
  {
    id: "amov-f230",
    name: "F230基础飞行平台",
    nameEn: "F230 Basic Flight Platform",
    category: "basic-platforms",
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
    taobaoUrl: "https://item.taobao.com/item.htm?id=727717824799"
  },
  {
    id: "amov-f410",
    name: "F410基础飞行平台",
    nameEn: "F410 Basic Flight Platform",
    category: "basic-platforms",
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
    taobaoUrl: "https://item.taobao.com/item.htm?id=713417934359",
    jdUrl: "https://i-item.jd.com/100055837848.html"
  },
  {
    id: "amov-easydrone-z410",
    name: "EasyDrone Z410升级款无人机",
    nameEn: "EasyDrone Z410 Upgraded UAV",
    category: "basic-platforms",
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
    taobaoUrl: "https://item.taobao.com/item.htm?id=739244799999"
  }
];

// ==================== 机载计算机 ====================
export const onboardComputers: AmovlabProduct[] = [
  {
    id: "amov-allspark2-x86",
    name: "Allspark 2-x86机载计算机",
    nameEn: "Allspark 2-x86 Onboard Computer",
    category: "onboard-computers",
    description: "高性能x86架构机载计算机，搭载Intel处理器，支持Ubuntu系统，适用于复杂算法运行和数据处理。",
    descriptionEn: "High-performance x86 architecture onboard computer with Intel processor, supporting Ubuntu system. Suitable for complex algorithm execution and data processing.",
    image: "https://qiniu.md.amovlab.com/img/p/202310/20231027/1700068897179634043355136.jpg",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202310/20231027/1700068897179634043355136.jpg",
      "https://qiniu.md.amovlab.com/img/p/202310/20231023/1225292869726570224713728.jpg",
      "https://qiniu.md.amovlab.com/img/p/202310/20231023/1225292869674687078498304.jpg"
    ],
    specs: {
      "处理器": "Intel Core i7",
      "内存": "16GB DDR4",
      "存储": "512GB NVMe SSD",
      "系统": "Ubuntu 20.04",
      "接口": "USB3.0/HDMI/Ethernet/Serial",
      "重量": "350g"
    },
    specsEn: {
      "Processor": "Intel Core i7",
      "Memory": "16GB DDR4",
      "Storage": "512GB NVMe SSD",
      "OS": "Ubuntu 20.04",
      "Interfaces": "USB3.0/HDMI/Ethernet/Serial",
      "Weight": "350g"
    },
    features: ["x86架构", "高性能", "ROS兼容", "多接口"],
    featuresEn: ["x86 Architecture", "High Performance", "ROS Compatible", "Multiple Interfaces"],
    highlights: ["算法开发", "数据处理", "通用性强"],
    highlightsEn: ["Algorithm Development", "Data Processing", "High Versatility"],
    documentUrl: "https://docs.amovlab.com/allspark2-x86/#/",
    taobaoUrl: "https://item.taobao.com/item.htm?id=742261216686"
  },
  {
    id: "amov-allspark2-orin-nx",
    name: "Allspark 2-Orin NX 机载计算机",
    nameEn: "Allspark 2-Orin NX Onboard Computer",
    category: "onboard-computers",
    description: "搭载NVIDIA Jetson Orin NX模块的高性能AI机载计算机，100 TOPS算力，支持深度学习推理和视觉处理。",
    descriptionEn: "High-performance AI onboard computer with NVIDIA Jetson Orin NX module, 100 TOPS computing power, supporting deep learning inference and visual processing.",
    image: "https://qiniu.md.amovlab.com/img/p/202506/20250616/1721588452315242469359616.png",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202506/20250616/1721588452315242469359616.png",
      "https://qiniu.md.amovlab.com/img/p/202506/20250616/1722048424266314419372032.jpg",
      "https://qiniu.md.amovlab.com/img/p/202506/20250616/1722048424552735680069632.jpg"
    ],
    specs: {
      "模块": "Jetson Orin NX 16GB",
      "算力": "100 TOPS",
      "GPU": "1024 CUDA核心",
      "接口": "USB3.2/HDMI/GbE/CAN",
      "系统": "JetPack 5.x",
      "功耗": "15-25W"
    },
    specsEn: {
      "Module": "Jetson Orin NX 16GB",
      "Computing Power": "100 TOPS",
      "GPU": "1024 CUDA Cores",
      "Interfaces": "USB3.2/HDMI/GbE/CAN",
      "OS": "JetPack 5.x",
      "Power": "15-25W"
    },
    features: ["Orin NX", "100 TOPS算力", "AI推理", "视觉处理"],
    featuresEn: ["Orin NX", "100 TOPS Computing", "AI Inference", "Visual Processing"],
    highlights: ["深度学习", "边缘AI", "高能效比"],
    highlightsEn: ["Deep Learning", "Edge AI", "High Energy Efficiency"],
    documentUrl: "https://docs.amovlab.com/allspark2-orin/#/",
    taobaoUrl: "https://item.taobao.com/item.htm?id=705748339987"
  },
  {
    id: "amov-allspark1",
    name: "Allspark 1 机载计算机",
    nameEn: "Allspark 1 Onboard Computer",
    category: "onboard-computers",
    description: "入门级机载计算机，搭载Jetson Xavier NX/Nano模块，性价比高，适合轻量级AI应用开发。",
    descriptionEn: "Entry-level onboard computer with Jetson Xavier NX/Nano module, cost-effective, suitable for lightweight AI application development.",
    image: "https://qiniu.md.amovlab.com/img/p/202205/20220527/1014153849007918003355648.jpg",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202205/20220527/1014153849007918003355648.jpg",
      "https://qiniu.md.amovlab.com/img/p/202403/20240318/1505373095193193352691712.jpg",
      "https://qiniu.md.amovlab.com/img/p/202403/20240318/1505203024433192292483072.jpg"
    ],
    specs: {
      "模块": "Xavier NX/Nano可选",
      "算力": "21 TOPS (Xavier NX)",
      "接口": "USB3.0/HDMI/Serial",
      "系统": "JetPack 4.x"
    },
    specsEn: {
      "Module": "Xavier NX/Nano Optional",
      "Computing Power": "21 TOPS (Xavier NX)",
      "Interfaces": "USB3.0/HDMI/Serial",
      "OS": "JetPack 4.x"
    },
    features: ["性价比高", "轻量级", "Jetson模块", "入门友好"],
    featuresEn: ["Cost-effective", "Lightweight", "Jetson Module", "Beginner Friendly"],
    highlights: ["入门AI", "教育科研"],
    highlightsEn: ["Entry AI", "Education & Research"],
    documentUrl: "https://docs.amovlab.com/allspark-wiki-allspark-nx/#/",
    taobaoUrl: "https://item.taobao.com/item.htm?id=675017162553"
  }
];

// ==================== 图数传模块 ====================
export const videoDataLinks: AmovlabProduct[] = [
  {
    id: "amov-lq3",
    name: "LQ-3 图数传模块",
    nameEn: "LQ-3 Video & Data Link Module",
    category: "video-data-links",
    description: "高性能图数一体化传输模块，支持40Mbps传输速率，1080P高清图传，低延时设计，适用于无人机远程控制和视频回传。",
    descriptionEn: "High-performance integrated video and data transmission module with 40Mbps transmission rate, 1080P HD video transmission, low-latency design. Suitable for UAV remote control and video feedback.",
    image: "https://qiniu.md.amovlab.com/img/p/202405/20240514/1823096781516166478266368.jpg",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202405/20240514/1823096781516166478266368.jpg",
      "https://qiniu.md.amovlab.com/img/p/202405/20240514/1839322656767118598569984.jpg",
      "https://qiniu.md.amovlab.com/img/p/202405/20240514/1839202707743318002991104.jpg"
    ],
    specs: {
      "传输速率": "40Mbps",
      "视频分辨率": "1080P",
      "传输距离": "10km",
      "延时": "<100ms",
      "工作电压": "DC 10V-26V",
      "接口": "USB3.2/HDMI/UART",
      "频段": "2.4GHz"
    },
    specsEn: {
      "Data Rate": "40Mbps",
      "Video Resolution": "1080P",
      "Range": "10km",
      "Latency": "<100ms",
      "Voltage": "DC 10V-26V",
      "Interfaces": "USB3.2/HDMI/UART",
      "Frequency": "2.4GHz"
    },
    features: ["图数一体", "低延时", "长距离", "高清传输"],
    featuresEn: ["Integrated Video/Data", "Low Latency", "Long Range", "HD Transmission"],
    highlights: ["易用性", "兼容性", "通用性", "扩展性"],
    highlightsEn: ["Easy to Use", "Compatibility", "Versatility", "Extensibility"],
    documentUrl: "https://docs.amovlab.com/amov-lq-wiki/#/",
    taobaoUrl: "https://item.taobao.com/item.htm?id=795845432339"
  },
  {
    id: "amov-mini-homer",
    name: "Mini Homer 图数传模块",
    nameEn: "Mini Homer Video & Data Link Module",
    category: "video-data-links",
    description: "小型化图数传模块，体积紧凑，重量轻，适用于小型无人机和便携式应用场景。",
    descriptionEn: "Compact video and data link module with small size and light weight. Suitable for small UAVs and portable applications.",
    image: "https://qiniu.md.amovlab.com/img/p/202208/20220808/1034322938472306470453248.jpg",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202208/20220808/1034322938472306470453248.jpg",
      "https://qiniu.md.amovlab.com/img/p/202208/20220808/102603802766615052451840.jpg",
      "https://qiniu.md.amovlab.com/img/p/202208/20220808/102553762126581370880000.jpg"
    ],
    specs: {
      "传输速率": "20Mbps",
      "视频分辨率": "720P",
      "传输距离": "5km",
      "重量": "50g"
    },
    specsEn: {
      "Data Rate": "20Mbps",
      "Video Resolution": "720P",
      "Range": "5km",
      "Weight": "50g"
    },
    features: ["小型化", "轻量", "便携", "低功耗"],
    featuresEn: ["Compact", "Lightweight", "Portable", "Low Power"],
    highlights: ["小型无人机", "便携应用"],
    highlightsEn: ["Small UAVs", "Portable Applications"],
    documentUrl: "https://docs.amovlab.com/minihomer-wiki/#/",
    taobaoUrl: "https://item.taobao.com/item.htm?id=679463009690"
  }
];

// ==================== 开源飞控 ====================
export const flightControllers: AmovlabProduct[] = [
  {
    id: "amov-icf5",
    name: "ICF5开源飞控",
    nameEn: "ICF5 Open Source Flight Controller",
    category: "flight-controllers",
    description: "高性能开源飞控，基于PX4/ArduPilot固件，支持多种机型配置，适用于科研开发和定制化需求。",
    descriptionEn: "High-performance open-source flight controller based on PX4/ArduPilot firmware, supporting various airframe configurations. Suitable for research development and customization needs.",
    image: "https://qiniu.md.amovlab.com/img/p/202310/20231027/1710107014397131511398400.jpg",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202310/20231027/1710107014397131511398400.jpg",
      "https://qiniu.md.amovlab.com/img/p/202304/20230411/1629145733093371157774336.jpg",
      "https://qiniu.md.amovlab.com/img/p/202304/20230411/1629145733305077016395776.jpg"
    ],
    specs: {
      "处理器": "STM32H7",
      "IMU": "双冗余IMU",
      "固件": "PX4/ArduPilot",
      "接口": "CAN/Serial/I2C/SPI",
      "尺寸": "50x30mm"
    },
    specsEn: {
      "Processor": "STM32H7",
      "IMU": "Dual Redundant IMU",
      "Firmware": "PX4/ArduPilot",
      "Interfaces": "CAN/Serial/I2C/SPI",
      "Size": "50x30mm"
    },
    features: ["开源固件", "双冗余IMU", "多接口", "高性能处理器"],
    featuresEn: ["Open Source Firmware", "Dual Redundant IMU", "Multiple Interfaces", "High-performance Processor"],
    highlights: ["科研开发", "定制化", "社区支持"],
    highlightsEn: ["Research Development", "Customization", "Community Support"],
    documentUrl: "https://docs.amovlab.com/icf5-wiki/#/",
    taobaoUrl: "https://item.taobao.com/item.htm?id=705459383848"
  }
];

// ==================== 视觉/算法开发套件 ====================
export const visionAlgorithmKits: AmovlabProduct[] = [
  {
    id: "amov-spirecv",
    name: "SpireCV视觉开发者套件",
    nameEn: "SpireCV Vision Developer Kit",
    category: "vision-algorithm-kits",
    description: "专为无人机视觉算法开发设计的套件，集成深度相机、机载计算机和开发软件，支持目标检测、跟踪、SLAM等应用。",
    descriptionEn: "Development kit designed for UAV visual algorithm development, integrating depth camera, onboard computer, and development software. Supports object detection, tracking, SLAM, and more.",
    image: "https://qiniu.md.amovlab.com/img/p/202407/20240710/1534571987103644306014208.png",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202407/20240710/1534571987103644306014208.png",
      "https://qiniu.md.amovlab.com/img/p/202407/20240710/152959737751265303232512.jpg",
      "https://qiniu.md.amovlab.com/img/p/202407/20240710/152946684323051117903872.jpg"
    ],
    specs: {
      "深度相机": "Intel RealSense D435i",
      "机载计算机": "Jetson模块",
      "软件框架": "ROS/SpireCV SDK",
      "应用": "目标检测/跟踪/SLAM"
    },
    specsEn: {
      "Depth Camera": "Intel RealSense D435i",
      "Onboard Computer": "Jetson Module",
      "Software Framework": "ROS/SpireCV SDK",
      "Applications": "Detection/Tracking/SLAM"
    },
    features: ["视觉算法", "深度相机", "开发SDK", "完整套件"],
    featuresEn: ["Visual Algorithms", "Depth Camera", "Development SDK", "Complete Kit"],
    highlights: ["算法验证", "快速开发", "教程丰富"],
    highlightsEn: ["Algorithm Validation", "Rapid Development", "Rich Tutorials"],
    documentUrl: "https://docs.amovlab.com/spirecvkit/#/",
    taobaoUrl: "https://item.taobao.com/item.htm?id=739895116174"
  },
  {
    id: "amov-matlab-algorithm",
    name: "Matlab无人机算法开发套件",
    nameEn: "Matlab UAV Algorithm Development Kit",
    category: "vision-algorithm-kits",
    description: "基于Matlab/Simulink的无人机算法开发套件，支持模型在环仿真，快速验证控制算法并部署到实机。",
    descriptionEn: "Matlab/Simulink-based UAV algorithm development kit, supporting model-in-the-loop simulation for rapid validation and deployment of control algorithms.",
    image: "https://qiniu.md.amovlab.com/img/p/202310/20231027/1705278201936164773527552.jpg",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202310/20231027/1705278201936164773527552.jpg",
      "https://qiniu.md.amovlab.com/img/p/202307/20230705/1425013191349566519738368.jpg",
      "https://qiniu.md.amovlab.com/img/p/202307/20230705/1425013191406527055495168.jpg"
    ],
    specs: {
      "平台": "Matlab/Simulink",
      "功能": "模型在环仿真",
      "支持": "自动代码生成",
      "部署": "PX4飞控"
    },
    specsEn: {
      "Platform": "Matlab/Simulink",
      "Function": "Model-in-the-loop Simulation",
      "Support": "Auto Code Generation",
      "Deploy": "PX4 Flight Controller"
    },
    features: ["Matlab集成", "仿真验证", "代码生成", "快速部署"],
    featuresEn: ["Matlab Integration", "Simulation Validation", "Code Generation", "Rapid Deployment"],
    highlights: ["控制算法", "科研高效", "仿真先行"],
    highlightsEn: ["Control Algorithms", "Research Efficient", "Simulation First"],
    documentUrl: "https://docs.amovlab.com/prometheus-matlab-toolbox-wiki/#/",
    taobaoUrl: "https://item.taobao.com/item.htm?id=727053072303"
  },
  {
    id: "amov-matlab-simulation",
    name: "Matlab仿真开发套件",
    nameEn: "Matlab Simulation Development Kit",
    category: "vision-algorithm-kits",
    description: "Matlab仿真开发套件，提供完整的无人机仿真环境，支持飞行动力学模型、传感器模型和环境模型。",
    descriptionEn: "Matlab simulation development kit providing complete UAV simulation environment, supporting flight dynamics models, sensor models, and environment models.",
    image: "https://qiniu.md.amovlab.com/img/p/202404/20240403/1517516344698396720332800.png",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202404/20240403/1517516344698396720332800.png"
    ],
    specs: {
      "平台": "Matlab/Simulink",
      "模型": "飞行动力学/传感器/环境",
      "仿真": "硬件在环支持"
    },
    specsEn: {
      "Platform": "Matlab/Simulink",
      "Models": "Flight Dynamics/Sensors/Environment",
      "Simulation": "HIL Support"
    },
    features: ["完整仿真", "动力学模型", "传感器模型"],
    featuresEn: ["Complete Simulation", "Dynamics Model", "Sensor Model"],
    highlights: ["仿真开发", "算法验证"],
    highlightsEn: ["Simulation Development", "Algorithm Validation"],
    documentUrl: "",
    taobaoUrl: ""
  },
  {
    id: "amov-mocap-formation",
    name: "MOCAP编队飞行套件",
    nameEn: "MOCAP Formation Flight Kit",
    category: "vision-algorithm-kits",
    description: "基于动作捕捉系统的室内编队飞行套件，实现厘米级定位精度，支持多机协同和编队控制算法验证。",
    descriptionEn: "Indoor formation flight kit based on motion capture system, achieving centimeter-level positioning accuracy. Supports multi-UAV coordination and formation control algorithm validation.",
    image: "https://qiniu.md.amovlab.com/img/p/202405/20240524/1629538518361746044452864.jpg",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202405/20240524/1629538518361746044452864.jpg"
    ],
    specs: {
      "定位系统": "动作捕捉(MOCAP)",
      "定位精度": "厘米级",
      "支持数量": "多机",
      "应用": "编队飞行/协同控制"
    },
    specsEn: {
      "Positioning": "Motion Capture (MOCAP)",
      "Accuracy": "Centimeter-level",
      "Support": "Multi-UAV",
      "Applications": "Formation Flight/Cooperative Control"
    },
    features: ["MOCAP定位", "厘米级精度", "多机协同", "室内专用"],
    featuresEn: ["MOCAP Positioning", "Centimeter Accuracy", "Multi-UAV Coordination", "Indoor Dedicated"],
    highlights: ["编队算法", "协同控制", "高精度"],
    highlightsEn: ["Formation Algorithms", "Cooperative Control", "High Precision"],
    documentUrl: "",
    taobaoUrl: ""
  }
];

// ==================== 集群编队开发套件 ====================
export const swarmFormationKits: AmovlabProduct[] = [
  {
    id: "amov-p230-uwb",
    name: "P230-UWB 集群编队开发套件",
    nameEn: "P230-UWB Swarm Formation Development Kit",
    category: "swarm-formation-kits",
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
    taobaoUrl: "https://item.taobao.com/item.htm?id=642332624704"
  },
  {
    id: "amov-p600-swarm",
    name: "P600集群编队开发套件",
    nameEn: "P600 Swarm Formation Development Kit",
    category: "swarm-formation-kits",
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
    taobaoUrl: ""
  }
];

// ==================== 科研无人车 ====================
export const researchUGVs: AmovlabProduct[] = [
  {
    id: "amov-r300",
    name: "R300科研无人车",
    nameEn: "R300 Research UGV",
    category: "research-ugvs",
    description: "科研级无人地面车辆，搭载ROS系统和多种传感器，支持自主导航、SLAM、路径规划等算法研究。",
    descriptionEn: "Research-grade unmanned ground vehicle equipped with ROS system and various sensors. Supports autonomous navigation, SLAM, path planning, and other algorithm research.",
    image: "https://qiniu.md.amovlab.com/img/p/202203/20220328/1828203197873674422157312.jpg",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202203/20220328/1828203197873674422157312.jpg",
      "https://qiniu.md.amovlab.com/img/p/202203/20220328/1828433100912206099873792.jpg",
      "https://qiniu.md.amovlab.com/img/p/202203/20220328/1828253177613015533060096.jpg"
    ],
    specs: {
      "底盘类型": "差速驱动",
      "最大速度": "2m/s",
      "载荷能力": "20kg",
      "传感器": "激光雷达/深度相机/IMU",
      "计算平台": "Jetson/x86可选",
      "系统": "ROS"
    },
    specsEn: {
      "Chassis Type": "Differential Drive",
      "Max Speed": "2m/s",
      "Payload Capacity": "20kg",
      "Sensors": "LiDAR/Depth Camera/IMU",
      "Computing": "Jetson/x86 Optional",
      "System": "ROS"
    },
    features: ["ROS系统", "多传感器", "自主导航", "开源软件"],
    featuresEn: ["ROS System", "Multi-sensor", "Autonomous Navigation", "Open Source Software"],
    highlights: ["地面机器人研究", "SLAM/导航", "空地协同"],
    highlightsEn: ["Ground Robot Research", "SLAM/Navigation", "Air-Ground Coordination"],
    documentUrl: "https://docs.amovlab.com/Easycar-R300/#/",
    taobaoUrl: "https://item.taobao.com/item.htm?id=650567660073"
  }
];

// ==================== 光学变焦吊舱 ====================
export const opticalGimbals: AmovlabProduct[] = [
  {
    id: "amov-gx40",
    name: "GX40光学变焦吊舱",
    nameEn: "GX40 Optical Zoom Gimbal",
    category: "optical-gimbals",
    description: "40倍光学变焦三轴稳定吊舱，支持4K视频拍摄，适用于巡检、搜救、测绘等远距离目标识别场景。",
    descriptionEn: "40x optical zoom three-axis stabilized gimbal supporting 4K video recording. Suitable for inspection, search and rescue, surveying, and long-range target identification.",
    image: "https://qiniu.md.amovlab.com/img/p/202402/20240218/1443422975944760411193344.png",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202402/20240218/1443422975944760411193344.png",
      "https://qiniu.md.amovlab.com/img/p/202402/20240218/1413364598036038026362880.jpg",
      "https://qiniu.md.amovlab.com/img/p/202404/20240417/1458567917029118745411584.jpg"
    ],
    specs: {
      "变焦": "40倍光学变焦",
      "视频": "4K 30fps",
      "稳定": "三轴机械稳定",
      "云台角度": "俯仰±90°/航向±180°",
      "接口": "HDMI/IP/USB",
      "重量": "800g"
    },
    specsEn: {
      "Zoom": "40x Optical Zoom",
      "Video": "4K 30fps",
      "Stabilization": "3-Axis Mechanical Stabilization",
      "Gimbal Angle": "Pitch ±90°/Yaw ±180°",
      "Interfaces": "HDMI/IP/USB",
      "Weight": "800g"
    },
    features: ["40倍变焦", "4K视频", "三轴稳定", "远距离识别"],
    featuresEn: ["40x Zoom", "4K Video", "3-Axis Stabilization", "Long-range Identification"],
    highlights: ["巡检应用", "搜救任务", "测绘作业"],
    highlightsEn: ["Inspection Applications", "Search & Rescue", "Surveying Operations"],
    documentUrl: "https://docs.amovlab.com/gx40/#/",
    taobaoUrl: "https://item.taobao.com/item.htm?id=759020603474"
  }
];

// ==================== 扩展载板 ====================
export const carrierBoards: AmovlabProduct[] = [
  {
    id: "amov-orin-nx-carrier",
    name: "Orin NX 扩展载板",
    nameEn: "Orin NX Carrier Board",
    category: "carrier-boards",
    description: "专为Jetson Orin NX模块设计的扩展载板，提供丰富的接口扩展，适用于无人机和机器人应用。",
    descriptionEn: "Carrier board designed for Jetson Orin NX module, providing rich interface expansion. Suitable for UAV and robotics applications.",
    image: "https://qiniu.md.amovlab.com/img/p/202404/20240403/1516336673034527411109888.png",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202404/20240403/1516336673034527411109888.png"
    ],
    specs: {
      "适配模块": "Jetson Orin NX",
      "接口": "USB3.2/GbE/CAN/Serial/GPIO",
      "供电": "DC 9-36V",
      "尺寸": "紧凑设计"
    },
    specsEn: {
      "Compatible Module": "Jetson Orin NX",
      "Interfaces": "USB3.2/GbE/CAN/Serial/GPIO",
      "Power": "DC 9-36V",
      "Size": "Compact Design"
    },
    features: ["Orin NX适配", "丰富接口", "宽压输入", "紧凑设计"],
    featuresEn: ["Orin NX Compatible", "Rich Interfaces", "Wide Voltage Input", "Compact Design"],
    highlights: ["无人机应用", "机器人应用"],
    highlightsEn: ["UAV Applications", "Robotics Applications"],
    documentUrl: "",
    taobaoUrl: ""
  },
  {
    id: "amov-xavier-nano-carrier",
    name: "Jetson Xavier NX/Nano 载板",
    nameEn: "Jetson Xavier NX/Nano Carrier Board",
    category: "carrier-boards",
    description: "兼容Jetson Xavier NX和Nano模块的载板，提供必要的接口支持，性价比高。",
    descriptionEn: "Carrier board compatible with Jetson Xavier NX and Nano modules, providing essential interface support with high cost-effectiveness.",
    image: "https://qiniu.md.amovlab.com/img/p/202404/20240403/1516536586938856426274816.png",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202404/20240403/1516536586938856426274816.png"
    ],
    specs: {
      "适配模块": "Xavier NX/Nano",
      "接口": "USB3.0/HDMI/GbE/Serial",
      "供电": "DC 9-20V"
    },
    specsEn: {
      "Compatible Module": "Xavier NX/Nano",
      "Interfaces": "USB3.0/HDMI/GbE/Serial",
      "Power": "DC 9-20V"
    },
    features: ["双模块兼容", "基础接口", "性价比高"],
    featuresEn: ["Dual Module Compatible", "Basic Interfaces", "Cost-effective"],
    highlights: ["入门开发", "轻量应用"],
    highlightsEn: ["Entry Development", "Lightweight Applications"],
    documentUrl: "",
    taobaoUrl: ""
  }
];

// ==================== 地面站 ====================
export const groundStations: AmovlabProduct[] = [
  {
    id: "amov-prometheus-ground",
    name: "Prometheus地面站",
    nameEn: "Prometheus Ground Control Station",
    category: "ground-stations",
    description: "专业级无人机地面站，集成显示器、遥控器和图传接收，支持多机管理和任务规划。",
    descriptionEn: "Professional UAV ground control station integrating display, remote controller, and video receiver. Supports multi-UAV management and mission planning.",
    image: "https://qiniu.md.amovlab.com/img/p/202410/20241016/1221045884928433716297728.jpg",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202410/20241016/1221045884928433716297728.jpg",
      "https://qiniu.md.amovlab.com/img/p/202410/20241016/1157246605545347940777984.jpg",
      "https://qiniu.md.amovlab.com/img/p/202410/20241016/1221115854626591547686912.jpg"
    ],
    specs: {
      "显示": "高亮显示屏",
      "遥控": "集成遥控器",
      "图传": "内置接收机",
      "功能": "多机管理/任务规划",
      "便携": "一体化设计"
    },
    specsEn: {
      "Display": "High-brightness Screen",
      "Control": "Integrated Controller",
      "Video": "Built-in Receiver",
      "Functions": "Multi-UAV Management/Mission Planning",
      "Portable": "Integrated Design"
    },
    features: ["一体化设计", "多机管理", "任务规划", "专业级"],
    featuresEn: ["Integrated Design", "Multi-UAV Management", "Mission Planning", "Professional Grade"],
    highlights: ["专业作业", "高效管理"],
    highlightsEn: ["Professional Operations", "Efficient Management"],
    documentUrl: "https://docs.amovlab.com/prometheusground-pro-wiki-new-2024/#/",
    taobaoUrl: "https://item.taobao.com/item.htm?id=838323366891"
  }
];

// ==================== 全部产品汇总 ====================
export const allAmovlabProducts = [
  ...researchDronePlatforms,
  ...basicFlightPlatforms,
  ...onboardComputers,
  ...videoDataLinks,
  ...flightControllers,
  ...visionAlgorithmKits,
  ...swarmFormationKits,
  ...researchUGVs,
  ...opticalGimbals,
  ...carrierBoards,
  ...groundStations
];

// ==================== 产品分类定义 ====================
export const amovlabCategories = [
  {
    id: "research-drones",
    name: "科研无人机开发平台",
    nameEn: "Research UAV Platforms",
    description: "高性能科研无人机，支持ROS开发，适用于算法验证和科研教学",
    descriptionEn: "High-performance research UAVs with ROS support for algorithm validation and education",
    icon: "Plane",
    products: researchDronePlatforms
  },
  {
    id: "basic-platforms",
    name: "基础飞行平台",
    nameEn: "Basic Flight Platforms",
    description: "入门级飞行平台，适合飞行训练和基础开发",
    descriptionEn: "Entry-level flight platforms for training and basic development",
    icon: "Rocket",
    products: basicFlightPlatforms
  },
  {
    id: "onboard-computers",
    name: "机载计算机",
    nameEn: "Onboard Computers",
    description: "高性能机载计算平台，支持AI推理和复杂算法",
    descriptionEn: "High-performance onboard computing platforms for AI inference and complex algorithms",
    icon: "Cpu",
    products: onboardComputers
  },
  {
    id: "video-data-links",
    name: "图数传模块",
    nameEn: "Video & Data Links",
    description: "图像与数据一体化传输模块，低延时高清传输",
    descriptionEn: "Integrated video and data transmission modules with low latency",
    icon: "Radio",
    products: videoDataLinks
  },
  {
    id: "flight-controllers",
    name: "开源飞控",
    nameEn: "Open Source Flight Controllers",
    description: "基于PX4/ArduPilot的开源飞行控制器",
    descriptionEn: "Open source flight controllers based on PX4/ArduPilot",
    icon: "Settings",
    products: flightControllers
  },
  {
    id: "vision-algorithm-kits",
    name: "视觉/算法开发套件",
    nameEn: "Vision & Algorithm Dev Kits",
    description: "视觉算法和仿真开发套件，加速科研进程",
    descriptionEn: "Vision algorithm and simulation development kits to accelerate research",
    icon: "Eye",
    products: visionAlgorithmKits
  },
  {
    id: "swarm-formation-kits",
    name: "集群编队开发套件",
    nameEn: "Swarm Formation Dev Kits",
    description: "多机协同编队开发平台，支持集群算法研究",
    descriptionEn: "Multi-UAV cooperative formation development platform for swarm algorithm research",
    icon: "Users",
    products: swarmFormationKits
  },
  {
    id: "research-ugvs",
    name: "科研无人车",
    nameEn: "Research UGVs",
    description: "科研级无人地面车辆，支持自主导航研究",
    descriptionEn: "Research-grade unmanned ground vehicles for autonomous navigation research",
    icon: "Truck",
    products: researchUGVs
  },
  {
    id: "optical-gimbals",
    name: "光学变焦吊舱",
    nameEn: "Optical Zoom Gimbals",
    description: "高倍变焦稳定吊舱，适用于巡检和测绘",
    descriptionEn: "High-zoom stabilized gimbals for inspection and surveying",
    icon: "Camera",
    products: opticalGimbals
  },
  {
    id: "carrier-boards",
    name: "扩展载板",
    nameEn: "Carrier Boards",
    description: "Jetson系列模块扩展载板",
    descriptionEn: "Carrier boards for Jetson series modules",
    icon: "CircuitBoard",
    products: carrierBoards
  },
  {
    id: "ground-stations",
    name: "地面站",
    nameEn: "Ground Control Stations",
    description: "专业无人机地面控制站",
    descriptionEn: "Professional UAV ground control stations",
    icon: "Monitor",
    products: groundStations
  }
];
