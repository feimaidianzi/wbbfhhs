// ELRS 产品数据

export interface ElrsProduct {
  id: string;
  name: string;
  category: "receiver" | "transmitter" | "antenna";
  slogan: string;
  subSlogan: string;
  description: string;
  price: string;
  image: string;
  keyFeatures: string[];
  specs: {
    category: string;
    items: { label: string; value: string }[];
  }[];
  features: {
    title: string;
    description: string;
  }[];
  gallery: string[];
}

export const elrsProducts: ElrsProduct[] = [
  // 接收机类
  {
    id: "elrs-915-diversity",
    name: "ELRS 915/868MHz 分集接收机",
    category: "receiver",
    slogan: "双天线分集接收",
    subSlogan: "915/868MHz频段 超远距离控制",
    description: "ELRS 915/868MHz 分集接收机采用双天线分集技术，有效提升信号稳定性和抗干扰能力。支持ExpressLRS协议，超低延迟，适合长距离FPV飞行。",
    price: "¥149",
    image: "https://inew.foxeer.com//upload/s/goods/2023-12-12/11-16-45-6577d09dee618.images.400x400.jpg",
    keyFeatures: [
      "双天线分集",
      "915/868MHz",
      "超远距离",
      "ExpressLRS"
    ],
    specs: [
      {
        category: "基本参数",
        items: [
          { label: "型号", value: "ELRS 915/868MHz Diversity RX" },
          { label: "协议", value: "ExpressLRS" },
          { label: "频率范围", value: "915MHz (FCC) / 868MHz (EU)" },
          { label: "传输速率", value: "50Hz / 150Hz / 250Hz / 500Hz" },
        ]
      },
      {
        category: "电气参数",
        items: [
          { label: "供电电压", value: "5V" },
          { label: "工作电流", value: "约100mA" },
          { label: "接收灵敏度", value: "-130dBm (50Hz)" },
        ]
      },
      {
        category: "物理参数",
        items: [
          { label: "尺寸", value: "30 x 15 x 5mm" },
          { label: "重量", value: "约3.5g (不含天线)" },
          { label: "天线接口", value: "IPEX x2" },
        ]
      }
    ],
    features: [
      {
        title: "双天线分集接收",
        description: "采用双天线分集技术，自动选择最佳信号，有效提升接收稳定性"
      },
      {
        title: "超远控制距离",
        description: "915/868MHz低频段，穿透力强，理论控制距离可达40km+"
      },
      {
        title: "超低延迟",
        description: "ExpressLRS协议，延迟低至5ms，响应更迅速"
      },
      {
        title: "固件可升级",
        description: "支持WiFi/USB固件升级，紧跟最新功能"
      },
      {
        title: "轻量化设计",
        description: "仅约3.5g重量，适合各类穿越机安装"
      },
      {
        title: "多速率支持",
        description: "支持50Hz/150Hz/250Hz/500Hz多种刷新率"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2023-12-12/11-16-45-6577d09dee618.images.400x400.jpg"
    ]
  },
  {
    id: "elrs-915-receiver",
    name: "ELRS 915/868MHz 接收机",
    category: "receiver",
    slogan: "经典稳定之选",
    subSlogan: "915/868MHz 可靠远距离控制",
    description: "ELRS 915/868MHz 接收机是一款成熟稳定的远距离接收方案，采用ExpressLRS协议，具有超低延迟和极强的抗干扰能力，是长距离FPV飞行的可靠选择。",
    price: "¥129",
    image: "https://inew.foxeer.com//upload/s/goods/2023-03-03/18-02-41-6401c5c1753d1.images.400x400.jpg",
    keyFeatures: [
      "915/868MHz",
      "ExpressLRS",
      "超低延迟",
      "稳定可靠"
    ],
    specs: [
      {
        category: "基本参数",
        items: [
          { label: "型号", value: "ELRS 915/868MHz RX" },
          { label: "协议", value: "ExpressLRS" },
          { label: "频率范围", value: "915MHz (FCC) / 868MHz (EU)" },
          { label: "传输速率", value: "50Hz / 150Hz / 250Hz" },
        ]
      },
      {
        category: "电气参数",
        items: [
          { label: "供电电压", value: "5V" },
          { label: "工作电流", value: "约80mA" },
          { label: "接收灵敏度", value: "-130dBm (50Hz)" },
        ]
      },
      {
        category: "物理参数",
        items: [
          { label: "尺寸", value: "25 x 12 x 4mm" },
          { label: "重量", value: "约2g (不含天线)" },
          { label: "天线接口", value: "IPEX x1" },
        ]
      }
    ],
    features: [
      {
        title: "成熟稳定",
        description: "经过大量实际验证的稳定方案，可靠性高"
      },
      {
        title: "超远距离",
        description: "915MHz低频段，穿透力强，控制距离远"
      },
      {
        title: "超低延迟",
        description: "ExpressLRS协议确保极低的控制延迟"
      },
      {
        title: "轻巧便携",
        description: "仅约2g超轻重量，适合微型机安装"
      },
      {
        title: "简单可靠",
        description: "单天线设计，安装简便，维护方便"
      },
      {
        title: "开源固件",
        description: "开源ExpressLRS固件，持续更新优化"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2023-03-03/18-02-41-6401c5c1753d1.images.400x400.jpg"
    ]
  },
  {
    id: "elrs-lite-2-4g",
    name: "ELRS Lite 2.4G 接收机",
    category: "receiver",
    slogan: "轻量入门之选",
    subSlogan: "2.4GHz频段 即插即用",
    description: "ELRS Lite 2.4G 接收机是一款轻巧的入门级ExpressLRS接收机，采用2.4GHz频段，重量轻体积小，适合各类小型穿越机和室内飞行使用。",
    price: "¥109",
    image: "https://inew.foxeer.com//upload/s/goods/2022-10-21/17-13-15-635262ab4b099.images.400x400.jpg",
    keyFeatures: [
      "2.4GHz",
      "超轻量",
      "入门首选",
      "即插即用"
    ],
    specs: [
      {
        category: "基本参数",
        items: [
          { label: "型号", value: "ELRS Lite 2.4G RX" },
          { label: "协议", value: "ExpressLRS" },
          { label: "频率范围", value: "2.4GHz" },
          { label: "传输速率", value: "500Hz / 250Hz / 150Hz / 50Hz" },
        ]
      },
      {
        category: "电气参数",
        items: [
          { label: "供电电压", value: "5V" },
          { label: "工作电流", value: "约60mA" },
          { label: "发射功率", value: "10mW / 25mW / 50mW / 100mW" },
        ]
      },
      {
        category: "物理参数",
        items: [
          { label: "尺寸", value: "16 x 10 x 4mm" },
          { label: "重量", value: "约1.2g" },
          { label: "天线", value: "陶瓷天线" },
        ]
      }
    ],
    features: [
      {
        title: "超轻量设计",
        description: "仅约1.2g超轻重量，几乎不增加飞机负担"
      },
      {
        title: "陶瓷天线",
        description: "内置陶瓷天线，无外露天线，安装更简洁"
      },
      {
        title: "高刷新率",
        description: "支持最高500Hz刷新率，响应更灵敏"
      },
      {
        title: "入门友好",
        description: "即插即用设计，新手也能快速上手"
      },
      {
        title: "适合室内",
        description: "2.4GHz频段适合室内和近距离飞行"
      },
      {
        title: "多功率可选",
        description: "10mW到100mW多档功率可调"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2022-10-21/17-13-15-635262ab4b099.images.400x400.jpg"
    ]
  },
  {
    id: "elrs-2-4g-lna",
    name: "ELRS 2.4G LNA 接收机",
    category: "receiver",
    slogan: "LNA增益增强",
    subSlogan: "2.4GHz频段 信号增强接收",
    description: "ELRS 2.4G LNA 接收机内置低噪声放大器(LNA)，有效提升接收灵敏度和信号质量，适合对信号稳定性有较高要求的用户。",
    price: "¥129",
    image: "https://inew.foxeer.com//upload/s/goods/2022-10-21/17-17-13-6352639957740.images.400x400.jpg",
    keyFeatures: [
      "2.4GHz",
      "LNA增强",
      "高灵敏度",
      "更远距离"
    ],
    specs: [
      {
        category: "基本参数",
        items: [
          { label: "型号", value: "ELRS 2.4G LNA RX" },
          { label: "协议", value: "ExpressLRS" },
          { label: "频率范围", value: "2.4GHz" },
          { label: "传输速率", value: "500Hz / 250Hz / 150Hz / 50Hz" },
        ]
      },
      {
        category: "电气参数",
        items: [
          { label: "供电电压", value: "5V" },
          { label: "工作电流", value: "约80mA" },
          { label: "接收灵敏度", value: "-118dBm (500Hz)" },
          { label: "LNA增益", value: "约12dB" },
        ]
      },
      {
        category: "物理参数",
        items: [
          { label: "尺寸", value: "20 x 12 x 5mm" },
          { label: "重量", value: "约1.8g (不含天线)" },
          { label: "天线接口", value: "IPEX x1" },
        ]
      }
    ],
    features: [
      {
        title: "LNA信号增强",
        description: "内置低噪声放大器，接收信号增强约12dB"
      },
      {
        title: "更高灵敏度",
        description: "接收灵敏度提升，有效延长控制距离"
      },
      {
        title: "更好抗干扰",
        description: "LNA前级放大，有效抑制后级噪声"
      },
      {
        title: "高刷新率",
        description: "支持最高500Hz刷新率"
      },
      {
        title: "适合远距离",
        description: "2.4GHz频段搭配LNA，兼顾距离与响应"
      },
      {
        title: "稳定可靠",
        description: "成熟方案，长时间飞行也能保持稳定"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2022-10-21/17-17-13-6352639957740.images.400x400.jpg"
    ]
  },
  // 天线类
  {
    id: "elrs-915-moxon-antenna",
    name: "915/868MHz Moxon 天线",
    category: "antenna",
    slogan: "定向高增益",
    subSlogan: "Moxon定向天线 长距离通信",
    description: "915/868MHz Moxon 天线是一款高增益定向天线，适合遥控器端使用，可有效提升控制距离，是远航玩家的必备配件。",
    price: "¥69",
    image: "https://inew.foxeer.com//upload/s/goods/2024-04-12/15-56-00-6618e910334e4.images.400x400.jpg",
    keyFeatures: [
      "Moxon设计",
      "高增益",
      "定向接收",
      "远距离"
    ],
    specs: [
      {
        category: "天线参数",
        items: [
          { label: "型号", value: "915/868MHz Moxon Antenna" },
          { label: "频率范围", value: "868-915MHz" },
          { label: "增益", value: "约5dBi" },
          { label: "极化方式", value: "线极化" },
        ]
      },
      {
        category: "接口参数",
        items: [
          { label: "接口类型", value: "SMA公头" },
          { label: "阻抗", value: "50Ω" },
          { label: "驻波比", value: "<1.5" },
        ]
      },
      {
        category: "物理参数",
        items: [
          { label: "尺寸", value: "约180 x 120mm" },
          { label: "重量", value: "约30g" },
          { label: "材质", value: "PCB+金属" },
        ]
      }
    ],
    features: [
      {
        title: "Moxon定向设计",
        description: "经典Moxon天线结构，定向增益效果明显"
      },
      {
        title: "高增益",
        description: "约5dBi增益，有效延长控制距离"
      },
      {
        title: "遥控器专用",
        description: "专为遥控器端设计，配合ELRS发射模块使用"
      },
      {
        title: "优质做工",
        description: "PCB设计，精确调谐，性能稳定"
      },
      {
        title: "即插即用",
        description: "SMA接口，兼容大多数遥控器"
      },
      {
        title: "远航必备",
        description: "远距离飞行玩家的必备配件"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2024-04-12/15-56-00-6618e910334e4.images.400x400.jpg"
    ]
  },
  {
    id: "elrs-2-4g-antenna",
    name: "ELRS 2.4GHz 接收天线",
    category: "antenna",
    slogan: "轻量接收天线",
    subSlogan: "2.4GHz T型天线 稳定信号",
    description: "ELRS 2.4GHz 接收天线采用T型设计，适合接收机端使用，提供稳定的信号接收效果，是2.4G ELRS接收机的标准配置。",
    price: "¥29",
    image: "https://inew.foxeer.com//upload/s/goods/2023-03-14/15-22-36-641020bcaa090.images.400x400.jpg",
    keyFeatures: [
      "2.4GHz",
      "T型设计",
      "轻量化",
      "标准配置"
    ],
    specs: [
      {
        category: "天线参数",
        items: [
          { label: "型号", value: "ELRS 2.4GHz RX Antenna" },
          { label: "频率范围", value: "2400-2500MHz" },
          { label: "增益", value: "约2dBi" },
          { label: "极化方式", value: "线极化" },
        ]
      },
      {
        category: "接口参数",
        items: [
          { label: "接口类型", value: "IPEX" },
          { label: "阻抗", value: "50Ω" },
          { label: "线缆长度", value: "约80mm" },
        ]
      },
      {
        category: "物理参数",
        items: [
          { label: "天线尺寸", value: "T型，约30mm" },
          { label: "重量", value: "约1g" },
          { label: "材质", value: "PCB" },
        ]
      }
    ],
    features: [
      {
        title: "T型设计",
        description: "经典T型天线结构，全向接收效果好"
      },
      {
        title: "超轻量",
        description: "仅约1g重量，不增加飞机负担"
      },
      {
        title: "IPEX接口",
        description: "标准IPEX接口，兼容各类接收机"
      },
      {
        title: "稳定信号",
        description: "良好的信号接收特性，飞行更放心"
      },
      {
        title: "耐用设计",
        description: "PCB材质，耐炸耐摔"
      },
      {
        title: "性价比高",
        description: "价格实惠，备用替换无压力"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2023-03-14/15-22-36-641020bcaa090.images.400x400.jpg"
    ]
  },
  {
    id: "elrs-915-antenna",
    name: "ELRS 915M/868MHz 接收天线",
    category: "antenna",
    slogan: "远距离接收天线",
    subSlogan: "915/868MHz 远航专用",
    description: "ELRS 915M/868MHz 接收天线专为远距离控制设计，配合915/868MHz接收机使用，提供稳定的远距离信号接收能力。",
    price: "¥29",
    image: "https://inew.foxeer.com//upload/s/goods/2023-03-03/11-12-27-6401659b23174.images.400x400.jpg",
    keyFeatures: [
      "915/868MHz",
      "远距离",
      "稳定接收",
      "轻量设计"
    ],
    specs: [
      {
        category: "天线参数",
        items: [
          { label: "型号", value: "ELRS 915/868MHz RX Antenna" },
          { label: "频率范围", value: "868-915MHz" },
          { label: "增益", value: "约2dBi" },
          { label: "极化方式", value: "线极化" },
        ]
      },
      {
        category: "接口参数",
        items: [
          { label: "接口类型", value: "IPEX" },
          { label: "阻抗", value: "50Ω" },
          { label: "线缆长度", value: "约100mm" },
        ]
      },
      {
        category: "物理参数",
        items: [
          { label: "天线尺寸", value: "T型，约80mm" },
          { label: "重量", value: "约2g" },
          { label: "材质", value: "PCB+柔性材料" },
        ]
      }
    ],
    features: [
      {
        title: "远距离优化",
        description: "针对915/868MHz频段优化设计"
      },
      {
        title: "轻量化",
        description: "约2g轻量设计，适合远航机型"
      },
      {
        title: "柔性材质",
        description: "部分采用柔性材料，抗震抗摔"
      },
      {
        title: "简单安装",
        description: "IPEX接口，即插即用"
      },
      {
        title: "稳定接收",
        description: "良好的接收特性，信号稳定"
      },
      {
        title: "耐用可靠",
        description: "经过实际飞行验证，可靠耐用"
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
    name: "ELRS接收机",
    description: "ExpressLRS协议接收机，超低延迟，远距离控制",
  },
  {
    id: "antenna", 
    name: "ELRS天线",
    description: "配套ELRS系统使用的各类天线",
  }
];
