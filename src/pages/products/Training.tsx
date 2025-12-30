import ProductPageTemplate from "@/components/ProductPageTemplate";
import { GraduationCap, Shield, Settings, Users, Gauge, Award } from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "专业教学",
    description: "针对无人机培训设计，循序渐进的学习体验",
  },
  {
    icon: Shield,
    title: "安全防护",
    description: "全向保护罩设计，防止碰撞损坏和人员受伤",
  },
  {
    icon: Settings,
    title: "模块化设计",
    description: "快拆结构便于维护，降低教学使用成本",
  },
  {
    icon: Users,
    title: "多人协作",
    description: "支持多机同飞教学，提高培训效率",
  },
  {
    icon: Gauge,
    title: "多档调节",
    description: "速度灵敏度可调，适应不同学习阶段",
  },
  {
    icon: Award,
    title: "考核标准",
    description: "符合AOPA考核要求，助力考证培训",
  },
];

const products = [
  {
    name: "六轴教练机 Hawk-02",
    description: "入门级六轴教练机，稳定易操控，适合初学者",
    specs: ["轴距: 450mm", "续航: 20min", "载重: 0.5kg"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    link: "/products/training/hawk-02",
  },
  {
    name: "八轴教练机 Hawk-01",
    description: "专业级八轴教练机，模拟工业机操控体验",
    specs: ["轴距: 680mm", "续航: 25min", "载重: 2kg"],
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80",
    link: "/products/training/hawk-01",
  },
  {
    name: "四轴穿越教练机 FPV-T1",
    description: "FPV竞速入门教练机，培养穿越机飞行技能",
    specs: ["轴距: 250mm", "续航: 8min", "速度: 80km/h"],
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=600&q=80",
    link: "/products/training/fpv-t1",
  },
];

const stats = [
  { value: "5000+", title: "培训学员", description: "累计培训人数" },
  { value: "200+", title: "合作院校", description: "高职院校合作" },
  { value: "98%", title: "考试通过率", description: "AOPA考证通过率" },
  { value: "50+", title: "培训机构", description: "合作培训机构" },
];

const applications = [
  {
    title: "院校教学",
    description: "高职院校无人机专业实训教学",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
  },
  {
    title: "考证培训",
    description: "AOPA/CAAC无人机驾照考试培训",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
  },
  {
    title: "企业内训",
    description: "企业无人机操作员技能提升培训",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
  {
    title: "青少年科普",
    description: "中小学无人机科普教育和兴趣培养",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
  },
];

const techSpecs = [
  { label: "机型配置", value: "四轴/六轴/八轴" },
  { label: "轴距范围", value: "250-680mm" },
  { label: "飞行续航", value: "8-25分钟" },
  { label: "最大载重", value: "0.5-2kg" },
  { label: "遥控距离", value: "500-1000m" },
  { label: "保护措施", value: "全向保护罩" },
  { label: "一键功能", value: "起降/返航/悬停" },
  { label: "飞行模式", value: "姿态/GPS/手动" },
];

const cases = [
  {
    title: "某航空职业学院",
    description: "配备50套教练机系统，年培训学员500+，考证通过率98%",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
  },
  {
    title: "某无人机培训机构",
    description: "采用我司教练机体系，累计培训学员3000+人次",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
  },
  {
    title: "某青少年科技馆",
    description: "开设无人机科普课程，每年服务青少年5000+人次",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
  },
];

const Training = () => {
  return (
    <ProductPageTemplate
      heroTitle="教练无人机"
      heroSubtitle="专业无人机培训解决方案"
      heroImage="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80"
      features={features}
      products={products}
      stats={stats}
      applications={applications}
      techSpecs={techSpecs}
      cases={cases}
    />
  );
};

export default Training;
