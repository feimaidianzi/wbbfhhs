import tf2du1 from "@/assets/products/ai-module-tf2du-1.jpg";
import tf2du2 from "@/assets/products/ai-module-tf2du-2.jpg";
import tf2du3 from "@/assets/products/ai-module-tf2du-3.jpg";
import tf2du4 from "@/assets/products/ai-module-tf2du-4.jpg";
import tf2hd1 from "@/assets/products/ai-module-tf2hd-1.jpg";
import tf2hd2 from "@/assets/products/ai-module-tf2hd-2.jpg";
import tf2hd3 from "@/assets/products/ai-module-tf2hd-3.jpg";
import tf2hd4 from "@/assets/products/ai-module-tf2hd-4.jpg";
import tf2a1 from "@/assets/products/ai-module-tf2a-1.jpg";
import tf2a2 from "@/assets/products/ai-module-tf2a-2.jpg";
import tf2a3 from "@/assets/products/ai-module-tf2a-3.jpg";
import tf2a4 from "@/assets/products/ai-module-tf2a-4.jpg";
import tf2a5 from "@/assets/products/ai-module-tf2a-5.jpg";

export interface AiModuleProduct {
  id: string;
  nameKey: string;
  model: string;
  categoryKey: string;
  price: string;
  image: string;
  images: string[];
  sloganKey?: string;
  subSloganKey?: string;
  highlightKeys: string[];
  descriptionKeys: string[];
  specs: {
    categoryKey?: string;
    labelKey: string;
    value: string;
    valueTF2A?: string;
    valueTF2HD?: string;
    valueTF2DU?: string;
  }[];
}

export const aiModuleProducts: AiModuleProduct[] = [
  {
    id: "tf2du",
    nameKey: "aiModule.tf2du.name",
    model: "TF2DU",
    categoryKey: "aiModule.category.dualLight",
    price: "询价",
    image: tf2du1,
    images: [tf2du1, tf2du2, tf2du3, tf2du4],
    sloganKey: "aiModule.tf2du.slogan",
    subSloganKey: "aiModule.tf2du.subSlogan",
    highlightKeys: [
      "aiModule.tf2du.highlight.1",
      "aiModule.tf2du.highlight.2",
      "aiModule.tf2du.highlight.3",
      "aiModule.tf2du.highlight.4",
    ],
    descriptionKeys: [
      "aiModule.tf2du.desc.1",
      "aiModule.tf2du.desc.2",
      "aiModule.tf2du.desc.3",
    ],
    specs: [
      { categoryKey: "aiModule.spec.category.performance", labelKey: "aiModule.spec.lockVehicle", value: "800m可见 / 500m红外" },
      { categoryKey: "aiModule.spec.category.performance", labelKey: "aiModule.spec.lockPerson", value: "400m可见 / 200m红外" },
      { categoryKey: "aiModule.spec.category.optics", labelKey: "aiModule.spec.focalLength", value: "6mm可见 / 13mm红外" },
      { categoryKey: "aiModule.spec.category.optics", labelKey: "aiModule.spec.resolution", value: "2560×1440可见 / 640×512红外" },
      { categoryKey: "aiModule.spec.category.optics", labelKey: "aiModule.spec.fov", value: "66°×40°可见 / 32°×25°红外" },
      { categoryKey: "aiModule.spec.category.optics", labelKey: "aiModule.spec.zoom", value: "3倍电子变倍" },
      { categoryKey: "aiModule.spec.category.tracking", labelKey: "aiModule.spec.minTrackPixel", value: "5×5像素" },
      { categoryKey: "aiModule.spec.category.tracking", labelKey: "aiModule.spec.maxTrackSpeed", value: "90km/h" },
      { categoryKey: "aiModule.spec.category.tracking", labelKey: "aiModule.spec.guidanceMode", value: "中心锁定，支持多次修正" },
      { categoryKey: "aiModule.spec.category.tracking", labelKey: "aiModule.spec.minContrast", value: "5%" },
      { categoryKey: "aiModule.spec.category.tracking", labelKey: "aiModule.spec.minTargetPixel", value: "5×5~128×128像素" },
      { categoryKey: "aiModule.spec.category.tracking", labelKey: "aiModule.spec.trackAlgorithm", value: "60Hz" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.voltage", value: "9V~16V" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.power", value: "3W" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.videoIO", value: "PAL制输出" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.size", value: "核心模组38×38×10mm，外观47×38×15mm" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.moduleWeight", value: "37g" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.lensWeight", value: "12g" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.frameRate", value: "60Hz" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.delay", value: "≤5ms" },
      { categoryKey: "aiModule.spec.category.compatibility", labelKey: "aiModule.spec.protocol", value: "CRSF/Sbus/MavLinkv2" },
      { categoryKey: "aiModule.spec.category.compatibility", labelKey: "aiModule.spec.firmware", value: "BetaFlight/INAV/APM/PX4" },
      { categoryKey: "aiModule.spec.category.compatibility", labelKey: "aiModule.spec.navigation", value: "支持有无定位信息打击" },
    ],
  },
  {
    id: "tf2hd",
    nameKey: "aiModule.tf2hd.name",
    model: "TF2HD",
    categoryKey: "aiModule.category.hdAnalog",
    price: "询价",
    image: tf2hd1,
    images: [tf2hd1, tf2hd2, tf2hd3, tf2hd4],
    sloganKey: "aiModule.tf2hd.slogan",
    subSloganKey: "aiModule.tf2hd.subSlogan",
    highlightKeys: [
      "aiModule.tf2hd.highlight.1",
      "aiModule.tf2hd.highlight.2",
      "aiModule.tf2hd.highlight.3",
      "aiModule.tf2hd.highlight.4",
    ],
    descriptionKeys: [
      "aiModule.tf2hd.desc.1",
      "aiModule.tf2hd.desc.2",
      "aiModule.tf2hd.desc.3",
    ],
    specs: [
      { categoryKey: "aiModule.spec.category.performance", labelKey: "aiModule.spec.lockVehicle", value: "800m" },
      { categoryKey: "aiModule.spec.category.performance", labelKey: "aiModule.spec.lockPerson", value: "400m" },
      { categoryKey: "aiModule.spec.category.optics", labelKey: "aiModule.spec.focalLength", value: "6mm" },
      { categoryKey: "aiModule.spec.category.optics", labelKey: "aiModule.spec.resolution", value: "2560×1440" },
      { categoryKey: "aiModule.spec.category.optics", labelKey: "aiModule.spec.fov", value: "66°×40°" },
      { categoryKey: "aiModule.spec.category.optics", labelKey: "aiModule.spec.zoom", value: "3倍电子变倍" },
      { categoryKey: "aiModule.spec.category.tracking", labelKey: "aiModule.spec.minTrackPixel", value: "5×5像素" },
      { categoryKey: "aiModule.spec.category.tracking", labelKey: "aiModule.spec.maxTrackSpeed", value: "90km/h" },
      { categoryKey: "aiModule.spec.category.tracking", labelKey: "aiModule.spec.guidanceMode", value: "中心锁定，支持多次修正" },
      { categoryKey: "aiModule.spec.category.tracking", labelKey: "aiModule.spec.minContrast", value: "5%" },
      { categoryKey: "aiModule.spec.category.tracking", labelKey: "aiModule.spec.minTargetPixel", value: "5×5~128×128像素" },
      { categoryKey: "aiModule.spec.category.tracking", labelKey: "aiModule.spec.trackAlgorithm", value: "60Hz" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.voltage", value: "9V~16V" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.power", value: "2W" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.videoIO", value: "PAL制输出" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.size", value: "核心模组38×38×10mm，外观47×38×15mm" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.moduleWeight", value: "37g" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.lensWeight", value: "8g" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.frameRate", value: "60Hz" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.delay", value: "≤5ms" },
      { categoryKey: "aiModule.spec.category.compatibility", labelKey: "aiModule.spec.protocol", value: "CRSF/Sbus/MavLinkv2" },
      { categoryKey: "aiModule.spec.category.compatibility", labelKey: "aiModule.spec.firmware", value: "BetaFlight/INAV/APM/PX4" },
      { categoryKey: "aiModule.spec.category.compatibility", labelKey: "aiModule.spec.navigation", value: "支持有无定位信息打击" },
    ],
  },
  {
    id: "tf2a",
    nameKey: "aiModule.tf2a.name",
    model: "TF2A",
    categoryKey: "aiModule.category.basicAnalog",
    price: "询价",
    image: tf2a1,
    images: [tf2a1, tf2a2, tf2a3, tf2a4, tf2a5],
    sloganKey: "aiModule.tf2a.slogan",
    subSloganKey: "aiModule.tf2a.subSlogan",
    highlightKeys: [
      "aiModule.tf2a.highlight.1",
      "aiModule.tf2a.highlight.2",
      "aiModule.tf2a.highlight.3",
      "aiModule.tf2a.highlight.4",
    ],
    descriptionKeys: [
      "aiModule.tf2a.desc.1",
      "aiModule.tf2a.desc.2",
      "aiModule.tf2a.desc.3",
    ],
    specs: [
      { categoryKey: "aiModule.spec.category.performance", labelKey: "aiModule.spec.lockVehicle", value: "300m" },
      { categoryKey: "aiModule.spec.category.performance", labelKey: "aiModule.spec.lockPerson", value: "200m" },
      { categoryKey: "aiModule.spec.category.optics", labelKey: "aiModule.spec.focalLength", value: "6mm" },
      { categoryKey: "aiModule.spec.category.optics", labelKey: "aiModule.spec.resolution", value: "720×576" },
      { categoryKey: "aiModule.spec.category.optics", labelKey: "aiModule.spec.fov", value: "36°×29° (以1200TVL例)" },
      { categoryKey: "aiModule.spec.category.optics", labelKey: "aiModule.spec.zoom", value: "-" },
      { categoryKey: "aiModule.spec.category.tracking", labelKey: "aiModule.spec.minTrackPixel", value: "5×5像素" },
      { categoryKey: "aiModule.spec.category.tracking", labelKey: "aiModule.spec.maxTrackSpeed", value: "90km/h" },
      { categoryKey: "aiModule.spec.category.tracking", labelKey: "aiModule.spec.guidanceMode", value: "中心锁定，支持多次修正" },
      { categoryKey: "aiModule.spec.category.tracking", labelKey: "aiModule.spec.minContrast", value: "5%" },
      { categoryKey: "aiModule.spec.category.tracking", labelKey: "aiModule.spec.minTargetPixel", value: "5×5~128×128像素" },
      { categoryKey: "aiModule.spec.category.tracking", labelKey: "aiModule.spec.trackAlgorithm", value: "50Hz" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.voltage", value: "9V~16V" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.power", value: "2W" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.videoIO", value: "PAL制输入输出" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.size", value: "核心模组38×38×10mm，外观47×38×15mm" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.moduleWeight", value: "37g" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.lensWeight", value: "-" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.frameRate", value: "50Hz" },
      { categoryKey: "aiModule.spec.category.general", labelKey: "aiModule.spec.delay", value: "≤5ms" },
      { categoryKey: "aiModule.spec.category.compatibility", labelKey: "aiModule.spec.protocol", value: "CRSF/Sbus/MavLinkv2" },
      { categoryKey: "aiModule.spec.category.compatibility", labelKey: "aiModule.spec.firmware", value: "BetaFlight/INAV/APM/PX4" },
      { categoryKey: "aiModule.spec.category.compatibility", labelKey: "aiModule.spec.navigation", value: "支持有无定位信息打击" },
    ],
  },
];

export const aiModuleCategories = [
  { id: "dual-light", nameKey: "aiModule.category.dualLight", descriptionKey: "aiModule.category.dualLight.desc" },
  { id: "hd-analog", nameKey: "aiModule.category.hdAnalog", descriptionKey: "aiModule.category.hdAnalog.desc" },
  { id: "basic-analog", nameKey: "aiModule.category.basicAnalog", descriptionKey: "aiModule.category.basicAnalog.desc" },
];

export function getAiModuleProductById(id: string): AiModuleProduct | undefined {
  return aiModuleProducts.find(product => product.id === id);
}
