import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Shield, 
  LogOut, 
  FileText, 
  Home,
  Loader2,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  Image,
  RefreshCw
} from 'lucide-react';
import SingleImageUpload from '@/components/admin/SingleImageUpload';
import RichTextEditor from '@/components/admin/RichTextEditor';

interface NewsArticle {
  id: string;
  title: string;
  summary: string | null;
  content: string;
  cover_image: string | null;
  author_name: string | null;
  category: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  ai_edited: boolean | null;
  review_status: string | null;
  reviewed_at: string | null;
  review_notes: string | null;
}

const NewsManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isAIModifyDialogOpen, setIsAIModifyDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [reviewingArticle, setReviewingArticle] = useState<NewsArticle | null>(null);
  const [modifyingArticle, setModifyingArticle] = useState<NewsArticle | null>(null);
  const [deleteArticleId, setDeleteArticleId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [aiModifying, setAiModifying] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    cover_image: '',
    author_name: '',
    category: 'news',
    is_published: false,
  });

  const [reviewData, setReviewData] = useState({
    status: 'approved' as 'approved' | 'rejected',
    notes: '',
  });

  const [modifyData, setModifyData] = useState({
    request: '',
    modifyImages: false,
  });

  const fetchArticles = async () => {
    try {
      let query = supabase
        .from('news_articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (filterStatus !== 'all') {
        query = query.eq('review_status', filterStatus);
      }

      const { data, error } = await query;

      if (error) throw error;
      setArticles(data || []);
    } catch (error: any) {
      console.error('Error fetching articles:', error);
      toast({
        title: '获取文章列表失败',
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
        navigate('/admin/login');
        return;
      }

      setCurrentUserId(session.user.id);

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
        navigate('/admin/login');
        return;
      }

      fetchArticles();
    };

    checkAdminAccess();
  }, [navigate, toast]);

  useEffect(() => {
    if (currentUserId) {
      setLoading(true);
      fetchArticles();
    }
  }, [filterStatus]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const openCreateDialog = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      summary: '',
      content: '',
      cover_image: '',
      author_name: '',
      category: 'news',
      is_published: false,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (article: NewsArticle) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      summary: article.summary || '',
      content: article.content,
      cover_image: article.cover_image || '',
      author_name: article.author_name || '',
      category: article.category || 'news',
      is_published: article.is_published,
    });
    setIsDialogOpen(true);
  };

  const openReviewDialog = (article: NewsArticle) => {
    setReviewingArticle(article);
    setReviewData({ status: 'approved', notes: '' });
    setIsReviewDialogOpen(true);
  };

  const openAIModifyDialog = (article: NewsArticle) => {
    setModifyingArticle(article);
    setModifyData({ request: '', modifyImages: false });
    setIsAIModifyDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: '请填写必填项',
        description: '标题和内容不能为空',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      // 手动创建的文章默认审核通过
      const articleData = {
        title: formData.title.trim(),
        summary: formData.summary.trim() || null,
        content: formData.content.trim(),
        cover_image: formData.cover_image.trim() || null,
        author_name: formData.author_name.trim() || null,
        category: formData.category || 'news',
        is_published: formData.is_published,
        published_at: formData.is_published ? new Date().toISOString() : null,
        author_id: currentUserId,
        review_status: 'approved', // 手动创建默认通过审核
        reviewed_at: new Date().toISOString(),
        reviewed_by: currentUserId,
      };

      if (editingArticle) {
        const { error } = await supabase
          .from('news_articles')
          .update(articleData)
          .eq('id', editingArticle.id);

        if (error) throw error;
        toast({ title: '文章已更新' });
      } else {
        const { error } = await supabase
          .from('news_articles')
          .insert(articleData);

        if (error) throw error;
        toast({ title: '文章已创建' });
      }

      setIsDialogOpen(false);
      fetchArticles();
    } catch (error: any) {
      console.error('Error saving article:', error);
      toast({
        title: '保存失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReview = async () => {
    if (!reviewingArticle) return;

    setSaving(true);
    try {
      const updateData: Record<string, any> = {
        review_status: reviewData.status,
        reviewed_at: new Date().toISOString(),
        reviewed_by: currentUserId,
        review_notes: reviewData.notes || null,
      };

      // 如果审核通过且当前未发布，自动发布
      if (reviewData.status === 'approved') {
        updateData.is_published = true;
        updateData.published_at = new Date().toISOString();
      } else if (reviewData.status === 'rejected') {
        updateData.is_published = false;
        updateData.published_at = null;
      }

      const { error } = await supabase
        .from('news_articles')
        .update(updateData)
        .eq('id', reviewingArticle.id);

      if (error) throw error;

      toast({
        title: reviewData.status === 'approved' ? '文章已通过审核并发布' : '文章已被拒绝',
      });

      setIsReviewDialogOpen(false);
      fetchArticles();
    } catch (error: any) {
      console.error('Error reviewing article:', error);
      toast({
        title: '审核操作失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAIModify = async () => {
    if (!modifyingArticle || !modifyData.request.trim()) {
      toast({
        title: '请输入修改要求',
        variant: 'destructive',
      });
      return;
    }

    setAiModifying(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await supabase.functions.invoke('ai-modify-article', {
        body: {
          articleId: modifyingArticle.id,
          modificationRequest: modifyData.request,
          modifyImages: modifyData.modifyImages,
        },
      });

      if (response.error) {
        throw new Error(response.error.message || 'AI修改失败');
      }

      toast({
        title: 'AI修改完成',
        description: response.data?.changes || '文章已根据您的要求进行修改',
      });

      setIsAIModifyDialogOpen(false);
      fetchArticles();
    } catch (error: any) {
      console.error('Error modifying article:', error);
      toast({
        title: 'AI修改失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setAiModifying(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteArticleId) return;

    try {
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .eq('id', deleteArticleId);

      if (error) throw error;
      toast({ title: '文章已删除' });
      fetchArticles();
    } catch (error: any) {
      console.error('Error deleting article:', error);
      toast({
        title: '删除失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteArticleId(null);
    }
  };

  const togglePublish = async (article: NewsArticle) => {
    // 只有审核通过的文章才能发布
    if (!article.is_published && article.review_status !== 'approved') {
      toast({
        title: '无法发布',
        description: '只有审核通过的文章才能发布',
        variant: 'destructive',
      });
      return;
    }

    try {
      const newPublishState = !article.is_published;
      const { error } = await supabase
        .from('news_articles')
        .update({
          is_published: newPublishState,
          published_at: newPublishState ? new Date().toISOString() : null,
        })
        .eq('id', article.id);

      if (error) throw error;
      toast({ title: newPublishState ? '文章已发布' : '文章已取消发布' });
      fetchArticles();
    } catch (error: any) {
      console.error('Error toggling publish:', error);
      toast({
        title: '操作失败',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  // Fire-and-forget: push a newly-published article's URLs to Baidu
  const pushArticleToBaidu = (articleId: string) => {
    const urls = [
      `https://www.caniuav.com/zh/news/${articleId}`,
      `https://www.caniuav.com/en/news/${articleId}`,
    ];
    supabase.functions.invoke('baidu-push', { body: { urls } }).catch(() => {
      /* silent: SEO push is best-effort */
    });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('zh-CN');
  };

  const getReviewStatusBadge = (status: string | null, aiEdited: boolean | null) => {
    const badges = [];
    
    if (aiEdited) {
      badges.push(
        <Badge key="ai" className="bg-purple-500/20 text-purple-400 border-purple-500/30 mr-1">
          <Sparkles className="w-3 h-3 mr-1" />
          AI
        </Badge>
      );
    }

    switch (status) {
      case 'approved':
        badges.push(
          <Badge key="status" className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            已审核
          </Badge>
        );
        break;
      case 'rejected':
        badges.push(
          <Badge key="status" className="bg-red-500/20 text-red-400 border-red-500/30">
            <XCircle className="w-3 h-3 mr-1" />
            已拒绝
          </Badge>
        );
        break;
      default:
        badges.push(
          <Badge key="status" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <Clock className="w-3 h-3 mr-1" />
            待审核
          </Badge>
        );
    }

    return badges;
  };

  const pendingCount = articles.filter(a => a.review_status === 'pending' || !a.review_status).length;

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
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">新闻管理</h1>
              <p className="text-xs text-slate-400">News Management</p>
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
        {/* Back Button & Actions */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <Link to="/admin">
            <Button variant="ghost" className="text-slate-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回管理后台
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[160px] bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="筛选状态" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="pending">
                  待审核 {pendingCount > 0 && `(${pendingCount})`}
                </SelectItem>
                <SelectItem value="approved">已审核</SelectItem>
                <SelectItem value="rejected">已拒绝</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={openCreateDialog} className="bg-amber-500 hover:bg-amber-600">
              <Plus className="w-4 h-4 mr-2" />
              发布新文章
            </Button>
          </div>
        </div>

        {/* Pending Review Alert */}
        {pendingCount > 0 && filterStatus === 'all' && (
          <Card className="bg-yellow-500/10 border-yellow-500/30 mb-6">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400">
                  有 {pendingCount} 篇文章待审核
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="ml-auto border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20"
                  onClick={() => setFilterStatus('pending')}
                >
                  查看待审核
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              文章列表
              <Badge variant="secondary" className="ml-2">
                {articles.length} 篇文章
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-400">标题</TableHead>
                    <TableHead className="text-slate-400">作者</TableHead>
                    <TableHead className="text-slate-400">审核状态</TableHead>
                    <TableHead className="text-slate-400">发布状态</TableHead>
                    <TableHead className="text-slate-400">创建时间</TableHead>
                    <TableHead className="text-slate-400 text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {articles.map((article) => (
                    <TableRow key={article.id} className="border-slate-700">
                      <TableCell className="text-white font-medium max-w-xs truncate">
                        {article.title}
                      </TableCell>
                      <TableCell className="text-slate-400">
                        {article.author_name || '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getReviewStatusBadge(article.review_status, article.ai_edited)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {article.is_published ? (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <Eye className="w-3 h-3 mr-1" />
                            已发布
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-slate-400 border-slate-500">
                            <EyeOff className="w-3 h-3 mr-1" />
                            草稿
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-400 text-sm">
                        {formatDate(article.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {/* Review Button - only for pending articles */}
                          {(article.review_status === 'pending' || !article.review_status) && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => openReviewDialog(article)}
                              className="text-yellow-400 hover:text-yellow-300"
                              title="审核文章"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                          {/* AI Modify Button */}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => openAIModifyDialog(article)}
                            className="text-purple-400 hover:text-purple-300"
                            title="AI修改"
                          >
                            <Sparkles className="w-4 h-4" />
                          </Button>
                          {/* Publish Toggle */}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => togglePublish(article)}
                            className={article.is_published ? 'text-orange-400 hover:text-orange-300' : 'text-green-400 hover:text-green-300'}
                            title={article.is_published ? '取消发布' : '发布'}
                          >
                            {article.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          {/* Edit */}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => openEditDialog(article)}
                            className="text-blue-400 hover:text-blue-300"
                            title="编辑"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          {/* Delete */}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setDeleteArticleId(article.id);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="text-red-400 hover:text-red-300"
                            title="删除"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {articles.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">
                  {filterStatus === 'pending' ? '没有待审核的文章' : '暂无文章'}
                </p>
                {filterStatus === 'all' && (
                  <Button onClick={openCreateDialog} variant="link" className="text-amber-500 mt-2">
                    发布第一篇文章
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingArticle ? '编辑文章' : '发布新文章'}</DialogTitle>
            <DialogDescription className="text-slate-400">
              填写文章信息，可以保存为草稿或直接发布
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">标题 *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="输入文章标题"
                className="bg-slate-700 border-slate-600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">摘要</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="输入文章摘要（可选）"
                className="bg-slate-700 border-slate-600 min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label>内容 *</Label>
              <RichTextEditor
                content={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author_name">作者</Label>
                <Input
                  id="author_name"
                  value={formData.author_name}
                  onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                  placeholder="作者名称"
                  className="bg-slate-700 border-slate-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">分类</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="文章分类"
                  className="bg-slate-700 border-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>封面图片</Label>
              <SingleImageUpload
                image={formData.cover_image}
                onImageChange={(image) => setFormData({ ...formData, cover_image: image })}
                folder="news"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_published"
                checked={formData.is_published}
                onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
              />
              <Label htmlFor="is_published">立即发布</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSave} disabled={saving} className="bg-amber-500 hover:bg-amber-600">
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingArticle ? '保存更改' : '创建文章'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>审核文章</DialogTitle>
            <DialogDescription className="text-slate-400">
              {reviewingArticle?.title}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>审核结果</Label>
              <div className="flex gap-4">
                <Button
                  variant={reviewData.status === 'approved' ? 'default' : 'outline'}
                  className={reviewData.status === 'approved' ? 'bg-green-600 hover:bg-green-700' : 'border-slate-600'}
                  onClick={() => setReviewData({ ...reviewData, status: 'approved' })}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  通过并发布
                </Button>
                <Button
                  variant={reviewData.status === 'rejected' ? 'default' : 'outline'}
                  className={reviewData.status === 'rejected' ? 'bg-red-600 hover:bg-red-700' : 'border-slate-600'}
                  onClick={() => setReviewData({ ...reviewData, status: 'rejected' })}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  拒绝
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="review_notes">审核备注（可选）</Label>
              <Textarea
                id="review_notes"
                value={reviewData.notes}
                onChange={(e) => setReviewData({ ...reviewData, notes: e.target.value })}
                placeholder="输入审核备注..."
                className="bg-slate-700 border-slate-600 min-h-[100px]"
              />
            </div>

            {reviewingArticle && (
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <p className="text-sm text-slate-400 mb-2">预览文章：</p>
                <Link 
                  to={`/news/${reviewingArticle.id}`} 
                  target="_blank"
                  className="text-amber-400 hover:text-amber-300 text-sm"
                >
                  点击查看文章详情 →
                </Link>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsReviewDialogOpen(false)}>
              取消
            </Button>
            <Button 
              onClick={handleReview} 
              disabled={saving}
              className={reviewData.status === 'approved' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
            >
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              确认{reviewData.status === 'approved' ? '通过' : '拒绝'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AI Modify Dialog */}
      <Dialog open={isAIModifyDialogOpen} onOpenChange={setIsAIModifyDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              AI智能修改
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {modifyingArticle?.title}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="modify_request">修改要求 *</Label>
              <Textarea
                id="modify_request"
                value={modifyData.request}
                onChange={(e) => setModifyData({ ...modifyData, request: e.target.value })}
                placeholder="请详细描述您希望如何修改这篇文章...&#10;&#10;例如：&#10;- 删除文章中的无关内容和广告&#10;- 优化文章结构，增加段落&#10;- 改写第二段，使其更加专业&#10;- 添加更多关于XX的描述"
                className="bg-slate-700 border-slate-600 min-h-[150px]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="modify_images"
                checked={modifyData.modifyImages}
                onCheckedChange={(checked) => setModifyData({ ...modifyData, modifyImages: checked })}
              />
              <Label htmlFor="modify_images" className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                同时更换图片
              </Label>
            </div>

            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <p className="text-sm text-purple-300">
                <Sparkles className="w-4 h-4 inline mr-2" />
                AI将根据您的要求智能修改文章内容。修改完成后文章将重置为"待审核"状态。
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsAIModifyDialogOpen(false)}>
              取消
            </Button>
            <Button 
              onClick={handleAIModify} 
              disabled={aiModifying || !modifyData.request.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {aiModifying ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  AI处理中...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  开始修改
                </>
              )}
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
              此操作无法撤销，确定要删除这篇文章吗？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-white border-slate-600">取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default NewsManagement;
