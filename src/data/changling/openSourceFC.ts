/**
 * 长凌科技 - 开源飞控产品数据
 * 用于飞控/电调分类下
 */

import { FcEscProduct } from "../fcEscProducts";

// 开源飞控产品（转换为FcEsc格式）
export const openSourceFlightControllers: FcEscProduct[] = [
  {
    id: "icf5",
    name: "ICF5开源飞控",
    model: "ICF5",
    category: "飞控",
    image: "https://qiniu.md.amovlab.com/img/p/202310/20231027/1710107014397131511398400.jpg",
    images: [
      "https://qiniu.md.amovlab.com/img/p/202310/20231027/1710107014397131511398400.jpg",
      "https://qiniu.md.amovlab.com/img/p/202304/20230411/1629145733093371157774336.jpg",
      "https://qiniu.md.amovlab.com/img/p/202304/20230411/1629145733305077016395776.jpg"
    ],
    price: "询价",
    highlights: [
      "STM32H7高性能处理器",
      "双冗余IMU设计",
      "PX4/ArduPilot开源固件",
      "CAN/Serial/I2C/SPI多接口",
      "适用于科研开发定制"
    ],
    description: [
      "高性能开源飞控，基于PX4/ArduPilot固件",
      "双冗余IMU设计，提高飞行安全性",
      "支持多种机型配置，适用于科研开发",
      "丰富的外设接口，方便二次开发",
      "活跃的开源社区支持"
    ],
    fcSpecs: {
      mcu: "STM32H7",
      gyro: "双冗余IMU",
      osd: "-",
      blackbox: "SD卡",
      uart: "多个UART",
      voltage: "5V供电",
      bec: "-",
      size: "50x30mm",
      weight: "-",
      firmware: "PX4/ArduPilot"
    },
    features: [
      "开源固件，社区活跃",
      "双冗余IMU提升可靠性",
      "支持CAN总线扩展",
      "丰富的传感器接口",
      "完善的文档和教程"
    ],
    notes: [
      "适合有开发需求的用户",
      "建议配合官方文档使用",
      "支持多种机架类型配置"
    ],
    packageIncludes: [
      "ICF5飞控 x1",
      "连接线材 x1套",
      "减震垫 x4",
      "说明书 x1"
    ]
  }
];
