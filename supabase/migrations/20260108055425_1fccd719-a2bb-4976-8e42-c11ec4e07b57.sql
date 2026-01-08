-- Create specification templates table
CREATE TABLE public.specification_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  fields JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.specification_templates ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Admins can manage templates"
ON public.specification_templates
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view templates"
ON public.specification_templates
FOR SELECT
USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_specification_templates_updated_at
BEFORE UPDATE ON public.specification_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for category lookup
CREATE INDEX idx_specification_templates_category ON public.specification_templates(category);