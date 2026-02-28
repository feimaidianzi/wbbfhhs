import vrx5849 from "@/assets/vrx/vrx-5849-dual-chip.jpg";

export interface VrxProduct {
  id: string;
  model: string;
  nameZh: string;
  nameEn: string;
  type: "receiver";
  frequency: string;
  sensitivity: string;
  channels: number;
  image: string;
  descZh: string;
  descEn: string;
  highlightsZh: string[];
  highlightsEn: string[];
  specs: {
    labelZh: string;
    labelEn: string;
    value: string;
    highlight?: boolean;
  }[];
  pinDefinitions: {
    pin: number;
    definition: string;
  }[];
  machineModulePins: {
    pin: number;
    definition: string;
  }[];
  frequencyTable: {
    band: string;
    frequencies: number[];
  }[];
}

export const vrxProducts: VrxProduct[] = [
  {
    id: "llvrfrx-5849-dual-chip",
    model: "LLVRFRX-5849-Dual Chip",
    nameZh: "5.8GHz 双芯片模拟图传接收模组",
    nameEn: "5.8GHz Dual-Chip Analog Video Rx Module",
    type: "receiver",
    frequency: "4.9-6.0GHz",
    sensitivity: "-97dBm",
    channels: 48,
    image: vrx5849,
    descZh: "LLVRFRX-5849-Dual Chip 是一款工业级 5.8GHz 双芯片模拟图传接收模组，采用 FM/PLL 锁相环解调架构，灵敏度高达 -97dBm，覆盖 4900MHz~6000MHz 全频段。专为 FPV 眼镜、手持地面站及工业监控终端设计，提供物理零延迟的实时视频接收方案。",
    descEn: "The LLVRFRX-5849-Dual Chip is an industrial-grade 5.8GHz dual-chip analog video receiver module featuring FM/PLL demodulation with -97dBm sensitivity across the full 4900-6000MHz band. Designed for FPV goggles, handheld ground stations, and industrial monitoring terminals, delivering zero-latency real-time video reception.",
    highlightsZh: [
      "双芯片 FM/PLL 解调，信号捕获更精准",
      "-97dBm 旗舰级灵敏度，微弱信号边缘仍稳定",
      "4900~6000MHz 超宽频段，A/B/E/F/R/L 全覆盖",
      "物理零延迟模拟传输，<1ms 响应",
      "3.3V~5.0V 宽电压供电，≤200mA 低功耗",
      "14-Pin 标准接口，含 RSSI/AUDIO/SPI 控制"
    ],
    highlightsEn: [
      "Dual-chip FM/PLL demodulation for precise signal acquisition",
      "-97dBm flagship sensitivity, stable at signal edge",
      "4900~6000MHz ultra-wideband, full A/B/E/F/R/L coverage",
      "Physical zero-latency analog transmission, <1ms response",
      "3.3V~5.0V wide voltage, ≤200mA low power consumption",
      "14-Pin standard interface with RSSI/AUDIO/SPI control"
    ],
    specs: [
      { labelZh: "工作频率", labelEn: "Receiving Frequency", value: "4900 ~ 6000 MHz", highlight: true },
      { labelZh: "接收灵敏度", labelEn: "Receiving Sensitivity", value: "-97 dBm", highlight: true },
      { labelZh: "输入电平范围", labelEn: "Input Level Range", value: "-97 dBm ~ +5 dBm" },
      { labelZh: "解调系统", labelEn: "Demodulation System", value: "FM / PLL" },
      { labelZh: "中频", labelEn: "IF", value: "480 MHz" },
      { labelZh: "供电电压", labelEn: "Power Supply", value: "+3.3V ~ 5.0V DC" },
      { labelZh: "电流消耗", labelEn: "Current Consumption", value: "≤ 200mA" },
      { labelZh: "天线输入阻抗", labelEn: "ANT Input Impedance", value: "50Ω" },
      { labelZh: "电压驻波比", labelEn: "VSWR", value: "2:1" },
      { labelZh: "本振频率稳定度", labelEn: "LO Frequency Stabilization", value: "±100kHz" },
      { labelZh: "本振控制", labelEn: "LO Control", value: "PLL" },
      { labelZh: "输入本振泄漏", labelEn: "Input LO Leak", value: "-55 dBm" },
      { labelZh: "视频输出阻抗", labelEn: "Video Output Impedance", value: "75Ω" },
      { labelZh: "视频输出电平", labelEn: "Video Output Level", value: "1Vp-p" },
      { labelZh: "视频极性", labelEn: "Video Polarity", value: "NEGATIVE" },
      { labelZh: "视频频率响应", labelEn: "Video Freq Response", value: "±5 dB, 50Hz ~ 6MHz" },
      { labelZh: "3dB 中频带宽", labelEn: "3dB IF Wideband", value: "16.5 MHz" },
      { labelZh: "信噪比", labelEn: "S/N Ratio", value: "≥ 38 dB" },
      { labelZh: "工作温度", labelEn: "Operating Temperature", value: "-10℃ ~ +65℃" },
      { labelZh: "存储温度", labelEn: "Storage Temperature", value: "-30℃ ~ +85℃" },
      { labelZh: "工作湿度", labelEn: "Operating Humidity", value: "85% RH" },
    ],
    pinDefinitions: [
      { pin: 1, definition: "GND" },
      { pin: 2, definition: "GND" },
      { pin: 3, definition: "GND" },
      { pin: 4, definition: "ANT" },
      { pin: 5, definition: "GND" },
      { pin: 6, definition: "MOSI" },
      { pin: 7, definition: "CS" },
      { pin: 8, definition: "SCK" },
      { pin: 9, definition: "GND" },
      { pin: 10, definition: "5V" },
      { pin: 11, definition: "RSSI" },
      { pin: 12, definition: "AUDIO" },
      { pin: 13, definition: "VIDEO" },
      { pin: 14, definition: "GND" },
    ],
    machineModulePins: [
      { pin: 1, definition: "5V" },
      { pin: 2, definition: "NC" },
      { pin: 3, definition: "GND" },
      { pin: 4, definition: "AUDIO" },
      { pin: 5, definition: "AUDIO" },
      { pin: 6, definition: "VIDEO" },
      { pin: 7, definition: "NC" },
      { pin: 8, definition: "NC" },
      { pin: 9, definition: "NC" },
    ],
    frequencyTable: [
      { band: "A", frequencies: [5865, 5845, 5825, 5805, 5785, 5765, 5745, 5725] },
      { band: "B", frequencies: [5733, 5752, 5771, 5790, 5809, 5828, 5847, 5866] },
      { band: "E", frequencies: [5705, 5685, 5666, 5645, 5885, 5905, 5925, 5945] },
      { band: "F", frequencies: [5740, 5760, 5780, 5800, 5820, 5840, 5860, 5880] },
      { band: "R", frequencies: [5658, 5695, 5732, 5769, 5806, 5843, 5880, 5917] },
      { band: "L", frequencies: [5362, 5399, 5436, 5473, 5510, 5547, 5584, 5621] },
    ],
  },
];

export function getVrxProducts(): VrxProduct[] {
  return vrxProducts;
}

export function getVrxProductById(id: string): VrxProduct | undefined {
  return vrxProducts.find(p => p.id === id);
}
