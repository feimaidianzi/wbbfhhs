-- Create table for AI assistant conversations
CREATE TABLE public.ai_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  visitor_ip TEXT,
  visitor_location TEXT,
  visitor_device TEXT,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE,
  is_transferred_to_human BOOLEAN DEFAULT false,
  transferred_at TIMESTAMP WITH TIME ZONE,
  human_agent_id UUID,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'ended', 'transferred')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for conversation messages
CREATE TABLE public.ai_conversation_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'human_agent', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for customer leads extracted from conversations
CREATE TABLE public.customer_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.ai_conversations(id) ON DELETE SET NULL,
  name TEXT,
  phone TEXT,
  email TEXT,
  company TEXT,
  location TEXT,
  requirements TEXT,
  product_interest TEXT,
  budget_range TEXT,
  urgency TEXT CHECK (urgency IN ('low', 'medium', 'high', 'immediate')),
  lead_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for AI assistant analytics
CREATE TABLE public.ai_assistant_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_conversations INTEGER DEFAULT 0,
  avg_messages_per_conversation NUMERIC(5,2) DEFAULT 0,
  human_transfers INTEGER DEFAULT 0,
  leads_captured INTEGER DEFAULT 0,
  top_topics JSONB,
  peak_hours JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(date)
);

-- Enable RLS
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversation_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_assistant_analytics ENABLE ROW LEVEL SECURITY;

-- Policies for ai_conversations - public can insert and view their own session
CREATE POLICY "Anyone can create conversations" 
ON public.ai_conversations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view their session conversations" 
ON public.ai_conversations 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update their session conversations" 
ON public.ai_conversations 
FOR UPDATE 
USING (true);

-- Policies for ai_conversation_messages
CREATE POLICY "Anyone can add messages" 
ON public.ai_conversation_messages 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view messages" 
ON public.ai_conversation_messages 
FOR SELECT 
USING (true);

-- Policies for customer_leads - only admins can view
CREATE POLICY "Admins can view all leads" 
ON public.customer_leads 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'moderator')
  )
);

CREATE POLICY "Anyone can create leads" 
ON public.customer_leads 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can update leads" 
ON public.customer_leads 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'moderator')
  )
);

-- Policies for analytics - only admins can view
CREATE POLICY "Admins can view analytics" 
ON public.ai_assistant_analytics 
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'moderator')
  )
);

-- Create trigger for updating customer_leads updated_at
CREATE TRIGGER update_customer_leads_updated_at
BEFORE UPDATE ON public.customer_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_ai_conversations_session_id ON public.ai_conversations(session_id);
CREATE INDEX idx_ai_conversations_status ON public.ai_conversations(status);
CREATE INDEX idx_ai_conversation_messages_conversation_id ON public.ai_conversation_messages(conversation_id);
CREATE INDEX idx_customer_leads_status ON public.customer_leads(status);
CREATE INDEX idx_customer_leads_created_at ON public.customer_leads(created_at DESC);