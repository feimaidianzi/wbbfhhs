/**
 * 长凌科技 - 机载计算机产品数据
 * 用于无人机配件分类下
 */

export interface OnboardComputerProduct {
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

export const onboardComputers: OnboardComputerProduct[] = [
  {
    id: "cl-allspark2-x86",
    name: "Allspark 2-x86机载计算机",
    nameEn: "Allspark 2-x86 Onboard Computer",
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
    purchaseUrl: "https://item.taobao.com/item.htm?id=742261216686"
  },
  {
    id: "cl-allspark2-orin-nx",
    name: "Allspark 2-Orin NX 机载计算机",
    nameEn: "Allspark 2-Orin NX Onboard Computer",
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
    purchaseUrl: "https://item.taobao.com/item.htm?id=705748339987"
  },
  {
    id: "cl-allspark1",
    name: "Allspark 1 机载计算机",
    nameEn: "Allspark 1 Onboard Computer",
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
    purchaseUrl: "https://item.taobao.com/item.htm?id=675017162553"
  }
];
