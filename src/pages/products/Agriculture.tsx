import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Droplets, Gauge, Leaf, Shield, Zap, MapPin } from "lucide-react";

const features = [
  { icon: Droplets, title: "精准喷洒", titleEn: "Precision Spraying", description: "厘米级精准定位，均匀喷洒，减少农药浪费", descriptionEn: "Centimeter-level positioning, uniform spraying, reducing pesticide waste" },
  { icon: Gauge, title: "高效作业", titleEn: "High Efficiency", description: "单架次作业面积大，效率是人工的50倍以上", descriptionEn: "Large coverage per sortie, 50x more efficient than manual labor" },
  { icon: Leaf, title: "智能避障", titleEn: "Smart Avoidance", description: "雷达+视觉双重避障，自动绕行障碍物", descriptionEn: "Radar + vision dual avoidance, auto-bypass obstacles" },
  { icon: Shield, title: "安全可靠", titleEn: "Safe & Reliable", description: "远离农药接触，保护作业人员健康安全", descriptionEn: "Away from pesticide contact, protecting operator health" },
  { icon: Zap, title: "快速换装", titleEn: "Quick Reload", description: "模块化药箱设计，30秒快速换装继续作业", descriptionEn: "Modular tank design, 30-second quick reload to continue" },
  { icon: MapPin, title: "智能规划", titleEn: "Smart Planning", description: "AI路径规划，自动生成最优作业航线", descriptionEn: "AI path planning, auto-generating optimal work routes" },
];

const products = [
  { name: "ZB-16植保无人机", nameEn: "ZB-16 Agricultural Drone", description: "16升药箱容量，适合小型农田精准作业", descriptionEn: "16L tank capacity, ideal for small farm precision operations", specs: ["药箱: 16L", "喷幅: 4-6m", "续航: 15min"], specsEn: ["Tank: 16L", "Spray Width: 4-6m", "Flight Time: 15min"], image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&q=80", link: "/products/agriculture/zb-16" },
  { name: "ZB-30植保无人机", nameEn: "ZB-30 Agricultural Drone", description: "30升大容量药箱，高效大面积作业首选", descriptionEn: "30L large capacity tank, preferred for efficient large-area operations", specs: ["药箱: 30L", "喷幅: 5-8m", "续航: 12min"], specsEn: ["Tank: 30L", "Spray Width: 5-8m", "Flight Time: 12min"], image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80", link: "/products/agriculture/zb-30" },
  { name: "ZB-50植保无人机", nameEn: "ZB-50 Agricultural Drone", description: "50升超大容量，专业农场级作业平台", descriptionEn: "50L extra-large capacity, professional farm-level platform", specs: ["药箱: 50L", "喷幅: 6-10m", "续航: 10min"], specsEn: ["Tank: 50L", "Spray Width: 6-10m", "Flight Time: 10min"], image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80", link: "/products/agriculture/zb-50" },
];

const stats = [
  { value: "50+", title: "倍效率提升", titleEn: "Efficiency Boost", description: "相比传统人工作业", descriptionEn: "vs manual labor" },
  { value: "95%", title: "农药利用率", titleEn: "Pesticide Utilization", description: "精准喷洒减少浪费", descriptionEn: "Precision spraying reduces waste" },
  { value: "1000+", title: "服务农户", titleEn: "Farmers Served", description: "覆盖全国多省市", descriptionEn: "Covering multiple provinces" },
  { value: "100万", title: "亩作业面积", titleEn: "Mu Coverage", description: "累计完成作业", descriptionEn: "Cumulative work area" },
];

const applications = [
  { title: "水稻田作业", titleEn: "Rice Paddy Operations", description: "适应水田环境，精准施药施肥", descriptionEn: "Adapted to paddy environment, precision spraying and fertilizing", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80" },
  { title: "果园喷洒", titleEn: "Orchard Spraying", description: "立体喷洒技术，覆盖果树全方位", descriptionEn: "3D spraying technology, full coverage of fruit trees", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80" },
  { title: "棉花田管理", titleEn: "Cotton Field Management", description: "大面积高效作业，降低人工成本", descriptionEn: "Large-area efficient operations, reducing labor costs", image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=600&q=80" },
  { title: "播种撒肥", titleEn: "Seeding & Fertilizing", description: "精准播种，均匀撒肥，提高产量", descriptionEn: "Precision seeding, uniform fertilizing, increasing yield", image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80" },
];

const techSpecs = [
  { label: "药箱容量", labelEn: "Tank Capacity", value: "16L / 30L / 50L", valueEn: "16L / 30L / 50L" },
  { label: "喷洒效率", labelEn: "Spray Efficiency", value: "10-20亩/小时", valueEn: "0.67-1.33 ha/hour" },
  { label: "喷幅范围", labelEn: "Spray Width", value: "4-10米可调", valueEn: "4-10m adjustable" },
  { label: "流量控制", labelEn: "Flow Control", value: "0.5-6L/min", valueEn: "0.5-6L/min" },
  { label: "雾化粒径", labelEn: "Droplet Size", value: "80-300μm", valueEn: "80-300μm" },
  { label: "抗风等级", labelEn: "Wind Resistance", value: "6级", valueEn: "Level 6" },
  { label: "防护等级", labelEn: "Protection", value: "IP67", valueEn: "IP67" },
  { label: "工作温度", labelEn: "Operating Temp", value: "-10°C ~ 45°C", valueEn: "-10°C ~ 45°C" },
];

const cases = [
  { title: "新疆棉花种植基地", titleEn: "Xinjiang Cotton Plantation", description: "10万亩棉花田植保作业，效率提升60倍，农药节省40%", descriptionEn: "100,000 mu cotton field operations, 60x efficiency increase, 40% pesticide savings", image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=600&q=80" },
  { title: "江苏水稻种植区", titleEn: "Jiangsu Rice Growing Area", description: "精准施药作业，病虫害防治效果提升35%", descriptionEn: "Precision spraying operations, 35% improvement in pest control effectiveness", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80" },
  { title: "山东果园管理", titleEn: "Shandong Orchard Management", description: "立体喷洒覆盖，果园作业效率提升50倍", descriptionEn: "3D spray coverage, 50x improvement in orchard operation efficiency", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80" },
];

const Agriculture = () => {
  return (
    <ProductPageTemplate
      heroTitle="植保无人机"
      heroTitleEn="Agricultural Drones"
      heroSubtitle="智慧农业解决方案"
      heroSubtitleEn="Smart Agriculture Solutions"
      heroImage="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=1920&q=80"
      features={features}
      featuresTitle="核心优势"
      featuresTitleEn="Core Advantages"
      products={products}
      productsTitle="产品系列"
      productsTitleEn="Product Series"
      stats={stats}
      applications={applications}
      applicationsTitle="应用场景"
      applicationsTitleEn="Application Scenarios"
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Agriculture;