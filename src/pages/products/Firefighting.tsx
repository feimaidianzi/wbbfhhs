import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Eye, Droplets, Radio, Flame, Shield, Target } from "lucide-react";

const features = [
  { icon: Eye, title: "热成像侦察", titleEn: "Thermal Reconnaissance", description: "实时探测火情，精准定位火源", descriptionEn: "Real-time fire detection, precise fire source location" },
  { icon: Droplets, title: "灭火投弹", titleEn: "Fire Suppression", description: "高效灭火弹投放系统", descriptionEn: "Efficient fire extinguishing bomb delivery system" },
  { icon: Radio, title: "应急通信", titleEn: "Emergency Comms", description: "建立临时通信中继站", descriptionEn: "Establish temporary communication relay" },
  { icon: Flame, title: "高温作业", titleEn: "High-Temp Operation", description: "耐高温设计，近火作业", descriptionEn: "Heat-resistant design for close fire operations" },
  { icon: Shield, title: "安全可靠", titleEn: "Safe & Reliable", description: "多重冗余设计保障", descriptionEn: "Multiple redundancy design for safety" },
  { icon: Target, title: "精准投放", titleEn: "Precision Delivery", description: "厘米级精度定点投放", descriptionEn: "Centimeter-level precision targeted delivery" },
];

const products = [
  { name: "XF-100消防侦察无人机", nameEn: "XF-100 Fire Recon Drone", description: "搭载热成像和可见光双光吊舱，实时探测火情，为消防指挥提供决策依据，支持多机协同作业。", descriptionEn: "Equipped with thermal and visible light dual-sensor gimbal, real-time fire detection, provides decision support for firefighting command, supports multi-drone coordination.", specs: ["热成像分辨率: 640×512", "续航时间: 45分钟", "通信距离: 10km", "抗风等级: 6级"], specsEn: ["Thermal Resolution: 640×512", "Flight Time: 45min", "Comm Range: 10km", "Wind Resistance: Level 6"], image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=600&q=80" },
  { name: "XF-200消防灭火无人机", nameEn: "XF-200 Fire Fighting Drone", description: "大载荷灭火平台，可携带多枚灭火弹，对高层建筑和危险区域进行精准灭火，有效解决高层消防难题。", descriptionEn: "Heavy-payload firefighting platform, carries multiple fire bombs, precision firefighting for high-rise buildings and dangerous areas, effectively solving high-rise fire challenges.", specs: ["载弹量: 6枚", "单弹重量: 5kg", "投放精度: <1m", "作业高度: ≤200m"], specsEn: ["Bomb Capacity: 6 units", "Bomb Weight: 5kg each", "Drop Accuracy: <1m", "Operating Altitude: ≤200m"], image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80" },
  { name: "XF-300消防救援无人机", nameEn: "XF-300 Fire Rescue Drone", description: "多功能救援平台，可执行物资投送、通信中继、人员搜救等多种任务，是应急救援的空中利器。", descriptionEn: "Multi-function rescue platform for supply delivery, communication relay, personnel search and rescue, an aerial asset for emergency response.", specs: ["最大载重: 30kg", "航程: 50km", "抗风等级: 7级", "续航时间: 60分钟"], specsEn: ["Max Payload: 30kg", "Range: 50km", "Wind Resistance: Level 7", "Flight Time: 60min"], image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80" },
];

const stats = [
  { value: "200m", title: "作业高度", titleEn: "Operating Altitude", description: "高层建筑灭火", descriptionEn: "High-rise firefighting" },
  { value: "30kg", title: "最大载重", titleEn: "Max Payload", description: "物资投送能力", descriptionEn: "Supply delivery capacity" },
  { value: "<1m", title: "投放精度", titleEn: "Drop Accuracy", description: "精准定点灭火", descriptionEn: "Precision targeted firefighting" },
  { value: "60min", title: "续航时间", titleEn: "Flight Time", description: "长时间作业", descriptionEn: "Extended operations" },
];

const applications = [
  { title: "高层建筑消防", titleEn: "High-Rise Firefighting", description: "突破传统消防车辆高度限制，对高层建筑进行空中灭火", descriptionEn: "Breaking traditional fire truck height limits, aerial firefighting for high-rise buildings" },
  { title: "森林火灾扑救", titleEn: "Forest Fire Fighting", description: "快速响应，实时监测火情蔓延，精准投放灭火物资", descriptionEn: "Rapid response, real-time fire spread monitoring, precision delivery of firefighting materials" },
  { title: "化工园区安全", titleEn: "Chemical Plant Safety", description: "危险区域远程侦察，避免人员直接暴露于危险环境", descriptionEn: "Remote reconnaissance of dangerous areas, avoiding personnel exposure to hazardous environments" },
  { title: "地震救援搜索", titleEn: "Earthquake Rescue", description: "携带生命探测设备，快速定位被困人员位置", descriptionEn: "Equipped with life detection equipment, rapidly locating trapped personnel" },
  { title: "洪涝灾害救援", titleEn: "Flood Disaster Relief", description: "投送救生设备，建立临时通信，引导救援力量", descriptionEn: "Delivering life-saving equipment, establishing temporary communications, guiding rescue forces" },
  { title: "山地救援行动", titleEn: "Mountain Rescue", description: "复杂地形快速到达，投送急救物资和通信设备", descriptionEn: "Rapid access to complex terrain, delivering first aid and communication equipment" },
];

const techSpecs = [
  { label: "最大飞行速度", labelEn: "Max Speed", value: "72km/h", valueEn: "72km/h" },
  { label: "最大飞行高度", labelEn: "Max Altitude", value: "3000m（海拔）", valueEn: "3000m (Altitude)" },
  { label: "工作环境温度", labelEn: "Operating Temp", value: "-10°C ~ +45°C", valueEn: "-10°C ~ +45°C" },
  { label: "热成像探测距离", labelEn: "Thermal Detection", value: "≥500m", valueEn: "≥500m" },
  { label: "灭火弹有效范围", labelEn: "Fire Bomb Range", value: "单弹覆盖5m²", valueEn: "5m² per bomb" },
  { label: "喊话器功率", labelEn: "Speaker Power", value: "120dB", valueEn: "120dB" },
  { label: "照明灯亮度", labelEn: "Light Brightness", value: "10000流明", valueEn: "10000 lumens" },
  { label: "防护等级", labelEn: "Protection", value: "IP54", valueEn: "IP54" },
];

const cases = [
  { title: "广东省消防救援总队", titleEn: "Guangdong Fire & Rescue", description: "配备XF系列无人机，成功处置多起高层建筑火灾，有效降低人员伤亡风险", descriptionEn: "Equipped with XF series drones, successfully handled multiple high-rise fires, effectively reducing casualty risks", image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=600&q=80" },
  { title: "四川森林消防", titleEn: "Sichuan Forest Fire Service", description: "在多次森林火灾中发挥重要作用，提供实时火情监测和指挥决策支持", descriptionEn: "Played important role in multiple forest fires, providing real-time fire monitoring and command decision support", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80" },
  { title: "河南应急管理厅", titleEn: "Henan Emergency Management", description: "2021年特大洪涝灾害中，执行物资投送和通信中继任务，救助被困群众", descriptionEn: "During 2021 major floods, executed supply delivery and communication relay missions, rescuing trapped people", image: "https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?w=600&q=80" },
];

const Firefighting = () => {
  return (
    <ProductPageTemplate
      heroTitle="消防救援无人机"
      heroTitleEn="Firefighting & Rescue Drones"
      heroSubtitle="快速响应、精准定位、高效灭火，守护生命财产安全。突破传统消防限制，让救援更快速、更安全、更高效"
      heroSubtitleEn="Rapid response, precise positioning, efficient firefighting, protecting lives and property. Breaking traditional firefighting limits for faster, safer, more efficient rescue"
      heroImage="https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=1920&q=80"
      features={features}
      featuresTitle="核心能力"
      featuresTitleEn="Core Capabilities"
      products={products}
      productsTitle="产品系列"
      productsTitleEn="Product Series"
      productsSubtitle="从火情侦察到灭火救援，飞迈科技提供全方位消防无人机解决方案"
      productsSubtitleEn="From fire reconnaissance to firefighting rescue, Feimai provides comprehensive firefighting drone solutions"
      stats={stats}
      applications={applications}
      applicationsTitle="应用场景"
      applicationsTitleEn="Application Scenarios"
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Firefighting;