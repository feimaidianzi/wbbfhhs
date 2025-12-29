import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const applications = [
  {
    name: "水利",
    description: "河道巡检、水库监测、防汛预警，无人机助力水利智能化管理",
    image: "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?w=600&q=80",
  },
  {
    name: "交通",
    description: "道路监控、交通疏导、事故勘察，提升交通管理效能",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80",
  },
  {
    name: "环保",
    description: "大气监测、水质采样、污染溯源，守护绿水青山",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
  },
  {
    name: "电力",
    description: "输电线路巡检、变电站监测、故障定位，保障电网安全",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
  },
  {
    name: "应急",
    description: "灾情侦察、搜救定位、物资投送，快速响应突发事件",
    image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=600&q=80",
  },
  {
    name: "测绘",
    description: "地形测绘、三维建模、工程勘察，厘米级精度作业",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
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
    <section id="applications" className="py-20 md:py-28 bg-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-accent text-2xl font-black">&lt;</span>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">
                行业应用
              </h2>
              <span className="text-accent text-2xl font-black">\&gt;</span>
            </div>
            <p className="text-muted-foreground text-lg max-w-xl">
              长凌无人机产品广泛应用于水利、交通、环保、电力等多个行业领域
            </p>
          </div>
          <Link 
            to="/applications"
            className="inline-flex items-center gap-2 text-accent hover:text-orange-light font-semibold text-lg group"
          >
            查看全部应用
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Applications Grid */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex gap-6 transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {applications.map((app, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3"
                >
                  <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 h-full hover:-translate-y-2">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={app.image}
                        alt={app.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-primary-foreground mb-1">
                          {app.name}
                        </h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {app.description}
                      </p>
                      <Link
                        to="/applications"
                        className="inline-flex items-center text-accent hover:text-orange-light font-semibold group/link"
                      >
                        了解更多
                        <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-card shadow-card-hover border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-card shadow-card-hover border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
