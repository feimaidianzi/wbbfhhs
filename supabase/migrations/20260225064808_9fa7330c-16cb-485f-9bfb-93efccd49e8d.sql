
-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can add messages" ON public.ai_conversation_messages;

-- Only authenticated admins/moderators can insert directly (for CustomerServiceChat)
CREATE POLICY "Admins can insert messages"
ON public.ai_conversation_messages
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role IN ('admin', 'moderator')
  )
);
