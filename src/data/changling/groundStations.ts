/**
 * 长凌科技 - 地面站产品数据
 * 产品中心独立分类
 */

export interface GroundStationProduct {
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

export const groundStationProducts: GroundStationProduct[] = [
  {
    id: "cl-prometheus-ground",
    name: "Prometheus地面站",
    nameEn: "Prometheus Ground Control Station",
    description: "专业级无人机地面站，集成显示器、遥控器和图传接收，支持多机管理和任务规划。一体化设计，便携高效。",
    descriptionEn: "Professional UAV ground control station integrating display, remote controller, and video receiver. Supports multi-UAV management and mission planning with integrated portable design.",
    image: "https://qiniu.md.amovlab.com/img/p/202410/20241016/1221045884928433716297728.jpg",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202410/20241016/1221045884928433716297728.jpg",
      "https://qiniu.md.amovlab.com/img/p/202410/20241016/1157246605545347940777984.jpg",
      "https://qiniu.md.amovlab.com/img/p/202410/20241016/1221115854626591547686912.jpg"
    ],
    specs: {
      "显示屏": "高亮显示屏",
      "遥控器": "集成遥控器",
      "图传": "内置接收机",
      "功能": "多机管理/任务规划",
      "便携性": "一体化设计",
      "续航": "长时间作业"
    },
    specsEn: {
      "Display": "High-brightness Screen",
      "Controller": "Integrated Controller",
      "Video": "Built-in Receiver",
      "Functions": "Multi-UAV Management/Mission Planning",
      "Portable": "Integrated Design",
      "Endurance": "Long-time Operation"
    },
    features: ["一体化设计", "多机管理", "任务规划", "专业级", "高亮显示", "便携作业"],
    featuresEn: ["Integrated Design", "Multi-UAV Management", "Mission Planning", "Professional Grade", "High-brightness Display", "Portable Operation"],
    highlights: ["专业作业", "高效管理", "便携出行"],
    highlightsEn: ["Professional Operations", "Efficient Management", "Portable Travel"],
    documentUrl: "https://docs.amovlab.com/prometheusground-pro-wiki-new-2024/#/",
    purchaseUrl: "https://item.taobao.com/item.htm?id=838323366891"
  }
];
