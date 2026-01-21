import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Tag, CheckCircle, Zap, Shield, TrendingUp, Target } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { BackButton } from "@/components/BackButton";
import { SEO } from "@/components/SEO";

// 导入案例配图
import caseTransmissionInspection from "@/assets/power/case-transmission-inspection.jpg";
import caseSubstationInspection from "@/assets/power/case-substation-inspection.jpg";
import caseSolarInspection from "@/assets/power/case-solar-inspection.jpg";
import caseInsulatorCheck from "@/assets/power/case-insulator-check.jpg";
import caseCorridorInspection from "@/assets/power/case-corridor-inspection.jpg";
import caseAutonomousSystem from "@/assets/power/case-autonomous-system.jpg";

// 案例详情数据
const caseDetails = {
  "1": {
    id: 1,
    title: "无人机在电力巡检中的应用，助力建设新时代坚强电网",
    date: "2024-03-05",
    category: "行业资讯",
    image: caseTransmissionInspection,
    tags: ["无人机自主飞行", "无人机电力巡检", "电力巡检无人机"],
    content: {
      intro: "随着科技的快速发展，无人机技术已经成为电力行业的重要支持工具，尤其是在电力巡检领域。从最初的人工巡检到现在的智能化无人机巡检，电力行业正在经历一场技术革命。无人机电力巡检不仅提高了工作效率，还大幅降低了人员安全风险。",
      sections: [
        {
          title: "项目背景",
          content: "我国电网规模庞大，截至目前，全国电力线路总长度超过200万公里，传统的人工巡检方式效率低下，难以满足现代电网运维的需求。特别是在山区、林区等复杂地形区域，人工巡检不仅耗时耗力，而且存在较大的安全隐患。"
        },
        {
          title: "解决方案",
          content: "采用多旋翼无人机搭载高清摄像头和红外热成像设备，实现对输电线路的全覆盖巡检。无人机可以快速到达人工难以到达的区域，获取高质量的巡检影像数据。同时，结合AI智能识别技术，自动分析检测设备缺陷，大幅提升巡检效率。"
        },
        {
          title: "实施效果",
          content: "通过无人机智能巡检系统的部署，巡检效率提升20倍以上，人工成本降低80%，缺陷检出率提高到99%以上。项目实施后，电网故障率明显下降，供电可靠性显著提升，得到了电力公司的高度评价。"
        }
      ],
      highlights: [
        { icon: Zap, title: "效率提升", value: "20倍+" },
        { icon: Shield, title: "成本降低", value: "80%" },
        { icon: Target, title: "缺陷检出率", value: "99%+" },
        { icon: TrendingUp, title: "覆盖线路", value: "5000km" }
      ],
      technologies: ["多旋翼无人机", "高清摄像系统", "红外热成像", "AI缺陷识别", "自动航线规划", "数据管理平台"]
    }
  },
  "2": {
    id: 2,
    title: "智能巡检无人机在输变电行业的实际应用",
    date: "2024-01-26",
    category: "行业资讯",
    image: caseSubstationInspection,
    tags: ["无人机电力巡检", "电力巡检无人机", "电力巡检"],
    content: {
      intro: "我国输变电线路规模庞大，是电力供应和电能输送的关键通道。然而，由于我国地形复杂，传统的人工巡检面临着效率低下、安全风险高等问题。智能无人机巡检方案有效解决了这些难题，为电力行业带来了革命性的变化。",
      sections: [
        {
          title: "行业痛点",
          content: "输变电线路往往穿越崇山峻岭、河流湖泊等复杂地形，传统巡检需要大量人力物力，且巡检周期长。特别是在极端天气条件下，人工巡检几乎无法进行，导致设备隐患难以及时发现。"
        },
        {
          title: "智能化方案",
          content: "本项目采用无人机自动机场与智能巡检无人机相结合的方式，实现了全自动化的输变电线路巡检。无人机可按预设航线自动起飞、巡检、返航，全程无需人工干预。配合AI识别系统，可自动识别绝缘子破损、导线异物、杆塔倾斜等多种缺陷类型。"
        },
        {
          title: "应用成效",
          content: "该智能巡检系统已在多个省份的电力公司投入使用，累计巡检线路超过10000公里，发现并处理隐患超过2000处。系统运行稳定，得到了用户的广泛好评。"
        }
      ],
      highlights: [
        { icon: Zap, title: "巡检里程", value: "10000km+" },
        { icon: Shield, title: "发现隐患", value: "2000+" },
        { icon: Target, title: "自动化率", value: "95%" },
        { icon: TrendingUp, title: "响应时间", value: "<30min" }
      ],
      technologies: ["无人机自动机场", "智能航线规划", "AI缺陷识别", "5G实时传输", "边缘计算", "云端数据平台"]
    }
  },
  "3": {
    id: 3,
    title: "电力基础设施巡检新方案——无人机电力巡检",
    date: "2024-01-25",
    category: "行业资讯",
    image: caseSolarInspection,
    tags: ["无人机电力巡检", "电力巡检无人机", "无人机在电力行业的应用"],
    content: {
      intro: "电力行业是我国经济基础的重要产业之一，电力线路的连接在配电与用电系统中占据着重要地位。电网的安全稳定运行离不开高效的巡检手段，无人机技术为此提供了全新解决方案，正在改变传统电力运维的方式。",
      sections: [
        {
          title: "传统巡检困境",
          content: "电力基础设施分布范围广、类型多样，包括输电线路、变电站、配电网络等。传统的人工巡检需要投入大量人力，巡检周期长，且受天气、地形等因素影响较大。同时，高压作业环境对巡检人员的安全构成威胁。"
        },
        {
          title: "无人机解决方案",
          content: "采用无人机进行电力基础设施巡检，可以实现全天候、全覆盖的巡检作业。无人机搭载可见光相机、红外相机、激光雷达等多种传感器，能够获取丰富的巡检数据。通过AI分析，自动识别设备缺陷和安全隐患。"
        },
        {
          title: "推广价值",
          content: "无人机电力巡检方案已在全国多地推广应用，有效解决了传统巡检的痛点问题。该方案不仅提高了巡检效率和质量，还降低了运维成本和安全风险，为电力行业数字化转型提供了有力支撑。"
        }
      ],
      highlights: [
        { icon: Zap, title: "效率提升", value: "15倍" },
        { icon: Shield, title: "安全保障", value: "零事故" },
        { icon: Target, title: "数据精度", value: "厘米级" },
        { icon: TrendingUp, title: "成本节约", value: "60%" }
      ],
      technologies: ["多传感器融合", "三维建模", "缺陷智能识别", "巡检报告自动生成", "GIS集成", "移动终端APP"]
    }
  },
  "4": {
    id: 4,
    title: "高压输电线路检测有新招，无人机电力巡检技术的应用",
    date: "2024-01-23",
    category: "行业资讯",
    image: caseInsulatorCheck,
    tags: ["无人机电力巡检", "电力巡检无人机", "无人机在电力行业的应用"],
    content: {
      intro: "随着我国工业化和城市化不断加速发展，对电力需求持续增加，高压输电线路规模也相应增长。无人机搭载多种传感器，可以快速完成高压线路的全面检测，为电网安全运行提供强有力的技术支撑。",
      sections: [
        {
          title: "高压巡检挑战",
          content: "高压输电线路电压等级高、跨度大，传统的人工巡检方式存在较大的安全风险。特别是在雷雨、大风等恶劣天气后，需要快速对线路进行巡检以发现潜在问题，人工巡检难以满足这一需求。"
        },
        {
          title: "无人机检测技术",
          content: "采用专业的电力巡检无人机，搭载高倍率变焦相机和红外热成像设备，可以近距离检测高压线路的各种部件。无人机飞行高度和距离可精确控制，确保获取清晰的检测图像。AI系统可自动分析图像，识别导线磨损、绝缘子污闪、金具锈蚀等问题。"
        },
        {
          title: "检测效果",
          content: "通过无人机电力巡检技术的应用，高压线路的检测周期从原来的数月缩短到数天，缺陷发现率提升显著。该技术已成为电力公司运维工作中不可或缺的重要手段。"
        }
      ],
      highlights: [
        { icon: Zap, title: "检测周期", value: "缩短90%" },
        { icon: Shield, title: "作业安全", value: "非接触式" },
        { icon: Target, title: "图像分辨率", value: "4K超清" },
        { icon: TrendingUp, title: "检出准确率", value: "98%+" }
      ],
      technologies: ["高倍率变焦相机", "红外热成像", "紫外检测", "精确定位导航", "抗电磁干扰", "实时图传"]
    }
  },
  "5": {
    id: 5,
    title: "绝缘子破损检测难？智能电力无人机来解决",
    date: "2024-01-23",
    category: "行业资讯",
    image: caseCorridorInspection,
    tags: ["无人机电力巡检", "电力巡检无人机", "无人机在电力行业的应用"],
    content: {
      intro: "绝缘子是输电线路上不可或缺的组件，其主要功能是稳固支持和固定载流导体，确保载流导体与地之间形成良好的绝缘。AI识别技术可精准检测绝缘子的各类缺陷，有效预防电网故障的发生。",
      sections: [
        {
          title: "绝缘子重要性",
          content: "绝缘子是输电线路的关键部件，其性能直接影响电网的安全运行。绝缘子一旦发生破损或污闪，可能导致线路跳闸甚至引发更大范围的电网故障。因此，及时发现绝缘子缺陷至关重要。"
        },
        {
          title: "AI识别技术",
          content: "利用深度学习技术，对大量绝缘子缺陷样本进行训练，建立高精度的缺陷识别模型。该模型可以识别裂纹、破损、污秽、自爆等多种缺陷类型，识别准确率达到95%以上。结合无人机采集的高清图像，可实现绝缘子缺陷的自动化检测。"
        },
        {
          title: "应用效果",
          content: "该智能检测方案已在多条高压线路上应用，累计检测绝缘子超过50万只，发现并处理缺陷绝缘子数千只，有效避免了多起潜在的电网故障。"
        }
      ],
      highlights: [
        { icon: Zap, title: "检测数量", value: "50万+" },
        { icon: Shield, title: "识别准确率", value: "95%+" },
        { icon: Target, title: "缺陷类型", value: "20+" },
        { icon: TrendingUp, title: "处理效率", value: "提升30倍" }
      ],
      technologies: ["深度学习", "图像识别", "缺陷分类", "自动标注", "知识图谱", "预警分析"]
    }
  },
  "6": {
    id: 6,
    title: "无人机自动机场在电力巡检中的应用实践",
    date: "2024-01-20",
    category: "技术应用",
    image: caseAutonomousSystem,
    tags: ["自动机场", "无人值守", "智能巡检"],
    content: {
      intro: "通过部署无人机自动机场，实现7x24小时全自动巡检，无需人工干预。自动起降、自动充电、自动数据回传，大幅提升巡检效率和响应速度，代表了电力巡检的未来发展方向。",
      sections: [
        {
          title: "自动机场概述",
          content: "无人机自动机场是一种集成了无人机停放、充电、起降、数据传输等功能的自动化设备。机场可以部署在输电线路沿线或变电站内，实现对周边区域的自动化巡检。通过远程控制或预设任务，无人机可以自动完成巡检作业。"
        },
        {
          title: "系统功能",
          content: "自动机场系统具备全自动起降、智能充电管理、环境监测、数据实时回传等功能。无人机完成任务后自动返回机场，系统自动进行充电和数据上传。云端平台可以对多个机场进行统一管理和调度，实现区域化的智能巡检网络。"
        },
        {
          title: "部署效果",
          content: "自动机场系统已在多个电力公司进行部署应用，单个机场可覆盖方圆15公里范围内的输电线路。与传统巡检方式相比，响应时间从数小时缩短到30分钟以内，巡检成本大幅降低，运维效率显著提升。"
        }
      ],
      highlights: [
        { icon: Zap, title: "响应时间", value: "<30min" },
        { icon: Shield, title: "覆盖范围", value: "15km半径" },
        { icon: Target, title: "自动化程度", value: "100%" },
        { icon: TrendingUp, title: "运维成本", value: "降低70%" }
      ],
      technologies: ["自动起降系统", "智能充电", "环境感知", "远程控制", "云端调度", "边缘计算"]
    }
  }
};

const CaseDetail = () => {
  const { caseId } = useParams<{ caseId: string }>();
  
  const caseData = caseId ? caseDetails[caseId as keyof typeof caseDetails] : null;
  
  if (!caseData) {
    return <Navigate to="/applications/power-inspection" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${caseData.title} - 电力巡检案例`}
        description={caseData.content.intro}
        keywords={caseData.tags.join(",")}
      />
      <Header />
      <FloatingContact />

      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${caseData.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          </div>
          <div className="container-custom relative z-10 h-full flex items-end pb-12">
            <div className="max-w-4xl">
              <BackButton to="/applications/power-inspection" label="返回电力巡检" />
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                  {caseData.category}
                </span>
                <span className="flex items-center text-muted-foreground text-sm">
                  <Calendar className="mr-1 h-4 w-4" />
                  {caseData.date}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {caseData.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {caseData.content.intro}
                  </p>
                  
                  {caseData.content.sections.map((section, index) => (
                    <div key={index} className="mb-10">
                      <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                        <span className="w-1 h-6 bg-primary mr-3 rounded"></span>
                        {section.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="mt-12 p-6 bg-muted rounded-xl">
                  <h3 className="text-xl font-bold text-foreground mb-4">应用技术</h3>
                  <div className="flex flex-wrap gap-3">
                    {caseData.content.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="bg-background text-foreground px-4 py-2 rounded-full text-sm border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Highlights */}
                <div className="bg-card rounded-xl p-6 shadow-card mb-8">
                  <h3 className="text-xl font-bold text-card-foreground mb-6">项目成效</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {caseData.content.highlights.map((item, index) => (
                      <div key={index} className="text-center p-4 bg-muted rounded-lg">
                        <item.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-bold text-primary">{item.value}</div>
                        <div className="text-sm text-muted-foreground">{item.title}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-card rounded-xl p-6 shadow-card mb-8">
                  <h3 className="text-xl font-bold text-card-foreground mb-4">相关标签</h3>
                  <div className="flex flex-wrap gap-2">
                    {caseData.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-primary rounded-xl p-6 text-primary-foreground">
                  <h3 className="text-xl font-bold mb-4">需要类似解决方案？</h3>
                  <p className="opacity-90 mb-6 text-sm">
                    联系我们的专家团队，获取针对您需求的定制化电力巡检解决方案
                  </p>
                  <Link to="/contact">
                    <Button variant="secondary" className="w-full group">
                      立即咨询
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Cases */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-foreground mb-8">更多案例</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.values(caseDetails)
                .filter(c => c.id !== caseData.id)
                .slice(0, 3)
                .map((relatedCase) => (
                  <Link 
                    key={relatedCase.id} 
                    to={`/applications/power-inspection/case/${relatedCase.id}`}
                    className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={relatedCase.image} 
                        alt={relatedCase.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedCase.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">{relatedCase.date}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseDetail;
