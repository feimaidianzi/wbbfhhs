import { useLanguage } from "@/contexts/LanguageContext";

/**
 * 丰富SEO内容组件
 * 为页面添加更多对搜索引擎友好的文本内容
 * 提高 Text/HTML 比率
 */

interface ContentBlock {
  title: string;
  titleEn: string;
  paragraphs: string[];
  paragraphsEn: string[];
}

interface RichSEOContentProps {
  pageName: string;
  pageNameEn: string;
  contentBlocks: ContentBlock[];
  relatedLinks?: { text: string; textEn: string; href: string }[];
  additionalKeywords?: string[];
  additionalKeywordsEn?: string[];
}

export const RichSEOContent = ({
  pageName,
  pageNameEn,
  contentBlocks,
  relatedLinks,
  additionalKeywords = [],
  additionalKeywordsEn = [],
}: RichSEOContentProps) => {
  const { baseLang } = useLanguage();
  const isEn = baseLang === 'en';

  return (
    <div className="sr-only" aria-hidden="false">
      <article itemScope itemType="https://schema.org/WebPage">
        <header>
          <h1 itemProp="name">{isEn ? pageNameEn : pageName}</h1>
        </header>

        {contentBlocks.map((block, index) => (
          <section key={index}>
            <h2>{isEn ? block.titleEn : block.title}</h2>
            {(isEn ? block.paragraphsEn : block.paragraphs).map((paragraph, pIndex) => (
              <p key={pIndex}>{paragraph}</p>
            ))}
          </section>
        ))}

        {/* 相关链接 */}
        {relatedLinks && relatedLinks.length > 0 && (
          <nav aria-label={isEn ? 'Related Links' : '相关链接'}>
            <h2>{isEn ? 'Related Pages' : '相关页面'}</h2>
            <ul>
              {relatedLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{isEn ? link.textEn : link.text}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* 额外关键词 */}
        {(additionalKeywords.length > 0 || additionalKeywordsEn.length > 0) && (
          <footer>
            <p itemProp="keywords">
              {(isEn ? additionalKeywordsEn : additionalKeywords).join(', ')}
            </p>
          </footer>
        )}

        <meta itemProp="url" content={`https://www.cani.com`} />
        <meta itemProp="inLanguage" content={isEn ? 'en' : 'zh-CN'} />
      </article>
    </div>
  );
};

/**
 * 预定义的SEO内容配置
 */
export const getSEOContentForCategory = (category: string) => {
  const contentMap: Record<string, {
    contentBlocks: { title: string; titleEn: string; paragraphs: string[]; paragraphsEn: string[] }[];
    keywords: string[];
    keywordsEn: string[];
  }> = {
    'multi-rotor': {
      contentBlocks: [
        {
          title: '多旋翼无人机选购指南',
          titleEn: 'Multi-Rotor Drone Buying Guide',
          paragraphs: [
            '选择多旋翼无人机时，需要考虑多个关键因素：载荷能力决定了可搭载的设备重量，续航时间影响作业效率，抗风等级关系到恶劣天气下的作业能力。',
            '对于电力巡检应用，建议选择X850或X1200型号，它们具备稳定的飞行性能和足够的载荷能力来搭载红外热成像相机。',
            '测绘勘察场景推荐X1200或X1600型号，大载荷能力可搭载专业测绘相机和RTK模块，实现厘米级定位精度。',
            '消防救援场景建议选择续航时间长、抗风能力强的型号，配合系留无人机可实现24小时不间断作业。',
          ],
          paragraphsEn: [
            'When choosing a multi-rotor drone, consider key factors: payload capacity determines equipment weight, flight time affects operational efficiency, and wind resistance relates to performance in harsh weather.',
            'For power line inspection, we recommend X850 or X1200 models with stable flight performance and sufficient payload for thermal imaging cameras.',
            'For surveying and mapping, X1200 or X1600 models are recommended. Large payload capacity supports professional mapping cameras and RTK modules for centimeter-level positioning.',
            'For firefighting rescue, choose models with long endurance and strong wind resistance. Combined with tethered drones, 24-hour continuous operation is achievable.',
          ],
        },
        {
          title: '技术规格解读',
          titleEn: 'Technical Specifications Explained',
          paragraphs: [
            '轴距：指对角电机之间的距离，轴距越大通常意味着更稳定的飞行和更大的载荷能力，但便携性会下降。',
            '最大载重：除无人机自身重量外可额外搭载的设备重量，选择时需预留20%余量以确保飞行安全。',
            '续航时间：满电状态下的最大飞行时间，实际续航会受载荷重量、飞行速度、环境温度等因素影响。',
            '抗风等级：无人机可稳定作业的最大风力等级，7级风相当于风速13.9-17.1m/s的大风天气。',
          ],
          paragraphsEn: [
            'Wheelbase: Distance between diagonal motors. Larger wheelbase means more stable flight and greater payload, but reduced portability.',
            'Max Payload: Additional equipment weight beyond the drone itself. Allow 20% margin for flight safety.',
            'Flight Time: Maximum flight duration with full battery. Actual endurance is affected by payload, speed, and temperature.',
            'Wind Resistance: Maximum wind level for stable operation. Level 7 wind corresponds to 13.9-17.1m/s wind speed.',
          ],
        },
      ],
      keywords: [
        '多旋翼无人机', '工业无人机', '巡检无人机', '测绘无人机', '电力巡检', 
        '无人机载荷', '无人机续航', '抗风无人机', '专业无人机', '行业无人机',
        'X650无人机', 'X850无人机', 'X1200无人机', 'X1600无人机'
      ],
      keywordsEn: [
        'multi-rotor drone', 'industrial drone', 'inspection drone', 'mapping drone', 'power line inspection',
        'drone payload', 'drone endurance', 'wind resistant drone', 'professional drone', 'enterprise drone',
        'X650 drone', 'X850 drone', 'X1200 drone', 'X1600 drone'
      ],
    },
    'digital-fpv': {
      contentBlocks: [
        {
          title: '数字图传系统概述',
          titleEn: 'Digital FPV System Overview',
          paragraphs: [
            '数字图传系统采用数字信号传输技术，相比传统模拟图传具有画质清晰、延迟低、抗干扰能力强等显著优势。',
            '长凌科技数字图传产品支持1080P和4K高清视频传输，端到端延迟可控制在30ms以内，传输距离可达30公里以上。',
            '产品采用先进的OFDM调制技术和自适应编码，在复杂电磁环境下仍能保持稳定的视频传输质量。',
            '支持双发双收天线配置，实现全向覆盖和信号冗余，确保飞行安全。',
          ],
          paragraphsEn: [
            'Digital FPV systems use digital signal transmission technology, offering advantages like clear picture quality, low latency, and strong anti-interference compared to analog FPV.',
            'CANI digital FPV products support 1080P and 4K HD video transmission with end-to-end latency under 30ms and transmission range over 30km.',
            'Products use advanced OFDM modulation and adaptive coding to maintain stable video quality in complex electromagnetic environments.',
            'Dual transmitter and receiver antenna configuration provides omnidirectional coverage and signal redundancy for flight safety.',
          ],
        },
      ],
      keywords: [
        '数字图传', 'WiFiLink', '高清图传', '4K图传', '1080P图传', 'FPV图传',
        '无人机图传', '远距离图传', '低延迟图传', '数字视频传输', '无线图传'
      ],
      keywordsEn: [
        'digital FPV', 'WiFiLink', 'HD FPV', '4K FPV', '1080P FPV', 'FPV system',
        'drone FPV', 'long range FPV', 'low latency FPV', 'digital video transmission', 'wireless FPV'
      ],
    },
    'vtx': {
      contentBlocks: [
        {
          title: 'VTX视频发射器选购指南',
          titleEn: 'VTX Video Transmitter Buying Guide',
          paragraphs: [
            'VTX（Video Transmitter）是无人机图传系统的核心组件，负责将机载摄像头采集的视频信号发射到地面接收设备。',
            '选择VTX时需要考虑发射功率、频段、频道数量、散热设计等因素。发射功率决定传输距离，但功率越大发热越严重。',
            '长凌科技VTX产品覆盖2.5W至37W多种功率规格，支持5.8GHz频段80个频道切换，兼容主流FPV眼镜和接收器。',
            '高功率VTX采用专利铝合金散热结构，有效解决长时间工作的散热问题，确保稳定可靠的视频传输。',
          ],
          paragraphsEn: [
            'VTX (Video Transmitter) is the core component of drone video transmission, responsible for transmitting video signals from onboard cameras to ground receivers.',
            'When choosing VTX, consider transmission power, frequency band, channel count, and heat dissipation. Higher power means longer range but more heat.',
            'CANI VTX products cover 2.5W to 37W power options, support 5.8GHz band with 80 channel switching, compatible with mainstream FPV goggles and receivers.',
            'High-power VTX uses patented aluminum alloy heat dissipation structure to effectively solve long-term operation heating issues.',
          ],
        },
      ],
      keywords: [
        'VTX视频发射器', '图传发射器', '5.8G图传', '大功率VTX', 'FPV发射器',
        '视频发射模块', '无人机VTX', '远距离VTX', '2.5W VTX', '37W VTX'
      ],
      keywordsEn: [
        'VTX video transmitter', 'video transmitter', '5.8G FPV', 'high power VTX', 'FPV transmitter',
        'video transmission module', 'drone VTX', 'long range VTX', '2.5W VTX', '37W VTX'
      ],
    },
    'gimbal': {
      contentBlocks: [
        {
          title: '云台吊舱技术解析',
          titleEn: 'Gimbal Pod Technology Analysis',
          paragraphs: [
            '云台吊舱是无人机航拍和巡检应用的核心载荷设备，通过三轴无刷直驱电机实现高精度稳定。',
            '长凌科技云台产品采用FOC矢量控制算法，增稳精度可达±0.01°，确保在高速飞行和恶劣天气下的画面稳定性。',
            '产品线覆盖多种载荷配置：红外热成像云台用于电力巡检和消防救援，30倍光学变焦云台用于安防监控，多光谱云台用于农业和环保。',
            '支持多种接口协议：S.Bus、CAN、TTL等，可与主流飞控系统无缝对接，实现一体化控制。',
          ],
          paragraphsEn: [
            'Gimbal pod is the core payload for drone aerial photography and inspection, achieving high-precision stabilization through 3-axis brushless direct-drive motors.',
            'CANI gimbal products use FOC vector control algorithms with stabilization accuracy of ±0.01°, ensuring stable footage during high-speed flight and harsh weather.',
            'Product line covers various payloads: thermal imaging gimbal for power inspection and firefighting, 30x optical zoom for security, multispectral for agriculture and environment.',
            'Supports multiple interface protocols: S.Bus, CAN, TTL, etc., seamlessly integrating with mainstream flight control systems.',
          ],
        },
      ],
      keywords: [
        '云台吊舱', '三轴云台', '无刷云台', '红外云台', '变焦云台', '多光谱云台',
        '航拍云台', '巡检云台', '稳定云台', '无人机云台', '相机云台'
      ],
      keywordsEn: [
        'gimbal pod', '3-axis gimbal', 'brushless gimbal', 'thermal gimbal', 'zoom gimbal', 'multispectral gimbal',
        'aerial gimbal', 'inspection gimbal', 'stabilized gimbal', 'drone gimbal', 'camera gimbal'
      ],
    },
    'elrs': {
      contentBlocks: [
        {
          title: 'ELRS遥控系统介绍',
          titleEn: 'ELRS Remote Control System Introduction',
          paragraphs: [
            'ELRS（ExpressLRS）是新一代开源遥控协议，以其超低延迟和超远距离特性在专业无人机领域获得广泛应用。',
            '相比传统2.4GHz遥控系统，ELRS可实现低于5ms的控制延迟和100km以上的传输距离，是远距离飞行的理想选择。',
            '长凌科技ELRS产品支持915MHz/868MHz/2.4GHz多频段，用户可根据当地法规和应用需求选择合适的频段。',
            '产品支持双向数据传输和遥测回传，飞手可实时监控无人机状态，包括电压、信号强度、GPS位置等关键信息。',
          ],
          paragraphsEn: [
            'ELRS (ExpressLRS) is a next-generation open-source control protocol, widely adopted in professional drones for its ultra-low latency and ultra-long range.',
            'Compared to traditional 2.4GHz control, ELRS achieves control latency below 5ms and transmission range over 100km, ideal for long-range flight.',
            'CANI ELRS products support 915MHz/868MHz/2.4GHz multi-band, allowing users to choose appropriate bands based on local regulations.',
            'Products support bidirectional data transmission and telemetry, enabling real-time monitoring of voltage, signal strength, GPS position, etc.',
          ],
        },
      ],
      keywords: [
        'ELRS遥控', 'ExpressLRS', '远程遥控', '低延迟遥控', '开源遥控', '无人机遥控',
        '915MHz遥控', '868MHz遥控', '2.4GHz遥控', '遥测回传', '双向遥控'
      ],
      keywordsEn: [
        'ELRS remote', 'ExpressLRS', 'long range control', 'low latency control', 'open source control', 'drone remote',
        '915MHz remote', '868MHz remote', '2.4GHz remote', 'telemetry', 'bidirectional control'
      ],
    },
  };

  return contentMap[category] || null;
};

export default RichSEOContent;
