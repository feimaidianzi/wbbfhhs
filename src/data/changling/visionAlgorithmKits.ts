/**
 * 长凌科技 - 视觉/算法开发套件产品数据
 * 用于软件系统分类下
 */

export interface VisionAlgorithmKit {
  id: string;
  name: string;
  nameEn: string;
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

export const visionAlgorithmKits: VisionAlgorithmKit[] = [
  {
    id: "cl-spirecv",
    name: "SpireCV视觉开发者套件",
    nameEn: "SpireCV Vision Developer Kit",
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
    purchaseUrl: "https://item.taobao.com/item.htm?id=739895116174"
  },
  {
    id: "cl-matlab-algorithm",
    name: "Matlab无人机算法开发套件",
    nameEn: "Matlab UAV Algorithm Development Kit",
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
    purchaseUrl: "https://item.taobao.com/item.htm?id=727053072303"
  },
  {
    id: "cl-matlab-simulation",
    name: "Matlab仿真开发套件",
    nameEn: "Matlab Simulation Development Kit",
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
    features: ["完整仿真", "动力学模型", "传感器模型", "环境模型"],
    featuresEn: ["Complete Simulation", "Dynamics Model", "Sensor Model", "Environment Model"],
    highlights: ["仿真开发", "算法验证", "科研教学"],
    highlightsEn: ["Simulation Development", "Algorithm Validation", "Research & Education"],
    documentUrl: "",
    purchaseUrl: ""
  },
  {
    id: "cl-mocap-formation",
    name: "MOCAP编队飞行套件",
    nameEn: "MOCAP Formation Flight Kit",
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
    purchaseUrl: ""
  }
];
