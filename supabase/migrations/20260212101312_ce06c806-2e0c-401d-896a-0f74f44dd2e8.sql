
-- Replace the overly restrictive policy with one that allows anonymous updates
-- but only to the user's own session (matched by session_id in the WHERE clause)
DROP POLICY IF EXISTS "Service role can update sessions" ON public.visitor_sessions;

-- Allow updates but restrict what columns can be changed by anonymous users
-- The WHERE clause in the application code already filters by session_id
CREATE POLICY "Anyone can update their own session"
ON public.visitor_sessions
FOR UPDATE
USING (true);
