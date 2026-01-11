-- 添加关键词的 AI 规则配置字段
ALTER TABLE public.news_keywords 
ADD COLUMN IF NOT EXISTS ai_rules jsonb DEFAULT '{}'::jsonb;

-- 添加注释说明字段用途
COMMENT ON COLUMN public.news_keywords.ai_rules IS 'AI规则配置，包含评分规则、文章优化规则等';
