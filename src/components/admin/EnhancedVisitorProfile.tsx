import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  User, MapPin, Globe, Monitor, Smartphone, Clock, 
  Eye, Search, ShoppingCart, Target, Heart, Package, 
  Zap, History, MousePointer, Route
} from 'lucide-react';

interface EnhancedVisitorProfileProps {
  sessionId: string;
}

interface VisitorSession {
  id: string;
  session_id: string;
  traffic_source: string;
  referrer_url: string;
  referrer_domain: string;
  device_type: string;
  browser: string;
  os: string;
  screen_resolution: string;
  ip_address: string;
  country: string;
  city: string;
  region: string;
  total_page_views: number;
  total_duration_seconds: number;
  pages_visited: string[];
  search_keywords: string[];
  exit_page: string;
  first_visit_at: string;
  last_activity_at: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

interface CustomerLead {
  name: string | null;
  phone: string | null;
  email: string | null;
  company: string | null;
  product_interest: string | null;
  requirements: string | null;
  lead_score: number;
  urgency: string | null;
}

interface VisitorEvent {
  id: string;
  event_type: string;
  event_name: string | null;
  page_path: string;
  page_title: string | null;
  product_name: string | null;
  product_category: string | null;
  element_text: string | null;
  created_at: string;
  duration_seconds: number;
  scroll_depth: number;
}

interface HistoricalSession {
  session_id: string;
  first_visit_at: string;
  total_page_views: number;
  total_duration_seconds: number;
}

const trafficSourceLabels: Record<string, string> = {
  direct: '直接访问',
  search_engine: '搜索引擎',
  social_media: '社交媒体',
  referral: '外部链接',
};

const eventTypeLabels: Record<string, string> = {
  page_view: '浏览页面',
  click: '点击',
  product_view: '查看产品',
  search: '搜索',
  form_submit: '提交表单',
  scroll: '滚动',
  exit: '离开',
};

const urgencyLabels: Record<string, { label: string; color: string }> = {
  low: { label: '低', color: 'bg-muted' },
  medium: { label: '中', color: 'bg-amber-500' },
  high: { label: '高', color: 'bg-orange-500' },
  immediate: { label: '紧急', color: 'bg-destructive' },
};

export default function EnhancedVisitorProfile({ sessionId }: EnhancedVisitorProfileProps) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<VisitorSession | null>(null);
  const [lead, setLead] = useState<CustomerLead | null>(null);
  const [events, setEvents] = useState<VisitorEvent[]>([]);
  const [interests, setInterests] = useState<{ category: string; count: number }[]>([]);
  const [historicalSessions, setHistoricalSessions] = useState<HistoricalSession[]>([]);

  useEffect(() => {
    if (!sessionId) return;
    loadData();
  }, [sessionId]);

  const loadData = async () => {
    setLoading(true);
    
    // 获取当前会话信息
    const { data: sessionData } = await supabase
      .from('visitor_sessions')
      .select('*')
      .eq('session_id', sessionId)
      .single();
    
    if (sessionData) {
      setSession(sessionData);
      
      // 获取线索信息
      if (sessionData.ai_conversation_id) {
        const { data: leadData } = await supabase
          .from('customer_leads')
          .select('*')
          .eq('conversation_id', sessionData.ai_conversation_id)
          .single();
        
        if (leadData) {
          setLead(leadData);
        }
      }

      // 获取同一IP的历史访问记录
      if (sessionData.ip_address) {
        const { data: historyData } = await supabase
          .from('visitor_sessions')
          .select('session_id, first_visit_at, total_page_views, total_duration_seconds')
          .eq('ip_address', sessionData.ip_address)
          .neq('session_id', sessionId)
          .order('first_visit_at', { ascending: false })
          .limit(5);
        
        if (historyData) {
          setHistoricalSessions(historyData);
        }
      }
    }
    
    // 获取事件记录
    const { data: eventData } = await supabase
      .from('visitor_events')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false })
      .limit(100);
    
    if (eventData) {
      setEvents(eventData);
      
      // 分析兴趣偏好
      const categoryCount: Record<string, number> = {};
      eventData.forEach(e => {
        if (e.product_category) {
          categoryCount[e.product_category] = (categoryCount[e.product_category] || 0) + 1;
        }
        const pathMatch = e.page_path?.match(/\/products\/([^/]+)/);
        if (pathMatch) {
          const cat = pathMatch[1];
          categoryCount[cat] = (categoryCount[cat] || 0) + 1;
        }
      });
      
      const sorted = Object.entries(categoryCount)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
      
      setInterests(sorted);
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">暂无访客信息</p>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    if (!seconds) return '0秒';
    if (seconds < 60) return `${seconds}秒`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}分${secs}秒`;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // 计算购买意向评分
  const calculateIntentScore = () => {
    if (lead?.lead_score) return lead.lead_score;
    
    let score = 0;
    score += Math.min(session.total_page_views * 5, 30);
    score += Math.min(Math.floor(session.total_duration_seconds / 30), 20);
    score += (session.search_keywords?.length || 0) * 10;
    const productViews = events.filter(e => e.product_name).length;
    score += Math.min(productViews * 8, 30);
    
    return Math.min(score, 100);
  };

  const intentScore = calculateIntentScore();
  const intentLevel = intentScore >= 70 ? '高意向' : intentScore >= 40 ? '中意向' : '低意向';
  const intentColor = intentScore >= 70 ? 'text-primary' : intentScore >= 40 ? 'text-amber-500' : 'text-muted-foreground';

  const viewedProducts = [...new Set(events.filter(e => e.product_name).map(e => e.product_name))].slice(0, 5);

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-4">
        {/* 基本信息 */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <User className="h-4 w-4" />
              访客信息
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {/* IP地址 */}
            {session.ip_address && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  IP地址
                </span>
                <span className="font-mono text-xs">{session.ip_address}</span>
              </div>
            )}
            
            {/* 地区 */}
            {(session.city || session.region || session.country) && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  地区
                </span>
                <span>
                  {[session.city, session.region, session.country].filter(Boolean).join(', ')}
                </span>
              </div>
            )}
            
            {/* 来源 */}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <Route className="h-3 w-3" />
                来源
              </span>
              <Badge variant="outline">
                {trafficSourceLabels[session.traffic_source] || session.traffic_source}
              </Badge>
            </div>

            {/* 引荐来源 */}
            {session.referrer_domain && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">引荐</span>
                <span className="text-xs truncate max-w-[150px]">{session.referrer_domain}</span>
              </div>
            )}

            {/* UTM参数 */}
            {(session.utm_source || session.utm_medium || session.utm_campaign) && (
              <div className="pt-2 border-t space-y-1">
                <span className="text-xs text-muted-foreground">营销参数</span>
                <div className="flex flex-wrap gap-1">
                  {session.utm_source && <Badge variant="secondary" className="text-[10px]">来源: {session.utm_source}</Badge>}
                  {session.utm_medium && <Badge variant="secondary" className="text-[10px]">媒介: {session.utm_medium}</Badge>}
                  {session.utm_campaign && <Badge variant="secondary" className="text-[10px]">活动: {session.utm_campaign}</Badge>}
                </div>
              </div>
            )}

            <Separator className="my-2" />

            {/* 设备信息 */}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                {session.device_type === 'mobile' ? <Smartphone className="h-3 w-3" /> : <Monitor className="h-3 w-3" />}
                设备
              </span>
              <span className="text-xs">{session.device_type === 'mobile' ? '手机' : session.device_type === 'tablet' ? '平板' : '电脑'}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">浏览器</span>
              <span className="text-xs">{session.browser}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">系统</span>
              <span className="text-xs">{session.os}</span>
            </div>

            {session.screen_resolution && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">分辨率</span>
                <span className="text-xs">{session.screen_resolution}</span>
              </div>
            )}

            <Separator className="my-2" />

            {/* 行为统计 */}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <Eye className="h-3 w-3" />
                浏览页数
              </span>
              <span className="font-medium">{session.total_page_views}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                停留时间
              </span>
              <span className="font-medium">{formatDuration(session.total_duration_seconds || 0)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">首次访问</span>
              <span className="text-xs">{formatTime(session.first_visit_at)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">最后活动</span>
              <span className="text-xs">{formatTime(session.last_activity_at)}</span>
            </div>
          </CardContent>
        </Card>

        {/* 购买意向 */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="h-4 w-4" />
              购买意向
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-lg font-bold ${intentColor}`}>{intentScore}分</span>
              <Badge variant={intentScore >= 70 ? "default" : intentScore >= 40 ? "secondary" : "outline"}>
                {intentLevel}
              </Badge>
            </div>
            <Progress value={intentScore} className="h-2" />
            
            {lead?.urgency && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  紧急程度
                </span>
                <Badge className={urgencyLabels[lead.urgency]?.color}>
                  {urgencyLabels[lead.urgency]?.label || lead.urgency}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 浏览轨迹 */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <MousePointer className="h-4 w-4" />
              浏览轨迹
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {events.slice(0, 20).map((event, index) => (
                <div key={event.id} className="flex items-start gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {eventTypeLabels[event.event_type] || event.event_type}
                      </span>
                      <span className="text-muted-foreground">
                        {formatTime(event.created_at)}
                      </span>
                    </div>
                    <p className="text-muted-foreground truncate">
                      {event.product_name || event.page_title || event.page_path}
                    </p>
                  </div>
                </div>
              ))}
              {events.length === 0 && (
                <p className="text-muted-foreground text-center py-2">暂无浏览记录</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 历史访问 */}
        {historicalSessions.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <History className="h-4 w-4" />
                历史访问 ({historicalSessions.length}次)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {historicalSessions.map((hist) => (
                  <div key={hist.session_id} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{formatTime(hist.first_visit_at)}</span>
                    <div className="flex items-center gap-2">
                      <span>{hist.total_page_views}页</span>
                      <span className="text-muted-foreground">·</span>
                      <span>{formatDuration(hist.total_duration_seconds)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 兴趣偏好 */}
        {interests.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Heart className="h-4 w-4" />
                兴趣偏好
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {interests.map((item, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {item.category} ({item.count})
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 浏览产品 */}
        {viewedProducts.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Package className="h-4 w-4" />
                浏览产品
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {viewedProducts.map((product, i) => (
                  <div key={i} className="text-sm text-muted-foreground">• {product}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 搜索关键词 */}
        {session.search_keywords?.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Search className="h-4 w-4" />
                搜索关键词
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {session.search_keywords.map((kw, i) => (
                  <Badge key={i} variant="outline" className="text-xs">{kw}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 客户线索 */}
        {lead && (lead.name || lead.phone || lead.email || lead.requirements) && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                客户线索
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {lead.name && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">姓名</span>
                  <span className="font-medium">{lead.name}</span>
                </div>
              )}
              {lead.phone && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">电话</span>
                  <span className="font-medium">{lead.phone}</span>
                </div>
              )}
              {lead.email && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">邮箱</span>
                  <span className="font-medium">{lead.email}</span>
                </div>
              )}
              {lead.company && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">公司</span>
                  <span className="font-medium">{lead.company}</span>
                </div>
              )}
              {lead.product_interest && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">感兴趣产品</span>
                  <span className="font-medium">{lead.product_interest}</span>
                </div>
              )}
              {lead.requirements && (
                <div className="pt-2 border-t">
                  <span className="text-muted-foreground block mb-1">需求描述</span>
                  <p className="text-foreground">{lead.requirements}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
}
