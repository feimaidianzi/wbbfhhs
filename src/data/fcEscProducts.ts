// FC/ESC 产品数据
// 图片资产导入
import fcEsc80a from '@/assets/products/fc-esc-80a.jpg';
import icf5HeroClean from '@/assets/products/icf5-hero-clean.jpg';
import icf5DetailFull from '@/assets/products/icf5-detail-full.jpg';
import icf5Angle3Clean from '@/assets/products/icf5-angle3-clean.jpg';
import icf5Angle4Clean from '@/assets/products/icf5-angle4-clean.jpg';
import pixhawk4Hero from '@/assets/products/pixhawk4-hero.webp';
import pixhawk4Accessories from '@/assets/products/pixhawk4-accessories.webp';
import pixhawk4Cables from '@/assets/products/pixhawk4-cables.webp';
import pixhawk4Fmu from '@/assets/products/pixhawk4-fmu.webp';
import pixhawk4Dual from '@/assets/products/pixhawk4-dual.webp';
import pixhawk4Dimensions from '@/assets/products/pixhawk4-dimensions.webp';
import pixhawk4Cables2 from '@/assets/products/pixhawk4-cables2.webp';
import pixhawk4VibrationClean from '@/assets/products/pixhawk4-vibration-clean.webp';
import esc55a6Clean from '@/assets/products/esc-55a-6-clean.jpg';
import fcF722_3Clean from '@/assets/products/fc-f722-3-clean.jpg';
import fcEsc100a from '@/assets/products/fc-esc-100a.jpg';
import fcEsc100aAngle from '@/assets/products/fc-esc-100a-angle.jpg';
import fcEscPcbBack from '@/assets/products/fc-esc-pcb-back.jpg';
import fcF405_1 from '@/assets/products/fc-f405-1.jpg';
import fcF405_2 from '@/assets/products/fc-f405-2.jpg';
import fcF405_4 from '@/assets/products/fc-f405-4.jpg';
import fcF722_1 from '@/assets/products/fc-f722-1.jpg';
import fcF722_2 from '@/assets/products/fc-f722-2.jpg';
import fcF722_3 from '@/assets/products/fc-f722-3.jpg';
import fcF722_4 from '@/assets/products/fc-f722-4.jpg';
import fcF722_5 from '@/assets/products/fc-f722-5.jpg';
import fcF722_6 from '@/assets/products/fc-f722-6.jpg';
import esc55a_1 from '@/assets/products/esc-55a-1.jpg';
import esc55a_2 from '@/assets/products/esc-55a-2.jpg';
import esc55a_3 from '@/assets/products/esc-55a-3.jpg';
import esc55a_4 from '@/assets/products/esc-55a-4.jpg';
import esc55a_5 from '@/assets/products/esc-55a-5.jpg';
import esc55a_6 from '@/assets/products/esc-55a-6.jpg';
import esc60a_1 from '@/assets/products/esc-60a-1.jpg';
import esc60a_2 from '@/assets/products/esc-60a-2.jpg';
import esc80a_1 from '@/assets/products/esc-80a-1.jpg';
import esc80a_2 from '@/assets/products/esc-80a-2.jpg';
import esc80a_3 from '@/assets/products/esc-80a-3.jpg';
import esc80a_4 from '@/assets/products/esc-80a-4.jpg';
import esc80a_5 from '@/assets/products/esc-80a-5.jpg';
import esc100a_1 from '@/assets/products/esc-100a-1.jpg';
import esc100a_2 from '@/assets/products/esc-100a-2.jpg';
import separateEsc80a_1 from '@/assets/products/separate-esc-80a-1.jpg';
import separateEsc80a_2 from '@/assets/products/separate-esc-80a-2.jpg';
import separateEsc80a_3 from '@/assets/products/separate-esc-80a-3.jpg';
import separateEsc80a_4 from '@/assets/products/separate-esc-80a-4.jpg';
import separateEsc80a_5 from '@/assets/products/separate-esc-80a-5.jpg';
import separateEsc100a_1 from '@/assets/products/separate-esc-100a-1.jpg';
import separateEsc100a_2 from '@/assets/products/separate-esc-100a-2.jpg';
import separateEsc100a_3 from '@/assets/products/separate-esc-100a-3.jpg';

export interface FcEscProduct {
  id: string;
  name: string;
  model: string;
  category: "飞塔" | "飞控" | "四合一电调" | "六合一电调" | "分体电调" | "科研飞控";
  hot?: boolean;
  image: string;
  images?: string[];
  price: string;
  highlights: string[];
  description: string[];
  fcSpecs?: {
    mcu: string;
    gyro: string;
    osd?: string;
    blackbox?: string;
    uart?: string;
    voltage: string;
    bec?: string;
    size: string;
    weight: string;
    firmware?: string;
  };
  escSpecs?: {
    current: string;
    peakCurrent?: string;
    voltage: string;
    protocol: string;
    mosfet?: string;
    pcbLayers?: string;
    size: string;
    weight: string;
  };
  features?: string[];
  visualFeatures?: { icon: string; title: string; desc: string }[];
  notes?: string[];
  packageIncludes?: string[];
}

// 飞塔套装产品
export const stackProducts: FcEscProduct[] = [
  {
    id: "stack-mini-f7-55a",
    name: "FlyMind Mini F7+55A飞塔",
    model: "FlyMind Mini 55A F7",
    category: "飞塔",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/b67564581a.jpg",
    images: [
      "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/b67564581a.jpg",
      "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/b78828fb64.jpg",
      "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/05f45628ec.jpg",
      "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/ba2a10b0ec.jpg",
      "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/f5d88edf91.jpg"
    ],
    price: "¥599",
    highlights: [
      "STM32F722高性能处理器",
      "ICM42688 陀螺仪，稳定可靠",
      "55A四合一电调，峰值65A",
      "25.5×25.5mm紧凑尺寸",
      "适配3-5寸穿越机架",
      "3-6S 宽电压输入"
    ],
    description: [
      "采用STM32F722高性能MCU，运算速度快，响应迅速",
      "搭载ICM42688陀螺仪，抗震性能优异",
      "55A持续电流，峰值65A，满足高性能电机需求",
      "BLHeli_32 固件，支持DShot1200协议",
      "紧凑的25.5×25.5mm孔距，适配Mini机架",
      "板载OSD芯片，支持Betaflight OSD",
      "多层PCB设计，散热性能优秀",
      "飞塔一体化设计，安装便捷"
    ],
    fcSpecs: {
      mcu: "STM32F722",
      gyro: "ICM42688",
      osd: "板载AT7456E",
      blackbox: "16MB SPI Flash",
      uart: "4个UART",
      voltage: "3-6S LiPo",
      bec: "5V/3A, 9V/2A",
      size: "25.5×25.5mm (M2)",
      weight: "5g",
      firmware: "Betaflight"
    },
    escSpecs: {
      current: "55A (持续)",
      peakCurrent: "65A (峰值)",
      voltage: "3-6S LiPo",
      protocol: "DShot1200/600/300, PWM, Oneshot",
      mosfet: "低内阻MOS管",
      pcbLayers: "4层PCB",
      size: "25.5×25.5mm (M2)",
      weight: "13g"
    },
    features: [
      "飞控与电调采用插针连接，安装更便捷",
      "电调采用焊盘设计，可自由选择焊接方式",
      "支持Betaflight/INAV固件",
      "支持SmartAudio/Tramp智能音频协议",
      "过流、过温、欠压多重保护"
    ],
    notes: [
      "首次使用请更新至最新固件",
      "焊接时请注意电压输入极性，防止反接烧毁",
      "大功率使用时请确保良好散热"
    ],
    packageIncludes: [
      "Mini F7飞控 x1",
      "55A四合一电调 x1",
      "连接插针 x1套",
      "硅胶线材 x1套",
      "防震海绵 x4"
    ]
  },
  {
    id: "stack-f405-55a",
    name: "CANI Stack F405-55A 工业级飞速塔",
    model: "Stack F405-55A",
    category: "飞塔",
    hot: true,
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/5b83900071.jpg",
    images: [
      "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/5b83900071.jpg"
    ],
    price: "¥439",
    highlights: [
      "STM32F405RGT6 处理器，工业级成熟稳定",
      "ICM42688 SPI 低漂移陀螺仪",
      "55A 持续 / 65A 峰值四合一电调",
      "30.5×30.5mm 标准安装，3-6S LiPo",
      "射频隔离 PCB 设计，搭配高功率图传无干扰"
    ],
    description: [
      "CANI Stack F405-55A 是一款专为 5-7 英寸机型设计的工业级标准孔位动力总成。它采用经过数千次工程验证的 STM32F405 处理器，搭配 ICM42688 低噪声陀螺仪，并配备支持 3S-6S 供电的 55A 持续电流四合一电调。",
      "区别于普通民用飞塔，CANI 在 PCB 布局层面实施了严格的信号隔离——模拟信号区域与数字信号区域采用地平面分割技术，有效抑制 ESC 开关噪声对飞控传感器的耦合干扰。",
      "低内阻 MOSFET 选型与四层 PCB 散热工艺，确保在 35°C 高温环境下持续满载工作时效率衰减低于 5%。",
      "在教育科研场景中可作为 CANI-FC v2.0 的动力执行端；在特种巡检中与 FV10W-72 高功率图传形成低干扰动力+视频闭环。"
    ],
    fcSpecs: {
      mcu: "STM32F405",
      gyro: "ICM42688",
      osd: "板载AT7456E",
      blackbox: "8MB SPI Flash",
      uart: "4个UART",
      voltage: "3-6S LiPo",
      bec: "5V/3A, 9V/2A",
      size: "30.5×30.5mm (M3)",
      weight: "8g",
      firmware: "Betaflight"
    },
    escSpecs: {
      current: "55A (持续)",
      peakCurrent: "65A (峰值)",
      voltage: "3-6S LiPo",
      protocol: "DShot1200/600/300",
      mosfet: "低内阻MOS",
      pcbLayers: "4层PCB",
      size: "30.5×30.5mm (M3)",
      weight: "17g"
    },
    features: [
      "飞控与电调通过排针连接",
      "支持Betaflight/INAV固件",
      "板载OSD支持",
      "LED接口支持"
    ],
    packageIncludes: [
      "F405飞控 x1",
      "55A四合一电调 x1",
      "连接线材 x1套"
    ]
  },
  {
    id: "stack-f405-60a",
    name: "CANI Stack F405-60A 大电流工业飞速塔",
    model: "Stack F405-60A",
    category: "飞塔",
    hot: true,
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2411/25/products/4b65e095d8.jpg",
    images: [
      "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2411/25/products/4b65e095d8.jpg"
    ],
    price: "¥489",
    highlights: [
      "STM32F405RGT6 处理器 (168MHz)",
      "MPU6000 SPI 工业级陀螺仪",
      "60A 持续 / 80A 峰值四合一电调",
      "CNC 阳极氧化铝散热罩，48KHz PWM",
      "双向 DShot 遥测，适配大载重 X8 架构"
    ],
    description: [
      "CANI Stack F405-60A 是一款集高性能、高电流冗余与出色散热于一体的工业级动力控制套装。其飞控采用 STM32F405 主控与经典 MPU6000 陀螺仪，电调支持单路 60A 持续电流输出，兼容 3S-6S 动力系统。",
      "区别于 55A 版本，60A 电调配备了面积更大的 CNC 阳极氧化铝合金散热罩，结合高热导率硅胶片，确保在 6S 高压工况下 MOSFET 结温保持安全范围。实测 40°C 环境满载 30 分钟，温升曲线始终稳定。",
      "支持双向 DShot 遥测，飞控可实时获取电机转速数据并执行 RPM 陷波滤波，有效抑制螺旋桨共振、监测电机异常，为工业级安全预警提供数据支撑。",
      "专为大载重 FPV、X8 共轴巡检机、系留无人机及科研教学平台设计。搭配 FV10W-72 图传时，EMI 优化布局确保全速飞行下视频流不受干扰。"
    ],
    fcSpecs: {
      mcu: "STM32F405RGT6 (168MHz)",
      gyro: "MPU6000 (SPI)",
      osd: "板载AT7456E",
      blackbox: "8MB SPI Flash",
      uart: "5个UART, 1个I2C",
      voltage: "3-6S LiPo",
      bec: "5V/3A, 9V/2A",
      size: "30.5×30.5mm (M3)",
      weight: "8g",
      firmware: "Betaflight / INAV"
    },
    escSpecs: {
      current: "60A (持续)",
      peakCurrent: "80A (峰值 10s)",
      voltage: "3-6S LiPo",
      protocol: "DShot1200 (双向) / DShot600/300",
      mosfet: "低内阻MOSFET阵列",
      pcbLayers: "4层PCB",
      size: "30.5×30.5mm (M3)",
      weight: "20g"
    },
    features: [
      "CNC阳极氧化铝合金散热罩",
      "支持48KHz PWM频率",
      "双向DShot遥测 (RPM Filter)",
      "电流传感器内置",
      "多层EMI屏蔽PCB布局"
    ],
    packageIncludes: [
      "F405飞控 x1",
      "60A四合一电调 x1",
      "CNC散热罩 x1",
      "连接线材 x1套"
    ]
  },
  {
    id: "stack-mini-f7-40a",
    name: "CANI Stack-Mini F7-40A 迷你飞速塔",
    model: "Stack-Mini F7-40A (20×20mm)",
    category: "飞塔",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/c50b7a84c3.jpg",
    images: [
      "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/c50b7a84c3.jpg"
    ],
    price: "¥579",
    highlights: [
      "STM32F722RGT6 处理器 (216MHz)，F7 级算力",
      "MPU6000 SPI 低噪声陀螺仪",
      "40A 持续 / 45A 峰值四合一电调",
      "20×20mm 极紧凑安装位，M3 孔径",
      "原生支持 3S-6S 高压动力系统",
      "双向 DShot 遥测，支持 RPM Filter"
    ],
    description: [
      "CANI Stack-Mini F7-40A 是一款高性能极小尺寸动力控制套装。飞控采用 STM32F722 处理核心（216MHz），在 20×20mm 的安装位内提供与大型机种抗衡的算力冗余。",
      "配合 MPU6000 低噪声陀螺仪，系统能够捕捉微小姿态偏差并利用 F7 浮点运算能力瞬间完成补偿，实现亚毫秒级 PID 闭环响应。",
      "40A 四合一电调选用低内阻工业级 MOSFET，在极小散热面积下实现极高热转换效率。原生 3S-6S 高压支持降低系统电流、延长巡检作业时间。",
      "支持双向 DShot 遥测（RPM Filter），飞控根据实时转速进行谐波过滤。专为 3-4 英寸紧凑型工业机、室内巡检、高性能 FPV 及科研集群控制平台设计。"
    ],
    fcSpecs: {
      mcu: "STM32F722RGT6 (216MHz)",
      gyro: "MPU6000 (SPI)",
      osd: "板载 AT7456E",
      blackbox: "8MB SPI Flash",
      uart: "3个UART",
      voltage: "3-6S LiPo",
      bec: "5V/2A, 10V/2A",
      size: "20×20mm (M3)",
      weight: "4g",
      firmware: "Betaflight"
    },
    escSpecs: {
      current: "40A (持续)",
      peakCurrent: "45A (峰值 10s)",
      voltage: "3-6S LiPo",
      protocol: "DShot600/300 (双向)",
      mosfet: "低内阻工业级MOSFET",
      pcbLayers: "4层PCB",
      size: "20×20mm (M3)",
      weight: "8g"
    },
    features: [
      "20×20mm 极紧凑飞塔一体化设计",
      "双向 DShot RPM Filter 精准谐波过滤",
      "5V/2A + 10V/2A 双路 BEC 支持高清图传",
      "适合 Cinewhoop/Toothpick/室内巡检机型",
      "科研集群控制理想实验平台"
    ],
    packageIncludes: [
      "Mini F7飞控 x1",
      "40A四合一电调 x1",
      "连接插针 x1套",
      "线材 x1套"
    ]
  },
  {
    id: "stack-pro-f722-100a",
    name: "CANI Stack-Pro F722-100A 工业级旗舰飞速塔",
    model: "Stack-Pro F722-100A",
    category: "飞塔",
    hot: true,
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2508/04/products/1-1-1417311ad5.jpg",
    images: [
      "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2508/04/products/1-1-1417311ad5.jpg",
      fcEsc80a,
      fcEsc100a,
      fcEsc100aAngle,
      fcEscPcbBack
    ],
    price: "¥959",
    highlights: [
      "STM32F722RGT6 (216MHz) 双 ICM42688 冗余陀螺仪",
      "100A 持续 / 120A 峰值四合一电调",
      "8 层 PCB 大电流散热设计",
      "全 CNC 阳极氧化铝合金散热外壳",
      "30.5×30.5mm 标准孔位，3-8S 宽电压",
      "双向 DShot 遥测，适配 9-13 英寸重载机型"
    ],
    description: [
      "CANI Stack-Pro F722-100A 是目前行业内集成度最高、功率最强的动力控制方案之一。飞控端搭载 STM32F722 极速核心与双 ICM42688 冗余陀螺仪，电调端提供单路 100A 持续的工业级输出能力。",
      "8 层 PCB 堆叠设计大幅增加铜层面积，显著降低大电流通道阻抗发热。配合全覆盖式 CNC 阳极氧化铝合金散热外壳与高导热硅脂，即使 40°C 环境满载作业核心温度也可控。",
      "针对 100A 大电流产生的强磁场干扰，飞控采用多层独立供电层（LDO 隔离），确保双陀螺仪数据不受动力线波动影响。双向 DShot 遥测支持实时电机转速监测与 RPM 陷波滤波。",
      "专为 9-13 英寸大载重 FPV、系留无人机、特种运输机及长航时巡检平台设计。搭配 FV10W-72 图传时 EMI 优化布局确保远距离视频流无干扰。"
    ],
    fcSpecs: {
      mcu: "STM32F722RGT6 (216MHz)",
      gyro: "双 ICM42688 (SPI，冗余设计)",
      osd: "板载AT7456E",
      blackbox: "32MB SPI Flash",
      uart: "8个UART",
      voltage: "3-8S LiPo",
      bec: "5V/3A, 9V/3A (大电流 BEC)",
      size: "30.5×30.5mm (M3，增强型焊盘)",
      weight: "10g",
      firmware: "Betaflight"
    },
    escSpecs: {
      current: "100A (持续)",
      peakCurrent: "120A (峰值 10s)",
      voltage: "3-8S LiPo",
      protocol: "DShot1200 (双向) / DShot600/300",
      mosfet: "多颗并联低内阻MOSFET阵列",
      pcbLayers: "8层PCB",
      size: "30.5×30.5mm (M3)",
      weight: "32g"
    },
    features: [
      "双 ICM42688 陀螺仪冗余设计",
      "8 层 PCB 大电流专业散热",
      "全 CNC 阳极氧化铝散热外壳",
      "双向 DShot RPM Filter 实时监测",
      "多层 LDO 隔离抗电磁干扰",
      "适配 9-13 英寸重载/系留平台"
    ],
    notes: [
      "大电流使用时请确保接线可靠，建议使用 12AWG 以上硅胶线",
      "首次使用请校准双陀螺仪",
      "长时间满载作业建议加装主动散热风扇"
    ],
    packageIncludes: [
      "Pro F722飞控 x1",
      "100A四合一电调 x1",
      "CNC散热外壳 x1",
      "连接线材 x1套",
      "说明书 x1"
    ]
  }
];

// 六合一电调
export const sixInOneEscProducts: FcEscProduct[] = [
  {
    id: "6in1-80a",
    name: "CANI-80A 工业级六合一电调",
    model: "CANI-80A 6-in-1 ESC",
    category: "六合一电调",
    hot: true,
    image: fcEsc80a,
    images: [
      fcEsc80a,
      fcEscPcbBack,
      fcEsc100a,
      fcEsc100aAngle
    ],
    price: "¥729",
    highlights: [
      "六合一集成设计，六旋翼专用 (含2路备用)",
      "单路 80A 持续 / 100A 峰值，工业级电流冗余",
      "8层 PCB + 全 CNC 铝合金散热上盖",
      "原生 MAVLink 遥测，转速/电压/温度实时回传",
      "3-6S 宽电压支持，DShot150/300/600",
      "减轻约 25% 动力系统重量，优化推重比"
    ],
    description: [
      "CANI-80A 是一款专为六旋翼无人机设计的高性能六合一电调。它打破了传统电调分散布局的局限，将六路高性能 ESC 整合至单一 PCB 模块，大幅简化中心板布线并降低故障点。",
      "单路持续电流高达 80A，峰值 100A。通过共享散热装甲与供电母线，相比六个独立电调减轻约 25% 动力系统重量，直接提升推重比。是 TH-300 系留无人机理想的动力配套方案。",
      "面对六路大电流热量叠加，采用加厚纯铝 CNC 散热上盖与内部大面积铺铜工艺，确保大电流持续爬升中 MOSFET 内阻维持极低水平，有效防止热失控。",
      "原生支持电调数据回传，将转速、电压、温度等关键信息通过 MAVLink 协议反馈至地面站，为 CANI-FC v2.0 算法层提供实时闭环反馈。极低电源纹波确保 FV10W-72 图传画面清晰稳定。"
    ],
    escSpecs: {
      current: "80A × 6 (持续)",
      peakCurrent: "100A × 6 (峰值 10s)",
      voltage: "3-6S LiPo",
      protocol: "DShot600/300/150, Multishot, PWM",
      mosfet: "工业级低内阻并联MOSFET阵列",
      pcbLayers: "8层PCB",
      size: "45×45mm (加强型安装位)",
      weight: "55g"
    },
    features: [
      "六路集成设计，含2路备用通道",
      "全 CNC 阳极氧化铝合金散热上盖",
      "大面积铺铜工艺，防热失控",
      "MAVLink 协议遥测数据回传",
      "过流、过温、欠压多重保护",
      "适配六旋翼工业巡检、系留平台"
    ],
    packageIncludes: [
      "CANI-80A 六合一电调 x1",
      "CNC散热上盖 x1",
      "线材 x1套",
      "安装螺丝 x1套"
    ]
  },
  {
    id: "6in1-100a",
    name: "CANI-100A 工业级六合一电调",
    model: "CANI-100A 6-in-1 ESC",
    category: "六合一电调",
    hot: true,
    image: fcEsc100a,
    images: [
      fcEsc100a,
      fcEsc100aAngle,
      fcEsc80a,
      fcEscPcbBack
    ],
    price: "¥899",
    highlights: [
      "六合一旗舰设计，六旋翼专用 (含2路备用)",
      "单路 100A 持续 / 120A 峰值，百安培级电流冗余",
      "7 系航空铝 CNC 一体化散热装甲",
      "双向 DShot 遥测，转速/电流/电压/温度实时回传",
      "3-6S 宽电压，支持 12S 级别耐压定制",
      "过流/过温/堵转/失控多重保护机制"
    ],
    description: [
      "CANI-100A 是一款专为顶级重载六旋翼无人机设计的六合一集成电调，代表了动力控制系统高集成化方向。单路支持 100A 持续输出，峰值瞬时可达 120A，是系留平台、重型巡检与大型行业机型最可靠的动力保障。",
      "采用 7 系航空铝材通过 CNC 工艺打造的整体外壳，不仅是防护罩更是高效散热器。配合高热导率陶瓷垫片，确保高压工况下 MOSFET 结温始终保持理想范围，适配 TH-300 系留无人机等需 24 小时连续运行的场景。",
      "实时回传每路电机的转速、电流、电压与温度，数据即时同步至 CANI-FC v2.0，通过高级滤波算法消除重载机身低频共振。优化的电路布局有效抑制高频杂波，确保 FV10W-72 图传在万瓦级功率输出时画面如丝般顺滑。",
      "作为整机动力中枢，CANI-100A 替代复杂布线方案，为 CANI-Pixhawk4 等核心飞控预留更纯净、受干扰更小的电磁环境。相比六个独立电调方案，功率密度大幅提升，推重比显著优化。"
    ],
    escSpecs: {
      current: "100A × 6 (持续)",
      peakCurrent: "120A × 6 (峰值 10s)",
      voltage: "3-6S LiPo (支持高压纹波滤波)",
      protocol: "DShot1200/600/300 (双向遥测)",
      mosfet: "极低内阻多颗并联MOSFET阵列",
      pcbLayers: "8层PCB",
      size: "50×50mm (加强型M3安装位)",
      weight: "65g"
    },
    features: [
      "六路集成旗舰设计，含2路备用通道",
      "7 系航空铝 CNC 一体化散热装甲",
      "高热导率陶瓷垫片散热工艺",
      "双向 DShot 遥测 (RPM/电流/温度)",
      "过流、过温、堵转、失控多重保护",
      "适配重载巡检、系留平台、大型行业机型"
    ],
    packageIncludes: [
      "CANI-100A 六合一电调 x1",
      "CNC航空铝散热外壳 x1",
      "线材 x1套",
      "安装螺丝 x1套",
      "说明书 x1"
    ]
  }
];

// 开源飞控（科研级）
export const researchFlightControllers: FcEscProduct[] = [
  {
    id: "cani-fmt",
    name: "CANI-FC v2.0 开源飞控",
    model: "ICF5 (IC200)",
    category: "科研飞控",
    hot: true,
    image: icf5HeroClean,
    images: [
      icf5HeroClean,
      icf5DetailFull,
      icf5Angle3Clean,
      icf5Angle4Clean
    ],
    price: "联系咨询",
    highlights: [
      "GD32F470旗舰芯片，240MHz主频",
      "支持MATLAB/Simulink基于模型开发(MBD)",
      "多种仿真：HIL/SIL/MIL全覆盖",
      "丰富接口：以太网、CAN总线、5路UART",
      "支持多旋翼、固定翼等多种机型",
      "外形小巧轻薄，仅39.3g"
    ],
    description: [
      "ICF5是专业级高性能开源自驾仪硬件，搭载FMT下一代开源自驾仪系统",
      "采用GD32F470旗舰芯片，240MHz主频，512KB SRAM，1024KB Flash，内核自带FPU浮点运算单元",
      "支持MATLAB/Simulink图形化建模(MBD)，一键代码自动生成并部署到飞控硬件",
      "支持模型仿真(MIL)、软件在环仿真(SIL)、硬件在环仿真(HIL)等多种仿真方式",
      "可用于无人机、无人车、无人船和机器人等多种应用领域",
      "提供以太网接口和CAN总线接口，适用于工业和高带宽数据传输场景",
      "体积仅70×36×18.5mm，重量仅39.3g，在成本、尺寸和功能上具备很大优势"
    ],
    fcSpecs: {
      mcu: "GD32F470VGT6 (240MHz, 512KB SRAM, 1024KB Flash)",
      gyro: "BMI088 / ICM-42688-P / ICM-20948(选配)",
      osd: "-",
      blackbox: "W25Q16 Nor Flash (16M-bit) + TF卡槽",
      uart: "5路UART + 1路USB(Type-C)",
      voltage: "PM工作电压 4.5~5.5V / USB 4.75~5.25V",
      bec: "10路PWM输出",
      size: "70×36×18.5mm",
      weight: "39.3g",
      firmware: "FMT开源固件"
    },
    features: [
      "GD32F470旗舰级芯片，FPU浮点运算",
      "MATLAB/Simulink基于模型开发(MBD)",
      "一键代码自动生成与部署",
      "HIL/SIL/MIL多种仿真方式",
      "以太网 + CAN总线 + 5路UART",
      "3路I2C + 1路SPI接口",
      "BMM150电子罗盘 + SPL06气压计",
      "多旋翼/固定翼/VTOL(即将支持)",
      "支持室内外定点、定高、自稳飞行",
      "航点任务模式、一键起飞/返航/降落"
    ],
    visualFeatures: [
      { icon: "cpu", title: "GD32 高性能芯片", desc: "GD32F470旗舰芯片 + FMT开源飞控系统，240MHz主频，FPU浮点运算" },
      { icon: "code", title: "MATLAB/Simulink MBD", desc: "支持基于模型开发，图形化编程，一键自动生成代码并部署到飞控" },
      { icon: "layers", title: "多种仿真全覆盖", desc: "模型在环(MIL)、软件在环(SIL)、硬件在环(HIL)、开环仿真，验证代码稳定性" },
      { icon: "navigation", title: "多机型支持", desc: "支持多旋翼、固定翼等机型，室内外定点/定高/自稳飞行，航点任务模式" },
      { icon: "wifi", title: "丰富接口", desc: "以太网、CAN总线、5路UART、3路I2C、SPI、PPM/PWM、USB Type-C" },
      { icon: "minimize", title: "轻薄小巧", desc: "70×36×18.5mm，仅39.3g，体积小、重量轻，在成本和功能上具备很大优势" },
    ],
    notes: [
      "适合科研院校和企业研发使用",
      "支持二次开发和算法验证",
      "ICM-20948和MS5611为选配，默认不焊接",
      "工作温度：-20~85℃"
    ],
    packageIncludes: [
      "CANI ICF5飞控 x1",
      "连接线材 x1套",
      "技术文档 x1"
    ]
  },
  {
    id: "cani-pixhawk4",
    name: "CANI Pixhawk 4 飞控",
    model: "Pixhawk 4 (PX4)",
    category: "科研飞控",
    hot: true,
    image: pixhawk4Hero,
    images: [
      pixhawk4Hero,
      pixhawk4Dual,
      pixhawk4Fmu,
      pixhawk4VibrationClean,
      pixhawk4Accessories,
      pixhawk4Dimensions,
    ],
    price: "联系咨询",
    highlights: [
      "STM32F765处理器，32位Arm Cortex-M7 216MHz",
      "双IMU冗余：ICM-20689 + BMI-055",
      "IST8310罗盘 + MS5611气压计",
      "支持PX4/ArduPilot开源固件",
      "丰富接口：CAN/I2C/UART/SPI/PWM",
      "铝壳/塑料壳可选"
    ],
    description: [
      "Pixhawk 4是专业级开源飞控平台，采用STM32F765高性能处理器，主频216MHz",
      "搭载Bosch和InvenSense双IMU传感器：ICM-20689陀螺仪+加速度计、BMI-055备用IMU，实现冗余设计",
      "IST8310高精度罗盘 + MS5611气压计，提供精确的姿态和高度数据",
      "丰富的外设接口：双CAN总线、多路UART/TELEM、I2C、SPI、DSM/SBUS RC输入",
      "支持I/O PWM OUT(MAIN) + FMU PWM OUT(AUX)双路PWM输出",
      "可选PM02 12S/PM07 14S电源模块，适配不同电压平台",
      "可选M9N/M10 GPS模块，满足不同精度需求",
      "提供完整线材包：JST GH连接线、PWM排针板、CAN/I2C扩展板等"
    ],
    fcSpecs: {
      mcu: "STM32F765 (Arm Cortex-M7, 216MHz, 2MB Flash, 512KB RAM)",
      gyro: "ICM-20689 + BMI-055 (双冗余)",
      osd: "-",
      blackbox: "板载存储",
      uart: "TELEM1/TELEM2 + 多路UART",
      voltage: "最大输入6V / 伺服0-36V / 电源模块输出4.9~5.5V",
      bec: "PM02 12S / PM07 14S电源模块（可选）",
      size: "44×84×12mm",
      weight: "33.3g(塑料壳) / 49g(铝壳)",
      firmware: "PX4 / ArduPilot"
    },
    features: [
      "双IMU冗余设计（ICM-20689 + BMI-055），提升飞行安全性",
      "IST8310罗盘 + MS5611气压计，精确姿态估计",
      "双CAN总线接口，支持DroneCAN外设扩展",
      "I2C A/B双通道，USB/SPI/DSM/SBUS RC等完整接口",
      "I/O PWM OUT(MAIN) 8通道 + FMU PWM OUT(AUX) 6通道",
      "铝壳版本提供更好的电磁屏蔽和散热",
      "支持PX4和ArduPilot两大开源固件生态",
      "完善的线材包和可选GPS/电源模块配件体系"
    ],
    visualFeatures: [
      { icon: "cpu", title: "STM32F765 FMU处理器", desc: "32位 Arm Cortex-M7, 216MHz主频, 2MB Flash, 512KB RAM，高性能飞行控制运算" },
      { icon: "layers", title: "STM32F100 IO协处理器", desc: "32位 Arm Cortex-M3, 24MHz, 8KB SRAM，独立IO控制，安全冗余设计" },
      { icon: "navigation", title: "双IMU冗余传感器", desc: "ICM-20689 + BMI-055双冗余IMU，IST8310罗盘 + MS5611气压计，精确姿态估计" },
      { icon: "zap", title: "全新隔振设计", desc: "机载高性能、低噪音IMU，专为提供稳定应用而设计，有效抑制振动干扰" },
      { icon: "wifi", title: "丰富接口", desc: "双CAN总线、多路UART/TELEM、I2C A/B双通道、USB/SPI/DSM/SBUS RC完整接口" },
      { icon: "code", title: "双固件生态", desc: "支持PX4和ArduPilot两大开源固件，完善的开发生态和社区支持" },
    ],
    notes: [
      "适合科研院校、无人机竞赛和工业应用开发",
      "支持多旋翼、固定翼、VTOL等多种机型",
      "铝壳版本推荐用于工业级应用，塑料壳适合教学实验"
    ],
    packageIncludes: [
      "Pixhawk 4飞控 x1（铝壳/塑料壳可选）",
      "PWM EXT OUT 8P排针板 x2",
      "CAP&ADC IN排针板 x1",
      "CAN/I2C扩展板 x1",
      "JST GH 4P-GH 4P 26AWG线 x2",
      "JST GH 6P-GH 6P 26AWG线 x3",
      "JST SH 6P-6P线 x1",
      "JST GH 7P-GH 7P 26AWG线 x1",
      "JST GH 8P-GH 8P 26AWG线 x1",
      "JST GH 10P-GH 10P 26AWG线 x2",
      "JST GH 5P-JST ZH1.5 3P线 x2",
      "JST GH 3P-杜邦2.54 3P线 x1",
      "USB数据线 x1",
      "GPS模块可选（M9N/M10）",
      "电源模块可选（PM02 12S/PM07 14S）"
    ]
  }
];

// 飞控产品
export const flightControllerProducts: FcEscProduct[] = [
  {
    id: "fc-f405",
    name: "CANI-FC F405 工业级多功能飞控",
    model: "CANI-FC F405 (STM32F405 / 30.5mm)",
    category: "飞控",
    image: fcF405_1,
    images: [
      fcF405_1,
      fcF405_2,
      "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2509/25/products/3.jpg",
      fcF405_4
    ],
    price: "¥229",
    highlights: [
      "STM32F405RGT6 (168MHz)，工业级成熟稳定内核",
      "MPU6000 SPI 低噪声陀螺仪 + 高精度气压计",
      "6 路 UART 接口，轻松驱动多传感器矩阵",
      "板载 AT7456E OSD 芯片 + 8MB 黑匣子",
      "3-6S 宽电压，LDO 独立供电抗 EMI 干扰",
      "30.5×30.5mm 标准孔位，含避震橡胶圈"
    ],
    description: [
      "CANI-FC F405 是一款专为行业应用和高性能机型设计的旗舰级飞控。采用成熟的 STM32F405 处理器（168MHz），其指令集经过十年工程验证，异常复位率极低，是工业控制领域的常青树。",
      "集成 MPU6000 高采样率低噪声陀螺仪与高精度气压计，配合定制 LDO 线性稳压器独立供电，即使在靠近高压输电线或大功率电调电磁冲击时，姿态数据信噪比依然极高。",
      "提供多达 6 路独立硬件 UART，可同时连接数字图传、RTK 定位模块、激光雷达及 4G/5G 通讯链路。搭配 FV10W-72 数字图传时，能轻松驱动 OSD 数据回传并保留充裕接口给避障传感器。",
      "全冗余电源设计与防腐蚀涂层处理，确保在潮湿、高盐雾等恶劣工业环境下依然稳定运行。通过双向 DShot 协议可实时调取 Stack F405-60A 电调转速数据，实现动态陷波滤波消除机架共振。"
    ],
    fcSpecs: {
      mcu: "STM32F405RGT6 (168MHz)",
      gyro: "MPU6000 (SPI) + 高精度气压计",
      osd: "板载 AT7456E",
      blackbox: "8MB SPI Flash",
      uart: "6个UART, 1个I2C",
      voltage: "3-6S LiPo (LDO 隔离供电)",
      bec: "5V/3A",
      size: "30.5×30.5mm (M3，含避震橡胶圈)",
      weight: "8g",
      firmware: "Betaflight / INAV / ArduPilot(社区适配)"
    },
    features: [
      "STM32F405 成熟工业内核，极低异常复位率",
      "MPU6000 + LDO 独立供电物理级 IMU 防护",
      "6 路 UART 多传感器矩阵扩展",
      "8MB 黑匣子飞行日志与振动频谱记录",
      "双向 DShot 动态陷波滤波 (RPM Filter)",
      "四层 PCB 信号/地平面严格分离抗 EMI",
      "防腐蚀涂层，适应潮湿高盐雾环境"
    ],
    notes: [
      "推荐适配 5-10 英寸工业及竞技机型",
      "首次使用请更新至最新固件版本",
      "高 EMI 环境建议配合屏蔽线缆使用"
    ],
    packageIncludes: [
      "CANI-FC F405 飞控 x1",
      "避震橡胶圈 x4",
      "连接线材 x1套",
      "说明书 x1"
    ]
  },
  {
    id: "fc-f722",
    name: "FlyMind F7飞控",
    model: "FlyMind F722",
    category: "飞控",
    image: fcF722_1,
    images: [
      fcF722_1,
      fcF722_2,
      fcF722_3Clean,
      fcF722_4,
      fcF722_5,
      fcF722_6
    ],
    price: "¥399",
    highlights: [
      "STM32F722处理器，更高性能",
      "双陀螺仪设计，稳定可靠",
      "5个UART串口",
      "支持HD VTX控制"
    ],
    description: [
      "高性能F7平台",
      "双陀螺仪冗余设计",
      "丰富的UART接口"
    ],
    fcSpecs: {
      mcu: "STM32F722",
      gyro: "双ICM42688",
      osd: "AT7456E",
      blackbox: "16MB",
      uart: "5个UART",
      voltage: "3-8S LiPo",
      bec: "5V/3A, 9V/2A",
      size: "30.5×30.5mm (M3)",
      weight: "9g",
      firmware: "Betaflight"
    },
    features: [
      "双陀螺仪设计",
      "支持HD数字图传控制"
    ],
    packageIncludes: [
      "F722飞控 x1",
      "线材 x1套"
    ]
  }
];

// 四合一电调
export const escProducts: FcEscProduct[] = [
  {
    id: "esc-55a",
    name: "FlyMind 55/65A电调",
    model: "FlyMind 55/65A 4-in-1",
    category: "四合一电调",
    image: esc55a_1,
    images: [
      esc55a_1,
      esc55a_2,
      esc55a_3,
      esc55a_4,
      esc55a_5,
      esc55a6Clean
    ],
    price: "¥449",
    highlights: [
      "持续55A，峰值65A",
      "3-6S LiPo支持",
      "32位处理器，BLHeli_32",
      "低电阻MOS，高效散热"
    ],
    description: [
      "55A持续输出",
      "BLHeli_32固件",
      "多层PCB设计"
    ],
    escSpecs: {
      current: "55A (持续)",
      peakCurrent: "65A (峰值)",
      voltage: "3-6S LiPo",
      protocol: "DShot1200/600/300",
      mosfet: "低内阻MOS",
      pcbLayers: "4层PCB",
      size: "30.5×30.5mm (M3)",
      weight: "12g"
    },
    features: [
      "BLHeli_32固件",
      "过流保护"
    ],
    packageIncludes: [
      "55A电调 x1",
      "线材 x1套"
    ]
  },
  {
    id: "esc-60a",
    name: "FlyMind ECO 60A V2电调",
    model: "FlyMind ECO 60A V2",
    category: "四合一电调",
    image: esc60a_1,
    images: [
      esc60a_1,
      esc60a_2,
      "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2411/09/products/fcecd99917.jpg"
    ],
    price: "¥335",
    highlights: [
      "持续60A，峰值75A",
      "优化PCB散热设计",
      "支持48KHz PWM频率",
      "电流传感器内置"
    ],
    description: [
      "60A大电流输出",
      "优化散热设计",
      "内置电流传感器"
    ],
    escSpecs: {
      current: "60A (持续)",
      peakCurrent: "75A (峰值)",
      voltage: "3-6S LiPo",
      protocol: "DShot1200/600/300",
      mosfet: "低内阻MOS阵列",
      pcbLayers: "4层PCB",
      size: "30.5×30.5mm (M3)",
      weight: "14g"
    },
    features: [
      "48KHz PWM支持",
      "电流传感器"
    ],
    packageIncludes: [
      "60A电调 x1",
      "线材 x1套"
    ]
  },
  {
    id: "esc-80a",
    name: "FlyMind Pro 80A电调",
    model: "FlyMind Pro 80A 4-in-1",
    category: "四合一电调",
    image: esc80a_1,
    images: [
      esc80a_1,
      esc80a_2,
      esc80a_3,
      esc80a_4,
      esc80a_5
    ],
    price: "¥759",
    highlights: [
      "持续80A，峰值100A",
      "3-8S宽电压支持",
      "大功率MOS阵列",
      "8层PCB高效散热"
    ],
    description: [
      "80A大电流输出",
      "宽电压支持",
      "8层PCB散热"
    ],
    escSpecs: {
      current: "80A (持续)",
      peakCurrent: "100A (峰值)",
      voltage: "3-8S LiPo",
      protocol: "DShot1200/600/300",
      mosfet: "大功率MOS阵列",
      pcbLayers: "8层PCB",
      size: "45×45mm",
      weight: "28g"
    },
    features: [
      "8层PCB散热",
      "大载重应用"
    ],
    packageIncludes: [
      "80A电调 x1",
      "线材 x1套"
    ]
  },
  {
    id: "esc-100a",
    name: "FlyMind Pro 100A电调",
    model: "FlyMind Pro 100A 4-in-1",
    category: "四合一电调",
    image: esc100a_1,
    images: [
      esc100a_1,
      esc100a_2
    ],
    price: "¥959",
    highlights: [
      "持续100A，峰值120A",
      "8层PCB设计",
      "多颗并联MOS",
      "专业大载重应用"
    ],
    description: [
      "100A超大电流",
      "8层PCB设计",
      "专业级应用"
    ],
    escSpecs: {
      current: "100A (持续)",
      peakCurrent: "120A (峰值)",
      voltage: "4-8S LiPo",
      protocol: "DShot1200/600/300",
      mosfet: "多颗并联MOS",
      pcbLayers: "8层PCB",
      size: "50×50mm",
      weight: "45g"
    },
    features: [
      "超大电流输出",
      "工业级可靠性"
    ],
    packageIncludes: [
      "100A电调 x1",
      "线材 x1套"
    ]
  }
];

// 分体电调
export const separateEscProducts: FcEscProduct[] = [
  {
    id: "separate-esc-80a",
    name: "FlyMind 80A分体电调",
    model: "FlyMind 80A SEP",
    category: "分体电调",
    image: separateEsc80a_1,
    images: [
      separateEsc80a_1,
      separateEsc80a_2,
      separateEsc80a_3,
      separateEsc80a_4,
      separateEsc80a_5
    ],
    price: "¥219",
    highlights: [
      "单臂独立安装",
      "80A持续输出",
      "散热效果极佳",
      "方便维护更换"
    ],
    description: [
      "分体式设计",
      "单臂独立安装",
      "便于维护"
    ],
    escSpecs: {
      current: "80A (持续)",
      peakCurrent: "100A (峰值)",
      voltage: "4-8S LiPo",
      protocol: "DShot1200",
      size: "35×17mm",
      weight: "12g/个"
    },
    features: [
      "独立安装",
      "便于更换"
    ],
    packageIncludes: [
      "80A分体电调 x1",
      "线材 x1套"
    ]
  },
  {
    id: "separate-esc-100a",
    name: "FlyMind 100A分体电调",
    model: "FlyMind 100A SEP",
    category: "分体电调",
    image: separateEsc100a_1,
    images: [
      separateEsc100a_1,
      separateEsc100a_2,
      separateEsc100a_3
    ],
    price: "¥289",
    highlights: [
      "大载重无人机专用",
      "100A持续大电流",
      "独立散热片",
      "工业级可靠性"
    ],
    description: [
      "100A大电流分体电调",
      "工业级应用",
      "独立散热片"
    ],
    escSpecs: {
      current: "100A (持续)",
      peakCurrent: "120A (峰值)",
      voltage: "4-12S LiPo",
      protocol: "DShot1200",
      size: "40×22mm",
      weight: "18g/个"
    },
    features: [
      "工业级可靠性",
      "宽电压支持"
    ],
    packageIncludes: [
      "100A分体电调 x1",
      "散热片 x1",
      "线材 x1套"
    ]
  }
];

// 获取所有产品
export const getAllFcEscProducts = (): FcEscProduct[] => {
  return [
    ...researchFlightControllers,
    ...stackProducts,
    ...sixInOneEscProducts,
    ...flightControllerProducts,
    ...escProducts,
    ...separateEscProducts
  ];
};

// 根据ID获取产品
export const getFcEscProductById = (id: string): FcEscProduct | undefined => {
  return getAllFcEscProducts().find(product => product.id === id);
};
