import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, Shield, Clock, BarChart, AlertTriangle, Eye, Database, FileText, Map, Cpu, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

// 导入AI生成的配图
import heroPowerGrid from "@/assets/power/hero-power-grid.jpg";
import uavInspection from "@/assets/power/uav-inspection.jpg";
import aerialCorridor from "@/assets/power/aerial-corridor.jpg";
import substationImg from "@/assets/power/substation.jpg";
import powerEquipment from "@/assets/power/power-equipment.jpg";

// 导入缺陷类型配图
import defectDamperFall from "@/assets/power/defect-damper-fall.jpg";
import defectWireStrand from "@/assets/power/defect-wire-strand.jpg";
import defectDamperShift from "@/assets/power/defect-damper-shift.jpg";
import defectWireLoose from "@/assets/power/defect-wire-loose.jpg";

// 导入案例配图
import caseTransmissionInspection from "@/assets/power/case-transmission-inspection.jpg";
import caseSubstationInspection from "@/assets/power/case-substation-inspection.jpg";
import caseSolarInspection from "@/assets/power/case-solar-inspection.jpg";
import caseInsulatorCheck from "@/assets/power/case-insulator-check.jpg";
import caseCorridorInspection from "@/assets/power/case-corridor-inspection.jpg";
import caseAutonomousSystem from "@/assets/power/case-autonomous-system.jpg";

// 案例数据
const inspectionCases = [
  {
    id: 1,
    title: "无人机在电力巡检中的应用，助力建设新时代坚强电网",
    summary: "随着科技的快速发展，无人机技术已经成为电力行业的重要支持工具，尤其是在电力巡检领域。从最初的人工巡检到现在的智能化无人机巡检，电力行业正在经历一场技术革命。",
    date: "2024-03-05",
    category: "行业资讯",
    image: caseTransmissionInspection,
    tags: ["无人机自主飞行", "无人机电力巡检", "电力巡检无人机"]
  },
  {
    id: 2,
    title: "智能巡检无人机在输变电行业的实际应用",
    summary: "我国输变电线路规模庞大，是电力供应和电能输送的关键通道。然而，由于我国地形复杂，传统的人工巡检面临着效率低下、安全风险高等问题。智能无人机巡检方案有效解决了这些难题。",
    date: "2024-01-26",
    category: "行业资讯",
    image: caseSubstationInspection,
    tags: ["无人机电力巡检", "电力巡检无人机", "电力巡检"]
  },
  {
    id: 3,
    title: "电力基础设施巡检新方案——无人机电力巡检",
    summary: "电力行业是我国经济基础的重要产业之一，电力线路的连接在配电与用电系统中占据着重要地位。电网的安全稳定运行离不开高效的巡检手段，无人机技术为此提供了全新解决方案。",
    date: "2024-01-25",
    category: "行业资讯",
    image: caseSolarInspection,
    tags: ["无人机电力巡检", "电力巡检无人机", "无人机在电力行业的应用"]
  },
  {
    id: 4,
    title: "高压输电线路检测有新招，无人机电力巡检技术的应用",
    summary: "随着我国工业化和城市化不断加速发展，对电力需求持续增加，高压输电线路规模也相应增长。无人机搭载多种传感器，可以快速完成高压线路的全面检测。",
    date: "2024-01-23",
    category: "行业资讯",
    image: caseInsulatorCheck,
    tags: ["无人机电力巡检", "电力巡检无人机", "无人机在电力行业的应用"]
  },
  {
    id: 5,
    title: "绝缘子破损检测难？智能电力无人机来解决",
    summary: "绝缘子是输电线路上不可或缺的组件，其主要功能是稳固支持和固定载流导体，确保载流导体与地之间形成良好的绝缘。AI识别技术可精准检测绝缘子的各类缺陷。",
    date: "2024-01-23",
    category: "行业资讯",
    image: caseCorridorInspection,
    tags: ["无人机电力巡检", "电力巡检无人机", "无人机在电力行业的应用"]
  },
  {
    id: 6,
    title: "无人机自动机场在电力巡检中的应用实践",
    summary: "通过部署无人机自动机场，实现7x24小时全自动巡检，无需人工干预。自动起降、自动充电、自动数据回传，大幅提升巡检效率和响应速度。",
    date: "2024-01-20",
    category: "技术应用",
    image: caseAutonomousSystem,
    tags: ["自动机场", "无人值守", "智能巡检"]
  }
];

const PowerInspection = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="电力巡检 - 无人机电力巡线解决方案"
        description="专业的无人机电力巡检服务，涵盖输电线路、变电站、光伏电站等场景，AI智能识别缺陷，提升巡检效率20倍以上"
        keywords="电力巡检,无人机巡线,输电线路巡检,变电站巡检,光伏巡检"
      />
      <Header />
      <FloatingContact />

      <main>
        {/* Hero Section */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroPowerGrid})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
          </div>
          <div className="container-custom relative z-10 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                电力巡检解决方案
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
                电力巡检是指通过对电力设施（如变电站、电力线路、发电设备等）的定期检查与维护，
                确保电力系统的安全、稳定运行。无人机在电力巡检中的应用，已经成为一种重要的技术手段。
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="secondary" className="group">
                  了解更多
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  <Link to="/contact">联系我们</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                无人机电力巡检概述
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                随着电力设施的规模和复杂性不断增加，传统的人工巡检方式面临效率和安全性等方面的挑战
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">传统巡检面临的挑战</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <div className="w-10 h-10 bg-destructive/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">劳动量大</h4>
                      <p className="text-muted-foreground text-sm">人工成本高、巡线周期长，难以满足日益增长的巡检需求</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <div className="w-10 h-10 bg-destructive/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Eye className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">巡检精度低</h4>
                      <p className="text-muted-foreground text-sm">人工线下巡查死角多，细微缺陷容易遗漏</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <div className="w-10 h-10 bg-destructive/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">安全风险高</h4>
                      <p className="text-muted-foreground text-sm">受自然天气影响大、高空作业潜在风险高</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={uavInspection} 
                  alt="无人机电力巡检" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* UAV Advantages Section */}
        <section className="py-20 bg-muted">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                无人机巡检优势
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                无人机技术为电力巡检带来革命性的改变
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-2">效率提升20倍</h3>
                <p className="text-muted-foreground text-sm">无人机巡线效率是传统人工的20倍以上，大幅缩短巡检周期</p>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-2">安全性强</h3>
                <p className="text-muted-foreground text-sm">恶劣环境监测不需要人员靠近，降低人身安全风险</p>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-2">精度高达95%</h3>
                <p className="text-muted-foreground text-sm">AI智能识别技术，缺陷识别准确率高达95%以上</p>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-2">成本降低</h3>
                <p className="text-muted-foreground text-sm">可快速、多频次对输电线路进行空中巡视，降低运维成本</p>
              </div>
            </div>
          </div>
        </section>

        {/* Inspection Workflow Section */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                巡检作业流程
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                标准化的无人机电力巡检作业流程，确保巡检质量
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {[
                { step: "01", title: "巡检航线导入" },
                { step: "02", title: "航拍任务规划" },
                { step: "03", title: "航拍执行" },
                { step: "04", title: "单基杆塔航线制作" },
                { step: "05", title: "杆塔航线导入" },
                { step: "06", title: "杆塔精细化巡检" },
                { step: "07", title: "巡检报告生成" }
              ].map((item, index) => (
                <div key={index} className="relative text-center">
                  <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 text-primary-foreground font-bold text-lg">
                    {item.step}
                  </div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  {index < 6 && (
                    <div className="hidden lg:block absolute top-7 left-full w-full h-0.5 bg-primary/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Defect Detection Section */}
        <section className="py-20 bg-muted">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                缺陷智能识别
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                AI智能算法自动识别各类电力设备缺陷
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { image: defectDamperFall, title: "防震锤脱落", desc: "检测防震锤松动或脱落情况" },
                { image: defectWireStrand, title: "导线断股", desc: "识别导线多股断裂缺陷" },
                { image: defectDamperShift, title: "防振锤位移", desc: "监测防振锤位置偏移" },
                { image: defectWireLoose, title: "导线散股", desc: "检测导线股线松散问题" }
              ].map((item, index) => (
                <div key={index} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-card-foreground mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Types Section */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                巡检服务类型
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                提供全面的电力巡检解决方案
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={aerialCorridor} 
                    alt="输电线路巡检" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-card-foreground mb-3">输电线路巡检</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    对高压输电线路进行定期巡视，AI智能识别导线损伤、杆塔异常、绝缘子破损等缺陷
                  </p>
                  <ul className="space-y-2 mb-4">
                    {["导线断股检测", "绝缘子破损识别", "杆塔倾斜监测", "通道隐患排查"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to="/applications/power-inspection/transmission-line">
                    <Button variant="outline" size="sm" className="w-full group">
                      了解详情
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={substationImg} 
                    alt="变电站巡检" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-card-foreground mb-3">变电站巡检</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    对变电站设备进行红外测温和可见光巡检，及时发现设备过热隐患
                  </p>
                  <ul className="space-y-2 mb-4">
                    {["红外测温检测", "设备外观检查", "渗漏油检测", "表计读数识别"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to="/applications/power-inspection/substation">
                    <Button variant="outline" size="sm" className="w-full group">
                      了解详情
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={powerEquipment} 
                    alt="光伏电站检测" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-card-foreground mb-3">光伏电站检测</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    利用红外热成像快速检测光伏组件热斑、隐裂等故障
                  </p>
                  <ul className="space-y-2 mb-4">
                    {["热斑故障检测", "组件隐裂排查", "积灰遮挡检测", "发电效率评估"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to="/applications/power-inspection/solar-panel">
                    <Button variant="outline" size="sm" className="w-full group">
                      了解详情
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typical Cases Section */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                无人机电力巡检典型案例
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                了解无人机电力巡检在实际应用中的成功案例与经验
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {inspectionCases.map((caseItem) => (
                <Link 
                  key={caseItem.id} 
                  to={`/applications/power-inspection/case/${caseItem.id}`}
                  className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group block"
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={caseItem.image} 
                      alt={caseItem.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {caseItem.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {caseItem.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span>{caseItem.date}</span>
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded">{caseItem.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {caseItem.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Data Management System Section */}
        <section className="py-20 bg-muted">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                数据管理系统
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                专业的电力巡检数据管理平台，实现数据的全生命周期管理
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Map, title: "航线管理", desc: "Kml/Kmz航线任务文件管理，杆塔导线数据管理" },
                { icon: Database, title: "设备管理", desc: "杆塔及相关数据全面管理，包括基础信息、照片、视频" },
                { icon: FileText, title: "数据服务", desc: "无人机拍摄成果管理，高清照片、视频、正射影像" },
                { icon: BarChart, title: "分析报告", desc: "杆塔缺陷、树障问题、交叉跨越情况报告管理" }
              ].map((item, index) => (
                <div key={index} className="bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              开启智能电力巡检
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              立即联系我们，了解如何利用无人机技术提升您的电力巡检效率
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="group">
                  联系我们
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  查看产品
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PowerInspection;
