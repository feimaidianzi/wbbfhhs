import ApplicationPageTemplate from "@/components/ApplicationPageTemplate";
import { Shield, Eye, Zap, Radio, Target, UserSearch, Siren, Camera } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Police = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const features = [
    { icon: Shield, title: isEn ? "Security Patrol" : "治安巡逻", description: isEn ? "Aerial security patrol over key urban areas, 24/7 city protection" : "对城市重点区域进行空中治安巡逻监控，全天候守护城市安全" },
    { icon: Eye, title: isEn ? "Event Security" : "活动安保", description: isEn ? "Aerial security support during major events, real-time crowd monitoring" : "大型活动期间提供空中安保支持，实时监控人群动态" },
    { icon: Zap, title: isEn ? "Case Investigation" : "案件侦查", description: isEn ? "Assist case investigation and evidence collection, aerial reconnaissance and tracking" : "辅助案件侦查取证，提供空中侦察和目标追踪能力" },
    { icon: Radio, title: isEn ? "Emergency Response" : "应急处突", description: isEn ? "Rapid response to emergencies, aerial support and situational awareness" : "突发事件快速响应，提供空中支援和现场态势感知" },
  ];

  const advantages = [
    { icon: Zap, title: isEn ? "Quick Response" : "快速响应", description: isEn ? "Airborne within 5 minutes of alert" : "接警后5分钟内升空响应", value: isEn ? "5 min" : "5分钟" },
    { icon: Eye, title: isEn ? "HD Surveillance" : "高清监控", description: isEn ? "4K ultra-HD real-time video feed" : "4K超高清画面实时回传", value: "4K" },
    { icon: Target, title: isEn ? "Precision Tracking" : "精准追踪", description: isEn ? "AI intelligent target identification and tracking" : "AI智能识别目标追踪", value: isEn ? "AI ID" : "AI识别" },
    { icon: Radio, title: isEn ? "Remote Command" : "远程指挥", description: isEn ? "10km video transmission range" : "10公里图传距离支持", value: "10km" },
  ];

  const scenarios = [
    {
      title: isEn ? "Security Patrol" : "治安巡逻",
      description: isEn ? "Aerial patrol over key urban areas, 24/7 city protection" : "城市重点区域空中巡逻，全天候守护城市安全",
      detailDescription: isEn 
        ? "Comprehensive coverage of key urban areas is essential for city security. Police drones can conduct routine aerial patrols over commercial districts, residential areas, and transportation hubs. Equipped with HD cameras and AI recognition systems, they automatically detect suspicious individuals and abnormal behavior for timely response. Night patrols use infrared thermal imaging for 24/7 coverage."
        : "城市治安维护需要全面覆盖重点区域。警用无人机可对商业区、居民区、交通枢纽等重点区域进行常态化空中巡逻。搭载高清摄像头和AI识别系统，可自动发现可疑人员和异常行为，及时报警处置。夜间可使用红外热成像进行巡逻，实现24小时全天候覆盖。",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
      icon: Shield,
      features: isEn ? ["Routine Patrol", "AI Recognition", "Night Vision"] : ["常态化巡逻", "AI识别", "夜视能力"],
      highlights: [
        { label: isEn ? "Patrol Range" : "巡逻范围", value: "20km²" },
        { label: isEn ? "Recognition Rate" : "识别准确率", value: "98%" },
        { label: isEn ? "Response Time" : "响应时间", value: "<3min" },
      ],
    },
    {
      title: isEn ? "Event Security" : "活动安保",
      description: isEn ? "Aerial security during major events, real-time crowd monitoring" : "大型活动期间空中安保，实时监控人群动态",
      detailDescription: isEn
        ? "Major event security requires high responsibility. Drones provide continuous aerial monitoring with real-time HD video feed. AI systems automatically analyze crowd density, detecting congregation and crowding hazards. Combined with ground security, this creates an integrated air-ground security system for safe event operations."
        : "大型活动安保工作责任重大。无人机可在活动现场上空持续监控，实时回传高清画面。AI系统可自动分析人群密度，发现人员聚集、拥挤等安全隐患并预警。配合地面安保力量，形成空地一体化安保体系，有效保障活动安全进行。",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      icon: Eye,
      features: isEn ? ["Crowd Analysis", "Density Monitor", "Real-time Alert"] : ["人群分析", "密度监测", "实时预警"],
      highlights: [
        { label: isEn ? "Coverage Area" : "监控面积", value: "5km²" },
        { label: isEn ? "People Count" : "人员计数", value: isEn ? "10K+" : "万人级" },
        { label: isEn ? "Alert Accuracy" : "预警准确", value: "99%" },
      ],
    },
    {
      title: isEn ? "Case Investigation" : "案件侦查",
      description: isEn ? "Assist investigation and evidence collection, aerial target tracking" : "辅助案件侦查取证，空中追踪嫌疑目标",
      detailDescription: isEn
        ? "Case investigation requires rapid acquisition of scene information. Drones can conduct aerial surveys of crime scenes, obtaining comprehensive high-definition imagery. During pursuit operations, drones track suspect vehicles and individuals, transmitting real-time location data for coordinated ground interception. AI recognition automatically locks targets for enhanced tracking efficiency."
        : "案件侦查需要快速获取现场信息。无人机可对案发现场进行空中勘察，获取全局视角的高清影像资料。在追捕行动中，无人机可对嫌疑车辆和人员进行空中追踪，实时回传位置信息，配合地面警力实施围堵抓捕。AI识别可自动锁定目标，提升追踪效率。",
      image: "https://images.unsplash.com/photo-1453873531674-2151bcd01707?w=800&q=80",
      icon: UserSearch,
      features: isEn ? ["Scene Survey", "Target Tracking", "Evidence Capture"] : ["现场勘察", "目标追踪", "证据固定"],
      highlights: [
        { label: isEn ? "Track Distance" : "追踪距离", value: "10km" },
        { label: isEn ? "Flight Time" : "续航时间", value: "45min" },
        { label: isEn ? "Target Lock" : "目标锁定", value: isEn ? "Auto" : "自动" },
      ],
    },
    {
      title: isEn ? "Emergency Response" : "应急处突",
      description: isEn ? "Rapid response to emergencies, aerial support for scene handling" : "突发事件快速响应，空中支援现场处置",
      detailDescription: isEn
        ? "Emergency incident response requires rapid and accurate scene information. Drones can be airborne within 5 minutes of alert, providing immediate video feed to help command centers assess situations and make decisions. During operations, drones provide continuous aerial surveillance, detect fleeing suspects, and support ground forces in completing response tasks."
        : "突发事件处置需要快速准确的现场信息。无人机可在接警后5分钟内升空赶赴现场，第一时间回传现场画面，帮助指挥中心快速了解情况、科学决策。在处置过程中，无人机可持续提供空中监视，发现逃窜人员，配合地面力量完成处置任务。",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      icon: Siren,
      features: isEn ? ["Rapid Response", "Situational Awareness", "Coordinated Ops"] : ["快速响应", "态势感知", "协同处置"],
      highlights: [
        { label: isEn ? "Response Time" : "响应时间", value: "<5min" },
        { label: isEn ? "Video Delay" : "图传延迟", value: "<100ms" },
        { label: isEn ? "Coverage Radius" : "覆盖半径", value: "15km" },
      ],
    },
  ];

  const products = [
    { model: "X650", payload: "2kg", range: isEn ? "35 min" : "35分钟", description: isEn ? "Portable police drone for rapid response and daily patrol" : "便携式警用无人机，适合快速响应和日常巡逻", link: "/products/multi-rotor/x650" },
    { model: "X850", payload: "5kg", range: isEn ? "45 min" : "45分钟", description: isEn ? "Medium police drone, can carry loudspeaker and spotlight" : "中型警用无人机，可搭载喊话器、探照灯等设备", link: "/products/multi-rotor/x850" },
    { model: "TH-200", payload: "10kg", range: "200m", description: isEn ? "Tethered police platform for sustained monitoring at major events" : "系留警用平台，适合大型活动持续监控", link: "/products/tethered/th-200" },
  ];

  return (
    <ApplicationPageTemplate
      seoTitle={isEn ? "Police Applications - UAV Law Enforcement Solutions" : "警用应用 - 无人机警务解决方案"}
      seoDescription={isEn 
        ? "Professional police drone solutions for security patrol, event security, case investigation, and emergency response"
        : "专业的警用无人机解决方案，应用于治安巡逻、大型活动安保、案件侦查、应急处突等场景"}
      seoKeywords={isEn 
        ? "police drone,security patrol,event security,case investigation,emergency response"
        : "警用无人机,治安巡逻,活动安保,案件侦查,应急处突"}
      heroTitle={isEn ? "Police Solutions" : "警用解决方案"}
      heroSubtitle={isEn ? "Applications" : "行业应用"}
      heroDescription={isEn 
        ? "Police UAV platforms equipped with multiple sensors provide powerful aerial support for security patrol, event security, case investigation, and emergency response operations."
        : "警用无人机空中平台搭载多种传感器设备，为治安巡逻、活动安保、案件侦查、应急处突等警务工作提供强有力的空中支援能力。"}
      heroImage="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1920&q=80"
      heroStats={[
        { value: isEn ? "5 min" : "5分钟", label: isEn ? "Quick Response" : "快速响应" },
        { value: "98%", label: isEn ? "Recognition Rate" : "识别准确" },
        { value: "10km", label: isEn ? "Video Range" : "图传距离" },
      ]}
      introTitle={isEn ? "Police UAV Overview" : "警用无人机概述"}
      introDescription={isEn 
        ? "UAV technology provides new aerial support capabilities for police operations, significantly enhancing law enforcement efficiency"
        : "无人机技术为警务工作提供了全新的空中支援手段，大幅提升警务效能"}
      introImage="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80"
      introPoints={isEn 
        ? [
            "Aerial perspective with complete coverage, no blind spots",
            "AI intelligent recognition, automatic suspicious target detection",
            "Rapid deployment, airborne within 5 minutes of alert",
            "HD real-time video feed, supports remote command",
          ]
        : [
            "空中视角全面覆盖，无监控死角",
            "AI智能识别，自动发现可疑目标",
            "快速响应部署，接警5分钟内升空",
            "高清画面实时回传，支持远程指挥",
          ]}
      advantages={advantages}
      features={features}
      scenarios={scenarios}
      products={products}
      ctaTitle={isEn ? "Get Police Solutions" : "获取警用解决方案"}
      ctaDescription={isEn 
        ? "Contact our professional team for more information on police UAV applications"
        : "联系我们的专业团队，了解更多警用无人机应用详情"}
      ctaProductLink="/products/multi-rotor"
    />
  );
};

export default Police;
