import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Eye, Droplets, Radio, Flame, Shield, Target } from "lucide-react";

const features = [
  { icon: Eye, title: "热成像侦察", description: "实时探测火情，精准定位火源" },
  { icon: Droplets, title: "灭火投弹", description: "高效灭火弹投放系统" },
  { icon: Radio, title: "应急通信", description: "建立临时通信中继站" },
  { icon: Flame, title: "高温作业", description: "耐高温设计，近火作业" },
  { icon: Shield, title: "安全可靠", description: "多重冗余设计保障" },
  { icon: Target, title: "精准投放", description: "厘米级精度定点投放" },
];

const products = [
  {
    name: "XF-100消防侦察无人机",
    description: "搭载热成像和可见光双光吊舱，实时探测火情，为消防指挥提供决策依据，支持多机协同作业。",
    specs: ["热成像分辨率: 640×512", "续航时间: 45分钟", "通信距离: 10km", "抗风等级: 6级"],
    image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=600&q=80",
  },
  {
    name: "XF-200消防灭火无人机",
    description: "大载荷灭火平台，可携带多枚灭火弹，对高层建筑和危险区域进行精准灭火，有效解决高层消防难题。",
    specs: ["载弹量: 6枚", "单弹重量: 5kg", "投放精度: <1m", "作业高度: ≤200m"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
  },
  {
    name: "XF-300消防救援无人机",
    description: "多功能救援平台，可执行物资投送、通信中继、人员搜救等多种任务，是应急救援的空中利器。",
    specs: ["最大载重: 30kg", "航程: 50km", "抗风等级: 7级", "续航时间: 60分钟"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
  },
];

const stats = [
  { value: "200m", title: "作业高度", description: "高层建筑灭火" },
  { value: "30kg", title: "最大载重", description: "物资投送能力" },
  { value: "<1m", title: "投放精度", description: "精准定点灭火" },
  { value: "60min", title: "续航时间", description: "长时间作业" },
];

const applications = [
  { title: "高层建筑消防", description: "突破传统消防车辆高度限制，对高层建筑进行空中灭火" },
  { title: "森林火灾扑救", description: "快速响应，实时监测火情蔓延，精准投放灭火物资" },
  { title: "化工园区安全", description: "危险区域远程侦察，避免人员直接暴露于危险环境" },
  { title: "地震救援搜索", description: "携带生命探测设备，快速定位被困人员位置" },
  { title: "洪涝灾害救援", description: "投送救生设备，建立临时通信，引导救援力量" },
  { title: "山地救援行动", description: "复杂地形快速到达，投送急救物资和通信设备" },
];

const techSpecs = [
  { label: "最大飞行速度", value: "72km/h" },
  { label: "最大飞行高度", value: "3000m（海拔）" },
  { label: "工作环境温度", value: "-10°C ~ +45°C" },
  { label: "热成像探测距离", value: "≥500m" },
  { label: "灭火弹有效范围", value: "单弹覆盖5m²" },
  { label: "喊话器功率", value: "120dB" },
  { label: "照明灯亮度", value: "10000流明" },
  { label: "防护等级", value: "IP54" },
];

const cases = [
  {
    title: "广东省消防救援总队",
    description: "配备XF系列无人机，成功处置多起高层建筑火灾，有效降低人员伤亡风险",
    image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=600&q=80",
  },
  {
    title: "四川森林消防",
    description: "在多次森林火灾中发挥重要作用，提供实时火情监测和指挥决策支持",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
  },
  {
    title: "河南应急管理厅",
    description: "2021年特大洪涝灾害中，执行物资投送和通信中继任务，救助被困群众",
    image: "https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?w=600&q=80",
  },
];

const Firefighting = () => {
  return (
    <ProductPageTemplate
      heroTitle="消防救援无人机"
      heroSubtitle="快速响应、精准定位、高效灭火，守护生命财产安全。突破传统消防限制，让救援更快速、更安全、更高效"
      heroImage="https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=1920&q=80"
      features={features}
      featuresTitle="核心能力"
      products={products}
      productsTitle="产品系列"
      productsSubtitle="从火情侦察到灭火救援，长凌电子提供全方位消防无人机解决方案"
      stats={stats}
      applications={applications}
      applicationsTitle="应用场景"
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Firefighting;
