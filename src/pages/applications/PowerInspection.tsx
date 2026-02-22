import ApplicationPageTemplate from "@/components/ApplicationPageTemplate";
import { Zap, Shield, Target, TrendingUp, AlertTriangle, Eye, Database, FileText, Map, Cpu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageFAQ } from "@/components/PageFAQ";
import { Helmet } from "react-helmet-async";

// 导入配图
import heroPowerGrid from "@/assets/power/hero-power-grid.jpg";
import uavInspection from "@/assets/power/uav-inspection.jpg";
import caseTransmissionInspection from "@/assets/power/case-transmission-inspection.jpg";
import caseSubstationInspection from "@/assets/power/case-substation-inspection.jpg";
import caseSolarInspection from "@/assets/power/case-solar-inspection.jpg";
import powerInspectionScene from "@/assets/seo/power-inspection-scene.jpg";
import powerInspectionFlight from "@/assets/seo/power-inspection-flight.jpg";

const PowerInspection = () => {
  const { t } = useLanguage();
  const features = [
    { icon: Zap, title: "效率提升20倍", description: "无人机巡线效率是传统人工的20倍以上，大幅缩短巡检周期" },
    { icon: Shield, title: "安全性强", description: "恶劣环境监测不需要人员靠近，降低人身安全风险" },
    { icon: Target, title: "精度高达95%", description: "AI智能识别技术，缺陷识别准确率高达95%以上" },
    { icon: TrendingUp, title: "成本降低", description: "可快速、多频次对输电线路进行空中巡视，降低运维成本" },
  ];

  const advantages = [
    { icon: Zap, title: "效率提升", description: "巡检效率是人工的20倍", value: "20倍" },
    { icon: Target, title: "识别精度", description: "AI缺陷识别准确率", value: "95%" },
    { icon: Shield, title: "安全作业", description: "零人员高空风险", value: "零风险" },
    { icon: TrendingUp, title: "成本节约", description: "相比传统方式", value: "降低60%" },
  ];

  const scenarios = [
    {
      title: "输电线路巡检",
      description: "对高压输电线路进行定期巡视，AI智能识别导线损伤、杆塔异常、绝缘子破损等缺陷",
      detailDescription: "无人机搭载高清摄像头和红外热成像相机，沿输电线路自动飞行，对导线、杆塔、绝缘子等关键部件进行全方位检测。AI智能识别系统可自动发现导线断股、绝缘子破损、金具锈蚀等各类缺陷，大幅提升巡检效率和准确性。",
      image: caseTransmissionInspection,
      icon: Zap,
      features: ["导线断股检测", "绝缘子破损识别", "杆塔倾斜监测"],
      highlights: [
        { label: "巡检效率", value: "提升20倍" },
        { label: "识别准确率", value: "95%" },
        { label: "覆盖距离", value: "50km/天" },
      ],
    },
    {
      title: "变电站巡检",
      description: "自动化巡检变电站设备，红外热成像检测设备过热隐患",
      detailDescription: "无人机在变电站上空自主飞行，对变压器、开关柜、断路器等设备进行可见光和红外热成像双光检测。可及时发现设备过热、油位异常、外观缺陷等问题，实现变电站智能化运维。",
      image: caseSubstationInspection,
      icon: Database,
      features: ["红外热成像", "设备状态检测", "自动巡航"],
      highlights: [
        { label: "检测覆盖", value: "100%" },
        { label: "隐患发现率", value: "提升80%" },
        { label: "巡检时间", value: "缩短90%" },
      ],
    },
    {
      title: "光伏电站巡检",
      description: "光伏电站组件检测，快速定位故障和热斑问题",
      detailDescription: "利用无人机搭载红外热成像相机，对大面积光伏电站进行快速扫描。AI系统自动识别热斑、隐裂、污损等问题组件，精准定位故障位置，为运维人员提供准确的维修指引。",
      image: caseSolarInspection,
      icon: Map,
      features: ["热斑检测", "组件隐裂识别", "故障定位"],
      highlights: [
        { label: "扫描速度", value: "1MW/分钟" },
        { label: "故障检出率", value: "98%" },
        { label: "成本节约", value: "70%" },
      ],
    },
  ];

  const products = [
    { model: "X850", payload: "5kg", range: "8km", description: "中型工业无人机，适合电力巡检作业", link: "/products/multi-rotor/x850" },
    { model: "X1200", payload: "10kg", range: "10km", description: "大型工业无人机，满足专业巡检需求", link: "/products/multi-rotor/x1200" },
    { model: "UHS-600", payload: "-", range: "-", description: "智能无人机机场，实现全自动巡检", link: "/products/airport/uhs-600" },
  ];

  const serviceJsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Service',
    name: 'UAV Powerline Inspection Solution',
    provider: { '@type': 'Organization', name: 'CaniUAV', url: 'https://www.caniuav.com' },
    description: 'Professional drone inspection solution for power grids using 640×512 radiometric thermal imaging and AI target identification to detect defects and vegetation risks.',
    areaServed: 'Global',
    serviceType: 'UAV Inspection',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Inspection Hardware',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'X850 Industrial UAV', url: 'https://www.caniuav.com/products/multi-rotor/x850' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'X1200 Industrial UAV', url: 'https://www.caniuav.com/products/multi-rotor/x1200' } },
      ],
    },
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      </Helmet>
      <ApplicationPageTemplate
        seoTitle={t('powerInspection.seo.title')}
        seoDescription={t('powerInspection.seo.description')}
        seoKeywords={t('powerInspection.seo.keywords')}
        seoPath="/applications/power-inspection"
        heroTitle="电力巡检解决方案"
        heroSubtitle="行业应用"
        heroDescription="电力巡检是指通过对电力设施的定期检查与维护，确保电力系统的安全、稳定运行。无人机在电力巡检中的应用，已经成为一种重要的技术手段。"
        heroImage={heroPowerGrid}
        heroStats={[
          { value: "20倍", label: "效率提升" },
          { value: "95%", label: "识别精度" },
          { value: "零风险", label: "高空作业" },
        ]}
        introTitle="无人机电力巡检概述"
        introDescription="随着电力设施的规模和复杂性不断增加，传统的人工巡检方式面临效率和安全性等方面的挑战"
        introImage={uavInspection}
        introPoints={[
          "突破地形限制，高效完成巡检任务",
          "AI智能识别，缺陷检出率大幅提升",
          "全天候作业，不受恶劣天气影响",
          "数据可追溯，建立电力设施健康档案",
        ]}
        advantages={advantages}
        features={features}
        scenarios={scenarios}
        products={products}
        ctaTitle="获取电力巡检解决方案"
        ctaDescription="长凌科技为您提供专业的电力巡检无人机解决方案"
        ctaProductLink="/products/multi-rotor"
        caseStudy={{
          title: t('powerInspection.caseStudy.title'),
          content: t('powerInspection.caseStudy.content'),
        }}
        relatedProducts={[
          { label: t('accessory.digitalFpv'), path: '/products/accessories/digital-fpv' },
          { label: t('accessory.gimbal'), path: '/products/accessories/gimbal' },
          { label: t('accessory.fc'), path: '/products/accessories/fc-esc' },
        ]}
        relatedApplications={[
          { label: t('app.firefighting'), path: '/applications/firefighting' },
          { label: t('app.environment'), path: '/solutions/industrial-uav-environmental-monitoring' },
          { label: t('app.tethered'), path: '/applications/tethered' },
        ]}
      >
        {/* GEO Anchor Text Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">{t('powerInspection.solution.title')}</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-muted-foreground leading-relaxed mb-4">{t('powerInspection.geo.anchor')}</p>
                <p className="text-muted-foreground leading-relaxed">{t('powerInspection.solution.content')}</p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-card">
                <img src={powerInspectionScene} alt="640x512-thermal-UAV-powerline-inspection-CaniUAV" className="w-full h-auto object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Case Study */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">{t('powerInspection.caseDetail.title')}</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="rounded-xl overflow-hidden shadow-card order-2 md:order-1">
                <img src={powerInspectionFlight} alt="BVLOS-UAV-power-inspection-flight-CaniUAV" className="w-full h-auto object-cover" loading="lazy" />
              </div>
              <div className="p-6 bg-card rounded-xl border border-border order-1 md:order-2">
                <p className="text-muted-foreground leading-relaxed">{t('powerInspection.caseDetail')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <PageFAQ
          titleKey="powerInspection.faq.title"
          items={[
            { questionKey: 'powerInspection.faq.q1', answerKey: 'powerInspection.faq.a1' },
            { questionKey: 'powerInspection.faq.q2', answerKey: 'powerInspection.faq.a2' },
            { questionKey: 'powerInspection.faq.q3', answerKey: 'powerInspection.faq.a3' },
          ]}
        />
      </ApplicationPageTemplate>
    </>
  );
};

export default PowerInspection;
