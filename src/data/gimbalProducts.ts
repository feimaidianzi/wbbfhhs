import k40tImage from "@/assets/gimbal/k40t-gimbal.png";
import k8tV2Image from "@/assets/gimbal/k8t-v2-gimbal.png";
import k8V2Image from "@/assets/gimbal/k8-v2-gimbal.png";

export interface GimbalProduct {
  id: string;
  nameKey: string;
  model: string;
  categoryKey: string;
  price: string;
  image: string;
  images?: string[];
  bannerImage?: string;
  sloganKey?: string;
  subSloganKey?: string;
  keyFeatures?: { labelKey: string; value: string }[];
  highlightKeys: string[];
  descriptionKeys: string[];
  featureKeys?: string[];
  specs: {
    categoryKey?: string;
    labelKey: string;
    value: string;
  }[];
  applicationKeys?: string[];
  packageIncludeKeys?: string[];
  noteKeys?: string[];
  downloads?: {
    name: string;
    type: string;
    category?: string;
  }[];
}

export const gimbalProducts: GimbalProduct[] = [
  // 四光云台相机
  {
    id: "k40t",
    nameKey: "gimbal.k40t.name",
    model: "K40T",
    categoryKey: "gimbal.category.quad",
    price: "询价",
    image: k40tImage,
    sloganKey: "gimbal.k40t.slogan",
    subSloganKey: "gimbal.k40t.subSlogan",
    keyFeatures: [
      { labelKey: "gimbal.k40t.feature.quadLight", value: "广角、长焦、红外、激光" },
      { labelKey: "gimbal.k40t.feature.ultraClear", value: "4800W像素，160X混合变焦" },
      { labelKey: "gimbal.k40t.feature.longDistance", value: "1200m激光测距" },
      { labelKey: "gimbal.k40t.feature.aiRecognition", value: "多种目标检测，支持个性化模型导入" },
      { labelKey: "gimbal.k40t.feature.weight", value: "290g" }
    ],
    highlightKeys: [
      "gimbal.k40t.highlight.1",
      "gimbal.k40t.highlight.2",
      "gimbal.k40t.highlight.3",
      "gimbal.k40t.highlight.4"
    ],
    descriptionKeys: [
      "gimbal.k40t.desc.1",
      "gimbal.k40t.desc.2",
      "gimbal.k40t.desc.3",
      "gimbal.k40t.desc.4",
      "gimbal.k40t.desc.5"
    ],
    featureKeys: [
      "gimbal.k40t.featureItem.1",
      "gimbal.k40t.featureItem.2",
      "gimbal.k40t.featureItem.3",
      "gimbal.k40t.featureItem.4",
      "gimbal.k40t.featureItem.5"
    ],
    specs: [
      // 云台参数
      { categoryKey: "gimbal.spec.category.gimbal", labelKey: "gimbal.spec.label.axis", value: "机械三轴" },
      { categoryKey: "gimbal.spec.category.gimbal", labelKey: "gimbal.spec.label.angleRange", value: "俯仰-135°至+45°, 横滚-45°至+45°, 偏航-135°至+135°" },
      { categoryKey: "gimbal.spec.category.gimbal", labelKey: "gimbal.spec.label.maxSpeed", value: "180°/S" },
      { categoryKey: "gimbal.spec.category.gimbal", labelKey: "gimbal.spec.label.jitter", value: "±0.005°" },
      { categoryKey: "gimbal.spec.category.gimbal", labelKey: "gimbal.spec.label.size", value: "114×84×95mm" },
      { categoryKey: "gimbal.spec.category.gimbal", labelKey: "gimbal.spec.label.interface", value: "网口/串口/sbus" },
      { categoryKey: "gimbal.spec.category.gimbal", labelKey: "gimbal.spec.label.weight", value: "290g" },
      // 红外相机参数
      { categoryKey: "gimbal.spec.category.infrared", labelKey: "gimbal.spec.label.detectorType", value: "氧化钒非制冷红外焦平面探测器" },
      { categoryKey: "gimbal.spec.category.infrared", labelKey: "gimbal.spec.label.resolution", value: "640×512" },
      { categoryKey: "gimbal.spec.category.infrared", labelKey: "gimbal.spec.label.pixelPitch", value: "12μm" },
      { categoryKey: "gimbal.spec.category.infrared", labelKey: "gimbal.spec.label.frameRate", value: "50HZ 25HZ" },
      { categoryKey: "gimbal.spec.category.infrared", labelKey: "gimbal.spec.label.responseWave", value: "8~14μm" },
      // 广角相机
      { categoryKey: "gimbal.spec.category.wideAngle", labelKey: "gimbal.spec.label.sensorSize", value: "1/2英寸" },
      { categoryKey: "gimbal.spec.category.wideAngle", labelKey: "gimbal.spec.label.effectivePixels", value: "4800万像素" },
      { categoryKey: "gimbal.spec.category.wideAngle", labelKey: "gimbal.spec.label.fov", value: "ME FOV:85.4° DFOV:84°±2°" },
      { categoryKey: "gimbal.spec.category.wideAngle", labelKey: "gimbal.spec.label.wideFocalLength", value: "4.49mm" },
      { categoryKey: "gimbal.spec.category.wideAngle", labelKey: "gimbal.spec.label.wideAperture", value: "F2.8" },
      // 变焦相机
      { categoryKey: "gimbal.spec.category.zoom", labelKey: "gimbal.spec.label.sensorSize", value: "1/2英寸" },
      { categoryKey: "gimbal.spec.category.zoom", labelKey: "gimbal.spec.label.effectivePixels", value: "4800万像素" },
      { categoryKey: "gimbal.spec.category.zoom", labelKey: "gimbal.spec.label.variableAperture", value: "F3.7~F4.6" },
      { categoryKey: "gimbal.spec.category.zoom", labelKey: "gimbal.spec.label.effectiveFocal", value: "15.2~50mm" },
      { categoryKey: "gimbal.spec.category.zoom", labelKey: "gimbal.spec.label.hybridZoom", value: "160X" },
      // 激光测距仪
      { categoryKey: "gimbal.spec.category.laser", labelKey: "gimbal.spec.label.measureRange", value: "5-1200m" },
      { categoryKey: "gimbal.spec.category.laser", labelKey: "gimbal.spec.label.measureAccuracy", value: "±1m" }
    ],
    applicationKeys: [
      "gimbal.k40t.app.1",
      "gimbal.k40t.app.2",
      "gimbal.k40t.app.3",
      "gimbal.k40t.app.4",
      "gimbal.k40t.app.5"
    ],
    downloads: [
      { name: "K40T云台相机-云台固件", type: "zip", category: "软件" },
      { name: "K40T云台相机-相机固件", type: "bin", category: "软件" },
      { name: "K40T云台上位机", type: "zip", category: "软件" },
      { name: "K40T四光Ai云台相机用户手册", type: "pdf", category: "文档" },
      { name: "K40T四光AI云台相机", type: "pdf", category: "文档" },
      { name: "K40T云台对外协议", type: "pdf", category: "文档" },
      { name: "K40T云台相机-3D面组图", type: "stp", category: "图纸" }
    ]
  },
  // 双光跟踪识别云台相机
  {
    id: "k8t-v2",
    nameKey: "gimbal.k8tv2.name",
    model: "K8T-V2",
    categoryKey: "gimbal.category.dualTracking",
    price: "询价",
    image: k8tV2Image,
    sloganKey: "gimbal.k8tv2.slogan",
    subSloganKey: "gimbal.k8tv2.subSlogan",
    keyFeatures: [
      { labelKey: "gimbal.k8tv2.feature.power", value: "4T" },
      { labelKey: "gimbal.k8tv2.feature.weight", value: "162g" },
      { labelKey: "gimbal.k8tv2.feature.zoom", value: "40X" }
    ],
    highlightKeys: [
      "gimbal.k8tv2.highlight.1",
      "gimbal.k8tv2.highlight.2",
      "gimbal.k8tv2.highlight.3",
      "gimbal.k8tv2.highlight.4"
    ],
    descriptionKeys: [
      "gimbal.k8tv2.desc.1",
      "gimbal.k8tv2.desc.2",
      "gimbal.k8tv2.desc.3",
      "gimbal.k8tv2.desc.4",
      "gimbal.k8tv2.desc.5"
    ],
    featureKeys: [
      "gimbal.k8tv2.featureItem.1",
      "gimbal.k8tv2.featureItem.2",
      "gimbal.k8tv2.featureItem.3",
      "gimbal.k8tv2.featureItem.4",
      "gimbal.k8tv2.featureItem.5"
    ],
    specs: [
      { categoryKey: "gimbal.spec.category.gimbal", labelKey: "gimbal.spec.label.axis", value: "机械三轴" },
      { categoryKey: "gimbal.spec.category.gimbal", labelKey: "gimbal.spec.label.angleRange", value: "俯仰-90°至+30°, 航向±180°" },
      { categoryKey: "gimbal.spec.category.gimbal", labelKey: "gimbal.spec.label.stability", value: "±0.01°" },
      { categoryKey: "gimbal.spec.category.gimbal", labelKey: "gimbal.spec.label.weight", value: "162g" },
      { categoryKey: "gimbal.spec.category.visible", labelKey: "gimbal.spec.label.sensorSize", value: "1/2.8英寸" },
      { categoryKey: "gimbal.spec.category.visible", labelKey: "gimbal.spec.label.effectivePixels", value: "800万像素" },
      { categoryKey: "gimbal.spec.category.visible", labelKey: "gimbal.spec.label.digitalZoom", value: "40倍" },
      { categoryKey: "gimbal.spec.category.visible", labelKey: "gimbal.spec.label.videoOutput", value: "4K@30fps / 1080P@60fps" },
      { categoryKey: "gimbal.spec.category.infrared", labelKey: "gimbal.spec.label.resolution", value: "640×512" },
      { categoryKey: "gimbal.spec.category.infrared", labelKey: "gimbal.spec.label.frameRate", value: "30Hz" },
      { categoryKey: "gimbal.spec.category.infrared", labelKey: "gimbal.spec.label.netd", value: "≤50mK" },
      { categoryKey: "gimbal.spec.category.infrared", labelKey: "gimbal.spec.label.tempRange", value: "-20°C~650°C" },
      { categoryKey: "gimbal.spec.category.infrared", labelKey: "gimbal.spec.label.tempAccuracy", value: "±2°C或±2%" },
      { categoryKey: "gimbal.spec.category.ai", labelKey: "gimbal.spec.label.power", value: "4T" },
      { categoryKey: "gimbal.spec.category.ai", labelKey: "gimbal.spec.label.tracking", value: "支持" },
      { categoryKey: "gimbal.spec.category.ai", labelKey: "gimbal.spec.label.recognition", value: "人/车/船等" },
      { categoryKey: "gimbal.spec.category.general", labelKey: "gimbal.spec.label.protection", value: "IP65" },
      { categoryKey: "gimbal.spec.category.general", labelKey: "gimbal.spec.label.workTemp", value: "-20°C~+55°C" }
    ],
    applicationKeys: [
      "gimbal.k8tv2.app.1",
      "gimbal.k8tv2.app.2",
      "gimbal.k8tv2.app.3",
      "gimbal.k8tv2.app.4",
      "gimbal.k8tv2.app.5"
    ],
    downloads: [
      { name: "K8T-V2双光云台相机用户手册", type: "pdf", category: "文档" },
      { name: "K8T-V2云台固件", type: "zip", category: "软件" }
    ]
  },
  // 单光追踪识别云台
  {
    id: "k8-v2",
    nameKey: "gimbal.k8v2.name",
    model: "K8-V2",
    categoryKey: "gimbal.category.singleTracking",
    price: "询价",
    image: k8V2Image,
    sloganKey: "gimbal.k8v2.slogan",
    subSloganKey: "gimbal.k8v2.subSlogan",
    keyFeatures: [
      { labelKey: "gimbal.k8v2.feature.resolution", value: "4K" },
      { labelKey: "gimbal.k8v2.feature.weight", value: "115g" },
      { labelKey: "gimbal.k8v2.feature.aiTracking", value: "支持" }
    ],
    highlightKeys: [
      "gimbal.k8v2.highlight.1",
      "gimbal.k8v2.highlight.2",
      "gimbal.k8v2.highlight.3",
      "gimbal.k8v2.highlight.4"
    ],
    descriptionKeys: [
      "gimbal.k8v2.desc.1",
      "gimbal.k8v2.desc.2",
      "gimbal.k8v2.desc.3",
      "gimbal.k8v2.desc.4",
      "gimbal.k8v2.desc.5"
    ],
    featureKeys: [
      "gimbal.k8v2.featureItem.1",
      "gimbal.k8v2.featureItem.2",
      "gimbal.k8v2.featureItem.3",
      "gimbal.k8v2.featureItem.4",
      "gimbal.k8v2.featureItem.5",
      "gimbal.k8v2.featureItem.6",
      "gimbal.k8v2.featureItem.7",
      "gimbal.k8v2.featureItem.8"
    ],
    specs: [
      { categoryKey: "gimbal.spec.category.camera", labelKey: "gimbal.spec.label.sensor", value: "Sony 1/2.8\" CMOS" },
      { categoryKey: "gimbal.spec.category.camera", labelKey: "gimbal.spec.label.effectivePixels", value: "800万像素" },
      { categoryKey: "gimbal.spec.category.camera", labelKey: "gimbal.spec.label.resolution", value: "4K" },
      { categoryKey: "gimbal.spec.category.camera", labelKey: "gimbal.spec.label.opticalZoom", value: "30倍" },
      { categoryKey: "gimbal.spec.category.camera", labelKey: "gimbal.spec.label.digitalZoom", value: "8倍" },
      { categoryKey: "gimbal.spec.category.camera", labelKey: "gimbal.spec.label.videoRes", value: "4K@30fps / 1080P@60fps" },
      { categoryKey: "gimbal.spec.category.camera", labelKey: "gimbal.spec.label.fov", value: "63.7°(广角) ~ 2.3°(长焦)" },
      { categoryKey: "gimbal.spec.category.gimbal", labelKey: "gimbal.spec.label.gimbalAxis", value: "三轴" },
      { categoryKey: "gimbal.spec.category.gimbal", labelKey: "gimbal.spec.label.pitchRange", value: "-90° ~ +30°" },
      { categoryKey: "gimbal.spec.category.gimbal", labelKey: "gimbal.spec.label.yawRange", value: "360°无限位" },
      { categoryKey: "gimbal.spec.category.gimbal", labelKey: "gimbal.spec.label.stability", value: "±0.01°" },
      { categoryKey: "gimbal.spec.category.gimbal", labelKey: "gimbal.spec.label.weight", value: "115g" },
      { categoryKey: "gimbal.spec.category.interface", labelKey: "gimbal.spec.label.videoOutput", value: "HDMI / 网络视频流" },
      { categoryKey: "gimbal.spec.category.interface", labelKey: "gimbal.spec.label.controlInterface", value: "串口TTL / 网口" },
      { categoryKey: "gimbal.spec.category.ai", labelKey: "gimbal.spec.label.aiTracking", value: "支持" },
      { categoryKey: "gimbal.spec.category.general", labelKey: "gimbal.spec.label.voltage", value: "DC 12-26V" },
      { categoryKey: "gimbal.spec.category.general", labelKey: "gimbal.spec.label.powerConsumption", value: "≤15W" },
      { categoryKey: "gimbal.spec.category.general", labelKey: "gimbal.spec.label.protection", value: "IP65" },
      { categoryKey: "gimbal.spec.category.general", labelKey: "gimbal.spec.label.workTemp", value: "-20°C ~ +55°C" }
    ],
    applicationKeys: [
      "gimbal.k8v2.app.1",
      "gimbal.k8v2.app.2",
      "gimbal.k8v2.app.3",
      "gimbal.k8v2.app.4",
      "gimbal.k8v2.app.5",
      "gimbal.k8v2.app.6"
    ],
    packageIncludeKeys: [
      "gimbal.k8v2.package.1",
      "gimbal.k8v2.package.2",
      "gimbal.k8v2.package.3",
      "gimbal.k8v2.package.4",
      "gimbal.k8v2.package.5"
    ],
    noteKeys: [
      "gimbal.k8v2.note.1",
      "gimbal.k8v2.note.2",
      "gimbal.k8v2.note.3"
    ],
    downloads: [
      { name: "K8-V2云台相机用户手册", type: "pdf", category: "文档" },
      { name: "K8-V2云台固件", type: "zip", category: "软件" },
      { name: "K8-V2上位机软件", type: "zip", category: "软件" }
    ]
  }
];

export const gimbalCategories = [
  { id: "quad", nameKey: "gimbal.category.quad", descriptionKey: "gimbal.category.quad.desc" },
  { id: "dual-tracking", nameKey: "gimbal.category.dualTracking", descriptionKey: "gimbal.category.dualTracking.desc" },
  { id: "single-tracking", nameKey: "gimbal.category.singleTracking", descriptionKey: "gimbal.category.singleTracking.desc" }
];

export function getGimbalProductById(id: string): GimbalProduct | undefined {
  return gimbalProducts.find(product => product.id === id);
}

export function getGimbalProductsByCategory(category: string): GimbalProduct[] {
  const categoryMap: Record<string, string> = {
    'quad': 'gimbal.category.quad',
    'dual-tracking': 'gimbal.category.dualTracking',
    'single-tracking': 'gimbal.category.singleTracking'
  };
  const categoryKey = categoryMap[category] || category;
  return gimbalProducts.filter(product => product.categoryKey === categoryKey);
}
