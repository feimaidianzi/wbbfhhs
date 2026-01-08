-- Create inquiries table for user consultations
CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  product_interest TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'replied', 'closed')),
  admin_notes TEXT,
  replied_at TIMESTAMP WITH TIME ZONE,
  replied_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an inquiry (no auth required)
CREATE POLICY "Anyone can submit inquiries" 
ON public.inquiries 
FOR INSERT 
WITH CHECK (true);

-- Admins can view all inquiries
CREATE POLICY "Admins can view all inquiries" 
ON public.inquiries 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update inquiries
CREATE POLICY "Admins can update inquiries" 
ON public.inquiries 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete inquiries
CREATE POLICY "Admins can delete inquiries" 
ON public.inquiries 
FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_inquiries_updated_at
BEFORE UPDATE ON public.inquiries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();