import ApplicationPageTemplate from "@/components/ApplicationPageTemplate";
import { Flame, Eye, Radio, Droplets, Shield, Zap, Target } from "lucide-react";

const FirefightingApp = () => {
  const features = [
    { icon: Eye, title: "火情侦察", description: "红外热成像精准探测火点，快速掌握火场态势，为灭火决策提供依据" },
    { icon: Radio, title: "通信保障", description: "空中通信中继平台，保障救援现场通信畅通无阻" },
    { icon: Droplets, title: "灭火投弹", description: "携带灭火弹精准投放，有效抑制火势蔓延扩大" },
    { icon: Flame, title: "全天候作业", description: "7×24小时待命响应，快速响应各类火灾险情" },
  ];

  const advantages = [
    { icon: Zap, title: "快速响应", description: "5分钟内完成起飞准备，快速到达火场", value: "5分钟" },
    { icon: Target, title: "精准定位", description: "红外热成像精准探测火点位置", value: "厘米级" },
    { icon: Shield, title: "安全可靠", description: "替代人员进入危险区域侦察", value: "零风险" },
    { icon: Eye, title: "全面覆盖", description: "高空视角覆盖大面积区域监测", value: "5km²" },
  ];

  const scenarios = [
    {
      title: "森林防火",
      description: "森林火灾预防监测、火情早期发现、火场态势评估",
      detailDescription: "森林防火是保护生态环境的重要任务。无人机搭载红外热成像相机，可以24小时不间断巡护，及时发现火情隐患。在火灾发生时，可快速评估火场态势，为灭火决策提供准确信息。搭载灭火弹可对初期火点进行精准投放，抑制火势蔓延。",
      image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=800&q=80",
      icon: Flame,
      features: ["火情监测", "态势评估", "灭火投弹"],
      highlights: [
        { label: "监测范围", value: "50km²" },
        { label: "响应时间", value: "<10分钟" },
        { label: "准确率", value: "99%" },
      ],
    },
    {
      title: "城市消防",
      description: "高层建筑火灾侦察、人员搜救定位、应急物资投送",
      detailDescription: "城市高层建筑火灾救援难度大，传统方式难以快速获取火场信息。无人机可快速升空，通过可见光和红外相机对建筑进行全方位侦察，定位被困人员位置，为救援决策提供关键信息。还可携带轻型救援物资进行投送。",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
      icon: Shield,
      features: ["火场侦察", "人员定位", "物资投送"],
      highlights: [
        { label: "侦察高度", value: "300m" },
        { label: "图传距离", value: "10km" },
        { label: "载重能力", value: "5kg" },
      ],
    },
    {
      title: "应急救援",
      description: "地震、洪涝等灾害现场侦察评估和救援协调支持",
      detailDescription: "在地震、洪涝等自然灾害发生后，无人机可第一时间进入灾区进行侦察评估，快速了解灾情，为救援指挥提供决策支持。同时可搭载通信中继设备，恢复灾区通信覆盖，保障救援工作顺利进行。",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      icon: Radio,
      features: ["灾情侦察", "通信保障", "救援协调"],
      highlights: [
        { label: "覆盖范围", value: "30km" },
        { label: "续航时间", value: "60分钟" },
        { label: "通信距离", value: "50km" },
      ],
    },
  ];

  const products = [
    { model: "X850", payload: "5kg", range: "45分钟", description: "中型消防侦察无人机，适合火场侦察和态势评估", link: "/products/multi-rotor/x850" },
    { model: "X1200", payload: "10kg", range: "55分钟", description: "大型消防无人机，可携带灭火弹进行投放", link: "/products/multi-rotor/x1200" },
    { model: "TH-200", payload: "10kg", range: "200m", description: "系留消防平台，24小时持续监控火场态势", link: "/products/tethered/th-200" },
  ];

  return (
    <ApplicationPageTemplate
      seoTitle="消防应急应用 - 无人机消防救援解决方案"
      seoDescription="专业的无人机消防应急解决方案，提供火情侦察、通信保障、灭火投弹等服务，快速响应各类火灾险情"
      seoKeywords="消防无人机,应急救援,火情侦察,森林防火,城市消防"
      heroTitle="消防应急解决方案"
      heroSubtitle="行业应用"
      heroDescription="无人机消防应急技术，为生命安全保驾护航。通过红外热成像、通信中继、灭火投弹等功能，提供全方位消防救援支持。"
      heroImage="https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=1920&q=80"
      heroStats={[
        { value: "5分钟", label: "快速响应" },
        { value: "99%", label: "火点识别" },
        { value: "24小时", label: "持续监控" },
      ]}
      introTitle="无人机消防应急概述"
      introDescription="无人机技术在消防应急领域的应用，为火灾预防、火情侦察、救援协调提供了全新解决方案"
      introImage="https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=800&q=80"
      introPoints={[
        "红外热成像精准探测火点，第一时间发现火情",
        "空中通信中继，保障救援现场通信畅通",
        "携带灭火弹精准投放，抑制火势蔓延",
        "全天候7×24小时待命，快速响应火灾险情",
      ]}
      advantages={advantages}
      features={features}
      scenarios={scenarios}
      products={products}
      ctaTitle="获取消防应急解决方案"
      ctaDescription="长凌科技为您提供专业的消防应急无人机解决方案，助力应急管理能力提升"
      ctaProductLink="/products/multi-rotor"
    />
  );
};

export default FirefightingApp;
