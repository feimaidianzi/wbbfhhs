import ApplicationPageTemplate from "@/components/ApplicationPageTemplate";
import { Leaf, Eye, BarChart, CloudRain, Droplets, Wind, Target, Thermometer } from "lucide-react";

const EnvironmentApp = () => {
  const features = [
    { icon: Eye, title: "全域监测", description: "对大气、水体、土壤等环境要素进行全方位立体监测" },
    { icon: BarChart, title: "数据分析", description: "智能数据处理分析，自动生成专业环境监测报告" },
    { icon: Leaf, title: "生态保护", description: "森林草原监测、野生动物保护、生态修复评估" },
    { icon: CloudRain, title: "污染溯源", description: "快速定位污染源头，追踪污染物扩散路径" },
  ];

  const advantages = [
    { icon: Target, title: "精准监测", description: "多传感器融合，数据精准可靠", value: "99%" },
    { icon: Eye, title: "广域覆盖", description: "单次飞行覆盖面积达数平方公里", value: "10km²" },
    { icon: Wind, title: "实时采样", description: "空中实时采集气体样本分析", value: "实时" },
    { icon: Thermometer, title: "多参数监测", description: "同时监测多种环境参数指标", value: "20+" },
  ];

  const scenarios = [
    {
      title: "大气环境监测",
      description: "搭载气体传感器监测PM2.5、SO2、NOx等大气污染物浓度分布",
      detailDescription: "大气污染防治是环境保护的重要任务。无人机搭载多光谱气体传感器，可在不同高度层采集大气样本，监测PM2.5、PM10、SO2、NOx、O3等污染物浓度。通过多点位采样和三维分布分析，绘制污染物空间分布图，为大气污染防治提供科学依据。",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      icon: Wind,
      features: ["多参数监测", "三维分布", "污染溯源"],
      highlights: [
        { label: "监测参数", value: "15种" },
        { label: "采样精度", value: "ppb级" },
        { label: "覆盖范围", value: "20km" },
      ],
    },
    {
      title: "水环境监测",
      description: "对河流、湖泊水质进行监测，发现排污口和水体污染",
      detailDescription: "水环境保护关系民生。无人机搭载多光谱相机和水质传感器，可对河流、湖泊进行大范围水质监测。通过光谱分析技术，可识别水体富营养化、藻类爆发等问题。红外热成像可发现隐蔽排污口，追踪污水排放源头，为水环境执法提供证据支持。",
      image: "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?w=800&q=80",
      icon: Droplets,
      features: ["水质监测", "排污发现", "藻类识别"],
      highlights: [
        { label: "监测河道", value: "100km" },
        { label: "排污识别", value: "98%" },
        { label: "水质参数", value: "10种" },
      ],
    },
    {
      title: "生态环境调查",
      description: "森林资源调查、湿地监测、生物多样性评估等生态应用",
      detailDescription: "生态保护需要全面了解生态系统状况。无人机搭载高分辨率相机和多光谱传感器，可进行大范围森林资源调查、湿地监测、野生动物栖息地评估等工作。AI识别技术可自动统计植被覆盖率、识别动物种类，为生态保护规划提供数据支撑。",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      icon: Leaf,
      features: ["森林调查", "湿地监测", "野生动物保护"],
      highlights: [
        { label: "调查面积", value: "1000km²" },
        { label: "物种识别", value: "200+" },
        { label: "准确率", value: "95%" },
      ],
    },
  ];

  const products = [
    { model: "X850", payload: "5kg", range: "45分钟", description: "环境监测专用平台，可搭载多种环境传感器", link: "/products/multi-rotor/x850" },
    { model: "X1200", payload: "10kg", range: "55分钟", description: "大载荷环境监测平台，支持多传感器同时搭载", link: "/products/multi-rotor/x1200" },
  ];

  return (
    <ApplicationPageTemplate
      seoTitle="环保应用 - 无人机环境监测解决方案"
      seoDescription="专业的无人机环保监测解决方案，提供大气监测、水环境监测、生态调查等服务"
      seoKeywords="环保无人机,大气监测,水环境监测,生态调查,污染溯源"
      heroTitle="环保监测解决方案"
      heroSubtitle="行业应用"
      heroDescription="无人机环境监测技术，守护绿水青山，助力生态文明建设。通过多传感器融合技术，实现大气、水体、生态环境的全方位监测。"
      heroImage="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80"
      heroStats={[
        { value: "99%", label: "监测精度" },
        { value: "20+", label: "监测参数" },
        { value: "1000km²", label: "覆盖范围" },
      ]}
      introTitle="无人机环保监测概述"
      introDescription="无人机技术为环境保护事业提供了全新的监测手段，大幅提升环境监测效率和覆盖范围"
      introImage="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
      introPoints={[
        "多传感器融合，全方位监测大气、水体、土壤",
        "智能数据分析，自动生成专业监测报告",
        "快速定位污染源，追踪污染物扩散路径",
        "大范围生态调查，评估生物多样性状况",
      ]}
      advantages={advantages}
      features={features}
      scenarios={scenarios}
      products={products}
      ctaTitle="获取环保监测解决方案"
      ctaDescription="飞迈科技为您提供专业的环保无人机解决方案，助力环境保护事业"
      ctaProductLink="/products/multi-rotor"
    />
  );
};

export default EnvironmentApp;
