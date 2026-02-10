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
  const { baseLang } = useLanguage();
  const isEn = baseLang === "en";
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
      // 先查找该访客是否有未结束的会话
      const { data: existingConv } = await supabase
        .from("ai_conversations")
        .select("id, is_transferred_to_human")
        .eq("session_id", visitorId)
        .neq("status", "resolved")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (existingConv) {
        setConversationId(existingConv.id);
        setIsHumanMode(!!existingConv.is_transferred_to_human);
        
        // 加载历史消息
        const { data: historyMessages } = await supabase
          .from("ai_conversation_messages")
          .select("*")
          .eq("conversation_id", existingConv.id)
          .order("created_at", { ascending: true });
        
        if (historyMessages && historyMessages.length > 0) {
          setMessages(historyMessages.map(m => ({
            id: m.id,
            role: m.role as "user" | "assistant" | "system",
            content: m.content,
            timestamp: new Date(m.created_at),
          })));
        }
        
        return existingConv.id;
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
          content: isEn 
            ? "Human chat ended due to inactivity. AI assistant is back to help you."
            : "由于长时间未回复，人工服务已结束。AI助手继续为您服务。",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, timeoutMsg]);
        
        toast({
          title: isEn ? "Session Ended" : "会话结束",
          description: isEn ? "Human chat ended due to inactivity" : "因超时未回复，人工服务已结束",
        });
      }
    }, 30000); // 每30秒检查一次

    return () => {
      if (timeoutCheckRef.current) {
        clearInterval(timeoutCheckRef.current);
      }
    };
  }, [isHumanMode, conversationId, isEn, toast]);

  // Save message to database
  const saveMessage = useCallback(async (convId: string, role: string, content: string) => {
    try {
      await supabase.from("ai_conversation_messages").insert({
        conversation_id: convId,
        role,
        content,
      });
      
      // 更新最后访客消息时间
      if (role === 'user') {
        lastMessageTimeRef.current = Date.now();
        await supabase
          .from("ai_conversations")
          .update({ last_visitor_message_at: new Date().toISOString() })
          .eq("id", convId);
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

    // 更新最后活动时间
    lastMessageTimeRef.current = Date.now();

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
            sessionId: visitorId,
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
  }, [messages, ensureConversation, saveMessage, extractLeadInfo, visitorId, toast, isEn, isHumanMode]);

  // Handle transfer to human
  const handleTransferToHuman = useCallback(async () => {
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

      setIsHumanMode(true);
      lastMessageTimeRef.current = Date.now();

    } catch (error) {
      console.error("Transfer error:", error);
      toast({
        title: isEn ? "Transfer Failed" : "转接失败",
        description: isEn ? "Please try again or call us directly" : "请重试或直接拨打电话联系我们",
        variant: "destructive",
      });
    }
  }, [ensureConversation, saveMessage, toast, isEn]);

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
        content: isEn 
          ? "Human chat ended. AI assistant is back to help you."
          : "已结束人工服务，AI助手继续为您服务。",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, systemMessage]);
      await saveMessage(conversationId, "system", systemMessage.content);

      toast({
        title: isEn ? "Ended" : "已结束",
        description: isEn ? "AI assistant is back" : "AI助手继续为您服务",
      });
    } catch (error) {
      console.error("Error closing human mode:", error);
    }
  }, [conversationId, saveMessage, toast, isEn]);

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
        content: isEn 
          ? "Your complaint has been submitted. Our complaint specialist will handle it shortly."
          : "您的投诉已提交，我们的投诉专员将尽快处理。",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, systemMessage]);
      await saveMessage(conversationId, "system", systemMessage.content);

      toast({
        title: isEn ? "Submitted" : "已提交",
        description: isEn ? "Complaint specialist will handle your issue" : "投诉专员将处理您的问题",
      });
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast({
        title: isEn ? "Failed" : "提交失败",
        description: isEn ? "Please try again" : "请重试",
        variant: "destructive",
      });
    }
  }, [conversationId, visitorId, saveMessage, toast, isEn]);

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
