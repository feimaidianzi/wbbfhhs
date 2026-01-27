import ApplicationPageTemplate from "@/components/ApplicationPageTemplate";
import { Shield, Eye, Zap, Radio, Target, UserSearch, Siren, Camera } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Police = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Shield, title: t('police.feature.patrol.title'), description: t('police.feature.patrol.desc') },
    { icon: Eye, title: t('police.feature.event.title'), description: t('police.feature.event.desc') },
    { icon: Zap, title: t('police.feature.case.title'), description: t('police.feature.case.desc') },
    { icon: Radio, title: t('police.feature.emergency.title'), description: t('police.feature.emergency.desc') },
  ];

  const advantages = [
    { icon: Zap, title: t('police.advantage.response.title'), description: t('police.advantage.response.desc'), value: t('police.advantage.response.value') },
    { icon: Eye, title: t('police.advantage.hd.title'), description: t('police.advantage.hd.desc'), value: "4K" },
    { icon: Target, title: t('police.advantage.tracking.title'), description: t('police.advantage.tracking.desc'), value: t('police.advantage.tracking.value') },
    { icon: Radio, title: t('police.advantage.command.title'), description: t('police.advantage.command.desc'), value: "10km" },
  ];

  const scenarios = [
    {
      title: t('police.feature.patrol.title'),
      description: t('police.feature.patrol.desc'),
      detailDescription: t('police.feature.patrol.desc'),
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
      icon: Shield,
      features: [t('police.feature.patrol.title'), "AI识别", "夜视能力"],
      highlights: [
        { label: "巡逻范围", value: "20km²" },
        { label: "识别准确率", value: "98%" },
        { label: "响应时间", value: "<3min" },
      ],
    },
    {
      title: t('police.feature.event.title'),
      description: t('police.feature.event.desc'),
      detailDescription: t('police.feature.event.desc'),
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      icon: Eye,
      features: ["人群分析", "密度监测", "实时预警"],
      highlights: [
        { label: "监控面积", value: "5km²" },
        { label: "人员计数", value: "万人级" },
        { label: "预警准确", value: "99%" },
      ],
    },
    {
      title: t('police.feature.case.title'),
      description: t('police.feature.case.desc'),
      detailDescription: t('police.feature.case.desc'),
      image: "https://images.unsplash.com/photo-1453873531674-2151bcd01707?w=800&q=80",
      icon: UserSearch,
      features: ["现场勘察", "目标追踪", "证据固定"],
      highlights: [
        { label: "追踪距离", value: "10km" },
        { label: "续航时间", value: "45min" },
        { label: "目标锁定", value: "自动" },
      ],
    },
    {
      title: t('police.feature.emergency.title'),
      description: t('police.feature.emergency.desc'),
      detailDescription: t('police.feature.emergency.desc'),
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      icon: Siren,
      features: ["快速响应", "态势感知", "协同处置"],
      highlights: [
        { label: "响应时间", value: "<5min" },
        { label: "图传延迟", value: "<100ms" },
        { label: "覆盖半径", value: "15km" },
      ],
    },
  ];

  const products = [
    { model: "X650", payload: "2kg", range: "35分钟", description: "便携式警用无人机，适合快速响应和日常巡逻", link: "/products/multi-rotor/x650" },
    { model: "X850", payload: "5kg", range: "45分钟", description: "中型警用无人机，可搭载喊话器、探照灯等设备", link: "/products/multi-rotor/x850" },
    { model: "TH-200", payload: "10kg", range: "200m", description: "系留警用平台，适合大型活动持续监控", link: "/products/tethered/th-200" },
  ];

  return (
    <ApplicationPageTemplate
      seoTitle={t('police.seo.title')}
      seoDescription={t('police.seo.description')}
      seoKeywords={t('police.seo.keywords')}
      heroTitle="警用解决方案"
      heroSubtitle="行业应用"
      heroDescription="警用无人机空中平台搭载多种传感器设备，为治安巡逻、活动安保、案件侦查、应急处突等警务工作提供强有力的空中支援能力。"
      heroImage="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1920&q=80"
      heroStats={[
        { value: t('police.advantage.response.value'), label: t('police.advantage.response.title') },
        { value: "98%", label: "识别准确" },
        { value: "10km", label: "图传距离" },
      ]}
      introTitle="警用无人机概述"
      introDescription="无人机技术为警务工作提供了全新的空中支援手段，大幅提升警务效能"
      introImage="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80"
      introPoints={[
        "空中视角全面覆盖，无监控死角",
        "AI智能识别，自动发现可疑目标",
        "快速响应部署，接警5分钟内升空",
        "高清画面实时回传，支持远程指挥",
      ]}
      advantages={advantages}
      features={features}
      scenarios={scenarios}
      products={products}
      ctaTitle="获取警用解决方案"
      ctaDescription="联系我们的专业团队，了解更多警用无人机应用详情"
      ctaProductLink="/products/multi-rotor"
    />
  );
};

export default Police;