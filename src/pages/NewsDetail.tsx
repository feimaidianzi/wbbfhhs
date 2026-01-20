import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { SEO, createArticleStructuredData } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { sanitizeHtml } from "@/lib/sanitize";

const DEFAULT_IMAGE = "https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=800";

interface NewsArticle {
  id: string;
  title: string;
  title_en: string | null;
  summary: string | null;
  summary_en: string | null;
  content: string;
  content_en: string | null;
  cover_image: string | null;
  author_name: string | null;
  category: string | null;
  published_at: string | null;
  created_at: string;
}

interface RelatedArticle {
  id: string;
  title: string;
  summary: string | null;
  cover_image: string | null;
  published_at: string | null;
  category: string | null;
}

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle broken images in article content
  const handleContentImageErrors = useCallback(() => {
    if (!contentRef.current) return;
    
    const images = contentRef.current.querySelectorAll('img');
    images.forEach((img) => {
      // Skip if already handled
      if (img.dataset.errorHandled === 'true') return;
      
      img.onerror = () => {
        img.dataset.errorHandled = 'true';
        img.src = DEFAULT_IMAGE;
        img.alt = '文章配图';
      };
      
      // Also check if image is already broken (for cached broken images)
      if (img.complete && img.naturalWidth === 0) {
        img.src = DEFAULT_IMAGE;
        img.alt = '文章配图';
        img.dataset.errorHandled = 'true';
      }
    });
  }, []);

  // Apply image error handlers after content renders
  useEffect(() => {
    if (article && contentRef.current) {
      // Small delay to ensure DOM is fully rendered
      const timer = setTimeout(handleContentImageErrors, 100);
      return () => clearTimeout(timer);
    }
  }, [article, language, handleContentImageErrors]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('news_articles')
          .select('*')
          .eq('id', id)
          .eq('is_published', true)
          .single();

        if (error) throw error;
        setArticle(data);

        // Fetch related articles
        if (data?.category) {
          const { data: related } = await supabase
            .from('news_articles')
            .select('id, title, summary, cover_image, published_at, category')
            .eq('is_published', true)
            .eq('category', data.category)
            .neq('id', id)
            .order('published_at', { ascending: false })
            .limit(3);

          setRelatedArticles(related || []);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16 md:pt-20">
          <div className="container-custom py-12">
            <Skeleton className="h-8 w-32 mb-6" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="aspect-video w-full mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16 md:pt-20">
          <div className="container-custom py-24 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {language === 'zh' ? '文章不存在' : 'Article Not Found'}
            </h1>
            <p className="text-muted-foreground mb-8">
              {language === 'zh' ? '您访问的文章可能已被删除或不存在' : 'The article you are looking for may have been deleted or does not exist'}
            </p>
            <Link to="/news">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === 'zh' ? '返回新闻列表' : 'Back to News'}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const articleStructuredData = createArticleStructuredData({
    title: article.title,
    description: article.summary || '',
    image: article.cover_image || 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80',
    datePublished: article.published_at || article.created_at,
  });

  return (
    <div className="min-h-screen">
      <SEO
        title={article.title}
        description={article.summary || article.title}
        url={`/news/${article.id}`}
        image={article.cover_image || undefined}
        structuredData={articleStructuredData}
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        {article.cover_image && (
          <section className="relative h-[300px] md:h-[400px] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${article.cover_image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>
          </section>
        )}

        {/* Article Content */}
        <article className="container-custom py-8 md:py-12">
          {/* Back Button */}
          <Link to="/news" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'zh' ? '返回新闻列表' : 'Back to News'}
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            {article.category && (
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
                <Tag className="w-3 h-3 mr-1" />
                {language === 'en' ? {
                  '公司新闻': 'Company News',
                  '行业动态': 'Industry Trends',
                  '产品资讯': 'Product Updates',
                  '技术分享': 'Tech Insights',
                }[article.category] || article.category : article.category}
              </Badge>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {language === 'en' && article.title_en ? article.title_en : article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              {article.published_at && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(article.published_at)}
                </span>
              )}
              {article.author_name && (
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {article.author_name}
                </span>
              )}
            </div>
            {(article.summary || article.summary_en) && (
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {language === 'en' && article.summary_en ? article.summary_en : article.summary}
              </p>
            )}
          </header>

          {/* Article Body */}
          <div 
            ref={contentRef}
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:text-foreground 
              prose-p:text-muted-foreground 
              prose-a:text-accent hover:prose-a:text-orange-light
              prose-strong:text-foreground
              prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(
              language === 'en' && article.content_en ? article.content_en : article.content
            ) }}
          />
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-secondary py-12">
            <div className="container-custom">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {language === 'zh' ? '相关文章' : 'Related Articles'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link 
                    key={related.id} 
                    to={`/news/${related.id}`}
                    className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
                  >
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={related.cover_image || "https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=600"}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=600";
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-card-foreground line-clamp-2 group-hover:text-accent transition-colors">
                        {related.title}
                      </h3>
                      {related.published_at && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {formatDate(related.published_at)}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default NewsDetail;
