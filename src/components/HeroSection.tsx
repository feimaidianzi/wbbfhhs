import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
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
    cta: language === 'zh' ? "了解更多" : "Learn More",
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
      {/* Full-screen Hero */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              index === currentSlide 
                ? "opacity-100 scale-100 z-10" 
                : "opacity-0 scale-110 z-0"
            }`}
          >
            {/* Animated Background with Ken Burns effect */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[12000ms] ease-out ${
                index === currentSlide ? "scale-125" : "scale-100"
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Multi-layer gradient overlay with animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-primary/40 animate-gradient-shift" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 opacity-0 animate-pulse-slow" style={{ animationDelay: '2s' }} />
              
              {/* Enhanced floating particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute rounded-full ${i % 3 === 0 ? 'w-2 h-2 bg-accent/40' : i % 3 === 1 ? 'w-1 h-1 bg-primary-foreground/30' : 'w-1.5 h-1.5 bg-accent/25'}`}
                    style={{
                      left: `${(i * 3.3) % 100}%`,
                      top: `${(i * 7.7) % 100}%`,
                      animation: `float-particle ${4 + (i % 5)}s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>

              {/* Animated light rays */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-accent/50 via-accent/20 to-transparent animate-light-ray" style={{ animationDelay: '0s' }} />
                <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gradient-to-b from-primary-foreground/30 via-primary-foreground/10 to-transparent animate-light-ray" style={{ animationDelay: '1s' }} />
                <div className="absolute top-0 left-3/4 w-1 h-full bg-gradient-to-b from-accent/40 via-accent/15 to-transparent animate-light-ray" style={{ animationDelay: '2s' }} />
              </div>

              {/* Animated grid pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-move" />
              </div>
            </div>
            
            <div className="relative container-custom h-full flex items-center">
              <div className="max-w-3xl">
                {/* Brand Logo Mark with enhanced animation */}
                <div className={`flex items-center gap-3 mb-6 transition-all duration-700 delay-200 ${
                  index === currentSlide ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
                }`}>
                  <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center animate-pulse-glow relative overflow-hidden group">
                    <span className="text-accent-foreground font-black text-2xl relative z-10">{language === 'zh' ? '飞' : 'F'}</span>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full animate-shine" />
                  </div>
                  <div className="h-px w-20 bg-gradient-to-r from-accent to-transparent animate-expand-width"></div>
                  <span className="text-primary-foreground/80 text-sm tracking-[0.3em] uppercase font-medium animate-text-glow">FlyMind</span>
                </div>

                {/* Title with character stagger animation */}
                <h1 className={`text-4xl md:text-5xl lg:text-7xl font-black text-primary-foreground mb-6 leading-tight transition-all duration-700 delay-300 ${
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                }`}>
                  {language === 'zh' ? (
                    slide.title.split('').map((char, charIndex) => (
                      <span 
                        key={charIndex}
                        className="inline-block animate-char-reveal hover:text-accent hover:scale-110 transition-all duration-300 cursor-default"
                        style={{ animationDelay: `${0.3 + charIndex * 0.08}s` }}
                      >
                        {char}
                      </span>
                    ))
                  ) : (
                    slide.title.split(' ').map((word, wordIndex, arr) => (
                      <span 
                        key={wordIndex}
                        className="inline-block animate-word-reveal hover:text-accent transition-colors duration-300"
                        style={{ animationDelay: `${0.3 + wordIndex * 0.15}s` }}
                      >
                        {word}{wordIndex < arr.length - 1 ? '\u00A0' : ''}
                      </span>
                    ))
                  )}
                </h1>
                
                {/* Subtitle with typewriter-like animation */}
                <div className={`mb-8 transition-all duration-700 delay-500 ${
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}>
                  <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
                    {slide.subtitle.split(' · ').map((part, partIndex, arr) => (
                      <span key={partIndex} className="inline-block">
                        <span 
                          className="inline-block animate-fade-up"
                          style={{ animationDelay: `${0.6 + partIndex * 0.2}s` }}
                        >
                          {part}
                        </span>
                        {partIndex < arr.length - 1 && (
                          <span className="inline-block mx-2 text-accent animate-pulse">·</span>
                        )}
                      </span>
                    ))}
                  </p>
                  {/* Animated underline */}
                  <div className="h-0.5 bg-gradient-to-r from-accent via-accent/50 to-transparent mt-4 animate-line-grow" style={{ animationDelay: '1s' }} />
                </div>
                
                {/* Buttons with enhanced animation */}
                <div className={`flex flex-wrap gap-4 transition-all duration-700 delay-700 ${
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}>
                  <Link to={slide.link}>
                    <Button className="group bg-accent hover:bg-orange-light text-accent-foreground px-8 py-6 text-lg font-semibold shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105 relative overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <Play className="w-5 h-5 mr-2 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
                      <span className="relative z-10">{slide.cta}</span>
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button className="group bg-primary-foreground/10 border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/20 hover:border-accent px-8 py-6 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 relative overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative z-10 group-hover:text-accent transition-colors duration-300">{t('hero.btn.contact')}</span>
                    </Button>
                  </Link>
                </div>

                {/* Floating stats badges */}
                <div className={`flex gap-6 mt-10 transition-all duration-700 delay-[900ms] ${
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}>
                  {[
                    { value: '200+', label: language === 'zh' ? '产品型号' : 'Products' },
                    { value: '10+', label: language === 'zh' ? '年经验' : 'Years' },
                    { value: '500+', label: language === 'zh' ? '合作伙伴' : 'Partners' },
                  ].map((stat, statIndex) => (
                    <div 
                      key={statIndex}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full border border-primary-foreground/20 animate-float hover:border-accent/50 hover:bg-primary-foreground/15 transition-all duration-300 cursor-default"
                      style={{ animationDelay: `${statIndex * 0.5}s`, animationDuration: `${3 + statIndex * 0.5}s` }}
                    >
                      <span className="text-accent font-bold text-lg">{stat.value}</span>
                      <span className="text-primary-foreground/70 text-sm">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced decorative elements */}
              <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
                {/* Rotating rings with gradient */}
                <div className="relative w-72 h-72">
                  <div className="absolute inset-0 border-2 border-dashed border-accent/30 rounded-full animate-spin-slow" />
                  <div className="absolute inset-6 border border-accent/40 rounded-full animate-spin-reverse" />
                  <div className="absolute inset-12 border-2 border-dotted border-primary-foreground/20 rounded-full animate-spin-slow" style={{ animationDuration: '25s' }} />
                  <div className="absolute inset-20 bg-gradient-to-br from-accent/20 to-transparent rounded-full animate-pulse" />
                  
                  {/* Orbiting dots */}
                  {[0, 1, 2, 3].map((i) => (
                    <div 
                      key={i}
                      className="absolute w-3 h-3 bg-accent rounded-full animate-orbit shadow-lg shadow-accent/50"
                      style={{ 
                        animationDuration: `${8 + i * 2}s`,
                        animationDelay: `${i * 2}s`,
                        top: '50%',
                        left: '50%',
                        transformOrigin: `${36 + i * 12}px 0`,
                      }}
                    />
                  ))}
                  
                  {/* Center glow */}
                  <div className="absolute inset-24 bg-accent/20 rounded-full blur-xl animate-pulse" />
                </div>
              </div>

              {/* Floating tech icons */}
              <div className="absolute right-32 bottom-32 hidden lg:block">
                <div className="w-16 h-16 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl border border-primary-foreground/20 flex items-center justify-center animate-float-delayed hover:border-accent/50 transition-all duration-300">
                  <span className="text-2xl">📡</span>
                </div>
              </div>
              <div className="absolute right-48 top-32 hidden lg:block">
                <div className="w-14 h-14 bg-accent/20 backdrop-blur-sm rounded-xl border border-accent/30 flex items-center justify-center animate-float hover:scale-110 transition-transform duration-300" style={{ animationDelay: '1s' }}>
                  <span className="text-xl">🎮</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Enhanced Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-accent hover:border-accent transition-all duration-300 group z-20 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-125 group-hover:-translate-x-0.5 transition-all duration-300" />
          <span className="absolute inset-0 rounded-full bg-accent/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-accent hover:border-accent transition-all duration-300 group z-20 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-125 group-hover:translate-x-0.5 transition-all duration-300" />
          <span className="absolute inset-0 rounded-full bg-accent/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
        </button>

        {/* Enhanced Progress Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative rounded-full transition-all duration-500 overflow-hidden group ${
                index === currentSlide ? 'w-12 h-3' : 'w-3 h-3 hover:w-6'
              }`}
            >
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-accent' : 'bg-primary-foreground/40 group-hover:bg-primary-foreground/60'
              }`} />
              {index === currentSlide && (
                <>
                  <div className="absolute inset-0 bg-accent/50 rounded-full animate-progress-bar" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </>
              )}
            </button>
          ))}
        </div>

        {/* Enhanced Scroll indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-primary-foreground/60 z-20 group cursor-pointer hover:text-accent transition-colors duration-300">
          <span className="text-xs tracking-widest rotate-90 origin-center translate-y-8 group-hover:text-accent transition-colors duration-300">SCROLL</span>
          <div className="w-px h-16 bg-gradient-to-b from-primary-foreground/60 to-transparent animate-scroll-indicator group-hover:from-accent transition-colors duration-300" />
          <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex justify-center pt-2 group-hover:border-accent transition-colors duration-300">
            <div className="w-1 h-2 bg-primary-foreground/60 rounded-full animate-scroll-mouse group-hover:bg-accent transition-colors duration-300" />
          </div>
        </div>
      </div>

      {/* Enhanced Tagline Bar */}
      <div className="bg-primary py-6 relative overflow-hidden">
        {/* Multiple animated background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-shimmer" />
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 animate-pulse-slow" />
        
        {/* Moving particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-accent/40 rounded-full animate-fly-across"
              style={{
                top: `${20 + i * 15}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${6 + i}s`,
              }}
            />
          ))}
        </div>
        
        <div className="container-custom relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-accent text-3xl font-black animate-bounce-subtle">&lt;</span>
              <h2 className="text-xl md:text-2xl font-bold text-primary-foreground relative">
                <span className="relative z-10">{language === 'zh' ? '专业无人机配件供应商' : 'Professional Drone Accessories Supplier'}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </h2>
              <span className="text-accent text-3xl font-black animate-bounce-subtle" style={{ animationDelay: '0.2s' }}>&gt;</span>
            </div>
            <Link to="/products/accessories" className="text-primary-foreground/80 hover:text-accent transition-all duration-300 flex items-center gap-2 group px-4 py-2 rounded-full hover:bg-primary-foreground/10">
              {language === 'zh' ? '探索全部配件' : 'Explore All Accessories'}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
