import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  category?: 'general' | 'products' | 'technical' | 'purchase';
  showTitle?: boolean;
  limit?: number;
}

export const FAQSection = ({ category = 'general', showTitle = true, limit }: FAQSectionProps) => {
  const { language } = useLanguage();

  const getFAQs = (): FAQItem[] => {
    const allFAQs: Record<string, FAQItem[]> = {
      general: language === 'zh' ? [
        {
          question: '长凌科技是做什么的？',
          answer: '长凌科技是专业的工业级无人机配件研发与制造企业，主要产品包括数字图传系统、VTX视频发射器、飞控电调模块、云台吊舱、ELRS遥控器等核心零部件。我们为全球无人机行业提供高品质的配件解决方案。',
        },
        {
          question: '你们的产品有哪些应用场景？',
          answer: '我们的产品广泛应用于多个领域，包括：航拍摄影、电力线路巡检、物流配送、消防救援、农业植保、测绘测量、环境监测等。无论是专业行业应用还是FPV穿越飞行，都能找到适合的产品。',
        },
        {
          question: '如何成为你们的代理商或经销商？',
          answer: '欢迎有意向的合作伙伴联系我们的商务团队。我们提供完善的代理政策，包括：区域保护、价格优惠、技术培训、营销支持等。请发送邮件至 market@caniuav.com 或拨打 176-7404-8404 咨询合作详情。',
        },
        {
          question: '你们提供OEM/ODM定制服务吗？',
          answer: '是的，我们提供全方位的OEM/ODM定制服务。从产品外观设计到功能定制，从小批量试产到大规模量产，我们都能满足客户的个性化需求。定制服务需要根据具体需求评估，请联系我们的技术团队进行详细沟通。',
        },
      ] : [
        {
          question: 'What does CANI Technology do?',
          answer: 'CANI Technology is a professional manufacturer of industrial-grade drone accessories, with main products including digital FPV systems, VTX video transmitters, flight controller ESC modules, gimbal pods, and ELRS remote controllers. We provide high-quality accessory solutions for the global drone industry.',
        },
        {
          question: 'What are the application scenarios for your products?',
          answer: 'Our products are widely used in multiple fields including: aerial photography, power line inspection, logistics delivery, firefighting rescue, agricultural plant protection, surveying and mapping, environmental monitoring, and more. Whether for professional industry applications or FPV racing, you can find suitable products.',
        },
        {
          question: 'How can I become your agent or distributor?',
          answer: 'We welcome interested partners to contact our business team. We offer comprehensive agency policies including: regional protection, price advantages, technical training, marketing support, and more. Please email market@caniuav.com or call +86-176-7404-8404 for partnership details.',
        },
        {
          question: 'Do you provide OEM/ODM customization services?',
          answer: 'Yes, we provide comprehensive OEM/ODM customization services. From product appearance design to functional customization, from small batch trial production to large-scale mass production, we can meet customers\' personalized needs. Customization services require evaluation based on specific requirements.',
        },
      ],
      products: language === 'zh' ? [
        {
          question: '数字图传和模拟图传有什么区别？',
          answer: '数字图传采用数字信号传输，优点是画质清晰（支持1080P/4K）、延迟低（通常<30ms）、抗干扰能力强；模拟图传使用模拟信号，优点是价格实惠、兼容性好、设置简单。对于专业应用和长距离飞行，推荐使用数字图传；对于入门用户和近距离飞行，模拟图传是不错的选择。',
        },
        {
          question: 'VTX发射器如何选择功率？',
          answer: 'VTX功率选择取决于飞行场景：25mW-200mW适合室内和近距离飞行；400mW-800mW适合户外中等距离；1W-2.5W适合开阔地带远距离飞行；5W以上适合专业长距离应用。注意：大功率VTX需要考虑散热问题，使用前请了解当地无线电法规。',
        },
        {
          question: 'ELRS和传统2.4GHz遥控有什么优势？',
          answer: 'ELRS（ExpressLRS）是新一代开源遥控协议，主要优势包括：超低延迟（低于5ms）、超远距离（可达100km+）、开源免费、双向数据传输、支持遥测回传。相比传统2.4GHz遥控，ELRS在延迟和距离方面有显著提升，特别适合远距离飞行和专业应用。',
        },
        {
          question: '云台吊舱如何选择适合的型号？',
          answer: '选择云台需要考虑以下因素：1）载荷需求-确定搭载相机的重量和尺寸；2）稳定精度-专业航拍需要±0.01°级别；3）功能需求-是否需要红外、变焦、激光测距等；4）接口兼容-确保与飞控和相机的接口匹配；5）预算范围-根据应用场景合理配置。',
        },
      ] : [
        {
          question: 'What is the difference between digital and analog FPV?',
          answer: 'Digital FPV uses digital signal transmission with advantages of clear picture quality (supporting 1080P/4K), low latency (usually <30ms), and strong anti-interference capability. Analog FPV uses analog signals with advantages of affordable price, good compatibility, and simple setup. For professional applications and long-range flight, digital FPV is recommended.',
        },
        {
          question: 'How to choose VTX transmitter power?',
          answer: 'VTX power selection depends on flight scenarios: 25mW-200mW for indoor and short-range; 400mW-800mW for outdoor medium range; 1W-2.5W for open area long-range; 5W+ for professional long-distance applications. Note: High-power VTX requires heat dissipation consideration, and please understand local radio regulations before use.',
        },
        {
          question: 'What are the advantages of ELRS over traditional 2.4GHz control?',
          answer: 'ELRS (ExpressLRS) is a next-generation open-source control protocol with main advantages including: ultra-low latency (below 5ms), ultra-long range (up to 100km+), open-source and free, bidirectional data transmission, and telemetry support. Compared to traditional 2.4GHz control, ELRS has significant improvements in latency and range.',
        },
        {
          question: 'How to choose the right gimbal model?',
          answer: 'Consider these factors when choosing a gimbal: 1) Payload requirements - determine camera weight and size; 2) Stabilization precision - professional aerial photography needs ±0.01° level; 3) Feature requirements - thermal imaging, zoom, laser ranging; 4) Interface compatibility - ensure matching with flight controller and camera; 5) Budget range.',
        },
      ],
      technical: language === 'zh' ? [
        {
          question: '飞控固件支持哪些版本？',
          answer: '我们的飞控产品支持多种主流开源固件，包括：Betaflight（推荐4.3以上版本）、iNav（6.0以上）、ArduPilot（4.3以上）。不同固件适合不同应用场景：Betaflight适合FPV穿越和竞速；iNav适合GPS飞行和自主导航；ArduPilot适合专业行业应用。',
        },
        {
          question: '图传和遥控信号会互相干扰吗？',
          answer: '合理的频率规划可以避免干扰。建议配置：遥控使用2.4GHz ELRS，图传使用5.8GHz；或遥控使用915MHz/868MHz ELRS，图传使用2.4GHz。避免遥控和图传使用相同频段。另外，天线布局和功率设置也会影响干扰程度，请参考产品手册进行优化。',
        },
        {
          question: '产品支持哪些通信协议？',
          answer: '我们的产品支持多种通信协议：遥控支持ELRS、CRSF、SBUS、PPM等；图传支持HDMI、AV、USB等视频接口；数据链路支持MAVLink、MSP等协议。具体协议支持请查看各产品规格说明。',
        },
        {
          question: '如何进行固件升级？',
          answer: '大部分产品支持USB或无线方式进行固件升级。具体步骤：1）下载最新固件和升级工具；2）连接设备到电脑；3）运行升级程序；4）等待升级完成。升级前请备份当前配置，升级过程中请勿断电。详细教程请访问我们的技术支持页面。',
        },
      ] : [
        {
          question: 'Which firmware versions are supported by the flight controllers?',
          answer: 'Our flight controllers support multiple mainstream open-source firmware including: Betaflight (4.3+ recommended), iNav (6.0+), ArduPilot (4.3+). Different firmware suits different applications: Betaflight for FPV racing; iNav for GPS flight and autonomous navigation; ArduPilot for professional industry applications.',
        },
        {
          question: 'Will video transmission and control signals interfere with each other?',
          answer: 'Proper frequency planning can avoid interference. Recommended configuration: 2.4GHz ELRS for control with 5.8GHz for video; or 915MHz/868MHz ELRS for control with 2.4GHz for video. Avoid using the same frequency band for both. Antenna layout and power settings also affect interference level.',
        },
        {
          question: 'What communication protocols are supported?',
          answer: 'Our products support various protocols: ELRS, CRSF, SBUS, PPM for control; HDMI, AV, USB for video transmission; MAVLink, MSP for data links. Please check product specifications for specific protocol support.',
        },
        {
          question: 'How to perform firmware upgrades?',
          answer: 'Most products support USB or wireless firmware upgrades. Steps: 1) Download latest firmware and upgrade tool; 2) Connect device to computer; 3) Run upgrade program; 4) Wait for completion. Please backup current configuration before upgrading and do not power off during the process.',
        },
      ],
      purchase: language === 'zh' ? [
        {
          question: '如何购买你们的产品？',
          answer: '您可以通过以下渠道购买：1）直接联系我们的销售团队（电话：176-7404-8404）；2）通过授权经销商购买；3）大额订单可以签订合作协议。我们支持银行转账、信用证等多种付款方式，具体请与销售人员沟通。',
        },
        {
          question: '产品有保修吗？保修期多长？',
          answer: '我们所有产品均提供质量保修：标准产品保修期为12个月，从购买日期起算；部分产品提供18个月或24个月延长保修。保修范围包括非人为因素导致的产品故障，不包括人为损坏、改装、超规格使用等情况。',
        },
        {
          question: '支持海外发货吗？',
          answer: '是的，我们支持全球发货。常用快递包括DHL、FedEx、UPS等国际快递，也支持空运和海运。运费根据目的地和包裹重量计算，通常3-7个工作日可送达主要国家。大额订单可以协商运费优惠。',
        },
        {
          question: '批量采购有优惠吗？',
          answer: '是的，批量采购享有阶梯价格优惠。订购数量越大，单价越优惠。具体优惠幅度请联系销售团队。此外，我们还为长期合作伙伴提供账期支持、优先发货、专属技术支持等增值服务。',
        },
      ] : [
        {
          question: 'How can I purchase your products?',
          answer: 'You can purchase through: 1) Contact our sales team directly (+86-176-7404-8404); 2) Purchase through authorized distributors; 3) Sign cooperation agreements for large orders. We support bank transfer, letter of credit, and other payment methods.',
        },
        {
          question: 'Do products have warranty? How long is the warranty period?',
          answer: 'All our products come with quality warranty: standard products have 12-month warranty from purchase date; some products offer 18 or 24-month extended warranty. Warranty covers product failures due to non-human factors, excluding human damage, modification, or over-specification use.',
        },
        {
          question: 'Do you support international shipping?',
          answer: 'Yes, we support global shipping via DHL, FedEx, UPS and other international couriers, as well as air freight and sea freight. Shipping costs are calculated based on destination and package weight, typically 3-7 business days to major countries. Large orders can negotiate shipping discounts.',
        },
        {
          question: 'Are there discounts for bulk purchases?',
          answer: 'Yes, bulk purchases enjoy tiered pricing discounts. The larger the order quantity, the better the unit price. Please contact our sales team for specific discounts. We also provide credit terms, priority shipping, and dedicated technical support for long-term partners.',
        },
      ],
    };

    const faqs = allFAQs[category] || allFAQs.general;
    return limit ? faqs.slice(0, limit) : faqs;
  };

  const faqs = getFAQs();

  // 生成FAQ结构化数据
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-16 bg-secondary">
      <div className="container-custom">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {language === 'zh' ? '常见问题' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'zh' 
                ? '这里整理了客户最常咨询的问题，如果没有找到您需要的答案，请随时联系我们。'
                : 'Here are the most frequently asked questions. If you don\'t find your answer, please contact us.'}
            </p>
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* 结构化数据 */}
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} 
        />
      </div>
    </section>
  );
};

export default FAQSection;
