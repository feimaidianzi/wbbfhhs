-- Fix AI assistant conversation start permissions.
-- GRANTs already exist; this migration repairs the RLS policies that still blocked visitor-owned conversation flows.

DROP POLICY IF EXISTS "Visitors can view their own conversations by session" ON public.ai_conversations;
CREATE POLICY "Visitors can view their own conversations by session"
ON public.ai_conversations
FOR SELECT
TO anon, authenticated
USING (
  session_id = current_setting('request.headers', true)::json->>'x-visitor-session-id'
);

DROP POLICY IF EXISTS "Visitors can update their own active conversations" ON public.ai_conversations;
CREATE POLICY "Visitors can update their own active conversations"
ON public.ai_conversations
FOR UPDATE
TO anon, authenticated
USING (
  session_id = current_setting('request.headers', true)::json->>'x-visitor-session-id'
)
WITH CHECK (
  session_id = current_setting('request.headers', true)::json->>'x-visitor-session-id'
  AND visitor_ip IS NULL
  AND visitor_location IS NULL
  AND human_agent_id IS NULL
  AND is_transferred_to_human IS NOT TRUE
);

DROP POLICY IF EXISTS "Visitors can add messages to their own conversations" ON public.ai_conversation_messages;
CREATE POLICY "Visitors can add messages to their own conversations"
ON public.ai_conversation_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  role = 'user'
  AND EXISTS (
    SELECT 1
    FROM public.ai_conversations c
    WHERE c.id = ai_conversation_messages.conversation_id
      AND c.session_id = current_setting('request.headers', true)::json->>'x-visitor-session-id'
  )
);

DROP POLICY IF EXISTS "Visitors can view messages in their own conversations" ON public.ai_conversation_messages;
CREATE POLICY "Visitors can view messages in their own conversations"
ON public.ai_conversation_messages
FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.ai_conversations c
    WHERE c.id = ai_conversation_messages.conversation_id
      AND c.session_id = current_setting('request.headers', true)::json->>'x-visitor-session-id'
  )
);