import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from '@/components/ui/tabs';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Shield, LogOut, Home, Loader2, ArrowLeft, Plus,
  LayoutDashboard, Kanban, PenLine, Cpu, Rss, BarChart3, FileText,
  OctagonX, Power
} from 'lucide-react';
import { PipelineView } from '@/components/admin/content-hub/PipelineView';
import { ArticleEditor } from '@/components/admin/content-hub/ArticleEditor';
import { ScraperCockpit } from '@/components/admin/content-hub/ScraperCockpit';

interface Article {
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
  is_auto_generated: boolean | null;
  review_status: string | null;
  source_url: string | null;
  source_name: string | null;
  original_title: string | null;
  keywords: string[] | null;
}

const ContentHub = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeTab, setActiveTab] = useState('pipeline');
  const [editingArticle, setEditingArticle] = useState<Article | null | 'new'>(null);
  const [categoryFilter, setCategoryFilter] = useState('全部');
  const [killSwitchActive, setKillSwitchActive] = useState(false);
  const [killSwitchConfirm, setKillSwitchConfirm] = useState(false);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setArticles(data || []);
    } catch (err: any) {
      toast({ title: '获取文章失败', description: err.message, variant: 'destructive' });
    }
  };

  const checkKillSwitch = async () => {
    const { data } = await supabase.from('system_settings').select('value').eq('key', 'kill_switch_active').maybeSingle();
    setKillSwitchActive(data?.value === 'true');
  };

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { navigate('/admin/login'); return; }
      setCurrentUserId(session.user.id);
      const { data: isAdmin } = await supabase.rpc('has_role', { _user_id: session.user.id, _role: 'admin' });
      if (!isAdmin) { toast({ title: '访问拒绝', variant: 'destructive' }); navigate('/admin/login'); return; }
      await Promise.all([fetchArticles(), checkKillSwitch()]);
      setLoading(false);
    };
    checkAccess();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const toggleKillSwitch = async () => {
    const newState = !killSwitchActive;
    try {
      // Upsert kill_switch_active setting
      const { error } = await supabase.from('system_settings').upsert({
        key: 'kill_switch_active',
        value: String(newState),
        description: '紧急关停：禁用所有自动采集和自动发布',
      }, { onConflict: 'key' });
      if (error) throw error;

      // If activating, also disable all scheduled tasks
      if (newState) {
        await supabase.from('scheduled_tasks').update({ is_enabled: false }).neq('id', '00000000-0000-0000-0000-000000000000');
      }

      setKillSwitchActive(newState);
      toast({
        title: newState ? '🛑 紧急关停已激活' : '✅ 系统已恢复',
        description: newState ? '所有自动采集和发布已停止，定时任务已禁用' : '自动化系统已恢复运行，请手动启用需要的定时任务',
        variant: newState ? 'destructive' : 'default',
      });
    } catch (err: any) {
      toast({ title: '操作失败', description: err.message, variant: 'destructive' });
    }
    setKillSwitchConfirm(false);
  };

  // Stats
  const pendingCount = articles.filter(a => !a.review_status || a.review_status === 'pending').length;
  const reviewingCount = articles.filter(a => a.review_status === 'approved' && !a.is_published).length;
  const publishedCount = articles.filter(a => a.is_published).length;
  const totalCount = articles.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  // Show editor view
  if (editingArticle) {
    const article = editingArticle === 'new' ? null : editingArticle;
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col">
        <ArticleEditor
          article={article}
          onBack={() => { setEditingArticle(null); fetchArticles(); }}
          onSaved={() => { setEditingArticle(null); fetchArticles(); }}
          currentUserId={currentUserId}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Kill Switch Banner */}
      {killSwitchActive && (
        <div className="bg-red-500/20 border-b border-red-500/30 px-4 py-2 flex items-center justify-center gap-2">
          <OctagonX className="w-4 h-4 text-red-400" />
          <span className="text-xs text-red-300 font-medium">紧急关停已激活 — 所有自动采集和发布已暂停</span>
          <Button size="sm" variant="outline" className="h-6 text-[10px] border-red-500/50 text-red-300 hover:bg-red-500/20 ml-2"
            onClick={() => setKillSwitchConfirm(true)}>
            恢复系统
          </Button>
        </div>
      )}

      {/* Header */}
      <header className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight">内容中控台</h1>
              <p className="text-[10px] text-slate-500">Content Intelligence Hub</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">
              <span className="text-[10px] text-amber-400">待处理</span>
              <span className="text-sm font-bold text-amber-400">{pendingCount}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-violet-500/10 border border-violet-500/20">
              <span className="text-[10px] text-violet-400">待复核</span>
              <span className="text-sm font-bold text-violet-400">{reviewingCount}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-[10px] text-emerald-400">已发布</span>
              <span className="text-sm font-bold text-emerald-400">{publishedCount}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Kill Switch */}
            <Button
              variant="ghost" size="sm"
              onClick={() => setKillSwitchConfirm(true)}
              className={killSwitchActive
                ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10'
                : 'text-slate-400 hover:text-red-400 hover:bg-red-500/10'}
              title="紧急关停"
            >
              <Power className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setEditingArticle('new')}
              className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10">
              <Plus className="w-4 h-4 mr-1" />新文章
            </Button>
            <Link to="/admin">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-1" />后台
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <Home className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-400 hover:text-white">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-slate-800/50 border border-slate-700/50 mb-4">
            <TabsTrigger value="pipeline" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400 gap-1.5">
              <Kanban className="w-3.5 h-3.5" />
              内容流控
              {pendingCount > 0 && <Badge className="bg-amber-500/20 text-amber-300 text-[9px] px-1 py-0 ml-1">{pendingCount}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="scraper" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400 gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              采集引擎
            </TabsTrigger>
            <TabsTrigger value="articles" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400 gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              全部文章
              <Badge className="bg-slate-600/50 text-slate-300 text-[9px] px-1 py-0 ml-1">{totalCount}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline" className="mt-0">
            <PipelineView
              articles={articles}
              onRefresh={fetchArticles}
              onEditArticle={(a) => setEditingArticle(a as Article)}
              onAIModify={(a) => setEditingArticle(a as Article)}
              categoryFilter={categoryFilter}
              onCategoryFilterChange={setCategoryFilter}
            />
          </TabsContent>

          <TabsContent value="scraper" className="mt-0">
            <ScraperCockpit />
          </TabsContent>

          <TabsContent value="articles" className="mt-0">
            <ArticleListView
              articles={articles}
              onEdit={(a) => setEditingArticle(a)}
              onRefresh={fetchArticles}
              categoryFilter={categoryFilter}
              onCategoryFilterChange={setCategoryFilter}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Kill Switch Confirmation */}
      <AlertDialog open={killSwitchConfirm} onOpenChange={setKillSwitchConfirm}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white flex items-center gap-2">
              <OctagonX className="w-5 h-5 text-red-400" />
              {killSwitchActive ? '恢复自动化系统' : '紧急关停'}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              {killSwitchActive
                ? '确认恢复后，你需要手动重新启用所需的定时采集任务。'
                : '激活后将立即停止所有自动采集、AI处理和自动发布。所有定时任务将被禁用。此操作可防止AI异常时产生大量垃圾内容。'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-white border-slate-600">取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={toggleKillSwitch}
              className={killSwitchActive ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-red-500 hover:bg-red-600'}
            >
              {killSwitchActive ? '确认恢复' : '确认关停'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

// Simple list view for all articles
const ArticleListView = ({ articles, onEdit, onRefresh, categoryFilter, onCategoryFilterChange }: {
  articles: Article[];
  onEdit: (a: Article) => void;
  onRefresh: () => void;
  categoryFilter: string;
  onCategoryFilterChange: (c: string) => void;
}) => {
  const { toast } = useToast();
  const filtered = categoryFilter === '全部' ? articles : articles.filter(a => a.category === categoryFilter);

  const togglePublish = async (article: Article) => {
    try {
      const { error } = await supabase.from('news_articles').update({
        is_published: !article.is_published,
        published_at: !article.is_published ? new Date().toISOString() : null,
      }).eq('id', article.id);
      if (error) throw error;
      onRefresh();
    } catch (err: any) { toast({ title: '操作失败', description: err.message, variant: 'destructive' }); }
  };

  return (
    <div className="space-y-3">
      {/* Category filter buttons */}
      <div className="flex items-center gap-2">
        {['全部', '公司新闻', '行业动态', '技术分享'].map(cat => (
          <Button key={cat} variant={categoryFilter === cat ? 'default' : 'outline'} size="sm"
            onClick={() => onCategoryFilterChange(cat)}
            className={categoryFilter === cat ? 'bg-slate-600 text-white' : 'border-slate-700 text-slate-400 bg-transparent'}>
            {cat}
          </Button>
        ))}
      </div>

      <div className="space-y-1.5">
        {filtered.map(article => (
          <div key={article.id}
            className="flex items-center justify-between px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-colors cursor-pointer group"
            onClick={() => onEdit(article)}>
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {article.cover_image && (
                <img src={article.cover_image} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0" />
              )}
              <div className="min-w-0">
                <h3 className="text-sm text-white truncate">{article.title}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge className={`text-[9px] px-1.5 py-0 ${
                    article.category === '公司新闻' ? 'bg-blue-500/20 text-blue-300' :
                    article.category === '行业动态' ? 'bg-emerald-500/20 text-emerald-300' :
                    article.category === '技术分享' ? 'bg-violet-500/20 text-violet-300' :
                    'bg-slate-600/50 text-slate-400'
                  }`}>{article.category || '未分类'}</Badge>
                  <span className="text-[10px] text-slate-500">{new Date(article.created_at).toLocaleDateString('zh-CN')}</span>
                  {article.ai_edited && <Badge className="bg-purple-500/20 text-purple-300 text-[9px] px-1 py-0">AI</Badge>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
              <Badge className={`text-[9px] px-1.5 py-0 ${article.is_published ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-600/50 text-slate-400'}`}>
                {article.is_published ? '已发布' : '草稿'}
              </Badge>
              <Button variant="ghost" size="sm" className="h-7 text-[10px] text-slate-400 hover:text-white opacity-0 group-hover:opacity-100"
                onClick={() => togglePublish(article)}>
                {article.is_published ? '下架' : '发布'}
              </Button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">暂无文章</div>
        )}
      </div>
    </div>
  );
};

export default ContentHub;
