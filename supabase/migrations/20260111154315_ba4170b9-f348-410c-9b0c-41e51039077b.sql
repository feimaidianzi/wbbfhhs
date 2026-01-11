-- 添加质量评分字段到 news_articles 表
ALTER TABLE public.news_articles 
ADD COLUMN IF NOT EXISTS quality_score numeric(3,1) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS quality_reason text DEFAULT NULL;

-- 添加索引以便按评分查询
CREATE INDEX IF NOT EXISTS idx_news_articles_quality_score ON public.news_articles(quality_score);

-- 添加评论说明
COMMENT ON COLUMN public.news_articles.quality_score IS 'AI评分，满分10分，低于8分自动过滤不发布';
COMMENT ON COLUMN public.news_articles.quality_score IS 'AI评分理由';