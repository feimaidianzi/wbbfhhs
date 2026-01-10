-- 添加新闻来源跟踪字段到 news_articles 表
ALTER TABLE public.news_articles 
ADD COLUMN IF NOT EXISTS source_url TEXT,
ADD COLUMN IF NOT EXISTS source_name TEXT,
ADD COLUMN IF NOT EXISTS original_title TEXT,
ADD COLUMN IF NOT EXISTS is_auto_generated BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS ai_edited BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS keywords TEXT[];

-- 创建采集任务表，用于记录新闻采集历史
CREATE TABLE IF NOT EXISTS public.news_collection_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  keyword TEXT NOT NULL,
  category TEXT NOT NULL,
  articles_collected INTEGER DEFAULT 0,
  articles_published INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- 创建新闻采集关键词配置表
CREATE TABLE IF NOT EXISTS public.news_keywords (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  keyword TEXT NOT NULL,
  keyword_en TEXT,
  category TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 启用 RLS
ALTER TABLE public.news_collection_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_keywords ENABLE ROW LEVEL SECURITY;

-- 管理员读取采集任务策略
CREATE POLICY "Admins can view collection tasks" 
ON public.news_collection_tasks 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- 管理员管理采集任务策略
CREATE POLICY "Admins can manage collection tasks" 
ON public.news_collection_tasks 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- 管理员读取关键词策略
CREATE POLICY "Admins can view keywords" 
ON public.news_keywords 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- 管理员管理关键词策略
CREATE POLICY "Admins can manage keywords" 
ON public.news_keywords 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Edge Function 服务账户访问策略（用于自动采集）
CREATE POLICY "Service role can manage collection tasks" 
ON public.news_collection_tasks 
FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role can manage keywords" 
ON public.news_keywords 
FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role can manage news articles" 
ON public.news_articles 
FOR ALL 
USING (true)
WITH CHECK (true);

-- 插入默认采集关键词
INSERT INTO public.news_keywords (keyword, keyword_en, category, priority) VALUES
('无人机', 'drone UAV', '无人机', 10),
('电力巡检无人机', 'power grid inspection drone', '电力巡检', 9),
('物流无人机', 'logistics delivery drone', '物流配送', 8),
('系留无人机', 'tethered drone', '系留无人机', 8),
('无人机集群', 'drone swarm', '集群技术', 7),
('工业无人机', 'industrial drone', '工业应用', 7),
('消防无人机', 'firefighting drone', '消防应急', 6),
('测绘无人机', 'surveying mapping drone', '测绘测量', 6),
('农业无人机', 'agriculture drone', '农业植保', 5),
('无人机配件', 'drone accessories parts', '配件设备', 4);