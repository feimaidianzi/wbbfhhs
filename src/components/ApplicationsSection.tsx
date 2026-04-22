import { useState } from "react";
import { ArrowRight, Droplets, Car, Leaf, Zap, AlertTriangle, MapPin } from "lucide-react";
import { LangLink } from "@/components/LangLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInViewLite } from "@/hooks/useInViewLite";
import waterConservationImg from "@/assets/seo/water-conservation.jpg";
import trafficCityImg from "@/assets/seo/traffic-city.jpg";
import forestEnvironmentImg from "@/assets/seo/forest-environment.jpg";
import powerGridImg from "@/assets/seo/power-grid-sunset.jpg";
import emergencyRescueImg from "@/assets/seo/emergency-rescue.jpg";
import surveyingMountainImg from "@/assets/seo/surveying-mountain.jpg";

export const ApplicationsSection = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const header = useInViewLite<HTMLDivElement>();
  const list = useInViewLite<HTMLDivElement>();
  const featured = useInViewLite<HTMLDivElement>();
  const cta = useInViewLite<HTMLDivElement>();

  const applications = [
    {
      id: "water",
      nameKey: "applications.water",
      descKey: "applications.water.desc",
      image: waterConservationImg,
      icon: Droplets,
      link: "/solutions/industrial-uav-water-conservancy",
    },
    {
      id: "traffic",
      nameKey: "applications.traffic",
      descKey: "applications.traffic.desc",
      image: trafficCityImg,
      icon: Car,
      link: "/solutions/industrial-uav-transportation-monitoring",
    },
    {
      id: "environment",
      nameKey: "applications.environment",
      descKey: "applications.environment.desc",
      image: forestEnvironmentImg,
      icon: Leaf,
      link: "/solutions/industrial-uav-environmental-monitoring",
    },
    {
      id: "power",
      nameKey: "applications.power",
      descKey: "applications.power.desc",
      image: powerGridImg,
      icon: Zap,
      link: "/applications/power-inspection",
    },
    {
      id: "emergency",
      nameKey: "applications.emergency",
      descKey: "applications.emergency.desc",
      image: emergencyRescueImg,
      icon: AlertTriangle,
      link: "/solutions/uav-firefighting-emergency-rescue",
    },
    {
      id: "surveying",
      nameKey: "applications.surveying",
      descKey: "applications.surveying.desc",
      image: surveyingMountainImg,
      icon: MapPin,
      link: "/solutions/industrial-uav-surveying-mapping",
    },
  ];

  return (
    <section id="applications" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div
          ref={header.ref}
          className={`reveal-init reveal-fade text-center mb-16 ${header.inView ? 'reveal-in' : ''}`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            {t('applications.section.tag')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6">
            {t('applications.section.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('applications.section.desc.prefix')}
            <LangLink to="/applications/power-inspection" className="text-accent hover:underline">{t('applications.section.keyword.power')}</LangLink>
            {t('applications.section.desc.sep1')}
            <LangLink to="/applications/firefighting" className="text-accent hover:underline">{t('applications.section.keyword.fire')}</LangLink>
            {t('applications.section.desc.suffix')}
          </p>
        </div>

        {/* Interactive Application Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Application List */}
          <div
            ref={list.ref}
            className={`reveal-init reveal-from-left lg:col-span-1 space-y-4 ${list.inView ? 'reveal-in' : ''}`}
          >
            {applications.map((app, index) => (
              <button
                key={app.id}
                onClick={() => setActiveIndex(index)}
                className={`reveal-child w-full text-left p-5 rounded-2xl transition-all duration-500 group ${
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
                      {t(app.nameKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {t(app.descKey)}
                    </p>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-all duration-300 ${
                    activeIndex === index
                      ? 'text-accent translate-x-0 opacity-100'
                      : 'text-muted-foreground -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                  }`} />
                </div>
              </button>
            ))}
          </div>

          {/* Right - Featured Image */}
          <div
            ref={featured.ref}
            className={`reveal-init reveal-from-right lg:col-span-2 relative ${featured.inView ? 'reveal-in' : ''}`}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-card">
              {applications.map((app, index) => (
                <div
                  key={app.id}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    activeIndex === index
                      ? 'opacity-100 scale-100 pointer-events-auto'
                      : 'opacity-0 scale-110 pointer-events-none'
                  }`}
                >
                  <img
                    src={app.image}
                    alt={`CANI ${t(app.nameKey)} - UAV Industry Application Scenario`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                    <div className="rounded-3xl bg-black/70 border border-white/20 p-6 md:p-8 max-w-2xl">
                      <h3 className="text-3xl md:text-4xl font-black text-white mb-3">
                        {t(app.nameKey)}
                      </h3>
                      <p className="text-lg text-white/70 mb-6">
                        {t(app.descKey)}
                      </p>
                      <LangLink
                        to={app.link}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors"
                      >
                        {t('applications.learnMore')}
                        <ArrowRight className="w-5 h-5" />
                      </LangLink>
                    </div>
                  </div>
                </div>
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
          </div>
        </div>

        {/* View All Link */}
        <div
          ref={cta.ref}
          className={`reveal-init reveal-fade text-center mt-12 ${cta.inView ? 'reveal-in' : ''}`}
        >
          <LangLink
            to="/applications"
            className="inline-flex items-center gap-3 text-accent hover:text-accent/80 font-semibold text-lg group"
          >
            {t('applications.viewAll')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </LangLink>
        </div>
      </div>
    </section>
  );
};
