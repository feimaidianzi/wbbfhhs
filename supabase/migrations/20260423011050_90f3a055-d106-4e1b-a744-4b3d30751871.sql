-- Check unique constraint exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'seo_api_keys_key_name_key'
  ) THEN
    ALTER TABLE public.seo_api_keys ADD CONSTRAINT seo_api_keys_key_name_key UNIQUE (key_name);
  END IF;
END $$;

-- Add Yandex and 360 search engine API key entries
INSERT INTO public.seo_api_keys (key_name, is_configured)
VALUES 
  ('yandex_user_id', false),
  ('yandex_api_key', false),
  ('so360_site_token', false)
ON CONFLICT (key_name) DO NOTHING;