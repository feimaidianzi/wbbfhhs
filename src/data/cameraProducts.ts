import sj4000Image from "@/assets/camera/sj4000-wifi.png";

export interface CameraProduct {
  id: string;
  name: string;
  model: string;
  category: string;
  slogan: string;
  subSlogan: string;
  image: string;
  price: string;
  highlights: string[];
  keyFeatures: {
    label: string;
    value: string;
  }[];
  specs: {
    category: string;
    items: { label: string; value: string }[];
  }[];
  features: {
    title: string;
    description: string;
  }[];
  packageContents: string[];
}

export const cameraCategories = [
  {
    id: "action-camera",
    name: "运动相机",
    description: "专业运动摄像设备，支持WiFi传输、1080P高清拍摄",
  },
];

export const cameraProducts: CameraProduct[] = [
  {
    id: "sj4000-wifi",
    name: "SJ4000 WIFI运动相机",
    model: "SJ4000 WIFI",
    category: "运动相机",
    slogan: "高清画质 影院级享受",
    subSlogan: "1080P高清 边玩边拍 随时分享",
    image: sj4000Image,
    price: "询价",
    highlights: [
      "1200万像素CMOS传感器",
      "1080P@30fps高清录制",
      "170°大广角镜头",
      "WiFi无线传输",
      "30米防水深度",
    ],
    keyFeatures: [
      { label: "像素", value: "1200万" },
      { label: "视频", value: "1080P@30fps" },
      { label: "广角", value: "170°" },
      { label: "WiFi", value: "支持" },
      { label: "防水", value: "30M" },
      { label: "续航", value: "90分钟" },
    ],
    specs: {
      category: "基本参数",
      items: [
        { label: "型号", value: "SJ4000 WIFI" },
        { label: "尺寸", value: "59.2*41*29.8mm" },
        { label: "重量", value: "45.5g(不带电池) / 62.5g(带电池)" },
        { label: "处理器", value: "联咏96655" },
        { label: "传感器", value: "AR0330" },
        { label: "显示屏", value: "2.0英寸液晶显示屏" },
        { label: "电池", value: "900mAh锂电池" },
        { label: "存储", value: "Micro SD卡(可扩展32GB、64GB)" },
        { label: "数据连接", value: "USB 2.0 | HDMI | Wi-Fi" },
        { label: "防水深度", value: "30米" },
        { label: "视频格式", value: "MOV/MP4" },
        { label: "视频分辨率", value: "1080P(1920*1080)30fps / 720P(1280*720)60/30fps / WVGA(640*480)30fps" },
        { label: "充电时间", value: "约3小时" },
        { label: "照片分辨率", value: "1200万像素" },
        { label: "照片功能", value: "自拍、连续拍摄(突发)、自动拍摄" },
        { label: "支持语言", value: "English / 繁体中文 / 俄语等" },
        { label: "支持配件", value: "电源适配器、USB线、HDMI线、AV线" },
      ],
    }[0] ? [{
      category: "基本参数",
      items: [
        { label: "型号", value: "SJ4000 WIFI" },
        { label: "尺寸", value: "59.2*41*29.8mm" },
        { label: "重量", value: "45.5g(不带电池) / 62.5g(带电池)" },
        { label: "处理器", value: "联咏96655" },
        { label: "传感器", value: "AR0330" },
        { label: "显示屏", value: "2.0英寸液晶显示屏" },
        { label: "电池", value: "900mAh锂电池" },
        { label: "存储", value: "Micro SD卡(可扩展32GB、64GB)" },
      ],
    }, {
      category: "连接与输出",
      items: [
        { label: "数据连接", value: "USB 2.0 | HDMI | Wi-Fi" },
        { label: "防水深度", value: "30米" },
      ],
    }, {
      category: "视频参数",
      items: [
        { label: "视频格式", value: "MOV/MP4" },
        { label: "1080P分辨率", value: "1920*1080 @30fps" },
        { label: "720P分辨率", value: "1280*720 @60/30fps" },
        { label: "WVGA分辨率", value: "640*480 @30fps" },
      ],
    }, {
      category: "照片参数",
      items: [
        { label: "照片分辨率", value: "1200万像素" },
        { label: "照片功能", value: "自拍、连续拍摄(突发)、自动拍摄" },
        { label: "充电时间", value: "约3小时" },
      ],
    }, {
      category: "其他",
      items: [
        { label: "支持语言", value: "English / 繁体中文 / 俄语等" },
        { label: "支持配件", value: "电源适配器、USB线、HDMI线、AV线" },
      ],
    }] : [],
    features: [
      {
        title: "1200万像素COMS大广角成像",
        description: "170度大广角，拍摄视野更加宽广，1200万像素拍照图像质量进一步提升。配备2.0英寸高清炫丽显示屏，您可以边看边拍，尽情享受拍摄的乐趣！",
      },
      {
        title: "1080P高清画质",
        description: "可以录制1080P高清视频分辨率达到1920*1080，WDR宽动态效果让画质更加真实、自然。",
      },
      {
        title: "WiFi无线传输",
        description: "支持WiFi无线连接，可通过手机APP实时预览、控制拍摄和分享精彩瞬间。",
      },
      {
        title: "30米防水设计",
        description: "配合专业防水壳，可在30米水深下使用，适合各种水上运动场景。",
      },
      {
        title: "多种安装配件",
        description: "标配丰富的安装配件，可安装于头盔、自行车、滑板等各种载体，满足不同场景需求。",
      },
      {
        title: "移动侦测功能",
        description: "支持移动侦测录像，画面有变化时自动开始录制，节省存储空间。",
      },
    ],
    packageContents: [
      "SJ4000 WIFI相机主机",
      "防水壳",
      "自行车支架",
      "边框保护壳",
      "后门(防水/通风)",
      "J型底座",
      "快拆底座",
      "1/4转接头",
      "固定带",
      "头盔固定带",
      "USB数据线",
      "3M贴纸",
      "说明书",
      "清洁布",
    ],
  },
];
