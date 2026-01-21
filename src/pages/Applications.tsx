import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Truck, Shield, Leaf, Flame, Link2, Lightbulb, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Applications = () => {
  const { language } = useLanguage();

  const applications = language === 'zh' ? [
    {
      name: "电力巡检",
      description: "无人机智能巡检技术，为电力行业提供安全高效的输电线路巡检、变电站巡检、光伏电站检测解决方案。",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
      href: "/applications/power-inspection",
      icon: Zap,
      stats: ["效率提升80%", "故障识别率99%"],
    },
    {
      name: "物流配送",
      description: "无人机物流配送技术，打破传统物流边界，实现偏远地区配送、应急物资投送、城市末端配送。",
      image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&q=80",
      href: "/applications/logistics",
      icon: Truck,
      stats: ["配送半径30km", "载重可达50kg"],
    },
    {
      name: "军事应用",
      description: "专业军用无人机系统，提供侦察监视、通信中继、目标定位等军事应用服务。",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
      href: "/applications/military",
      icon: Shield,
      stats: ["全天候作业", "高隐蔽性"],
    },
    {
      name: "环保监测",
      description: "无人机环境监测技术，守护绿水青山，提供大气监测、水环境监测、生态调查服务。",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      href: "/applications/environment",
      icon: Leaf,
      stats: ["覆盖面积广", "实时数据"],
    },
    {
      name: "消防应急",
      description: "无人机消防应急技术，为生命安全保驾护航，提供火情侦察、通信保障、灭火投弹服务。",
      image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=800&q=80",
      href: "/applications/firefighting",
      icon: Flame,
      stats: ["快速响应", "高空作业"],
    },
    {
      name: "系留应用",
      description: "系留无人机空中平台，24小时不间断持续作业，提供应急通信、安保监控、边境监视服务。",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
      href: "/applications/tethered",
      icon: Link2,
      stats: ["续航24小时", "高度200米"],
    },
    {
      name: "解决方案",
      description: "从需求到落地，为您提供完整的无人机行业应用解决方案，包括方案设计、设备集成、培训服务和售后支持。",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      href: "/applications/solutions",
      icon: Lightbulb,
      stats: ["定制化方案", "全程服务"],
    },
  ] : [
    {
      name: "Power Inspection",
      description: "Drone intelligent inspection technology, providing safe and efficient transmission line inspection, substation inspection, and solar power plant detection solutions.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
      href: "/applications/power-inspection",
      icon: Zap,
      stats: ["80% Efficiency Boost", "99% Fault Detection"],
    },
    {
      name: "Logistics",
      description: "Drone logistics delivery technology, breaking traditional logistics boundaries, enabling remote area delivery, emergency material delivery, and urban last-mile delivery.",
      image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&q=80",
      href: "/applications/logistics",
      icon: Truck,
      stats: ["30km Radius", "Up to 50kg Payload"],
    },
    {
      name: "Military",
      description: "Professional military drone systems, providing reconnaissance, communication relay, target positioning and other military application services.",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
      href: "/applications/military",
      icon: Shield,
      stats: ["All-Weather", "High Stealth"],
    },
    {
      name: "Environmental",
      description: "Drone environmental monitoring technology, protecting nature, providing atmospheric monitoring, water environment monitoring, and ecological survey services.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      href: "/applications/environment",
      icon: Leaf,
      stats: ["Wide Coverage", "Real-time Data"],
    },
    {
      name: "Firefighting",
      description: "Drone firefighting and emergency technology, safeguarding life and safety, providing fire reconnaissance, communication support, and fire suppression services.",
      image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=800&q=80",
      href: "/applications/firefighting",
      icon: Flame,
      stats: ["Rapid Response", "High Altitude"],
    },
    {
      name: "Tethered",
      description: "Tethered drone aerial platform, 24-hour continuous operation, providing emergency communication, security monitoring, and border surveillance services.",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
      href: "/applications/tethered",
      icon: Link2,
      stats: ["24h Endurance", "200m Altitude"],
    },
    {
      name: "Solutions",
      description: "From requirements to implementation, providing complete drone industry application solutions, including solution design, equipment integration, training services and after-sales support.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      href: "/applications/solutions",
      icon: Lightbulb,
      stats: ["Custom Solutions", "Full Service"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={language === 'zh' ? "行业应用" : "Industry Applications"}
        description={language === 'zh' 
          ? "长凌科技无人机行业应用解决方案，覆盖电力巡检、物流配送、军事应用、环保监测、消防应急、系留应用等多个领域。"
          : "CANI Technology drone industry application solutions, covering power inspection, logistics delivery, military applications, environmental monitoring, firefighting emergency, tethered applications and more."}
        keywords={language === 'zh' 
          ? "无人机行业应用,电力巡检,物流无人机,军事无人机,环保监测,消防应急,系留无人机"
          : "drone industry applications,power inspection,logistics drone,military drone,environmental monitoring,firefighting emergency,tethered drone"}
        url="/applications"
      />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80)" }} />
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="container-custom relative z-10 text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-background/70 backdrop-blur-md border border-border text-accent text-sm font-medium mb-6">
                {language === 'zh' ? '行业解决方案' : 'Industry Solutions'}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6"
            >
              <span className="inline-block px-6 py-4 rounded-3xl bg-background/70 backdrop-blur-md border border-border">
                {language === 'zh' ? '行业应用' : 'Industry Applications'}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              <span className="inline-block px-6 py-4 rounded-3xl bg-background/70 backdrop-blur-md border border-border">
                {language === 'zh' 
                  ? '长凌无人机广泛应用于多个行业领域，提供专业化解决方案'
                  : 'CANI drones are widely used in multiple industries, providing professional solutions'}
              </span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
          </motion.div>
        </section>

        {/* Applications Grid */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {applications.map((app, index) => {
                const Icon = app.icon;
                return (
                  <motion.div key={index} variants={itemVariants}>
                    <Link
                      to={app.href}
                      className="group block h-full bg-card rounded-2xl overflow-hidden border border-accent/10 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2"
                    >
                      {/* Image */}
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={app.image}
                          alt={app.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Icon Badge */}
                        <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-accent/90 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-accent-foreground" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                          {app.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {app.description}
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {app.stats.map((stat, i) => (
                            <span key={i} className="text-xs px-3 py-1 bg-accent/10 text-accent rounded-full font-medium">
                              {stat}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center text-accent font-medium group-hover:translate-x-1 transition-transform">
                          {language === 'zh' ? "了解详情" : "Learn More"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-cyan-500/10 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="container-custom relative text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
                {language === 'zh' ? '定制您的行业解决方案' : 'Customize Your Industry Solution'}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {language === 'zh' 
                  ? '长凌科技拥有丰富的行业经验，可根据您的具体需求提供定制化解决方案'
                  : 'CANI Technology has rich industry experience and can provide customized solutions according to your specific needs'}
              </p>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-semibold rounded-full group">
                  {language === 'zh' ? '立即咨询' : 'Contact Us'}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Applications;
