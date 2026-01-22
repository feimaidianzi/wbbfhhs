import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, Users, Eye, Clock, MousePointer, Search, 
  Globe, Monitor, Smartphone, Tablet, TrendingUp, MessageSquare,
  MapPin, RefreshCw, Brain, Loader2, ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface VisitorSession {
  id: string;
  session_id: string;
  first_visit_at: string;
  last_activity_at: string;
  traffic_source: string;
  referrer_domain: string;
  device_type: string;
  browser: string;
  os: string;
  country: string;
  city: string;
  total_page_views: number;
  total_duration_seconds: number;
  pages_visited: string[];
  exit_page: string;
  search_keywords: string[];
  ai_conversation_id: string | null;
  lead_id: string | null;
}

interface VisitorEvent {
  id: string;
  event_type: string;
  event_name: string;
  page_path: string;
  element_text: string;
  product_name: string;
  duration_seconds: number;
  scroll_depth: number;
  created_at: string;
}

interface Stats {
  totalVisitors: number;
  totalPageViews: number;
  avgDuration: number;
  bounceRate: number;
  conversionRate: number;
}

const trafficSourceLabels: Record<string, string> = {
  direct: '直接访问',
  search_engine: '搜索引擎',
  social_media: '社交媒体',
  referral: '外部链接',
};

const deviceIcons: Record<string, React.ReactNode> = {
  desktop: <Monitor className="h-4 w-4" />,
  mobile: <Smartphone className="h-4 w-4" />,
  tablet: <Tablet className="h-4 w-4" />,
};

const VisitorAnalytics = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [sessions, setSessions] = useState<VisitorSession[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalVisitors: 0,
    totalPageViews: 0,
    avgDuration: 0,
    bounceRate: 0,
    conversionRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [deviceFilter, setDeviceFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('today');
  
  const [selectedSession, setSelectedSession] = useState<VisitorSession | null>(null);
  const [sessionEvents, setSessionEvents] = useState<VisitorEvent[]>([]);
  const [aiConversation, setAiConversation] = useState<any[]>([]);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  useEffect(() => {
    checkAuthAndFetch();
  }, [dateRange, sourceFilter, deviceFilter]);

  const checkAuthAndFetch = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
      return;
    }

    const { data: isAdmin } = await supabase.rpc('has_role', {
      _user_id: session.user.id,
      _role: 'admin'
    });
    const { data: isModerator } = await supabase.rpc('has_role', {
      _user_id: session.user.id,
      _role: 'moderator'
    });

    if (!isAdmin && !isModerator) {
      navigate('/admin/login');
      return;
    }

    fetchSessions();
  };

  const getDateFilter = () => {
    const now = new Date();
    switch (dateRange) {
      case 'today':
        return new Date(now.setHours(0, 0, 0, 0)).toISOString();
      case 'week':
        return new Date(now.setDate(now.getDate() - 7)).toISOString();
      case 'month':
        return new Date(now.setMonth(now.getMonth() - 1)).toISOString();
      default:
        return new Date(now.setHours(0, 0, 0, 0)).toISOString();
    }
  };

  const fetchSessions = async () => {
    setLoading(true);
    
    let query = supabase
      .from('visitor_sessions')
      .select('*')
      .gte('first_visit_at', getDateFilter())
      .order('first_visit_at', { ascending: false });

    if (sourceFilter !== 'all') {
      query = query.eq('traffic_source', sourceFilter);
    }
    if (deviceFilter !== 'all') {
      query = query.eq('device_type', deviceFilter);
    }

    const { data, error } = await query.limit(200);

    if (error) {
      console.error('Error fetching sessions:', error);
      toast({ title: '加载失败', variant: 'destructive' });
    } else {
      setSessions(data || []);
      calculateStats(data || []);
    }
    
    setLoading(false);
  };

  const calculateStats = (data: VisitorSession[]) => {
    const totalVisitors = data.length;
    const totalPageViews = data.reduce((sum, s) => sum + (s.total_page_views || 0), 0);
    const totalDuration = data.reduce((sum, s) => sum + (s.total_duration_seconds || 0), 0);
    const avgDuration = totalVisitors > 0 ? Math.round(totalDuration / totalVisitors) : 0;
    const bounceCount = data.filter(s => (s.total_page_views || 0) <= 1).length;
    const bounceRate = totalVisitors > 0 ? Math.round((bounceCount / totalVisitors) * 100) : 0;
    const conversions = data.filter(s => s.lead_id || s.ai_conversation_id).length;
    const conversionRate = totalVisitors > 0 ? Math.round((conversions / totalVisitors) * 100) : 0;

    setStats({ totalVisitors, totalPageViews, avgDuration, bounceRate, conversionRate });
  };

  const fetchSessionDetails = async (session: VisitorSession) => {
    setSelectedSession(session);
    setDetailDialogOpen(true);
    setAiAnalysis(null);

    // 获取事件记录
    const { data: events } = await supabase
      .from('visitor_events')
      .select('*')
      .eq('session_id', session.session_id)
      .order('created_at', { ascending: true });

    setSessionEvents(events || []);

    // 获取AI对话记录
    if (session.ai_conversation_id) {
      const { data: messages } = await supabase
        .from('ai_conversation_messages')
        .select('*')
        .eq('conversation_id', session.ai_conversation_id)
        .order('created_at', { ascending: true });

      setAiConversation(messages || []);
    } else {
      setAiConversation([]);
    }
  };

  const analyzeWithAI = async () => {
    if (!selectedSession) return;
    
    setAnalyzing(true);

    // 脱敏处理数据
    const sanitizedData = {
      trafficSource: selectedSession.traffic_source,
      deviceType: selectedSession.device_type,
      pagesVisited: selectedSession.pages_visited,
      totalPageViews: selectedSession.total_page_views,
      durationSeconds: selectedSession.total_duration_seconds,
      searchKeywords: selectedSession.search_keywords,
      exitPage: selectedSession.exit_page,
      events: sessionEvents.map(e => ({
        type: e.event_type,
        name: e.event_name,
        page: e.page_path,
      })),
      hasConversation: aiConversation.length > 0,
      conversationSummary: aiConversation.length > 0 
        ? `用户进行了${aiConversation.length}轮对话` 
        : null,
    };

    try {
      const response = await supabase.functions.invoke('ai-analyze-visitor', {
        body: { visitorData: sanitizedData },
      });

      if (response.error) throw response.error;
      setAiAnalysis(response.data?.analysis || '分析完成');
    } catch (error) {
      console.error('AI analysis error:', error);
      toast({ title: 'AI分析失败', variant: 'destructive' });
    }
    
    setAnalyzing(false);
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}秒`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}分${secs}秒`;
  };

  const filteredSessions = sessions.filter(s => 
    s.session_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.referrer_domain?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.pages_visited?.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">访客分析</h1>
          </div>
          <Button onClick={fetchSessions} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            刷新
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Users className="h-4 w-4" />
                <span className="text-sm">访客数</span>
              </div>
              <div className="text-2xl font-bold">{stats.totalVisitors}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Eye className="h-4 w-4" />
                <span className="text-sm">页面浏览</span>
              </div>
              <div className="text-2xl font-bold">{stats.totalPageViews}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">平均停留</span>
              </div>
              <div className="text-2xl font-bold">{formatDuration(stats.avgDuration)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <MousePointer className="h-4 w-4" />
                <span className="text-sm">跳出率</span>
              </div>
              <div className="text-2xl font-bold">{stats.bounceRate}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">转化率</span>
              </div>
              <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <Input
                  placeholder="搜索会话ID、来源域名、页面..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">今天</SelectItem>
                  <SelectItem value="week">近7天</SelectItem>
                  <SelectItem value="month">近30天</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="来源" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部来源</SelectItem>
                  <SelectItem value="direct">直接访问</SelectItem>
                  <SelectItem value="search_engine">搜索引擎</SelectItem>
                  <SelectItem value="social_media">社交媒体</SelectItem>
                  <SelectItem value="referral">外部链接</SelectItem>
                </SelectContent>
              </Select>
              <Select value={deviceFilter} onValueChange={setDeviceFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="设备" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部设备</SelectItem>
                  <SelectItem value="desktop">桌面端</SelectItem>
                  <SelectItem value="mobile">移动端</SelectItem>
                  <SelectItem value="tablet">平板</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Sessions Table */}
        <Card>
          <CardHeader>
            <CardTitle>访客会话列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>访问时间</TableHead>
                  <TableHead>来源</TableHead>
                  <TableHead>设备</TableHead>
                  <TableHead>页面数</TableHead>
                  <TableHead>停留时间</TableHead>
                  <TableHead>搜索词</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSessions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      暂无访客数据
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        <div className="text-sm">
                          {format(new Date(session.first_visit_at), 'MM-dd HH:mm', { locale: zhCN })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {trafficSourceLabels[session.traffic_source] || session.traffic_source}
                        </Badge>
                        {session.referrer_domain && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {session.referrer_domain}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {deviceIcons[session.device_type] || <Globe className="h-4 w-4" />}
                          <span className="text-sm">{session.browser}</span>
                        </div>
                      </TableCell>
                      <TableCell>{session.total_page_views || 0}</TableCell>
                      <TableCell>{formatDuration(session.total_duration_seconds || 0)}</TableCell>
                      <TableCell>
                        {session.search_keywords?.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {session.search_keywords.slice(0, 2).map((kw, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {kw}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {session.ai_conversation_id && (
                            <Badge className="bg-blue-500">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              对话
                            </Badge>
                          )}
                          {session.lead_id && (
                            <Badge className="bg-green-500">线索</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => fetchSessionDetails(session)}
                        >
                          详情
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Session Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>访客详情</span>
              <Button 
                size="sm" 
                onClick={analyzeWithAI}
                disabled={analyzing}
              >
                {analyzing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Brain className="h-4 w-4 mr-2" />
                )}
                AI分析
              </Button>
            </DialogTitle>
          </DialogHeader>

          {selectedSession && (
            <ScrollArea className="max-h-[70vh]">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">概览</TabsTrigger>
                  <TabsTrigger value="journey">浏览轨迹</TabsTrigger>
                  <TabsTrigger value="events">事件记录</TabsTrigger>
                  {aiConversation.length > 0 && (
                    <TabsTrigger value="conversation">AI对话</TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  {/* AI Analysis Result */}
                  {aiAnalysis && (
                    <Card className="border-primary/50 bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          AI分析结果
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm whitespace-pre-wrap">{aiAnalysis}</p>
                      </CardContent>
                    </Card>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4 space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">来源信息</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>渠道：</span>
                            <span>{trafficSourceLabels[selectedSession.traffic_source]}</span>
                          </div>
                          {selectedSession.referrer_domain && (
                            <div className="flex justify-between">
                              <span>来源域名：</span>
                              <span>{selectedSession.referrer_domain}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">设备信息</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>设备类型：</span>
                            <span>{selectedSession.device_type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>浏览器：</span>
                            <span>{selectedSession.browser}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>操作系统：</span>
                            <span>{selectedSession.os}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">访问统计</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>页面浏览：</span>
                            <span>{selectedSession.total_page_views}页</span>
                          </div>
                          <div className="flex justify-between">
                            <span>停留时间：</span>
                            <span>{formatDuration(selectedSession.total_duration_seconds || 0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>退出页面：</span>
                            <span>{selectedSession.exit_page || '-'}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">地理位置</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{selectedSession.city || selectedSession.country || '未知'}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {selectedSession.search_keywords?.length > 0 && (
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">搜索关键词</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSession.search_keywords.map((kw, i) => (
                            <Badge key={i} variant="secondary">{kw}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="journey">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium text-sm text-muted-foreground mb-4">页面浏览轨迹</h4>
                      <div className="space-y-2">
                        {selectedSession.pages_visited?.map((page, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                              {i + 1}
                            </div>
                            <span className="text-sm">{page}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="events">
                  <Card>
                    <CardContent className="p-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>时间</TableHead>
                            <TableHead>类型</TableHead>
                            <TableHead>名称</TableHead>
                            <TableHead>页面</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sessionEvents.map((event) => (
                            <TableRow key={event.id}>
                              <TableCell className="text-xs">
                                {format(new Date(event.created_at), 'HH:mm:ss')}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{event.event_type}</Badge>
                              </TableCell>
                              <TableCell className="text-sm">
                                {event.event_name || event.element_text || '-'}
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {event.page_path}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                {aiConversation.length > 0 && (
                  <TabsContent value="conversation">
                    <Card>
                      <CardContent className="p-4 space-y-3">
                        {aiConversation.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                                msg.role === 'user'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              }`}
                            >
                              {msg.content}
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
              </Tabs>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VisitorAnalytics;
