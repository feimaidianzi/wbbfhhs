import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    title: "系留无人机系统",
    subtitle: "24H不间断工作 · 最高升空高度达300M · 5分钟快速部署",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80",
    cta: "了解更多",
  },
  {
    title: "长凌智能机场",
    subtitle: "全自动起降 · 智能巡检 · 无人值守",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1920&q=80",
    cta: "查看详情",
  },
  {
    title: "物流无人机",
    subtitle: "高效配送 · 智能航线 · 安全可靠",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1920&q=80",
    cta: "立即咨询",
  },
  {
    title: "消防救援无人机",
    subtitle: "快速响应 · 精准定位 · 高效灭火",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80",
    cta: "了解更多",
  },
];

const categories = [
  "长凌机场",
  "系留无人机",
  "物流无人机",
  "消防救援",
  "架线无人机",
  "多旋翼无人机",
  "集群无人机",
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
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
      {/* Category Bar */}
      <div className="bg-secondary py-3 overflow-x-auto">
        <div className="container-custom">
          <div className="flex items-center gap-6 min-w-max">
            {categories.map((cat, index) => (
              <a
                key={index}
                href="#"
                className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors whitespace-nowrap"
              >
                {cat}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Carousel */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
            </div>
            <div className="relative container-custom h-full flex items-center">
              <div className="max-w-xl animate-fade-in">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                  {slide.subtitle}
                </p>
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3 text-lg font-medium">
                  {slide.cta}
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-accent w-8"
                  : "bg-primary-foreground/40 hover:bg-primary-foreground/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
