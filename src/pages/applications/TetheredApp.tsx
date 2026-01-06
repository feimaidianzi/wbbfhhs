import ApplicationPageTemplate from "@/components/ApplicationPageTemplate";
import { Clock, Cable, Radio, Eye, Shield, Zap, Target, Wifi } from "lucide-react";

const TetheredApp = () => {
  const features = [
    { icon: Clock, title: "持续滞空", description: "系留供电，可实现24小时不间断滞空作业，无需频繁更换电池" },
    { icon: Cable, title: "稳定可靠", description: "系留线缆连接，不受无线干扰影响，定点悬停极其稳定" },
    { icon: Radio, title: "通信中继", description: "高空平台，有效延伸通信覆盖半径达50公里" },
    { icon: Eye, title: "广域监控", description: "高空视角，覆盖范围广，监控死角少，态势感知全面" },
  ];

  const advantages = [
    { icon: Clock, title: "24小时续航", description: "持续供电，无限续航能力", value: "24h" },
    { icon: Target, title: "定点悬停", description: "厘米级定位精度，稳定悬停", value: "±5cm" },
    { icon: Wifi, title: "50公里覆盖", description: "通信中继覆盖半径达50公里", value: "50km" },
    { icon: Shield, title: "8级抗风", description: "恶劣天气条件下稳定作业", value: "8级" },
  ];

  const scenarios = [
    {
      title: "应急通信",
      description: "灾害现场快速建立空中通信基站，恢复通信覆盖",
      detailDescription: "在地震、洪涝等自然灾害发生后，地面通信设施往往遭到破坏。系留无人机可在30分钟内快速部署，建立临时空中通信基站，恢复灾区通信覆盖。凭借24小时不间断滞空能力，可持续为救援工作提供通信保障，直至地面通信设施修复。",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
      icon: Radio,
      features: ["快速部署", "持续保障", "广域覆盖"],
      highlights: [
        { label: "部署时间", value: "<30分钟" },
        { label: "覆盖半径", value: "50km" },
        { label: "持续时间", value: "24小时" },
      ],
    },
    {
      title: "安保监控",
      description: "大型活动现场持续空中监控，全面掌握现场态势",
      detailDescription: "大型活动安保需要全面掌控现场态势。系留无人机搭载高清摄像头和热成像相机，在活动现场上空持续监控，实时回传高清画面。相比传统监控方式，视角更高、覆盖更广，可有效发现人群聚集、异常行为等安全隐患，为安保指挥提供决策支持。",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
      icon: Eye,
      features: ["全景监控", "人群分析", "实时预警"],
      highlights: [
        { label: "监控高度", value: "200m" },
        { label: "覆盖面积", value: "5km²" },
        { label: "图像分辨率", value: "4K" },
      ],
    },
    {
      title: "边境监视",
      description: "边境线持续监视巡逻，及时发现越境行为",
      detailDescription: "边境安全关系国家安全。系留无人机可在边境线上空长时间悬停监视，搭载红外热成像和可见光双光相机，24小时不间断监控边境动态。AI智能识别技术可自动发现越境人员和车辆，及时报警，有效提升边境管控能力。",
      image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=800&q=80",
      icon: Shield,
      features: ["全天候监视", "智能识别", "自动报警"],
      highlights: [
        { label: "监视距离", value: "10km" },
        { label: "识别准确率", value: "98%" },
        { label: "响应时间", value: "<3秒" },
      ],
    },
  ];

  const products = [
    { model: "TH-100", payload: "5kg", range: "100m", description: "轻量化系留平台，适合临时监控和快速部署", link: "/products/tethered/th-100" },
    { model: "TH-200", payload: "10kg", range: "200m", description: "中型系留平台，适合长期部署和多载荷任务", link: "/products/tethered/th-200" },
    { model: "TH-300", payload: "15kg", range: "300m", description: "重型系留平台，适合大型活动和边境监视", link: "/products/tethered/th-300" },
  ];

  return (
    <ApplicationPageTemplate
      seoTitle="系留应用 - 无人机系留平台解决方案"
      seoDescription="专业的系留无人机解决方案，提供24小时持续滞空、应急通信、安保监控等服务"
      seoKeywords="系留无人机,持续滞空,应急通信,安保监控,通信中继"
      heroTitle="系留应用解决方案"
      heroSubtitle="行业应用"
      heroDescription="系留无人机空中平台，24小时不间断持续作业能力。凭借系留供电技术，突破传统无人机续航限制，为应急通信、安保监控等场景提供可靠支持。"
      heroImage="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80"
      heroStats={[
        { value: "24小时", label: "持续滞空" },
        { value: "50km", label: "通信覆盖" },
        { value: "300m", label: "升空高度" },
      ]}
      introTitle="系留无人机概述"
      introDescription="系留无人机通过地面供电系统持续供电，突破传统无人机续航限制，实现24小时不间断作业"
      introImage="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80"
      introPoints={[
        "系留供电，24小时持续滞空能力",
        "定点悬停稳定，不受无线干扰影响",
        "高空平台，通信覆盖范围可达50公里",
        "支持多种载荷，满足不同任务需求",
      ]}
      advantages={advantages}
      features={features}
      scenarios={scenarios}
      products={products}
      ctaTitle="获取系留无人机解决方案"
      ctaDescription="飞迈科技为您提供专业的系留无人机解决方案，满足持续滞空作业需求"
      ctaProductLink="/products/tethered"
    />
  );
};

export default TetheredApp;
