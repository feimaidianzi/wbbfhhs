
-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Anyone can read translations" ON public.system_settings;

-- Create a PERMISSIVE policy for reading translations (this is the key fix)
CREATE POLICY "Anyone can read translations"
ON public.system_settings
FOR SELECT
USING ((key ~~ 'translations_%'::text) OR (key = 'source_translations_zh'::text));
