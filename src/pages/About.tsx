import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { Target, Users, Award, ArrowRight } from "lucide-react";
import { SEO, createBreadcrumbStructuredData } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const getMilestonesData = (language: 'zh' | 'en') => [
  { year: "2015", title: language === 'zh' ? "公司成立" : "Founded", description: language === 'zh' ? "飞迈科技在湖南长沙正式成立，开启无人机研发之路" : "FlyMind officially established in Changsha, Hunan, starting the drone R&D journey" },
  { year: "2017", title: language === 'zh' ? "首款产品" : "First Product", description: language === 'zh' ? "成功研发首款工业级多旋翼无人机" : "Successfully developed the first industrial multi-rotor drone" },
  { year: "2019", title: language === 'zh' ? "技术突破" : "Tech Breakthrough", description: language === 'zh' ? "系留无人机技术取得重大突破，获得多项专利" : "Major breakthrough in tethered drone technology, obtained multiple patents" },
  { year: "2021", title: language === 'zh' ? "规模扩张" : "Expansion", description: language === 'zh' ? "全国服务网络覆盖20+城市，员工超过200人" : "Nationwide service network covering 20+ cities, over 200 employees" },
  { year: "2023", title: language === 'zh' ? "行业领先" : "Industry Leader", description: language === 'zh' ? "成为国内领先的工业无人机解决方案提供商" : "Became a leading industrial drone solution provider in China" },
  { year: "2024", title: language === 'zh' ? "智能升级" : "Smart Upgrade", description: language === 'zh' ? "推出新一代智能无人机平台，引领行业发展" : "Launched new generation intelligent drone platform, leading industry development" },
];

const getValuesData = (language: 'zh' | 'en') => [
  { icon: Target, title: language === 'zh' ? "使命" : "Mission", description: language === 'zh' ? "用科技创新推动无人机产业发展，为各行业提供智能化解决方案" : "Drive drone industry development through technological innovation, providing intelligent solutions for various industries" },
  { icon: Users, title: language === 'zh' ? "愿景" : "Vision", description: language === 'zh' ? "成为全球领先的工业无人机及智能化解决方案供应商" : "Become a global leading provider of industrial drones and intelligent solutions" },
  { icon: Award, title: language === 'zh' ? "价值观" : "Values", description: language === 'zh' ? "创新、专业、诚信、共赢" : "Innovation, Professionalism, Integrity, Win-win" },
];

const getStatsData = (language: 'zh' | 'en') => [
  { value: "200+", label: language === 'zh' ? "专业员工" : "Professionals" },
  { value: "50+", label: language === 'zh' ? "发明专利" : "Patents" },
  { value: "1000+", label: language === 'zh' ? "服务客户" : "Clients Served" },
  { value: "20+", label: language === 'zh' ? "覆盖城市" : "Cities Covered" },
];

const About = () => {
  const { language, t } = useLanguage();
  const milestones = getMilestonesData(language);
  const values = getValuesData(language);
  const stats = getStatsData(language);

  const breadcrumbData = createBreadcrumbStructuredData([
    { name: language === 'zh' ? '首页' : 'Home', url: '/' },
    { name: language === 'zh' ? '关于飞迈' : 'About Us', url: '/about' },
  ]);

  return (
    <div className="min-h-screen">
      <SEO
        title={language === 'zh' ? "关于飞迈" : "About Us"}
        description={language === 'zh' ? "飞迈科技有限公司成立于2015年，是一家专注于工业无人机研发、生产和销售的高新技术企业，拥有200+专业员工、50+发明专利。" : "FlyMind Technology, founded in 2015, is a high-tech enterprise focusing on industrial drone R&D, manufacturing and sales, with 200+ professionals and 50+ patents."}
        keywords="飞迈科技,FlyMind,关于我们,无人机公司,工业无人机企业,无人机研发"
        url="/about"
        structuredData={breadcrumbData}
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {language === 'zh' ? '关于飞迈科技' : 'About FlyMind'}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                {language === 'zh' ? '专业无人机研发制造商，致力于为各行业提供智能化空中解决方案' : 'Professional drone R&D manufacturer, committed to providing intelligent aerial solutions for various industries'}
              </p>
            </div>
          </div>
        </section>

        {/* Company Intro */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {language === 'zh' ? '公司简介' : 'Company Profile'}
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {language === 'zh' 
                    ? '飞迈科技有限公司成立于2015年，是一家专注于工业无人机研发、生产和销售的高新技术企业。公司总部位于湖南长沙，拥有完整的无人机产业链，从飞控系统、动力系统到整机制造均具备自主研发能力。'
                    : 'FlyMind Technology, founded in 2015, is a high-tech enterprise focusing on industrial drone R&D, manufacturing and sales. Headquartered in Changsha, Hunan, the company has a complete drone industry chain with independent R&D capabilities from flight control systems to complete aircraft manufacturing.'}
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {language === 'zh'
                    ? '经过多年发展，飞迈科技已成为国内领先的工业无人机解决方案提供商，产品广泛应用于电力巡检、消防救援、物流配送、农业植保等多个领域，服务客户超过1000家。'
                    : 'After years of development, FlyMind has become a leading industrial drone solution provider in China, with products widely used in power inspection, firefighting, logistics, agriculture and other fields, serving over 1000 clients.'}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'zh'
                    ? '公司坚持"创新驱动、品质为本"的发展理念，持续加大研发投入，目前拥有50余项发明专利和软件著作权，是多项行业标准的参与制定单位。'
                    : 'The company adheres to the development philosophy of "innovation-driven, quality-oriented", continuously increasing R&D investment, currently holding over 50 patents and software copyrights, and participating in the development of multiple industry standards.'}
                </p>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80"
                  alt={language === 'zh' ? "公司环境" : "Company Environment"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-primary">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-primary-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {language === 'zh' ? '企业文化' : 'Corporate Culture'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((item, index) => (
                <div key={index} className="bg-card rounded-xl p-8 shadow-card text-center">
                  <item.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-card-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {language === 'zh' ? '发展历程' : 'Milestones'}
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}
                    >
                      <div className="bg-card rounded-xl p-6 shadow-card inline-block">
                        <div className="text-2xl font-bold text-accent mb-2">{milestone.year}</div>
                        <h3 className="text-lg font-semibold text-card-foreground mb-1">
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {language === 'zh' ? '期待与您合作' : 'Looking Forward to Cooperation'}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {language === 'zh' 
                ? '飞迈科技期待为您提供专业的无人机解决方案，共同推动行业智能化发展'
                : 'FlyMind looks forward to providing you with professional drone solutions, jointly promoting intelligent development of the industry'}
            </p>
            <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
              {language === 'zh' ? '联系我们' : 'Contact Us'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default About;
