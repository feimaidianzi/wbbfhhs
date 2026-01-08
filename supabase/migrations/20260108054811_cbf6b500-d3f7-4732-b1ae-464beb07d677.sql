-- Create admin activity logs table
CREATE TABLE public.admin_activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  user_email TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  entity_name TEXT,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view logs
CREATE POLICY "Admins can view all logs"
ON public.admin_activity_logs
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can insert logs
CREATE POLICY "Admins can create logs"
ON public.admin_activity_logs
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster queries
CREATE INDEX idx_admin_logs_created_at ON public.admin_activity_logs(created_at DESC);
CREATE INDEX idx_admin_logs_entity_type ON public.admin_activity_logs(entity_type);

-- Add comment
COMMENT ON TABLE public.admin_activity_logs IS 'Tracks admin actions for audit purposes';