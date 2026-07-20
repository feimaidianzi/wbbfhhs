import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Calendar, Tag, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { TechKeywordsBadge } from "@/components/news/TechKeywordsBadge";
import { NewsCategorySEOBlock } from "@/components/news/NewsCategorySEOBlock";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { LangLink as Link } from "@/components/LangLink";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { getUrlForLanguage } from "@/utils/seoConfig";
import newsMediaImg from "@/assets/seo/news-media.jpg";
import newsPlaceholderImg from "@/assets/seo/news-placeholder.jpg";

interface NewsArticle {
  id: string;
  title: string;
  title_en: string | null;
  summary: string | null;
  summary_en: string | null;
  cover_image: string | null;
  category: string | null;
  published_at: string | null;
  created_at: string;
  keywords: string[] | null;
}

// 'company' & 'industry' categories are temporarily hidden from public site
const CATEGORY_KEYS = ['all', 'tech'] as const;
const HIDDEN_DB_CATEGORIES = ['公司新闻', '行业动态'];
const HIDDEN_CATEGORY_KEYS = ['company', 'industry'];

// Map database category values to category keys
const DB_CATEGORY_MAP: Record<string, string> = {
  '公司新闻': 'company',
  '行业动态': 'industry',
  '技术分享': 'tech',
};

// Category SEO keys are now managed via i18n (excluding hidden categories)
const CATEGORY_SEO_KEYS = ['tech'] as const;

const News = () => {
  const { t, baseLang } = useLanguage();
  const [searchParams] = useSearchParams();
  
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const rawCategory = searchParams.get('category') || 'all';
  // Hidden categories redirect to 'all'
  const initialCategory = HIDDEN_CATEGORY_KEYS.includes(rawCategory) ? 'all' : rawCategory;
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Get translated category label
  const getCategoryLabel = (key: string) => t(`news.category.${key}`);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('news_articles')
          .select('id, title, title_en, summary, summary_en, cover_image, category, published_at, created_at, keywords')
          .eq('is_published', true)
          .order('published_at', { ascending: false });

        if (error) throw error;
        const visible = (data || []).filter(a => !a.category || !HIDDEN_DB_CATEGORIES.includes(a.category));
        setArticles(visible);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filter by category
  const filteredByCategory = activeCategory === 'all'
    ? articles 
    : articles.filter(a => {
        const articleCategoryKey = a.category ? DB_CATEGORY_MAP[a.category] : null;
        return articleCategoryKey === activeCategory;
      });

  // Filter by search
  const filteredArticles = searchTerm
    ? filteredByCategory.filter(a => {
        const title = baseLang === 'en' && a.title_en ? a.title_en : a.title;
        const summary = baseLang === 'en' && a.summary_en ? a.summary_en : a.summary;
        return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (summary && summary.toLowerCase().includes(searchTerm.toLowerCase()));
      })
    : filteredByCategory;

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const currentNews = filteredArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
    // Update URL query param for canonical purposes
    const url = new URL(window.location.href);
    if (cat === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', cat);
    }
    window.history.replaceState({}, '', url.toString());
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(baseLang === 'zh' ? 'zh-CN' : 'en-US');
  };

  // Get translated category for display
  const getDisplayCategory = (dbCategory: string | null) => {
    if (!dbCategory) return null;
    const key = DB_CATEGORY_MAP[dbCategory];
    return key ? getCategoryLabel(key) : dbCategory;
  };

  // Breadcrumb JSON-LD
  const isSpecificCategory = activeCategory !== 'all' && CATEGORY_SEO_KEYS.includes(activeCategory as any);
  const activeCatLabel = isSpecificCategory ? t(`news.seo.${activeCategory}.title`).split(' - ')[0] : null;

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('breadcrumb.home'), item: getUrlForLanguage(baseLang === 'en' ? 'en' : 'zh', '/') },
      { '@type': 'ListItem', position: 2, name: t('news.page.title'), item: getUrlForLanguage(baseLang === 'en' ? 'en' : 'zh', '/news') },
      ...(activeCatLabel ? [{ '@type': 'ListItem', position: 3, name: activeCatLabel, item: getUrlForLanguage(baseLang === 'en' ? 'en' : 'zh', `/news?category=${activeCategory}`) }] : []),
    ],
  };

  const newsCollectionData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('news.page.title'),
    description: t('news.page.metaDesc'),
    url: 'https://caniuav.com/news',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.slice(0, 10).map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: { '@type': 'Article', headline: baseLang === 'en' && a.title_en ? a.title_en : a.title, description: baseLang === 'en' && a.summary_en ? a.summary_en : a.summary, datePublished: a.published_at || a.created_at, image: a.cover_image },
      })),
    },
  };

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={
          isSpecificCategory
            ? t(`news.seo.${activeCategory}.title`)
            : t('news.page.title')
        }
        description={
          isSpecificCategory
            ? t(`news.seo.${activeCategory}.desc`)
            : t('news.page.metaDesc')
        }
        keywords={t('news.page.metaKeywords')}
        path={isSpecificCategory ? `/news?category=${activeCategory}` : '/news'}
        structuredData={[breadcrumbData, newsCollectionData]}
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[250px] md:h-[300px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${newsMediaImg})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('news.page.title')}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90">
                {t('news.page.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Categories & Search */}
        <section className="py-6 bg-secondary border-b border-border">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {CATEGORY_KEYS.map((key) => (
                  <button
                    key={key}
                    onClick={() => handleCategoryChange(key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === key
                        ? "bg-accent text-accent-foreground"
                        : "bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {getCategoryLabel(key)}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder={t('news.search.placeholder')}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-12 bg-background">
          <div className="container-custom">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-card rounded-xl overflow-hidden shadow-card">
                    <Skeleton className="aspect-video" />
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : currentNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentNews.map((news) => (
                  <Link
                    key={news.id}
                    to={`/news/${news.id}`}
                    className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
                  >
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={news.cover_image || newsPlaceholderImg}
                        alt={baseLang === 'en' && news.title_en ? news.title_en : news.title}
                        width={600}
                        height={338}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = newsPlaceholderImg;
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(news.published_at || news.created_at)}
                        </span>
                        {news.category && (
                          <span className="flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            {getDisplayCategory(news.category)}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-card-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                        {baseLang === 'en' && news.title_en ? news.title_en : news.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                        {baseLang === 'en' && news.summary_en ? news.summary_en : news.summary}
                      </p>
                      {/* Tech Keywords */}
                      {news.keywords && news.keywords.length > 0 && (
                        <div className="mb-3">
                          <TechKeywordsBadge keywords={news.keywords} max={3} />
                        </div>
                      )}
                      <span className="inline-flex items-center text-accent hover:text-orange-light font-medium">
                        {t('news.readMore')}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {t('news.noArticles')}
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-card shadow-sm disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium ${
                      currentPage === i + 1
                        ? "bg-accent text-accent-foreground"
                        : "bg-card text-foreground hover:bg-accent/10"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-card shadow-sm disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Category SEO Content Block */}
        {activeCategory !== 'all' && (
          <NewsCategorySEOBlock category={activeCategory} />
        )}
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default News;
