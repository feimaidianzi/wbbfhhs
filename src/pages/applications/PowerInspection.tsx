import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useState } from "react";

// 幻灯片数据 - 基于参考页面的33张图片
const slides = Array.from({ length: 33 }, (_, i) => ({
  id: i + 1,
  src: `/images/power/slide-${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `电力巡检方案第${i + 1}页`
}));

// 章节导航
const chapters = [
  { id: 1, title: "公司介绍", startSlide: 1, endSlide: 2 },
  { id: 2, title: "电力巡检服务", startSlide: 3, endSlide: 16 },
  { id: 3, title: "行业案例", startSlide: 17, endSlide: 33 }
];

const applications = [
  {
    title: "输电线路巡检",
    description: "对高压输电线路进行定期巡视，AI智能识别导线损伤、杆塔异常、绝缘子破损等缺陷",
    image: "/images/power/slide-05.jpg",
    href: "/applications/power-inspection/transmission-line",
    features: ["导线断股检测", "绝缘子破损识别", "杆塔倾斜监测", "通道隐患排查"]
  },
  {
    title: "变电站巡检",
    description: "对变电站设备进行红外测温和可见光巡检，及时发现设备过热隐患",
    image: "/images/power/slide-08.jpg",
    href: "/applications/power-inspection/substation",
    features: ["红外测温检测", "设备外观检查", "渗漏油检测", "表计读数识别"]
  },
  {
    title: "光伏电站检测",
    description: "利用红外热成像快速检测光伏组件热斑、隐裂等故障",
    image: "/images/power/slide-10.jpg",
    href: "/applications/power-inspection/solar-panel",
    features: ["热斑故障检测", "组件隐裂排查", "积灰遮挡检测", "发电效率评估"]
  }
];

const stats = [
  { value: "20倍+", label: "效率提升" },
  { value: "95%+", label: "识别准确率" },
  { value: "30km", label: "单日巡检里程" },
  { value: "24h", label: "全天候作业" }
];

const PowerInspection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getCurrentChapter = () => {
    const slideNum = currentSlide + 1;
    return chapters.find(ch => slideNum >= ch.startSlide && slideNum <= ch.endSlide);
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="电力巡检解决方案"
        description="长凌电子无人机电力巡检解决方案，提供输电线路巡检、变电站巡检、光伏电站检测等专业服务，效率提升20倍以上。"
        keywords="电力巡检无人机,输电线路巡检,变电站巡检,光伏电站检测,红外热成像,AI智能识别"
        url="/applications/power-inspection"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[350px] md:h-[450px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/power/slide-01.jpg)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                电力巡检解决方案
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
                电力巡检是指通过对电力设施（如变电站、电力线路、发电设备等）的定期检查与维护，确保电力系统的安全、稳定运行。无人机在电力巡检中的应用已经成为一种重要的技术手段。
              </p>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-accent py-8">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent-foreground mb-1">{stat.value}</div>
                  <div className="text-accent-foreground/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PPT Slideshow Section */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                01
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">电力巡检解决方案详情</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  共 {slides.length} 页 · 当前第 {currentSlide + 1} 页
                  {getCurrentChapter() && ` · ${getCurrentChapter()?.title}`}
                </p>
              </div>
            </div>

            {/* Chapter Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {chapters.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => goToSlide(chapter.startSlide - 1)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    getCurrentChapter()?.id === chapter.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-card-foreground hover:bg-accent'
                  }`}
                >
                  {chapter.title}
                </button>
              ))}
            </div>

            {/* Main Slideshow */}
            <div className="relative bg-card rounded-xl overflow-hidden shadow-lg">
              {/* Slide Display */}
              <div 
                className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'aspect-[16/9]'}`}
                onClick={() => !isFullscreen && setIsFullscreen(true)}
              >
                <img
                  src={slides[currentSlide].src}
                  alt={slides[currentSlide].alt}
                  className={`w-full h-full object-contain ${isFullscreen ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                  onClick={(e) => {
                    if (isFullscreen) {
                      e.stopPropagation();
                      setIsFullscreen(false);
                    }
                  }}
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 hover:bg-background rounded-full flex items-center justify-center shadow-lg transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 hover:bg-background rounded-full flex items-center justify-center shadow-lg transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Slide Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 px-4 py-2 rounded-full text-sm font-medium">
                  {currentSlide + 1} / {slides.length}
                </div>

                {/* Fullscreen Close Button */}
                {isFullscreen && (
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="absolute top-4 right-4 w-10 h-10 bg-background/80 hover:bg-background rounded-full flex items-center justify-center"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Thumbnail Navigation */}
              <div className="p-4 bg-muted/50">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id}
                      onClick={() => goToSlide(index)}
                      className={`flex-shrink-0 w-20 h-12 md:w-24 md:h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        currentSlide === index
                          ? 'border-primary ring-2 ring-primary/30'
                          : 'border-transparent hover:border-accent'
                      }`}
                    >
                      <img
                        src={slide.src}
                        alt={`缩略图 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Keyboard Hint */}
            <p className="text-center text-muted-foreground text-sm mt-4">
              点击图片全屏查看 · 使用左右箭头切换页面
            </p>
          </div>
        </section>

        {/* Application Scenarios */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                02
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">应用场景</h2>
            </div>
            <p className="text-muted-foreground mb-10 ml-16">
              点击查看详细解决方案，了解更多技术细节和应用案例
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {applications.map((app, index) => (
                <Link
                  key={index}
                  to={app.href}
                  className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all hover:-translate-y-2"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={app.image}
                      alt={app.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-accent transition-colors">
                      {app.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{app.description}</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {app.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs text-muted-foreground">
                          <CheckCircle className="w-3 h-3 text-accent mr-1 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center text-accent font-medium group-hover:translate-x-2 transition-transform">
                      查看详情
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              获取电力巡检解决方案
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              长凌电子为您提供专业的电力巡检无人机解决方案，助力电网安全稳定运行
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-10 py-6 text-lg">
                  立即咨询
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/applications">
                <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-10 py-6 text-lg">
                  查看更多应用
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default PowerInspection;
