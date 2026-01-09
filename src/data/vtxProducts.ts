import vtxLowPower from "@/assets/vtx/vtx-low-power.png";
import vtxHighPower from "@/assets/vtx/vtx-high-power.jpg";
import vtx25w from "@/assets/vtx/vtx-2.5w.png";

export interface VtxProduct {
  id: string;
  model: string;
  name: string;
  power: string;
  frequency: string;
  frequencyBand: "49-61" | "61-72";
  channels: number;
  image: string;
  specs: {
    inputVoltage: string;
    outputVoltage: string;
    powerLevels: string;
    mountingSize: string;
    antennaInterface: string;
    consumption: string;
    features: string;
    microphone: string;
    cableInterface: string;
    weight: string;
    size: string;
  };
  highlights: string[];
  description: string[];
  operationGuide: {
    bandSelection: string;
    channelSelection: string;
    powerSelection: string;
    powerLevelsTable?: { level: number; power: string }[];
  };
  notes: string[];
  frequencyTable: { band: string; ch1: number; ch2: number; ch3: number; ch4: number; ch5: number; ch6: number; ch7: number; ch8: number }[];
}

// 4.9GHz-6.1GHz 频段表
export const frequencyTable49to61 = [
  { band: "Band A", ch1: 5865, ch2: 5845, ch3: 5825, ch4: 5805, ch5: 5785, ch6: 5765, ch7: 5745, ch8: 5725 },
  { band: "Band b", ch1: 5733, ch2: 5752, ch3: 5771, ch4: 5790, ch5: 5809, ch6: 5828, ch7: 5847, ch8: 5866 },
  { band: "Band E", ch1: 5705, ch2: 5685, ch3: 5665, ch4: 5645, ch5: 5885, ch6: 5905, ch7: 5925, ch8: 5945 },
  { band: "Band F", ch1: 5740, ch2: 5760, ch3: 5780, ch4: 5800, ch5: 5820, ch6: 5840, ch7: 5860, ch8: 5880 },
  { band: "Band r", ch1: 5658, ch2: 5695, ch3: 5732, ch4: 5769, ch5: 5806, ch6: 5843, ch7: 5880, ch8: 5917 },
  { band: "Band P", ch1: 5653, ch2: 5693, ch3: 5733, ch4: 5773, ch5: 5813, ch6: 5853, ch7: 5893, ch8: 5933 },
  { band: "Band L", ch1: 5333, ch2: 5373, ch3: 5413, ch4: 5453, ch5: 5493, ch6: 5533, ch7: 5573, ch8: 5613 },
  { band: "Band U", ch1: 5325, ch2: 5348, ch3: 5366, ch4: 5384, ch5: 5402, ch6: 5420, ch7: 5438, ch8: 5456 },
  { band: "Band O", ch1: 5474, ch2: 5492, ch3: 5510, ch4: 5528, ch5: 5546, ch6: 5564, ch7: 5582, ch8: 5600 },
  { band: "Band X", ch1: 4990, ch2: 5020, ch3: 5050, ch4: 5080, ch5: 5110, ch6: 5140, ch7: 5170, ch8: 5200 }
];

// 6.1GHz-7.2GHz 频段表
export const frequencyTable61to72 = [
  { band: "Band A", ch1: 6110, ch2: 6130, ch3: 6150, ch4: 6170, ch5: 6190, ch6: 6210, ch7: 6230, ch8: 6250 },
  { band: "Band B", ch1: 6270, ch2: 6290, ch3: 6310, ch4: 6330, ch5: 6350, ch6: 6370, ch7: 6390, ch8: 6410 },
  { band: "Band E", ch1: 6430, ch2: 6450, ch3: 6470, ch4: 6490, ch5: 6510, ch6: 6530, ch7: 6550, ch8: 6570 },
  { band: "Band F", ch1: 6590, ch2: 6610, ch3: 6630, ch4: 6650, ch5: 6670, ch6: 6690, ch7: 6710, ch8: 6730 },
  { band: "Band R", ch1: 6750, ch2: 6770, ch3: 6790, ch4: 6810, ch5: 6830, ch6: 6850, ch7: 6870, ch8: 6890 },
  { band: "Band P", ch1: 6910, ch2: 6930, ch3: 6950, ch4: 6970, ch5: 6990, ch6: 7010, ch7: 7030, ch8: 7050 },
  { band: "Band H", ch1: 7070, ch2: 7090, ch3: 7110, ch4: 7130, ch5: 7150, ch6: 7170, ch7: 7190, ch8: 7210 },
  { band: "Band U", ch1: 6115, ch2: 6265, ch3: 6425, ch4: 6585, ch5: 6745, ch6: 6905, ch7: 7065, ch8: 7185 }
];

// 所有VTX产品数据
export const vtxProducts: VtxProduct[] = [
  // 4.9-6.1GHz 产品
  {
    id: "flym-pv02w500-a1",
    model: "FLYM-PV02W500-A1",
    name: "2.5W 视频发射器",
    power: "2.5W",
    frequency: "4.9-6.1GHz",
    frequencyBand: "49-61",
    channels: 80,
    image: vtx25w,
    specs: {
      inputVoltage: "12-28V，推荐使用6S电池",
      outputVoltage: "5V",
      powerLevels: "25mW/2.5W",
      mountingSize: "30.5×30.5mm",
      antennaInterface: "MMCX",
      consumption: "12V@800mA 或 28V@300mA",
      features: "内置散热风扇 & 散热器",
      microphone: "不支持",
      cableInterface: "JST 6针（单12-28V输入及单接地）",
      weight: "23g",
      size: "36×36×8mm"
    },
    highlights: [
      "采用高性能射频PCB材料（罗杰斯4350B）",
      "优良的散热设计",
      "支持80频道，4.8~6.1GHz",
      "支持SA协议与PIT模式",
      "高强度CNC铝合金外壳",
      "轻量化设计，仅23g"
    ],
    description: [
      "采用高性能的射频PCB材料（罗杰斯4350B），使得我们的产品在各种环境下都能获得优秀的射频性能",
      "优良的散热设计，让产品能在严酷的环境中获得同样优秀的性能",
      "5.8G的载波，让信号可以飞的更远",
      "频段80个，支持4.8~6.1G，任意频点，及频率组合定制（step 1MHz）",
      "支持SA协议（支持协议定制）",
      "支持PIT模式（按住模块上的按键再通电开机，机器将进入PIT模式）",
      "高强度CNC铝合金外壳，能起到良好的保护、散热、支撑，部分产品内置风扇，散热方面有了良好的保证",
      "支持5V输出",
      "支持宽压输入：7~28V（2~6S）",
      "所有产品均采用轻量化设计，有效减轻产品的重量",
      "选择优秀的射频功放，提高产品的工作效率",
      "单按键操作，让产品有效减少了体积",
      "部分产品支持MMCX接口天线，有效减小体积减轻重量"
    ],
    operationGuide: {
      bandSelection: "长按按钮选择功能，相应的绿色指示灯会亮起",
      channelSelection: "短按按钮选择档位，相应的蓝色指示灯会亮起",
      powerSelection: "长按按钮切换功率档位",
      powerLevelsTable: [
        { level: 1, power: "25mW" },
        { level: 2, power: "2.5W" }
      ]
    },
    notes: [
      "发射器（VTX）可通过智能音频完全控制，支持待机模式",
      "发射器将在5秒延迟后启动功率放大器。此5秒缓启动可避免因瞬时最大功率烧毁设备"
    ],
    frequencyTable: frequencyTable49to61
  },
  {
    id: "flym-pv03w000-a1",
    model: "FLYM-PV03W000-A1",
    name: "3W 视频发射器",
    power: "3W",
    frequency: "4.9-6.1GHz",
    frequencyBand: "49-61",
    channels: 80,
    image: vtxLowPower,
    specs: {
      inputVoltage: "12-28V，推荐使用6S电池",
      outputVoltage: "5V",
      powerLevels: "25mW/3W",
      mountingSize: "30.5×30.5mm",
      antennaInterface: "MMCX",
      consumption: "12V@800mA 或 28V@300mA",
      features: "内置散热风扇 & 散热器",
      microphone: "不支持",
      cableInterface: "JST 6针（单12-28V输入及单接地）",
      weight: "23g",
      size: "36×36×8mm"
    },
    highlights: [
      "采用高性能射频PCB材料（罗杰斯4350B）",
      "优良的散热设计",
      "支持80频道，4.8~6.1GHz",
      "支持SA协议与PIT模式",
      "高强度CNC铝合金外壳",
      "轻量化设计，仅23g"
    ],
    description: [
      "采用高性能的射频PCB材料（罗杰斯4350B），使得我们的产品在各种环境下都能获得优秀的射频性能",
      "优良的散热设计，让产品能在严酷的环境中获得同样优秀的性能",
      "5.8G的载波，让信号可以飞的更远",
      "频段80个，支持4.8~6.1G，任意频点，及频率组合定制（step 1MHz）",
      "支持SA协议（支持协议定制）",
      "支持PIT模式（按住模块上的按键再通电开机，机器将进入PIT模式）",
      "高强度CNC铝合金外壳，能起到良好的保护、散热、支撑，部分产品内置风扇，散热方面有了良好的保证",
      "支持5V输出",
      "支持宽压输入：7~28V（2~6S）",
      "所有产品均采用轻量化设计，有效减轻产品的重量",
      "选择优秀的射频功放，提高产品的工作效率",
      "单按键操作，让产品有效减少了体积",
      "部分产品支持MMCX接口天线，有效减小体积减轻重量"
    ],
    operationGuide: {
      bandSelection: "长按按钮选择功能，相应的绿色指示灯会亮起",
      channelSelection: "短按按钮选择档位，相应的蓝色指示灯会亮起",
      powerSelection: "长按按钮切换功率档位",
      powerLevelsTable: [
        { level: 1, power: "25mW" },
        { level: 2, power: "3W" }
      ]
    },
    notes: [
      "发射器（VTX）可通过智能音频完全控制，支持待机模式",
      "发射器将在5秒延迟后启动功率放大器。此5秒缓启动可避免因瞬时最大功率烧毁设备"
    ],
    frequencyTable: frequencyTable49to61
  },
  {
    id: "fv10w-a1",
    model: "FV10W-A1",
    name: "10W 视频发射器",
    power: "10W",
    frequency: "4.9-6.1GHz",
    frequencyBand: "49-61",
    channels: 80,
    image: vtxHighPower,
    specs: {
      inputVoltage: "12-28V，推荐使用6S电池",
      outputVoltage: "5V",
      powerLevels: "1W/3W/5W/7W/10W",
      mountingSize: "30.5×30.5mm",
      antennaInterface: "SMA",
      consumption: "12V/2.8A 或 28V/1.1A",
      features: "智能音频/内置散热风扇 & 散热器",
      microphone: "内置",
      cableInterface: "JST 8针（双12-28V输入及双接地）",
      weight: "47g",
      size: "68×36×15mm"
    },
    highlights: [
      "5档功率可调 (1W/3W/5W/7W/10W)",
      "内置散热风扇与麦克风",
      "所有元件均置于散热器保护下",
      "4个安装孔位，便于固定",
      "支持Betaflight软件控制",
      "5秒缓启动保护功能"
    ],
    description: [
      "5.8GHz 80频道 10W输出",
      "内置散热风扇与麦克风",
      "所有元件均置于散热器保护下",
      "4个安装孔位，便于固定"
    ],
    operationGuide: {
      bandSelection: "长按按钮3秒，直至LED显示英文字母闪烁，短按切换频段（A/b/E/F/r/P/L/U/O/X）",
      channelSelection: "短按按钮直接切换频道1-8",
      powerSelection: "长按按钮6秒，直至LED数字快速闪烁，短按选择功率档位",
      powerLevelsTable: [
        { level: 1, power: "1W" },
        { level: 2, power: "3W" },
        { level: 3, power: "5W" },
        { level: 4, power: "7W" },
        { level: 5, power: "10W" }
      ]
    },
    notes: [
      "双电源输入与接地焊接要求：必须严格按照焊盘位置焊接双12-28V电源输入线及双接地线，禁止仅焊接单根线，以确保设备电源传输稳定",
      "天线安装要求：通电前务必完成天线接口与天线的安装，避免因未安装导致设备故障或性能下降",
      "散热器禁止拆卸：设备散热器对散热至关重要，禁止擅自拆卸，以防过热损坏设备",
      "安装位置建议：为达到最佳散热效果，请将视频发射器（VTX）安装在无人机框架最顶部，确保空气流通",
      "PIT模式（低功耗模式）操作说明：通过Betaflight地面站软件可便捷进入/退出PIT模式；长按设备按钮15秒也可退出PIT模式；若未主动退出，下次通电时设备仍保持PIT模式"
    ],
    frequencyTable: frequencyTable49to61
  },
  {
    id: "fv16w-a1",
    model: "FV16W-A1",
    name: "16W 视频发射器",
    power: "16W",
    frequency: "4.9-6.1GHz",
    frequencyBand: "49-61",
    channels: 80,
    image: vtxHighPower,
    specs: {
      inputVoltage: "12-28V，推荐使用6S电池",
      outputVoltage: "5V",
      powerLevels: "16W（功率档位可定制）",
      mountingSize: "30.5×30.5mm",
      antennaInterface: "SMA",
      consumption: "12V-28V",
      features: "智能音频/内置散热风扇 & 散热器",
      microphone: "内置",
      cableInterface: "JST 8针（双12-28V输入及双接地）",
      weight: "47g",
      size: "68×36×15mm"
    },
    highlights: [
      "16W大功率输出",
      "内置散热风扇与麦克风",
      "所有元件均置于散热器保护下",
      "4个安装孔位，便于固定",
      "功率档位可定制",
      "支持Betaflight软件控制"
    ],
    description: [
      "5.8GHz 80频道 16W输出",
      "内置散热风扇与麦克风",
      "所有元件均置于散热器保护下",
      "4个安装孔位，便于固定"
    ],
    operationGuide: {
      bandSelection: "长按按钮3秒，直至LED显示英文字母闪烁，短按切换频段（A/b/E/F/r/P/L/U/O/X）",
      channelSelection: "短按按钮直接切换频道1-8",
      powerSelection: "功率档位可定制"
    },
    notes: [
      "双电源输入与接地焊接要求：必须严格按照焊盘位置焊接双12-28V电源输入线及双接地线，禁止仅焊接单根线，以确保设备电源传输稳定",
      "天线安装要求：通电前务必完成天线接口与天线的安装，避免因未安装导致设备故障或性能下降",
      "散热器禁止拆卸：设备散热器对散热至关重要，禁止擅自拆卸，以防过热损坏设备",
      "安装位置建议：为达到最佳散热效果，请将视频发射器（VTX）安装在无人机框架最顶部，确保空气流通",
      "PIT模式（低功耗模式）操作说明：通过Betaflight地面站软件可便捷进入/退出PIT模式；长按设备按钮15秒也可退出PIT模式；若未主动退出，下次通电时设备仍保持PIT模式"
    ],
    frequencyTable: frequencyTable49to61
  },
  {
    id: "fv25w-a1",
    model: "FV25W-A1",
    name: "25W 视频发射器",
    power: "25W",
    frequency: "4.9-6.1GHz",
    frequencyBand: "49-61",
    channels: 80,
    image: vtxHighPower,
    specs: {
      inputVoltage: "12-28V，推荐使用6S电池",
      outputVoltage: "5V",
      powerLevels: "25W（功率档位可定制）",
      mountingSize: "30.5×30.5mm",
      antennaInterface: "SMA",
      consumption: "24V-28V",
      features: "智能音频/内置散热风扇 & 散热器",
      microphone: "内置",
      cableInterface: "JST 8针（双12-28V输入及双接地）",
      weight: "47g",
      size: "68×36×15mm"
    },
    highlights: [
      "25W大功率输出，远距离传输",
      "内置散热风扇与麦克风",
      "所有元件均置于散热器保护下",
      "4个安装孔位，便于固定",
      "功率档位可定制",
      "支持Betaflight软件控制"
    ],
    description: [
      "5.8GHz 80频道 25W输出",
      "内置散热风扇与麦克风",
      "所有元件均置于散热器保护下",
      "4个安装孔位，便于固定"
    ],
    operationGuide: {
      bandSelection: "长按按钮3秒，直至LED显示英文字母闪烁，短按切换频段（A/b/E/F/r/P/L/U/O/X）",
      channelSelection: "短按按钮直接切换频道1-8",
      powerSelection: "功率档位可定制"
    },
    notes: [
      "双电源输入与接地焊接要求：必须严格按照焊盘位置焊接双12-28V电源输入线及双接地线，禁止仅焊接单根线，以确保设备电源传输稳定",
      "天线安装要求：通电前务必完成天线接口与天线的安装，避免因未安装导致设备故障或性能下降",
      "散热器禁止拆卸：设备散热器对散热至关重要，禁止擅自拆卸，以防过热损坏设备",
      "安装位置建议：为达到最佳散热效果，请将视频发射器（VTX）安装在无人机框架最顶部，确保空气流通",
      "PIT模式（低功耗模式）操作说明：通过Betaflight地面站软件可便捷进入/退出PIT模式；长按设备按钮15秒也可退出PIT模式；若未主动退出，下次通电时设备仍保持PIT模式"
    ],
    frequencyTable: frequencyTable49to61
  },
  {
    id: "fv37w-a1",
    model: "FV37W-A1",
    name: "37W 视频发射器",
    power: "37W",
    frequency: "4.9-6.1GHz",
    frequencyBand: "49-61",
    channels: 80,
    image: vtxHighPower,
    specs: {
      inputVoltage: "12-28V，推荐使用6S电池",
      outputVoltage: "5V",
      powerLevels: "37W（功率档位可定制）",
      mountingSize: "30.5×30.5mm",
      antennaInterface: "SMA",
      consumption: "24V-28V",
      features: "智能音频/内置散热风扇 & 散热器",
      microphone: "内置",
      cableInterface: "JST 8针（双12-28V输入及双接地）",
      weight: "47g",
      size: "68×36×15mm"
    },
    highlights: [
      "37W超大功率，极限远距离传输",
      "内置散热风扇与麦克风",
      "所有元件均置于散热器保护下",
      "4个安装孔位，便于固定",
      "功率档位可定制",
      "支持Betaflight软件控制"
    ],
    description: [
      "5.8GHz 80频道 37W输出",
      "内置散热风扇与麦克风",
      "所有元件均置于散热器保护下",
      "4个安装孔位，便于固定"
    ],
    operationGuide: {
      bandSelection: "长按按钮3秒，直至LED显示英文字母闪烁，短按切换频段（A/b/E/F/r/P/L/U/O/X）",
      channelSelection: "短按按钮直接切换频道1-8",
      powerSelection: "功率档位可定制"
    },
    notes: [
      "双电源输入与接地焊接要求：必须严格按照焊盘位置焊接双12-28V电源输入线及双接地线，禁止仅焊接单根线，以确保设备电源传输稳定",
      "天线安装要求：通电前务必完成天线接口与天线的安装，避免因未安装导致设备故障或性能下降",
      "散热器禁止拆卸：设备散热器对散热至关重要，禁止擅自拆卸，以防过热损坏设备",
      "安装位置建议：为达到最佳散热效果，请将视频发射器（VTX）安装在无人机框架最顶部，确保空气流通",
      "PIT模式（低功耗模式）操作说明：通过Betaflight地面站软件可便捷进入/退出PIT模式；长按设备按钮15秒也可退出PIT模式；若未主动退出，下次通电时设备仍保持PIT模式"
    ],
    frequencyTable: frequencyTable49to61
  },
  // 6.1-7.2GHz 产品
  {
    id: "fv10w-72",
    model: "FV10W-7.2",
    name: "10W 视频发射器 (7.2GHz)",
    power: "10W",
    frequency: "6.1-7.2GHz",
    frequencyBand: "61-72",
    channels: 64,
    image: vtxHighPower,
    specs: {
      inputVoltage: "12-28V，推荐使用6S电池",
      outputVoltage: "5V",
      powerLevels: "1W/3W/5W/7W/10W（档位可定制）",
      mountingSize: "30.5×30.5mm",
      antennaInterface: "SMA",
      consumption: "12V/2.8A 或 28V/1.1A",
      features: "智能音频/内置散热风扇 & 散热器",
      microphone: "内置",
      cableInterface: "JST 8针（双12-28V输入及双接地）",
      weight: "47g",
      size: "68×36×15mm"
    },
    highlights: [
      "7.2GHz高频段，规避干扰",
      "64频道可选",
      "5档功率可调 (1W/3W/5W/7W/10W)",
      "内置散热风扇与麦克风",
      "所有元件均置于散热器保护下",
      "支持Betaflight软件控制"
    ],
    description: [
      "7.2GHz 64频道 10W输出",
      "内置散热风扇与麦克风",
      "所有元件均置于散热器保护下",
      "4个安装孔位，便于固定"
    ],
    operationGuide: {
      bandSelection: "长按按钮3秒，直至LED显示英文字母闪烁，短按切换频段（A/B/E/F/R/P/H/U）",
      channelSelection: "短按按钮直接切换频道1-8",
      powerSelection: "长按按钮6秒，直至LED数字快速闪烁，短按选择功率档位（选配，可按需设置档位）",
      powerLevelsTable: [
        { level: 1, power: "1W" },
        { level: 2, power: "3W" },
        { level: 3, power: "5W" },
        { level: 4, power: "7W" },
        { level: 5, power: "10W" }
      ]
    },
    notes: [
      "双电源输入与接地焊接要求：必须严格按照焊盘位置焊接双12-28V电源输入线及双接地线，禁止仅焊接单根线，以确保设备电源传输稳定",
      "天线安装要求：通电前务必完成天线接口与天线的安装，避免因未安装导致设备故障或性能下降",
      "散热器禁止拆卸：设备散热器对散热至关重要，禁止擅自拆卸，以防过热损坏设备",
      "安装位置建议：为达到最佳散热效果，请将视频发射器（VTX）安装在无人机框架最顶部，确保空气流通",
      "PIT模式（低功耗模式）操作说明：通过Betaflight地面站软件可便捷进入/退出PIT模式；长按设备按钮15秒也可退出PIT模式；若未主动退出，下次通电时设备仍保持PIT模式"
    ],
    frequencyTable: frequencyTable61to72
  }
];

// 获取产品列表按频段分类
export const getProducts49to61 = () => vtxProducts.filter(p => p.frequencyBand === "49-61");
export const getProducts61to72 = () => vtxProducts.filter(p => p.frequencyBand === "61-72");

// 通过ID获取产品
export const getProductById = (id: string) => vtxProducts.find(p => p.id === id);
