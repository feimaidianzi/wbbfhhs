
DROP POLICY IF EXISTS "Anyone can create conversations" ON public.ai_conversations;
CREATE POLICY "Anyone can create conversations"
  ON public.ai_conversations
  FOR INSERT
  WITH CHECK (
    visitor_ip IS NULL
    AND visitor_location IS NULL
    AND human_agent_id IS NULL
    AND is_transferred_to_human IS NOT TRUE
  );
