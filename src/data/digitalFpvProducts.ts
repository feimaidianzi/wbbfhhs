import wifilink2Image from "@/assets/fpv/wifilink2.jpg";
import wifilinkRxImage from "@/assets/fpv/wifilink-rx.jpg";

export interface DigitalFpvProduct {
  id: string;
  name: string;
  category: "transmitter" | "receiver";
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

export const digitalFpvProducts: DigitalFpvProduct[] = [
  {
    id: "wifilink2",
    name: "WiFiLink2 数字高清图传",
    category: "transmitter",
    slogan: "高清数字图传",
    subSlogan: "WiFi数字传输 低延迟高画质",
    description: "WiFiLink2 是一款高性能数字高清图传发射器，采用WiFi技术实现低延迟高清视频传输，支持1080P 60fps高清画质输出，适用于FPV穿越机、航拍等应用场景。",
    price: "¥499",
    image: wifilink2Image,
    keyFeatures: [
      "1080P 60fps",
      "低延迟传输",
      "WiFi技术",
      "轻量化设计"
    ],
    specs: [
      {
        category: "基本参数",
        items: [
          { label: "型号", value: "WiFiLink2" },
          { label: "频率范围", value: "5180~5885 MHz" },
          { label: "视频输出", value: "1080P 60fps / 720P 60fps" },
          { label: "传输技术", value: "WiFi数字传输" },
        ]
      },
      {
        category: "电气参数",
        items: [
          { label: "供电电压", value: "9~30V (3~6S)" },
          { label: "发射功率", value: "< 25dBm (FCC)" },
        ]
      },
      {
        category: "物理参数",
        items: [
          { label: "重量", value: "约50g" },
          { label: "接口", value: "MIPI数字视频接口" },
        ]
      }
    ],
    features: [
      {
        title: "高清数字传输",
        description: "支持1080P 60fps高清视频传输，画面清晰流畅，还原真实飞行视角"
      },
      {
        title: "低延迟设计",
        description: "采用先进的WiFi传输技术，实现超低延迟传输，飞行响应更及时"
      },
      {
        title: "宽电压输入",
        description: "支持3~6S电池供电（9~30V），兼容多种飞行平台"
      },
      {
        title: "轻量化机身",
        description: "紧凑轻量化设计，适合各类FPV穿越机安装使用"
      },
      {
        title: "即插即用",
        description: "MIPI数字视频接口，安装简便，快速上手"
      },
      {
        title: "稳定可靠",
        description: "优质元器件与成熟方案，确保长时间稳定工作"
      }
    ],
    gallery: [
      wifilink2Image,
    ]
  },
  {
    id: "wifilink-rx",
    name: "WiFiLink-RX 数字高清接收器",
    category: "receiver",
    slogan: "数字高清接收",
    subSlogan: "1080P输出 多系统兼容",
    description: "WiFiLink-RX 是一款专业数字高清接收器，支持1080P 60fps高清HDMI输出，内置32G存储空间，可录制飞行画面。兼容OpenIPC和Ruby FPV系统，满足不同用户需求。",
    price: "¥699",
    image: wifilinkRxImage,
    keyFeatures: [
      "1080P HDMI输出",
      "内置32G存储",
      "双系统兼容",
      "256G SD扩展"
    ],
    specs: [
      {
        category: "基本参数",
        items: [
          { label: "型号", value: "WiFiLink-RX" },
          { label: "频率范围", value: "5180~5885 MHz" },
          { label: "HDMI输出", value: "1080P 60fps / 720P 60fps" },
          { label: "系统支持", value: "OpenIPC (默认) / Ruby FPV" },
        ]
      },
      {
        category: "电气参数",
        items: [
          { label: "供电电压", value: "9~30V (3~6S)" },
          { label: "接收功率", value: "< 25dBm (FCC) / < 14dBm (CE)" },
        ]
      },
      {
        category: "存储参数",
        items: [
          { label: "内置存储", value: "32G (含系统文件)" },
          { label: "SD卡扩展", value: "最大支持256GB" },
        ]
      },
      {
        category: "接口参数",
        items: [
          { label: "视频输出", value: "Mini-HDMI" },
          { label: "数据接口", value: "Type-C, OTG" },
          { label: "电源接口", value: "DC 5.5x2.1mm" },
          { label: "存储接口", value: "Micro-SD" },
        ]
      },
      {
        category: "物理参数",
        items: [
          { label: "尺寸", value: "110.0mm x 27.3mm x 46.0mm" },
          { label: "重量", value: "122.0g (±1g, 不含天线)" },
        ]
      },
      {
        category: "天线参数 - 棒状天线",
        items: [
          { label: "极化方式", value: "垂直极化 (VP)" },
          { label: "频率范围", value: "5150~5850 MHz" },
          { label: "平均增益", value: "2.5dBi" },
          { label: "驻波比", value: "≤2.0" },
          { label: "尺寸", value: "Φ4.8mm x 108.4mm" },
          { label: "重量", value: "6.6g" },
        ]
      },
      {
        category: "天线参数 - 宝塔天线",
        items: [
          { label: "极化方式", value: "左旋圆极化 (LHCP)" },
          { label: "频率范围", value: "5500~5900 MHz" },
          { label: "平均增益", value: "2.5dBi" },
          { label: "驻波比", value: "≤2.0" },
          { label: "尺寸", value: "Φ8.0mm x 23.9mm" },
          { label: "重量", value: "4.4g" },
        ]
      }
    ],
    features: [
      {
        title: "1080P高清输出",
        description: "Mini-HDMI接口输出，支持1080P 60fps高清画面，接驳显示器或眼镜即可观看"
      },
      {
        title: "内置录像功能",
        description: "内置32G存储空间，可直接录制飞行画面，支持最大256G SD卡扩展"
      },
      {
        title: "双系统兼容",
        description: "支持OpenIPC和Ruby FPV两种系统，可根据需求自由切换"
      },
      {
        title: "多种接口",
        description: "配备Mini-HDMI、Type-C、OTG、Micro-SD等丰富接口，扩展性强"
      },
      {
        title: "宽电压供电",
        description: "支持9~30V宽电压输入，兼容3~6S电池或DC适配器供电"
      },
      {
        title: "双天线配置",
        description: "标配棒状天线与宝塔天线，满足不同场景接收需求"
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
    name: "数字图传发射器",
    description: "高清数字图传发射模块，安装于飞机端",
  },
  {
    id: "receiver", 
    name: "数字图传接收器",
    description: "高清数字图传接收模块，配合眼镜或显示器使用",
  }
];
