
-- Fix visitor_sessions UPDATE policy: restrict to service_role only
-- Anonymous visitors should insert sessions, updates happen via service_role in edge functions
DROP POLICY IF EXISTS "Anyone can update their own session" ON public.visitor_sessions;

CREATE POLICY "Service role can update sessions"
ON public.visitor_sessions
FOR UPDATE
USING (auth.role() = 'service_role' OR EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_roles.user_id = auth.uid() 
  AND user_roles.role = ANY(ARRAY['admin'::app_role, 'moderator'::app_role])
));

-- Fix inquiries: add input length constraints via a validation trigger
CREATE OR REPLACE FUNCTION public.validate_inquiry_input()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Enforce length limits
  IF length(NEW.name) > 200 THEN
    RAISE EXCEPTION 'Name too long (max 200 chars)';
  END IF;
  IF length(NEW.email) > 255 THEN
    RAISE EXCEPTION 'Email too long (max 255 chars)';
  END IF;
  IF NEW.phone IS NOT NULL AND length(NEW.phone) > 50 THEN
    RAISE EXCEPTION 'Phone too long (max 50 chars)';
  END IF;
  IF NEW.company IS NOT NULL AND length(NEW.company) > 300 THEN
    RAISE EXCEPTION 'Company name too long (max 300 chars)';
  END IF;
  IF length(NEW.subject) > 500 THEN
    RAISE EXCEPTION 'Subject too long (max 500 chars)';
  END IF;
  IF length(NEW.message) > 5000 THEN
    RAISE EXCEPTION 'Message too long (max 5000 chars)';
  END IF;
  -- Basic email format validation
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_inquiry_before_insert
BEFORE INSERT ON public.inquiries
FOR EACH ROW
EXECUTE FUNCTION public.validate_inquiry_input();
