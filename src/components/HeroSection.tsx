import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "系留无人机系统",
    subtitle: "24H不间断工作 · 最高升空高度达300M · 5分钟快速部署",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80",
    cta: "了解更多",
    link: "/products/tethered",
  },
  {
    title: "长凌电子机场",
    subtitle: "全自动起降 · 智能巡检 · 无人值守运营",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1920&q=80",
    cta: "查看详情",
    link: "/products/airport",
  },
  {
    title: "物流无人机",
    subtitle: "高效配送 · 智能航线 · 安全可靠",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1920&q=80",
    cta: "立即咨询",
    link: "/products/logistics",
  },
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative pt-16 md:pt-20">
      {/* Full-screen Hero */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-primary/30" />
            </div>
            
            <div className="relative container-custom h-full flex items-center">
              <div className="max-w-3xl">
                {/* Brand Logo Mark */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-accent-foreground font-black text-2xl">长</span>
                  </div>
                  <div className="h-px w-16 bg-accent/50"></div>
                  <span className="text-primary-foreground/70 text-sm tracking-widest uppercase">Changling Electronics</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground mb-6 leading-tight">
                  {slide.title}
                </h1>
                
                <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 leading-relaxed">
                  {slide.subtitle}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link to={slide.link}>
                    <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-6 text-lg font-semibold shadow-button hover:shadow-glow transition-all">
                      {slide.cta}
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-lg font-semibold backdrop-blur-sm">
                      联系我们
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Progress Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "bg-accent w-12"
                  : "bg-primary-foreground/40 w-2 hover:bg-primary-foreground/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Tagline Bar */}
      <div className="bg-primary py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-accent text-3xl font-black">&lt;</span>
              <h2 className="text-xl md:text-2xl font-bold text-primary-foreground">
                工业级无人机系统解决方案专家
              </h2>
              <span className="text-accent text-3xl font-black">\&gt;</span>
            </div>
            <Link to="/products" className="text-primary-foreground/80 hover:text-accent transition-colors flex items-center gap-2 group">
              探索全部产品
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
