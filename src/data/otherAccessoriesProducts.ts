// 其他配件产品数据 - 多语言版本
import monitor5ipsImg from "@/assets/products/monitor-5ips.jpg";
import goggles40chImg from "@/assets/products/goggles-40ch.jpg";
import monitor43Img from "@/assets/products/monitor-43.jpg";
import monitor7lcdImg from "@/assets/products/monitor-7lcd.jpg";
import gpsM10q120Img from "@/assets/products/gps-m10q-120.png";
import gpsM10q180Img from "@/assets/products/gps-m10q-180.png";
import gpsM10q250Img from "@/assets/products/gps-m10q-250.png";
import gpsM10q120CompassImg from "@/assets/products/gps-m10q-120-compass.jpg";
import gpsM10q180CompassImg from "@/assets/products/gps-m10q-180-compass.jpg";

export interface OtherAccessoryProduct {
  id: string;
  nameKey: string;
  category: "monitor" | "gps";
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

export const otherAccessoriesProducts: OtherAccessoryProduct[] = [
  // 监视器/眼镜类
  {
    id: "monitor-5-ips-dvr",
    nameKey: "otherAcc.monitor5ips.name",
    category: "monitor",
    sloganKey: "otherAcc.monitor5ips.slogan",
    subSloganKey: "otherAcc.monitor5ips.subSlogan",
    descriptionKey: "otherAcc.monitor5ips.desc",
    price: "¥699",
    image: monitor5ipsImg,
    keyFeatureKeys: [
      "otherAcc.feature.5inchIPS",
      "otherAcc.feature.40ch",
      "otherAcc.feature.builtInDVR",
      "otherAcc.feature.builtInBattery"
    ],
    specs: [
      {
        categoryKey: "otherAcc.spec.display",
        items: [
          { labelKey: "otherAcc.spec.screenSize", value: "5英寸" },
          { labelKey: "otherAcc.spec.screenType", value: "IPS LCD" },
          { labelKey: "otherAcc.spec.resolution", value: "800 x 480" },
          { labelKey: "otherAcc.spec.brightness", value: "400cd/m²" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.receiver",
        items: [
          { labelKey: "otherAcc.spec.freqRange", value: "5.8GHz" },
          { labelKey: "otherAcc.spec.channels", value: "40频道" },
          { labelKey: "otherAcc.spec.sensitivity", value: "-90dBm" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.recording",
        items: [
          { labelKey: "otherAcc.spec.recordFormat", value: "AVI" },
          { labelKey: "otherAcc.spec.storage", value: "Micro SD (最大32GB)" },
          { labelKey: "otherAcc.spec.recordResolution", value: "720P" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.power",
        items: [
          { labelKey: "otherAcc.spec.battery", value: "2000mAh" },
          { labelKey: "otherAcc.spec.workTime", value: "约2小时" },
          { labelKey: "otherAcc.spec.chargePort", value: "DC 5V" },
        ]
      }
    ],
    features: [
      {
        titleKey: "otherAcc.feature.ipsHD.title",
        descriptionKey: "otherAcc.feature.ipsHD.desc"
      },
      {
        titleKey: "otherAcc.feature.40chRx.title",
        descriptionKey: "otherAcc.feature.40chRx.desc"
      },
      {
        titleKey: "otherAcc.feature.builtInDVR.title",
        descriptionKey: "otherAcc.feature.builtInDVR.desc"
      },
      {
        titleKey: "otherAcc.feature.builtInBattery.title",
        descriptionKey: "otherAcc.feature.builtInBattery.desc"
      },
      {
        titleKey: "otherAcc.feature.portable.title",
        descriptionKey: "otherAcc.feature.portable.desc"
      },
      {
        titleKey: "otherAcc.feature.plugAndPlay.title",
        descriptionKey: "otherAcc.feature.plugAndPlay.desc"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2023-03-31/17-24-03-6426a6b30b1e9.images.400x400.jpg"
    ]
  },
  {
    id: "fpv-goggles-40ch",
    nameKey: "otherAcc.goggles40ch.name",
    category: "monitor",
    sloganKey: "otherAcc.goggles40ch.slogan",
    subSloganKey: "otherAcc.goggles40ch.subSlogan",
    descriptionKey: "otherAcc.goggles40ch.desc",
    price: "¥799",
    image: goggles40chImg,
    keyFeatureKeys: [
      "otherAcc.feature.dualDiversity",
      "otherAcc.feature.40ch",
      "otherAcc.feature.builtInDVR",
      "otherAcc.feature.immersive"
    ],
    specs: [
      {
        categoryKey: "otherAcc.spec.display",
        items: [
          { labelKey: "otherAcc.spec.screenType", value: "LCD双屏" },
          { labelKey: "otherAcc.spec.resolution", value: "480 x 320 x2" },
          { labelKey: "otherAcc.spec.fov", value: "40°" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.receiver",
        items: [
          { labelKey: "otherAcc.spec.freqRange", value: "5.8GHz" },
          { labelKey: "otherAcc.spec.channels", value: "40频道" },
          { labelKey: "otherAcc.spec.rxMethod", value: "双接收分集" },
          { labelKey: "otherAcc.spec.sensitivity", value: "-93dBm" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.recording",
        items: [
          { labelKey: "otherAcc.spec.dvrRecord", value: "支持" },
          { labelKey: "otherAcc.spec.storage", value: "Micro SD (最大32GB)" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.power",
        items: [
          { labelKey: "otherAcc.spec.battery", value: "2200mAh" },
          { labelKey: "otherAcc.spec.workTime", value: "约2.5小时" },
          { labelKey: "otherAcc.spec.chargePort", value: "DC 5V" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.physical",
        items: [
          { labelKey: "otherAcc.spec.weight", value: "约350g" },
          { labelKey: "otherAcc.spec.wearMethod", value: "头戴式" },
        ]
      }
    ],
    features: [
      {
        titleKey: "otherAcc.feature.dualDiversity.title",
        descriptionKey: "otherAcc.feature.dualDiversity.desc"
      },
      {
        titleKey: "otherAcc.feature.immersive.title",
        descriptionKey: "otherAcc.feature.immersive.desc"
      },
      {
        titleKey: "otherAcc.feature.40chCoverage.title",
        descriptionKey: "otherAcc.feature.40chCoverage.desc"
      },
      {
        titleKey: "otherAcc.feature.builtInDVR.title",
        descriptionKey: "otherAcc.feature.builtInDVR.goggleDesc"
      },
      {
        titleKey: "otherAcc.feature.longBattery.title",
        descriptionKey: "otherAcc.feature.longBattery.desc"
      },
      {
        titleKey: "otherAcc.feature.comfortWear.title",
        descriptionKey: "otherAcc.feature.comfortWear.desc"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2022-12-28/17-10-23-63ac07ff2111b.images.400x400.jpg"
    ]
  },
  {
    id: "monitor-4-3-dvr",
    nameKey: "otherAcc.monitor43.name",
    category: "monitor",
    sloganKey: "otherAcc.monitor43.slogan",
    subSloganKey: "otherAcc.monitor43.subSlogan",
    descriptionKey: "otherAcc.monitor43.desc",
    price: "¥489",
    image: monitor43Img,
    keyFeatureKeys: [
      "otherAcc.feature.43inch",
      "otherAcc.feature.40ch",
      "otherAcc.feature.builtInDVR",
      "otherAcc.feature.costEffective"
    ],
    specs: [
      {
        categoryKey: "otherAcc.spec.display",
        items: [
          { labelKey: "otherAcc.spec.screenSize", value: "4.3英寸" },
          { labelKey: "otherAcc.spec.screenType", value: "TFT LCD" },
          { labelKey: "otherAcc.spec.resolution", value: "480 x 272" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.receiver",
        items: [
          { labelKey: "otherAcc.spec.freqRange", value: "5.8GHz" },
          { labelKey: "otherAcc.spec.channels", value: "40频道" },
          { labelKey: "otherAcc.spec.sensitivity", value: "-90dBm" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.recording",
        items: [
          { labelKey: "otherAcc.spec.dvrRecord", value: "支持" },
          { labelKey: "otherAcc.spec.storage", value: "Micro SD (最大32GB)" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.power",
        items: [
          { labelKey: "otherAcc.spec.battery", value: "1200mAh" },
          { labelKey: "otherAcc.spec.workTime", value: "约1.5小时" },
        ]
      }
    ],
    features: [
      {
        titleKey: "otherAcc.feature.entryLevel.title",
        descriptionKey: "otherAcc.feature.entryLevel.desc"
      },
      {
        titleKey: "otherAcc.feature.40chRx.title",
        descriptionKey: "otherAcc.feature.40chRx.compatDesc"
      },
      {
        titleKey: "otherAcc.feature.dvrRecord.title",
        descriptionKey: "otherAcc.feature.dvrRecord.desc"
      },
      {
        titleKey: "otherAcc.feature.compactDesign.title",
        descriptionKey: "otherAcc.feature.compactDesign.desc"
      },
      {
        titleKey: "otherAcc.feature.builtInBattery.title",
        descriptionKey: "otherAcc.feature.builtInBattery.readyDesc"
      },
      {
        titleKey: "otherAcc.feature.sunHood.title",
        descriptionKey: "otherAcc.feature.sunHood.desc"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2022-12-21/14-47-02-63a2abe65374a.images.400x400.jpg"
    ]
  },
  {
    id: "monitor-7-lcd",
    nameKey: "otherAcc.monitor7lcd.name",
    category: "monitor",
    sloganKey: "otherAcc.monitor7lcd.slogan",
    subSloganKey: "otherAcc.monitor7lcd.subSlogan",
    descriptionKey: "otherAcc.monitor7lcd.desc",
    price: "¥729",
    image: monitor7lcdImg,
    keyFeatureKeys: [
      "otherAcc.feature.7inchBig",
      "otherAcc.feature.40ch",
      "otherAcc.feature.builtInDVR",
      "otherAcc.feature.professional"
    ],
    specs: [
      {
        categoryKey: "otherAcc.spec.display",
        items: [
          { labelKey: "otherAcc.spec.screenSize", value: "7英寸" },
          { labelKey: "otherAcc.spec.screenType", value: "TFT LCD" },
          { labelKey: "otherAcc.spec.resolution", value: "800 x 480" },
          { labelKey: "otherAcc.spec.brightness", value: "450cd/m²" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.receiver",
        items: [
          { labelKey: "otherAcc.spec.freqRange", value: "5.8GHz" },
          { labelKey: "otherAcc.spec.channels", value: "40频道" },
          { labelKey: "otherAcc.spec.sensitivity", value: "-90dBm" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.recording",
        items: [
          { labelKey: "otherAcc.spec.dvrRecord", value: "支持" },
          { labelKey: "otherAcc.spec.storage", value: "Micro SD (最大64GB)" },
          { labelKey: "otherAcc.spec.recordResolution", value: "720P" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.power",
        items: [
          { labelKey: "otherAcc.spec.inputVoltage", value: "DC 7-24V" },
          { labelKey: "otherAcc.spec.powerConsumption", value: "约5W" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.physical",
        items: [
          { labelKey: "otherAcc.spec.size", value: "177 x 120 x 22mm" },
          { labelKey: "otherAcc.spec.weight", value: "约300g" },
        ]
      }
    ],
    features: [
      {
        titleKey: "otherAcc.feature.7inchBig.title",
        descriptionKey: "otherAcc.feature.7inchBig.desc"
      },
      {
        titleKey: "otherAcc.feature.highBrightness.title",
        descriptionKey: "otherAcc.feature.highBrightness.desc"
      },
      {
        titleKey: "otherAcc.feature.40chRx.title",
        descriptionKey: "otherAcc.feature.40chRx.fullDesc"
      },
      {
        titleKey: "otherAcc.feature.dvrRecord.title",
        descriptionKey: "otherAcc.feature.dvrRecord.64gbDesc"
      },
      {
        titleKey: "otherAcc.feature.wideVoltage.title",
        descriptionKey: "otherAcc.feature.wideVoltage.desc"
      },
      {
        titleKey: "otherAcc.feature.professional.title",
        descriptionKey: "otherAcc.feature.professional.desc"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2022-11-30/17-22-45-638720e5f2a6f.images.400x400.jpg"
    ]
  },
  // GPS模块类
  {
    id: "gps-m10q-120-v2",
    nameKey: "otherAcc.gpsM10q120.name",
    category: "gps",
    sloganKey: "otherAcc.gpsM10q120.slogan",
    subSloganKey: "otherAcc.gpsM10q120.subSlogan",
    descriptionKey: "otherAcc.gpsM10q120.desc",
    price: "¥139",
    image: gpsM10q120Img,
    keyFeatureKeys: [
      "otherAcc.feature.m10Chip",
      "otherAcc.feature.120mmSpacing",
      "otherAcc.feature.fastLock",
      "otherAcc.feature.highPrecision"
    ],
    specs: [
      {
        categoryKey: "otherAcc.spec.gps",
        items: [
          { labelKey: "otherAcc.spec.chipModel", value: "Ublox M10" },
          { labelKey: "otherAcc.spec.frequency", value: "L1" },
          { labelKey: "otherAcc.spec.accuracy", value: "2.5m CEP" },
          { labelKey: "otherAcc.spec.coldStart", value: "<26s" },
          { labelKey: "otherAcc.spec.hotStart", value: "<1s" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.electrical",
        items: [
          { labelKey: "otherAcc.spec.inputVoltage", value: "3.3V / 5V" },
          { labelKey: "otherAcc.spec.workingCurrent", value: "约25mA" },
          { labelKey: "otherAcc.spec.interface", value: "UART" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.physical",
        items: [
          { labelKey: "otherAcc.spec.holeSpacing", value: "120mm (双孔)" },
          { labelKey: "otherAcc.spec.size", value: "25 x 25mm" },
          { labelKey: "otherAcc.spec.weight", value: "约5g" },
        ]
      }
    ],
    features: [
      {
        titleKey: "otherAcc.feature.m10HighPerf.title",
        descriptionKey: "otherAcc.feature.m10HighPerf.desc"
      },
      {
        titleKey: "otherAcc.feature.fastLock.title",
        descriptionKey: "otherAcc.feature.fastLock.desc"
      },
      {
        titleKey: "otherAcc.feature.highAccuracy.title",
        descriptionKey: "otherAcc.feature.highAccuracy.desc"
      },
      {
        titleKey: "otherAcc.feature.120mmStandard.title",
        descriptionKey: "otherAcc.feature.120mmStandard.desc"
      },
      {
        titleKey: "otherAcc.feature.lowPower.title",
        descriptionKey: "otherAcc.feature.lowPower.desc"
      },
      {
        titleKey: "otherAcc.feature.plugAndPlay.title",
        descriptionKey: "otherAcc.feature.plugAndPlay.uartDesc"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2025-06-27/12-02-37-685e17dd58835.images.400x400.png"
    ]
  },
  {
    id: "gps-m10q-180-v2",
    nameKey: "otherAcc.gpsM10q180.name",
    category: "gps",
    sloganKey: "otherAcc.gpsM10q180.slogan",
    subSloganKey: "otherAcc.gpsM10q180.subSlogan",
    descriptionKey: "otherAcc.gpsM10q180.desc",
    price: "¥139",
    image: gpsM10q180Img,
    keyFeatureKeys: [
      "otherAcc.feature.m10Chip",
      "otherAcc.feature.180mmSpacing",
      "otherAcc.feature.fastLock",
      "otherAcc.feature.highPrecision"
    ],
    specs: [
      {
        categoryKey: "otherAcc.spec.gps",
        items: [
          { labelKey: "otherAcc.spec.chipModel", value: "Ublox M10" },
          { labelKey: "otherAcc.spec.frequency", value: "L1" },
          { labelKey: "otherAcc.spec.accuracy", value: "2.5m CEP" },
          { labelKey: "otherAcc.spec.coldStart", value: "<26s" },
          { labelKey: "otherAcc.spec.hotStart", value: "<1s" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.electrical",
        items: [
          { labelKey: "otherAcc.spec.inputVoltage", value: "3.3V / 5V" },
          { labelKey: "otherAcc.spec.workingCurrent", value: "约25mA" },
          { labelKey: "otherAcc.spec.interface", value: "UART" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.physical",
        items: [
          { labelKey: "otherAcc.spec.holeSpacing", value: "180mm (双孔)" },
          { labelKey: "otherAcc.spec.size", value: "25 x 25mm" },
          { labelKey: "otherAcc.spec.weight", value: "约5g" },
        ]
      }
    ],
    features: [
      {
        titleKey: "otherAcc.feature.m10HighPerf.title",
        descriptionKey: "otherAcc.feature.m10HighPerf.leadingDesc"
      },
      {
        titleKey: "otherAcc.feature.180mmSpacing.title",
        descriptionKey: "otherAcc.feature.180mmSpacing.desc"
      },
      {
        titleKey: "otherAcc.feature.fastPosition.title",
        descriptionKey: "otherAcc.feature.fastPosition.desc"
      },
      {
        titleKey: "otherAcc.feature.highPrecision.title",
        descriptionKey: "otherAcc.feature.highPrecision.cepDesc"
      },
      {
        titleKey: "otherAcc.feature.lightweight.title",
        descriptionKey: "otherAcc.feature.lightweight.5gDesc"
      },
      {
        titleKey: "otherAcc.feature.easyInstall.title",
        descriptionKey: "otherAcc.feature.easyInstall.dualHoleDesc"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2025-06-27/11-57-46-685e16ba26fe5.images.400x400.png"
    ]
  },
  {
    id: "gps-m10q-250-v2",
    nameKey: "otherAcc.gpsM10q250.name",
    category: "gps",
    sloganKey: "otherAcc.gpsM10q250.slogan",
    subSloganKey: "otherAcc.gpsM10q250.subSlogan",
    descriptionKey: "otherAcc.gpsM10q250.desc",
    price: "¥139",
    image: gpsM10q250Img,
    keyFeatureKeys: [
      "otherAcc.feature.m10Chip",
      "otherAcc.feature.250mmSpacing",
      "otherAcc.feature.fastLock",
      "otherAcc.feature.highPrecision"
    ],
    specs: [
      {
        categoryKey: "otherAcc.spec.gps",
        items: [
          { labelKey: "otherAcc.spec.chipModel", value: "Ublox M10" },
          { labelKey: "otherAcc.spec.frequency", value: "L1" },
          { labelKey: "otherAcc.spec.accuracy", value: "2.5m CEP" },
          { labelKey: "otherAcc.spec.coldStart", value: "<26s" },
          { labelKey: "otherAcc.spec.hotStart", value: "<1s" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.electrical",
        items: [
          { labelKey: "otherAcc.spec.inputVoltage", value: "3.3V / 5V" },
          { labelKey: "otherAcc.spec.workingCurrent", value: "约25mA" },
          { labelKey: "otherAcc.spec.interface", value: "UART" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.physical",
        items: [
          { labelKey: "otherAcc.spec.holeSpacing", value: "250mm (双孔)" },
          { labelKey: "otherAcc.spec.size", value: "25 x 25mm" },
          { labelKey: "otherAcc.spec.weight", value: "约5g" },
        ]
      }
    ],
    features: [
      {
        titleKey: "otherAcc.feature.m10HighPerf.title",
        descriptionKey: "otherAcc.feature.m10HighPerf.latestDesc"
      },
      {
        titleKey: "otherAcc.feature.250mmSpacing.title",
        descriptionKey: "otherAcc.feature.250mmSpacing.desc"
      },
      {
        titleKey: "otherAcc.feature.fastPosition.title",
        descriptionKey: "otherAcc.feature.fastPosition.1secDesc"
      },
      {
        titleKey: "otherAcc.feature.stableReliable.title",
        descriptionKey: "otherAcc.feature.stableReliable.flightDesc"
      },
      {
        titleKey: "otherAcc.feature.lightweight.title",
        descriptionKey: "otherAcc.feature.lightweight.ultraDesc"
      },
      {
        titleKey: "otherAcc.feature.plugAndPlay.title",
        descriptionKey: "otherAcc.feature.plugAndPlay.fcDesc"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2025-06-27/11-54-48-685e1608bf6fa.images.400x400.png"
    ]
  },
  {
    id: "gps-m10q-120-compass",
    nameKey: "otherAcc.gpsM10q120Compass.name",
    category: "gps",
    sloganKey: "otherAcc.gpsM10q120Compass.slogan",
    subSloganKey: "otherAcc.gpsM10q120Compass.subSlogan",
    descriptionKey: "otherAcc.gpsM10q120Compass.desc",
    price: "¥139",
    image: gpsM10q120CompassImg,
    keyFeatureKeys: [
      "otherAcc.feature.m10Chip",
      "otherAcc.feature.builtInCompass",
      "otherAcc.feature.120mmSpacing",
      "otherAcc.feature.twoInOne"
    ],
    specs: [
      {
        categoryKey: "otherAcc.spec.gps",
        items: [
          { labelKey: "otherAcc.spec.chipModel", value: "Ublox M10" },
          { labelKey: "otherAcc.spec.accuracy", value: "2.5m CEP" },
          { labelKey: "otherAcc.spec.coldStart", value: "<26s" },
          { labelKey: "otherAcc.spec.hotStart", value: "<1s" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.compass",
        items: [
          { labelKey: "otherAcc.spec.compassChip", value: "QMC5883" },
          { labelKey: "otherAcc.spec.compassAccuracy", value: "1-2°" },
          { labelKey: "otherAcc.spec.sampleRate", value: "200Hz" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.electrical",
        items: [
          { labelKey: "otherAcc.spec.inputVoltage", value: "3.3V / 5V" },
          { labelKey: "otherAcc.spec.workingCurrent", value: "约35mA" },
          { labelKey: "otherAcc.spec.interface", value: "UART + I2C" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.physical",
        items: [
          { labelKey: "otherAcc.spec.holeSpacing", value: "120mm (双孔)" },
          { labelKey: "otherAcc.spec.size", value: "30 x 30mm" },
          { labelKey: "otherAcc.spec.weight", value: "约8g" },
        ]
      }
    ],
    features: [
      {
        titleKey: "otherAcc.feature.gpsCompass2in1.title",
        descriptionKey: "otherAcc.feature.gpsCompass2in1.desc"
      },
      {
        titleKey: "otherAcc.feature.5883Compass.title",
        descriptionKey: "otherAcc.feature.5883Compass.desc"
      },
      {
        titleKey: "otherAcc.feature.m10GpsChip.title",
        descriptionKey: "otherAcc.feature.m10GpsChip.desc"
      },
      {
        titleKey: "otherAcc.feature.integrated.title",
        descriptionKey: "otherAcc.feature.integrated.desc"
      },
      {
        titleKey: "otherAcc.feature.120mmSpacing.title",
        descriptionKey: "otherAcc.feature.120mmSpacing.smallDesc"
      },
      {
        titleKey: "otherAcc.feature.dualInterface.title",
        descriptionKey: "otherAcc.feature.dualInterface.desc"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2023-04-25/17-51-35-6447a2a7e3202.images.400x400.JPG"
    ]
  },
  {
    id: "gps-m10q-180-compass",
    nameKey: "otherAcc.gpsM10q180Compass.name",
    category: "gps",
    sloganKey: "otherAcc.gpsM10q180Compass.slogan",
    subSloganKey: "otherAcc.gpsM10q180Compass.subSlogan",
    descriptionKey: "otherAcc.gpsM10q180Compass.desc",
    price: "¥139",
    image: gpsM10q180CompassImg,
    keyFeatureKeys: [
      "otherAcc.feature.m10Chip",
      "otherAcc.feature.builtInCompass",
      "otherAcc.feature.180mmSpacing",
      "otherAcc.feature.twoInOne"
    ],
    specs: [
      {
        categoryKey: "otherAcc.spec.gps",
        items: [
          { labelKey: "otherAcc.spec.chipModel", value: "Ublox M10" },
          { labelKey: "otherAcc.spec.accuracy", value: "2.5m CEP" },
          { labelKey: "otherAcc.spec.coldStart", value: "<26s" },
          { labelKey: "otherAcc.spec.hotStart", value: "<1s" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.compass",
        items: [
          { labelKey: "otherAcc.spec.compassChip", value: "QMC5883" },
          { labelKey: "otherAcc.spec.compassAccuracy", value: "1-2°" },
          { labelKey: "otherAcc.spec.sampleRate", value: "200Hz" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.electrical",
        items: [
          { labelKey: "otherAcc.spec.inputVoltage", value: "3.3V / 5V" },
          { labelKey: "otherAcc.spec.workingCurrent", value: "约35mA" },
          { labelKey: "otherAcc.spec.interface", value: "UART + I2C" },
        ]
      },
      {
        categoryKey: "otherAcc.spec.physical",
        items: [
          { labelKey: "otherAcc.spec.holeSpacing", value: "180mm (双孔)" },
          { labelKey: "otherAcc.spec.size", value: "30 x 30mm" },
          { labelKey: "otherAcc.spec.weight", value: "约8g" },
        ]
      }
    ],
    features: [
      {
        titleKey: "otherAcc.feature.2in1Design.title",
        descriptionKey: "otherAcc.feature.2in1Design.desc"
      },
      {
        titleKey: "otherAcc.feature.5883ECompass.title",
        descriptionKey: "otherAcc.feature.5883ECompass.desc"
      },
      {
        titleKey: "otherAcc.feature.m10Positioning.title",
        descriptionKey: "otherAcc.feature.m10Positioning.desc"
      },
      {
        titleKey: "otherAcc.feature.180mmSpacing.title",
        descriptionKey: "otherAcc.feature.180mmSpacing.mediumDesc"
      },
      {
        titleKey: "otherAcc.feature.antiInterference.title",
        descriptionKey: "otherAcc.feature.antiInterference.integratedDesc"
      },
      {
        titleKey: "otherAcc.feature.lightweight.title",
        descriptionKey: "otherAcc.feature.lightweight.8gDesc"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2023-03-29/10-56-25-6423a8d94eeba.images.400x400.jpg"
    ]
  }
];

export const otherAccessoriesCategories = [
  {
    id: "monitor",
    nameKey: "otherAcc.category.monitor",
    descriptionKey: "otherAcc.category.monitor.desc",
  },
  {
    id: "gps", 
    nameKey: "otherAcc.category.gps",
    descriptionKey: "otherAcc.category.gps.desc",
  }
];
