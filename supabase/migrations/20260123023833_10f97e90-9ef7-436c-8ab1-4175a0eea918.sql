-- Enable realtime for ai_conversation_messages table
ALTER PUBLICATION supabase_realtime ADD TABLE public.ai_conversation_messages;

-- Also enable realtime for ai_conversations table for transfer notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.ai_conversations;