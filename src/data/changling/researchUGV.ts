/**
 * 长凌科技 - 科研无人车产品数据
 * 产品中心独立分类
 */

export interface ResearchUGVProduct {
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

export const researchUGVProducts: ResearchUGVProduct[] = [
  {
    id: "cl-r300",
    name: "R300科研无人车",
    nameEn: "R300 Research UGV",
    description: "科研级无人地面车辆，搭载ROS系统和多种传感器，支持自主导航、SLAM、路径规划等算法研究。适合空地协同实验。",
    descriptionEn: "Research-grade unmanned ground vehicle equipped with ROS system and various sensors. Supports autonomous navigation, SLAM, path planning, and other algorithm research. Suitable for air-ground coordination experiments.",
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
      "激光雷达": "支持",
      "深度相机": "支持",
      "IMU": "内置",
      "计算平台": "Jetson/x86可选",
      "系统": "ROS"
    },
    specsEn: {
      "Chassis Type": "Differential Drive",
      "Max Speed": "2m/s",
      "Payload Capacity": "20kg",
      "LiDAR": "Supported",
      "Depth Camera": "Supported",
      "IMU": "Built-in",
      "Computing": "Jetson/x86 Optional",
      "System": "ROS"
    },
    features: ["ROS系统", "多传感器", "自主导航", "开源软件", "差速底盘", "大载荷"],
    featuresEn: ["ROS System", "Multi-sensor", "Autonomous Navigation", "Open Source Software", "Differential Chassis", "Heavy Payload"],
    highlights: ["地面机器人研究", "SLAM/导航", "空地协同"],
    highlightsEn: ["Ground Robot Research", "SLAM/Navigation", "Air-Ground Coordination"],
    documentUrl: "https://docs.amovlab.com/Easycar-R300/#/",
    purchaseUrl: "https://item.taobao.com/item.htm?id=650567660073"
  }
];
