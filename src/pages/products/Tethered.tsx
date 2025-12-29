import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Clock, Zap, Shield, Radio, Eye, Settings } from "lucide-react";

const features = [
  { icon: Clock, title: "24小时不间断", description: "持续供电，无限续航能力" },
  { icon: Zap, title: "最高300米", description: "升空高度可达300米" },
  { icon: Shield, title: "5分钟部署", description: "快速展开，即插即用" },
  { icon: Radio, title: "智能排线", description: "自动收放线，智能管理" },
  { icon: Eye, title: "高清传输", description: "4K超高清实时图传" },
  { icon: Settings, title: "一体化设计", description: "集成供电、通信、控制" },
];

const products = [
  {
    name: "TH-100系留无人机",
    description: "轻量化系留平台，适用于临时性监控、通信中继等应用场景，单人即可完成部署操作。",
    specs: ["有效载荷: 5kg", "升空高度: 100m", "抗风等级: 6级", "供电功率: 1.5kW"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    link: "/products/tethered/th-100",
  },
  {
    name: "TH-200系留无人机",
    description: "中型系留平台，具备更强的载荷能力和更高的升空高度，适用于长期部署场景。",
    specs: ["有效载荷: 10kg", "升空高度: 200m", "抗风等级: 7级", "供电功率: 3kW"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
    link: "/products/tethered/th-200",
  },
  {
    name: "TH-300系留无人机",
    description: "重型系留平台，适用于大型活动安保、应急通信等重要场景，支持多载荷同时挂载。",
    specs: ["有效载荷: 15kg", "升空高度: 300m", "抗风等级: 8级", "供电功率: 5kW"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
    link: "/products/tethered/th-300",
  },
];

const stats = [
  { value: "24h", title: "连续工作", description: "不间断供电作业" },
  { value: "300m", title: "升空高度", description: "覆盖更广范围" },
  { value: "8级", title: "抗风能力", description: "恶劣天气作业" },
  { value: "5min", title: "部署时间", description: "快速响应需求" },
];

const applications = [
  { title: "大型活动安保", description: "演唱会、体育赛事等大型活动的空中安保监控" },
  { title: "应急通信中继", description: "灾害现场快速建立临时通信网络覆盖" },
  { title: "边境巡逻监视", description: "重点区域长时间不间断空中监视" },
  { title: "森林防火监测", description: "火险高发期持续监测，及时预警" },
  { title: "交通流量监控", description: "重大节假日交通枢纽实时监控" },
  { title: "城市安防监控", description: "重点区域常态化空中安防部署" },
];

const techSpecs = [
  { label: "地面供电系统", value: "AC220V/380V 输入" },
  { label: "系留线缆长度", value: "100m/200m/300m 可选" },
  { label: "线缆重量", value: "≤8kg/100m" },
  { label: "自动排线系统", value: "智能张力控制" },
  { label: "工作环境温度", value: "-20°C ~ +50°C" },
  { label: "抗风能力", value: "持续风速 ≤17m/s" },
  { label: "载荷接口", value: "标准云台接口 + 自定义接口" },
  { label: "图传距离", value: "无限制（有线传输）" },
];

const cases = [
  {
    title: "北京冬奥会安保",
    description: "为冬奥会场馆提供24小时不间断空中安保监控，保障赛事顺利进行",
    image: "https://images.unsplash.com/photo-1461896836934- voices&w=600&q=80",
  },
  {
    title: "广西边境巡逻",
    description: "部署系留无人机系统，实现重点区域全天候监视，有效提升管控效能",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
  {
    title: "云南森林防火",
    description: "在高火险期部署系留平台，成功预警多起火情，将火灾消灭在萌芽状态",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
  },
];

const Tethered = () => {
  return (
    <ProductPageTemplate
      heroTitle="系留无人机系统"
      heroSubtitle="24小时不间断工作，最高升空高度达300米，5分钟快速部署。突破传统无人机续航限制，实现真正的全天候持续作业"
      heroImage="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80"
      features={features}
      featuresTitle="核心优势"
      products={products}
      productsTitle="产品系列"
      productsSubtitle="多种规格系留无人机，满足不同场景的长时间滞空需求"
      stats={stats}
      applications={applications}
      applicationsTitle="应用场景"
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Tethered;
