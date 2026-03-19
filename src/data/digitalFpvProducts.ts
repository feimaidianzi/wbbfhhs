import wifilink2Image from "@/assets/fpv/wifilink2-new.jpg";
import wifilinkRxImage from "@/assets/fpv/wifilink-rx-new.jpg";
import s900Datalink1 from "@/assets/fpv/s900-datalink-1.jpg";
import s900Datalink2 from "@/assets/fpv/s900-datalink-2.jpg";
import s900Datalink3 from "@/assets/fpv/s900-datalink-3.jpg";
import s900Datalink4 from "@/assets/fpv/s900-datalink-4.jpg";
import s900Datalink5 from "@/assets/fpv/s900-datalink-5.jpg";
import s900Datalink6 from "@/assets/fpv/s900-datalink-6.jpg";
import s900Datalink7 from "@/assets/fpv/s900-datalink-7.jpg";
import meshLinkAntenna from "@/assets/products/mesh-link-antenna.webp";
import hSeriesA30 from "@/assets/fpv/h-series-a30.jpg";
import hSeriesA50 from "@/assets/fpv/h-series-a50.jpg";
import hSeriesA100 from "@/assets/fpv/h-series-a100.jpg";
import hSeriesA150 from "@/assets/fpv/h-series-a150.jpg";
import hSeries4000A150 from "@/assets/fpv/h-series-4000a150.jpg";
import hSeriesB50 from "@/assets/fpv/h-series-b50.jpg";
import hSeriesHB150 from "@/assets/fpv/h-series-hb150.jpg";
import hSeries4000B150 from "@/assets/fpv/h-series-4000b150.jpg";
import hSeriesBladeAntenna from "@/assets/fpv/h-series-blade-antenna.jpg";
import hSeriesFlangeAntenna from "@/assets/fpv/h-series-flange-antenna.jpg";
import hSeriesDirectionalAntenna from "@/assets/fpv/h-series-directional-antenna.jpg";
import hSeriesOmniAntenna from "@/assets/fpv/h-series-omni-antenna.jpg";

export interface DigitalFpvProduct {
  id: string;
  nameKey: string;
  category: "transmitter" | "receiver" | "datalink" | "meshlink" | "hAirborne" | "hBaseStation" | "hAntenna";
  sloganKey: string;
  subSloganKey: string;
  descriptionKey: string;
  price: string;
  image: string;
  keyFeatureKeys: string[];
  customLink?: string;
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
    id: "s900-datalink",
    nameKey: "digitalFpv.s900.name",
    category: "datalink",
    sloganKey: "digitalFpv.s900.slogan",
    subSloganKey: "digitalFpv.s900.subSlogan",
    descriptionKey: "digitalFpv.s900.description",
    price: "询价",
    image: s900Datalink1,
    keyFeatureKeys: [
      "digitalFpv.s900.keyFeature.1",
      "digitalFpv.s900.keyFeature.2",
      "digitalFpv.s900.keyFeature.3",
      "digitalFpv.s900.keyFeature.4"
    ],
    specs: [
      {
        categoryKey: "digitalFpv.spec.category.basic",
        items: [
          { labelKey: "digitalFpv.spec.label.model", value: "S900 Radio" },
          { labelKey: "digitalFpv.spec.label.freqRange", value: "902-928MHz" },
          { labelKey: "digitalFpv.s900.spec.maxDistance", value: "12KM" },
          { labelKey: "digitalFpv.s900.spec.airRate", value: "低速/中速/高速三挡" },
        ]
      },
      {
        categoryKey: "digitalFpv.spec.category.electrical",
        items: [
          { labelKey: "digitalFpv.spec.label.voltage", value: "2S-20S 宽电压" },
          { labelKey: "digitalFpv.spec.label.txPower", value: "20dBm (100mW)" },
        ]
      },
      {
        categoryKey: "digitalFpv.s900.spec.category.communication",
        items: [
          { labelKey: "digitalFpv.s900.spec.baudRate", value: "9600~230400 可调 (默认115200)" },
          { labelKey: "digitalFpv.s900.spec.workMode", value: "点对点/点对多点/中继组网" },
          { labelKey: "digitalFpv.s900.spec.fhss", value: "FHSS自动跳频" },
        ]
      },
      {
        categoryKey: "digitalFpv.spec.category.physical",
        items: [
          { labelKey: "digitalFpv.spec.label.size", value: "39×31×15mm" },
          { labelKey: "digitalFpv.spec.label.weight", value: "21±2g (不含天线)" },
          { labelKey: "digitalFpv.s900.spec.workTemp", value: "-20~50℃" },
        ]
      },
      {
        categoryKey: "digitalFpv.spec.category.interface",
        items: [
          { labelKey: "digitalFpv.s900.spec.antenna", value: "SMA内孔外螺 (915胶棒天线)" },
          { labelKey: "digitalFpv.s900.spec.usbInterface", value: "Type-C (地面端连接PC)" },
          { labelKey: "digitalFpv.s900.spec.fcInterface", value: "GH1.25-4P (连接飞控)" },
        ]
      }
    ],
    features: [
      {
        titleKey: "digitalFpv.s900.feature.1.title",
        descriptionKey: "digitalFpv.s900.feature.1.desc"
      },
      {
        titleKey: "digitalFpv.s900.feature.2.title",
        descriptionKey: "digitalFpv.s900.feature.2.desc"
      },
      {
        titleKey: "digitalFpv.s900.feature.3.title",
        descriptionKey: "digitalFpv.s900.feature.3.desc"
      },
      {
        titleKey: "digitalFpv.s900.feature.4.title",
        descriptionKey: "digitalFpv.s900.feature.4.desc"
      },
      {
        titleKey: "digitalFpv.s900.feature.5.title",
        descriptionKey: "digitalFpv.s900.feature.5.desc"
      },
      {
        titleKey: "digitalFpv.s900.feature.6.title",
        descriptionKey: "digitalFpv.s900.feature.6.desc"
      }
    ],
    gallery: [
      s900Datalink1,
      s900Datalink2,
      s900Datalink3,
      s900Datalink4,
      s900Datalink5,
      s900Datalink6,
      s900Datalink7,
    ]
  },
  {
    id: "wifilink2",
    nameKey: "digitalFpv.wifilink2.name",
    category: "transmitter",
    sloganKey: "digitalFpv.wifilink2.slogan",
    subSloganKey: "digitalFpv.wifilink2.subSlogan",
    descriptionKey: "digitalFpv.wifilink2.description",
    price: "询价",
    image: wifilink2Image,
    keyFeatureKeys: [
      "digitalFpv.wifilink2.keyFeature.1",
      "digitalFpv.wifilink2.keyFeature.2",
      "digitalFpv.wifilink2.keyFeature.3",
      "digitalFpv.wifilink2.keyFeature.4"
    ],
    specs: [
      {
        categoryKey: "digitalFpv.spec.category.tx",
        items: [
          { labelKey: "digitalFpv.spec.label.model", value: "FlyMind Link2 (TX)" },
          { labelKey: "digitalFpv.spec.label.freqRange", value: "5180~5885 MHz" },
          { labelKey: "digitalFpv.spec.label.videoOutput", value: "1080P 60fps / 720P 60fps" },
          { labelKey: "digitalFpv.spec.label.transmitTech", value: "WiFi数字传输" },
          { labelKey: "digitalFpv.spec.label.voltage", value: "9~30V (3~6S)" },
          { labelKey: "digitalFpv.spec.label.txPower", value: "< 25dBm (FCC)" },
          { labelKey: "digitalFpv.spec.label.weight", value: "约50g" },
          { labelKey: "digitalFpv.spec.label.interface", value: "MIPI数字视频接口" },
        ]
      },
      {
        categoryKey: "digitalFpv.spec.category.rx",
        items: [
          { labelKey: "digitalFpv.spec.label.model", value: "FlyMind Link-RX" },
          { labelKey: "digitalFpv.spec.label.freqRange", value: "5180~5885 MHz" },
          { labelKey: "digitalFpv.spec.label.hdmiOutput", value: "1080P 60fps / 720P 60fps" },
          { labelKey: "digitalFpv.spec.label.systemSupport", value: "OpenIPC / Ruby FPV" },
          { labelKey: "digitalFpv.spec.label.voltage", value: "9~30V (3~6S)" },
          { labelKey: "digitalFpv.spec.label.rxPower", value: "< 25dBm (FCC) / < 14dBm (CE)" },
          { labelKey: "digitalFpv.spec.label.builtinStorage", value: "32G (含系统文件)" },
          { labelKey: "digitalFpv.spec.label.sdExpand", value: "最大支持256GB" },
          { labelKey: "digitalFpv.spec.label.size", value: "110.0mm x 27.3mm x 46.0mm" },
          { labelKey: "digitalFpv.spec.label.weight", value: "122.0g (±1g, 不含天线)" },
        ]
      },
      {
        categoryKey: "digitalFpv.spec.category.rxInterface",
        items: [
          { labelKey: "digitalFpv.spec.label.videoOutput", value: "Mini-HDMI" },
          { labelKey: "digitalFpv.spec.label.dataInterface", value: "Type-C, OTG" },
          { labelKey: "digitalFpv.spec.label.powerInterface", value: "DC 5.5x2.1mm" },
          { labelKey: "digitalFpv.spec.label.storageInterface", value: "Micro-SD" },
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
        titleKey: "digitalFpv.wifilink2.feature.1.title",
        descriptionKey: "digitalFpv.wifilink2.feature.1.desc"
      },
      {
        titleKey: "digitalFpv.wifilink2.feature.2.title",
        descriptionKey: "digitalFpv.wifilink2.feature.2.desc"
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
        titleKey: "digitalFpv.wifilink2.feature.3.title",
        descriptionKey: "digitalFpv.wifilink2.feature.3.desc"
      },
      {
        titleKey: "digitalFpv.wifilinkRx.feature.6.title",
        descriptionKey: "digitalFpv.wifilinkRx.feature.6.desc"
      }
    ],
    gallery: [
      wifilink2Image,
      wifilinkRxImage,
    ]
  },
  {
    id: "mesh-link",
    nameKey: "digitalFpv.meshLink.name",
    category: "meshlink",
    sloganKey: "digitalFpv.meshLink.slogan",
    subSloganKey: "digitalFpv.meshLink.subSlogan",
    descriptionKey: "digitalFpv.meshLink.description",
    price: "询价",
    image: meshLinkAntenna,
    customLink: "/products/accessories/mesh-link",
    keyFeatureKeys: [
      "digitalFpv.meshLink.keyFeature.1",
      "digitalFpv.meshLink.keyFeature.2",
      "digitalFpv.meshLink.keyFeature.3",
      "digitalFpv.meshLink.keyFeature.4"
    ],
    specs: [],
    features: [],
    gallery: [meshLinkAntenna]
  }
];

export const digitalFpvCategories = [
  {
    id: "datalink",
    nameKey: "digitalFpv.category.datalink",
    descriptionKey: "digitalFpv.category.datalink.desc",
  },
  {
    id: "transmitter",
    nameKey: "digitalFpv.category.transmitter",
    descriptionKey: "digitalFpv.category.transmitter.desc",
  },
  {
    id: "meshlink",
    nameKey: "digitalFpv.category.meshlink",
    descriptionKey: "digitalFpv.category.meshlink.desc",
  }
];
