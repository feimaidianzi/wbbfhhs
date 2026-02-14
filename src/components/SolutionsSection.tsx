import { ArrowRight, Zap } from "lucide-react";
import { LangLink } from "@/components/LangLink";
import { useLanguage } from "@/contexts/LanguageContext";

export const SolutionsSection = () => {
  const { t } = useLanguage();

  const solutions = [
    {
      title: t('solutionsSection.solution1.title'),
      description: t('solutionsSection.solution1.desc'),
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
      link: "/applications/power-inspection",
      stats: t('solutionsSection.solution1.stats'),
    },
    {
      title: t('solutionsSection.solution2.title'),
      description: t('solutionsSection.solution2.desc'),
      image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
      link: "/applications/logistics",
      stats: t('solutionsSection.solution2.stats'),
    },
    {
      title: t('solutionsSection.solution3.title'),
      description: t('solutionsSection.solution3.desc'),
      image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=600&q=80",
      link: "/applications/firefighting",
      stats: t('solutionsSection.solution3.stats'),
    },
    {
      title: t('solutionsSection.solution4.title'),
      description: t('solutionsSection.solution4.desc'),
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
      link: "/solutions/industrial-uav-environmental-monitoring",
      stats: t('solutionsSection.solution4.stats'),
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-secondary relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dots opacity-20" />
      
      <div className="container-custom relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-accent" />
            <span className="text-accent text-sm tracking-widest uppercase font-medium">
              {t('solutionsSection.badge')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gradient mb-4">
            {t('solutionsSection.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('solutionsSection.subtitle')}
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((solution, index) => (
            <LangLink
              key={index}
              to={solution.link}
              className="group relative h-[280px] md:h-[320px] rounded-xl overflow-hidden glass-card border border-accent/10 hover:border-accent/40 transition-all duration-500"
            >
              <img
                src={solution.image}
                alt={`CANI ${solution.title} - Industrial UAV Application`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="inline-block px-3 py-1 bg-black/70 border border-white/20 text-white text-sm font-medium rounded-full mb-3">
                  {solution.stats}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 transition-colors duration-300">
                  {solution.title}
                </h3>
                <p className="text-white/70 mb-4 line-clamp-2 text-sm md:text-base">
                  {solution.description}
                </p>
                <div className="flex items-center text-white text-sm font-medium">
                  {t('solutionsSection.learnMore')}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </LangLink>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <LangLink
            to="/applications/power-inspection"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg shadow-neon hover:shadow-neon-intense transition-all duration-300 hover:scale-105 group min-h-[44px] min-w-[44px]"
          >
            {t('solutionsSection.viewAll')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </LangLink>
        </div>
      </div>
    </section>
  );
};
