-- Create system settings table
CREATE TABLE public.system_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read settings (for frontend to get admin email)
CREATE POLICY "Anyone can read settings"
ON public.system_settings
FOR SELECT
USING (true);

-- Only admins can modify settings
CREATE POLICY "Admins can manage settings"
ON public.system_settings
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_system_settings_updated_at
BEFORE UPDATE ON public.system_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default admin email setting
INSERT INTO public.system_settings (key, value, description)
VALUES ('admin_notification_email', 'market@flymind.com', '管理员通知邮箱，用于接收新咨询提醒');