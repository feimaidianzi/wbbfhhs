-- 1. 添加会话备注表
CREATE TABLE IF NOT EXISTS public.conversation_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL,
  agent_id UUID,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 启用RLS
ALTER TABLE public.conversation_notes ENABLE ROW LEVEL SECURITY;

-- RLS策略
CREATE POLICY "Admins can manage notes"
ON public.conversation_notes
FOR ALL
USING (EXISTS (
  SELECT 1 FROM user_roles
  WHERE user_roles.user_id = auth.uid()
  AND user_roles.role IN ('admin', 'moderator')
));

-- 2. 添加快捷回复模板表
CREATE TABLE IF NOT EXISTS public.quick_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 启用RLS
ALTER TABLE public.quick_replies ENABLE ROW LEVEL SECURITY;

-- RLS策略
CREATE POLICY "Admins can manage quick replies"
ON public.quick_replies
FOR ALL
USING (EXISTS (
  SELECT 1 FROM user_roles
  WHERE user_roles.user_id = auth.uid()
  AND user_roles.role IN ('admin', 'moderator')
));

CREATE POLICY "Anyone can view quick replies"
ON public.quick_replies
FOR SELECT
USING (is_active = true);

-- 3. 添加投诉表
CREATE TABLE IF NOT EXISTS public.complaints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID,
  session_id TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  handler_id UUID,
  resolution TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- 启用RLS
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

-- RLS策略
CREATE POLICY "Admins can manage complaints"
ON public.complaints
FOR ALL
USING (EXISTS (
  SELECT 1 FROM user_roles
  WHERE user_roles.user_id = auth.uid()
  AND user_roles.role IN ('admin', 'moderator')
));

CREATE POLICY "Anyone can create complaints"
ON public.complaints
FOR INSERT
WITH CHECK (true);

-- 4. 为ai_conversations添加超时相关字段
ALTER TABLE public.ai_conversations 
ADD COLUMN IF NOT EXISTS last_visitor_message_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS auto_closed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS is_visitor_online BOOLEAN DEFAULT true;

-- 5. 插入一些默认的快捷回复模板
INSERT INTO public.quick_replies (title, content, category, sort_order) VALUES
('问候语', '您好！我是长凌科技的客服人员，很高兴为您服务。请问有什么可以帮助您的？', 'greeting', 1),
('询问需求', '请问您是想了解哪款产品的详细信息呢？我可以为您详细介绍。', 'general', 2),
('产品咨询', '我们的产品涵盖数字图传、VTX、飞控电调、云台吊舱等多个品类，请问您对哪类产品感兴趣？', 'product', 3),
('价格咨询', '关于价格问题，请您告诉我具体的产品型号和采购数量，我为您核实后提供报价。', 'price', 4),
('联系方式', '如需进一步沟通，您可以拨打我们的电话 176-7404-8404，或添加微信咨询。', 'contact', 5),
('结束语', '感谢您的咨询！如有其他问题，欢迎随时联系我们。祝您生活愉快！', 'closing', 6)
ON CONFLICT DO NOTHING;