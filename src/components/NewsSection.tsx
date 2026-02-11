import { ArrowRight, ArrowUpRight } from "lucide-react";
import { LangLink } from "@/components/LangLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export const NewsSection = () => {
  const { t } = useLanguage();

  const news = [
    {
      title: t('news.sample1.title'),
      date: t('news.sample1.date'),
      excerpt: t('news.sample1.excerpt'),
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
      category: t('news.sample1.category')
    },
    {
      title: t('news.sample2.title'),
      date: t('news.sample2.date'),
      excerpt: t('news.sample2.excerpt'),
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&q=80",
      category: t('news.sample2.category')
    },
    {
      title: t('news.sample3.title'),
      date: t('news.sample3.date'),
      excerpt: t('news.sample3.excerpt'),
      image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&q=80",
      category: t('news.sample3.category')
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-accent font-medium mb-2">
              {t('news.section.badge')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('news.section.title')}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <LangLink 
              to="/news"
              className="inline-flex items-center gap-2 text-foreground hover:text-accent font-medium group"
            >
              {t('news.section.viewAll')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </LangLink>
          </motion.div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <LangLink to="/news" className="block">
                <div className="aspect-[16/10] overflow-hidden rounded-xl mb-4">
                  <img
...
                  </span>
                </div>
              </LangLink>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
