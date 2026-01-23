import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  User, MapPin, Globe, Monitor, Smartphone, Clock, 
  Eye, Search, ShoppingCart, TrendingUp, Target,
  Heart, Package, Zap
} from 'lucide-react';

interface VisitorProfileProps {
  sessionId: string;
}

interface VisitorSession {
  id: string;
  session_id: string;
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
  search_keywords: string[];
  first_visit_at: string;
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
  event_type: string;
  page_path: string;
  product_name: string | null;
  product_category: string | null;
  created_at: string;
}

const trafficSourceLabels: Record<string, string> = {
  direct: '直接访问',
  search_engine: '搜索引擎',
  social_media: '社交媒体',
  referral: '外部链接',
};

const urgencyLabels: Record<string, { label: string; color: string }> = {
  low: { label: '低', color: 'bg-muted' },
  medium: { label: '中', color: 'bg-amber-500' },
  high: { label: '高', color: 'bg-orange-500' },
  immediate: { label: '紧急', color: 'bg-destructive' },
};

export default function VisitorProfile({ sessionId }: VisitorProfileProps) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<VisitorSession | null>(null);
  const [lead, setLead] = useState<CustomerLead | null>(null);
  const [events, setEvents] = useState<VisitorEvent[]>([]);
  const [interests, setInterests] = useState<{ category: string; count: number }[]>([]);

  useEffect(() => {
    if (!sessionId) return;
    
    const loadData = async () => {
      setLoading(true);
      
      // 获取会话信息
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
      }
      
      // 获取事件记录
      const { data: eventData } = await supabase
        .from('visitor_events')
        .select('event_type, page_path, product_name, product_category, created_at')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (eventData) {
        setEvents(eventData);
        
        // 分析兴趣偏好
        const categoryCount: Record<string, number> = {};
        eventData.forEach(e => {
          if (e.product_category) {
            categoryCount[e.product_category] = (categoryCount[e.product_category] || 0) + 1;
          }
          // 从页面路径提取分类
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
    
    loadData();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="space-y-4">
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
    if (seconds < 60) return `${seconds}秒`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}分${secs}秒`;
  };

  // 计算购买意向评分
  const calculateIntentScore = () => {
    if (lead?.lead_score) return lead.lead_score;
    
    let score = 0;
    // 基于页面浏览
    score += Math.min(session.total_page_views * 5, 30);
    // 基于停留时间
    score += Math.min(Math.floor(session.total_duration_seconds / 30), 20);
    // 基于搜索关键词
    score += (session.search_keywords?.length || 0) * 10;
    // 基于产品页面访问
    const productViews = events.filter(e => e.product_name).length;
    score += Math.min(productViews * 8, 30);
    
    return Math.min(score, 100);
  };

  const intentScore = calculateIntentScore();
  const intentLevel = intentScore >= 70 ? '高意向' : intentScore >= 40 ? '中意向' : '低意向';
  const intentColor = intentScore >= 70 ? 'text-primary' : intentScore >= 40 ? 'text-amber-500' : 'text-muted-foreground';

  // 提取浏览的产品
  const viewedProducts = [...new Set(events.filter(e => e.product_name).map(e => e.product_name))].slice(0, 5);

  return (
    <div className="space-y-4">
      {/* 基本信息 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <User className="h-4 w-4" />
            访客信息
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              <Globe className="h-3 w-3" />
              来源
            </span>
            <Badge variant="outline">
              {trafficSourceLabels[session.traffic_source] || session.traffic_source}
            </Badge>
          </div>
          {session.city && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                位置
              </span>
              <span>{session.city}, {session.country}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              {session.device_type === 'mobile' ? <Smartphone className="h-3 w-3" /> : <Monitor className="h-3 w-3" />}
              设备
            </span>
            <span>{session.browser} / {session.os}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              <Eye className="h-3 w-3" />
              浏览
            </span>
            <span>{session.total_page_views} 页面</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              停留
            </span>
            <span>{formatDuration(session.total_duration_seconds || 0)}</span>
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

      {/* 浏览的产品 */}
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
                <div key={i} className="text-sm text-muted-foreground">
                  • {product}
                </div>
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
                <Badge key={i} variant="outline" className="text-xs">
                  {kw}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 线索信息 */}
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
  );
}