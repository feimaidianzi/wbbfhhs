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
  const [isHumanMode, setIsHumanMode] = useState(false);
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

  // When we have a conversationId, keep local "human mode" in sync with backend status
  useEffect(() => {
    if (!conversationId) return;

    let cancelled = false;

    const loadStatus = async () => {
      try {
        const { data, error } = await supabase
          .from("ai_conversations")
          .select("is_transferred_to_human")
          .eq("id", conversationId)
          .single();

        if (cancelled) return;
        if (!error && data) {
          setIsHumanMode(!!data.is_transferred_to_human);
        }
      } catch {
        // ignore
      }
    };

    loadStatus();

    const channel = supabase
      .channel(`ai-conversation-status-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "ai_conversations",
          filter: `id=eq.${conversationId}`,
        },
        (payload) => {
          const next = payload.new as any;
          if (typeof next?.is_transferred_to_human === "boolean") {
            setIsHumanMode(next.is_transferred_to_human);
          }
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

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

    // If already transferred to human, do NOT call AI anymore.
    if (isHumanMode) {
      toast({
        title: isEn ? "Sent" : "已发送",
        description: isEn ? "Message sent to human agent" : "消息已发送给人工客服",
      });
      return;
    }

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
  }, [messages, ensureConversation, saveMessage, extractLeadInfo, sessionId, toast, isEn, isHumanMode]);

  // Handle transfer to human
  const handleTransferToHuman = useCallback(async () => {
    // 确保有会话
    const convId = await ensureConversation();
    if (!convId) {
      toast({
        title: isEn ? "Error" : "错误",
        description: isEn ? "Failed to create session" : "无法创建会话",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await supabase.functions.invoke("ai-assistant", {
        body: {
          action: "transfer_human",
          conversationId: convId,
        },
      });

      if (response.error) throw response.error;

      // Add system message
      const systemMessage: Message = {
        id: crypto.randomUUID(),
        role: "system",
        content: isEn 
          ? "Transfer request sent! A human agent will reply to you shortly. You can continue chatting here or call +86 176-7404-8404." 
          : "已请求转接人工客服！客服人员将在此聊天窗口回复您，您也可以拨打 176-7404-8404 联系我们。",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, systemMessage]);
      await saveMessage(convId, "system", systemMessage.content);

      toast({
        title: isEn ? "Transfer Requested" : "转接成功",
        description: isEn ? "Human agent will reply in this chat" : "人工客服将在此对话中回复您",
      });

      // Immediately switch to human mode on the client.
      setIsHumanMode(true);

    } catch (error) {
      console.error("Transfer error:", error);
      toast({
        title: isEn ? "Transfer Failed" : "转接失败",
        description: isEn ? "Please try again or call us directly" : "请重试或直接拨打电话联系我们",
        variant: "destructive",
      });
    }
  }, [ensureConversation, saveMessage, toast, isEn]);

  // 订阅人工客服的回复 - 当有conversationId时自动订阅
  useEffect(() => {
    if (!conversationId) return;

    
    const channel = supabase
      .channel(`human-replies-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'ai_conversation_messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMsg = payload.new as any;
          // 只处理客服发来的消息（以[客服]开头）
          if (newMsg.role === 'assistant' && newMsg.content.startsWith('[客服]')) {
            setMessages(prev => {
              // 检查消息是否已存在
              if (prev.some(m => m.id === newMsg.id)) return prev;
              return [...prev, {
                id: newMsg.id,
                role: 'assistant' as const,
                content: newMsg.content,
                timestamp: new Date(newMsg.created_at),
              }];
            });
          }
        }
      )
      .subscribe();

    // 组件卸载或conversationId变化时清理订阅
    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

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
