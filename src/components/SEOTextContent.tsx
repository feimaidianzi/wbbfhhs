import { useLanguage } from "@/contexts/LanguageContext";

/**
 * SEO文本内容组件
 * 该组件提供对搜索引擎友好的文本内容，提高文本与HTML代码的比率
 * 使用视觉隐藏但对搜索引擎可见的技术
 */

interface SEOTextContentProps {
  page: 'home' | 'products' | 'accessories' | 'applications' | 'about' | 'contact';
}

export const SEOTextContent = ({ page }: SEOTextContentProps) => {
  const { language } = useLanguage();

  const getContent = () => {
    switch (page) {
      case 'home':
        return language === 'zh' ? {
          title: '长凌科技 - 专业无人机配件制造商',
          content: `
            长凌科技有限公司是中国领先的工业级无人机配件研发与制造企业，专注于为全球无人机行业提供高品质的核心零部件解决方案。
            
            我们的产品线涵盖数字图传系统、VTX视频发射器、飞控电调模块、云台吊舱、ELRS远程遥控等多个品类，
            产品广泛应用于航拍、测绘、巡检、物流、农业等领域。
            
            凭借十余年的技术积累和持续创新，长凌科技已获得50余项发明专利和软件著作权，
            产品远销欧美、东南亚等30多个国家和地区，服务全球超过500家合作伙伴。
            
            我们坚持"技术领先、品质为本"的发展理念，为客户提供从产品定制到技术支持的一站式服务。
            无论您是无人机整机制造商、行业应用集成商还是个人飞手，长凌科技都能为您提供专业可靠的解决方案。
          `,
          keywords: [
            '无人机配件', '数字图传', 'VTX视频发射器', '飞控电调', '云台吊舱', 
            'ELRS遥控', 'FPV图传', '无人机零部件', '工业无人机配件', '航模配件',
            '长凌科技', 'CANI', '无人机制造商', '无人机供应商'
          ],
        } : {
          title: 'CANI Technology - Professional Drone Accessories Manufacturer',
          content: `
            CANI Technology Co., Ltd. is a leading Chinese manufacturer of industrial-grade drone accessories, 
            dedicated to providing high-quality core component solutions for the global drone industry.
            
            Our product line covers digital FPV systems, VTX video transmitters, flight controller ESC modules, 
            gimbal pods, ELRS remote controls, and more. Our products are widely used in aerial photography, 
            surveying, inspection, logistics, agriculture, and other fields.
            
            With over a decade of technological accumulation and continuous innovation, CANI has obtained 
            more than 50 invention patents and software copyrights. Our products are exported to over 30 
            countries and regions including Europe, America, and Southeast Asia, serving more than 500 
            global partners.
            
            We adhere to the development philosophy of "technology leadership and quality first", 
            providing customers with one-stop services from product customization to technical support. 
            Whether you are a drone manufacturer, industry integrator, or individual pilot, 
            CANI can provide you with professional and reliable solutions.
          `,
          keywords: [
            'drone accessories', 'digital FPV', 'VTX video transmitter', 'flight controller ESC', 
            'gimbal pod', 'ELRS remote', 'FPV system', 'drone components', 'industrial drone parts',
            'CANI Technology', 'drone manufacturer', 'drone supplier', 'China drone accessories'
          ],
        };

      case 'products':
        return language === 'zh' ? {
          title: '无人机配件产品中心',
          content: `
            长凌科技产品中心提供全系列专业无人机配件，包括高性能数字图传系统、多频段VTX视频发射器、
            智能飞控电调模块、多轴稳定云台吊舱、超远距离ELRS遥控器等核心零部件。
            
            数字图传系统：采用先进的数字传输技术，支持高清1080P/4K视频传输，延迟低于30ms，
            传输距离可达30公里以上，广泛应用于专业航拍、工业巡检等场景。
            
            VTX视频发射器：覆盖4.9GHz至7.2GHz全频段，功率可选2.5W至37W，支持80个频道切换，
            兼容主流FPV眼镜和接收器，适合竞速穿越、远距离飞行等应用。
            
            飞控电调系统：集成GPS/GLONASS双模定位，支持自动返航、定点悬停、航线规划等智能功能，
            电调采用FOC矢量控制技术，响应速度快、效率高、发热小。
            
            云台吊舱：三轴无刷直驱云台，支持±0.01°增稳精度，可搭载多种相机载荷，
            提供红外热成像、30倍光学变焦、激光测距等多种专业配置。
            
            ELRS遥控系统：基于ExpressLRS开源协议，延迟低于5ms，传输距离可达100公里，
            支持双向数据传输和遥测回传，是远距离飞行的理想选择。
          `,
          keywords: [
            '无人机配件', '数字图传', 'VTX发射器', '飞控系统', '电调模块', '云台吊舱',
            'ELRS遥控', 'FPV设备', '航模零件', '无人机零部件批发'
          ],
        } : {
          title: 'Drone Accessories Product Center',
          content: `
            CANI Product Center offers a full range of professional drone accessories, including high-performance 
            digital FPV systems, multi-band VTX video transmitters, intelligent flight controller ESC modules, 
            multi-axis stabilized gimbal pods, and ultra-long-range ELRS remote controllers.
            
            Digital FPV System: Using advanced digital transmission technology, supporting HD 1080P/4K video 
            transmission with latency below 30ms and transmission distance up to 30km. Widely used in 
            professional aerial photography and industrial inspection.
            
            VTX Video Transmitter: Covering 4.9GHz to 7.2GHz full band, power options from 2.5W to 37W, 
            supporting 80 channel switching, compatible with mainstream FPV goggles and receivers.
            
            Flight Controller ESC: Integrated GPS/GLONASS dual-mode positioning, supporting auto-return, 
            point hover, and route planning. ESC uses FOC vector control for fast response and efficiency.
            
            Gimbal Pod: Three-axis brushless direct drive gimbal with ±0.01° stabilization accuracy, 
            supporting various camera payloads including thermal imaging, 30x optical zoom, and laser ranging.
            
            ELRS Remote System: Based on ExpressLRS open-source protocol with latency below 5ms and 
            transmission distance up to 100km, supporting bidirectional data transmission and telemetry.
          `,
          keywords: [
            'drone accessories', 'digital FPV', 'VTX transmitter', 'flight controller', 'ESC module',
            'gimbal pod', 'ELRS remote', 'FPV equipment', 'drone components wholesale'
          ],
        };

      case 'accessories':
        return language === 'zh' ? {
          title: '无人机零部件与配件',
          content: `
            长凌科技提供完整的无人机零部件和配件解决方案，满足从入门级到专业级的各类需求。
            
            视频传输设备：包括模拟图传和数字图传两大类，模拟图传价格实惠、兼容性好，
            数字图传画质清晰、延迟低、抗干扰能力强。VTX发射器支持多种功率和频率选择。
            
            飞行控制系统：从简单的四轴飞控到复杂的多旋翼飞控，支持Betaflight、iNav、ArduPilot等
            多种开源固件，电调支持BLHeli_32、AM32等协议，兼容各类电机。
            
            稳定云台系统：二轴和三轴云台可选，支持运动相机、微单相机、专业电影机等多种载荷，
            提供定制化吊舱解决方案，集成红外、变焦、喊话等功能模块。
            
            遥控通信系统：传统2.4GHz遥控器和新一代ELRS系统均有提供，
            ELRS以其超低延迟和超远距离特性成为专业飞手的首选。
            
            电源管理系统：包括电池管理模块、电压调节器、配电板等，确保无人机安全稳定运行。
            
            所有产品均经过严格质量检测，提供完善的技术支持和售后服务。
          `,
          keywords: [
            '无人机零部件', '无人机配件', '图传设备', '飞控系统', '电调', '云台', '遥控器',
            'VTX', 'FPV眼镜', '无人机电池', '无人机电机', '螺旋桨'
          ],
        } : {
          title: 'Drone Components and Accessories',
          content: `
            CANI provides complete drone component and accessory solutions for all needs from entry-level to professional.
            
            Video Transmission Equipment: Including analog and digital FPV systems. Analog systems are affordable 
            with good compatibility, while digital systems offer clear picture quality, low latency, and strong 
            anti-interference capabilities.
            
            Flight Control Systems: From simple quadcopter controllers to complex multi-rotor systems, 
            supporting Betaflight, iNav, ArduPilot and other open-source firmware. ESCs support BLHeli_32, 
            AM32 protocols, compatible with various motors.
            
            Stabilization Gimbal Systems: 2-axis and 3-axis gimbals available, supporting action cameras, 
            mirrorless cameras, and professional cinema cameras. Custom pod solutions with integrated 
            thermal imaging, zoom, and speaker modules.
            
            Remote Control Systems: Traditional 2.4GHz controllers and next-generation ELRS systems available. 
            ELRS has become the preferred choice for professional pilots with its ultra-low latency and 
            ultra-long-range characteristics.
            
            Power Management: Including battery management modules, voltage regulators, and power distribution 
            boards to ensure safe and stable drone operation.
          `,
          keywords: [
            'drone components', 'drone accessories', 'FPV equipment', 'flight controller', 'ESC',
            'gimbal', 'remote controller', 'VTX', 'FPV goggles', 'drone battery', 'drone motor', 'propeller'
          ],
        };

      case 'applications':
        return language === 'zh' ? {
          title: '无人机行业应用解决方案',
          content: `
            长凌科技深耕无人机行业应用多年，为电力巡检、物流配送、消防救援、环境监测、
            测绘测量等领域提供专业的无人机解决方案。
            
            电力巡检应用：搭载红外热成像和高清变焦相机的巡检无人机，可自动识别输电线路缺陷，
            包括绝缘子破损、导线断股、金具锈蚀等问题，巡检效率提升10倍以上。
            
            物流配送应用：大载重物流无人机可承载5-30公斤货物，续航30-60分钟，
            适用于山区、海岛、应急等场景的快速配送，降低物流成本50%以上。
            
            消防救援应用：系留无人机可24小时持续作业，搭载热成像、探照灯、喊话器等设备，
            为消防指挥提供实时空中视角，辅助搜救和火情监控。
            
            环境监测应用：多光谱和高光谱载荷可监测水质、大气、植被等环境指标，
            结合AI分析算法实现自动化环境监测和预警。
            
            测绘测量应用：RTK厘米级定位精度，倾斜摄影和激光雷达载荷可快速生成
            高精度三维模型和地形图，广泛应用于国土测绘、城市规划等领域。
          `,
          keywords: [
            '无人机应用', '电力巡检', '物流无人机', '消防无人机', '环境监测', '测绘无人机',
            '行业无人机', '工业级无人机', '无人机解决方案'
          ],
        } : {
          title: 'Drone Industry Application Solutions',
          content: `
            CANI has been deeply involved in drone industry applications for years, providing professional 
            drone solutions for power inspection, logistics, firefighting, environmental monitoring, 
            and surveying fields.
            
            Power Inspection: Inspection drones equipped with thermal imaging and HD zoom cameras can 
            automatically identify transmission line defects including insulator damage, wire breakage, 
            and hardware corrosion, improving inspection efficiency by over 10 times.
            
            Logistics Delivery: Heavy-lift logistics drones can carry 5-30kg cargo with 30-60 minute 
            flight time, suitable for rapid delivery in mountainous areas, islands, and emergencies, 
            reducing logistics costs by over 50%.
            
            Firefighting Rescue: Tethered drones can operate 24 hours continuously, equipped with 
            thermal imaging, spotlights, and speakers, providing real-time aerial view for fire 
            command and assisting in search and rescue.
            
            Environmental Monitoring: Multispectral and hyperspectral payloads can monitor water quality, 
            atmosphere, and vegetation indicators, combined with AI analysis for automated monitoring 
            and early warning.
            
            Surveying and Mapping: RTK centimeter-level positioning accuracy, oblique photography and 
            LiDAR payloads can quickly generate high-precision 3D models and topographic maps.
          `,
          keywords: [
            'drone applications', 'power inspection', 'logistics drone', 'firefighting drone',
            'environmental monitoring', 'surveying drone', 'industrial drone', 'drone solutions'
          ],
        };

      case 'about':
        return language === 'zh' ? {
          title: '关于长凌科技',
          content: `
            长凌科技有限公司成立于2015年，总部位于湖南省长沙市，是一家集研发、生产、销售于一体的
            高新技术企业，专注于工业级无人机核心零部件的开发与制造。
            
            公司发展历程：
            2015年 - 公司成立，开始无人机飞控系统研发
            2017年 - 推出首款数字图传产品，获得行业认可
            2019年 - 产品线扩展至云台、遥控等领域
            2021年 - 海外市场突破，产品出口30余国家
            2023年 - 成为国内领先的无人机配件供应商
            
            研发实力：公司拥有50余人的专业研发团队，涵盖电子、通信、机械、软件等多个专业领域，
            累计获得发明专利和软件著作权50余项，多项技术达到国内领先水平。
            
            生产能力：公司拥有现代化生产基地，配备SMT贴片生产线、自动化组装线、
            全自动检测设备等，年产能超过100万套各类无人机配件。
            
            质量保证：公司通过ISO9001质量管理体系认证，所有产品均经过严格的质量检测，
            提供完善的售后服务和技术支持。
            
            企业使命：成为全球最值得信赖的无人机配件供应商，推动无人机行业发展。
          `,
          keywords: [
            '长凌科技', 'CANI', '无人机公司', '无人机制造商', '无人机配件供应商',
            '长沙无人机', '湖南无人机', '无人机研发', '无人机生产'
          ],
        } : {
          title: 'About CANI Technology',
          content: `
            CANI Technology Co., Ltd., founded in 2015 and headquartered in Changsha, Hunan Province, 
            is a high-tech enterprise integrating R&D, production, and sales, focusing on the development 
            and manufacturing of industrial-grade drone core components.
            
            Company History:
            2015 - Company founded, began drone flight controller development
            2017 - Launched first digital FPV product, gained industry recognition
            2019 - Product line expanded to gimbals and remote controls
            2021 - Overseas market breakthrough, products exported to 30+ countries
            2023 - Became a leading domestic drone accessories supplier
            
            R&D Strength: The company has a professional R&D team of over 50 people, covering electronics, 
            communications, mechanics, and software. We have obtained over 50 invention patents and 
            software copyrights, with multiple technologies reaching domestic leading levels.
            
            Production Capacity: Modern production base equipped with SMT production lines, automated 
            assembly lines, and automatic testing equipment, with annual capacity exceeding 1 million 
            sets of various drone accessories.
            
            Quality Assurance: ISO9001 certified, all products undergo strict quality testing with 
            comprehensive after-sales service and technical support.
            
            Mission: To become the world's most trusted drone accessories supplier and promote drone 
            industry development.
          `,
          keywords: [
            'CANI Technology', 'drone company', 'drone manufacturer', 'drone accessories supplier',
            'Changsha drone', 'China drone', 'drone R&D', 'drone production'
          ],
        };

      case 'contact':
        return language === 'zh' ? {
          title: '联系长凌科技',
          content: `
            感谢您对长凌科技的关注！我们期待与您建立合作关系，为您提供优质的无人机配件产品和服务。
            
            联系方式：
            销售热线：176-7404-8404（工作日 9:00-18:00）
            商务邮箱：market@caniuav.com
            技术支持：support@caniuav.com
            
            公司地址：
            湖南省长沙市望城区月亮岛街道罐子岭澳优全球总部大楼
            
            业务范围：
            - 无人机配件批发与零售
            - OEM/ODM定制服务
            - 技术咨询与解决方案
            - 售后服务与维修支持
            
            合作对象：
            - 无人机整机制造商
            - 行业应用集成商
            - 经销商与代理商
            - 科研院校与培训机构
            - 个人飞手与爱好者
            
            我们承诺：
            - 专业的技术支持团队
            - 快速的响应速度
            - 完善的售后服务
            - 有竞争力的价格体系
            
            欢迎通过电话、邮件或在线表单与我们联系，我们将尽快回复您的咨询。
          `,
          keywords: [
            '联系长凌', '无人机配件采购', '无人机配件批发', 'OEM定制', 'ODM定制',
            '无人机技术咨询', '无人机售后服务', '长沙无人机公司'
          ],
        } : {
          title: 'Contact CANI Technology',
          content: `
            Thank you for your interest in CANI Technology! We look forward to building a partnership 
            with you and providing quality drone accessory products and services.
            
            Contact Information:
            Sales Hotline: +86-176-7404-8404 (Weekdays 9:00-18:00 CST)
            Business Email: market@caniuav.com
            Technical Support: support@caniuav.com
            
            Address:
            Ausnutria Global HQ, Guanziling, Yueliangdao Street, Wangcheng District, 
            Changsha, Hunan, China
            
            Business Scope:
            - Drone accessories wholesale and retail
            - OEM/ODM customization services
            - Technical consulting and solutions
            - After-sales service and repair support
            
            Target Partners:
            - Drone manufacturers
            - Industry application integrators
            - Distributors and agents
            - Research institutions and training centers
            - Individual pilots and hobbyists
            
            Our Commitment:
            - Professional technical support team
            - Fast response time
            - Comprehensive after-sales service
            - Competitive pricing
            
            Feel free to contact us via phone, email, or online form. We will respond to your 
            inquiry as soon as possible.
          `,
          keywords: [
            'contact CANI', 'drone accessories purchase', 'drone accessories wholesale', 
            'OEM customization', 'ODM customization', 'drone technical consulting', 
            'drone after-sales service', 'China drone company'
          ],
        };

      default:
        return { title: '', content: '', keywords: [] };
    }
  };

  const pageContent = getContent();

  return (
    <article 
      className="sr-only" 
      aria-hidden="true"
      itemScope 
      itemType="https://schema.org/Article"
    >
      <h2 itemProp="headline">{pageContent.title}</h2>
      <div itemProp="articleBody">
        {pageContent.content.split('\n').filter(p => p.trim()).map((paragraph, index) => (
          <p key={index}>{paragraph.trim()}</p>
        ))}
      </div>
      <footer>
        <span itemProp="keywords">{pageContent.keywords.join(', ')}</span>
      </footer>
    </article>
  );
};

export default SEOTextContent;
