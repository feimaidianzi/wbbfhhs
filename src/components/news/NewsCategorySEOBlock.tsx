import { LangLink as Link } from '@/components/LangLink';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategorySEOContentProps {
  category: string; // 'company' | 'industry' | 'tech'
}

const CATEGORY_CONTENT: Record<string, {
  zh: { heading: string; paragraphs: string[]; relatedLinks: { text: string; href: string }[] };
  en: { heading: string; paragraphs: string[]; relatedLinks: { text: string; href: string }[] };
}> = {
  company: {
    zh: {
      heading: 'CANI 长凌科技公司动态',
      paragraphs: [
        'CANI长凌科技作为工业无人机核心配件的专业OEM/ODM制造商，持续发布产品迭代、战略合作与行业展会信息。我们的公司新闻覆盖从数字图传系统到飞控电调模块的全产品线动态，为系统集成商和行业客户提供第一手信息。',
        '关注CANI公司动态，获取最新产品发布会、技术合作伙伴公告、以及全球市场拓展计划。我们的新闻发布遵循严格的技术审核流程，确保每条信息都包含可执行的工程数据参考。',
      ],
      relatedLinks: [
        { text: '查看全部产品线', href: '/products' },
        { text: '联系我们获取定制方案', href: '/contact' },
        { text: '了解CANI品牌故事', href: '/about' },
      ],
    },
    en: {
      heading: 'CANI Technology Company Updates',
      paragraphs: [
        'As a professional OEM/ODM manufacturer of industrial UAV core components, CANI Technology continuously releases product iterations, strategic partnerships, and trade show updates. Our company news covers the full product line from digital video transmission systems to flight controller ESC modules.',
        'Follow CANI updates for the latest product launches, technology partnership announcements, and global market expansion plans. Every release undergoes strict technical review to ensure actionable engineering data.',
      ],
      relatedLinks: [
        { text: 'View All Products', href: '/products' },
        { text: 'Contact for Custom Solutions', href: '/contact' },
        { text: 'About CANI', href: '/about' },
      ],
    },
  },
  industry: {
    zh: {
      heading: '无人机行业动态与市场趋势',
      paragraphs: [
        'CANI行业动态栏目跟踪全球无人机产业链上下游趋势，涵盖COFDM数字图传技术演进、低空经济政策法规、以及工业级无人机在电力巡检、应急救援、测绘测量等领域的最新应用案例。',
        '我们的行业分析团队从供应链视角出发，为系统集成商、科研机构和政府采购方提供深度市场洞察。每篇报道均包含具体的技术参数对比和应用场景数据，帮助决策者评估方案可行性。',
      ],
      relatedLinks: [
        { text: '电力巡检无人机方案', href: '/applications/power-inspection' },
        { text: '应急救援无人机系统', href: '/applications/emergency-rescue' },
        { text: '数字图传产品系列', href: '/products/accessories/vtx-vrx' },
      ],
    },
    en: {
      heading: 'UAV Industry Dynamics & Market Trends',
      paragraphs: [
        'CANI\'s industry dynamics column tracks global UAV supply chain trends, covering COFDM digital video link evolution, low-altitude economy regulations, and the latest industrial drone applications in power inspection, emergency rescue, and surveying.',
        'Our industry analysis team provides deep market insights from a supply chain perspective for system integrators, research institutions, and government procurement. Each report includes specific technical parameter comparisons and application scenario data.',
      ],
      relatedLinks: [
        { text: 'Power Inspection UAV Solutions', href: '/applications/power-inspection' },
        { text: 'Emergency Rescue UAV Systems', href: '/applications/emergency-rescue' },
        { text: 'Digital Video Link Products', href: '/products/accessories/vtx-vrx' },
      ],
    },
  },
  tech: {
    zh: {
      heading: '无人机核心技术深度解析',
      paragraphs: [
        'CANI技术解析栏目发布工程级技术白皮书与深度测评，涵盖7.2GHz高功率COFDM数字图传、STM32H7飞控架构、48kHz PWM电调调速算法、ExpressLRS低延迟遥控链路等核心技术领域。',
        '每篇技术文章均由CANI研发团队撰写或审核，包含完整的技术参数表、系统框图和性能测试数据。文章面向具备嵌入式系统或航空电子背景的工程师，提供可直接用于方案设计的工程数据参考。关键技术指标如10W发射功率、72V高压输入、-110dBm接收灵敏度等均在文中以结构化方式呈现。',
      ],
      relatedLinks: [
        { text: '高功率数字图传 FV10W-72', href: '/products/accessories/vtx-vrx/fv10w-72' },
        { text: 'COFDM视频链路 S900', href: '/products/accessories/vtx-vrx/s900' },
        { text: '飞控电调飞塔系列', href: '/products/accessories/fc-esc' },
        { text: 'ExpressLRS遥控链路', href: '/products/accessories/elrs' },
      ],
    },
    en: {
      heading: 'In-Depth UAV Core Technology Analysis',
      paragraphs: [
        'CANI\'s technical analysis column publishes engineering-grade whitepapers and deep-dive reviews covering 7.2GHz high-power COFDM digital video links, STM32H7 flight controller architecture, 48kHz PWM ESC algorithms, and ExpressLRS low-latency control links.',
        'Each technical article is authored or reviewed by CANI\'s R&D team, featuring complete specification tables, system block diagrams, and performance test data. Key metrics like 10W TX power, 72V high-voltage input, and -110dBm receiver sensitivity are presented in structured formats for system design reference.',
      ],
      relatedLinks: [
        { text: 'High-Power VTX FV10W-72', href: '/products/accessories/vtx-vrx/fv10w-72' },
        { text: 'COFDM Video Link S900', href: '/products/accessories/vtx-vrx/s900' },
        { text: 'FC ESC Stack Series', href: '/products/accessories/fc-esc' },
        { text: 'ExpressLRS Control Link', href: '/products/accessories/elrs' },
      ],
    },
  },
};

/**
 * SEO-rich content block for news category pages.
 * Provides crawlable text, internal links, and semantic markup per category.
 */
export const NewsCategorySEOBlock = ({ category }: CategorySEOContentProps) => {
  const { baseLang } = useLanguage();

  const content = CATEGORY_CONTENT[category];
  if (!content) return null;

  const data = baseLang === 'en' ? content.en : content.zh;

  return (
    <section className="py-12 bg-secondary/50 border-t border-border">
      <div className="container-custom">
        <article itemScope itemType="https://schema.org/WebPage" className="max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {data.heading}
          </h2>
          {data.paragraphs.map((p, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-4">
              {p}
            </p>
          ))}

          {/* Internal Links for SEO */}
          <nav aria-label="Related resources" className="mt-6">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
              {baseLang === 'en' ? 'Related Resources' : '相关资源'}
            </h3>
            <ul className="flex flex-wrap gap-3">
              {data.relatedLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.href}
                    className="inline-flex items-center px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:text-accent hover:border-accent/30 transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </article>
      </div>
    </section>
  );
};
