/**
 * Product Auto-Linker Utility
 * 
 * Maps product keywords/names to their detail page URLs.
 * Used to automatically inject internal links into news article content,
 * eliminating "dead-end" pages and strengthening site architecture for SEO.
 */

export interface ProductLinkEntry {
  /** Keywords that trigger this link (Chinese + English variants) */
  keywords: string[];
  /** Target URL path */
  url: string;
  /** Display name for link title attribute */
  titleZh: string;
  titleEn: string;
  /** Product category for grouping */
  category: 'vtx' | 'fc-esc' | 'digital-fpv' | 'gimbal' | 'elrs' | 'camera' | 'ai-module' | 'platform';
}

/**
 * Master product keyword → URL mapping table.
 * Priority: longer keywords matched first to avoid partial matches.
 */
export const PRODUCT_LINK_MAP: ProductLinkEntry[] = [
  // === VTX 图传发射 ===
  {
    keywords: ['FV10W-72', 'FV10W72', '10W图传', '72V图传', '7.2GHz图传', '10W VTX', '37W VTX'],
    url: '/products/accessories/vtx-vrx/fv10w-72',
    titleZh: 'CANI FV10W-72 高功率数字图传',
    titleEn: 'CANI FV10W-72 High-Power Digital VTX',
    category: 'vtx',
  },
  {
    keywords: ['S900', 'COFDM图传', 'COFDM链路', 'S900图传'],
    url: '/products/accessories/vtx-vrx/s900',
    titleZh: 'CANI S900 COFDM 数字图传',
    titleEn: 'CANI S900 COFDM Digital Video Link',
    category: 'vtx',
  },
  {
    keywords: ['FV2W-58', 'FV2W58', '2W图传'],
    url: '/products/accessories/vtx-vrx/fv2w-58',
    titleZh: 'CANI FV2W-58 图传发射机',
    titleEn: 'CANI FV2W-58 VTX',
    category: 'vtx',
  },
  // === VRX 图传接收 ===
  {
    keywords: ['LLVRFRX-5849', 'LLVRFRX5849', 'Dual Chip接收', '双芯片接收'],
    url: '/products/accessories/vtx-vrx/vrx/llvrfrx-5849',
    titleZh: 'CANI LLVRFRX-5849 双芯片图传接收机',
    titleEn: 'CANI LLVRFRX-5849 Dual Chip VRX',
    category: 'vtx',
  },
  // === FC-ESC 飞控电调 ===
  {
    keywords: ['Stack-Mini F7-55A', 'Stack Mini F7', 'F7-55A飞塔', 'FlyMind Mini F7+55A', 'Mini F7飞塔'],
    url: '/products/accessories/fc-esc/stack-mini-f7-55a',
    titleZh: 'CANI Stack-Mini F7-55A 飞控电调飞塔',
    titleEn: 'CANI Stack-Mini F7-55A FC ESC Stack',
    category: 'fc-esc',
  },
  {
    keywords: ['CANI-Pixhawk4', 'Pixhawk4飞控', 'CANI Pixhawk', 'Pixhawk 4'],
    url: '/products/accessories/fc-esc/cani-pixhawk4',
    titleZh: 'CANI-Pixhawk4 开源飞控',
    titleEn: 'CANI-Pixhawk4 Open Source Flight Controller',
    category: 'fc-esc',
  },
  {
    keywords: ['ICF5飞控', 'ICF5', 'CANI-FMT', 'FMT飞控'],
    url: '/products/accessories/fc-esc/cani-fmt',
    titleZh: 'CANI-FMT ICF5 科研飞控',
    titleEn: 'CANI-FMT ICF5 Research Flight Controller',
    category: 'fc-esc',
  },
  {
    keywords: ['F722飞控', 'F722 100A', 'Pro F722', 'FlyMind Pro'],
    url: '/products/accessories/fc-esc/stack-pro-f722-100a',
    titleZh: 'CANI FlyMind Pro F722 100A 飞塔',
    titleEn: 'CANI FlyMind Pro F722 100A Stack',
    category: 'fc-esc',
  },
  // === Digital FPV 数字图传系统 ===
  {
    keywords: ['数字图传系统', 'Digital FPV System', 'FPV数字链路'],
    url: '/products/accessories/digital-fpv',
    titleZh: 'CANI 数字FPV图传系统',
    titleEn: 'CANI Digital FPV System',
    category: 'digital-fpv',
  },
  // === ELRS ===
  {
    keywords: ['ExpressLRS', 'ELRS模块', 'ELRS接收机', 'ELRS发射机'],
    url: '/products/accessories/elrs',
    titleZh: 'CANI ExpressLRS 遥控链路',
    titleEn: 'CANI ExpressLRS Control Link',
    category: 'elrs',
  },
  // === Gimbal 云台 ===
  {
    keywords: ['三轴云台', '云台吊舱', 'Gimbal Pod', '稳定云台'],
    url: '/products/accessories/gimbal',
    titleZh: 'CANI 云台吊舱系列',
    titleEn: 'CANI Gimbal & Pod Series',
    category: 'gimbal',
  },
  // === AI Module ===
  {
    keywords: ['AI模块', 'AI Module', 'YOLOv8', '边缘计算模块', '4TOPS'],
    url: '/products/accessories/ai-module',
    titleZh: 'CANI AI 边缘计算模块',
    titleEn: 'CANI AI Edge Computing Module',
    category: 'ai-module',
  },
  // === Platforms 整机 ===
  {
    keywords: ['W200', 'W300', 'W400'],
    url: '/products/multi-rotor',
    titleZh: 'CANI 工业多旋翼无人机平台',
    titleEn: 'CANI Industrial Multi-Rotor UAV Platforms',
    category: 'platform',
  },
  {
    keywords: ['TH-100', 'TH-200', 'TH-300', '系留无人机'],
    url: '/products/multi-rotor',
    titleZh: 'CANI 系留无人机系统',
    titleEn: 'CANI Tethered UAV Systems',
    category: 'platform',
  },
  // === Application Scenarios 应用场景 ===
  {
    keywords: ['电力巡检', '输电线路巡检', 'Power Line Inspection', 'Power Inspection'],
    url: '/applications/power-inspection',
    titleZh: 'CANI 电力巡检无人机方案',
    titleEn: 'CANI Power Inspection UAV Solutions',
    category: 'platform',
  },
  {
    keywords: ['应急救援', '搜救无人机', 'Emergency Rescue', 'Search and Rescue'],
    url: '/applications/emergency-rescue',
    titleZh: 'CANI 应急救援无人机系统',
    titleEn: 'CANI Emergency Rescue UAV System',
    category: 'platform',
  },
  {
    keywords: ['环境监测', '水质监测', 'Environmental Monitoring'],
    url: '/applications/environmental-monitoring',
    titleZh: 'CANI 环境监测无人机方案',
    titleEn: 'CANI Environmental Monitoring UAV Solutions',
    category: 'platform',
  },
  {
    keywords: ['测绘测量', '航测', 'Surveying and Mapping', 'Aerial Survey'],
    url: '/applications/surveying-mapping',
    titleZh: 'CANI 测绘测量无人机方案',
    titleEn: 'CANI Surveying & Mapping UAV Solutions',
    category: 'platform',
  },
  {
    keywords: ['交通监控', '智慧交通', 'Traffic Monitoring', 'Smart Transportation'],
    url: '/applications/traffic-monitoring',
    titleZh: 'CANI 交通监控无人机方案',
    titleEn: 'CANI Traffic Monitoring UAV Solutions',
    category: 'platform',
  },
  // === Technical Terms 技术术语 → 产品页 ===
  {
    keywords: ['COFDM', 'COFDM调制'],
    url: '/products/accessories/vtx-vrx',
    titleZh: 'CANI COFDM 数字图传系列',
    titleEn: 'CANI COFDM Digital Video Link Series',
    category: 'vtx',
  },
  {
    keywords: ['Betaflight', 'Betaflight固件'],
    url: '/products/accessories/fc-esc',
    titleZh: 'CANI 飞控电调系列',
    titleEn: 'CANI Flight Controller & ESC Series',
    category: 'fc-esc',
  },
  {
    keywords: ['MAVLink', 'MAVLink协议'],
    url: '/products/accessories/gimbal',
    titleZh: 'CANI 云台吊舱系列',
    titleEn: 'CANI Gimbal & Pod Series',
    category: 'gimbal',
  },
];

/**
 * Injects internal product links into HTML content.
 * 
 * Rules:
 * - Each keyword is only linked ONCE (first occurrence) to avoid over-optimization
 * - Links inside existing <a> tags are skipped
 * - Longer keywords are matched first to prevent partial matches
 * - Max 5 links per article to keep it natural
 */
export function injectProductLinks(
  htmlContent: string,
  lang: string = 'zh',
  maxLinks: number = 5
): { html: string; linkedProducts: ProductLinkEntry[] } {
  let result = htmlContent;
  const linkedProducts: ProductLinkEntry[] = [];
  let linkCount = 0;

  // Sort by keyword length (longest first) to avoid partial matches
  const sortedEntries = [...PRODUCT_LINK_MAP].sort((a, b) => {
    const maxA = Math.max(...a.keywords.map(k => k.length));
    const maxB = Math.max(...b.keywords.map(k => k.length));
    return maxB - maxA;
  });

  for (const entry of sortedEntries) {
    if (linkCount >= maxLinks) break;

    for (const keyword of entry.keywords) {
      // Skip if keyword not found in content
      if (!result.includes(keyword)) continue;

      // Skip if already inside an <a> tag — use a negative lookbehind approach
      // Build regex that matches keyword NOT inside <a>...</a>
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(
        `(?<!</a>)(?<!["\\/\\w])(?<!<a[^>]*>)(${escapedKeyword})(?![^<]*<\\/a>)`,
        'i'
      );

      if (!regex.test(result)) continue;

      const title = lang === 'en' ? entry.titleEn : entry.titleZh;
      const replacement = `<a href="${entry.url}" title="${title}" class="product-auto-link" data-product-link="true"><strong>${keyword}</strong></a>`;

      // Replace only the first occurrence
      result = result.replace(regex, replacement);
      linkedProducts.push(entry);
      linkCount++;
      break; // Move to next product entry
    }
  }

  return { html: result, linkedProducts };
}

/**
 * Extract product matches from article content (without modifying it).
 * Used to determine which related products to show in sidebar.
 */
export function detectMentionedProducts(content: string): ProductLinkEntry[] {
  const found: ProductLinkEntry[] = [];
  
  for (const entry of PRODUCT_LINK_MAP) {
    for (const keyword of entry.keywords) {
      if (content.includes(keyword)) {
        found.push(entry);
        break;
      }
    }
  }

  return found;
}
