
-- Add validation trigger for ai_conversation_messages to enforce content limits and role validation
CREATE OR REPLACE FUNCTION public.validate_ai_message_before_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Enforce content length limit (max 2000 chars per message)
  IF length(NEW.content) > 2000 THEN
    RAISE EXCEPTION 'Message content too long (max 2000 chars)';
  END IF;

  -- Enforce valid role values
  IF NEW.role NOT IN ('user', 'assistant', 'system', 'human_agent') THEN
    RAISE EXCEPTION 'Invalid message role';
  END IF;

  -- Verify conversation_id exists
  IF NOT EXISTS (SELECT 1 FROM public.ai_conversations WHERE id = NEW.conversation_id) THEN
    RAISE EXCEPTION 'Invalid conversation_id';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_ai_message_before_insert
BEFORE INSERT ON public.ai_conversation_messages
FOR EACH ROW
EXECUTE FUNCTION public.validate_ai_message_before_insert();
