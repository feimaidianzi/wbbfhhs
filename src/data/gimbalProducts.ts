import k40tImage from "@/assets/gimbal/k40t-gimbal.png";
import k8tV2Image from "@/assets/gimbal/k8t-v2-gimbal.png";
import k8V2Image from "@/assets/gimbal/k8-v2-gimbal.png";

export interface GimbalProduct {
  id: string;
  name: string;
  model: string;
  category: string;
  price: string;
  image: string;
  images?: string[];
  bannerImage?: string;
  slogan?: string;
  subSlogan?: string;
  keyFeatures?: { label: string; value: string }[];
  highlights: string[];
  description: string[];
  features?: string[];
  specs: {
    category?: string;
    label: string;
    value: string;
  }[];
  applications?: string[];
  packageIncludes?: string[];
  notes?: string[];
  downloads?: {
    name: string;
    type: string;
    category?: string;
  }[];
}

export const gimbalProducts: GimbalProduct[] = [
  // 四光云台相机
  {
    id: "k40t",
    name: "K40T四光云台相机",
    model: "K40T",
    category: "四光云台相机",
    price: "询价",
    image: k40tImage,
    slogan: "昼夜无界，洞见毫厘",
    subSlogan: "K40T四光云台相机",
    keyFeatures: [
      { label: "四光合一", value: "广角、长焦、红外、激光" },
      { label: "超清成像", value: "4800W像素，160X混合变焦" },
      { label: "远距测距", value: "1200m激光测距" },
      { label: "AI智能识别", value: "多种目标检测，支持个性化模型导入" },
      { label: "云台重量", value: "290g" }
    ],
    highlights: [
      "可见光+热成像+广角+激光测距",
      "四传感器协同工作",
      "1200米激光测距",
      "AI智能识别"
    ],
    description: [
      "K40T四光AI云台相机集成可见光变焦、广角、红外热成像和激光测距四种传感器",
      "四传感器融合，应对复杂场景需求",
      "支持AI智能识别与目标追踪功能",
      "高精度三轴机械稳定云台",
      "适用于电力巡检、消防救援、公安执法等多种应用场景"
    ],
    features: [
      "四光融合成像技术",
      "机械三轴增稳",
      "AI智能目标识别",
      "激光精准测距",
      "全天候作业能力"
    ],
    specs: [
      // 云台参数
      { category: "云台参数", label: "轴数", value: "机械三轴" },
      { category: "云台参数", label: "可控角度范围", value: "俯仰-135°至+45°, 横滚-45°至+45°, 偏航-135°至+135°" },
      { category: "云台参数", label: "最大控制转速", value: "180°/S" },
      { category: "云台参数", label: "角度抖动量", value: "±0.005°" },
      { category: "云台参数", label: "尺寸", value: "114×84×95mm" },
      { category: "云台参数", label: "接口", value: "网口/串口/sbus" },
      { category: "云台参数", label: "重量", value: "290g" },
      // 红外相机参数
      { category: "红外相机参数", label: "探测器类型", value: "氧化钒非制冷红外焦平面探测器" },
      { category: "红外相机参数", label: "分辨率", value: "640×512" },
      { category: "红外相机参数", label: "像元间距", value: "12μm" },
      { category: "红外相机参数", label: "帧频", value: "50HZ 25HZ" },
      { category: "红外相机参数", label: "响应波段", value: "8~14μm" },
      // 广角相机
      { category: "广角相机", label: "传感器大小", value: "1/2英寸" },
      { category: "广角相机", label: "有效像素", value: "4800万像素" },
      { category: "广角相机", label: "FOV", value: "ME FOV:85.4° DFOV:84°±2°" },
      { category: "广角相机", label: "广角焦距", value: "4.49mm" },
      { category: "广角相机", label: "广角光圈", value: "F2.8" },
      // 变焦相机
      { category: "变焦相机", label: "传感器大小", value: "1/2英寸" },
      { category: "变焦相机", label: "有效像素", value: "4800万像素" },
      { category: "变焦相机", label: "可变光圈", value: "F3.7~F4.6" },
      { category: "变焦相机", label: "有效焦距", value: "15.2~50mm" },
      { category: "变焦相机", label: "混合变焦", value: "160X" },
      // 激光测距仪
      { category: "激光测距仪", label: "测量范围", value: "5-1200m" },
      { category: "激光测距仪", label: "测量精度", value: "±1m" }
    ],
    applications: [
      "电力巡检 - 输电线路和变电站设备检查",
      "消防救援 - 火场侦查与热源追踪",
      "公安执法 - 高空监控与目标追踪",
      "应急救援 - 灾情评估与指挥调度",
      "边防巡逻 - 边境线监控与入侵检测"
    ],
    downloads: [
      { name: "K40T云台相机-云台固件", type: "zip", category: "软件" },
      { name: "K40T云台相机-相机固件", type: "bin", category: "软件" },
      { name: "K40T云台上位机", type: "zip", category: "软件" },
      { name: "K40T四光Ai云台相机用户手册", type: "pdf", category: "文档" },
      { name: "K40T四光AI云台相机", type: "pdf", category: "文档" },
      { name: "K40T云台对外协议", type: "pdf", category: "文档" },
      { name: "K40T云台相机-3D面组图", type: "stp", category: "图纸" }
    ]
  },
  // 双光跟踪识别云台相机
  {
    id: "k8t-v2",
    name: "K8T-V2双光跟踪识别云台相机",
    model: "K8T-V2",
    category: "双光跟踪识别云台相机",
    price: "询价",
    image: k8tV2Image,
    slogan: "智眼双瞳 昼夜皆掌控",
    subSlogan: "K8T-V2双光云台相机",
    keyFeatures: [
      { label: "算力", value: "4T" },
      { label: "云台重量", value: "162g" },
      { label: "数字变焦", value: "40X" }
    ],
    highlights: [
      "可见光+热成像双光融合",
      "AI智能跟踪识别",
      "4T算力",
      "目标自动追踪"
    ],
    description: [
      "K8T-V2双光云台相机集成可见光与热成像双传感器",
      "内置4T算力AI智能跟踪识别算法，自动锁定追踪目标",
      "可见光与热成像双光融合，全天候作业",
      "40倍数字变焦，远距离精准观察",
      "三轴机械稳定云台，确保画面平稳流畅"
    ],
    features: [
      "双光融合成像",
      "AI目标追踪识别",
      "三轴机械增稳",
      "全天候作业能力",
      "高精度测温功能"
    ],
    specs: [
      { category: "云台参数", label: "轴数", value: "机械三轴" },
      { category: "云台参数", label: "可控角度范围", value: "俯仰-90°至+30°, 航向±180°" },
      { category: "云台参数", label: "稳定精度", value: "±0.01°" },
      { category: "云台参数", label: "重量", value: "162g" },
      { category: "可见光相机", label: "传感器大小", value: "1/2.8英寸" },
      { category: "可见光相机", label: "有效像素", value: "800万像素" },
      { category: "可见光相机", label: "数字变焦", value: "40倍" },
      { category: "可见光相机", label: "视频输出", value: "4K@30fps / 1080P@60fps" },
      { category: "红外相机", label: "分辨率", value: "640×512" },
      { category: "红外相机", label: "帧频", value: "30Hz" },
      { category: "红外相机", label: "NETD", value: "≤50mK" },
      { category: "红外相机", label: "测温范围", value: "-20°C~650°C" },
      { category: "红外相机", label: "测温精度", value: "±2°C或±2%" },
      { category: "AI功能", label: "算力", value: "4T" },
      { category: "AI功能", label: "目标追踪", value: "支持" },
      { category: "AI功能", label: "目标识别", value: "人/车/船等" },
      { category: "通用参数", label: "防护等级", value: "IP65" },
      { category: "通用参数", label: "工作温度", value: "-20°C~+55°C" }
    ],
    applications: [
      "电力巡检 - 设备热故障检测",
      "消防救援 - 火点定位与热源追踪",
      "公安执法 - 目标追踪与取证",
      "工业检测 - 管道泄漏检测",
      "光伏巡检 - 热斑检测分析"
    ],
    downloads: [
      { name: "K8T-V2双光云台相机用户手册", type: "pdf", category: "文档" },
      { name: "K8T-V2云台固件", type: "zip", category: "软件" }
    ]
  },
  // 单光追踪识别云台
  {
    id: "k8-v2",
    name: "K8-V2单光追踪识别云台",
    model: "K8-V2",
    category: "单光追踪识别云台",
    price: "询价",
    image: k8V2Image,
    slogan: "轻量化AI识别跟踪",
    subSlogan: "K8-V2单光云台相机",
    keyFeatures: [
      { label: "分辨率", value: "4K" },
      { label: "云台重量", value: "115g" },
      { label: "AI识别跟踪", value: "支持" }
    ],
    highlights: [
      "4K高清视频输出",
      "30倍光学变焦",
      "智能目标追踪",
      "三轴稳定云台"
    ],
    description: [
      "K8-V2单光追踪识别云台采用4K超高清传感器，提供极致清晰画面",
      "30倍光学变焦，远距离精准观察",
      "内置AI目标追踪算法，自动锁定跟踪目标",
      "115g超轻量化设计，适配多种无人机平台",
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
      { category: "相机参数", label: "传感器", value: "Sony 1/2.8\" CMOS" },
      { category: "相机参数", label: "有效像素", value: "800万像素" },
      { category: "相机参数", label: "分辨率", value: "4K" },
      { category: "相机参数", label: "光学变焦", value: "30倍" },
      { category: "相机参数", label: "数码变焦", value: "8倍" },
      { category: "相机参数", label: "视频分辨率", value: "4K@30fps / 1080P@60fps" },
      { category: "相机参数", label: "视场角", value: "63.7°(广角) ~ 2.3°(长焦)" },
      { category: "云台参数", label: "云台轴数", value: "三轴" },
      { category: "云台参数", label: "俯仰范围", value: "-90° ~ +30°" },
      { category: "云台参数", label: "航向范围", value: "360°无限位" },
      { category: "云台参数", label: "稳定精度", value: "±0.01°" },
      { category: "云台参数", label: "重量", value: "115g" },
      { category: "接口参数", label: "视频输出", value: "HDMI / 网络视频流" },
      { category: "接口参数", label: "控制接口", value: "串口TTL / 网口" },
      { category: "AI功能", label: "AI识别跟踪", value: "支持" },
      { category: "通用参数", label: "工作电压", value: "DC 12-26V" },
      { category: "通用参数", label: "功耗", value: "≤15W" },
      { category: "通用参数", label: "防护等级", value: "IP65" },
      { category: "通用参数", label: "工作温度", value: "-20°C ~ +55°C" }
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
    ],
    downloads: [
      { name: "K8-V2云台相机用户手册", type: "pdf", category: "文档" },
      { name: "K8-V2云台固件", type: "zip", category: "软件" },
      { name: "K8-V2上位机软件", type: "zip", category: "软件" }
    ]
  }
];

// 光学变焦吊舱（长凌产品）
export const opticalZoomGimbals: GimbalProduct[] = [
  {
    id: "gx40",
    name: "GX40光学变焦吊舱",
    model: "GX40",
    category: "光学变焦吊舱",
    price: "询价",
    image: "https://qiniu.md.amovlab.com/img/p/202402/20240218/1443422975944760411193344.png",
    images: [
      "https://qiniu.md.amovlab.com/img/p/202402/20240218/1443422975944760411193344.png",
      "https://qiniu.md.amovlab.com/img/p/202402/20240218/1413364598036038026362880.jpg",
      "https://qiniu.md.amovlab.com/img/p/202404/20240417/1458567917029118745411584.jpg"
    ],
    slogan: "40倍光学变焦",
    subSlogan: "远距离目标识别利器",
    keyFeatures: [
      { label: "光学变焦", value: "40倍" },
      { label: "视频规格", value: "4K 30fps" },
      { label: "稳定系统", value: "三轴机械" },
      { label: "云台重量", value: "800g" }
    ],
    highlights: [
      "40倍光学变焦能力",
      "4K超高清视频",
      "三轴机械稳定",
      "HDMI/IP/USB多接口"
    ],
    description: [
      "GX40是一款40倍光学变焦三轴稳定吊舱",
      "支持4K 30fps视频拍摄，画质清晰细腻",
      "三轴机械稳定云台，画面平稳流畅",
      "适用于巡检、搜救、测绘等远距离目标识别场景",
      "支持HDMI/IP/USB多种视频输出方式"
    ],
    features: [
      "40倍光学变焦镜头",
      "4K超高清视频输出",
      "三轴机械稳定系统",
      "俯仰±90°/航向±180°可控",
      "HDMI/IP/USB多接口输出",
      "800g轻量化设计"
    ],
    specs: [
      { category: "光学参数", label: "光学变焦", value: "40倍" },
      { category: "光学参数", label: "传感器", value: "1/2.8英寸CMOS" },
      { category: "光学参数", label: "有效像素", value: "800万像素" },
      { category: "视频参数", label: "视频分辨率", value: "4K 30fps" },
      { category: "视频参数", label: "视频编码", value: "H.264/H.265" },
      { category: "云台参数", label: "稳定方式", value: "三轴机械稳定" },
      { category: "云台参数", label: "俯仰范围", value: "±90°" },
      { category: "云台参数", label: "航向范围", value: "±180°" },
      { category: "云台参数", label: "稳定精度", value: "±0.01°" },
      { category: "接口参数", label: "视频输出", value: "HDMI/IP/USB" },
      { category: "接口参数", label: "控制接口", value: "串口/网口" },
      { category: "物理参数", label: "重量", value: "800g" },
      { category: "物理参数", label: "工作温度", value: "-20°C~+55°C" },
      { category: "物理参数", label: "防护等级", value: "IP54" }
    ],
    applications: [
      "电力巡检 - 输电线路远距离检查",
      "公安执法 - 远距离目标监控取证",
      "消防救援 - 火场远距离侦查",
      "测绘测量 - 远距离目标识别",
      "边防巡逻 - 远距离入侵检测"
    ],
    downloads: [
      { name: "GX40用户手册", type: "pdf", category: "文档" },
      { name: "GX40固件升级包", type: "zip", category: "软件" }
    ]
  }
];

// 合并所有吊舱产品
export const allGimbalProducts = [...gimbalProducts, ...opticalZoomGimbals];

export const gimbalCategories = [
  { id: "quad", name: "四光云台相机", description: "可见光+热成像+广角+激光测距四传感器融合" },
  { id: "dual-tracking", name: "双光跟踪识别云台相机", description: "可见光+热成像双光融合，智能跟踪识别" },
  { id: "single-tracking", name: "单光追踪识别云台", description: "高清可见光，智能目标追踪" },
  { id: "optical-zoom", name: "光学变焦吊舱", description: "高倍光学变焦，远距离目标识别" }
];

export function getGimbalProductById(id: string): GimbalProduct | undefined {
  return allGimbalProducts.find(product => product.id === id);
}

export function getGimbalProductsByCategory(category: string): GimbalProduct[] {
  const categoryMap: Record<string, string> = {
    'quad': '四光云台相机',
    'dual-tracking': '双光跟踪识别云台相机',
    'single-tracking': '单光追踪识别云台',
    'optical-zoom': '光学变焦吊舱'
  };
  const categoryName = categoryMap[category] || category;
  return allGimbalProducts.filter(product => product.category === categoryName);
}
