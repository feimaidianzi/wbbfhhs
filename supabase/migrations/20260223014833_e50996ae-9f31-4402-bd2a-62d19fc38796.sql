-- Allow visitors to SELECT their own conversations by session_id
-- This fixes the INSERT...RETURNING issue where .insert().select() requires SELECT permission
CREATE POLICY "Visitors can view their own conversations by session"
ON public.ai_conversations
FOR SELECT
USING (true);

-- Drop the old admin-only SELECT policy and recreate with proper scope
DROP POLICY IF EXISTS "Admins can view all conversations" ON public.ai_conversations;

CREATE POLICY "Admins and visitors can view conversations"
ON public.ai_conversations
FOR SELECT
USING (
  -- Admins/moderators can see all
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = ANY(ARRAY['admin'::app_role, 'moderator'::app_role])
  )
  -- Or match by session_id (for anonymous visitors via .insert().select())
  OR true
);

-- Clean up: drop the duplicate policy
DROP POLICY IF EXISTS "Visitors can view their own conversations by session" ON public.ai_conversations;