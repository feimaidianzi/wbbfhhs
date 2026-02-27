import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { BackButton } from "@/components/BackButton";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { Button } from "@/components/ui/button";
import { LangLink } from "@/components/LangLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  ArrowRight, Mail, Phone, CheckCircle, Radio, Wifi, Zap, Shield, 
  Signal, Network, MapPin, Building, TreePine, Camera, Home, 
  MonitorSmartphone, Cpu, Gauge, Flame, Eye, BatteryCharging,
  Waves, ImageIcon, Activity, Antenna, Usb, Power, Settings,
  Satellite, Factory, Palmtree, Ship, AlertTriangle
} from "lucide-react";

// Import clean images
import meshLinkAntenna from "@/assets/products/mesh-link-antenna.webp";
import meshLinkPcbBg from "@/assets/products/mesh-link-pcb-bg.webp";
import MeshLinkInterfaceDiagram from "@/components/products/MeshLinkInterfaceDiagram";

const MeshLink = () => {
  const { t, baseLang } = useLanguage();
  const isZh = baseLang === 'zh';

  // ── Hero Stats ──
  const heroStats = [
    { value: '17km', label: isZh ? '实测传输距离' : 'Tested Range' },
    { value: '30Mbps', label: isZh ? '峰值传输速率' : 'Peak Data Rate' },
    { value: '15ms', label: isZh ? '端到端时延' : 'E2E Latency' },
    { value: '<3.5W', label: isZh ? '整机功耗' : 'Power Draw' },
  ];

  // ── Five Advantages ──
  const advantages = [
    { icon: Cpu, title: isZh ? 'SDR SoC 芯片' : 'SDR SoC Chip', desc: isZh ? '使用可控的SDR SoC芯片，支持230MHz~6GHz宽频带' : 'Controllable SDR SoC chip, 230MHz~6GHz wideband support' },
    { icon: Waves, title: isZh ? '230MHz~6GHz宽频带' : '230MHz~6GHz Wideband', desc: isZh ? '覆盖800M/1.4G/2.4G多频段，适应不同场景需求' : 'Coverage across 800M/1.4G/2.4G bands for diverse scenarios' },
    { icon: Gauge, title: isZh ? '100Mbps峰值速率' : '100Mbps Peak Rate', desc: isZh ? '最高100Mbps峰值速率，满足高清视频实时传输需求' : 'Up to 100Mbps peak rate for real-time HD video transmission' },
    { icon: Activity, title: isZh ? '快跳频抗干扰' : 'FHSS Anti-Interference', desc: isZh ? '支持快跳频技术，在复杂电磁环境下稳定通信' : 'Fast frequency hopping for stable comms in complex EMI environments' },
    { icon: Satellite, title: isZh ? '最远150公里传输' : '150km Max Range', desc: isZh ? '理论最远传输距离可达150公里，实测17公里稳定传输' : 'Theoretical max 150km, tested stable 17km transmission' },
  ];

  // ── Key Features ──
  const keyFeatures = [
    { icon: Signal, title: isZh ? '超远距离' : 'Ultra-Long Range', desc: isZh ? '地对空17公里360°无线传输，穿透4层楼板' : 'Ground-to-air 17km 360° wireless, penetrates 4 floors' },
    { icon: Shield, title: isZh ? '超强穿透' : 'Superior Penetration', desc: isZh ? '低频段具有极强的穿透和绕射能力，复杂环境下稳定通信' : 'Low-frequency bands provide strong penetration & diffraction' },
    { icon: Network, title: isZh ? 'Mesh自组网' : 'Mesh Networking', desc: isZh ? '支持1对1、1对16、Mesh多点对多点拓扑结构' : '1-to-1, 1-to-16, Mesh multi-point topology support' },
    { icon: Radio, title: isZh ? '三频段可选' : 'Tri-Band Options', desc: isZh ? '800M/1.4G/2.4G三频段可选，满足不同法规和应用需求' : '800M/1.4G/2.4G selectable for compliance & scenarios' },
    { icon: Zap, title: isZh ? '超低功耗' : 'Ultra-Low Power', desc: isZh ? '整机功耗小于3.5W，支持DC7-24V宽电压输入' : 'Under 3.5W total, DC7-24V wide voltage input' },
    { icon: Settings, title: isZh ? 'WEB配置管理' : 'Web-Based Config', desc: isZh ? '支持WEB页面配置管理，15秒快速启动建链' : 'Web-based management, 15s boot-to-link' },
  ];

  // ── Application Scenarios ──
  const serviceAreas = [
    { icon: MonitorSmartphone, label: isZh ? '无人机图像/数据传输' : 'UAV Image/Data Link', desc: isZh ? '支持1080P高清视频实时回传' : 'Real-time 1080P HD video relay' },
    { icon: Flame, label: isZh ? '消防/安保应急通信' : 'Fire/Security Comms', desc: isZh ? '快速部署临时通信网络' : 'Rapid deployment of ad-hoc network' },
    { icon: Eye, label: isZh ? '无线安防监控' : 'Wireless Surveillance', desc: isZh ? '替代有线，降低施工成本' : 'Replace wired solutions, reduce costs' },
    { icon: BatteryCharging, label: isZh ? '电/水务巡检观测' : 'Power/Water Inspection', desc: isZh ? '远距离数据无线回传' : 'Long-range wireless data relay' },
  ];

  // ── Extended Applications ──
  const applications = [
    { icon: TreePine, label: isZh ? '农林渔业' : 'Agriculture' },
    { icon: Building, label: isZh ? '建筑工地' : 'Construction' },
    { icon: AlertTriangle, label: isZh ? '应急指挥' : 'Emergency' },
    { icon: Palmtree, label: isZh ? '景区公园' : 'Scenic Areas' },
    { icon: Home, label: isZh ? '住宅小区' : 'Residential' },
    { icon: Camera, label: isZh ? '安防监控' : 'Security' },
    { icon: MonitorSmartphone, label: isZh ? '无人机/机器人' : 'UAV/Robotics' },
    { icon: Network, label: isZh ? 'Mesh组网' : 'Mesh Network' },
  ];

  // ── Frequency Bands ──
  const frequencyBands = [
    { band: "800M", range: "806-826MHz", desc: isZh ? '超强穿透，城区/山地首选' : 'Superior penetration, ideal for urban/mountainous' },
    { band: "1.4G", range: "1427.9-1447.9MHz", desc: isZh ? '均衡性能，通用型频段' : 'Balanced performance, versatile band' },
    { band: "2.4G", range: "2401.5-2481.5MHz", desc: isZh ? '高速传输，开阔地带首选' : 'High speed, ideal for open areas' },
  ];

  // ── HQL010P Module Points ──
  const modulePoints = [
    isZh ? '数据传输距离最远可达17公里' : 'Data transmission range up to 17km',
    isZh ? '提供最高30Mbps的无线传输速率' : 'Up to 30Mbps wireless data rate',
    isZh ? '支持点对点、点对多点等多种拓扑结构' : 'P2P, P2MP, and multi-point topology support',
    isZh ? '工作在800M~2.6G频段，低频时具有强劲的穿透及绕射能力' : '800M~2.6G bands with superior low-freq penetration & diffraction',
    isZh ? '适用于无人机、安防监控、智慧城市、机器人、特种通信等领域' : 'For UAV, surveillance, smart city, robotics, tactical comms & more',
  ];

  // ── Comm Interfaces ──
  const commInterfaces = [
    { name: 'USB', icon: Usb },
    { name: isZh ? 'AP控制' : 'AP Control', icon: Settings },
    { name: isZh ? '调试串口' : 'Debug UART', icon: Cpu },
    { name: isZh ? '数传串口' : 'Data UART', icon: Activity },
    { name: isZh ? 'DC座 (7-24V)' : 'DC Jack (7-24V)', icon: Power },
    { name: isZh ? '网口×3 (RJ45)' : 'ETH×3 (RJ45)', icon: Network },
    { name: isZh ? '主天线 (SMA)' : 'Main Antenna (SMA)', icon: Antenna },
    { name: isZh ? '辅天线 (SMA)' : 'Aux Antenna (SMA)', icon: Antenna },
  ];

  // ── Case Studies ──
  const caseStudies = [
    {
      title: isZh ? '工地无线视频监控' : 'Construction Site Surveillance',
      icon: Building,
      highlight: isZh ? '2套星型组网，共28路监控' : '2 Star Networks, 28 Cameras',
      details: [
        isZh ? '使用2套星型组网系统，每套1V14' : '2 star topology systems, 1-to-14 each',
        isZh ? '共计28个监控设备覆盖整个工地' : '28 cameras covering entire construction site',
        isZh ? '出入大门、打桩机、全景图多角度监控' : 'Gate, pile driver, panoramic multi-angle monitoring',
      ],
    },
    {
      title: isZh ? '海岛监控' : 'Island Monitoring',
      icon: Ship,
      isHighlighted: true,
      highlight: isZh ? '实测22公里跨海传输' : '22km Cross-Sea Tested',
      environment: [
        isZh ? '地点：山东烟台，半弧形海湾' : 'Location: Yantai, Shandong - Crescent Bay',
        isZh ? '发送端：放在汽车后备箱位置，高1.5米' : 'TX: Car trunk height, 1.5m',
        isZh ? '接收端：架在小岛的亭子里，高55米' : 'RX: Island pavilion, 55m height',
        isZh ? '距离：发送端和接收端可视，距离22公里' : 'Distance: Line-of-sight, 22km',
      ],
      equipment: [
        isZh ? '一对2W图传模块' : '1 pair of 2W video TX modules',
        isZh ? '发送端1.4GHz全向天线，增益2dBi' : 'TX: 1.4GHz omni antenna, 2dBi gain',
        isZh ? '接收端1.4GHz定向天线，增益9dBi' : 'RX: 1.4GHz directional antenna, 9dBi gain',
        isZh ? '频段1.4GHz，带宽10MHz，上下行10Mbps/1Mbps' : '1.4GHz, 10MHz BW, 10Mbps/1Mbps UL/DL',
      ],
      result: isZh ? '发送端连接Camera，在接收端实时接收视频图像，视频图传播放流畅' : 'Camera connected to TX, real-time video at RX, smooth playback',
    },
    {
      title: isZh ? '雪亮农村' : 'Smart Village Monitoring',
      icon: Home,
      highlight: isZh ? '全村无线覆盖，太阳能供电' : 'Full Village Coverage, Solar Powered',
      details: [
        isZh ? '郑家镇张部村全域无线监控部署' : 'Full wireless surveillance deployment in Zhang Village',
        isZh ? '多节点组网覆盖500米×480米范围' : 'Multi-node mesh covering 500m×480m area',
        isZh ? '太阳能供电，无需布线施工' : 'Solar-powered, zero cabling required',
      ],
    },
    {
      title: isZh ? '智慧园区' : 'Smart Industrial Park',
      icon: Factory,
      highlight: isZh ? '800M频段，6节点组网' : '800M Band, 6-Node Mesh',
      details: [
        isZh ? '频段800M，配置20MHz+25dBm' : '800M band, 20MHz+25dBm config',
        isZh ? '1080P 2Mbps主码流 (384kbps子码流)' : '1080P 2Mbps main stream (384kbps sub)',
        isZh ? '组网1对6，A/B/C/D/E/F六个点视频实时传输流畅' : '1-to-6 mesh, 6 points real-time smooth video',
      ],
    },
  ];

  // ── Specs Table ──
  const specs = [
    { category: isZh ? '射频' : 'RF', items: [
      { label: isZh ? '频率' : 'Frequency', value: '806-826MHz; 1427.9-1447.9MHz; 2401.5-2481.5MHz' },
      { label: isZh ? '发射功率' : 'TX Power', value: '2.4G/1.4G/800M 20-25dBm ±2dBm' },
      { label: isZh ? '灵敏度' : 'Sensitivity', value: '2.4G: 10Mbps -102dBm; 5MHz -104dBm; 3MHz -106dBm\n1.4G: 10Mbps -103dBm; 5MHz -106dBm; 3MHz -108dBm\n800M: 10Mbps -103dBm; 5MHz -106dBm; 3MHz -108dBm' },
    ]},
    { category: isZh ? '接口' : 'Interface', items: [
      { label: isZh ? '以太网口' : 'Ethernet', value: 'RJ45 ×3' },
      { label: 'UART', value: 'UART(Data) ×1; UART(Config) ×1' },
      { label: 'USB', value: 'USB ×1' },
    ]},
    { category: isZh ? '电源' : 'Power', items: [
      { label: isZh ? '电源输入' : 'Power Input', value: 'DC12V (7-24V) 1.0A' },
      { label: isZh ? '最大峰值功率' : 'Max Power', value: '< 3.5W' },
    ]},
    { category: isZh ? '传输模式' : 'Transmission', items: [
      { label: isZh ? '天线' : 'Antenna', value: isZh ? '双天线：主天线收发模式，辅助天线接收模式（1.5dBi/5dBi/7dBi；全向，方向可选）' : 'Dual antenna: Main TX/RX, Aux RX (1.5/5/7dBi; Omni/Directional)' },
      { label: isZh ? '信道带宽' : 'Channel BW', value: '1.4MHz / 3MHz / 5MHz / 10MHz / 20MHz' },
      { label: isZh ? '速率' : 'Data Rate', value: isZh ? '速率可配置/支持高达30Mbps' : 'Configurable, up to 30Mbps' },
      { label: isZh ? '距离' : 'Range', value: isZh ? '800m-17km，无人机实测最远传输17km/1080P图像' : '800m-17km, UAV tested max 17km/1080P' },
    ]},
    { category: isZh ? '时延' : 'Latency', items: [
      { label: isZh ? '数据传输时延' : 'Data Latency', value: isZh ? '空口延迟≈15ms' : 'Air interface ≈15ms' },
      { label: isZh ? '开机时延' : 'Boot Time', value: isZh ? '<15s 上电-建链完成' : '<15s power-on to link' },
    ]},
    { category: isZh ? '命令接口' : 'Config', items: [
      { label: isZh ? 'WEB配置' : 'Web Config', value: isZh ? '支持WEB页面配置管理' : 'Web-based config management' },
    ]},
    { category: isZh ? '温度范围' : 'Temperature', items: [
      { label: isZh ? '存储温度' : 'Storage', value: '-40°C ~ +85°C' },
      { label: isZh ? '工作温度' : 'Operating', value: '-20°C ~ +75°C' },
    ]},
    { category: isZh ? '湿度' : 'Humidity', items: [
      { label: isZh ? '存储湿度' : 'Humidity', value: '5% ~ 95%' },
    ]},
    { category: isZh ? '尺寸/重量' : 'Size/Weight', items: [
      { label: isZh ? '尺寸/重量' : 'Dimensions', value: '75mm × 50mm, 35g' },
    ]},
  ];

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={isZh ? 'CANI-Link Pro 无线自组网模块 | 17km传输 30Mbps Mesh组网' : 'CANI-Link Pro Wireless Mesh Module | 17km Range 30Mbps'}
        description={isZh ? 'CANI-Link Pro (HQL010P) 工业级无线自组网图传模块，支持800M/1.4G/2.4G三频段，17km实测传输，30Mbps速率，Mesh组网拓扑。适用于无人机、安防监控、智慧城市等场景。' : 'CANI-Link Pro industrial wireless mesh module. 800M/1.4G/2.4G tri-band, 17km tested range, 30Mbps data rate. For UAV, surveillance, and smart city applications.'}
        keywords={isZh ? 'CANI-Link Pro,无线自组网,Mesh组网,图传模块,17km传输,30Mbps,800M,1.4G,2.4G,无人机图传,安防监控' : 'CANI-Link Pro,wireless mesh,ad-hoc network,video transmitter,17km range,30Mbps,UAV link,surveillance'}
        path="/products/accessories/mesh-link"
        type="product"
      />
      <Header />
      <FloatingContact />
      <BackButton to="/products/accessories" label={isZh ? '返回配件中心' : 'Back to Accessories'} />

      <main>
        {/* ═══ HERO — Dark Tech ═══ */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Deep dark background with PCB texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,30%,8%)] via-[hsl(210,25%,10%)] to-[hsl(200,20%,6%)]" />
          <div className="absolute inset-0 bg-dots opacity-10" />
          {/* Glow accents */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-neon-purple/5 rounded-full blur-[100px]" />

          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
                  <LangLink to="/" className="hover:text-white/80 transition-colors">{isZh ? '首页' : 'Home'}</LangLink>
                  <span>/</span>
                  <LangLink to="/products/accessories" className="hover:text-white/80 transition-colors">{isZh ? '配件中心' : 'Accessories'}</LangLink>
                  <span>/</span>
                  <span className="text-white/90">CANI-Link Pro</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-4 tracking-wider uppercase">
                  <Radio className="w-3 h-3" />
                  {isZh ? '无线自组网模块' : 'Wireless Mesh Module'}
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight tracking-tight">
                  CANI-Link Pro
                </h1>
                <p className="text-xl md:text-2xl font-semibold mb-2" style={{ color: 'hsl(213, 94%, 60%)' }}>
                  {isZh ? '图数传一体无线链路主板' : 'Integrated Video & Data Wireless Link'}
                </p>
                <p className="text-white/60 text-lg mb-8 leading-relaxed max-w-xl">
                  {isZh 
                    ? '基于SDR SoC架构，支持800M~2.6G宽频段自组网通信。地对空实测17公里稳定传输1080P高清视频，整机功耗<3.5W。' 
                    : 'SDR SoC-based architecture, 800M~2.6G wideband mesh networking. Tested 17km ground-to-air stable 1080P HD transmission, <3.5W total power.'}
                </p>

                {/* Hero stat boxes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  {heroStats.map((s, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
                      <div className="text-xl md:text-2xl font-bold" style={{ color: 'hsl(213, 94%, 60%)' }}>{s.value}</div>
                      <div className="text-white/50 text-xs mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <LangLink to="/contact">
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-lg shadow-accent/20 group">
                      {isZh ? '获取报价' : 'Get Quote'}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </LangLink>
                  <Button size="lg" className="bg-white/10 text-white border border-white/20 hover:bg-white/15 font-bold backdrop-blur-sm">
                    <Phone className="mr-2 h-4 w-4" />
                    {isZh ? '联系我们' : 'Contact Us'}
                  </Button>
                </div>
              </div>

              <div className="flex justify-center relative">
                <div className="absolute inset-0 bg-accent/5 rounded-3xl blur-[60px]" />
                <img 
                  src={meshLinkAntenna} 
                  alt="CANI-Link Pro Wireless Mesh Module with dual SMA antennas" 
                  className="relative max-w-sm w-full rounded-2xl" 
                  loading="eager" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Five Advantages — Dark Section ═══ */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,30%,8%)] to-[hsl(210,25%,12%)]" />
          <div className="absolute inset-0">
            <img src={meshLinkPcbBg} alt="" className="w-full h-full object-cover opacity-15" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,30%,8%)]/80 to-[hsl(210,25%,12%)]/90" />
          </div>

          <div className="container-custom relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {isZh ? '自组网模块五大优势' : 'Five Core Advantages'}
              </h2>
              <p className="text-white/40 text-sm tracking-[0.3em] uppercase">MULTI ANGLE DISPLAY</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
              {advantages.map((a, i) => (
                <div key={i} className="flex flex-col items-center text-center bg-white/5 border border-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 hover:border-accent/30 transition-all group">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 border border-accent/30 bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <a.icon className="h-7 w-7" style={{ color: 'hsl(213, 94%, 60%)' }} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{a.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Key Features — 6 Grid ═══ */}
        <section className="py-20 bg-muted">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
              {isZh ? '核心技术特性' : 'Core Technical Features'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {keyFeatures.map((f, i) => (
                <div key={i} className="bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all border border-border/30">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <f.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-card-foreground">{f.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Frequency Variants ═══ */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              {isZh ? '频段变体' : 'Frequency Band Options'}
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              {isZh ? '提供三频段版本和1.4G单频版本，满足不同法规和应用场景需求' : 'Tri-band and 1.4G single-band versions for diverse regulatory and scenario needs'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Tri-band card */}
              <div className="bg-card rounded-2xl shadow-card overflow-hidden border border-border/30">
                <div className="bg-primary/5 p-6 border-b border-border/30">
                  <h3 className="text-2xl font-bold text-foreground mb-1">800M / 1.4G / 2.4G</h3>
                  <p className="text-sm text-muted-foreground">{isZh ? '三频段版本' : 'Tri-Band Version'}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {frequencyBands.map((fb, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold text-foreground">{fb.band}</span>
                          <span className="text-accent ml-2 text-sm font-mono">{fb.range}</span>
                          <p className="text-muted-foreground text-xs mt-0.5">{fb.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Single-band card */}
              <div className="bg-card rounded-2xl shadow-card overflow-hidden border border-border/30">
                <div className="bg-primary/5 p-6 border-b border-border/30">
                  <h3 className="text-2xl font-bold text-foreground mb-1">1.4G</h3>
                  <p className="text-sm text-muted-foreground">{isZh ? '单频段版本' : 'Single-Band Version'}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                      <div>
                        <span className="font-bold text-foreground">1420-1530MHz</span>
                        <p className="text-muted-foreground text-xs mt-0.5">{isZh ? '1.4G单频，100M带宽' : '1.4G single-band, 100M bandwidth'}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-muted-foreground text-sm">{isZh ? '适合对穿透性和稳定性有较高要求的场景' : 'Ideal for high penetration and stability requirements'}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CANI-Link Pro Core Module ═══ */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,30%,8%)] to-[hsl(210,25%,12%)]" />
          <div className="container-custom relative z-10">
            <div className="flex items-center gap-3 mb-2 justify-center">
              <div className="w-1 h-8 bg-accent rounded-full" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">CANI-Link Pro</h2>
            </div>
            <p className="text-center mb-12" style={{ color: 'hsl(0, 80%, 55%)' }}>
              <span className="text-lg font-semibold">{isZh ? '图数传一体无线链路主板' : 'Integrated Video & Data Wireless Link Board'}</span>
            </p>

            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                {modulePoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-accent shrink-0" />
                    <span className="text-white/80 text-base leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ═══ Communication Interfaces — Code-Based Diagram ═══ */}
        <section className="py-20 bg-muted">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-2 justify-center">
              <div className="w-1 h-8 bg-accent rounded-full" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {isZh ? '多种通讯接口' : 'Multiple Communication Interfaces'}
              </h2>
            </div>
            <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              {isZh 
                ? '支持UART、以太网×3、USB、Data串口（TTL、RS232可选）等多种数据通信接口' 
                : 'UART, Ethernet×3, USB, Data serial (TTL/RS232 selectable) and more data interfaces'}
            </p>

            {/* Code-based interactive diagram */}
            <MeshLinkInterfaceDiagram lang={baseLang} />

            {/* Interface grid for mobile-friendly list */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mt-10">
              {commInterfaces.map((iface, i) => (
                <div key={i} className="flex items-center gap-2 bg-card p-3 rounded-lg border border-border/30">
                  <iface.icon className="w-4 h-4 text-accent shrink-0" />
                  <span className="font-medium text-foreground text-xs sm:text-sm">{iface.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Application Scenarios — Grid with Icons ═══ */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              {isZh ? '产品和服务应用领域' : 'Product & Service Application Areas'}
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-12 uppercase tracking-widest">PRODUCT AND SERVICE AREAS</p>

            {/* Main 4 service areas with descriptions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
              {serviceAreas.map((area, i) => (
                <div key={i} className="bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all border border-border/30 text-center">
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <area.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-bold text-foreground text-sm mb-2">{area.label}</h3>
                  <p className="text-muted-foreground text-xs">{area.desc}</p>
                </div>
              ))}
            </div>

            {/* Extended 8-grid applications */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {applications.map((app, i) => (
                <div key={i} className="flex flex-col items-center gap-3 bg-muted p-5 rounded-xl hover:bg-accent/5 transition-all text-center">
                  <app.icon className="h-6 w-6 text-accent" />
                  <span className="font-medium text-foreground text-sm">{app.label}</span>
                </div>
              ))}
            </div>

            {/* Mesh networking summary */}
            <div className="mt-12 max-w-3xl mx-auto bg-card p-8 rounded-2xl shadow-card border border-accent/20">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Network className="w-6 h-6 text-accent" />
                {isZh ? 'Mesh自组网拓扑' : 'Mesh Network Topology'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span>{isZh ? '点对点 (1V1)' : 'Point-to-Point (1V1)'}</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span>{isZh ? '点对多点 (1V16)' : 'Point-to-Multi (1V16)'}</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span>{isZh ? 'Mesh多点对多点' : 'Mesh Multi-to-Multi'}</span>
                </div>
              </div>
              <p className="text-muted-foreground text-xs mt-4 leading-relaxed">
                {isZh 
                  ? '地对空17公里360°无线传输；整机功耗2.5W；4层楼板穿透图传；渐灭式传输非可视图传；自动跳频，雨、雪、雾天气抗干扰图传。'
                  : '17km 360° ground-to-air wireless; 2.5W total power; 4-floor penetration; NLOS transmission; auto FHSS, weather-resistant in rain/snow/fog.'}
              </p>
            </div>
          </div>
        </section>

        {/* ═══ Specs Table — Dark Theme ═══ */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,30%,8%)] to-[hsl(210,25%,10%)]" />
          <div className="container-custom relative z-10">
            <div className="flex items-center gap-3 mb-12 justify-center">
              <div className="w-1 h-8 bg-accent rounded-full" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {isZh ? '参数列表' : 'Specifications'}
              </h2>
            </div>
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10">
              <table className="w-full">
                <thead>
                  <tr className="bg-accent/20 border-b border-white/10">
                    <th className="px-4 md:px-6 py-3 text-left font-semibold text-white/90 text-sm w-1/6">{isZh ? '项目' : 'Category'}</th>
                    <th className="px-4 md:px-6 py-3 text-left font-semibold text-white/90 text-sm w-1/4">{isZh ? '功能' : 'Parameter'}</th>
                    <th className="px-4 md:px-6 py-3 text-left font-semibold text-white/90 text-sm">{isZh ? '描述' : 'Value'}</th>
                  </tr>
                </thead>
                <tbody>
                  {specs.map((group, gi) => (
                    group.items.map((item, ii) => (
                      <tr key={`${gi}-${ii}`} className={`${ii % 2 === 0 ? 'bg-white/3' : 'bg-white/[0.01]'} border-b border-white/5 hover:bg-accent/5 transition-colors`}>
                        {ii === 0 && (
                          <td className="px-4 md:px-6 py-3 font-semibold text-white/80 text-sm align-top" rowSpan={group.items.length}>
                            {group.category}
                          </td>
                        )}
                        <td className="px-4 md:px-6 py-3 font-medium text-white/70 text-sm">{item.label}</td>
                        <td className="px-4 md:px-6 py-3 text-white/50 text-sm whitespace-pre-line font-mono text-xs">{item.value}</td>
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═══ Case Studies — Island Highlighted ═══ */}
        <section className="py-20 bg-muted">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              {isZh ? '典型应用案例' : 'Case Studies'}
            </h2>
            <p className="text-muted-foreground text-center mb-12 text-sm">
              {isZh ? '覆盖工地、海岛、农村、园区等多种实际部署场景' : 'Covering construction, island, village, and industrial park deployments'}
            </p>

            {/* Highlighted Island Case */}
            {caseStudies.filter(cs => cs.isHighlighted).map((cs, i) => (
              <div key={i} className="max-w-4xl mx-auto mb-12 bg-card rounded-2xl shadow-card-hover overflow-hidden border-2 border-accent/30">
                <div className="bg-accent/10 p-6 flex items-center gap-4 border-b border-accent/20">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <cs.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{cs.title}</h3>
                    <span className="text-sm font-bold text-accent">{cs.highlight}</span>
                  </div>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      {isZh ? '现场环境' : 'Field Environment'}
                    </h4>
                    <ul className="space-y-2">
                      {cs.environment?.map((e, ei) => (
                        <li key={ei} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-accent mt-1">▸</span>
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
                      <Settings className="w-4 h-4 text-accent" />
                      {isZh ? '设备配置' : 'Equipment Config'}
                    </h4>
                    <ul className="space-y-2">
                      {cs.equipment?.map((e, ei) => (
                        <li key={ei} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-accent mt-1">▸</span>
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:col-span-2 bg-accent/5 rounded-lg p-4 border border-accent/20">
                    <h4 className="font-bold text-foreground text-sm mb-1 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      {isZh ? '实际效果' : 'Result'}
                    </h4>
                    <p className="text-muted-foreground text-sm">{cs.result}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Other case studies grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {caseStudies.filter(cs => !cs.isHighlighted).map((cs, i) => (
                <div key={i} className="bg-card rounded-2xl shadow-card overflow-hidden border border-border/30 hover:shadow-card-hover transition-all">
                  <div className="bg-primary/5 p-5 flex items-center gap-3 border-b border-border/30">
                    <cs.icon className="w-8 h-8 text-accent" />
                    <div>
                      <h3 className="text-base font-bold text-foreground">{cs.title}</h3>
                      <span className="text-xs text-accent font-semibold">{cs.highlight}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <ul className="space-y-2">
                      {cs.details.map((d, di) => (
                        <li key={di} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,30%,8%)] via-[hsl(210,25%,10%)] to-[hsl(200,20%,8%)]" />
          <div className="absolute inset-0 bg-dots opacity-5" />
          <div className="container-custom relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isZh ? '定制您的 CANI-Link Pro 解决方案' : 'Customize Your CANI-Link Pro Solution'}
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
              {isZh 
                ? '支持频段定制、OEM/ODM服务。我们的工程团队将为您提供完整的无线链路解决方案。' 
                : 'Custom frequency bands, OEM/ODM services available. Our engineering team provides complete wireless link solutions.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <LangLink to="/contact">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-lg shadow-accent/20 group">
                  <Mail className="mr-2 h-4 w-4" />
                  {isZh ? '联系我们' : 'Contact Us'}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </LangLink>
              <a href="mailto:sales@caniuav.com">
                <Button size="lg" className="bg-white/10 text-white border border-white/20 hover:bg-white/15 font-bold backdrop-blur-sm">
                  <Mail className="mr-2 h-4 w-4" />
                  sales@caniuav.com
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MeshLink;
