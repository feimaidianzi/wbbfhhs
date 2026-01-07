export interface GimbalProduct {
  id: string;
  name: string;
  model: string;
  category: string;
  price: string;
  image: string;
  images?: string[];
  highlights: string[];
  description: string[];
  features?: string[];
  specs: {
    label: string;
    value: string;
  }[];
  applications?: string[];
  packageIncludes?: string[];
  notes?: string[];
  downloads?: {
    name: string;
    url: string;
    type: string;
  }[];
}

export const gimbalProducts: GimbalProduct[] = [
  // 单光吊舱
  {
    id: "k8-v2",
    name: "K8-V2 单光追踪识别吊舱",
    model: "K8-V2",
    category: "单光吊舱",
    price: "询价",
    image: "https://www.hequavtech.com/images/product/k8-v2.jpg",
    images: [
      "https://www.hequavtech.com/images/product/k8-v2.jpg",
      "https://www.hequavtech.com/images/product/k8-v2-2.jpg"
    ],
    highlights: [
      "4K高清视频输出",
      "30倍光学变焦",
      "智能目标追踪",
      "三轴稳定云台"
    ],
    description: [
      "采用4K超高清传感器，提供极致清晰画面",
      "30倍光学变焦，远距离精准观察",
      "内置AI目标追踪算法，自动锁定跟踪目标",
      "三轴机械增稳，确保画面平稳流畅",
      "轻量化设计，适配多种无人机平台",
      "IP65防护等级，适应恶劣作业环境"
    ],
    features: [
      "Sony 1/2.8英寸 CMOS传感器",
      "30x光学变焦 + 8x数码变焦",
      "4K@30fps / 1080P@60fps视频输出",
      "三轴360°无限位旋转",
      "HDMI/IP双路视频输出",
      "支持ONVIF协议",
      "内置GPS/GLONASS定位",
      "目标智能识别与追踪"
    ],
    specs: [
      { label: "传感器", value: "Sony 1/2.8\" CMOS" },
      { label: "有效像素", value: "800万像素" },
      { label: "光学变焦", value: "30倍" },
      { label: "数码变焦", value: "8倍" },
      { label: "视频分辨率", value: "4K@30fps / 1080P@60fps" },
      { label: "视场角", value: "63.7°(广角) ~ 2.3°(长焦)" },
      { label: "云台轴数", value: "三轴" },
      { label: "俯仰范围", value: "-90° ~ +30°" },
      { label: "航向范围", value: "360°无限位" },
      { label: "稳定精度", value: "±0.01°" },
      { label: "视频输出", value: "HDMI / 网络视频流" },
      { label: "控制接口", value: "串口TTL / 网口" },
      { label: "工作电压", value: "DC 12-26V" },
      { label: "功耗", value: "≤15W" },
      { label: "重量", value: "450g" },
      { label: "防护等级", value: "IP65" },
      { label: "工作温度", value: "-20°C ~ +55°C" }
    ],
    applications: [
      "电力巡检 - 输电线路和变电站检查",
      "公安执法 - 高空监控与目标追踪",
      "消防救援 - 火场侦查与人员搜救",
      "应急救援 - 灾情评估与指挥调度",
      "边防巡逻 - 边境线监控与入侵检测",
      "城市管理 - 违建巡查与环境监测"
    ],
    packageIncludes: [
      "K8-V2云台相机 x1",
      "快拆支架 x1",
      "控制线缆 x1",
      "视频线缆 x1",
      "说明书 x1"
    ],
    notes: [
      "请确保供电电压在规定范围内",
      "首次使用前请完成云台校准",
      "避免直射强光源"
    ]
  },
  {
    id: "k10-pro",
    name: "K10 Pro 单光高清吊舱",
    model: "K10 Pro",
    category: "单光吊舱",
    price: "询价",
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
    highlights: [
      "4K 60fps视频",
      "40倍光学变焦",
      "激光测距",
      "AI目标检测"
    ],
    description: [
      "专业级4K 60fps视频采集能力",
      "40倍光学变焦，超远距离观察",
      "集成激光测距模块，精准定位",
      "AI边缘计算，实时目标检测"
    ],
    specs: [
      { label: "传感器", value: "Sony 1/1.8\" CMOS" },
      { label: "有效像素", value: "1200万像素" },
      { label: "光学变焦", value: "40倍" },
      { label: "视频分辨率", value: "4K@60fps" },
      { label: "激光测距", value: "5m~1500m" },
      { label: "云台轴数", value: "三轴" },
      { label: "重量", value: "680g" },
      { label: "防护等级", value: "IP67" }
    ],
    applications: [
      "安防监控",
      "应急救援",
      "森林防火",
      "海事巡查"
    ]
  },
  // 双光吊舱
  {
    id: "zt30",
    name: "ZT30 双光热成像吊舱",
    model: "ZT30",
    category: "双光吊舱",
    price: "询价",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
    highlights: [
      "可见光+热成像双光融合",
      "640×512红外分辨率",
      "测温范围-20°C~650°C",
      "目标自动跟踪"
    ],
    description: [
      "可见光与热成像双光融合，全天候作业",
      "高分辨率红外探测器，成像清晰细腻",
      "精准测温功能，支持多种测温模式",
      "智能目标识别与自动跟踪"
    ],
    specs: [
      { label: "可见光传感器", value: "1/2.8\" CMOS 4K" },
      { label: "可见光变焦", value: "30倍光学" },
      { label: "红外分辨率", value: "640×512" },
      { label: "红外帧率", value: "30Hz" },
      { label: "NETD", value: "≤50mK" },
      { label: "测温范围", value: "-20°C~650°C" },
      { label: "测温精度", value: "±2°C或±2%" },
      { label: "云台轴数", value: "三轴" },
      { label: "重量", value: "820g" },
      { label: "防护等级", value: "IP65" }
    ],
    applications: [
      "电力巡检 - 设备热故障检测",
      "消防救援 - 火点定位与热源追踪",
      "工业检测 - 管道泄漏检测",
      "光伏巡检 - 热斑检测分析"
    ]
  },
  {
    id: "zt50",
    name: "ZT50 双光热成像吊舱",
    model: "ZT50",
    category: "双光吊舱",
    price: "询价",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    highlights: [
      "1280×1024红外分辨率",
      "50倍可见光变焦",
      "激光补光",
      "高精度测温"
    ],
    description: [
      "超高分辨率红外探测器",
      "50倍可见光光学变焦",
      "集成激光补光，夜间作业无忧",
      "专业级测温精度"
    ],
    specs: [
      { label: "可见光传感器", value: "1/1.8\" CMOS 4K" },
      { label: "可见光变焦", value: "50倍光学" },
      { label: "红外分辨率", value: "1280×1024" },
      { label: "红外帧率", value: "30Hz" },
      { label: "NETD", value: "≤40mK" },
      { label: "测温范围", value: "-40°C~1000°C" },
      { label: "激光补光", value: "850nm/940nm" },
      { label: "重量", value: "1050g" },
      { label: "防护等级", value: "IP67" }
    ],
    applications: [
      "工业检测",
      "安防监控",
      "搜救任务",
      "边防巡逻"
    ]
  },
  // 多光吊舱
  {
    id: "m3t",
    name: "M3T 三光吊舱",
    model: "M3T",
    category: "多光吊舱",
    price: "询价",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    highlights: [
      "可见光+热成像+激光测距",
      "三传感器同轴设计",
      "1500米激光测距",
      "多光谱融合显示"
    ],
    description: [
      "可见光、热成像、激光测距三合一",
      "同轴设计确保多光谱精准对齐",
      "远距离激光测距与目标定位",
      "支持画中画与多光谱融合显示"
    ],
    specs: [
      { label: "可见光", value: "4K 30x变焦" },
      { label: "热成像", value: "640×512 @30Hz" },
      { label: "激光测距", value: "10m~1500m" },
      { label: "测距精度", value: "±1m" },
      { label: "云台轴数", value: "三轴" },
      { label: "稳定精度", value: "±0.01°" },
      { label: "重量", value: "950g" },
      { label: "防护等级", value: "IP66" }
    ],
    applications: [
      "军警执法",
      "边境巡逻",
      "森林防火",
      "海上救援"
    ]
  },
  {
    id: "m4e",
    name: "M4E 四光吊舱",
    model: "M4E",
    category: "多光吊舱",
    price: "询价",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    highlights: [
      "广角+长焦+热成像+激光",
      "四传感器协同工作",
      "2000米激光测距",
      "AI增强处理"
    ],
    description: [
      "四传感器融合，应对复杂场景",
      "广角相机提供态势感知",
      "长焦相机精细观察",
      "热成像全天候成像",
      "激光测距精准定位"
    ],
    specs: [
      { label: "广角相机", value: "4K 120° FOV" },
      { label: "长焦相机", value: "4K 40x变焦" },
      { label: "热成像", value: "640×512 @50Hz" },
      { label: "激光测距", value: "10m~2000m" },
      { label: "云台轴数", value: "三轴" },
      { label: "重量", value: "1280g" },
      { label: "防护等级", value: "IP67" }
    ],
    applications: [
      "公安执法",
      "反恐维稳",
      "边海防",
      "重大活动安保"
    ]
  },
  // 专用吊舱
  {
    id: "sl100",
    name: "SL100 激光喊话吊舱",
    model: "SL100",
    category: "专用吊舱",
    price: "询价",
    image: "https://images.unsplash.com/photo-1619641805634-98e5c7f0d3?w=600&q=80",
    highlights: [
      "120dB大功率扬声器",
      "500米喊话距离",
      "集成云台相机",
      "语音录播功能"
    ],
    description: [
      "120dB大功率扬声器，覆盖范围广",
      "500米有效喊话距离",
      "支持实时喊话与录音播放",
      "集成4K云台相机，边喊话边取证"
    ],
    specs: [
      { label: "喊话功率", value: "120dB" },
      { label: "喊话距离", value: "500m" },
      { label: "扬声器", value: "钕铁硼高音单元" },
      { label: "播放模式", value: "实时/录播" },
      { label: "相机分辨率", value: "4K@30fps" },
      { label: "光学变焦", value: "10倍" },
      { label: "重量", value: "520g" },
      { label: "续航时间", value: "持续喊话4小时" }
    ],
    applications: [
      "交通疏导",
      "人群管控",
      "应急广播",
      "执法警示"
    ]
  },
  {
    id: "fl200",
    name: "FL200 探照灯吊舱",
    model: "FL200",
    category: "专用吊舱",
    price: "询价",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80",
    highlights: [
      "20000流明高亮度",
      "800米照射距离",
      "亮度可调节",
      "与相机联动"
    ],
    description: [
      "20000流明超高亮度LED光源",
      "800米有效照射距离",
      "支持亮度无级调节",
      "可与云台相机联动指向"
    ],
    specs: [
      { label: "光源类型", value: "高功率LED" },
      { label: "光通量", value: "20000lm" },
      { label: "照射距离", value: "800m" },
      { label: "色温", value: "5700K" },
      { label: "调光范围", value: "10%~100%" },
      { label: "散热方式", value: "主动风冷" },
      { label: "功耗", value: "200W" },
      { label: "重量", value: "680g" }
    ],
    applications: [
      "夜间搜救",
      "应急照明",
      "夜间巡逻",
      "事故现场照明"
    ]
  }
];

export const gimbalCategories = [
  { id: "single", name: "单光吊舱", description: "高清可见光云台相机" },
  { id: "dual", name: "双光吊舱", description: "可见光+热成像融合" },
  { id: "multi", name: "多光吊舱", description: "多传感器集成" },
  { id: "special", name: "专用吊舱", description: "特殊功能吊舱" }
];

export function getGimbalProductById(id: string): GimbalProduct | undefined {
  return gimbalProducts.find(product => product.id === id);
}

export function getGimbalProductsByCategory(category: string): GimbalProduct[] {
  const categoryMap: Record<string, string> = {
    'single': '单光吊舱',
    'dual': '双光吊舱',
    'multi': '多光吊舱',
    'special': '专用吊舱'
  };
  const categoryName = categoryMap[category] || category;
  return gimbalProducts.filter(product => product.category === categoryName);
}
