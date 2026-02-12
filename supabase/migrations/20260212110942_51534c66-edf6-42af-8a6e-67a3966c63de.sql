-- Fix: Restrict system_settings SELECT to admin-only
DROP POLICY IF EXISTS "Anyone can read settings" ON public.system_settings;

CREATE POLICY "Admins can read settings"
ON public.system_settings FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));