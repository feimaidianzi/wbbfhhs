import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Calendar, Tag, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

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
}

const CATEGORIES_ZH = ["全部", "公司新闻", "行业动态", "产品资讯", "技术分享"];
const CATEGORIES_EN = ["All", "Company News", "Industry Trends", "Product Updates", "Tech Insights"];

const News = () => {
  const { language } = useLanguage();
  const categories = language === 'zh' ? CATEGORIES_ZH : CATEGORIES_EN;
  
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('news_articles')
          .select('id, title, title_en, summary, summary_en, cover_image, category, published_at, created_at')
          .eq('is_published', true)
          .order('published_at', { ascending: false });

        if (error) throw error;
        setArticles(data || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // 获取当前语言的分类名
  const getCategoryForFilter = (cat: string) => {
    if (language === 'en') {
      const catMap: Record<string, string> = {
        'All': '全部',
        'Company News': '公司新闻',
        'Industry Trends': '行业动态',
        'Product Updates': '产品资讯',
        'Tech Insights': '技术分享',
      };
      return catMap[cat] || cat;
    }
    return cat;
  };

  // Filter by category
  const filteredByCategory = activeCategory === categories[0]
    ? articles 
    : articles.filter(a => a.category === getCategoryForFilter(activeCategory));

  // Filter by search
  const filteredArticles = searchTerm
    ? filteredByCategory.filter(a => {
        const title = language === 'en' && a.title_en ? a.title_en : a.title;
        const summary = language === 'en' && a.summary_en ? a.summary_en : a.summary;
        return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (summary && summary.toLowerCase().includes(searchTerm.toLowerCase()));
      })
    : filteredByCategory;

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const currentNews = filteredArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={language === 'zh' ? "新闻中心" : "News Center"}
        description={language === 'zh' 
          ? "飞迈科技新闻中心，获取最新无人机行业资讯、公司新闻、产品发布和技术分享。"
          : "Feimai Technology News Center. Get the latest drone industry news, company updates, product releases and technical insights."}
        keywords={language === 'zh' 
          ? "无人机新闻,飞迈科技新闻,无人机行业资讯,无人机技术分享"
          : "drone news,Feimai technology news,drone industry updates,drone technical insights"}
        url="/news"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[250px] md:h-[300px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {language === 'zh' ? "新闻中心" : "News Center"}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90">
                {language === 'zh' ? "获取最前沿的无人机行业资讯" : "Get the Latest Drone Industry Updates"}
              </p>
            </div>
          </div>
        </section>

        {/* Categories & Search */}
        <section className="py-6 bg-secondary border-b border-border">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === cat
                        ? "bg-accent text-accent-foreground"
                        : "bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
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
                  placeholder={language === 'zh' ? "搜索文章..." : "Search articles..."}
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
                        src={news.cover_image || "https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=600"}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=600";
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
                            {language === 'en' ? {
                              '公司新闻': 'Company News',
                              '行业动态': 'Industry Trends',
                              '产品资讯': 'Product Updates',
                              '技术分享': 'Tech Insights',
                            }[news.category] || news.category : news.category}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-card-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                        {language === 'en' && news.title_en ? news.title_en : news.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {language === 'en' && news.summary_en ? news.summary_en : news.summary}
                      </p>
                      <span className="inline-flex items-center text-accent hover:text-orange-light font-medium">
                        {language === 'zh' ? "阅读更多" : "Read More"}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {language === 'zh' ? '暂无文章' : 'No articles found'}
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
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default News;
