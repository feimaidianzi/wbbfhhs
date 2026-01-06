import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "VTX视频发射器",
    subtitle: "4.9-7.2GHz全频段覆盖 · 2.5W-37W多功率可选 · 80频道支持",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80",
    cta: "了解更多",
    link: "/products/accessories/vtx",
  },
  {
    title: "专业飞控系统",
    subtitle: "多模式飞行 · GPS精准定位 · 智能自动返航",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80",
    cta: "查看详情",
    link: "/products/accessories/flight-controller",
  },
  {
    title: "ELRS远程控制",
    subtitle: "ExpressLRS协议 · 超远距离传输 · 超低延迟响应",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1920&q=80",
    cta: "立即咨询",
    link: "/products/accessories/elrs",
  },
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

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
            {/* Animated Background */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out ${
                index === currentSlide ? "scale-110" : "scale-100"
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Multi-layer gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-primary/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
              
              {/* Animated particles effect */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-accent/30 rounded-full animate-float-particle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${3 + Math.random() * 4}s`,
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="relative container-custom h-full flex items-center">
              <div className="max-w-3xl">
                {/* Brand Logo Mark with animation */}
                <div className={`flex items-center gap-3 mb-6 transition-all duration-700 delay-200 ${
                  index === currentSlide ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}>
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center animate-pulse-glow">
                    <span className="text-accent-foreground font-black text-2xl">飞</span>
                  </div>
                  <div className="h-px w-16 bg-accent/50 animate-expand-width"></div>
                  <span className="text-primary-foreground/70 text-sm tracking-widest uppercase">FlyMind</span>
                </div>

                {/* Title with stagger animation */}
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground mb-6 leading-tight transition-all duration-700 delay-300 ${
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}>
                  {slide.title.split('').map((char, charIndex) => (
                    <span 
                      key={charIndex}
                      className="inline-block animate-text-reveal"
                      style={{ animationDelay: `${charIndex * 0.05}s` }}
                    >
                      {char}
                    </span>
                  ))}
                </h1>
                
                {/* Subtitle with animation */}
                <p className={`text-lg md:text-xl text-primary-foreground/85 mb-8 leading-relaxed transition-all duration-700 delay-500 ${
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}>
                  {slide.subtitle}
                </p>
                
                {/* Buttons with animation */}
                <div className={`flex flex-wrap gap-4 transition-all duration-700 delay-700 ${
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}>
                  <Link to={slide.link}>
                    <Button className="group bg-accent hover:bg-orange-light text-accent-foreground px-8 py-6 text-lg font-semibold shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105">
                      <Play className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                      {slide.cta}
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button className="bg-primary-foreground/10 border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/20 hover:border-primary-foreground/60 px-8 py-6 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105">
                      联系我们
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
                <div className="w-64 h-64 border border-accent/20 rounded-full animate-spin-slow" />
                <div className="absolute inset-8 border border-accent/30 rounded-full animate-spin-reverse" />
                <div className="absolute inset-16 bg-accent/10 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows with hover effects */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-accent hover:border-accent transition-all duration-300 group z-20"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-125 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-accent hover:border-accent transition-all duration-300 group z-20"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-125 transition-transform" />
        </button>

        {/* Progress Dots with animation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="relative h-2 rounded-full transition-all duration-500 overflow-hidden"
              style={{ width: index === currentSlide ? '3rem' : '0.5rem' }}
            >
              <div className={`absolute inset-0 rounded-full transition-all ${
                index === currentSlide ? 'bg-accent' : 'bg-primary-foreground/40 hover:bg-primary-foreground/60'
              }`} />
              {index === currentSlide && (
                <div className="absolute inset-0 bg-accent/50 rounded-full animate-progress-bar" />
              )}
            </button>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-primary-foreground/60 z-20">
          <span className="text-xs tracking-widest rotate-90 origin-center translate-y-8">SCROLL</span>
          <div className="w-px h-16 bg-gradient-to-b from-primary-foreground/60 to-transparent animate-scroll-indicator" />
        </div>
      </div>

      {/* Tagline Bar with animation */}
      <div className="bg-primary py-6 relative overflow-hidden">
        {/* Animated background stripe */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-shimmer" />
        
        <div className="container-custom relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-accent text-3xl font-black animate-bounce-subtle">&lt;</span>
              <h2 className="text-xl md:text-2xl font-bold text-primary-foreground">
                专业无人机配件供应商
              </h2>
              <span className="text-accent text-3xl font-black animate-bounce-subtle" style={{ animationDelay: '0.2s' }}>&gt;</span>
            </div>
            <Link to="/products/accessories" className="text-primary-foreground/80 hover:text-accent transition-colors flex items-center gap-2 group">
              探索全部配件
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};