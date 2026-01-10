-- Create storage bucket for news images
INSERT INTO storage.buckets (id, name, public)
VALUES ('news-images', 'news-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "News images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'news-images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload news images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'news-images');

-- Allow authenticated users to update
CREATE POLICY "Authenticated users can update news images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'news-images');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete news images"
ON storage.objects FOR DELETE
USING (bucket_id = 'news-images');