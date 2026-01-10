-- 删除过于宽松的服务角色策略
DROP POLICY IF EXISTS "Service role can manage collection tasks" ON public.news_collection_tasks;
DROP POLICY IF EXISTS "Service role can manage keywords" ON public.news_keywords;
DROP POLICY IF EXISTS "Service role can manage news articles" ON public.news_articles;

-- 注意：Edge Functions 使用 service_role key 时会自动绕过 RLS
-- 所以不需要额外的策略，保留管理员策略即可