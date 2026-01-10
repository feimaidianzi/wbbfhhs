-- 启用 pg_cron 和 pg_net 扩展用于定时任务
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- 创建定时任务配置表
CREATE TABLE IF NOT EXISTS public.scheduled_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  cron_expression TEXT NOT NULL,
  is_enabled BOOLEAN DEFAULT true,
  last_run_at TIMESTAMP WITH TIME ZONE,
  next_run_at TIMESTAMP WITH TIME ZONE,
  last_status TEXT,
  last_error TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 启用 RLS
ALTER TABLE public.scheduled_tasks ENABLE ROW LEVEL SECURITY;

-- 只有管理员可以查看和管理定时任务
CREATE POLICY "Admins can view scheduled tasks" 
ON public.scheduled_tasks 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage scheduled tasks" 
ON public.scheduled_tasks 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- 创建触发器更新 updated_at
CREATE TRIGGER update_scheduled_tasks_updated_at
BEFORE UPDATE ON public.scheduled_tasks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 插入默认的每日新闻采集任务配置
INSERT INTO public.scheduled_tasks (name, description, cron_expression, is_enabled)
VALUES (
  'daily_news_collection',
  '每天自动采集10篇无人机行业新闻并发布',
  '0 8 * * *',
  true
) ON CONFLICT (name) DO NOTHING;

-- 创建定时任务执行函数
CREATE OR REPLACE FUNCTION public.trigger_daily_news_collection()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  supabase_url TEXT;
  service_role_key TEXT;
BEGIN
  -- 获取配置
  supabase_url := current_setting('app.settings.supabase_url', true);
  service_role_key := current_setting('app.settings.service_role_key', true);
  
  -- 更新任务状态
  UPDATE public.scheduled_tasks 
  SET last_run_at = now(), 
      last_status = 'running'
  WHERE name = 'daily_news_collection';
  
  -- 使用 pg_net 调用边缘函数
  PERFORM net.http_post(
    url := 'https://tuxslfemwkdmnkldlmmy.supabase.co/functions/v1/collect-news-firecrawl',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || service_role_key
    ),
    body := jsonb_build_object(
      'action', 'collect-daily',
      'targetCount', 10,
      'autoPublish', true
    )
  );
  
  -- 更新完成状态
  UPDATE public.scheduled_tasks 
  SET last_status = 'completed',
      next_run_at = now() + interval '1 day'
  WHERE name = 'daily_news_collection';
  
EXCEPTION WHEN OTHERS THEN
  UPDATE public.scheduled_tasks 
  SET last_status = 'failed',
      last_error = SQLERRM
  WHERE name = 'daily_news_collection';
END;
$$;

-- 设置 pg_cron 定时任务 - 每天早上8点执行
SELECT cron.schedule(
  'daily-news-collection',
  '0 8 * * *',
  $$SELECT public.trigger_daily_news_collection()$$
);