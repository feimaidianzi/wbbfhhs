-- Add configuration columns to scheduled_tasks table
ALTER TABLE public.scheduled_tasks
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS article_count INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS auto_publish BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS ai_rules JSONB DEFAULT '{}';

-- Add comments for the new columns
COMMENT ON COLUMN public.scheduled_tasks.category IS '采集的新闻分类';
COMMENT ON COLUMN public.scheduled_tasks.article_count IS '每次采集的文章数量';
COMMENT ON COLUMN public.scheduled_tasks.auto_publish IS '是否自动发布';
COMMENT ON COLUMN public.scheduled_tasks.ai_rules IS 'AI优化规则配置';

-- Update existing tasks with their categories based on names
UPDATE public.scheduled_tasks SET category = '公司新闻', article_count = 1 WHERE name LIKE '%公司新闻%';
UPDATE public.scheduled_tasks SET category = '行业动态', article_count = 1 WHERE name LIKE '%行业动态%';
UPDATE public.scheduled_tasks SET category = '产品资讯', article_count = 1 WHERE name LIKE '%产品资讯%';
UPDATE public.scheduled_tasks SET category = '技术分享', article_count = 1 WHERE name LIKE '%技术分享%';