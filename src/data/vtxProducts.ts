import vtxLowPower from "@/assets/vtx/vtx-low-power.png";
import vtxHighPower from "@/assets/vtx/vtx-high-power.jpg";
import vtx25w from "@/assets/vtx/vtx-2.5w.png";

export interface VtxProduct {
  id: string;
  model: string;
  nameKey: string;
  power: string;
  frequency: string;
  frequencyBand: "49-61" | "61-72";
  channels: number;
  image: string;
  specs: {
    inputVoltageKey: string;
    outputVoltage: string;
    powerLevels: string;
    mountingSize: string;
    antennaInterface: string;
    consumptionKey: string;
    featuresKey: string;
    microphoneKey: string;
    cableInterfaceKey: string;
    weight: string;
    size: string;
  };
  highlightKeys: string[];
  descriptionKeys: string[];
  operationGuide: {
    bandSelectionKey: string;
    channelSelectionKey: string;
    powerSelectionKey: string;
    powerLevelsTable?: { level: number; power: string }[];
  };
  noteKeys: string[];
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
    nameKey: "vtxProduct.25w.name",
    power: "2.5W",
    frequency: "4.9-6.1GHz",
    frequencyBand: "49-61",
    channels: 80,
    image: vtx25w,
    specs: {
      inputVoltageKey: "vtxProduct.specs.inputVoltage.12to28v",
      outputVoltage: "5V",
      powerLevels: "25mW/2.5W",
      mountingSize: "30.5×30.5mm",
      antennaInterface: "MMCX",
      consumptionKey: "vtxProduct.specs.consumption.25w",
      featuresKey: "vtxProduct.specs.features.fanHeatsink",
      microphoneKey: "vtxProduct.specs.microphone.no",
      cableInterfaceKey: "vtxProduct.specs.cable.jst6pin",
      weight: "23g",
      size: "36×36×8mm"
    },
    highlightKeys: [
      "vtxProduct.highlight.rfPcb",
      "vtxProduct.highlight.heatDesign",
      "vtxProduct.highlight.80ch49to61",
      "vtxProduct.highlight.saPit",
      "vtxProduct.highlight.cncCase",
      "vtxProduct.highlight.light23g"
    ],
    descriptionKeys: [
      "vtxProduct.desc.rfPcb",
      "vtxProduct.desc.heatDesign",
      "vtxProduct.desc.58gCarrier",
      "vtxProduct.desc.80chCustom",
      "vtxProduct.desc.saProtocol",
      "vtxProduct.desc.pitMode",
      "vtxProduct.desc.cncCase",
      "vtxProduct.desc.5vOutput",
      "vtxProduct.desc.wideVoltage",
      "vtxProduct.desc.lightweight",
      "vtxProduct.desc.rfAmp",
      "vtxProduct.desc.singleButton",
      "vtxProduct.desc.mmcxAntenna"
    ],
    operationGuide: {
      bandSelectionKey: "vtxProduct.guide.bandSelection",
      channelSelectionKey: "vtxProduct.guide.channelSelection",
      powerSelectionKey: "vtxProduct.guide.powerSelectionLongPress",
      powerLevelsTable: [
        { level: 1, power: "25mW" },
        { level: 2, power: "2.5W" }
      ]
    },
    noteKeys: [
      "vtxProduct.note.smartAudioStandby",
      "vtxProduct.note.5secDelay"
    ],
    frequencyTable: frequencyTable49to61
  },
  {
    id: "flym-pv03w000-a1",
    model: "FLYM-PV03W000-A1",
    nameKey: "vtxProduct.3w.name",
    power: "3W",
    frequency: "4.9-6.1GHz",
    frequencyBand: "49-61",
    channels: 80,
    image: vtxLowPower,
    specs: {
      inputVoltageKey: "vtxProduct.specs.inputVoltage.12to28v",
      outputVoltage: "5V",
      powerLevels: "25mW/3W",
      mountingSize: "30.5×30.5mm",
      antennaInterface: "MMCX",
      consumptionKey: "vtxProduct.specs.consumption.25w",
      featuresKey: "vtxProduct.specs.features.fanHeatsink",
      microphoneKey: "vtxProduct.specs.microphone.no",
      cableInterfaceKey: "vtxProduct.specs.cable.jst6pin",
      weight: "23g",
      size: "36×36×8mm"
    },
    highlightKeys: [
      "vtxProduct.highlight.rfPcb",
      "vtxProduct.highlight.heatDesign",
      "vtxProduct.highlight.80ch49to61",
      "vtxProduct.highlight.saPit",
      "vtxProduct.highlight.cncCase",
      "vtxProduct.highlight.light23g"
    ],
    descriptionKeys: [
      "vtxProduct.desc.rfPcb",
      "vtxProduct.desc.heatDesign",
      "vtxProduct.desc.58gCarrier",
      "vtxProduct.desc.80chCustom",
      "vtxProduct.desc.saProtocol",
      "vtxProduct.desc.pitMode",
      "vtxProduct.desc.cncCase",
      "vtxProduct.desc.5vOutput",
      "vtxProduct.desc.wideVoltage",
      "vtxProduct.desc.lightweight",
      "vtxProduct.desc.rfAmp",
      "vtxProduct.desc.singleButton",
      "vtxProduct.desc.mmcxAntenna"
    ],
    operationGuide: {
      bandSelectionKey: "vtxProduct.guide.bandSelection",
      channelSelectionKey: "vtxProduct.guide.channelSelection",
      powerSelectionKey: "vtxProduct.guide.powerSelectionLongPress",
      powerLevelsTable: [
        { level: 1, power: "25mW" },
        { level: 2, power: "3W" }
      ]
    },
    noteKeys: [
      "vtxProduct.note.smartAudioStandby",
      "vtxProduct.note.5secDelay"
    ],
    frequencyTable: frequencyTable49to61
  },
  {
    id: "fv10w-a1",
    model: "FV10W-A1",
    nameKey: "vtxProduct.10w.name",
    power: "10W",
    frequency: "4.9-6.1GHz",
    frequencyBand: "49-61",
    channels: 80,
    image: vtxHighPower,
    specs: {
      inputVoltageKey: "vtxProduct.specs.inputVoltage.12to28v",
      outputVoltage: "5V",
      powerLevels: "1W/3W/5W/7W/10W",
      mountingSize: "30.5×30.5mm",
      antennaInterface: "SMA",
      consumptionKey: "vtxProduct.specs.consumption.10w",
      featuresKey: "vtxProduct.specs.features.smartAudioFan",
      microphoneKey: "vtxProduct.specs.microphone.yes",
      cableInterfaceKey: "vtxProduct.specs.cable.jst8pin",
      weight: "47g",
      size: "68×36×15mm"
    },
    highlightKeys: [
      "vtxProduct.highlight.10w5levels",
      "vtxProduct.highlight.fanMic",
      "vtxProduct.highlight.heatsinkProtection",
      "vtxProduct.highlight.4mountHoles",
      "vtxProduct.highlight.betaflight",
      "vtxProduct.highlight.5secProtection"
    ],
    descriptionKeys: [
      "vtxProduct.desc.10w80ch",
      "vtxProduct.desc.fanMic",
      "vtxProduct.desc.heatsinkProtection",
      "vtxProduct.desc.4mountHoles"
    ],
    operationGuide: {
      bandSelectionKey: "vtxProduct.guide.bandSelection10w",
      channelSelectionKey: "vtxProduct.guide.channelSelection10w",
      powerSelectionKey: "vtxProduct.guide.powerSelection10w",
      powerLevelsTable: [
        { level: 1, power: "1W" },
        { level: 2, power: "3W" },
        { level: 3, power: "5W" },
        { level: 4, power: "7W" },
        { level: 5, power: "10W" }
      ]
    },
    noteKeys: [
      "vtxProduct.note.dualPower",
      "vtxProduct.note.antennaRequired",
      "vtxProduct.note.noHeatsinkRemoval",
      "vtxProduct.note.topMounting",
      "vtxProduct.note.pitModeOperation"
    ],
    frequencyTable: frequencyTable49to61
  },
  {
    id: "fv16w-a1",
    model: "FV16W-A1",
    nameKey: "vtxProduct.16w.name",
    power: "16W",
    frequency: "4.9-6.1GHz",
    frequencyBand: "49-61",
    channels: 80,
    image: vtxHighPower,
    specs: {
      inputVoltageKey: "vtxProduct.specs.inputVoltage.12to28v",
      outputVoltage: "5V",
      powerLevels: "16W",
      mountingSize: "30.5×30.5mm",
      antennaInterface: "SMA",
      consumptionKey: "vtxProduct.specs.consumption.16w",
      featuresKey: "vtxProduct.specs.features.smartAudioFan",
      microphoneKey: "vtxProduct.specs.microphone.yes",
      cableInterfaceKey: "vtxProduct.specs.cable.jst8pin",
      weight: "47g",
      size: "68×36×15mm"
    },
    highlightKeys: [
      "vtxProduct.highlight.16wOutput",
      "vtxProduct.highlight.fanMic",
      "vtxProduct.highlight.heatsinkProtection",
      "vtxProduct.highlight.4mountHoles",
      "vtxProduct.highlight.customPower",
      "vtxProduct.highlight.betaflight"
    ],
    descriptionKeys: [
      "vtxProduct.desc.16w80ch",
      "vtxProduct.desc.fanMic",
      "vtxProduct.desc.heatsinkProtection",
      "vtxProduct.desc.4mountHoles"
    ],
    operationGuide: {
      bandSelectionKey: "vtxProduct.guide.bandSelection10w",
      channelSelectionKey: "vtxProduct.guide.channelSelection10w",
      powerSelectionKey: "vtxProduct.guide.powerSelectionCustom"
    },
    noteKeys: [
      "vtxProduct.note.dualPower",
      "vtxProduct.note.antennaRequired",
      "vtxProduct.note.noHeatsinkRemoval",
      "vtxProduct.note.topMounting",
      "vtxProduct.note.pitModeOperation"
    ],
    frequencyTable: frequencyTable49to61
  },
  {
    id: "fv25w-a1",
    model: "FV25W-A1",
    nameKey: "vtxProduct.25wHigh.name",
    power: "25W",
    frequency: "4.9-6.1GHz",
    frequencyBand: "49-61",
    channels: 80,
    image: vtxHighPower,
    specs: {
      inputVoltageKey: "vtxProduct.specs.inputVoltage.12to28v",
      outputVoltage: "5V",
      powerLevels: "25W",
      mountingSize: "30.5×30.5mm",
      antennaInterface: "SMA",
      consumptionKey: "vtxProduct.specs.consumption.25wHigh",
      featuresKey: "vtxProduct.specs.features.smartAudioFan",
      microphoneKey: "vtxProduct.specs.microphone.yes",
      cableInterfaceKey: "vtxProduct.specs.cable.jst8pin",
      weight: "47g",
      size: "68×36×15mm"
    },
    highlightKeys: [
      "vtxProduct.highlight.25wLongRange",
      "vtxProduct.highlight.fanMic",
      "vtxProduct.highlight.heatsinkProtection",
      "vtxProduct.highlight.4mountHoles",
      "vtxProduct.highlight.customPower",
      "vtxProduct.highlight.betaflight"
    ],
    descriptionKeys: [
      "vtxProduct.desc.25w80ch",
      "vtxProduct.desc.fanMic",
      "vtxProduct.desc.heatsinkProtection",
      "vtxProduct.desc.4mountHoles"
    ],
    operationGuide: {
      bandSelectionKey: "vtxProduct.guide.bandSelection10w",
      channelSelectionKey: "vtxProduct.guide.channelSelection10w",
      powerSelectionKey: "vtxProduct.guide.powerSelectionCustom"
    },
    noteKeys: [
      "vtxProduct.note.dualPower",
      "vtxProduct.note.antennaRequired",
      "vtxProduct.note.noHeatsinkRemoval",
      "vtxProduct.note.topMounting",
      "vtxProduct.note.pitModeOperation"
    ],
    frequencyTable: frequencyTable49to61
  },
  {
    id: "fv37w-a1",
    model: "FV37W-A1",
    nameKey: "vtxProduct.37w.name",
    power: "37W",
    frequency: "4.9-6.1GHz",
    frequencyBand: "49-61",
    channels: 80,
    image: vtxHighPower,
    specs: {
      inputVoltageKey: "vtxProduct.specs.inputVoltage.12to28v",
      outputVoltage: "5V",
      powerLevels: "37W",
      mountingSize: "30.5×30.5mm",
      antennaInterface: "SMA",
      consumptionKey: "vtxProduct.specs.consumption.25wHigh",
      featuresKey: "vtxProduct.specs.features.smartAudioFan",
      microphoneKey: "vtxProduct.specs.microphone.yes",
      cableInterfaceKey: "vtxProduct.specs.cable.jst8pin",
      weight: "47g",
      size: "68×36×15mm"
    },
    highlightKeys: [
      "vtxProduct.highlight.37wExtreme",
      "vtxProduct.highlight.fanMic",
      "vtxProduct.highlight.heatsinkProtection",
      "vtxProduct.highlight.4mountHoles",
      "vtxProduct.highlight.customPower",
      "vtxProduct.highlight.betaflight"
    ],
    descriptionKeys: [
      "vtxProduct.desc.37w80ch",
      "vtxProduct.desc.fanMic",
      "vtxProduct.desc.heatsinkProtection",
      "vtxProduct.desc.4mountHoles"
    ],
    operationGuide: {
      bandSelectionKey: "vtxProduct.guide.bandSelection10w",
      channelSelectionKey: "vtxProduct.guide.channelSelection10w",
      powerSelectionKey: "vtxProduct.guide.powerSelectionCustom"
    },
    noteKeys: [
      "vtxProduct.note.dualPower",
      "vtxProduct.note.antennaRequired",
      "vtxProduct.note.noHeatsinkRemoval",
      "vtxProduct.note.topMounting",
      "vtxProduct.note.pitModeOperation"
    ],
    frequencyTable: frequencyTable49to61
  },
  // 6.1-7.2GHz 产品
  {
    id: "fv10w-72",
    model: "FV10W-7.2",
    nameKey: "vtxProduct.10w72.name",
    power: "10W",
    frequency: "6.1-7.2GHz",
    frequencyBand: "61-72",
    channels: 64,
    image: vtxHighPower,
    specs: {
      inputVoltageKey: "vtxProduct.specs.inputVoltage.12to28v",
      outputVoltage: "5V",
      powerLevels: "1W/3W/5W/7W/10W",
      mountingSize: "30.5×30.5mm",
      antennaInterface: "SMA",
      consumptionKey: "vtxProduct.specs.consumption.10w",
      featuresKey: "vtxProduct.specs.features.smartAudioFan",
      microphoneKey: "vtxProduct.specs.microphone.yes",
      cableInterfaceKey: "vtxProduct.specs.cable.jst8pin",
      weight: "47g",
      size: "68×36×15mm"
    },
    highlightKeys: [
      "vtxProduct.highlight.72ghzBand",
      "vtxProduct.highlight.10w5levels",
      "vtxProduct.highlight.fanMic",
      "vtxProduct.highlight.heatsinkProtection",
      "vtxProduct.highlight.betaflight",
      "vtxProduct.highlight.5secProtection"
    ],
    descriptionKeys: [
      "vtxProduct.desc.72ghz64ch",
      "vtxProduct.desc.fanMic",
      "vtxProduct.desc.heatsinkProtection",
      "vtxProduct.desc.4mountHoles"
    ],
    operationGuide: {
      bandSelectionKey: "vtxProduct.guide.bandSelection10w",
      channelSelectionKey: "vtxProduct.guide.channelSelection10w",
      powerSelectionKey: "vtxProduct.guide.powerSelection10w",
      powerLevelsTable: [
        { level: 1, power: "1W" },
        { level: 2, power: "3W" },
        { level: 3, power: "5W" },
        { level: 4, power: "7W" },
        { level: 5, power: "10W" }
      ]
    },
    noteKeys: [
      "vtxProduct.note.dualPower",
      "vtxProduct.note.antennaRequired",
      "vtxProduct.note.noHeatsinkRemoval",
      "vtxProduct.note.topMounting",
      "vtxProduct.note.pitModeOperation"
    ],
    frequencyTable: frequencyTable61to72
  }
];

// 辅助函数
export function getProducts49to61(): VtxProduct[] {
  return vtxProducts.filter(p => p.frequencyBand === "49-61");
}

export function getProducts61to72(): VtxProduct[] {
  return vtxProducts.filter(p => p.frequencyBand === "61-72");
}

export function getProductById(id: string): VtxProduct | undefined {
  return vtxProducts.find(p => p.id === id);
}
