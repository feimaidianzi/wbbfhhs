import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, Eye, Shield, Clock, BarChart, Cpu, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const challenges = [
  "劳动量大、人工成本高、巡线周期长",
  "人工线下巡查精度低、死角多",
  "受自然天气影响大、潜在风险高、安全性低"
];

const workflowSteps = [
  { step: "01", title: "巡检航线导入" },
  { step: "02", title: "航拍任务规划" },
  { step: "03", title: "航拍" },
  { step: "04", title: "单基杆塔单一航线制作" },
  { step: "05", title: "杆塔航线导入" },
  { step: "06", title: "杆塔精细化巡检" },
  { step: "07", title: "巡检报告" }
];

const efficiencyPoints = [
  "一个机组单架次，每天可飞行15公里-30公里",
  "单套系统每天可完成10公里的数据处理"
];

const systemFeatures = [
  "成熟性：将测绘行业中的成熟技术创新性应用于电力行业，利用远景多年来的核心技术解决树障测量问题",
  "先进性：利用专利技术解决电力线弧垂测量难题，填补以影像为基础的弧垂测量空白",
  "实用性：大跨度、高效率、多种飞行载具，设备性价比高，适合班组级的生产组织"
];

const serviceDescriptions = [
  {
    title: "本体设施缺陷",
    description: "组成线路本体的构件、附件和零部件，包括基础、杆塔、绝缘子、金具、接地装置等"
  },
  {
    title: "人员安全",
    description: "恶劣环境监测不需要人员靠近监测；杆塔监测不用爬塔即可获取准确数据"
  },
  {
    title: "附属设施缺陷",
    description: "附加在线路本体上的各类金具、标志牌、警告牌及各种技术监测设备出现的缺陷等"
  }
];

const advantages = [
  "多旋翼无人机机动灵活、操作简单、全方位3D视角，可以弥补人工巡检的不足",
  "效率高、成本低：无人机巡线效率是传统人工的20倍以上，可快速、多频次的对输电线路及其走廊进行空中巡视",
  "人员安全：恶劣环境监测不需要人员靠近监测；杆塔监测不用爬塔即可获取准确数据",
  "数据结果可靠：无人机巡检数据客观至面，可复核、可备份可追溯"
];

const applications = [
  {
    title: "输电线路巡检",
    description: "对高压输电线路进行定期巡视，AI智能识别导线损伤、杆塔异常、绝缘子破损等缺陷",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
    href: "/applications/power-inspection/transmission-line",
    features: ["导线断股检测", "绝缘子破损识别", "杆塔倾斜监测", "通道隐患排查"]
  },
  {
    title: "变电站巡检",
    description: "对变电站设备进行红外测温和可见光巡检，及时发现设备过热隐患",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    href: "/applications/power-inspection/substation",
    features: ["红外测温检测", "设备外观检查", "渗漏油检测", "表计读数识别"]
  },
  {
    title: "光伏电站检测",
    description: "利用红外热成像快速检测光伏组件热斑、隐裂等故障",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
    href: "/applications/power-inspection/solar-panel",
    features: ["热斑故障检测", "组件隐裂排查", "积灰遮挡检测", "发电效率评估"]
  }
];

const stats = [
  { value: "20倍+", label: "效率提升" },
  { value: "95%+", label: "识别准确率" },
  { value: "30km", label: "单日巡检里程" },
  { value: "24h", label: "全天候作业" }
];

const PowerInspection = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="电力巡检"
        description="长凌电子无人机电力巡检解决方案，提供输电线路巡检、变电站巡检、光伏电站检测等专业服务，效率提升20倍以上。"
        keywords="电力巡检无人机,输电线路巡检,变电站巡检,光伏电站检测,红外热成像,AI智能识别"
        url="/applications/power-inspection"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[350px] md:h-[450px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                电力巡检
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
                无人机智能巡检技术，为电力行业提供安全、高效、精准的巡检解决方案
              </p>
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

        {/* Industry Status - Pain Points */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                01
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">电力行业巡检现状</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/images/power/industry-status.png" 
                  alt="电力行业巡检现状" 
                  className="w-full h-auto"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                  传统巡检面临的问题
                </h3>
                <div className="space-y-4">
                  {challenges.map((challenge, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                      <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-destructive text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-foreground">{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* UAV Efficiency */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                02
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">无人机作业与巡检的效能特性</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-card rounded-xl p-8 shadow-card">
                <h3 className="text-xl font-bold text-card-foreground mb-6 border-l-4 border-accent pl-4">
                  无人机作业效率
                </h3>
                <div className="space-y-4">
                  {efficiencyPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card rounded-xl p-8 shadow-card">
                <h3 className="text-xl font-bold text-card-foreground mb-6 border-l-4 border-accent pl-4">
                  无人机巡检系统特点
                </h3>
                <div className="space-y-4">
                  {systemFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inspection Workflow */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                03
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">无人机巡检流程</h2>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg mb-8">
              <img 
                src="/images/power/inspection-workflow.png" 
                alt="无人机巡检流程" 
                className="w-full h-auto"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {workflowSteps.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-primary-foreground font-bold text-sm">{item.step}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                04
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">输电线路精细化巡查服务</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-6 bg-primary text-primary-foreground px-4 py-2 inline-block">
                  提供的服务
                </h3>
                <div className="space-y-6">
                  {serviceDescriptions.map((service, index) => (
                    <div key={index} className="bg-card p-6 rounded-xl shadow-card">
                      <h4 className="font-bold text-card-foreground mb-2">{service.title}</h4>
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-6 bg-accent text-accent-foreground px-4 py-2 inline-block">
                  核心优势
                </h3>
                <div className="space-y-4">
                  {advantages.map((advantage, index) => (
                    <div key={index} className="flex items-start gap-3 bg-card p-4 rounded-lg shadow-sm">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground text-sm">{advantage}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Results Gallery - 精细化巡查服务成果 */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                05
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">精细化巡查服务成果</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/images/power/case-cap-damage.png" 
                  alt="保护帽损坏检测" 
                  className="w-full h-auto"
                />
                <div className="p-4 text-center">
                  <span className="text-sm font-medium text-card-foreground">保护帽损坏检测</span>
                </div>
              </div>
              <div className="bg-card rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/images/power/case-wire-strand.png" 
                  alt="导线散股检测" 
                  className="w-full h-auto"
                />
                <div className="p-4 text-center">
                  <span className="text-sm font-medium text-card-foreground">导线散股检测</span>
                </div>
              </div>
              <div className="bg-card rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/images/power/case-damper-shift.png" 
                  alt="防振锤移位检测" 
                  className="w-full h-auto"
                />
                <div className="p-4 text-center">
                  <span className="text-sm font-medium text-card-foreground">防振锤移位检测</span>
                </div>
              </div>
              <div className="bg-card rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/images/power/case-wire-break.png" 
                  alt="导线断股检测" 
                  className="w-full h-auto"
                />
                <div className="p-4 text-center">
                  <span className="text-sm font-medium text-card-foreground">中间导线断4股 / 导线灼烧断3股</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tree Hazard Inspection */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                06
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">输电线路树木隐患排查服务</h2>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-lg mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-card-foreground mb-4 bg-primary text-primary-foreground px-4 py-2 inline-block">
                    提供的服务
                  </h3>
                  <div className="mt-4">
                    <h4 className="font-bold text-card-foreground mb-2">概述</h4>
                    <p className="text-muted-foreground text-sm">
                      采用多载荷复合翼无人机系统进行输电线路巡检，测量输电线路净空间距离，用来排查输电线路通道的树障隐患。
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-card-foreground mb-4">优势</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground text-sm"><strong>效率高：</strong>多载荷固定翼无人机单架次每天可对20-30km线路通道进行数据采集，效率是传统人工作业的100倍以上</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground text-sm"><strong>操作简单：</strong>集成化设计，航线规划完毕后，可自主进行巡检任务</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground text-sm"><strong>适应性强：</strong>不受地形限制，山区、无人区、沙漠等恶劣环境均可作业</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground text-sm"><strong>5KM图传：</strong>1.4G专用频段防干扰，5km范围内可实现1080P30帧"零延时"回传</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground text-sm"><strong>抗风防雨：</strong>固定翼巡航阶可抗7级大风，降雨≤6mm/min内可安飞行</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/images/power/case-tree-data.png" 
                  alt="点云数据与可见光数据" 
                  className="w-full h-auto"
                />
                <div className="p-4 text-center">
                  <span className="text-sm font-medium text-card-foreground">点云数据与可见光数据采集</span>
                </div>
              </div>
              <div className="bg-card rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/images/power/case-tree-analysis.png" 
                  alt="树木隐患分析" 
                  className="w-full h-auto"
                />
                <div className="p-4 text-center">
                  <span className="text-sm font-medium text-card-foreground">安全距离分析隐患点列表</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Crossing Hazard Inspection */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                07
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">输电线路交叉跨越隐患排查服务</h2>
            </div>
            <div className="bg-card rounded-xl overflow-hidden shadow-lg">
              <img 
                src="/images/power/case-crossing.png" 
                alt="交叉跨越隐患排查" 
                className="w-full h-auto"
              />
              <div className="p-4 text-center">
                <span className="text-sm font-medium text-card-foreground">交叉跨越检测报告与分析</span>
              </div>
            </div>
          </div>
        </section>

        {/* Data Query System */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                08
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">电力巡检数据查询系统</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="bg-card rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/images/power/case-system.png" 
                  alt="电力巡检数据查询系统" 
                  className="w-full h-auto"
                />
                <div className="p-4 text-center">
                  <span className="text-sm font-medium text-card-foreground">系统平台Web端登录界面</span>
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  电力巡检数据查询系统主要运行于Windows系统，旨在高效存储与预览杆塔巡检数据，功能涵盖正射点云数据、图片媒体资料以及KMZ航线数据等。
                </p>
                <div className="space-y-4">
                  <div className="bg-background p-4 rounded-lg">
                    <h4 className="font-bold text-foreground mb-2">Kmz管理</h4>
                    <p className="text-muted-foreground text-sm">Kml航线任务文件分组管理；Kmz航线任务上传管理；对杆塔导线的相关数据进行细致管理，并辅以相应的照片和mz航线任务文件规划调用</p>
                  </div>
                  <div className="bg-background p-4 rounded-lg">
                    <h4 className="font-bold text-foreground mb-2">服务管理</h4>
                    <p className="text-muted-foreground text-sm">致力于对杆塔及其相关数据进行全面管理，包括杆塔的基础信息、实地照片，以及记录杆塔缺陷的详细照片和视频资料</p>
                  </div>
                  <div className="bg-background p-4 rounded-lg">
                    <h4 className="font-bold text-foreground mb-2">数据服务</h4>
                    <p className="text-muted-foreground text-sm">无人机拍摄成果的综合管理与展示，涵盖无人机拍摄的高清照片、自动录制的视频资料、精确的正射影像数据</p>
                  </div>
                  <div className="bg-background p-4 rounded-lg">
                    <h4 className="font-bold text-foreground mb-2">分析报告</h4>
                    <p className="text-muted-foreground text-sm">对杆塔缺陷、树障问题、交叉跨越情况以及导线缺陷报告的全面管理，确保杆塔和导线的安全稳定运行</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-card rounded-xl overflow-hidden shadow-lg">
              <img 
                src="/images/power/case-management.png" 
                alt="服务管理界面" 
                className="w-full h-auto"
              />
              <div className="p-4 text-center">
                <span className="text-sm font-medium text-card-foreground">服务管理功能支持查看杆塔的正射影像以及点云模型数据</span>
              </div>
            </div>
          </div>
        </section>

        {/* Application Scenarios */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                09
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">应用场景</h2>
            </div>
            <p className="text-muted-foreground mb-10 ml-16">
              点击查看详细解决方案，了解更多技术细节和应用案例
            </p>
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
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              获取电力巡检解决方案
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              长凌电子为您提供专业的电力巡检无人机解决方案，助力电网安全稳定运行
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-10 py-6 text-lg">
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