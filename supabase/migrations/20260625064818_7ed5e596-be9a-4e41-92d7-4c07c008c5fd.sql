
-- 1. ai_conversations: remove OR true from SELECT policy
DROP POLICY IF EXISTS "Admins and visitors can view conversations" ON public.ai_conversations;
CREATE POLICY "Admins and moderators can view conversations"
ON public.ai_conversations
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = ANY (ARRAY['admin'::app_role, 'moderator'::app_role])
  )
);

-- 2. seo_api_keys: add admin-only SELECT policy
CREATE POLICY "Admins can view API keys"
ON public.seo_api_keys
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 3. temp-images bucket policies (bucket privacy set via storage tool)
DROP POLICY IF EXISTS "Allow upload to temp images" ON storage.objects;
DROP POLICY IF EXISTS "Public read access for temp images" ON storage.objects;

CREATE POLICY "Authenticated users can upload temp images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'temp-images');

CREATE POLICY "Authenticated users can view their temp images"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'temp-images' AND owner = auth.uid());

CREATE POLICY "Authenticated users can delete their temp images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'temp-images' AND owner = auth.uid());

CREATE POLICY "Admins can manage all temp images"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'temp-images' AND public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (bucket_id = 'temp-images' AND public.has_role(auth.uid(), 'admin'::app_role));

-- 4. visitor_sessions: input-validation trigger
CREATE OR REPLACE FUNCTION public.validate_visitor_session_input()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.session_id IS NULL OR length(NEW.session_id) = 0 OR length(NEW.session_id) > 128 THEN
    RAISE EXCEPTION 'Invalid session_id';
  END IF;
  IF NEW.user_agent IS NOT NULL AND length(NEW.user_agent) > 1024 THEN
    NEW.user_agent := left(NEW.user_agent, 1024);
  END IF;
  IF NEW.ip_address IS NOT NULL AND length(NEW.ip_address) > 64 THEN
    RAISE EXCEPTION 'Invalid ip_address';
  END IF;
  IF NEW.browser IS NOT NULL AND length(NEW.browser) > 128 THEN
    NEW.browser := left(NEW.browser, 128);
  END IF;
  IF NEW.screen_resolution IS NOT NULL AND length(NEW.screen_resolution) > 32 THEN
    RAISE EXCEPTION 'Invalid screen_resolution';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_visitor_session_input_trigger ON public.visitor_sessions;
CREATE TRIGGER validate_visitor_session_input_trigger
BEFORE INSERT ON public.visitor_sessions
FOR EACH ROW EXECUTE FUNCTION public.validate_visitor_session_input();

-- 5. Revoke EXECUTE on SECURITY DEFINER trigger/internal functions from anon/authenticated/PUBLIC
REVOKE EXECUTE ON FUNCTION public.trigger_sitemap_regeneration() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.trigger_daily_news_collection() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.trigger_category_news_collection(text, integer) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.validate_ai_message_before_insert() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.validate_inquiry_input() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.validate_visitor_session_input() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, PUBLIC;
-- has_role remains executable because it is invoked by RLS policy expressions
