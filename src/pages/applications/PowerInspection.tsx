import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, Shield, Clock, BarChart, AlertTriangle, Plane, Database, FileText, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

// 导入AI生成的配图
import heroPowerGrid from "@/assets/power/hero-power-grid.jpg";
import uavInspection from "@/assets/power/uav-inspection.jpg";
import powerEquipment from "@/assets/power/power-equipment.jpg";
import aerialCorridor from "@/assets/power/aerial-corridor.jpg";
import substationImg from "@/assets/power/substation.jpg";

// 导入缺陷类型配图
import defectDamperFall from "@/assets/power/defect-damper-fall.jpg";
import defectWireStrand from "@/assets/power/defect-wire-strand.jpg";
import defectDamperShift from "@/assets/power/defect-damper-shift.jpg";
import defectWireLoose from "@/assets/power/defect-wire-loose.jpg";

const stats = [
  { value: "20倍+", label: "效率提升" },
  { value: "95%+", label: "识别准确率" },
  { value: "30km", label: "单日巡检里程" },
  { value: "24h", label: "全天候作业" }
];

const challenges = [
  { title: "劳动量大", desc: "人工成本高、巡线周期长" },
  { title: "巡检精度低", desc: "人工线下巡查死角多" },
  { title: "安全风险高", desc: "受自然天气影响大、潜在风险高" }
];

const uavAdvantages = [
  { icon: Zap, title: "效率高", desc: "无人机巡线效率是传统人工的20倍以上" },
  { icon: Shield, title: "安全性强", desc: "恶劣环境监测不需要人员靠近" },
  { icon: BarChart, title: "数据可靠", desc: "巡检数据客观全面，可复核、可追溯" },
  { icon: Clock, title: "成本低", desc: "可快速、多频次对输电线路进行空中巡视" }
];

const workflowSteps = [
  { step: "01", title: "巡检航线导入" },
  { step: "02", title: "航拍任务规划" },
  { step: "03", title: "航拍执行" },
  { step: "04", title: "单基杆塔航线制作" },
  { step: "05", title: "杆塔航线导入" },
  { step: "06", title: "杆塔精细化巡检" },
  { step: "07", title: "巡检报告生成" }
];

const fineInspectionServices = [
  { title: "本体设施缺陷检测", desc: "组成线路本体的构件、附件和零部件，包括基础、杆塔、绝缘子、金具、接地装置等" },
  { title: "附属设施缺陷检测", desc: "附加在线路本体上的各类金具、标志牌、警告牌及各种技术监测设备出现的缺陷" },
  { title: "通道环境隐患排查", desc: "线路通道内树障、建筑物、施工机械等外部隐患的排查与预警" }
];

const defectTypes = [
  { image: defectDamperFall, title: "保护帽损坏", desc: "杆塔顶部保护帽破损或脱落" },
  { image: defectWireStrand, title: "导线散股", desc: "导线股线松散或断裂" },
  { image: defectDamperShift, title: "防振锤移位", desc: "防振锤位置偏移异常" },
  { image: defectWireLoose, title: "导线断股", desc: "导线多股断裂需紧急处理" }
];

const treeInspectionFeatures = [
  { title: "效率高", desc: "多载荷固定翼无人机单架次每天可对20-30km线路通道进行数据采集，效率是传统人工作业的100倍以上" },
  { title: "操作简单", desc: "集成化设计，航线规划完毕后，可自主进行巡检任务" },
  { title: "适应性强", desc: "不受地形限制，山区、无人区、沙漠等恶劣环境均可作业" },
  { title: "5KM图传", desc: "1.4G专用频段防干扰，5km范围内可实现1080P30帧零延时回传" },
  { title: "抗风防雨", desc: "固定翼巡航阶可抗7级大风，降雨≤6mm/min内可安全飞行" }
];

const systemModules = [
  { icon: Map, title: "Kmz管理", desc: "Kml航线任务文件分组管理、Kmz航线任务上传管理、杆塔导线相关数据细致管理" },
  { icon: Database, title: "服务管理", desc: "杆塔及其相关数据全面管理，包括基础信息、实地照片、缺陷详细照片和视频资料" },
  { icon: FileText, title: "数据服务", desc: "无人机拍摄成果综合管理与展示，涵盖高清照片、视频资料、正射影像数据" },
  { icon: BarChart, title: "分析报告", desc: "杆塔缺陷、树障问题、交叉跨越情况以及导线缺陷报告的全面管理" }
];

const applications = [
  {
    title: "输电线路巡检",
    description: "对高压输电线路进行定期巡视，AI智能识别导线损伤、杆塔异常、绝缘子破损等缺陷",
    image: aerialCorridor,
    href: "/applications/power-inspection/transmission-line",
    features: ["导线断股检测", "绝缘子破损识别", "杆塔倾斜监测", "通道隐患排查"]
  },
  {
    title: "变电站巡检",
    description: "对变电站设备进行红外测温和可见光巡检，及时发现设备过热隐患",
    image: substationImg,
    href: "/applications/power-inspection/substation",
    features: ["红外测温检测", "设备外观检查", "渗漏油检测", "表计读数识别"]
  },
  {
    title: "光伏电站检测",
    description: "利用红外热成像快速检测光伏组件热斑、隐裂等故障",
    image: powerEquipment,
    href: "/applications/power-inspection/solar-panel",
    features: ["热斑故障检测", "组件隐裂排查", "积灰遮挡检测", "发电效率评估"]
  }
];

const PowerInspection = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="电力巡检解决方案"
        description="长凌电子无人机电力巡检解决方案，提供输电线路巡检、变电站巡检、光伏电站检测等专业服务，效率提升20倍以上。"
        keywords="电力巡检无人机,输电线路巡检,变电站巡检,光伏电站检测,红外热成像,AI智能识别"
        url="/applications/power-inspection"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroPowerGrid})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-transparent" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full mb-6">
                <Plane className="w-4 h-4" />
                <span className="text-sm font-medium">无人机智能巡检解决方案</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                电力巡检
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed mb-8">
                电力巡检是指通过对电力设施（如变电站、电力线路、发电设备等）的定期检查与维护，确保电力系统的安全、稳定运行。无人机在电力巡检中的应用，已经成为一种重要的技术手段。
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                  获取解决方案
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-accent py-8">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent-foreground mb-1">{stat.value}</div>
                  <div className="text-accent-foreground/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 01: Industry Background */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                01
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">电力行业巡检现状</h2>
                <p className="text-muted-foreground mt-1">传统巡检方式面临的挑战</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={heroPowerGrid} 
                  alt="电力行业巡检现状" 
                  className="w-full h-auto"
                />
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-destructive/5 rounded-xl border border-destructive/20">
                  <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">传统巡检面临的问题</h3>
                    <p className="text-muted-foreground">随着电力设施的规模和复杂性不断增加，传统的人工巡检方式面临效率和安全性等方面的挑战。</p>
                  </div>
                </div>
                <div className="grid gap-4">
                  {challenges.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-card-foreground">{item.title}</h4>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: UAV Advantages */}
        <section className="py-20 bg-muted">
          <div className="container-custom">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                02
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">无人机巡检优势</h2>
                <p className="text-muted-foreground mt-1">高效、安全、精准的智能巡检解决方案</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {uavAdvantages.map((item, index) => (
                <div key={index} className="bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-shadow">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Section 03: Workflow */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                03
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">无人机巡检流程</h2>
                <p className="text-muted-foreground mt-1">标准化作业流程确保巡检质量</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
              {workflowSteps.map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-primary-foreground font-bold">{item.step}</span>
                  </div>
                  <p className="text-sm text-foreground font-medium">{item.title}</p>
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-7 left-full w-full h-0.5 bg-primary/30" />
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Section 04: Fine Inspection Service */}
        <section className="py-20 bg-muted">
          <div className="container-custom">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                04
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">输电线路精细化巡查服务</h2>
                <p className="text-muted-foreground mt-1">全方位检测线路设施缺陷</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              {fineInspectionServices.map((item, index) => (
                <div key={index} className="bg-card p-6 rounded-xl shadow-card">
                  <h3 className="text-lg font-bold text-card-foreground mb-3 pb-3 border-b border-border">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              服务成果展示
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {defectTypes.map((item, index) => (
                <div key={index} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 05: Tree Hazard Inspection */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                05
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">输电线路树木隐患排查服务</h2>
                <p className="text-muted-foreground mt-1">采用多载荷复合翼无人机系统进行输电线路巡检</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
              <div>
                <div className="bg-card p-6 rounded-xl shadow-card mb-6">
                  <h3 className="text-lg font-bold text-card-foreground mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-primary rounded-full"></span>
                    服务概述
                  </h3>
                  <p className="text-muted-foreground">
                    采用多载荷复合翼无人机系统进行输电线路巡检，测量输电线路净空间距离，用来排查输电线路通道的树障隐患。
                  </p>
                </div>
                <div className="space-y-4">
                  {treeInspectionFeatures.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-foreground">{item.title}：</span>
                        <span className="text-muted-foreground text-sm">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src="/images/power/case-tree-data.png" 
                    alt="点云数据采集" 
                    className="w-full h-auto"
                  />
                  <div className="p-3 bg-card text-center">
                    <span className="text-sm font-medium text-card-foreground">点云数据与可见光数据采集</span>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src="/images/power/case-tree-analysis.png" 
                    alt="隐患分析" 
                    className="w-full h-auto"
                  />
                  <div className="p-3 bg-card text-center">
                    <span className="text-sm font-medium text-card-foreground">安全距离分析隐患点列表</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Crossing Hazard */}
        <section className="py-20 bg-muted">
          <div className="container-custom">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                06
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">输电线路交叉跨越隐患排查</h2>
                <p className="text-muted-foreground mt-1">精准检测线路交叉跨越安全距离</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/images/power/case-crossing.png" 
                alt="交叉跨越隐患排查" 
                className="w-full h-auto"
              />
              <div className="p-4 bg-card">
                <p className="text-center text-card-foreground">交叉跨越检测报告与分析结果展示</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Data Query System */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                07
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">电力巡检数据查询系统</h2>
                <p className="text-muted-foreground mt-1">高效存储与预览杆塔巡检数据</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
              <div>
                <p className="text-muted-foreground mb-6">
                  电力巡检数据查询系统主要运行于Windows系统，旨在高效存储与预览杆塔巡检数据，功能涵盖正射点云数据、图片媒体资料以及KMZ航线数据等。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {systemModules.map((item, index) => (
                    <div key={index} className="bg-card p-5 rounded-xl shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-accent" />
                        </div>
                        <h4 className="font-bold text-card-foreground">{item.title}</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/images/power/case-system.png" 
                  alt="数据查询系统" 
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/images/power/case-data-service.png" 
                  alt="数据服务" 
                  className="w-full h-auto"
                />
                <div className="p-3 bg-card text-center">
                  <span className="text-sm font-medium text-card-foreground">数据服务 - 航拍照片与飞行记录管理</span>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/images/power/case-route-management.png" 
                  alt="航线管理" 
                  className="w-full h-auto"
                />
                <div className="p-3 bg-card text-center">
                  <span className="text-sm font-medium text-card-foreground">航线管理 - 2/3D地图场景航线规划</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Industry Cases */}
        <section className="py-20 bg-muted">
          <div className="container-custom">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                08
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">行业案例</h2>
                <p className="text-muted-foreground mt-1">真实项目案例展示</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-card rounded-xl overflow-hidden shadow-card">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src="/images/power/case-field-operation.png" 
                    alt="外拍航飞" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-card-foreground mb-2">外拍航飞</h3>
                  <p className="text-muted-foreground text-sm">利用线路规划数据实施无人机空中拍照，完成现场数据采集工作。</p>
                </div>
              </div>
              <div className="bg-card rounded-xl overflow-hidden shadow-card">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src="/images/power/case-data-processing.png" 
                    alt="数据处理" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-card-foreground mb-2">数据处理</h3>
                  <p className="text-muted-foreground text-sm">缺陷汇总表与隐患分析结果自动生成，提供详细的巡检报告。</p>
                </div>
              </div>
              <div className="bg-card rounded-xl overflow-hidden shadow-card">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src="/images/power/case-cooperation.png" 
                    alt="合作案例" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-card-foreground mb-2">合作案例报告</h3>
                  <p className="text-muted-foreground text-sm">某线路巡检用户报告，包含杆塔缺陷、导线缺陷、树障隐患统计数据。</p>
                </div>
              </div>
            </div>

            {/* Case Statistics */}
            <div className="bg-card rounded-xl p-8 shadow-card">
              <h3 className="text-xl font-bold text-card-foreground mb-6 text-center">某线路巡检项目成果统计</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">245</div>
                  <div className="text-muted-foreground">杆塔缺陷总数</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">158</div>
                  <div className="text-muted-foreground">导线缺陷总数</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">772</div>
                  <div className="text-muted-foreground">树障隐患总数</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 09: Application Scenarios */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                09
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">应用场景</h2>
                <p className="text-muted-foreground mt-1">点击查看详细解决方案</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {applications.map((app, index) => (
                <Link
                  key={index}
                  to={app.href}
                  className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all hover:-translate-y-2"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={app.image}
                      alt={app.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-accent transition-colors">
                      {app.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{app.description}</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {app.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs text-muted-foreground">
                          <CheckCircle className="w-3 h-3 text-accent mr-1 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center text-accent font-medium group-hover:translate-x-2 transition-transform">
                      查看详情
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              获取电力巡检解决方案
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto text-lg">
              长凌电子为您提供专业的电力巡检无人机解决方案，助力电网安全稳定运行
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg">
                  立即咨询
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/applications">
                <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-10 py-6 text-lg">
                  查看更多应用
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default PowerInspection;
