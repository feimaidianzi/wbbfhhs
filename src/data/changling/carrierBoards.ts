/**
 * 长凌科技 - 扩展板卡产品数据
 * 产品中心独立分类
 */

export interface CarrierBoardProduct {
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

export const carrierBoardProducts: CarrierBoardProduct[] = [
  {
    id: "cl-orin-nx-carrier",
    name: "Orin NX 扩展载板",
    nameEn: "Orin NX Carrier Board",
    description: "专为Jetson Orin NX模块设计的扩展载板，提供丰富的接口扩展，适用于无人机和机器人应用。",
    descriptionEn: "Carrier board designed for Jetson Orin NX module, providing rich interface expansion. Suitable for UAV and robotics applications.",
    image: "https://qiniu.md.amovlab.com/img/p/202404/20240403/1516336673034527411109888.png",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202404/20240403/1516336673034527411109888.png"
    ],
    specs: {
      "适配模块": "Jetson Orin NX",
      "USB接口": "USB3.2 x 4",
      "网络接口": "千兆以太网",
      "串口": "多路UART",
      "CAN接口": "CAN 2.0",
      "GPIO": "多路GPIO",
      "供电": "DC 9-36V宽压输入",
      "尺寸": "紧凑设计"
    },
    specsEn: {
      "Compatible Module": "Jetson Orin NX",
      "USB": "USB3.2 x 4",
      "Network": "Gigabit Ethernet",
      "Serial": "Multiple UART",
      "CAN": "CAN 2.0",
      "GPIO": "Multiple GPIO",
      "Power": "DC 9-36V Wide Input",
      "Size": "Compact Design"
    },
    features: ["Orin NX适配", "丰富接口", "宽压输入", "紧凑设计"],
    featuresEn: ["Orin NX Compatible", "Rich Interfaces", "Wide Voltage Input", "Compact Design"],
    highlights: ["无人机应用", "机器人应用", "边缘计算"],
    highlightsEn: ["UAV Applications", "Robotics Applications", "Edge Computing"],
    documentUrl: "",
    purchaseUrl: ""
  },
  {
    id: "cl-xavier-nano-carrier",
    name: "Jetson Xavier NX/Nano 载板",
    nameEn: "Jetson Xavier NX/Nano Carrier Board",
    description: "兼容Jetson Xavier NX和Nano模块的载板，提供必要的接口支持，性价比高。",
    descriptionEn: "Carrier board compatible with Jetson Xavier NX and Nano modules, providing essential interface support with high cost-effectiveness.",
    image: "https://qiniu.md.amovlab.com/img/p/202404/20240403/1516536586938856426274816.png",
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202404/20240403/1516536586938856426274816.png"
    ],
    specs: {
      "适配模块": "Xavier NX/Nano",
      "USB接口": "USB3.0 x 4",
      "视频输出": "HDMI",
      "网络接口": "千兆以太网",
      "串口": "多路Serial",
      "供电": "DC 9-20V"
    },
    specsEn: {
      "Compatible Module": "Xavier NX/Nano",
      "USB": "USB3.0 x 4",
      "Video Output": "HDMI",
      "Network": "Gigabit Ethernet",
      "Serial": "Multiple Serial",
      "Power": "DC 9-20V"
    },
    features: ["双模块兼容", "基础接口", "性价比高", "稳定可靠"],
    featuresEn: ["Dual Module Compatible", "Basic Interfaces", "Cost-effective", "Stable & Reliable"],
    highlights: ["入门开发", "轻量应用", "教育科研"],
    highlightsEn: ["Entry Development", "Lightweight Applications", "Education & Research"],
    documentUrl: "",
    purchaseUrl: ""
  }
];
