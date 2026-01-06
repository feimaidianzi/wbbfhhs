import ProductPageTemplate from "@/components/ProductPageTemplate";
import { Users, Brain, Network, Sparkles, Eye, Settings } from "lucide-react";

const features = [
  { icon: Users, title: "大规模编队", description: "支持1000+架无人机协同" },
  { icon: Brain, title: "智能决策", description: "分布式智能协同算法" },
  { icon: Network, title: "自组网通信", description: "高可靠集群通信系统" },
  { icon: Sparkles, title: "精准定位", description: "RTK厘米级定位精度" },
  { icon: Eye, title: "实时监控", description: "全编队状态可视化" },
  { icon: Settings, title: "模块化平台", description: "快速适配多种任务" },
];

const products = [
  {
    name: "集群表演系统",
    description: "大规模无人机灯光表演解决方案，打造震撼视觉盛宴。支持复杂3D图案编排，实现精准同步表演。",
    specs: ["编队规模: 100-10000架", "定位精度: ±2cm", "同步精度: <20ms", "表演时长: ≤30分钟"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    name: "集群巡检系统",
    description: "多机协同巡检解决方案，大幅提升巡检效率和覆盖范围，支持智能任务分配和协同避障。",
    specs: ["编队规模: 5-50架", "覆盖效率: 提升10倍", "自主避障: 360°全向", "协同精度: <1m"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
  },
  {
    name: "集群作业系统",
    description: "多机协同作业解决方案，适用于农业植保、测绘等场景，实现大面积高效作业。",
    specs: ["编队规模: 3-20架", "作业效率: 提升5倍", "航线规划: 智能分配", "作业精度: <10cm"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
  },
];

const stats = [
  { value: "10000+", title: "最大编队", description: "单次表演规模" },
  { value: "±2cm", title: "定位精度", description: "RTK高精度定位" },
  { value: "<20ms", title: "同步精度", description: "毫秒级协同控制" },
  { value: "10倍", title: "效率提升", description: "相比传统作业" },
];

const applications = [
  { title: "灯光表演", description: "大型活动、节庆典礼的空中灯光秀，打造难忘视觉体验" },
  { title: "协同巡检", description: "电力、石油管道等大范围基础设施协同巡检" },
  { title: "农业植保", description: "大面积农田的高效协同植保作业" },
  { title: "应急搜救", description: "大范围区域的快速搜索救援，争分夺秒" },
  { title: "测绘勘察", description: "大面积地形测绘，快速获取高精度数据" },
  { title: "边境巡逻", description: "大范围边境区域协同监视巡逻" },
];

const techSpecs = [
  { label: "单机重量", value: "≤2kg（表演机）" },
  { label: "飞行时间", value: "≤30分钟" },
  { label: "LED亮度", value: "5000流明" },
  { label: "色彩数量", value: "1600万色" },
  { label: "通信延迟", value: "<10ms" },
  { label: "抗风能力", value: "5级风" },
  { label: "工作温度", value: "-10°C ~ +40°C" },
  { label: "起降方式", value: "垂直起降" },
];

const cases = [
  {
    title: "国庆70周年庆典",
    description: "参与天安门广场庆典活动，3000架无人机组成巨型国旗图案",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    title: "杭州亚运会",
    description: "开幕式无人机表演，5000架无人机演绎亚运主题图案",
    image: "https://images.unsplash.com/photo-1461896836934-yyyyyyy?w=600&q=80",
  },
  {
    title: "新疆棉花植保",
    description: "20架无人机协同作业，日作业面积超5000亩",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
  },
];

const Swarm = () => {
  return (
    <ProductPageTemplate
      heroTitle="集群无人机系统"
      heroSubtitle="智能集群控制，多机协同作业，开启无人机应用新纪元。从震撼表演到高效作业，让无人机发挥更大价值"
      heroImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
      features={features}
      featuresTitle="技术优势"
      products={products}
      productsTitle="解决方案"
      productsSubtitle="从表演到作业，飞迈科技集群系统满足多样化应用需求"
      stats={stats}
      applications={applications}
      applicationsTitle="应用场景"
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Swarm;
