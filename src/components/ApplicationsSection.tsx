import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const applications = [
  {
    name: "水利",
    description: "为积极践行水利改革发展总基调和安全、实用水利网络建设...",
    image: "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?w=600&q=80",
  },
  {
    name: "交通",
    description: "通过无人机系统提高道路交通运输行业运行监测能力，提...",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80",
  },
  {
    name: "环保",
    description: "无人机遥感系统具有成本低、安全性高、机动性强、精度...",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
  },
  {
    name: "智慧城市",
    description: "数字地球和智能地球提出了高效应用资源和环境的口号...",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80",
  },
  {
    name: "应急",
    description: "在人员密集、场景复杂的安全监控领域的应用...",
    image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=600&q=80",
  },
  {
    name: "5G联网",
    description: "5G联网无人机，通过5G蜂窝网络取代无人机...",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    name: "警用",
    description: "警用无人机空中平台搭载的图像、红外、激光、气体等多...",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80",
  },
  {
    name: "测绘",
    description: "垂直起降无人机适合高效率、高精度、大面积航测项目...",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
  {
    name: "电力",
    description: "电力工业是国民经济的重要组成部分之一...",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
  },
];

export const ApplicationsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, applications.length - itemsPerPage);

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section id="applications" className="py-16 md:py-24 bg-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            行业应用
          </h2>
          <p className="text-muted-foreground">
            翼飞无人机广泛应用于多个行业领域
          </p>
        </div>

        {/* Applications Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {applications.map((app, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3"
                >
                  <div className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 h-full">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={app.image}
                        alt={app.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                        {app.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {app.description}
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center text-accent hover:text-orange-light font-medium text-sm"
                      >
                        了解更多
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
