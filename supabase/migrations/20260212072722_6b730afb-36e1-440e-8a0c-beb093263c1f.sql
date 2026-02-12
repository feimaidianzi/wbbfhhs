
-- Fix: Restrict news-images storage to admin/moderator only
DROP POLICY IF EXISTS "Authenticated users can upload news images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update news images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete news images" ON storage.objects;

CREATE POLICY "Admins can upload news images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'news-images'
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'))
);

CREATE POLICY "Admins can update news images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'news-images'
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'))
);

CREATE POLICY "Admins can delete news images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'news-images'
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'))
);
