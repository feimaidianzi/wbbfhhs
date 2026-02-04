import wifilink2Image from "@/assets/fpv/wifilink2-new.jpg";
import wifilinkRxImage from "@/assets/fpv/wifilink-rx-new.jpg";

export interface DigitalFpvProduct {
  id: string;
  nameKey: string;
  category: "transmitter" | "receiver";
  sloganKey: string;
  subSloganKey: string;
  descriptionKey: string;
  price: string;
  image: string;
  keyFeatureKeys: string[];
  specs: {
    categoryKey: string;
    items: { labelKey: string; value: string }[];
  }[];
  features: {
    titleKey: string;
    descriptionKey: string;
  }[];
  gallery: string[];
}

export const digitalFpvProducts: DigitalFpvProduct[] = [
  {
    id: "wifilink2",
    nameKey: "digitalFpv.wifilink2.name",
    category: "transmitter",
    sloganKey: "digitalFpv.wifilink2.slogan",
    subSloganKey: "digitalFpv.wifilink2.subSlogan",
    descriptionKey: "digitalFpv.wifilink2.description",
    price: "¥499",
    image: wifilink2Image,
    keyFeatureKeys: [
      "digitalFpv.wifilink2.keyFeature.1",
      "digitalFpv.wifilink2.keyFeature.2",
      "digitalFpv.wifilink2.keyFeature.3",
      "digitalFpv.wifilink2.keyFeature.4"
    ],
    specs: [
      {
        categoryKey: "digitalFpv.spec.category.basic",
        items: [
          { labelKey: "digitalFpv.spec.label.model", value: "FlyMind Link2" },
          { labelKey: "digitalFpv.spec.label.freqRange", value: "5180~5885 MHz" },
          { labelKey: "digitalFpv.spec.label.videoOutput", value: "1080P 60fps / 720P 60fps" },
          { labelKey: "digitalFpv.spec.label.transmitTech", value: "WiFi数字传输" },
        ]
      },
      {
        categoryKey: "digitalFpv.spec.category.electrical",
        items: [
          { labelKey: "digitalFpv.spec.label.voltage", value: "9~30V (3~6S)" },
          { labelKey: "digitalFpv.spec.label.txPower", value: "< 25dBm (FCC)" },
        ]
      },
      {
        categoryKey: "digitalFpv.spec.category.physical",
        items: [
          { labelKey: "digitalFpv.spec.label.weight", value: "约50g" },
          { labelKey: "digitalFpv.spec.label.interface", value: "MIPI数字视频接口" },
        ]
      }
    ],
    features: [
      {
        titleKey: "digitalFpv.wifilink2.feature.1.title",
        descriptionKey: "digitalFpv.wifilink2.feature.1.desc"
      },
      {
        titleKey: "digitalFpv.wifilink2.feature.2.title",
        descriptionKey: "digitalFpv.wifilink2.feature.2.desc"
      },
      {
        titleKey: "digitalFpv.wifilink2.feature.3.title",
        descriptionKey: "digitalFpv.wifilink2.feature.3.desc"
      },
      {
        titleKey: "digitalFpv.wifilink2.feature.4.title",
        descriptionKey: "digitalFpv.wifilink2.feature.4.desc"
      },
      {
        titleKey: "digitalFpv.wifilink2.feature.5.title",
        descriptionKey: "digitalFpv.wifilink2.feature.5.desc"
      },
      {
        titleKey: "digitalFpv.wifilink2.feature.6.title",
        descriptionKey: "digitalFpv.wifilink2.feature.6.desc"
      }
    ],
    gallery: [
      wifilink2Image,
    ]
  },
  {
    id: "wifilink-rx",
    nameKey: "digitalFpv.wifilinkRx.name",
    category: "receiver",
    sloganKey: "digitalFpv.wifilinkRx.slogan",
    subSloganKey: "digitalFpv.wifilinkRx.subSlogan",
    descriptionKey: "digitalFpv.wifilinkRx.description",
    price: "¥699",
    image: wifilinkRxImage,
    keyFeatureKeys: [
      "digitalFpv.wifilinkRx.keyFeature.1",
      "digitalFpv.wifilinkRx.keyFeature.2",
      "digitalFpv.wifilinkRx.keyFeature.3",
      "digitalFpv.wifilinkRx.keyFeature.4"
    ],
    specs: [
      {
        categoryKey: "digitalFpv.spec.category.basic",
        items: [
          { labelKey: "digitalFpv.spec.label.model", value: "FlyMind Link-RX" },
          { labelKey: "digitalFpv.spec.label.freqRange", value: "5180~5885 MHz" },
          { labelKey: "digitalFpv.spec.label.hdmiOutput", value: "1080P 60fps / 720P 60fps" },
          { labelKey: "digitalFpv.spec.label.systemSupport", value: "OpenIPC (默认) / Ruby FPV" },
        ]
      },
      {
        categoryKey: "digitalFpv.spec.category.electrical",
        items: [
          { labelKey: "digitalFpv.spec.label.voltage", value: "9~30V (3~6S)" },
          { labelKey: "digitalFpv.spec.label.rxPower", value: "< 25dBm (FCC) / < 14dBm (CE)" },
        ]
      },
      {
        categoryKey: "digitalFpv.spec.category.storage",
        items: [
          { labelKey: "digitalFpv.spec.label.builtinStorage", value: "32G (含系统文件)" },
          { labelKey: "digitalFpv.spec.label.sdExpand", value: "最大支持256GB" },
        ]
      },
      {
        categoryKey: "digitalFpv.spec.category.interface",
        items: [
          { labelKey: "digitalFpv.spec.label.videoOutput", value: "Mini-HDMI" },
          { labelKey: "digitalFpv.spec.label.dataInterface", value: "Type-C, OTG" },
          { labelKey: "digitalFpv.spec.label.powerInterface", value: "DC 5.5x2.1mm" },
          { labelKey: "digitalFpv.spec.label.storageInterface", value: "Micro-SD" },
        ]
      },
      {
        categoryKey: "digitalFpv.spec.category.physical",
        items: [
          { labelKey: "digitalFpv.spec.label.size", value: "110.0mm x 27.3mm x 46.0mm" },
          { labelKey: "digitalFpv.spec.label.weight", value: "122.0g (±1g, 不含天线)" },
        ]
      },
      {
        categoryKey: "digitalFpv.spec.category.antennaRod",
        items: [
          { labelKey: "digitalFpv.spec.label.polarization", value: "垂直极化 (VP)" },
          { labelKey: "digitalFpv.spec.label.freqRange", value: "5150~5850 MHz" },
          { labelKey: "digitalFpv.spec.label.avgGain", value: "2.5dBi" },
          { labelKey: "digitalFpv.spec.label.vswr", value: "≤2.0" },
          { labelKey: "digitalFpv.spec.label.size", value: "Φ4.8mm x 108.4mm" },
          { labelKey: "digitalFpv.spec.label.weight", value: "6.6g" },
        ]
      },
      {
        categoryKey: "digitalFpv.spec.category.antennaPagoda",
        items: [
          { labelKey: "digitalFpv.spec.label.polarization", value: "左旋圆极化 (LHCP)" },
          { labelKey: "digitalFpv.spec.label.freqRange", value: "5500~5900 MHz" },
          { labelKey: "digitalFpv.spec.label.avgGain", value: "2.5dBi" },
          { labelKey: "digitalFpv.spec.label.vswr", value: "≤2.0" },
          { labelKey: "digitalFpv.spec.label.size", value: "Φ8.0mm x 23.9mm" },
          { labelKey: "digitalFpv.spec.label.weight", value: "4.4g" },
        ]
      }
    ],
    features: [
      {
        titleKey: "digitalFpv.wifilinkRx.feature.1.title",
        descriptionKey: "digitalFpv.wifilinkRx.feature.1.desc"
      },
      {
        titleKey: "digitalFpv.wifilinkRx.feature.2.title",
        descriptionKey: "digitalFpv.wifilinkRx.feature.2.desc"
      },
      {
        titleKey: "digitalFpv.wifilinkRx.feature.3.title",
        descriptionKey: "digitalFpv.wifilinkRx.feature.3.desc"
      },
      {
        titleKey: "digitalFpv.wifilinkRx.feature.4.title",
        descriptionKey: "digitalFpv.wifilinkRx.feature.4.desc"
      },
      {
        titleKey: "digitalFpv.wifilinkRx.feature.5.title",
        descriptionKey: "digitalFpv.wifilinkRx.feature.5.desc"
      },
      {
        titleKey: "digitalFpv.wifilinkRx.feature.6.title",
        descriptionKey: "digitalFpv.wifilinkRx.feature.6.desc"
      }
    ],
    gallery: [
      wifilinkRxImage,
    ]
  }
];

export const digitalFpvCategories = [
  {
    id: "transmitter",
    nameKey: "digitalFpv.category.transmitter",
    descriptionKey: "digitalFpv.category.transmitter.desc",
  },
  {
    id: "receiver", 
    nameKey: "digitalFpv.category.receiver",
    descriptionKey: "digitalFpv.category.receiver.desc",
  }
];
