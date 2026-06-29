
-- Visitor tracking tables: anon + authenticated need insert/update for tracking
GRANT SELECT, INSERT, UPDATE ON public.visitor_sessions TO anon, authenticated;
GRANT ALL ON public.visitor_sessions TO service_role;

GRANT SELECT, INSERT ON public.visitor_events TO anon, authenticated;
GRANT ALL ON public.visitor_events TO service_role;

-- AI chat tables: visitors (anon) must be able to create conversations & send messages
GRANT SELECT, INSERT, UPDATE ON public.ai_conversations TO anon, authenticated;
GRANT ALL ON public.ai_conversations TO service_role;

GRANT SELECT, INSERT ON public.ai_conversation_messages TO anon, authenticated;
GRANT ALL ON public.ai_conversation_messages TO service_role;

GRANT SELECT, INSERT, UPDATE ON public.customer_leads TO anon, authenticated;
GRANT ALL ON public.customer_leads TO service_role;

-- Public reads for translations / settings used by the site
GRANT SELECT ON public.system_settings TO anon, authenticated;
GRANT ALL ON public.system_settings TO service_role;

-- has_role function used in RLS — needs to be callable by anon for public read checks
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO anon, authenticated;
