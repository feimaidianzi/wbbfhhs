import { useState, useCallback, useEffect } from "react";
import { SiriButton } from "./SiriButton";
import { ChatWindow } from "./ChatWindow";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export const AIAssistant = () => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [sessionId] = useState(() => crypto.randomUUID());

  // Create or get conversation
  const ensureConversation = useCallback(async () => {
    if (conversationId) return conversationId;

    try {
      const { data, error } = await supabase
        .from("ai_conversations")
        .insert({
          session_id: sessionId,
          visitor_device: navigator.userAgent,
        })
        .select("id")
        .single();

      if (error) throw error;
      setConversationId(data.id);
      return data.id;
    } catch (error) {
      console.error("Failed to create conversation:", error);
      return null;
    }
  }, [conversationId, sessionId]);

  // Save message to database
  const saveMessage = useCallback(async (convId: string, role: string, content: string) => {
    try {
      await supabase.from("ai_conversation_messages").insert({
        conversation_id: convId,
        role,
        content,
      });
    } catch (error) {
      console.error("Failed to save message:", error);
    }
  }, []);

  // Extract lead info after conversation
  const extractLeadInfo = useCallback(async (convId: string, msgs: Message[]) => {
    try {
      await supabase.functions.invoke("ai-assistant", {
        body: {
          action: "extract_lead",
          conversationId: convId,
          messages: msgs.map(m => ({ role: m.role, content: m.content })),
        },
      });
    } catch (error) {
      console.error("Failed to extract lead:", error);
    }
  }, []);

  // Handle sending message
  const handleSendMessage = useCallback(async (content: string) => {
    const convId = await ensureConversation();
    if (!convId) {
      toast({
        title: isEn ? "Error" : "错误",
        description: isEn ? "Failed to start conversation" : "无法开始对话",
        variant: "destructive",
      });
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    await saveMessage(convId, "user", content);

    setIsLoading(true);
    setIsSpeaking(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map(m => ({
              role: m.role,
              content: m.content,
            })),
            conversationId: convId,
            sessionId,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(isEn ? "Too many requests, please wait" : "请求过于频繁,请稍后再试");
        }
        throw new Error(isEn ? "Failed to get response" : "获取回复失败");
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";
      let assistantMessageId = crypto.randomUUID();

      // Add empty assistant message
      setMessages(prev => [
        ...prev,
        { id: assistantMessageId, role: "assistant", content: "", timestamp: new Date() },
      ]);

      if (reader) {
        let buffer = "";
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          
          // Process SSE lines
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;
              
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  assistantContent += content;
                  setMessages(prev =>
                    prev.map(m =>
                      m.id === assistantMessageId
                        ? { ...m, content: assistantContent }
                        : m
                    )
                  );
                }
              } catch {
                // Ignore parse errors
              }
            }
          }
        }
      }

      // Save assistant message
      if (assistantContent) {
        await saveMessage(convId, "assistant", assistantContent);
        
        // Extract lead info every few messages
        const allMessages = [...messages, userMessage, { 
          id: assistantMessageId, 
          role: "assistant" as const, 
          content: assistantContent, 
          timestamp: new Date() 
        }];
        
        if (allMessages.length >= 4 && allMessages.length % 2 === 0) {
          extractLeadInfo(convId, allMessages);
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: isEn ? "Error" : "错误",
        description: error instanceof Error ? error.message : (isEn ? "Unknown error" : "未知错误"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsSpeaking(false);
    }
  }, [messages, ensureConversation, saveMessage, extractLeadInfo, sessionId, toast, isEn]);

  // Handle transfer to human
  const handleTransferToHuman = useCallback(async () => {
    if (!conversationId) return;

    try {
      await supabase.functions.invoke("ai-assistant", {
        body: {
          action: "transfer_human",
          conversationId,
        },
      });

      // Add system message
      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "system",
          content: isEn 
            ? "Connecting to human agent... Please call +86 176 7404 8404 or leave your contact info." 
            : "正在转接人工客服...请拨打 176-7404-8404 或留下您的联系方式,我们会尽快与您联系。",
          timestamp: new Date(),
        },
      ]);

      toast({
        title: isEn ? "Transfer Requested" : "已请求转接",
        description: isEn ? "A human agent will contact you soon" : "人工客服将尽快与您联系",
      });
    } catch (error) {
      console.error("Transfer error:", error);
    }
  }, [conversationId, toast, isEn]);

  // Extract lead info when closing chat
  useEffect(() => {
    return () => {
      if (conversationId && messages.length >= 2) {
        extractLeadInfo(conversationId, messages);
      }
    };
  }, []);

  return (
    <>
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        onSendMessage={handleSendMessage}
        onTransferToHuman={handleTransferToHuman}
        isLoading={isLoading}
      />
      
      <div className="fixed bottom-4 right-4 z-50">
        <SiriButton
          isActive={isOpen}
          isListening={isLoading}
          isSpeaking={isSpeaking}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    </>
  );
};
