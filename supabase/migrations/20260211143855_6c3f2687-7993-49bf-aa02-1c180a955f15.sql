
-- Fix 1: Restrict public SELECT on ai_conversation_messages
-- Currently: Anyone can view all messages (USING true)
-- Fix: Only admins/moderators can view messages

DROP POLICY IF EXISTS "Anyone can view messages" ON public.ai_conversation_messages;

CREATE POLICY "Admins can view all messages"
ON public.ai_conversation_messages
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = ANY (ARRAY['admin'::app_role, 'moderator'::app_role])
  )
);

-- Fix 2: Restrict public SELECT on ai_conversations  
-- Currently: Anyone can view (USING true) and update (USING true)
-- Fix: Restrict SELECT and UPDATE to admins only

DROP POLICY IF EXISTS "Anyone can view their session conversations" ON public.ai_conversations;
DROP POLICY IF EXISTS "Anyone can update their session conversations" ON public.ai_conversations;

CREATE POLICY "Admins can view all conversations"
ON public.ai_conversations
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = ANY (ARRAY['admin'::app_role, 'moderator'::app_role])
  )
);

CREATE POLICY "Admins can update conversations"
ON public.ai_conversations
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = ANY (ARRAY['admin'::app_role, 'moderator'::app_role])
  )
);
