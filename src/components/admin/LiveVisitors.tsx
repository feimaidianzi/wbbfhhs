import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Users, Eye, Monitor, Smartphone, Tablet, Globe, 
  Activity, Clock, MapPin, ArrowRight
} from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface OnlineVisitor {
  id: string;
  session_id: string;
  traffic_source: string;
  device_type: string;
  browser: string;
  current_page: string;
  city: string;
  last_activity_at: string;
  total_page_views: number;
  pages_visited: string[];
}

const deviceIcons: Record<string, React.ReactNode> = {
  desktop: <Monitor className="h-3 w-3" />,
  mobile: <Smartphone className="h-3 w-3" />,
  tablet: <Tablet className="h-3 w-3" />,
};

const sourceLabels: Record<string, string> = {
  direct: '直接访问',
  search_engine: '搜索',
  social_media: '社交',
  referral: '外链',
};

const LiveVisitors = () => {
  const [visitors, setVisitors] = useState<OnlineVisitor[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const fetchActiveVisitors = useCallback(async () => {
    // 获取最近5分钟活跃的访客
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    
    const { data, error } = await supabase
      .from('visitor_sessions')
      .select('*')
      .gte('last_activity_at', fiveMinutesAgo)
      .order('last_activity_at', { ascending: false })
      .limit(20);

    if (!error && data) {
      setVisitors(data.map(v => ({
        id: v.id,
        session_id: v.session_id,
        traffic_source: v.traffic_source || 'direct',
        device_type: v.device_type || 'desktop',
        browser: v.browser || 'unknown',
        current_page: v.pages_visited?.[v.pages_visited.length - 1] || '/',
        city: v.city || '',
        last_activity_at: v.last_activity_at,
        total_page_views: v.total_page_views || 0,
        pages_visited: v.pages_visited || [],
      })));
    }
  }, []);

  useEffect(() => {
    fetchActiveVisitors();

    // 设置实时监听
    const channel = supabase
      .channel('live-visitors')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'visitor_sessions',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newVisitor = payload.new as any;
            setVisitors(prev => [{
              id: newVisitor.id,
              session_id: newVisitor.session_id,
              traffic_source: newVisitor.traffic_source || 'direct',
              device_type: newVisitor.device_type || 'desktop',
              browser: newVisitor.browser || 'unknown',
              current_page: newVisitor.pages_visited?.[newVisitor.pages_visited.length - 1] || '/',
              city: newVisitor.city || '',
              last_activity_at: newVisitor.last_activity_at,
              total_page_views: newVisitor.total_page_views || 0,
              pages_visited: newVisitor.pages_visited || [],
            }, ...prev].slice(0, 20));
          } else if (payload.eventType === 'UPDATE') {
            const updated = payload.new as any;
            setVisitors(prev => 
              prev.map(v => v.id === updated.id ? {
                ...v,
                current_page: updated.pages_visited?.[updated.pages_visited.length - 1] || v.current_page,
                last_activity_at: updated.last_activity_at,
                total_page_views: updated.total_page_views || v.total_page_views,
                pages_visited: updated.pages_visited || v.pages_visited,
              } : v)
            );
          }
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    // 定期刷新以清理不活跃的访客
    const interval = setInterval(() => {
      fetchActiveVisitors();
    }, 30000);

    return () => {
      channel.unsubscribe();
      clearInterval(interval);
    };
  }, [fetchActiveVisitors]);

  const getActivityStatus = (lastActivity: string) => {
    const diff = Date.now() - new Date(lastActivity).getTime();
    if (diff < 60000) return { label: '活跃', color: 'bg-green-500' };
    if (diff < 180000) return { label: '空闲', color: 'bg-yellow-500' };
    return { label: '离开', color: 'bg-slate-500' };
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-500" />
            实时访客
            <Badge variant="secondary" className="ml-2">
              {visitors.length} 在线
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-xs text-slate-400">{isConnected ? '已连接' : '断开'}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[280px]">
          {visitors.length === 0 ? (
            <div className="p-6 text-center text-slate-400">
              <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">暂无在线访客</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-700">
              {visitors.map((visitor) => {
                const status = getActivityStatus(visitor.last_activity_at);
                return (
                  <div key={visitor.id} className="px-4 py-3 hover:bg-slate-700/50 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-2 h-2 rounded-full ${status.color}`} />
                          <span className="text-sm text-white truncate">
                            {visitor.current_page}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            {deviceIcons[visitor.device_type] || <Globe className="h-3 w-3" />}
                            {visitor.browser}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {visitor.total_page_views}页
                          </span>
                          {visitor.city && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {visitor.city}
                            </span>
                          )}
                        </div>
                        {visitor.pages_visited.length > 1 && (
                          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                            {visitor.pages_visited.slice(-3).map((page, i, arr) => (
                              <span key={i} className="flex items-center">
                                <span className="truncate max-w-[60px]">{page}</span>
                                {i < arr.length - 1 && <ArrowRight className="h-3 w-3 mx-1" />}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <Badge variant="outline" className="text-xs mb-1">
                          {sourceLabels[visitor.traffic_source] || visitor.traffic_source}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="h-3 w-3" />
                          {format(new Date(visitor.last_activity_at), 'HH:mm:ss', { locale: zhCN })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default LiveVisitors;
