import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Camera, Settings, Shield, Cpu, Zap, Wind } from "lucide-react";

const features = [
  { icon: Camera, title: "多载荷兼容", description: "支持多种专业载荷设备" },
  { icon: Settings, title: "模块化设计", description: "快速更换，灵活配置" },
  { icon: Shield, title: "工业级可靠", description: "恶劣环境稳定作业" },
  { icon: Cpu, title: "智能飞控", description: "自主避障，智能航线" },
  { icon: Zap, title: "长续航", description: "最长续航55分钟" },
  { icon: Wind, title: "强抗风", description: "7级风稳定作业" },
];

const products = [
  {
    name: "X650多旋翼无人机",
    description: "紧凑型工业无人机，适用于日常巡检和数据采集任务，便携性强，快速部署。",
    specs: ["轴距: 650mm", "最大载重: 2kg", "续航时间: 35分钟", "抗风等级: 5级"],
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
    link: "/products/multi-rotor/x650",
  },
  {
    name: "X850多旋翼无人机",
    description: "中型工业无人机，具备更强载荷能力和更长续航时间，满足专业级作业需求。",
    specs: ["轴距: 850mm", "最大载重: 5kg", "续航时间: 45分钟", "抗风等级: 6级"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    link: "/products/multi-rotor/x850",
  },
  {
    name: "X1200多旋翼无人机",
    description: "大型工业无人机，适用于重型载荷和长航时任务，是专业级应用的理想选择。",
    specs: ["轴距: 1200mm", "最大载重: 10kg", "续航时间: 55分钟", "抗风等级: 7级"],
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=600&q=80",
    link: "/products/multi-rotor/x1200",
  },
  {
    name: "X1600多旋翼无人机",
    description: "超大型工业无人机，满足特殊行业的超重载荷需求，适用于专业测绘、运输等场景。",
    specs: ["轴距: 1600mm", "最大载重: 20kg", "续航时间: 40分钟", "抗风等级: 6级"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
    link: "/products/multi-rotor/x1600",
  },
];

const stats = [
  { value: "20kg", title: "最大载重", description: "满足重载需求" },
  { value: "55min", title: "最长续航", description: "长时间作业" },
  { value: "7级", title: "抗风能力", description: "恶劣天气作业" },
  { value: "10km", title: "控制距离", description: "远距离操控" },
];

const applications = [
  { title: "电力巡检", description: "输电线路、变电站等电力设施智能巡检" },
  { title: "石油管道", description: "油气管道日常巡护和泄漏检测" },
  { title: "公安执法", description: "空中侦察、追踪取证、现场管控" },
  { title: "消防救援", description: "火情侦察、搜救定位、物资投送" },
  { title: "测绘勘察", description: "地形测绘、三维建模、工程勘察" },
  { title: "环保监测", description: "大气监测、水质采样、污染源追踪" },
  { title: "农业植保", description: "农情监测、精准施肥、病虫害防治" },
  { title: "应急通信", description: "临时通信基站、信号中继覆盖" },
];

const techSpecs = [
  { label: "飞控系统", value: "自研工业级飞控" },
  { label: "定位系统", value: "GPS + 北斗 + GLONASS" },
  { label: "避障系统", value: "六向感知避障" },
  { label: "图传系统", value: "1080P/4K 实时图传" },
  { label: "图传距离", value: "≤10km" },
  { label: "工作温度", value: "-20°C ~ +50°C" },
  { label: "防护等级", value: "IP54" },
  { label: "起飞重量", value: "2-35kg（不同型号）" },
];

const cases = [
  {
    title: "南方电网巡检",
    description: "部署X850无人机用于输电线路巡检，巡检效率提升5倍",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
  },
  {
    title: "深圳公安",
    description: "配备多旋翼无人机平台，执行空中巡逻和应急响应任务",
    image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=600&q=80",
  },
  {
    title: "自然资源部测绘",
    description: "使用X1200进行大比例尺地形测绘，成图精度达厘米级",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
];

const MultiRotor = () => {
  return (
    <ProductPageTemplate
      heroTitle="多旋翼无人机平台"
      heroSubtitle="工业级多旋翼平台，模块化设计，满足多行业应用需求。从轻型到重型，为不同任务提供最佳飞行平台"
      heroImage="https://images.unsplash.com/photo-1506947411487-a56738267384?w=1920&q=80"
      features={features}
      featuresTitle="平台优势"
      products={products}
      productsTitle="产品系列"
      productsSubtitle="从轻型到重型，长凌电子多旋翼平台覆盖全尺寸需求"
      stats={stats}
      applications={applications}
      applicationsTitle="应用领域"
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default MultiRotor;
