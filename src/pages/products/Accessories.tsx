import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Radio, Cpu, Camera, Gamepad2, Tv, Package } from "lucide-react";

// 导入产品图片
import vtxHighPower from "@/assets/vtx/vtx-high-power.jpg";
import k40tGimbal from "@/assets/gimbal/k40t-gimbal.png";
import wifilink2 from "@/assets/fpv/wifilink2.jpg";
import sj4000Image from "@/assets/camera/sj4000-wifi.png";

const features = [
  {
    icon: Radio,
    title: "VTX/VRX图传",
    description: "4.9-7.2GHz全频段视频发射器，2.5W-37W多功率可选，高清远距离传输",
  },
  {
    icon: Cpu,
    title: "飞控/电调",
    description: "STM32F405/F722高性能处理器，ICM42688陀螺仪，专业级飞行控制",
  },
  {
    icon: Camera,
    title: "吊舱/云台",
    description: "四光/双光/单光云台相机，AI智能识别追踪，三轴机械增稳",
  },
  {
    icon: Gamepad2,
    title: "ELRS遥控",
    description: "ExpressLRS远程控制系统，915/868MHz超远距离，超低延迟",
  },
  {
    icon: Tv,
    title: "数字图传",
    description: "WiFi数字高清图传，1080P 60fps高清画质，低延迟传输",
  },
  {
    icon: Package,
    title: "运动相机",
    description: "1200万像素运动相机，1080P高清录制，WiFi无线传输",
  },
];

const products = [
  {
    name: "VTX视频发射器",
    description: "4.9-7.2GHz全频段视频发射器，2.5W-37W多功率可选，80频道支持，采用高性能射频PCB材料（罗杰斯4350B）",
    specs: ["4.9-7.2GHz", "2.5W-37W可选", "80频道"],
    image: vtxHighPower,
    link: "/products/accessories/vtx-vrx",
  },
  {
    name: "飞控/电调",
    description: "STM32F405/F722高性能处理器，ICM42688陀螺仪，BLHeli_32固件，支持DShot1200协议",
    specs: ["F405/F722处理器", "3-8S电压", "40A-100A电流"],
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/b67564581a.jpg",
    link: "/products/accessories/fc-esc",
  },
  {
    name: "吊舱/云台",
    description: "K40T四光AI云台相机，集成可见光变焦、广角、红外热成像和激光测距，支持AI智能识别",
    specs: ["四光融合", "1200m激光测距", "AI识别"],
    image: k40tGimbal,
    link: "/products/accessories/gimbal",
  },
  {
    name: "ELRS遥控系统",
    description: "ExpressLRS远程控制系统，915/868MHz频段，超远距离控制，超低延迟响应",
    specs: ["915/868MHz", "超远距离", "低延迟5ms"],
    image: "https://inew.foxeer.com//upload/s/goods/2023-12-12/11-16-45-6577d09dee618.images.400x400.jpg",
    link: "/products/accessories/elrs",
  },
  {
    name: "数字高清图传",
    description: "WiFiLink2数字高清图传，1080P 60fps高清画质，WiFi技术低延迟传输",
    specs: ["1080P 60fps", "WiFi传输", "低延迟"],
    image: wifilink2,
    link: "/products/accessories/digital-fpv",
  },
  {
    name: "运动相机",
    description: "SJ4000 WIFI运动相机，1200万像素CMOS传感器，1080P高清录制，30米防水",
    specs: ["1200万像素", "1080P录制", "WiFi传输"],
    image: sj4000Image,
    link: "/products/accessories/camera",
  },
];

const stats = [
  { value: "50+", title: "产品型号", description: "覆盖各类配件需求" },
  { value: "99%", title: "适配率", description: "兼容主流无人机平台" },
  { value: "2年", title: "质保期限", description: "售后无忧保障" },
  { value: "48h", title: "发货时效", description: "快速配送全国" },
];

const applications = [
  {
    title: "FPV穿越机",
    description: "VTX图传、飞控电调、ELRS遥控等核心配件，打造极致飞行体验",
    image: vtxHighPower,
  },
  {
    title: "工业巡检",
    description: "四光云台、数字图传、高性能飞控，满足电力、光伏等巡检需求",
    image: k40tGimbal,
  },
  {
    title: "航拍摄影",
    description: "高清云台相机、稳定图传系统，实现专业级航拍效果",
    image: wifilink2,
  },
  {
    title: "运动记录",
    description: "运动相机配件，记录骑行、滑雪等运动精彩瞬间",
    image: sj4000Image,
  },
];

const techSpecs = [
  { label: "VTX频段", value: "4.9-7.2GHz全频段" },
  { label: "VTX功率", value: "2.5W / 3W / 10W / 16W / 25W / 37W" },
  { label: "飞控处理器", value: "STM32F405 / F722" },
  { label: "电调电流", value: "40A / 55A / 60A / 80A / 100A" },
  { label: "ELRS频段", value: "915MHz / 868MHz / 2.4GHz" },
  { label: "数字图传", value: "1080P 60fps / 720P 60fps" },
  { label: "云台类型", value: "四光 / 双光 / 单光" },
  { label: "认证标准", value: "CE / FCC / RoHS" },
];

const cases = [
  {
    title: "电力巡检升级方案",
    description: "为某省电网巡检队提供K40T四光云台和高功率VTX图传，实现远距离高清巡检",
    image: k40tGimbal,
  },
  {
    title: "FPV竞速队配件供应",
    description: "为专业FPV竞速队提供飞塔套装和ELRS遥控系统，助力比赛取得优异成绩",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/b67564581a.jpg",
  },
  {
    title: "航拍团队设备升级",
    description: "为航拍服务团队提供数字图传和云台相机方案，提升拍摄画质和稳定性",
    image: wifilink2,
  },
];

const Accessories = () => {
  return (
    <ProductPageTemplate
      heroTitle="无人机配件"
      heroSubtitle="VTX图传 | 飞控电调 | 云台吊舱 | ELRS遥控 | 数字图传"
      heroImage={vtxHighPower}
      features={features}
      products={products}
      stats={stats}
      applications={applications}
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Accessories;
