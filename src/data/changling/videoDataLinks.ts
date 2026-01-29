/**
 * 长凌科技 - 图数传模块产品数据
 * 替换数字图传分类中的产品
 */

import { DigitalFpvProduct } from "../digitalFpvProducts";

// 将图数传模块转换为数字图传格式
export const videoDataLinkProducts: DigitalFpvProduct[] = [
  {
    id: "lq3",
    name: "LQ-3 图数传模块",
    category: "transmitter",
    slogan: "图数一体化传输",
    subSlogan: "40Mbps高速率 10km远距离",
    description: "LQ-3是一款高性能图数一体化传输模块，支持40Mbps传输速率，1080P高清图传，低延时设计，适用于无人机远程控制和视频回传。具备易用性、兼容性、通用性、扩展性等特点。",
    price: "询价",
    image: "https://qiniu.md.amovlab.com/img/p/202405/20240514/1823096781516166478266368.jpg",
    keyFeatures: [
      "40Mbps传输速率",
      "1080P高清",
      "10km传输距离",
      "<100ms低延时"
    ],
    specs: [
      {
        category: "传输参数",
        items: [
          { label: "传输速率", value: "40Mbps" },
          { label: "视频分辨率", value: "1080P" },
          { label: "传输距离", value: "10km" },
          { label: "延时", value: "<100ms" }
        ]
      },
      {
        category: "电气参数",
        items: [
          { label: "工作电压", value: "DC 10V-26V" },
          { label: "频段", value: "2.4GHz" }
        ]
      },
      {
        category: "接口参数",
        items: [
          { label: "视频接口", value: "USB3.2/HDMI" },
          { label: "数据接口", value: "UART" }
        ]
      }
    ],
    features: [
      {
        title: "图数一体化",
        description: "集成视频传输和数据链路，一套设备完成双向通信"
      },
      {
        title: "超低延时",
        description: "<100ms端到端延时，实时感知飞行状态"
      },
      {
        title: "长距离传输",
        description: "10km有效传输距离，满足远距离作业需求"
      },
      {
        title: "高清画质",
        description: "支持1080P高清视频传输，画面清晰流畅"
      },
      {
        title: "宽压输入",
        description: "DC 10V-26V宽电压输入，兼容多种飞行平台"
      },
      {
        title: "丰富接口",
        description: "USB3.2/HDMI/UART等多种接口，扩展性强"
      }
    ],
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202405/20240514/1823096781516166478266368.jpg",
      "https://qiniu.md.amovlab.com/img/p/202405/20240514/1839322656767118598569984.jpg",
      "https://qiniu.md.amovlab.com/img/p/202405/20240514/1839202707743318002991104.jpg"
    ]
  },
  {
    id: "mini-homer",
    name: "Mini Homer 图数传模块",
    category: "transmitter",
    slogan: "小型化图数传",
    subSlogan: "轻量便携 即插即用",
    description: "Mini Homer是一款小型化图数传模块，体积紧凑，重量轻，仅50g。适用于小型无人机和便携式应用场景，支持20Mbps传输和720P高清画质。",
    price: "询价",
    image: "https://qiniu.md.amovlab.com/img/p/202208/20220808/1034322938472306470453248.jpg",
    keyFeatures: [
      "20Mbps传输",
      "720P高清",
      "5km传输距离",
      "仅50g重量"
    ],
    specs: [
      {
        category: "传输参数",
        items: [
          { label: "传输速率", value: "20Mbps" },
          { label: "视频分辨率", value: "720P" },
          { label: "传输距离", value: "5km" }
        ]
      },
      {
        category: "物理参数",
        items: [
          { label: "重量", value: "50g" },
          { label: "尺寸", value: "紧凑设计" }
        ]
      }
    ],
    features: [
      {
        title: "极致轻量",
        description: "仅50g重量，不增加飞行负担"
      },
      {
        title: "紧凑设计",
        description: "小巧体积，适合小型无人机安装"
      },
      {
        title: "即插即用",
        description: "简化接线设计，快速安装部署"
      },
      {
        title: "稳定传输",
        description: "5km有效传输距离，满足常规作业需求"
      },
      {
        title: "低功耗",
        description: "优化功耗设计，延长飞行时间"
      },
      {
        title: "便携应用",
        description: "适合便携式场景和快速部署需求"
      }
    ],
    gallery: [
      "https://qiniu.md.amovlab.com/img/p/202208/20220808/1034322938472306470453248.jpg",
      "https://qiniu.md.amovlab.com/img/p/202208/20220808/102603802766615052451840.jpg",
      "https://qiniu.md.amovlab.com/img/p/202208/20220808/102553762126581370880000.jpg"
    ]
  }
];
