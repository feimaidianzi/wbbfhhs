-- Fix: The "Anyone can read translations" policy must be PERMISSIVE, not RESTRICTIVE
-- Without any PERMISSIVE policy, PostgreSQL denies all rows regardless of RESTRICTIVE policies

DROP POLICY IF EXISTS "Anyone can read translations" ON public.system_settings;

-- Create as PERMISSIVE (this is the default, but being explicit)
CREATE POLICY "Anyone can read translations"
ON public.system_settings
AS PERMISSIVE
FOR SELECT
TO public
USING ((key ~~ 'translations_%'::text) OR (key = 'source_translations_zh'::text));