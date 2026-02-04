import sj4000Image from "@/assets/camera/sj4000-wifi.png";

export interface CameraProduct {
  id: string;
  nameKey: string;
  model: string;
  categoryKey: string;
  sloganKey: string;
  subSloganKey: string;
  image: string;
  price: string;
  highlightKeys: string[];
  keyFeatures: {
    labelKey: string;
    value: string;
  }[];
  specs: {
    categoryKey: string;
    items: { labelKey: string; value: string }[];
  }[];
  features: {
    titleKey: string;
    descriptionKey: string;
  }[];
  packageContentKeys: string[];
}

export const cameraCategories = [
  {
    id: "action-camera",
    nameKey: "camera.category.actionCamera",
    descriptionKey: "camera.category.actionCamera.desc",
  },
];

export const cameraProducts: CameraProduct[] = [
  {
    id: "sj4000-wifi",
    nameKey: "camera.sj4000.name",
    model: "SJ4000 WIFI",
    categoryKey: "camera.category.actionCamera",
    sloganKey: "camera.sj4000.slogan",
    subSloganKey: "camera.sj4000.subSlogan",
    image: sj4000Image,
    price: "询价",
    highlightKeys: [
      "camera.sj4000.highlight.1",
      "camera.sj4000.highlight.2",
      "camera.sj4000.highlight.3",
      "camera.sj4000.highlight.4",
      "camera.sj4000.highlight.5",
    ],
    keyFeatures: [
      { labelKey: "camera.sj4000.keyFeature.pixel", value: "1200万" },
      { labelKey: "camera.sj4000.keyFeature.screen", value: "2.0英寸高清屏" },
      { labelKey: "camera.sj4000.keyFeature.video", value: "1080p @30fps" },
      { labelKey: "camera.sj4000.keyFeature.output", value: "HDMI高清输出" },
      { labelKey: "camera.sj4000.keyFeature.wideAngle", value: "大广角" },
      { labelKey: "camera.sj4000.keyFeature.detection", value: "移动侦测" },
      { labelKey: "camera.sj4000.keyFeature.connection", value: "WiFi" },
      { labelKey: "camera.sj4000.keyFeature.waterproof", value: "30M" },
      { labelKey: "camera.sj4000.keyFeature.zoom", value: "四倍变焦" },
      { labelKey: "camera.sj4000.keyFeature.battery", value: "90分钟" },
    ],
    specs: [
      {
        categoryKey: "camera.spec.category.basic",
        items: [
          { labelKey: "camera.spec.label.model", value: "SJ4000 WIFI" },
          { labelKey: "camera.spec.label.size", value: "长*宽*高：59.2*41*29.8MM" },
          { labelKey: "camera.spec.label.weight", value: "45.5g（不带电池）62.5g（带电池）" },
          { labelKey: "camera.spec.label.processor", value: "联咏96655" },
          { labelKey: "camera.spec.label.sensor", value: "AR0330" },
          { labelKey: "camera.spec.label.display", value: "2.0英寸液晶显示屏" },
          { labelKey: "camera.spec.label.battery", value: "900mAh锂电池" },
          { labelKey: "camera.spec.label.storage", value: "Micro SD卡（可扩展32GB、64GB）" },
        ],
      },
      {
        categoryKey: "camera.spec.category.connection",
        items: [
          { labelKey: "camera.spec.label.dataConnection", value: "USB 2.0 | HDMI | Wi-Fi" },
          { labelKey: "camera.spec.label.waterproofDepth", value: "30米" },
        ],
      },
      {
        categoryKey: "camera.spec.category.video",
        items: [
          { labelKey: "camera.spec.label.videoFormat", value: "MOV/MP4" },
          { labelKey: "camera.spec.label.videoResolution", value: "1080P (1920*1080) 30 fps" },
          { labelKey: "camera.spec.label.videoResolution2", value: "720P (1280*720) 60/30 fps" },
          { labelKey: "camera.spec.label.videoResolution3", value: "WVGA (640*480) 30 fps" },
        ],
      },
      {
        categoryKey: "camera.spec.category.photo",
        items: [
          { labelKey: "camera.spec.label.chargeTime", value: "约3小時" },
          { labelKey: "camera.spec.label.photoResolution", value: "1200万像素" },
          { labelKey: "camera.spec.label.photoFeatures", value: "自拍，连续拍摄（突发），自动拍摄" },
          { labelKey: "camera.spec.label.languages", value: "English / 繁体中文/俄语等" },
          { labelKey: "camera.spec.label.accessories", value: "电源适配器，USB线，HDMI线，AV线" },
        ],
      },
    ],
    features: [
      {
        titleKey: "camera.sj4000.feature.1.title",
        descriptionKey: "camera.sj4000.feature.1.desc",
      },
      {
        titleKey: "camera.sj4000.feature.2.title",
        descriptionKey: "camera.sj4000.feature.2.desc",
      },
      {
        titleKey: "camera.sj4000.feature.3.title",
        descriptionKey: "camera.sj4000.feature.3.desc",
      },
      {
        titleKey: "camera.sj4000.feature.4.title",
        descriptionKey: "camera.sj4000.feature.4.desc",
      },
      {
        titleKey: "camera.sj4000.feature.5.title",
        descriptionKey: "camera.sj4000.feature.5.desc",
      },
      {
        titleKey: "camera.sj4000.feature.6.title",
        descriptionKey: "camera.sj4000.feature.6.desc",
      },
    ],
    packageContentKeys: [
      "camera.sj4000.package.1",
      "camera.sj4000.package.2",
      "camera.sj4000.package.3",
      "camera.sj4000.package.4",
      "camera.sj4000.package.5",
      "camera.sj4000.package.6",
      "camera.sj4000.package.7",
      "camera.sj4000.package.8",
      "camera.sj4000.package.9",
      "camera.sj4000.package.10",
      "camera.sj4000.package.11",
      "camera.sj4000.package.12",
      "camera.sj4000.package.13",
      "camera.sj4000.package.14",
    ],
  },
];
