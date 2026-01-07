// 其他配件产品数据

export interface OtherAccessoryProduct {
  id: string;
  name: string;
  category: "monitor" | "gps";
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

export const otherAccessoriesProducts: OtherAccessoryProduct[] = [
  // 监视器/眼镜类
  {
    id: "monitor-5-ips-dvr",
    name: "5寸IPS高清监视器",
    category: "monitor",
    slogan: "高清IPS屏",
    subSlogan: "5.8G 40频道 内置DVR录像",
    description: "5英寸IPS高清显示屏FPV监视器，内置5.8G 40频道接收器和DVR录像功能，配备大容量电池，是地面站和FPV飞行的理想选择。",
    price: "¥699",
    image: "https://inew.foxeer.com//upload/s/goods/2023-03-31/17-24-03-6426a6b30b1e9.images.400x400.jpg",
    keyFeatures: [
      "5寸IPS屏",
      "40频道接收",
      "内置DVR",
      "内置电池"
    ],
    specs: [
      {
        category: "显示参数",
        items: [
          { label: "屏幕尺寸", value: "5英寸" },
          { label: "屏幕类型", value: "IPS LCD" },
          { label: "分辨率", value: "800 x 480" },
          { label: "亮度", value: "400cd/m²" },
        ]
      },
      {
        category: "接收参数",
        items: [
          { label: "频率范围", value: "5.8GHz" },
          { label: "频道数", value: "40频道" },
          { label: "灵敏度", value: "-90dBm" },
        ]
      },
      {
        category: "录像参数",
        items: [
          { label: "录像格式", value: "AVI" },
          { label: "存储介质", value: "Micro SD (最大32GB)" },
          { label: "录像分辨率", value: "720P" },
        ]
      },
      {
        category: "电源参数",
        items: [
          { label: "内置电池", value: "2000mAh" },
          { label: "工作时间", value: "约2小时" },
          { label: "充电接口", value: "DC 5V" },
        ]
      }
    ],
    features: [
      {
        title: "IPS高清屏",
        description: "5英寸IPS显示屏，色彩鲜艳，可视角度广"
      },
      {
        title: "40频道接收",
        description: "内置5.8G接收器，支持40个频道，覆盖主流频段"
      },
      {
        title: "内置DVR录像",
        description: "支持SD卡录像，随时记录飞行画面"
      },
      {
        title: "内置电池",
        description: "2000mAh大容量电池，支持约2小时使用"
      },
      {
        title: "便携设计",
        description: "轻便紧凑，配遮光罩，户外使用更清晰"
      },
      {
        title: "即插即用",
        description: "一体化设计，无需额外配件即可使用"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2023-03-31/17-24-03-6426a6b30b1e9.images.400x400.jpg"
    ]
  },
  {
    id: "fpv-goggles-40ch",
    name: "5.8G FPV眼镜",
    category: "monitor",
    slogan: "沉浸式体验",
    subSlogan: "40频道双接收 内置DVR电池",
    description: "5.8G FPV眼镜采用双接收器分集设计，有效提升信号稳定性。内置DVR录像功能和大容量电池，是FPV飞行的沉浸式体验首选。",
    price: "¥799",
    image: "https://inew.foxeer.com//upload/s/goods/2022-12-28/17-10-23-63ac07ff2111b.images.400x400.jpg",
    keyFeatures: [
      "双接收分集",
      "40频道",
      "内置DVR",
      "沉浸体验"
    ],
    specs: [
      {
        category: "显示参数",
        items: [
          { label: "屏幕类型", value: "LCD双屏" },
          { label: "分辨率", value: "480 x 320 x2" },
          { label: "视场角", value: "40°" },
        ]
      },
      {
        category: "接收参数",
        items: [
          { label: "频率范围", value: "5.8GHz" },
          { label: "频道数", value: "40频道" },
          { label: "接收方式", value: "双接收分集" },
          { label: "灵敏度", value: "-93dBm" },
        ]
      },
      {
        category: "录像参数",
        items: [
          { label: "DVR录像", value: "支持" },
          { label: "存储介质", value: "Micro SD (最大32GB)" },
        ]
      },
      {
        category: "电源参数",
        items: [
          { label: "内置电池", value: "2200mAh" },
          { label: "工作时间", value: "约2.5小时" },
          { label: "充电接口", value: "DC 5V" },
        ]
      },
      {
        category: "物理参数",
        items: [
          { label: "重量", value: "约350g" },
          { label: "佩戴方式", value: "头戴式" },
        ]
      }
    ],
    features: [
      {
        title: "双接收分集",
        description: "双接收器分集系统，自动选择最佳信号，飞行更稳定"
      },
      {
        title: "沉浸式体验",
        description: "头戴式设计，带来第一视角沉浸式飞行体验"
      },
      {
        title: "40频道覆盖",
        description: "支持40个频道，兼容各类5.8G图传设备"
      },
      {
        title: "内置DVR",
        description: "支持飞行画面录制，回放精彩瞬间"
      },
      {
        title: "长续航电池",
        description: "2200mAh电池，支持约2.5小时连续使用"
      },
      {
        title: "舒适佩戴",
        description: "人体工学设计，长时间佩戴依然舒适"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2022-12-28/17-10-23-63ac07ff2111b.images.400x400.jpg"
    ]
  },
  {
    id: "monitor-4-3-dvr",
    name: "4.3寸FPV监视器",
    category: "monitor",
    slogan: "入门之选",
    subSlogan: "5.8G 40频道 内置DVR接收电池",
    description: "4.3英寸FPV监视器，内置5.8G 40频道接收器、DVR录像功能和电池，轻便实惠，是FPV入门的理想选择。",
    price: "¥489",
    image: "https://inew.foxeer.com//upload/s/goods/2022-12-21/14-47-02-63a2abe65374a.images.400x400.jpg",
    keyFeatures: [
      "4.3寸屏幕",
      "40频道",
      "内置DVR",
      "性价比高"
    ],
    specs: [
      {
        category: "显示参数",
        items: [
          { label: "屏幕尺寸", value: "4.3英寸" },
          { label: "屏幕类型", value: "TFT LCD" },
          { label: "分辨率", value: "480 x 272" },
        ]
      },
      {
        category: "接收参数",
        items: [
          { label: "频率范围", value: "5.8GHz" },
          { label: "频道数", value: "40频道" },
          { label: "灵敏度", value: "-90dBm" },
        ]
      },
      {
        category: "录像参数",
        items: [
          { label: "DVR录像", value: "支持" },
          { label: "存储介质", value: "Micro SD (最大32GB)" },
        ]
      },
      {
        category: "电源参数",
        items: [
          { label: "内置电池", value: "1200mAh" },
          { label: "工作时间", value: "约1.5小时" },
        ]
      }
    ],
    features: [
      {
        title: "入门首选",
        description: "性价比之选，功能齐全，适合FPV新手入门"
      },
      {
        title: "40频道接收",
        description: "内置40频道接收器，兼容主流图传"
      },
      {
        title: "DVR录像",
        description: "支持SD卡录像，记录飞行画面"
      },
      {
        title: "便携设计",
        description: "4.3寸小巧机身，携带方便"
      },
      {
        title: "内置电池",
        description: "内置锂电池，开机即用"
      },
      {
        title: "遮光罩",
        description: "配备遮光罩，户外阳光下也能看清"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2022-12-21/14-47-02-63a2abe65374a.images.400x400.jpg"
    ]
  },
  {
    id: "monitor-7-lcd",
    name: "7寸LCD高清监视器",
    category: "monitor",
    slogan: "大屏高清",
    subSlogan: "5.8G 40频道 内置DVR接收器",
    description: "7英寸LCD高清监视器，大屏幕显示更清晰，内置5.8G 40频道接收器和DVR录像功能，适合地面站和专业FPV应用。",
    price: "¥729",
    image: "https://inew.foxeer.com//upload/s/goods/2022-11-30/17-22-45-638720e5f2a6f.images.400x400.jpg",
    keyFeatures: [
      "7寸大屏",
      "40频道",
      "内置DVR",
      "专业级"
    ],
    specs: [
      {
        category: "显示参数",
        items: [
          { label: "屏幕尺寸", value: "7英寸" },
          { label: "屏幕类型", value: "TFT LCD" },
          { label: "分辨率", value: "800 x 480" },
          { label: "亮度", value: "450cd/m²" },
        ]
      },
      {
        category: "接收参数",
        items: [
          { label: "频率范围", value: "5.8GHz" },
          { label: "频道数", value: "40频道" },
          { label: "灵敏度", value: "-90dBm" },
        ]
      },
      {
        category: "录像参数",
        items: [
          { label: "DVR录像", value: "支持" },
          { label: "存储介质", value: "Micro SD (最大64GB)" },
          { label: "录像分辨率", value: "720P" },
        ]
      },
      {
        category: "电源参数",
        items: [
          { label: "供电电压", value: "DC 7-24V" },
          { label: "功耗", value: "约5W" },
        ]
      },
      {
        category: "物理参数",
        items: [
          { label: "尺寸", value: "177 x 120 x 22mm" },
          { label: "重量", value: "约300g" },
        ]
      }
    ],
    features: [
      {
        title: "7寸大屏",
        description: "7英寸大屏幕，画面细节更丰富，观看更舒适"
      },
      {
        title: "高亮度",
        description: "450cd/m²高亮度，户外阳光下也能清晰可见"
      },
      {
        title: "40频道接收",
        description: "内置40频道接收器，覆盖全频段"
      },
      {
        title: "DVR录像",
        description: "支持最大64GB SD卡，720P录像"
      },
      {
        title: "宽电压输入",
        description: "支持7-24V宽电压供电，兼容性强"
      },
      {
        title: "专业应用",
        description: "适合地面站、航拍监看等专业应用"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2022-11-30/17-22-45-638720e5f2a6f.images.400x400.jpg"
    ]
  },
  // GPS模块类
  {
    id: "gps-m10q-120-v2",
    name: "M10Q 120 V2 GPS模块",
    category: "gps",
    slogan: "高精度定位",
    subSlogan: "M10芯片 快速搜星",
    description: "M10Q 120 V2 GPS模块采用最新M10芯片，定位精度高，搜星速度快，120孔距设计适配各类飞控安装。",
    price: "¥139",
    image: "https://inew.foxeer.com//upload/s/goods/2025-06-27/12-02-37-685e17dd58835.images.400x400.png",
    keyFeatures: [
      "M10芯片",
      "120mm孔距",
      "快速搜星",
      "高精度"
    ],
    specs: [
      {
        category: "GPS参数",
        items: [
          { label: "芯片型号", value: "Ublox M10" },
          { label: "频率", value: "L1" },
          { label: "定位精度", value: "2.5m CEP" },
          { label: "冷启动时间", value: "<26s" },
          { label: "热启动时间", value: "<1s" },
        ]
      },
      {
        category: "电气参数",
        items: [
          { label: "供电电压", value: "3.3V / 5V" },
          { label: "工作电流", value: "约25mA" },
          { label: "接口", value: "UART" },
        ]
      },
      {
        category: "物理参数",
        items: [
          { label: "孔距", value: "120mm (双孔)" },
          { label: "尺寸", value: "25 x 25mm" },
          { label: "重量", value: "约5g" },
        ]
      }
    ],
    features: [
      {
        title: "M10高性能芯片",
        description: "采用Ublox M10芯片，定位性能优异"
      },
      {
        title: "快速搜星",
        description: "冷启动26秒内定位，热启动1秒内"
      },
      {
        title: "高定位精度",
        description: "2.5米CEP精度，满足飞行需求"
      },
      {
        title: "120mm标准孔距",
        description: "标准双孔设计，适配多种机架"
      },
      {
        title: "低功耗",
        description: "仅约25mA工作电流，节省电量"
      },
      {
        title: "即插即用",
        description: "UART接口，连接飞控即可使用"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2025-06-27/12-02-37-685e17dd58835.images.400x400.png"
    ]
  },
  {
    id: "gps-m10q-180-v2",
    name: "M10Q 180 V2 GPS模块",
    category: "gps",
    slogan: "中型机首选",
    subSlogan: "M10芯片 180mm孔距",
    description: "M10Q 180 V2 GPS模块采用M10芯片，180mm孔距设计适合中型穿越机和航拍机，定位精准稳定。",
    price: "¥139",
    image: "https://inew.foxeer.com//upload/s/goods/2025-06-27/11-57-46-685e16ba26fe5.images.400x400.png",
    keyFeatures: [
      "M10芯片",
      "180mm孔距",
      "快速搜星",
      "高精度"
    ],
    specs: [
      {
        category: "GPS参数",
        items: [
          { label: "芯片型号", value: "Ublox M10" },
          { label: "频率", value: "L1" },
          { label: "定位精度", value: "2.5m CEP" },
          { label: "冷启动时间", value: "<26s" },
          { label: "热启动时间", value: "<1s" },
        ]
      },
      {
        category: "电气参数",
        items: [
          { label: "供电电压", value: "3.3V / 5V" },
          { label: "工作电流", value: "约25mA" },
          { label: "接口", value: "UART" },
        ]
      },
      {
        category: "物理参数",
        items: [
          { label: "孔距", value: "180mm (双孔)" },
          { label: "尺寸", value: "25 x 25mm" },
          { label: "重量", value: "约5g" },
        ]
      }
    ],
    features: [
      {
        title: "M10高性能芯片",
        description: "Ublox M10芯片，业界领先性能"
      },
      {
        title: "180mm孔距",
        description: "适合5寸及以上中型机架安装"
      },
      {
        title: "快速定位",
        description: "冷启动26秒，热启动1秒"
      },
      {
        title: "高精度",
        description: "2.5米CEP定位精度"
      },
      {
        title: "轻量化",
        description: "仅约5g重量，不增加飞机负担"
      },
      {
        title: "简单安装",
        description: "双孔固定设计，安装牢固"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2025-06-27/11-57-46-685e16ba26fe5.images.400x400.png"
    ]
  },
  {
    id: "gps-m10q-250-v2",
    name: "M10Q 250 V2 GPS模块",
    category: "gps",
    slogan: "大机型首选",
    subSlogan: "M10芯片 250mm孔距",
    description: "M10Q 250 V2 GPS模块采用M10芯片，250mm孔距设计专为大型穿越机和航拍机设计，定位快速精准。",
    price: "¥139",
    image: "https://inew.foxeer.com//upload/s/goods/2025-06-27/11-54-48-685e1608bf6fa.images.400x400.png",
    keyFeatures: [
      "M10芯片",
      "250mm孔距",
      "快速搜星",
      "高精度"
    ],
    specs: [
      {
        category: "GPS参数",
        items: [
          { label: "芯片型号", value: "Ublox M10" },
          { label: "频率", value: "L1" },
          { label: "定位精度", value: "2.5m CEP" },
          { label: "冷启动时间", value: "<26s" },
          { label: "热启动时间", value: "<1s" },
        ]
      },
      {
        category: "电气参数",
        items: [
          { label: "供电电压", value: "3.3V / 5V" },
          { label: "工作电流", value: "约25mA" },
          { label: "接口", value: "UART" },
        ]
      },
      {
        category: "物理参数",
        items: [
          { label: "孔距", value: "250mm (双孔)" },
          { label: "尺寸", value: "25 x 25mm" },
          { label: "重量", value: "约5g" },
        ]
      }
    ],
    features: [
      {
        title: "M10高性能芯片",
        description: "最新M10芯片，搜星快，精度高"
      },
      {
        title: "250mm孔距",
        description: "专为7寸及以上大型机架设计"
      },
      {
        title: "快速定位",
        description: "冷启动26秒，热启动仅需1秒"
      },
      {
        title: "稳定可靠",
        description: "经过严格测试，长时间飞行稳定"
      },
      {
        title: "轻量设计",
        description: "约5g超轻重量"
      },
      {
        title: "即插即用",
        description: "标准UART接口，兼容各类飞控"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2025-06-27/11-54-48-685e1608bf6fa.images.400x400.png"
    ]
  },
  {
    id: "gps-m10q-120-compass",
    name: "M10Q 120 GPS 带罗盘",
    category: "gps",
    slogan: "GPS+罗盘二合一",
    subSlogan: "M10芯片 5883罗盘 120mm孔距",
    description: "M10Q 120 GPS模块集成5883电子罗盘，一体化设计减少干扰，120mm孔距适配小型机架，是定点悬停的理想选择。",
    price: "¥139",
    image: "https://inew.foxeer.com//upload/s/goods/2023-04-25/17-51-35-6447a2a7e3202.images.400x400.JPG",
    keyFeatures: [
      "M10芯片",
      "内置罗盘",
      "120mm孔距",
      "二合一"
    ],
    specs: [
      {
        category: "GPS参数",
        items: [
          { label: "芯片型号", value: "Ublox M10" },
          { label: "定位精度", value: "2.5m CEP" },
          { label: "冷启动时间", value: "<26s" },
          { label: "热启动时间", value: "<1s" },
        ]
      },
      {
        category: "罗盘参数",
        items: [
          { label: "罗盘芯片", value: "QMC5883" },
          { label: "精度", value: "1-2°" },
          { label: "采样率", value: "200Hz" },
        ]
      },
      {
        category: "电气参数",
        items: [
          { label: "供电电压", value: "3.3V / 5V" },
          { label: "工作电流", value: "约35mA" },
          { label: "接口", value: "UART + I2C" },
        ]
      },
      {
        category: "物理参数",
        items: [
          { label: "孔距", value: "120mm (双孔)" },
          { label: "尺寸", value: "30 x 30mm" },
          { label: "重量", value: "约8g" },
        ]
      }
    ],
    features: [
      {
        title: "GPS+罗盘二合一",
        description: "集成电子罗盘，减少接线，安装更简便"
      },
      {
        title: "5883高精度罗盘",
        description: "QMC5883罗盘，1-2°精度，航向稳定"
      },
      {
        title: "M10 GPS芯片",
        description: "Ublox M10芯片，定位快速精准"
      },
      {
        title: "一体化设计",
        description: "GPS与罗盘一体化，减少电磁干扰"
      },
      {
        title: "120mm孔距",
        description: "适配3-5寸小型机架"
      },
      {
        title: "双接口",
        description: "UART和I2C双接口，连接更灵活"
      }
    ],
    gallery: [
      "https://inew.foxeer.com//upload/s/goods/2023-04-25/17-51-35-6447a2a7e3202.images.400x400.JPG"
    ]
  },
  {
    id: "gps-m10q-180-compass",
    name: "M10Q 180 GPS 带罗盘",
    category: "gps",
    slogan: "GPS+罗盘二合一",
    subSlogan: "M10芯片 5883罗盘 180mm孔距",
    description: "M10Q 180 GPS模块集成5883电子罗盘，一体化二合一设计，180mm孔距适配中型机架，定点悬停更精准。",
    price: "¥139",
    image: "https://inew.foxeer.com//upload/s/goods/2023-03-29/10-56-25-6423a8d94eeba.images.400x400.jpg",
    keyFeatures: [
      "M10芯片",
      "内置罗盘",
      "180mm孔距",
      "二合一"
    ],
    specs: [
      {
        category: "GPS参数",
        items: [
          { label: "芯片型号", value: "Ublox M10" },
          { label: "定位精度", value: "2.5m CEP" },
          { label: "冷启动时间", value: "<26s" },
          { label: "热启动时间", value: "<1s" },
        ]
      },
      {
        category: "罗盘参数",
        items: [
          { label: "罗盘芯片", value: "QMC5883" },
          { label: "精度", value: "1-2°" },
          { label: "采样率", value: "200Hz" },
        ]
      },
      {
        category: "电气参数",
        items: [
          { label: "供电电压", value: "3.3V / 5V" },
          { label: "工作电流", value: "约35mA" },
          { label: "接口", value: "UART + I2C" },
        ]
      },
      {
        category: "物理参数",
        items: [
          { label: "孔距", value: "180mm (双孔)" },
          { label: "尺寸", value: "30 x 30mm" },
          { label: "重量", value: "约8g" },
        ]
      }
    ],
    features: [
      {
        title: "二合一设计",
        description: "GPS与罗盘集成，简化接线和安装"
      },
      {
        title: "5883电子罗盘",
        description: "高精度罗盘，航向测量准确"
      },
      {
        title: "M10定位芯片",
        description: "快速搜星，精准定位"
      },
      {
        title: "180mm孔距",
        description: "适配5-6寸中型机架安装"
      },
      {
        title: "抗干扰设计",
        description: "一体化设计减少电磁干扰"
      },
      {
        title: "轻量化",
        description: "约8g重量，对飞行影响小"
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
    name: "监视器/FPV眼镜",
    description: "FPV监视器、眼镜，内置接收器和DVR功能",
  },
  {
    id: "gps", 
    name: "GPS模块",
    description: "高精度GPS定位模块，支持罗盘功能",
  }
];
