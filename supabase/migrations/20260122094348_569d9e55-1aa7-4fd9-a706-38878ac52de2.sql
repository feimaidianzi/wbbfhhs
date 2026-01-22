-- 创建访客会话表
CREATE TABLE public.visitor_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL UNIQUE,
  first_visit_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_activity_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- 来源信息
  traffic_source TEXT, -- search_engine, social_media, referral, direct
  referrer_url TEXT,
  referrer_domain TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  
  -- 设备信息
  user_agent TEXT,
  device_type TEXT, -- desktop, mobile, tablet
  browser TEXT,
  os TEXT,
  screen_resolution TEXT,
  
  -- 位置信息
  ip_address TEXT,
  country TEXT,
  city TEXT,
  region TEXT,
  
  -- 统计数据
  total_page_views INTEGER DEFAULT 0,
  total_events INTEGER DEFAULT 0,
  total_duration_seconds INTEGER DEFAULT 0,
  pages_visited TEXT[] DEFAULT '{}',
  exit_page TEXT,
  
  -- 关联信息
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ai_conversation_id UUID,
  lead_id UUID,
  
  -- 搜索关键词
  search_keywords TEXT[] DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 创建访客事件表
CREATE TABLE public.visitor_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL, -- page_view, click, scroll, search, form_submit, product_view
  event_name TEXT,
  event_data JSONB DEFAULT '{}',
  
  -- 页面信息
  page_url TEXT,
  page_title TEXT,
  page_path TEXT,
  
  -- 元素信息（点击事件）
  element_id TEXT,
  element_class TEXT,
  element_text TEXT,
  element_tag TEXT,
  
  -- 产品信息（产品查看事件）
  product_id TEXT,
  product_name TEXT,
  product_category TEXT,
  
  -- 时间信息
  duration_seconds INTEGER DEFAULT 0,
  scroll_depth INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 创建客服坐席表
CREATE TABLE public.customer_service_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  status TEXT DEFAULT 'offline', -- online, offline, busy
  max_concurrent_chats INTEGER DEFAULT 5,
  current_chats INTEGER DEFAULT 0,
  total_handled INTEGER DEFAULT 0,
  avg_response_time_seconds INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 创建AI分析结果表
CREATE TABLE public.visitor_ai_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  analysis_type TEXT NOT NULL, -- behavior, intent, lead_score
  analysis_result JSONB NOT NULL,
  confidence_score NUMERIC(3,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 启用RLS
ALTER TABLE public.visitor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_service_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_ai_analysis ENABLE ROW LEVEL SECURITY;

-- visitor_sessions RLS策略
CREATE POLICY "Anyone can create visitor sessions"
ON public.visitor_sessions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update their own session"
ON public.visitor_sessions FOR UPDATE
USING (true);

CREATE POLICY "Admins and moderators can view all sessions"
ON public.visitor_sessions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('admin', 'moderator')
  )
);

-- visitor_events RLS策略
CREATE POLICY "Anyone can create visitor events"
ON public.visitor_events FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins and moderators can view all events"
ON public.visitor_events FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('admin', 'moderator')
  )
);

-- customer_service_agents RLS策略
CREATE POLICY "Admins can manage agents"
ON public.customer_service_agents FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Agents can view and update themselves"
ON public.customer_service_agents FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Agents can update their own status"
ON public.customer_service_agents FOR UPDATE
USING (user_id = auth.uid());

-- visitor_ai_analysis RLS策略
CREATE POLICY "Admins and moderators can manage analysis"
ON public.visitor_ai_analysis FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('admin', 'moderator')
  )
);

-- 创建索引
CREATE INDEX idx_visitor_sessions_session_id ON public.visitor_sessions(session_id);
CREATE INDEX idx_visitor_sessions_created_at ON public.visitor_sessions(created_at DESC);
CREATE INDEX idx_visitor_events_session_id ON public.visitor_events(session_id);
CREATE INDEX idx_visitor_events_created_at ON public.visitor_events(created_at DESC);
CREATE INDEX idx_visitor_events_event_type ON public.visitor_events(event_type);

-- 启用实时功能
ALTER PUBLICATION supabase_realtime ADD TABLE public.visitor_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.visitor_events;

-- 更新时间戳触发器
CREATE TRIGGER update_visitor_sessions_updated_at
BEFORE UPDATE ON public.visitor_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_customer_service_agents_updated_at
BEFORE UPDATE ON public.customer_service_agents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();