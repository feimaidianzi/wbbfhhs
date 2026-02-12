
-- Fix 1: Remove direct admin access to seo_api_keys key_value column
-- Replace broad admin ALL policy with restricted policies (no SELECT on key_value)
DROP POLICY IF EXISTS "Admins can manage API keys" ON public.seo_api_keys;

-- Admins can only insert/update/delete (key management via edge function only)
CREATE POLICY "Admins can insert API keys"
ON public.seo_api_keys FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update API keys"
ON public.seo_api_keys FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete API keys"
ON public.seo_api_keys FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- No SELECT policy for admins - they must use the edge function to get status only
-- Service role policy already exists for edge function access

-- Fix 2: Restrict visitor_sessions UPDATE to service_role only
DROP POLICY IF EXISTS "Anyone can update their own session" ON public.visitor_sessions;

CREATE POLICY "Service role can update sessions"
ON public.visitor_sessions FOR UPDATE
TO service_role
USING (true);
