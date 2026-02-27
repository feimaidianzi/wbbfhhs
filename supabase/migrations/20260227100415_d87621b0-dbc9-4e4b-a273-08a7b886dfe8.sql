
-- Create a temporary bucket for image processing
INSERT INTO storage.buckets (id, name, public) VALUES ('temp-images', 'temp-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "Public read access for temp images"
ON storage.objects FOR SELECT
USING (bucket_id = 'temp-images');

-- Allow authenticated upload
CREATE POLICY "Allow upload to temp images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'temp-images');
