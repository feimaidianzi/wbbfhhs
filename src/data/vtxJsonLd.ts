// VTX product JSON-LD structured data + FAQ key sets
// Extracted from VtxDetail.tsx to reduce main component size and enable tree-shaking.

type FaqItem = { questionKey: string; answerKey: string };

export const pv02JsonLd = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "FLYM-PV02W500-A1 2.5W High-Power Analog VTX",
  "description": "High-performance 2.5W (2500mW) analog video transmitter optimized for long-range FPV and medium-range NLOS missions. Zero-latency analog link with active cooling and wide voltage DC 7-36V.",
  "brand": { "@type": "Brand", "name": "CANI UAV" },
  "sku": "PV02W500-A1",
  "mpn": "FLYM-PV02W500-A1",
  "image": "https://www.caniuav.com/assets/vtx/vtx-2.5w.png",
  "keywords": "2.5W analog VTX, 2500mW video transmitter, long-range FPV, NLOS video link, zero-latency analog transmission",
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "RF Output Power", "value": "2500mW (2.5W)" },
    { "@type": "PropertyValue", "name": "Transmission Range", "value": "8km LOS" },
    { "@type": "PropertyValue", "name": "Input Voltage", "value": "DC 7-36V (2-8S LiPo)" },
    { "@type": "PropertyValue", "name": "End-to-End Latency", "value": "<1ms (Zero-Latency Analog)" },
    { "@type": "PropertyValue", "name": "Cooling System", "value": "Active Fan + CNC Aluminum Heatsink" },
    { "@type": "PropertyValue", "name": "Frequency Band", "value": "4.9-6.1GHz" },
    { "@type": "PropertyValue", "name": "Channels", "value": "80" },
    { "@type": "PropertyValue", "name": "Weight", "value": "23g" },
    { "@type": "PropertyValue", "name": "Mounting", "value": "30.5x30.5mm Standard" },
    { "@type": "PropertyValue", "name": "Protocol", "value": "SmartAudio / Pit Mode" }
  ],
  "offers": {
    "@type": "Offer",
    "url": "https://www.caniuav.com/products/accessories/vtx-vrx/flym-pv02w500-a1",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
};

export const pv02FaqItems: FaqItem[] = [
  { questionKey: "vtxDetail.pv02.faq.q1", answerKey: "vtxDetail.pv02.faq.a1" },
  { questionKey: "vtxDetail.pv02.faq.q2", answerKey: "vtxDetail.pv02.faq.a2" },
  { questionKey: "vtxDetail.pv02.faq.q3", answerKey: "vtxDetail.pv02.faq.a3" },
];

export const pv03JsonLd = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "FLYM-PV03W000-A1 3W (3000mW) Ultra-High Power Analog VTX",
  "description": "Flagship 3W (3000mW) analog video transmitter engineered for extreme NLOS missions and tactical long-range video transmission. Zero-latency analog link with advanced CNC thermal management for sustained high-power output.",
  "brand": { "@type": "Brand", "name": "CANI UAV" },
  "sku": "PV03W000-A1",
  "mpn": "FLYM-PV03W000-A1",
  "image": "https://www.caniuav.com/assets/vtx/vtx-low-power.png",
  "keywords": "3W analog VTX, 3000mW video transmitter, NLOS video transmission, tactical long-range analog system, military-grade signal penetration, zero-latency analog link, industrial UAV VTX",
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "RF Output Power", "value": "3000mW (3W)" },
    { "@type": "PropertyValue", "name": "Transmission Range", "value": "10km LOS" },
    { "@type": "PropertyValue", "name": "Input Voltage", "value": "DC 7-36V (2-8S LiPo)" },
    { "@type": "PropertyValue", "name": "End-to-End Latency", "value": "<1ms (Zero-Latency Analog)" },
    { "@type": "PropertyValue", "name": "Cooling System", "value": "Active Fan + Heavy-Duty CNC Aluminum Chassis" },
    { "@type": "PropertyValue", "name": "Protocol", "value": "SmartAudio / IRC Tramp / Pit Mode" },
    { "@type": "PropertyValue", "name": "Frequency Band", "value": "4.9-6.1GHz" },
    { "@type": "PropertyValue", "name": "Channels", "value": "80" },
    { "@type": "PropertyValue", "name": "Weight", "value": "23g" },
    { "@type": "PropertyValue", "name": "Mounting", "value": "30.5x30.5mm Standard" },
    { "@type": "PropertyValue", "name": "NLOS Capability", "value": "Superior obstacle penetration — urban, forest, underground" }
  ],
  "offers": {
    "@type": "Offer",
    "url": "https://www.caniuav.com/products/accessories/vtx-vrx/flym-pv03w000-a1",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
};

export const pv03FaqItems: FaqItem[] = [
  { questionKey: "vtxDetail.pv03.faq.q1", answerKey: "vtxDetail.pv03.faq.a1" },
  { questionKey: "vtxDetail.pv03.faq.q2", answerKey: "vtxDetail.pv03.faq.a2" },
  { questionKey: "vtxDetail.pv03.faq.q3", answerKey: "vtxDetail.pv03.faq.a3" },
];

export const fv10wJsonLd = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "FV10W-A1 10W (10,000mW) Ultra-High Power Analog Video Link",
  "description": "Flagship 10W (10,000mW) analog video transmitter for extreme NLOS and tactical long-range missions. Carrier-grade signal penetration through multi-layer concrete, dense forest, and underground facilities. Industrial dual cooling with CNC aluminum chassis.",
  "brand": { "@type": "Brand", "name": "CANI UAV" },
  "sku": "FV10W-A1",
  "mpn": "FV10W-A1",
  "keywords": "10W analog VTX, 10000mW video transmitter, NLOS tactical video link, extreme distance analog system, heavy-duty signal penetration, carrier-grade analog video link, industrial UAV video transmitter",
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "RF Output Power", "value": "10,000mW (10W)" },
    { "@type": "PropertyValue", "name": "Power Steps", "value": "1W / 3W / 5W / 7W / 10W (5-Step)" },
    { "@type": "PropertyValue", "name": "Frequency Band", "value": "4.9-6.1GHz" },
    { "@type": "PropertyValue", "name": "Channels", "value": "80CH" },
    { "@type": "PropertyValue", "name": "Input Voltage", "value": "DC 12-28V (3-6S LiPo)" },
    { "@type": "PropertyValue", "name": "Current Consumption", "value": ">2.5A @ 12V" },
    { "@type": "PropertyValue", "name": "End-to-End Latency", "value": "<1ms (Zero-Latency Analog)" },
    { "@type": "PropertyValue", "name": "Cooling System", "value": "Dual Industrial: Active Fan + CNC Aluminum Chassis" },
    { "@type": "PropertyValue", "name": "Protocol", "value": "SmartAudio / IRC Tramp / Pit Mode" },
    { "@type": "PropertyValue", "name": "Mounting Size", "value": "30.5×30.5mm" },
    { "@type": "PropertyValue", "name": "Weight", "value": "47g" },
    { "@type": "PropertyValue", "name": "NLOS Capability", "value": "Multi-layer concrete, dense forest, underground-to-surface" }
  ],
  "offers": {
    "@type": "Offer",
    "url": "https://www.caniuav.com/products/accessories/vtx-vrx/fv10w-a1",
    "availability": "https://schema.org/InStock"
  }
};

export const fv10wFaqItems: FaqItem[] = [
  { questionKey: "vtxDetail.fv10w.faq.q1", answerKey: "vtxDetail.fv10w.faq.a1" },
  { questionKey: "vtxDetail.fv10w.faq.q2", answerKey: "vtxDetail.fv10w.faq.a2" },
  { questionKey: "vtxDetail.fv10w.faq.q3", answerKey: "vtxDetail.fv10w.faq.a3" },
];

export const fv16wJsonLd = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "FV16W-A1 16W (16000mW) Ultra-Power Tactical NLOS Analog VTX",
  "description": "The FV16W-A1 is a flagship 16W (16000mW) analog video transmitter designed for extreme NLOS missions. Features superior signal penetration through multiple concrete walls and dense forests with advanced industrial cooling.",
  "brand": { "@type": "Brand", "name": "CANI Technology" },
  "sku": "FV16W-A1-16W",
  "mpn": "FV16W-A1",
  "keywords": "16W VTX, 16000mW VTX, Tactical NLOS VTX, Heavy-Duty RF Penetration, Anti-Interference Analog Transmitter, Carrier-Grade Analog Video Link",
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "RF Output Power", "value": "16000mW (16W)" },
    { "@type": "PropertyValue", "name": "NLOS Capability", "value": "Multi-layer concrete / Dense forest / Underground" },
    { "@type": "PropertyValue", "name": "Current Consumption", "value": "3.5-4.5A @ 12V" },
    { "@type": "PropertyValue", "name": "Frequency Band", "value": "4.9-6.1GHz" },
    { "@type": "PropertyValue", "name": "Channels", "value": "80CH" },
    { "@type": "PropertyValue", "name": "Input Voltage", "value": "DC 12-28V" },
    { "@type": "PropertyValue", "name": "Cooling System", "value": "Quad Fan + CNC Aerospace-Grade Aluminum Chassis" },
    { "@type": "PropertyValue", "name": "Latency", "value": "Zero-Latency (Analog)" },
    { "@type": "PropertyValue", "name": "Application", "value": "Tactical Reconnaissance / Mining Robotics / Search and Rescue / Industrial Inspection" },
    { "@type": "PropertyValue", "name": "Mounting Size", "value": "30.5×30.5mm" }
  ],
  "offers": {
    "@type": "Offer",
    "url": "https://www.caniuav.com/products/accessories/vtx-vrx/fv16w-a1",
    "availability": "https://schema.org/InStock"
  }
};

export const fv16wFaqItems: FaqItem[] = [
  { questionKey: "vtxDetail.fv16w.faq.q1", answerKey: "vtxDetail.fv16w.faq.a1" },
  { questionKey: "vtxDetail.fv16w.faq.q2", answerKey: "vtxDetail.fv16w.faq.a2" },
  { questionKey: "vtxDetail.fv16w.faq.q3", answerKey: "vtxDetail.fv16w.faq.a3" },
];

export const fv25wJsonLd = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "FV25W-A1 25W (25000mW) Strategic-Grade NLOS Analog Video Link",
  "description": "The world's most powerful 25W (25000mW) analog VTX. Built for extreme NLOS challenges — bunker penetration, cross-island relay, and high-EMI industrial environments. Zero-latency strategic video lifeline.",
  "brand": { "@type": "Brand", "name": "CANI Technology" },
  "sku": "FV25W-A1-25W-STRATEGIC",
  "mpn": "FV25W-A1",
  "keywords": "25W VTX, 25000mW VTX, Strategic NLOS VTX, Anti-Jamming Analog Transmitter, Cross-Island Video Relay, Bunker Penetration Link",
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "RF Output Power", "value": "25000mW (25W)" },
    { "@type": "PropertyValue", "name": "NLOS Capability", "value": "Bunker-level / Deep mountain / Cross-island maritime" },
    { "@type": "PropertyValue", "name": "Current Consumption", "value": "5-7A @ 12V" },
    { "@type": "PropertyValue", "name": "Frequency Band", "value": "4.9-6.1GHz" },
    { "@type": "PropertyValue", "name": "Channels", "value": "80CH / 96CH (Ultra-Wide)" },
    { "@type": "PropertyValue", "name": "Input Voltage", "value": "DC 12-36V" },
    { "@type": "PropertyValue", "name": "Cooling System", "value": "Dual Industrial Fan + CNC Extended Fin Array" },
    { "@type": "PropertyValue", "name": "Latency", "value": "Zero-Latency (Analog)" },
    { "@type": "PropertyValue", "name": "Application", "value": "Strategic Relay / Mining Robotics / Nuclear Inspection / Maritime Patrol" },
    { "@type": "PropertyValue", "name": "Antenna Requirement", "value": "50W+ rated, 50-ohm impedance matched" }
  ],
  "offers": {
    "@type": "Offer",
    "url": "https://www.caniuav.com/products/accessories/vtx-vrx/fv25w-a1",
    "availability": "https://schema.org/InStock"
  }
};

export const fv25wFaqItems: FaqItem[] = [
  { questionKey: "vtxDetail.fv25w.faq.q1", answerKey: "vtxDetail.fv25w.faq.a1" },
  { questionKey: "vtxDetail.fv25w.faq.q2", answerKey: "vtxDetail.fv25w.faq.a2" },
  { questionKey: "vtxDetail.fv25w.faq.q3", answerKey: "vtxDetail.fv25w.faq.a3" },
];

export const fv37wJsonLd = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "FV37W-A1 37W God-Tier FPV VTX",
  "description": "The world's highest power 37W (37000mW) 5.8GHz video transmitter. Extreme obstacle penetration and 20km+ long-range reliability for professional UAVs.",
  "brand": { "@type": "Brand", "name": "CANI Technology" },
  "sku": "FV37W-A1-37W",
  "mpn": "FV37W-A1",
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "RF Output Power", "value": "37000mW (37W)" },
    { "@type": "PropertyValue", "name": "Power Steps", "value": "Dual-Gear (e.g. 20W / 37W)" },
    { "@type": "PropertyValue", "name": "Transmission Range", "value": "20km+ LOS" },
    { "@type": "PropertyValue", "name": "Frequency Band", "value": "4.9-6.1GHz" },
    { "@type": "PropertyValue", "name": "Channels", "value": "80CH / 96CH (Ultra-Wide)" },
    { "@type": "PropertyValue", "name": "Input Voltage", "value": "DC 24-42V (6-10S LiPo)" },
    { "@type": "PropertyValue", "name": "Cooling System", "value": "Triple High-RPM Fan + CNC Fin Base" },
    { "@type": "PropertyValue", "name": "End-to-End Latency", "value": "≤30ms" },
    { "@type": "PropertyValue", "name": "Protocol", "value": "SmartAudio / IRC Tramp" }
  ],
  "offers": {
    "@type": "Offer",
    "url": "https://www.caniuav.com/products/accessories/vtx-vrx/fv37w-a1",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
};

export const fv37wFaqItems: FaqItem[] = [
  { questionKey: "vtxDetail.fv37w.faq.q1", answerKey: "vtxDetail.fv37w.faq.a1" },
  { questionKey: "vtxDetail.fv37w.faq.q2", answerKey: "vtxDetail.fv37w.faq.a2" },
  { questionKey: "vtxDetail.fv37w.faq.q3", answerKey: "vtxDetail.fv37w.faq.a3" },
];

// FV10W-72 JSON-LD factory (description requires t() lookup)
export const buildFv10w72JsonLd = (descriptionFromT: string) => ({
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "FV10W-72 10W 720MHz UHF Extreme NLOS Analog VTX",
  "description": descriptionFromT,
  "brand": { "@type": "Brand", "name": "CANI UAV" },
  "sku": "FV10W-72",
  "mpn": "FV10W-7.2",
  "category": "Sub-1GHz High-Power Video Transmission",
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "RF Output Power", "value": "10,000mW (10W)" },
    { "@type": "PropertyValue", "name": "Frequency Band", "value": "6.1-7.2GHz (720MHz UHF)" },
    { "@type": "PropertyValue", "name": "Channels", "value": "64CH" },
    { "@type": "PropertyValue", "name": "NLOS Capability", "value": "Extreme Diffraction - Sub-1GHz" },
    { "@type": "PropertyValue", "name": "Wavelength", "value": "~41cm (Superior Diffraction)" },
    { "@type": "PropertyValue", "name": "Power Steps", "value": "1W / 3W / 5W / 7W / 10W" },
    { "@type": "PropertyValue", "name": "Cooling System", "value": "Active Fan + CNC Aluminum Heatsink" },
    { "@type": "PropertyValue", "name": "End-to-End Latency", "value": "<1ms (Zero-Latency Analog)" },
    { "@type": "PropertyValue", "name": "Frequency Customization", "value": "600MHz - 900MHz Available" },
  ],
  "offers": {
    "@type": "Offer",
    "url": "https://www.caniuav.com/products/accessories/vtx-vrx/fv10w-72",
    "availability": "https://schema.org/InStock"
  }
});

export const fv10w72FaqItems: FaqItem[] = [
  { questionKey: "vtxDetail.fv10w72.faq.q1", answerKey: "vtxDetail.fv10w72.faq.a1" },
  { questionKey: "vtxDetail.fv10w72.faq.q2", answerKey: "vtxDetail.fv10w72.faq.a2" },
  { questionKey: "vtxDetail.fv10w72.faq.q3", answerKey: "vtxDetail.fv10w72.faq.a3" },
];
