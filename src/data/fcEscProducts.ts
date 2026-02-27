// FC/ESC 产品数据
// 图片资产导入
import fcEsc80a from '@/assets/products/fc-esc-80a.jpg';
import pixhawk4Hero from '@/assets/products/pixhawk4-hero.webp';
import pixhawk4Accessories from '@/assets/products/pixhawk4-accessories.webp';
import pixhawk4Cables from '@/assets/products/pixhawk4-cables.webp';
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
    name: "FlyMind F405+55A飞塔",
    model: "FlyMind F405+55A",
    category: "飞塔",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/5b83900071.jpg",
    images: [
      "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/5b83900071.jpg"
    ],
    price: "¥439",
    highlights: [
      "STM32F405处理器，高速运算",
      "ICM42688 陀螺仪",
      "55A四合一电调，峰值65A",
      "30.5×30.5mm标准孔距",
      "性价比之选，适配3-5寸机架"
    ],
    description: [
      "采用成熟稳定的STM32F405处理器",
      "ICM42688陀螺仪，响应灵敏",
      "55A持续电流输出，适合大部分场景",
      "标准30.5mm孔距，兼容性强",
      "高性价比选择，入门进阶皆宜"
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
    name: "FlyMind F405+60A飞塔",
    model: "FlyMind F405+60A",
    category: "飞塔",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2411/25/products/4b65e095d8.jpg",
    images: [
      "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2411/25/products/4b65e095d8.jpg"
    ],
    price: "¥489",
    highlights: [
      "STM32F405处理器",
      "60A四合一电调，峰值75A",
      "优化PCB散热设计",
      "30.5×30.5mm标准孔距",
      "穿越竞速首选"
    ],
    description: [
      "60A持续电流，峰值75A，动力更强劲",
      "优化散热路径，长时间飞行更稳定",
      "适合高强度竞速和花飞玩家",
      "BLHeli_32固件，响应速度快"
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
      current: "60A (持续)",
      peakCurrent: "75A (峰值)",
      voltage: "3-6S LiPo",
      protocol: "DShot1200/600/300",
      mosfet: "低内阻MOS阵列",
      pcbLayers: "4层PCB",
      size: "30.5×30.5mm (M3)",
      weight: "20g"
    },
    features: [
      "优化PCB走线，降低热阻",
      "支持48KHz PWM频率",
      "电流传感器内置"
    ],
    packageIncludes: [
      "F405飞控 x1",
      "60A四合一电调 x1",
      "连接线材 x1套"
    ]
  },
  {
    id: "stack-mini-f7-40a",
    name: "FlyMind Mini F7+40A飞塔",
    model: "FlyMind Mini F7 40A",
    category: "飞塔",
    image: "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/c50b7a84c3.jpg",
    images: [
      "https://ueeshop.ly200-cdn.com/u_file/UPBD/UPBD023/2409/19/products/c50b7a84c3.jpg"
    ],
    price: "¥579",
    highlights: [
      "STM32F722处理器高性能",
      "BMI270高精度陀螺仪",
      "40A四合一电调",
      "20×20mm紧凑孔距设计",
      "适配2-3寸微型机架"
    ],
    description: [
      "专为2-3寸微型穿越机设计",
      "20mm超紧凑孔距",
      "40A电流输出，满足小机需求",
      "轻量化设计，整体仅12g"
    ],
    fcSpecs: {
      mcu: "STM32F722",
      gyro: "BMI270",
      osd: "板载",
      blackbox: "8MB",
      uart: "3个UART",
      voltage: "3-6S LiPo",
      bec: "5V/2A",
      size: "20×20mm (M2)",
      weight: "4g",
      firmware: "Betaflight"
    },
    escSpecs: {
      current: "40A (持续)",
      peakCurrent: "50A (峰值)",
      voltage: "3-6S LiPo",
      protocol: "DShot600/300",
      pcbLayers: "4层PCB",
      size: "20×20mm (M2)",
      weight: "8g"
    },
    features: [
      "超轻量化设计",
      "适合Cinewhoop/Toothpick机型"
    ],
    packageIncludes: [
      "Mini F7飞控 x1",
      "40A电调 x1",
      "线材 x1套"
    ]
  },
  {
    id: "stack-pro-f722-100a",
    name: "FlyMind Pro F722 100A/80A飞塔",
    model: "FlyMind ECO F722 100A/80A",
    category: "飞塔",
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
      "STM32F722双陀螺仪设计",
      "100A/80A可选大电流输出",
      "8层PCB专业级散热",
      "30.5×30.5mm标准孔距",
      "5-7寸大载重机型首选",
      "3-8S宽电压支持"
    ],
    description: [
      "专业级大功率飞塔套装",
      "双ICM42688陀螺仪，冗余设计更可靠",
      "100A/80A两种规格可选",
      "8层PCB设计，大电流散热无忧",
      "支持3-8S宽电压输入",
      "适合5-7寸长续航、大载重机型"
    ],
    fcSpecs: {
      mcu: "STM32F722",
      gyro: "双ICM42688",
      osd: "板载AT7456E",
      blackbox: "32MB SPI Flash",
      uart: "6个UART",
      voltage: "3-8S LiPo",
      bec: "5V/3A, 9V/3A",
      size: "30.5×30.5mm (M3)",
      weight: "10g",
      firmware: "Betaflight"
    },
    escSpecs: {
      current: "100A/80A (持续)",
      peakCurrent: "120A/100A (峰值)",
      voltage: "3-8S LiPo",
      protocol: "DShot1200/600/300",
      mosfet: "多颗并联MOS阵列",
      pcbLayers: "8层PCB",
      size: "30.5×30.5mm (M3)",
      weight: "32g"
    },
    features: [
      "双陀螺仪冗余设计",
      "8层PCB专业散热",
      "大功率应用首选",
      "支持长续航机型"
    ],
    notes: [
      "大电流使用时请确保接线可靠",
      "建议使用高品质硅胶线",
      "首次使用请校准陀螺仪"
    ],
    packageIncludes: [
      "Pro F722飞控 x1",
      "100A/80A电调 x1",
      "连接线材 x1套",
      "说明书 x1"
    ]
  }
];

// 六合一电调
export const sixInOneEscProducts: FcEscProduct[] = [
  {
    id: "6in1-80a",
    name: "FlyMind六合一80A电调",
    model: "FlyMind 6-in-1 80A",
    category: "六合一电调",
    image: fcEsc80a,
    images: [
      fcEsc80a,
      fcEscPcbBack,
      fcEsc100a,
      fcEsc100aAngle
    ],
    price: "¥729",
    highlights: [
      "六合一设计（含2路备用）",
      "80A持续电流，峰值100A",
      "8层PCB大电流设计",
      "4-8S宽电压支持"
    ],
    description: [
      "六合一设计，含2路备用通道",
      "80A持续电流，峰值可达100A",
      "8层PCB设计，散热优秀",
      "专为六轴大载重机型设计"
    ],
    escSpecs: {
      current: "80A (持续)",
      peakCurrent: "100A (峰值)",
      voltage: "4-8S LiPo",
      protocol: "DShot1200/600/300",
      mosfet: "并联MOS阵列",
      pcbLayers: "8层PCB",
      size: "45×45mm",
      weight: "55g"
    },
    features: [
      "6通道设计，含2路备用",
      "过流过温保护"
    ],
    packageIncludes: [
      "六合一电调 x1",
      "线材 x1套"
    ]
  },
  {
    id: "6in1-100a",
    name: "FlyMind六合一100A电调",
    model: "FlyMind 6-in-1 100A",
    category: "六合一电调",
    image: fcEsc100a,
    images: [
      fcEsc100a,
      fcEsc100aAngle,
      fcEsc80a,
      fcEscPcbBack
    ],
    price: "¥899",
    highlights: [
      "六合一设计（含2路备用）",
      "100A持续电流，峰值120A",
      "多颗并联MOS阵列",
      "专业级大载重应用"
    ],
    description: [
      "专业级六合一电调",
      "100A超大持续电流",
      "适合工业级六轴无人机"
    ],
    escSpecs: {
      current: "100A (持续)",
      peakCurrent: "120A (峰值)",
      voltage: "4-8S LiPo",
      protocol: "DShot1200/600/300",
      mosfet: "多颗并联MOS",
      pcbLayers: "8层PCB",
      size: "50×50mm",
      weight: "65g"
    },
    features: [
      "超大电流输出",
      "工业级可靠性"
    ],
    packageIncludes: [
      "六合一电调 x1",
      "线材 x1套"
    ]
  }
];

// 国产开源飞控（科研级）
export const researchFlightControllers: FcEscProduct[] = [
  {
    id: "cani-fmt",
    name: "CANI FMT 国产开源飞控",
    model: "CANI ICF5",
    category: "科研飞控",
    hot: true,
    image: "/images/products/cani-fmt-fc.png",
    images: [
      "/images/products/cani-fmt-fc.png",
      "/images/products/cani-fmt-fc-4.jpg",
      "/images/products/cani-fmt-fc-sim.jpg"
    ],
    price: "联系咨询",
    highlights: [
      "国产芯片，技术自主可控",
      "支持Matlab/Simulink自动生成代码",
      "支持dSPACE开发系统",
      "多种仿真功能：MIL/SIL/HIL",
      "支持多旋翼、固定翼机型",
      "外形小巧轻薄，仅39.2g"
    ],
    description: [
      "CANI FMT飞控是国产开源飞控系统，采用GD32国产芯片，实现技术自主可控",
      "支持Matlab/Simulink图形化建模，自动生成代码，简化开发流程",
      "兼容国产dSPACE开发系统，便于快速开发验证",
      "支持模型仿真(MIL)、软件在环仿真(SIL)、硬件在环仿真(HIL)等多种仿真方式",
      "支持室内外定点、定高、自稳飞行控制",
      "支持航点任务模式、一键起飞、返航、降落",
      "外形小巧轻薄，体积仅70×36×18.5mm，重量仅39.2g"
    ],
    fcSpecs: {
      mcu: "GD32国产芯片",
      gyro: "高精度IMU",
      osd: "支持",
      blackbox: "板载存储",
      uart: "多UART接口",
      voltage: "宽电压输入",
      bec: "多路输出",
      size: "70×36×18.5mm",
      weight: "39.2g",
      firmware: "FMT开源固件"
    },
    features: [
      "国产芯片，低成本高性价比",
      "Matlab/Simulink自动代码生成",
      "dSPACE开发系统支持",
      "模型仿真/半实物仿真",
      "多旋翼/固定翼机型支持",
      "室内室外飞行控制",
      "航点任务模式",
      "一键起飞/返航/降落"
    ],
    notes: [
      "适合科研院校和企业研发使用",
      "支持二次开发和算法验证",
      "提供技术支持服务"
    ],
    packageIncludes: [
      "CANI FMT飞控 x1",
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
      pixhawk4Accessories,
      pixhawk4Cables
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
      mcu: "STM32F765 (Arm Cortex-M7, 216MHz)",
      gyro: "ICM-20689 + BMI-055 (双冗余)",
      osd: "-",
      blackbox: "板载存储",
      uart: "TELEM1/TELEM2 + 多路UART",
      voltage: "POWER1/POWER2双路电源输入",
      bec: "通过PM02/PM07电源模块供电",
      size: "标准Pixhawk尺寸",
      weight: "-",
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
      "JST GH 4P-GH 4P线 x2",
      "JST GH 6P-GH 6P线 x3",
      "JST SH 6P-6P线 x1",
      "JST GH 7P-GH 7P线 x1",
      "GPS模块可选（M9N/M10）",
      "电源模块可选（PM02 12S/PM07 14S）"
    ]
  }
];

// 飞控产品
export const flightControllerProducts: FcEscProduct[] = [
  {
    id: "fc-f405",
    name: "FlyMind F405飞控",
    model: "FlyMind F405",
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
      "STM32F405处理器，高速运算",
      "ICM42688陀螺仪",
      "支持Betaflight/INAV固件",
      "板载OSD芯片",
      "3-6S电压输入"
    ],
    description: [
      "成熟稳定的F405平台",
      "板载OSD芯片",
      "多UART接口设计"
    ],
    fcSpecs: {
      mcu: "STM32F405",
      gyro: "ICM42688",
      osd: "AT7456E",
      blackbox: "8MB",
      uart: "4个UART",
      voltage: "3-6S LiPo",
      bec: "5V/3A",
      size: "30.5×30.5mm (M3)",
      weight: "8g",
      firmware: "Betaflight/INAV"
    },
    features: [
      "支持多种固件",
      "稳定可靠"
    ],
    packageIncludes: [
      "F405飞控 x1",
      "线材 x1套"
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
      fcF722_3,
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
      esc55a_6
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
