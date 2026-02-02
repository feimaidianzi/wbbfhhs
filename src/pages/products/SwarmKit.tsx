import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, Check, Cpu, Radio, Navigation, Layers, Monitor, Wifi, Box, Zap, Users, Target, Settings, Rocket, Shield, Code, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

// 导入产品图片
import heroImage from "@/assets/products/swarm-p230-uwb-hero.jpg";
import uwbImage from "@/assets/products/swarm-uwb-positioning.jpg";
import formationImage from "@/assets/products/swarm-formation.jpg";
import groundStationImage from "@/assets/products/swarm-ground-station.jpg";
import hardwareImage from "@/assets/products/swarm-hardware.jpg";
import communicationImage from "@/assets/products/swarm-communication.png";
const SwarmKit = () => {
  const {
    language
  } = useLanguage();
  const features = [{
    icon: <Navigation className="h-6 w-6" />,
    title: language === 'zh' ? "UWB高精度定位" : "UWB High-Precision Positioning",
    description: language === 'zh' ? "厘米级定位精度，200Hz刷新率，可在无GPS室内外环境飞行" : "Centimeter-level accuracy, 200Hz refresh rate, indoor/outdoor GPS-denied flight"
  }, {
    icon: <Cpu className="h-6 w-6" />,
    title: language === 'zh' ? "NVIDIA Jetson机载计算" : "NVIDIA Jetson Onboard Computing",
    description: language === 'zh' ? "搭载Orin NX模组，100TOPS AI算力，支持复杂算法部署" : "Orin NX module, 100TOPS AI performance, supports complex algorithm deployment"
  }, {
    icon: <Code className="h-6 w-6" />,
    title: language === 'zh' ? "开源软件架构" : "Open Source Software",
    description: language === 'zh' ? "基于ROS和PX4开源平台，提供Prometheus集群控制系统" : "Based on ROS and PX4 open-source platforms, Prometheus swarm control system"
  }, {
    icon: <Radio className="h-6 w-6" />,
    title: language === 'zh' ? "分布式通信系统" : "Distributed Communication",
    description: language === 'zh' ? "TCP/IP通信机制，支持多机协同控制与数据传输" : "TCP/IP communication, supports multi-drone coordination and data transfer"
  }, {
    icon: <Monitor className="h-6 w-6" />,
    title: language === 'zh' ? "专业地面站" : "Professional Ground Station",
    description: language === 'zh' ? "Qt开发的人机交互界面，实时监控集群状态" : "Qt-based GUI, real-time swarm status monitoring"
  }, {
    icon: <Layers className="h-6 w-6" />,
    title: language === 'zh' ? "多种编队模式" : "Multiple Formation Modes",
    description: language === 'zh' ? "支持三角、纵队、方形、圆形等多种编队及变换" : "Triangle, column, square, circle formations and transitions"
  }];
  const specifications = {
    drone: [{
      label: language === 'zh' ? "飞行器类型" : "Aircraft Type",
      value: language === 'zh' ? "四旋翼" : "Quadcopter"
    }, {
      label: language === 'zh' ? "对角线轴距" : "Diagonal Wheelbase",
      value: "250mm"
    }, {
      label: language === 'zh' ? "重量(不含电池)" : "Weight (w/o battery)",
      value: "0.76kg"
    }, {
      label: language === 'zh' ? "起飞重量(含负载)" : "Takeoff Weight",
      value: "1.23kg"
    }, {
      label: language === 'zh' ? "最长飞行时间" : "Max Flight Time",
      value: "10min"
    }, {
      label: language === 'zh' ? "悬停精度" : "Hover Accuracy",
      value: language === 'zh' ? "垂直±0.1m / 水平±0.25m" : "Vertical ±0.1m / Horizontal ±0.25m"
    }, {
      label: language === 'zh' ? "飞控内核" : "Flight Controller",
      value: "Pixhawk 6C"
    }, {
      label: language === 'zh' ? "工作环境" : "Environment",
      value: language === 'zh' ? "室内外" : "Indoor/Outdoor"
    }],
    computer: [{
      label: language === 'zh' ? "机载电脑" : "Onboard Computer",
      value: "Allspark2"
    }, {
      label: language === 'zh' ? "核心模组" : "Core Module",
      value: "NVIDIA Jetson Orin NX"
    }, {
      label: language === 'zh' ? "AI性能" : "AI Performance",
      value: "100 TOPS"
    }, {
      label: language === 'zh' ? "显存" : "Memory",
      value: "16GB LPDDR5"
    }, {
      label: language === 'zh' ? "GPU" : "GPU",
      value: "NVIDIA Ampere (918MHz)"
    }, {
      label: language === 'zh' ? "CPU" : "CPU",
      value: "8-core Arm Cortex-A78AE"
    }, {
      label: language === 'zh' ? "重量" : "Weight",
      value: "188g"
    }, {
      label: language === 'zh' ? "尺寸" : "Dimensions",
      value: "102.5×62.5×31mm"
    }],
    uwb: [{
      label: language === 'zh' ? "定位精度" : "Positioning Accuracy",
      value: "10cm"
    }, {
      label: language === 'zh' ? "刷新率" : "Refresh Rate",
      value: "200Hz"
    }, {
      label: language === 'zh' ? "延迟" : "Latency",
      value: "<0.5ms"
    }, {
      label: language === 'zh' ? "标签数量" : "Max Tags",
      value: "200"
    }, {
      label: language === 'zh' ? "基站数量" : "Max Base Stations",
      value: "120"
    }, {
      label: language === 'zh' ? "通信距离" : "Communication Range",
      value: "500m"
    }, {
      label: language === 'zh' ? "数传带宽" : "Data Bandwidth",
      value: "3Mbps"
    }, {
      label: language === 'zh' ? "重量" : "Weight",
      value: "34.3g"
    }]
  };
  const packageList = [{
    name: language === 'zh' ? "250轴距无人机" : "250mm Drone",
    spec: language === 'zh' ? "基础飞行平台(含机架、飞控等)" : "Flight platform (frame, FC, etc.)",
    qty: "3"
  }, {
    name: language === 'zh' ? "螺旋桨" : "Propellers",
    spec: language === 'zh' ? "6寸三叶桨" : "6-inch 3-blade",
    qty: language === 'zh' ? "6对" : "6 pairs"
  }, {
    name: language === 'zh' ? "遥控器" : "Remote Controller",
    spec: "Amovlab-E2",
    qty: "3"
  }, {
    name: language === 'zh' ? "通信模块(移动端)" : "Comm Module (Mobile)",
    spec: "Mini Homer",
    qty: "6"
  }, {
    name: language === 'zh' ? "通信模块(基站端)" : "Comm Module (Base)",
    spec: "Mini Homer",
    qty: "1"
  }, {
    name: language === 'zh' ? "定位基站" : "UWB Base Station",
    spec: "Linktrack P-B",
    qty: "4"
  }, {
    name: language === 'zh' ? "定位标签" : "UWB Tag",
    spec: "Linktrack P-B",
    qty: "3"
  }, {
    name: language === 'zh' ? "机载电脑" : "Onboard Computer",
    spec: "Allspark2 Orin NX",
    qty: "3"
  }, {
    name: language === 'zh' ? "仿真遥控器" : "Simulation Controller",
    spec: "富斯 16S",
    qty: "1"
  }, {
    name: language === 'zh' ? "仿真电脑" : "Simulation PC",
    spec: "SWNUC12WSKi5000",
    qty: "1"
  }, {
    name: language === 'zh' ? "动力电池" : "Battery",
    spec: "4S 5300mAh LiPo",
    qty: "3"
  }, {
    name: language === 'zh' ? "充电器" : "Charger",
    spec: "1SDT-PD60",
    qty: "3"
  }];
  const formations = [language === 'zh' ? "三角队形" : "Triangle", language === 'zh' ? "纵向一字" : "Column", language === 'zh' ? "方形队形" : "Square", language === 'zh' ? "圆形队形" : "Circle", language === 'zh' ? "圆形环绕" : "Circle Orbit", language === 'zh' ? "主从跟随" : "Leader-Follower", language === 'zh' ? "队形变换" : "Formation Switch", language === 'zh' ? "位置控制" : "Position Control"];
  return <div className="min-h-screen bg-background">
      <MultiLanguageSEO title={language === 'zh' ? "P230-UWB 集群编队开发套件" : "P230-UWB Swarm Development Kit"} description={language === 'zh' ? "Prometheus230-UWB三机集群编队开发套件，准行业级科研无人机集群开发平台，支持UWB高精度定位、NVIDIA Jetson机载计算、ROS/PX4开源系统。" : "Prometheus230-UWB 3-drone swarm development kit, research-grade drone swarm platform with UWB positioning, NVIDIA Jetson computing, ROS/PX4 open-source."} keywords={language === 'zh' ? "集群编队,无人机集群,UWB定位,Prometheus,PX4,ROS,Jetson Orin,科研无人机" : "swarm formation,drone swarm,UWB positioning,Prometheus,PX4,ROS,Jetson Orin,research drone"} path="/products/swarm-kit" />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt="P230-UWB Swarm Kit" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </div>

          <div className="container-custom relative z-10 text-center py-20">
            <motion.div initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} className="mb-4">
              <BackButton to="/products" label={language === 'zh' ? '返回产品中心' : 'Back to Products'} />
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }}>
              <Badge className="bg-accent/90 text-accent-foreground mb-4">
                Prometheus 230-UWB
              </Badge>
            </motion.div>

            <motion.h1 initial={{
            opacity: 0,
            y: 50
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              {language === 'zh' ? '集群编队开发套件' : 'Swarm Development Kit'}
            </motion.h1>

            <motion.p initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.4
          }} className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8">
              {language === 'zh' ? '准行业级科研无人机集群开发平台' : 'Research-Grade Drone Swarm Development Platform'}
            </motion.p>

            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.6
          }} className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8">
                  {language === 'zh' ? '立即咨询' : 'Contact Us'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 1,
          delay: 0.8
        }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <ChevronDown className="w-6 h-6 text-white/60 animate-bounce" />
          </motion.div>
        </section>

        {/* Key Highlights */}
        <section className="py-12 bg-accent/10">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[{
              value: "3",
              label: language === 'zh' ? "机编队" : "Drones"
            }, {
              value: "10cm",
              label: language === 'zh' ? "定位精度" : "Accuracy"
            }, {
              value: "100",
              label: language === 'zh' ? "TOPS算力" : "TOPS AI"
            }, {
              value: "200Hz",
              label: language === 'zh' ? "刷新率" : "Refresh Rate"
            }].map((item, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1
            }}>
                  <div className="text-3xl md:text-4xl font-black text-accent">{item.value}</div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                {language === 'zh' ? '核心优势' : 'Key Features'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'zh' ? '基于ROS和PX4开源平台，结合阿木实验室Prometheus集群控制系统' : 'Based on ROS and PX4 open-source platforms with Prometheus swarm control system'}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1
            }}>
                  <Card className="h-full bg-card border-accent/10 hover:border-accent/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* UWB Positioning Section */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }}>
                <Badge className="mb-4">{language === 'zh' ? 'UWB定位技术' : 'UWB Technology'}</Badge>
                <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
                  {language === 'zh' ? '厘米级高精度定位' : 'Centimeter-Level Positioning'}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {language === 'zh' ? 'UWB标签与基站之间能够相互通信并测距，通过三个以上的UWB端对标签测距，并将测距结果发送给有线连接基站的地面端电脑，通过上位机进行解算出标签在基站坐标系下的位置值。' : 'UWB tags and base stations communicate and measure distances. Three or more UWB endpoints measure distances to tags, sending results to a ground computer for position calculation in the base station coordinate system.'}
                </p>
                <ul className="space-y-3">
                  {[language === 'zh' ? "基站搭建简易，灵活用于室内外场景" : "Easy base station setup, flexible for indoor/outdoor", language === 'zh' ? "适用于无GPS、光线昏暗的特殊环境" : "Works in GPS-denied, low-light environments", language === 'zh' ? "精度达到厘米级，刷新率200Hz" : "Centimeter accuracy, 200Hz refresh rate", language === 'zh' ? "低延迟(<0.5ms)，高性价比" : "Low latency (<0.5ms), cost-effective"].map((item, index) => <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>)}
                </ul>
              </motion.div>
              <motion.div initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }}>
                <img src={uwbImage} alt="UWB Positioning" className="rounded-2xl shadow-2xl w-full" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Formation Modes */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} className="order-2 lg:order-1">
                <img alt="Formation Modes" className="rounded-2xl shadow-2xl w-full" src="/lovable-uploads/0691809d-4d01-442d-aeb4-0d42e61e945a.png" />
              </motion.div>
              <motion.div initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} className="order-1 lg:order-2">
                <Badge className="mb-4">{language === 'zh' ? '编队功能' : 'Formation Modes'}</Badge>
                <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
                  {language === 'zh' ? '多种编队模式' : 'Multiple Formation Patterns'}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {language === 'zh' ? '基于ROS的无人机编队一键飞行、降落、队形变换演示，提供ROS开发接口。' : 'ROS-based one-click takeoff, landing, and formation switching with ROS development interface.'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {formations.map((formation, index) => <Badge key={index} variant="secondary" className="text-sm">
                      {formation}
                    </Badge>)}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Communication System */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} className="text-center mb-12">
              <Badge className="mb-4">{language === 'zh' ? '集群通信' : 'Swarm Communication'}</Badge>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                {language === 'zh' ? '集群通信软件系统' : 'Swarm Communication Software System'}
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                {language === 'zh' 
                  ? '集群通信软件系统采用分布式架构，利用socket网络编程技术和TCP/IP通信机制实现。CANI地面站和无人机通信节点都创建了TCP的server端和client端，地面站向无人机发送控制指令、无人机向地面站返回心跳包都走的TCP通信。' 
                  : 'The swarm communication software system uses a distributed architecture, implemented with socket network programming and TCP/IP protocols. Both the CANI ground station and drone communication nodes create TCP server and client endpoints. Control commands from ground station to drones and heartbeat packets from drones to ground station all use TCP communication.'}
              </p>
            </motion.div>
            <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} className="flex justify-center">
              <img 
                src={communicationImage} 
                alt={language === 'zh' ? '集群通信软件系统架构图' : 'Swarm Communication System Architecture'} 
                className="rounded-2xl shadow-2xl max-w-4xl w-full bg-white p-4" 
              />
            </motion.div>
          </div>
        </section>

        {/* Ground Station */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }}>
                <Badge className="mb-4">CANI Ground Station</Badge>
                <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
                  {language === 'zh' ? '专业地面站系统' : 'Professional Ground Station'}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {language === 'zh' ? 'CANI地面站是使用Qt开发的基于CANI系统的人机交互界面，采用TCP/UDP通信，避免了ROS1多机通信繁琐的配置。' : 'CANI Ground Station is a Qt-based GUI for the CANI system, using TCP/UDP communication to simplify multi-drone ROS1 configuration.'}
                </p>
                <ul className="space-y-3">
                  {[language === 'zh' ? "实时监控多机状态" : "Real-time multi-drone monitoring", language === 'zh' ? "一键编队控制" : "One-click formation control", language === 'zh' ? "可视化飞行轨迹" : "Visual flight trajectory", language === 'zh' ? "简化ROS通信配置" : "Simplified ROS communication"].map((item, index) => <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>)}
                </ul>
              </motion.div>
              <motion.div initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }}>
                <img src={groundStationImage} alt="Ground Station" className="rounded-2xl shadow-2xl w-full" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                {language === 'zh' ? '规格参数' : 'Specifications'}
              </h2>
            </motion.div>

            <Tabs defaultValue="drone" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="drone">{language === 'zh' ? '飞行平台' : 'Aircraft'}</TabsTrigger>
                <TabsTrigger value="computer">{language === 'zh' ? '机载电脑' : 'Computer'}</TabsTrigger>
                <TabsTrigger value="uwb">{language === 'zh' ? 'UWB模块' : 'UWB Module'}</TabsTrigger>
              </TabsList>

              {Object.entries(specifications).map(([key, specs]) => <TabsContent key={key} value={key}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {specs.map((spec, index) => <div key={index} className="flex justify-between py-3 border-b border-accent/10 last:border-0">
                            <span className="text-muted-foreground">{spec.label}</span>
                            <span className="font-medium text-foreground">{spec.value}</span>
                          </div>)}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>)}
            </Tabs>
          </div>
        </section>

        {/* Package List */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                {language === 'zh' ? '配置清单' : 'Package Contents'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'zh' ? 'P230-UWB 三机集群编队套件 (P2U3-SFK) 完整配置' : 'P230-UWB 3-Drone Swarm Kit (P2U3-SFK) Complete Package'}
              </p>
            </motion.div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-accent/10 bg-accent/5">
                        <th className="text-left p-4 font-semibold">{language === 'zh' ? '名称' : 'Item'}</th>
                        <th className="text-left p-4 font-semibold">{language === 'zh' ? '规格型号' : 'Specification'}</th>
                        <th className="text-center p-4 font-semibold">{language === 'zh' ? '数量' : 'Qty'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packageList.map((item, index) => <tr key={index} className="border-b border-accent/10 last:border-0">
                          <td className="p-4 font-medium">{item.name}</td>
                          <td className="p-4 text-muted-foreground">{item.spec}</td>
                          <td className="p-4 text-center">{item.qty}</td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-cyan-500/10">
          <div className="container-custom text-center">
            <motion.div initial={{
            opacity: 0,
            y: 40
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }}>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
                {language === 'zh' ? '开启集群研究之旅' : 'Start Your Swarm Research'}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {language === 'zh' ? '联系我们获取详细报价和技术支持' : 'Contact us for detailed pricing and technical support'}
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8">
                  {language === 'zh' ? '立即咨询' : 'Contact Us'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContact />
    </div>;
};
export default SwarmKit;