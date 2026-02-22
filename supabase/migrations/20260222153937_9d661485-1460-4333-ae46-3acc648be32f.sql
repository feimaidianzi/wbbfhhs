-- Allow public read access to translation entries in system_settings
CREATE POLICY "Anyone can read translations"
ON public.system_settings
FOR SELECT
USING (key LIKE 'translations_%' OR key = 'source_translations_zh');