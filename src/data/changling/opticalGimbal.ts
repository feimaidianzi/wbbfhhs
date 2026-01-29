/**
 * 长凌科技 - 光学变焦吊舱产品数据
 * 添加到吊舱/云台分类
 */

import { GimbalProduct } from "../gimbalProducts";

export const opticalZoomGimbal: GimbalProduct = {
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
    // 光学参数
    { category: "光学参数", label: "光学变焦", value: "40倍" },
    { category: "光学参数", label: "传感器", value: "1/2.8英寸CMOS" },
    { category: "光学参数", label: "有效像素", value: "800万像素" },
    // 视频参数
    { category: "视频参数", label: "视频分辨率", value: "4K 30fps" },
    { category: "视频参数", label: "视频编码", value: "H.264/H.265" },
    // 云台参数
    { category: "云台参数", label: "稳定方式", value: "三轴机械稳定" },
    { category: "云台参数", label: "俯仰范围", value: "±90°" },
    { category: "云台参数", label: "航向范围", value: "±180°" },
    { category: "云台参数", label: "稳定精度", value: "±0.01°" },
    // 接口参数
    { category: "接口参数", label: "视频输出", value: "HDMI/IP/USB" },
    { category: "接口参数", label: "控制接口", value: "串口/网口" },
    // 物理参数
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
};
