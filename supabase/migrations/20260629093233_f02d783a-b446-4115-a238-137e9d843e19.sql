DO $$
DECLARE
  lang_key TEXT;
  langs TEXT[] := ARRAY['en','vi','th','ms','id','ja','ko','fr','de','es','ru','ar','tr'];
  current_json JSONB;
BEGIN
  FOREACH lang_key IN ARRAY langs LOOP
    SELECT value::jsonb INTO current_json
    FROM public.system_settings
    WHERE key = 'translations_' || lang_key;

    IF current_json IS NOT NULL THEN
      current_json := current_json
        - 'home.seo.title'
        - 'home.seo.description'
        - 'about.seoTitle'
        - 'about.seoDescription';

      UPDATE public.system_settings
      SET value = current_json::text,
          updated_at = now()
      WHERE key = 'translations_' || lang_key;
    END IF;
  END LOOP;
END $$;