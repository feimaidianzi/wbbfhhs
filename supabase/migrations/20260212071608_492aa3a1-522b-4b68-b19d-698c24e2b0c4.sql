
-- Remove any existing SELECT policies on seo_api_keys that expose key_value to client
DROP POLICY IF EXISTS "Admin users can manage SEO API keys" ON public.seo_api_keys;
DROP POLICY IF EXISTS "Admin users can view SEO API keys" ON public.seo_api_keys;
DROP POLICY IF EXISTS "Admin users can update SEO API keys" ON public.seo_api_keys;
DROP POLICY IF EXISTS "Admin users can insert SEO API keys" ON public.seo_api_keys;
DROP POLICY IF EXISTS "Admin users can delete SEO API keys" ON public.seo_api_keys;

-- Only service_role (edge functions) can access seo_api_keys
-- No client-side access at all - keys never leave the server
CREATE POLICY "Service role full access to SEO API keys"
ON public.seo_api_keys
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
