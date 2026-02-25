import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import EnhancedVisitorProfile from "@/components/admin/EnhancedVisitorProfile";
import QuickReplies from "@/components/admin/QuickReplies";
import ConversationNotes from "@/components/admin/ConversationNotes";
import { 
  ArrowLeft, Send, User, MessageSquare, Clock, CheckCheck,
  Volume2, VolumeX, UserCircle, Search, Filter, BarChart3,
  Users, Timer, TrendingUp, Keyboard
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
  last_message?: string;
  last_message_at?: string;
  visitor_location?: string | null;
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
  try {
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
  } catch {}
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
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'resolved' | 'transferred'>('all');
  const [mobileView, setMobileView] = useState<'list' | 'chat' | 'profile'>('list');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check admin authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate('/admin/login'); return; }
      
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single();
      
      if (!roles || (roles.role !== 'admin' && roles.role !== 'moderator')) {
        toast({ variant: "destructive", title: "权限不足", description: "您没有访问客服系统的权限" });
        navigate('/admin');
      }
    };
    checkAuth();
  }, [navigate, toast]);

  // Load conversations with last message preview
  const loadConversations = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('ai_conversations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({ variant: "destructive", title: "加载失败", description: "无法加载会话列表" });
      setLoading(false);
      return;
    }

    // Deduplicate by session_id
    const uniqueBySession = new Map<string, Conversation>();
    (data || []).forEach(conv => {
      if (!uniqueBySession.has(conv.session_id)) {
        uniqueBySession.set(conv.session_id, conv);
      }
    });
    
    const convList = Array.from(uniqueBySession.values());
    
    // Fetch last message for each conversation (batch)
    if (convList.length > 0) {
      const convIds = convList.map(c => c.id);
      const { data: lastMsgs } = await supabase
        .from('ai_conversation_messages')
        .select('conversation_id, content, created_at, role')
        .in('conversation_id', convIds)
        .order('created_at', { ascending: false });
      
      if (lastMsgs) {
        const lastMsgMap = new Map<string, { content: string; created_at: string; role: string }>();
        const unreadMap = new Map<string, number>();
        
        lastMsgs.forEach(msg => {
          if (!lastMsgMap.has(msg.conversation_id)) {
            lastMsgMap.set(msg.conversation_id, msg);
          }
          // Count unread user messages (messages from user after last assistant message)
          if (msg.role === 'user') {
            unreadMap.set(msg.conversation_id, (unreadMap.get(msg.conversation_id) || 0) + 1);
          } else if (msg.role === 'assistant' && !unreadMap.has(msg.conversation_id)) {
            // First assistant message found means no unread after it
          }
        });
        
        convList.forEach(conv => {
          const lastMsg = lastMsgMap.get(conv.id);
          if (lastMsg) {
            conv.last_message = lastMsg.content.startsWith('[客服]') 
              ? `[你] ${lastMsg.content.replace('[客服] ', '')}`
              : lastMsg.role === 'user' ? lastMsg.content : `[AI] ${lastMsg.content}`;
            conv.last_message_at = lastMsg.created_at;
          }
        });
      }
    }
    
    setConversations(convList);
    setLoading(false);
  }, [toast]);

  useEffect(() => { loadConversations(); }, [loadConversations]);

  // Realtime: new messages
  useEffect(() => {
    const channel = supabase
      .channel('customer-service-messages')
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'ai_conversation_messages'
      }, (payload) => {
        const newMsg = payload.new as Message;
        
        if (newMsg.role === 'user' && soundEnabled) {
          playNotificationSound();
          const convId = newMsg.conversation_id;
          toast({
            title: "新消息",
            description: newMsg.content.substring(0, 50) + (newMsg.content.length > 50 ? '...' : ''),
            action: (
              <ToastAction
                altText="查看会话"
                onClick={() => {
                  setConversations(prev => {
                    const targetConv = prev.find(c => c.id === convId);
                    if (targetConv) {
                      setSelectedConversation(targetConv);
                      setMobileView('chat');
                    }
                    return prev;
                  });
                }}
              >
                查看
              </ToastAction>
            ),
          });
        }
        
        // Update conversation last message
        setConversations(prev => prev.map(c => {
          if (c.id === newMsg.conversation_id) {
            return {
              ...c,
              last_message: newMsg.role === 'user' ? newMsg.content : 
                newMsg.content.startsWith('[客服]') ? `[你] ${newMsg.content.replace('[客服] ', '')}` : `[AI] ${newMsg.content}`,
              last_message_at: newMsg.created_at,
              unread_count: newMsg.role === 'user' && selectedConversation?.id !== newMsg.conversation_id 
                ? (c.unread_count || 0) + 1 : c.unread_count,
            };
          }
          return c;
        }));
        
        if (selectedConversation && newMsg.conversation_id === selectedConversation.id) {
          setMessages(prev => {
            if (prev.some(m => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [selectedConversation, soundEnabled, toast]);

  // Realtime: new and updated conversations
  useEffect(() => {
    const channel = supabase
      .channel('customer-service-conversations')
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'ai_conversations'
      }, (payload) => {
        const newConv = payload.new as Conversation;
        setConversations(prev => {
          if (prev.find(c => c.id === newConv.id)) return prev;
          return [newConv, ...prev];
        });
      })
      .on('postgres_changes', {
        event: 'UPDATE', schema: 'public', table: 'ai_conversations'
      }, (payload) => {
        const updated = payload.new as Conversation;
        setConversations(prev => {
          const exists = prev.find(c => c.id === updated.id);
          if (!exists) {
            if (updated.is_transferred_to_human && soundEnabled) {
              playNotificationSound();
              toast({ title: "新的转人工请求", description: "有用户请求人工客服" });
            }
            return [updated, ...prev];
          }
          return prev.map(c => c.id === updated.id ? { ...c, ...updated } : c);
        });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [soundEnabled, toast]);

  // Load messages when conversation selected
  useEffect(() => {
    if (!selectedConversation) return;
    
    const loadMessages = async () => {
      const { data } = await supabase
        .from('ai_conversation_messages')
        .select('*')
        .eq('conversation_id', selectedConversation.id)
        .order('created_at', { ascending: true });
      
      setMessages(data || []);
      
      // Clear unread
      setConversations(prev => prev.map(c => 
        c.id === selectedConversation.id ? { ...c, unread_count: 0 } : c
      ));
    };
    loadMessages();
  }, [selectedConversation]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-focus input when conversation selected
  useEffect(() => {
    if (selectedConversation && mobileView === 'chat') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [selectedConversation, mobileView]);

  // Mobile auto-switch
  useEffect(() => {
    if (selectedConversation && window.innerWidth < 1024) {
      setMobileView('chat');
    }
  }, [selectedConversation]);

  // Send message
  const handleSendMessage = useCallback(async () => {
    if (!newMessage.trim() || !selectedConversation || sending) return;
    setSending(true);
    const messageContent = newMessage.trim();
    setNewMessage("");

    try {
      const { data, error } = await supabase
        .from('ai_conversation_messages')
        .insert({
          conversation_id: selectedConversation.id,
          role: 'assistant',
          content: `[客服] ${messageContent}`
        })
        .select()
        .single();

      if (error) throw error;
      if (data) setMessages(prev => [...prev, data]);
    } catch {
      toast({ variant: "destructive", title: "发送失败", description: "消息发送失败，请重试" });
      setNewMessage(messageContent);
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  }, [newMessage, selectedConversation, sending, toast]);

  // Resolve conversation
  const handleResolveConversation = useCallback(async () => {
    if (!selectedConversation) return;
    try {
      const { error } = await supabase
        .from('ai_conversations')
        .update({ status: 'resolved', ended_at: new Date().toISOString() })
        .eq('id', selectedConversation.id);
      if (error) throw error;
      toast({ title: "会话已关闭", description: "该会话已标记为已解决" });
      setConversations(prev => prev.map(c => 
        c.id === selectedConversation.id ? { ...c, status: 'resolved' } : c
      ));
    } catch {
      toast({ variant: "destructive", title: "操作失败", description: "无法关闭会话" });
    }
  }, [selectedConversation, toast]);

  // Format helpers
  const formatTime = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  }, []);

  const formatRelativeTime = useCallback((dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return '刚刚';
    if (mins < 60) return `${mins}分钟前`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}小时前`;
    return `${Math.floor(hours / 24)}天前`;
  }, []);

  // Filtered conversations
  const filteredConversations = useMemo(() => {
    return conversations.filter(c => {
      if (statusFilter === 'pending' && c.status === 'resolved') return false;
      if (statusFilter === 'resolved' && c.status !== 'resolved') return false;
      if (statusFilter === 'transferred' && !c.is_transferred_to_human) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return c.session_id.toLowerCase().includes(q) || 
               c.visitor_ip?.toLowerCase().includes(q) ||
               c.visitor_location?.toLowerCase().includes(q) ||
               c.last_message?.toLowerCase().includes(q);
      }
      return true;
    });
  }, [conversations, statusFilter, searchQuery]);

  // Stats
  const stats = useMemo(() => {
    const pending = conversations.filter(c => c.status !== 'resolved').length;
    const resolved = conversations.filter(c => c.status === 'resolved').length;
    const transferred = conversations.filter(c => c.is_transferred_to_human).length;
    const totalUnread = conversations.reduce((sum, c) => sum + (c.unread_count || 0), 0);
    return { pending, resolved, transferred, total: conversations.length, totalUnread };
  }, [conversations]);

  // Group messages by date
  const groupedMessages = useMemo(() => {
    const groups: { date: string; messages: Message[] }[] = [];
    let currentDate = '';
    
    messages.forEach(msg => {
      const date = new Date(msg.created_at).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
      if (date !== currentDate) {
        currentDate = date;
        groups.push({ date, messages: [msg] });
      } else {
        groups[groups.length - 1].messages.push(msg);
      }
    });
    return groups;
  }, [messages]);

  // Keyboard shortcut: Ctrl+Enter to send
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur flex-shrink-0">
        <div className="container flex h-12 sm:h-14 items-center gap-2 sm:gap-4 px-2 sm:px-4">
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10" onClick={() => {
            if (mobileView !== 'list' && window.innerWidth < 768) {
              setMobileView('list');
              setSelectedConversation(null);
            } else {
              navigate('/admin');
            }
          }}>
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <h1 className="text-base sm:text-lg font-semibold truncate">客服工作台</h1>
          
          {/* Stats badges */}
          <div className="hidden sm:flex items-center gap-2 ml-2">
            <Badge variant="destructive" className="text-xs gap-1">
              <Timer className="h-3 w-3" />
              待处理 {stats.pending}
            </Badge>
            {stats.totalUnread > 0 && (
              <Badge variant="default" className="text-xs gap-1 animate-pulse">
                未读 {stats.totalUnread}
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs gap-1">
              <CheckCheck className="h-3 w-3" />
              已解决 {stats.resolved}
            </Badge>
          </div>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            {selectedConversation && (
              <Button variant={mobileView === 'profile' ? 'default' : 'ghost'} size="icon"
                className="lg:hidden h-8 w-8 sm:h-10 sm:w-10"
                onClick={() => setMobileView(mobileView === 'profile' ? 'chat' : 'profile')}>
                <UserCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "关闭提示音" : "开启提示音"}>
              {soundEnabled ? <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" /> : <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="container py-2 sm:py-4 px-2 sm:px-4 max-w-screen-2xl h-[calc(100vh-56px-1rem)] sm:h-[calc(100vh-56px-2rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-4 h-full auto-rows-fr">
            
            {/* Conversation List */}
            <Card className={`md:col-span-1 lg:col-span-3 h-full flex flex-col overflow-hidden ${mobileView !== 'list' ? 'hidden md:flex' : 'flex'}`}>
              <CardHeader className="pb-2 flex-shrink-0 space-y-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    会话列表
                  </CardTitle>
                  <Badge variant="secondary">{filteredConversations.length}</Badge>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索会话..."
                    className="pl-8 h-8 text-sm"
                  />
                </div>
                
                {/* Status filter tabs */}
                <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 h-7">
                    <TabsTrigger value="all" className="text-xs h-6 px-1">
                      全部 ({stats.total})
                    </TabsTrigger>
                    <TabsTrigger value="transferred" className="text-xs h-6 px-1">
                      转人工 ({stats.transferred})
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="text-xs h-6 px-1">
                      待处理 ({stats.pending})
                    </TabsTrigger>
                    <TabsTrigger value="resolved" className="text-xs h-6 px-1">
                      已解决 ({stats.resolved})
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="flex-1 p-0 overflow-hidden min-h-0">
                <ScrollArea className="h-full">
                  {loading ? (
                    <div className="p-4 text-center text-muted-foreground">加载中...</div>
                  ) : filteredConversations.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      {searchQuery ? '未找到匹配的会话' : '暂无待处理会话'}
                    </div>
                  ) : (
                    <div className="space-y-0.5 p-1.5">
                      {filteredConversations.map((conversation) => (
                        <button
                          key={conversation.id}
                          onClick={() => setSelectedConversation(conversation)}
                          className={`w-full p-2.5 rounded-lg text-left transition-colors relative ${
                            selectedConversation?.id === conversation.id
                              ? 'bg-accent'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <div className="relative flex-shrink-0">
                              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              {/* Online indicator */}
                              {conversation.status !== 'resolved' && (
                                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-medium text-sm truncate">
                                  访客 {conversation.session_id.substring(0, 8)}
                                </span>
                                <span className="text-[10px] text-muted-foreground flex-shrink-0">
                                  {formatRelativeTime(conversation.last_message_at || conversation.transferred_at || conversation.created_at)}
                                </span>
                              </div>
                              {/* Last message preview */}
                              <p className="text-xs text-muted-foreground truncate mt-0.5 leading-relaxed">
                                {conversation.last_message || '暂无消息'}
                              </p>
                              <div className="flex items-center gap-1.5 mt-1">
                                <Badge 
                                  variant={conversation.status === 'resolved' ? 'secondary' : conversation.is_transferred_to_human ? 'destructive' : 'outline'}
                                  className="text-[10px] h-4 px-1"
                                >
                                  {conversation.status === 'resolved' ? '已解决' : conversation.is_transferred_to_human ? '转人工' : 'AI对话'}
                                </Badge>
                                {conversation.visitor_location && (
                                  <span className="text-[10px] text-muted-foreground truncate">
                                    {conversation.visitor_location}
                                  </span>
                                )}
                              </div>
                            </div>
                            {/* Unread badge */}
                            {(conversation.unread_count || 0) > 0 && (
                              <span className="absolute top-2 right-2 min-w-[18px] h-[18px] rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                                {conversation.unread_count}
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Chat Area */}
            <Card className={`md:col-span-1 lg:col-span-4 h-full flex flex-col overflow-hidden ${mobileView !== 'chat' ? 'hidden md:flex' : 'flex'}`}>
              {selectedConversation ? (
                <>
                  <CardHeader className="pb-2 border-b flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="relative flex-shrink-0">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          {selectedConversation.status !== 'resolved' && (
                            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-sm">
                            访客 {selectedConversation.session_id.substring(0, 8)}
                          </CardTitle>
                          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatRelativeTime(selectedConversation.transferred_at || selectedConversation.created_at)}转接
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Button variant="outline" size="sm" className="lg:hidden h-7 text-xs"
                          onClick={() => setMobileView('profile')}>
                          <UserCircle className="h-3.5 w-3.5" />
                        </Button>
                        {selectedConversation.status !== 'resolved' && (
                          <Button variant="outline" size="sm" className="h-7 text-xs" onClick={handleResolveConversation}>
                            <CheckCheck className="h-3.5 w-3.5 mr-1" />
                            <span className="hidden sm:inline">已解决</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 p-0 overflow-hidden min-h-0">
                    <ScrollArea className="h-full">
                      <div className="p-3 space-y-1">
                        {groupedMessages.map((group) => (
                          <div key={group.date}>
                            {/* Date separator */}
                            <div className="flex items-center gap-3 my-3">
                              <Separator className="flex-1" />
                              <span className="text-[10px] text-muted-foreground bg-background px-2 flex-shrink-0">
                                {group.date}
                              </span>
                              <Separator className="flex-1" />
                            </div>
                            {group.messages.map((message) => (
                              <div key={message.id} className={`flex mb-2 ${message.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-[85%] sm:max-w-[80%] rounded-xl px-3.5 py-2 ${
                                  message.role === 'user'
                                    ? 'bg-muted rounded-bl-sm'
                                    : message.content.startsWith('[客服]')
                                    ? 'bg-green-100 dark:bg-green-900/30 rounded-br-sm'
                                    : 'bg-primary text-primary-foreground rounded-br-sm'
                                }`}>
                                  {message.content.startsWith('[客服]') && (
                                    <div className="text-[10px] text-green-600 dark:text-green-400 mb-0.5 font-medium">客服回复</div>
                                  )}
                                  <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                                    {message.content.replace('[客服] ', '')}
                                  </p>
                                  <p className="text-[10px] opacity-60 mt-0.5 text-right">{formatTime(message.created_at)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                  </CardContent>

                  {/* Input */}
                  {selectedConversation.status !== 'resolved' ? (
                    <div className="p-3 border-t flex-shrink-0">
                      <div className="flex gap-2">
                        <Input
                          ref={inputRef}
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="输入回复消息... (Enter发送)"
                          onKeyDown={handleKeyDown}
                          disabled={sending}
                          className="flex-1 h-9"
                        />
                        <Button onClick={handleSendMessage} disabled={sending || !newMessage.trim()} size="sm" className="h-9 px-3">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 border-t flex-shrink-0 bg-muted/50">
                      <p className="text-xs text-center text-muted-foreground">此会话已标记为已解决</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">选择一个会话开始回复</p>
                    <p className="text-xs mt-1 text-muted-foreground/70">
                      <Keyboard className="h-3 w-3 inline mr-1" />
                      Enter 快捷发送消息
                    </p>
                  </div>
                </div>
              )}
            </Card>

            {/* Right Panel */}
            <Card className={`lg:col-span-5 h-full flex flex-col overflow-hidden ${mobileView !== 'profile' ? 'hidden lg:flex' : 'flex'}`}>
              <CardHeader className="pb-2 border-b flex-shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <UserCircle className="h-4 w-4" />
                    访客画像 & 工具
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="lg:hidden h-7 text-xs" onClick={() => setMobileView('chat')}>
                    返回聊天
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0 overflow-hidden min-h-0">
                <ScrollArea className="h-full">
                  {selectedConversation ? (
                    <div className="space-y-4">
                      <EnhancedVisitorProfile sessionId={selectedConversation.session_id} />
                      <Separator />
                      <div className="px-4">
                        <QuickReplies 
                          onSelect={(content) => {
                            setNewMessage(content);
                            if (window.innerWidth < 1024) setMobileView('chat');
                          }} 
                          isManageMode={false}
                        />
                      </div>
                      <Separator />
                      <div className="px-4 pb-4">
                        <ConversationNotes conversationId={selectedConversation.id} />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">选择会话查看访客画像</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
