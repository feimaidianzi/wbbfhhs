import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
  Users, Eye, Monitor, Smartphone, Tablet, Globe, 
  Activity, Clock, MapPin, ArrowRight, Volume2, VolumeX
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

// 播放新访客提示音
const playNewVisitorSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // 使用更悦耳的双音调提示
    oscillator.frequency.value = 523.25; // C5音符
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
    
    // 第二个音符
    setTimeout(() => {
      const osc2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      osc2.connect(gain2);
      gain2.connect(audioContext.destination);
      osc2.frequency.value = 659.25; // E5音符
      osc2.type = 'sine';
      gain2.gain.setValueAtTime(0.2, audioContext.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      osc2.start(audioContext.currentTime);
      osc2.stop(audioContext.currentTime + 0.3);
    }, 150);
  } catch (e) {
    console.error('无法播放提示音:', e);
  }
};

const LiveVisitors = () => {
  const [visitors, setVisitors] = useState<OnlineVisitor[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const knownVisitorIds = useRef<Set<string>>(new Set());

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
      // 初始化已知访客ID
      data.forEach(v => knownVisitorIds.current.add(v.id));
      
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
            
            // 检测是否是新访客并播放提示音
            if (!knownVisitorIds.current.has(newVisitor.id)) {
              knownVisitorIds.current.add(newVisitor.id);
              if (soundEnabled) {
                playNewVisitorSound();
              }
            }
            
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
  }, [fetchActiveVisitors, soundEnabled]);

  const getActivityStatus = (lastActivity: string) => {
    const diff = Date.now() - new Date(lastActivity).getTime();
    if (diff < 60000) return { label: '活跃', color: 'bg-primary' };
    if (diff < 180000) return { label: '空闲', color: 'bg-amber-500' };
    return { label: '离开', color: 'bg-muted-foreground' };
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-foreground flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            实时访客
            <Badge variant="secondary" className="ml-2">
              {visitors.length} 在线
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "关闭提示音" : "开启提示音"}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
            </Button>
            <div className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-primary animate-pulse' : 'bg-destructive'}`} />
              <span className="text-xs text-muted-foreground">{isConnected ? '已连接' : '断开'}</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[280px]">
          {visitors.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">暂无在线访客</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {visitors.map((visitor) => {
                const status = getActivityStatus(visitor.last_activity_at);
                return (
                  <div key={visitor.id} className="px-4 py-3 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-2 h-2 rounded-full ${status.color}`} />
                          <span className="text-sm text-foreground truncate">
                            {visitor.current_page}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
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
                          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground/70">
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
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
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
