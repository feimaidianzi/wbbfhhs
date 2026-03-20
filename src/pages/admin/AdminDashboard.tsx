import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  LogOut, 
  Users, 
  Package, 
  FileText, 
  Settings,
  BarChart3,
  MessageSquare,
  Home,
  Loader2,
  History,
  TrendingUp,
  TrendingDown,
  Database,
  Bot,
  Headphones,
  Eye,
  UserCheck,
  Languages,
  Search,
  Globe,
  Zap
} from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import LiveVisitors from '@/components/admin/LiveVisitors';

interface Stats {
  pendingInquiries: number;
  totalInquiries: number;
  publishedProducts: number;
  publishedNews: number;
}

interface DailyTrend {
  date: string;
  formCount: number;
  humanCount: number;
  total: number;
}

interface TypeCount {
  type: string;
  count: number;
}

interface DailyVisit {
  date: string;
  visits: number;
  pageViews: number;
}

type TimeRange = 'today' | '3d' | '7d' | '15d' | '30d' | '3mo' | '6mo' | '1yr';

const TIME_RANGE_OPTIONS: { value: TimeRange; label: string }[] = [
  { value: 'today', label: '今天' },
  { value: '3d', label: '3天' },
  { value: '7d', label: '7天' },
  { value: '15d', label: '15天' },
  { value: '30d', label: '30天' },
  { value: '3mo', label: '3个月' },
  { value: '6mo', label: '半年' },
  { value: '1yr', label: '一年' },
];

const getStartDate = (range: TimeRange): Date => {
  const now = new Date();
  switch (range) {
    case 'today': now.setHours(0, 0, 0, 0); return now;
    case '3d': now.setDate(now.getDate() - 3); return now;
    case '7d': now.setDate(now.getDate() - 7); return now;
    case '15d': now.setDate(now.getDate() - 15); return now;
    case '30d': now.setDate(now.getDate() - 30); return now;
    case '3mo': now.setMonth(now.getMonth() - 3); return now;
    case '6mo': now.setMonth(now.getMonth() - 6); return now;
    case '1yr': now.setFullYear(now.getFullYear() - 1); return now;
  }
};

const getDateFormat = (range: TimeRange): Intl.DateTimeFormatOptions => {
  if (range === 'today') return { hour: '2-digit' };
  if (['3d', '7d', '15d'].includes(range)) return { month: 'short', day: 'numeric' };
  return { month: 'short', day: 'numeric' };
};

const getDayCount = (range: TimeRange): number => {
  switch (range) {
    case 'today': return 1;
    case '3d': return 3;
    case '7d': return 7;
    case '15d': return 15;
    case '30d': return 30;
    case '3mo': return 90;
    case '6mo': return 180;
    case '1yr': return 365;
  }
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    pendingInquiries: 0,
    totalInquiries: 0,
    publishedProducts: 0,
    publishedNews: 0,
  });
  const [dailyTrends, setDailyTrends] = useState<DailyTrend[]>([]);
  const [typeCounts, setTypeCounts] = useState<TypeCount[]>([]);
  const [dailyVisits, setDailyVisits] = useState<DailyVisit[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate('/admin/login');
        return;
      }

      // Check if user has admin role
      const { data: isAdmin } = await supabase.rpc('has_role', {
        _user_id: session.user.id,
        _role: 'admin'
      });

      if (!isAdmin) {
        await supabase.auth.signOut();
        toast({
          title: '访问拒绝',
          description: '您没有管理员权限',
          variant: 'destructive',
        });
        navigate('/admin/login');
        return;
      }

      setUser(session.user);
      await fetchStats();
      await fetchChartData();
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/admin/login');
      } else {
        setUser(session.user);
      }
    });

    checkAdminAccess();
    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const fetchStats = async () => {
    try {
      // Fetch pending inquiries count
      const { count: pendingCount } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Fetch total inquiries count
      const { count: totalInquiriesCount } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true });

      // Fetch published products count
      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('is_published', true);

      // Fetch published news count
      const { count: newsCount } = await supabase
        .from('news_articles')
        .select('*', { count: 'exact', head: true })
        .eq('is_published', true);

      setStats({
        pendingInquiries: pendingCount || 0,
        totalInquiries: totalInquiriesCount || 0,
        publishedProducts: productsCount || 0,
        publishedNews: newsCount || 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchChartData = async (range: TimeRange = timeRange) => {
    try {
      const startDate = getStartDate(range);
      const startISO = startDate.toISOString();
      const dayCount = getDayCount(range);
      const fmt = getDateFormat(range);

      // Fetch form inquiries
      const { data: inquiries } = await supabase
        .from('inquiries')
        .select('created_at')
        .gte('created_at', startISO);

      // Fetch human service conversations (transferred to human)
      const { data: humanConvs } = await supabase
        .from('ai_conversations')
        .select('created_at, is_transferred_to_human')
        .gte('created_at', startISO)
        .eq('is_transferred_to_human', true);

      // Build daily buckets
      const dailyCounts: Record<string, { formCount: number; humanCount: number }> = {};
      
      if (range === 'today') {
        for (let h = 0; h < 24; h++) {
          const label = `${h.toString().padStart(2, '0')}:00`;
          dailyCounts[label] = { formCount: 0, humanCount: 0 };
        }
        inquiries?.forEach(i => {
          const h = new Date(i.created_at).getHours();
          const label = `${h.toString().padStart(2, '0')}:00`;
          if (dailyCounts[label]) dailyCounts[label].formCount++;
        });
        humanConvs?.forEach(c => {
          const h = new Date(c.created_at).getHours();
          const label = `${h.toString().padStart(2, '0')}:00`;
          if (dailyCounts[label]) dailyCounts[label].humanCount++;
        });
      } else {
        for (let i = dayCount - 1; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const label = d.toLocaleDateString('zh-CN', fmt);
          dailyCounts[label] = { formCount: 0, humanCount: 0 };
        }
        inquiries?.forEach(i => {
          const label = new Date(i.created_at).toLocaleDateString('zh-CN', fmt);
          if (dailyCounts[label]) dailyCounts[label].formCount++;
        });
        humanConvs?.forEach(c => {
          const label = new Date(c.created_at).toLocaleDateString('zh-CN', fmt);
          if (dailyCounts[label]) dailyCounts[label].humanCount++;
        });
      }

      setDailyTrends(
        Object.entries(dailyCounts).map(([date, { formCount, humanCount }]) => ({
          date,
          formCount,
          humanCount,
          total: formCount + humanCount,
        }))
      );

      const formTotal = inquiries?.length || 0;
      const humanTotal = humanConvs?.length || 0;
      setTypeCounts([
        { type: '表单咨询', count: formTotal },
        { type: '人工客服', count: humanTotal },
      ]);

      // Fetch visitor sessions (filter out bots)
      const BOT_PATTERNS = ['bot', 'crawler', 'spider', 'meta-externalagent', 'facebookexternalhit', 'googlebot', 'bingbot', 'yandex', 'baidu'];
      const { data: sessions } = await supabase
        .from('visitor_sessions')
        .select('created_at, total_page_views, user_agent')
        .gte('created_at', startISO);

      // Filter out bots client-side
      const realSessions = (sessions || []).filter(s => {
        const ua = (s.user_agent || '').toLowerCase();
        return !BOT_PATTERNS.some(p => ua.includes(p));
      });

      const visitBuckets: Record<string, { visits: number; pageViews: number }> = {};
      
      if (range === 'today') {
        for (let h = 0; h < 24; h++) {
          const label = `${h.toString().padStart(2, '0')}:00`;
          visitBuckets[label] = { visits: 0, pageViews: 0 };
        }
        realSessions.forEach(s => {
          const h = new Date(s.created_at).getHours();
          const label = `${h.toString().padStart(2, '0')}:00`;
          if (visitBuckets[label]) {
            visitBuckets[label].visits++;
            visitBuckets[label].pageViews += s.total_page_views || 0;
          }
        });
      } else {
        for (let i = dayCount - 1; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const label = d.toLocaleDateString('zh-CN', fmt);
          visitBuckets[label] = { visits: 0, pageViews: 0 };
        }
        realSessions.forEach(s => {
          const label = new Date(s.created_at).toLocaleDateString('zh-CN', fmt);
          if (visitBuckets[label]) {
            visitBuckets[label].visits++;
            visitBuckets[label].pageViews += s.total_page_views || 0;
          }
        });
      }

      setDailyVisits(
        Object.entries(visitBuckets).map(([date, { visits, pageViews }]) => ({
          date,
          visits,
          pageViews,
        }))
      );
    } catch (error) {
      console.error('Failed to fetch chart data:', error);
    }
  };

  // Refetch when time range changes
  useEffect(() => {
    if (user) fetchChartData(timeRange);
  }, [timeRange]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: '已退出',
      description: '您已成功退出管理后台',
    });
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  const menuItems = [
    { 
      icon: Eye, 
      title: '访客分析', 
      description: '查看访客行为和数据统计', 
      href: '/admin/visitor-analytics',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: Headphones, 
      title: '客服工作台', 
      description: '处理客户咨询和在线沟通', 
      href: '/admin/customer-service',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      icon: UserCheck, 
      title: '客户线索', 
      description: '管理AI收集的客户线索', 
      href: '/admin/customer-leads',
      color: 'from-teal-500 to-cyan-500'
    },
    { 
      icon: Users, 
      title: '用户管理', 
      description: '管理注册用户和权限', 
      href: '/admin/users',
      color: 'from-violet-500 to-purple-500'
    },
    { 
      icon: Package, 
      title: '产品管理', 
      description: '添加、编辑产品信息', 
      href: '/admin/products',
      color: 'from-purple-500 to-violet-500'
    },
    { 
      icon: MessageSquare, 
      title: '咨询管理', 
      description: '查看和回复用户咨询', 
      href: '/admin/inquiries',
      color: 'from-pink-500 to-rose-500'
    },
    { 
      icon: History, 
      title: '操作日志', 
      description: '查看管理员操作记录', 
      href: '/admin/logs',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Bot, 
      title: '内容中控台', 
      description: '内容流控·AI编辑·采集引擎', 
      href: '/admin/content-hub',
      color: 'from-amber-500 to-orange-500'
    },
    { 
      icon: Languages, 
      title: '翻译管理', 
      description: '批量翻译和多语言管理', 
      href: '/admin/translations',
      color: 'from-sky-500 to-blue-500'
    },
    { 
      icon: Globe, 
      title: 'SEO管理', 
      description: '多语言SEO和Sitemap管理', 
      href: '/admin/seo-management',
      color: 'from-emerald-500 to-teal-500'
    },
    { 
      icon: Settings, 
      title: '系统设置', 
      description: '邮件通知等系统配置', 
      href: '/admin/settings',
      color: 'from-slate-500 to-slate-600'
    },
  ];

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">飞迈管理后台</h1>
              <p className="text-xs text-slate-400">Feimai Admin Console</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <Home className="w-4 h-4 mr-2" />
                返回前台
              </Button>
            </Link>
            <div className="text-sm text-slate-400">
              {user?.email}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-400 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              退出
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">欢迎回来，管理员</h2>
          <p className="text-slate-400">选择下方功能模块开始管理您的网站</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">待处理咨询</p>
                  <p className="text-2xl font-bold text-white">{stats.pendingInquiries}</p>
                </div>
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">总咨询数</p>
                  <p className="text-2xl font-bold text-white">{stats.totalInquiries}</p>
                </div>
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">已发布产品</p>
                  <p className="text-2xl font-bold text-white">{stats.publishedProducts}</p>
                </div>
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">已发布新闻</p>
                  <p className="text-2xl font-bold text-white">{stats.publishedNews}</p>
                </div>
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-slate-400 text-sm">时间范围：</span>
          {TIME_RANGE_OPTIONS.map(opt => (
            <Button
              key={opt.value}
              size="sm"
              variant={timeRange === opt.value ? 'default' : 'outline'}
              className={`h-7 text-xs ${timeRange === opt.value ? '' : 'border-slate-600 text-slate-400 hover:text-white'}`}
              onClick={() => setTimeRange(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Visitor Traffic Chart */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <Eye className="w-5 h-5 text-emerald-500" />
                网站访问量
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs">
                真实访客数 &amp; 页面浏览量（已过滤爬虫）
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyVisits}>
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorPV" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={11} interval="preserveStartEnd" />
                    <YAxis stroke="#64748b" fontSize={12} allowDecimals={false} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="visits" 
                      stroke="#10b981" 
                      fillOpacity={1} 
                      fill="url(#colorVisits)" 
                      name="访客数"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="pageViews" 
                      stroke="#6366f1" 
                      fillOpacity={1} 
                      fill="url(#colorPV)" 
                      name="页面浏览"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                咨询趋势
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs">
                表单咨询 + 人工客服咨询
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyTrends}>
                    <defs>
                      <linearGradient id="colorForm" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorHuman" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={11} interval="preserveStartEnd" />
                    <YAxis stroke="#64748b" fontSize={12} allowDecimals={false} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="formCount" 
                      stroke="#3b82f6" 
                      fillOpacity={1} 
                      fill="url(#colorForm)" 
                      name="表单咨询"
                      stackId="1"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="humanCount" 
                      stroke="#f59e0b" 
                      fillOpacity={1} 
                      fill="url(#colorHuman)" 
                      name="人工客服"
                      stackId="1"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <BarChart3 className="w-5 h-5 text-purple-500" />
                咨询类型分布
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs">
                按咨询渠道统计
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={typeCounts}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="type" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} allowDecimals={false} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Bar 
                      dataKey="count" 
                      radius={[4, 4, 0, 0]}
                      name="数量"
                    >
                      {typeCounts.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : '#f59e0b'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Live Visitors Widget */}
          <LiveVisitors />
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <Link 
              key={item.title} 
              to={item.href}
            >
              <Card 
                className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all cursor-pointer group h-full"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">{item.title}</CardTitle>
                  <CardDescription className="text-slate-400">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0">
                    进入管理 →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
    </>
  );
};

export default AdminDashboard;
