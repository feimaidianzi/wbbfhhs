-- Enable pg_cron and pg_net extensions for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Add admin_email key to seo_api_keys if not exists
INSERT INTO seo_api_keys (key_name, key_value, is_configured, created_at, updated_at)
VALUES ('admin_email', NULL, false, now(), now())
ON CONFLICT (key_name) DO NOTHING;