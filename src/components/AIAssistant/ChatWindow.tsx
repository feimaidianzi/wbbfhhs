import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, User, Bot, Phone, Loader2, Sparkles, PhoneOff, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  isThinking?: boolean;
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  onSendMessage: (message: string) => void;
  onTransferToHuman: () => void;
  onCloseHumanMode?: () => void;
  onComplaint?: (content: string) => void;
  isLoading: boolean;
  isHumanMode?: boolean;
}

// Clean up AI response content - remove markdown artifacts and weird symbols
const cleanContent = (content: string): string => {
  return content
    // Remove thinking tags and content
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/<thinking>[\s\S]*?<\/thinking>/gi, '')
    // Remove markdown code blocks with language identifiers
    .replace(/```[\w]*\n?/g, '')
    // Remove inline code backticks
    .replace(/`([^`]+)`/g, '$1')
    // Remove markdown bold/italic
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove markdown headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove markdown links but keep text
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Clean up multiple newlines
    .replace(/\n{3,}/g, '\n\n')
    // Trim whitespace
    .trim();
};

// Extract thinking content from AI response
const extractThinking = (content: string): { thinking: string | null; response: string } => {
  const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/i) || 
                     content.match(/<thinking>([\s\S]*?)<\/thinking>/i);
  
  if (thinkMatch) {
    const thinking = thinkMatch[1].trim();
    const response = content.replace(thinkMatch[0], '').trim();
    return { thinking, response: cleanContent(response) };
  }
  
  return { thinking: null, response: cleanContent(content) };
};

export const ChatWindow = ({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  onTransferToHuman,
  onCloseHumanMode,
  onComplaint,
  isLoading,
  isHumanMode = false,
}: ChatWindowProps) => {
  const { t } = useLanguage();
  const [input, setInput] = useState("");
  const [expandedThinking, setExpandedThinking] = useState<Set<string>>(new Set());
  const [complaintDialogOpen, setComplaintDialogOpen] = useState(false);
  const [complaintContent, setComplaintContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const toggleThinking = (messageId: string) => {
    setExpandedThinking(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  const handleSubmitComplaint = () => {
    if (!complaintContent.trim()) return;
    onComplaint?.(complaintContent.trim());
    setComplaintContent("");
    setComplaintDialogOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-4 z-50 w-[380px] max-w-[calc(100vw-2rem)] animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col h-[520px] max-h-[70vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative">
              <Bot className="w-5 h-5 text-white" />
              {isLoading && (
                <div className="absolute inset-0 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              )}
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">
                {isHumanMode 
                  ? t('chat.humanAgent') 
                  : t('chat.aiAssistant')}
              </h3>
              <p className="text-white/70 text-xs flex items-center gap-1">
                {isLoading ? (
                  <>
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    {t('chat.thinking')}
                  </>
                ) : isHumanMode ? (
                  t('chat.humanConnected')
                ) : (
                  t('chat.online')
                )}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm">
                  {t('chat.welcome')}
                </p>
              </div>
            )}

            {messages.map((message) => {
              const { thinking, response } = message.role === 'assistant' 
                ? extractThinking(message.content)
                : { thinking: null, response: message.content };
              const isThinkingExpanded = expandedThinking.has(message.id);
              const isHumanAgentMessage = message.content.startsWith('[客服]');

              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role !== "user" && (
                    <div className={cn(
                      "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center",
                      isHumanAgentMessage ? "bg-green-100 dark:bg-green-900/30" : "bg-primary/10"
                    )}>
                      {isHumanAgentMessage ? (
                        <User className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <Bot className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  )}
                  <div className="max-w-[75%] space-y-1">
                    {/* Thinking indicator for assistant */}
                    {thinking && message.role === 'assistant' && !isHumanAgentMessage && (
                      <button
                        onClick={() => toggleThinking(message.id)}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        {t('chat.viewThinking')}
                        <span className="text-[10px]">{isThinkingExpanded ? '▲' : '▼'}</span>
                      </button>
                    )}
                    
                    {/* Thinking content */}
                    {thinking && isThinkingExpanded && (
                      <div className="bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-xs text-muted-foreground mb-2">
                        <div className="flex items-center gap-1 mb-1 font-medium">
                          <Sparkles className="w-3 h-3" />
                          {t('chat.thinkingProcess')}
                        </div>
                        <p className="whitespace-pre-wrap">{thinking}</p>
                      </div>
                    )}
                    
                    {/* Main message content */}
                    <div
                      className={cn(
                        "px-3 py-2 rounded-2xl text-sm",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : message.role === "system"
                          ? "bg-accent/20 text-foreground rounded-bl-md border border-accent/30"
                          : isHumanAgentMessage
                          ? "bg-green-100 dark:bg-green-900/30 text-foreground rounded-bl-md"
                          : "bg-muted text-foreground rounded-bl-md"
                      )}
                    >
                      {isHumanAgentMessage && (
                        <div className="text-xs text-green-600 dark:text-green-400 mb-1 font-medium">
                          {t('chat.humanAgent')}
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">
                        {isHumanAgentMessage ? response.replace('[客服] ', '') : response}
                      </p>
                    </div>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex-shrink-0 flex items-center justify-center">
                      <User className="w-4 h-4 text-accent" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-sm text-muted-foreground">
                      {t('chat.thinking')}
                    </span>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Action buttons */}
        <div className="px-4 py-2 border-t border-border/50 flex items-center justify-center gap-4">
          {isHumanMode ? (
            <>
              {onCloseHumanMode && (
                <button
                  onClick={onCloseHumanMode}
                  className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
                >
                  <PhoneOff className="w-3 h-3" />
                  {t('chat.endHuman')}
                </button>
              )}
              {onComplaint && (
                <button
                  onClick={() => setComplaintDialogOpen(true)}
                  className="text-xs text-muted-foreground hover:text-orange-500 transition-colors flex items-center gap-1"
                >
                  <AlertTriangle className="w-3 h-3" />
                  {t('chat.complaint')}
                </button>
              )}
            </>
          ) : (
            <button
              onClick={onTransferToHuman}
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              {t('chat.transferToHuman')}
            </button>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-border bg-muted/30">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('chat.inputPlaceholder')}
              className="flex-1 bg-background border-border/50 focus-visible:ring-primary/50"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Complaint Dialog */}
      <Dialog open={complaintDialogOpen} onOpenChange={setComplaintDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('chat.submitComplaint')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t('chat.complaintDesc')}
            </p>
            <Textarea
              value={complaintContent}
              onChange={(e) => setComplaintContent(e.target.value)}
              placeholder={t('chat.complaintPlaceholder')}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setComplaintDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleSubmitComplaint} disabled={!complaintContent.trim()}>
              {t('chat.submit')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
