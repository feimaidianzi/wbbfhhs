import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Send, 
  Bell, 
  BellOff, 
  User, 
  MessageSquare,
  Clock,
  CheckCheck,
  Volume2,
  VolumeX
} from "lucide-react";

interface Conversation {
  id: string;
  session_id: string;
  status: string;
  is_transferred_to_human: boolean;
  transferred_at: string | null;
  created_at: string;
  visitor_ip: string | null;
  visitor_device: string | null;
  unread_count?: number;
}

interface Message {
  id: string;
  conversation_id: string;
  role: string;
  content: string;
  created_at: string;
}

// Notification sound
const playNotificationSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 800;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
};

export default function CustomerServiceChat() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastMessageCount = useRef<Record<string, number>>({});

  // Check admin authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
        return;
      }
      
      // Check if user has admin role
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single();
      
      if (!roles || (roles.role !== 'admin' && roles.role !== 'moderator')) {
        toast({
          variant: "destructive",
          title: "权限不足",
          description: "您没有访问客服系统的权限"
        });
        navigate('/admin');
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  // Load transferred conversations
  useEffect(() => {
    const loadConversations = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_conversations')
        .select('*')
        .eq('is_transferred_to_human', true)
        .order('transferred_at', { ascending: false });
      
      if (error) {
        console.error('Error loading conversations:', error);
        toast({
          variant: "destructive",
          title: "加载失败",
          description: "无法加载会话列表"
        });
      } else {
        setConversations(data || []);
      }
      setLoading(false);
    };

    loadConversations();
  }, [toast]);

  // Subscribe to new messages in real-time
  useEffect(() => {
    const channel = supabase
      .channel('customer-service-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'ai_conversation_messages'
        },
        (payload) => {
          const newMsg = payload.new as Message;
          
          // Play sound for new user messages
          if (newMsg.role === 'user' && soundEnabled) {
            playNotificationSound();
            
            // Show toast notification
            toast({
              title: "新消息",
              description: newMsg.content.substring(0, 50) + (newMsg.content.length > 50 ? '...' : ''),
            });
          }
          
          // Update messages if viewing this conversation
          if (selectedConversation && newMsg.conversation_id === selectedConversation.id) {
            setMessages(prev => [...prev, newMsg]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedConversation, soundEnabled, toast]);

  // Subscribe to new transferred conversations
  useEffect(() => {
    const channel = supabase
      .channel('customer-service-transfers')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'ai_conversations',
          filter: 'is_transferred_to_human=eq.true'
        },
        (payload) => {
          const updated = payload.new as Conversation;
          
          // Check if this is a new transfer
          setConversations(prev => {
            const exists = prev.find(c => c.id === updated.id);
            if (!exists) {
              if (soundEnabled) {
                playNotificationSound();
                toast({
                  title: "新的转人工请求",
                  description: "有用户请求人工客服",
                });
              }
              return [updated, ...prev];
            }
            return prev.map(c => c.id === updated.id ? updated : c);
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [soundEnabled, toast]);

  // Load messages when conversation is selected
  useEffect(() => {
    if (!selectedConversation) return;

    const loadMessages = async () => {
      const { data, error } = await supabase
        .from('ai_conversation_messages')
        .select('*')
        .eq('conversation_id', selectedConversation.id)
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error loading messages:', error);
      } else {
        setMessages(data || []);
      }
    };

    loadMessages();
  }, [selectedConversation]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send message as customer service agent
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || sending) return;

    setSending(true);
    const messageContent = newMessage.trim();
    setNewMessage("");

    try {
      const { error } = await supabase
        .from('ai_conversation_messages')
        .insert({
          conversation_id: selectedConversation.id,
          role: 'assistant',
          content: `[客服] ${messageContent}`
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        variant: "destructive",
        title: "发送失败",
        description: "消息发送失败，请重试"
      });
      setNewMessage(messageContent);
    } finally {
      setSending(false);
    }
  };

  // Mark conversation as resolved
  const handleResolveConversation = async () => {
    if (!selectedConversation) return;

    try {
      const { error } = await supabase
        .from('ai_conversations')
        .update({ 
          status: 'resolved',
          ended_at: new Date().toISOString()
        })
        .eq('id', selectedConversation.id);

      if (error) throw error;

      toast({
        title: "会话已关闭",
        description: "该会话已标记为已解决"
      });

      setConversations(prev => prev.map(c => 
        c.id === selectedConversation.id 
          ? { ...c, status: 'resolved' }
          : c
      ));
    } catch (error) {
      console.error('Error resolving conversation:', error);
      toast({
        variant: "destructive",
        title: "操作失败",
        description: "无法关闭会话"
      });
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">客服工作台</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "关闭提示音" : "开启提示音"}
            >
              {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
          {/* Conversation List */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                待处理会话
                <Badge variant="secondary" className="ml-auto">
                  {conversations.filter(c => c.status !== 'resolved').length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-240px)]">
                {loading ? (
                  <div className="p-4 text-center text-muted-foreground">
                    加载中...
                  </div>
                ) : conversations.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    暂无待处理会话
                  </div>
                ) : (
                  <div className="space-y-1 p-2">
                    {conversations.map((conversation) => (
                      <button
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation)}
                        className={`w-full p-3 rounded-lg text-left transition-colors ${
                          selectedConversation?.id === conversation.id
                            ? 'bg-accent'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm truncate">
                                访客 {conversation.session_id.substring(0, 8)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(conversation.transferred_at || conversation.created_at)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge 
                                variant={conversation.status === 'resolved' ? 'secondary' : 'default'}
                                className="text-xs"
                              >
                                {conversation.status === 'resolved' ? '已解决' : '待处理'}
                              </Badge>
                              {conversation.visitor_device && (
                                <span className="text-xs text-muted-foreground truncate">
                                  {conversation.visitor_device}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 flex flex-col">
            {selectedConversation ? (
              <>
                <CardHeader className="pb-3 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          访客 {selectedConversation.session_id.substring(0, 8)}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          转接时间: {formatTime(selectedConversation.transferred_at || selectedConversation.created_at)}
                        </div>
                      </div>
                    </div>
                    {selectedConversation.status !== 'resolved' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleResolveConversation}
                      >
                        <CheckCheck className="h-4 w-4 mr-1" />
                        标记已解决
                      </Button>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 p-0 overflow-hidden">
                  <ScrollArea className="h-[calc(100vh-380px)] p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === 'user' ? 'justify-start' : 'justify-end'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                              message.role === 'user'
                                ? 'bg-muted'
                                : message.content.startsWith('[客服]')
                                ? 'bg-green-100 dark:bg-green-900/30'
                                : 'bg-primary text-primary-foreground'
                            }`}
                          >
                            {message.content.startsWith('[客服]') && (
                              <div className="text-xs text-green-600 dark:text-green-400 mb-1 font-medium">
                                客服回复
                              </div>
                            )}
                            <p className="text-sm whitespace-pre-wrap">
                              {message.content.replace('[客服] ', '')}
                            </p>
                            <p className="text-xs opacity-70 mt-1 text-right">
                              {formatTime(message.created_at)}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </CardContent>

                {/* Message Input */}
                {selectedConversation.status !== 'resolved' && (
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="输入回复消息..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        disabled={sending}
                      />
                      <Button onClick={handleSendMessage} disabled={sending || !newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>选择一个会话开始回复</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}