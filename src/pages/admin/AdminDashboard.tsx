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
  Loader2
} from 'lucide-react';
import { User } from '@supabase/supabase-js';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate('/feimai-admin-login');
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
        navigate('/feimai-admin-login');
        return;
      }

      setUser(session.user);
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/feimai-admin-login');
      } else {
        setUser(session.user);
      }
    });

    checkAdminAccess();
    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: '已退出',
      description: '您已成功退出管理后台',
    });
    navigate('/feimai-admin-login');
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
      icon: BarChart3, 
      title: '数据概览', 
      description: '查看网站访问数据和统计', 
      href: '#',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: Users, 
      title: '用户管理', 
      description: '管理注册用户和权限', 
      href: '/feimai-admin-console/users',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      icon: Package, 
      title: '产品管理', 
      description: '添加、编辑产品信息', 
      href: '/feimai-admin-console/products',
      color: 'from-purple-500 to-violet-500'
    },
    { 
      icon: FileText, 
      title: '新闻管理', 
      description: '发布和管理新闻文章', 
      href: '/feimai-admin-console/news',
      color: 'from-orange-500 to-red-500'
    },
    { 
      icon: MessageSquare, 
      title: '咨询管理', 
      description: '查看和回复用户咨询', 
      href: '/feimai-admin-console/inquiries',
      color: 'from-pink-500 to-rose-500'
    },
    { 
      icon: Settings, 
      title: '系统设置', 
      description: '邮件通知等系统配置', 
      href: '/feimai-admin-console/settings',
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
                  <p className="text-slate-400 text-sm">今日访问</p>
                  <p className="text-2xl font-bold text-white">--</p>
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
                  <p className="text-slate-400 text-sm">注册用户</p>
                  <p className="text-2xl font-bold text-white">--</p>
                </div>
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">产品数量</p>
                  <p className="text-2xl font-bold text-white">--</p>
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
                  <p className="text-slate-400 text-sm">待处理咨询</p>
                  <p className="text-2xl font-bold text-white">--</p>
                </div>
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Link key={item.title} to={item.href}>
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

        {/* Notice */}
        <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <p className="text-amber-500 text-sm">
            <strong>提示：</strong>管理功能模块正在开发中，如需添加具体功能请告诉我。
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
