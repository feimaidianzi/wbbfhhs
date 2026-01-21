import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Droplets, Car, Leaf, Zap, AlertTriangle, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const getApplicationsData = (language: 'zh' | 'en') => [
  {
    id: "water",
    name: language === 'zh' ? "水利" : "Water Resources",
    description: language === 'zh' 
      ? "河道巡检、水库监测、防汛预警，无人机助力水利智能化管理"
      : "River inspection, reservoir monitoring, flood warning, drone-assisted smart water management",
    image: "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?w=1200&q=80",
    icon: Droplets,
    link: "/applications/water",
  },
  {
    id: "traffic",
    name: language === 'zh' ? "交通" : "Traffic",
    description: language === 'zh' 
      ? "道路监控、交通疏导、事故勘察，提升交通管理效能"
      : "Road monitoring, traffic management, accident investigation",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80",
    icon: Car,
    link: "/applications/traffic",
  },
  {
    id: "environment",
    name: language === 'zh' ? "环保" : "Environment",
    description: language === 'zh' 
      ? "大气监测、水质采样、污染溯源，守护绿水青山"
      : "Air monitoring, water sampling, pollution tracing",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
    icon: Leaf,
    link: "/applications/environment",
  },
  {
    id: "power",
    name: language === 'zh' ? "电力" : "Power Grid",
    description: language === 'zh' 
      ? "输电线路巡检、变电站监测、故障定位，保障电网安全"
      : "Transmission line inspection, fault location",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80",
    icon: Zap,
    link: "/applications/power",
  },
  {
    id: "emergency",
    name: language === 'zh' ? "应急" : "Emergency",
    description: language === 'zh' 
      ? "灾情侦察、搜救定位、物资投送，快速响应突发事件"
      : "Disaster reconnaissance, search and rescue",
    image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=1200&q=80",
    icon: AlertTriangle,
    link: "/applications/emergency",
  },
  {
    id: "surveying",
    name: language === 'zh' ? "测绘" : "Surveying",
    description: language === 'zh' 
      ? "地形测绘、三维建模、工程勘察，厘米级精度作业"
      : "Terrain mapping, 3D modeling, centimeter precision",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    icon: MapPin,
    link: "/applications/surveying",
  },
];

export const ApplicationsSection = () => {
  const { language } = useLanguage();
  const applications = getApplicationsData(language);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="applications" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            {language === 'zh' ? '行业应用' : 'Industry Applications'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6">
            {language === 'zh' ? '多领域场景覆盖' : 'Multi-Domain Coverage'}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {language === 'zh' 
              ? '长凌无人机产品广泛应用于水利、交通、环保、电力、应急、测绘等多个行业领域'
              : 'CANI drones are widely used across water, traffic, environment, power, emergency, and surveying sectors'}
          </p>
        </motion.div>

        {/* Interactive Application Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Application List */}
          <div className="lg:col-span-1 space-y-4">
            {applications.map((app, index) => (
              <motion.button
                key={app.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveIndex(index)}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-500 group ${
                  activeIndex === index 
                    ? 'bg-accent/10 border-2 border-accent' 
                    : 'bg-card border border-accent/10 hover:border-accent/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-accent text-accent-foreground' 
                      : 'bg-accent/10 text-accent group-hover:bg-accent/20'
                  }`}>
                    <app.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold transition-colors ${
                      activeIndex === index ? 'text-accent' : 'text-foreground'
                    }`}>
                      {app.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {app.description}
                    </p>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-all duration-300 ${
                    activeIndex === index 
                      ? 'text-accent translate-x-0 opacity-100' 
                      : 'text-muted-foreground -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                  }`} />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right - Featured Image */}
          <motion.div 
            className="lg:col-span-2 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-card">
              {applications.map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={false}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    scale: activeIndex === index ? 1 : 1.1,
                  }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0"
                >
                  <img
                    src={app.image}
                    alt={app.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                    <div className="rounded-3xl bg-background/70 backdrop-blur-md border border-border p-6 md:p-8 max-w-2xl">
                      <h3 className="text-3xl md:text-4xl font-black text-foreground mb-3">
                        {app.name}
                      </h3>
                      <p className="text-lg text-muted-foreground mb-6">
                        {app.description}
                      </p>
                      <Link 
                        to={app.link}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors"
                      >
                        {language === 'zh' ? '了解详情' : 'Learn More'}
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {applications.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === index 
                      ? 'w-8 bg-accent' 
                      : 'w-2 bg-accent/30 hover:bg-accent/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link 
            to="/applications"
            className="inline-flex items-center gap-3 text-accent hover:text-accent/80 font-semibold text-lg group"
          >
            {language === 'zh' ? '查看全部应用案例' : 'View All Applications'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
