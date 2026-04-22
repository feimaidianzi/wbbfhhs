import { MotionConfig, m } from "@/components/MotionLite";
import { ArrowRight, Sparkles, Zap, Radio, Camera, Gamepad2, Cpu } from "lucide-react";
import { LangLink } from "@/components/LangLink";
import { useLanguage } from "@/contexts/LanguageContext";
import digitalFpvImg from "@/assets/products/digital-fpv-wifilink2.jpg";
import vtxImg from "@/assets/products/vtx-2.5w.webp";
import fcEscImg from "@/assets/products/fc-esc-stack.webp";
import gimbalImg from "@/assets/products/gimbal-k40t.webp";
import elrsImg from "@/assets/products/elrs-915-diversity.jpg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const ProductsSection = () => {
  const { t } = useLanguage();

  const categories = [
    {
      name: t('productsSection.category.digitalFpv'),
      description: t('productsSection.category.digitalFpv.desc'),
      subtitle: t('productsSection.category.digitalFpv.subtitle'),
      image: digitalFpvImg,
      link: "/products/accessories/digital-fpv",
      icon: Radio,
      isHot: true,
    },
    {
      name: t('productsSection.category.vtx'),
      description: t('productsSection.category.vtx.desc'),
      subtitle: t('productsSection.category.vtx.subtitle'),
      image: vtxImg,
      link: "/products/accessories/vtx-vrx",
      icon: Zap,
    },
    {
      name: t('productsSection.category.fc'),
      description: t('productsSection.category.fc.desc'),
      subtitle: t('productsSection.category.fc.subtitle'),
      image: fcEscImg,
      link: "/products/accessories/fc-esc",
      icon: Cpu,
    },
    {
      name: t('productsSection.category.gimbal'),
      description: t('productsSection.category.gimbal.desc'),
      subtitle: t('productsSection.category.gimbal.subtitle'),
      image: gimbalImg,
      link: "/products/accessories/gimbal",
      icon: Camera,
    },
    {
      name: t('productsSection.category.elrs'),
      description: t('productsSection.category.elrs.desc'),
      subtitle: t('productsSection.category.elrs.subtitle'),
      image: elrsImg,
      link: "/products/accessories/elrs",
      icon: Gamepad2,
      isNew: true,
    },
  ];

  return (
    <MotionConfig>
    <section id="products" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,211,238,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(14,165,233,0.05),transparent_50%)]" />
      
      <div className="container-custom relative">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            {t('productsSection.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6">
            {t('productsSection.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
            {t('productsSection.subtitle')}
          </p>
          <p className="text-muted-foreground text-base max-w-3xl mx-auto">
            {t('productsSection.seoSubtitle')}
          </p>
        </m.div>

        {/* Products Grid - Asymmetric Layout */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {/* Featured Large Card */}
          <m.div variants={itemVariants} className="md:col-span-2 lg:col-span-2 lg:row-span-2">
            <LangLink to={categories[0].link} className="group block h-full">
              <div className="relative h-full min-h-[400px] lg:min-h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-accent/20 to-cyan-500/10 border border-accent/20">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                      src={categories[0].image}
                      alt={`CANI ${categories[0].name} - Industrial UAV HD Digital Video Transmission System`}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                </div>
                
                {/* Hot Badge */}
                {categories[0].isHot && (
                  <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-bold">
                    <Sparkles className="w-4 h-4" />
                    {t('productsSection.hot')}
                  </div>
                )}
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <div className="rounded-3xl bg-black/70 border border-white/20 p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                        {(() => { const Icon = categories[0].icon; return <Icon className="w-6 h-6 text-white" />; })()}
                      </div>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-2">
                      {categories[0].name}
                    </h3>
                    <p className="text-lg text-white/70 mb-4">
                      {categories[0].description}
                    </p>
                    <div className="flex items-center gap-2 text-white font-semibold">
                      {t('productsSection.exploreNow')}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </LangLink>
          </m.div>

          {/* Small Cards */}
          {categories.slice(1).map((product, index) => (
            <m.div key={index} variants={itemVariants}>
              <LangLink to={product.link} className="group block h-full">
                <div className="relative h-full min-h-[280px] rounded-2xl overflow-hidden bg-card border border-accent/10 hover:border-accent/40 transition-all duration-500">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={product.image}
                      alt={`CANI ${product.name} - Professional UAV Component`}
                      width={400}
                      height={280}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  
                  {/* New Badge */}
                  {product.isNew && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-bold">
                      <Sparkles className="w-3 h-3" />
                      {t('productsSection.new')}
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="rounded-2xl bg-black/70 border border-white/20 p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                          {(() => { const Icon = product.icon; return <Icon className="w-5 h-5 text-white" />; })()}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-white/70 mb-3">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm font-medium">{product.subtitle}</span>
                        <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              </LangLink>
            </m.div>
          ))}
        </m.div>

        {/* View All Button */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <LangLink to="/products">
            <button className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-accent/30 hover:border-accent hover:bg-accent/5 text-foreground font-semibold transition-all duration-300 min-h-[44px] min-w-[44px]">
              {t('productsSection.viewAll')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </LangLink>
        </m.div>
      </div>
    </section>
    </MotionConfig>
  );
};
