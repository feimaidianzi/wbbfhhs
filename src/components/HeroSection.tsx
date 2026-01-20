import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Zap, ArrowRight, Hexagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import digitalFpvBanner from "@/assets/fpv/digital-fpv-banner.png";

const getSlidesData = (language: 'zh' | 'en') => [
  {
    title: language === 'zh' ? "数字图传系统" : "Digital FPV System",
    subtitle: language === 'zh' 
      ? "高清数字图像传输 · 超低延迟 · 抗干扰能力强"
      : "HD Digital Video · Ultra-low Latency · Strong Anti-interference",
    image: digitalFpvBanner,
    cta: language === 'zh' ? "探索更多" : "Explore",
    link: "/products/accessories/digital-fpv",
  },
  {
    title: language === 'zh' ? "VTX视频发射器" : "VTX Video Transmitter",
    subtitle: language === 'zh' 
      ? "4.9-7.2GHz全频段覆盖 · 2.5W-37W多功率可选 · 80频道支持"
      : "4.9-7.2GHz Full Band · 2.5W-37W Power Options · 80 Channels",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80",
    cta: language === 'zh' ? "了解更多" : "Learn More",
    link: "/products/accessories/vtx-vrx",
  },
  {
    title: language === 'zh' ? "专业飞控系统" : "Professional Flight Controller",
    subtitle: language === 'zh' 
      ? "多模式飞行 · GPS精准定位 · 智能自动返航"
      : "Multi-mode Flight · GPS Positioning · Smart RTH",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80",
    cta: language === 'zh' ? "查看详情" : "View Details",
    link: "/products/accessories/fc-esc",
  },
  {
    title: language === 'zh' ? "ELRS远程控制" : "ELRS Remote Control",
    subtitle: language === 'zh' 
      ? "ExpressLRS协议 · 超远距离传输 · 超低延迟响应"
      : "ExpressLRS Protocol · Long Range · Ultra-low Latency",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1920&q=80",
    cta: language === 'zh' ? "立即咨询" : "Contact Now",
    link: "/products/accessories/elrs",
  },
];

export const HeroSection = () => {
  const { language, t } = useLanguage();
  const slides = getSlidesData(language);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  return (
    <section className="relative pt-16 md:pt-20">
      {/* Full-screen Hero with Cyber Grid */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-background">
        {/* Animated cyber grid background */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-dots opacity-20" />
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <Hexagon
              key={i}
              className="absolute text-accent/10 animate-float"
              style={{
                left: `${15 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
                width: `${40 + i * 10}px`,
                height: `${40 + i * 10}px`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              index === currentSlide 
                ? "opacity-100 scale-100 z-10" 
                : "opacity-0 scale-110 z-0"
            }`}
          >
            {/* Background with Ken Burns effect */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[12000ms] ease-out ${
                index === currentSlide ? "scale-125" : "scale-100"
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Dark overlay with cyan glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              
              {/* Neon accent glow */}
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Animated particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute rounded-full ${i % 2 === 0 ? 'w-1 h-1 bg-accent/60' : 'w-0.5 h-0.5 bg-foreground/30'}`}
                    style={{
                      left: `${(i * 5) % 100}%`,
                      top: `${(i * 7) % 100}%`,
                      animation: `float-particle ${4 + (i % 4)}s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>

              {/* Scan line effect */}
              <div className="absolute inset-0 overflow-hidden opacity-30">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent animate-[scanline_4s_linear_infinite]" />
              </div>
            </div>
            
            <div className="relative container-custom h-full flex items-center">
              <div className="max-w-3xl">
                {/* Brand Badge with neon effect */}
                <div className={`hidden sm:flex items-center gap-3 mb-4 md:mb-6 transition-all duration-700 delay-200 ${
                  index === currentSlide ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
                }`}>
                  <div className="relative">
                    <div className="w-10 h-10 md:w-12 md:h-12 glass-card rounded-lg flex items-center justify-center border-neon group">
                      <Zap className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                    </div>
                    <div className="absolute -inset-1 bg-accent/20 rounded-lg blur animate-pulse" />
                  </div>
                  <div className="h-px w-12 md:w-16 bg-gradient-to-r from-accent to-transparent" />
                  <span className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase font-medium">
                    {language === 'zh' ? '长凌科技' : 'CANI TECH'}
                  </span>
                </div>

                {/* Title with gradient */}
                <h1 className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black mb-3 md:mb-6 leading-tight transition-all duration-700 delay-300 ${
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                }`}>
                  <span className="text-gradient">{slide.title}</span>
                </h1>
                
                {/* Subtitle */}
                <div className={`mb-4 md:mb-8 transition-all duration-700 delay-500 ${
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}>
                  <p className="text-sm sm:text-base md:text-xl text-muted-foreground leading-relaxed">
                    {slide.subtitle.split(' · ').map((part, partIndex, arr) => (
                      <span key={partIndex} className="inline-block">
                        <span className="inline-block">{part}</span>
                        {partIndex < arr.length - 1 && (
                          <span className="inline-block mx-1 md:mx-2 text-accent">·</span>
                        )}
                      </span>
                    ))}
                  </p>
                  <div className="h-px bg-gradient-to-r from-accent/50 via-accent/20 to-transparent mt-3 md:mt-4 max-w-md" />
                </div>
                
                {/* Buttons with neon effect */}
                <div className={`flex flex-wrap gap-2 sm:gap-4 transition-all duration-700 delay-700 ${
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}>
                  <Link to={slide.link}>
                    <Button className="group relative bg-accent hover:bg-accent/90 text-accent-foreground px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105 overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <Zap className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 group-hover:scale-125 transition-transform duration-300" />
                      <span className="relative z-10">{slide.cta}</span>
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button className="group glass border border-accent/30 text-foreground hover:border-accent hover:bg-accent/10 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105">
                      <span className="relative z-10 group-hover:text-accent transition-colors duration-300">{t('hero.btn.contact')}</span>
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>

                {/* Stats with glass effect */}
                <div className={`hidden md:flex gap-4 lg:gap-6 mt-6 lg:mt-10 transition-all duration-700 delay-[900ms] ${
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}>
                  {[
                    { value: '200+', label: language === 'zh' ? '产品型号' : 'Products' },
                    { value: '10+', label: language === 'zh' ? '年经验' : 'Years' },
                    { value: '500+', label: language === 'zh' ? '合作伙伴' : 'Partners' },
                  ].map((stat, statIndex) => (
                    <div 
                      key={statIndex}
                      className="flex items-center gap-2 px-4 py-2 glass-card rounded-lg border border-accent/20 hover:border-accent/50 transition-all duration-300 cursor-default group"
                    >
                      <span className="text-accent font-bold text-base lg:text-lg group-hover:text-gradient">{stat.value}</span>
                      <span className="text-muted-foreground text-xs lg:text-sm">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative tech elements */}
              <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
                <div className="relative w-64 h-64">
                  {/* Rotating rings with neon glow */}
                  <div className="absolute inset-0 border border-accent/30 rounded-full animate-spin-slow" />
                  <div className="absolute inset-4 border border-dashed border-accent/20 rounded-full animate-spin-reverse" />
                  <div className="absolute inset-8 border-2 border-accent/40 rounded-full animate-spin-slow" style={{ animationDuration: '25s' }} />
                  
                  {/* Center glow */}
                  <div className="absolute inset-16 bg-accent/20 rounded-full blur-xl animate-pulse" />
                  <div className="absolute inset-20 bg-accent/40 rounded-full animate-neon-pulse" />
                  
                  {/* Orbiting dots */}
                  {[0, 1, 2].map((i) => (
                    <div 
                      key={i}
                      className="absolute w-2 h-2 bg-accent rounded-full shadow-neon animate-orbit"
                      style={{ 
                        animationDuration: `${6 + i * 2}s`,
                        animationDelay: `${i * 1.5}s`,
                        top: '50%',
                        left: '50%',
                        transformOrigin: `${32 + i * 16}px 0`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows with glass effect */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full glass border border-accent/20 flex items-center justify-center text-foreground hover:border-accent hover:bg-accent/10 transition-all duration-300 group z-20 hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:text-accent transition-colors duration-300" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full glass border border-accent/20 flex items-center justify-center text-foreground hover:border-accent hover:bg-accent/10 transition-all duration-300 group z-20 hover:scale-110"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:text-accent transition-colors duration-300" />
        </button>

        {/* Progress Dots with neon effect */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative rounded-full transition-all duration-500 overflow-hidden ${
                index === currentSlide ? 'w-8 sm:w-10 md:w-12 h-2 sm:h-2.5 md:h-3' : 'w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 hover:w-4'
              }`}
            >
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-accent shadow-neon' : 'bg-muted-foreground/40 hover:bg-accent/50'
              }`} />
              {index === currentSlide && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/30 to-transparent animate-shimmer" />
              )}
            </button>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="hidden md:flex absolute bottom-8 right-8 flex-col items-center gap-2 text-muted-foreground z-20 group cursor-pointer hover:text-accent transition-colors duration-300">
          <span className="text-xs tracking-wider uppercase">{language === 'zh' ? '滚动' : 'Scroll'}</span>
          <div className="w-5 h-8 rounded-full border border-accent/30 flex items-start justify-center p-1 group-hover:border-accent transition-colors duration-300">
            <div className="w-1 h-2 bg-accent rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
