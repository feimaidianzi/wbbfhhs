import { useState, useCallback, useEffect, useRef } from "react";
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

// 获取或创建持久化的会话ID - 与VisitorTracker共用同一个session_id
const getOrCreateVisitorId = (): string => {
  // 优先使用VisitorTracker创建的session_id，确保两个系统使用同一个ID
  const visitorSessionKey = 'visitor_session_id';
  const legacyKey = 'cani_visitor_id';
  
  // 检查是否有VisitorTracker创建的session
  let visitorId = localStorage.getItem(visitorSessionKey);
  
  if (visitorId) {
    return visitorId;
  }
  
  // 如果VisitorTracker还没初始化，创建一个兼容格式的ID
  visitorId = localStorage.getItem(legacyKey);
  if (!visitorId) {
    visitorId = `vs_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem(legacyKey, visitorId);
    // 同时设置到visitor_session_id，让VisitorTracker也能识别
    localStorage.setItem(visitorSessionKey, visitorId);
  }
  return visitorId;
};

export const AIAssistant = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isHumanMode, setIsHumanMode] = useState(false);
  const [visitorId] = useState(getOrCreateVisitorId);
  const lastMessageTimeRef = useRef<number>(Date.now());
  const timeoutCheckRef = useRef<NodeJS.Timeout | null>(null);

  // 加载或创建会话 - 基于持久化的visitorId
  const ensureConversation = useCallback(async () => {
    if (conversationId) return conversationId;

    try {
      // Load history via edge function (RLS blocks direct client reads)
      const historyResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ action: "load_history", sessionId: visitorId }),
        }
      );

      if (historyResponse.ok) {
        const data = await historyResponse.json();
        if (data.conversation) {
          setConversationId(data.conversation.id);
          setIsHumanMode(!!data.conversation.is_transferred_to_human);
          
          if (data.messages && data.messages.length > 0) {
            setMessages(data.messages.map((m: any) => ({
              id: m.id,
              role: m.role as "user" | "assistant" | "system",
              content: m.content,
              timestamp: new Date(m.created_at),
            })));
          }
          
          return data.conversation.id;
        }
      }

      // 创建新会话
      const { data, error } = await supabase
        .from("ai_conversations")
        .insert({
          session_id: visitorId,
          visitor_device: navigator.userAgent,
          is_visitor_online: true,
        })
        .select("id")
        .single();

      if (error) throw error;
      setConversationId(data.id);
      
      // 关联到visitor_sessions表
      await supabase
        .from("visitor_sessions")
        .update({ ai_conversation_id: data.id })
        .eq("session_id", visitorId);
      
      return data.id;
    } catch (error) {
      console.error("Failed to create/load conversation:", error);
      return null;
    }
  }, [conversationId, visitorId]);

  // 首次打开时加载会话
  useEffect(() => {
    if (isOpen && !conversationId) {
      ensureConversation();
    }
  }, [isOpen, conversationId, ensureConversation]);

  // 同步人工模式状态
  useEffect(() => {
    if (!conversationId) return;

    let cancelled = false;

    const loadStatus = async () => {
      try {
        const { data, error } = await supabase
          .from("ai_conversations")
          .select("is_transferred_to_human, status")
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
          // 如果会话被关闭，重置状态
          if (next?.status === 'resolved') {
            setIsHumanMode(false);
          }
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  // 超时检测 - 访客3分钟未回复则自动关闭人工模式
  useEffect(() => {
    if (!isHumanMode || !conversationId) {
      if (timeoutCheckRef.current) {
        clearInterval(timeoutCheckRef.current);
        timeoutCheckRef.current = null;
      }
      return;
    }

    timeoutCheckRef.current = setInterval(async () => {
      const elapsed = Date.now() - lastMessageTimeRef.current;
      const timeoutMs = 3 * 60 * 1000; // 3分钟

      if (elapsed >= timeoutMs) {
        // 自动关闭人工模式
        await supabase
          .from("ai_conversations")
          .update({
            is_transferred_to_human: false,
            auto_closed_at: new Date().toISOString(),
          })
          .eq("id", conversationId);

        setIsHumanMode(false);
        
        const timeoutMsg: Message = {
          id: crypto.randomUUID(),
          role: "system",
          content: t('chat.sessionEndedMsg'),
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, timeoutMsg]);
        
        toast({
          title: t('chat.sessionEnded'),
          description: t('chat.sessionEndedDesc'),
        });
      }
    }, 30000); // 每30秒检查一次

    return () => {
      if (timeoutCheckRef.current) {
        clearInterval(timeoutCheckRef.current);
      }
    };
  }, [isHumanMode, conversationId, t, toast]);

  // Save message to database via edge function (visitors can't insert directly)
  const saveMessage = useCallback(async (convId: string, role: string, content: string) => {
    try {
      await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            action: "save_message",
            conversationId: convId,
            role,
            content,
          }),
        }
      );
      
      if (role === 'user') {
        lastMessageTimeRef.current = Date.now();
      }
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
        title: t('chat.error'),
        description: t('chat.failedToStart'),
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

    // 更新最后活动时间
    lastMessageTimeRef.current = Date.now();

    // If already transferred to human, do NOT call AI anymore.
    if (isHumanMode) {
      toast({
        title: t('chat.sent'),
        description: t('chat.sentToAgent'),
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
            sessionId: visitorId,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
            throw new Error(t('chat.tooManyRequests'));
          }
          throw new Error(t('chat.failedToGetResponse'));
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
        title: t('chat.error'),
        description: error instanceof Error ? error.message : t('chat.unknownError'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsSpeaking(false);
    }
  }, [messages, ensureConversation, saveMessage, extractLeadInfo, visitorId, toast, t, isHumanMode]);

  // Handle transfer to human
  const handleTransferToHuman = useCallback(async () => {
    const convId = await ensureConversation();
    if (!convId) {
      toast({
        title: t('chat.error'),
        description: t('chat.failedToStart'),
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

      const systemMessage: Message = {
        id: crypto.randomUUID(),
        role: "system",
        content: t('chat.transferMsg'),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, systemMessage]);
      await saveMessage(convId, "system", systemMessage.content);

      toast({
        title: t('chat.transferRequested'),
        description: t('chat.agentWillReply'),
      });

      setIsHumanMode(true);
      lastMessageTimeRef.current = Date.now();

    } catch (error) {
      console.error("Transfer error:", error);
      toast({
        title: t('chat.transferFailed'),
        description: t('chat.tryAgainOrCall'),
        variant: "destructive",
      });
    }
  }, [ensureConversation, saveMessage, toast, t]);

  // Handle closing human mode
  const handleCloseHumanMode = useCallback(async () => {
    if (!conversationId) return;

    try {
      await supabase
        .from("ai_conversations")
        .update({ is_transferred_to_human: false })
        .eq("id", conversationId);

      setIsHumanMode(false);

      const systemMessage: Message = {
        id: crypto.randomUUID(),
        role: "system",
        content: t('chat.humanEndedMsg'),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, systemMessage]);
      await saveMessage(conversationId, "system", systemMessage.content);

      toast({
        title: t('chat.ended'),
        description: t('chat.aiIsBack'),
      });
    } catch (error) {
      console.error("Error closing human mode:", error);
    }
  }, [conversationId, saveMessage, toast, t]);

  // Handle complaint
  const handleComplaint = useCallback(async (content: string) => {
    if (!conversationId) return;

    try {
      await supabase.from("complaints").insert({
        conversation_id: conversationId,
        session_id: visitorId,
        content,
      });

      const systemMessage: Message = {
        id: crypto.randomUUID(),
        role: "system",
        content: t('chat.complaintSubmittedMsg'),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, systemMessage]);
      await saveMessage(conversationId, "system", systemMessage.content);

      toast({
        title: t('chat.submitted'),
        description: t('chat.complaintSubmittedDesc'),
      });
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast({
        title: t('chat.failed'),
        description: t('chat.pleaseTryAgain'),
        variant: "destructive",
      });
    }
  }, [conversationId, visitorId, saveMessage, toast, t]);

  // 订阅人工客服的回复
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
          // 只处理客服发来的消息
          if (newMsg.role === 'assistant' && newMsg.content.startsWith('[客服]')) {
            setMessages(prev => {
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
        onCloseHumanMode={handleCloseHumanMode}
        onComplaint={handleComplaint}
        isLoading={isLoading}
        isHumanMode={isHumanMode}
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
