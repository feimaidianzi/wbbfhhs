import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Package, Truck, MapPin, Timer, Shield, Zap } from "lucide-react";

const features = [
  { icon: Package, title: "大载荷能力", description: "最大载重可达30kg" },
  { icon: Truck, title: "长距离配送", description: "单次飞行距离超80km" },
  { icon: MapPin, title: "精准投递", description: "厘米级定位精度" },
  { icon: Timer, title: "快速响应", description: "30分钟内完成配送" },
  { icon: Shield, title: "安全可靠", description: "多重冗余安全设计" },
  { icon: Zap, title: "高效运营", description: "智能航线规划系统" },
];

const products = [
  {
    name: "WL-10物流无人机",
    description: "轻量级物流配送平台，适用于城市最后一公里配送场景，快速响应即时配送需求。",
    specs: ["最大载重: 10kg", "航程: 30km", "巡航速度: 60km/h", "续航时间: 40分钟"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
    link: "/products/logistics/wl-10",
  },
  {
    name: "WL-20物流无人机",
    description: "中型物流配送平台，适用于城际快递和医疗物资运输，满足中等距离配送需求。",
    specs: ["最大载重: 20kg", "航程: 50km", "巡航速度: 80km/h", "续航时间: 50分钟"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    link: "/products/logistics/wl-20",
  },
  {
    name: "WL-30物流无人机",
    description: "重型物流配送平台，适用于偏远地区物资投送和应急救援，突破地形限制。",
    specs: ["最大载重: 30kg", "航程: 80km", "巡航速度: 100km/h", "续航时间: 60分钟"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
    link: "/products/logistics/wl-30",
  },
];

const stats = [
  { value: "30kg", title: "最大载重", description: "满足多种物资配送" },
  { value: "80km", title: "最大航程", description: "覆盖更广配送范围" },
  { value: "30min", title: "配送时效", description: "快速响应需求" },
  { value: "±5cm", title: "投递精度", description: "精准定点配送" },
];

const applications = [
  { title: "城市末端配送", description: "解决最后一公里配送难题，提升配送效率" },
  { title: "医疗物资运输", description: "血液、疫苗等紧急医疗物资快速运输" },
  { title: "偏远地区配送", description: "山区海岛等交通不便地区物资投送" },
  { title: "应急物资投放", description: "灾区物资紧急投放，争分夺秒" },
  { title: "农产品运输", description: "生鲜农产品快速出山进城" },
  { title: "跨境物流", description: "边境贸易快速通关配送" },
];

const techSpecs = [
  { label: "最大飞行速度", value: "120km/h" },
  { label: "巡航速度", value: "60-100km/h" },
  { label: "最大飞行高度", value: "3000m（海拔）" },
  { label: "工作环境温度", value: "-20°C ~ +45°C" },
  { label: "抗风等级", value: "6级（持续）/ 7级（阵风）" },
  { label: "货舱容积", value: "最大60L" },
  { label: "定位系统", value: "GPS + 北斗 + RTK" },
  { label: "降落精度", value: "±5cm" },
];

const cases = [
  {
    title: "顺丰无人机配送",
    description: "在浙江山区开展常态化无人机配送，日均配送量超200单",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    title: "海南离岛配送",
    description: "为海南离岛居民提供日常物资配送服务，解决出行难题",
    image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=600&q=80",
  },
  {
    title: "疫情物资运输",
    description: "疫情期间快速运输医疗物资，累计运输超10吨防疫物资",
    image: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?w=600&q=80",
  },
];

const Logistics = () => {
  return (
    <ProductPageTemplate
      heroTitle="物流无人机系统"
      heroSubtitle="高效配送、智能航线、安全可靠，开启空中物流新时代。突破地形限制，让配送无处不达"
      heroImage="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1920&q=80"
      features={features}
      featuresTitle="核心优势"
      products={products}
      productsTitle="产品系列"
      productsSubtitle="从城市配送到偏远投送，晓鸟科技物流无人机满足全场景需求"
      stats={stats}
      applications={applications}
      applicationsTitle="应用场景"
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Logistics;
