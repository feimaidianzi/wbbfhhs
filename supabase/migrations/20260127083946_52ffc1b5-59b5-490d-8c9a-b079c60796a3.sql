-- Create sitemap submission history table
CREATE TABLE public.sitemap_submission_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_type TEXT NOT NULL, -- 'generate', 'submit', 'ping'
  languages TEXT[] NOT NULL DEFAULT '{}',
  route_count INTEGER DEFAULT 0,
  results JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'success', 'partial', 'failed'
  error_message TEXT,
  triggered_by TEXT DEFAULT 'manual', -- 'manual', 'scheduled', 'content_update'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.sitemap_submission_history ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Admins can view submission history"
  ON public.sitemap_submission_history
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert submission history"
  ON public.sitemap_submission_history
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- Allow edge functions to insert (using service role)
CREATE POLICY "Service role can manage submission history"
  ON public.sitemap_submission_history
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create SEO API keys settings table for persistent storage
CREATE TABLE public.seo_api_keys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key_name TEXT NOT NULL UNIQUE, -- 'google_oauth_token', 'baidu_token', 'bing_api_key'
  key_value TEXT, -- encrypted or stored securely
  is_configured BOOLEAN DEFAULT false,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.seo_api_keys ENABLE ROW LEVEL SECURITY;

-- Only admins can manage API keys
CREATE POLICY "Admins can manage API keys"
  ON public.seo_api_keys
  FOR ALL
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- Insert default key placeholders
INSERT INTO public.seo_api_keys (key_name, is_configured) VALUES
  ('google_oauth_token', false),
  ('baidu_token', false),
  ('bing_api_key', false);

-- Create function to trigger sitemap regeneration on content updates
CREATE OR REPLACE FUNCTION public.trigger_sitemap_regeneration()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert a pending task record
  INSERT INTO public.sitemap_submission_history (
    submission_type,
    languages,
    triggered_by,
    status
  ) VALUES (
    'generate',
    ARRAY['zh', 'en', 'ja', 'ko', 'vi', 'th', 'ms', 'id', 'fr', 'de', 'es', 'ru', 'ar', 'tr'],
    'content_update',
    'pending'
  );
  
  RETURN NEW;
END;
$$;

-- Create triggers for products table
CREATE TRIGGER trigger_sitemap_on_product_change
  AFTER INSERT OR UPDATE OR DELETE ON public.products
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.trigger_sitemap_regeneration();

-- Create triggers for news_articles table
CREATE TRIGGER trigger_sitemap_on_news_change
  AFTER INSERT OR UPDATE OR DELETE ON public.news_articles
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.trigger_sitemap_regeneration();

-- Add index for faster queries
CREATE INDEX idx_sitemap_history_created_at ON public.sitemap_submission_history(created_at DESC);
CREATE INDEX idx_sitemap_history_status ON public.sitemap_submission_history(status);