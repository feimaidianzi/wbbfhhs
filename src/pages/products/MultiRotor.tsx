import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Camera, Settings, Shield, Cpu, Zap, Wind } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import su17Image from "@/assets/products/cani-rt17-research-drone.jpg";

const MultiRotor = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Camera, title: t('multiRotor.feature.multiPayload'), titleEn: "Multi-Payload Compatible", description: t('multiRotor.feature.multiPayload.desc'), descriptionEn: "Supports various professional payload devices" },
    { icon: Settings, title: t('multiRotor.feature.modular'), titleEn: "Modular Design", description: t('multiRotor.feature.modular.desc'), descriptionEn: "Quick replacement, flexible configuration" },
    { icon: Shield, title: t('multiRotor.feature.industrial'), titleEn: "Industrial Reliability", description: t('multiRotor.feature.industrial.desc'), descriptionEn: "Stable operation in harsh environments" },
    { icon: Cpu, title: t('multiRotor.feature.smartControl'), titleEn: "Smart Flight Control", description: t('multiRotor.feature.smartControl.desc'), descriptionEn: "Autonomous obstacle avoidance, smart routing" },
    { icon: Zap, title: t('multiRotor.feature.longEndurance'), titleEn: "Long Endurance", description: t('multiRotor.feature.longEndurance.desc'), descriptionEn: "Up to 55 minutes flight time" },
    { icon: Wind, title: t('multiRotor.feature.windResistant'), titleEn: "Wind Resistant", description: t('multiRotor.feature.windResistant.desc'), descriptionEn: "Stable in Level 7 winds" },
  ];

  const products = [
    // 科研无人机（置顶显示）
    { 
      name: "🔬 CANI RT17 科研无人机", 
      nameEn: "🔬 CANI RT17 Research UAV", 
      description: "【科研无人机】行业级品质科研平台，具备四目SLAM定位、激光雷达建图、路径规划导航避障等能力，支持Matlab/ROS二次开发", 
      descriptionEn: "【Research UAV】Industry-grade research platform with quad-camera SLAM, LiDAR mapping, path planning and obstacle avoidance, supports Matlab/ROS secondary development", 
      specs: ["轴距: 320mm", "起飞重量: 2.3kg", "续航时间: 16分钟", "机载计算机: Intel i5"], 
      specsEn: ["Wheelbase: 320mm", "Takeoff Weight: 2.3kg", "Flight Time: 16min", "Onboard Computer: Intel i5"], 
      image: su17Image, 
      link: "/products/multi-rotor/rt17",
      hot: true
    },
    // 工业多旋翼无人机
    { name: t('multiRotor.product.x650.name'), nameEn: "X650 Multi-Rotor Drone", description: t('multiRotor.product.x650.desc'), descriptionEn: "Compact industrial drone for daily inspection and data collection, highly portable, rapid deployment.", specs: ["轴距: 650mm", "最大载重: 2kg", "续航时间: 35分钟", "抗风等级: 5级"], specsEn: ["Wheelbase: 650mm", "Max Payload: 2kg", "Flight Time: 35min", "Wind Resistance: Level 5"], image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80", link: "/products/multi-rotor/x650" },
    { name: t('multiRotor.product.x850.name'), nameEn: "X850 Multi-Rotor Drone", description: t('multiRotor.product.x850.desc'), descriptionEn: "Medium industrial drone with stronger payload capacity and longer flight time for professional operations.", specs: ["轴距: 850mm", "最大载重: 5kg", "续航时间: 45分钟", "抗风等级: 6级"], specsEn: ["Wheelbase: 850mm", "Max Payload: 5kg", "Flight Time: 45min", "Wind Resistance: Level 6"], image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80", link: "/products/multi-rotor/x850" },
    { name: t('multiRotor.product.x1200.name'), nameEn: "X1200 Multi-Rotor Drone", description: t('multiRotor.product.x1200.desc'), descriptionEn: "Large industrial drone for heavy payloads and long-duration missions, ideal for professional applications.", specs: ["轴距: 1200mm", "最大载重: 10kg", "续航时间: 55分钟", "抗风等级: 7级"], specsEn: ["Wheelbase: 1200mm", "Max Payload: 10kg", "Flight Time: 55min", "Wind Resistance: Level 7"], image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=600&q=80", link: "/products/multi-rotor/x1200" },
    { name: t('multiRotor.product.x1600.name'), nameEn: "X1600 Multi-Rotor Drone", description: t('multiRotor.product.x1600.desc'), descriptionEn: "Extra-large industrial drone for special industry heavy payload needs, suitable for mapping, transport, etc.", specs: ["轴距: 1600mm", "最大载重: 20kg", "续航时间: 40分钟", "抗风等级: 6级"], specsEn: ["Wheelbase: 1600mm", "Max Payload: 20kg", "Flight Time: 40min", "Wind Resistance: Level 6"], image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80", link: "/products/multi-rotor/x1600" },
  ];

  const stats = [
    { value: "20kg", title: t('multiRotor.stat.maxPayload'), titleEn: "Max Payload", description: t('multiRotor.stat.maxPayload.desc'), descriptionEn: "Meet heavy load needs" },
    { value: "55min", title: t('multiRotor.stat.maxFlightTime'), titleEn: "Max Flight Time", description: t('multiRotor.stat.maxFlightTime.desc'), descriptionEn: "Extended operations" },
    { value: "7级", title: t('multiRotor.stat.windResistance'), titleEn: "Wind Resistance", description: t('multiRotor.stat.windResistance.desc'), descriptionEn: "Harsh weather ops" },
    { value: "10km", title: t('multiRotor.stat.controlRange'), titleEn: "Control Range", description: t('multiRotor.stat.controlRange.desc'), descriptionEn: "Long-range control" },
  ];

  const applications = [
    { title: t('multiRotor.app.powerInspection'), titleEn: "Power Inspection", description: t('multiRotor.app.powerInspection.desc'), descriptionEn: "Smart inspection of transmission lines, substations, etc." },
    { title: t('multiRotor.app.oilPipeline'), titleEn: "Oil & Gas Pipeline", description: t('multiRotor.app.oilPipeline.desc'), descriptionEn: "Daily patrol and leak detection for oil/gas pipelines" },
    { title: t('multiRotor.app.lawEnforcement'), titleEn: "Law Enforcement", description: t('multiRotor.app.lawEnforcement.desc'), descriptionEn: "Aerial reconnaissance, tracking, scene control" },
    { title: t('multiRotor.app.fireRescue'), titleEn: "Fire & Rescue", description: t('multiRotor.app.fireRescue.desc'), descriptionEn: "Fire reconnaissance, search & rescue, supply delivery" },
    { title: t('multiRotor.app.surveying'), titleEn: "Surveying & Mapping", description: t('multiRotor.app.surveying.desc'), descriptionEn: "Terrain mapping, 3D modeling, engineering survey" },
    { title: t('multiRotor.app.environmental'), titleEn: "Environmental Monitor", description: t('multiRotor.app.environmental.desc'), descriptionEn: "Air monitoring, water sampling, pollution tracking" },
    { title: t('multiRotor.app.agriculture'), titleEn: "Agriculture", description: t('multiRotor.app.agriculture.desc'), descriptionEn: "Crop monitoring, precision fertilization, pest control" },
    { title: t('multiRotor.app.emergencyComms'), titleEn: "Emergency Comms", description: t('multiRotor.app.emergencyComms.desc'), descriptionEn: "Temporary base station, signal relay coverage" },
  ];

  const techSpecs = [
    { label: t('multiRotor.spec.flightControl'), labelEn: "Flight Control", value: t('multiRotor.spec.flightControl.value'), valueEn: "Self-developed Industrial FC" },
    { label: t('multiRotor.spec.positioning'), labelEn: "Positioning", value: t('multiRotor.spec.positioning.value'), valueEn: "GPS + BeiDou + GLONASS" },
    { label: t('multiRotor.spec.obstacleAvoidance'), labelEn: "Obstacle Avoidance", value: t('multiRotor.spec.obstacleAvoidance.value'), valueEn: "6-directional Sensing" },
    { label: t('multiRotor.spec.videoTransmission'), labelEn: "Video Transmission", value: t('multiRotor.spec.videoTransmission.value'), valueEn: "1080P/4K Real-time Video" },
    { label: t('multiRotor.spec.videoRange'), labelEn: "Video Range", value: t('multiRotor.spec.videoRange.value'), valueEn: "≤10km" },
    { label: t('multiRotor.spec.operatingTemp'), labelEn: "Operating Temp", value: t('multiRotor.spec.operatingTemp.value'), valueEn: "-20°C ~ +50°C" },
    { label: t('multiRotor.spec.protection'), labelEn: "Protection", value: t('multiRotor.spec.protection.value'), valueEn: "IP54" },
    { label: t('multiRotor.spec.takeoffWeight'), labelEn: "Takeoff Weight", value: t('multiRotor.spec.takeoffWeight.value'), valueEn: "2-35kg (varies by model)" },
  ];

  const cases = [
    { title: t('multiRotor.case.southernPowerGrid'), titleEn: "China Southern Power Grid", description: t('multiRotor.case.southernPowerGrid.desc'), descriptionEn: "Deployed X850 drones for transmission line inspection, 5x efficiency improvement", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80" },
    { title: t('multiRotor.case.shenzhenPolice'), titleEn: "Shenzhen Police", description: t('multiRotor.case.shenzhenPolice.desc'), descriptionEn: "Equipped with multi-rotor platform for aerial patrol and emergency response", image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=600&q=80" },
    { title: t('multiRotor.case.naturalResources'), titleEn: "Natural Resources Survey", description: t('multiRotor.case.naturalResources.desc'), descriptionEn: "Used X1200 for large-scale terrain mapping with centimeter-level accuracy", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
  ];

  return (
    <ProductPageTemplate
      heroTitle={t('multiRotor.page.title')}
      heroTitleEn="Multi-Rotor Drone Platform"
      heroSubtitle={t('multiRotor.page.subtitle')}
      heroSubtitleEn="Industrial multi-rotor platform with modular design for various industries. From light to heavy-duty, providing optimal flight platforms for different missions"
      heroImage="https://images.unsplash.com/photo-1506947411487-a56738267384?w=1920&q=80"
      features={features}
      featuresTitle={t('multiRotor.page.featuresTitle')}
      featuresTitleEn="Platform Advantages"
      products={products}
      productsTitle={t('multiRotor.page.productsTitle')}
      productsTitleEn="Product Series"
      productsSubtitle="涵盖科研无人机与工业多旋翼全系列产品"
      productsSubtitleEn="Complete product line covering research UAV and industrial multi-rotor platforms"
      stats={stats}
      applications={applications}
      applicationsTitle={t('multiRotor.page.applicationsTitle')}
      applicationsTitleEn="Application Areas"
      techSpecs={techSpecs}
      cases={cases}
      seoCategory="multi-rotor"
      seoCategoryDescription={t('multiRotor.page.seoCategoryDescription')}
      seoCategoryDescriptionEn="CANI multi-rotor drone series including X650, X850, X1200, X1600 models with 2-20kg payload, 35-55 min flight time, suitable for power inspection, mapping, firefighting, and security applications."
      seoKeywords={t('multiRotor.page.seoKeywords').split(',')}
      seoKeywordsEn={[
        'multi-rotor drone', 'industrial drone', 'X650 drone', 'X850 drone', 'X1200 drone', 'X1600 drone',
        'power inspection drone', 'mapping drone', 'firefighting drone', 'security drone', 'heavy payload drone',
        'long endurance drone', 'professional drone platform', 'enterprise drone', 'drone manufacturer'
      ]}
    />
  );
};

export default MultiRotor;
