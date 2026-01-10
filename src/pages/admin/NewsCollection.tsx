import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  Shield, 
  LogOut, 
  Home,
  Loader2,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  RefreshCw,
  Rss,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  Bot
} from 'lucide-react';

interface NewsKeyword {
  id: string;
  keyword: string;
  keyword_en: string | null;
  category: string;
  is_active: boolean;
  priority: number;
  created_at: string;
}

interface CollectionTask {
  id: string;
  keyword: string;
  category: string;
  articles_collected: number;
  articles_published: number;
  status: string;
  error_message: string | null;
  created_at: string;
  completed_at: string | null;
}

const NewsCollection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [keywords, setKeywords] = useState<NewsKeyword[]>([]);
  const [tasks, setTasks] = useState<CollectionTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [collecting, setCollecting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingKeyword, setEditingKeyword] = useState<NewsKeyword | null>(null);
  const [deleteKeywordId, setDeleteKeywordId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    keyword: '',
    keyword_en: '',
    category: '',
    is_active: true,
    priority: 5,
  });

  const fetchData = async () => {
    try {
      const [keywordsRes, tasksRes] = await Promise.all([
        supabase
          .from('news_keywords')
          .select('*')
          .order('priority', { ascending: false }),
        supabase
          .from('news_collection_tasks')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20),
      ]);

      if (keywordsRes.error) throw keywordsRes.error;
      if (tasksRes.error) throw tasksRes.error;

      setKeywords(keywordsRes.data || []);
      setTasks(tasksRes.data || []);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      toast({
        title: '获取数据失败',
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

      fetchData();
    };

    checkAdminAccess();
  }, [navigate, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/feimai-admin-login');
  };

  const openCreateDialog = () => {
    setEditingKeyword(null);
    setFormData({
      keyword: '',
      keyword_en: '',
      category: '',
      is_active: true,
      priority: 5,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (kw: NewsKeyword) => {
    setEditingKeyword(kw);
    setFormData({
      keyword: kw.keyword,
      keyword_en: kw.keyword_en || '',
      category: kw.category,
      is_active: kw.is_active,
      priority: kw.priority,
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.keyword.trim() || !formData.category.trim()) {
      toast({
        title: '请填写必填项',
        description: '关键词和分类不能为空',
        variant: 'destructive',
      });
      return;
    }

    try {
      const data = {
        keyword: formData.keyword.trim(),
        keyword_en: formData.keyword_en.trim() || null,
        category: formData.category.trim(),
        is_active: formData.is_active,
        priority: formData.priority,
      };

      if (editingKeyword) {
        const { error } = await supabase
          .from('news_keywords')
          .update(data)
          .eq('id', editingKeyword.id);
        if (error) throw error;
        toast({ title: '关键词已更新' });
      } else {
        const { error } = await supabase
          .from('news_keywords')
          .insert(data);
        if (error) throw error;
        toast({ title: '关键词已添加' });
      }

      setIsDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast({
        title: '保存失败',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteKeywordId) return;

    try {
      const { error } = await supabase
        .from('news_keywords')
        .delete()
        .eq('id', deleteKeywordId);

      if (error) throw error;
      toast({ title: '关键词已删除' });
      fetchData();
    } catch (error: any) {
      toast({
        title: '删除失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteKeywordId(null);
    }
  };

  const toggleKeywordActive = async (kw: NewsKeyword) => {
    try {
      const { error } = await supabase
        .from('news_keywords')
        .update({ is_active: !kw.is_active })
        .eq('id', kw.id);

      if (error) throw error;
      toast({ title: kw.is_active ? '已暂停采集' : '已启用采集' });
      fetchData();
    } catch (error: any) {
      toast({
        title: '操作失败',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const collectSingleKeyword = async (kw: NewsKeyword) => {
    setCollecting(true);
    try {
      const response = await supabase.functions.invoke('collect-news', {
        body: {
          action: 'collect',
          keyword: kw.keyword,
          category: kw.category,
          limit: 3,
          autoPublish: false,
        },
      });

      if (response.error) throw response.error;

      toast({
        title: '采集完成',
        description: `成功采集 ${response.data.articlesCollected} 篇文章`,
      });
      fetchData();
    } catch (error: any) {
      toast({
        title: '采集失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setCollecting(false);
    }
  };

  const collectAllKeywords = async (autoPublish: boolean = false) => {
    setCollecting(true);
    try {
      const response = await supabase.functions.invoke('collect-news', {
        body: {
          action: 'collect-all',
          limit: 10,
          autoPublish,
        },
      });

      if (response.error) throw response.error;

      toast({
        title: '批量采集完成',
        description: `成功采集 ${response.data.totalCollected} 篇文章${autoPublish ? `，已发布 ${response.data.totalPublished} 篇` : ''}`,
      });
      fetchData();
    } catch (error: any) {
      toast({
        title: '采集失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setCollecting(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('zh-CN');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-400"><CheckCircle className="w-3 h-3 mr-1" />完成</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500/20 text-blue-400"><Loader2 className="w-3 h-3 mr-1 animate-spin" />处理中</Badge>;
      case 'failed':
        return <Badge className="bg-red-500/20 text-red-400"><XCircle className="w-3 h-3 mr-1" />失败</Badge>;
      default:
        return <Badge className="bg-slate-500/20 text-slate-400"><Clock className="w-3 h-3 mr-1" />等待</Badge>;
    }
  };

  if (loading) {
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
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">自动新闻采集</h1>
              <p className="text-xs text-slate-400">AI-Powered News Collection</p>
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
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Back Button & Actions */}
        <div className="flex items-center justify-between">
          <Link to="/feimai-admin-console">
            <Button variant="ghost" className="text-slate-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回管理后台
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => collectAllKeywords(false)}
              disabled={collecting}
              variant="outline"
              className="border-slate-600"
            >
              {collecting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
              采集为草稿
            </Button>
            <Button 
              onClick={() => collectAllKeywords(true)}
              disabled={collecting}
              className="bg-amber-500 hover:bg-amber-600"
            >
              {collecting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
              采集并发布
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Rss className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{keywords.length}</p>
                  <p className="text-sm text-slate-400">采集关键词</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{keywords.filter(k => k.is_active).length}</p>
                  <p className="text-sm text-slate-400">活跃关键词</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {tasks.filter(t => t.status === 'completed').reduce((acc, t) => acc + t.articles_collected, 0)}
                  </p>
                  <p className="text-sm text-slate-400">已采集文章</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {tasks.filter(t => t.status === 'completed').reduce((acc, t) => acc + t.articles_published, 0)}
                  </p>
                  <p className="text-sm text-slate-400">已发布文章</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Keywords Management */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Rss className="w-5 h-5" />
                采集关键词配置
              </CardTitle>
              <CardDescription className="text-slate-400">
                配置要自动采集的新闻关键词，系统将从 Google News 获取相关新闻
              </CardDescription>
            </div>
            <Button onClick={openCreateDialog} size="sm" className="bg-amber-500 hover:bg-amber-600">
              <Plus className="w-4 h-4 mr-2" />
              添加关键词
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-400">关键词</TableHead>
                  <TableHead className="text-slate-400">英文关键词</TableHead>
                  <TableHead className="text-slate-400">分类</TableHead>
                  <TableHead className="text-slate-400">优先级</TableHead>
                  <TableHead className="text-slate-400">状态</TableHead>
                  <TableHead className="text-slate-400 text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywords.map((kw) => (
                  <TableRow key={kw.id} className="border-slate-700">
                    <TableCell className="text-white font-medium">{kw.keyword}</TableCell>
                    <TableCell className="text-slate-400">{kw.keyword_en || '-'}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-slate-300 border-slate-500">
                        {kw.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-400">{kw.priority}</TableCell>
                    <TableCell>
                      {kw.is_active ? (
                        <Badge className="bg-green-500/20 text-green-400">启用</Badge>
                      ) : (
                        <Badge variant="outline" className="text-slate-400 border-slate-500">暂停</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => collectSingleKeyword(kw)}
                          disabled={collecting}
                          className="text-amber-400 hover:text-amber-300"
                          title="立即采集"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleKeywordActive(kw)}
                          className={kw.is_active ? 'text-orange-400 hover:text-orange-300' : 'text-green-400 hover:text-green-300'}
                        >
                          {kw.is_active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(kw)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setDeleteKeywordId(kw.id);
                            setIsDeleteDialogOpen(true);
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Collection Tasks History */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5" />
              采集任务历史
            </CardTitle>
            <CardDescription className="text-slate-400">
              查看最近的新闻采集任务执行记录
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-400">关键词</TableHead>
                  <TableHead className="text-slate-400">分类</TableHead>
                  <TableHead className="text-slate-400">采集数</TableHead>
                  <TableHead className="text-slate-400">发布数</TableHead>
                  <TableHead className="text-slate-400">状态</TableHead>
                  <TableHead className="text-slate-400">执行时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id} className="border-slate-700">
                    <TableCell className="text-white">{task.keyword}</TableCell>
                    <TableCell className="text-slate-400">{task.category}</TableCell>
                    <TableCell className="text-slate-400">{task.articles_collected}</TableCell>
                    <TableCell className="text-slate-400">{task.articles_published}</TableCell>
                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                    <TableCell className="text-slate-400 text-sm">{formatDate(task.created_at)}</TableCell>
                  </TableRow>
                ))}
                {tasks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-slate-400 py-8">
                      暂无采集任务记录
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Add/Edit Keyword Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>{editingKeyword ? '编辑关键词' : '添加关键词'}</DialogTitle>
            <DialogDescription className="text-slate-400">
              配置要自动采集的新闻关键词
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="keyword">中文关键词 *</Label>
              <Input
                id="keyword"
                value={formData.keyword}
                onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                placeholder="例如：无人机、电力巡检"
                className="bg-slate-700 border-slate-600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keyword_en">英文关键词</Label>
              <Input
                id="keyword_en"
                value={formData.keyword_en}
                onChange={(e) => setFormData({ ...formData, keyword_en: e.target.value })}
                placeholder="例如：drone, UAV"
                className="bg-slate-700 border-slate-600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">分类 *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="例如：无人机、电力巡检、物流配送"
                className="bg-slate-700 border-slate-600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">优先级 (1-10)</Label>
              <Input
                id="priority"
                type="number"
                min="1"
                max="10"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 5 })}
                className="bg-slate-700 border-slate-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="is_active">启用采集</Label>
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSave} className="bg-amber-500 hover:bg-amber-600">
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">确认删除</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              确定要删除这个关键词吗？此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
              取消
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default NewsCollection;
