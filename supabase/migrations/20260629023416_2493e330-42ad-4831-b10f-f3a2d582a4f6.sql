
-- 1. Revoke EXECUTE on SECURITY DEFINER trigger/utility functions from anon & authenticated
REVOKE EXECUTE ON FUNCTION public.trigger_sitemap_regeneration() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.validate_inquiry_input() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.trigger_category_news_collection(text, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.validate_ai_message_before_insert() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.trigger_daily_news_collection() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.validate_visitor_session_input() FROM PUBLIC, anon, authenticated;
-- has_role must stay callable by authenticated (used in RLS contexts and admin checks)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;

-- 2. Storage: drop broad SELECT policies on public buckets (files still accessible via /public/ URL)
DROP POLICY IF EXISTS "Anyone can view product images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
DROP POLICY IF EXISTS "News images are publicly accessible" ON storage.objects;

-- 3. ai_conversations: forbid client-supplied visitor_ip / visitor_location / visitor_device
DROP POLICY IF EXISTS "Anyone can create conversations" ON public.ai_conversations;
CREATE POLICY "Anyone can create conversations"
  ON public.ai_conversations
  FOR INSERT
  WITH CHECK (
    visitor_ip IS NULL
    AND visitor_location IS NULL
    AND visitor_device IS NULL
    AND human_agent_id IS NULL
    AND is_transferred_to_human IS NOT TRUE
  );

-- 4. complaints: require session_id to reference an existing ai_conversation/visitor_session
DROP POLICY IF EXISTS "Anyone can create complaints" ON public.complaints;
CREATE POLICY "Anyone can create complaints"
  ON public.complaints
  FOR INSERT
  WITH CHECK (
    length(content) > 0
    AND length(content) <= 5000
    AND length(session_id) > 0
    AND length(session_id) <= 128
    AND (
      EXISTS (SELECT 1 FROM public.visitor_sessions vs WHERE vs.session_id = complaints.session_id)
      OR EXISTS (SELECT 1 FROM public.ai_conversations ac WHERE ac.session_id = complaints.session_id)
    )
    AND (status IS NULL OR status = 'pending')
    AND handler_id IS NULL
    AND resolution IS NULL
    AND resolved_at IS NULL
  );

-- 5. visitor_events: require session_id to exist in visitor_sessions
DROP POLICY IF EXISTS "Anyone can create visitor events" ON public.visitor_events;
CREATE POLICY "Anyone can create visitor events"
  ON public.visitor_events
  FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.visitor_sessions vs WHERE vs.session_id = visitor_events.session_id)
  );

-- 6. visitor_sessions: disallow client-supplied IP / geolocation; only service role may set those via UPDATE
DROP POLICY IF EXISTS "Anyone can create visitor sessions" ON public.visitor_sessions;
CREATE POLICY "Anyone can create visitor sessions"
  ON public.visitor_sessions
  FOR INSERT
  WITH CHECK (
    ip_address IS NULL
    AND country IS NULL
    AND region IS NULL
    AND city IS NULL
  );
