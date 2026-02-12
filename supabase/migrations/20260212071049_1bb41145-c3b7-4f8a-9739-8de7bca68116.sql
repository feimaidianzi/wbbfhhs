
-- Remove the public INSERT policy on customer_leads
DROP POLICY IF EXISTS "Anyone can create leads" ON public.customer_leads;

-- Allow only service_role (edge functions) to insert leads
CREATE POLICY "Service role can insert leads"
ON public.customer_leads
FOR INSERT
TO service_role
WITH CHECK (true);
