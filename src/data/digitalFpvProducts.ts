import wifilink2Image from "@/assets/fpv/wifilink2-new.webp";
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
  },
  // ===== H-Series Airborne Radios =====
  {
    id: "hd-1400-a30",
    nameKey: "digitalFpv.h.a30.name",
    category: "hAirborne",
    sloganKey: "digitalFpv.h.a30.slogan",
    subSloganKey: "digitalFpv.h.a30.subSlogan",
    descriptionKey: "digitalFpv.h.a30.description",
    price: "询价",
    image: hSeriesA30,
    keyFeatureKeys: ["digitalFpv.h.keyFeature.mimo", "digitalFpv.h.keyFeature.fhss", "digitalFpv.h.a30.keyFeature.range", "digitalFpv.h.keyFeature.mesh"],
    specs: [
      { categoryKey: "digitalFpv.h.spec.category.rf", items: [
        { labelKey: "digitalFpv.h.spec.system", value: "OFDM" },
        { labelKey: "digitalFpv.h.spec.freqBand", value: "1400MHz~1460MHz" },
        { labelKey: "digitalFpv.h.spec.txPower", value: "2×2W" },
        { labelKey: "digitalFpv.h.spec.rfBandwidth", value: "2.5M/5M/10M/20MHz" },
        { labelKey: "digitalFpv.h.spec.modulation", value: "BPSK/QPSK/16QAM" },
        { labelKey: "digitalFpv.h.spec.sensitivity", value: "-98dBm/5MHz" },
      ]},
      { categoryKey: "digitalFpv.h.spec.category.network", items: [
        { labelKey: "digitalFpv.h.spec.networking", value: "自组网 / Ad-hoc" },
        { labelKey: "digitalFpv.h.spec.encryption", value: "AES128" },
        { labelKey: "digitalFpv.h.spec.latency", value: "<10ms" },
      ]},
      { categoryKey: "digitalFpv.h.spec.category.interface", items: [
        { labelKey: "digitalFpv.h.spec.dataInterface", value: "2×RS232 / 1×LAN" },
        { labelKey: "digitalFpv.h.spec.rfConnector", value: "J30J-15ZKP" },
        { labelKey: "digitalFpv.h.spec.dataConnector", value: "SMA-K" },
      ]},
      { categoryKey: "digitalFpv.h.spec.category.physical", items: [
        { labelKey: "digitalFpv.h.spec.power", value: "9-32VDC" },
        { labelKey: "digitalFpv.h.spec.consumption", value: "30W" },
        { labelKey: "digitalFpv.h.spec.workTemp", value: "-40℃~+70℃" },
        { labelKey: "digitalFpv.h.spec.size", value: "L128×W80×55mm" },
        { labelKey: "digitalFpv.h.spec.weight", value: "620g" },
      ]},
    ],
    features: [
      { titleKey: "digitalFpv.h.feature.mimo.title", descriptionKey: "digitalFpv.h.feature.mimo.desc" },
      { titleKey: "digitalFpv.h.feature.fhss.title", descriptionKey: "digitalFpv.h.feature.fhss.desc" },
      { titleKey: "digitalFpv.h.feature.capacity.title", descriptionKey: "digitalFpv.h.feature.capacity.desc" },
      { titleKey: "digitalFpv.h.feature.topology.title", descriptionKey: "digitalFpv.h.feature.topology.desc" },
      { titleKey: "digitalFpv.h.feature.mesh.title", descriptionKey: "digitalFpv.h.feature.mesh.desc" },
      { titleKey: "digitalFpv.h.feature.wideTemp.title", descriptionKey: "digitalFpv.h.feature.wideTemp.desc" },
    ],
    gallery: [hSeriesA30]
  },
  {
    id: "hd-1400-a50",
    nameKey: "digitalFpv.h.a50.name",
    category: "hAirborne",
    sloganKey: "digitalFpv.h.a50.slogan",
    subSloganKey: "digitalFpv.h.a50.subSlogan",
    descriptionKey: "digitalFpv.h.a50.description",
    price: "询价",
    image: hSeriesA50,
    keyFeatureKeys: ["digitalFpv.h.keyFeature.mimo", "digitalFpv.h.keyFeature.fhss", "digitalFpv.h.a50.keyFeature.range", "digitalFpv.h.keyFeature.mesh"],
    specs: [
      { categoryKey: "digitalFpv.h.spec.category.rf", items: [
        { labelKey: "digitalFpv.h.spec.system", value: "OFDM" },
        { labelKey: "digitalFpv.h.spec.freqBand", value: "1400MHz~1460MHz" },
        { labelKey: "digitalFpv.h.spec.txPower", value: "2×5W" },
        { labelKey: "digitalFpv.h.spec.rfBandwidth", value: "2.5M/5M/10M/20MHz" },
        { labelKey: "digitalFpv.h.spec.modulation", value: "BPSK/QPSK/16QAM" },
        { labelKey: "digitalFpv.h.spec.sensitivity", value: "-98dBm/5MHz" },
      ]},
      { categoryKey: "digitalFpv.h.spec.category.network", items: [
        { labelKey: "digitalFpv.h.spec.networking", value: "自组网 / Ad-hoc" },
        { labelKey: "digitalFpv.h.spec.encryption", value: "AES128" },
        { labelKey: "digitalFpv.h.spec.latency", value: "<10ms" },
      ]},
      { categoryKey: "digitalFpv.h.spec.category.physical", items: [
        { labelKey: "digitalFpv.h.spec.power", value: "9-32VDC" },
        { labelKey: "digitalFpv.h.spec.consumption", value: "60W" },
        { labelKey: "digitalFpv.h.spec.workTemp", value: "-40℃~+70℃" },
        { labelKey: "digitalFpv.h.spec.size", value: "L157×W130×65mm" },
        { labelKey: "digitalFpv.h.spec.weight", value: "1360g" },
      ]},
    ],
    features: [
      { titleKey: "digitalFpv.h.feature.mimo.title", descriptionKey: "digitalFpv.h.feature.mimo.desc" },
      { titleKey: "digitalFpv.h.feature.fhss.title", descriptionKey: "digitalFpv.h.feature.fhss.desc" },
      { titleKey: "digitalFpv.h.feature.capacity.title", descriptionKey: "digitalFpv.h.feature.capacity.desc" },
      { titleKey: "digitalFpv.h.feature.mesh.title", descriptionKey: "digitalFpv.h.feature.mesh.desc" },
    ],
    gallery: [hSeriesA50]
  },
  {
    id: "hd-1400-a100",
    nameKey: "digitalFpv.h.a100.name",
    category: "hAirborne",
    sloganKey: "digitalFpv.h.a100.slogan",
    subSloganKey: "digitalFpv.h.a100.subSlogan",
    descriptionKey: "digitalFpv.h.a100.description",
    price: "询价",
    image: hSeriesA100,
    keyFeatureKeys: ["digitalFpv.h.keyFeature.mimo", "digitalFpv.h.keyFeature.fhss", "digitalFpv.h.a100.keyFeature.range", "digitalFpv.h.keyFeature.mesh"],
    specs: [
      { categoryKey: "digitalFpv.h.spec.category.rf", items: [
        { labelKey: "digitalFpv.h.spec.system", value: "OFDM" },
        { labelKey: "digitalFpv.h.spec.freqBand", value: "1400MHz~1460MHz" },
        { labelKey: "digitalFpv.h.spec.txPower", value: "2×10W" },
        { labelKey: "digitalFpv.h.spec.rfBandwidth", value: "2.5M/5M/10M/20MHz" },
        { labelKey: "digitalFpv.h.spec.sensitivity", value: "-98dBm/5MHz" },
      ]},
      { categoryKey: "digitalFpv.h.spec.category.physical", items: [
        { labelKey: "digitalFpv.h.spec.consumption", value: "100W" },
        { labelKey: "digitalFpv.h.spec.workTemp", value: "-40℃~+70℃" },
        { labelKey: "digitalFpv.h.spec.size", value: "L140×W135×32mm" },
        { labelKey: "digitalFpv.h.spec.weight", value: "670g" },
      ]},
    ],
    features: [
      { titleKey: "digitalFpv.h.feature.mimo.title", descriptionKey: "digitalFpv.h.feature.mimo.desc" },
      { titleKey: "digitalFpv.h.feature.fhss.title", descriptionKey: "digitalFpv.h.feature.fhss.desc" },
      { titleKey: "digitalFpv.h.feature.capacity.title", descriptionKey: "digitalFpv.h.feature.capacity.desc" },
      { titleKey: "digitalFpv.h.feature.mesh.title", descriptionKey: "digitalFpv.h.feature.mesh.desc" },
    ],
    gallery: [hSeriesA100]
  },
  {
    id: "hd-1400-a150",
    nameKey: "digitalFpv.h.a150.name",
    category: "hAirborne",
    sloganKey: "digitalFpv.h.a150.slogan",
    subSloganKey: "digitalFpv.h.a150.subSlogan",
    descriptionKey: "digitalFpv.h.a150.description",
    price: "询价",
    image: hSeriesA150,
    keyFeatureKeys: ["digitalFpv.h.keyFeature.mimo", "digitalFpv.h.keyFeature.fhss", "digitalFpv.h.a150.keyFeature.range", "digitalFpv.h.keyFeature.mesh"],
    specs: [
      { categoryKey: "digitalFpv.h.spec.category.rf", items: [
        { labelKey: "digitalFpv.h.spec.system", value: "OFDM" },
        { labelKey: "digitalFpv.h.spec.freqBand", value: "1400MHz~1460MHz" },
        { labelKey: "digitalFpv.h.spec.txPower", value: "2×10W" },
        { labelKey: "digitalFpv.h.spec.sensitivity", value: "-98dBm/5MHz" },
      ]},
      { categoryKey: "digitalFpv.h.spec.category.physical", items: [
        { labelKey: "digitalFpv.h.spec.consumption", value: "100W" },
        { labelKey: "digitalFpv.h.spec.workTemp", value: "-40℃~+70℃" },
        { labelKey: "digitalFpv.h.spec.size", value: "L148×W148×69.5mm" },
        { labelKey: "digitalFpv.h.spec.weight", value: "1450g" },
      ]},
    ],
    features: [
      { titleKey: "digitalFpv.h.feature.mimo.title", descriptionKey: "digitalFpv.h.feature.mimo.desc" },
      { titleKey: "digitalFpv.h.feature.fhss.title", descriptionKey: "digitalFpv.h.feature.fhss.desc" },
      { titleKey: "digitalFpv.h.feature.capacity.title", descriptionKey: "digitalFpv.h.feature.capacity.desc" },
      { titleKey: "digitalFpv.h.feature.mesh.title", descriptionKey: "digitalFpv.h.feature.mesh.desc" },
    ],
    gallery: [hSeriesA150]
  },
  {
    id: "hd-4000-a150",
    nameKey: "digitalFpv.h.4000a150.name",
    category: "hAirborne",
    sloganKey: "digitalFpv.h.4000a150.slogan",
    subSloganKey: "digitalFpv.h.4000a150.subSlogan",
    descriptionKey: "digitalFpv.h.4000a150.description",
    price: "询价",
    image: hSeries4000A150,
    keyFeatureKeys: ["digitalFpv.h.keyFeature.mimo", "digitalFpv.h.4000a150.keyFeature.band", "digitalFpv.h.4000a150.keyFeature.range", "digitalFpv.h.keyFeature.mesh"],
    specs: [
      { categoryKey: "digitalFpv.h.spec.category.rf", items: [
        { labelKey: "digitalFpv.h.spec.system", value: "OFDM" },
        { labelKey: "digitalFpv.h.spec.freqBand", value: "4000MHz~4300MHz" },
        { labelKey: "digitalFpv.h.spec.txPower", value: "2×20W" },
        { labelKey: "digitalFpv.h.spec.sensitivity", value: "-98dBm/5MHz" },
      ]},
      { categoryKey: "digitalFpv.h.spec.category.physical", items: [
        { labelKey: "digitalFpv.h.spec.consumption", value: "160W" },
        { labelKey: "digitalFpv.h.spec.workTemp", value: "-40℃~+70℃" },
        { labelKey: "digitalFpv.h.spec.size", value: "L175×W175×65mm" },
        { labelKey: "digitalFpv.h.spec.weight", value: "1500g" },
      ]},
    ],
    features: [
      { titleKey: "digitalFpv.h.feature.mimo.title", descriptionKey: "digitalFpv.h.feature.mimo.desc" },
      { titleKey: "digitalFpv.h.feature.fhss.title", descriptionKey: "digitalFpv.h.feature.fhss.desc" },
      { titleKey: "digitalFpv.h.feature.capacity.title", descriptionKey: "digitalFpv.h.feature.capacity.desc" },
      { titleKey: "digitalFpv.h.feature.mesh.title", descriptionKey: "digitalFpv.h.feature.mesh.desc" },
    ],
    gallery: [hSeries4000A150]
  },
  // ===== H-Series Base Station Radios =====
  {
    id: "hd-1400-b50",
    nameKey: "digitalFpv.h.b50.name",
    category: "hBaseStation",
    sloganKey: "digitalFpv.h.b50.slogan",
    subSloganKey: "digitalFpv.h.b50.subSlogan",
    descriptionKey: "digitalFpv.h.b50.description",
    price: "询价",
    image: hSeriesB50,
    keyFeatureKeys: ["digitalFpv.h.keyFeature.mimo", "digitalFpv.h.b50.keyFeature.range", "digitalFpv.h.b50.keyFeature.ip65", "digitalFpv.h.keyFeature.mesh"],
    specs: [
      { categoryKey: "digitalFpv.h.spec.category.rf", items: [
        { labelKey: "digitalFpv.h.spec.system", value: "OFDM" },
        { labelKey: "digitalFpv.h.spec.freqBand", value: "1400MHz~1460MHz" },
        { labelKey: "digitalFpv.h.spec.txPower", value: "2×5W" },
        { labelKey: "digitalFpv.h.spec.sensitivity", value: "-98dBm/5MHz" },
      ]},
      { categoryKey: "digitalFpv.h.spec.category.physical", items: [
        { labelKey: "digitalFpv.h.spec.consumption", value: "60W" },
        { labelKey: "digitalFpv.h.spec.workTemp", value: "-40℃~+70℃" },
        { labelKey: "digitalFpv.h.spec.size", value: "L155×W140×45mm" },
        { labelKey: "digitalFpv.h.spec.weight", value: "1200g" },
      ]},
    ],
    features: [
      { titleKey: "digitalFpv.h.feature.mimo.title", descriptionKey: "digitalFpv.h.feature.mimo.desc" },
      { titleKey: "digitalFpv.h.feature.ip65.title", descriptionKey: "digitalFpv.h.feature.ip65.desc" },
      { titleKey: "digitalFpv.h.feature.integrated.title", descriptionKey: "digitalFpv.h.feature.integrated.desc" },
      { titleKey: "digitalFpv.h.feature.mesh.title", descriptionKey: "digitalFpv.h.feature.mesh.desc" },
    ],
    gallery: [hSeriesB50]
  },
  {
    id: "hd-hb150",
    nameKey: "digitalFpv.h.hb150.name",
    category: "hBaseStation",
    sloganKey: "digitalFpv.h.hb150.slogan",
    subSloganKey: "digitalFpv.h.hb150.subSlogan",
    descriptionKey: "digitalFpv.h.hb150.description",
    price: "询价",
    image: hSeriesHB150,
    keyFeatureKeys: ["digitalFpv.h.keyFeature.mimo", "digitalFpv.h.hb150.keyFeature.range", "digitalFpv.h.b50.keyFeature.ip65", "digitalFpv.h.keyFeature.mesh"],
    specs: [
      { categoryKey: "digitalFpv.h.spec.category.rf", items: [
        { labelKey: "digitalFpv.h.spec.system", value: "OFDM" },
        { labelKey: "digitalFpv.h.spec.freqBand", value: "1400MHz~1460MHz" },
        { labelKey: "digitalFpv.h.spec.txPower", value: "2×10W" },
        { labelKey: "digitalFpv.h.spec.sensitivity", value: "-98dBm/5MHz" },
      ]},
      { categoryKey: "digitalFpv.h.spec.category.physical", items: [
        { labelKey: "digitalFpv.h.spec.consumption", value: "60W" },
        { labelKey: "digitalFpv.h.spec.workTemp", value: "-40℃~+70℃" },
        { labelKey: "digitalFpv.h.spec.size", value: "L197×W152×53mm" },
        { labelKey: "digitalFpv.h.spec.weight", value: "1800g" },
      ]},
    ],
    features: [
      { titleKey: "digitalFpv.h.feature.mimo.title", descriptionKey: "digitalFpv.h.feature.mimo.desc" },
      { titleKey: "digitalFpv.h.feature.ip65.title", descriptionKey: "digitalFpv.h.feature.ip65.desc" },
      { titleKey: "digitalFpv.h.feature.integrated.title", descriptionKey: "digitalFpv.h.feature.integrated.desc" },
      { titleKey: "digitalFpv.h.feature.mesh.title", descriptionKey: "digitalFpv.h.feature.mesh.desc" },
    ],
    gallery: [hSeriesHB150]
  },
  {
    id: "hd-4000-b150",
    nameKey: "digitalFpv.h.4000b150.name",
    category: "hBaseStation",
    sloganKey: "digitalFpv.h.4000b150.slogan",
    subSloganKey: "digitalFpv.h.4000b150.subSlogan",
    descriptionKey: "digitalFpv.h.4000b150.description",
    price: "询价",
    image: hSeries4000B150,
    keyFeatureKeys: ["digitalFpv.h.keyFeature.mimo", "digitalFpv.h.4000b150.keyFeature.range", "digitalFpv.h.b50.keyFeature.ip65", "digitalFpv.h.4000a150.keyFeature.band"],
    specs: [
      { categoryKey: "digitalFpv.h.spec.category.rf", items: [
        { labelKey: "digitalFpv.h.spec.system", value: "OFDM" },
        { labelKey: "digitalFpv.h.spec.freqBand", value: "4000MHz~4300MHz" },
        { labelKey: "digitalFpv.h.spec.txPower", value: "2×20W" },
        { labelKey: "digitalFpv.h.spec.sensitivity", value: "-98dBm/5MHz" },
      ]},
      { categoryKey: "digitalFpv.h.spec.category.physical", items: [
        { labelKey: "digitalFpv.h.spec.consumption", value: "100W" },
        { labelKey: "digitalFpv.h.spec.workTemp", value: "-40℃~+70℃" },
        { labelKey: "digitalFpv.h.spec.size", value: "L260×W185×45mm" },
        { labelKey: "digitalFpv.h.spec.weight", value: "2480g" },
      ]},
    ],
    features: [
      { titleKey: "digitalFpv.h.feature.mimo.title", descriptionKey: "digitalFpv.h.feature.mimo.desc" },
      { titleKey: "digitalFpv.h.feature.ip65.title", descriptionKey: "digitalFpv.h.feature.ip65.desc" },
      { titleKey: "digitalFpv.h.feature.integrated.title", descriptionKey: "digitalFpv.h.feature.integrated.desc" },
      { titleKey: "digitalFpv.h.feature.mesh.title", descriptionKey: "digitalFpv.h.feature.mesh.desc" },
    ],
    gallery: [hSeries4000B150]
  },
  // ===== H-Series Antennas =====
  {
    id: "hd-blade-antenna",
    nameKey: "digitalFpv.h.blade.name",
    category: "hAntenna",
    sloganKey: "digitalFpv.h.blade.slogan",
    subSloganKey: "digitalFpv.h.blade.subSlogan",
    descriptionKey: "digitalFpv.h.blade.description",
    price: "询价",
    image: hSeriesBladeAntenna,
    keyFeatureKeys: ["digitalFpv.h.blade.keyFeature.1", "digitalFpv.h.blade.keyFeature.2", "digitalFpv.h.blade.keyFeature.3", "digitalFpv.h.blade.keyFeature.4"],
    specs: [
      { categoryKey: "digitalFpv.h.spec.category.rf", items: [
        { labelKey: "digitalFpv.h.ant.spec.freq", value: "1400~1500MHz" },
        { labelKey: "digitalFpv.h.ant.spec.gain", value: "2dBi" },
        { labelKey: "digitalFpv.h.ant.spec.polarization", value: "垂直极化" },
        { labelKey: "digitalFpv.h.ant.spec.hAngle", value: "360°" },
        { labelKey: "digitalFpv.h.ant.spec.vAngle", value: "60°" },
        { labelKey: "digitalFpv.h.ant.spec.maxPower", value: "100W" },
      ]},
      { categoryKey: "digitalFpv.h.spec.category.physical", items: [
        { labelKey: "digitalFpv.h.ant.spec.connector", value: "N-K / TNC-K" },
        { labelKey: "digitalFpv.h.ant.spec.material", value: "6061铝 / 玻纤" },
        { labelKey: "digitalFpv.h.spec.workTemp", value: "-55~150℃" },
        { labelKey: "digitalFpv.h.spec.size", value: "44.45×133.35×121mm" },
        { labelKey: "digitalFpv.h.spec.weight", value: "230g" },
      ]},
    ],
    features: [
      { titleKey: "digitalFpv.h.blade.feature.1.title", descriptionKey: "digitalFpv.h.blade.feature.1.desc" },
      { titleKey: "digitalFpv.h.blade.feature.2.title", descriptionKey: "digitalFpv.h.blade.feature.2.desc" },
      { titleKey: "digitalFpv.h.blade.feature.3.title", descriptionKey: "digitalFpv.h.blade.feature.3.desc" },
    ],
    gallery: [hSeriesBladeAntenna]
  },
  {
    id: "hd-flange-antenna",
    nameKey: "digitalFpv.h.flange.name",
    category: "hAntenna",
    sloganKey: "digitalFpv.h.flange.slogan",
    subSloganKey: "digitalFpv.h.flange.subSlogan",
    descriptionKey: "digitalFpv.h.flange.description",
    price: "询价",
    image: hSeriesFlangeAntenna,
    keyFeatureKeys: ["digitalFpv.h.blade.keyFeature.1", "digitalFpv.h.blade.keyFeature.2", "digitalFpv.h.blade.keyFeature.3", "digitalFpv.h.blade.keyFeature.4"],
    specs: [
      { categoryKey: "digitalFpv.h.spec.category.rf", items: [
        { labelKey: "digitalFpv.h.ant.spec.freq", value: "1400~1500MHz" },
        { labelKey: "digitalFpv.h.ant.spec.gain", value: "2dBi" },
        { labelKey: "digitalFpv.h.ant.spec.polarization", value: "垂直极化" },
        { labelKey: "digitalFpv.h.ant.spec.hAngle", value: "360°" },
        { labelKey: "digitalFpv.h.ant.spec.vAngle", value: "60°" },
        { labelKey: "digitalFpv.h.ant.spec.maxPower", value: "100W" },
      ]},
      { categoryKey: "digitalFpv.h.spec.category.physical", items: [
        { labelKey: "digitalFpv.h.ant.spec.connector", value: "N-K / TNC-K" },
        { labelKey: "digitalFpv.h.ant.spec.material", value: "6061铝 / 玻纤" },
        { labelKey: "digitalFpv.h.spec.workTemp", value: "-55~150℃" },
        { labelKey: "digitalFpv.h.spec.size", value: "D16×H175mm" },
        { labelKey: "digitalFpv.h.spec.weight", value: "100g" },
      ]},
    ],
    features: [
      { titleKey: "digitalFpv.h.blade.feature.1.title", descriptionKey: "digitalFpv.h.blade.feature.1.desc" },
      { titleKey: "digitalFpv.h.blade.feature.2.title", descriptionKey: "digitalFpv.h.blade.feature.2.desc" },
      { titleKey: "digitalFpv.h.blade.feature.3.title", descriptionKey: "digitalFpv.h.blade.feature.3.desc" },
    ],
    gallery: [hSeriesFlangeAntenna]
  },
  {
    id: "hd-directional-antenna",
    nameKey: "digitalFpv.h.directional.name",
    category: "hAntenna",
    sloganKey: "digitalFpv.h.directional.slogan",
    subSloganKey: "digitalFpv.h.directional.subSlogan",
    descriptionKey: "digitalFpv.h.directional.description",
    price: "询价",
    image: hSeriesDirectionalAntenna,
    keyFeatureKeys: ["digitalFpv.h.directional.keyFeature.1", "digitalFpv.h.directional.keyFeature.2", "digitalFpv.h.directional.keyFeature.3", "digitalFpv.h.directional.keyFeature.4"],
    specs: [
      { categoryKey: "digitalFpv.h.spec.category.rf", items: [
        { labelKey: "digitalFpv.h.ant.spec.freq", value: "1400~1500MHz" },
        { labelKey: "digitalFpv.h.ant.spec.gain", value: "12dBi" },
        { labelKey: "digitalFpv.h.ant.spec.polarization", value: "垂直极化" },
        { labelKey: "digitalFpv.h.ant.spec.hAngle", value: "120°" },
        { labelKey: "digitalFpv.h.ant.spec.maxPower", value: "100W" },
      ]},
      { categoryKey: "digitalFpv.h.spec.category.physical", items: [
        { labelKey: "digitalFpv.h.ant.spec.connector", value: "SMA-K" },
        { labelKey: "digitalFpv.h.ant.spec.material", value: "6061铝 / 玻纤" },
        { labelKey: "digitalFpv.h.spec.workTemp", value: "-55~60℃" },
      ]},
    ],
    features: [
      { titleKey: "digitalFpv.h.directional.feature.1.title", descriptionKey: "digitalFpv.h.directional.feature.1.desc" },
      { titleKey: "digitalFpv.h.directional.feature.2.title", descriptionKey: "digitalFpv.h.directional.feature.2.desc" },
      { titleKey: "digitalFpv.h.directional.feature.3.title", descriptionKey: "digitalFpv.h.directional.feature.3.desc" },
    ],
    gallery: [hSeriesDirectionalAntenna]
  },
  {
    id: "hd-omni-antenna",
    nameKey: "digitalFpv.h.omni.name",
    category: "hAntenna",
    sloganKey: "digitalFpv.h.omni.slogan",
    subSloganKey: "digitalFpv.h.omni.subSlogan",
    descriptionKey: "digitalFpv.h.omni.description",
    price: "询价",
    image: hSeriesOmniAntenna,
    keyFeatureKeys: ["digitalFpv.h.omni.keyFeature.1", "digitalFpv.h.omni.keyFeature.2", "digitalFpv.h.directional.keyFeature.3", "digitalFpv.h.directional.keyFeature.4"],
    specs: [
      { categoryKey: "digitalFpv.h.spec.category.rf", items: [
        { labelKey: "digitalFpv.h.ant.spec.freq", value: "1400~1500MHz" },
        { labelKey: "digitalFpv.h.ant.spec.gain", value: "10dBi" },
        { labelKey: "digitalFpv.h.ant.spec.polarization", value: "垂直极化" },
        { labelKey: "digitalFpv.h.ant.spec.hAngle", value: "360°" },
        { labelKey: "digitalFpv.h.ant.spec.vAngle", value: "18°" },
        { labelKey: "digitalFpv.h.ant.spec.maxPower", value: "100W" },
      ]},
      { categoryKey: "digitalFpv.h.spec.category.physical", items: [
        { labelKey: "digitalFpv.h.ant.spec.connector", value: "SMA-K" },
        { labelKey: "digitalFpv.h.ant.spec.material", value: "6061铝 / 玻纤" },
        { labelKey: "digitalFpv.h.spec.workTemp", value: "-55~60℃" },
        { labelKey: "digitalFpv.h.spec.size", value: "L875×D116mm" },
        { labelKey: "digitalFpv.h.spec.weight", value: "2350g" },
      ]},
    ],
    features: [
      { titleKey: "digitalFpv.h.omni.feature.1.title", descriptionKey: "digitalFpv.h.omni.feature.1.desc" },
      { titleKey: "digitalFpv.h.omni.feature.2.title", descriptionKey: "digitalFpv.h.omni.feature.2.desc" },
      { titleKey: "digitalFpv.h.directional.feature.3.title", descriptionKey: "digitalFpv.h.directional.feature.3.desc" },
    ],
    gallery: [hSeriesOmniAntenna]
  },
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
  },
  {
    id: "hAirborne",
    nameKey: "digitalFpv.category.hAirborne",
    descriptionKey: "digitalFpv.category.hAirborne.desc",
  },
  {
    id: "hBaseStation",
    nameKey: "digitalFpv.category.hBaseStation",
    descriptionKey: "digitalFpv.category.hBaseStation.desc",
  },
  {
    id: "hAntenna",
    nameKey: "digitalFpv.category.hAntenna",
    descriptionKey: "digitalFpv.category.hAntenna.desc",
  },
];
