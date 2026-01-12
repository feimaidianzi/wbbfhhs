-- 添加双语支持字段到 news_articles 表
ALTER TABLE public.news_articles 
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS summary_en TEXT,
ADD COLUMN IF NOT EXISTS content_en TEXT;

-- 添加索引以优化查询
CREATE INDEX IF NOT EXISTS idx_news_articles_title_en ON public.news_articles(title_en);

-- 添加评论说明
COMMENT ON COLUMN public.news_articles.title_en IS 'English version of the article title';
COMMENT ON COLUMN public.news_articles.summary_en IS 'English version of the article summary';
COMMENT ON COLUMN public.news_articles.content_en IS 'English version of the article content';