// ELRS 产品数据 - 多语言版本
import elrs24gLnaImage from "@/assets/elrs/elrs-2-4g-lna.jpg";

export interface ElrsProduct {
  id: string;
  nameKey: string;
  category: "receiver" | "transmitter" | "antenna";
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

export const elrsProducts: ElrsProduct[] = [
  // 接收机类
  {
    id: "elrs-915-diversity",
    nameKey: "elrs.product.915diversity.name",
    category: "receiver",
    sloganKey: "elrs.product.915diversity.slogan",
    subSloganKey: "elrs.product.915diversity.subSlogan",
    descriptionKey: "elrs.product.915diversity.desc",
    price: "¥149",
    image: "https://inew.foxeer.com//upload/s/goods/2023-12-12/11-16-45-6577d09dee618.images.400x400.jpg",
    keyFeatureKeys: [
      "elrs.feature.dualAntenna",
      "elrs.feature.915mhz",
      "elrs.feature.ultraLongRange",
      "elrs.feature.expressLRS"
    ],
    specs: [
      {
        categoryKey: "elrs.spec.basic",
        items: [
          { labelKey: "elrs.spec.model", value: "ELRS 915/868MHz Diversity RX" },
          { labelKey: "elrs.spec.protocol", value: "ExpressLRS" },
          { labelKey: "elrs.spec.freqRange", value: "915MHz (FCC) / 868MHz (EU)" },
          { labelKey: "elrs.spec.refreshRate", value: "50Hz / 150Hz / 250Hz / 500Hz" },
        ]
      },
      {
        categoryKey: "elrs.spec.electrical",
        items: [
          { labelKey: "elrs.spec.inputVoltage", value: "5V" },
          { labelKey: "elrs.spec.workingCurrent", value: "约100mA" },
          { labelKey: "elrs.spec.sensitivity", value: "-130dBm (50Hz)" },
        ]
      },
      {
        categoryKey: "elrs.spec.physical",
        items: [
          { labelKey: "elrs.spec.size", value: "30 x 15 x 5mm" },
          { labelKey: "elrs.spec.weight", value: "约3.5g (不含天线)" },
          { labelKey: "elrs.spec.antennaPort", value: "IPEX x2" },
        ]
      }
    ],
    features: [
      {
        titleKey: "elrs.feature.dualAntenna.title",
        descriptionKey: "elrs.feature.dualAntenna.desc"
      },
      {
        titleKey: "elrs.feature.ultraRange.title",
        descriptionKey: "elrs.feature.ultraRange.desc"
      },
      {
        titleKey: "elrs.feature.ultraLowLatency.title",
        descriptionKey: "elrs.feature.ultraLowLatency.desc"
      },
      {
        titleKey: "elrs.feature.firmwareUpgrade.title",
        descriptionKey: "elrs.feature.firmwareUpgrade.desc"
      },
      {
        titleKey: "elrs.feature.lightweight.title",
        descriptionKey: "elrs.feature.lightweight.desc"
      },
      {
        titleKey: "elrs.feature.multiRate.title",
        descriptionKey: "elrs.feature.multiRate.desc"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2023-12-12/11-16-45-6577d09dee618.images.400x400.jpg"
    ]
  },
  {
    id: "elrs-915-receiver",
    nameKey: "elrs.product.915receiver.name",
    category: "receiver",
    sloganKey: "elrs.product.915receiver.slogan",
    subSloganKey: "elrs.product.915receiver.subSlogan",
    descriptionKey: "elrs.product.915receiver.desc",
    price: "¥129",
    image: "https://inew.foxeer.com//upload/s/goods/2023-03-03/18-02-41-6401c5c1753d1.images.400x400.jpg",
    keyFeatureKeys: [
      "elrs.feature.915mhz",
      "elrs.feature.expressLRS",
      "elrs.feature.lowLatency",
      "elrs.feature.stable"
    ],
    specs: [
      {
        categoryKey: "elrs.spec.basic",
        items: [
          { labelKey: "elrs.spec.model", value: "ELRS 915/868MHz RX" },
          { labelKey: "elrs.spec.protocol", value: "ExpressLRS" },
          { labelKey: "elrs.spec.freqRange", value: "915MHz (FCC) / 868MHz (EU)" },
          { labelKey: "elrs.spec.refreshRate", value: "50Hz / 150Hz / 250Hz" },
        ]
      },
      {
        categoryKey: "elrs.spec.electrical",
        items: [
          { labelKey: "elrs.spec.inputVoltage", value: "5V" },
          { labelKey: "elrs.spec.workingCurrent", value: "约80mA" },
          { labelKey: "elrs.spec.sensitivity", value: "-130dBm (50Hz)" },
        ]
      },
      {
        categoryKey: "elrs.spec.physical",
        items: [
          { labelKey: "elrs.spec.size", value: "25 x 12 x 4mm" },
          { labelKey: "elrs.spec.weight", value: "约2g (不含天线)" },
          { labelKey: "elrs.spec.antennaPort", value: "IPEX x1" },
        ]
      }
    ],
    features: [
      {
        titleKey: "elrs.feature.matureStable.title",
        descriptionKey: "elrs.feature.matureStable.desc"
      },
      {
        titleKey: "elrs.feature.ultraRange.title",
        descriptionKey: "elrs.feature.ultraRange.915desc"
      },
      {
        titleKey: "elrs.feature.ultraLowLatency.title",
        descriptionKey: "elrs.feature.ultraLowLatency.elrsDesc"
      },
      {
        titleKey: "elrs.feature.compact.title",
        descriptionKey: "elrs.feature.compact.desc"
      },
      {
        titleKey: "elrs.feature.simple.title",
        descriptionKey: "elrs.feature.simple.desc"
      },
      {
        titleKey: "elrs.feature.openSource.title",
        descriptionKey: "elrs.feature.openSource.desc"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2023-03-03/18-02-41-6401c5c1753d1.images.400x400.jpg"
    ]
  },
  {
    id: "elrs-lite-2-4g",
    nameKey: "elrs.product.lite24g.name",
    category: "receiver",
    sloganKey: "elrs.product.lite24g.slogan",
    subSloganKey: "elrs.product.lite24g.subSlogan",
    descriptionKey: "elrs.product.lite24g.desc",
    price: "¥109",
    image: "/images/elrs/elrs-lite-2-4g.jpg",
    keyFeatureKeys: [
      "elrs.feature.24ghz",
      "elrs.feature.ultraLight",
      "elrs.feature.beginner",
      "elrs.feature.plugAndPlay"
    ],
    specs: [
      {
        categoryKey: "elrs.spec.basic",
        items: [
          { labelKey: "elrs.spec.model", value: "ELRS Lite 2.4G RX" },
          { labelKey: "elrs.spec.protocol", value: "ExpressLRS" },
          { labelKey: "elrs.spec.freqRange", value: "2.4GHz" },
          { labelKey: "elrs.spec.refreshRate", value: "500Hz / 250Hz / 150Hz / 50Hz" },
        ]
      },
      {
        categoryKey: "elrs.spec.electrical",
        items: [
          { labelKey: "elrs.spec.inputVoltage", value: "5V" },
          { labelKey: "elrs.spec.workingCurrent", value: "约60mA" },
          { labelKey: "elrs.spec.txPower", value: "10mW / 25mW / 50mW / 100mW" },
        ]
      },
      {
        categoryKey: "elrs.spec.physical",
        items: [
          { labelKey: "elrs.spec.size", value: "16 x 10 x 4mm" },
          { labelKey: "elrs.spec.weight", value: "约1.2g" },
          { labelKey: "elrs.spec.antenna", value: "陶瓷天线" },
        ]
      }
    ],
    features: [
      {
        titleKey: "elrs.feature.ultraLight.title",
        descriptionKey: "elrs.feature.ultraLight.desc"
      },
      {
        titleKey: "elrs.feature.ceramicAntenna.title",
        descriptionKey: "elrs.feature.ceramicAntenna.desc"
      },
      {
        titleKey: "elrs.feature.highRefresh.title",
        descriptionKey: "elrs.feature.highRefresh.desc"
      },
      {
        titleKey: "elrs.feature.beginner.title",
        descriptionKey: "elrs.feature.beginner.desc"
      },
      {
        titleKey: "elrs.feature.indoor.title",
        descriptionKey: "elrs.feature.indoor.desc"
      },
      {
        titleKey: "elrs.feature.multiPower.title",
        descriptionKey: "elrs.feature.multiPower.desc"
      }
    ],
    gallery: [
      "/images/elrs/elrs-lite-2-4g.jpg"
    ]
  },
  {
    id: "elrs-2-4g-lna",
    nameKey: "elrs.product.24glna.name",
    category: "receiver",
    sloganKey: "elrs.product.24glna.slogan",
    subSloganKey: "elrs.product.24glna.subSlogan",
    descriptionKey: "elrs.product.24glna.desc",
    price: "¥129",
    image: elrs24gLnaImage,
    keyFeatureKeys: [
      "elrs.feature.24ghz",
      "elrs.feature.lnaBoost",
      "elrs.feature.highSensitivity",
      "elrs.feature.longerRange"
    ],
    specs: [
      {
        categoryKey: "elrs.spec.basic",
        items: [
          { labelKey: "elrs.spec.model", value: "ELRS 2.4G LNA RX" },
          { labelKey: "elrs.spec.protocol", value: "ExpressLRS" },
          { labelKey: "elrs.spec.freqRange", value: "2.4GHz" },
          { labelKey: "elrs.spec.refreshRate", value: "500Hz / 250Hz / 150Hz / 50Hz" },
        ]
      },
      {
        categoryKey: "elrs.spec.electrical",
        items: [
          { labelKey: "elrs.spec.inputVoltage", value: "5V" },
          { labelKey: "elrs.spec.workingCurrent", value: "约80mA" },
          { labelKey: "elrs.spec.sensitivity", value: "-118dBm (500Hz)" },
          { labelKey: "elrs.spec.lnaGain", value: "约12dB" },
        ]
      },
      {
        categoryKey: "elrs.spec.physical",
        items: [
          { labelKey: "elrs.spec.size", value: "20 x 12 x 5mm" },
          { labelKey: "elrs.spec.weight", value: "约1.8g (不含天线)" },
          { labelKey: "elrs.spec.antennaPort", value: "IPEX x1" },
        ]
      }
    ],
    features: [
      {
        titleKey: "elrs.feature.lnaBoost.title",
        descriptionKey: "elrs.feature.lnaBoost.desc"
      },
      {
        titleKey: "elrs.feature.highSensitivity.title",
        descriptionKey: "elrs.feature.highSensitivity.desc"
      },
      {
        titleKey: "elrs.feature.antiInterference.title",
        descriptionKey: "elrs.feature.antiInterference.desc"
      },
      {
        titleKey: "elrs.feature.highRefresh.title",
        descriptionKey: "elrs.feature.highRefresh.500desc"
      },
      {
        titleKey: "elrs.feature.longRange24g.title",
        descriptionKey: "elrs.feature.longRange24g.desc"
      },
      {
        titleKey: "elrs.feature.stableReliable.title",
        descriptionKey: "elrs.feature.stableReliable.desc"
      }
    ],
    gallery: [
      elrs24gLnaImage
    ]
  },
  // 天线类
  {
    id: "elrs-915-moxon-antenna",
    nameKey: "elrs.product.moxonAntenna.name",
    category: "antenna",
    sloganKey: "elrs.product.moxonAntenna.slogan",
    subSloganKey: "elrs.product.moxonAntenna.subSlogan",
    descriptionKey: "elrs.product.moxonAntenna.desc",
    price: "¥69",
    image: "https://inew.foxeer.com//upload/s/goods/2024-04-12/15-56-00-6618e910334e4.images.400x400.jpg",
    keyFeatureKeys: [
      "elrs.feature.moxonDesign",
      "elrs.feature.highGain",
      "elrs.feature.directional",
      "elrs.feature.longRange"
    ],
    specs: [
      {
        categoryKey: "elrs.spec.antenna",
        items: [
          { labelKey: "elrs.spec.model", value: "915/868MHz Moxon Antenna" },
          { labelKey: "elrs.spec.freqRange", value: "868-915MHz" },
          { labelKey: "elrs.spec.gain", value: "约5dBi" },
          { labelKey: "elrs.spec.polarization", value: "线极化" },
        ]
      },
      {
        categoryKey: "elrs.spec.interface",
        items: [
          { labelKey: "elrs.spec.connectorType", value: "SMA公头" },
          { labelKey: "elrs.spec.impedance", value: "50Ω" },
          { labelKey: "elrs.spec.vswr", value: "<1.5" },
        ]
      },
      {
        categoryKey: "elrs.spec.physical",
        items: [
          { labelKey: "elrs.spec.size", value: "约180 x 120mm" },
          { labelKey: "elrs.spec.weight", value: "约30g" },
          { labelKey: "elrs.spec.material", value: "PCB+金属" },
        ]
      }
    ],
    features: [
      {
        titleKey: "elrs.feature.moxonDirectional.title",
        descriptionKey: "elrs.feature.moxonDirectional.desc"
      },
      {
        titleKey: "elrs.feature.highGain.title",
        descriptionKey: "elrs.feature.highGain.desc"
      },
      {
        titleKey: "elrs.feature.rcDedicated.title",
        descriptionKey: "elrs.feature.rcDedicated.desc"
      },
      {
        titleKey: "elrs.feature.qualityCraft.title",
        descriptionKey: "elrs.feature.qualityCraft.desc"
      },
      {
        titleKey: "elrs.feature.plugPlay.title",
        descriptionKey: "elrs.feature.plugPlay.desc"
      },
      {
        titleKey: "elrs.feature.longRangeEssential.title",
        descriptionKey: "elrs.feature.longRangeEssential.desc"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2024-04-12/15-56-00-6618e910334e4.images.400x400.jpg"
    ]
  },
  {
    id: "elrs-2-4g-antenna",
    nameKey: "elrs.product.24gAntenna.name",
    category: "antenna",
    sloganKey: "elrs.product.24gAntenna.slogan",
    subSloganKey: "elrs.product.24gAntenna.subSlogan",
    descriptionKey: "elrs.product.24gAntenna.desc",
    price: "¥29",
    image: "https://inew.foxeer.com//upload/s/goods/2023-03-14/15-22-36-641020bcaa090.images.400x400.jpg",
    keyFeatureKeys: [
      "elrs.feature.24ghz",
      "elrs.feature.tDesign",
      "elrs.feature.lightweight",
      "elrs.feature.standard"
    ],
    specs: [
      {
        categoryKey: "elrs.spec.antenna",
        items: [
          { labelKey: "elrs.spec.model", value: "ELRS 2.4GHz RX Antenna" },
          { labelKey: "elrs.spec.freqRange", value: "2400-2500MHz" },
          { labelKey: "elrs.spec.gain", value: "约2dBi" },
          { labelKey: "elrs.spec.polarization", value: "线极化" },
        ]
      },
      {
        categoryKey: "elrs.spec.interface",
        items: [
          { labelKey: "elrs.spec.connectorType", value: "IPEX" },
          { labelKey: "elrs.spec.impedance", value: "50Ω" },
          { labelKey: "elrs.spec.cableLength", value: "约80mm" },
        ]
      },
      {
        categoryKey: "elrs.spec.physical",
        items: [
          { labelKey: "elrs.spec.antennaSize", value: "T型，约30mm" },
          { labelKey: "elrs.spec.weight", value: "约1g" },
          { labelKey: "elrs.spec.material", value: "PCB" },
        ]
      }
    ],
    features: [
      {
        titleKey: "elrs.feature.tDesign.title",
        descriptionKey: "elrs.feature.tDesign.desc"
      },
      {
        titleKey: "elrs.feature.superLight.title",
        descriptionKey: "elrs.feature.superLight.desc"
      },
      {
        titleKey: "elrs.feature.ipexPort.title",
        descriptionKey: "elrs.feature.ipexPort.desc"
      },
      {
        titleKey: "elrs.feature.stableSignal.title",
        descriptionKey: "elrs.feature.stableSignal.desc"
      },
      {
        titleKey: "elrs.feature.durableDesign.title",
        descriptionKey: "elrs.feature.durableDesign.desc"
      },
      {
        titleKey: "elrs.feature.costEffective.title",
        descriptionKey: "elrs.feature.costEffective.desc"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2023-03-14/15-22-36-641020bcaa090.images.400x400.jpg"
    ]
  },
  {
    id: "elrs-915-antenna",
    nameKey: "elrs.product.915antenna.name",
    category: "antenna",
    sloganKey: "elrs.product.915antenna.slogan",
    subSloganKey: "elrs.product.915antenna.subSlogan",
    descriptionKey: "elrs.product.915antenna.desc",
    price: "¥29",
    image: "https://inew.foxeer.com//upload/s/goods/2023-03-03/11-12-27-6401659b23174.images.400x400.jpg",
    keyFeatureKeys: [
      "elrs.feature.915mhz",
      "elrs.feature.longRange",
      "elrs.feature.stableRx",
      "elrs.feature.lightweight"
    ],
    specs: [
      {
        categoryKey: "elrs.spec.antenna",
        items: [
          { labelKey: "elrs.spec.model", value: "ELRS 915/868MHz RX Antenna" },
          { labelKey: "elrs.spec.freqRange", value: "868-915MHz" },
          { labelKey: "elrs.spec.gain", value: "约2dBi" },
          { labelKey: "elrs.spec.polarization", value: "线极化" },
        ]
      },
      {
        categoryKey: "elrs.spec.interface",
        items: [
          { labelKey: "elrs.spec.connectorType", value: "IPEX" },
          { labelKey: "elrs.spec.impedance", value: "50Ω" },
          { labelKey: "elrs.spec.cableLength", value: "约100mm" },
        ]
      },
      {
        categoryKey: "elrs.spec.physical",
        items: [
          { labelKey: "elrs.spec.antennaSize", value: "T型，约80mm" },
          { labelKey: "elrs.spec.weight", value: "约2g" },
          { labelKey: "elrs.spec.material", value: "PCB+柔性材料" },
        ]
      }
    ],
    features: [
      {
        titleKey: "elrs.feature.longRangeOptimized.title",
        descriptionKey: "elrs.feature.longRangeOptimized.desc"
      },
      {
        titleKey: "elrs.feature.lightweight.title",
        descriptionKey: "elrs.feature.lightweight.915desc"
      },
      {
        titleKey: "elrs.feature.flexMaterial.title",
        descriptionKey: "elrs.feature.flexMaterial.desc"
      },
      {
        titleKey: "elrs.feature.easyInstall.title",
        descriptionKey: "elrs.feature.easyInstall.desc"
      },
      {
        titleKey: "elrs.feature.stableRx.title",
        descriptionKey: "elrs.feature.stableRx.desc"
      },
      {
        titleKey: "elrs.feature.durableReliable.title",
        descriptionKey: "elrs.feature.durableReliable.desc"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2023-03-03/11-12-27-6401659b23174.images.400x400.jpg"
    ]
  }
];

export const elrsCategories = [
  {
    id: "receiver",
    nameKey: "elrs.category.receiver",
    descriptionKey: "elrs.category.receiver.desc",
  },
  {
    id: "antenna", 
    nameKey: "elrs.category.antenna",
    descriptionKey: "elrs.category.antenna.desc",
  }
];
