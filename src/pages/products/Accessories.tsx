import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Radio, Cpu, Camera, Gamepad2, Tv, Package } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// 导入产品图片
import vtxHighPower from "@/assets/vtx/vtx-high-power.jpg";
import k40tGimbal from "@/assets/gimbal/k40t-gimbal.png";
import wifilink2 from "@/assets/fpv/wifilink2.jpg";
import sj4000Image from "@/assets/camera/sj4000-wifi.png";

const Accessories = () => {
  const { baseLang } = useLanguage();
  const isEn = baseLang === 'en';

  const features = [
    { icon: Radio, title: "VTX/VRX图传", titleEn: "VTX/VRX Video TX", description: "4.9-7.2GHz全频段视频发射器，2.5W-37W多功率可选，高清远距离传输", descriptionEn: "4.9-7.2GHz full-band video transmitter, 2.5W-37W power options, HD long-range transmission" },
    { icon: Cpu, title: "飞控/电调", titleEn: "FC/ESC", description: "STM32F405/F722高性能处理器，ICM42688陀螺仪，专业级飞行控制", descriptionEn: "STM32F405/F722 high-performance processor, ICM42688 gyroscope, professional flight control" },
    { icon: Camera, title: "吊舱/云台", titleEn: "Gimbal/Camera", description: "四光/双光/单光云台相机，AI智能识别追踪，三轴机械增稳", descriptionEn: "Quad/dual/single sensor gimbal camera, AI smart recognition tracking, 3-axis mechanical stabilization" },
    { icon: Gamepad2, title: "ELRS遥控", titleEn: "ELRS Control", description: "ExpressLRS远程控制系统，915/868MHz超远距离，超低延迟", descriptionEn: "ExpressLRS remote control system, 915/868MHz ultra-long range, ultra-low latency" },
    { icon: Tv, title: "数字图传", titleEn: "Digital VTX", description: "WiFi数字高清图传，1080P 60fps高清画质，低延迟传输", descriptionEn: "WiFi digital HD video, 1080P 60fps HD quality, low latency transmission" },
    { icon: Package, title: "运动相机", titleEn: "Action Camera", description: "1200万像素运动相机，1080P高清录制，WiFi无线传输", descriptionEn: "12MP action camera, 1080P HD recording, WiFi wireless transmission" },
  ];

  const products = [
    { name: "VTX视频发射器", nameEn: "VTX Video Transmitter", description: "4.9-7.2GHz全频段视频发射器，2.5W-37W多功率可选，80频道支持，采用高性能射频PCB材料（罗杰斯4350B）", descriptionEn: "4.9-7.2GHz full-band video transmitter, 2.5W-37W power options, 80 channels, high-performance RF PCB material (Rogers 4350B)", specs: ["4.9-7.2GHz", "2.5W-37W可选", "80频道"], specsEn: ["4.9-7.2GHz", "2.5W-37W Options", "80 Channels"], image: vtxHighPower, link: "/products/accessories/vtx-vrx" },
    { name: "飞控/电调", nameEn: "Flight Controller/ESC", description: "STM32F405/F722高性能处理器，ICM42688陀螺仪，BLHeli_32固件，支持DShot1200协议", descriptionEn: "STM32F405/F722 high-performance processor, ICM42688 gyroscope, BLHeli_32 firmware, DShot1200 support", specs: ["F405/F722处理器", "3-8S电压", "40A-100A电流"], specsEn: ["F405/F722 Processor", "3-8S Voltage", "40A-100A Current"], image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/b67564581a.jpg", link: "/products/accessories/fc-esc" },
    { name: "吊舱/云台", nameEn: "Gimbal Camera", description: "K40T四光AI云台相机，集成可见光变焦、广角、红外热成像和激光测距，支持AI智能识别", descriptionEn: "K40T quad-sensor AI gimbal camera, integrated visible light zoom, wide angle, thermal imaging and laser rangefinder, AI recognition", specs: ["四光融合", "1200m激光测距", "AI识别"], specsEn: ["Quad-Sensor Fusion", "1200m Laser Ranging", "AI Recognition"], image: k40tGimbal, link: "/products/accessories/gimbal" },
    { name: "ELRS遥控系统", nameEn: "ELRS Control System", description: "ExpressLRS远程控制系统，915/868MHz频段，超远距离控制，超低延迟响应", descriptionEn: "ExpressLRS remote control system, 915/868MHz band, ultra-long range control, ultra-low latency response", specs: ["915/868MHz", "超远距离", "低延迟5ms"], specsEn: ["915/868MHz", "Ultra-Long Range", "5ms Low Latency"], image: "https://inew.foxeer.com//upload/s/goods/2023-12-12/11-16-45-6577d09dee618.images.400x400.jpg", link: "/products/accessories/elrs" },
    { name: "数字高清图传", nameEn: "Digital HD Video TX", description: "WiFiLink2数字高清图传，1080P 60fps高清画质，WiFi技术低延迟传输", descriptionEn: "WiFiLink2 digital HD video transmitter, 1080P 60fps HD quality, WiFi low latency transmission", specs: ["1080P 60fps", "WiFi传输", "低延迟"], specsEn: ["1080P 60fps", "WiFi Transmission", "Low Latency"], image: wifilink2, link: "/products/accessories/digital-fpv" },
    { name: "运动相机", nameEn: "Action Camera", description: "SJ4000 WIFI运动相机，1200万像素CMOS传感器，1080P高清录制，30米防水", descriptionEn: "SJ4000 WIFI action camera, 12MP CMOS sensor, 1080P HD recording, 30m waterproof", specs: ["1200万像素", "1080P录制", "WiFi传输"], specsEn: ["12 Megapixels", "1080P Recording", "WiFi Transfer"], image: sj4000Image, link: "/products/accessories/camera" },
  ];

  const stats = [
    { value: "50+", title: "产品型号", titleEn: "Product Models", description: "覆盖各类配件需求", descriptionEn: "Covering all accessory needs" },
    { value: "99%", title: "适配率", titleEn: "Compatibility", description: "兼容主流无人机平台", descriptionEn: "Compatible with mainstream drones" },
    { value: "2年", title: "质保期限", titleEn: "Warranty", description: "售后无忧保障", descriptionEn: "Worry-free after-sales" },
    { value: "48h", title: "发货时效", titleEn: "Shipping", description: "快速配送全国", descriptionEn: "Fast delivery nationwide" },
  ];

  const applications = [
    { title: "FPV穿越机", titleEn: "FPV Racing Drone", description: "VTX图传、飞控电调、ELRS遥控等核心配件，打造极致飞行体验", descriptionEn: "VTX video, FC/ESC, ELRS control and other core accessories for ultimate flying experience", image: vtxHighPower },
    { title: "工业巡检", titleEn: "Industrial Inspection", description: "四光云台、数字图传、高性能飞控，满足电力、光伏等巡检需求", descriptionEn: "Quad-sensor gimbal, digital video, high-performance FC for power and solar inspection", image: k40tGimbal },
    { title: "航拍摄影", titleEn: "Aerial Photography", description: "高清云台相机、稳定图传系统，实现专业级航拍效果", descriptionEn: "HD gimbal camera, stable video system for professional aerial photography", image: wifilink2 },
    { title: "运动记录", titleEn: "Sports Recording", description: "运动相机配件，记录骑行、滑雪等运动精彩瞬间", descriptionEn: "Action camera accessories for recording cycling, skiing and other sports moments", image: sj4000Image },
  ];

  const techSpecs = [
    { label: "VTX频段", labelEn: "VTX Band", value: "4.9-7.2GHz全频段", valueEn: "4.9-7.2GHz Full Band" },
    { label: "VTX功率", labelEn: "VTX Power", value: "2.5W / 3W / 10W / 16W / 25W / 37W", valueEn: "2.5W / 3W / 10W / 16W / 25W / 37W" },
    { label: "飞控处理器", labelEn: "FC Processor", value: "STM32F405 / F722", valueEn: "STM32F405 / F722" },
    { label: "电调电流", labelEn: "ESC Current", value: "40A / 55A / 60A / 80A / 100A", valueEn: "40A / 55A / 60A / 80A / 100A" },
    { label: "ELRS频段", labelEn: "ELRS Band", value: "915MHz / 868MHz / 2.4GHz", valueEn: "915MHz / 868MHz / 2.4GHz" },
    { label: "数字图传", labelEn: "Digital VTX", value: "1080P 60fps / 720P 60fps", valueEn: "1080P 60fps / 720P 60fps" },
    { label: "云台类型", labelEn: "Gimbal Type", value: "四光 / 双光 / 单光", valueEn: "Quad / Dual / Single Sensor" },
    { label: "认证标准", labelEn: "Certifications", value: "CE / FCC / RoHS", valueEn: "CE / FCC / RoHS" },
  ];

  const cases = [
    { title: "电力巡检升级方案", titleEn: "Power Inspection Upgrade", description: "为某省电网巡检队提供K40T四光云台和高功率VTX图传，实现远距离高清巡检", descriptionEn: "Provided K40T quad-sensor gimbal and high-power VTX for provincial power grid inspection team for long-range HD inspection", image: k40tGimbal },
    { title: "FPV竞速队配件供应", titleEn: "FPV Racing Team Supply", description: "为专业FPV竞速队提供飞塔套装和ELRS遥控系统，助力比赛取得优异成绩", descriptionEn: "Provided flight stack and ELRS control system for professional FPV racing team, helping achieve excellent results", image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/b67564581a.jpg" },
    { title: "航拍团队设备升级", titleEn: "Aerial Photography Team Upgrade", description: "为航拍服务团队提供数字图传和云台相机方案，提升拍摄画质和稳定性", descriptionEn: "Provided digital video and gimbal camera solution for aerial photography team, improving image quality and stability", image: wifilink2 },
  ];

  return (
    <ProductPageTemplate
      heroTitle="无人机配件"
      heroTitleEn="Drone Accessories"
      heroSubtitle="VTX图传 | 飞控电调 | 云台吊舱 | ELRS遥控 | 数字图传"
      heroSubtitleEn="VTX Video TX | FC/ESC | Gimbal Camera | ELRS Control | Digital VTX"
      heroImage={vtxHighPower}
      features={features}
      featuresTitle="产品类别"
      featuresTitleEn="Product Categories"
      products={products}
      productsTitle="热门产品"
      productsTitleEn="Popular Products"
      stats={stats}
      applications={applications}
      applicationsTitle="应用场景"
      applicationsTitleEn="Applications"
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Accessories;