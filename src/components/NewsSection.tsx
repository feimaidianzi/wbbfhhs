import { ArrowRight, ArrowUpRight } from "lucide-react";
import { LangLink } from "@/components/LangLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInViewLite } from "@/hooks/useInViewLite";
import fpvDroneImg from "@/assets/seo/fpv-drone-aerial.jpg";
import gimbalCameraImg from "@/assets/seo/gimbal-camera-drone.jpg";
import powerGridImg from "@/assets/seo/power-grid-sunset.jpg";

export const NewsSection = () => {
  const { t } = useLanguage();
  const grid = useInViewLite<HTMLDivElement>();

  const news = [
    {
      title: t('news.sample1.title'),
      date: t('news.sample1.date'),
      excerpt: t('news.sample1.excerpt'),
      image: fpvDroneImg,
      category: t('news.sample1.category')
    },
    {
      title: t('news.sample2.title'),
      date: t('news.sample2.date'),
      excerpt: t('news.sample2.excerpt'),
      image: gimbalCameraImg,
      category: t('news.sample2.category')
    },
    {
      title: t('news.sample3.title'),
      date: t('news.sample3.date'),
      excerpt: t('news.sample3.excerpt'),
      image: powerGridImg,
      category: t('news.sample3.category')
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-accent font-medium mb-2">
              {t('news.section.badge')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('news.section.title')}
            </h2>
          </div>
          <div>
            <LangLink
              to="/news"
              className="inline-flex items-center gap-2 text-foreground hover:text-accent font-medium group"
            >
              {t('news.section.viewAll')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </LangLink>
          </div>
        </div>

        {/* News Grid */}
        <div
          ref={grid.ref}
          className={`reveal-init reveal-fade grid grid-cols-1 md:grid-cols-3 gap-6 ${grid.inView ? 'reveal-in' : ''}`}
        >
          {news.map((item, index) => (
            <article key={index} className="reveal-child group cursor-pointer">
              <LangLink to="/news" className="block">
                <div className="aspect-[16/10] overflow-hidden rounded-xl mb-4 bg-muted">
                  <img
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium px-2.5 py-1 bg-accent/10 text-accent rounded-full">
                      {item.category}
                    </span>
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                    {item.excerpt}
                  </p>
                  <span className="inline-flex items-center text-sm text-foreground font-medium group-hover:text-accent transition-colors">
                    {t('news.section.readMore')}
                    <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </LangLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
