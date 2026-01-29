import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Camera, Settings, Shield, Cpu, Zap, Wind, Plane, Rocket, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { researchDronePlatforms, basicFlightPlatforms, swarmFormationKits } from "@/data/amovlabProducts";

const MultiRotor = () => {
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  const features = [
    { icon: Camera, title: t('multiRotor.feature.multiPayload'), titleEn: "Multi-Payload Compatible", description: t('multiRotor.feature.multiPayload.desc'), descriptionEn: "Supports various professional payload devices" },
    { icon: Settings, title: t('multiRotor.feature.modular'), titleEn: "Modular Design", description: t('multiRotor.feature.modular.desc'), descriptionEn: "Quick replacement, flexible configuration" },
    { icon: Shield, title: t('multiRotor.feature.industrial'), titleEn: "Industrial Reliability", description: t('multiRotor.feature.industrial.desc'), descriptionEn: "Stable operation in harsh environments" },
    { icon: Cpu, title: t('multiRotor.feature.smartControl'), titleEn: "Smart Flight Control", description: t('multiRotor.feature.smartControl.desc'), descriptionEn: "Autonomous obstacle avoidance, smart routing" },
    { icon: Zap, title: t('multiRotor.feature.longEndurance'), titleEn: "Long Endurance", description: t('multiRotor.feature.longEndurance.desc'), descriptionEn: "Up to 55 minutes flight time" },
    { icon: Wind, title: t('multiRotor.feature.windResistant'), titleEn: "Wind Resistant", description: t('multiRotor.feature.windResistant.desc'), descriptionEn: "Stable in Level 7 winds" },
  ];

  // 工业多旋翼产品
  const industrialProducts = [
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

  // 子分类数据
  const subCategories = [
    {
      id: 'research',
      icon: Plane,
      title: isEn ? 'Research UAV Platforms' : '科研无人机开发平台',
      description: isEn ? 'High-performance research UAVs with ROS support for algorithm validation and education' : '高性能科研无人机，支持ROS开发，适用于算法验证和科研教学',
      products: researchDronePlatforms.slice(0, 4),
      link: '/products/amovlab/research-drones'
    },
    {
      id: 'basic',
      icon: Rocket,
      title: isEn ? 'Basic Flight Platforms' : '基础飞行平台',
      description: isEn ? 'Entry-level flight platforms for training and basic development' : '入门级飞行平台，适合飞行训练和基础开发',
      products: basicFlightPlatforms,
      link: '/products/amovlab/basic-platforms'
    },
    {
      id: 'swarm',
      icon: Users,
      title: isEn ? 'Swarm Formation Dev Kits' : '集群编队开发套件',
      description: isEn ? 'Multi-UAV cooperative formation development platform for swarm algorithm research' : '多机协同编队开发平台，支持集群算法研究',
      products: swarmFormationKits,
      link: '/products/amovlab/swarm-formation-kits'
    }
  ];

  return (
    <>
      <ProductPageTemplate
        heroTitle={t('multiRotor.page.title')}
        heroTitleEn="Multi-Rotor Drone Platform"
        heroSubtitle={t('multiRotor.page.subtitle')}
        heroSubtitleEn="Industrial multi-rotor platform with modular design for various industries. From light to heavy-duty, providing optimal flight platforms for different missions"
        heroImage="https://images.unsplash.com/photo-1506947411487-a56738267384?w=1920&q=80"
        features={features}
        featuresTitle={t('multiRotor.page.featuresTitle')}
        featuresTitleEn="Platform Advantages"
        products={industrialProducts}
        productsTitle={t('multiRotor.page.productsTitle')}
        productsTitleEn="Industrial Product Series"
        productsSubtitle={t('multiRotor.page.productsSubtitle')}
        productsSubtitleEn="From light to heavy-duty, CANI multi-rotor platforms cover all size requirements"
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
      
      {/* 长凌科研产品子分类 */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {isEn ? 'Changling Research Platforms' : '长凌科研平台'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isEn ? 'Professional research UAV platforms and development kits for academic and R&D applications' : '专业科研无人机平台与开发套件，适用于学术研究和产品开发'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subCategories.map((cat) => (
              <Link
                key={cat.id}
                to={cat.link}
                className="group bg-card rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <cat.icon className="w-6 h-6 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{cat.title}</h3>
                    <span className="text-sm text-muted-foreground">{cat.products.length} {isEn ? 'products' : '款产品'}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{cat.description}</p>
                <div className="flex gap-2">
                  {cat.products.slice(0, 3).map((product) => (
                    <div key={product.id} className="w-14 h-14 rounded-lg overflow-hidden bg-muted">
                      <img src={product.image} alt={isEn ? product.nameEn : product.name} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {cat.products.length > 3 && (
                    <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground">
                      +{cat.products.length - 3}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MultiRotor;
