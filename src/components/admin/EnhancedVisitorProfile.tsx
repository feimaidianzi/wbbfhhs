import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, MapPin, Globe, Monitor, Smartphone, Tablet, Clock, 
  Eye, Search, ShoppingCart, Target, Heart, Package, 
  Zap, History, MousePointer, Route, Chrome, Calendar,
  Wifi, Play, Download, MessageCircle, Share2, ThumbsUp,
  FileText, ArrowRight, Timer, TrendingUp, Building,
  Phone, Mail, Briefcase, GraduationCap, Crown
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
  user_agent: string;
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
  location: string | null;
  budget_range: string | null;
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
  element_tag: string | null;
  created_at: string;
  duration_seconds: number;
  scroll_depth: number;
  event_data: Record<string, any> | null;
}

interface HistoricalSession {
  session_id: string;
  first_visit_at: string;
  total_page_views: number;
  total_duration_seconds: number;
  traffic_source: string;
  device_type: string;
}

interface BehaviorStats {
  totalClicks: number;
  productViews: number;
  searchCount: number;
  formSubmits: number;
  videoPlays: number;
  downloads: number;
  comments: number;
  shares: number;
  avgScrollDepth: number;
  avgPageDuration: number;
}

// 流量来源标签
const trafficSourceLabels: Record<string, { label: string; icon: string }> = {
  direct: { label: '直接访问', icon: '🔗' },
  search_engine: { label: '搜索引擎', icon: '🔍' },
  social_media: { label: '社交媒体', icon: '📱' },
  referral: { label: '外部链接', icon: '🔗' },
  paid: { label: '广告投放', icon: '💰' },
};

// 事件类型标签
const eventTypeLabels: Record<string, { label: string; icon: React.ReactNode }> = {
  page_view: { label: '浏览页面', icon: <Eye className="h-3 w-3" /> },
  click: { label: '点击', icon: <MousePointer className="h-3 w-3" /> },
  product_view: { label: '查看产品', icon: <Package className="h-3 w-3" /> },
  search: { label: '搜索', icon: <Search className="h-3 w-3" /> },
  form_submit: { label: '提交表单', icon: <FileText className="h-3 w-3" /> },
  video_play: { label: '播放视频', icon: <Play className="h-3 w-3" /> },
  download: { label: '下载', icon: <Download className="h-3 w-3" /> },
  share: { label: '分享', icon: <Share2 className="h-3 w-3" /> },
  comment: { label: '评论', icon: <MessageCircle className="h-3 w-3" /> },
  like: { label: '点赞', icon: <ThumbsUp className="h-3 w-3" /> },
  page_exit: { label: '离开页面', icon: <ArrowRight className="h-3 w-3" /> },
};

// 紧急度标签
const urgencyLabels: Record<string, { label: string; color: string }> = {
  low: { label: '低', color: 'bg-muted text-muted-foreground' },
  medium: { label: '中', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  high: { label: '高', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
  immediate: { label: '紧急', color: 'bg-destructive/10 text-destructive' },
};

export default function EnhancedVisitorProfile({ sessionId }: EnhancedVisitorProfileProps) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<VisitorSession | null>(null);
  const [lead, setLead] = useState<CustomerLead | null>(null);
  const [events, setEvents] = useState<VisitorEvent[]>([]);
  const [interests, setInterests] = useState<{ category: string; count: number }[]>([]);
  const [historicalSessions, setHistoricalSessions] = useState<HistoricalSession[]>([]);
  const [behaviorStats, setBehaviorStats] = useState<BehaviorStats>({
    totalClicks: 0,
    productViews: 0,
    searchCount: 0,
    formSubmits: 0,
    videoPlays: 0,
    downloads: 0,
    comments: 0,
    shares: 0,
    avgScrollDepth: 0,
    avgPageDuration: 0,
  });

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
          .select('session_id, first_visit_at, total_page_views, total_duration_seconds, traffic_source, device_type')
          .eq('ip_address', sessionData.ip_address)
          .neq('session_id', sessionId)
          .order('first_visit_at', { ascending: false })
          .limit(10);
        
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
      .limit(200);
    
    if (eventData) {
      setEvents(eventData as VisitorEvent[]);
      
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
        .slice(0, 8);
      
      setInterests(sorted);

      // 统计行为数据
      const stats: BehaviorStats = {
        totalClicks: eventData.filter(e => e.event_type === 'click').length,
        productViews: eventData.filter(e => e.event_type === 'product_view' || e.product_name).length,
        searchCount: eventData.filter(e => e.event_type === 'search').length,
        formSubmits: eventData.filter(e => e.event_type === 'form_submit').length,
        videoPlays: eventData.filter(e => e.event_type === 'video_play').length,
        downloads: eventData.filter(e => e.event_type === 'download').length,
        comments: eventData.filter(e => e.event_type === 'comment').length,
        shares: eventData.filter(e => e.event_type === 'share').length,
        avgScrollDepth: eventData.reduce((sum, e) => sum + (e.scroll_depth || 0), 0) / (eventData.length || 1),
        avgPageDuration: eventData.reduce((sum, e) => sum + (e.duration_seconds || 0), 0) / (eventData.length || 1),
      };
      setBehaviorStats(stats);
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
    if (seconds < 60) return `${Math.round(seconds)}秒`;
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    if (mins < 60) return `${mins}分${secs}秒`;
    const hours = Math.floor(mins / 60);
    return `${hours}时${mins % 60}分`;
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // 判断是否是境外访客
  const isOverseas = session.country && !['中国', 'China', 'CN'].includes(session.country);

  // 判断是否是复访用户
  const isReturningVisitor = historicalSessions.length > 0;
  const totalVisits = historicalSessions.length + 1;

  // 获取访问时段
  const getVisitTimeSlot = (dateString: string) => {
    const hour = new Date(dateString).getHours();
    if (hour >= 6 && hour < 9) return '早间 (6-9点)';
    if (hour >= 9 && hour < 12) return '上午 (9-12点)';
    if (hour >= 12 && hour < 14) return '午间 (12-14点)';
    if (hour >= 14 && hour < 18) return '下午 (14-18点)';
    if (hour >= 18 && hour < 22) return '晚间 (18-22点)';
    return '深夜 (22-6点)';
  };

  // 判断是否节假日（简化版）
  const isHoliday = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay();
    return day === 0 || day === 6; // 周末
  };

  // 计算购买意向评分
  const calculateIntentScore = () => {
    if (lead?.lead_score) return lead.lead_score;
    
    let score = 0;
    // 页面浏览深度
    score += Math.min(session.total_page_views * 4, 25);
    // 停留时间
    score += Math.min(Math.floor(session.total_duration_seconds / 60) * 3, 20);
    // 搜索行为
    score += (session.search_keywords?.length || 0) * 8;
    // 产品浏览
    score += Math.min(behaviorStats.productViews * 6, 25);
    // 表单提交
    score += behaviorStats.formSubmits * 15;
    // 下载行为
    score += behaviorStats.downloads * 10;
    // 复访加分
    if (isReturningVisitor) score += 10;
    
    return Math.min(Math.round(score), 100);
  };

  const intentScore = calculateIntentScore();
  const intentLevel = intentScore >= 70 ? '高意向' : intentScore >= 40 ? '中意向' : '低意向';
  const intentColor = intentScore >= 70 ? 'text-primary' : intentScore >= 40 ? 'text-amber-500' : 'text-muted-foreground';

  // 获取设备图标
  const getDeviceIcon = () => {
    switch (session.device_type) {
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'tablet': return <Tablet className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  // 获取设备名称
  const getDeviceName = () => {
    switch (session.device_type) {
      case 'mobile': return '手机';
      case 'tablet': return '平板';
      default: return '电脑';
    }
  };

  // 分析页面分类浏览情况
  const pageCategories = events
    .filter(e => e.event_type === 'page_view')
    .reduce((acc: Record<string, number>, e) => {
      const path = e.page_path || '';
      let category = '其他';
      if (path.includes('/products')) category = '产品页';
      else if (path.includes('/news')) category = '资讯页';
      else if (path.includes('/about')) category = '关于我们';
      else if (path.includes('/contact')) category = '联系页';
      else if (path.includes('/applications')) category = '应用案例';
      else if (path === '/') category = '首页';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

  // 获取高频浏览页面
  const frequentPages = events
    .filter(e => e.event_type === 'page_view')
    .reduce((acc: Record<string, number>, e) => {
      const key = e.page_title || e.page_path || '未知页面';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  
  const topPages = Object.entries(frequentPages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // 获取点击的按钮
  const clickedButtons = events
    .filter(e => e.event_type === 'click' && e.element_text)
    .map(e => e.element_text)
    .filter((text, i, arr) => arr.indexOf(text) === i)
    .slice(0, 10);

  // 获取查看的产品
  const viewedProducts = [...new Set(events.filter(e => e.product_name).map(e => e.product_name))].slice(0, 8);

  // 计算跳出率（简化：只看了一个页面）
  const bounceRate = session.total_page_views <= 1 ? 100 : 0;

  return (
    <div className="space-y-3 sm:space-y-4 p-2 sm:p-4">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-8 sm:h-10">
          <TabsTrigger value="basic" className="text-[10px] sm:text-xs px-1 sm:px-2">
            基础画像
          </TabsTrigger>
          <TabsTrigger value="behavior" className="text-[10px] sm:text-xs px-1 sm:px-2">
            行为轨迹
          </TabsTrigger>
          <TabsTrigger value="history" className="text-[10px] sm:text-xs px-1 sm:px-2">
            历史记录
          </TabsTrigger>
        </TabsList>

        {/* 基础画像标签页 */}
        <TabsContent value="basic" className="space-y-4 mt-4">
            {/* 购买意向 - 突出显示 */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-4 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">购买意向</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${intentColor}`}>{intentScore}分</span>
                    <Badge variant={intentScore >= 70 ? "default" : intentScore >= 40 ? "secondary" : "outline"}>
                      {intentLevel}
                    </Badge>
                  </div>
                </div>
                <Progress value={intentScore} className="h-2" />
                {lead?.urgency && (
                  <div className="flex items-center justify-between text-xs mt-2">
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

            {/* 网络属性 */}
            <Card>
              <CardHeader className="pb-2 px-3 sm:px-6">
                <CardTitle className="text-xs sm:text-sm flex items-center gap-2">
                  <Wifi className="h-3 w-3 sm:h-4 sm:w-4" />
                  网络属性
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm px-3 sm:px-6">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    公网IP
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs">{session.ip_address || '未获取'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    {getDeviceIcon()}
                    设备类型
                  </span>
                  <span className="text-xs">{getDeviceName()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Chrome className="h-3 w-3" />
                    浏览器
                  </span>
                  <span className="text-xs">{session.browser || '未知'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">操作系统</span>
                  <span className="text-xs">{session.os || '未知'}</span>
                </div>
                {session.screen_resolution && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">屏幕分辨率</span>
                    <span className="text-xs">{session.screen_resolution}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 地域属性 */}
            <Card>
              <CardHeader className="pb-2 px-3 sm:px-6">
                <CardTitle className="text-xs sm:text-sm flex items-center gap-2">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                  地域属性
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm px-3 sm:px-6">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">国家</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs">{session.country || '未知'}</span>
                    {isOverseas && (
                      <Badge variant="outline" className="text-[10px] px-1">境外</Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">省份/地区</span>
                  <span className="text-xs">{session.region || '未知'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">城市</span>
                  <span className="text-xs">{session.city || '未知'}</span>
                </div>
                {session.ip_address && (
                  <div className="flex items-center justify-between pt-1 border-t">
                    <span className="text-muted-foreground text-[10px] sm:text-xs">IP定位</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{session.ip_address}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 注册属性 - 仅当有注册信息时显示 */}
            {lead && (lead.name || lead.phone || lead.email) && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <User className="h-4 w-4" />
                    注册属性
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {lead.name && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" />
                        姓名
                      </span>
                      <span className="font-medium">{lead.name}</span>
                    </div>
                  )}
                  {lead.phone && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        手机号
                      </span>
                      <span className="font-mono text-xs">{lead.phone}</span>
                    </div>
                  )}
                 {lead.email && (
                   <div className="flex items-start justify-between gap-3">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        邮箱
                      </span>
                     <span className="text-xs text-right break-words max-w-[60%]">{lead.email}</span>
                    </div>
                  )}
                  {lead.company && (
                   <div className="flex items-start justify-between gap-3">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        公司
                      </span>
                     <span className="text-xs text-right break-words max-w-[60%]">{lead.company}</span>
                    </div>
                  )}
                  {lead.location && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        归属地
                      </span>
                      <span className="text-xs">{lead.location}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* 营销来源 */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Route className="h-4 w-4" />
                  入站渠道
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">来源类型</span>
                  <Badge variant="outline">
                    {trafficSourceLabels[session.traffic_source]?.icon}{' '}
                    {trafficSourceLabels[session.traffic_source]?.label || session.traffic_source}
                  </Badge>
                </div>
                 {session.referrer_domain && (
                   <div className="flex items-start justify-between gap-3">
                    <span className="text-muted-foreground">引荐网站</span>
                     <span className="text-xs text-right break-words max-w-[60%]">{session.referrer_domain}</span>
                  </div>
                )}
                {session.referrer_url && (
                   <div className="flex items-start justify-between gap-3">
                    <span className="text-muted-foreground flex-shrink-0">完整来源</span>
                     <a 
                       href={session.referrer_url} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-xs text-primary hover:underline text-right break-all max-w-[60%]"
                       title={session.referrer_url}
                     >
                       {session.referrer_url.length > 60 
                         ? session.referrer_url.substring(0, 60) + '...' 
                         : session.referrer_url}
                     </a>
                  </div>
                )}
                <div className="flex items-start justify-between gap-3">
                  <span className="text-muted-foreground flex-shrink-0">落地页</span>
                  <span className="text-xs text-right break-words max-w-[60%]">
                    {session.pages_visited?.[0] || session.referrer_url || '(直接访问)'}
                  </span>
                </div>
                {session.exit_page && (
                   <div className="flex items-start justify-between gap-3">
                    <span className="text-muted-foreground">出站页</span>
                     <span className="text-xs text-right break-words max-w-[60%]">{session.exit_page}</span>
                  </div>
                )}
                
                {(session.utm_source || session.utm_medium || session.utm_campaign) && (
                  <>
                    <Separator className="my-2" />
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">UTM参数</span>
                      <div className="flex flex-wrap gap-1">
                        {session.utm_source && <Badge variant="secondary" className="text-[10px]">来源: {session.utm_source}</Badge>}
                        {session.utm_medium && <Badge variant="secondary" className="text-[10px]">媒介: {session.utm_medium}</Badge>}
                        {session.utm_campaign && <Badge variant="secondary" className="text-[10px]">活动: {session.utm_campaign}</Badge>}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 行为轨迹标签页 */}
          <TabsContent value="behavior" className="space-y-4 mt-4">
            {/* 访问行为统计 */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  访问行为
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">访问状态</span>
                    <Badge variant={isReturningVisitor ? "default" : "outline"}>
                      {isReturningVisitor ? `复访(${totalVisits}次)` : '首次访问'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">访问时段</span>
                    <span className="text-xs">{getVisitTimeSlot(session.first_visit_at)}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
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
                      停留时长
                    </span>
                    <span className="font-medium">{formatDuration(session.total_duration_seconds || 0)}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">跳出率</span>
                    <span className="text-xs">{bounceRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">节假日</span>
                    <span className="text-xs">{isHoliday(session.first_visit_at) ? '是' : '否'}</span>
                  </div>
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

            {/* 浏览行为 */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  浏览行为
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {/* 浏览栏目分类 */}
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">浏览栏目</span>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(pageCategories).map(([cat, count]) => (
                      <Badge key={cat} variant="secondary" className="text-[10px]">
                        {cat} ({count})
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 高频浏览页面 */}
                {topPages.length > 0 && (
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">高频浏览页面</span>
                    <div className="space-y-1">
                       {topPages.map(([page, count], i) => (
                         <div key={i} className="flex items-start justify-between gap-2 text-xs">
                           <span className="flex-1 min-w-0 break-words">{page}</span>
                          <Badge variant="outline" className="text-[10px] ml-1">{count}次</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 搜索关键词 */}
                {session.search_keywords?.length > 0 && (
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">搜索关键词</span>
                    <div className="flex flex-wrap gap-1">
                      {session.search_keywords.map((kw, i) => (
                        <Badge key={i} variant="outline" className="text-[10px]">
                          <Search className="h-2 w-2 mr-1" />
                          {kw}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* 查看的产品 */}
                {viewedProducts.length > 0 && (
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">查看产品</span>
                    <div className="space-y-1">
                       {viewedProducts.map((product, i) => (
                         <div key={i} className="text-xs flex items-start gap-1">
                          <Package className="h-3 w-3 text-muted-foreground" />
                           <span className="break-words">{product}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 交互行为 */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <MousePointer className="h-4 w-4" />
                  交互行为
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {/* 行为统计 */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">点击次数</span>
                    <span className="font-medium">{behaviorStats.totalClicks}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">产品查看</span>
                    <span className="font-medium">{behaviorStats.productViews}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">搜索次数</span>
                    <span className="font-medium">{behaviorStats.searchCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">表单提交</span>
                    <span className="font-medium">{behaviorStats.formSubmits}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">视频播放</span>
                    <span className="font-medium">{behaviorStats.videoPlays}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">资料下载</span>
                    <span className="font-medium">{behaviorStats.downloads}</span>
                  </div>
                </div>

                {/* 平均滚动深度 */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-xs">平均滚动深度</span>
                  <div className="flex items-center gap-2">
                    <Progress value={behaviorStats.avgScrollDepth} className="h-1.5 w-16" />
                    <span className="text-xs">{Math.round(behaviorStats.avgScrollDepth)}%</span>
                  </div>
                </div>

                {/* 点击的按钮 */}
                {clickedButtons.length > 0 && (
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">点击按钮</span>
                    <div className="flex flex-wrap gap-1">
                      {clickedButtons.map((btn, i) => (
                        <Badge key={i} variant="outline" className="text-[10px]">{btn}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 实时浏览轨迹 */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Route className="h-4 w-4" />
                  实时轨迹
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {events.slice(0, 30).map((event, index) => (
                    <div key={event.id} className="flex items-start gap-2 text-xs">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {eventTypeLabels[event.event_type]?.icon}
                          <span className="font-medium">
                            {eventTypeLabels[event.event_type]?.label || event.event_type}
                          </span>
                          <span className="text-muted-foreground ml-auto text-[10px]">
                            {formatTime(event.created_at)}
                          </span>
                        </div>
                        <p className="text-muted-foreground break-words whitespace-normal">
                          {event.product_name || event.element_text || event.page_title || event.page_path}
                        </p>
                        {event.duration_seconds > 0 && (
                          <span className="text-muted-foreground text-[10px]">
                            停留 {formatDuration(event.duration_seconds)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {events.length === 0 && (
                    <p className="text-muted-foreground text-center py-2">暂无浏览记录</p>
                  )}
                </div>
              </CardContent>
            </Card>

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
          </TabsContent>

          {/* 历史记录标签页 */}
          <TabsContent value="history" className="space-y-4 mt-4">
            {/* 历史访问 */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <History className="h-4 w-4" />
                  历史访问 ({totalVisits}次)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {historicalSessions.length > 0 ? (
                  <div className="space-y-3">
                    {/* 当前会话 */}
                    <div className="p-2 rounded bg-primary/5 border border-primary/20">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-medium">本次访问</span>
                        <Badge variant="default" className="text-[10px]">当前</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{formatDate(session.first_visit_at)}</span>
                        <div className="flex items-center gap-2">
                          <span>{session.total_page_views}页</span>
                          <span>·</span>
                          <span>{formatDuration(session.total_duration_seconds)}</span>
                        </div>
                      </div>
                    </div>

                    {/* 历史会话 */}
                    {historicalSessions.map((hist) => (
                      <div key={hist.session_id} className="p-2 rounded border">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>{formatDate(hist.first_visit_at)}</span>
                          <Badge variant="outline" className="text-[10px]">
                            {trafficSourceLabels[hist.traffic_source]?.label || hist.traffic_source}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{hist.device_type === 'mobile' ? '手机' : hist.device_type === 'tablet' ? '平板' : '电脑'}</span>
                          <div className="flex items-center gap-2">
                            <span>{hist.total_page_views}页</span>
                            <span>·</span>
                            <span>{formatDuration(hist.total_duration_seconds)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4 text-sm">首次访问，暂无历史记录</p>
                )}
              </CardContent>
            </Card>

            {/* 客户线索 */}
            {lead && (lead.product_interest || lead.requirements || lead.budget_range) && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    客户线索
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {lead.product_interest && (
                    <div>
                      <span className="text-muted-foreground text-xs block mb-1">感兴趣产品</span>
                      <span className="text-foreground">{lead.product_interest}</span>
                    </div>
                  )}
                  {lead.budget_range && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">预算范围</span>
                      <span className="font-medium">{lead.budget_range}</span>
                    </div>
                  )}
                  {lead.requirements && (
                     <div className="pt-2 border-t">
                      <span className="text-muted-foreground text-xs block mb-1">需求描述</span>
                       <p className="text-foreground text-xs whitespace-pre-wrap break-words">{lead.requirements}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* 访问路径 */}
            {session.pages_visited?.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Route className="h-4 w-4" />
                    访问路径
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {session.pages_visited.map((page, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <span className="text-muted-foreground w-4">{i + 1}.</span>
                        <span className="break-words whitespace-normal">{page}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    );
}
