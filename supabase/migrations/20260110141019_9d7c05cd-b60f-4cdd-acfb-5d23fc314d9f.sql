-- 更新定时任务配置，添加不同分类的采集计划
-- 删除旧的单一任务
DELETE FROM public.scheduled_tasks WHERE name = 'daily_news_collection';

-- 插入新的分类采集任务
INSERT INTO public.scheduled_tasks (name, description, cron_expression, is_enabled, next_run_at) VALUES
('公司新闻采集', '每3天采集1篇公司新闻', '0 8 */3 * *', true, now() + interval '3 days'),
('行业动态采集', '每天采集1篇行业动态', '0 8 * * *', true, now() + interval '1 day'),
('产品资讯采集', '每天采集1篇产品资讯', '0 9 * * *', true, now() + interval '1 day'),
('技术分享采集', '每天采集1篇技术分享', '0 10 * * *', true, now() + interval '1 day');

-- 更新触发函数以支持分类采集
CREATE OR REPLACE FUNCTION public.trigger_category_news_collection(category_name TEXT, article_count INT DEFAULT 1)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  service_role_key TEXT;
BEGIN
  service_role_key := current_setting('app.settings.service_role_key', true);
  
  -- 使用 pg_net 调用边缘函数
  PERFORM net.http_post(
    url := 'https://tuxslfemwkdmnkldlmmy.supabase.co/functions/v1/collect-news-firecrawl',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || service_role_key
    ),
    body := jsonb_build_object(
      'action', 'collect-by-categories',
      'autoPublish', true,
      'categories', jsonb_build_object(category_name, article_count)
    )
  );
  
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'News collection failed: %', SQLERRM;
END;
$$;