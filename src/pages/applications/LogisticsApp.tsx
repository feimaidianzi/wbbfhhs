import ApplicationPageTemplate from "@/components/ApplicationPageTemplate";
import { Package, Truck, Clock, MapPin, Zap, Shield, Target, TrendingUp, Globe, Mountain, Building, Anchor } from "lucide-react";

// 导入配图
import heroLogistics from "@/assets/logistics/hero-logistics.jpg";
import droneHeavyLift from "@/assets/logistics/drone-heavy-lift.jpg";
import remoteDelivery from "@/assets/logistics/remote-delivery.jpg";
import islandDelivery from "@/assets/logistics/island-delivery.jpg";
import emergencyDelivery from "@/assets/logistics/emergency-delivery.jpg";
import urbanDelivery from "@/assets/logistics/urban-delivery.jpg";

const LogisticsApp = () => {
  const features = [
    { icon: Zap, title: "高效配送", description: "无人机物流绕过传统地面交通，直线飞行大大缩短配送时间" },
    { icon: TrendingUp, title: "降低成本", description: "减少人工和燃油成本，特别适合偏远地区配送" },
    { icon: Target, title: "环保低碳", description: "电动驱动，零排放，符合绿色物流发展趋势" },
    { icon: Shield, title: "安全可靠", description: "多重冗余设计，智能避障系统，确保飞行安全" },
  ];

  const advantages = [
    { icon: Package, title: "大载重能力", description: "满足各类物资运输需求", value: "30KG" },
    { icon: Clock, title: "快速响应", description: "直线飞行，配送效率大幅提升", value: "3倍效率" },
    { icon: MapPin, title: "精准投放", description: "厘米级定位精度", value: "厘米级" },
    { icon: Globe, title: "全地形覆盖", description: "跨越山川河流", value: "全地形" },
  ];

  const scenarios = [
    {
      title: "偏远山区配送",
      description: "为交通不便的山区、林区提供快速物资配送服务，解决最后一公里难题",
      detailDescription: "我国山区面积占国土总面积的三分之二以上，许多偏远山区交通不便，传统物流配送成本高、时效差。无人机物流配送突破地形限制，可以直线飞行到达目的地，将原本需要数天的配送时间缩短到数小时。",
      image: remoteDelivery,
      icon: Mountain,
      features: ["山区配送", "林区物资", "农村快递"],
      highlights: [
        { label: "配送效率", value: "提升10倍" },
        { label: "覆盖范围", value: "30km半径" },
        { label: "成本节约", value: "降低60%" },
      ],
    },
    {
      title: "海岛物资运输",
      description: "跨越海洋为海岛居民配送生活必需品和紧急物资，突破地理限制",
      detailDescription: "我国拥有众多海岛，其中有人居住的海岛超过450个。海岛居民的物资供应长期依赖船舶运输，受天气、潮汐等因素影响较大。无人机物流配送可以跨越海洋，在恶劣天气无法通航时仍能保障物资供应。",
      image: islandDelivery,
      icon: Anchor,
      features: ["海岛配送", "跨海运输", "渔村物资"],
      highlights: [
        { label: "跨海距离", value: "最远50km" },
        { label: "抗风等级", value: "7级风" },
        { label: "全天候", value: "24小时响应" },
      ],
    },
    {
      title: "应急物资投送",
      description: "灾害救援场景下快速投送急需物资和医疗用品，争分夺秒",
      detailDescription: "在地震、洪水、泥石流等自然灾害发生后，道路往往被毁坏，传统运输方式难以进入灾区。无人机可以快速将急救药品、医疗器械、食品、饮用水等紧急物资送达灾区，为抢救生命争取宝贵时间。",
      image: emergencyDelivery,
      icon: Shield,
      features: ["医疗物资", "救灾物品", "应急响应"],
      highlights: [
        { label: "响应时间", value: "<30分钟" },
        { label: "投送精度", value: "厘米级" },
        { label: "紧急载重", value: "最大30kg" },
      ],
    },
    {
      title: "城市末端配送",
      description: "解决城市配送最后一公里难题，提升用户体验和配送效率",
      detailDescription: "随着电商和即时配送的快速发展，城市末端配送需求激增。传统的人工配送面临人力成本高、交通拥堵、配送时效不稳定等问题。无人机末端配送可以避开地面交通，实现点对点快速配送。",
      image: urbanDelivery,
      icon: Building,
      features: ["快递配送", "即时物流", "生鲜配送"],
      highlights: [
        { label: "配送时效", value: "<15分钟" },
        { label: "日配送量", value: "200+单" },
        { label: "用户满意度", value: "98%" },
      ],
    },
  ];

  const products = [
    { model: "WL-10", payload: "10KG", range: "15km", description: "轻量级物流配送无人机，适合短途快递配送", link: "/products/logistics/wl-10" },
    { model: "WL-20", payload: "20KG", range: "25km", description: "中型物流无人机，满足多场景配送需求", link: "/products/logistics/wl-20" },
    { model: "WL-30", payload: "30KG", range: "35km", description: "大载重物流无人机，适合应急物资投送", link: "/products/logistics/wl-30" },
  ];

  return (
    <ApplicationPageTemplate
      seoTitle="物流应用 - 无人机物流配送解决方案"
      seoDescription="飞迈科技物流无人机解决方案，提供偏远地区配送、海岛物资运输、应急物资投送、城市末端配送等专业服务，最大载重30KG。"
      seoKeywords="物流无人机,无人机配送,应急物资投送,末端配送,大载重无人机,海岛配送"
      heroTitle="物流配送解决方案"
      heroSubtitle="行业应用"
      heroDescription="物流无人机是专门用于运输和递送物品的无人机系统，通常用于在短途配送或难以到达的地区进行货物运输。随着技术的不断发展，物流无人机在提高配送效率、降低成本、减少人工干预等方面展现出巨大潜力。"
      heroImage={heroLogistics}
      heroStats={[
        { value: "30KG", label: "最大载重" },
        { value: "50km", label: "最大航程" },
        { value: "全地形", label: "覆盖能力" },
      ]}
      introTitle="无人机物流配送概述"
      introDescription="物流无人机正在改变传统物流行业，为偏远地区、应急配送等场景提供全新解决方案"
      introImage={droneHeavyLift}
      introPoints={[
        "突破地形限制，直达目的地",
        "大幅缩短配送时间，提升效率",
        "降低人工和运输成本",
        "环保低碳，符合可持续发展理念",
      ]}
      advantages={advantages}
      features={features}
      scenarios={scenarios}
      products={products}
      ctaTitle="开启智能物流配送"
      ctaDescription="联系我们获取专业的物流无人机解决方案"
      ctaProductLink="/products/logistics"
    />
  );
};

export default LogisticsApp;
