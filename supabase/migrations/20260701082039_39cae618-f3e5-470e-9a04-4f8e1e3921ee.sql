
-- 1. Move has_role to private schema (hides from PostgREST) --------------------
CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO anon, authenticated, service_role;
ALTER FUNCTION public.has_role(uuid, app_role) SET SCHEMA private;
-- Existing EXECUTE grants carry over with the function so RLS policies keep working.

-- 2. quick_replies: restrict SELECT to authenticated staff --------------------
DROP POLICY IF EXISTS "Anyone can view quick replies" ON public.quick_replies;
CREATE POLICY "Staff can view quick replies"
ON public.quick_replies
FOR SELECT
TO authenticated
USING (
  is_active = true
  AND (
    private.has_role(auth.uid(), 'admin'::app_role)
    OR private.has_role(auth.uid(), 'moderator'::app_role)
    OR EXISTS (
      SELECT 1 FROM public.customer_service_agents csa
      WHERE csa.user_id = auth.uid()
    )
  )
);

-- 3. visitor_events: only service_role can insert (route via edge function) ---
DROP POLICY IF EXISTS "Anyone can create visitor events" ON public.visitor_events;
CREATE POLICY "Service role can insert visitor events"
ON public.visitor_events
FOR INSERT
TO service_role
WITH CHECK (true);

-- 4. visitor_sessions: header-scoped UPDATE + sensitive-field protection ------
CREATE OR REPLACE FUNCTION public.protect_visitor_session_sensitive_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Non-privileged roles cannot mutate geolocation, IP, or session_id.
  IF current_user NOT IN ('service_role', 'postgres', 'supabase_admin') THEN
    NEW.ip_address := OLD.ip_address;
    NEW.country    := OLD.country;
    NEW.region     := OLD.region;
    NEW.city       := OLD.city;
    NEW.session_id := OLD.session_id;
  END IF;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.protect_visitor_session_sensitive_fields() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS trg_protect_visitor_session_fields ON public.visitor_sessions;
CREATE TRIGGER trg_protect_visitor_session_fields
BEFORE UPDATE ON public.visitor_sessions
FOR EACH ROW
EXECUTE FUNCTION public.protect_visitor_session_sensitive_fields();

CREATE POLICY "Visitors can update own session by header"
ON public.visitor_sessions
FOR UPDATE
TO anon, authenticated
USING (
  session_id = current_setting('request.headers', true)::jsonb->>'x-visitor-session-id'
)
WITH CHECK (
  session_id = current_setting('request.headers', true)::jsonb->>'x-visitor-session-id'
);
