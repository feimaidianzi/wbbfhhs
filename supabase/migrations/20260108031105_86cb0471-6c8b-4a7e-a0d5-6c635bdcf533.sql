-- Create news articles table
CREATE TABLE public.news_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT,
  category TEXT DEFAULT 'news',
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- Public can read published articles
CREATE POLICY "Anyone can view published articles" 
ON public.news_articles 
FOR SELECT 
USING (is_published = true);

-- Admins can do everything
CREATE POLICY "Admins can manage all articles" 
ON public.news_articles 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_news_articles_updated_at
BEFORE UPDATE ON public.news_articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();