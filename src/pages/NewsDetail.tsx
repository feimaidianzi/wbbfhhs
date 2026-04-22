import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { LangLink as Link } from "@/components/LangLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { getUrlForLanguage } from "@/utils/seoConfig";
import { buildOgImageUrl } from "@/utils/ogImage";
import { supabase } from "@/integrations/supabase/client";
import { sanitizeHtml } from "@/lib/sanitize";
import { RelatedProductCard } from "@/components/news/RelatedProductCard";
import { ArticleCTA } from "@/components/news/ArticleCTA";
import { TechKeywordsBadge } from "@/components/news/TechKeywordsBadge";
import { injectProductLinks, detectMentionedProducts, type ProductLinkEntry } from "@/utils/productAutoLinker";
import { TechSummaryBlock } from "@/components/news/TechSummaryBlock";

const DEFAULT_IMAGE = "/placeholder.svg";

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
  keywords: string[] | null;
}

interface RelatedArticle {
  id: string;
  title: string;
  title_en: string | null;
  summary: string | null;
  cover_image: string | null;
  published_at: string | null;
  category: string | null;
}

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, baseLang, language } = useLanguage();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
  const [mentionedProducts, setMentionedProducts] = useState<ProductLinkEntry[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleContentImageErrors = useCallback(() => {
    if (!contentRef.current) return;
    
    const images = contentRef.current.querySelectorAll('img');
    images.forEach((img) => {
      if (img.dataset.errorHandled === 'true') return;
      
      img.onerror = () => {
        img.dataset.errorHandled = 'true';
        img.src = DEFAULT_IMAGE;
        img.alt = t('news.detail.imageAlt');
      };
      
      if (img.complete && img.naturalWidth === 0) {
        img.src = DEFAULT_IMAGE;
        img.alt = t('news.detail.imageAlt');
        img.dataset.errorHandled = 'true';
      }
    });
  }, [t]);

  useEffect(() => {
    if (article && contentRef.current) {
      const timer = setTimeout(handleContentImageErrors, 100);
      return () => clearTimeout(timer);
    }
  }, [article, handleContentImageErrors]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('news_articles')
          .select('id, title, title_en, summary, summary_en, content, content_en, cover_image, author_name, category, published_at, created_at, keywords')
          .eq('id', id)
          .eq('is_published', true)
          .single();

        if (error) throw error;
        setArticle(data);

        // Detect mentioned products from content
        if (data) {
          const rawContent = baseLang === 'en' && data.content_en ? data.content_en : data.content;
          const titleContent = baseLang === 'en' && data.title_en ? data.title_en : data.title;
          const products = detectMentionedProducts(rawContent + ' ' + titleContent + ' ' + (data.summary || ''));
          setMentionedProducts(products);
        }

        if (data?.category) {
          const { data: related } = await supabase
            .from('news_articles')
            .select('id, title, title_en, summary, cover_image, published_at, category')
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
  }, [id, baseLang]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(baseLang === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryLabel = (category: string | null) => {
    if (!category) return null;
    const categoryMap: Record<string, string> = {
      '公司新闻': 'company',
      '行业动态': 'industry',
      '技术分享': 'tech',
    };
    const key = categoryMap[category];
    return key ? t(`news.category.${key}`) : category;
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
              {t('news.notFound.title')}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t('news.notFound.message')}
            </p>
            <Link to="/news">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('news.notFound.back')}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Determine schema type based on category
  const schemaType = article.category === '技术分享' ? 'TechArticle' : 'Article';
  
  // Build additionalProperty array from keywords for GEO
  const additionalProperties = (article.keywords || []).map(kw => {
    // Detect if keyword contains a numeric value
    const numMatch = kw.match(/([\d.]+)\s*([A-Za-z%]+)?/);
    if (numMatch) {
      return {
        '@type': 'PropertyValue',
        name: kw.replace(numMatch[0], '').trim() || kw,
        value: numMatch[1],
        ...(numMatch[2] ? { unitText: numMatch[2] } : {}),
      };
    }
    return { '@type': 'PropertyValue', name: kw, value: kw };
  });

  const articleStructuredData: any = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    headline: baseLang === 'en' && article.title_en ? article.title_en : article.title,
    description: baseLang === 'en' && article.summary_en ? article.summary_en : (article.summary || ''),
    image: article.cover_image || '/og-image.png',
    datePublished: article.published_at || article.created_at,
    dateModified: article.published_at || article.created_at,
    inLanguage: language === 'zh' ? 'zh-CN' : language,
    author: { '@type': 'Organization', name: 'CANI' },
    publisher: {
      '@type': 'Organization',
      name: t('acc.cameradetail.k454'),
      logo: { '@type': 'ImageObject', url: 'https://www.caniuav.com/logo.png' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.caniuav.com/news/${article.id}`,
    },
    // GEO: inject keywords + additionalProperty for AI search engines
    ...(article.keywords && article.keywords.length > 0 && {
      keywords: article.keywords.join(', '),
    }),
    ...(additionalProperties.length > 0 && {
      additionalProperty: additionalProperties,
    }),
    // Product mentions as schema "mentions"
    ...(mentionedProducts.length > 0 && {
      mentions: mentionedProducts.map(p => ({
        '@type': 'Product',
        name: baseLang === 'en' ? p.titleEn : p.titleZh,
        url: `https://www.caniuav.com${p.url}`,
      })),
    }),
  };

  // Extract FAQ from content
  const faqRegex = /<details>\s*<summary>(.*?)<\/summary>\s*<p>(.*?)<\/p>\s*<\/details>/gs;
  const faqs: Array<{question: string; answer: string}> = [];
  let faqMatch;
  const rawContent = baseLang === 'en' && article.content_en ? article.content_en : article.content;
  while ((faqMatch = faqRegex.exec(rawContent)) !== null) {
    faqs.push({ question: faqMatch[1].replace(/<[^>]*>/g, ''), answer: faqMatch[2].replace(/<[^>]*>/g, '') });
  }

  // Breadcrumb JSON-LD for detail page
  const detailBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('breadcrumb.home'), item: getUrlForLanguage(baseLang === 'en' ? 'en' : 'zh', '/') },
      { '@type': 'ListItem', position: 2, name: t('breadcrumb.news'), item: getUrlForLanguage(baseLang === 'en' ? 'en' : 'zh', '/news') },
      { '@type': 'ListItem', position: 3, name: baseLang === 'en' && article.title_en ? article.title_en : article.title },
    ],
  };

  const allStructuredData: any[] = [articleStructuredData, detailBreadcrumb];
  if (faqs.length > 0) {
    allStructuredData.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
  }

  // Process content with auto-links
  const { html: linkedContent } = injectProductLinks(rawContent, baseLang);
  const hasSidebar = mentionedProducts.length > 0 || (article.keywords && article.keywords.length > 0);

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={baseLang === 'en' && article.title_en ? article.title_en : article.title}
        description={baseLang === 'en' && article.summary_en ? article.summary_en : (article.summary || article.title)}
        path={`/news/${article.id}`}
        image={article.cover_image || buildOgImageUrl({
          title: baseLang === 'en' && article.title_en ? article.title_en : article.title,
          subtitle: (baseLang === 'en' && article.summary_en ? article.summary_en : article.summary)?.slice(0, 140) || '',
          category: article.category || 'News',
          brand: 'CANI Technology',
        })}
        type="article"
        structuredData={allStructuredData}
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
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
            </div>
          </section>
        )}

        {/* Article Content with Sidebar */}
        <div className="container-custom py-8 md:py-12">
          {/* Back Button */}
          <Link to="/news" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('news.detail.backToList')}
          </Link>

          <div className={`${hasSidebar ? 'grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8' : ''}`}>
            {/* Main Article Column */}
            <article>
              {/* Article Header */}
              <header className="mb-8">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {article.category && (
                    <Badge className="bg-accent/20 text-accent border-accent/30">
                      <Tag className="w-3 h-3 mr-1" />
                      {getCategoryLabel(article.category)}
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {baseLang === 'en' && article.title_en ? article.title_en : article.title}
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
                {/* Tech Keywords */}
                {article.keywords && article.keywords.length > 0 && (
                  <div className="mt-4">
                    <TechKeywordsBadge keywords={article.keywords} max={6} />
                  </div>
                )}
                {(article.summary || article.summary_en) && (
                  <p className="mt-4 text-lg text-muted-foreground leading-relaxed border-l-4 border-accent/30 pl-4 bg-secondary/30 py-3 rounded-r-lg">
                    {baseLang === 'en' && article.summary_en ? article.summary_en : article.summary}
                  </p>
                )}
              </header>

              {/* Tech Summary Block — GEO dense entity block */}
              {article.keywords && article.keywords.length > 0 && (
                <TechSummaryBlock
                  keywords={article.keywords}
                  category={article.category}
                  title={baseLang === 'en' && article.title_en ? article.title_en : article.title}
                />
              )}

              {/* Article Body — with auto product links injected */}
              <div 
                ref={contentRef}
                className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:text-foreground 
                  prose-p:text-muted-foreground 
                  prose-a:text-accent hover:prose-a:text-orange-light
                  prose-strong:text-foreground
                  prose-img:rounded-xl prose-img:shadow-lg
                  [&_.product-auto-link]:text-accent [&_.product-auto-link]:no-underline [&_.product-auto-link]:border-b [&_.product-auto-link]:border-accent/30 hover:[&_.product-auto-link]:border-accent"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(linkedContent) }}
              />

              {/* Article CTA */}
              <div className="mt-12">
                <ArticleCTA />
              </div>
            </article>

            {/* Sidebar */}
            {hasSidebar && (
              <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                {/* Related Products */}
                {mentionedProducts.length > 0 && (
                  <RelatedProductCard products={mentionedProducts} />
                )}

                {/* Tech Keywords Cloud (for GEO) */}
                {article.keywords && article.keywords.length > 0 && (
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-wider">
                      {t('news.detail.techSpecs')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {article.keywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-3 py-1.5 text-sm font-medium bg-secondary text-foreground rounded-lg border border-border"
                        >
                          <strong>{kw}</strong>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Action */}
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    {t('news.detail.needSolution')}
                  </p>
                  <Link to="/contact">
                    <Button size="sm" className="w-full gap-2">
                      {t('news.detail.getTechSupport')}
                    </Button>
                  </Link>
                </div>
              </aside>
            )}
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-secondary py-12">
            <div className="container-custom">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t('news.detail.relatedArticles')}
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
                        src={related.cover_image || DEFAULT_IMAGE}
                        alt={baseLang === 'en' && related.title_en ? related.title_en : related.title}
                        width={400}
                        height={225}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = DEFAULT_IMAGE;
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-card-foreground line-clamp-2 group-hover:text-accent transition-colors">
                        {baseLang === 'en' && related.title_en ? related.title_en : related.title}
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
