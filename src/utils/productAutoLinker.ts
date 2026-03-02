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
    keywords: ['Stack-Mini F7-40A', 'F7-40A飞塔', 'FlyMind Mini F7+40A', 'Mini F7+40A', '40A迷你飞塔'],
    url: '/products/accessories/fc-esc/stack-mini-f7-40a',
    titleZh: 'CANI Stack-Mini F7-40A 20×20mm 迷你飞速塔',
    titleEn: 'CANI Stack-Mini F7-40A 20×20mm Mini Stack',
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
    keywords: ['Stack F405-55A', 'F405-55A', 'F405+55A飞塔', 'FlyMind F405+55A', 'F405飞塔'],
    url: '/products/accessories/fc-esc/stack-f405-55a',
    titleZh: 'CANI Stack F405-55A 工业级飞速塔',
    titleEn: 'CANI Stack F405-55A Industrial Flight Tower',
    category: 'fc-esc',
  },
  {
    keywords: ['Stack F405-60A', 'F405-60A', 'F405+60A飞塔', 'FlyMind F405+60A', '60A飞塔'],
    url: '/products/accessories/fc-esc/stack-f405-60a',
    titleZh: 'CANI Stack F405-60A 大电流工业飞速塔',
    titleEn: 'CANI Stack F405-60A Heavy-Duty Industrial Flight Tower',
    category: 'fc-esc',
  },
  {
    keywords: ['Stack-Pro F722-100A', 'F722 100A', 'Pro F722 100A', 'FlyMind Pro F722', '100A飞塔', 'F722飞控'],
    url: '/products/accessories/fc-esc/stack-pro-f722-100a',
    titleZh: 'CANI Stack-Pro F722-100A 工业级旗舰飞速塔',
    titleEn: 'CANI Stack-Pro F722-100A Industrial Flagship Flight Tower',
    category: 'fc-esc',
  },
  {
    keywords: ['CANI-80A 六合一', '六合一80A', '6in1-80A', '80A六合一电调', '六合一电调', 'CANI-80A 6-in-1'],
    url: '/products/accessories/fc-esc/6in1-80a',
    titleZh: 'CANI-80A 工业级六合一电调',
    titleEn: 'CANI-80A Industrial 6-in-1 ESC',
    category: 'fc-esc',
  },
  {
    keywords: ['CANI-100A 六合一', '六合一100A', '6in1-100A', '100A六合一电调', 'CANI-100A 6-in-1'],
    url: '/products/accessories/fc-esc/6in1-100a',
    titleZh: 'CANI-100A 工业级六合一电调',
    titleEn: 'CANI-100A Industrial 6-in-1 ESC',
    category: 'fc-esc',
  },
  {
    keywords: ['CANI-ESC 100A', 'ESC-100A', 'ESC 100A', '100A四合一电调', '100A旗舰电调'],
    url: '/products/accessories/fc-esc/esc-100a',
    titleZh: 'CANI-ESC 100A 旗舰级四合一电调',
    titleEn: 'CANI-ESC 100A Flagship 4-in-1 ESC',
    category: 'fc-esc',
  },
  // === Separate ESC 单体电调 ===
  {
    keywords: ['100A单体电调', '100A分体电调', 'Separate ESC 100A', '单体100A电调', 'CANI 100A 单体', '12S电调', '12S单体电调'],
    url: '/products/accessories/fc-esc/separate-esc-100a',
    titleZh: 'CANI 100A 单体工业电调',
    titleEn: 'CANI 100A Separate Industrial ESC',
    category: 'fc-esc',
  },
  {
    keywords: ['80A单体电调', '80A分体电调', 'Separate ESC 80A', '单体80A电调', 'CANI 80A 单体'],
    url: '/products/accessories/fc-esc/separate-esc-80a',
    titleZh: 'CANI 80A 单体工业电调',
    titleEn: 'CANI 80A Separate Industrial ESC',
    category: 'fc-esc',
  },
  {
    keywords: ['CANI-ESC 80A', 'ESC-80A', 'ESC 80A', '80A四合一电调', '80A电调'],
    url: '/products/accessories/fc-esc/esc-80a',
    titleZh: 'CANI-ESC 80A 工业级 8S 四合一电调',
    titleEn: 'CANI-ESC 80A Industrial 8S 4-in-1 ESC',
    category: 'fc-esc',
  },
  {
    keywords: ['CANI-ESC 55A', 'ESC-55A', 'ESC 55A', '55A四合一电调', '55A电调', 'FlyMind 55A'],
    url: '/products/accessories/fc-esc/esc-55a',
    titleZh: 'CANI-ESC 55A 工业级四合一电调',
    titleEn: 'CANI-ESC 55A Industrial 4-in-1 ESC',
    category: 'fc-esc',
  },
  {
    keywords: ['CANI-ESC 60A', 'ESC-60A', 'ESC 60A', '60A四合一电调', '60A电调'],
    url: '/products/accessories/fc-esc/esc-60a',
    titleZh: 'CANI-ESC 60A 工业级四合一电调',
    titleEn: 'CANI-ESC 60A Industrial 60A 4-in-1 ESC',
    category: 'fc-esc',
  },
  {
    keywords: ['CANI-FC F405', 'FC F405', 'FC-F405', 'F405飞控', 'FlyMind F405'],
    url: '/products/accessories/fc-esc/fc-f405',
    titleZh: 'CANI-FC F405 工业级多功能飞控',
    titleEn: 'CANI-FC F405 Industrial Multi-Function Flight Controller',
    category: 'fc-esc',
  },
  {
    keywords: ['CANI-FC F722', 'FC F722', 'FC-F722', 'F722飞控', 'FlyMind F722', 'F722飞控板'],
    url: '/products/accessories/fc-esc/fc-f722',
    titleZh: 'CANI-FC F722 旗舰级高性能飞控',
    titleEn: 'CANI-FC F722 Flagship High-Performance Flight Controller',
    category: 'fc-esc',
  },
  // === Camera 相机载荷 ===
  {
    keywords: ['SJ4000-WiFi', 'SJ4000', '无人机可见光载荷', '轻量化载荷模组', '1080P无人机相机', 'WiFi实时图传相机'],
    url: '/products/accessories/camera/sj4000-wifi',
    titleZh: 'CANI SJ4000-WiFi 无人机载荷相机',
    titleEn: 'CANI SJ4000-WiFi UAV Payload Camera',
    category: 'camera',
  },
  // === Mesh-Link 自组网 ===
  {
    keywords: ['Mesh-Link', 'Mesh Link', '自组网模块', '无人机自组网', 'Mesh链路中继', '无中心组网', '复杂环境图传', 'Ad-hoc Networking'],
    url: '/products/accessories/mesh-link',
    titleZh: 'CANI Mesh-Link 宽带自组网系统',
    titleEn: 'CANI Mesh-Link Broadband Ad-hoc Networking System',
    category: 'digital-fpv',
  },
  // === WiFiLink2 数字图传 ===
  {
    keywords: ['WiFiLink2', 'OpenIPC图传', 'OpenIPC'],
    url: '/products/accessories/digital-fpv/wifilink2',
    titleZh: 'CANI WiFiLink2 数字图传系统',
    titleEn: 'CANI WiFiLink2 Digital FPV System',
    category: 'digital-fpv',
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
    keywords: ['ELRS 915 Diversity', 'ELRS 915', '915MHz Diversity', '双天线多样性接收', '915MHz远距离控制', '低延迟无人机遥控协议'],
    url: '/products/accessories/elrs/elrs-915-diversity',
    titleZh: 'CANI ELRS 915 Diversity 工业级双天线接收机',
    titleEn: 'CANI ELRS 915 Diversity Industrial Dual-Antenna Receiver',
    category: 'elrs',
  },
  {
    keywords: ['ELRS 915标准版', 'ELRS 915 Standard', '超微型ELRS接收机', '915MHz Nano接收机', '轻量化无人机遥控终端', 'Nano ELRS'],
    url: '/products/accessories/elrs/elrs-915-receiver',
    titleZh: 'CANI ELRS 915 标准版 Nano接收机',
    titleEn: 'CANI ELRS 915 Standard Nano Receiver',
    category: 'elrs',
  },
  {
    keywords: ['ELRS Lite 2.4G', '2.4G ELRS接收机', '1000Hz刷新率遥控', '超低延迟无人机链路', '微型陶瓷天线接收机'],
    url: '/products/accessories/elrs/elrs-lite-2-4g',
    titleZh: 'CANI ELRS Lite 2.4G 高刷新率接收机',
    titleEn: 'CANI ELRS Lite 2.4G High Refresh Rate Receiver',
    category: 'elrs',
  },
  {
    keywords: ['ELRS 2.4G LNA', 'LNA高灵敏度接收机', '2.4G远航ELRS', '100mW回传遥控', '工业级2.4G控制链路'],
    url: '/products/accessories/elrs/elrs-2-4g-lna',
    titleZh: 'CANI ELRS 2.4G LNA 工业级高灵敏度接收机',
    titleEn: 'CANI ELRS 2.4G LNA Industrial High-Sensitivity Receiver',
    category: 'elrs',
  },
  {
    keywords: ['ELRS 915 Moxon', '915MHz定向天线', 'Moxon远航天线', 'ELRS高增益天线', '无人机遥控增益系统'],
    url: '/products/accessories/elrs/elrs-915-moxon-antenna',
    titleZh: 'CANI ELRS 915 Moxon 定向高增益天线',
    titleEn: 'CANI ELRS 915 Moxon Directional High-Gain Antenna',
    category: 'elrs',
  },
  {
    keywords: ['ExpressLRS', 'ELRS模块', 'ELRS接收机', 'ELRS发射机'],
    url: '/products/accessories/elrs',
    titleZh: 'CANI ExpressLRS 遥控链路',
    titleEn: 'CANI ExpressLRS Control Link',
    category: 'elrs',
  },
  // === Gimbal 云台 ===
  {
    keywords: ['K40T', 'K40T云台', '四光云台', '四光AI云台', 'K40T Gimbal', 'Quad-Sensor Gimbal', '四传感器云台'],
    url: '/products/accessories/gimbal/k40t',
    titleZh: 'CANI K40T 四光AI云台相机',
    titleEn: 'CANI K40T Quad-Sensor AI Gimbal Camera',
    category: 'gimbal',
  },
  {
    keywords: ['K8T-V2', 'K8TV2', '双光云台', '双光跟踪云台', '133g云台', '双光识别追踪', 'K8T-V2 Gimbal', 'Dual-Sensor Tracking Gimbal'],
    url: '/products/accessories/gimbal/k8t-v2',
    titleZh: 'CANI K8T-V2 双光AI跟踪云台',
    titleEn: 'CANI K8T-V2 Dual-Light AI Tracking Gimbal',
    category: 'gimbal',
  },
  {
    keywords: ['K8-V2', 'K8V2', '单光云台', '单光追踪云台'],
    url: '/products/accessories/gimbal/k8-v2',
    titleZh: 'CANI K8-V2 单光AI追踪云台',
    titleEn: 'CANI K8-V2 Single-Light AI Tracking Gimbal',
    category: 'gimbal',
  },
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
