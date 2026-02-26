import { useState, useEffect } from 'react';
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
  Upload,
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
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import LiveVisitors from '@/components/admin/LiveVisitors';

interface Stats {
  pendingInquiries: number;
  totalInquiries: number;
  publishedProducts: number;
  publishedNews: number;
}

interface DailyInquiry {
  date: string;
  count: number;
}

interface StatusCount {
  status: string;
  count: number;
}

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
  const [dailyInquiries, setDailyInquiries] = useState<DailyInquiry[]>([]);
  const [statusCounts, setStatusCounts] = useState<StatusCount[]>([]);

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

  const fetchChartData = async () => {
    try {
      // Fetch inquiries for the last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data: inquiries } = await supabase
        .from('inquiries')
        .select('created_at, status')
        .gte('created_at', sevenDaysAgo.toISOString());

      // Process daily counts
      const dailyCounts: Record<string, number> = {};
      const statusMap: Record<string, number> = {};

      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
        dailyCounts[dateStr] = 0;
      }

      inquiries?.forEach(inquiry => {
        const date = new Date(inquiry.created_at);
        const dateStr = date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
        if (dailyCounts[dateStr] !== undefined) {
          dailyCounts[dateStr]++;
        }
        
        const status = inquiry.status || 'pending';
        statusMap[status] = (statusMap[status] || 0) + 1;
      });

      setDailyInquiries(
        Object.entries(dailyCounts).map(([date, count]) => ({ date, count }))
      );

      const statusLabels: Record<string, string> = {
        pending: '待处理',
        processing: '处理中',
        replied: '已回复',
        closed: '已关闭',
      };

      setStatusCounts(
        Object.entries(statusMap).map(([status, count]) => ({
          status: statusLabels[status] || status,
          count,
        }))
      );
    } catch (error) {
      console.error('Failed to fetch chart data:', error);
    }
  };

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
      icon: FileText, 
      title: '新闻管理', 
      description: '发布和管理新闻文章', 
      href: '/admin/news',
      color: 'from-orange-500 to-red-500'
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
      icon: Upload, 
      title: '数据导入', 
      description: '导入硬编码产品到数据库', 
      href: '/admin/data-import',
      color: 'from-slate-500 to-slate-600'
    },
    { 
      icon: Bot, 
      title: '内容中控台', 
      description: '内容流控·AI编辑·采集引擎', 
      href: '/admin/content-hub',
      color: 'from-amber-500 to-orange-500'
    },
    { 
      icon: Zap, 
      title: '自动翻译', 
      description: 'DeepSeek自动检测和翻译', 
      href: '/admin/auto-translate',
      color: 'from-cyan-500 to-blue-500'
    },
    { 
      icon: Languages, 
      title: '翻译管理', 
      description: '批量翻译和多语言管理', 
      href: '/admin/translations',
      color: 'from-sky-500 to-blue-500'
    },
    { 
      icon: Search, 
      title: '硬编码检测', 
      description: '扫描未翻译的中文文本', 
      href: '/admin/hardcoded-scanner',
      color: 'from-rose-500 to-pink-500'
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

        {/* Charts and Live Visitors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                近7天咨询趋势
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyInquiries}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
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
                      dataKey="count" 
                      stroke="#3b82f6" 
                      fillOpacity={1} 
                      fill="url(#colorCount)" 
                      name="咨询数"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-500" />
                咨询状态分布
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statusCounts}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="status" stroke="#64748b" fontSize={12} />
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
                      fill="#8b5cf6" 
                      radius={[4, 4, 0, 0]}
                      name="数量"
                    />
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
  );
};

export default AdminDashboard;
