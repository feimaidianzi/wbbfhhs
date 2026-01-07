import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Cpu, Zap, Shield, Settings, Thermometer, Gauge, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 飞塔套装（按用户提供的5款产品更新）
const stacks = [
  {
    id: "stack-mini-f7-55a",
    name: "阿格斯 Mini F7+55A飞塔",
    model: "ARGUS Mini 55A F7",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/b67564581a.jpg",
    category: "飞塔",
    highlights: [
      "STM32F722高性能处理器",
      "55A四合一电调，峰值65A",
      "25.5×25.5mm紧凑尺寸",
      "适配3-5寸穿越机架"
    ],
    specs: {
      fc: "STM32F722 + ICM42688",
      esc: "55A×4 BLHeli_32",
      voltage: "3-6S",
      size: "25.5×25.5mm",
      weight: "18g"
    },
    price: "¥599"
  },
  {
    id: "stack-f405-55a",
    name: "阿格斯 F405+55A飞塔",
    model: "ARGUS F405+55A",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/5b83900071.jpg",
    category: "飞塔",
    highlights: [
      "STM32F405处理器，高速运算",
      "55A四合一电调，峰值65A",
      "30.5×30.5mm标准孔距",
      "性价比之选，适配3-5寸机架"
    ],
    specs: {
      fc: "STM32F405 + ICM42688",
      esc: "55A×4 BLHeli_32",
      voltage: "3-6S",
      size: "30.5×30.5mm",
      weight: "25g"
    },
    price: "¥439"
  },
  {
    id: "stack-f405-60a",
    name: "阿格斯 F405+60A飞塔",
    model: "ARGUS F405+60A",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2411/25/products/4b65e095d8.jpg",
    category: "飞塔",
    highlights: [
      "STM32F405处理器",
      "60A四合一电调，峰值75A",
      "优化PCB散热设计",
      "穿越竞速首选"
    ],
    specs: {
      fc: "STM32F405 + ICM42688",
      esc: "60A×4 BLHeli_32",
      voltage: "3-6S",
      size: "30.5×30.5mm",
      weight: "28g"
    },
    price: "¥489"
  },
  {
    id: "stack-mini-f7-40a",
    name: "阿格斯 Mini F7+40A飞塔",
    model: "ARGUS Mini F7 40A",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/c50b7a84c3.jpg",
    category: "飞塔",
    highlights: [
      "STM32F722处理器高性能",
      "40A四合一电调",
      "20×20mm紧凑孔距设计",
      "适配2-3寸微型机架"
    ],
    specs: {
      fc: "STM32F722 + BMI270",
      esc: "40A×4 BLHeli_32",
      voltage: "3-6S",
      size: "20×20mm",
      weight: "12g"
    },
    price: "¥579"
  },
  {
    id: "stack-pro-f722-100a",
    name: "Argus Pro F722 100A/80A飞塔",
    model: "Argus Pro F722 100A/80A",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2508/04/products/1-1-1417311ad5.jpg",
    category: "飞塔",
    highlights: [
      "STM32F722双陀螺仪设计",
      "100A/80A可选大电流输出",
      "8层PCB专业级散热",
      "5-7寸大载重机型首选"
    ],
    specs: {
      fc: "STM32F722 + 双ICM42688",
      esc: "100A/80A×4 BLHeli_32",
      voltage: "3-8S",
      size: "30.5×30.5mm",
      weight: "42g"
    },
    price: "¥959"
  }
];

// 六合一电调（新增类目）
const sixInOneEscs = [
  {
    id: "6in1-80a",
    name: "Argus六合一80A电调",
    model: "ARGUS 6-in-1 80A",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2510/31/products/1.jpg",
    category: "六合一电调",
    highlights: [
      "六合一设计（含2路备用）",
      "80A持续电流，峰值100A",
      "8层PCB大电流设计",
      "4-8S宽电压支持"
    ],
    specs: {
      current: "80A (持续) / 100A (峰值)",
      channels: "6通道",
      voltage: "4-8S",
      protocol: "DShot1200/600/300",
      size: "45×45mm",
      weight: "55g"
    },
    price: "¥729"
  },
  {
    id: "6in1-100a",
    name: "Argus六合一100A电调",
    model: "ARGUS 6-in-1 100A",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2510/31/products/4.jpg",
    category: "六合一电调",
    highlights: [
      "六合一设计（含2路备用）",
      "100A持续电流，峰值120A",
      "多颗并联MOS阵列",
      "专业级大载重应用"
    ],
    specs: {
      current: "100A (持续) / 120A (峰值)",
      channels: "6通道",
      voltage: "4-8S",
      protocol: "DShot1200/600/300",
      size: "50×50mm",
      weight: "65g"
    },
    price: "¥899"
  }
];

// 飞控产品数据
const flightControllers = [
  {
    id: "fc-f405",
    name: "AxisFlying F405飞控",
    model: "ARGUS F405",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2509/25/products/2.jpg",
    category: "飞控",
    processor: "STM32F405",
    highlights: [
      "STM32F405处理器，高速运算",
      "ICM42688陀螺仪",
      "支持Betaflight/INAV固件",
      "板载OSD芯片"
    ],
    specs: {
      mcu: "STM32F405",
      gyro: "ICM42688",
      voltage: "3-6S",
      size: "30.5×30.5mm",
      weight: "8g"
    },
    price: "¥229"
  },
  {
    id: "fc-f722",
    name: "ARGUS阿格斯 F7飞控",
    model: "ARGUS F722",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/23/products/3360a61357.jpg",
    category: "飞控",
    processor: "STM32F722",
    highlights: [
      "STM32F722处理器，更高性能",
      "双陀螺仪设计，稳定可靠",
      "5个UART串口",
      "支持HD VTX控制"
    ],
    specs: {
      mcu: "STM32F722",
      gyro: "双ICM42688",
      voltage: "3-8S",
      size: "30.5×30.5mm",
      weight: "9g"
    },
    price: "¥399"
  }
];

// 四合一电调产品数据
const escs = [
  {
    id: "esc-55a",
    name: "ARGUS阿格斯 55/65A电调",
    model: "ARGUS 55/65A 4-in-1",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/23/products/c3752e8785.jpg",
    category: "四合一电调",
    current: "55A",
    highlights: [
      "持续55A，峰值65A",
      "3-6S LiPo支持",
      "32位处理器，BLHeli_32",
      "低电阻MOS，高效散热"
    ],
    specs: {
      current: "55A (持续) / 65A (峰值)",
      voltage: "3-6S",
      protocol: "DShot1200/600/300",
      size: "30.5×30.5mm",
      weight: "12g"
    },
    price: "¥449"
  },
  {
    id: "esc-60a",
    name: "Argus ECO 60A V2电调",
    model: "ARGUS ECO 60A V2",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2411/09/products/ab393fb2ff.jpg",
    category: "四合一电调",
    current: "60A",
    highlights: [
      "持续60A，峰值75A",
      "优化PCB散热设计",
      "支持48KHz PWM频率",
      "电流传感器内置"
    ],
    specs: {
      current: "60A (持续) / 75A (峰值)",
      voltage: "3-6S",
      protocol: "DShot1200/600/300",
      size: "30.5×30.5mm",
      weight: "14g"
    },
    price: "¥335"
  },
  {
    id: "esc-80a",
    name: "Argus Pro 80A电调",
    model: "ARGUS Pro 80A 4-in-1",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2509/25/products/32.jpg",
    category: "四合一电调",
    current: "80A",
    highlights: [
      "持续80A，峰值100A",
      "3-8S宽电压支持",
      "大功率MOS阵列",
      "8层PCB高效散热"
    ],
    specs: {
      current: "80A (持续) / 100A (峰值)",
      voltage: "3-8S",
      protocol: "DShot1200/600/300",
      size: "45×45mm",
      weight: "28g"
    },
    price: "¥759"
  },
  {
    id: "esc-100a",
    name: "Argus Pro 100A电调",
    model: "ARGUS Pro 100A 4-in-1",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2509/25/products/8.jpg",
    category: "四合一电调",
    current: "100A",
    highlights: [
      "持续100A，峰值120A",
      "8层PCB设计",
      "多颗并联MOS",
      "专业大载重应用"
    ],
    specs: {
      current: "100A (持续) / 120A (峰值)",
      voltage: "4-8S",
      protocol: "DShot1200/600/300",
      size: "50×50mm",
      weight: "45g"
    },
    price: "¥959"
  }
];

// 分体电调
const separateEscs = [
  {
    id: "separate-esc-80a",
    name: "Argus阿格斯80A分体电调",
    model: "ARGUS 80A SEP",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2511/01/products/1--0950563810.jpg",
    category: "分体电调",
    highlights: [
      "单臂独立安装",
      "80A持续输出",
      "散热效果极佳",
      "方便维护更换"
    ],
    specs: {
      current: "80A (持续) / 100A (峰值)",
      voltage: "4-8S",
      protocol: "DShot1200",
      size: "35×17mm",
      weight: "12g/个"
    },
    price: "¥219"
  },
  {
    id: "separate-esc-100a",
    name: "Argus阿格斯100A分体电调",
    model: "ARGUS 100A SEP",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2511/01/products/3-095056bd79.jpg",
    category: "分体电调",
    highlights: [
      "大载重无人机专用",
      "100A持续大电流",
      "独立散热片",
      "工业级可靠性"
    ],
    specs: {
      current: "100A (持续) / 120A (峰值)",
      voltage: "4-12S",
      protocol: "DShot1200",
      size: "40×22mm",
      weight: "18g/个"
    },
    price: "¥289"
  }
];

const features = [
  {
    icon: Cpu,
    title: "高性能处理器",
    description: "采用STM32F4/F7/H7系列处理器，高速运算，稳定飞控"
  },
  {
    icon: Zap,
    title: "大电流设计",
    description: "多层PCB设计，低电阻MOS阵列，支持高功率电机驱动"
  },
  {
    icon: Thermometer,
    title: "高效散热",
    description: "铝基板设计，优化散热路径，保障长时间稳定运行"
  },
  {
    icon: Shield,
    title: "保护机制",
    description: "过流、过温、欠压多重保护，安全可靠"
  },
  {
    icon: Settings,
    title: "灵活配置",
    description: "支持Betaflight/INAV固件，丰富的配置选项"
  },
  {
    icon: Gauge,
    title: "即插即用",
    description: "飞塔套装预配线材，快速安装，省时省力"
  }
];

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    model: string;
    image: string;
    category: string;
    highlights: string[];
    specs: Record<string, string>;
    price: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => (
  <Link to={`/products/accessories/fc-esc/${product.id}`} className="block">
    <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 group">
      <div className="aspect-square bg-muted/30 p-6 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">{product.category}</span>
        </div>
        <h3 className="text-lg font-bold mb-1">{product.name}</h3>
        <p className="text-xs text-muted-foreground mb-3">{product.model}</p>
        
        <ul className="space-y-1 mb-4">
          {product.highlights.slice(0, 3).map((highlight, idx) => (
            <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
              <span className="text-primary mt-0.5">•</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-lg font-bold text-primary">{product.price}</span>
          <span className="text-xs text-primary flex items-center">
            查看详情
            <ChevronRight className="w-3 h-3 ml-1" />
          </span>
        </div>
      </div>
    </div>
  </Link>
);

const FcEsc = () => {
  return (
    <>
      <SEO 
        title="飞控/电调 - 飞塔系列 - 飞迈科技"
        description="飞迈科技飞控电调产品系列，包括F405/F722/H743飞控、55A-100A电调、飞塔套装、六合一电调等，专业FPV穿越机电子产品"
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4">
            <Link to="/products/accessories" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
              <ArrowLeft className="w-4 h-4" />
              返回配件列表
            </Link>
            
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                飞塔系列
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                高性能飞控与电调产品系列，涵盖F405/F722/H743飞控、多规格四合一电调、飞塔套装、六合一电调等，
                满足从入门到专业级穿越机的全面需求。
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/contact">获取报价</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#products">查看产品</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-4 bg-card rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">产品系列</h2>
            </div>

            <Tabs defaultValue="stacks" className="w-full">
              <TabsList className="flex flex-wrap justify-start gap-2 mb-8 bg-transparent h-auto">
                <TabsTrigger value="stacks" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  飞塔套装
                </TabsTrigger>
                <TabsTrigger value="6in1" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  六合一电调
                </TabsTrigger>
                <TabsTrigger value="fc" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  飞控
                </TabsTrigger>
                <TabsTrigger value="esc" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  四合一电调
                </TabsTrigger>
                <TabsTrigger value="separate" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  分体电调
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stacks">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {stacks.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="6in1">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {sixInOneEscs.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="fc">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {flightControllers.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="esc">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {escs.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="separate">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {separateEscs.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-3">需要定制化解决方案？</h2>
            <p className="text-base opacity-90 mb-6 max-w-2xl mx-auto">
              我们提供OEM/ODM定制服务，可根据您的需求定制飞控固件、电调参数、飞塔配置等。
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">联系我们</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
};

export default FcEsc;
