-- 添加审核状态字段到 news_articles 表
ALTER TABLE public.news_articles 
ADD COLUMN IF NOT EXISTS review_status TEXT DEFAULT 'pending' CHECK (review_status IN ('pending', 'approved', 'rejected'));

-- 添加审核相关字段
ALTER TABLE public.news_articles 
ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS reviewed_by UUID,
ADD COLUMN IF NOT EXISTS review_notes TEXT,
ADD COLUMN IF NOT EXISTS ai_modification_request TEXT;

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_news_articles_review_status ON public.news_articles(review_status);

-- 更新现有已发布文章的审核状态为已通过
UPDATE public.news_articles 
SET review_status = 'approved' 
WHERE is_published = true AND review_status = 'pending';

-- 添加注释
COMMENT ON COLUMN public.news_articles.review_status IS '审核状态: pending=待审核, approved=已通过, rejected=已拒绝';
COMMENT ON COLUMN public.news_articles.reviewed_at IS '审核时间';
COMMENT ON COLUMN public.news_articles.reviewed_by IS '审核人ID';
COMMENT ON COLUMN public.news_articles.review_notes IS '审核备注';
COMMENT ON COLUMN public.news_articles.ai_modification_request IS 'AI修改请求内容';