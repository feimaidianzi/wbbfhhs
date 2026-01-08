import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Shield, 
  LogOut, 
  Home,
  Loader2,
  ArrowLeft,
  History,
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Mail,
  LogIn,
  Download
} from 'lucide-react';

interface ActivityLog {
  id: string;
  user_id: string;
  user_email: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  entity_name: string | null;
  details: any;
  created_at: string;
}

const ACTION_ICONS: Record<string, any> = {
  create: Plus,
  update: Edit,
  delete: Trash2,
  publish: Eye,
  unpublish: EyeOff,
  reply: Mail,
  login: LogIn,
  logout: LogOut,
  export: Download,
};

const ACTION_LABELS: Record<string, string> = {
  create: '创建',
  update: '更新',
  delete: '删除',
  publish: '发布',
  unpublish: '取消发布',
  reply: '回复',
  login: '登录',
  logout: '退出',
  export: '导出',
};

const ENTITY_LABELS: Record<string, string> = {
  product: '产品',
  news: '新闻',
  inquiry: '咨询',
  user: '用户',
  settings: '设置',
  system: '系统',
};

const ActivityLogs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEntity, setFilterEntity] = useState<string>('all');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 20;

  const fetchLogs = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('admin_activity_logs')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (filterEntity !== 'all') {
        query = query.eq('entity_type', filterEntity);
      }
      if (filterAction !== 'all') {
        query = query.eq('action', filterAction);
      }
      if (searchTerm) {
        query = query.or(`user_email.ilike.%${searchTerm}%,entity_name.ilike.%${searchTerm}%`);
      }

      const from = (currentPage - 1) * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;
      setLogs(data || []);
      setTotalCount(count || 0);
    } catch (error: any) {
      console.error('Error fetching logs:', error);
      toast({
        title: '获取日志失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate('/feimai-admin-login');
        return;
      }

      const { data: isAdmin } = await supabase.rpc('has_role', {
        _user_id: session.user.id,
        _role: 'admin'
      });

      if (!isAdmin) {
        toast({
          title: '访问拒绝',
          description: '您没有管理员权限',
          variant: 'destructive',
        });
        navigate('/feimai-admin-login');
        return;
      }

      fetchLogs();
    };

    checkAdminAccess();
  }, [navigate, toast]);

  useEffect(() => {
    fetchLogs();
  }, [filterEntity, filterAction, currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchLogs();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/feimai-admin-login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'update': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'delete': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'publish': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'unpublish': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'reply': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  if (loading && logs.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

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
              <h1 className="text-lg font-bold text-white">操作日志</h1>
              <p className="text-xs text-slate-400">Activity Logs</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <Home className="w-4 h-4 mr-2" />
                返回前台
              </Button>
            </Link>
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
        {/* Back Button & Filters */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <Link to="/feimai-admin-console">
            <Button variant="ghost" className="text-slate-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回管理后台
            </Button>
          </Link>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <History className="w-5 h-5" />
              操作记录
              <Badge variant="secondary" className="ml-2">
                共 {totalCount} 条
              </Badge>
            </CardTitle>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="搜索用户或内容..."
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <Select value={filterEntity} onValueChange={setFilterEntity}>
                <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="实体类型" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">全部类型</SelectItem>
                  {Object.entries(ENTITY_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="操作类型" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">全部操作</SelectItem>
                  {Object.entries(ACTION_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleSearch} className="bg-amber-500 hover:bg-amber-600">
                <Search className="w-4 h-4 mr-2" />
                搜索
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-400">时间</TableHead>
                    <TableHead className="text-slate-400">操作者</TableHead>
                    <TableHead className="text-slate-400">操作</TableHead>
                    <TableHead className="text-slate-400">类型</TableHead>
                    <TableHead className="text-slate-400">目标</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => {
                    const ActionIcon = ACTION_ICONS[log.action] || Edit;
                    return (
                      <TableRow key={log.id} className="border-slate-700">
                        <TableCell className="text-slate-400 text-sm whitespace-nowrap">
                          {formatDate(log.created_at)}
                        </TableCell>
                        <TableCell className="text-white">
                          {log.user_email || log.user_id.slice(0, 8)}
                        </TableCell>
                        <TableCell>
                          <Badge className={getActionColor(log.action)}>
                            <ActionIcon className="w-3 h-3 mr-1" />
                            {ACTION_LABELS[log.action] || log.action}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-slate-400 border-slate-500">
                            {ENTITY_LABELS[log.entity_type] || log.entity_type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-300 max-w-xs truncate">
                          {log.entity_name || log.entity_id || '-'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {logs.length === 0 && !loading && (
              <div className="text-center py-12">
                <History className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">暂无操作记录</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="text-slate-400"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-slate-400 text-sm">
                  第 {currentPage} / {totalPages} 页
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="text-slate-400"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ActivityLogs;
